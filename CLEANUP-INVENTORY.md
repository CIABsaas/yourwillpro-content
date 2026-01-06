# Project Cleanup Inventory
**Generated:** 2026-01-06
**Project:** YourWillPro Content Site

---

## Executive Summary

- **Total backup/test files found:** 43 in `/src/` + built files in `/dist/`
- **Total disk space to be freed:** ~50 MB (images) + ~1 MB (code files) = **~51 MB**
- **Safe to delete immediately:** 40 files/folders
- **Review before deleting:** 3 files (test pages that might be templates)

---

## CATEGORY 1: SAFE TO DELETE - Backup Image Files (5.7 MB)

### Individual Image Backups
| File | Location | Size | Action |
|------|----------|------|--------|
| hero-1.png.bak | /public/images/stories/ | 1.9 MB | DELETE |
| mum-dad-hero.png.old | /public/images/stories/ | 1.9 MB | DELETE |
| the-court-threw-it-out.png.old | /public/images/stories/ | 1.9 MB | DELETE |

**Same files also in:** `/dist/images/stories/` (will be regenerated on next build)

**Subtotal:** 5.7 MB

---

## CATEGORY 2: SAFE TO DELETE - Backup Image Folders (44 MB)

### Backup Folders
| Folder | Location | Size | Files | Action |
|--------|----------|------|-------|--------|
| originals/ | /public/images/stories/ | 21 MB | 10 images | DELETE |
| 60% opaque/ | /public/images/stories/ | 23 MB | 11 images | DELETE |

**Purpose:** These folders contain earlier versions/variations of story hero images that are no longer used in production.

**Subtotal:** 44 MB

**TOTAL IMAGE CLEANUP:** ~50 MB

---

## CATEGORY 3: SAFE TO DELETE - Backup Layout Files (368 KB)

### Component Backups
| File | Size | Action |
|------|------|--------|
| /src/components/Header-backup.astro | 4 KB | DELETE |
| /src/components/Footer-backup-logo.astro | 4 KB | DELETE |

### Layout Backups (16 files)
| File | Size | Notes |
|------|------|-------|
| CategoryLayout-backup-footer-rollout.astro | 28 KB | Old footer version |
| CategoryLayout-backup-new.astro | 32 KB | Experimental version |
| CategoryLayout-backup.astro | 28 KB | Original backup |
| DictionaryTermLayout-backup-footer-rollout.astro | 20 KB | Old footer version |
| DictionaryTermLayout-backup-new.astro | 24 KB | Experimental version |
| DictionaryTermLayout-backup-v2.astro | 24 KB | Version 2 backup |
| DictionaryTermLayout-backup.astro | 24 KB | Original backup |
| GuideLayout-backup-footer-rollout.astro | 28 KB | Old footer version |
| GuideLayout-backup.astro | 32 KB | Original backup |
| HomeLayout-backup-footer-rollout.astro | 28 KB | Old footer version |
| HomeLayout-backup.astro | 32 KB | Original backup |
| QuestionLayout-backup-footer-rollout.astro | 12 KB | Old footer version |
| QuestionLayout-backup.astro | 16 KB | Original backup |
| StoryLayout-backup-footer-rollout.astro | 28 KB | Old footer version |
| StoryLayout-backup.astro | 32 KB | Original backup |
| StoryLayout.astro.bak | (unknown) | Extra backup |

**All located in:** `/src/layouts/`

**Subtotal:** ~368 KB

---

## CATEGORY 4: SAFE TO DELETE - Backup Page Files (272 KB)

### Main Page Backups
| File | Location | Size | Notes |
|------|----------|------|-------|
| index-backup.astro | /src/pages/ | 48 KB | Old home page |
| index-backup-footer.astro | /src/pages/ | 44 KB | Footer experiment |
| index-backup-footer-rollout.astro | /src/pages/ | 44 KB | Footer rollout |
| index-backup-new.astro | /src/pages/ | 48 KB | Experimental version |
| our-story-backup.astro | /src/pages/ | 16 KB | Old about page |
| our-story-backup-footer-rollout.astro | /src/pages/ | 12 KB | Footer version |
| sitemap-backup.astro | /src/pages/ | 8 KB | Old sitemap |
| sitemap-backup-footer-rollout.astro | /src/pages/ | 8 KB | Footer version |
| [category]/[article]-backup.astro | /src/pages/ | (unknown) | Dynamic route backup |
| [category]/[article].astro.bak | /src/pages/ | (unknown) | Extra backup |

