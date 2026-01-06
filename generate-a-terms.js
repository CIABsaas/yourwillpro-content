import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// All A terms with complete content
const aTerms = {
  "Abatement": {
    slug: "abatement", region: "International",
    summary: "The reduction of gifts in a will when there aren't enough assets to pay everything promised.",
    partOfSpeech: "noun",
    legalDef: "The proportionate reduction of testamentary gifts when the estate's assets are insufficient to satisfy all bequests after payment of debts, taxes, and administration expenses.",
    plainEnglish: "Sometimes a will promises more than the estate can deliver. When someone dies with less money than expected—perhaps due to medical expenses, market losses, or other circumstances—there might not be enough to give everyone what was promised in the will.\n\nAbatement is the legal process that determines how to reduce those gifts proportionally. It's like having to split a smaller pie than expected: everyone might get a bit less to ensure fairness.",
    context: "Abatement typically follows a specific order: gifts of leftover assets (residuary gifts) are reduced first, then general gifts of money, and specific items are usually protected until last.\n\nThis can come as a surprise to beneficiaries who expected a certain amount. If you're concerned about this, you might consider life insurance to ensure specific gifts can be fulfilled, or clearly prioritize certain gifts in your will.",
    relatedTerms: ["Residuary Estate", "Bequest", "Legacy", "Distribution"],
  },

  "Administration Period": {
    slug: "administration-period", region: "International",
    summary: "The time between someone's death and when their estate is fully distributed to beneficiaries.",
    partOfSpeech: "noun",
    legalDef: "The period commencing from the date of death and concluding when the executor or administrator has completed all tasks required to wind up the estate, including obtaining grant of representation, collecting assets, paying liabilities, and distributing to beneficiaries.",
    plainEnglish: "When someone dies, their estate doesn't get distributed immediately. There's a process to work through—applying for probate, gathering assets, paying debts, lodging tax returns, and eventually distributing what remains.\n\nThe administration period is simply the time this all takes. For straightforward estates, this might be 6-12 months. For complex estates with business interests, disputes, or tax complications, it can take years.",
    context: "During this period, beneficiaries usually can't access their inheritance. The executor is working through a legal checklist that can't be rushed.\n\nIf you're waiting for an inheritance, it's normal to feel frustrated by the delay. But the executor has legal duties to fulfill and can face personal liability if they distribute assets prematurely and something goes wrong. Patience, while difficult, protects everyone involved.",
    relatedTerms: ["Executor", "Probate", "Grant of Probate", "Distribution"],
  },

  "Administrator": {
    slug: "administrator", region: "International",
    summary: "The person appointed by the court to handle someone's estate when there's no valid will.",
    partOfSpeech: "noun",
    legalDef: "A person appointed by the court to administer the estate of a deceased person who died intestate (without a valid will) or where no executor is named or able to act, with duties and responsibilities equivalent to those of an executor.",
    plainEnglish: "When someone dies without a will, the court appoints someone to do the job an executor would normally do. This person is called an administrator.\n\nThey handle the same tasks—collecting assets, paying debts, distributing what remains—but they follow intestacy laws rather than the deceased's stated wishes. Usually, a close family member applies for this role.",
    context: "The administrator receives Letters of Administration from the court (rather than probate) which gives them legal authority to act on behalf of the estate.\n\nBeing an administrator can be challenging because you're making decisions without the guidance of a will. You must follow strict legal rules about who inherits and in what proportions. If family members disagree about who should be administrator, court proceedings may be necessary to resolve the dispute.",
    relatedTerms: ["Executor", "Letters of Administration", "Intestate", "Grant of Probate"],
  },

  "Administrator with Will Annexed": {
    slug: "administrator-with-will-annexed", region: "International",
    summary: "A person appointed by the court to administer an estate when there's a will but no available executor.",
    partOfSpeech: "noun",
    legalDef: "A person appointed by the court to administer a deceased estate when a valid will exists but the named executor is unable or unwilling to act, or no executor was appointed, with the administrator required to distribute the estate according to the terms of the will.",
    plainEnglish: "Sometimes there's a valid will, but the executor named in it can't or won't act—perhaps they've died, lack capacity, or simply decline the responsibility. The will's instructions are still valid; there's just no one officially appointed to carry them out.\n\nIn this situation, the court appoints an administrator with will annexed. This person follows the will's instructions, just as the original executor would have.",
    context: "Usually a beneficiary or family member applies for this role. They receive a grant of letters of administration with will annexed—a mouthful of a name for a document that gives them authority to act.\n\nThis person has the same legal duties and powers as an executor. The key difference is simply how they came to the role: by court appointment rather than being named in the will.",
    relatedTerms: ["Executor", "Administrator", "Letters of Administration", "Probate"],
  },

  "Advance Care Directive": {
    slug: "advance-care-directive", region: "Australia",
    summary: "A legal document stating your wishes for medical treatment if you can't speak for yourself.",
    partOfSpeech: "noun",
    legalDef: "A legal document (known by different names across Australian jurisdictions) in which a person with capacity records their preferences, wishes, and instructions for future healthcare decisions in circumstances where they lack capacity to make or communicate those decisions.",
    plainEnglish: "An advance care directive lets you document what medical treatments you would or wouldn't want if you become unable to communicate your wishes. This might cover scenarios like permanent unconsciousness, terminal illness, or advanced dementia.\n\nYou can specify preferences about life support, resuscitation, pain management, and other medical interventions. You might also name a substitute decision-maker to interpret your wishes and make decisions on your behalf.",
    context: "This document is separate from your will—it operates during your life, not after death. Each Australian state and territory has different names and rules for these documents: Advance Care Directive (SA, NT), Advance Care Plan (Vic, Tas), Advance Health Directive (Qld), Advance Care Planning (NSW, ACT), or Advance Health Directive (WA).\n\nMedical professionals must consider your directive, but in emergencies where your directive isn't immediately available or clear, they'll act in your best medical interests. Having conversations with your doctor and family about your directive helps ensure your wishes are understood and respected.",
    relatedTerms: ["Enduring Power of Attorney", "Medical Power of Attorney", "Capacity", "Substitute Decision Maker"],
  },

  "Affinity": {
    slug: "affinity", region: "International",
    summary: "The legal relationship created by marriage between one spouse and the blood relatives of the other.",
    partOfSpeech: "noun",
    legalDef: "The legal relationship created through marriage between an individual and the blood relatives (consanguinity) of their spouse, as distinct from blood relationships.",
    plainEnglish: "Affinity is the formal legal term for relationships created by marriage. Your spouse's parents, siblings, and other blood relatives are related to you by affinity, not by blood.\n\nIn everyday language, we call these people in-laws. In legal language, the relationship is described as affinity.",
    context: "This distinction matters in some legal contexts, particularly around inheritance when someone dies without a will (intestate) and in certain prohibited relationship rules.\n\nIn most Australian intestacy laws, relationships by affinity don't automatically create inheritance rights—your brother-in-law typically wouldn't inherit from you if you died without a will, even if you were close. However, they might have grounds for a family provision claim if they were financially dependent on you.",
    relatedTerms: ["Intestate", "Next of Kin", "Family Provision Claim", "Degree of Relationship"],
  },

  "Affidavit": {
    slug: "affidavit", region: "International",
    summary: "A written statement confirmed under oath or affirmation to be true.",
    partOfSpeech: "noun",
    legalDef: "A voluntary written statement of facts sworn under oath or solemnly affirmed before an authorized person (such as a solicitor, justice of the peace, or notary public), subject to penalties for perjury if false.",
    plainEnglish: "An affidavit is a formal way of saying \"this is true\" in writing. You write down facts, then swear or affirm before an authorized person (like a solicitor or justice of the peace) that what you've written is true.\n\nBecause making a false affidavit is a criminal offense, courts give them significant weight as evidence.",
    context: "In estate matters, affidavits are commonly used in probate applications to confirm facts about the deceased, the will, and the executor. For example, an executor might swear an affidavit stating they've searched for any later wills and found none.\n\nYou might also encounter affidavits in family provision claims, where people swear to facts about their relationship with the deceased or their financial circumstances. The person who swears the affidavit is called the deponent.",
    relatedTerms: ["Probate", "Notarised", "Execution", "Self-Proving Affidavit"],
  },

  "Agent": {
    slug: "agent", region: "International",
    summary: "A person authorized to act on behalf of another person in legal or financial matters.",
    partOfSpeech: "noun",
    legalDef: "A person authorized, either expressly or implicitly, to act on behalf of another (the principal) and to bind that person in dealings with third parties within the scope of the authority granted.",
    plainEnglish: "An agent is someone you give permission to act for you. They might sign documents on your behalf, make decisions, or handle transactions—depending on what authority you've given them.\n\nThe relationship requires trust: your agent can bind you legally to whatever they do within their authority.",
    context: "In estate planning, the term agent often appears in powers of attorney, where you appoint someone as your attorney (agent) to make financial or medical decisions if you can't.\n\nThe scope of an agent's authority should be clearly defined. A general power of attorney gives broad powers; a limited power might only authorize specific transactions, like selling a particular property. Always choose someone trustworthy and capable—your agent's decisions are legally your decisions.",
    relatedTerms: ["Power of Attorney", "Attorney", "Principal", "Enduring Power of Attorney"],
  },

  "Agnate": {
    slug: "agnate", region: "International",
    summary: "A person related through male lineage only.",
    partOfSpeech: "noun",
    legalDef: "A blood relative descended through male lineage only, tracing ancestry exclusively through fathers.",
    plainEnglish: "Agnate is an old legal term referring to relatives on your father's side of the family, traced through an unbroken male line. Your father's father's father's son, for instance, would be an agnate.\n\nThis concept has historical significance but limited practical application in modern Australian estate law, which doesn't distinguish between maternal and paternal lineage for inheritance purposes.",
    context: "You might encounter this term in very old wills or legal documents, particularly those from British legal traditions where male-line inheritance was emphasized.\n\nModern intestacy laws in Australia treat maternal and paternal relatives equally. The term persists mainly in legal dictionaries and historical documents rather than active practice.",
    relatedTerms: ["Degree of Relationship", "Issue", "Collateral Descendant", "Intestate"],
  },

  "Age of Majority": {
    slug: "age-of-majority", region: "International",
    summary: "The age when a person legally becomes an adult, which is 18 in Australia.",
    partOfSpeech: "noun",
    legalDef: "The age at which a person ceases to be a minor and assumes full legal capacity to enter into contracts, make a will, and exercise other legal rights without parental or guardian consent, being 18 years in all Australian jurisdictions.",
    plainEnglish: "The age of majority is when you're legally considered an adult. In Australia, that's 18. Before this age, you're a minor, and your parents or guardians make most legal decisions for you.\n\nOnce you reach 18, you can vote, make a legally binding will, enter into contracts, and generally exercise full legal rights.",
    context: "In wills, the age of majority matters because you must be at least 18 to make a valid will (with limited exceptions for married persons or those on active military service). Many wills also specify that beneficiaries must reach the age of majority—or sometimes an older age like 21 or 25—before receiving their inheritance.\n\nIf you die leaving minor children, they can't inherit directly. Instead, the inheritance is usually held in trust for them until they reach the specified age. This protects young people from receiving large sums before they're equipped to manage them.",
    relatedTerms: ["Minor", "Infant", "Testamentary Capacity", "Trust"],
  },

  "Alternate Beneficiary": {
    slug: "alternate-beneficiary", region: "International",
    summary: "A backup person or organization designated to receive a gift if the first choice can't.",
    partOfSpeech: "noun",
    legalDef: "A person or entity named in a will to receive a gift or benefit if the primary beneficiary predeceases the testator, disclaims the gift, or is otherwise unable or unwilling to take.",
    plainEnglish: "Life is unpredictable. Your first-choice beneficiary might die before you, or they might disclaim (refuse) a gift. An alternate beneficiary is your backup plan—the person or organization who receives the gift if your primary choice can't or won't.\n\nThis is sometimes called a substitute beneficiary or contingent beneficiary. It's simple forward planning that prevents unintended consequences.",
    context: "Without naming alternates, a failed gift typically falls into your residuary estate (the leftover pot) and gets distributed according to those provisions. This might not align with your wishes.\n\nFor example, if you leave your car to your brother but he dies before you, you might want it to go to his children rather than into the general residue. Naming alternates ensures your intent is clear. Many people name alternates for all significant gifts, particularly when leaving assets to elderly relatives or friends.",
    relatedTerms: ["Beneficiary", "Contingent Beneficiary", "Primary Beneficiary", "Lapse"],
  },

  "Ancillary Administration": {
    slug: "ancillary-administration", region: "International",
    summary: "The additional probate process needed when a deceased person owned property in multiple jurisdictions.",
    partOfSpeech: "noun",
    legalDef: "A secondary or supplementary grant of representation obtained in a jurisdiction other than where the primary grant was issued, typically required when a deceased person owned real property or certain other assets in multiple jurisdictions.",
    plainEnglish: "If someone dies owning property in different states, territories, or countries, their executor typically needs to obtain probate in each location. The first probate is the primary grant; additional grants in other jurisdictions are ancillary administrations.\n\nThis is a practical complication rather than a conceptual one—each jurisdiction wants its local court's authorization before allowing transfer of local assets.",
    context: "In Australia, if you own property in multiple states—say, a home in Victoria and a holiday house in Queensland—your executor may need to obtain separate probate in each state. This adds time and expense to estate administration.\n\nSome people try to simplify this by transferring all property into a trust structure or ensuring bank accounts are held jointly. However, these strategies have other implications that need careful consideration. If you own property across multiple jurisdictions, discuss with an estate planning professional whether restructuring might save your estate future complications.",
    relatedTerms: ["Probate", "Resealing", "Grant of Probate", "Real Property"],
  },

  "Assets": {
    slug: "assets", region: "International",
    summary: "Everything of value that a person owns, from property and money to personal possessions.",
    partOfSpeech: "noun",
    legalDef: "All property of any description, whether real or personal, tangible or intangible, owned by or vested in a person at any given time, including but not limited to real estate, financial investments, business interests, superannuation, insurance policies, and personal effects.",
    plainEnglish: "Your assets are simply everything you own that has value. This includes obvious things like your home, car, and bank accounts, but also superannuation, business interests, jewelry, furniture, digital assets, and even your unused frequent flyer points.\n\nWhen you die, your executor's job is to identify and collect all your assets, then distribute them according to your will (or intestacy laws if there's no will).",
    context: "People often underestimate their assets. You might think you don't have much, but when you add up your super, death benefits from insurance, a modest home, a car, and personal possessions, it can total a substantial sum.\n\nSome assets don't form part of your estate and can't be distributed by your will. These include superannuation (which is controlled by the fund's rules and your nomination), jointly owned property with right of survivorship, and assets held in certain trust structures. Understanding which assets you actually control through your will is an important part of estate planning.",
    relatedTerms: ["Estate", "Liabilities", "Gross Estate", "Net Estate"],
  },

  "Attestation": {
    slug: "attestation", region: "International",
    summary: "The act of witnessing someone sign a legal document and signing it yourself to confirm you witnessed it.",
    partOfSpeech: "noun",
    legalDef: "The act of witnessing the execution of a legal document (particularly a will) and signing it to certify that the signature was made in the witness's presence and that the witness believes the person signing has the requisite legal capacity.",
    plainEnglish: "When you witness someone sign their will, you're attesting to it. You're confirming that you saw them sign, that they seemed to understand what they were doing, and that they weren't being pressured.\n\nAttesting a will is a simple but important responsibility. Your signature helps prove the will is genuine if anyone later questions it.",
    context: "In Australia, a will generally requires two witnesses who are both present at the same time. The witnesses must be over 18 and should not be beneficiaries of the will (or married to beneficiaries), as this can invalidate their gifts.\n\nAs a witness, you're not reading the will or verifying its contents—you're simply confirming the signing process. If you're asked to witness a will, take it seriously. Make sure the person signs in your presence, and that both witnesses are there together. If there's any coercion or the person seems confused, don't witness the document.",
    relatedTerms: ["Witness", "Execution", "Self-Proving Affidavit", "Testamentary Capacity"],
  },

  "Augmented Estate": {
    slug: "augmented-estate", region: "International",
    summary: "An expanded definition of estate that includes certain transfers made before death to prevent disinheritance.",
    partOfSpeech: "noun",
    legalDef: "A calculation of the deceased's estate that includes not only assets owned at death but also certain property transferred during life with the intent to defeat a spouse's or dependant's claim, used in some jurisdictions to prevent disinheritance through strategic lifetime transfers.",
    plainEnglish: "Some people try to avoid their family's inheritance claims by giving away assets before they die. The augmented estate concept counteracts this by treating certain lifetime transfers as if they're still part of the estate.\n\nThis is particularly relevant when a spouse or dependant makes a family provision claim. The court can look beyond what you owned at death and consider what you gave away to others shortly beforehand.",
    context: "In Australia, this concept is reflected in 'notional estate' provisions in some states. If you transferred property for less than full value—perhaps giving your house to a new partner shortly before death—the court might treat it as still part of your estate for the purpose of family provision claims.\n\nThis doesn't mean you can't give gifts during your lifetime. But if you're making large transfers while you have potential claimants (like a spouse or dependent children), be aware that courts have powers to look behind those transactions if a claim is made.",
    relatedTerms: ["Notional Estate", "Family Provision Claim", "Estate", "Disinherit"],
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

for (const [term, data] of Object.entries(aTerms)) {
  const filename = `${data.slug}.md`;
  const filepath = path.join(dictionaryDir, filename);
  const content = generateMarkdown(term, data);
  fs.writeFileSync(filepath, content, 'utf8');
  count++;
  console.log(`Updated: ${filename}`);
}

console.log(`\n✓ Successfully updated ${count} A-terms with full content!`);
