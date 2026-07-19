import { useEffect, useState } from "react";
import { Menu, X, MapPin } from "lucide-react";

const links = [
  { label: "Home", href: "#home" },
  { label: "Menu", href: "#menu" },
  { label: "Our Story", href: "#story" },
  { label: "Locations", href: "#locations" },
  { label: "Crown Bearers", href: "#crown" },
  { label: "Sustainability", href: "#sustainability" },
  { label: "Franchising", href: "#franchising" },
  { label: "Contact", href: "#contact" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-ink/70 border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 md:px-10 h-16 md:h-20">
        <a href="#home" className="flex items-center gap-2 group" aria-label="Barista home">
          <span className="font-display text-2xl md:text-3xl tracking-wide text-white group-hover:text-orange transition-colors">
            BAR<span className="text-orange">I</span>STA
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-7" aria-label="Primary">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative text-[13px] font-medium text-white/80 hover:text-white transition-colors after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-orange after:transition-all hover:after:w-full focus-visible:outline-none focus-visible:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#locations"
            className="hidden sm:inline-flex items-center gap-2 rounded-full bg-orange px-4 py-2.5 text-xs font-semibold uppercase tracking-widest text-white shadow-[0_10px_30px_-10px_rgba(240,82,35,0.6)] hover:bg-orange-glow transition-colors"
          >
            <MapPin className="size-3.5" />
            Find a Café
          </a>
          <button
            className="lg:hidden inline-flex items-center justify-center size-11 rounded-full bg-white/5 border border-white/10 text-white"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden fixed inset-x-0 top-16 bottom-0 bg-ink/95 backdrop-blur-xl transition-all duration-300 ${
          open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col p-6 gap-1" aria-label="Mobile">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-display text-3xl text-white/90 hover:text-orange py-2 border-b border-white/5"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#locations"
            onClick={() => setOpen(false)}
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-orange px-6 py-4 text-sm font-semibold uppercase tracking-widest text-white"
          >
            <MapPin className="size-4" />
            Find a Café
          </a>
        </nav>
      </div>
    </header>
  );
}
