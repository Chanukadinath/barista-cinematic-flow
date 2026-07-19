import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DESKTOP_COUNT = 64;
const MOBILE_COUNT = 53;
const MOBILE_BP = 768;

function framePath(isMobile: boolean, i: number) {
  const n = String(i).padStart(4, "0");
  return `/coffee-sequence/${isMobile ? "mobile" : "desktop"}/frame_${n}.webp`;
}

type TextStep = {
  eyebrow?: string;
  heading: string[];
  sub?: string;
  cta?: boolean;
};

const STEPS: { from: number; to: number; content: TextStep }[] = [
  {
    from: 0,
    to: 0.22,
    content: {
      eyebrow: "Barista Plant-Based Collection",
      heading: ["CREAMY.", "NUTTY.", "PLANT-POWERED."],
    },
  },
  { from: 0.22, to: 0.44, content: { heading: ["BOLD ESPRESSO", "AT ITS HEART."] } },
  { from: 0.44, to: 0.66, content: { heading: ["SMOOTH ALMOND", "GOODNESS."] } },
  { from: 0.66, to: 0.84, content: { heading: ["CREAMY WITHOUT", "THE DAIRY."] } },
  {
    from: 0.84,
    to: 1.0,
    content: {
      heading: ["ALMOND MILK", "CAPPUCCINO."],
      sub: "Bold espresso, silky plant-based foam and a naturally nutty finish.",
      cta: true,
    },
  },
];

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function ProductScrollHero() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const staticImgRef = useRef<HTMLImageElement>(null);

  const [progress, setProgress] = useState(0);
  const [loadPct, setLoadPct] = useState(0);
  const [ready, setReady] = useState(false);
  const [reduced] = useState(prefersReducedMotion());

  // Refs for imperative animation state
  const framesRef = useRef<HTMLImageElement[]>([]);
  const loadedRef = useRef<boolean[]>([]);
  const isMobileRef = useRef<boolean>(false);
  const rafRef = useRef<number | null>(null);
  const targetIdxRef = useRef(0);
  const drawnIdxRef = useRef(-1);

  // Preloading logic
  useEffect(() => {
    if (reduced) return;
    let cancelled = false;

    function currentIsMobile() {
      return window.innerWidth < MOBILE_BP;
    }

    function loadFrame(i: number, mobile: boolean): Promise<void> {
      return new Promise((resolve) => {
        const img = new Image();
        img.decoding = "async";
        img.onload = () => {
          if (cancelled || currentIsMobile() !== mobile) return resolve();
          framesRef.current[i] = img;
          loadedRef.current[i] = true;
          resolve();
        };
        img.onerror = () => resolve();
        img.src = framePath(mobile, i + 1);
      });
    }

    async function loadSequence() {
      const mobile = currentIsMobile();
      isMobileRef.current = mobile;
      const count = mobile ? MOBILE_COUNT : DESKTOP_COUNT;
      framesRef.current = new Array(count);
      loadedRef.current = new Array(count).fill(false);
      drawnIdxRef.current = -1;
      setReady(false);
      setLoadPct(0);

      // 1. First frame
      await loadFrame(0, mobile);
      if (cancelled || isMobileRef.current !== mobile) return;
      requestDraw();

      // 2. Every 8th
      const keyIdx: number[] = [];
      for (let i = 8; i < count; i += 8) keyIdx.push(i);
      let done = 1;
      const essentialTotal = 1 + keyIdx.length;
      await Promise.all(
        keyIdx.map((i) =>
          loadFrame(i, mobile).then(() => {
            done++;
            setLoadPct(Math.min(99, Math.round((done / essentialTotal) * 100)));
          }),
        ),
      );
      if (cancelled || isMobileRef.current !== mobile) return;
      setLoadPct(100);
      setReady(true);
      requestDraw();

      // 3. Remaining progressively
      for (let i = 1; i < count; i++) {
        if (cancelled || isMobileRef.current !== mobile) return;
        if (!loadedRef.current[i]) {
          await loadFrame(i, mobile);
          requestDraw();
        }
      }
    }

    loadSequence();

    const onResize = () => {
      const mobile = currentIsMobile();
      if (mobile !== isMobileRef.current) {
        loadSequence();
      }
      resizeCanvas();
      requestDraw();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelled = true;
      window.removeEventListener("resize", onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  function resizeCanvas() {
    const canvas = canvasRef.current;
    const sticky = stickyRef.current;
    if (!canvas || !sticky) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = sticky.getBoundingClientRect();
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
  }

  function findNearestLoaded(idx: number): HTMLImageElement | null {
    const loaded = loadedRef.current;
    const frames = framesRef.current;
    if (frames[idx] && loaded[idx]) return frames[idx];
    for (let d = 1; d < frames.length; d++) {
      const a = idx - d;
      if (a >= 0 && loaded[a]) return frames[a];
      const b = idx + d;
      if (b < frames.length && loaded[b]) return frames[b];
    }
    return null;
  }

  function draw() {
    rafRef.current = null;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const idx = targetIdxRef.current;
    const img = findNearestLoaded(idx);
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    if (!img) return;
    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    if (!iw || !ih) return;
    const scale = Math.min(cw / iw, ch / ih);
    const dw = iw * scale;
    const dh = ih * scale;
    const dx = (cw - dw) / 2;
    const dy = (ch - dh) / 2;
    ctx.drawImage(img, dx, dy, dw, dh);
    drawnIdxRef.current = idx;
  }

  function requestDraw() {
    if (rafRef.current != null) return;
    rafRef.current = requestAnimationFrame(draw);
  }

  // ScrollTrigger setup
  useLayoutEffect(() => {
    if (reduced) return;
    const wrap = wrapRef.current;
    const sticky = stickyRef.current;
    if (!wrap || !sticky) return;

    resizeCanvas();
    requestDraw();

    const st = ScrollTrigger.create({
      trigger: wrap,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.6,
      onUpdate: (self) => {
        const p = self.progress;
        setProgress(p);
        const count = (isMobileRef.current ? MOBILE_COUNT : DESKTOP_COUNT);
        const idx = Math.min(count - 1, Math.max(0, Math.floor(p * (count - 1))));
        if (idx !== targetIdxRef.current) {
          targetIdxRef.current = idx;
          requestDraw();
        }
      },
    });

    const onResize = () => {
      resizeCanvas();
      requestDraw();
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);

    return () => {
      st.kill();
      window.removeEventListener("resize", onResize);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [reduced]);

  // ---------- Reduced-motion static fallback ----------
  if (reduced) {
    return (
      <section
        id="home"
        className="relative min-h-[100svh] w-full overflow-hidden bg-ink grain"
        aria-label="Barista Plant-Based Almond Milk Cappuccino hero"
      >
        <div className="pointer-events-none absolute inset-0 spotlight opacity-70" />
        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1400px] flex-col items-center justify-center gap-8 px-5 py-24 text-center md:px-10">
          <span className="eyebrow text-orange">Barista Plant-Based Collection</span>
          <h1 className="font-display text-5xl leading-[0.9] text-white md:text-7xl">
            CREAMY. NUTTY.
            <br />
            <span className="text-orange">PLANT-POWERED.</span>
          </h1>
          <img
            ref={staticImgRef}
            src={framePath(false, 1)}
            alt="Barista Plant-Based Almond Milk Cappuccino takeaway cup"
            className="h-[50vh] w-auto object-contain"
          />
          <p className="max-w-md text-white/70">
            Bold espresso, silky plant-based foam and a naturally nutty finish.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="#product" className="rounded-full bg-orange px-6 py-3 text-xs font-semibold uppercase tracking-widest text-white">
              Discover the Flavour
            </a>
            <a href="#menu" className="rounded-full border border-white/20 px-6 py-3 text-xs font-semibold uppercase tracking-widest text-white/90">
              Explore the Menu
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="home"
      ref={wrapRef}
      className="relative w-full bg-ink"
      style={{ height: "350vh" }}
      aria-label="Barista Plant-Based Almond Milk Cappuccino hero"
    >
      <div
        ref={stickyRef}
        className="sticky top-0 h-[100svh] w-full overflow-hidden bg-black"
      >
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

        {/* Ambient orange glow overlay */}
        <div className="pointer-events-none absolute inset-0 spotlight opacity-40" />

        {/* Loading overlay */}
        {!ready && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black text-white">
            <span className="eyebrow text-orange">Brewing</span>
            <div className="mt-4 font-display text-6xl tabular-nums md:text-7xl">
              {String(loadPct).padStart(2, "0")}
              <span className="text-orange">%</span>
            </div>
            <div className="mt-6 h-px w-40 overflow-hidden bg-white/10">
              <div
                className="h-full bg-orange transition-[width] duration-300"
                style={{ width: `${loadPct}%` }}
              />
            </div>
          </div>
        )}

        {/* Text timeline overlay */}
        <div className="pointer-events-none absolute inset-0 z-20">
          {STEPS.map((step, i) => {
            const active = progress >= step.from && progress <= step.to;
            const local = active
              ? Math.min(1, Math.max(0, (progress - step.from) / (step.to - step.from)))
              : 0;
            const opacity = active
              ? Math.min(1, local < 0.15 ? local / 0.15 : local > 0.85 ? (1 - local) / 0.15 : 1)
              : 0;
            const y = active ? (0.5 - local) * 18 : 16;
            const isFinal = !!step.content.cta;
            return (
              <div
                key={i}
                className="absolute inset-0"
                style={{
                  opacity,
                  transform: `translate3d(0, ${y}px, 0)`,
                  transition: "opacity 400ms ease, transform 700ms cubic-bezier(0.22,1,0.36,1)",
                }}
                aria-hidden={!active}
              >
                <div
                  className="absolute max-w-[92%] md:max-w-[620px] lg:max-w-[720px] text-center md:text-left"
                  style={{
                    left: "clamp(20px, 7vw, 120px)",
                    right: "clamp(20px, 5vw, 60px)",
                    bottom: "clamp(80px, 12vh, 150px)",
                  }}
                >
                  {step.content.eyebrow && (
                    <span className="eyebrow mb-5 block text-orange">
                      {step.content.eyebrow}
                    </span>
                  )}
                  <h2 className="font-display text-[2.25rem] leading-[0.95] text-white drop-shadow-[0_6px_24px_rgba(0,0,0,0.85)] sm:text-5xl md:text-6xl lg:text-7xl">
                    {step.content.heading.map((line, li) => (
                      <span key={li} className="block overflow-hidden">
                        <span
                          className="inline-block"
                          style={{
                            transform: active ? "translateY(0)" : "translateY(105%)",
                            transition: `transform 750ms cubic-bezier(0.22,1,0.36,1) ${li * 90}ms`,
                          }}
                        >
                          {li === step.content.heading.length - 1 &&
                          step.content.heading.length > 1 ? (
                            <span className="text-orange">{line}</span>
                          ) : (
                            line
                          )}
                        </span>
                      </span>
                    ))}
                  </h2>

                  {step.content.sub && (
                    <p className="mt-6 max-w-md text-sm leading-relaxed text-white/80 md:text-base mx-auto md:mx-0">
                      {step.content.sub}
                    </p>
                  )}

                  {isFinal && (
                    <div className="pointer-events-auto mt-7 flex flex-wrap justify-center gap-3 md:justify-start">
                      <a
                        href="#product"
                        className="group inline-flex items-center gap-2 rounded-full bg-orange px-6 py-3 text-xs font-semibold uppercase tracking-widest text-white transition-all hover:bg-orange-glow hover:shadow-[0_20px_40px_-15px_rgba(240,82,35,0.7)]"
                      >
                        Discover the Flavour
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                      </a>
                      <a
                        href="#menu"
                        className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md px-6 py-3 text-xs font-semibold uppercase tracking-widest text-white/90 transition-colors hover:bg-white/10"
                      >
                        Explore the Menu
                      </a>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Scroll hint */}
        <div className="pointer-events-none absolute bottom-4 left-1/2 z-20 -translate-x-1/2 text-[10px] font-semibold uppercase tracking-[0.4em] text-white/40">
          Scroll to Experience
        </div>
      </div>
    </section>
  );
}
