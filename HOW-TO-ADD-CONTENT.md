# How to Add Content to YourWillPro

This guide explains how to add and update content on the YourWillPro site.

## Table of Contents

- [Getting Started](#getting-started)
- [Adding a New User Story](#adding-a-new-user-story)
- [Adding a New Guide](#adding-a-new-guide)
- [Adding a Dictionary Term](#adding-a-dictionary-term)
- [Adding a Common Question](#adding-a-common-question)
- [Adding/Updating Images](#addingupdating-images)
- [General Instructions](#general-instructions)

---

## Getting Started

### Prerequisites

- Node.js installed
- Text editor (VS Code recommended)
- Basic understanding of Markdown
- Access to the repository

### File Structure

```
yourwillpro-content/
├── src/
│   ├── content/
│   │   ├── user-stories/        # User story markdown files
│   │   ├── guides/               # Guide markdown files
│   │   ├── dictionary/           # Dictionary term files
│   │   └── common-questions/     # FAQ markdown files
│   └── pages/                    # Standalone pages
└── public/
    └── images/
        ├── stories/              # Story hero images
        ├── guides/               # Guide hero images (needs creation)
        ├── hero/                 # Homepage hero images
        ├── ui/                   # UI element images
        ├── logo/                 # Logo files
        └── og/                   # Open Graph images
```

---

## Adding a New User Story

### 1. File Location

Create a new markdown file in:
```
src/content/user-stories/your-story-slug.md
```

**Naming Convention:**
- Use lowercase with hyphens
- Be descriptive but concise
- Example: `five-siblings-one-executor.md`

### 2. Required Frontmatter

```yaml
---
title: "Your Story Title Here"
slug: "your-story-slug"
category: "Stories"
issue: "Executor Conflict"  # or "Will Contest", "Family Dispute", "Probate Delay", etc.
jurisdiction: "AU"  # or "UK", "US"
group: "These families learned the hard way"  # or "These families got it right"
order: 1  # Display order (lower numbers appear first)
status: "published"  # or "draft"
featured: true  # or false (only one featured story at a time)
summary: "Brief one-sentence summary that appears in story cards and previews."
heroImage: "/images/stories/your-story-slug.png"
readTime: "10 min read"
---
```

### 3. Content Structure

After the frontmatter, structure your story with:

```markdown
## Opening Section

Brief context-setting paragraph explaining the situation.

<div class="pull-quote">
  <p>"Compelling quote from the story."</p>
</div>

---

## What Went Wrong (or Right)

Main narrative sections...

<div class="stat-block">
  <div class="stat-item">
    <div class="stat-number">2010</div>
    <div class="stat-label">Key Date</div>
  </div>
</div>

---

## The Lesson

Key takeaways and what readers should learn...

---

## Related Topics

- [Executor](/dictionary/executor)
- [Probate Process](/dictionary/probate-process)
- [Who should I choose as my executor?](/common-questions/who-should-i-choose-as-my-executor)
```

### 4. Image Requirements

**Location:** `public/images/stories/your-story-slug.png`

**Specifications:**
- Dimensions: 1536x1024 pixels (or 3:2 aspect ratio)
- Format: PNG or JPG
- File size: Under 500 KB (compress if larger)
- Alt text: Will be auto-generated from title

**Naming:** Must match your slug exactly
- Slug: `five-siblings-one-executor`
- Image: `five-siblings-one-executor.png`

### 5. Mark as Featured

To feature a story on the homepage:

1. Set `featured: true` in your story's frontmatter
2. Update `src/pages/index.astro` (lines ~1300-1310):
   - Update the featured story title
   - Update the summary text
   - Update the quote in the pullquote overlay
   - Update the link URL

**Important:** Only ONE story should have `featured: true` at a time.

### 6. Build and Test

```bash
# Start dev server
npm run dev

# View at http://localhost:4321/user-stories/your-story-slug

# Check user stories index
# http://localhost:4321/user-stories/

# Build for production
npm run build

# Check for errors in output
```

---

## Adding a New Guide

### 1. File Location

Create a new markdown file in:
```
src/content/guides/your-guide-slug.md
```

**Naming Convention:**
- Descriptive and clear
- Lowercase with hyphens
- Example: `protecting-your-beneficiaries.md`

### 2. Required Frontmatter

```yaml
---
title: "Your Guide Title Here"
slug: "your-guide-slug"
summary: "Brief description for guide cards and meta descriptions."
category: "Guides"
guideCategory: "Getting Started"  # See categories below
status: "published"  # or "draft"
readTime: "12 min read"
difficulty: "Intermediate"  # Beginner, Intermediate, or Advanced
updated: "2025-01-09"  # YYYY-MM-DD format
order: 10  # Display order within category
heroImage: "/images/guides/your-guide-slug.jpg"  # Optional
ogImage: "https://yourwillpro.com.au/images/og/og-default.png"
relatedGuides:
  - "related-guide-slug-1"
  - "related-guide-slug-2"
relatedQuestions:
  - "related-question-slug-1"
  - "related-question-slug-2"
---
```

### 3. Guide Categories

Choose one:
- `Getting Started` - Introductory guides for beginners
- `Essential Knowledge` - Core concepts everyone should know
- `Special Situations` - Specific scenarios (blended families, trusts, etc.)
- `Advanced Planning` - Complex estate planning topics

### 4. Content Structure

```markdown
Opening paragraph introducing the guide topic and who it's for.

## Main Section Heading

Content organized into clear sections...

<div class="warning-box">
  <h4>Important Warning</h4>
  <p>Critical information readers need to know.</p>
</div>

### Subsection

More detailed content...

## Key Takeaways

- Bullet point summary
- Key lessons learned
- Action items

## When to Seek Professional Legal Advice

Standard section for complex topics...

---

## Related Topics

- [Dictionary Term](/dictionary/term-slug)
- [Related Question](/common-questions/question-slug)
- [Related Guide](/guides/guide-slug)
```

### 5. Image Requirements

**Location:** `public/images/guides/your-guide-slug.jpg`

**Note:** The `/public/images/guides/` directory needs to be created first:
```bash
mkdir -p public/images/guides
```

**Specifications:**
- Dimensions: 1200x630 pixels (recommended)
- Format: JPG or PNG
- File size: Under 300 KB
- Alt text: Auto-generated from title

### 6. Link Related Content

Use slugs (not full URLs) in frontmatter:

```yaml
relatedGuides:
  - "choosing-the-right-type-of-will"
  - "how-to-choose-the-right-executor"
relatedQuestions:
  - "can-i-exclude-someone-who-expects-to-inherit"
  - "how-do-i-reduce-chance-of-will-being-contested"
```

### 7. Build and Test

```bash
npm run dev
# View at http://localhost:4321/guides/your-guide-slug

npm run build
```

---

## Adding a Dictionary Term

### 1. File Location

Create a new markdown file in:
```
src/content/dictionary/term-slug.md
```

**Naming Convention:**
- Single term or short phrase
- Lowercase with hyphens
- Example: `executor.md`, `power-of-attorney.md`

### 2. Required Frontmatter

```yaml
---
title: "Term Name"
slug: "term-slug"
category: "Dictionary"
order: 0  # Alphabetical order (usually 0 for auto-sort)
summary: "One-sentence definition that appears in search results."
pronunciation: "/ɪɡˈzɛkjətə/"  # Optional phonetic pronunciation
wordType: "noun"  # noun, verb, phrase, etc.
relatedTerms: ["related-term-1", "related-term-2"]
relatedStory: "related-story-slug"  # Optional
status: "published"
---
```

### 3. Content Structure

```markdown
<div class="two-column">
  <div class="column-card legal-column">
    <h3>Legal Definition</h3>
    <p>Formal legal definition of the term.</p>
  </div>

  <div class="column-card plain-column">
    <h3>In Plain English</h3>
    <p>Simple explanation anyone can understand.</p>
  </div>
</div>

## Why This Matters

Practical explanation of why this term is important...

## Common Misconceptions

- **Myth:** People think X
- **Reality:** Actually Y

## Example

Real-world example showing the term in use...

## Related Terms

Links to related dictionary entries...
```

### 4. Alphabetical Organization

Terms are automatically sorted alphabetically by title. The `order: 0` field is standard for dictionary terms.

### 5. Build and Test

```bash
npm run dev
# View at http://localhost:4321/dictionary/term-slug
# Check dictionary index at http://localhost:4321/dictionary/

npm run build
```

---

## Adding a Common Question

### 1. File Location

Create a new markdown file in:
```
src/content/common-questions/000-your-question-slug.md
```

**Naming Convention:**
- Start with a number prefix (for ordering)
- Use descriptive slug
- Example: `150-can-i-exclude-someone-who-expects-to-inherit.md`

### 2. Required Frontmatter

```yaml
---
title: "Your Question in Full?"
slug: "your-question-slug"
summary: "Brief preview of the answer."
category: "Common Questions"
status: "published"
order: 150  # Display order (matches filename prefix)
---
```

### 3. Answer Format

```markdown
Brief direct answer to the question in the first paragraph.

## Detailed Explanation

More comprehensive answer with:

### Subsection 1

Detailed information...

### Subsection 2

More context...

## Key Points

- Important takeaway 1
- Important takeaway 2
- Important takeaway 3

## Related Questions

- [Related Question 1](/common-questions/related-slug-1)
- [Related Question 2](/common-questions/related-slug-2)

## Related Topics

- [Dictionary Term](/dictionary/term-slug)
- [Guide](/guides/guide-slug)
```

### 4. Category Options

Currently all questions use:
```yaml
category: "Common Questions"
```

You can create subcategories if needed in the future.

### 5. Build and Test

```bash
npm run dev
# View at http://localhost:4321/common-questions/your-question-slug
# Check questions index at http://localhost:4321/common-questions/

npm run build
```

---

## Adding/Updating Images

### Image Locations

```
public/images/
├── stories/              # User story hero images
│   └── story-slug.png    # 1536x1024, PNG/JPG
├── guides/               # Guide hero images (CREATE THIS)
│   └── guide-slug.jpg    # 1200x630, JPG/PNG
├── hero/                 # Homepage hero cards
│   └── hero-*.webp       # Optimized webp format
├── ui/                   # UI elements (stats, explore, etc.)
│   └── *.png             # Various sizes
├── logo/                 # Site logos
│   ├── ywp-logo.png      # 32x32 favicon
│   └── ywp-logo-trans.png # Full transparent logo
└── og/                   # Open Graph social sharing
    └── og-default.png    # 1200x630
```

### Naming Conventions

**Stories:** Must match slug exactly
- File: `src/content/user-stories/my-story.md`
- Image: `public/images/stories/my-story.png`

**Guides:** Must match slug exactly
- File: `src/content/guides/my-guide.md`
- Image: `public/images/guides/my-guide.jpg`

**General:**
- Use lowercase
- Use hyphens, not spaces or underscores
- Be descriptive: `executor-conflict.png` not `img1.png`

### Recommended Dimensions

| Type | Dimensions | Format | Max Size |
|------|-----------|--------|----------|
| Story Hero | 1536x1024 | PNG/JPG | 500 KB |
| Guide Hero | 1200x630 | JPG/PNG | 300 KB |
| OG Image | 1200x630 | PNG | 200 KB |
| Favicon | 32x32 | PNG | 10 KB |
| Hero Cards | Varies | WebP | 100 KB |
| UI Elements | Varies | PNG | 200 KB |

### How to Reference in Content

**In Frontmatter:**
```yaml
heroImage: "/images/stories/my-story.png"
```

**In Markdown:**
```markdown
![Alt text](/images/ui/example.png)
```

**In Astro/HTML:**
```html
<img src="/images/logo/ywp-logo-trans.png" alt="YourWillPro">
```

### Alt Text Requirements

- Descriptive and specific
- Include key information
- Under 125 characters
- Don't start with "Image of" or "Picture of"

**Good:** "Family reviewing estate planning documents together"
**Bad:** "Image of people"

### Image Optimization

Before adding images:

1. **Compress:** Use TinyPNG, Squoosh, or similar
2. **Resize:** Match recommended dimensions exactly
3. **Format:**
   - Photos: JPG (quality 80-90%)
   - Graphics/logos: PNG
   - Hero cards: WebP (for performance)

### WebP Conversion (Optional)

For best performance on hero images:

```bash
# Install cwebp (macOS)
brew install webp

# Convert image
cwebp -q 85 input.jpg -o output.webp
```

---

## General Instructions

### Running the Development Server

```bash
# Navigate to project directory
cd /Users/donmacintosh/Desktop/yourwillpro-content

# Install dependencies (first time only)
npm install

# Start dev server
npm run dev

# Site will be available at:
# http://localhost:4321

# Stop server: Ctrl+C
```

### Building for Production

```bash
# Full production build
npm run build

# Output will be in:
# dist/

# Check for errors in terminal output
# Build must succeed with no errors before deploying
```

### Deployment Process

```bash
# 1. Stage your changes
git add .

# 2. Commit with descriptive message
git commit -m "Add new guide: Protecting Your Beneficiaries"

# 3. Push to repository
git push origin production

# 4. Site will auto-deploy from production branch
```

### Checking for Errors

**During Development:**
- Watch terminal for error messages
- Check browser console (F12 → Console)
- Hot reload should work (changes appear immediately)

**During Build:**
- Read all error messages carefully
- Most common errors:
  - Missing images referenced in frontmatter
  - Invalid YAML in frontmatter
  - Broken internal links
  - Missing related content

**Testing Checklist:**
- [ ] Page loads without errors
- [ ] All images display correctly
- [ ] Links work (internal and external)
- [ ] Related content appears
- [ ] Mobile responsive (test at different widths)
- [ ] Meta tags correct (check page source)

### Common Issues

**Issue:** "Cannot find module '@astrojs/...'"
**Fix:** Run `npm install`

**Issue:** Image not displaying
**Fix:**
- Check filename matches frontmatter exactly
- Verify image exists in correct directory
- Check path starts with `/images/`

**Issue:** Frontmatter error
**Fix:**
- Ensure proper YAML syntax
- Check for smart quotes (" ") instead of straight quotes (" ")
- Verify all required fields present

**Issue:** Related content not showing
**Fix:**
- Use slug only, not full URL
- Verify referenced content exists and is published
- Check slug matches exactly (case-sensitive)

---

## Quick Reference

### Frontmatter Cheat Sheet

**User Story:**
```yaml
title, slug, category: "Stories", issue, jurisdiction, group,
order, status, featured, summary, heroImage, readTime
```

**Guide:**
```yaml
title, slug, summary, category: "Guides", guideCategory, status,
readTime, difficulty, updated, order, heroImage, relatedGuides,
relatedQuestions
```

**Dictionary Term:**
```yaml
title, slug, category: "Dictionary", order: 0, summary,
pronunciation, wordType, relatedTerms, status
```

**Common Question:**
```yaml
title, slug, summary, category: "Common Questions",
status, order
```

### Essential Commands

```bash
npm run dev         # Start development server
npm run build       # Build for production
git add .           # Stage changes
git commit -m "..."  # Commit changes
git push            # Deploy to production
```

### File Naming Examples

```
✓ five-siblings-one-executor.md
✓ protecting-your-beneficiaries.md
✓ can-i-exclude-someone.md

✗ Five Siblings One Executor.md  (spaces, capitals)
✗ newstory.md                     (not descriptive)
✗ story_2025.md                   (underscores)
```

---

## Getting Help

**Documentation:**
- This guide: `HOW-TO-ADD-CONTENT.md`
- Audit reports: `AUDIT-SUMMARY.md`
- CSV guide: `CSV-GUIDE.md`

**Regenerate Audit:**
```bash
python3 generate-audit.py
```

**Test Your Changes:**
Always test locally with `npm run dev` before deploying!

---

*Last Updated: January 2025*
