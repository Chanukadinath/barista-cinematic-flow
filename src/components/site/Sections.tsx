import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Coffee,
  Leaf,
  Sparkles,
  Wind,
  Search,
  Navigation as NavIcon,
  MapPin,
  Clock,
  Crown,
  Gift,
  Star,
  Smartphone,
  Apple,
  PlayCircle,
  Recycle,
  Users,
  Heart,
  Building2,
  Mail,
  Phone,
  Instagram,
  Facebook,
  Youtube,
} from "lucide-react";
import cupAsset from "@/assets/barista-cup.png.asset.json";
import plantBasedAsset from "@/assets/barista1.png.asset.json";
import iceLatteAsset from "@/assets/icelatte.png.asset.json";
import cappuccinoAsset from "@/assets/Cappuccino.png.asset.json";
import icedMatchaAsset from "@/assets/Iced_Matcha_Latte_-_Almond_Milk.png.asset.json";
import redVelvetAsset from "@/assets/Red_Velvet_Oreo_Shake.png.asset.json";
import blueberryAsset from "@/assets/Blueberry_Oreo_Shake.png.asset.json";
import strawberryAsset from "@/assets/Strawberry_Oreo_Shake.png.asset.json";
import cafeAsset from "@/assets/barista.jpg.asset.json";
import mapAsset from "@/assets/barista-locations-map-2.jpg.asset.json";
import awardsAsset from "@/assets/BARISTA_Wins_Triple_Honors_at_the_National_Business_Excellence_Awards_2025.png.asset.json";
import { useReveal } from "@/hooks/use-reveal";

const cupUrl = cupAsset.url;


