#!/bin/bash

# Detailed Dictionary Audit - Word Count Analysis
DICT_DIR="/Users/donmacintosh/Desktop/yourwillpro-content/src/content/dictionary"
OUTPUT="/Users/donmacintosh/Desktop/yourwillpro-content/detailed-audit-results.txt"

> "$OUTPUT"

echo "=== DETAILED DICTIONARY AUDIT ===" >> "$OUTPUT"
echo "" >> "$OUTPUT"

# Benchmark: administrator.md = 248 words
BENCHMARK=248
WARN_THRESHOLD=$((BENCHMARK * 2))  # 496 words = 2x benchmark
CRITICAL_THRESHOLD=$((BENCHMARK * 4))  # 992 words = 4x benchmark

echo "Benchmark: Administrator = $BENCHMARK words" >> "$OUTPUT"
echo "Warning threshold (2x): $WARN_THRESHOLD words" >> "$OUTPUT"
echo "Critical threshold (4x): $CRITICAL_THRESHOLD words" >> "$OUTPUT"
echo "" >> "$OUTPUT"

# Temp files
critical_file=$(mktemp)
warning_file=$(mktemp)
good_file=$(mktemp)

total=0
critical_count=0
warning_count=0
good_count=0

for file in "$DICT_DIR"/*.md; do
    [ -f "$file" ] || continue
    [ "$(basename "$file")" = "_section.md" ] && continue

    filename=$(basename "$file" .md)
    wordcount=$(wc -w < "$file" | tr -d ' ')

    total=$((total + 1))

    if [ "$wordcount" -gt "$CRITICAL_THRESHOLD" ]; then
        echo "$filename|$wordcount" >> "$critical_file"
        critical_count=$((critical_count + 1))
    elif [ "$wordcount" -gt "$WARN_THRESHOLD" ]; then
        echo "$filename|$wordcount" >> "$warning_file"
        warning_count=$((warning_count + 1))
    else
        echo "$filename|$wordcount" >> "$good_file"
        good_count=$((good_count + 1))
    fi
done

# Critical - 4x+ too long
echo "## CRITICAL: FILES 4X+ TOO LONG (>$CRITICAL_THRESHOLD words)" >> "$OUTPUT"
echo "| Term | Word Count | vs Benchmark |" >> "$OUTPUT"
echo "|------|------------|--------------|" >> "$OUTPUT"

if [ -s "$critical_file" ]; then
    while IFS='|' read -r term words; do
        ratio=$((words / BENCHMARK))
        echo "| $term | $words | ${ratio}x |" >> "$OUTPUT"
    done < <(sort -t'|' -k2 -nr "$critical_file")
else
    echo "| (none) | - | - |" >> "$OUTPUT"
fi

echo "" >> "$OUTPUT"

# Warning - 2-4x too long
echo "## WARNING: FILES 2-4X TOO LONG ($WARN_THRESHOLD-$CRITICAL_THRESHOLD words)" >> "$OUTPUT"
echo "| Term | Word Count | vs Benchmark |" >> "$OUTPUT"
echo "|------|------------|--------------|" >> "$OUTPUT"

if [ -s "$warning_file" ]; then
    while IFS='|' read -r term words; do
        ratio=$((words / BENCHMARK))
        echo "| $term | $words | ${ratio}x |" >> "$OUTPUT"
    done < <(sort -t'|' -k2 -nr "$warning_file")
else
    echo "| (none) | - | - |" >> "$OUTPUT"
fi

echo "" >> "$OUTPUT"

# Summary
echo "## SUMMARY BY WORD COUNT" >> "$OUTPUT"
echo "- Total entries reviewed: $total" >> "$OUTPUT"
echo "- Critical (4x+ benchmark): $critical_count entries" >> "$OUTPUT"
echo "- Warning (2-4x benchmark): $warning_count entries" >> "$OUTPUT"
echo "- Good (under 2x): $good_count entries" >> "$OUTPUT"

# Cleanup
rm -f "$critical_file" "$warning_file" "$good_file"

cat "$OUTPUT"
