import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import {
  ArrowDownRight,
  ArrowRight,
  BadgeCheck,
  Check,
  ChevronRight,
  Fingerprint,
  GraduationCap,
  IdCard,
  Lightbulb,
  Mail,
  Menu,
  MessageCircle,
  Phone,
  ShieldCheck,
  Smartphone,
  Sparkles,
  WalletCards,
  X,
  Zap,
} from "lucide-react";

import logo from "@/assets/monieking-logo.png";
import family from "@/assets/family-trust.jpg";
import heroTrader from "@/assets/hero-trader-phone.jpg";
import officer from "@/assets/zone-officer.jpg";
import { AppScreen } from "@/components/monieking/app-screens";
import { SupportAssistant } from "@/components/monieking/support-assistant";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MonieKing | Digital Adashi, Ajo & Esusu" },
      {
        name: "description",
        content:
          "Save with transparent contribution cards, a trusted Zone Officer, NIMC and BVN services, airtime, data and bill payments in one wallet.",
      },
      { property: "og:title", content: "MonieKing | The Adashi you know, now digital" },
      {
        property: "og:description",
        content:
          "Transparent contribution records, wallet services, identity services, bills, and community support.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

const APP_URL = "https://monieking.webodemos.com/";
const WHATSAPP = "2348038995252";
const WA_GROUP = "https://chat.whatsapp.com/IuMEDUG0Pe41HTwgNznKYM?s=sw&p=a&mlu=4&ilr=4";

function WhatsAppPill({ className = "", label = "Join the MonieKing community" }) {
  return (
    <a href={WA_GROUP} target="_blank" rel="noreferrer" className={`wa-pill ${className}`}>
      <MessageCircle className="size-4 shrink-0" />
      <span className="min-w-0">{label}</span>
      <ArrowRight className="size-3.5 shrink-0" />
    </a>
  );
}

/** Counts from 1 to `to` each time it scrolls into view. */
function Counter({
  to,
  prefix = "",
  suffix = "",
}: {
  to: number;
  prefix?: string | undefined;
  suffix?: string | undefined;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { amount: 0.6 });
  const [n, setN] = useState(1);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1200;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.max(1, Math.round(eased * to)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return (
    <span ref={ref}>
      {prefix}
      {n.toLocaleString()}
      {suffix}
    </span>
  );
}
const nav = [
  ["Features", "#features"],
  ["Services", "#services"],
  ["How it works", "#how-it-works"],
  ["Security", "#security"],
  ["Contact", "#contact"],
];
const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.65 },
};

function LaunchButton({
  label = "Launch MonieKing",
  pale = false,
}: {
  label?: string;
  pale?: boolean;
}) {
  return (
    <a
      href={APP_URL}
      target="_blank"
      rel="noreferrer"
      className={pale ? "button-pale" : "button-primary"}
    >
      {label}
      <ArrowRight className="size-4" />
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, []);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/8 bg-app-ink/85 backdrop-blur-xl">
      <div className="site-shell grid h-[68px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:h-[74px] lg:flex lg:justify-between">
        <a href="#top" className="relative z-10 min-w-0">
          <img src={logo} alt="MonieKing" className="h-6 w-auto sm:h-7" />
        </a>
        <nav className="hidden items-center gap-7 lg:flex">
          {nav.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="text-xs font-bold text-app-mint/75 transition hover:text-primary"
            >
              {label}
            </a>
          ))}
          <WhatsAppPill label="WhatsApp group" />
          <LaunchButton label="Launch App" />
        </nav>
        <button
          onClick={() => setOpen((v) => !v)}
          className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-app-cream lg:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-white/10 bg-app-ink px-5 lg:hidden"
          >
            <div className="flex flex-col gap-1 py-5">
              {nav.map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="border-b border-white/8 py-4 text-lg font-extrabold text-app-cream"
                >
                  {label}
                </a>
              ))}
              <div className="mt-4 flex flex-col gap-3">
                <WhatsAppPill className="justify-center" label="Join our WhatsApp group" />
                <LaunchButton label="Launch App" />
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

