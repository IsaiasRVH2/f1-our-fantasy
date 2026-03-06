import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { getDrivers, deleteDriver, createDriver, updateDriver } from '../../services/api';
import Header from '../../components/layout/Header';
import AdminDriverTable from '../../components/admin/AdminDriverTable';
import AdminDriverForm from '../../components/admin/AdminDriverForm';

const AdminDriversPage = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Estados para controlar el Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDriver, setEditingDriver] = useState(null);

  const fetchDrivers = async () => {
    try {
      const data = await getDrivers();
      setDrivers(data);
    } catch (error) {
      toast.error("Error al cargar los pilotos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  const handleDelete = async (driverId) => {
    if (!window.confirm("¿Estás seguro de que quieres retirar a este piloto del campeonato?")) return;
    try {
      await deleteDriver(driverId);
      toast.success("Piloto retirado exitosamente.");
      setDrivers(drivers.filter(d => d.id !== driverId));
    } catch (error) {
      const msg = error.response?.data?.detail || "Error al retirar al piloto.";
      toast.error(msg);
    }
  };

  const handleOpenCreate = () => {
    setEditingDriver(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (driver) => {
    setEditingDriver(driver);
    setIsModalOpen(true);
  };

  const handleSaveDriver = async (driverData) => {
    const toastId = toast.loading("Guardando datos del piloto...");
    try {
      if (editingDriver) {
        // Modo Edición
        const updated = await updateDriver(editingDriver.id, driverData);
        setDrivers(drivers.map(d => d.id === updated.id ? updated : d));
        toast.success("Piloto actualizado.", { id: toastId });
      } else {
        // Modo Creación
        const created = await createDriver(driverData);
        setDrivers([...drivers, created]);
        toast.success("Piloto agregado.", { id: toastId });
      }
      setIsModalOpen(false);
    } catch (error) {
      const msg = error.response?.data?.detail?.[0]?.msg || error.response?.data?.detail || "Error en el servidor.";
      toast.error(msg, { id: toastId });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <Header username="Administrador" />

      <section className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold border-l-4 border-cyan-500 pl-3">
            Gestión de Pilotos
          </h2>
          <button 
            onClick={handleOpenCreate}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded font-bold text-sm transition-colors"
          >
            + Contratar Piloto
          </button>
        </div>

        {loading ? (
          <div className="text-cyan-500 animate-pulse font-mono">Cargando registros...</div>
        ) : (
          <AdminDriverTable 
            drivers={drivers} 
            onEdit={handleOpenEdit}
            onDelete={handleDelete} 
          />
        )}
      </section>

      {isModalOpen && (
        <AdminDriverForm 
          initialData={editingDriver}
          onSave={handleSaveDriver}
          onCancel={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminDriversPage;