import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, useRef, type ReactNode, type FormEvent } from "react";
import { T, type Lang } from "@/lib/i18n";
import { CookieBanner } from "@/components/CookieBanner";

import { TechnicalBackground } from "@/components/TechnicalBackground";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const YEAR = 2026;

const SITE_URL = "https://demo-to-web.lovable.app";

// FAQ JSON-LD built from i18n SK dict so it stays in sync with rendered copy.
const FAQ_JSONLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: T.sk.faq.items.map((it) => ({
    "@type": "Question",
    name: it.q,
    acceptedAnswer: { "@type": "Answer", text: it.a },
  })),
};

export const Route = createFileRoute("/")({
  component: Landing,
  head: () => ({
    meta: [
      { title: "KobiKan — AI asistent údržby pre priemyselné prevádzky" },
      {
        name: "description",
        content:
          "KobiKan zachytí znalosti vašej prevádzky a mení ich na okamžité odpovede pre každého technika. Pilot za 14 dní. On-prem alebo cloud. Projekt firmy Touch4IT.",
      },
      { property: "og:title", content: "KobiKan — AI asistent údržby pre priemyselné prevádzky" },
      {
        property: "og:description",
        content:
          "KobiKan zachytí znalosti vašej prevádzky a mení ich na okamžité odpovede pre každého technika. Pilot za 14 dní. On-prem alebo cloud. Projekt firmy Touch4IT.",
      },
      { property: "og:url", content: `${SITE_URL}/` },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "KobiKan" },
      { property: "og:locale", content: "sk_SK" },
      { property: "og:locale:alternate", content: "en_US" },
    ],
    links: [
      { rel: "canonical", href: `${SITE_URL}/` },
      { rel: "alternate", hrefLang: "sk", href: `${SITE_URL}/` },
      { rel: "alternate", hrefLang: "en", href: `${SITE_URL}/` },
      { rel: "alternate", hrefLang: "x-default", href: `${SITE_URL}/` },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              name: "KobiKan",
              url: SITE_URL,
              logo: `${SITE_URL}/favicon.ico`,
              description: "AI asistent údržby pre priemyselné prevádzky.",
              parentOrganization: {
                "@type": "Organization",
                name: "Touch4IT",
                url: "https://touch4it.com",
              },
            },
            {
              "@type": "WebSite",
              name: "KobiKan",
              url: SITE_URL,
            },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(FAQ_JSONLD),
      },
    ],
  }),
});

function Landing() {
  const [lang, setLang] = useState<Lang>("sk");
  const [open, setOpen] = useState(false);
  const t = T[lang];

  const openModal = () => setOpen(true);

  return (
    <div className="min-h-screen bg-white text-[color:var(--color-dark)]">
      <Nav t={t} lang={lang} setLang={setLang} onCta={openModal} />
      <Hero t={t} onCta={openModal} />
      <Problem t={t} />
      <Intro t={t} />
      <Features t={t} />
      <Who t={t} />
      <HowItWorks t={t} onCta={openModal} />
      <Differentiation t={t} />
      <Deployment t={t} />
      <About t={t} />
      <Trust t={t} />
      <Faq t={t} />
      <FinalCta t={t} onCta={openModal} />
      <Footer t={t} />
      {open && <ContactModal t={t} onClose={() => setOpen(false)} />}
      <CookieBanner lang={lang} />
    </div>
  );
}

/* ---------- Logo ---------- */
function Logo({ className = "" }: { className?: string }) {
  return (
    <img src="/kobikan-logo.svg" alt="KobiKan" className={`h-8 w-auto ${className}`} />
  );
}

