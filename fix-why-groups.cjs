const fs = require('fs');
const path = require('path');

const dir = './src/content/common-questions';

// Manual mapping of filenames to correct group values
const fileToGroup = {
  'why-gen-x-needs-a-will-now.md': 'Life Stage',
  'why-millennials-need-a-will.md': 'Life Stage',
  'why-retirees-need-to-update-their-will.md': 'Life Stage',
  'why-self-funded-retirees-need-a-will.md': 'Life Stage',

  'why-de-facto-couples-need-a-will.md': 'Relationships',
  'why-divorced-people-need-a-new-will.md': 'Relationships',
  'why-newly-married-couples-need-a-will.md': 'Relationships',
  'why-single-people-no-children-need-a-will.md': 'Relationships',

  'why-blended-families-need-a-will.md': 'Parenting',
  'why-parents-of-young-children-need-a-will.md': 'Parenting',
  'why-single-parents-need-a-will.md': 'Parenting',

  'why-business-owners-need-a-will.md': 'Work & Assets',
  'why-expats-need-a-will.md': 'Work & Assets',
  'why-farmers-need-a-will.md': 'Work & Assets',
  'why-fifo-workers-need-a-will.md': 'Work & Assets',
  'why-new-homeowners-need-a-will.md': 'Work & Assets',
  'why-people-with-investment-properties-need-a-will.md': 'Work & Assets',
  'why-people-with-super-need-a-will.md': 'Work & Assets',

  'why-financial-wellbeing-includes-having-a-will.md': 'Health & Wellbeing',
  'why-people-with-chronic-illness-need-a-will.md': 'Health & Wellbeing'
};

console.log(`Updating group fields for ${Object.keys(fileToGroup).length} "why-" files...\n`);

let updated = 0;
let skipped = 0;

Object.entries(fileToGroup).forEach(([file, correctGroup]) => {
  const filePath = path.join(dir, file);

  if (!fs.existsSync(filePath)) {
    console.log(`⚠ File not found: ${file}`);
    skipped++;
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // Check current group value
  const groupMatch = content.match(/^group: "([^"]*)"/m);
  const currentGroup = groupMatch ? groupMatch[1] : 'none';

  if (currentGroup === correctGroup) {
    console.log(`✓ ${file} already has correct group: "${correctGroup}"`);
    skipped++;
    return;
  }

  // Update or add group field
  if (groupMatch) {
    // Update existing group field
    content = content.replace(
      /^group: "([^"]*)"/m,
      `group: "${correctGroup}"`
    );
    console.log(`✓ Updated ${file}: group="${currentGroup}" → "${correctGroup}"`);
  } else {
    // Add group field after category
    content = content.replace(
      /^category: "([^"]+)"/m,
      (match) => `${match}\ngroup: "${correctGroup}"`
    );
    console.log(`✓ Added group to ${file}: "${correctGroup}"`);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  updated++;
});

console.log(`\n✅ Complete! Updated ${updated} files, skipped ${skipped} files.`);
