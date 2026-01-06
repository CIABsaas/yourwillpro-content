import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const terms = [
  "Abatement", "Administration Period", "Administrator", "Administrator with Will Annexed",
  "Advance Care Directive", "Affinity", "Affidavit", "Agent", "Agnate", "Age of Majority",
  "Alternate Beneficiary", "Ancillary Administration", "Assets", "Attestation", "Augmented Estate",
  "Beneficiary", "Beneficiary Designation", "Bequest", "Binding Death Benefit Nomination",
  "Blended Family", "Bond (Executor / Probate)", "Business Succession", "Capacity",
  "Capacity Assessment", "Capital Gains Tax", "Carer (informal / dependent)", "Caveat",
  "Certified Copy", "Chattels", "Child of the Relationship", "Class (of Beneficiaries)",
  "Collateral Descendant", "Community Property", "Conjoint Will", "Contentious Probate",
  "Conservator", "Contingent Beneficiary", "Corporate Trustee", "Creditor", "Curtesy",
  "Death Benefit", "Death Benefits Dependant", "Decedent", "Deed of Variation",
  "Degree of Relationship", "Dependant", "Dependent Administration", "Devise", "Devisor",
  "Disclaimer (of Inheritance)", "Disinherit", "Discretionary Trust", "Distribution",
  "Domestic Partner", "Domicile", "Donor", "Donee", "Dower", "Duress", "Elective Share",
  "Emancipated Minor", "Enduring Power of Attorney", "Estate", "Estate Account",
  "Estate Planning", "Estate Tax", "Execution", "Executor", "Ex Parte", "Family Home",
  "Family Provision Claim", "Fee Simple", "Fiduciary", "Fiduciary Duty", "Final Account",
  "Financial Dependence", "Forced Heir", "Funeral Expenses", "General Power of Attorney",
  "Gift", "Grant of Probate", "Gross Estate", "Guardian", "Guaranteed Signature",
  "Healthcare Proxy", "Heir", "Holographic Will", "Incapacity", "Independent Administration",
  "Infant", "Inheritance", "Inheritance Tax", "Instrument", "Inter Vivos Trust",
  "Interdependency Relationship", "Intestate", "Inventory", "Irrevocable Trust", "Issue",
  "Joint Assets", "Joint Tenancy", "Joint Will", "Lapse", "Legacy", "Legatee",
  "Legal Personal Representative", "Letters of Administration", "Letters Testamentary",
  "Liabilities", "Life Estate", "Life Interest", "Life Tenant", "Limited Power of Attorney",
  "Living Trust", "Living Will", "Lucid Interval", "Marriage Breakdown", "Matrimonial Home",
  "Medical Power of Attorney", "Medicare Levy", "Minor", "Mirror Wills", "Mutual Will",
  "Net Estate", "Next of Kin", "Non-Binding Nomination", "Non-Contentious Probate",
  "Non-Probate Assets", "Notarised", "Notional Estate", "Nuncupative Will", "Outgoings",
  "Pecuniary Gift", "Pecuniary Legacy", "Per Capita", "Per Stirpes", "Personal Effects",
  "Personal Property", "Personal Representative", "Petition", "Petition for Probate",
  "Pour-Over Will", "Power of Attorney", "Preferential Legacy", "Primary Beneficiary",
  "Principal", "Probate", "Probate Court", "Proportioning Rule", "Real Property",
  "Relationship Breakdown", "Remainder", "Remainderman", "Renunciation", "Reserved Activities",
  "Resealing", "Residual Beneficiary", "Residuary Estate", "Residue", "Revocable Trust",
  "Revocation", "Reversionary Beneficiary", "Right of Election", "Right of Survivorship",
  "Second Marriage", "Self-Managed Superannuation Fund (SMSF)", "Self-Proving Affidavit",
  "Separated (but not divorced)", "Settlor", "Small Estate", "Special Needs Trust",
  "Spendthrift Trust", "Spousal Maintenance", "Spousal Share", "Springing Power of Attorney",
  "Standing", "Statutory Will", "Stepped-Up Basis", "Substitute Decision Maker",
  "Substituted Service", "Succession", "Succession Act", "Superannuation",
  "Superannuation Dependant", "Surrogate", "Surviving Partner", "Surviving Spouse",
  "Survivorship Period", "Supreme Court", "Tax Dependant", "Tax-Free Component",
  "Taxable Component", "Tenancy in Common", "Testament", "Testamentary Capacity",
  "Testamentary Trust", "Testator", "Transfer Balance Cap", "Trust", "Trust Deed",
  "Trustee", "Undue Influence", "Unreserved Activities", "Unsound Mind", "Untaxed Element",
  "Valid", "Vested Interest", "Void", "Ward", "Will", "Witness"
];

// Australian-specific terms
const australianTerms = [
  "Superannuation", "Self-Managed Superannuation Fund (SMSF)", "Binding Death Benefit Nomination",
  "Medicare Levy", "Enduring Power of Attorney", "Advance Care Directive", "Grant of Probate",
  "Letters of Administration", "Family Provision Claim", "Notional Estate", "Supreme Court",
  "Succession Act", "Death Benefits Dependant", "Superannuation Dependant", "Tax Dependant",
  "Non-Binding Nomination", "Death Benefit", "Tax-Free Component", "Taxable Component",
  "Untaxed Element", "Transfer Balance Cap", "Interdependency Relationship", "Capital Gains Tax",
  "Carer (informal / dependent)", "Caveat", "Reserved Activities", "Unreserved Activities",
  "Resealing", "Proportioning Rule"
];

function toSlug(term) {
  return term
    .toLowerCase()
    .replace(/\(.*?\)/g, '') // Remove parentheses and their content
    .replace(/\//g, '-') // Replace slashes with hyphens
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-'); // Replace multiple hyphens with single
}

function getRegion(term) {
  return australianTerms.includes(term) ? "Australia" : "International";
}

function generateContent(term) {
  const slug = toSlug(term);
  const region = getRegion(term);

  return `---
title: "${term}"
slug: "${slug}"
category: "Dictionary"
order: 0
status: "published"
summary: "[One sentence plain English summary]"
region: "${region}"
---

## Legal Term

**${term}** ([part of speech]) — [Precise legal definition. Neutral, jurisdiction-safe language. No advice.]

## Plain English

[Calm, human explanation. Real-world framing. 2-3 short paragraphs.]

## Context

[Where the term appears in real life. Why someone encounters it. Practical implications. 2-3 paragraphs.]

**Related terms:** [Link to 3-5 related dictionary entries using format: [Term](/dictionary/slug)]

---

## Learn More

**Common Questions**
- [Relevant question if exists](/common-questions/slug)

**How It Works**
- [Relevant guide if exists](/how-it-works/slug)

---

Tone rules:
- Calm, supportive, plain speaking
- No legal advice
- No marketing language
- No fear-based framing
- Australian context where applicable
`;
}

// Create directory if it doesn't exist
const dictionaryDir = path.join(__dirname, 'src', 'content', 'dictionary');
if (!fs.existsSync(dictionaryDir)) {
  fs.mkdirSync(dictionaryDir, { recursive: true });
}

// Generate all files
let count = 0;
terms.forEach(term => {
  const slug = toSlug(term);
  const filename = `${slug}.md`;
  const filepath = path.join(dictionaryDir, filename);
  const content = generateContent(term);

  fs.writeFileSync(filepath, content, 'utf8');
  count++;
  console.log(`Created: ${filename}`);
});

console.log(`\nSuccessfully created ${count} dictionary files!`);
