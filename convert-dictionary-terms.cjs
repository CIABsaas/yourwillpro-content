const fs = require('fs');
const path = require('path');

const dictionaryDir = './src/content/dictionary';

function convertFile(filePath) {
  const fileName = path.basename(filePath);

  // Skip administrator.md (already converted)
  if (fileName === 'administrator.md' || fileName === '_section.md') {
    return { skipped: true, fileName };
  }

  try {
    const content = fs.readFileSync(filePath, 'utf8');

    // Split frontmatter and body
    const parts = content.split('---');
    if (parts.length < 3) {
      return { error: 'Invalid frontmatter', fileName };
    }

    const frontmatter = parts[1];
    let body = parts.slice(2).join('---').trim();

    // Convert OLD HTML format (.definition-columns) to NEW format
    if (body.includes('class="definition-columns"')) {
      body = convertOldHtmlFormat(body);
    }
    // Convert Plain Markdown format to NEW format
    else if (body.includes('## Legal Term') || body.includes('## Plain English')) {
      body = convertPlainMarkdownFormat(body);
    }

    // Write back
    const newContent = `---${frontmatter}---\n\n${body}`;
    fs.writeFileSync(filePath, newContent, 'utf8');

    return { success: true, fileName };
  } catch (error) {
    return { error: error.message, fileName };
  }
}

function convertOldHtmlFormat(body) {
  // Convert .definition-columns to .two-column
  body = body.replace(/<div class="definition-columns">/g, '<div class="two-column">');

  // Convert .legal-definition to .column-card legal-column with label
  body = body.replace(
    /<div class="legal-definition">\s*<h2>Legal Definition<\/h2>/g,
    '<div class="column-card legal-column">\n    <div class="column-label">LEGAL DEFINITION</div>'
  );

  // Convert .plain-english to .column-card plain-column with label
  body = body.replace(
    /<div class="plain-english">\s*<h2>Plain English<\/h2>/g,
    '<div class="column-card plain-column">\n    <div class="column-label">PLAIN ENGLISH</div>'
  );

  // Update when-box: Remove SVG, update h2 to h3 with emoji
  body = body.replace(
    /<div class="when-box">\s*<h2>\s*<svg[^>]*>[\s\S]*?<\/svg>\s*When you'll encounter this term\s*<\/h2>/g,
    '<div class="when-box">\n  <h3>⏱ When you\'ll encounter this term</h3>'
  );

  // Update example-box: Add example-label
  body = body.replace(
    /<div class="example-box">\s*<p>/g,
    '<div class="example-box">\n  <div class="example-label">EXAMPLE</div>\n  <p>'
  );

  // Update compare-box: Change h2 to h3 with emoji, .comparison to .compare-grid, .compare-item wrapper
  body = body.replace(
    /<div class="compare-box">\s*<h2>Compare: ([^<]+)<\/h2>/g,
    '<div class="compare-box">\n  <h3>⚖️ Compare: $1</h3>'
  );
  body = body.replace(/<div class="comparison">/g, '<div class="compare-grid">');

  // Wrap items in compare-item if not already
  body = body.replace(
    /<div class="compare-grid">\s*<div>(?!\s*<div class="compare-)/g,
    '<div class="compare-grid">\n    <div class="compare-item">'
  );
  body = body.replace(
    /(<div class="compare-grid">[\s\S]*?)<div>\s*<h3>([^<]+)<\/h3>/g,
    (match, prefix, termName) => {
      if (match.includes('compare-item')) return match;
      return `${prefix}<div class="compare-item">\n      <div class="compare-term">${termName}</div>`;
    }
  );

  // Update did-you-know: Remove SVG, update h2 to h3 with emoji
  body = body.replace(
    /<div class="did-you-know">\s*<h2>\s*<svg[^>]*>[\s\S]*?<\/svg>\s*Did you know\?\s*<\/h2>/g,
    '<div class="did-you-know">\n  <h3>💡 Did you know?</h3>'
  );

  return body;
}

function convertPlainMarkdownFormat(body) {
  let newBody = '';

  // Extract sections
  const legalMatch = body.match(/## Legal Term\s+([\s\S]*?)(?=\n## |$)/);
  const plainMatch = body.match(/## Plain English\s+([\s\S]*?)(?=\n## |$)/);
  const contextMatch = body.match(/## Context\s+([\s\S]*?)(?=\n## |$)/);

  // Build two-column section
  if (legalMatch || plainMatch) {
    newBody += '<div class="two-column">\n';

    if (legalMatch) {
      const legalContent = legalMatch[1].trim();
      newBody += '  <div class="column-card legal-column">\n';
      newBody += '    <div class="column-label">LEGAL DEFINITION</div>\n';
      newBody += '    ' + legalContent.split('\n').map(line => line.trim()).filter(l => l).map(l => `<p>${l}</p>`).join('\n    ') + '\n';
      newBody += '  </div>\n';
    }

    if (plainMatch) {
      const plainContent = plainMatch[1].trim();
      newBody += '  <div class="column-card plain-column">\n';
      newBody += '    <div class="column-label">PLAIN ENGLISH</div>\n';
      newBody += '    ' + plainContent.split('\n\n').map(para => para.trim()).filter(p => p).map(p => `<p>${p}</p>`).join('\n    ') + '\n';
      newBody += '  </div>\n';
    }

    newBody += '</div>\n\n';
  }

  // Add context as a when-box if it exists
  if (contextMatch) {
    const contextContent = contextMatch[1].trim();
    newBody += '<div class="when-box">\n';
    newBody += '  <h3>⏱ When you\'ll encounter this term</h3>\n';
    newBody += '  ' + contextContent.split('\n\n').map(para => para.trim()).filter(p => p).map(p => `<p>${p}</p>`).join('\n  ') + '\n';
    newBody += '</div>\n\n';
  }

  // Keep any remaining content after the main sections
  const remainingContent = body
    .replace(/## Legal Term\s+[\s\S]*?(?=\n## |$)/, '')
    .replace(/## Plain English\s+[\s\S]*?(?=\n## |$)/, '')
    .replace(/## Context\s+[\s\S]*?(?=\n## |$)/, '')
    .trim();

  if (remainingContent) {
    newBody += remainingContent;
  }

  return newBody;
}

// Main execution
const files = fs.readdirSync(dictionaryDir)
  .filter(f => f.endsWith('.md'))
  .map(f => path.join(dictionaryDir, f));

console.log(`Found ${files.length} dictionary files\n`);

const results = {
  success: [],
  skipped: [],
  errors: []
};

files.forEach(file => {
  const result = convertFile(file);

  if (result.skipped) {
    results.skipped.push(result.fileName);
  } else if (result.success) {
    results.success.push(result.fileName);
    console.log(`✓ ${result.fileName}`);
  } else if (result.error) {
    results.errors.push({ fileName: result.fileName, error: result.error });
    console.log(`✗ ${result.fileName}: ${result.error}`);
  }
});

console.log(`\n=== CONVERSION COMPLETE ===`);
console.log(`Converted: ${results.success.length}`);
console.log(`Skipped: ${results.skipped.length}`);
console.log(`Errors: ${results.errors.length}`);

if (results.errors.length > 0) {
  console.log(`\nFiles with errors:`);
  results.errors.forEach(e => console.log(`  - ${e.fileName}: ${e.error}`));
}
