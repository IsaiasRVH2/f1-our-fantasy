const ClosedPackEnvelope = ({ onOpen, disabled = false }) => {
  return (
    <div className="relative max-w-sm">
      <button
        type="button"
        onClick={onOpen}
        disabled={disabled}
        className="group relative w-full overflow-hidden rounded-2xl border border-rose-500/40 bg-slate-900/95 p-5 text-left shadow-[0_20px_40px_-22px_rgba(244,63,94,0.55)] transition-all duration-300 hover:-translate-y-1 hover:border-rose-400/80 hover:shadow-[0_26px_55px_-25px_rgba(251,113,133,0.7)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(255,255,255,0.08),transparent_35%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.05),transparent_40%)]" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-rose-500/15 via-transparent to-cyan-500/15" />

        <div className="relative z-10">
          <p className="text-[10px] uppercase tracking-[0.35em] text-rose-300/80">The Box</p>
          <h3 className="mt-2 text-2xl font-black uppercase italic text-white">Sobre Sellado</h3>
          <p className="mt-1 text-sm text-slate-300">Tu próximo fichaje sorpresa está esperando.</p>

          <div className="relative mt-5 rounded-xl border border-slate-700/70 bg-slate-950/80 px-4 py-6">
            <div className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-rose-400/80 to-transparent" />
            <div className="absolute left-0 right-0 top-1/2 h-[1px] -translate-y-1/2 bg-slate-700/80" />
            <div className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-rose-400/80 bg-slate-950/95 shadow-[0_0_18px_rgba(251,113,133,0.45)]" />

            <div className="relative flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
              <span>F1 Fantasy</span>
              <span className="text-rose-300">Grid Locked</span>
            </div>

            <div className="relative mt-4 h-16 overflow-hidden rounded-lg border border-slate-700/70 bg-slate-900/85">
              <div className="absolute inset-0 bg-[linear-gradient(125deg,transparent_0%,transparent_30%,rgba(251,113,133,0.22)_50%,transparent_70%,transparent_100%)]" />
              <div className="absolute left-3 right-3 top-1/2 h-[2px] -translate-y-1/2 bg-gradient-to-r from-cyan-400/90 via-white to-rose-400/90" />
              <div className="absolute left-6 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.75)]" />
              <div className="absolute right-8 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-rose-300 shadow-[0_0_10px_rgba(251,113,133,0.75)]" />
            </div>
          </div>

          <p className="mt-4 text-xs uppercase tracking-[0.18em] text-slate-400 group-hover:text-slate-200">
            Click para abrir cuando inicie la extracción
          </p>
        </div>
      </button>
    </div>
  );
};

export default ClosedPackEnvelope;