/* ---------- Nav ---------- */
function Nav({
  t,
  lang,
  setLang,
  onCta,
}: {
  t: typeof T.sk;
  lang: Lang;
  setLang: (l: Lang) => void;
  onCta: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#features", label: t.nav.features },
    { href: "#how", label: t.nav.how },
    { href: "#deployment", label: t.nav.deployment },
    { href: "#about", label: t.nav.about },
    { href: "#faq", label: t.nav.faq },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all ${scrolled ? "backdrop-blur-md bg-white/80 border-b border-[color:var(--color-border)]" : "bg-white"}`}
    >
      <div className="container-x flex h-16 items-center justify-between">
        <a href="#top" className="flex items-center gap-2">
          <Logo />
        </a>
        <nav className="hidden lg:flex items-center gap-7 text-sm text-[color:var(--color-dark)]/80">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="hover:text-[color:var(--color-brand)] transition-colors"
            >
              {l.label}
            </a>
          ))}
          <Link
            to={lang === "sk" ? "/blog" : "/blog/en"}
            className="hover:text-[color:var(--color-brand)] transition-colors"
          >
            Blog
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1 text-xs font-medium">
            <button
              onClick={() => setLang("sk")}
              className={`px-1.5 py-0.5 ${lang === "sk" ? "text-[color:var(--color-brand)] underline underline-offset-4" : "text-[color:var(--color-neutral-gray)]"}`}
            >
              SK
            </button>
            <span className="text-[color:var(--color-neutral-gray)]">|</span>
            <button
              onClick={() => setLang("en")}
              className={`px-1.5 py-0.5 ${lang === "en" ? "text-[color:var(--color-brand)] underline underline-offset-4" : "text-[color:var(--color-neutral-gray)]"}`}
            >
              EN
            </button>
          </div>
          <CtaButton onClick={onCta} size="sm">
            {t.nav.cta}
          </CtaButton>
        </div>
      </div>
    </header>
  );
}

/* ---------- Buttons ---------- */
function CtaButton({
  children,
  onClick,
  size = "md",
  variant = "primary",
}: {
  children: ReactNode;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "white" | "outline";
}) {
  const sizes = { sm: "px-4 py-2 text-sm", md: "px-5 py-2.5 text-sm", lg: "px-7 py-3.5 text-base" };
  const variants = {
    primary: "bg-[color:var(--color-brand)] text-white hover:brightness-110",
    white: "bg-white text-[color:var(--color-dark)] hover:bg-white/90",
    outline: "border border-white/30 text-white hover:bg-white/10",
  };
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-md font-semibold transition-all ${sizes[size]} ${variants[variant]}`}
    >
      {children}
    </button>
  );
}

/* ---------- Hero ---------- */
function Hero({ t, onCta }: { t: typeof T.sk; onCta: () => void }) {
  return (
    <section id="top" className="relative overflow-hidden bg-[color:var(--color-dark)] text-white">
      <TechnicalBackground />
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="container-x relative pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 fade-in-up">
            <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--color-brand)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-brand)]" />
              {t.hero.eyebrow}
            </span>
            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05]">
              {t.hero.h1a}
              <br />
              <span className="text-[color:var(--color-brand)]">{t.hero.h1b}</span>
            </h1>
            <p className="mt-6 text-lg text-white/70 max-w-xl">{t.hero.sub}</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <CtaButton onClick={onCta} size="lg">
                {t.hero.cta} →
              </CtaButton>
              <a href="#features" className="text-sm font-medium text-white/80 hover:text-white">
                {t.hero.secondary} →
              </a>
            </div>
          </div>
          <div className="lg:col-span-5">
            <HeroMock />
          </div>
        </div>

        <div className="mt-16 lg:mt-24 grid grid-cols-1 sm:grid-cols-3 gap-8 border-t border-white/10 pt-10">
          {[
            { v: "50 %", l: t.hero.stat1 },
            { v: "8+", l: t.hero.stat2 },
            { v: "70 %", l: t.hero.stat3 },
          ].map((s) => (
            <div key={s.v}>
              <div className="text-4xl lg:text-5xl font-semibold text-[color:var(--color-brand)] font-display">
                {s.v}
              </div>
              <p className="mt-2 text-sm text-white/60 max-w-[260px]">{s.l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HeroMock() {
  return (
    <div className="relative">
      <div className="absolute -inset-4 bg-[color:var(--color-brand)]/20 blur-3xl rounded-full opacity-40" />
      <div className="relative rounded-xl border border-white/10 bg-[color:var(--color-dark-soft)] shadow-2xl overflow-hidden">
        <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/10">
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="ml-3 text-xs text-white/40 font-mono">kobikan.app / line-7</span>
        </div>
        <div className="p-5 space-y-3 text-sm">
          <div className="flex gap-3">
            <span className="h-7 w-7 shrink-0 rounded-full bg-white/10 grid place-items-center text-[10px] text-white/70">
              JM
            </span>
            <div className="rounded-lg bg-white/5 px-3 py-2 text-white/90">
              Error E-417 na CNC linke 7. Čo robím?
            </div>
          </div>
          <div className="flex gap-3">
            <span className="h-7 w-7 shrink-0 rounded-full bg-[color:var(--color-brand)] grid place-items-center text-[10px] font-bold">
              K
            </span>
            <div className="rounded-lg bg-white/10 px-3 py-2 text-white/95">
              E-417 = spindle overload. Skontrolujte chladenie a tlak (≥ 4,2 bar). V 73 % prípadov
              stačí výmena filtra F-22.
              <div className="mt-2 text-[11px] text-white/50">
                Zdroj: manual_cnc_v3.pdf · str. 142 · logbook #1847
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="h-7 w-7 shrink-0 rounded-full bg-white/10 grid place-items-center text-[10px] text-white/70">
              JM
            </span>
            <div className="rounded-lg bg-white/5 px-3 py-2 text-white/90">Aký je SKU filtra?</div>
          </div>
          <div className="flex gap-3">
            <span className="h-7 w-7 shrink-0 rounded-full bg-[color:var(--color-brand)] grid place-items-center text-[10px] font-bold">
              K
            </span>
            <div className="rounded-lg bg-white/10 px-3 py-2 text-white/95 font-mono text-[13px]">
              F-22-A · 4 ks na sklade · regál B3-04
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Problem ---------- */
function Problem({ t }: { t: typeof T.sk }) {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="container-x">
        <SectionLabel>{t.problem.label}</SectionLabel>
        <h2 className="mt-4 text-3xl lg:text-5xl font-semibold tracking-tight max-w-3xl">
          {t.problem.headline}
        </h2>
        <div className="mt-12 grid gap-px bg-[color:var(--color-border)] border border-[color:var(--color-border)] rounded-xl overflow-hidden md:grid-cols-3">
          {t.problem.items.map((item, i) => (
            <div key={i} className="bg-white p-6 lg:p-8 flex flex-col gap-4">
              <span className="text-[color:var(--color-brand)] font-display font-semibold text-2xl">
                0{i + 1}
              </span>
              <h3 className="text-xl lg:text-2xl font-semibold text-[color:var(--color-dark)] tracking-tight">
                {item.title}
              </h3>
              <p className="text-base text-[color:var(--color-dark)]/70 leading-relaxed">
                {item.body}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-lg font-medium text-[color:var(--color-brand)]">
          {t.problem.closing}
        </p>
      </div>
    </section>
  );
}

/* ---------- Intro ---------- */
function Intro({ t }: { t: typeof T.sk }) {
  return (
    <section className="bg-[color:var(--color-dark)] text-white py-20 lg:py-28">
      <div className="container-x">
        <SectionLabel dark>{t.intro.label}</SectionLabel>
        <h2 className="mt-4 text-3xl lg:text-5xl font-semibold tracking-tight text-white max-w-3xl">
          {t.intro.headline}
        </h2>
        <div className="mt-14 grid md:grid-cols-2 gap-px bg-white/10 border border-white/10 rounded-xl overflow-hidden">
          {t.intro.items.map((it, i) => (
            <div
              key={i}
              className={`bg-[color:var(--color-dark)] p-8 lg:p-10 ${i === 1 || i === 2 ? "md:py-14" : ""}`}
            >
              <div className="text-[color:var(--color-brand)] font-display font-semibold text-3xl">
                0{i + 1}
              </div>
              <h3 className="mt-3 text-xl font-semibold text-white">{it.title}</h3>
              <p className="mt-2 text-white/60 max-w-md">{it.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Features ---------- */
function Features({ t }: { t: typeof T.sk }) {
  return (
    <section id="features" className="bg-white py-20 lg:py-28">
      <div className="container-x">
        <SectionLabel>{t.features.eyebrow}</SectionLabel>
        <h2 className="mt-4 text-3xl lg:text-5xl font-semibold tracking-tight max-w-3xl">
          {t.features.headline}
        </h2>

        <div className="mt-16 space-y-24">
          {t.features.list.map((f, i) => {
            const reverse = i % 2 === 1;
            return (
              <div key={i} className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                <div className={reverse ? "lg:order-2" : ""}>
                  <span className="inline-block text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--color-brand)]">
                    {f.tag}
                  </span>
                  <h3 className="mt-3 text-2xl lg:text-3xl font-semibold tracking-tight">
                    {f.title}
                  </h3>
                  <p className="mt-4 text-lg text-[color:var(--color-muted-foreground)] max-w-lg">
                    {f.body}
                  </p>
                </div>
                <FeatureMock index={i} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FeatureMock({ index }: { index: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const base =
    "rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-dark)] text-white overflow-hidden shadow-xl";

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const st = {
        trigger: containerRef.current,
        start: "top 80%",
      };

      if (index === 0) {
        // Chat messages stagger in
        gsap.from(".chat-msg", {
          scrollTrigger: st,
          y: 20,
          opacity: 0,
          duration: 0.5,
          stagger: 0.8,
          ease: "power2.out",
          delay: 0.2,
        });
      } else if (index === 1) {
        // Voice recording pulse and text
        const tl = gsap.timeline({ repeat: -1 });
        tl.to(".voice-pulse", { scale: 1.5, opacity: 0, duration: 1.5, ease: "power2.out" });

        gsap.from(".voice-text", {
          scrollTrigger: st,
          opacity: 0,
          y: 10,
          duration: 0.5,
          delay: 0.5,
        });
        gsap.from(".voice-success", {
          scrollTrigger: st,
          opacity: 0,
          scale: 0.8,
          duration: 0.5,
          delay: 1.5,
          ease: "back.out(1.7)",
        });
      } else if (index === 2) {
        // Logbook entries slide in
        gsap.from(".logbook-entry", {
          scrollTrigger: st,
          x: -20,
          opacity: 0,
          duration: 0.4,
          stagger: 0.2,
          ease: "power2.out",
          delay: 0.2,
        });
      } else if (index === 3) {
        // Integrations checkmarks pop in
        gsap.from(".integration-item", {
          scrollTrigger: st,
          scale: 0.9,
          opacity: 0,
          duration: 0.3,
          stagger: 0.1,
          ease: "back.out(1.5)",
          delay: 0.2,
        });
        gsap.from(".integration-check", {
          scrollTrigger: st,
          scale: 0,
          opacity: 0,
          duration: 0.3,
          stagger: 0.1,
          ease: "back.out(2)",
          delay: 0.4,
        });
      } else if (index === 4) {
        // Dashboard metrics fade in and chart grows
        gsap.from(".dash-metric", {
          scrollTrigger: st,
          y: 15,
          opacity: 0,
          duration: 0.5,
          stagger: 0.15,
          ease: "power2.out",
          delay: 0.2,
        });
        gsap.fromTo(
          ".dash-chart",
          { width: "0%" },
          { scrollTrigger: st, width: "100%", duration: 1.5, ease: "power3.inOut", delay: 0.5 },
        );
        gsap.from(".dash-alert", {
          scrollTrigger: st,
          x: 20,
          opacity: 0,
          duration: 0.4,
          stagger: 0.2,
          ease: "power2.out",
          delay: 1,
        });
      }
    },
    { scope: containerRef, dependencies: [index] },
  );

  if (index === 0)
    return (
      <div ref={containerRef} className={base}>
        <div className="px-4 py-3 border-b border-white/10 text-xs text-white/40 font-mono">
          chat · línia 7
        </div>
        <div className="p-5 space-y-3 text-sm">
          <div className="chat-msg rounded-md bg-white/5 px-3 py-2">
            Aké je nastavenie tlaku pre F-22?
          </div>
          <div className="chat-msg rounded-md bg-[color:var(--color-brand)]/15 border border-[color:var(--color-brand)]/30 px-3 py-2">
            4,2–4,8 bar. Pri poklese pod 4,0 bar zastaviť linku.
            <div className="text-[11px] text-white/40 mt-1">→ manual_cnc_v3.pdf p.142</div>
          </div>
        </div>
      </div>
    );
  if (index === 1)
    return (
      <div ref={containerRef} className={base + " p-8 text-center"}>
        <div className="mx-auto h-20 w-20 rounded-full bg-[color:var(--color-brand)]/20 grid place-items-center relative">
          <div className="voice-pulse absolute inset-0 rounded-full bg-[color:var(--color-brand)]/40" />
          <div className="h-10 w-10 rounded-full bg-[color:var(--color-brand)] relative z-10" />
        </div>
        <p className="mt-5 text-sm text-white/70 font-mono">▮▮▮▮▮▮▮▯▯▯ 0:14</p>
        <p className="voice-text mt-3 text-white/90">
          "Vymenil som filter F-22, tlak je späť na 4,5 bar."
        </p>
        <p className="voice-success mt-3 text-xs text-[color:var(--color-brand)]">
          ✓ Záznam #1848 vytvorený
        </p>
      </div>
    );
  if (index === 2)
    return (
      <div ref={containerRef} className={base}>
        <div className="px-4 py-3 border-b border-white/10 text-xs text-white/40 font-mono">
          logbook · CNC-07
        </div>
        <div className="divide-y divide-white/10 text-sm">
          {[
            ["#1847", "Spindle overload", "J. Mráz"],
            ["#1812", "Coolant leak", "P. Novák"],
            ["#1798", "Sensor calibrate", "T. Kováč"],
          ].map(([id, title, who]) => (
            <div key={id} className="logbook-entry px-4 py-3 flex justify-between">
              <span className="font-mono text-white/50">{id}</span>
              <span className="text-white/90 flex-1 px-3">{title}</span>
              <span className="text-white/50 text-xs">{who}</span>
            </div>
          ))}
        </div>
      </div>
    );
  if (index === 3)
    return (
      <div ref={containerRef} className={base + " p-6"}>
        <div className="grid grid-cols-2 gap-3 text-xs">
          {["Dokumenty", "PLC programy", "MES / SQL", "ERP / SAP", "Schémy", "Logbook"].map((x) => (
            <div
              key={x}
              className="integration-item rounded-md border border-white/10 bg-white/5 px-3 py-3 flex items-center justify-between"
            >
              <span className="text-white/80">{x}</span>
              <span className="integration-check text-[color:var(--color-brand)]">✓</span>
            </div>
          ))}
        </div>
      </div>
    );
  return (
    <div ref={containerRef} className={base + " p-6"}>
      <div className="grid grid-cols-3 gap-3 text-xs">
        {[
          { l: "MTTR", v: "42m", c: "text-[color:var(--color-brand)]" },
          { l: "MTTB", v: "18h", c: "text-white" },
          { l: "Uptime", v: "98.4%", c: "text-emerald-400" },
        ].map((k) => (
          <div key={k.l} className="dash-metric rounded-md border border-white/10 p-3">
            <div className="text-white/40">{k.l}</div>
            <div className={`mt-1 text-xl font-semibold ${k.c}`}>{k.v}</div>
          </div>
        ))}
      </div>
      <div className="mt-4 h-24 rounded-md border border-white/10 bg-white/5 relative overflow-hidden">
        <div className="dash-chart absolute inset-y-0 left-0 bg-gradient-to-r from-[color:var(--color-brand)]/30 to-transparent" />
      </div>
      <div className="mt-3 space-y-1.5 text-xs text-white/70">
        <div className="dash-alert flex justify-between">
          <span>CNC-07 alarm E-417</span>
          <span className="text-[color:var(--color-brand)]">P1</span>
        </div>
        <div className="dash-alert flex justify-between">
          <span>Press-02 service due</span>
          <span className="text-amber-400">P2</span>
        </div>
      </div>
    </div>
  );
}

/* ---------- Who ---------- */
function Who({ t }: { t: typeof T.sk }) {
  return (
    <section id="why" className="bg-[color:var(--color-muted)] py-20 lg:py-28">
      <div className="container-x">
        <h2 className="text-3xl lg:text-5xl font-semibold tracking-tight max-w-3xl">
          {t.who.headline}
        </h2>
        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {t.who.items.map((it, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-7 border border-[color:var(--color-border)]"
            >
              <div className="text-[color:var(--color-brand)] font-display text-2xl font-semibold">
                0{i + 1}
              </div>
              <p className="mt-4 text-lg leading-snug">{it}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 text-lg text-[color:var(--color-muted-foreground)] max-w-3xl">
          {t.who.closing}
        </p>
      </div>
    </section>
  );
}

/* ---------- How ---------- */
function HowItWorks({ t, onCta }: { t: typeof T.sk; onCta: () => void }) {
  return (
    <section id="how" className="bg-[color:var(--color-dark)] text-white py-20 lg:py-28">
      <div className="container-x">
        <SectionLabel dark>{t.how.label}</SectionLabel>
        <h2 className="mt-4 text-3xl lg:text-5xl font-semibold tracking-tight text-white max-w-3xl">
          {t.how.headline}
        </h2>

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10 rounded-xl overflow-hidden">
          {t.how.steps.map((s) => (
            <div key={s.n} className="bg-[color:var(--color-dark)] p-7">
              <div className="font-mono text-xs text-[color:var(--color-brand)]">STEP {s.n}</div>
              <h3 className="mt-3 text-lg font-semibold text-white">{s.title}</h3>
              <p className="mt-2 text-sm text-white/60">{s.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <CtaButton onClick={onCta} size="lg">
            {t.how.cta} →
          </CtaButton>
        </div>
      </div>
    </section>
  );
}

/* ---------- Diff ---------- */
function Differentiation({ t }: { t: typeof T.sk }) {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="container-x">
        <h2 className="text-3xl lg:text-5xl font-semibold tracking-tight max-w-3xl">
          {t.diff.headline}
        </h2>

        <div className="mt-12 overflow-hidden rounded-xl border border-[color:var(--color-border)]">
          <div className="grid grid-cols-[1fr_auto_auto] text-sm">
            <div className="bg-[color:var(--color-muted)] px-6 py-4 font-semibold"></div>
            <div className="bg-[color:var(--color-brand)] text-white px-6 py-4 font-semibold text-center min-w-[110px]">
              {t.diff.cols.kobikan}
            </div>
            <div className="bg-[color:var(--color-muted)] px-6 py-4 font-semibold text-center min-w-[110px] text-[color:var(--color-muted-foreground)]">
              {t.diff.cols.others}
            </div>
            {t.diff.rows.map((r, i) => (
              <div key={i} className="contents">
                <div className={`px-6 py-4 ${i % 2 ? "bg-[color:var(--color-muted)]/50" : ""}`}>
                  {r.label}
                </div>
                <div
                  className={`px-6 py-4 text-center font-bold text-[color:var(--color-brand)] ${i % 2 ? "bg-[color:var(--color-muted)]/50" : ""}`}
                >
                  {r.k}
                </div>
                <div
                  className={`px-6 py-4 text-center text-[color:var(--color-neutral-gray)] ${i % 2 ? "bg-[color:var(--color-muted)]/50" : ""}`}
                >
                  {r.o}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Deployment ---------- */
function Deployment({ t }: { t: typeof T.sk }) {
  return (
    <section id="deployment" className="bg-[color:var(--color-dark)] text-white py-20 lg:py-28">
      <div className="container-x">
        <h2 className="text-3xl lg:text-5xl font-semibold tracking-tight text-white max-w-3xl">
          {t.deploy.headline}
        </h2>

        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {t.deploy.cards.map((c, i) => (
            <div
              key={i}
              className={`relative rounded-xl p-7 border ${i === 1 ? "border-[color:var(--color-brand)] bg-[color:var(--color-brand)]/5" : "border-white/10 bg-[color:var(--color-dark-soft)]"}`}
            >
              {c.tag && (
                <span className="absolute -top-3 left-7 inline-block bg-[color:var(--color-brand)] text-white text-[11px] uppercase tracking-wider font-semibold px-2 py-1 rounded">
                  {c.tag}
                </span>
              )}
              <div className="font-mono text-xs text-[color:var(--color-brand)]">0{i + 1}</div>
              <h3 className="mt-3 text-xl font-semibold text-white">{c.title}</h3>
              <p className="mt-3 text-sm text-white/70">{c.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-sm text-white/50">{t.deploy.note}</p>
      </div>
    </section>
  );
}

/* ---------- About / Touch4IT ---------- */
function About({ t }: { t: typeof T.sk }) {
  return (
    <section
      id="about"
      className="bg-white py-20 lg:py-28 border-t border-[color:var(--color-border)]"
    >
      <div className="container-x grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <SectionLabel>{t.about.label}</SectionLabel>
          <h2 className="mt-4 text-3xl lg:text-5xl font-semibold tracking-tight font-display max-w-md leading-[1.1]">
            {t.about.headline}
          </h2>
          <a
            href="https://touch4it.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--color-brand)] hover:underline"
          >
            {t.about.cta} <span aria-hidden>→</span>
          </a>
        </div>
        <div className="lg:col-span-7">
          <p className="text-lg text-[color:var(--color-dark)]/80 leading-relaxed">
            {t.about.lead}
          </p>
          <ul className="mt-8 space-y-3">
            {t.about.bullets.map((b, i) => (
              <li key={i} className="flex gap-3 text-sm text-[color:var(--color-dark)]/85">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--color-brand)]" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <div className="mt-10 pt-8 border-t border-[color:var(--color-border)]">
            <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--color-neutral-gray)] font-semibold">
              {t.about.clientsLabel}
            </p>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
              {t.about.clients.map((c) => (
                <span key={c} className="text-sm font-medium text-[color:var(--color-dark)]/70">
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Trust ---------- */
function Trust({ t }: { t: typeof T.sk }) {
  return (
    <section className="bg-white py-14 border-t border-[color:var(--color-border)]">
      <div className="container-x">
        <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--color-neutral-gray)] font-semibold">
          {t.trust.headline}
        </p>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-5">
          {t.trust.badges.map((b, i) => (
            <div key={i} className="flex items-center gap-3 text-sm font-medium">
              <span className="h-9 w-9 rounded-md bg-[color:var(--color-accent)] grid place-items-center text-[color:var(--color-brand)]">
                {["🔒", "🏭", "☁️", "🔗"][i]}
              </span>
              {b}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
function Faq({ t }: { t: typeof T.sk }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section
      id="faq"
      className="bg-white py-20 lg:py-28 border-t border-[color:var(--color-border)]"
    >
      <div className="container-x grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4">
          <SectionLabel>{t.faq.label}</SectionLabel>
          <h2 className="mt-4 text-3xl lg:text-5xl font-semibold tracking-tight font-display leading-[1.1]">
            {t.faq.headline}
          </h2>
        </div>
        <div className="lg:col-span-8">
          <ul className="divide-y divide-[color:var(--color-border)] border-y border-[color:var(--color-border)]">
            {t.faq.items.map((it, i) => {
              const isOpen = open === i;
              return (
                <li key={i}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-start justify-between gap-6 py-5 text-left"
                  >
                    <span className="text-base lg:text-lg font-semibold text-[color:var(--color-dark)]">
                      {it.q}
                    </span>
                    <span
                      className={`mt-1 shrink-0 text-2xl font-light text-[color:var(--color-brand)] transition-transform ${
                        isOpen ? "rotate-45" : ""
                      }`}
                      aria-hidden
                    >
                      +
                    </span>
                  </button>
                  {isOpen && (
                    <p className="pb-6 -mt-1 text-[color:var(--color-dark)]/75 leading-relaxed">
                      {it.a}
                    </p>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------- Final CTA ---------- */
function FinalCta({ t, onCta }: { t: typeof T.sk; onCta: () => void }) {
  return (
    <section id="contact" className="bg-[color:var(--color-brand)] text-white py-20 lg:py-28">
      <div className="container-x">
        <h2 className="text-3xl lg:text-5xl font-semibold tracking-tight text-white max-w-3xl">
          {t.finalCta.headline}
        </h2>
        <p className="mt-4 text-lg text-white/85 max-w-2xl">{t.finalCta.sub}</p>

        <div className="mt-10 grid sm:grid-cols-3 gap-8 border-y border-white/20 py-10">
          {t.finalCta.stats.map((s, i) => (
            <div key={i}>
              <div className="text-3xl lg:text-4xl font-semibold font-display">{s.v}</div>
              <p className="mt-2 text-sm text-white/80">{s.l}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-5">
          <CtaButton onClick={onCta} size="lg" variant="white">
            {t.finalCta.cta} →
          </CtaButton>
        </div>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
function Footer({ t }: { t: typeof T.sk }) {
  return (
    <footer className="bg-[color:var(--color-dark)] text-white/70 py-14">
      <div className="container-x grid md:grid-cols-2 gap-10">
        <div>
          <Logo className="h-9 w-auto text-white" />
          <p className="mt-4 text-sm text-white/60 max-w-xs">{t.footer.powered}</p>
        </div>
        <div className="text-sm space-y-2 md:text-right">
          <a href="#features" className="block hover:text-white">
            {t.nav.features}
          </a>
          <a href="#how" className="block hover:text-white">
            {t.nav.how}
          </a>
          <a href="#deployment" className="block hover:text-white">
            {t.nav.deployment}
          </a>
          <a href="#contact" className="block hover:text-white">
            {t.nav.contact}
          </a>
        </div>
      </div>
      <div className="container-x mt-10 pt-6 border-t border-white/10 text-xs text-white/40 flex flex-wrap justify-between gap-3">
        <span>
          © {YEAR} KobiKan. {t.footer.rights}
        </span>
        <span>{t.footer.powered}</span>
      </div>
    </footer>
  );
}

/* ---------- Section Label ---------- */
function SectionLabel({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] ${dark ? "text-[color:var(--color-brand)]" : "text-[color:var(--color-brand)]"}`}
    >
      <span className="h-px w-6 bg-[color:var(--color-brand)]" />
      {children}
    </span>
  );
}

/* ---------- Contact Modal ---------- */
function ContactModal({ t, onClose }: { t: typeof T.sk; onClose: () => void }) {
  const [sent, setSent] = useState(false);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl w-full max-w-lg shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[color:var(--color-border)]">
          <h3 className="font-semibold text-lg">{t.form.title}</h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-[color:var(--color-neutral-gray)] hover:text-[color:var(--color-dark)] text-2xl leading-none"
          >
            ×
          </button>
        </div>
        {sent ? (
          <div className="p-8 text-center">
            <div className="text-3xl">✓</div>
            <p className="mt-3 text-[color:var(--color-dark)]">{t.form.success}</p>
            <button
              onClick={onClose}
              className="mt-6 text-sm text-[color:var(--color-brand)] font-medium"
            >
              {t.nav.contact} →
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="p-6 space-y-3">
            <Field name="name" label={t.form.name} required />
            <Field name="company" label={t.form.company} required />
            <Field name="email" label={t.form.email} type="email" required />
            <Field name="phone" label={t.form.phone} type="tel" />
            <Field name="message" label={t.form.message} textarea />
            <button
              type="submit"
              className="w-full mt-2 rounded-md bg-[color:var(--color-brand)] text-white py-3 font-semibold hover:brightness-110"
            >
              {t.form.submit}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
  textarea,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
}) {
  const cls =
    "mt-1 w-full rounded-md border border-[color:var(--color-border)] px-3 py-2 text-sm focus:outline-none focus:border-[color:var(--color-brand)] focus:ring-2 focus:ring-[color:var(--color-brand)]/20";
  return (
    <label className="block">
      <span className="text-xs font-medium text-[color:var(--color-dark)]">
        {label}
        {required && " *"}
      </span>
      {textarea ? (
        <textarea name={name} required={required} rows={3} maxLength={1000} className={cls} />
      ) : (
        <input name={name} type={type} required={required} maxLength={255} className={cls} />
      )}
    </label>
  );
}
