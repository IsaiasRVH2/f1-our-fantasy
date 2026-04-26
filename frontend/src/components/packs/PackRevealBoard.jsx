import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const DRIVER_IMAGE_MODULES = import.meta.glob('../../assets/drivers/*.png', {
  eager: true,
  import: 'default',
});

const DRIVER_IMAGE_BY_ABBR = Object.fromEntries(
  Object.entries(DRIVER_IMAGE_MODULES).map(([path, url]) => {
    const fileName = path.split('/').pop() || '';
    const abbreviation = fileName.replace('.png', '').toUpperCase();
    return [abbreviation, url];
  })
);

const FlipRevealCard = ({ card, revealed, onReveal, animateFlip }) => {
  const [imageFailed, setImageFailed] = useState(false);
  const imageSrc =
    card.image_url || DRIVER_IMAGE_BY_ABBR[card.abbreviation] || `/assets/drivers/${card.abbreviation}.png`;

  useEffect(() => {
    setImageFailed(false);
  }, [card.id]);

  return (
    <button
      type="button"
      onClick={() => onReveal(card.id)}
      className="group block h-full w-full text-left"
      style={{ perspective: 1200 }}
    >
      <motion.div
        className="relative h-full w-auto mx-auto rounded-2xl aspect-[3/4]"
        animate={{ rotateY: revealed ? 180 : 0 }}
        transition={{ duration: animateFlip ? 0.6 : 0, ease: 'easeInOut' }}
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
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(34,211,238,0.14),transparent_30%),radial-gradient(circle_at_85%_85%,rgba(16,185,129,0.1),transparent_35%)]" />
          <div className="relative z-10 flex h-full flex-col p-4">
            <div className="flex items-start justify-between">
              <span className="rounded-md bg-cyan-500/20 px-2 py-1 text-xs font-black tracking-[0.2em] text-cyan-200">
                {card.abbreviation}
              </span>
              <span className="rounded-md bg-slate-900/85 px-2 py-1 text-[10px] sm:text-xs font-black uppercase tracking-[0.12em] text-white text-right max-w-[58%]">
                {card.team_name}
              </span>
            </div>

            <div className="mt-3 flex-1 flex items-center justify-center">
              {!imageFailed ? (
                <img
                  src={imageSrc}
                  alt={card.full_name}
                  className="max-h-full max-w-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
                  onError={() => setImageFailed(true)}
                />
              ) : (
                <div className="h-full w-full rounded-xl border border-slate-700/70 bg-slate-900/80 flex items-center justify-center">
                  <span className="text-4xl font-black tracking-[0.2em] text-cyan-300/70">
                    {card.abbreviation}
                  </span>
                </div>
              )}
            </div>

            <div className="mt-3">
              <p className="text-xl sm:text-2xl font-black leading-tight text-white">{card.full_name}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </button>
  );
};

const PackRevealBoard = ({ cards, revealedCardIds, onRevealCard, onContinue, className = '' }) => {
  const revealedCount = revealedCardIds.length;
  const totalCards = cards.length;
  const allRevealed = totalCards > 0 && revealedCount === totalCards;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastRevealedCardId, setLastRevealedCardId] = useState(null);

  const currentCard = cards[currentIndex];
  const currentCardIsRevealed = currentCard ? revealedCardIds.includes(currentCard.id) : false;

  const firstHiddenIndex = useMemo(
    () => cards.findIndex((card) => !revealedCardIds.includes(card.id)),
    [cards, revealedCardIds]
  );

  useEffect(() => {
    if (cards.length === 0) {
      setCurrentIndex(0);
      return;
    }
    setCurrentIndex(0);
  }, [cards]);

  useEffect(() => {
    if (cards.length === 0) return;
    if (currentIndex > cards.length - 1) {
      setCurrentIndex(cards.length - 1);
    }
  }, [cards.length, currentIndex]);

  const handleSingleCardClick = () => {
    if (!currentCard) return;
    if (!currentCardIsRevealed) {
      setLastRevealedCardId(currentCard.id);
      onRevealCard(currentCard.id);
      return;
    }
    if (allRevealed) return;
    const nextHiddenIndex = cards.findIndex(
      (card, index) => index > currentIndex && !revealedCardIds.includes(card.id)
    );
    if (nextHiddenIndex !== -1) {
      setCurrentIndex(nextHiddenIndex);
      return;
    }
    if (firstHiddenIndex !== -1) {
      setCurrentIndex(firstHiddenIndex);
    }
  };

  const handleBoardClick = (event) => {
    if (!allRevealed) return;
    const interactiveElement = event.target.closest('button, a, input, textarea, select');
    if (interactiveElement) return;
    onContinue?.();
  };

  return (
    <section
      onClick={handleBoardClick}
      className={`rounded-2xl border border-slate-800 bg-slate-900/55 p-4 sm:p-5 flex flex-col ${className} ${
        allRevealed ? 'cursor-pointer' : ''
      }`}
    >
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm uppercase tracking-[0.2em] text-slate-300">
          Revela tus cartas ({revealedCount}/{totalCards})
        </p>
        <p className="text-xs uppercase tracking-[0.18em] text-cyan-300">
          {allRevealed
            ? 'Pack completo - click en cualquier lugar para continuar'
            : currentCardIsRevealed
            ? 'Click para pasar a la siguiente'
            : 'Click para revelar esta carta'}
        </p>
      </div>

      <div className="mx-auto w-full flex-1 min-h-0 flex items-center justify-center">
        {currentCard ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCard.id}
              className="h-full"
              initial={{ opacity: 0, x: 24, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -24, scale: 0.98 }}
              transition={{ duration: 0.26, ease: 'easeInOut' }}
            >
              <FlipRevealCard
                card={currentCard}
                revealed={currentCardIsRevealed}
                onReveal={handleSingleCardClick}
                animateFlip={lastRevealedCardId === currentCard.id}
              />
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 text-slate-400 text-sm">
            No hay cartas disponibles para revelar.
          </div>
        )}
      </div>
    </section>
  );
};

export default PackRevealBoard;
