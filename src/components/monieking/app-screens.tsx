import {
  ArrowDownLeft,
  ArrowLeft,
  ArrowUpRight,
  Bell,
  Calendar,
  ChevronRight,
  Clock,
  CreditCard,
  Copy,
  Eye,
  Fingerprint,
  Grid3X3,
  History,
  Home,
  IdCard,
  Landmark,
  LayoutGrid,
  Lightbulb,
  MapPin,
  Plus,
  ShieldCheck,
  Smartphone,
  TrendingUp,
  User,
  Users,
  Wallet,
  Zap,
} from "lucide-react";

import type { JSX } from "react";
import logo from "@/assets/monieking-logo.png";
import { cn } from "@/lib/utils";

type ScreenKind =
  "dashboard" | "card" | "carddetail" | "services" | "wallet" | "officer" | "kyc" | "bills";

const quickActions = [
  { label: "Airtime", icon: Smartphone },
  { label: "Bills", icon: Zap },
  { label: "NIMC", icon: ShieldCheck },
  { label: "More", icon: Grid3X3 },
];

const navItems = [
  { label: "Home", icon: Home },
  { label: "Cards", icon: CreditCard },
  { label: "Wallet", icon: Wallet },
  { label: "Services", icon: LayoutGrid },
  { label: "Profile", icon: User },
];

/** The app's real bottom tab bar: Home, Cards, Wallet, Services, Profile. */
function BottomNav({ active }: { active: (typeof navItems)[number]["label"] }) {
  return (
    <div className="-mx-3 mt-auto flex items-end justify-around bg-app-forest px-2 pb-2 pt-2">
      {navItems.map(({ label, icon: Icon }) => {
        const isActive = label === active;
        return (
          <span key={label} className="relative flex flex-col items-center gap-0.5">
            {isActive && (
              <span className="absolute -top-1 size-6 rounded-full bg-primary/25 blur-[3px]" />
            )}
            <Icon
              className={cn(
                "relative",
                isActive ? "size-3 text-primary" : "size-[10px] text-app-mint/45",
              )}
            />
            <span
              className={cn(
                "relative text-[5px] font-bold",
                isActive ? "text-primary" : "text-app-mint/45",
              )}
            >
              {label}
            </span>
          </span>
        );
      })}
    </div>
  );
}

function AppHeader({ officer = false }: { officer?: boolean }) {
  return (
    <div className="flex items-center justify-between px-3 pb-3 pt-1">
      <div className="flex items-center gap-1.5">
        <span className="flex size-7 items-center justify-center rounded-lg bg-app-forest">
          <img src={logo} alt="" className="h-3.5 w-auto" />
        </span>
        <span className="text-[11px] font-extrabold text-app-forest">
          Monie<span className="text-primary">King</span>
        </span>
      </div>
      {officer ? (
        <span className="rounded-full bg-app-forest px-2 py-1 text-[7px] font-bold text-primary">
          Officer
        </span>
      ) : (
        <Bell className="size-3.5 text-app-forest" />
      )}
    </div>
  );
}

