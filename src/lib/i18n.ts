export type Lang = "sk" | "en";

export type Dict = {
  nav: {
    features: string;
    how: string;
    why: string;
    deployment: string;
    contact: string;
    about: string;
    faq: string;
    cta: string;
  };
  hero: {
    eyebrow: string;
    h1a: string;
    h1b: string;
    sub: string;
    cta: string;
    secondary: string;
    stat1: string;
    stat2: string;
    stat3: string;
  };
  problem: {
    label: string;
    headline: string;
    items: { title: string; body: string }[];
    closing: string;
  };
  intro: { label: string; headline: string; items: { title: string; body: string }[] };
  features: {
    eyebrow: string;
    headline: string;
    list: { tag: string; title: string; body: string }[];
  };
  who: { headline: string; items: string[]; closing: string };
  how: {
    label: string;
    headline: string;
    steps: { n: string; title: string; body: string }[];
    cta: string;
  };
  diff: {
    headline: string;
    cols: { kobikan: string; others: string };
    rows: { label: string; k: string; o: string }[];
  };
  deploy: {
    headline: string;
    cards: { title: string; body: string; tag?: string }[];
    note: string;
  };
  trust: { headline: string; badges: string[] };
  about: {
    label: string;
    headline: string;
    lead: string;
    bullets: string[];
    clientsLabel: string;
    clients: string[];
    cta: string;
  };
  faq: { label: string; headline: string; items: { q: string; a: string }[] };
  finalCta: {
    headline: string;
    sub: string;
    stats: { v: string; l: string }[];
    cta: string;
    secondary: string;
  };
  form: {
    title: string;
    name: string;
    company: string;
    email: string;
    phone: string;
    message: string;
    submit: string;
    success: string;
  };
  footer: { rights: string; powered: string };
};

