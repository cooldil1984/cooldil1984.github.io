import { SiGmail } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";
import { useLang } from "@/context/language";

const UI = {
  en: { tagline: "Executive Technology Leader & Business Strategist", rights: "All rights reserved." },
  de: { tagline: "Executive Technology Leader & Business Strategist", rights: "Alle Rechte vorbehalten." },
};

export function Footer() {
  const { lang } = useLang();
  const t = UI[lang];

  return (
    <footer className="bg-foreground text-background py-12 border-t border-border/10">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-6 md:mb-0">
          <p className="text-xl font-heading font-bold">Dilip Srikantha</p>
          <p className="text-sm text-muted-foreground mt-1">{t.tagline}</p>
        </div>
        <div className="flex space-x-6">
          <a
            href="https://linkedin.com/in/dilipsrikantha"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-background transition-colors"
            data-testid="link-footer-linkedin"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href="mailto:srikantha.dilip@gmail.com"
            className="text-muted-foreground hover:text-background transition-colors"
            data-testid="link-footer-email"
          >
            <SiGmail size={24} />
          </a>
        </div>
      </div>
      <div className="container mx-auto px-6 md:px-12 mt-8 text-center md:text-left text-xs text-muted-foreground/60">
        &copy; {new Date().getFullYear()} Dilip Srikantha. {t.rights}
      </div>
    </footer>
  );
}
