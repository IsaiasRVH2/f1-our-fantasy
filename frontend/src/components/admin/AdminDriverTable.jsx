import AdminDriverRow from './AdminDriverRow';

const AdminDriverTable = ({ drivers, onEdit, onDelete }) => {
  if (!drivers || drivers.length === 0) {
    return <div className="text-slate-500 p-4 italic">El paddock está vacío.</div>;
  }

  return (
    <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-900/50">
      <table className="w-full text-left border-collapse">
        <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 uppercase text-xs tracking-wider">
          <tr>
            <th className="p-4 font-semibold">Piloto</th>
            <th className="p-4 font-semibold">Escudería</th>
            <th className="p-4 font-semibold">Siglas</th>
            <th className="p-4 font-semibold text-right">Acciones en Pits</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map((driver) => (
            <AdminDriverRow 
              key={driver.id} 
              driver={driver} 
              onEdit={onEdit} 
              onDelete={onDelete} 
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDriverTable;