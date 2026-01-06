import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const existingSlugs = [
  '_section', 'abatement', 'administration-period', 'administrator-with-will-annexed',
  'administrator', 'advance-care-directive', 'affidavit', 'affinity', 'age-of-majority',
  'agent', 'agnate', 'alternate-beneficiary', 'ancillary-administration', 'assets',
  'attestation', 'augmented-estate', 'beneficiary-designation', 'beneficiary', 'bequest',
  'binding-death-benefit-nomination', 'blended-family', 'bond', 'business-succession'
];

const australiaTerms = [
  'Binding Death Benefit Nomination',
  'Enduring Guardian',
  'Enduring Power of Attorney',
  'Letters of Administration',
  'Probate',
  'Self-Managed Super Fund (SMSF)',
  'Superannuation Death Benefit',
  'Testamentary Trust'
];

const allTerms = [
  'Abatement',
  'Ademption',
  'Administration Period',
  'Administrator',
  'Administrator with Will Annexed',
  'Advance Care Directive',
  'Advance Directive',
  'Advancement',
  'Affidavit',
  'Affinity',
  'Age of Majority',
  'Agent',
  'Agnate',
  'Alternate Beneficiary',
  'Ancillary Administration',
  'Ancillary Probate',
  'Annuity',
  'Appraisal',
  'Asset Protection Trust',
  'Assets',
  'Attestation',
  'Attestation Clause',
  'Attorney-in-Fact',
  'Augmented Estate',
  'Beneficiary',
  'Beneficiary Designation',
  'Bequest',
  'Binding Death Benefit Nomination',
  'Blended Family',
  'Bond',
  'Business Succession',
  'Buy-Sell Agreement',
  'Capacity',
  'Charitable Remainder Trust',
  'Charitable Trust',
  'Children',
  'Codicil',
  'Cognates',
  'Common Disaster Clause',
  'Common Law Marriage',
  'Community Property',
  'Competent',
  'Conditional Bequest',
  'Conservator',
  'Conservatorship',
  'Contingent Beneficiary',
  'Corpus',
  'Court',
  'Creditor',
  'Curtesy',
  'Custodian',
  'Death Benefit',
  'Death Certificate',
  'Death Taxes',
  'Debts',
  'Decedent',
  'Declaration of Trust',
  'Deed',
  'Dependent',
  'Descendants',
  'Descent',
  'Devise',
  'Digital Assets',
  'Disinherit',
  'Disposition',
  'Distribution',
  'Divorce',
  'Domicile',
  'Donee',
  'Donor',
  'Dower',
  'Durable Power of Attorney',
  'Elective Share',
  'Enduring Guardian',
  'Enduring Power of Attorney',
  'Estate',
  'Estate Administration',
  'Estate Planning',
  'Estate Tax',
  'Estate Tax Return',
  'Executor',
  'Executrix',
  'Fair Market Value',
  'Family Allowance',
  'Family Trust',
  'Fiduciary',
  'Fiduciary Duty',
  'Final Distribution',
  'Force and Effect',
  'Formal Will',
  'Fraudulent Conveyance',
  'Generation-Skipping Transfer Tax',
  'Gift',
  'Gift Tax',
  'Grantor',
  'Gross Estate',
  'Guardian',
  'Guardian ad Litem',
  'Guardianship',
  'Heir',
  'Heir Apparent',
  'Heirs at Law',
  'Holographic Will',
  'Homestead',
  'Homestead Exemption',
  'Illegitimate',
  'Incapacity',
  'Income Beneficiary',
  'Incompetent',
  'Inheritance',
  'Inheritance Tax',
  'Insolvent',
  'Intangible Property',
  'Inter Vivos Trust',
  'Interested Party',
  'Intestacy',
  'Intestate',
  'Intestate Succession',
  'Inventory',
  'Irrevocable Trust',
  'Issue',
  'Joint Tenancy',
  'Joint Tenancy with Right of Survivorship',
  'Joint Will',
  'Kindred',
  'Lapsed Gift',
  'Legacy',
  'Legatee',
  'Letters of Administration',
  'Letters Testamentary',
  'Life Estate',
  'Life Insurance',
  'Life Insurance Trust',
  'Life Interest',
  'Life Tenant',
  'Lifetime Gift',
  'Living Trust',
  'Living Will',
  'Marital Deduction',
  'Mental Capacity',
  'Minor',
  'Mirror Will',
  'Mutual Will',
  'Next of Kin',
  'No-Contest Clause',
  'Nominee',
  'Non-Probate Assets',
  'Notary Public',
  'Notice to Creditors',
  'Nuncupative Will',
  'Oral Will',
  'Parent',
  'Partial Intestacy',
  'Pay-on-Death Account',
  'Per Capita',
  'Per Stirpes',
  'Personal Effects',
  'Personal Property',
  'Personal Representative',
  'Petition',
  'Posthumous Child',
  'Pour-Over Will',
  'Power of Appointment',
  'Power of Attorney',
  'Precatory Language',
  'Pretermitted Child',
  'Pretermitted Heir',
  'Principal',
  'Probate',
  'Probate Assets',
  'Probate Court',
  'Probate Estate',
  'Probate Property',
  'Probate Process',
  'Proration',
  'QTIP Trust',
  'Real Property',
  'Remainderman',
  'Renunciation',
  'Representation',
  'Residuary Beneficiary',
  'Residuary Clause',
  'Residuary Estate',
  'Residue',
  'Restatement of Trust',
  'Resulting Trust',
  'Revocable Trust',
  'Revocation',
  'Right of Survivorship',
  'Self-Managed Super Fund (SMSF)',
  'Self-Proving Will',
  'Separate Property',
  'Settlor',
  'Simultaneous Death',
  'Small Estate Administration',
  'Spendthrift Clause',
  'Spendthrift Trust',
  'Spouse',
  'Statute of Descent and Distribution',
  'Statute of Frauds',
  'Statute of Limitations',
  'Stepped-Up Basis',
  'Stirpes',
  'Successor Trustee',
  'Summary Administration',
  'Superannuation Death Benefit',
  'Surety',
  'Surviving Spouse',
  'Tangible Personal Property',
  'Tenancy by the Entirety',
  'Tenancy in Common',
  'Testamentary',
  'Testamentary Capacity',
  'Testamentary Disposition',
  'Testamentary Intent',
  'Testamentary Trust',
  'Testate',
  'Testator',
  'Testatrix',
  'Title',
  'Totten Trust',
  'Transfer on Death',
  'Trust',
  'Trust Agreement',
  'Trust Asset',
  'Trust Company',
  'Trust Document',
  'Trust Estate',
  'Trust Fund',
  'Trust Instrument',
  'Trust Property',
  'Trustee',
  'Trustor',
  'Undue Influence',
  'Unified Credit',
  'Uniform Probate Code',
  'Uniform Transfer to Minors Act',
  'Unlimited Marital Deduction',
  'Valid Will',
  'Vest',
  'Vested Interest',
  'Void',
  'Waiver',
  'Ward',
  'Will',
  'Will Contest',
  'Witness'
];

