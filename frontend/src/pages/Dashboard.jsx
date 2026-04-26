import { useState, useEffect } from 'react';
import { getFreeAgents, getGPs, getMyAssignedDrivers } from '../services/api';
import DriverList from '../components/drivers/DriversList';
import Header from '../components/layout/Header';
import ClosedPackEnvelope from '../components/packs/ClosedPackEnvelope';
import PackRevealBoard from '../components/packs/PackRevealBoard';

const Dashboard = () => {
  const [drivers, setDrivers] = useState([]);
  const [nextGp, setNextGp] = useState(null);
  const [nextSession, setNextSession] = useState(null);
  const [countdown, setCountdown] = useState('00:00:00:00');
  const [username, setUsername] = useState('Piloto');
  const [loading, setLoading] = useState(true);
  const [packCards, setPackCards] = useState([]);
  const [revealedCardIds, setRevealedCardIds] = useState([]);
  const [isLoadingPackCards, setIsLoadingPackCards] = useState(false);
  const [isRevealMode, setIsRevealMode] = useState(false);

  const sessionFields = [
    { key: 'fp1_date', label: 'FP1' },
    { key: 'fp2_date', label: 'FP2' },
    { key: 'fp3_date', label: 'FP3' },
    { key: 'squaly_date', label: 'Sprint Qualy' },
    { key: 'sprint_date', label: 'Sprint' },
    { key: 'qualy_date', label: 'Qualy' },
    { key: 'race_date', label: 'Carrera' }
  ];

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    // Extraemos el usuario del JWT
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.sub) {
        setUsername(payload.sub); 
      }
    } catch (error) {
      console.error("Error leyendo la telemetría del token:", error);
    }

    const findNextSession = (gp) => {
      const now = new Date();
      const upcoming = sessionFields
        .filter((field) => gp[field.key])
        .map((field) => ({
          label: field.label,
          date: new Date(gp[field.key])
        }))
        .filter((session) => session.date > now)
        .sort((a, b) => a.date - b.date);

      return upcoming[0] || null;
    };

    const fetchDashboardData = async () => {
      try {
        const gps = await getGPs();
        const now = new Date();
        const upcomingGps = [...gps]
          .map((gp) => ({ ...gp, raceDateObj: new Date(gp.race_date) }))
          .filter((gp) => gp.raceDateObj > now)
          .sort((a, b) => a.raceDateObj - b.raceDateObj);

        const selectedGp = upcomingGps[0] || null;
        setNextGp(selectedGp);

        if (selectedGp) {
          const nextSessionData = findNextSession(selectedGp);
          setNextSession(nextSessionData);

          const assignedDrivers = await getMyAssignedDrivers(selectedGp.id);
          setDrivers(assignedDrivers);
        } else {
          setDrivers([]);
        }
      } catch (error) {
        console.error("Error al cargar el dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  useEffect(() => {
    if (!nextSession?.date) {
      setCountdown('00:00:00:00');
      return;
    }

    const formatTimeLeft = (targetDate) => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();
      if (diff <= 0) return '00:00:00:00';

      const totalSeconds = Math.floor(diff / 1000);
      const days = Math.floor(totalSeconds / 86400);
      const hours = Math.floor((totalSeconds % 86400) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      return [days, hours, minutes, seconds].map((value) => String(value).padStart(2, '0')).join(':');
    };

    setCountdown(formatTimeLeft(nextSession.date));
    const intervalId = setInterval(() => {
      setCountdown(formatTimeLeft(nextSession.date));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [nextSession]);

  const formatSessionDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleString('es-MX', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const sessionRows = nextGp
    ? sessionFields
        .filter((field) => nextGp[field.key])
        .map((field) => ({ label: field.label, value: nextGp[field.key] }))
    : [];

  const revealCard = (cardId) => {
    setRevealedCardIds((current) => (current.includes(cardId) ? current : [...current, cardId]));
  };

  const openPack = async () => {
    if (!nextGp) {
      window.alert('No hay GP activo para abrir el sobre.');
      return;
    }

    setIsLoadingPackCards(true);
    try {
      const freeAgents = await getFreeAgents(nextGp.id);
      const selectedCards = freeAgents.slice(0, 5).map((driver) => ({
        id: driver.id,
        full_name: driver.full_name,
        team_name: driver.team_name,
        abbreviation: driver.abbreviation || 'F1',
      }));

      if (selectedCards.length === 0) {
        window.alert('No hay pilotos disponibles para revelar en este GP.');
        return;
      }

      setPackCards(selectedCards);
      setRevealedCardIds([]);
      setIsRevealMode(true);
    } catch (error) {
      console.error('Error al abrir el sobre:', error);
      window.alert('No se pudo abrir el sobre. Intenta nuevamente.');
    } finally {
      setIsLoadingPackCards(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <Header username={username} />

      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-4 border-l-4 border-cyan-500 pl-3">
          Próximo Grand Prix
        </h2>

        {loading ? (
          <div className="text-cyan-400 animate-pulse font-mono">Cargando calendario...</div>
        ) : !nextGp ? (
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 text-slate-300">
            No hay un Grand Prix próximo configurado.
          </div>
        ) : (
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
            <h3 className="text-xl font-bold">{nextGp.name}</h3>
            <p className="text-slate-400 mt-1">Temporada {nextGp.season_year} - Mitad {nextGp.season_half}</p>

            <div className="mt-4 p-4 rounded-lg bg-slate-950 border border-cyan-900/60">
              <p className="text-sm text-slate-400">
                Próxima sesión: <span className="text-cyan-400 font-bold">{nextSession?.label || 'No disponible'}</span>
              </p>
              <p className="text-3xl font-black tracking-wider text-white mt-1 font-mono">{countdown}</p>
              <p className="text-xs text-slate-500 mt-1">Formato: DD:HH:MM:SS</p>
            </div>

            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3">
              {sessionRows.map((session) => (
                <div key={session.label} className="bg-slate-950 border border-slate-800 rounded-lg p-3">
                  <p className="text-xs uppercase tracking-wide text-slate-500">{session.label}</p>
                  <p className="text-sm text-slate-200 mt-1">{formatSessionDate(session.value)}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-6 border-l-4 border-emerald-500 pl-3">
          Pilotos asignados para este GP
        </h2>

        <DriverList
          drivers={drivers}
          loading={loading}
          emptyMessage="Aún no tienes pilotos asignados para este Grand Prix."
        />

        <div className="mt-6">
          {drivers.length > 0 ? (
            <button
              type="button"
              onClick={() => window.alert('Próximamente: uso de comodines')}
              className="bg-cyan-600 hover:bg-cyan-500 transition-colors text-white font-bold px-5 py-2 rounded-lg"
            >
              Usar comodín
            </button>
          ) : (
            <div>
              {!isRevealMode ? (
                <>
                  <p className="mb-3 text-sm uppercase tracking-[0.2em] text-slate-400">
                    The Box - Sobre cerrado
                  </p>
                  <ClosedPackEnvelope onOpen={openPack} disabled={isLoadingPackCards} />
                </>
              ) : (
                <PackRevealBoard
                  cards={packCards}
                  revealedCardIds={revealedCardIds}
                  onRevealCard={revealCard}
                />
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;