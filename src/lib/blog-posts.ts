export type BlogLang = "sk" | "en";

export type BlogSection = { h: string; p: string[] };

export type BlogPost = {
  slug: string;
  lang: BlogLang;
  title: string;
  description: string;
  date: string; // ISO
  readMin: number;
  category: string;
  pillar?: boolean;
  intro: string;
  sections: BlogSection[];
  related: string[]; // slugs in same lang
};

export const SITE_URL = "https://demo-to-web.lovable.app";

// Static OG image used as default share image for all blog posts.
// Built path so the share-image URL stays absolute on social networks.
export const DEFAULT_BLOG_OG_IMAGE = `${SITE_URL}/og-blog-pillar.jpg`;

// SK <-> EN slug pairing for hreflang alternates.
const PAIRS: Array<[string, string]> = [
  ["ai-v-priemyselnej-vyrobe", "ai-in-manufacturing"],
  ["ako-ai-znizuje-neplanovane-vypadky", "how-ai-reduces-unplanned-downtime"],
  ["zachytavanie-znalosti-technikov", "capturing-technician-knowledge"],
  ["plc-kod-a-ai", "plc-code-and-ai"],
];

export function pairedSlug(post: { lang: BlogLang; slug: string }): string | undefined {
  if (post.lang === "sk") return PAIRS.find((p) => p[0] === post.slug)?.[1];
  return PAIRS.find((p) => p[1] === post.slug)?.[0];
}

