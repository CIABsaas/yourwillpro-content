const fs = require('fs');
const path = require('path');

const dir = './src/content/common-questions';
const files = fs.readdirSync(dir).filter(f => f.startsWith('why-') && f.endsWith('.md'));

console.log(`Found ${files.length} files to update...\n`);

files.forEach(file => {
  const filePath = path.join(dir, file);
  const content = fs.readFileSync(filePath, 'utf8');

  // Replace category: "Common Questions" with category: "Is This You?"
  const updatedContent = content.replace(
    /category: "Common Questions"/,
    'category: "Is This You?"'
  );

  if (content !== updatedContent) {
    fs.writeFileSync(filePath, updatedContent, 'utf8');
    console.log(`✓ Updated ${file}`);
  } else {
    console.log(`⚠ Skipped ${file} (no change needed)`);
  }
});

console.log('\n✅ Category update complete!');
