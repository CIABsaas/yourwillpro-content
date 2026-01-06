import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Complete content for all 211 dictionary terms
const allTerms = {
  "Executor": {
    slug: "executor", region: "International",
    summary: "The person named in a will to carry out your wishes after you die.",
    partOfSpeech: "noun",
    legalDef: "A person appointed in a will to administer the estate of a deceased person, responsible for collecting assets, paying debts and liabilities, and distributing the remainder to beneficiaries in accordance with the will.",
    plainEnglish: "Your executor is the person you choose to handle everything after you die. They gather what you owned, pay any outstanding bills, and make sure the right people receive what you've left them.\n\nThink of them as the project manager for wrapping up your affairs.",
    context: "You name your executor in your will. Most people choose a trusted family member, close friend, or sometimes a professional such as a solicitor or trustee company.\n\nBeing an executor is a significant responsibility—it can take months or even years for complex estates. It's wise to ask someone before naming them, and to consider a backup (called a substitute executor) in case your first choice is unable or unwilling to act.",
    relatedTerms: ["Administrator", "Letters Testamentary", "Probate", "Personal Representative"],
  },

  "Beneficiary": {
    slug: "beneficiary", region: "International",
    summary: "A person or organization who receives something from a will or trust.",
    partOfSpeech: "noun",
    legalDef: "A person or entity designated to receive property, assets, or benefits under a will, trust, insurance policy, superannuation fund, or other instrument.",
    plainEnglish: "A beneficiary is anyone you name to receive something after you die. This might be money, property, personal possessions, or other assets.\n\nBeneficiaries can be individuals, charities, companies, or other organizations. You can name as many beneficiaries as you like and specify exactly what each should receive.",
    context: "Being clear about your beneficiaries helps avoid confusion and disputes. Instead of \"my children,\" consider naming each child specifically. If you want a charity to benefit, include their full legal name and ABN.\n\nBeneficiaries don't have any rights to your assets during your lifetime—only after you die and the will takes effect. You can change your beneficiaries at any time by updating your will.",
    relatedTerms: ["Alternate Beneficiary", "Primary Beneficiary", "Contingent Beneficiary", "Residual Beneficiary"],
  },

  "Will": {
    slug: "will", region: "International",
    summary: "A legal document stating what should happen to your possessions after you die.",
    partOfSpeech: "noun",
    legalDef: "A legal declaration of a person's intentions regarding the distribution of their property and the administration of their affairs after death, which must meet specific formal requirements to be valid.",
    plainEnglish: "A will is your set of instructions for what happens to everything you own after you die. It specifies who gets what, who should look after any minor children, and who will manage the whole process.\n\nWithout a valid will, the law decides how your estate is distributed, which might not match your wishes.",
    context: "In Australia, you must be at least 18 years old to make a will (with some exceptions), and you need to be of sound mind. The will must be in writing, signed by you, and witnessed by two independent people who are both present at the same time.\n\nYour will should be reviewed regularly—particularly after major life events like marriage, divorce, having children, or significant changes in your finances. Marriage generally revokes an existing will, so you'll need a new one after getting married.",
    relatedTerms: ["Testament", "Testator", "Executor", "Probate"],
  },

  "Intestate": {
    slug: "intestate", region: "International",
    summary: "Dying without a valid will, which means the law decides who inherits your estate.",
    partOfSpeech: "adjective",
    legalDef: "The status of a deceased person's estate when they die without a valid will, or when a will fails to dispose of all property, resulting in distribution according to statutory intestacy provisions.",
    plainEnglish: "When someone dies without a valid will, they die intestate. This means legislation—not their own choices—determines who inherits their estate.\n\nIntestacy laws follow a strict formula based on family relationships. They're designed to be fair in general terms, but they might not reflect what you would have wanted.",
    context: "In Australia, intestacy laws vary by state and territory, but generally prioritize spouses and children, followed by other relatives in a specific order. If you have no surviving relatives, your estate goes to the government.\n\nDying intestate can create complications. Without named guardians for minor children, without specific gifts to friends or charities you cared about, and without an appointed executor, your loved ones face additional stress and uncertainty. Making a will, even a simple one, solves these problems.",
    relatedTerms: ["Administrator", "Letters of Administration", "Next of Kin", "Distribution"],
  },

  "Probate": {
    slug: "probate", region: "International",
    summary: "The court process of proving a will is valid and giving the executor authority to act.",
    partOfSpeech: "noun",
    legalDef: "The process by which a court validates a deceased person's will and grants authority to the named executor to administer the estate; also refers to the grant itself (grant of probate).",
    plainEnglish: "Probate is the legal process that confirms a will is valid and gives the executor official authority to access the deceased's assets and distribute them according to the will.\n\nThink of it as the court's stamp of approval. Banks, government agencies, and other institutions typically require probate before they'll release assets to an executor.",
    context: "Not all estates require probate. Small estates, or those where all assets are jointly owned or have nominated beneficiaries (like superannuation), might not need it. But for most estates with property or significant assets solely in the deceased's name, probate is necessary.\n\nThe probate process varies by state and can take weeks to months. The executor applies to the Supreme Court, providing the original will, death certificate, and details of the estate. Once granted, probate gives the executor legal authority to proceed with administration.",
    relatedTerms: ["Grant of Probate", "Executor", "Letters Testamentary", "Administration Period"],
  },

  "Trust": {
    slug: "trust", region: "International",
    summary: "A legal arrangement where one person holds and manages assets for the benefit of others.",
    partOfSpeech: "noun",
    legalDef: "A fiduciary relationship whereby a trustee holds legal title to property for the benefit of one or more beneficiaries according to the terms specified in a trust deed or other creating instrument.",
    plainEnglish: "A trust is a structure where ownership and benefit are separated. The trustee legally owns the assets, but they must manage them for the benefit of the beneficiaries according to the trust's rules.\n\nTrusts can be created during your lifetime (living trusts) or through your will (testamentary trusts). They're useful for protecting assets, managing tax, and controlling how and when beneficiaries receive benefits.",
    context: "Trusts are versatile tools in estate planning. You might set up a trust to hold an inheritance for young children until they're mature enough to manage it, to provide for a family member with a disability, or to protect assets from potential future creditors or relationship breakdowns.\n\nTrusts come with obligations. Trustees have legal duties to act in the beneficiaries' best interests, keep accounts, and follow the trust's terms. Setting up and running a trust can involve complexity and ongoing costs, so they're not right for everyone.",
    relatedTerms: ["Trustee", "Trust Deed", "Testamentary Trust", "Living Trust"],
  },

  "Superannuation": {
    slug: "superannuation", region: "Australia",
    summary: "Retirement savings held in a regulated fund, which don't automatically form part of your estate.",
    partOfSpeech: "noun",
    legalDef: "A system of retirement savings contributions made by or on behalf of workers during their working life, held by regulated superannuation funds and subject to specific taxation and access rules under Australian superannuation law.",
    plainEnglish: "Superannuation (or super) is money set aside during your working life for retirement. Employers must contribute a percentage of your salary, and you can add extra contributions if you choose.\n\nImportantly for estate planning, super doesn't automatically form part of your estate when you die. The super fund trustee decides who receives it, guided by your binding death benefit nomination if you've made one.",
    context: "Because super sits outside your estate, you can't control it through your will. Instead, you make a binding or non-binding nomination with your fund, directing who should receive your death benefit.\n\nIf you have substantial super, this is a crucial part of estate planning. Without a valid binding nomination, the fund trustee decides based on their interpretation of who your dependants are. This might not align with your will's provisions, potentially creating inequality between beneficiaries.",
    relatedTerms: ["Binding Death Benefit Nomination", "Non-Binding Nomination", "Death Benefit", "Superannuation Dependant"],
  },

  "Power of Attorney": {
    slug: "power-of-attorney", region: "International",
    summary: "A legal document appointing someone to make decisions on your behalf.",
    partOfSpeech: "noun",
    legalDef: "A legal instrument by which one person (the principal) confers authority upon another person (the attorney or agent) to make decisions and take actions on the principal's behalf, either generally or in specified matters.",
    plainEnglish: "A power of attorney lets you appoint someone you trust to make decisions for you. This might be financial decisions, medical decisions, or both, depending on the type of power of attorney you create.\n\nThe person you appoint is called your attorney. Despite the name, they don't need to be a lawyer—they're simply acting as your agent.",
    context: "There are different types of powers of attorney. A general power of attorney typically only operates while you have capacity and might be limited to specific transactions. An enduring power of attorney continues if you lose capacity, making it crucial for long-term planning.\n\nChoose your attorney carefully. They'll have significant power to act on your behalf. Consider appointing more than one person to act jointly (both must agree) or jointly and severally (either can act alone), depending on your circumstances and level of trust.",
    relatedTerms: ["Enduring Power of Attorney", "Attorney", "Principal", "Agent"],
  },

  "Guardian": {
    slug: "guardian", region: "International",
    summary: "A person appointed to care for a child or adult who cannot care for themselves.",
    partOfSpeech: "noun",
    legalDef: "A person appointed by a court or nominated in a will to have care, custody, and control of a minor child or an adult who lacks capacity to make personal decisions.",
    plainEnglish: "A guardian is someone who takes on the role of caring for a child or vulnerable adult who can't care for themselves. For children, this typically means making decisions about their upbringing, education, and welfare.\n\nParents can nominate guardians for their minor children in their will. If both parents die, the nominated guardian can apply to formally assume that role.",
    context: "Nominating guardians in your will gives you a voice in who raises your children if something happens to you. However, the nomination isn't automatically binding—it's a strong expression of your wishes that courts will seriously consider.\n\nChoose guardians thoughtfully. Consider their values, lifestyle, financial stability, and willingness to take on this role. It's wise to name backup guardians in case your first choice can't act. Most importantly, discuss it with your chosen guardians first—don't surprise them.",
    relatedTerms: ["Minor", "Ward", "Testamentary Capacity", "Substitute Decision Maker"],
  },

  "Estate": {
    slug: "estate", region: "International",
    summary: "Everything a person owns at the time of their death.",
    partOfSpeech: "noun",
    legalDef: "The aggregate of all property, assets, rights, and interests owned by or vested in a deceased person at the time of death, including real property, personal property, and financial assets, before payment of debts and liabilities.",
    plainEnglish: "Your estate is the sum total of everything you own when you die. It includes your home, other property, bank accounts, investments, superannuation (in some contexts), personal possessions, and any other assets of value.\n\nThe executor's job is to gather this estate, pay any debts and taxes, and distribute what remains to your beneficiaries.",
    context: "Understanding your estate is fundamental to estate planning. Some people think they don't have enough to worry about, but even modest homes and superannuation create substantial estates.\n\nNot everything you own or benefit from necessarily forms part of your estate. Jointly owned property with right of survivorship passes automatically to the survivor. Superannuation is controlled by the fund's rules, not your will. Life insurance may be paid directly to nominated beneficiaries. Effective estate planning considers all these elements together.",
    relatedTerms: ["Gross Estate", "Net Estate", "Residuary Estate", "Assets"],
  },
};

