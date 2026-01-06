const fs = require('fs');
const path = require('path');

const dir = './src/content/common-questions';

// Category mapping
const categoryMap = {
  // Life Stage
  'why-millennials-need-a-will': 'Life Stage',
  'why-gen-x-needs-a-will-now': 'Life Stage',
  'why-retirees-need-to-update-their-will': 'Life Stage',
  'why-self-funded-retirees-need-a-will': 'Life Stage',

  // Relationships
  'why-newly-married-couples-need-a-will': 'Relationships',
  'why-de-facto-couples-need-a-will': 'Relationships',
  'why-divorced-people-need-a-new-will': 'Relationships',
  'why-single-people-no-children-need-a-will': 'Relationships',

  // Parenting
  'why-parents-of-young-children-need-a-will': 'Parenting',
  'why-single-parents-need-a-will': 'Parenting',
  'why-blended-families-need-a-will': 'Parenting',

  // Work & Assets
  'why-business-owners-need-a-will': 'Work & Assets',
  'why-new-homeowners-need-a-will': 'Work & Assets',
  'why-people-with-investment-properties-need-a-will': 'Work & Assets',
  'why-people-with-super-need-a-will': 'Work & Assets',
  'why-fifo-workers-need-a-will': 'Work & Assets',
  'why-farmers-need-a-will': 'Work & Assets',
  'why-expats-need-a-will': 'Work & Assets',

  // Health & Wellbeing
  'why-people-with-chronic-illness-need-a-will': 'Health & Wellbeing',
  'why-financial-wellbeing-includes-having-a-will': 'Health & Wellbeing'
};

Object.keys(categoryMap).forEach(slug => {
  const filename = `${slug}.md`;
  const filePath = path.join(dir, filename);

  if (!fs.existsSync(filePath)) {
    console.log(`⚠ File not found: ${filename}`);
    return;
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const newCategory = categoryMap[slug];

  // Replace category: "Is This You?" with new category
  const updatedContent = content.replace(
    /category: "Is This You\?"/,
    `category: "${newCategory}"`
  );

  if (content !== updatedContent) {
    fs.writeFileSync(filePath, updatedContent, 'utf8');
    console.log(`✓ Updated ${filename} → category: "${newCategory}"`);
  } else {
    console.log(`⚠ No change for ${filename}`);
  }
});

console.log('\n✅ Category update complete!');
