import DriverCard from './DriverCard';

const DriverList = ({ drivers, loading }) => {
  if (loading) {
    return <div className="text-emerald-500 animate-pulse font-mono">Cargando telemetría de la parrilla...</div>;
  }

  if (!drivers || drivers.length === 0) {
    return <div className="text-slate-500 italic">No hay pilotos registrados en la base de datos.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {drivers.map((driver) => (
        <DriverCard key={driver.id} driver={driver} />
      ))}
    </div>
  );
};

export default DriverList;