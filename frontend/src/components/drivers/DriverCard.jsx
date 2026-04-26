const TEAM_STYLES = {
  ferrari: {
    border: "border-red-600/80",
    glow: "shadow-red-500/20",
    ring: "from-red-500/35 to-red-900/10",
    badge: "bg-red-500/20 text-red-300",
  },
  mercedes: {
    border: "border-teal-400/80",
    glow: "shadow-teal-400/20",
    ring: "from-teal-300/35 to-teal-900/10",
    badge: "bg-teal-400/20 text-teal-200",
  },
  redbull: {
    border: "border-blue-600/80",
    glow: "shadow-blue-500/20",
    ring: "from-blue-500/35 to-indigo-900/10",
    badge: "bg-blue-500/20 text-blue-200",
  },
  mclaren: {
    border: "border-orange-500/80",
    glow: "shadow-orange-500/20",
    ring: "from-orange-400/35 to-orange-900/10",
    badge: "bg-orange-500/20 text-orange-200",
  },
  aston: {
    border: "border-emerald-500/80",
    glow: "shadow-emerald-500/20",
    ring: "from-emerald-400/35 to-emerald-900/10",
    badge: "bg-emerald-500/20 text-emerald-200",
  },
  alpine: {
    border: "border-sky-500/80",
    glow: "shadow-sky-500/20",
    ring: "from-sky-400/35 to-sky-900/10",
    badge: "bg-sky-500/20 text-sky-200",
  },
  williams: {
    border: "border-blue-400/80",
    glow: "shadow-blue-400/20",
    ring: "from-blue-300/35 to-blue-900/10",
    badge: "bg-blue-400/20 text-blue-200",
  },
  haas: {
    border: "border-zinc-300/70",
    glow: "shadow-zinc-300/20",
    ring: "from-zinc-300/25 to-zinc-800/10",
    badge: "bg-zinc-300/20 text-zinc-100",
  },
  sauber: {
    border: "border-lime-500/80",
    glow: "shadow-lime-500/20",
    ring: "from-lime-400/35 to-lime-900/10",
    badge: "bg-lime-500/20 text-lime-200",
  },
  rb: {
    border: "border-indigo-500/80",
    glow: "shadow-indigo-500/20",
    ring: "from-indigo-400/35 to-indigo-900/10",
    badge: "bg-indigo-500/20 text-indigo-200",
  },
  default: {
    border: "border-slate-700",
    glow: "shadow-cyan-500/10",
    ring: "from-cyan-300/25 to-slate-900/10",
    badge: "bg-slate-700/60 text-slate-200",
  },
};

const getTeamStyle = (teamName = "") => {
  const normalized = teamName.toLowerCase();
  if (normalized.includes("ferrari")) return TEAM_STYLES.ferrari;
  if (normalized.includes("mercedes")) return TEAM_STYLES.mercedes;
  if (normalized.includes("red bull")) return TEAM_STYLES.redbull;
  if (normalized.includes("mclaren")) return TEAM_STYLES.mclaren;
  if (normalized.includes("aston")) return TEAM_STYLES.aston;
  if (normalized.includes("alpine")) return TEAM_STYLES.alpine;
  if (normalized.includes("williams")) return TEAM_STYLES.williams;
  if (normalized.includes("haas")) return TEAM_STYLES.haas;
  if (normalized.includes("sauber") || normalized.includes("kick")) return TEAM_STYLES.sauber;
  if (normalized === "rb" || normalized.includes("racing bulls")) return TEAM_STYLES.rb;
  return TEAM_STYLES.default;
};

const DriverCard = ({ driver }) => {
  const teamStyle = getTeamStyle(driver.team_name);

  return (
    <article
      className={`relative overflow-hidden rounded-2xl border p-4 bg-slate-950/90 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] shadow-lg ${teamStyle.border} ${teamStyle.glow}`}
    >
      <div className="pointer-events-none absolute inset-0 opacity-70 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_30%),radial-gradient(circle_at_80%_15%,rgba(255,255,255,0.05),transparent_25%),radial-gradient(circle_at_50%_90%,rgba(255,255,255,0.04),transparent_35%)]" />
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${teamStyle.ring}`} />

      <div className="relative z-10">
        <div className="flex items-start justify-between gap-3">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            {driver.team_name}
          </p>
          <span className={`px-2 py-1 rounded-md text-[11px] font-bold tracking-wider ${teamStyle.badge}`}>
            {driver.abbreviation}
          </span>
        </div>

        <h3 className="text-lg font-black text-white mt-3 leading-tight">
          {driver.full_name}
        </h3>

        <p className="text-[11px] text-slate-500 uppercase tracking-[0.2em] mt-4">
          Driver Card
        </p>
      </div>
    </article>
  );
};

export default DriverCard;