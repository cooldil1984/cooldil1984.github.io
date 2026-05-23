import { motion } from "framer-motion";
import { ArrowRight, Briefcase, Globe, Rocket, ShieldCheck, Zap, GraduationCap, CheckCircle2, Clock, Award } from "lucide-react";
import { SiGmail } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";
import { Link } from "wouter";
import profilePhoto from "@/assets/profile-nobg.webp";
import { getBlogPosts } from "@/lib/data";
import { useLang } from "@/context/language";

// ── English content ──
import heroEn from "@/content/hero.json";
import bioEn from "@/content/bio.json";
import achievementsEn from "@/content/achievements.json";
import skillsEn from "@/content/skills.json";
import servicesEn from "@/content/services.json";
import certificationsEn from "@/content/certifications.json";
import connectEn from "@/content/connect.json";

// ── German content ──
import heroDe from "@/content/de/hero.json";
import bioDe from "@/content/de/bio.json";
import achievementsDe from "@/content/de/achievements.json";
import skillsDe from "@/content/de/skills.json";
import servicesDe from "@/content/de/services.json";
import certificationsDe from "@/content/de/certifications.json";
import connectDe from "@/content/de/connect.json";

// ── Icon map — keeps icons in code, labels in JSON ──
const ICON_MAP: Record<string, React.ElementType> = {
  ShieldCheck, Zap, Globe, Briefcase, Rocket,
};

const FADE_UP = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
};

const STAGGER = {
  visible: { transition: { staggerChildren: 0.1 } }
};

