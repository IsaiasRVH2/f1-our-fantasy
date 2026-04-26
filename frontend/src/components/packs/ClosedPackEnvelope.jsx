import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const PARTICLE_COLORS = ['#22d3ee', '#fb7185', '#f8fafc', '#a78bfa'];

const ClosedPackEnvelope = ({ onOpen, disabled = false }) => {
  const [isExploding, setIsExploding] = useState(false);
  const particles = useMemo(
    () =>
      Array.from({ length: 18 }, (_, index) => {
        const angle = (Math.PI * 2 * index) / 18;
        const distance = 70 + (index % 4) * 18;
        return {
          id: index,
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
          scale: 0.5 + (index % 3) * 0.35,
          color: PARTICLE_COLORS[index % PARTICLE_COLORS.length],
          delay: (index % 6) * 0.02,
        };
      }),
    []
  );

  const handleOpen = () => {
    if (disabled || isExploding) return;
    setIsExploding(true);
    window.setTimeout(async () => {
      const openSucceeded = await onOpen?.();
      if (!openSucceeded) {
        setIsExploding(false);
      }
    }, 520);
  };

  const isDisabled = disabled || isExploding;

  return (
    <div className="relative max-w-sm">
      <AnimatePresence mode="wait">
        {!isExploding ? (
          <motion.button
            key="closed-envelope"
            type="button"
            onClick={handleOpen}
            disabled={isDisabled}
            whileHover={
              isDisabled
                ? {}
                : {
                    x: [0, -2, 2, -3, 3, -2, 2, 0],
                    y: [0, 1, -1, 1, -1, 0],
                    rotate: [0, -0.8, 0.8, -1, 1, 0],
                    transition: { duration: 0.45, repeat: Infinity, ease: 'easeInOut' },
                  }
            }
            whileTap={isDisabled ? {} : { scale: 0.97 }}
            className="group relative w-full overflow-hidden rounded-2xl border border-rose-500/40 bg-slate-900/95 p-5 text-left shadow-[0_20px_40px_-22px_rgba(244,63,94,0.55)] transition-all duration-300 hover:-translate-y-1 hover:border-rose-400/80 hover:shadow-[0_26px_55px_-25px_rgba(251,113,133,0.7)] disabled:cursor-not-allowed disabled:opacity-60"
            exit={{
              scale: [1, 1.12, 0.3],
              opacity: [1, 1, 0],
              filter: ['brightness(1)', 'brightness(2.4)', 'brightness(0.6)'],
            }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(255,255,255,0.08),transparent_35%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.05),transparent_40%)]" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-rose-500/15 via-transparent to-cyan-500/15" />
            <motion.div
              className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/45 to-transparent"
              initial={{ x: '-120%', opacity: 0 }}
              whileHover={{ x: '120%', opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            />

            <div className="relative z-10">
              <p className="text-[10px] uppercase tracking-[0.35em] text-rose-300/80">The Box</p>
              <h3 className="mt-2 text-2xl font-black uppercase italic text-white">Sobre Sellado</h3>
              <p className="mt-1 text-sm text-slate-300">Tu proximo fichaje sorpresa esta esperando.</p>

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
                Hover para vibrar, click para abrir
              </p>
            </div>
          </motion.button>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {isExploding ? (
          <motion.div
            key="particles"
            className="pointer-events-none absolute inset-0"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {particles.map((particle) => (
              <motion.span
                key={particle.id}
                className="absolute left-1/2 top-1/2 rounded-full"
                style={{
                  width: 5,
                  height: 5,
                  backgroundColor: particle.color,
                }}
                initial={{ x: 0, y: 0, opacity: 1, scale: 0.9 }}
                animate={{
                  x: particle.x,
                  y: particle.y,
                  opacity: 0,
                  scale: particle.scale,
                }}
                transition={{ duration: 0.52, ease: 'easeOut', delay: particle.delay }}
              />
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default ClosedPackEnvelope;
