import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { getBlogPosts } from "@/lib/data";
import { useLang } from "@/context/language";

const FADE_UP = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const STAGGER = {
  visible: { transition: { staggerChildren: 0.08 } }
};

const UI = {
  en: {
    sectionLabel: "Writing & Perspectives",
    heading: "Insights &",
    headingLine2: "Perspectives.",
    subheading: "Thoughts on enterprise agility, digital transformation, cloud strategy, and the human side of technology leadership.",
    readArticle: "Read Article",
    dateLocale: "en-GB",
  },
  de: {
    sectionLabel: "Beiträge & Perspektiven",
    heading: "Einblicke &",
    headingLine2: "Perspektiven.",
    subheading: "Gedanken zu Enterprise-Agilität, digitaler Transformation, Cloud-Strategie und den menschlichen Aspekten der Technologieführung.",
    readArticle: "Artikel lesen",
    dateLocale: "de-DE",
  },
};

export default function Blog() {
  const { lang } = useLang();
  const posts = getBlogPosts(lang);
  const t = UI[lang];

  return (
    <main className="min-h-screen bg-background pt-32 pb-24">
      <div className="container mx-auto px-6 md:px-12 max-w-5xl">
        <motion.div initial="hidden" animate="visible" variants={STAGGER}>
          <motion.div variants={FADE_UP} className="mb-16">
            <p className="text-primary font-medium tracking-widest uppercase text-sm mb-4">{t.sectionLabel}</p>
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-foreground tracking-tight mb-6">
              {t.heading}<br/> {t.headingLine2}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">{t.subheading}</p>
          </motion.div>

          <motion.div variants={STAGGER} className="grid gap-6">
            {posts.map((post) => (
              <motion.article
                key={post.id}
                variants={FADE_UP}
                className="group relative bg-card border border-border p-8 rounded-xl shadow-sm hover:shadow-md hover:border-primary/40 transition-all duration-300"
              >
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
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

                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4 group-hover:text-primary transition-colors leading-snug">
                  <Link href={`/blog/${post.slug}`} className="before:absolute before:inset-0" data-testid={`link-blog-${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>

                <p className="text-muted-foreground leading-relaxed mb-6">{post.excerpt}</p>

                <div className="flex items-center text-primary font-medium gap-1 group-hover:gap-2 transition-all">
                  {t.readArticle} <ArrowRight className="w-4 h-4" />
                </div>
              </motion.article>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
