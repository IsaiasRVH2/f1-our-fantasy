import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { getGPs, deleteGP, updateGP, createGP } from '../../services/api';
import AdminGPTable from '../../components/admin/AdminGPTable';
import AdminGPForm from '../../components/admin/AdminGPForm';

const AdminGPPage = () => {
  const [gps, setGPs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGP, setEditingGP] = useState(null);

  const fetchGPs = async () => {
    try {
      const data = await getGPs();
      setGPs(data);
    } catch (error) {
      toast.error("Error al cargar el calendario de carreras.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGPs();
  }, []);

  const handleDelete = async (gpId) => {
    if (!window.confirm("¿Estás seguro de cancelar este Gran Premio?")) return;
    try {
      await deleteGP(gpId);
      toast.success("Gran Premio cancelado exitosamente.");
      setGPs(gps.filter(g => g.id !== gpId));
    } catch (error) {
      toast.error("Error al eliminar el evento.");
    }
  };

  const handleToggleActive = async (gp) => {
    const newStatus = !gp.is_active;
    try {
      const updated = await updateGP(gp.id, { is_active: newStatus });
      
      setGPs(gps.map(g => {
        if (g.id === updated.id) return updated;
        
        if (newStatus === true) return { ...g, is_active: false };
        
        return g;
      }));
      
      toast.success(newStatus ? `🏁 ${gp.name} ahora está ACTIVO` : `🛑 ${gp.name} desactivado`);
    } catch (error) {
      toast.error("Error al cambiar el estado del evento.");
    }
  };

  const handleOpenCreate = () => {
    setEditingGP(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (gp) => {
    setEditingGP(gp);
    setIsModalOpen(true);
  };

  const handleSaveGP = async (gpData) => {
    const toastId = toast.loading("Registrando fechas en la FIA...");
    try {
      if (editingGP) {
        const updated = await updateGP(editingGP.id, gpData);
        setGPs(gps.map(g => g.id === updated.id ? updated : g));
        toast.success("Gran Premio actualizado.", { id: toastId });
      } else {
        const created = await createGP(gpData);
        setGPs([...gps, created]);
        toast.success("Gran Premio añadido al calendario.", { id: toastId });
      }
      setIsModalOpen(false);
    } catch (error) {
      const msg = error.response?.data?.detail?.[0]?.msg || error.response?.data?.detail || "Error de validación.";
      toast.error(msg, { id: toastId });
    }
  };

  return (
    <div className="text-white">
      <section className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold border-l-4 border-cyan-500 pl-3">
            Gestión de Calendario (Admin)
          </h2>
          <button 
            onClick={() => toast("🚧 Próximamente: Formulario para crear GP")}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded font-bold text-sm transition-colors"
          >
            + Programar GP
          </button>
        </div>

        {loading ? (
          <div className="text-cyan-500 animate-pulse font-mono">Cargando fechas de la FIA...</div>
        ) : (
          <AdminGPTable 
            gps={gps} 
            onEdit={handleOpenEdit} 
            onDelete={handleDelete}
            onToggleActive={handleToggleActive}
          />
        )}
      </section>
      
      {isModalOpen && (
        <AdminGPForm 
          initialData={editingGP}
          onSave={handleSaveGP}
          onCancel={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminGPPage;