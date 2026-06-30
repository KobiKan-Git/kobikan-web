import { createFileRoute, Link } from "@tanstack/react-router";
import { postsByLang, SITE_URL, type BlogPost } from "@/lib/blog-posts";

export const Route = createFileRoute("/blog/")({
  component: BlogIndexSK,
  head: () => ({
    meta: [
      { title: "Blog — KobiKan: AI v priemyselnej údržbe" },
      {
        name: "description",
        content:
          "Praktické články o AI v priemyselnej výrobe a údržbe — implementácia, downtime, zachytávanie znalostí, PLC integrácie.",
      },
      { property: "og:title", content: "Blog — KobiKan: AI v priemyselnej údržbe" },
      {
        property: "og:description",
        content:
          "Praktické články o AI v priemyselnej výrobe a údržbe — implementácia, downtime, zachytávanie znalostí, PLC integrácie.",
      },
      { property: "og:url", content: `${SITE_URL}/blog` },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/blog` }],
  }),
});

function BlogIndexSK() {
  const posts = postsByLang("sk");
  return <BlogIndex lang="sk" posts={posts} otherHref="/blog/en" otherLabel="EN" />;
}

export function BlogIndex({
  lang,
  posts,
  otherHref,
  otherLabel,
}: {
  lang: "sk" | "en";
  posts: BlogPost[];
  otherHref: string;
  otherLabel: string;
}) {
  const t =
    lang === "sk"
      ? {
          eyebrow: "Blog",
          title: "AI v priemyselnej údržbe",
          sub: "Praktické články pre tímy údržby, ktoré chcú znížiť výpadky a zachytiť znalosti svojich technikov.",
          read: "min čítania",
          back: "Späť na KobiKan",
        }
      : {
          eyebrow: "Blog",
          title: "AI in industrial maintenance",
          sub: "Practical articles for maintenance teams that want to reduce downtime and capture technician knowledge.",
          read: "min read",
          back: "Back to KobiKan",
        };
  const pillar = posts.find((p) => p.pillar);
  const rest = posts.filter((p) => !p.pillar);
  return (
    <main className="min-h-screen bg-white text-[color:var(--color-dark)] selection:bg-[color:var(--color-brand)]/30">
      <header className="border-b border-[color:var(--color-border)]">
        <div className="container-x flex h-16 items-center justify-between text-sm">
          <Link to="/" className="font-semibold tracking-tight">
            ← {t.back}
          </Link>
          <a
            href={otherHref}
            className="text-[color:var(--color-neutral-gray)] hover:text-[color:var(--color-brand)]"
          >
            {otherLabel}
          </a>
        </div>
      </header>

      <section className="container-x py-20 lg:py-28 max-w-6xl">
        {/* Eyebrow with hairline */}
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-[color:var(--color-brand)]" />
          <span className="text-[color:var(--color-brand)] font-semibold tracking-[0.2em] text-xs uppercase">
            {lang === "sk" ? "KobiKan Journal" : "The KobiKan Journal"}
          </span>
        </div>
        <h1 className="mt-5 text-5xl md:text-6xl font-display font-semibold tracking-tight max-w-3xl leading-[0.95]">
          {t.title}
        </h1>
        <p className="mt-6 max-w-xl text-lg text-[color:var(--color-neutral-gray)] leading-relaxed">
          {t.sub}
        </p>

        {/* Pillar — split card */}
        {pillar && (
          <Link
            to={lang === "sk" ? "/blog/$slug" : "/blog/en/$slug"}
            params={{ slug: pillar.slug }}
            className="group relative mt-16 block overflow-hidden rounded-3xl bg-[color:var(--color-dark)] transition-shadow duration-500 hover:shadow-2xl hover:shadow-[color:var(--color-brand)]/20"
          >
            <div className="flex flex-col md:flex-row">
              <div className="relative z-10 flex flex-1 flex-col justify-center p-8 md:p-14 lg:p-16">
                <span className="text-[color:var(--color-brand)] text-xs font-semibold uppercase tracking-[0.2em]">
                  {pillar.category}
                </span>
                <h2 className="mt-5 text-3xl md:text-4xl lg:text-5xl font-display font-semibold leading-[1.1] text-white tracking-tight">
                  {pillar.title}
                </h2>
                <p className="mt-5 text-white/60 text-base md:text-lg leading-relaxed max-w-lg">
                  {pillar.description}
                </p>
                <div className="mt-8 inline-flex items-center gap-3 text-white font-semibold text-sm group-hover:text-[color:var(--color-brand)] transition-colors">
                  {lang === "sk" ? "Čítať celý článok" : "Read full story"}
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
                <p className="mt-8 text-xs text-white/40 tracking-wide">
                  {pillar.readMin} {t.read} ·{" "}
                  {new Date(pillar.date).toLocaleDateString(lang === "sk" ? "sk-SK" : "en-US")}
                </p>
              </div>
              {/* Decorative panel (replaces image) */}
              <div className="relative flex-1 min-h-[280px] md:min-h-0 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,color-mix(in_oklab,var(--color-brand)_55%,transparent),transparent_60%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent,rgba(255,255,255,0.04)_40%,transparent_60%)]" />
                <div
                  className="absolute inset-0 opacity-[0.12]"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
                    backgroundSize: "44px 44px",
                  }}
                />
                <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[color:var(--color-dark)] to-transparent md:block hidden" />
                <div className="absolute bottom-6 right-6 text-[10px] uppercase tracking-[0.3em] text-white/40">
                  {lang === "sk" ? "Sprievodca" : "Pillar"}
                </div>
              </div>
            </div>
            <div className="absolute inset-0 pointer-events-none rounded-3xl ring-1 ring-inset ring-white/10" />
          </Link>
        )}

        {/* Supporting grid — image-card style with dark thumbnail + white body */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10">
          {rest.map((p) => (
            <Link
              key={p.slug}
              to={lang === "sk" ? "/blog/$slug" : "/blog/en/$slug"}
              params={{ slug: p.slug }}
              className="group flex flex-col"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-[color:var(--color-dark)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,color-mix(in_oklab,var(--color-brand)_45%,transparent),transparent_65%)] transition-transform duration-500 group-hover:scale-110" />
                <div
                  className="absolute inset-0 opacity-[0.1] transition-transform duration-500 group-hover:scale-110"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                  }}
                />
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                  <span className="font-display text-3xl text-white/85 leading-none tracking-tight">
                    {String(rest.indexOf(p) + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-white/50">
                    {p.category}
                  </span>
                </div>
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 pointer-events-none" />
              </div>
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-[color:var(--color-brand)] text-[10px] font-bold uppercase tracking-[0.25em]">
                    {p.category}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-neutral-300" />
                  <span className="text-neutral-500 text-xs">
                    {p.readMin} {t.read}
                  </span>
                </div>
                <h3 className="text-xl font-semibold font-display text-[color:var(--color-dark)] leading-snug group-hover:text-[color:var(--color-brand)] transition-colors">
                  {p.title}
                </h3>
                <p className="text-[color:var(--color-neutral-gray)] text-sm leading-relaxed line-clamp-2">
                  {p.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
