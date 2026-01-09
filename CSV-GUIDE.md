# CSV Files Quick Reference Guide

This guide explains what's in each CSV file and how to use them.

---

## 1. user-stories-audit.csv (15 stories)

**Columns:**
- Title
- Filename
- Slug
- Summary
- Issue (category)
- Jurisdiction
- Hero Image
- Status
- Read Time
- Last Modified

**Use Cases:**
- Identify stories missing hero images
- Track story categories and jurisdictions
- Plan content updates
- Verify all stories are published
- Check read time distribution

**Issues Found:**
- 2 stories missing hero images
- 1 story with broken hero image reference

---

## 2. guides-audit.csv (11 guides)

**Columns:**
- Title
- Filename
- Slug
- Summary
- Category
- Difficulty
- Hero Image
- Status
- Read Time
- Last Modified

**Use Cases:**
- Track content by difficulty level
- Identify guides needing hero images
- Balance content across difficulty levels
- Update guide metadata

**Issues Found:**
- 1 guide with broken hero image reference (directory doesn't exist)
- 10 guides missing hero images

**Distribution:**
- Beginner: 4
- Intermediate: 5
- Advanced: 1
- Not specified: 1

---

## 3. questions-audit.csv (90 questions)

**Columns:**
- Title
- Filename
- Slug
- Summary
- Category
- Status
- Last Modified

**Use Cases:**
- Inventory of all Q&A content
- Find questions by topic
- Track question updates
- Identify gaps in coverage

**Notes:**
- Mix of general and persona-specific questions
- Some files have numbered prefixes
- All marked as "Common Questions" category

---

## 4. images-stories-audit.csv (11 images)

**Columns:**
- Filename
- Used In (which story uses it)
- Dimensions
- File Size (KB)
- Last Modified

**Use Cases:**
- Find unused images
- Track image-to-content mapping
- Identify large files for optimization
- Clean up orphaned images

**Issues Found:**
- 1 unused image: six-siblings-zero-trust.png

**Stats:**
- Most images: 1536x1024
- Size range: 1.2 MB - 2.7 MB
- All PNG format

---

## 5. images-guides-audit.csv (0 images)

**Status:** Directory doesn't exist

**Issue:**
- The /public/images/guides/ directory is missing
- One guide references an image in this directory
- Need to either create directory or update guide

---

## 6. images-other-audit.csv (28 images)

**Columns:**
- Filename
- Location (subdirectory)
- Purpose
- Dimensions
- File Size (KB)
- Last Modified

**Directories Included:**
- root (5 images): Brand assets
- hero (5 images): Section hero images
- logo (2 images): Logo variants
- og (1 image): Open Graph image
- ui (15 images): UI elements

**Use Cases:**
- Inventory all support images
- Track logo usage
- Identify optimization opportunities
- Manage brand assets

**Optimization Opportunities:**
- Hero images: Already optimized (webp, 18-47 KB)
- UI images: Could be optimized (1.7-2.9 MB each)

---

## 7. standalone-pages-audit.csv (9 pages)

**Columns:**
- Page (descriptive name)
- Filename
- Location
- Description
- Last Modified

**Pages Tracked:**
- Homepage
- About
- Our Story
- Feedback
- Start Here
- Privacy Policy
- Terms of Service
- Disclaimer
- Sitemap

**Use Cases:**
- Track core page updates
- Ensure all critical pages exist
- Monitor page modification dates
- Plan page content updates

**Status:** All 9 pages found and present

---

## How to Import to Excel

### Method 1: Double-Click
1. Simply double-click any .csv file
2. It should open in Excel automatically

### Method 2: Import
1. Open Excel
2. File > Import > CSV File
3. Select the CSV file
4. Follow the import wizard
5. Ensure UTF-8 encoding is selected

### Method 3: Drag & Drop
1. Open Excel
2. Drag the CSV file into Excel
3. It will create a new workbook

---

## Analyzing the Data

### Finding Issues

**Broken References:**
```
Filter user-stories-audit.csv where Hero Image contains "five-siblings"
Filter guides-audit.csv where Hero Image is not empty
```

**Unused Images:**
```
Filter images-stories-audit.csv where "Used In" = "Not found"
```

**Large Files:**
```
Sort images-stories-audit.csv by "File Size (KB)" descending
Sort images-other-audit.csv by "File Size (KB)" descending
```

**Recent Updates:**
```
Sort any CSV by "Last Modified" descending
```

### Creating Reports

**Content by Category:**
```
Pivot Table on user-stories-audit.csv
Rows: Issue
Values: Count of Title
```

**Difficulty Distribution:**
```
Pivot Table on guides-audit.csv
Rows: Difficulty
Values: Count of Title
```

**Image Storage by Location:**
```
Pivot Table on images-other-audit.csv
Rows: Location
Values: Sum of File Size (KB)
```

---

## Maintenance Schedule

### Weekly
- Check for new content without images
- Monitor file sizes

### Monthly
- Review unused images
- Check for broken references
- Update content metadata

### Quarterly
- Re-run full audit
- Compare trends
- Plan optimization projects

---

## Re-running the Audit

To generate fresh CSV files:

```bash
cd /Users/donmacintosh/Desktop/yourwillpro-content
python3 generate-audit.py
```

This will overwrite existing CSV files with current data.

---

## Questions?

The audit script is located at:
`/Users/donmacintosh/Desktop/yourwillpro-content/generate-audit.py`

You can modify it to:
- Add new columns
- Track different metadata
- Export different formats
- Add custom analysis

---

**Generated:** January 9, 2026
