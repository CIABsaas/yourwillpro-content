#!/usr/bin/env node

/**
 * YourWillPro Content Scanner
 * 
 * Scans all markdown files for quality issues and generates a report.
 * 
 * USAGE:
 *   1. Place this file in your project root
 *   2. Run: node ywp-content-scanner.js ./src/content
 *   3. Check the generated report: content-scan-report.md
 * 
 * REQUIRES: Node.js 18+
 */

const fs = require('fs');
const path = require('path');

// ============================================================
// CONFIGURATION - Adjust these to your needs
// ============================================================

const CONFIG = {
  // Minimum word count before flagging as "thin content"
  minWordCount: 100,
  
  // File extensions to scan
  extensions: ['.md', '.mdx'],
  
  // Directories to skip
  skipDirs: ['node_modules', '.git', 'dist', '.astro'],
  
  // Required frontmatter fields (adjust to match your schema)
  requiredFrontmatter: ['title', 'description'],
  
  // Placeholder patterns to flag
  placeholderPatterns: [
    /lorem ipsum/gi,
    /\bTBC\b/g,
    /\bTBD\b/g,
    /\bXXX+\b/g,
    /\bTODO\b/gi,
    /\bFIXME\b/gi,
    /\[insert/gi,
    /\[add/gi,
    /\[your/gi,
    /coming soon/gi,
    /placeholder/gi,
  ],
  
  // CTA patterns (at least one should be present)
  ctaPatterns: [
    /get started/gi,
    /start your will/gi,
    /learn more/gi,
    /read more/gi,
    /contact us/gi,
    /sign up/gi,
    /create your/gi,
    /button/gi,
    /href.*cta/gi,
  ],
  
  // Spelling of key terms (case-insensitive check, correct version first)
  keyTermSpelling: [
    { correct: 'YourWillPro', wrong: ['yourwillpro', 'your will pro', 'YourWillpro', 'Your Will Pro'] },
    { correct: 'Power of Attorney', wrong: ['power of attorney', 'Power of attorney', 'POA'] },
    { correct: 'beneficiary', wrong: ['benificiary', 'beneficary', 'benificiary'] },
    { correct: 'executor', wrong: ['executer', 'executar'] },
    { correct: 'intestate', wrong: ['intestat', 'intesate'] },
    { correct: 'probate', wrong: ['probat', 'porbate'] },
    { correct: 'testator', wrong: ['testater', 'testattor'] },
    { correct: 'codicil', wrong: ['codicle', 'codocil'] },
    { correct: 'bequest', wrong: ['beqeust', 'bequst'] },
  ],
};

// ============================================================
// SCANNER LOGIC
// ============================================================

const issues = {
  critical: [],
  high: [],
  medium: [],
  low: [],
};

const stats = {
  totalFiles: 0,
  totalWords: 0,
  filesWithIssues: 0,
  issueCount: 0,
};

const allTitles = new Map(); // For duplicate detection
const allFiles = []; // For link checking

/**
 * Recursively find all content files
 */
function findFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      if (!CONFIG.skipDirs.includes(file)) {
        findFiles(filePath, fileList);
      }
    } else if (CONFIG.extensions.includes(path.extname(file).toLowerCase())) {
      fileList.push(filePath);
    }
  }
  
  return fileList;
}

/**
 * Parse frontmatter from markdown content
 */
function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;
  
  const frontmatter = {};
  const lines = match[1].split('\n');
  
  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();
      // Remove quotes
      value = value.replace(/^["']|["']$/g, '');
      frontmatter[key] = value;
    }
  }
  
  return frontmatter;
}

/**
 * Get content without frontmatter
 */
function getContent(content) {
  return content.replace(/^---\n[\s\S]*?\n---\n*/, '');
}

/**
 * Count words in content
 */
function countWords(text) {
  return text.split(/\s+/).filter(word => word.length > 0).length;
}

/**
 * Find internal links in content
 */
function findInternalLinks(content) {
  const links = [];
  const regex = /\[([^\]]*)\]\(([^)]*)\)/g;
  let match;
  
  while ((match = regex.exec(content)) !== null) {
    const url = match[2];
    if (url.startsWith('/') || url.startsWith('./') || url.startsWith('../')) {
      links.push(url);
    }
  }
  
  // Also check href attributes
  const hrefRegex = /href=["']([^"']*?)["']/g;
  while ((match = hrefRegex.exec(content)) !== null) {
    const url = match[1];
    if (url.startsWith('/') || url.startsWith('./') || url.startsWith('../')) {
      links.push(url);
    }
  }
  
  return links;
}