### Section Index Backups
| File | Location | Size |
|------|----------|------|
| index-backup.astro | /src/pages/common-questions/ | 16 KB |
| index-backup-footer-rollout.astro | /src/pages/common-questions/ | 12 KB |
| index-backup.astro | /src/pages/user-stories/ | 24 KB |
| index-backup-footer-rollout.astro | /src/pages/user-stories/ | 20 KB |

**Subtotal:** ~272 KB

---

## CATEGORY 5: REVIEW BEFORE DELETING - Test Pages (268 KB)

### Test/Style Pages
| File | Location | Size | Purpose | Action |
|------|----------|------|---------|--------|
| test-story.astro | /src/pages/ | 28 KB | Test story template | REVIEW |
| test-checklist.astro | /src/pages/ | 40 KB | Test checklist page | REVIEW |
| test-checklist-backup.astro | /src/pages/ | 44 KB | Backup of test | DELETE |
| test-checklist.astro.bak | /src/pages/ | 44 KB | Extra backup | DELETE |
| test-dictionary-term.astro | /src/pages/ | 20 KB | Test dictionary | REVIEW |
| test-dictionary-v2.astro | /src/pages/ | 24 KB | Test dict v2 | DELETE |
| test-style.astro | /src/pages/ | 48 KB | Style testing | DELETE |
| test-style-v2.astro | /src/pages/ | 36 KB | Style testing v2 | DELETE |
| test-style-v3.astro | /src/pages/ | 44 KB | Style testing v3 | DELETE |

**Recommendation:**
- Keep `test-story.astro`, `test-checklist.astro`, `test-dictionary-term.astro` if they're used as development templates
- Delete all other test files (backups and style tests)

**Subtotal:** 268 KB (or 124 KB if keeping 3 template files)

---

## CATEGORY 6: GENERATED FILES IN /dist/ (Auto-rebuilt)

These are built from source files and will be regenerated on next build:

### Backup Page Builds
| Folder | Size | Notes |
|--------|------|-------|
| /dist/index-backup/ | 24 KB | Built from src backup |
| /dist/index-backup-footer/ | 24 KB | Built from src backup |
| /dist/index-backup-footer-rollout/ | 24 KB | Built from src backup |
| /dist/index-backup-new/ | 24 KB | Built from src backup |
| /dist/our-story-backup/ | 8 KB | Built from src backup |
| /dist/our-story-backup-footer-rollout/ | 8 KB | Built from src backup |
| /dist/sitemap-backup/ | 8 KB | Built from src backup |
| /dist/sitemap-backup-footer-rollout/ | 12 KB | Built from src backup |

### Test Page Builds
| Folder | Size |
|--------|------|
| /dist/test-checklist/ | 40 KB |
| /dist/test-checklist-backup/ | 36 KB |
| /dist/test-dictionary-term/ | 12 KB |
| /dist/test-dictionary-v2/ | 12 KB |
| /dist/test-story/ | 16 KB |
| /dist/test-style/ | 24 KB |
| /dist/test-style-v2/ | 16 KB |
| /dist/test-style-v3/ | 24 KB |

### Backup Story Builds
- 17 backup story folders in `/dist/user-stories/`
- Built from src backups

**Action:** Delete entire `/dist/` folder and rebuild from clean source after cleanup

**Subtotal:** Included in total dist size (155 MB)

---

## Files to KEEP (Not Deleting)

### Dictionary Content Files
These contain "test" in the name but are actual content (NOT test files):

- testamentary-intent.md
- letters-testamentary.md
- intestate-succession.md
- attestation.md
- no-contest-clause.md
- testator.md
- partial-intestacy.md
- will-contest.md
- testamentary-trust.md
- testatrix.md
- testamentary.md
- contested-will.md
- attestation-clause.md
- testamentary-capacity.md
- testate.md
- testamentary-disposition.md
- intestacy.md
- intestate.md

