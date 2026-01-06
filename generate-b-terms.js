import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// All B terms with complete content
const bTerms = {
  "Beneficiary Designation": {
    slug: "beneficiary-designation", region: "International",
    summary: "The formal process of naming who should receive assets like superannuation or life insurance.",
    partOfSpeech: "noun",
    legalDef: "A written instruction to a financial institution, superannuation fund, or insurance company specifying the person or entity who should receive benefits or proceeds upon the account holder's death.",
    plainEnglish: "A beneficiary designation is how you tell a bank, super fund, or insurance company who should get specific assets when you die. Unlike a will, which covers your general estate, these designations apply to particular accounts or policies.\n\nThink of it as a direct instruction: \"This account goes to this person.\" It's simple but powerful—and it usually overrides what your will says about those assets.",
    context: "Common examples include superannuation death benefit nominations, life insurance policies, and some bank accounts. These designations sit outside your will and often pass directly to the named person without going through probate.\n\nThe catch is keeping them up to date. A beneficiary designation you made years ago might not reflect your current wishes. If you've married, divorced, had children, or experienced other life changes, check these designations. They're binding, even if they contradict your will or your current family situation.",
    relatedTerms: ["Beneficiary", "Binding Death Benefit Nomination", "Non-Binding Nomination", "Superannuation"],
  },

  "Bequest": {
    slug: "bequest", region: "International",
    summary: "A gift of property or assets left to someone in a will.",
    partOfSpeech: "noun",
    legalDef: "A testamentary gift of property, whether real or personal, made through a will, with the person receiving the gift being the beneficiary or legatee.",
    plainEnglish: "A bequest is simply a gift you make through your will. It might be a specific item (\"my watch to my son\"), a sum of money (\"$5,000 to my niece\"), or a share of what's left (\"half my estate to my partner\").\n\nThe word sounds formal, but the concept isn't. Every time you say \"I leave X to Y\" in a will, you're making a bequest.",
    context: "Bequests can be specific (a particular item), pecuniary (a fixed sum of money), or residuary (what's left after other gifts and debts are paid). Being clear about what you're leaving and to whom prevents confusion and disputes.\n\nIf the thing you've bequeathed no longer exists when you die—say, you left someone your car but you sold it years ago—that's called ademption, and the gift fails. The person doesn't get equivalent value unless your will specifically says so. This is why keeping your will current matters.",
    relatedTerms: ["Legacy", "Gift", "Pecuniary Gift", "Residuary Estate"],
  },

  "Binding Death Benefit Nomination": {
    slug: "binding-death-benefit-nomination", region: "Australia",
    summary: "A legally binding instruction telling your super fund who must receive your superannuation when you die.",
    partOfSpeech: "noun",
    legalDef: "A formal nomination made in accordance with superannuation trust deed requirements and legislation, which binds the trustee to pay death benefits to the nominated beneficiary or beneficiaries, provided the nomination is valid and the nominees are eligible dependants or the estate.",
    plainEnglish: "When you make a binding death benefit nomination, you're giving your super fund a legally enforceable instruction about who gets your super when you die. Unlike a non-binding nomination (which the fund can ignore), a binding nomination must be followed—if it's valid.\n\nThis takes the decision out of the trustee's hands. They don't exercise discretion; they simply pay according to your nomination.",
    context: "To be valid, a binding nomination must meet specific requirements: it must be in writing, signed and dated by you in the presence of two witnesses (who must be over 18 and not named beneficiaries), and it usually expires after three years (though some funds now offer non-lapsing binding nominations).\n\nYou can only nominate eligible people: your dependants (spouse, children, someone financially dependent on you, or someone in an interdependency relationship with you) or your estate. If you nominate your estate, your super becomes part of your estate and gets distributed according to your will. Many people do this to maintain consistency between their super and will, though there can be tax implications to consider.",
    relatedTerms: ["Superannuation", "Non-Binding Nomination", "Death Benefit", "Superannuation Dependant"],
  },

  "Blended Family": {
    slug: "blended-family", region: "International",
    summary: "A family unit that includes children from previous relationships as well as the current relationship.",
    partOfSpeech: "noun",
    legalDef: "A family structure formed when partners with children from previous relationships establish a household together, which may also include children from their current relationship, creating complex inheritance and estate planning considerations.",
    plainEnglish: "A blended family is what you have when you or your partner (or both) bring children from previous relationships into a new family unit. You might also have children together in the current relationship.\n\nFrom an estate planning perspective, blended families create complexity. You might want to provide for your current partner while also protecting inheritances for your children from a previous relationship. These goals can conflict.",
    context: "Without careful planning, blended families face common problems: a will might unintentionally exclude children from a previous relationship, or assets might all go to a new partner who later changes their will and cuts out your children entirely.\n\nMany people in blended families use testamentary trusts or life interest arrangements to balance these competing interests—perhaps giving a surviving partner the right to live in the family home for their lifetime, with the property passing to children after. There's no one-size-fits-all solution; it requires thinking through scenarios and being explicit about your intentions.",
    relatedTerms: ["Testamentary Trust", "Life Interest", "Second Marriage", "Family Provision Claim"],
  },

  "Bond": {
    slug: "bond", region: "International",
    summary: "A type of security or guarantee that may be required when someone is appointed to administer an estate.",
    partOfSpeech: "noun",
    legalDef: "A security provided to the court, typically by an administrator (less commonly by an executor), as a guarantee against the faithful performance of their duties and protection against loss to the estate through breach of those duties.",
    plainEnglish: "In estate administration, a bond is like insurance that protects the estate from mismanagement. If an administrator mishandles the estate—whether through negligence, dishonesty, or poor decision-making—the bond can compensate the estate for losses.\n\nExecutors named in a will usually don't need to provide a bond, because the testator trusted them enough to name them. But administrators appointed by the court (where there's no will) may be required to provide one.",
    context: "Bond requirements vary by jurisdiction and circumstance. Courts might waive the bond requirement if all beneficiaries are adults and consent, if the estate is very small, or if the administrator is a professional trustee company.\n\nThe cost of obtaining a bond (which is typically an annual premium paid to a surety company) comes from the estate. For small estates, this cost can be significant relative to the estate's value. In many Australian jurisdictions, bond requirements have been relaxed or eliminated in recent years.",
    relatedTerms: ["Administrator", "Executor", "Fiduciary Duty", "Letters of Administration"],
  },

  "Business Succession": {
    slug: "business-succession", region: "International",
    summary: "Planning for what happens to a business when the owner dies or can no longer run it.",
    partOfSpeech: "noun",
    legalDef: "The process of planning for the continuation, transfer, or orderly wind-up of a business upon the death, incapacity, or retirement of the business owner, including arrangements for management transition and ownership transfer.",
    plainEnglish: "Business succession planning addresses a question many business owners avoid: what happens to your business if you die or become incapacitated? Without a plan, your business might have no legal authority to operate, access to funds might be frozen, and value could evaporate quickly.\n\nThis isn't just about transferring ownership—it's about ensuring the business can continue functioning during the transition period.",
    context: "Good business succession planning considers multiple scenarios: sudden death, gradual retirement, or incapacity. It addresses who has authority to run the business, how ownership transfers, how the business is valued, and how other beneficiaries are treated fairly if the business goes to one person.\n\nFor partnerships, this often involves buy-sell agreements funded by life insurance. For family businesses, it might mean clear roles for family members who work in the business versus those who don't. For sole traders, it could be as simple as ensuring your executor knows how to wind down operations and collect receivables. The complexity scales with the business, but every business owner needs some level of succession planning.",
    relatedTerms: ["Estate Planning", "Trust", "Power of Attorney", "Executor"],
  },
};

