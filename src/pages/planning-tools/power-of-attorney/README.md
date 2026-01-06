# Power of Attorney Page - Implementation Instructions

## Files Included

- `index.astro` - Complete page file with HTML, CSS, and JavaScript

## Installation Steps for Claude Code

### 1. Add the Page File

Copy `index.astro` to:
```
src/pages/planning-tools/power-of-attorney/index.astro
```

### 2. Update Navigation

Add "Power of Attorney" to the Planning Tools dropdown in all layout files:

```astro
<li><a href="/planning-tools/power-of-attorney/">Power of Attorney</a></li>
```

Layout files to update (check your project structure):
- `HomeLayout.astro`
- `BaseLayout.astro`
- `GuideLayout.astro`
- `CategoryLayout.astro`
- Any other layouts with navigation

### 3. Verify Import Path

Line 12 of `index.astro` imports BaseLayout:
```astro
import BaseLayout from '../../layouts/BaseLayout.astro';
```

Adjust this path if your project structure differs.

### 4. Connect Email Form (Optional)

The email capture form (line ~280) currently logs to console. Connect it to your existing email system:

```javascript
// Replace this section in the script:
notifyForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(notifyForm);
  const email = formData.get('email');
  
  // TODO: Connect to your email API
  // Example:
  // await fetch('/api/subscribe', {
  //   method: 'POST',
  //   body: JSON.stringify({ email, list: 'poa-launch' })
  // });
  
  notifyForm.style.display = 'none';
  successMessage.style.display = 'block';
});
```

### 5. Verify Dictionary Links

The Related Resources section links to these dictionary terms:
- `/dictionary/attorney/`
- `/dictionary/enduring-power-of-attorney/`
- `/dictionary/advance-care-directive/`
- `/dictionary/capacity/`
- `/dictionary/guardianship/`
- `/dictionary/tribunal/`

Create any that don't exist, or update the links to match your actual URLs.

### 6. Verify Guide Links

Links to:
- `/guides/how-to-choose-your-executor/`
- `/guides/what-happens-without-a-will/`

Update if your URL structure differs.

## Features

### Interactive State Selector
- Saves selection to localStorage
- Shows state-specific requirements for all 8 Australian states/territories
- Updates panel content without page reload

### Expandable POA Type Cards
- Click to expand/collapse details
- Three cards: General POA, Enduring POA, Medical POA

### FAQ Accordion
- Uses native `<details>` elements (no JavaScript needed)
- Four common questions

### Email Capture
- "Coming Soon" notification signup
- Requires backend connection

## Accessibility

- Semantic HTML structure
- ARIA attributes on interactive elements
- Keyboard navigable
- Screen reader friendly
- Responsive design (mobile-first)

## SEO

Title: `Power of Attorney Australia - Complete Guide`
Description: `Learn about Power of Attorney in Australia. Understand types (General, Enduring, Medical), state requirements, and how to choose your attorney. Free guide.`

Add to your sitemap after deployment.