These are DICTIONARY TERMS, not test files. They are production content and must be KEPT.

### Common Questions Content File
- 17-how-do-i-reduce-chance-of-will-being-contested.md

This is production content and must be KEPT.

---

## Cleanup Summary

### Recommended Actions

| Category | Files/Folders | Size | Action |
|----------|---------------|------|--------|
| **Image backups (.bak, .old)** | 3 files | 5.7 MB | DELETE ALL |
| **Image backup folders** | 2 folders | 44 MB | DELETE ALL |
| **Layout backup files** | 16 files | 368 KB | DELETE ALL |
| **Component backup files** | 2 files | 8 KB | DELETE ALL |
| **Page backup files** | 14 files | 272 KB | DELETE ALL |
| **Test page backups/versions** | 6 files | 144 KB | DELETE ALL |
| **Test template pages** | 3 files | 124 KB | REVIEW (Keep or Delete) |
| **Built files in /dist/** | Auto-generated | 0 MB* | Delete /dist/ and rebuild |

*Note: /dist/ folder will be regenerated on next build, so deleting doesn't count toward space savings.

---

## Total Space to Free

**If deleting everything except 3 template files:**
- Images: 50 MB
- Code files: ~792 KB (~0.8 MB)
- **TOTAL: ~50.8 MB**

**If deleting everything including template files:**
- Images: 50 MB
- Code files: ~916 KB (~0.9 MB)
- **TOTAL: ~50.9 MB**

---

## Deletion Plan

### Phase 1: Image Cleanup (50 MB)
```bash
# Delete individual backup images
rm /Users/donmacintosh/Desktop/yourwillpro-content/public/images/stories/*.bak
rm /Users/donmacintosh/Desktop/yourwillpro-content/public/images/stories/*.old

# Delete backup image folders
rm -rf "/Users/donmacintosh/Desktop/yourwillpro-content/public/images/stories/originals/"
rm -rf "/Users/donmacintosh/Desktop/yourwillpro-content/public/images/stories/60% opaque/"
```

### Phase 2: Code Backup Cleanup (~1 MB)
```bash
# Delete all backup layout files
rm /Users/donmacintosh/Desktop/yourwillpro-content/src/layouts/*backup*.astro
rm /Users/donmacintosh/Desktop/yourwillpro-content/src/layouts/*.bak

# Delete backup component files
rm /Users/donmacintosh/Desktop/yourwillpro-content/src/components/*backup*.astro

# Delete backup page files
rm /Users/donmacintosh/Desktop/yourwillpro-content/src/pages/*backup*.astro
rm /Users/donmacintosh/Desktop/yourwillpro-content/src/pages/*.bak
rm /Users/donmacintosh/Desktop/yourwillpro-content/src/pages/*/*backup*.astro

# Delete test file backups (keep base templates for now)
rm /Users/donmacintosh/Desktop/yourwillpro-content/src/pages/test-checklist-backup.astro
rm /Users/donmacintosh/Desktop/yourwillpro-content/src/pages/test-checklist.astro.bak
rm /Users/donmacintosh/Desktop/yourwillpro-content/src/pages/test-dictionary-v2.astro
rm /Users/donmacintosh/Desktop/yourwillpro-content/src/pages/test-style*.astro
```

### Phase 3: Rebuild /dist/
```bash
# Delete entire dist folder
rm -rf /Users/donmacintosh/Desktop/yourwillpro-content/dist/

# Rebuild clean
npm run build
```

---

## Questions to Answer Before Cleanup

1. **Test template files:** Do you want to keep these for development?
   - test-story.astro
   - test-checklist.astro
   - test-dictionary-term.astro

2. **Backup folders in /dist/:** Should I delete and rebuild /dist/ completely?

3. **Empty folders:** There's a `/src/layouts/backups/` folder (0 bytes) and `/src/pages/backups/` folder - delete these too?

---

## Next Steps

**Ready for your approval to proceed with deletion.**

Please review this inventory and let me know:
- Should I delete everything listed as "SAFE TO DELETE"?
- Should I keep or delete the 3 test template files?
- Should I delete and rebuild /dist/?

I will NOT proceed with deletion until you confirm.
