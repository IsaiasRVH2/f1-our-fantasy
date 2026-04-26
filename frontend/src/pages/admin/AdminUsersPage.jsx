import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { deleteAdminUser, getAdminUsers, resetAdminUserPassword } from '../../services/api';
import AdminUsersTable from '../../components/admin/AdminUsersTable';

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const data = await getAdminUsers();
      setUsers(data);
    } catch (error) {
      toast.error('Error al cargar usuarios del sistema.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleResetPassword = async (user) => {
    const confirmed = window.confirm(
      `¿Reiniciar contraseña de "${user.username}" a la clave por defecto?`
    );
    if (!confirmed) return;

    const toastId = toast.loading('Reiniciando contraseña...');
    try {
      const response = await resetAdminUserPassword(user.id);
      toast.success(response.message || 'Contraseña reiniciada.', { id: toastId });
    } catch (error) {
      const msg = error.response?.data?.detail || 'No se pudo reiniciar la contraseña.';
      toast.error(msg, { id: toastId });
    }
  };

  const handleDeleteUser = async (user) => {
    const confirmed = window.confirm(
      `¿Eliminar al usuario "${user.username}"? Esta acción no se puede deshacer.`
    );
    if (!confirmed) return;

    const toastId = toast.loading('Eliminando usuario...');
    try {
      const response = await deleteAdminUser(user.id);
      setUsers((current) => current.filter((item) => item.id !== user.id));
      toast.success(response.message || 'Usuario eliminado.', { id: toastId });
    } catch (error) {
      const msg = error.response?.data?.detail || 'No se pudo eliminar el usuario.';
      toast.error(msg, { id: toastId });
    }
  };

  return (
    <div className="text-white">
      <section className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold border-l-4 border-cyan-500 pl-3">Gestión de Usuarios</h2>
          <span className="text-xs uppercase tracking-[0.2em] text-slate-400">
            Admin Controls
          </span>
        </div>

        {loading ? (
          <div className="text-cyan-500 animate-pulse font-mono">Cargando usuarios...</div>
        ) : (
          <AdminUsersTable
            users={users}
            onResetPassword={handleResetPassword}
            onDeleteUser={handleDeleteUser}
          />
        )}
      </section>
    </div>
  );
};

export default AdminUsersPage;
