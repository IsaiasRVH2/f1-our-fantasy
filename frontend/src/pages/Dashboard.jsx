import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDrivers } from '../services/api';
import DriverList from '../components/drivers/DriversList';

const Dashboard = () => {
  const [drivers, setDrivers] = useState([]);
  const [username, setUsername] = useState('Piloto');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {

    // Extraemos el usuario del JWT
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.sub) {
        setUsername(payload.sub); 
      }
    } catch (error) {
      console.error("Error leyendo la telemetría del token:", error);
    }

    // Obtenemos datos desde el backend
    const fetchDrivers = async () => {
      try {
        const data = await getDrivers();
        setDrivers(data);
      } catch (error) {
        console.error("Error al cargar la parrilla:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDrivers();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      {/* Header */}
      <header className="mb-10 border-b border-slate-800 pb-6">
        <h1 className="text-4xl font-black italic uppercase text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">
          Bienvenido, {username}
        </h1>
        <p className="text-slate-400 mt-2">Paddock General - Temporada 2026</p>
      </header>

      {/* Contenido principal delegando el renderizado */}
      <section>
        <h2 className="text-2xl font-bold mb-6 border-l-4 border-emerald-500 pl-3">
          Parrilla de Pilotos
        </h2>
        
        <DriverList drivers={drivers} loading={loading} />
        
      </section>
    </div>
  );
};

export default Dashboard;