export const POSTS: BlogPost[] = [
  // ============== SK ==============
  {
    slug: "ai-v-priemyselnej-vyrobe",
    lang: "sk",
    title: "AI v priemyselnej výrobe: praktický sprievodca implementáciou v údržbe",
    description:
      "Krok za krokom — ako nasadiť AI v priemyselnom závode, znížiť neplánované výpadky a zachytiť znalosti technikov. Pilot za 2 týždne, on-prem alebo cloud.",
    date: "2026-06-30",
    readMin: 12,
    category: "Sprievodca",
    pillar: true,
    intro:
      "Umelá inteligencia v priemyselnej výrobe nie je o nahrádzaní ľudí. Je o tom, aby každý technik mal v okamihu prístup k najlepším znalostiam, ktoré váš závod kedy získal. Tento sprievodca ukazuje, ako AI prakticky nasadiť v údržbe — od pilotu po celopodnikové nasadenie.",
    sections: [
      {
        h: "Prečo práve teraz",
        p: [
          'Priemerne 50 % skúsených technikov odíde do dôchodku v horizonte 5–10 rokov. Spolu s nimi odchádzajú znalosti, ktoré nikdy neboli zapísané — "prečo tento ventil treba dotiahnuť práve 2/3 otočky", "ktorá poistka pravidelne padá v zime", "v ktorom šuplíku je náhradný snímač".',
          "Súčasne rastie zložitosť strojov. Jeden montážny riadok dnes generuje viac dát za hodinu ako celá továreň pred 15 rokmi. Klasické MES a CMMS systémy ukladajú dáta, ale nepomáhajú technikovi rýchlo nájsť odpoveď v 3 ráno pri stojacej linke.",
        ],
      },
      {
        h: "Čo presne AI v údržbe rieši",
        p: [
          "Okamžité odpovede z dokumentácie. Manuály, schémy, I/O listy, PLC programy a servisné záznamy sú indexované tak, že technik dostane konkrétnu odpoveď so zdrojom, nie 200 strán PDF.",
          "Zachytávanie skúseností. Po každej oprave technik nadiktuje, čo urobil. AI z toho vytvorí štruktúrovaný záznam, ktorý je okamžite vyhľadateľný pre celý tím.",
          "Predikcia a kontext. AI prepojí dáta zo strojov (MES, SQL, SCADA) so záznamami o opravách a upozorní, keď sa opakuje vzor, ktorý v minulosti viedol k poruche.",
        ],
      },
      {
        h: "Ako vyzerá realistický pilot (2 týždne)",
        p: [
          "Týždeň 1 — dáta a rozsah. Vyberiete jeden výrobný úsek (typicky 3–10 strojov). Pripojíme dokumentáciu (PDF, schémy), exporty z MES/SQL a — ak chcete — PLC kód. Nič sa nepresúva mimo vašu sieť, ak nasadenie beží on-prem.",
          "Týždeň 2 — testovanie s technikmi. Asistent ide do rúk reálnych ľudí na zmene. Meriame, koľko otázok dostal, koľko z nich vyriešil bez eskalácie a kde sa pomýlil. Tento feedback systém zlepšuje denne.",
          "Po pilote viete povedať tvrdé čísla: priemerný čas na zistenie príčiny, počet eskalácií na seniora, koľko hodín týždenne tím ušetril.",
        ],
      },
      {
        h: "Tri modely nasadenia",
        p: [
          "Plný cloud — najrýchlejší štart, dáta v EÚ. Vhodné pre menšie závody alebo pilotné fázy.",
          "On-prem + AI cloud (najpopulárnejšie) — vaše dokumenty a procesné dáta ostávajú vo vašej sieti, len anonymizované otázky idú do AI v cloude.",
          "Plný on-prem — celý model beží vo vašej infraštruktúre. Žiadne dáta neopustia závod. Pre regulované prevádzky (farmácia, obrana, kritická infraštruktúra).",
        ],
      },
      {
        h: "Časté chyby pri zavádzaní",
        p: [
          "Začať veľkým „digitálnym transformačným projektom“. Funguje opačný prístup: jeden úsek, dvaja až traja technici, dva týždne. Až keď to reálne pomáha, rozširovať.",
          "Snažiť sa najprv „upratovať dáta“. Moderné AI si poradí aj s nedokonalou dokumentáciou. Lepšie je spustiť a postupne čistiť to, čo sa naozaj používa.",
          "Vynechať technikov z rozhodovania. Nástroj, ktorý nevyužívajú ľudia v teréne, nemá hodnotu. Ich feedback z prvého týždňa je dôležitejší než ktorýkoľvek dashboard.",
        ],
      },
      {
        h: "Ako merať návratnosť",
        p: [
          "MTTR (mean time to repair). Typicky klesá o 20–40 % v prvých troch mesiacoch — najmä na poruchách, ktoré sa už v minulosti riešili a teraz ich technik nájde za sekundy.",
          "Eskalácie na seniora. Junior technik vyrieši viac sám, čo uvoľní seniora pre komplexnejšie problémy a školenie.",
          "Onboarding nového technika. Z mesiacov na týždne — má pri sebe asistenta, ktorý pozná každý stroj v hale.",
        ],
      },
    ],
    related: [
      "ako-ai-znizuje-neplanovane-vypadky",
      "zachytavanie-znalosti-technikov",
      "plc-kod-a-ai",
    ],
  },
  {
    slug: "ako-ai-znizuje-neplanovane-vypadky",
    lang: "sk",
    title: "Ako AI znižuje neplánované výpadky vo výrobe",
    description:
      "Neplánovaný výpadok vo výrobe stojí tisíce eur za minútu. Pozrite, ako AI pomáha skrátiť čas opravy a predchádzať opakujúcim sa poruchám.",
    date: "2026-06-28",
    readMin: 6,
    category: "Downtime",
    intro:
      "V automotive sa cena neplánovaného výpadku počíta v tisíckach eur za minútu. Väčšina týchto výpadkov sa pritom v minulosti už riešila — len o tom nikto na nočnej zmene nevie.",
    sections: [
      {
        h: "Kde sa stráca najviac času",
        p: [
          "Štúdie ARC a Plant Engineering opakovane ukazujú, že 30–50 % času pri neplánovanom výpadku zaberie hľadanie informácie — manuál, schéma, kontaktná osoba, predošlý záznam o oprave.",
          "AI asistent tento čas neskracuje o pár minút. Skracuje ho rádovo — z desiatok minút na sekundy, pretože odpoveď s odkazom na zdroj dostane technik priamo k stroju.",
        ],
      },
      {
        h: "Opakované poruchy: najväčší skrytý náklad",
        p: [
          "Až 70 % porúch má pôvod v ľudskej chybe pri predošlej oprave alebo v chýbajúcej informácii o kontexte. AI prepojí dáta zo strojov so záznamami a upozorní, keď sa scenár opakuje.",
          "Príklad: ak konkrétny snímač zlyhal v poslednom polroku trikrát po sebe a vždy mu predchádzal pokles tlaku v okruhu, ďalšie zlyhanie systém predpovie skôr, než sa stane.",
        ],
      },
      {
        h: "Čo merať počas pilotu",
        p: [
          "MTTR pre top 10 najčastejších porúch. Sledujte trend prvé 3 mesiace.",
          "Počet opakovaných porúch na rovnakom stroji — mal by klesnúť, lebo technici majú prístup k predošlým riešeniam.",
          "Eskalácie mimo pracovný čas. Ak sa znížia, znamená to, že nočná zmena má v ruke skutočného „seniora 24/7\“.",
        ],
      },
    ],
    related: ["ai-v-priemyselnej-vyrobe", "zachytavanie-znalosti-technikov"],
  },
  {
    slug: "zachytavanie-znalosti-technikov",
    lang: "sk",
    title: "Zachytávanie znalostí skúsených technikov pred odchodom do dôchodku",
    description:
      "Ako previesť tiché znalosti seniorov do systému, ktorý je dostupný celému tímu — bez papierovania a bez „prosím napíš to do Wordu\“.",
    date: "2026-06-25",
    readMin: 5,
    category: "Knowledge",
    intro:
      "Najcennejšie znalosti vo výrobe nikdy neboli zapísané. Sú v hlavách piatich-šiestich ľudí, ktorí v závode pracujú 20+ rokov. AI dnes vie tieto znalosti zachytiť tak, aby to seniorov nestálo extra čas.",
    sections: [
      {
        h: "Prečo klasické riešenia zlyhávajú",
        p: [
          "Wiki, SharePoint, Confluence — všetko sa skúšalo. Realita: senior technik nemá 2 hodiny denne na písanie. A keď napíše, junior to nenájde, lebo nevie, ako sa to volá.",
          "Riešenie nie je v lepšom editore. Je v zmene formátu — z písania na rozprávanie.",
        ],
      },
      {
        h: "Hlasový logbook v praxi",
        p: [
          "Technik po oprave nadiktuje 30–60 sekúnd: čo sa stalo, čo urobil, na čo si dať pozor. AI z toho vyrobí štruktúrovaný záznam s tagmi (stroj, súčiastka, symptóm) a okamžite ho sprístupní vyhľadávaniu pre celý tím.",
          "Pre seniora to znamená nulový extra čas. Pre juniora znamená, že nabudúce nájde rovnaký prípad za 3 sekundy.",
        ],
      },
      {
        h: "Čo s tým po roku",
        p: [
          "Vznikne živá báza riešení, ktorá rastie sama. Po roku máte typicky 1 500–3 000 záznamov, ktoré pokrývajú väčšinu opakovaných situácií.",
          "Aj keď senior odíde, jeho prístup k problémom ostane v systéme — vrátane jeho slovných obratov, ktoré junior pochopí lepšie než suchý manuál.",
        ],
      },
    ],
    related: ["ai-v-priemyselnej-vyrobe", "ako-ai-znizuje-neplanovane-vypadky"],
  },
  {
    slug: "plc-kod-a-ai",
    lang: "sk",
    title: "PLC kód a AI: ako sprístupniť dáta zo strojov technikom",
    description:
      "PLC programy obsahujú odpovede na väčšinu otázok, ale technik k nim nemá prístup. Pozrite, ako AI vie čítať PLC kód a vysvetliť ho v ľudskej reči.",
    date: "2026-06-22",
    readMin: 5,
    category: "Integrácie",
    intro:
      "Väčšina otázok pri poruche sa dá zodpovedať z PLC programu — ktorý vstup vypína ktorý výstup, ktorá podmienka spúšťa alarm, prečo sa cyklus zastavil. Problém je, že PLC kód číta 5 % ľudí v závode.",
    sections: [
      {
        h: "Čo dnes AI zvládne čítať",
        p: [
          "Siemens S7 (SCL, LAD, FBD), Rockwell Studio 5000, Beckhoff TwinCAT, Mitsubishi GX Works. Importujú sa exportované programy, AI ich prepojí s I/O zoznamom a štruktúrami HMI.",
          "Technik sa potom môže opýtať: „Prečo sa zastavil cyklus na stanici 4?\“ a dostane odpoveď s konkrétnym vstupom, aktuálnym stavom a posledným záznamom, kedy sa to stalo.",
        ],
      },
      {
        h: "Bezpečnosť a IT",
        p: [
          "PLC kód nikam neodchádza. V on-prem nasadení sa indexuje lokálne a AI naň pristupuje cez vnútornú sieť. Pre IT/OT oddelenia to znamená, že integrácia neporušuje segmentáciu sietí.",
          "Read-only prístup je štandard. AI nikdy nezapisuje do PLC. Pre prípadné zmeny ostáva v hre vždy človek so zodpovednosťou.",
        ],
      },
      {
        h: "Reálny prínos",
        p: [
          "Junior technik vyrieši poruchu na stanici, ktorú videl prvýkrát, lebo PLC mu vysvetlilo, čo sa deje. Bez toho, aby musel volať PLC programátora.",
          "PLC programátor sa konečne venuje vývoju, nie odpovedaniu na rovnakú otázku po desiaty raz.",
        ],
      },
    ],
    related: ["ai-v-priemyselnej-vyrobe", "zachytavanie-znalosti-technikov"],
  },

  // ============== EN ==============
  {
    slug: "ai-in-manufacturing",
    lang: "en",
    title: "AI in Manufacturing: A Practical Implementation Guide for Maintenance",
    description:
      "A step-by-step guide to deploying AI in an industrial plant — reduce unplanned downtime, capture technician knowledge, and pilot in 2 weeks. On-prem or cloud.",
    date: "2026-06-30",
    readMin: 12,
    category: "Guide",
    pillar: true,
    intro:
      "AI in manufacturing isn't about replacing people. It's about giving every technician instant access to the best knowledge your plant has ever produced. This guide walks through the practical path: from a two-week pilot to a company-wide rollout.",
    sections: [
      {
        h: "Why now",
        p: [
          'On average, 50% of experienced technicians will retire within 5–10 years. With them goes knowledge that was never written down — "why this valve needs exactly two-thirds of a turn", "which fuse drops out every winter", "which drawer holds the spare sensor".',
          "Machine complexity is growing at the same time. One assembly line today generates more data per hour than an entire plant did fifteen years ago. Classic MES and CMMS systems store the data — they don't help a technician find an answer at 3 a.m. with the line down.",
        ],
      },
      {
        h: "What AI in maintenance actually solves",
        p: [
          "Instant answers from documentation. Manuals, schematics, I/O lists, PLC programs and service records are indexed so the technician gets a concrete answer with a source — not 200 PDF pages.",
          "Knowledge capture. After every repair, the technician dictates what they did. AI turns it into a structured, searchable record available to the whole team within seconds.",
          "Context and prediction. AI links machine data (MES, SQL, SCADA) to repair history and flags repeating patterns before they become failures.",
        ],
      },
      {
        h: "What a realistic two-week pilot looks like",
        p: [
          "Week 1 — data and scope. You pick one production area (typically 3–10 machines). We connect the documentation (PDFs, schematics), MES/SQL exports and — if you want — the PLC code. Nothing leaves your network when the deployment runs on-prem.",
          "Week 2 — testing with technicians. The assistant goes into the hands of real people on shift. We measure how many questions it received, how many were resolved without escalation, and where it got things wrong. That feedback improves the system daily.",
          "After the pilot you have hard numbers: average time to diagnose, escalations to senior staff, hours saved per week.",
        ],
      },
      {
        h: "Three deployment models",
        p: [
          "Full cloud — fastest start, data in the EU. Best for smaller plants or pilot phases.",
          "On-prem + AI cloud (most popular) — your documents and process data stay in your network; only anonymized questions go to the AI in the cloud.",
          "Full on-prem — the entire model runs in your infrastructure. No data ever leaves the plant. For regulated environments (pharma, defense, critical infrastructure).",
        ],
      },
      {
        h: "Common mistakes",
        p: [
          'Starting with a big "digital transformation project". The opposite approach wins: one area, two or three technicians, two weeks. Expand only after it actually helps.',
          'Trying to "clean up the data" first. Modern AI handles imperfect documentation. Better to launch and clean only what is actually used.',
          "Leaving technicians out of decisions. A tool the field doesn't use has no value. Their feedback from week one matters more than any dashboard.",
        ],
      },
      {
        h: "How to measure ROI",
        p: [
          "MTTR (mean time to repair). Typically drops by 20–40% in the first three months — especially on failures that were already solved in the past and a technician can now find in seconds.",
          "Escalations to senior staff. Juniors resolve more on their own, freeing seniors for harder problems and training.",
          "New technician onboarding. From months to weeks — they carry an assistant that knows every machine in the plant.",
        ],
      },
    ],
    related: [
      "how-ai-reduces-unplanned-downtime",
      "capturing-technician-knowledge",
      "plc-code-and-ai",
    ],
  },
  {
    slug: "how-ai-reduces-unplanned-downtime",
    lang: "en",
    title: "How AI reduces unplanned downtime in manufacturing",
    description:
      "Unplanned downtime costs thousands of euros per minute. See how AI shortens repair time and prevents recurring failures.",
    date: "2026-06-28",
    readMin: 6,
    category: "Downtime",
    intro:
      "In automotive, the cost of an unplanned outage is measured in thousands of euros per minute. Most of those outages were solved before — nobody on the night shift just knows about it.",
    sections: [
      {
        h: "Where most time is lost",
        p: [
          "ARC and Plant Engineering studies repeatedly show that 30–50% of unplanned-outage time is spent searching — for a manual, a schematic, a contact person, a previous repair record.",
          "An AI assistant doesn't cut that time by a few minutes. It cuts it by orders of magnitude — from tens of minutes to seconds — because the answer comes to the technician right at the machine, with the source attached.",
        ],
      },
      {
        h: "Recurring failures: the biggest hidden cost",
        p: [
          "Up to 70% of failures stem from human error during a previous repair or from missing context. AI links machine data with repair records and flags when a scenario is about to repeat.",
          "Example: if a specific sensor failed three times in the past six months, always preceded by a pressure drop in the loop, the system predicts the next failure before it happens.",
        ],
      },
      {
        h: "What to measure during the pilot",
        p: [
          "MTTR for the top 10 most common failures. Track the trend for the first three months.",
          "Number of recurring failures on the same machine — it should drop because technicians have access to previous solutions.",
          'After-hours escalations. If they fall, your night shift effectively has a "24/7 senior" in hand.',
        ],
      },
    ],
    related: ["ai-in-manufacturing", "capturing-technician-knowledge"],
  },
  {
    slug: "capturing-technician-knowledge",
    lang: "en",
    title: "Capturing senior technician knowledge before they retire",
    description:
      'How to move tacit senior knowledge into a system the whole team can use — without paperwork and without "please write this in Word".',
    date: "2026-06-25",
    readMin: 5,
    category: "Knowledge",
    intro:
      "The most valuable knowledge in a factory was never written down. It lives in the heads of five or six people who have been there 20+ years. AI can now capture it without costing the seniors extra time.",
    sections: [
      {
        h: "Why classic solutions fail",
        p: [
          "Wikis, SharePoint, Confluence — all tried. The reality: a senior technician doesn't have two hours a day to write. And when they do, juniors can't find it because they don't know what to search for.",
          "The fix isn't a better editor. It's a change of format — from writing to speaking.",
        ],
      },
      {
        h: "Voice logbook in practice",
        p: [
          "After each repair, the technician dictates 30–60 seconds: what happened, what they did, what to watch out for. AI turns it into a structured record with tags (machine, part, symptom) and makes it instantly searchable for the whole team.",
          "For the senior it's zero extra time. For the junior it means the next time the same case appears, they find it in 3 seconds.",
        ],
      },
      {
        h: "What it looks like after a year",
        p: [
          "A living knowledge base that grows on its own. Typically 1,500–3,000 records after a year, covering most recurring situations.",
          "When a senior leaves, their way of approaching problems stays in the system — including the phrasing juniors actually understand better than a dry manual.",
        ],
      },
    ],
    related: ["ai-in-manufacturing", "how-ai-reduces-unplanned-downtime"],
  },
  {
    slug: "plc-code-and-ai",
    lang: "en",
    title: "PLC code and AI: making machine data accessible to technicians",
    description:
      "PLC programs hold the answers to most questions, but technicians can't read them. See how AI reads PLC code and explains it in plain language.",
    date: "2026-06-22",
    readMin: 5,
    category: "Integrations",
    intro:
      "Most failure questions can be answered from the PLC program — which input turns off which output, which condition raises which alarm, why a cycle stopped. The problem: PLC code is read by 5% of people in the plant.",
    sections: [
      {
        h: "What AI can read today",
        p: [
          "Siemens S7 (SCL, LAD, FBD), Rockwell Studio 5000, Beckhoff TwinCAT, Mitsubishi GX Works. Exported programs are imported and linked to the I/O list and HMI structures.",
          'Technicians can then ask: "Why did the cycle stop at station 4?" and get an answer with the specific input, current state, and the last record of when this happened.',
        ],
      },
      {
        h: "Security and IT",
        p: [
          "PLC code never leaves the plant. In an on-prem deployment it is indexed locally and the AI accesses it over the internal network. For IT/OT teams that means the integration doesn't violate network segmentation.",
          "Read-only access is the default. AI never writes to a PLC. A human stays in the loop for every change.",
        ],
      },
      {
        h: "Real-world impact",
        p: [
          "A junior technician resolves a failure on a station they've never seen, because the PLC told them what's happening — without calling the PLC programmer.",
          "The PLC programmer finally gets to focus on development, not answering the same question for the tenth time.",
        ],
      },
    ],
    related: ["ai-in-manufacturing", "capturing-technician-knowledge"],
  },
];

export function postsByLang(lang: BlogLang): BlogPost[] {
  return POSTS.filter((p) => p.lang === lang).sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function findPost(lang: BlogLang, slug: string): BlogPost | undefined {
  return POSTS.find((p) => p.lang === lang && p.slug === slug);
}

export function postUrl(post: BlogPost): string {
  return post.lang === "sk" ? `/blog/${post.slug}` : `/blog/en/${post.slug}`;
}
