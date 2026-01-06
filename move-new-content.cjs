const fs = require('fs');
const path = require('path');

// Files to move to published content
const moves = [
  // Common Questions (9 files)
  {
    from: 'unpublished-content/11-what-happens-to-superannuation-when-i-die.md',
    to: 'src/content/common-questions/11-what-happens-to-superannuation-when-i-die.md'
  },
  {
    from: 'unpublished-content/12-what-happens-to-debts-after-death.md',
    to: 'src/content/common-questions/12-what-happens-to-debts-after-death.md'
  },
  {
    from: 'unpublished-content/13-can-i-change-my-will-later.md',
    to: 'src/content/common-questions/13-can-i-change-my-will-later.md'
  },
  {
    from: 'unpublished-content/14-does-marriage-or-divorce-affect-my-will.md',
    to: 'src/content/common-questions/14-does-marriage-or-divorce-affect-my-will.md'
  },
  {
    from: 'unpublished-content/15-can-i-leave-someone-out-of-my-will.md',
    to: 'src/content/common-questions/15-can-i-leave-someone-out-of-my-will.md'
  },
  {
    from: 'unpublished-content/16-what-happens-to-my-children-if-i-die.md',
    to: 'src/content/common-questions/16-what-happens-to-my-children-if-i-die.md'
  },
  {
    from: 'unpublished-content/17-is-a-handwritten-will-valid.md',
    to: 'src/content/common-questions/17-is-a-handwritten-will-valid.md'
  },
  {
    from: 'unpublished-content/18-where-should-i-store-my-will.md',
    to: 'src/content/common-questions/18-where-should-i-store-my-will.md'
  },
  {
    from: 'unpublished-content/20-do-wills-cover-digital-assets.md',
    to: 'src/content/common-questions/20-do-wills-cover-digital-assets.md'
  },

  // User Stories (4 files)
  {
    from: 'unpublished-content/disobedience.md',
    to: 'src/content/user-stories/disobedience.md'
  },
  {
    from: 'unpublished-content/non-compliance.md',
    to: 'src/content/user-stories/non-compliance.md'
  },
  {
    from: 'unpublished-content/the-blended-family-that-didnt-fight.md',
    to: 'src/content/user-stories/the-blended-family-that-didnt-fight.md'
  },
  {
    from: 'unpublished-content/the-brother-who-stepped-back.md',
    to: 'src/content/user-stories/the-brother-who-stepped-back.md'
  }
];

console.log('=== MOVING NEW CONTENT TO PUBLISHED FOLDERS ===\n');

let movedCommonQuestions = 0;
let movedUserStories = 0;
let failed = 0;

moves.forEach(move => {
  try {
    // Ensure destination directory exists
    const destDir = path.dirname(move.to);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    fs.renameSync(move.from, move.to);

    const category = move.to.includes('common-questions') ? 'common-questions' : 'user-stories';
    console.log(`✓ Moved: ${path.basename(move.from)} → ${category}/`);

    if (category === 'common-questions') movedCommonQuestions++;
    else movedUserStories++;
  } catch (err) {
    console.log(`✗ Failed: ${path.basename(move.from)} - ${err.message}`);
    failed++;
  }
});

console.log(`\n=== SUMMARY ===`);
console.log(`Moved to common-questions: ${movedCommonQuestions} files`);
console.log(`Moved to user-stories: ${movedUserStories} files`);
console.log(`Failed: ${failed} files`);

// Also move Feedback folder files to OLD (they're duplicates of root files)
console.log('\n=== CLEANING UP FEEDBACK DUPLICATES ===\n');

const feedbackFiles = [
  'unpublished-content/Feedback/ask-about-a-term.md',
  'unpublished-content/Feedback/general-feedback.md',
  'unpublished-content/Feedback/help-me-choose-a-will-service.md',
  'unpublished-content/Feedback/here-is-my-story.md',
  'unpublished-content/Feedback/report-an-error.md',
  'unpublished-content/Feedback/suggest-an-improvement.md'
];

let cleanedFeedback = 0;

feedbackFiles.forEach(file => {
  try {
    const filename = path.basename(file);
    const destPath = `unpublished-content/OLD/Feedback-${filename}`;
    fs.renameSync(file, destPath);
    console.log(`✓ Moved: Feedback/${filename} → OLD/`);
    cleanedFeedback++;
  } catch (err) {
    if (err.code !== 'ENOENT') {
      console.log(`✗ Failed: ${file} - ${err.message}`);
    }
  }
});

console.log(`\nMoved ${cleanedFeedback} feedback duplicates to OLD/`);
