# Placeholder Images Audit
**Generated:** 2026-01-06
**Project:** YourWillPro Content Site

---

## Executive Summary

- **Total images found in /public/:** 55 files
- **Total unique image references in code:** 34
- **Placeholder/generic images:** 23 (explore-*, gallery-*, stats-*, hero-*, featured-*)
- **Missing images:** 1 (broken reference)
- **Unused images:** 4 (exist but not referenced in active code)
- **Critical issues:** 1 (filename typo)

---

## Critical Issues

### 1. BROKEN REFERENCE - Missing Image
**File Referenced:** `/images/stories/brother-in-law-did-nothing..png` (double period)
**Referenced in:** `/src/content/user-stories/brother-in-law-did-nothing.md`
**Issue:** Filename has double period (..) which doesn't match any existing file
**Actual filename exists:** `his-brother-did-nothing.png` OR needs rename
**Impact:** Hero image won't display on story page
**Fix Required:** Update frontmatter to correct filename

---

## Placeholder Images (Generic Names)

These images have generic/placeholder naming conventions and likely need to be replaced with actual content:

### Home Page - Explore Cards (6 images)
| Image | Size | Location | Used In |
|-------|------|----------|---------|
| explore-1.png | 1.83 MB | /public/images/stories/ | Home page "Stories" card |
| explore-2.png | 1.29 MB | /public/images/stories/ | Home page "Dictionary" card |
| explore-3.png | 2.38 MB | /public/images/stories/ | Home page "Questions" card |
| explore-4.png | 2.43 MB | /public/images/stories/ | Home page "Tools" card |
| explore-5.png | 2.12 MB | /public/images/stories/ | Home page "Guides" card |
| explore-6.png | 2.78 MB | /public/images/stories/ | Home page "Checklists" card |

**Used in:** `/src/pages/index.astro` lines 1231, 1245, 1259, 1273, 1287, 1301

### Home Page - Story Gallery (4 images)
| Image | Size | Location | Used In |
|-------|------|----------|---------|
| gallery-1.png | 2.30 MB | /public/images/stories/ | "Mother Took It All" card |
| gallery-2.png | 2.01 MB | /public/images/stories/ | "The Excavator & The Auction" card |
| gallery-3.png | 1.88 MB | /public/images/stories/ | "A Suspended Sentence" card |
| gallery-4.png | 2.22 MB | /public/images/stories/ | "Brother-In-Law Did Nothing" card |

**Used in:** `/src/pages/index.astro` (Story gallery section)

### Home Page - Statistics Cards (4 images)
| Image | Size | Location | Used In |
|-------|------|----------|---------|
| stats-1.png | 2.22 MB | /public/images/stories/ | "60% of adults have no will" stat |
| stats-2.png | 2.14 MB | /public/images/stories/ | "9-18 months average probate" stat |
| stats-3.png | 2.00 MB | /public/images/stories/ | "$35k avg contested will cost" stat |
| stats-4.png | 2.38 MB | /public/images/stories/ | "73% disputes avoidable" stat |

**Used in:** `/src/pages/index.astro` (Stats section)

### Home Page - Hero Images (3 images)
| Image | Size | Location | Used In |
|-------|------|----------|---------|
| hero-1.png | 2.22 MB | /public/images/stories/ | Hero section main image (backup pages) |
| hero-2.png | 2.09 MB | /public/images/stories/ | Hero section secondary image (backup pages) |
| featured-1.png | 2.22 MB | /public/images/stories/ | Featured story section (backup pages) |

**Status:** Currently only referenced in backup/test files, not in production index.astro

### Other Placeholder Images
| Image | Size | Location | Notes |
|-------|------|----------|-------|
| mum-dad-hero.png | 2.22 MB | /public/images/stories/ | Not referenced in any active code |
| she-did-it-all.png | 2.09 MB | /public/images/stories/ | Not referenced in any active code |

---

## Story Hero Images (Used in Production)

These are the hero images for published user stories:

| Story File | Image Referenced | File Exists? | Size |
|------------|------------------|--------------|------|
| a-suspended-prison-sentence.md | a-suspended-prison-sentence.png | ✅ Yes | 2.01 MB |
| brother-in-law-did-nothing.md | brother-in-law-did-nothing..png | ❌ **BROKEN** | - |
| diligence-he-did-the-work.md | diligence-he-did-the-work.png | ✅ Yes | 2.38 MB |
| incapacity-the-executor-couldnt-act.md | incapacity-the-executor-couldnt-act.png | ✅ Yes | 2.12 MB |
| mother-took-it-all.md | mother-took-it-all.png | ✅ Yes | 2.30 MB |
| public-trustee-they-were-meant-to-protect-her.md | public-trustee.png | ✅ Yes | 1.29 MB |
| six-siblings-zero-trust.md | six-siblings-zero-trust.png | ✅ Yes | 2.22 MB |
| the-court-threw-it-out.md | the-court-threw-it-out.png | ✅ Yes | 1.83 MB |
| the-excavator-and-the-auction.md | the-excavator-and-the-auction.png | ✅ Yes | 2.78 MB |
| the-house-sat-empty.md | the-house-sat-empty.png | ✅ Yes | 2.14 MB |
| transparency-she-kept-everyone-informed.md | transparency-she-kept-everyone-informed.png | ✅ Yes | 2.43 MB |

---

## Site Branding Images (Production)

| Image | Size | Location | Used In |
|-------|------|----------|---------|
| ywp-logo.png | 48.7 KB | /public/images/ | Header, Footer (all pages) |
| ywp-logo.png | 48.7 KB | /public/ | Favicon fallback |
| favicon.svg | Small | /public/ | Site favicon (all pages) |

**Status:** ✅ Working correctly

---