export const T: Record<Lang, Dict> = {
  sk: {
    nav: {
      features: "Funkcie",
      how: "Ako to funguje",
      why: "Prečo KobiKan",
      deployment: "Nasadenie",
      contact: "Kontakt",
      about: "O nás",
      faq: "FAQ",
      cta: "Naplánovať demo",
    },
    hero: {
      eyebrow: "AI asistent pre údržbu",
      h1a: "Váš najlepší technik práve odišiel do dôchodku.",
      h1b: "KobiKan nie.",
      sub: "KobiKan zachytáva znalosti vašej prevádzky a mení ich na okamžité odpovede — pre každého technika, na každej zmene, pri každom stroji.",
      cta: "Naplánovať demo",
      secondary: "Pozrite, ako to funguje",
      stat1: "skúsených technikov odíde do dôchodku v horizonte 5–10 rokov",
      stat2: "hodín týždenne stratených hľadaním správnej informácie",
      stat3: "porúch vzniká kvôli chýbajúcim informáciám",
    },
    problem: {
      label: "Riešenie",
      headline: "Jedna platforma pre znalosti, dáta a údržbu.",
      items: [
        {
          title: "Jednotný prístup k dátam a komunikácii",
          body: "Prepojíme SAP, MES, CMMS, technické manuály, schémy, I/O zoznamy a PLC programy do jedného miesta. Technik sa pýta v prirodzenom jazyku cez známe chatové rozhranie — KobiKan nájde odpoveď naprieč systémami a vždy ukáže zdroj. V tom istom rozhraní si technici aj píšu medzi sebou, odovzdávajú zmeny a zdieľajú postupy — celá komunikácia tímu ostáva na jednom mieste a stáva sa súčasťou znalostnej bázy.",
        },
        {
          title: "Digitalizácia záznamov údržby",
          body: "Koniec papierových denníkov a roztrúsených Excelov. Záznamy o opravách, kontrolách a incidentoch sa diktujú hlasom alebo zapisujú v štruktúrovanej forme — jednotný formát naprieč zmenami, strojmi a závodmi. Dáta sú okamžite použiteľné pre analýzy, MTTR/MTBF a prediktívnu údržbu.",
        },
        {
          title: "AI asistent pre každého technika",
          body: "Inteligentný kolega, ktorý pozná vašu prevádzku — manuály, históriu porúch aj postupy seniorov. Navádza krok po kroku pri diagnostike, navrhuje riešenia overené na vašich vlastných dátach a učí sa z každého vyriešeného prípadu. Dostupný 24/7, v slovenčine aj angličtine.",
        },
      ],
      closing: "Tri piliere. Jedna platforma. Okamžitý dopad.",
    },
    intro: {
      label: "Predstavujeme KobiKan",
      headline: "Váš digitálny kolega. Dostupný 24/7.",
      items: [
        { title: "Rozumie", body: "Manuálom, PLC kódu, servisným záznamom a skúsenostiam tímu." },
        { title: "Odpovedá", body: "Okamžite — presne, v jazyku technika, s odkazom na zdroj." },
        { title: "Integruje", body: "Funguje s vašimi existujúcimi systémami. Žiadna náhrada." },
        { title: "Učí sa", body: "Každý vyriešený prípad robí systém múdrejším." },
      ],
    },
    features: {
      eyebrow: "Kľúčové funkcie",
      headline: "Postavené pre každodennú prevádzku.",
      list: [
        {
          tag: "Konverzačné AI rozhranie",
          title: "Opýtajte sa čokoľvek. Odpoveď máte za sekundy.",
          body: "Intuitívne rozhranie bez potreby školenia. Operátori, technici aj inžinieri dostanú overenú odpoveď v zrozumiteľnom jazyku, vždy s odkazom na zdroj.",
        },
        {
          tag: "Hlasové ovládanie",
          title: "Bez rúk. Bez písania.",
          body: "Technik nahráva opravu hlasom. KobiKan automaticky vytvorí štruktúrovaný záznam do denníka — bez dotyku klávesnice.",
        },
        {
          tag: "Logbook znalostí",
          title: "Inštitucionálna pamäť, ktorá nikdy neodíde.",
          body: "Zachytávame najlepšie postupy vášho tímu a meníme ich na zdieľané znalosti. Noví technici sa zorientujú rýchlejšie, skúsenosti seniorov ostanú dostupné.",
        },
        {
          tag: "Integrácie",
          title: "Prepojí sa so systémami, ktoré už používate.",
          body: "Dokumenty, schémy, I/O listy, PLC programy, MES, SQL, ERP, znalosti tímu. Žiadny nový hardvér, žiadna náhrada nástrojov.",
        },
        {
          tag: "Real-time dashboard",
          title: "Úplný prehľad. Jedna obrazovka.",
          body: "Stav strojov, história incidentov, MTTR, MTTB, prioritné úlohy pre zmeny a tímy. Pre manažérov údržby, ktorí potrebujú skutočné dáta rýchlo.",
        },
      ],
    },
    who: {
      headline: "Stvorené pre závody, kde znalosti sú úzkym hrdlom.",
      items: [
        "Výrobné závody s neštandardizovanými procesmi",
        "Tímy s vysokou fluktuáciou alebo odchodom skúsených pracovníkov",
        "Firmy, ktoré chcú prepojiť výrobu a údržbu do jedného systému",
      ],
      closing:
        "Ak váš tím stále pracuje s roztrúsenými správami v Teams, Excel tabuľkami a nepísanými pravidlami — KobiKan je stvorený pre vás.",
    },
    how: {
      label: "Od prvého stretnutia po živý systém",
      headline: "Pilotná prevádzka za 2 týždne. Bez rizika.",
      steps: [
        {
          n: "01",
          title: "Úvodné demo",
          body: "Ukážeme KobiKan na vašich vlastných dátach a prediskutujeme rozsah pilotu.",
        },
        {
          n: "02",
          title: "Pilot (< 14 dní)",
          body: "Prvá verzia asistenta naživo na vašich reálnych strojoch a dokumentácii.",
        },
        {
          n: "03",
          title: "Nasadenie do celej firmy",
          body: "Rozšírime na celú spoločnosť s našou podporou — jedna platforma, všetky prevádzky.",
        },
        {
          n: "04",
          title: "Plný súlad",
          body: "V súlade s vašimi bezpečnostnými, IT a regulačnými štandardmi.",
        },
      ],
      cta: "Naplánovať demo",
    },
    diff: {
      headline: "Nie len ďalší chatbot. Stvorený pre priemyselnú realitu.",
      cols: { kobikan: "KobiKan", others: "Iní dodávatelia" },
      rows: [
        { label: "Číta dokumenty + PLC kód + procesné dáta", k: "✓", o: "✓" },
        { label: "Nasadenie na vlastnej infraštruktúre (on-prem)", k: "✓", o: "—" },
        { label: "Pilot za 2 týždne", k: "✓", o: "✓" },
        { label: "Zachytávanie znalostí tímu (logbook)", k: "✓", o: "—" },
        { label: "Hlasové ovládanie v teréne", k: "✓", o: "—" },
        { label: "Webová aplikácia + hardvér v cene", k: "✓", o: "—" },
      ],
    },
    deploy: {
      headline: "Nasadenie, ktoré rastie s vami.",
      cards: [
        {
          title: "Plný cloud",
          body: "Najrýchlejší štart, najnižšie náklady. Dáta uložené na Slovensku/v EÚ.",
        },
        {
          title: "On-Prem + AI cloud",
          body: "Jadro a dáta vo vašej továrni. AI v cloude. Najlepšie pre väčšinu podnikov.",
          tag: "Najobľúbenejšie",
        },
        {
          title: "Plný On-Prem",
          body: "Maximálna kontrola nad dátami. Pre výnimočné požiadavky na podnikovú bezpečnosť.",
        },
      ],
      note: "V súlade s GDPR. Dáta neopustia vašu infraštruktúru pri výbere On-Prem.",
    },
    trust: {
      headline: "Bezpečnosť, ktorej môžete dôverovať",
      badges: [
        "GDPR v súlade",
        "On-Premise nasadenie",
        "Privátny cloud",
        "SAP / MES / SQL integrácia",
      ],
    },
    about: {
      label: "O nás",
      headline: "Projekt firmy Touch4IT so zameraním na priemysel.",
      lead: "KobiKan vyvíja Touch4IT — slovenská technologická spoločnosť, ktorá viac ako 10 rokov stavia softvér pre náročné prostredia v zdravotníctve, vesmírnom priemysle, obrane a financiách. KobiKan vznikol ako špecializovaný produkt pre výrobné závody a údržbu, kde sa stretáva inžinierska skúsenosť Touch4IT s realitou priemyselnej výroby.",
      bullets: [
        "10+ rokov skúseností s enterprise softvérom v regulovaných odvetviach.",
        "Inžinierske tímy v Bratislave, projekty po celej EÚ.",
        "On-prem aj cloud nasadenia v súlade s GDPR a podnikovými IT štandardmi.",
      ],
      clientsLabel: "Touch4IT spolupracuje s",
      clients: [
        "AbbVie",
        "Coca-Cola",
        "ESA",
        "Eumetsat",
        "Ferrero",
        "Raiffeisen",
        "Saint-Gobain",
        "Stada",
      ],
      cta: "Viac o Touch4IT",
    },
    faq: {
      label: "FAQ",
      headline: "Časté otázky.",
      items: [
        {
          q: "Kde sú uložené naše dáta?",
          a: "V plnom on-prem nasadení neopustia dáta vašu sieť — model beží na vašom serveri. V hybridnom režime sú dokumenty a procesné dáta vo vašej infraštruktúre, do AI v cloude (EÚ regióny) idú len anonymizované otázky.",
        },
        {
          q: "Ako dlho trvá pilot?",
          a: "Štandardne 14 dní od podpisu NDA. Týždeň 1 — pripojenie dokumentácie a dát z 3–10 strojov. Týždeň 2 — testovanie s technikmi a meranie reálnych benefitov.",
        },
        {
          q: "S akými systémami sa KobiKan integruje?",
          a: "PDF manuály, schémy, I/O zoznamy, PLC programy (Siemens S7, Rockwell, Beckhoff, Mitsubishi), MES, SCADA, SQL, SAP, ERP a CMMS. Read-only ako štandard.",
        },
        {
          q: "Potrebujeme upraviť dokumentáciu pred nasadením?",
          a: "Nie. KobiKan si poradí aj s nedokonalou dokumentáciou. Doporučujeme spustiť pilot s existujúcimi materiálmi a čistiť iba to, čo sa reálne používa.",
        },
        {
          q: "Kto je za KobiKan?",
          a: "KobiKan je produkt firmy Touch4IT — slovenskej technologickej spoločnosti s viac než 10-ročnou skúsenosťou s enterprise softvérom v zdravotníctve, vesmíre, obrane a financiách.",
        },
        {
          q: "Aké sú náklady?",
          a: "Pilot má fixnú cenu odsúhlasenú vopred. Po pilote pokračujete na ročnej licencii podľa počtu strojov / používateľov. Konkrétnu cenovú ponuku pripravíme po prvej konzultácii.",
        },
      ],
    },
    finalCta: {
      headline: "Ukážeme vám to na vašich vlastných strojoch.",
      sub: "Nezáväzná konzultácia. Výsledky viditeľné už počas pilotu.",
      stats: [
        { v: "< 14 dní", l: "Od dokumentácie po funkčný pilot" },
        { v: "100 %", l: "Vaše dáta ostávajú vo vašej sieti" },
        { v: "1:1", l: "Konzultácia s naším tímom" },
      ],
      cta: "Naplánovať demo",
      secondary: "Alebo nás kontaktujte priamo",
    },
    form: {
      title: "Naplánovať demo",
      name: "Meno",
      company: "Spoločnosť",
      email: "Email",
      phone: "Telefón",
      message: "Správa",
      submit: "Odoslať",
      success: "Ďakujeme, ozveme sa do 24 hodín.",
    },
    footer: { rights: "Všetky práva vyhradené.", powered: "Powered by Touch4IT" },
  },
  en: {
    nav: {
      features: "Features",
      how: "How It Works",
      why: "Why KobiKan",
      deployment: "Deployment",
      contact: "Contact",
      about: "About",
      faq: "FAQ",
      cta: "Book a Demo",
    },
    hero: {
      eyebrow: "AI Maintenance Assistant",
      h1a: "Your best technician just retired.",
      h1b: "KobiKan didn't.",
      sub: "KobiKan captures the knowledge of your operations and turns it into instant answers — for every technician, on every shift, on every machine.",
      cta: "Book a Demo",
      secondary: "See how it works",
      stat1: "of experienced technicians will retire within 5–10 years",
      stat2: "hours lost weekly searching for the right information",
      stat3: "of failures originate from missing information",
    },
    problem: {
      label: "Solution",
      headline: "One platform for knowledge, data and maintenance.",
      items: [
        {
          title: "Unified access to data and communication",
          body: "We connect SAP, MES, CMMS, technical manuals, schematics, I/O lists and PLC programs into one place. Technicians ask in natural language through the familiar chat interface — KobiKan finds the answer across systems and always shows the source. The same interface also lets technicians message each other, hand over shifts and share procedures — all team communication stays in one place and becomes part of the knowledge base.",
        },
        {
          title: "Digitized maintenance records",
          body: "End of paper logbooks and scattered spreadsheets. Repair, inspection and incident reports are dictated by voice or captured in structured form — one consistent format across shifts, machines and plants. Data is immediately usable for analytics, MTTR/MTBF and predictive maintenance.",
        },
        {
          title: "AI assistant for every technician",
          body: "A smart colleague that knows your operation — manuals, failure history and the know-how of senior staff. Walks the team through diagnostics step by step, proposes solutions validated on your own data, and learns from every resolved case. Available 24/7, in English and Slovak.",
        },
      ],
      closing: "Three pillars. One platform. Immediate impact.",
    },
    intro: {
      label: "Introducing KobiKan",
      headline: "Your digital colleague. Available 24/7.",
      items: [
        { title: "Understands", body: "Manuals, PLC code, service records and team expertise." },
        {
          title: "Answers",
          body: "Immediately, precisely, in the technician's language, with source references.",
        },
        { title: "Integrates", body: "Works with your existing systems. No replacement needed." },
        { title: "Learns", body: "Every resolved case makes the system smarter." },
      ],
    },
    features: {
      eyebrow: "Key features",
      headline: "Built for everyday operations.",
      list: [
        {
          tag: "AI Conversational Interface",
          title: "Ask anything. Get the answer in seconds.",
          body: "Intuitive interface — no training required. Operators, technicians and engineers get trusted answers in plain language, with source references.",
        },
        {
          tag: "Voice Control",
          title: "Hands free. No typing required.",
          body: "Technicians report repairs by voice. KobiKan automatically creates a structured logbook entry — without touching a keyboard.",
        },
        {
          tag: "Knowledge Logbook",
          title: "Institutional memory that never retires.",
          body: "We capture your team's best practices and turn them into shared knowledge. New technicians onboard faster, senior expertise stays accessible.",
        },
        {
          tag: "Integrations",
          title: "Connects to the systems you already use.",
          body: "Documents, schematics, I/O lists, PLC programs, MES, SQL, ERP, team knowledge. No new hardware. No tool replacement.",
        },
        {
          tag: "Real-time Dashboard",
          title: "Full visibility. One screen.",
          body: "Machine status, incident history, MTTR, MTTB, priority task lists for shifts and teams. Built for maintenance managers who need real data, fast.",
        },
      ],
    },
    who: {
      headline: "Built for plants where knowledge is the bottleneck.",
      items: [
        "Manufacturing plants with non-standardized processes",
        "Teams facing high turnover or retirement of senior workers",
        "Companies wanting to bridge production and maintenance",
      ],
      closing:
        "If your team still relies on scattered Teams messages, Excel sheets, and tribal knowledge — KobiKan is built for you.",
    },
    how: {
      label: "From first meeting to live system",
      headline: "Pilot in 2 weeks. No risk.",
      steps: [
        {
          n: "01",
          title: "Intro Demo",
          body: "We walk through KobiKan on your own data and scope the pilot together.",
        },
        {
          n: "02",
          title: "Pilot (< 14 days)",
          body: "First version of the assistant live on your real machines and documentation.",
        },
        {
          n: "03",
          title: "Full Deployment",
          body: "Scale to the entire company — one platform, all operations.",
        },
        {
          n: "04",
          title: "Full Compliance",
          body: "Compliant with your security, IT and regulatory standards.",
        },
      ],
      cta: "Book a demo",
    },
    diff: {
      headline: "Not just another chatbot. Built for industrial reality.",
      cols: { kobikan: "KobiKan", others: "Other Vendors" },
      rows: [
        { label: "Reads documents + PLC code + process data", k: "✓", o: "✓" },
        { label: "On-premise deployment option", k: "✓", o: "—" },
        { label: "Pilot within 2 weeks", k: "✓", o: "✓" },
        { label: "Team knowledge capture (logbook)", k: "✓", o: "—" },
        { label: "Voice control for field work", k: "✓", o: "—" },
        { label: "Web app + hardware included", k: "✓", o: "—" },
      ],
    },
    deploy: {
      headline: "Deployment that grows with you.",
      cards: [
        { title: "Full Cloud", body: "Fastest launch, lowest cost. Data stored in Slovakia/EU." },
        {
          title: "On-Prem + AI Cloud",
          body: "Core and data in your factory. AI in the cloud. Best for most enterprise clients.",
          tag: "Most popular",
        },
        {
          title: "Full On-Prem",
          body: "Maximum data control. For exceptional enterprise security requirements.",
        },
      ],
      note: "GDPR compliant. Data never leaves your infrastructure if you choose On-Prem.",
    },
    trust: {
      headline: "Security you can trust",
      badges: [
        "GDPR Compliant",
        "On-Premise Deployment",
        "Private Cloud Option",
        "SAP / MES / SQL Integration",
      ],
    },
    finalCta: {
      headline: "We'll show you on your own machines.",
      sub: "No-obligation consultation. Results visible during the pilot.",
      stats: [
        { v: "< 14 days", l: "From documentation to working pilot" },
        { v: "100%", l: "Your data stays in your network" },
        { v: "1:1", l: "Consultation with our team" },
      ],
      cta: "Book a Demo",
      secondary: "Or contact us directly",
    },
    form: {
      title: "Book a Demo",
      name: "Name",
      company: "Company",
      email: "Email",
      phone: "Phone",
      message: "Message",
      submit: "Send",
      success: "Thanks — we'll be in touch within 24 hours.",
    },
    about: {
      label: "About",
      headline: "A Touch4IT project focused on industrial manufacturing.",
      lead: "KobiKan is built by Touch4IT — a Slovak software company with 10+ years of building enterprise platforms for demanding environments in healthcare, space, defense and finance. KobiKan was created as a focused product for plants and maintenance teams, combining Touch4IT's engineering experience with the reality of industrial production.",
      bullets: [
        "10+ years building enterprise software in regulated industries.",
        "Engineering teams in Bratislava, projects across the EU.",
        "On-prem and cloud deployments aligned with GDPR and enterprise IT standards.",
      ],
      clientsLabel: "Touch4IT works with",
      clients: [
        "AbbVie",
        "Coca-Cola",
        "ESA",
        "Eumetsat",
        "Ferrero",
        "Raiffeisen",
        "Saint-Gobain",
        "Stada",
      ],
      cta: "More about Touch4IT",
    },
    faq: {
      label: "FAQ",
      headline: "Frequently asked questions.",
      items: [
        {
          q: "Where is our data stored?",
          a: "In a full on-prem deployment your data never leaves the network — the model runs on your own servers. In a hybrid setup, documents and process data stay in your infrastructure; only anonymized questions go to the AI in the cloud (EU regions).",
        },
        {
          q: "How long does the pilot take?",
          a: "Typically 14 days from NDA. Week 1 — connect documentation and data from 3–10 machines. Week 2 — testing with technicians on shift and measuring real impact.",
        },
        {
          q: "What systems does KobiKan integrate with?",
          a: "PDF manuals, schematics, I/O lists, PLC programs (Siemens S7, Rockwell, Beckhoff, Mitsubishi), MES, SCADA, SQL, SAP, ERP and CMMS. Read-only by default.",
        },
        {
          q: "Do we need to clean up the documentation first?",
          a: "No. KobiKan handles imperfect documentation. We recommend running the pilot with what you already have and cleaning only what is actually used.",
        },
        {
          q: "Who builds KobiKan?",
          a: "KobiKan is a product by Touch4IT — a Slovak software company with 10+ years of experience in enterprise platforms for healthcare, space, defense and finance.",
        },
        {
          q: "What does it cost?",
          a: "The pilot has a fixed, agreed-upon price. After the pilot you continue on an annual license based on the number of machines / users. A concrete quote follows the first consultation.",
        },
      ],
    },
    footer: { rights: "All rights reserved.", powered: "Powered by Touch4IT" },
  },
};
