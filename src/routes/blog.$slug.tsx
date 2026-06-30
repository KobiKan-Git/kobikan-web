import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  DEFAULT_BLOG_OG_IMAGE,
  findPost,
  pairedSlug,
  postsByLang,
  postUrl,
  SITE_URL,
  type BlogPost,
} from "@/lib/blog-posts";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = findPost("sk", params.slug);
    if (!post) throw notFound();
    return post;
  },
  component: SKPost,
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    return postHead(loaderData);
  },
  notFoundComponent: () => <NotFound lang="sk" />,
});

function SKPost() {
  const post = Route.useLoaderData();
  return <PostView post={post} />;
}

export function postHead(post: BlogPost) {
  const url = `${SITE_URL}${postUrl(post)}`;
  const pair = pairedSlug(post);
  const altLang: "sk" | "en" = post.lang === "sk" ? "en" : "sk";
  const altUrl = pair
    ? `${SITE_URL}${altLang === "sk" ? `/blog/${pair}` : `/blog/en/${pair}`}`
    : undefined;
  const blogIndexUrl = post.lang === "sk" ? `${SITE_URL}/blog` : `${SITE_URL}/blog/en`;

  return {
    meta: [
      { title: `${post.title} — KobiKan` },
      { name: "description", content: post.description },
      { property: "og:title", content: post.title },
      { property: "og:description", content: post.description },
      { property: "og:url", content: url },
      { property: "og:type", content: "article" },
      { property: "og:image", content: DEFAULT_BLOG_OG_IMAGE },
      { property: "og:locale", content: post.lang === "sk" ? "sk_SK" : "en_US" },
      { property: "article:published_time", content: post.date },
      { property: "article:section", content: post.category },
      { property: "article:publisher", content: "https://touch4it.com" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: post.title },
      { name: "twitter:description", content: post.description },
      { name: "twitter:image", content: DEFAULT_BLOG_OG_IMAGE },
    ],
    links: [
      { rel: "canonical", href: url },
      // Self + alternate hreflang
      { rel: "alternate", hrefLang: post.lang === "sk" ? "sk" : "en", href: url },
      ...(altUrl
        ? [
            { rel: "alternate", hrefLang: altLang, href: altUrl },
            { rel: "alternate", hrefLang: "x-default", href: post.lang === "en" ? url : altUrl },
          ]
        : []),
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.description,
          image: [DEFAULT_BLOG_OG_IMAGE],
          datePublished: post.date,
          dateModified: post.date,
          inLanguage: post.lang === "sk" ? "sk-SK" : "en-US",
          author: { "@type": "Organization", name: "KobiKan", url: SITE_URL },
          publisher: {
            "@type": "Organization",
            name: "Touch4IT",
            url: "https://touch4it.com",
            logo: { "@type": "ImageObject", url: `${SITE_URL}/favicon.ico` },
          },
          mainEntityOfPage: { "@type": "WebPage", "@id": url },
          articleSection: post.category,
          wordCount: post.sections.reduce((acc, s) => acc + s.p.join(" ").split(/\s+/).length, 0),
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: post.lang === "sk" ? "Domov" : "Home",
              item: `${SITE_URL}/`,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Blog",
              item: blogIndexUrl,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: post.title,
              item: url,
            },
          ],
        }),
      },
    ],
  };
}

export function PostView({ post }: { post: BlogPost }) {
  const t =
    post.lang === "sk"
      ? {
          back: "Späť na blog",
          related: "Súvisiace články",
          cta: "Naplánovať demo",
          ctaSub: "Pozrite KobiKan na vašich strojoch.",
          home: "KobiKan",
          read: "min čítania",
          breadcrumbHome: "Domov",
          stickyMsg: "Páči sa vám článok?",
          stickyCta: "Naplánovať demo",
          author: "Tím KobiKan · Touch4IT",
        }
      : {
          back: "Back to blog",
          related: "Related articles",
          cta: "Book a demo",
          ctaSub: "See KobiKan on your own machines.",
          home: "KobiKan",
          read: "min read",
          breadcrumbHome: "Home",
          stickyMsg: "Like what you're reading?",
          stickyCta: "Book a demo",
          author: "KobiKan team · Touch4IT",
        };
  const blogHref = post.lang === "sk" ? "/blog" : "/blog/en";
  const related = post.related
    .map((s) => postsByLang(post.lang).find((p) => p.slug === s))
    .filter((p): p is BlogPost => Boolean(p));

  return (
    <main className="min-h-screen bg-white text-[color:var(--color-dark)]">
      <header className="border-b border-[color:var(--color-border)]">
        <div className="container-x flex h-16 items-center justify-between text-sm">
          <Link to="/" className="font-semibold tracking-tight">
            {t.home}
          </Link>
          <Link
            to={blogHref}
            className="text-[color:var(--color-neutral-gray)] hover:text-[color:var(--color-brand)]"
          >
            ← {t.back}
          </Link>
        </div>
      </header>

      <article className="container-x py-16 lg:py-24 max-w-3xl pb-32">
        {/* Visible breadcrumbs */}
        <nav aria-label="Breadcrumb" className="text-xs text-[color:var(--color-neutral-gray)]">
          <Link to="/" className="hover:text-[color:var(--color-brand)]">
            {t.breadcrumbHome}
          </Link>
          <span className="mx-2">/</span>
          <Link to={blogHref} className="hover:text-[color:var(--color-brand)]">
            Blog
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[color:var(--color-dark)]/70">{post.category}</span>
        </nav>

        <span className="mt-6 block text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--color-brand)]">
          {post.category}
        </span>
        <h1 className="mt-4 text-3xl lg:text-5xl font-semibold font-display leading-tight">
          {post.title}
        </h1>
        <p className="mt-4 text-sm text-[color:var(--color-neutral-gray)]">
          {new Date(post.date).toLocaleDateString(post.lang === "sk" ? "sk-SK" : "en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          · {post.readMin} {t.read} · {t.author}
        </p>

        <p className="mt-8 text-lg text-[color:var(--color-dark)]/85 leading-relaxed">
          {post.intro}
        </p>

        <div className="mt-10 space-y-12">
          {post.sections.map((s, i) => (
            <section key={i}>
              <h2 className="text-2xl font-semibold font-display">{s.h}</h2>
              <div className="mt-4 space-y-4 text-[color:var(--color-dark)]/80 leading-relaxed">
                {s.p.map((para, j) => (
                  <p key={j}>{para}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-16 rounded-2xl bg-[color:var(--color-dark)] text-white p-8 lg:p-10">
          <h3 className="text-2xl font-semibold font-display">{t.cta}</h3>
          <p className="mt-2 text-white/70">{t.ctaSub}</p>
          <Link
            to="/"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-[color:var(--color-brand)] px-5 py-2.5 text-sm font-semibold hover:opacity-90"
          >
            {t.cta} →
          </Link>
        </div>

        {related.length > 0 && (
          <section className="mt-16">
            <h3 className="text-xl font-semibold font-display">{t.related}</h3>
            <div className="mt-4 grid sm:grid-cols-2 gap-4">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to={post.lang === "sk" ? "/blog/$slug" : "/blog/en/$slug"}
                  params={{ slug: r.slug }}
                  className="rounded-xl border border-[color:var(--color-border)] p-5 hover:border-[color:var(--color-brand)] transition-colors"
                >
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--color-brand)]">
                    {r.category}
                  </span>
                  <p className="mt-2 font-semibold">{r.title}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>

      <StickyCta lang={post.lang} msg={t.stickyMsg} cta={t.stickyCta} />
    </main>
  );
}

function StickyCta({ lang: _lang, msg, cta }: { lang: "sk" | "en"; msg: string; cta: string }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!visible) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 pointer-events-none">
      <div className="container-x pb-4">
        <div className="pointer-events-auto mx-auto max-w-3xl rounded-2xl bg-[color:var(--color-dark)] text-white shadow-2xl border border-white/10 px-5 py-3 flex items-center justify-between gap-4">
          <p className="text-sm text-white/80 hidden sm:block">{msg}</p>
          <Link
            to="/"
            className="ml-auto inline-flex items-center gap-2 rounded-full bg-[color:var(--color-brand)] px-4 py-2 text-sm font-semibold hover:brightness-110 transition"
          >
            {cta} →
          </Link>
        </div>
      </div>
    </div>
  );
}

export function NotFound({ lang }: { lang: "sk" | "en" }) {
  const t =
    lang === "sk"
      ? { msg: "Článok sa nenašiel.", back: "Späť na blog" }
      : { msg: "Article not found.", back: "Back to blog" };
  return (
    <div className="min-h-screen grid place-items-center bg-white text-[color:var(--color-dark)]">
      <div className="text-center">
        <p>{t.msg}</p>
        <Link
          to={lang === "sk" ? "/blog" : "/blog/en"}
          className="mt-4 inline-block text-[color:var(--color-brand)] underline"
        >
          {t.back}
        </Link>
      </div>
    </div>
  );
}
