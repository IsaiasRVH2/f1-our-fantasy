const AdminGPRow = ({ gp, onEdit, onDelete, onToggleActive }) => {
  // Función para formatear la fecha
  const formatRaceDate = (dateString) => {
    if (!dateString) return 'Sin fecha';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  return (
    <tr className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
      <td className="p-4">
        <div className="font-bold text-white text-lg">{gp.name}</div>
      </td>
      <td className="p-4 text-slate-300 font-mono">
        {formatRaceDate(gp.race_date)}
      </td>
      <td className="p-4">
        {gp.has_sprint ? (
          <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs font-bold rounded uppercase tracking-wider">
            Sprint
          </span>
        ) : (
          <span className="text-slate-500 text-xs uppercase">Normal</span>
        )}
      </td>
      <td className="p-4 text-center">
        <button 
          onClick={() => onToggleActive(gp)}
          className={`px-3 py-1 text-xs font-bold rounded uppercase transition-colors ${
            gp.is_active 
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 hover:bg-emerald-500/40' 
              : 'bg-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          {gp.is_active ? 'Activo' : 'Inactivo'}
        </button>
      </td>
      <td className="p-4 text-right space-x-2">
        <button 
          onClick={() => onEdit(gp)} 
          className="px-3 py-1 bg-cyan-600 hover:bg-cyan-500 rounded text-sm text-white transition-colors"
        >
          Editar
        </button>
        <button 
          onClick={() => onDelete(gp.id)} 
          className="px-3 py-1 bg-red-600 hover:bg-red-500 rounded text-sm text-white transition-colors"
        >
          Borrar
        </button>
      </td>
    </tr>
  );
};

export default AdminGPRow;