/**
 * Trader photograph with the live app interface composited onto the phone
 * she is holding. The overlay rect matches the phone screen in the artwork.
 */
const BASE_W = 208;

function TraderPhone({ screen = "dashboard" as const }: { screen?: "dashboard" | "carddetail" }) {
  const rect = useRef<HTMLDivElement>(null);
  const [k, setK] = useState(1);
  useEffect(() => {
    const el = rect.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width;
      if (w) setK(w / BASE_W);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <div className="hero-bleed relative overflow-hidden rounded-[36px] lg:rounded-none lg:border-0">
      <img
        src={heroTrader}
        alt="Nigerian market trader holding a phone showing the MonieKing app"
        width={1200}
        height={1408}
        className="block h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-app-ink/70 via-transparent to-app-ink/20" />
      {/* phone screen rect, measured against the artwork */}
      <div
        ref={rect}
        className="phone-inset absolute left-[60.3%] top-[20.1%] w-[29.6%] overflow-hidden rounded-[7px]"
      >
        <div className="aspect-[355/747]">
          <div
            className="absolute left-0 top-0 origin-top-left"
            style={{ width: BASE_W, height: BASE_W * (747 / 355), transform: `scale(${k})` }}
          >
            <AppScreen kind={screen} bare className="h-full" />
          </div>
          <span className="phone-glare pointer-events-none absolute inset-0" />
        </div>
      </div>
    </div>
  );
}

function FloatingBadge({
  title,
  copy,
  className = "",
}: {
  title: string;
  copy: string;
  className?: string;
}) {
  return (
    <div
      className={`badge-pulse rounded-2xl border border-white/15 bg-app-ink/85 px-3 py-2.5 backdrop-blur sm:px-4 sm:py-3 ${className}`}
    >
      <p className="text-[9px] font-bold uppercase tracking-[.2em] text-primary sm:text-[10px]">
        {title}
      </p>
      <p className="mt-1 text-xs font-extrabold leading-tight text-app-cream sm:text-sm">{copy}</p>
    </div>
  );
}

const heroChips: {
  to: number;
  prefix?: string | undefined;
  suffix?: string | undefined;
  label: string;
}[] = [
  { to: 372, label: "day cards" },
  { to: 1000, prefix: "₦", label: "daily rate" },
  { to: 24, suffix: "/7", label: "wallet access" },
];

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-24 sm:pt-32 lg:pt-40">
      <div className="ledger-grid absolute inset-0 opacity-30" />
      <div className="site-shell relative pb-16 sm:pb-24">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_.95fr] lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75 }}
            className="relative z-10 min-w-0"
          >
            <div className="eyebrow">
              <Sparkles className="size-3.5" /> Contribution habit, made visible
            </div>
            <h1 className="display mt-6 text-[clamp(3.35rem,13.5vw,7.6rem)] leading-[1.02] tracking-[-.05em] sm:leading-[.82] sm:tracking-[-.075em]">
              {["The Adashi", "you know,", "now digital."].map((line, i) => (
                <motion.span
                  key={line}
                  initial={{ opacity: 0, y: "0.35em" }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.12 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  className={`block ${i === 2 ? "text-primary" : ""}`}
                >
                  {line}
                </motion.span>
              ))}
            </h1>
            <p className="mt-6 max-w-lg text-[15px] leading-7 text-app-mint/70 sm:mt-8 sm:text-lg">
              Save with a trusted Zone Officer or directly in the app. Every contribution stays
              recorded, your progress stays visible, and your money stays within reach.
            </p>
            <div className="mt-7 flex flex-row flex-wrap gap-2 sm:gap-3">
              <a
                href={APP_URL}
                target="_blank"
                rel="noreferrer"
                className="button-primary flex-1 px-4 text-[.7rem] sm:flex-none sm:px-5 sm:text-xs"
              >
                Launch MonieKing <ArrowRight className="size-4" />
              </a>
              <a
                href="#how-it-works"
                className="button-ghost flex-1 px-4 text-[.7rem] sm:flex-none sm:px-5 sm:text-xs"
              >
                See how it works <ArrowDownRight className="size-4" />
              </a>
            </div>
            <div className="mt-5">
              <WhatsAppPill label="Join the MonieKing community" />
            </div>
            {/* compact metric chips — side by side even on the smallest phones */}
            <div className="mt-8 grid grid-cols-3 gap-2 sm:max-w-md sm:gap-3">
              {heroChips.map(({ to, prefix, suffix, label }) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/10 bg-white/[.04] px-2 py-3 text-center sm:px-3"
                >
                  <b className="stat-shimmer block text-base font-extrabold leading-none text-primary sm:text-xl">
                    <Counter to={to} prefix={prefix} suffix={suffix} />
                  </b>
                  <span className="mt-1 block text-[10px] font-bold leading-tight text-app-mint/60">
                    {label}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[11px] font-bold text-app-mint/70 sm:text-xs">
              {["Transparent records", "Flexible cards", "PWA — no app store"].map((x) => (
                <span key={x} className="flex items-center gap-2">
                  <Check className="size-3.5 shrink-0 text-app-green" />
                  {x}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.12 }}
            className="relative mx-auto w-full max-w-[560px]"
          >
            <TraderPhone />
            <FloatingBadge
              title="Live record"
              copy="No missing days. No guessing."
              className="absolute -bottom-4 left-2 max-w-[170px] sm:-left-6 sm:max-w-[190px]"
            />
            <FloatingBadge
              title="Zone officer"
              copy="Cash posted the same day."
              className="absolute -top-3 right-2 hidden max-w-[180px] sm:block"
            />
          </motion.div>
        </div>

        {/* mobile: swipeable peek of the real app screens */}
        <div className="mt-12 lg:hidden">
          <p className="section-no mb-3">Swipe the app →</p>
          <div className="peek-rail">
            {(
              [
                ["dashboard", "Home"],
                ["carddetail", "Card detail"],
                ["services", "Services"],
                ["wallet", "Wallet"],
              ] as const
            ).map(([kind, label]) => (
              <div key={kind} className="peek-item">
                <div className="peek-frame">
                  <AppScreen kind={kind} className="h-full w-full" />
                </div>
                <p className="mt-2 text-center text-[10px] font-bold uppercase tracking-[.18em] text-app-mint/55">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  return (
    <div className="overflow-hidden border-y border-white/8 bg-app-forest py-4">
      <div className="animate-marquee flex w-max gap-10 whitespace-nowrap text-xs font-extrabold uppercase tracking-[.24em] text-app-mint">
        {Array.from({ length: 2 }).flatMap((_, i) =>
          [
            "Contribution cards",
            "Wallet & virtual account",
            "NIMC & BVN",
            "Airtime & data",
            "Bill payments",
            "Zone Officer support",
          ].map((x) => (
            <span key={`${i}-${x}`} className="flex items-center gap-10">
              {x}
              <span className="text-primary">✦</span>
            </span>
          )),
        )}
      </div>
    </div>
  );
}

function Features() {
  return (
    <section id="features" className="section-pad overflow-hidden">
      <div className="site-shell">
        <motion.div {...reveal} className="grid gap-5 md:grid-cols-[.7fr_1.3fr]">
          <span className="section-no">01 — Product</span>
          <div>
            <p className="eyebrow">Everything in one place</p>
            <h2 className="section-title mt-5">
              A savings habit you can <span>see.</span>
            </h2>
          </div>
        </motion.div>
        <div className="mt-12 grid gap-4 sm:mt-16 sm:gap-5 md:grid-cols-12">
          <motion.article
            {...reveal}
            className="feature-card overflow-hidden sm:min-h-[780px] sm:pb-[430px] md:col-span-7"
          >
            <div className="relative z-10 max-w-md">
              <span className="feature-icon">
                <WalletCards />
              </span>
              <h3>Contribution cards that show the whole story.</h3>
              <p>
                Create a Regular or Food Card, follow each of the 372 days, and keep the full record
                in one digital ledger.
              </p>
            </div>
            {/* upright card-detail phone with an offset back chassis for depth */}
            <div className="phone-stage relative mx-auto mt-8 w-[210px] sm:absolute sm:-bottom-20 sm:right-12 sm:mx-0 sm:mt-0 sm:w-[250px]">
              <div className="phone-back absolute -right-[16%] -top-[4%] h-[92%] w-[84%] rotate-[7deg]">
                <span className="lens absolute left-[12%] top-[6%]" />
                <span className="lens absolute left-[42%] top-[6%]" />
                <span className="lens absolute left-[12%] top-[24%]" />
              </div>
              <AppScreen kind="carddetail" className="relative w-full" />
            </div>
          </motion.article>
          <motion.article
            {...reveal}
            className="feature-card feature-card-light overflow-hidden sm:min-h-[780px] sm:pb-[430px] md:col-span-5"
          >
            <span className="feature-icon bg-app-forest text-primary">
              <Zap />
            </span>
            <h3>Your wallet does more than save.</h3>
            <p>Fund with a virtual account, withdraw, buy airtime and data, or settle bills.</p>
            <div className="relative mx-auto mt-8 w-[200px] sm:absolute sm:-bottom-24 sm:left-1/2 sm:mt-0 sm:w-[225px] sm:-translate-x-1/2">
              <AppScreen kind="wallet" className="phone-tilt relative w-full" />
            </div>
          </motion.article>
          <motion.article
            {...reveal}
            className="feature-card overflow-hidden sm:min-h-[700px] sm:pb-[400px] md:col-span-5"
          >
            <span className="feature-icon">
              <BadgeCheck />
            </span>
            <h3>Know who is collecting.</h3>
            <p>Zone Officers use their own portal to register customers and post cash.</p>
            <AppScreen
              kind="officer"
              className="relative mx-auto mt-8 w-[200px] rotate-[2deg] sm:absolute sm:-bottom-20 sm:left-1/2 sm:mt-0 sm:w-[200px] sm:-translate-x-1/2"
            />
          </motion.article>
          <motion.article
            {...reveal}
            className="feature-card feature-card-photo min-h-[380px] sm:min-h-[560px] md:col-span-7"
          >
            <img
              src={officer}
              alt="MonieKing Zone Officer meeting a business owner"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-app-ink via-app-ink/25 to-transparent" />
            <div className="relative z-10 mt-auto max-w-lg self-end">
              <p className="eyebrow">Human when you want it</p>
              <h3>A trusted face, backed by a digital record.</h3>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}

const serviceItems = [
  {
    Icon: IdCard,
    title: "NIMC identity services",
    copy: "NIN slip reprint, NIN modification and enrolment support, requested and tracked in the app.",
  },
  {
    Icon: Fingerprint,
    title: "BVN validation",
    copy: "Validate or retrieve a BVN and raise your verification level without leaving the market.",
  },
  {
    Icon: Smartphone,
    title: "Airtime & data top-up",
    copy: "MTN, Glo, Airtel and 9mobile airtime and data bundles, paid straight from your wallet.",
  },
  {
    Icon: Lightbulb,
    title: "Utility & exam bills",
    copy: "Electricity tokens, cable TV, and JAMB, WAEC and NECO payments with an instant receipt.",
  },
];

function Services() {
  return (
    <section id="services" className="section-pad overflow-hidden bg-app-forest">
      <div className="site-shell">
        <motion.div {...reveal} className="grid gap-5 md:grid-cols-[.7fr_1.3fr]">
          <span className="section-no">02 — Services</span>
          <div>
            <p className="eyebrow">Beyond saving</p>
            <h2 className="section-title mt-5">
              The errands that eat your day, <span>done in the app.</span>
            </h2>
          </div>
        </motion.div>

        <div className="mt-12 grid items-center gap-10 sm:mt-16 lg:grid-cols-[.9fr_1.1fr] lg:gap-16">
          <motion.div
            {...reveal}
            className="relative mx-auto w-full max-w-[300px] lg:max-w-[340px]"
          >
            <div className="absolute inset-x-6 top-10 -z-0 h-[85%] rounded-[48px] bg-app-green/15 blur-2xl" />
            <AppScreen kind="services" className="relative w-full" />
            <FloatingBadge
              title="Receipts"
              copy="Every request tracked to done."
              className="absolute -bottom-5 -left-3 max-w-[160px] sm:-left-10"
            />
          </motion.div>

          <motion.div {...reveal} className="grid gap-3 sm:grid-cols-2">
            {serviceItems.map(({ Icon, title, copy }) => (
              <article
                key={title}
                className="rounded-3xl border border-white/10 bg-white/[.04] p-5 transition hover:border-primary/40"
              >
                <span className="flex size-10 items-center justify-center rounded-full bg-primary text-app-ink">
                  <Icon className="size-[1.15rem]" />
                </span>
                <h3 className="mt-4 text-lg font-extrabold tracking-tight text-app-cream">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-app-mint/60">{copy}</p>
              </article>
            ))}
            <div className="rounded-3xl border border-primary/25 bg-primary/8 p-5 sm:col-span-2">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 items-start gap-3 sm:items-center">
                  <GraduationCap className="size-6 shrink-0 text-primary" />
                  <p className="min-w-0 text-balance break-words text-sm font-extrabold text-app-cream">
                    Pay JAMB, WAEC and NECO from the same wallet.
                  </p>
                </div>
                <div className="flex w-full sm:w-auto">
                  <LaunchButton label="Open services" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    [
      "01",
      "Choose your way in",
      "Launch MonieKing in your browser, or speak with your Zone Officer.",
    ],
    [
      "02",
      "Start a card",
      "Pick a flexible Regular Card or a Food Card built on a fixed daily habit.",
    ],
    [
      "03",
      "Watch every day add up",
      "Contribute digitally or in cash. Each payment joins your visible record.",
    ],
    [
      "04",
      "Use one connected wallet",
      "Fund, withdraw, and pay for everyday services from the same place.",
    ],
  ];
  return (
    <section id="how-it-works" className="section-pad bg-app-cream text-app-forest">
      <div className="site-shell">
        <motion.div
          {...reveal}
          className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end"
        >
          <div>
            <p className="eyebrow text-app-green">How it works</p>
            <h2 className="section-title mt-5 max-w-3xl text-app-forest">
              From market day to <span className="text-app-green">money day.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-app-muted">
            Familiar enough to feel natural. Digital enough to make every step clear.
          </p>
        </motion.div>
        <div className="mt-12 grid border-y border-app-forest/15 sm:mt-16 md:grid-cols-2 lg:grid-cols-4">
          {steps.map(([n, title, copy], i) => (
            <motion.article
              {...reveal}
              key={n}
              className="group relative border-app-forest/15 px-2 py-7 md:px-7 md:py-9 lg:border-r"
            >
              <span className="font-mono text-xs text-app-green">{n}</span>
              <div className="my-6 h-px bg-app-forest/15 sm:my-8">
                <span className="block size-2 -translate-y-1 rounded-full bg-primary transition group-hover:translate-x-4" />
              </div>
              <h3 className="text-lg font-extrabold tracking-tight sm:text-xl">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-app-muted">{copy}</p>
              {i < 3 && (
                <ChevronRight className="absolute -right-3 top-1/2 z-10 hidden size-6 rounded-full bg-app-cream text-app-green lg:block" />
              )}
            </motion.article>
          ))}
        </div>
        <motion.div
          {...reveal}
          className="relative mt-16 grid overflow-hidden rounded-[32px] bg-app-forest sm:rounded-[48px] lg:grid-cols-2"
        >
          <div className="relative z-10 p-7 sm:p-14">
            <p className="eyebrow">One connected experience</p>
            <h3 className="mt-6 text-3xl font-extrabold tracking-[-.05em] text-app-cream sm:text-6xl">
              Save. Spend. Keep moving.
            </h3>
            <p className="mt-5 max-w-md leading-7 text-app-mint/65">
              The wallet is the bridge between your contributions and daily digital payments.
            </p>
            <div className="mt-8">
              <LaunchButton />
            </div>
          </div>
          <div className="relative min-h-[330px] sm:min-h-[430px]">
            <AppScreen
              kind="bills"
              className="absolute bottom-[-50px] left-[4%] w-[180px] -rotate-[7deg] sm:w-[280px]"
            />
            <AppScreen
              kind="services"
              className="absolute bottom-[-25px] right-[3%] w-[190px] rotate-[7deg] sm:w-[290px]"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Security() {
  const trustItems = [
    {
      Icon: Fingerprint,
      title: "Identity verification",
      copy: "BVN and NIN support Basic and Full verification levels.",
    },
    {
      Icon: ShieldCheck,
      title: "Withdrawal protection",
      copy: "Use a separate withdrawal password or fingerprint where supported.",
    },
    {
      Icon: WalletCards,
      title: "Complete contribution record",
      copy: "See progress, payment history, and card status without relying on paper alone.",
    },
  ];
  return (
    <section id="security" className="section-pad overflow-hidden">
      <div className="site-shell">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            {...reveal}
            className="relative mx-auto h-[380px] w-full max-w-[570px] sm:h-[600px]"
          >
            <div className="absolute inset-y-0 left-0 w-[82%] overflow-hidden rounded-[48%_52%_35%_65%/45%_46%_54%_55%]">
              <img
                src={family}
                alt="Nigerian family reviewing their savings"
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-app-ink/65 via-transparent to-transparent" />
            </div>
            <AppScreen
              kind="kyc"
              className="absolute bottom-0 right-0 w-[170px] rotate-[5deg] sm:w-[280px]"
            />
          </motion.div>
          <motion.div {...reveal}>
            <p className="eyebrow">Security & trust</p>
            <h2 className="section-title mt-5">
              Trust should not be <span>assumed.</span>
              <br />
              It should be visible.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-7 text-app-mint/65">
              Identity checks, withdrawal controls, and transparent records work together to protect
              the habit you are building.
            </p>
            <div className="mt-8 grid gap-3">
              {trustItems.map(({ Icon, title, copy }) => (
                <div key={title} className="trust-row">
                  <span>
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <h3>{title}</h3>
                    <p>{copy}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex items-center gap-3 rounded-2xl border border-primary/25 bg-primary/8 p-4">
              <BadgeCheck className="size-6 shrink-0 text-primary" />
              <p className="text-sm font-extrabold text-app-cream">
                MonieKing is fully licensed and regulated.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section-pad bg-app-green text-app-ink">
      <div className="site-shell">
        <motion.div {...reveal} className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="eyebrow border-app-ink/20 text-app-ink">Built around people</p>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[.2em] sm:mt-8">
              Digital tools.
              <br />
              Community trust.
            </p>
          </div>
          <div>
            <h2 className="text-[clamp(2.4rem,7vw,7rem)] font-extrabold leading-[.9] tracking-[-.06em]">
              The contribution culture was never broken.
            </h2>
            <p className="mt-6 max-w-xl text-base font-semibold leading-7 text-app-ink/70 sm:text-lg">
              It needed a clearer record, more useful access, and technology that respects how
              people already save.
            </p>
          </div>
        </motion.div>
        <div className="mt-14 grid gap-4 border-t border-app-ink/20 pt-8 sm:mt-20 sm:grid-cols-3">
          {[
            ["Visible", "Every contribution has a place in the ledger."],
            ["Flexible", "Save by yourself or with Zone Officer support."],
            ["Useful", "Move from saving to everyday payments in one wallet."],
          ].map(([a, b]) => (
            <div key={a}>
              <h3 className="text-2xl font-extrabold">{a}</h3>
              <p className="mt-2 max-w-xs text-sm leading-6 text-app-ink/65">{b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const inquiryTypes = [
  { value: "saver", label: "I want to save", hint: "Open a contribution card" },
  { value: "officer", label: "Zone Officer applicant", hint: "Collect and post contributions" },
  { value: "cooperative", label: "Market cooperative leader", hint: "Onboard your association" },
  { value: "partner", label: "Partner / business", hint: "Work with MonieKing" },
];

function Contact() {
  const [inquiry, setInquiry] = useState("saver");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");

  const message = useMemo(() => {
    const label = inquiryTypes.find((t) => t.value === inquiry)?.label ?? "Enquiry";
    return [
      `MonieKing enquiry — ${label}`,
      `Name: ${name || "-"}`,
      `Phone / WhatsApp: ${phone || "-"}`,
      `State / market: ${location || "-"}`,
      `Notes: ${notes || "-"}`,
    ].join("\n");
  }, [inquiry, name, phone, location, notes]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <section id="contact" className="section-pad overflow-hidden">
      <div className="site-shell">
        <div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:gap-16">
          <motion.div {...reveal}>
            <span className="section-no">03 — Contact</span>
            <h2 className="section-title mt-5">
              Talk to a real <span>MonieKing person.</span>
            </h2>
            <p className="mt-6 max-w-md text-base leading-7 text-app-mint/65">
              Whether you want to start saving, collect for your zone, bring your market association
              on board, or build with us — tell us which one you are and we will reply on WhatsApp.
            </p>
            <div className="mt-8 grid gap-3">
              <a
                href={`https://wa.me/${WHATSAPP}`}
                target="_blank"
                rel="noreferrer"
                className="trust-row items-center transition hover:border-primary/40"
              >
                <span>
                  <MessageCircle className="size-5" />
                </span>
                <div>
                  <h3>WhatsApp</h3>
                  <p>+234 803 899 5252 — fastest reply</p>
                </div>
              </a>
              <a
                href="mailto:joinmonieking@gmail.com"
                className="trust-row items-center transition hover:border-primary/40"
              >
                <span>
                  <Mail className="size-5" />
                </span>
                <div>
                  <h3>Email</h3>
                  <p>joinmonieking@gmail.com</p>
                </div>
              </a>
              <a
                href={WA_GROUP}
                target="_blank"
                rel="noreferrer"
                className="trust-row items-center transition hover:border-primary/40"
              >
                <span>
                  <MessageCircle className="size-5" />
                </span>
                <div>
                  <h3>Contributors community</h3>
                  <p>Join 5,000+ savers in the MonieKing WhatsApp group</p>
                </div>
              </a>
            </div>
            <div className="mt-6">
              <WhatsAppPill label="Join the MonieKing community" />
            </div>
          </motion.div>

          <motion.form
            {...reveal}
            onSubmit={submit}
            className="rounded-[28px] border border-white/10 bg-white/[.04] p-5 sm:rounded-[36px] sm:p-8"
          >
            <p className="text-[11px] font-bold uppercase tracking-[.18em] text-app-mint/60">
              I am contacting as
            </p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {inquiryTypes.map((t) => (
                <button
                  type="button"
                  key={t.value}
                  onClick={() => setInquiry(t.value)}
                  aria-pressed={inquiry === t.value}
                  className={`rounded-2xl border p-3 text-left transition ${
                    inquiry === t.value
                      ? "border-primary bg-primary/12"
                      : "border-white/12 bg-transparent hover:border-white/25"
                  }`}
                >
                  <b className="block text-sm font-extrabold text-app-cream">{t.label}</b>
                  <span className="mt-0.5 block text-[11px] leading-4 text-app-mint/55">
                    {t.hint}
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <label className="grid gap-1.5">
                <span className="field-label">Full name</span>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Amaka Okafor"
                  className="field"
                />
              </label>
              <label className="grid gap-1.5">
                <span className="field-label">Phone / WhatsApp</span>
                <input
                  required
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0803 000 0000"
                  className="field"
                />
              </label>
              <label className="grid gap-1.5 sm:col-span-2">
                <span className="field-label">State & market / area</span>
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Lagos — Balogun Market, Ikeja"
                  className="field"
                />
              </label>
              <label className="grid gap-1.5 sm:col-span-2">
                <span className="field-label">Anything we should know?</span>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="How many people save with you today?"
                  className="field resize-none"
                />
              </label>
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button type="submit" className="button-primary w-full sm:w-auto">
                Send on WhatsApp <ArrowRight className="size-4" />
              </button>
              <a
                href={`mailto:joinmonieking@gmail.com?subject=${encodeURIComponent("MonieKing enquiry")}&body=${encodeURIComponent(message)}`}
                className="button-ghost w-full sm:w-auto"
              >
                <Phone className="size-4" /> Email instead
              </a>
            </div>
            <p className="mt-3 text-[11px] leading-5 text-app-mint/45">
              Your details open a prefilled WhatsApp chat with the MonieKing team — nothing is
              stored on this page.
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-32">
      <div className="ledger-grid absolute inset-0 opacity-30" />
      <div className="site-shell relative text-center">
        <motion.div {...reveal}>
          <p className="eyebrow mx-auto">Your next contribution starts here</p>
          <h2 className="mx-auto mt-7 max-w-5xl text-[clamp(2.8rem,10vw,8rem)] font-extrabold leading-[.86] tracking-[-.065em] text-app-cream">
            Keep the habit.
            <br />
            <span className="text-primary">Change the record.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-base leading-7 text-app-mint/65">
            MonieKing installs straight from your browser. No app store required.
          </p>
          <div className="mt-8 flex justify-center">
            <LaunchButton label="Launch MonieKing" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 py-12">
      <div className="site-shell">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <img src={logo} alt="MonieKing" className="h-8" />
            <p className="mt-4 max-w-xs text-xs leading-5 text-app-mint/50">
              Digital contribution savings, everyday payments, and real community support.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-10 gap-y-3 text-xs sm:gap-x-16">
            <div className="grid gap-3">
              <b className="text-app-cream">Explore</b>
              {nav.map(([x, h]) => (
                <a key={h} href={h} className="text-app-mint/55 hover:text-primary">
                  {x}
                </a>
              ))}
            </div>
            <div className="grid gap-3">
              <b className="text-app-cream">Support</b>
              <a
                href="mailto:joinmonieking@gmail.com"
                className="text-app-mint/55 hover:text-primary"
              >
                Email us
              </a>
              <a
                href={`https://wa.me/${WHATSAPP}`}
                target="_blank"
                rel="noreferrer"
                className="text-app-mint/55 hover:text-primary"
              >
                WhatsApp
              </a>
              <a
                href="/contribution-license.pdf"
                target="_blank"
                className="text-app-mint/55 hover:text-primary"
              >
                View licence
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-[10px] leading-5 text-app-mint/40">
          MonieKing is a product/service operated by MonieKing Solution Nig. Ltd. (RC 7196881), Nigeria.
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-white/8 pt-6 text-[10px] text-app-mint/40 sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} MonieKing. All rights reserved.</span>
          <span>Fully licensed and regulated.</span>
        </div>
      </div>
    </footer>
  );
}

function HomePage() {
  return (
    <main className="bg-app-ink text-app-cream">
      <Header />
      <Hero />
      <Marquee />
      <Features />
      <Services />
      <HowItWorks />
      <Security />
      <About />
      <Contact />
      <FinalCta />
      <Footer />
      <SupportAssistant />
    </main>
  );
}