// Helper to create slug
function toSlug(term) {
  return term.toLowerCase()
    .replace(/\(.*?\)/g, '')
    .replace(/\//g, '-')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// Generate markdown
function generateMarkdown(term, data) {
  const relatedLinks = data.relatedTerms.map(t => `[${t}](/dictionary/${toSlug(t)})`).join(', ');

  return `---
title: "${term}"
slug: "${data.slug}"
category: "Dictionary"
order: 0
status: "published"
summary: "${data.summary}"
region: "${data.region}"
---

## Legal Term

**${term}** (${data.partOfSpeech}) — ${data.legalDef}

## Plain English

${data.plainEnglish}

## Context

${data.context}

**Related terms:** ${relatedLinks}

---

## Learn More

**Common Questions**
- [Relevant question if exists](/common-questions/slug)

**How It Works**
- [Relevant guide if exists](/how-it-works/slug)

---
`;
}

const dictionaryDir = path.join(__dirname, 'src', 'content', 'dictionary');
let count = 0;

for (const [term, data] of Object.entries(bTerms)) {
  const filename = `${data.slug}.md`;
  const filepath = path.join(dictionaryDir, filename);
  const content = generateMarkdown(term, data);
  fs.writeFileSync(filepath, content, 'utf8');
  count++;
  console.log(`Updated: ${filename}`);
}

console.log(`\n✓ Successfully updated ${count} B-terms with full content!`);
