#!/bin/bash

# This script will process all dictionary files
UNPUB_DIR=~/Desktop/yourwillpro-content/unpublished-content/dictionary
PUB_DIR=~/Desktop/yourwillpro-content/src/content/dictionary

cd ~/Desktop/yourwillpro-content

# Get count
TOTAL=$(ls "$UNPUB_DIR"/*.md 2>/dev/null | wc -l | tr -d ' ')
echo "Total files to process: $TOTAL"
echo ""

# We'll process these using Claude via the batch script
node complete-dictionary-batch.js

echo ""
echo "Processing complete!"
ls "$UNPUB_DIR"/*.md 2>/dev/null | wc -l | tr -d ' ' | xargs -I {} echo "Remaining files: {}"
