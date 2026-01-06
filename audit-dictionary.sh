#!/bin/bash

# Dictionary Entry Audit Script
# Checks all dictionary entries against Administrator benchmark

DICT_DIR="/Users/donmacintosh/Desktop/yourwillpro-content/src/content/dictionary"
OUTPUT_FILE="/Users/donmacintosh/Desktop/yourwillpro-content/audit-results.txt"

# Clear previous results
> "$OUTPUT_FILE"

echo "=== DICTIONARY AUDIT REPORT ===" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

# Counters
total=0
missing_sections=0
too_long=0
good=0

# Temporary files for tracking
missing_file=$(mktemp)
toolong_file=$(mktemp)

# Process each markdown file
for file in "$DICT_DIR"/*.md; do
    [ -f "$file" ] || continue
    [ "$(basename "$file")" = "_section.md" ] && continue

    total=$((total + 1))
    filename=$(basename "$file" .md)
    content=$(cat "$file")

    issues=""
    missing=""
    long_sections=""

    # Check for required sections
    if ! echo "$content" | grep -qi "LEGAL DEFINITION"; then
        missing="Legal Definition, "
    fi

    if ! echo "$content" | grep -qi "PLAIN ENGLISH"; then
        missing="${missing}Plain English, "
    fi

    if ! echo "$content" | grep -qi "When you'll encounter"; then
        missing="${missing}When you'll encounter, "
    fi

    if ! echo "$content" | grep -qi "EXAMPLE"; then
        missing="${missing}Example, "
    fi

    if ! echo "$content" | grep -q "relatedTerms:"; then
        missing="${missing}Related Terms, "
    fi

    # Check for Did you know (optional but note)
    has_dyk="Yes"
    if ! echo "$content" | grep -qi "Did you know"; then
        has_dyk="No"
    fi

    # Check text length in Plain English section
    plain_english=$(echo "$content" | awk '/PLAIN ENGLISH/,/<\/div>/' | sed '1d;$d' | tr -d '\n' | wc -w)
    if [ "$plain_english" -gt 80 ]; then
        long_sections="${long_sections}Plain English (${plain_english}w), "
    fi

    # Check Legal Definition length
    legal_def=$(echo "$content" | awk '/LEGAL DEFINITION/,/<\/div>/' | sed '1d;$d' | tr -d '\n' | wc -w)
    if [ "$legal_def" -gt 70 ]; then
        long_sections="${long_sections}Legal Definition (${legal_def}w), "
    fi

    # Record issues
    if [ -n "$missing" ]; then
        missing=$(echo "$missing" | sed 's/, $//')
        echo "$filename|$missing" >> "$missing_file"
        missing_sections=$((missing_sections + 1))
    fi

    if [ -n "$long_sections" ]; then
        long_sections=$(echo "$long_sections" | sed 's/, $//')
        echo "$filename|$long_sections" >> "$toolong_file"
        too_long=$((too_long + 1))
    fi

    if [ -z "$missing" ] && [ -z "$long_sections" ]; then
        good=$((good + 1))
    fi
done

# Generate LIST A: Missing Sections
echo "## LIST A: MISSING SECTIONS" >> "$OUTPUT_FILE"
echo "| Term | Missing |" >> "$OUTPUT_FILE"
echo "|------|---------|" >> "$OUTPUT_FILE"

if [ -s "$missing_file" ]; then
    while IFS='|' read -r term missing; do
        echo "| $term | $missing |" >> "$OUTPUT_FILE"
    done < "$missing_file"
else
    echo "| (none) | - |" >> "$OUTPUT_FILE"
fi

echo "" >> "$OUTPUT_FILE"

# Generate LIST B: Text Too Long
echo "## LIST B: TEXT TOO LONG" >> "$OUTPUT_FILE"
echo "| Term | Section | Issue |" >> "$OUTPUT_FILE"
echo "|------|---------|-------|" >> "$OUTPUT_FILE"

if [ -s "$toolong_file" ]; then
    while IFS='|' read -r term sections; do
        echo "| $term | $sections | Too verbose |" >> "$OUTPUT_FILE"
    done < "$toolong_file"
else
    echo "| (none) | - | - |" >> "$OUTPUT_FILE"
fi

echo "" >> "$OUTPUT_FILE"

# Generate Summary
echo "## SUMMARY" >> "$OUTPUT_FILE"
echo "- Total entries reviewed: $total" >> "$OUTPUT_FILE"
echo "- Entries with missing sections: $missing_sections" >> "$OUTPUT_FILE"
echo "- Entries with text too long: $too_long" >> "$OUTPUT_FILE"
echo "- Entries that are good: $good" >> "$OUTPUT_FILE"

# Cleanup
rm -f "$missing_file" "$toolong_file"

echo "Audit complete! Results written to $OUTPUT_FILE"
cat "$OUTPUT_FILE"
