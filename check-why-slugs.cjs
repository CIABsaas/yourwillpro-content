const fs = require('fs');
const path = require('path');

const dir = './src/content/common-questions';

// List all why- files
const files = fs.readdirSync(dir).filter(f => f.startsWith('why-') && f.endsWith('.md'));

console.log(`Checking ${files.length} "why-" question files...\n`);

const issues = [];
let fixesNeeded = 0;

files.forEach(file => {
  const filePath = path.join(dir, file);
  const content = fs.readFileSync(filePath, 'utf8');

  // Expected slug (filename without .md)
  const expectedSlug = file.replace('.md', '');

  // Extract frontmatter fields
  const slugMatch = content.match(/^slug: "([^"]*)"/m);
  const categoryMatch = content.match(/^category: "([^"]*)"/m);
  const statusMatch = content.match(/^status: "([^"]*)"/m);

  const currentSlug = slugMatch ? slugMatch[1] : 'NOT FOUND';
  const currentCategory = categoryMatch ? categoryMatch[1] : 'NOT FOUND';
  const currentStatus = statusMatch ? statusMatch[1] : 'NOT FOUND';

  // Check for issues
  const slugMismatch = currentSlug !== expectedSlug;
  const wrongCategory = currentCategory !== 'Common Questions';
  const wrongStatus = currentStatus !== 'published';

  if (slugMismatch || wrongCategory || wrongStatus) {
    issues.push({
      file,
      expectedSlug,
      currentSlug,
      currentCategory,
      currentStatus,
      slugMismatch,
      wrongCategory,
      wrongStatus
    });
    fixesNeeded++;
  }

  console.log(`✓ ${file}`);
  console.log(`  Slug: ${currentSlug === expectedSlug ? '✓' : '✗'} "${currentSlug}" ${slugMismatch ? `(should be "${expectedSlug}")` : ''}`);
  console.log(`  Category: ${currentCategory === 'Common Questions' ? '✓' : '✗'} "${currentCategory}"`);
  console.log(`  Status: ${currentStatus === 'published' ? '✓' : '✗'} "${currentStatus}"`);
  console.log('');
});

if (issues.length > 0) {
  console.log(`\n⚠️  Found ${issues.length} file(s) needing fixes:\n`);
  issues.forEach(issue => {
    console.log(`${issue.file}:`);
    if (issue.slugMismatch) console.log(`  - Slug mismatch: "${issue.currentSlug}" → "${issue.expectedSlug}"`);
    if (issue.wrongCategory) console.log(`  - Wrong category: "${issue.currentCategory}" → "Common Questions"`);
    if (issue.wrongStatus) console.log(`  - Wrong status: "${issue.currentStatus}" → "published"`);
  });
} else {
  console.log('\n✅ All files are correct! No fixes needed.');
}