export default function Home() {
  const { lang } = useLang();

  const hero          = lang === "de" ? heroDe          : heroEn;
  const bio           = lang === "de" ? bioDe           : bioEn;
  const achievementsData = lang === "de" ? achievementsDe : achievementsEn;
  const skillsData    = lang === "de" ? skillsDe        : skillsEn;
  const servicesData  = lang === "de" ? servicesDe      : servicesEn;
  const certifications = lang === "de" ? certificationsDe : certificationsEn;
  const connect       = lang === "de" ? connectDe       : connectEn;
  const recentPosts   = getBlogPosts(lang).slice(0, 3);

  const dateLocale = lang === "de" ? "de-DE" : "en-GB";

  return (
    <main className="w-full">

      {/* ── Hero ── */}
      <section className="relative min-h-[92vh] flex items-center bg-foreground text-background overflow-hidden pt-24">
        <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent pointer-events-none" />

        <div className="container mx-auto px-6 md:px-12 relative z-10 py-20">
          <motion.div initial="hidden" animate="visible" variants={STAGGER} className="max-w-[52%] lg:max-w-[48%]">
            <motion.p variants={FADE_UP} className="text-primary font-medium tracking-widest uppercase mb-5 text-sm">
              {hero.tagline}
            </motion.p>
            <motion.h1 variants={FADE_UP} className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-[1.05] mb-7 tracking-tight">
              {hero.name.split("\n").map((line, i, arr) => (
                <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
              ))}
            </motion.h1>
            <motion.p variants={FADE_UP} className="text-xl md:text-2xl text-background/70 mb-4 font-light leading-relaxed">
              {hero.subtitle}
            </motion.p>
            <motion.p variants={FADE_UP} className="text-base text-background/50 mb-12 leading-relaxed">
              {hero.servicesLine}
            </motion.p>
            <motion.div variants={FADE_UP} className="flex flex-col sm:flex-row gap-4">
              <a
                href="#connect"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
                data-testid="link-hero-connect"
              >
                {hero.cta.primary} <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <a
                href={hero.cta.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 border border-background/20 text-background font-medium rounded-lg hover:bg-white/5 transition-colors"
                data-testid="link-hero-linkedin"
              >
                <FaLinkedin className="mr-2 h-5 w-5" /> {hero.cta.secondary}
              </a>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
          className="absolute bottom-0 right-0 hidden lg:flex items-end z-10"
          style={{ height: "92%" }}
        >
          <div className="absolute bottom-0 right-0 w-80 h-60 bg-primary/10 blur-3xl rounded-full translate-x-10" />
          <img
            src={profilePhoto}
            alt="Dilip Srikantha — Executive Technology Leader"
            className="relative h-full w-auto object-contain object-bottom select-none"
            style={{ maxWidth: "42vw" }}
            draggable={false}
          />
        </motion.div>
      </section>

      {/* ── Bio & Achievements ── */}
      <section className="py-24 bg-background" id="bio">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={FADE_UP}>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-foreground leading-snug">
                {bio.heading}<br/>
                <span className="text-primary">{bio.headingHighlight}</span>
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                {bio.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
              </div>

              <div className="mt-8 pt-8 border-t border-border">
                <p className="text-sm font-bold uppercase tracking-wider text-foreground mb-4">{bio.gallupLabel}</p>
                <div className="flex flex-wrap gap-2">
                  {bio.gallupStrengths.map((strength) => (
                    <span key={strength} className="px-4 py-1.5 bg-accent text-accent-foreground rounded-full text-sm font-medium">
                      {strength}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-border">
                <p className="text-sm font-bold uppercase tracking-wider text-foreground mb-4 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-primary" /> {bio.certificationsLabel}
                </p>
                <ul className="space-y-2">
                  {certifications.map((cert, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>{cert}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={STAGGER} className="grid gap-5">
              <p className="text-sm font-bold uppercase tracking-wider text-foreground mb-2">{bio.achievementsLabel}</p>
              {achievementsData.map((item, i) => {
                const Icon = ICON_MAP[item.icon] ?? ShieldCheck;
                return (
                  <motion.div
                    key={i}
                    variants={FADE_UP}
                    className="flex gap-4 p-6 bg-card border border-border rounded-xl shadow-sm hover:border-primary/30 hover:shadow-md transition-all duration-300"
                    data-testid={`card-achievement-${i}`}
                  >
                    <div className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-lg bg-primary/10 text-primary">
                      <Icon size={20} />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-base text-foreground mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Skills & Services ── */}
      <section className="py-24 bg-secondary/40" id="expertise">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={FADE_UP} className="max-w-3xl mb-16">
            <p className="text-primary font-medium tracking-widest uppercase text-sm mb-4">{skillsData.sectionLabel}</p>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-5">{skillsData.heading}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">{skillsData.subheading}</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={STAGGER}>
              <h3 className="text-xl font-heading font-bold mb-6 flex items-center gap-2 text-foreground">
                <Award className="text-primary w-5 h-5" /> {skillsData.coreExpertiseLabel}
              </h3>
              <ul className="space-y-3 mb-10">
                {skillsData.skills.map((skill, idx) => (
                  <motion.li key={idx} variants={FADE_UP} className="flex items-center gap-3 text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span>{skill}</span>
                  </motion.li>
                ))}
              </ul>

              <h3 className="text-xl font-heading font-bold mb-5 flex items-center gap-2 text-foreground">
                <Globe className="text-primary w-5 h-5" /> {skillsData.languagesLabel}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skillsData.languages.map(({ lang: l, level }) => (
                  <div key={l} className="px-4 py-2 bg-card border border-border rounded-lg text-sm">
                    <span className="font-semibold text-foreground">{l}</span>
                    <span className="text-muted-foreground ml-1.5">· {level}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={STAGGER}>
              <h3 className="text-xl font-heading font-bold mb-6 flex items-center gap-2 text-foreground">
                <Briefcase className="text-primary w-5 h-5" /> {servicesData.advisoryLabel}
              </h3>
              <div className="grid gap-4">
                {servicesData.services.map((service, idx) => (
                  <motion.div
                    key={idx}
                    variants={FADE_UP}
                    className="p-5 bg-background border border-border rounded-xl shadow-sm hover:border-primary/40 hover:shadow-md transition-all duration-300"
                    data-testid={`card-service-${idx}`}
                  >
                    <h4 className="font-semibold text-foreground mb-1.5">{service.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{service.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Recent Writing ── */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={FADE_UP}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12"
          >
            <div>
              <p className="text-primary font-medium tracking-widest uppercase text-sm mb-3">{connect.writingLabel}</p>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">{connect.recentThoughtsHeading}</h2>
            </div>
            <Link href="/blog" className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all text-sm" data-testid="link-all-posts">
              {connect.allArticlesLabel} <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={STAGGER} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <motion.div
                key={post.id}
                variants={FADE_UP}
                className="group bg-card border border-border rounded-xl p-6 shadow-sm hover:border-primary/30 hover:shadow-md transition-all duration-300"
                data-testid={`card-recent-${post.id}`}
              >
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {post.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-0.5 text-xs font-medium bg-accent text-accent-foreground rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="font-heading font-bold text-foreground mb-3 leading-snug group-hover:text-primary transition-colors line-clamp-3">
                  <Link href={`/blog/${post.slug}`} className="hover:underline" data-testid={`link-recent-${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{new Date(post.date).toLocaleDateString(dateLocale, { year: "numeric", month: "short" })}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Connect ── */}
      <section className="py-32 bg-foreground text-background" id="connect">
        <div className="container mx-auto px-6 md:px-12 text-center max-w-4xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={FADE_UP}>
            <p className="text-primary font-medium tracking-widest uppercase text-sm mb-6">{connect.sectionLabel}</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight">
              {connect.heading}<br className="hidden md:block" /> {connect.headingLine2}
            </h2>
            <p className="text-lg text-background/60 mb-12 font-light max-w-2xl mx-auto leading-relaxed">
              {connect.subheading}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-5">
              <a
                href={`mailto:${connect.email}`}
                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors text-base"
                data-testid="button-email-connect"
              >
                <SiGmail className="mr-3 h-5 w-5" /> {connect.email}
              </a>
              <a
                href={connect.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 border border-background/15 text-background font-medium rounded-lg hover:bg-white/5 transition-colors text-base"
                data-testid="button-linkedin-connect"
              >
                <FaLinkedin className="mr-3 h-5 w-5" /> {connect.linkedinLabel}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  );
}
