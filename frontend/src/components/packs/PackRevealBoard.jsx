import { motion } from 'framer-motion';

const FlipRevealCard = ({ card, revealed, onReveal }) => {
  return (
    <button
      type="button"
      onClick={() => onReveal(card.id)}
      disabled={revealed}
      className="group block w-full text-left disabled:cursor-default"
      style={{ perspective: 1200 }}
    >
      <motion.div
        className="relative h-56 w-full rounded-2xl"
        animate={{ rotateY: revealed ? 180 : 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div
          className="absolute inset-0 overflow-hidden rounded-2xl border border-rose-500/45 bg-slate-900 shadow-[0_14px_34px_-20px_rgba(244,63,94,0.65)]"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(255,255,255,0.08),transparent_35%),radial-gradient(circle_at_80%_85%,rgba(255,255,255,0.06),transparent_40%)]" />
          <div className="absolute inset-0 bg-gradient-to-br from-rose-500/20 via-transparent to-cyan-500/20" />
          <div className="relative z-10 flex h-full flex-col justify-between p-4">
            <p className="text-[11px] uppercase tracking-[0.3em] text-rose-200/80">The Box</p>
            <div>
              <p className="text-xl font-black uppercase italic text-white">F1 Fantasy</p>
              <p className="mt-2 text-xs uppercase tracking-[0.18em] text-slate-300">
                Click para revelar
              </p>
            </div>
            <div className="h-8 rounded-md border border-slate-700/70 bg-slate-950/75" />
          </div>
        </div>

        <div
          className="absolute inset-0 overflow-hidden rounded-2xl border border-cyan-500/45 bg-slate-950 shadow-[0_14px_34px_-20px_rgba(6,182,212,0.7)]"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(34,211,238,0.12),transparent_30%),radial-gradient(circle_at_85%_85%,rgba(16,185,129,0.1),transparent_35%)]" />
          <div className="relative z-10 flex h-full flex-col justify-between p-4">
            <p className="text-[10px] uppercase tracking-[0.3em] text-cyan-300/90">{card.team_name}</p>
            <div>
              <p className="text-2xl font-black leading-tight text-white">{card.full_name}</p>
              <p className="mt-2 inline-flex rounded-md bg-cyan-500/20 px-2 py-1 text-xs font-bold uppercase tracking-[0.16em] text-cyan-200">
                {card.abbreviation}
              </p>
            </div>
            <p className="text-xs uppercase tracking-[0.15em] text-slate-400">Revelado</p>
          </div>
        </div>
      </motion.div>
    </button>
  );
};

const PackRevealBoard = ({ cards, revealedCardIds, onRevealCard }) => {
  const revealedCount = revealedCardIds.length;
  const totalCards = cards.length;
  const allRevealed = totalCards > 0 && revealedCount === totalCards;

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/55 p-5">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm uppercase tracking-[0.2em] text-slate-300">
          Revela tus cartas ({revealedCount}/{totalCards})
        </p>
        <p className="text-xs uppercase tracking-[0.18em] text-cyan-300">
          {allRevealed ? 'Pack completo' : 'Click en cada carta'}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <FlipRevealCard
            key={card.id}
            card={card}
            revealed={revealedCardIds.includes(card.id)}
            onReveal={onRevealCard}
          />
        ))}
      </div>
    </section>
  );
};

export default PackRevealBoard;
