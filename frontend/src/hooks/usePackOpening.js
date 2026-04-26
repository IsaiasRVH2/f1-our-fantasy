import { useCallback, useState } from 'react';
import { getFreeAgents } from '../services/api';

const PACK_STATES = {
  CLOSED: 'closed',
  OPENING: 'opening',
  REVEALED: 'revealed',
};

export const usePackOpening = ({ gpId, packSize = 5 } = {}) => {
  const [packState, setPackState] = useState(PACK_STATES.CLOSED);
  const [packCards, setPackCards] = useState([]);
  const [revealedCardIds, setRevealedCardIds] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const openPack = useCallback(async () => {
    if (!gpId) {
      setErrorMessage('No hay GP activo para abrir el sobre.');
      return false;
    }

    setErrorMessage('');
    setPackState(PACK_STATES.OPENING);

    try {
      const freeAgents = await getFreeAgents(gpId);
      const selectedCards = freeAgents.slice(0, packSize).map((driver) => ({
        id: driver.id,
        full_name: driver.full_name,
        team_name: driver.team_name,
        abbreviation: driver.abbreviation || 'F1',
      }));

      if (selectedCards.length === 0) {
        setPackState(PACK_STATES.CLOSED);
        setErrorMessage('No hay pilotos disponibles para revelar en este GP.');
        return false;
      }

      setPackCards(selectedCards);
      setRevealedCardIds([]);
      setPackState(PACK_STATES.REVEALED);
      return true;
    } catch (error) {
      console.error('Error al abrir el sobre:', error);
      setPackState(PACK_STATES.CLOSED);
      setErrorMessage('No se pudo abrir el sobre. Intenta nuevamente.');
      return false;
    }
  }, [gpId, packSize]);

  const revealCard = useCallback((cardId) => {
    setRevealedCardIds((current) => (current.includes(cardId) ? current : [...current, cardId]));
  }, []);

  const resetPack = useCallback(() => {
    setPackState(PACK_STATES.CLOSED);
    setPackCards([]);
    setRevealedCardIds([]);
    setErrorMessage('');
  }, []);

  return {
    packState,
    packCards,
    revealedCardIds,
    errorMessage,
    isClosed: packState === PACK_STATES.CLOSED,
    isOpening: packState === PACK_STATES.OPENING,
    isRevealed: packState === PACK_STATES.REVEALED,
    openPack,
    revealCard,
    resetPack,
  };
};

export { PACK_STATES };