/**
 * Check a single file for issues
 */
function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const frontmatter = parseFrontmatter(content);
  const bodyContent = getContent(content);
  const wordCount = countWords(bodyContent);
  const fileIssues = [];
  
  const relativePath = filePath.replace(process.cwd(), '');
  
  // Track for stats
  stats.totalFiles++;
  stats.totalWords += wordCount;
  
  // ---- CRITICAL CHECKS ----
  
  // Missing frontmatter entirely
  if (!frontmatter) {
    fileIssues.push({
      severity: 'critical',
      file: relativePath,
      issue: 'Missing frontmatter',
      details: 'File has no frontmatter block (---)'
    });
  } else {
    // Missing required frontmatter fields
    for (const field of CONFIG.requiredFrontmatter) {
      if (!frontmatter[field] || frontmatter[field].trim() === '') {
        fileIssues.push({
          severity: 'critical',
          file: relativePath,
          issue: `Missing required field: ${field}`,
          details: `Frontmatter is missing "${field}" or it's empty`
        });
      }
    }
    
    // Duplicate titles
    if (frontmatter.title) {
      if (allTitles.has(frontmatter.title.toLowerCase())) {
        fileIssues.push({
          severity: 'high',
          file: relativePath,
          issue: 'Duplicate title',
          details: `Title "${frontmatter.title}" also used in: ${allTitles.get(frontmatter.title.toLowerCase())}`
        });
      } else {
        allTitles.set(frontmatter.title.toLowerCase(), relativePath);
      }
    }
    
    // Very short description
    if (frontmatter.description && frontmatter.description.length < 50) {
      fileIssues.push({
        severity: 'medium',
        file: relativePath,
        issue: 'Short meta description',
        details: `Description is only ${frontmatter.description.length} chars (recommend 120-160)`
      });
    }
    
    // Very long description
    if (frontmatter.description && frontmatter.description.length > 160) {
      fileIssues.push({
        severity: 'low',
        file: relativePath,
        issue: 'Long meta description',
        details: `Description is ${frontmatter.description.length} chars (recommend 120-160, will be truncated in search)`
      });
    }
  }
  
  // ---- HIGH PRIORITY CHECKS ----
  
  // Thin content
  if (wordCount < CONFIG.minWordCount) {
    fileIssues.push({
      severity: 'high',
      file: relativePath,
      issue: 'Thin content',
      details: `Only ${wordCount} words (minimum: ${CONFIG.minWordCount})`
    });
  }
  
  // Placeholder text
  for (const pattern of CONFIG.placeholderPatterns) {
    const matches = bodyContent.match(pattern);
    if (matches) {
      fileIssues.push({
        severity: 'high',
        file: relativePath,
        issue: 'Placeholder text found',
        details: `Found: "${matches[0]}" (${matches.length} occurrence${matches.length > 1 ? 's' : ''})`
      });
    }
  }
  
  // ---- MEDIUM PRIORITY CHECKS ----
  
  // No CTA (only for longer content)
  if (wordCount > 200) {
    let hasCta = false;
    for (const pattern of CONFIG.ctaPatterns) {
      if (pattern.test(bodyContent)) {
        hasCta = true;
        break;
      }
    }
    if (!hasCta) {
      fileIssues.push({
        severity: 'medium',
        file: relativePath,
        issue: 'No call-to-action found',
        details: 'Consider adding a CTA for conversion'
      });
    }
  }
  
  // Heading structure issues
  const h1Matches = bodyContent.match(/^# [^\n]+/gm);
  if (h1Matches && h1Matches.length > 1) {
    fileIssues.push({
      severity: 'medium',
      file: relativePath,
      issue: 'Multiple H1 headings',
      details: `Found ${h1Matches.length} H1 headings (should only have 1)`
    });
  }
  
  // Check for heading level skips (e.g., H1 -> H3)
  const headings = bodyContent.match(/^#{1,6} /gm);
  if (headings) {
    let prevLevel = 0;
    for (const heading of headings) {
      const level = heading.trim().length - 1; // Count #s
      if (level > prevLevel + 1 && prevLevel > 0) {
        fileIssues.push({
          severity: 'medium',
          file: relativePath,
          issue: 'Heading level skip',
          details: `Jumped from H${prevLevel} to H${level} (bad for accessibility/SEO)`
        });
        break; // Only report once per file
      }
      prevLevel = level;
    }
  }
  
  // ---- LOW PRIORITY CHECKS ----
  
  // Spelling of key terms
  for (const term of CONFIG.keyTermSpelling) {
    for (const wrongSpelling of term.wrong) {
      const regex = new RegExp(`\\b${wrongSpelling}\\b`, 'g');
      if (regex.test(bodyContent)) {
        fileIssues.push({
          severity: 'low',
          file: relativePath,
          issue: 'Key term spelling',
          details: `Found "${wrongSpelling}" - should be "${term.correct}"`
        });
      }
    }
  }
  
  // Very long paragraphs (walls of text)
  const paragraphs = bodyContent.split(/\n\n+/);
  for (const para of paragraphs) {
    const paraWords = countWords(para);
    if (paraWords > 200) {
      fileIssues.push({
        severity: 'low',
        file: relativePath,
        issue: 'Long paragraph',
        details: `Paragraph with ${paraWords} words - consider breaking up for readability`
      });
      break; // Only report once per file
    }
  }
  
  // Store issues by severity
  for (const issue of fileIssues) {
    issues[issue.severity].push(issue);
    stats.issueCount++;
  }
  
  if (fileIssues.length > 0) {
    stats.filesWithIssues++;
  }
  
  // Track file for link checking
  allFiles.push({
    path: filePath,
    relativePath,
    links: findInternalLinks(content)
  });
}

/**
 * Check for broken internal links
 */
function checkBrokenLinks() {
  const allPaths = new Set(allFiles.map(f => f.relativePath));
  
  for (const file of allFiles) {
    for (const link of file.links) {
      // Normalize link path
      let normalizedLink = link
        .split('#')[0] // Remove anchors
        .split('?')[0] // Remove query strings
        .replace(/\/$/, ''); // Remove trailing slash
      
      // Skip external links and anchors
      if (normalizedLink.startsWith('http') || normalizedLink === '') continue;
      
      // This is a simplified check - may need adjustment based on your routing
      // For Astro content collections, the URL structure may differ from file paths
      // This just flags potential issues for manual review
      
      // Check if it looks like a broken relative link
      if (normalizedLink.startsWith('./') || normalizedLink.startsWith('../')) {
        const resolvedPath = path.resolve(path.dirname(file.path), normalizedLink);
        const relativePath = resolvedPath.replace(process.cwd(), '');
        
        // Check common extensions
        const possiblePaths = [
          relativePath,
          relativePath + '.md',
          relativePath + '.mdx',
          relativePath + '/index.md',
          relativePath + '/index.mdx',
        ];
        
        const exists = possiblePaths.some(p => {
          try {
            fs.accessSync(process.cwd() + p);
            return true;
          } catch {
            return false;
          }
        });
        
        if (!exists) {
          issues.medium.push({
            severity: 'medium',
            file: file.relativePath,
            issue: 'Potentially broken link',
            details: `Link "${link}" may be broken (verify manually)`
          });
          stats.issueCount++;
        }
      }
    }
  }
}

/**
 * Generate the report
 */
function generateReport(outputPath) {
  const lines = [];
  
  lines.push('# YourWillPro Content Scan Report');
  lines.push('');
  lines.push(`**Generated:** ${new Date().toISOString()}`);
  lines.push('');
  lines.push('---');
  lines.push('');
  
  // Summary
  lines.push('## Summary');
  lines.push('');
  lines.push('| Metric | Value |');
  lines.push('|--------|-------|');
  lines.push(`| Total files scanned | ${stats.totalFiles} |`);
  lines.push(`| Total word count | ${stats.totalWords.toLocaleString()} |`);
  lines.push(`| Files with issues | ${stats.filesWithIssues} |`);
  lines.push(`| Total issues found | ${stats.issueCount} |`);
  lines.push('');
  
  // Issue counts by severity
  lines.push('| Severity | Count |');
  lines.push('|----------|-------|');
  lines.push(`| 🔴 Critical | ${issues.critical.length} |`);
  lines.push(`| 🟠 High | ${issues.high.length} |`);
  lines.push(`| 🟡 Medium | ${issues.medium.length} |`);
  lines.push(`| 🟢 Low | ${issues.low.length} |`);
  lines.push('');
  
  // Critical issues
  if (issues.critical.length > 0) {
    lines.push('---');
    lines.push('');
    lines.push('## 🔴 Critical Issues');
    lines.push('');
    lines.push('*These must be fixed before launch.*');
    lines.push('');
    for (const issue of issues.critical) {
      lines.push(`### ${issue.file}`);
      lines.push(`**Issue:** ${issue.issue}`);
      lines.push(`**Details:** ${issue.details}`);
      lines.push('');
    }
  }
  
  // High priority issues
  if (issues.high.length > 0) {
    lines.push('---');
    lines.push('');
    lines.push('## 🟠 High Priority Issues');
    lines.push('');
    lines.push('*Should be fixed before launch.*');
    lines.push('');
    for (const issue of issues.high) {
      lines.push(`### ${issue.file}`);
      lines.push(`**Issue:** ${issue.issue}`);
      lines.push(`**Details:** ${issue.details}`);
      lines.push('');
    }
  }
  
  // Medium priority issues
  if (issues.medium.length > 0) {
    lines.push('---');
    lines.push('');
    lines.push('## 🟡 Medium Priority Issues');
    lines.push('');
    lines.push('*Fix when possible, not launch blockers.*');
    lines.push('');
    
    // Group by file to reduce noise
    const byFile = new Map();
    for (const issue of issues.medium) {
      if (!byFile.has(issue.file)) byFile.set(issue.file, []);
      byFile.get(issue.file).push(issue);
    }
    
    for (const [file, fileIssues] of byFile) {
      lines.push(`### ${file}`);
      for (const issue of fileIssues) {
        lines.push(`- **${issue.issue}:** ${issue.details}`);
      }
      lines.push('');
    }
  }
  
  // Low priority issues
  if (issues.low.length > 0) {
    lines.push('---');
    lines.push('');
    lines.push('## 🟢 Low Priority Issues');
    lines.push('');
    lines.push('*Nice to fix, not urgent.*');
    lines.push('');
    
    // Group by file
    const byFile = new Map();
    for (const issue of issues.low) {
      if (!byFile.has(issue.file)) byFile.set(issue.file, []);
      byFile.get(issue.file).push(issue);
    }
    
    for (const [file, fileIssues] of byFile) {
      lines.push(`### ${file}`);
      for (const issue of fileIssues) {
        lines.push(`- **${issue.issue}:** ${issue.details}`);
      }
      lines.push('');
    }
  }
  
  // No issues!
  if (stats.issueCount === 0) {
    lines.push('## ✅ No Issues Found!');
    lines.push('');
    lines.push('All scanned files passed the quality checks.');
  }
  
  // Write report
  fs.writeFileSync(outputPath, lines.join('\n'));
  console.log(`\nReport saved to: ${outputPath}`);
}

// ============================================================
// MAIN
// ============================================================

function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('YourWillPro Content Scanner');
    console.log('===========================');
    console.log('');
    console.log('Usage: node ywp-content-scanner.js <content-directory>');
    console.log('');
    console.log('Example: node ywp-content-scanner.js ./src/content');
    console.log('');
    process.exit(1);
  }
  
  const contentDir = args[0];
  
  if (!fs.existsSync(contentDir)) {
    console.error(`Error: Directory not found: ${contentDir}`);
    process.exit(1);
  }
  
  console.log('YourWillPro Content Scanner');
  console.log('===========================');
  console.log('');
  console.log(`Scanning: ${contentDir}`);
  console.log('');
  
  // Find all files
  const files = findFiles(contentDir);
  console.log(`Found ${files.length} content files`);
  
  // Check each file
  console.log('Scanning for issues...');
  for (const file of files) {
    checkFile(file);
  }
  
  // Check for broken links
  console.log('Checking internal links...');
  checkBrokenLinks();
  
  // Generate report
  const reportPath = path.join(process.cwd(), 'content-scan-report.md');
  generateReport(reportPath);
  
  // Print summary
  console.log('');
  console.log('SUMMARY');
  console.log('-------');
  console.log(`Files scanned:    ${stats.totalFiles}`);
  console.log(`Total words:      ${stats.totalWords.toLocaleString()}`);
  console.log(`Files with issues: ${stats.filesWithIssues}`);
  console.log('');
  console.log(`🔴 Critical: ${issues.critical.length}`);
  console.log(`🟠 High:     ${issues.high.length}`);
  console.log(`🟡 Medium:   ${issues.medium.length}`);
  console.log(`🟢 Low:      ${issues.low.length}`);
  console.log('');
  
  if (issues.critical.length > 0) {
    console.log('⚠️  CRITICAL ISSUES FOUND - Review report immediately');
  } else if (issues.high.length > 0) {
    console.log('⚠️  High priority issues found - Review before launch');
  } else {
    console.log('✅ No critical issues found');
  }
}

main();
