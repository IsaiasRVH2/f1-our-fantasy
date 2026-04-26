const AdminUsersTable = ({ users, onResetPassword, onDeleteUser }) => {
  if (!users || users.length === 0) {
    return <div className="text-slate-500 p-4 italic">No hay usuarios registrados.</div>;
  }

  return (
    <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-900/50">
      <table className="w-full text-left border-collapse">
        <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 uppercase text-xs tracking-wider">
          <tr>
            <th className="p-4 font-semibold">Usuario</th>
            <th className="p-4 font-semibold">Email</th>
            <th className="p-4 font-semibold">Rol</th>
            <th className="p-4 font-semibold">Estado</th>
            <th className="p-4 font-semibold">Alta</th>
            <th className="p-4 font-semibold text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
              <td className="p-4 font-bold text-white">{user.username}</td>
              <td className="p-4 text-slate-300">{user.email}</td>
              <td className="p-4">
                <span
                  className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                    user.role === 'admin'
                      ? 'bg-cyan-500/20 text-cyan-300'
                      : 'bg-emerald-500/20 text-emerald-300'
                  }`}
                >
                  {user.role}
                </span>
              </td>
              <td className="p-4">
                <span
                  className={`px-2 py-1 rounded text-xs font-bold ${
                    user.is_active ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'
                  }`}
                >
                  {user.is_active ? 'Activo' : 'Inactivo'}
                </span>
              </td>
              <td className="p-4 text-slate-400 text-sm">
                {new Date(user.created_at).toLocaleDateString('es-MX')}
              </td>
              <td className="p-4 text-right space-x-2">
                <button
                  onClick={() => onResetPassword(user)}
                  className="px-3 py-1 bg-cyan-600 hover:bg-cyan-500 rounded text-sm text-white transition-colors"
                >
                  Reiniciar clave
                </button>
                <button
                  onClick={() => onDeleteUser(user)}
                  className="px-3 py-1 bg-red-600 hover:bg-red-500 rounded text-sm text-white transition-colors"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsersTable;
