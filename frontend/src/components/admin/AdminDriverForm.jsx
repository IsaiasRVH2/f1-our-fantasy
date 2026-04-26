import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import Input from '../base/Input';

const AdminDriverForm = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    full_name: '',
    team_name: '',
    abbreviation: '',
    image_url: ''
  });

  // Si se pasa initialData rellenamos el formulario
  useEffect(() => {
    if (initialData) {
      setFormData({
        full_name: initialData.full_name || '',
        team_name: initialData.team_name || '',
        abbreviation: initialData.abbreviation || '',
        image_url: initialData.image_url || ''
      });
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación básica antes de enviarlo al orquestador
    if (!formData.full_name || !formData.team_name || !formData.abbreviation) {
      return toast.error("Llena los datos obligatorios (Nombre, Escudería y Siglas).");
    }

    if (formData.abbreviation.length !== 3) {
      return toast.error("Las siglas deben tener exactamente 3 letras.");
    }

    // Convertimos las siglas a mayúsculas automáticamente
    const cleanData = {
      ...formData,
      abbreviation: formData.abbreviation.toUpperCase()
    };

    onSave(cleanData);
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 w-full max-w-md shadow-2xl">
        <h3 className="text-xl font-bold text-white mb-6 border-l-4 border-cyan-500 pl-3">
          {initialData ? 'Actualizar Telemetría del Piloto' : 'Contratar Nuevo Piloto'}
        </h3>
        
        {/* 2. Reemplazamos los divs con labels e inputs por el componente <Input /> */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <Input 
            label="Nombre Completo *"
            type="text" 
            value={formData.full_name}
            onChange={(e) => setFormData({...formData, full_name: e.target.value})}
            placeholder="Ej. Max Verstappen"
          />

          <Input 
            label="Escudería *"
            type="text" 
            value={formData.team_name}
            onChange={(e) => setFormData({...formData, team_name: e.target.value})}
            placeholder="Ej. Red Bull Racing"
          />

          <div className="grid grid-cols-2 gap-4">
            <Input 
              label="Siglas (3 letras) *"
              type="text" 
              maxLength="3"
              className="w-full p-3 rounded bg-slate-700 border-2 transition-all outline-none text-white uppercase font-mono border-transparent focus:border-red-600" // Sobrescribimos el className del base para forzar uppercase si lo deseamos, o lo dejamos normal
              value={formData.abbreviation}
              onChange={(e) => setFormData({...formData, abbreviation: e.target.value})}
              placeholder="VER"
            />
            
            <Input 
              label="URL Foto (Opcional)"
              type="text" 
              value={formData.image_url}
              onChange={(e) => setFormData({...formData, image_url: e.target.value})}
              placeholder="https://..."
            />
          </div>

          <div className="flex justify-end space-x-3 pt-6 border-t border-slate-800 mt-6">
            <button 
              type="button" 
              onClick={onCancel}
              className="px-4 py-2 text-slate-400 hover:text-white transition-colors uppercase text-sm font-bold tracking-wider"
            >
              Cancelar
            </button>
            <button 
              type="submit"
              className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 rounded text-white font-bold transition-colors uppercase text-sm tracking-wider"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminDriverForm;