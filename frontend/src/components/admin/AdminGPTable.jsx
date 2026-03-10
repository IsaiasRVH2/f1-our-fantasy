import AdminGPRow from './AdminGPRow';

const AdminGPTable = ({ gps, onEdit, onDelete, onToggleActive }) => {
  if (!gps || gps.length === 0) {
    return <div className="text-slate-500 p-4 italic">El calendario está vacío. No hay carreras programadas.</div>;
  }

  return (
    <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-900/50">
      <table className="w-full text-left border-collapse">
        <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 uppercase text-xs tracking-wider">
          <tr>
            <th className="p-4 font-semibold">Gran Premio</th>
            <th className="p-4 font-semibold">Fecha Carrera</th>
            <th className="p-4 font-semibold">Formato</th>
            <th className="p-4 font-semibold text-center">Estado</th>
            <th className="p-4 font-semibold text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {gps.map((gp) => (
            <AdminGPRow 
              key={gp.id} 
              gp={gp} 
              onEdit={onEdit} 
              onDelete={onDelete}
              onToggleActive={onToggleActive}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminGPTable;