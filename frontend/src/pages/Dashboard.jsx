import { useState, useEffect } from 'react';
import { getFreeAgents } from '../services/api';
import DriverList from '../components/drivers/DriversList';
import Header from '../components/layout/Header';

const Dashboard = () => {
  const [drivers, setDrivers] = useState([]);
  const [username, setUsername] = useState('Piloto');
  const [loading, setLoading] = useState(true);

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

    // Obtenemos datos desde el backend
    const fetchDrivers = async () => {
      try {
        const data = await getFreeAgents();
        setDrivers(data);
      } catch (error) {
        console.error("Error al cargar los agentes libres:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDrivers();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      {/* Header */}
      <Header username={username} />

      {/* Contenido principal */}
      <section>
        <h2 className="text-2xl font-bold mb-6 border-l-4 border-emerald-500 pl-3">
          Mercado de Agentes Libres
        </h2>
        
        <DriverList drivers={drivers} loading={loading} />
        
      </section>
    </div>
  );
};

export default Dashboard;