const fs = require('fs');
const path = require('path');

// Load audit results
const results = JSON.parse(fs.readFileSync('audit-results.json', 'utf8'));

const oldDir = './unpublished-content/OLD';

console.log('=== MOVING DUPLICATES TO /OLD ===\n');

let moved = 0;
let failed = 0;

results.duplicates.forEach(item => {
  const sourcePath = item.path;
  const filename = item.filename;

  // For files in subfolders, preserve the folder name in the destination
  let destFilename = filename;
  if (item.folder !== 'unpublished-content') {
    const subfolder = item.folder.replace('unpublished-content/', '').replace(/\//g, '-');
    destFilename = `${subfolder}-${filename}`;
  }

  const destPath = path.join(oldDir, destFilename);

  try {
    fs.renameSync(sourcePath, destPath);
    console.log(`✓ Moved: ${item.relativePath} → OLD/${destFilename}`);
    moved++;
  } catch (err) {
    console.log(`✗ Failed: ${item.relativePath} - ${err.message}`);
    failed++;
  }
});

console.log(`\n=== SUMMARY ===`);
console.log(`Moved: ${moved} files`);
console.log(`Failed: ${failed} files`);
