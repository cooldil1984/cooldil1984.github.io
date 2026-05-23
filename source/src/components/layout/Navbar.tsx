import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/context/language";

export function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { lang, setLang } = useLang();

  const isHome = location === "/";
  const isTransparent = isHome && !isScrolled;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
  ];

  const contactLabel = lang === "de" ? "Kontakt" : "Connect";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isTransparent
          ? "bg-transparent py-6"
          : "bg-background/95 backdrop-blur-md border-b border-border shadow-sm py-4"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link
          href="/"
          className={`text-xl font-heading font-bold tracking-tight transition-colors ${
            isTransparent ? "text-background" : "text-foreground"
          }`}
          data-testid="link-home-logo"
        >
          Dilip <span className="text-primary">Srikantha</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isTransparent
                  ? location === link.href
                    ? "text-primary"
                    : "text-background/70 hover:text-background"
                  : location === link.href
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
              data-testid={`link-nav-${link.name.toLowerCase()}`}
            >
              {link.name}
            </Link>
          ))}

          {/* Language toggle */}
          <div
            className={`flex items-center rounded-lg overflow-hidden border text-xs font-bold ${
              isTransparent ? "border-background/30" : "border-border"
            }`}
          >
            <button
              onClick={() => setLang("en")}
              className={`px-2.5 py-1.5 transition-colors ${
                lang === "en"
                  ? "bg-primary text-primary-foreground"
                  : isTransparent
                  ? "text-background/60 hover:text-background"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              aria-label="Switch to English"
              data-testid="button-lang-en"
            >
              EN
            </button>
            <button
              onClick={() => setLang("de")}
              className={`px-2.5 py-1.5 transition-colors ${
                lang === "de"
                  ? "bg-primary text-primary-foreground"
                  : isTransparent
                  ? "text-background/60 hover:text-background"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              aria-label="Switch to German"
              data-testid="button-lang-de"
            >
              DE
            </button>
          </div>

          <a
            href="mailto:srikantha.dilip@gmail.com"
            className="px-5 py-2.5 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            data-testid="link-nav-contact"
          >
            {contactLabel}
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button
          className={`md:hidden p-2 transition-colors ${isTransparent ? "text-background" : "text-foreground"}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          data-testid="button-mobile-menu"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border overflow-hidden"
          >
            <nav className="flex flex-col px-6 py-4 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base font-medium ${
                    location === link.href ? "text-primary" : "text-muted-foreground"
                  }`}
                  data-testid={`link-mobile-nav-${link.name.toLowerCase()}`}
                >
                  {link.name}
                </Link>
              ))}

              {/* Mobile language toggle */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Language:</span>
                <div className="flex items-center border border-border rounded-lg overflow-hidden text-xs font-bold">
                  <button
                    onClick={() => setLang("en")}
                    className={`px-3 py-1.5 transition-colors ${
                      lang === "en" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                    }`}
                    data-testid="button-mobile-lang-en"
                  >
                    EN
                  </button>
                  <button
                    onClick={() => setLang("de")}
                    className={`px-3 py-1.5 transition-colors ${
                      lang === "de" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                    }`}
                    data-testid="button-mobile-lang-de"
                  >
                    DE
                  </button>
                </div>
              </div>

              <a
                href="mailto:srikantha.dilip@gmail.com"
                className="text-base font-medium text-primary"
                data-testid="link-mobile-contact"
              >
                {contactLabel}
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
