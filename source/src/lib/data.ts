// Blog posts are loaded from src/content/blog/*.md (English)
// and src/content/de/blog/*.md (German) at build time.
// To add or edit a post, edit the corresponding .md file — no code changes needed.

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  date: string;
  readTime: string;
  tags: string[];
  excerpt: string;
  content: string;
}

const enFiles = import.meta.glob<string>("../content/blog/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

const deFiles = import.meta.glob<string>("../content/de/blog/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

function parseFrontmatter(raw: string): BlogPost {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) throw new Error("Invalid frontmatter in blog markdown file");

  const fm = match[1];
  const body = match[2].trim();

  function field(key: string): string {
    const m = fm.match(new RegExp(`^${key}:\\s*"?([^"\\n]*)"?`, "m"));
    return m ? m[1].trim() : "";
  }

  function arrayField(key: string): string[] {
    const m = fm.match(new RegExp(`^${key}:\\s*\\[([^\\]]+)\\]`, "m"));
    if (!m) return [];
    return m[1].split(",").map((s) => s.trim().replace(/^"|"$/g, ""));
  }

  return {
    id: field("id"),
    slug: field("slug"),
    title: field("title"),
    date: field("date"),
    readTime: field("readTime"),
    tags: arrayField("tags"),
    excerpt: field("excerpt"),
    content: body,
  };
}

export function getBlogPosts(lang: "en" | "de"): BlogPost[] {
  const rawFiles = lang === "de" ? deFiles : enFiles;
  return Object.values(rawFiles)
    .map(parseFrontmatter)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
