import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { getBlogPosts } from "@/lib/data";
import { useLang } from "@/context/language";

const UI = {
  en: {
    backLabel: "All articles",
    notFound: "Article Not Found",
    notFoundDesc: "The post you're looking for doesn't exist.",
    backToBlog: "Back to Blog",
    authorTitle: "Executive Technology Leader & Business Strategist · Munich, Germany",
    dateLocale: "en-GB",
  },
  de: {
    backLabel: "Alle Artikel",
    notFound: "Artikel nicht gefunden",
    notFoundDesc: "Der gesuchte Beitrag existiert nicht.",
    backToBlog: "Zurück zum Blog",
    authorTitle: "Executive Technology Leader & Business Strategist · München, Deutschland",
    dateLocale: "de-DE",
  },
};

export default function BlogPost() {
  const [, params] = useRoute("/blog/:slug");
  const { lang } = useLang();
  const posts = getBlogPosts(lang);
  const post = posts.find((p) => p.slug === params?.slug);
  const t = UI[lang];

  if (!post) {
    return (
      <main className="min-h-screen bg-background pt-32 pb-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-heading font-bold mb-4">{t.notFound}</h1>
          <p className="text-muted-foreground mb-8">{t.notFoundDesc}</p>
          <Link
            href="/blog"
            className="inline-flex items-center text-primary font-medium hover:underline"
            data-testid="link-back-blog-404"
          >
            <ArrowLeft className="mr-2 w-4 h-4" /> {t.backToBlog}
          </Link>
        </div>
      </main>
    );
  }

  const paragraphs = post.content.split("\n\n").filter((p) => p.trim());

  return (
    <main className="min-h-screen bg-background pt-32 pb-24">
      <article className="container mx-auto px-6 md:px-12 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/blog"
            className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-12 transition-colors"
            data-testid="link-back-blog"
          >
            <ArrowLeft className="mr-2 w-4 h-4" /> {t.backLabel}
          </Link>

          <header className="mb-12">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center gap-1.5 text-sm text-primary">
                <Calendar className="w-3.5 h-3.5" />
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString(t.dateLocale, { year: "numeric", month: "long", day: "numeric" })}
                </time>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Clock className="w-3.5 h-3.5" />
                <span>{post.readTime}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="px-2.5 py-0.5 text-xs font-medium bg-accent text-accent-foreground rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground leading-tight mb-6">
              {post.title}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed border-l-4 border-primary pl-5 italic">
              {post.excerpt}
            </p>
          </header>

          <div className="prose prose-lg prose-headings:font-heading prose-headings:text-foreground prose-p:text-muted-foreground prose-p:leading-relaxed prose-strong:text-foreground prose-a:text-primary hover:prose-a:text-primary/80 max-w-none">
            {paragraphs.map((paragraph, idx) => {
              const trimmed = paragraph.trim();
              if (trimmed.startsWith("**") && trimmed.endsWith("**") && !trimmed.slice(2, -2).includes("**")) {
                return (
                  <h3 key={idx} className="text-xl font-heading font-bold text-foreground mt-10 mb-4">
                    {trimmed.slice(2, -2)}
                  </h3>
                );
              }
              const parts = trimmed.split(/(\*\*[^*]+\*\*)/g);
              return (
                <p key={idx} className="mb-5 text-muted-foreground leading-relaxed">
                  {parts.map((part, i) =>
                    part.startsWith("**") && part.endsWith("**")
                      ? <strong key={i} className="text-foreground font-semibold">{part.slice(2, -2)}</strong>
                      : part
                  )}
                </p>
              );
            })}
          </div>

          <footer className="mt-16 pt-8 border-t border-border">
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-heading font-bold text-lg flex-shrink-0"
                data-testid="avatar-author"
              >
                DS
              </div>
              <div>
                <p className="font-heading font-bold text-foreground">Dilip Srikantha</p>
                <p className="text-sm text-muted-foreground">{t.authorTitle}</p>
              </div>
            </div>
          </footer>
        </motion.div>
      </article>
    </main>
  );
}