/* ---------------- SECTION 2: PRODUCT INTRO ---------------- */
export function ProductIntro() {
  const { ref, seen } = useReveal<HTMLDivElement>();
  return (
    <section id="product" className="relative bg-cream text-ink py-24 md:py-36 grain">
      <div ref={ref} className="mx-auto max-w-[1400px] px-5 md:px-10 grid md:grid-cols-2 gap-14 items-center">
        <div className={seen ? "reveal-up" : "opacity-0"}>
          <span className="eyebrow">New Plant-Based Favourite</span>
          <h2 className="mt-4 font-display text-5xl md:text-7xl leading-[0.9] text-ink">
            THE CAPPUCCINO,
            <br />
            <span className="text-orange">REIMAGINED.</span>
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ink/70">
            A rich espresso base meets smooth almond milk and velvety plant-based foam.
            Crafted for a comforting coffee experience without compromising flavour.
          </p>

          <ul className="mt-10 space-y-4">
            {[
              { icon: Coffee, label: "Bold Espresso", desc: "Deep, aromatic base." },
              { icon: Leaf, label: "Almond Milk", desc: "Silky, naturally nutty." },
              { icon: Wind, label: "Silky Plant-Based Foam", desc: "Velvety microfoam finish." },
            ].map((f) => (
              <li key={f.label} className="flex items-start gap-4">
                <span className="mt-1 grid size-10 shrink-0 place-items-center rounded-full bg-orange/10 text-orange">
                  <f.icon className="size-5" />
                </span>
                <div>
                  <div className="font-semibold text-ink">{f.label}</div>
                  <div className="text-sm text-ink/60">{f.desc}</div>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap gap-3">
            <a href="#menu" className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-xs font-semibold uppercase tracking-widest text-white hover:bg-orange transition-colors">
              Order in Café <ArrowRight className="size-4" />
            </a>
            <a href="#story" className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-5 py-3 text-xs font-semibold uppercase tracking-widest text-ink hover:bg-ink hover:text-white transition-colors">
              Learn More
            </a>
          </div>
        </div>

        <div className={`relative ${seen ? "reveal-up" : "opacity-0"}`} style={{ animationDelay: "0.15s" }}>
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-gradient-to-b from-almond/40 via-cream to-cream border border-ink/5 shadow-[0_60px_80px_-40px_rgba(0,0,0,0.3)]">
            <div className="absolute inset-0 spotlight opacity-40" />
            <img src={plantBasedAsset.url} alt="Barista Plant-Based Almond Milk Cappuccino cup" className="absolute inset-0 h-full w-full object-cover" />
            <span className="absolute top-6 left-6 rounded-full bg-orange px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-white">Plant-Based</span>
            <span className="absolute bottom-6 right-6 font-display text-4xl text-ink/80">01</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- SECTION 3: INGREDIENT STORY ---------------- */
const ingredients = [
  { title: "Roasted Coffee Beans", desc: "Deep, aromatic espresso with a bold and balanced character.", icon: Coffee, tint: "from-coffee/60 to-ink" },
  { title: "Almond Milk", desc: "A smooth plant-based alternative with a naturally nutty flavour.", icon: Leaf, tint: "from-almond/50 to-ink" },
  { title: "Velvety Microfoam", desc: "Silky foam that creates a soft and satisfying cappuccino texture.", icon: Wind, tint: "from-white/20 to-ink" },
  { title: "Cocoa Finish", desc: "A delicate finishing touch that enhances the coffee aroma.", icon: Sparkles, tint: "from-orange/40 to-ink" },
];

export function IngredientStory() {
  return (
    <section className="relative bg-ink py-24 md:py-36 grain">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="max-w-3xl">
          <span className="eyebrow">The Craft</span>
          <h2 className="mt-4 font-display text-5xl md:text-7xl leading-[0.9] text-white">
            WHAT MAKES IT
            <br />
            <span className="text-orange">SO SMOOTH?</span>
          </h2>
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ingredients.map((ing, i) => (
            <IngredientCard key={ing.title} ing={ing} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function IngredientCard({ ing, index }: { ing: (typeof ingredients)[number]; index: number }) {
  const { ref, seen } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-ink-2 p-6 transition-all duration-500 hover:-translate-y-2 hover:border-orange/50 ${
        seen ? "reveal-up" : "opacity-0"
      }`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className={`absolute inset-0 bg-gradient-to-b ${ing.tint} opacity-40 group-hover:opacity-70 transition-opacity`} />
      <div className="relative">
        <div className="mb-24 grid size-14 place-items-center rounded-full bg-white/5 border border-white/10 text-orange">
          <ing.icon className="size-6" />
        </div>
        <div className="mt-6 font-display text-2xl text-white">{ing.title}</div>
        <p className="mt-2 text-sm leading-relaxed text-white/60">{ing.desc}</p>
        <div className="mt-6 text-[10px] font-semibold uppercase tracking-widest text-orange">
          0{index + 1} — Ingredient
        </div>
      </div>
    </div>
  );
}

/* ---------------- SECTION 4: EXPERIENCE ---------------- */
const stages = [
  { n: "01", title: "BOLD", body: "Fresh espresso creates the strong foundation.", accent: "text-orange" },
  { n: "02", title: "CREAMY", body: "Almond milk softens the intensity with a smooth texture.", accent: "text-almond" },
  { n: "03", title: "BALANCED", body: "Plant-based foam brings everything together.", accent: "text-cream" },
];

export function Experience() {
  return (
    <section className="relative bg-ink-2 py-24 md:py-36 grain">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <h2 className="font-display text-5xl md:text-7xl leading-[0.9] text-white max-w-4xl">
          FROM THE FIRST AROMA
          <br />
          TO THE <span className="text-orange">FINAL SIP.</span>
        </h2>
        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {stages.map((s, i) => (
            <Stage key={s.n} s={s} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Stage({ s, i }: { s: (typeof stages)[number]; i: number }) {
  const { ref, seen } = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={seen ? "reveal-up" : "opacity-0"} style={{ animationDelay: `${i * 0.15}s` }}>
      <div className={`font-display text-[9rem] leading-none ${s.accent} opacity-90`}>{s.n}</div>
      <div className="mt-2 h-px w-16 bg-orange" />
      <div className="mt-6 font-display text-3xl text-white">{s.title}</div>
      <p className="mt-3 text-white/60 max-w-xs">{s.body}</p>
    </div>
  );
}

/* ---------------- SECTION 5: SIGNATURE MENU ---------------- */
const menu = [
  { name: "Almond Milk Cappuccino", cat: "Featured", desc: "Bold espresso, silky plant-based foam, naturally nutty.", featured: true, img: iceLatteAsset.url },
  { name: "Cappuccino", cat: "Coffee", desc: "Classic espresso topped with velvet steamed milk foam.", img: cappuccinoAsset.url },
  { name: "Iced Coffee", cat: "Cold", desc: "Chilled espresso poured over ice — bright and refreshing.", img: icedMatchaAsset.url },
  { name: "Espresso", cat: "Coffee", desc: "A concentrated, aromatic single shot to sharpen your day.", img: redVelvetAsset.url },
  { name: "Frappé", cat: "Cold", desc: "Blended iced coffee with a thick, creamy crown.", img: blueberryAsset.url },
  { name: "Tea", cat: "Brews", desc: "A curated selection of Ceylon and specialty teas.", img: strawberryAsset.url },
  { name: "Pastries", cat: "Bites", desc: "Freshly baked pairings for every cup.", img: cupUrl },
];


export function Menu() {
  return (
    <section id="menu" className="relative bg-cream text-ink py-24 md:py-36 grain">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span className="eyebrow">More to Discover</span>
            <h2 className="mt-4 font-display text-5xl md:text-7xl leading-[0.9]">
              FIND YOUR
              <br />
              <span className="text-orange">PERFECT SIP.</span>
            </h2>
          </div>
          <a href="#" className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-ink group">
            Full Menu <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {menu.slice(0, 6).map((m) => (
            <MenuCard key={m.name} m={m} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MenuCard({ m }: { m: (typeof menu)[number] }) {
  const { ref, seen } = useReveal<HTMLDivElement>();
  return (
    <a
      href="#"
      ref={ref as never}
      className={`group relative overflow-hidden rounded-3xl border transition-all duration-500 hover:-translate-y-1 ${
        m.featured
          ? "sm:col-span-2 lg:col-span-2 bg-ink text-white border-ink"
          : "bg-white text-ink border-ink/10 hover:border-orange"
      } ${seen ? "reveal-up" : "opacity-0"}`}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={m.img}
          alt={m.name}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {m.featured && (
          <span className="absolute top-5 left-5 rounded-full bg-orange px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-white">
            Featured
          </span>
        )}
      </div>

      <div className="p-6 flex items-start justify-between gap-4">
        <div>
          <div className={`text-[10px] font-semibold uppercase tracking-widest ${m.featured ? "text-orange" : "text-orange"}`}>{m.cat}</div>
          <div className={`mt-1 font-display text-2xl ${m.featured ? "text-white" : "text-ink"}`}>{m.name}</div>
          <p className={`mt-2 text-sm ${m.featured ? "text-white/60" : "text-ink/60"}`}>{m.desc}</p>
        </div>
        <span className={`shrink-0 grid size-10 place-items-center rounded-full transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 ${m.featured ? "bg-orange text-white" : "bg-ink text-white"}`}>
          <ArrowUpRight className="size-4" />
        </span>
      </div>
    </a>
  );
}

/* ---------------- SECTION 6: BRAND STORY ---------------- */
export function BrandStory() {
  return (
    <section id="story" className="relative bg-ink py-24 md:py-36 grain">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5">
          <span className="eyebrow">Our Story</span>
          <h2 className="mt-4 font-display text-5xl md:text-7xl leading-[0.9] text-white">
            MORE THAN
            <br />
            A CUP OF <span className="text-orange">COFFEE.</span>
          </h2>
          <p className="mt-6 max-w-md text-white/70 leading-relaxed">
            Barista creates spaces where good coffee, meaningful conversations and everyday moments come together.
          </p>
          <a href="#" className="mt-8 inline-flex items-center gap-2 rounded-full bg-orange px-5 py-3 text-xs font-semibold uppercase tracking-widest text-white hover:bg-orange-glow transition-colors">
            Discover Our Story <ArrowRight className="size-4" />
          </a>

          <div className="mt-14 grid grid-cols-3 gap-6">
            <Stat n={100} suffix="+" label="Island-Wide Café Experience" />
            <Stat n={500} suffix="+" label="Passionate Baristas" />
            <Stat n={10000} suffix="+" label="Cups Crafted Daily" />
          </div>
        </div>

        <div className="lg:col-span-7 grid grid-cols-6 grid-rows-6 gap-3 min-h-[500px]">
          <div className="col-span-4 row-span-4 rounded-3xl overflow-hidden relative bg-gradient-to-br from-coffee to-ink border border-white/10">
            <img src={cafeAsset.url} alt="Barista café atmosphere with hanging greenery and neon signage" className="absolute inset-0 h-full w-full object-cover" />

          </div>
          <div className="col-span-2 row-span-3 rounded-3xl overflow-hidden bg-orange p-6 flex flex-col justify-between text-white">
            <Coffee className="size-8" />
            <div>
              <div className="font-display text-3xl leading-none">Crafted</div>
              <div className="text-xs uppercase tracking-widest opacity-80 mt-1">by hand, every cup</div>
            </div>
          </div>
          <div className="col-span-2 row-span-3 rounded-3xl overflow-hidden bg-cream text-ink p-6 flex flex-col justify-between">
            <Sparkles className="size-8 text-orange" />
            <div>
              <div className="font-display text-3xl leading-none">Since Day One</div>
              <div className="text-xs uppercase tracking-widest opacity-70 mt-1">obsessed with flavour</div>
            </div>
          </div>
          <div className="col-span-4 row-span-2 rounded-3xl overflow-hidden bg-ink-2 border border-white/10 p-6 flex items-center gap-4">
            <Heart className="size-6 text-orange shrink-0" />
            <p className="text-sm text-white/70">
              A brand loved across Sri Lanka — where every visit turns into a small ritual.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ n, suffix, label }: { n: number; suffix?: string; label: string }) {
  const { ref, seen } = useReveal<HTMLDivElement>();
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!seen) return;
    const start = performance.now();
    const dur = 1400;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - start) / dur, 1);
      setVal(Math.round(n * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, n]);
  return (
    <div ref={ref}>
      <div className="font-display text-4xl md:text-5xl text-white">
        {val.toLocaleString()}{suffix}
      </div>
      <div className="mt-2 text-[10px] uppercase tracking-widest text-white/50 leading-tight">{label}</div>
    </div>
  );
}

/* ---------------- SECTION 7: LOCATIONS ---------------- */
const locations = [
  { name: "Colombo — Independence Arcade", hours: "7:00 AM — 10:00 PM", dist: "2.4 km" },
  { name: "Kandy — Peradeniya Road", hours: "7:30 AM — 9:30 PM", dist: "108 km" },
  { name: "Galle — Fort Boutique", hours: "8:00 AM — 10:00 PM", dist: "116 km" },
];

export function Locations() {
  return (
    <section id="locations" className="relative bg-cream text-ink py-24 md:py-36 grain">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="max-w-4xl">
          <span className="eyebrow">Locations</span>
          <h2 className="mt-4 font-display text-5xl md:text-7xl leading-[0.9]">
            YOUR FAVOURITE CAFÉ
            <br />
            IS <span className="text-orange">CLOSER</span> THAN YOU THINK.
          </h2>
        </div>

        <div className="mt-12 grid lg:grid-cols-2 gap-8">
          <div className="rounded-3xl overflow-hidden border border-ink/10 bg-white p-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <label className="flex-1 flex items-center gap-3 rounded-full border border-ink/15 px-5 py-3 bg-cream focus-within:border-orange">
                <Search className="size-4 text-ink/50" />
                <input
                  type="text"
                  placeholder="Search city, area or landmark"
                  className="w-full bg-transparent outline-none text-sm placeholder:text-ink/40"
                  aria-label="Search location"
                />
              </label>
              <button className="inline-flex items-center justify-center gap-2 rounded-full bg-ink text-white px-5 py-3 text-xs font-semibold uppercase tracking-widest hover:bg-orange transition-colors">
                <NavIcon className="size-4" /> Use My Location
              </button>
            </div>

            {/* Locations map */}
            <div className="relative mt-6 aspect-[4/3] rounded-2xl overflow-hidden bg-cream border border-ink/10">
              <img
                src={mapAsset.url}
                alt="Map of Sri Lanka showing Barista café locations island-wide"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <span className="absolute bottom-4 left-4 rounded-full bg-white/85 px-3 py-1 text-[10px] uppercase tracking-widest text-ink/70 backdrop-blur-sm">
                Island-Wide Cafés
              </span>
            </div>

          </div>

          <div className="flex flex-col gap-4">
            {locations.map((l) => (
              <div key={l.name} className="group flex items-start gap-4 rounded-2xl bg-white border border-ink/10 p-5 hover:border-orange transition-colors">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-orange/10 text-orange">
                  <MapPin className="size-5" />
                </span>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold">{l.name}</div>
                  <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-ink/60">
                    <span className="inline-flex items-center gap-1"><Clock className="size-3" /> {l.hours}</span>
                    <span>•</span>
                    <span>{l.dist} away</span>
                  </div>
                </div>
                <button className="shrink-0 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-ink group-hover:text-orange">
                  Directions <ArrowUpRight className="size-3.5" />
                </button>
              </div>
            ))}
            <a href="#" className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-orange text-white px-5 py-4 text-xs font-semibold uppercase tracking-widest hover:bg-orange-glow transition-colors">
              Find a Café <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- SECTION 8: CROWN BEARERS ---------------- */
export function CrownBearers() {
  return (
    <section id="crown" className="relative bg-ink py-24 md:py-36 overflow-hidden grain">
      <div className="pointer-events-none absolute -right-40 top-1/2 -translate-y-1/2 size-[700px] rounded-full bg-orange/10 blur-[130px]" />
      <div className="mx-auto max-w-[1400px] px-5 md:px-10 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="eyebrow">Crown Bearers</span>
          <h2 className="mt-4 font-display text-5xl md:text-7xl leading-[0.9] text-white">
            EVERY SIP
            <br />
            BRINGS YOU <span className="text-orange">CLOSER.</span>
          </h2>
          <p className="mt-6 max-w-md text-white/70 leading-relaxed">
            Enjoy rewards, exclusive offers and more reasons to return to your favourite Barista café.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4 max-w-md">
            {[
              { icon: Gift, label: "Free Birthday Drink" },
              { icon: Star, label: "Members-Only Offers" },
              { icon: Coffee, label: "Points on Every Cup" },
            ].map((r) => (
              <div key={r.label} className="rounded-2xl bg-white/5 border border-white/10 p-4 text-white">
                <r.icon className="size-5 text-orange" />
                <div className="mt-3 text-xs leading-tight">{r.label}</div>
              </div>
            ))}
          </div>
          <a href="#" className="mt-8 inline-flex items-center gap-2 rounded-full bg-orange px-5 py-3 text-xs font-semibold uppercase tracking-widest text-white hover:bg-orange-glow transition-colors">
            Join Crown Bearers <ArrowRight className="size-4" />
          </a>
        </div>

        {/* Loyalty card */}
        <div className="relative">
          <div className="relative aspect-[16/10] max-w-md mx-auto rounded-3xl bg-gradient-to-br from-orange via-orange to-coffee p-7 text-white shadow-[0_60px_100px_-30px_rgba(240,82,35,0.6)] float-soft">
            <div className="absolute inset-0 grain opacity-30 rounded-3xl" />
            <div className="relative flex flex-col h-full justify-between">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Crown className="size-5" />
                  <span className="text-xs uppercase tracking-[0.3em] font-semibold">Crown Bearer</span>
                </div>
                <span className="font-display text-2xl">BARISTA</span>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest opacity-70">Member</div>
                <div className="font-display text-3xl mt-1">A. Perera</div>
              </div>
              <div>
                <div className="flex items-center justify-between text-[10px] uppercase tracking-widest opacity-80 mb-2">
                  <span>Progress to Next Reward</span>
                  <span>420 / 500 pts</span>
                </div>
                <div className="h-1.5 bg-white/30 rounded-full overflow-hidden">
                  <div className="h-full bg-white w-[84%]" />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4 max-w-md mx-auto">
            <div className="rounded-2xl bg-ink-2 border border-white/10 p-4">
              <div className="text-[10px] uppercase tracking-widest text-orange">This Month</div>
              <div className="font-display text-3xl text-white mt-1">12 cups</div>
            </div>
            <div className="rounded-2xl bg-ink-2 border border-white/10 p-4">
              <div className="text-[10px] uppercase tracking-widest text-orange">Tier</div>
              <div className="font-display text-3xl text-white mt-1">Gold</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- SECTION 9: MOBILE APP ---------------- */
export function AppSection() {
  return (
    <section className="relative bg-orange text-white py-24 md:py-36 overflow-hidden grain">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_20%_50%,rgba(255,255,255,0.15),transparent)]" />
      <div className="mx-auto max-w-[1400px] px-5 md:px-10 grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/80">Barista App</span>
          <h2 className="mt-4 font-display text-5xl md:text-7xl leading-[0.9]">
            YOUR BARISTA EXPERIENCE,
            <br />
            IN YOUR POCKET.
          </h2>
          <ul className="mt-8 space-y-3 max-w-md">
            {["Discover offers", "Find nearby cafés", "Access loyalty rewards", "Stay updated with new releases"].map((t) => (
              <li key={t} className="flex items-center gap-3 text-white/95">
                <span className="size-1.5 rounded-full bg-white" />
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#" className="inline-flex items-center gap-3 rounded-2xl bg-ink px-5 py-3 text-left hover:bg-black transition-colors">
              <Apple className="size-6" />
              <div>
                <div className="text-[10px] opacity-70 uppercase tracking-widest">Download on</div>
                <div className="font-semibold text-sm">App Store</div>
              </div>
            </a>
            <a href="#" className="inline-flex items-center gap-3 rounded-2xl bg-ink px-5 py-3 text-left hover:bg-black transition-colors">
              <PlayCircle className="size-6" />
              <div>
                <div className="text-[10px] opacity-70 uppercase tracking-widest">Get it on</div>
                <div className="font-semibold text-sm">Google Play</div>
              </div>
            </a>
          </div>
        </div>

        {/* Phone mockup */}
        <div className="relative flex justify-center">
          <div className="relative w-[280px] aspect-[9/19] rounded-[3rem] bg-ink border-[10px] border-black shadow-[0_60px_100px_-20px_rgba(0,0,0,0.6)] float-soft overflow-hidden">
            <div className="absolute top-2 left-1/2 -translate-x-1/2 h-5 w-24 rounded-full bg-black z-10" />
            <div className="absolute inset-0 flex flex-col p-5 pt-10 text-white">
              <div className="flex items-center justify-between text-[10px] opacity-70">
                <span>Good Morning</span>
                <Smartphone className="size-3" />
              </div>
              <div className="mt-2 font-display text-2xl">Hello, Amaya</div>
              <div className="mt-4 rounded-2xl bg-gradient-to-br from-orange to-coffee p-4">
                <div className="text-[10px] uppercase tracking-widest opacity-80">Rewards</div>
                <div className="font-display text-3xl">420 pts</div>
                <div className="mt-3 h-1.5 bg-white/30 rounded-full overflow-hidden">
                  <div className="h-full bg-white w-[80%]" />
                </div>
              </div>
              <div className="mt-4 text-[10px] uppercase tracking-widest text-white/60">Featured</div>
              <div className="mt-2 flex-1 rounded-2xl bg-white/5 border border-white/10 p-3 flex items-center gap-3">
                <div className="size-14 rounded-xl bg-gradient-to-br from-almond/30 to-ink flex items-center justify-center">
                  <img src={cupUrl} alt="" className="h-12 w-auto object-contain" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-semibold truncate">Almond Milk Cappuccino</div>
                  <div className="text-[10px] text-white/60 mt-0.5">Plant-Based</div>
                  <div className="text-orange text-xs font-semibold mt-1">Order now →</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- SECTION 10: SUSTAINABILITY ---------------- */
export function Sustainability() {
  return (
    <section id="sustainability" className="relative bg-cream text-ink py-24 md:py-36 grain">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="max-w-3xl">
          <span className="eyebrow">Better Tomorrow</span>
          <h2 className="mt-4 font-display text-5xl md:text-7xl leading-[0.9]">
            BETTER COFFEE.
            <br />
            BETTER <span className="text-orange">CHOICES.</span>
          </h2>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {[
            { icon: Leaf, title: "Thoughtful Ingredients", body: "Curated sourcing and quality-focused blends." },
            { icon: Recycle, title: "Responsible Packaging", body: "Reducing our footprint one cup at a time." },
            { icon: Users, title: "Stronger Communities", body: "Investing in the people behind every cup." },
          ].map((s) => (
            <div key={s.title} className="rounded-3xl bg-white border border-ink/10 p-8 hover:border-orange transition-colors">
              <span className="grid size-12 place-items-center rounded-full bg-orange/10 text-orange">
                <s.icon className="size-5" />
              </span>
              <div className="mt-6 font-display text-2xl">{s.title}</div>
              <p className="mt-2 text-sm text-ink/60">{s.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <a href="#" className="inline-flex items-center gap-2 rounded-full bg-ink text-white px-5 py-3 text-xs font-semibold uppercase tracking-widest hover:bg-orange transition-colors">
            Explore Our Commitments <ArrowRight className="size-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------------- SECTION 11: FRANCHISING ---------------- */
export function Franchising() {
  return (
    <section id="franchising" className="relative overflow-hidden py-32 md:py-48 grain">
      <div className="absolute inset-0 bg-gradient-to-br from-coffee via-ink to-ink" />
      <div className="absolute inset-0 spotlight opacity-60" />
      <div className="absolute -left-40 -bottom-40 size-[600px] rounded-full bg-orange/20 blur-[130px]" />
      <div className="relative mx-auto max-w-[1400px] px-5 md:px-10 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <span className="eyebrow">Franchising</span>
          <h2 className="mt-4 font-display text-6xl md:text-8xl leading-[0.85] text-white">
            GROW WITH
            <br />
            <span className="text-orange">BARISTA.</span>
          </h2>
          <p className="mt-6 max-w-md text-white/70 leading-relaxed">
            Bring a recognised café experience to your community and become part of the Barista journey.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-orange px-5 py-3 text-xs font-semibold uppercase tracking-widest text-white hover:bg-orange-glow transition-colors">
              Franchise Enquiry <ArrowRight className="size-4" />
            </a>
            <a href="#" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-3 text-xs font-semibold uppercase tracking-widest text-white hover:bg-white/10 transition-colors">
              Learn More
            </a>
          </div>
        </div>
        <div className="hidden lg:flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 spotlight opacity-90" />
            <Building2 className="size-72 text-white/10" strokeWidth={0.5} />
            <div className="absolute inset-0 flex items-center justify-center">
              <img src={cupUrl} alt="" className="h-64 w-auto object-contain float-soft drop-shadow-[0_30px_50px_rgba(0,0,0,0.6)]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- SECTION 12: NEWS & STORIES ---------------- */
const news = [
  { cat: "Awards", date: "Jul 15, 2026", title: "BARISTA Wins Triple Honors at the National Business Excellence Awards 2025", img: awardsAsset.url },
  { cat: "Café Update", date: "Jul 02, 2026", title: "Barista Opens Its 90th Outlet at Dambulla Road", img: cafeAsset.url },
  { cat: "Community", date: "Jun 20, 2026", title: "Barista Opens 91st Outlet at Ministry of Brands", img: plantBasedAsset.url },
];


export function News() {
  return (
    <section className="relative bg-cream text-ink py-24 md:py-36 grain">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span className="eyebrow">Journal</span>
            <h2 className="mt-4 font-display text-5xl md:text-7xl leading-[0.9]">
              FRESHLY BREWED
              <br />
              <span className="text-orange">STORIES.</span>
            </h2>
          </div>
          <a href="#" className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest group">
            All Stories <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {news.map((n, i) => (
            <a key={n.title} href="#" className="group rounded-3xl overflow-hidden bg-white border border-ink/10 hover:border-orange transition-colors block">
              <div className="relative aspect-[4/3] overflow-hidden">
                <div className={`absolute inset-0 ${i === 0 ? "bg-gradient-to-br from-orange/30 via-coffee to-ink" : i === 1 ? "bg-gradient-to-br from-almond/50 to-cream" : "bg-gradient-to-br from-coffee/40 to-almond/30"}`} />
                <div className="absolute inset-0 spotlight opacity-40" />
                <img src={cupUrl} alt="" className="absolute inset-0 m-auto h-[80%] w-auto object-contain transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest">
                  <span className="text-orange font-semibold">{n.cat}</span>
                  <span className="text-ink/50">{n.date}</span>
                </div>
                <div className="mt-3 font-display text-2xl leading-tight">{n.title}</div>
                <div className="mt-4 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-widest">
                  Read More <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- SECTION 13: NEWSLETTER ---------------- */
export function Newsletter() {
  return (
    <section className="relative bg-ink py-24 md:py-32 grain">
      <div className="mx-auto max-w-3xl px-5 md:px-10 text-center">
        <h2 className="font-display text-5xl md:text-7xl leading-[0.9] text-white">
          GOOD COFFEE.
          <br />
          <span className="text-orange">GREAT MOMENTS.</span>
        </h2>
        <p className="mt-5 text-white/60 max-w-lg mx-auto">
          Get new-product updates, offers and Barista stories delivered to your inbox.
        </p>
        <form onSubmit={(e) => e.preventDefault()} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
          <label className="flex-1 flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-5 py-4 focus-within:border-orange transition-colors">
            <Mail className="size-4 text-white/50" />
            <input
              type="email"
              required
              placeholder="your@email.com"
              className="w-full bg-transparent outline-none text-sm text-white placeholder:text-white/40"
              aria-label="Email address"
            />
          </label>
          <button className="rounded-full bg-orange px-6 py-4 text-xs font-semibold uppercase tracking-widest text-white hover:bg-orange-glow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange transition-colors">
            Subscribe
          </button>
        </form>
        <p className="mt-4 text-[11px] text-white/40">
          By subscribing, you agree to our privacy policy. Unsubscribe any time.
        </p>
      </div>
    </section>
  );
}

/* ---------------- SECTION 14: FOOTER ---------------- */
export function Footer() {
  return (
    <footer id="contact" className="relative bg-ink border-t border-white/10 pt-20 pb-10">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="font-display text-4xl text-white">
              BAR<span className="text-orange">I</span>STA
            </div>
            <p className="mt-4 text-sm text-white/60 max-w-xs">
              Modern coffee culture, brewed across Sri Lanka. Discover cafés, rewards and the Plant-Based Collection.
            </p>
            <div className="mt-6 flex gap-3">
              <a href="#" className="grid size-10 place-items-center rounded-full border border-white/10 text-white/80 hover:bg-orange hover:text-white hover:border-orange transition-colors" aria-label="Instagram">
                <Instagram className="size-4" />
              </a>
              <a href="#" className="grid size-10 place-items-center rounded-full border border-white/10 text-white/80 hover:bg-orange hover:text-white hover:border-orange transition-colors" aria-label="Facebook">
                <Facebook className="size-4" />
              </a>
              <a href="#" className="grid size-10 place-items-center rounded-full border border-white/10 text-white/80 hover:bg-orange hover:text-white hover:border-orange transition-colors" aria-label="YouTube">
                <Youtube className="size-4" />
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#" className="inline-flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-white hover:bg-white/10 transition-colors">
                <Apple className="size-5" />
                <div className="text-left">
                  <div className="text-[9px] opacity-70 uppercase tracking-widest">App Store</div>
                  <div className="text-xs font-semibold">Download</div>
                </div>
              </a>
              <a href="#" className="inline-flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-white hover:bg-white/10 transition-colors">
                <PlayCircle className="size-5" />
                <div className="text-left">
                  <div className="text-[9px] opacity-70 uppercase tracking-widest">Google Play</div>
                  <div className="text-xs font-semibold">Get App</div>
                </div>
              </a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <FooterCol title="Explore" items={["Home", "Menu", "Our Story", "Locations"]} />
          </div>
          <div className="lg:col-span-2">
            <FooterCol title="Company" items={["Franchising", "Careers", "Sustainability", "Press"]} />
          </div>
          <div className="lg:col-span-2">
            <FooterCol title="Support" items={["Contact", "FAQs", "Feedback", "Gift Cards"]} />
          </div>

          <div className="lg:col-span-2">
            <div className="text-[11px] uppercase tracking-widest text-white/50 font-semibold">Contact</div>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-2">
                <MapPin className="size-4 mt-0.5 text-orange shrink-0" /> Colombo, Sri Lanka
              </li>
              <li className="flex items-center gap-2">
                <Phone className="size-4 text-orange shrink-0" /> +94 11 000 0000
              </li>
              <li className="flex items-center gap-2">
                <Mail className="size-4 text-orange shrink-0" /> hello@barista.lk
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div>© {new Date().getFullYear()} Barista Sri Lanka — Concept design.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-widest text-white/50 font-semibold">{title}</div>
      <ul className="mt-4 space-y-2.5">
        {items.map((i) => (
          <li key={i}>
            <a href="#" className="text-sm text-white/80 hover:text-orange transition-colors">
              {i}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
