import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { getDrivers, getGPs, uploadRaceResults } from '../../services/api';
import AdminResultsForm from '../../components/admin/AdminResultsForm';

const AdminResultsPage = () => {
  const [data, setData] = useState({ drivers: [], gps: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTelemetria = async () => {
      try {
        // Ejecuta ambas peticiones en paralelo
        const [driversRes, gpsRes] = await Promise.all([
          getDrivers(),
          getGPs()
        ]);
        setData({ drivers: driversRes, gps: gpsRes });
      } catch (error) {
        toast.error("Error al cargar la telemetría base de la FIA.");
      } finally {
        setLoading(false);
      }
    };

    fetchTelemetria();
  }, []);

  const handleSaveResults = async (gpId, resultsPayload) => {
    const toastId = toast.loading("Subiendo los resultados...");
    try {
      await uploadRaceResults(gpId, resultsPayload);
      toast.success("¡Resultados guardados exitosamente!", { id: toastId });
      return true;
    } catch (error) {
      const msg = error.response?.data?.detail || "Error al subir los resultados.";
      toast.error(msg, { id: toastId });
      return false;
    }
  };

  return (
    <div className="max-w-6xl mx-auto text-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold border-l-4 border-cyan-500 pl-3">
          Carga de Resultados
        </h2>
      </div>

      {loading ? (
        <div className="text-cyan-500 animate-pulse font-mono">Conectando con el servidor...</div>
      ) : data.gps.length === 0 || data.drivers.length === 0 ? (
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl text-slate-400">
          ⚠️ Necesitas registrar al menos un Gran Premio y pilotos en el sistema para poder cargar resultados.
        </div>
      ) : (
        <AdminResultsForm 
          gps={data.gps} 
          drivers={data.drivers} 
          onSave={handleSaveResults} 
        />
      )}
    </div>
  );
};

export default AdminResultsPage;