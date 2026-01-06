const fs = require('fs');
const path = require('path');

const unpublishedDir = './unpublished-content';
const publishedDirs = {
  'common-questions': './src/content/common-questions',
  'user-stories': './src/content/user-stories',
  'guides': './src/content/guides',
  'dictionary': './src/content/dictionary'
};

// Get all files recursively
function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllFiles(filePath, fileList);
    } else if (file.endsWith('.md') || file.endsWith('.docx')) {
      fileList.push(filePath);
    }
  });
  return fileList;
}

// Extract frontmatter from .md file
function extractFrontmatter(filePath) {
  if (!filePath.endsWith('.md')) return null;
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    if (!frontmatterMatch) return null;

    const fm = {};
    const lines = frontmatterMatch[1].split('\n');
    lines.forEach(line => {
      const match = line.match(/^(\w+):\s*"?([^"]*)"?$/);
      if (match) {
        fm[match[1]] = match[2].replace(/"/g, '');
      }
    });
    return fm;
  } catch (e) {
    return null;
  }
}

// Check if file exists in published content
function findDuplicate(filename, frontmatter) {
  const baseFilename = path.basename(filename, '.md');

  for (const [category, dir] of Object.entries(publishedDirs)) {
    if (!fs.existsSync(dir)) continue;

    const publishedFiles = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

    for (const pubFile of publishedFiles) {
      const pubFilePath = path.join(dir, pubFile);
      const pubBase = path.basename(pubFile, '.md');

      // Check filename match
      if (baseFilename === pubBase) {
        return { match: 'filename', category, file: pubFile };
      }

      // Check frontmatter matches
      if (frontmatter) {
        const pubFm = extractFrontmatter(pubFilePath);
        if (pubFm) {
          // Check slug match
          if (frontmatter.slug && pubFm.slug && frontmatter.slug === pubFm.slug) {
            return { match: 'slug', category, file: pubFile };
          }
          // Check title match
          if (frontmatter.title && pubFm.title &&
              frontmatter.title.toLowerCase() === pubFm.title.toLowerCase()) {
            return { match: 'title', category, file: pubFile };
          }
        }
      }
    }
  }

  return null;
}

// Categorize file based on name and frontmatter
function categorizeFile(filename, frontmatter) {
  const basename = path.basename(filename, path.extname(filename));

  // Feedback files
  if (filename.includes('/Feedback/') ||
      ['ask-about-a-term', 'general-feedback', 'help-me-choose-a-will-service',
       'here-is-my-story', 'report-an-error', 'suggest-an-improvement'].includes(basename)) {
    return 'feedback';
  }

  // About page
  if (basename === 'about-us') {
    return 'about';
  }

  // Sitemap
  if (basename === 'sitemap') {
    return 'other';
  }

  // Section files
  if (basename === '_section') {
    return 'section';
  }

  // User stories (single word names or "the-" prefix)
  if (basename.match(/^(conflict|delay|diligence|disobedience|incapacity|misappropriation|mishandling|non-compliance|obstruction|transparency|undue-influence)$/) ||
      basename.startsWith('the-')) {
    return 'user-stories';
  }

  // Guide
  if (basename.includes('guide') || frontmatter?.category === 'guides') {
    return 'guides';
  }

  // Common questions (why-, what-, how-, can-, is-, do-, does-)
  if (basename.match(/^(why-|what-|how-|can-|is-|do-|does-|\d+-)/)) {
    return 'common-questions';
  }

  return 'unclear';
}

console.log('=== UNPUBLISHED CONTENT AUDIT ===\n');

const unpublishedFiles = getAllFiles(unpublishedDir);
console.log(`Found ${unpublishedFiles.length} files in unpublished-content\n`);

const results = {
  duplicates: [],
  newCommonQuestions: [],
  newUserStories: [],
  newGuides: [],
  newDictionary: [],
  feedback: [],
  other: [],
  unclear: []
};

unpublishedFiles.forEach(file => {
  const relativePath = file.replace(unpublishedDir + '/', '');
  const frontmatter = extractFrontmatter(file);
  const duplicate = findDuplicate(file, frontmatter);
  const category = categorizeFile(file, frontmatter);

  const fileInfo = {
    path: file,
    relativePath,
    filename: path.basename(file),
    folder: path.dirname(relativePath),
    type: path.extname(file),
    frontmatter
  };

  if (duplicate) {
    results.duplicates.push({
      ...fileInfo,
      duplicate: duplicate
    });
  } else {
    switch(category) {
      case 'common-questions':
        results.newCommonQuestions.push(fileInfo);
        break;
      case 'user-stories':
        results.newUserStories.push(fileInfo);
        break;
      case 'guides':
        results.newGuides.push(fileInfo);
        break;
      case 'dictionary':
        results.newDictionary.push(fileInfo);
        break;
      case 'feedback':
        results.feedback.push(fileInfo);
        break;
      case 'about':
      case 'section':
      case 'other':
        results.other.push(fileInfo);
        break;
      default:
        results.unclear.push(fileInfo);
    }
  }
});

// Print detailed results
console.log('=== STEP 2: DUPLICATES FOUND ===\n');
if (results.duplicates.length > 0) {
  results.duplicates.forEach(item => {
    console.log(`DUPLICATE: ${item.filename}`);
    console.log(`  Location: ${item.folder}`);
    console.log(`  Match: ${item.duplicate.match} in ${item.duplicate.category}/${item.duplicate.file}`);
    console.log('');
  });
} else {
  console.log('No duplicates found.\n');
}

console.log('=== NEW CONTENT BY CATEGORY ===\n');

console.log(`Common Questions (${results.newCommonQuestions.length}):`);
results.newCommonQuestions.forEach(f => console.log(`  - ${f.filename}`));
console.log('');

console.log(`User Stories (${results.newUserStories.length}):`);
results.newUserStories.forEach(f => console.log(`  - ${f.filename}`));
console.log('');

console.log(`Guides (${results.newGuides.length}):`);
results.newGuides.forEach(f => console.log(`  - ${f.filename}`));
console.log('');

console.log(`Dictionary (${results.newDictionary.length}):`);
results.newDictionary.forEach(f => console.log(`  - ${f.filename}`));
console.log('');

console.log(`Feedback/Forms (${results.feedback.length}):`);
results.feedback.forEach(f => console.log(`  - ${f.filename}`));
console.log('');

console.log(`Other/Special (${results.other.length}):`);
results.other.forEach(f => console.log(`  - ${f.filename}`));
console.log('');

console.log(`Unclear/Review Needed (${results.unclear.length}):`);
results.unclear.forEach(f => console.log(`  - ${f.filename}`));
console.log('');

// Save results to JSON for processing
fs.writeFileSync('audit-results.json', JSON.stringify(results, null, 2));
console.log('Results saved to audit-results.json');