function toSlug(term) {
  return term
    .toLowerCase()
    .replace(/[()]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function getRegion(term) {
  return australiaTerms.includes(term) ? 'Australia' : 'International';
}

function createPlaceholder(term) {
  const slug = toSlug(term);

  if (existingSlugs.includes(slug)) {
    return { skipped: true, slug };
  }

  const region = getRegion(term);
  const content = `---
title: "${term}"
slug: "${slug}"
category: "Dictionary"
order: 0
status: "draft"
summary: ""
region: "${region}"
---

## Legal Term


## Plain English


## Context


**Related terms:**
`;

  const outputDir = path.join(__dirname, 'unpublished-content/dictionary');
  const filePath = path.join(outputDir, `${slug}.md`);

  try {
    fs.writeFileSync(filePath, content, 'utf8');
    return { created: true, slug, region };
  } catch (error) {
    return { error: true, slug, message: error.message };
  }
}

console.log('Creating placeholder dictionary files...\n');

let skippedCount = 0;
let createdCount = 0;
let errorCount = 0;
const errors = [];
const created = [];

allTerms.forEach(term => {
  const result = createPlaceholder(term);

  if (result.skipped) {
    skippedCount++;
  } else if (result.created) {
    createdCount++;
    created.push({ term, slug: result.slug, region: result.region });
  } else if (result.error) {
    errorCount++;
    errors.push({ term, slug: result.slug, message: result.message });
  }
});

console.log('=== COMPLETION REPORT ===\n');
console.log(`Total terms processed: ${allTerms.length}`);
console.log(`Files already existed (skipped): ${skippedCount}`);
console.log(`New files created: ${createdCount}`);
console.log(`Errors: ${errorCount}\n`);

if (created.length > 0) {
  console.log('Created files by region:');
  const australiaFiles = created.filter(f => f.region === 'Australia');
  const internationalFiles = created.filter(f => f.region === 'International');
  console.log(`  Australia: ${australiaFiles.length}`);
  console.log(`  International: ${internationalFiles.length}\n`);
}

if (errors.length > 0) {
  console.log('ERRORS:');
  errors.forEach(err => {
    console.log(`  - ${err.term} (${err.slug}): ${err.message}`);
  });
}

console.log('\nDone!');