## Unused Images (Not Referenced in Active Code)

These files exist but are not referenced in any active .astro or .md files:

1. **his-brother-did-nothing.png** (1.88 MB) - Possible correct filename for broken reference
2. **mum-dad-hero.png** (2.22 MB) - No active references
3. **she-did-it-all.png** (2.09 MB) - No active references
4. **hero-1.png, hero-2.png, featured-1.png** - Only in backup/test files

---

## Backup/Archive Images

### In `/public/images/stories/60% opaque/` (11 images)
Appears to be older versions with opacity adjustments. Not currently used.

### In `/public/images/stories/originals/` (10 images)
Original versions of story hero images before processing. Not currently used in production.

### Backup Files (3 files)
- hero-1.png.bak
- mum-dad-hero.png.old
- the-court-threw-it-out.png.old

**Recommendation:** Move to an `/archive/` folder or delete if no longer needed.

---

## All Images by Location

### `/public/` (3 files)
- favicon.svg ✅ Active
- robots.txt (not an image)
- ywp-logo.png ✅ Active

### `/public/images/` (2 files)
- .DS_Store (system file)
- ywp-logo.png ✅ Active

### `/public/images/stories/` (36 files + 2 subfolders)

**Active Production Images (11):**
- a-suspended-prison-sentence.png ✅
- diligence-he-did-the-work.png ✅
- incapacity-the-executor-couldnt-act.png ✅
- mother-took-it-all.png ✅
- public-trustee.png ✅
- six-siblings-zero-trust.png ✅
- the-court-threw-it-out.png ✅
- the-excavator-and-the-auction.png ✅
- the-house-sat-empty.png ✅
- transparency-she-kept-everyone-informed.png ✅

**Placeholder/Generic Images (17):**
- explore-1.png through explore-6.png (6 files) 🔶 PLACEHOLDER
- gallery-1.png through gallery-4.png (4 files) 🔶 PLACEHOLDER
- stats-1.png through stats-4.png (4 files) 🔶 PLACEHOLDER
- hero-1.png, hero-2.png (2 files) 🔶 PLACEHOLDER (backup only)
- featured-1.png (1 file) 🔶 PLACEHOLDER (backup only)

**Unused Images (4):**
- his-brother-did-nothing.png ⚠️ Not referenced (possible correct filename)
- mum-dad-hero.png ⚠️ Not referenced
- she-did-it-all.png ⚠️ Not referenced

**Backup Files (3):**
- hero-1.png.bak
- mum-dad-hero.png.old
- the-court-threw-it-out.png.old

---

## Image References in Code

### Active Production Files

**`/src/pages/index.astro`:**
- Background images: explore-1 through explore-6, gallery-1 through gallery-4, stats-1 through stats-4
- Logo: /images/ywp-logo.png

**`/src/components/Header.astro`:**
- /images/ywp-logo.png

**`/src/components/Footer.astro`:**
- /images/ywp-logo.png

**All Layout Files (19 files):**
- favicon.svg (link rel="icon")

**User Story Files (11 files):**
- Hero images for each story (see Story Hero Images table above)

### Backup/Test Files (Not Production)

These files contain image references but are not used in production:
- `/src/pages/index-backup.astro` - References hero-1, hero-2, featured-1, all explore/gallery/stats images
- `/src/pages/test-story.astro` - References the-excavator-and-the-auction.png
- Multiple backup layout files - Reference ywp-logo.png

---

## Recommendations

### Priority 1 - Critical Fixes

1. **Fix broken image reference:**
   - File: `/src/content/user-stories/brother-in-law-did-nothing.md`
   - Change: `heroImage: "/images/stories/brother-in-law-did-nothing..png"`
   - To: `heroImage: "/images/stories/brother-in-law-did-nothing.png"` (remove double period)
   - Action: Either rename `his-brother-did-nothing.png` to match, or update the frontmatter

### Priority 2 - Replace Placeholders

2. **Home page placeholder images (23 files):**
   - Replace all explore-*, gallery-*, stats-* images with actual content
   - These are currently generic stock images with placeholder names
   - Total size: ~45 MB - consider optimization

### Priority 3 - Cleanup

3. **Remove unused images:**
   - Delete or archive: mum-dad-hero.png, she-did-it-all.png
   - Move backup folders (`60% opaque/`, `originals/`) to `/archive/` outside public/
   - Delete .bak and .old files

4. **Optimize image sizes:**
   - Most images are 1.8-2.8 MB (very large for web)
   - Recommend compression/optimization
   - Target: <500 KB per image

### Priority 4 - Organization

5. **Create subfolder structure:**
   ```
   /public/images/
   ├── branding/
   │   └── ywp-logo.png
   ├── stories/
   │   └── hero/
   │       └── [story hero images]
   ├── home/
   │   ├── explore/
   │   ├── gallery/
   │   └── stats/
   └── archive/
       ├── 60-opaque/
       └── originals/
   ```

---

## Image Size Analysis

**Total public images size:** ~70 MB
**Average image size:** 2.1 MB
**Largest image:** explore-6.png (2.78 MB)
**Smallest image:** ywp-logo.png (48.7 KB)

**Optimization Potential:**
- Story hero images: 11 files × ~2 MB = ~22 MB → Target: ~5.5 MB (75% reduction)
- Placeholder images: 23 files × ~2 MB = ~46 MB → Target: ~11.5 MB (75% reduction)
- **Total savings potential:** ~52 MB with proper compression

---

## Next Steps

1. Fix the broken image reference immediately (Priority 1)
2. Plan replacement of placeholder images with actual content (Priority 2)
3. Run image optimization on all .png files (Priority 3)
4. Reorganize image folders for better structure (Priority 4)
5. Update this audit after changes

---

**End of Audit**