function WalletBalance({ officer = false }: { officer?: boolean }) {
  return (
    <div className="relative overflow-hidden rounded-[18px] bg-app-forest p-3 text-app-cream">
      <span className="absolute -right-5 -top-5 size-20 rounded-full bg-app-green/25" />
      <span className="absolute right-5 top-2 size-10 rounded-full bg-app-green/20" />
      <div className="relative">
        <div className="flex items-center justify-between text-[6px] font-bold uppercase text-app-mint">
          <span>{officer ? "Officer wallet" : "Wallet balance"}</span>
          <Eye className="size-2.5" />
        </div>
        <div className="mt-1 text-[18px] font-extrabold">₦248,500.00</div>
        <div className="mt-0.5 flex items-center gap-1 text-[6px] text-app-mint/80">
          VA: 7056124839 <Copy className="size-2" />
        </div>
        <div className="mt-3 flex gap-1.5">
          <span className="flex flex-1 items-center justify-center gap-1 rounded-full bg-primary py-1.5 text-[6px] font-bold text-primary-foreground">
            <ArrowDownLeft className="size-2" />
            Fund wallet
          </span>
          <span className="flex flex-1 items-center justify-center gap-1 rounded-full border border-app-green py-1.5 text-[6px] font-bold">
            <ArrowUpRight className="size-2" />
            Withdraw
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * Contribution card — a real payment-card rectangle (1.58:1), the same
 * proportion the app renders, never a square.
 */
function ContributionCard({ tiny = false }: { tiny?: boolean }) {
  return (
    <div
      className={cn(
        "relative aspect-[1.58/1] w-full overflow-hidden rounded-[16px] bg-app-forest text-app-cream",
        tiny ? "p-2.5" : "p-3",
      )}
    >
      <span className="absolute -right-6 -top-6 size-24 rounded-full bg-app-green/20" />
      <span className="absolute right-2 top-1 size-12 rounded-full bg-app-green/12" />
      <div className="relative flex h-full flex-col justify-between">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[6px] font-bold uppercase tracking-[.18em] text-app-mint">
              MonieKing
            </p>
            <p className="text-[6px] text-app-mint/70">Contributors</p>
          </div>
          <span className="rounded-full bg-primary/20 px-2 py-0.5 text-[6px] font-bold text-primary">
            Regular
          </span>
        </div>
        <div>
          <p className="text-[6px] uppercase text-app-mint/70">Daily rate</p>
          <p className={cn("font-extrabold text-primary", tiny ? "text-sm" : "text-lg")}>₦1,000</p>
          <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-app-green/30">
            <div className="h-full w-[68%] rounded-full bg-primary" />
          </div>
          <div className="mt-1 flex justify-between text-[6px] text-app-mint/70">
            <span>253 / 372 days</span>
            <span>68%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardScreen() {
  return (
    <div className="flex min-h-full flex-col bg-app-surface px-3 pb-1 pt-2 text-app-forest">
      <AppHeader />
      <div className="mb-3">
        <p className="text-[6px] font-bold uppercase text-app-green">Good morning</p>
        <p className="text-sm font-extrabold">Amaka Okafor</p>
      </div>
      <WalletBalance />
      <p className="mb-2 mt-3 text-[9px] font-bold">Quick actions</p>
      <div className="grid grid-cols-4 gap-1">
        {quickActions.map(({ label, icon: Icon }) => (
          <div key={label} className="text-center">
            <span className="mx-auto flex size-8 items-center justify-center rounded-xl bg-app-mint">
              <Icon className="size-3.5" />
            </span>
            <span className="mt-1 block text-[5px] font-semibold">{label}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between">
        <p className="text-[9px] font-bold">My cards</p>
        <p className="flex items-center text-[6px] font-bold text-app-green">
          <Plus className="size-2.5" /> New card
        </p>
      </div>
      <div className="mt-1.5">
        <ContributionCard tiny />
      </div>
      <BottomNav active="Home" />
    </div>
  );
}

/** Miniature of the app's 12 × 31 contribution grid (372 days). */
function ContributionGrid() {
  const months = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
  return (
    <div className="rounded-[14px] border border-border/40 bg-card p-2">
      <div className="flex items-center justify-between">
        <p className="text-[6px] font-bold uppercase tracking-[.14em] text-app-forest">
          Contribution grid
        </p>
        <span className="flex items-center gap-1.5 text-[5px] text-app-muted">
          <span className="flex items-center gap-0.5">
            <span className="size-1 rounded-[1px] bg-app-green" />
            Filled
          </span>
          <span className="flex items-center gap-0.5">
            <span className="size-1 rounded-[1px] bg-destructive/70" />
            Withdrawn
          </span>
        </span>
      </div>
      <div className="mt-1.5 grid gap-[1.5px]">
        {months.map((m, mIdx) => (
          <div key={mIdx} className="flex items-center gap-[2px]">
            <span className="w-2 shrink-0 text-right text-[4px] font-bold text-app-muted">{m}</span>
            <div className="flex flex-1 gap-[1.5px]">
              {Array.from({ length: 31 }, (_, dIdx) => {
                const index = mIdx * 31 + dIdx;
                const filled = index < 253;
                const withdrawn = filled && index % 47 === 11;
                return (
                  <span
                    key={dIdx}
                    className={cn(
                      "aspect-square flex-1 rounded-[1px]",
                      withdrawn ? "bg-destructive/70" : filled ? "bg-app-green" : "bg-app-mint/70",
                    )}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** The real Card Detail page: grid preview, stats, Contribute / Withdraw. */
function CardDetailScreen() {
  return (
    <div className="flex min-h-full flex-col bg-app-surface px-3 pb-1 pt-2 text-app-forest">
      <div className="flex items-center gap-2 pb-2">
        <span className="flex size-6 items-center justify-center rounded-lg border border-border/40 bg-card">
          <ArrowLeft className="size-3" />
        </span>
        <div>
          <p className="text-[10px] font-extrabold leading-none">📋 Regular Card</p>
          <p className="mt-0.5 text-[5px] font-semibold text-app-muted">Card #MK-004182</p>
        </div>
        <span className="ml-auto rounded-full bg-primary/20 px-2 py-0.5 text-[6px] font-bold text-primary">
          Active
        </span>
      </div>
      <ContributionCard />
      <div className="mt-2 grid grid-cols-3 gap-1.5">
        {[
          { label: "Days saved", value: "253", Icon: TrendingUp, tone: "text-app-green" },
          { label: "Days left", value: "119", Icon: Calendar, tone: "text-primary" },
          { label: "Total saved", value: "₦253k", Icon: Clock, tone: "text-app-green" },
        ].map(({ label, value, Icon, tone }) => (
          <div key={label} className="rounded-xl border border-border/40 bg-card p-1.5">
            <Icon className={cn("size-2.5", tone)} />
            <b className="mt-0.5 block text-[10px] leading-none">{value}</b>
            <span className="text-[5px] text-app-muted">{label}</span>
          </div>
        ))}
      </div>
      <div className="mt-2">
        <ContributionGrid />
      </div>
      <div className="mt-2 flex gap-1.5">
        <span className="flex flex-1 items-center justify-center gap-1 rounded-full bg-app-forest py-1.5 text-[6px] font-bold text-app-cream">
          <Plus className="size-2" /> Contribute
        </span>
        <span className="flex flex-1 items-center justify-center gap-1 rounded-full border-2 border-app-mint py-1.5 text-[6px] font-bold text-app-forest">
          <ArrowUpRight className="size-2" /> Withdraw
        </span>
      </div>
      <BottomNav active="Cards" />
    </div>
  );
}

/** My cards list — kept for the smaller collage slots. */
function CardScreen() {
  return (
    <div className="flex min-h-full flex-col bg-app-surface px-3 pb-1 pt-2 text-app-forest">
      <AppHeader />
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[6px] font-bold uppercase text-app-green">Contribution cards</p>
          <p className="text-base font-extrabold">My cards</p>
        </div>
        <span className="rounded-full bg-primary px-2 py-1 text-[6px] font-bold">+ New card</span>
      </div>
      <div className="mt-2">
        <ContributionCard />
      </div>
      <div className="mt-2 rounded-xl bg-card p-2">
        <div className="flex items-center gap-2">
          <History className="size-3 text-app-green" />
          <div>
            <p className="text-[7px] font-bold">Full contribution history</p>
            <p className="text-[5px] text-app-muted">Every payment stays recorded</p>
          </div>
          <ChevronRight className="ml-auto size-3" />
        </div>
      </div>
      <BottomNav active="Cards" />
    </div>
  );
}

/** Services page: NIMC, BVN, Airtime & data, Utility & exam bills. */
function ServicesScreen() {
  const groups = [
    {
      group: "Identity services",
      Icon: IdCard,
      items: [
        ["NIN slip reprint"],
        ["NIN modification"],
        ["BVN validation"],
        ["BVN retrieval"],
      ],
    },
    {
      group: "Airtime & data",
      Icon: Smartphone,
      items: [
        ["Airtime top-up", "All networks"],
        ["Data bundles", "MTN · Glo · Airtel"],
      ],
    },
    {
      group: "Bill payments",
      Icon: Lightbulb,
      items: [
        ["Electricity & cable", "Instant token"],
        ["Exam payments", "JAMB · WAEC · NECO"],
      ],
    },
  ];
  return (
    <div className="flex min-h-full flex-col bg-app-surface px-3 pb-1 pt-2 text-app-forest">
      <div className="flex items-center gap-2 pb-2">
        <span className="flex size-6 items-center justify-center rounded-lg bg-app-mint">
          <ArrowLeft className="size-3" />
        </span>
        <p className="text-[11px] font-extrabold">All services</p>
      </div>
      {groups.map(({ group, Icon, items }) => (
        <div key={group} className="mb-2">
          <div className="mb-1 flex items-center gap-1">
            <Icon className="size-2.5 text-app-green" />
            <p className="text-[7px] font-bold">{group}</p>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {items.map(([name, meta]) => (
              <div key={name} className="rounded-xl border border-border/40 bg-card p-1.5">
                <span className="flex size-5 items-center justify-center rounded-lg bg-app-mint">
                  <Icon className="size-2.5 text-app-forest" />
                </span>
                <p className="mt-1 text-[6px] font-bold leading-tight">{name}</p>
                <p className="text-[5px] text-app-muted">{meta}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
      <BottomNav active="Services" />
    </div>
  );
}

function WalletScreen() {
  return (
    <div className="flex min-h-full flex-col bg-app-surface px-3 pb-1 pt-2 text-app-forest">
      <AppHeader />
      <p className="mb-3 text-base font-extrabold">My wallet</p>
      <WalletBalance />
      <div className="my-3 flex rounded-xl bg-card p-1 text-[6px] font-bold">
        <span className="flex-1 rounded-lg bg-app-forest py-1.5 text-center text-app-cream">
          All time
        </span>
        <span className="flex-1 py-1.5 text-center text-app-muted">30 days</span>
        <span className="flex-1 py-1.5 text-center text-app-muted">7 days</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-xl bg-card p-2">
          <ArrowDownLeft className="size-3 text-app-green" />
          <p className="mt-1 text-[5px] text-app-muted">Money in</p>
          <b className="text-[10px]">₦420,000</b>
        </div>
        <div className="rounded-xl bg-card p-2">
          <ArrowUpRight className="size-3 text-destructive" />
          <p className="mt-1 text-[5px] text-app-muted">Money out</p>
          <b className="text-[10px]">₦171,500</b>
        </div>
      </div>
      <p className="mb-1.5 mt-3 text-[8px] font-bold">Recent transactions</p>
      {["Cash contribution", "Wallet funded"].map((item, i) => (
        <div key={item} className="flex items-center gap-2 border-b border-border py-1.5">
          <span className="flex size-7 items-center justify-center rounded-xl bg-app-mint">
            {i === 1 ? <ArrowDownLeft className="size-3" /> : <ArrowUpRight className="size-3" />}
          </span>
          <div>
            <p className="text-[7px] font-bold">{item}</p>
            <p className="text-[5px] text-app-muted">Today</p>
          </div>
          <b className="ml-auto text-[7px]">{i === 1 ? "+₦50,000" : "-₦1,000"}</b>
        </div>
      ))}
      <BottomNav active="Wallet" />
    </div>
  );
}

function OfficerScreen() {
  return (
    <div className="bg-app-surface px-3 pb-4 pt-2 text-app-forest">
      <AppHeader officer />
      <div className="mt-1 rounded-2xl bg-app-ink px-3 py-2.5">
        <p className="text-[6px] font-extrabold uppercase tracking-[.18em] text-app-green">
          Officer portal
        </p>
        <p className="text-base font-extrabold leading-tight text-app-cream">Grace Adeyemi</p>
        <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-app-mint px-2 py-1 text-[6px] font-extrabold text-app-ink">
          <MapPin className="size-2.5" /> Ikeja Zone
        </span>
      </div>
      <div className="mt-3">
        <WalletBalance officer />
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="rounded-xl bg-card p-2.5">
          <Users className="size-3.5 text-app-green" />
          <b className="mt-2 block text-base">126</b>
          <span className="text-[6px] text-app-muted">My customers</span>
        </div>
        <div className="rounded-xl bg-card p-2.5">
          <CreditCard className="size-3.5 text-primary" />
          <b className="mt-2 block text-base">184</b>
          <span className="text-[6px] text-app-muted">Active cards</span>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 text-center text-[6px] font-bold">
        <span className="rounded-full bg-app-forest py-2 text-app-cream">Register customer</span>
        <span className="rounded-full bg-primary py-2">Post contribution</span>
      </div>
    </div>
  );
}

function KycScreen() {
  return (
    <div className="bg-app-surface px-4 pb-6 pt-3 text-app-forest">
      <AppHeader />
      <ShieldCheck className="mx-auto mt-4 size-9 text-app-green" />
      <h3 className="mt-2 text-center text-base font-extrabold">Identity verification</h3>
      <p className="mx-auto mt-1 max-w-40 text-center text-[6px] text-app-muted">
        Link your BVN and NIN to raise your transaction limit.
      </p>
      {["11-digit BVN", "11-digit NIN", "Withdrawal password"].map((x) => (
        <div
          key={x}
          className="mt-3 rounded-xl border border-border bg-card px-3 py-3 text-[7px] text-app-muted"
        >
          {x}
        </div>
      ))}
      <div className="mt-3 flex items-center gap-2 rounded-xl bg-app-mint p-2 text-[6px]">
        <Fingerprint className="size-4 text-app-green" /> Confirm with your fingerprint
      </div>
      <div className="mt-3 rounded-full bg-app-forest py-2.5 text-center text-[7px] font-bold text-app-cream">
        Verify & activate
      </div>
    </div>
  );
}

function BillsScreen() {
  return (
    <div className="bg-app-surface px-4 pb-6 pt-3 text-app-forest">
      <AppHeader />
      <h3 className="mt-2 text-base font-extrabold">Bill Payment</h3>
      <div className="my-4 flex rounded-xl bg-card p-1 text-[7px] font-bold">
        <span className="flex-1 rounded-lg bg-app-forest py-2 text-center text-app-cream">
          Electricity
        </span>
        <span className="flex-1 py-2 text-center">Cable TV</span>
      </div>
      <p className="text-[6px] font-bold uppercase text-app-muted">Distribution company</p>
      <div className="mt-2 grid grid-cols-2 gap-2">
        {["Ikeja Electric", "Eko Electric", "Abuja Electric", "Ibadan Electric"].map((x, i) => (
          <span
            key={x}
            className={cn(
              "rounded-xl border p-2 text-[6px] font-bold",
              i === 0 ? "border-app-forest bg-app-forest text-app-cream" : "border-border bg-card",
            )}
          >
            {x}
          </span>
        ))}
      </div>
      <p className="mt-4 text-[6px] font-bold uppercase text-app-muted">Meter number</p>
      <div className="mt-2 flex gap-2">
        <span className="flex-1 rounded-xl bg-card p-2.5 text-[7px] text-app-muted">
          0123456789
        </span>
        <span className="rounded-xl bg-app-mint px-3 py-2.5 text-[7px] font-bold">Verify</span>
      </div>
      <div className="mt-3 flex items-center gap-2 rounded-xl bg-app-mint p-3">
        <Landmark className="size-4" />
        <div>
          <p className="text-[5px] uppercase text-app-muted">Confirm this is correct</p>
          <b className="text-[7px]">Amaka Okafor</b>
        </div>
      </div>
    </div>
  );
}

const screens: Record<ScreenKind, () => JSX.Element> = {
  dashboard: DashboardScreen,
  card: CardScreen,
  carddetail: CardDetailScreen,
  services: ServicesScreen,
  wallet: WalletScreen,
  officer: OfficerScreen,
  kyc: KycScreen,
  bills: BillsScreen,
};

export function AppScreen({
  kind,
  className,
  bare = false,
}: {
  kind: ScreenKind;
  className?: string;
  bare?: boolean;
}) {
  const Screen = screens[kind];
  return (
    <div
      className={cn(
        "overflow-hidden bg-app-surface",
        bare
          ? "h-full w-full rounded-[8px]"
          : "rounded-[26px] border-[5px] border-app-ink shadow-phone",
        className,
      )}
    >
      <Screen />
    </div>
  );
}
