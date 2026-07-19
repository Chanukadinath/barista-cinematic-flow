import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import cupAsset from "@/assets/barista-cup.png.asset.json";

/**
 * ProductScrollHero
 * -----------------
 * Cinematic hero for Barista's Plant-Based Almond Milk Cappuccino.
 *
 * NOTE (stage 2 — not implemented yet):
 * This component intentionally keeps the Barista cup as a *static* image.
 * In the next development stage, the <img> inside `hero-cup` will be
 * replaced by an HTML <canvas> element driven by a scroll-controlled
 * WebP frame sequence (preloaded frames + IntersectionObserver + rAF).
 * The surrounding layout, spotlight, reflection and copy stay identical
 * so the canvas can drop in without touching the rest of the section.
 */
export function ProductScrollHero() {
  const cupRef = useRef<HTMLDivElement>(null);
  const [t, setT] = useState(0); // 0..1 hero scroll progress

  useEffect(() => {
    const onScroll = () => {
      const el = cupRef.current;
      if (!el) return;
      const vh = window.innerHeight;
      const y = Math.min(Math.max(window.scrollY / vh, 0), 1);
      setT(y);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const cupTransform = `translate3d(0, ${t * -40}px, 0) scale(${1 - t * 0.05})`;

  return (
    <section
      id="home"
      className="relative min-h-[100svh] w-full overflow-hidden bg-ink grain"
      aria-label="Barista Plant-Based Almond Milk Cappuccino hero"
    >
      {/* Ambient orange glow */}
      <div className="pointer-events-none absolute inset-0 spotlight opacity-70" />
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 size-[900px] rounded-full bg-orange/10 blur-[140px]" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1400px] flex-col items-center justify-between px-5 pt-28 pb-10 md:px-10 md:pt-32">
        {/* Top eyebrow */}
        <div className="text-center reveal-up">
          <span className="eyebrow text-orange">Barista Plant-Based Collection</span>
        </div>

        {/* Center: heading + cup */}
        <div className="grid w-full flex-1 grid-rows-[auto_1fr_auto] items-center gap-6 py-6 md:grid-cols-[1fr_auto_1fr] md:grid-rows-1 md:gap-8">
          {/* Left copy (desktop) */}
          <div className="hidden md:block text-left">
            <h1 className="font-display text-6xl leading-[0.9] text-white lg:text-7xl xl:text-8xl reveal-up">
              CREAMY.
              <br />
              NUTTY.
              <br />
              <span className="text-orange">PLANT-POWERED.</span>
            </h1>
          </div>

          {/* Cup */}
          <div
            ref={cupRef}
            className="hero-cup relative mx-auto flex items-center justify-center"
            style={{ transform: cupTransform, transition: "transform 0.1s linear" }}
          >
            {/* Radial spotlight behind cup */}
            <div className="absolute inset-0 -z-10 spotlight opacity-90" aria-hidden />
            <img
              src={cupAsset.url}
              alt="Barista takeaway cup with orange BARISTA logo and closed white lid"
              className="relative z-10 h-[38vh] md:h-[42vh] lg:h-[45vh] w-auto max-w-[80vw] object-contain drop-shadow-[0_40px_60px_rgba(0,0,0,0.7)] float-soft"
              draggable={false}
            />
            {/* Reflection */}
            <div
              aria-hidden
              className="absolute bottom-[-8%] left-1/2 -translate-x-1/2 h-6 w-[55%] rounded-[50%] bg-orange/40 blur-2xl"
            />
            <div
              aria-hidden
              className="absolute bottom-[-3%] left-1/2 -translate-x-1/2 h-3 w-[40%] rounded-[50%] bg-black/70 blur-md"
            />
          </div>

          {/* Right copy (desktop) */}
          <div className="hidden md:block text-right self-end">
            <p className="ml-auto max-w-xs text-sm leading-relaxed text-white/70 reveal-up">
              Meet our Plant-Based Almond Milk Cappuccino — bold espresso balanced with silky foam and a naturally nutty finish.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <a
                href="#product"
                className="group inline-flex items-center gap-2 rounded-full bg-orange px-5 py-3 text-xs font-semibold uppercase tracking-widest text-white transition-all hover:bg-orange-glow hover:shadow-[0_20px_40px_-15px_rgba(240,82,35,0.7)]"
              >
                Discover the Flavour
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#menu"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-xs font-semibold uppercase tracking-widest text-white/90 transition-colors hover:bg-white/5"
              >
                Explore the Menu
              </a>
            </div>
          </div>
        </div>

        {/* Mobile heading + CTA under cup */}
        <div className="md:hidden text-center reveal-up">
          <h1 className="font-display text-5xl leading-[0.9] text-white">
            CREAMY.
            <br />
            NUTTY.
            <br />
            <span className="text-orange">PLANT-POWERED.</span>
          </h1>
          <p className="mt-4 mx-auto max-w-sm text-sm leading-relaxed text-white/70">
            Meet our Plant-Based Almond Milk Cappuccino — bold espresso balanced with silky foam and a naturally nutty finish.
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <a
              href="#product"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-orange px-6 py-4 text-xs font-semibold uppercase tracking-widest text-white"
            >
              Discover the Flavour <ArrowRight className="size-4" />
            </a>
            <a
              href="#menu"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-4 text-xs font-semibold uppercase tracking-widest text-white/90"
            >
              Explore the Menu
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="mt-8 flex flex-col items-center gap-2 text-white/50">
          <span className="text-[10px] font-semibold uppercase tracking-[0.4em]">
            Scroll to Experience
          </span>
          <ChevronDown className="size-4 scroll-hint" />
        </div>
      </div>
    </section>
  );
}
