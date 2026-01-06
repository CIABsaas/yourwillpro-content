const fs = require('fs');
const path = require('path');

const dir = './src/content/common-questions';

// Mapping of current category to group value
const categoryToGroup = {
  'Life Stage': 'Life Stage',
  'Relationships': 'Relationships',
  'Parenting': 'Parenting',
  'Work & Assets': 'Work & Assets',
  'Health & Wellbeing': 'Health & Wellbeing'
};

// List all why- files
const files = fs.readdirSync(dir).filter(f => f.startsWith('why-') && f.endsWith('.md'));

console.log(`Found ${files.length} "why-" question files to fix...\n`);

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Find current category
  const categoryMatch = content.match(/^category: "([^"]+)"/m);
  if (!categoryMatch) {
    console.log(`⚠ Skipped ${file} - no category found`);
    return;
  }

  const currentCategory = categoryMatch[1];

  // Skip if already "Common Questions"
  if (currentCategory === 'Common Questions') {
    console.log(`✓ Skipped ${file} - already has "Common Questions"`);
    return;
  }

  // Check if this category should be converted to a group
  if (!categoryToGroup[currentCategory]) {
    console.log(`⚠ Skipped ${file} - unknown category: "${currentCategory}"`);
    return;
  }

  const groupValue = categoryToGroup[currentCategory];

  // Replace category line and add group if not present
  let updatedContent = content.replace(
    /^category: "([^"]+)"/m,
    `category: "Common Questions"`
  );

  // Add group field after category if it doesn't exist
  if (!updatedContent.match(/^group:/m)) {
    updatedContent = updatedContent.replace(
      /^category: "Common Questions"/m,
      `category: "Common Questions"\ngroup: "${groupValue}"`
    );
  }

  if (content !== updatedContent) {
    fs.writeFileSync(filePath, updatedContent, 'utf8');
    console.log(`✓ Updated ${file}: category="${currentCategory}" → category="Common Questions" + group="${groupValue}"`);
  } else {
    console.log(`⚠ No change for ${file}`);
  }
});

console.log('\n✅ Fix complete!');