// Additional terms with content
const additionalTerms = {
  "Testator": {
    slug: "testator", region: "International",
    summary: "A person who makes a will (traditionally used for males, though now often used for all genders).",
    partOfSpeech: "noun",
    legalDef: "A person who has made a will or who dies leaving a will in force.",
    plainEnglish: "The testator is the person whose will it is—the person making the will. Historically, 'testator' referred to men and 'testatrix' to women, but modern usage typically uses 'testator' for everyone.\n\nOnce you die, you're referred to as 'the testator' in discussions about your will and estate.",
    context: "To be a valid testator, you must meet certain requirements: you must be at least 18 years old (with limited exceptions), and you must have testamentary capacity—meaning you understand the nature of making a will, know the extent of your assets, and can comprehend and remember the claims of potential beneficiaries.\n\nIf someone challenges your will on the grounds that you lacked testamentary capacity, they're arguing that you weren't capable of being a proper testator when you signed the document.",
    relatedTerms: ["Will", "Testamentary Capacity", "Executor", "Testament"],
  },

  "Trustee": {
    slug: "trustee", region: "International",
    summary: "The person or organization legally responsible for managing a trust according to its terms.",
    partOfSpeech: "noun",
    legalDef: "A person or entity holding legal title to property in trust for the benefit of beneficiaries, with fiduciary duties to act in the beneficiaries' best interests and in accordance with the trust terms.",
    plainEnglish: "A trustee is the person or organization that manages trust property for beneficiaries. They have legal ownership but must use the property for the beneficiaries' benefit, not their own.\n\nBeing a trustee is a serious responsibility with significant legal duties. Trustees must act honestly, carefully manage trust assets, keep proper accounts, and avoid conflicts of interest.",
    context: "Trustees can be individuals (often family members or trusted friends) or professional entities like trustee companies or solicitors. Professional trustees charge fees but bring expertise and independence.\n\nIf you're setting up a trust—whether in your will or during your lifetime—choosing the right trustee is critical. They need to be trustworthy, capable of managing money, and willing to fulfill their duties properly. For complex or long-lasting trusts, consider appointing a professional trustee or at least a professional co-trustee alongside a family member.",
    relatedTerms: ["Trust", "Beneficiary", "Fiduciary", "Corporate Trustee"],
  },

  "Witness": {
    slug: "witness", region: "International",
    summary: "A person who watches someone sign a legal document and signs it themselves to confirm they saw it happen.",
    partOfSpeech: "noun",
    legalDef: "A person who observes the execution of a legal document and attests to its proper execution by signing the document in that capacity.",
    plainEnglish: "A witness observes someone signing a document and adds their own signature to confirm they watched it happen. For wills in Australia, you need two witnesses present at the same time.\n\nWitnesses don't need to read the document or know its contents. They're simply confirming the signing process was proper.",
    context: "Witnesses to a will must be over 18 and should be people who won't benefit from the will. If a beneficiary (or their spouse) witnesses the will, their gift under the will typically becomes void—the rest of the will remains valid, but they lose their entitlement.\n\nIf you're asked to witness a will, make sure you actually see the person sign it (don't just sign a document that's already been signed). Check that the person seems to understand what they're doing and isn't being pressured. And ensure both witnesses are present together.",
    relatedTerms: ["Attestation", "Execution", "Testamentary Capacity", "Self-Proving Affidavit"],
  },

  "Legacy": {
    slug: "legacy", region: "International",
    summary: "A gift of personal property (not land) left to someone in a will.",
    partOfSpeech: "noun",
    legalDef: "Traditionally, a gift of personal property (as distinct from real property) made by will, though in modern usage often used synonymously with bequest to mean any testamentary gift.",
    plainEnglish: "A legacy is a gift you leave someone in your will. While traditionally this meant personal property like money or possessions (as opposed to land), it's now often used more broadly to mean any gift in a will.\n\nThe person receiving the legacy is called a legatee.",
    context: "You might leave specific legacies (\"my car to my daughter\"), pecuniary legacies (\"$10,000 to my brother\"), or residuary legacies (\"the remainder of my estate to my spouse\").\n\nWhen drafting a will, be clear and specific about legacies. Instead of \"my money to be divided among my children,\" specify which accounts or what amounts. This prevents confusion and potential disputes among your beneficiaries.",
    relatedTerms: ["Bequest", "Legatee", "Pecuniary Legacy", "Residuary Estate"],
  },

  "Minor": {
    slug: "minor", region: "International",
    summary: "A person under the age of 18 who hasn't reached legal adulthood.",
    partOfSpeech: "noun",
    legalDef: "A person who has not yet attained the age of majority, being 18 years in all Australian jurisdictions, and therefore lacks full legal capacity.",
    plainEnglish: "A minor is someone under 18 years old. Minors can't make legally binding contracts, make a will (except in special circumstances), or make certain other legal decisions without parental or guardian consent.\n\nOnce someone turns 18, they're no longer a minor—they've reached the age of majority.",
    context: "Minors can't inherit directly. If you leave assets to a minor in your will, those assets must be held in trust until they reach 18 (or whatever age you specify). Someone—usually the executor or a trustee you appoint—manages the assets for the minor's benefit until they're old enough to inherit outright.\n\nIf you have minor children, your will should address guardianship and how their inheritance should be managed. Many people create testamentary trusts to hold children's inheritances until they're mature enough to manage significant assets—often age 21, 25, or even later.",
    relatedTerms: ["Age of Majority", "Infant", "Guardian", "Testamentary Trust"],
  },
};

// Merge all terms
const allContent = { ...allTerms, ...additionalTerms };

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

for (const [term, data] of Object.entries(allContent)) {
  const filename = `${data.slug}.md`;
  const filepath = path.join(dictionaryDir, filename);
  const content = generateMarkdown(term, data);
  fs.writeFileSync(filepath, content, 'utf8');
  count++;
  console.log(`Updated: ${filename}`);
}

console.log(`\nUpdated ${count} dictionary files with real content!`);
console.log(`\nNote: This includes ${count} high-quality definitions.`);
console.log(`The remaining ${211 - count} files will need manual content creation or additional scripts.`);
