const AdminDriverRow = ({ driver, onEdit, onDelete }) => {
  return (
    <tr className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
      <td className="p-4 font-bold text-white">{driver.full_name}</td>
      <td className="p-4 text-slate-300">{driver.team_name}</td>
      <td className="p-4 font-mono text-emerald-400">[{driver.abbreviation}]</td>
      <td className="p-4 text-right space-x-2">
        {/* Botón de Editar */}
        <button 
          onClick={() => onEdit(driver)} 
          className="px-3 py-1 bg-cyan-600 hover:bg-cyan-500 rounded text-sm text-white transition-colors"
        >
          Editar
        </button>
        {/* Botón de Eliminar */}
        <button 
          onClick={() => onDelete(driver.id)} 
          className="px-3 py-1 bg-red-600 hover:bg-red-500 rounded text-sm text-white transition-colors"
        >
          Retirar
        </button>
      </td>
    </tr>
  );
};

export default AdminDriverRow;