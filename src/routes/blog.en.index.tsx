import { createFileRoute } from "@tanstack/react-router";
import { postsByLang, SITE_URL } from "@/lib/blog-posts";
import { BlogIndex } from "./blog.index";

export const Route = createFileRoute("/blog/en/")({
  component: BlogIndexEN,
  head: () => ({
    meta: [
      { title: "Blog — KobiKan: AI in industrial maintenance" },
      {
        name: "description",
        content:
          "Practical articles on AI in industrial manufacturing and maintenance — implementation, downtime, knowledge capture, PLC integrations.",
      },
      { property: "og:title", content: "Blog — KobiKan: AI in industrial maintenance" },
      {
        property: "og:description",
        content:
          "Practical articles on AI in industrial manufacturing and maintenance — implementation, downtime, knowledge capture, PLC integrations.",
      },
      { property: "og:url", content: `${SITE_URL}/blog/en` },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/blog/en` }],
  }),
});

function BlogIndexEN() {
  const posts = postsByLang("en");
  return <BlogIndex lang="en" posts={posts} otherHref="/blog" otherLabel="SK" />;
}
