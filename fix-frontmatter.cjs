const fs = require('fs');
const path = require('path');

const dir = './src/content/common-questions';
const files = fs.readdirSync(dir).filter(f => f.startsWith('why-') && f.endsWith('.md'));

let order = 23; // Start after the last numbered file (22)

files.forEach(file => {
  const filePath = path.join(dir, file);
  const content = fs.readFileSync(filePath, 'utf8');

  // Extract the slug from filename
  const slug = file.replace('.md', '');

  // Parse frontmatter
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) {
    console.log(`Skipping ${file} - no frontmatter found`);
    return;
  }

  const frontmatter = frontmatterMatch[1];
  const restOfContent = content.substring(frontmatterMatch[0].length);

  // Check if already has required fields
  if (frontmatter.includes('slug:') && frontmatter.includes('category:') && frontmatter.includes('order:')) {
    console.log(`Skipping ${file} - already has required fields`);
    return;
  }

  // Add missing fields after the title line
  const lines = frontmatter.split('\n');
  const newLines = [];

  for (let line of lines) {
    newLines.push(line);
    if (line.startsWith('title:')) {
      newLines.push(`slug: "${slug}"`);
      newLines.push(`category: "Common Questions"`);
      newLines.push(`order: ${order}`);
      newLines.push(`status: "published"`);
    }
  }

  const newContent = `---\n${newLines.join('\n')}\n---${restOfContent}`;
  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log(`✓ Fixed ${file} (order: ${order})`);
  order++;
});

console.log(`\nProcessed ${files.length} files`);
