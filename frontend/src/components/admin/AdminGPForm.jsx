import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import Input from '../base/Input';

// Helper para convertir fecha ISO a formato de input datetime-local
const toInputFormat = (isoString) => {
  if (!isoString) return '';
  // Cortamos "YYYY-MM-DDTHH:mm:ss.sssZ" a "YYYY-MM-DDTHH:mm"
  return isoString.slice(0, 16);
};

// Helper para convertir del input a ISO para el backend
const toISOFormat = (inputString) => {
  if (!inputString) return null;
  return new Date(inputString).toISOString();
};

const AdminGPForm = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    season_year: 2026,
    season_half: 1,
    has_sprint: false,
    fp1_date: '',
    fp2_date: '',
    fp3_date: '',
    squaly_date: '',
    sprint_date: '',
    qualy_date: '',
    race_date: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        season_year: initialData.season_year || 2026,
        season_half: initialData.season_half || 1,
        has_sprint: initialData.has_sprint || false,
        fp1_date: toInputFormat(initialData.fp1_date),
        fp2_date: toInputFormat(initialData.fp2_date),
        fp3_date: toInputFormat(initialData.fp3_date),
        squaly_date: toInputFormat(initialData.squaly_date),
        sprint_date: toInputFormat(initialData.sprint_date),
        qualy_date: toInputFormat(initialData.qualy_date),
        race_date: toInputFormat(initialData.race_date)
      });
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.fp1_date || !formData.qualy_date || !formData.race_date) {
      return toast.error("Faltan datos obligatorios (Nombre, FP1, Qualy, Carrera).");
    }

    // Preparamos el payload limpiando las fechas según el formato
    const payload = {
      name: formData.name,
      season_year: Number(formData.season_year),
      season_half: Number(formData.season_half),
      has_sprint: formData.has_sprint,
      fp1_date: toISOFormat(formData.fp1_date),
      qualy_date: toISOFormat(formData.qualy_date),
      race_date: toISOFormat(formData.race_date),
      // Si es Sprint, mandamos squaly y sprint, pero anulamos fp2 y fp3
      fp2_date: formData.has_sprint ? null : toISOFormat(formData.fp2_date),
      fp3_date: formData.has_sprint ? null : toISOFormat(formData.fp3_date),
      squaly_date: formData.has_sprint ? toISOFormat(formData.squaly_date) : null,
      sprint_date: formData.has_sprint ? toISOFormat(formData.sprint_date) : null,
    };

    onSave(payload);
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 w-full max-w-2xl shadow-2xl my-8">
        <h3 className="text-xl font-bold text-white mb-6 border-l-4 border-cyan-500 pl-3 uppercase italic">
          {initialData ? 'Actualizar Gran Premio' : 'Programar Nuevo GP'}
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <Input 
                label="Nombre del Gran Premio *"
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Ej. Gran Premio de México"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Input 
                label="Año *"
                type="number" 
                min="2024"
                value={formData.season_year}
                onChange={(e) => setFormData({...formData, season_year: e.target.value})}
              />
              <Input 
                label="Mitad (1-2) *"
                type="number" 
                min="1" max="2"
                value={formData.season_half}
                onChange={(e) => setFormData({...formData, season_half: e.target.value})}
              />
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-slate-800 rounded border border-slate-700 mt-4">
            <input 
              type="checkbox" 
              id="has_sprint"
              className="w-5 h-5 accent-cyan-500 cursor-pointer"
              checked={formData.has_sprint}
              onChange={(e) => setFormData({...formData, has_sprint: e.target.checked})}
            />
            <label htmlFor="has_sprint" className="text-sm font-bold text-white cursor-pointer uppercase tracking-wider">
              Formato Sprint
            </label>
          </div>

          {/* Fechas de Sesiones */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 p-4 border border-slate-800 rounded bg-slate-950/50">
            <h4 className="md:col-span-2 text-cyan-400 font-bold uppercase text-sm border-b border-slate-800 pb-2">
              Horarios de Sesiones (Local)
            </h4>

            <Input 
              label="Libres 1 (FP1) *"
              type="datetime-local" 
              value={formData.fp1_date}
              onChange={(e) => setFormData({...formData, fp1_date: e.target.value})}
            />

            {formData.has_sprint ? (
              <Input 
                label="Sprint Shootout (SQ)"
                type="datetime-local" 
                value={formData.squaly_date}
                onChange={(e) => setFormData({...formData, squaly_date: e.target.value})}
              />
            ) : (
              <Input 
                label="Libres 2 (FP2)"
                type="datetime-local" 
                value={formData.fp2_date}
                onChange={(e) => setFormData({...formData, fp2_date: e.target.value})}
              />
            )}

            {formData.has_sprint ? (
              <Input 
                label="Carrera Sprint"
                type="datetime-local" 
                value={formData.sprint_date}
                onChange={(e) => setFormData({...formData, sprint_date: e.target.value})}
              />
            ) : (
              <Input 
                label="Libres 3 (FP3)"
                type="datetime-local" 
                value={formData.fp3_date}
                onChange={(e) => setFormData({...formData, fp3_date: e.target.value})}
              />
            )}

            <Input 
              label="Clasificación (Qualy) *"
              type="datetime-local" 
              value={formData.qualy_date}
              onChange={(e) => setFormData({...formData, qualy_date: e.target.value})}
            />

            <div className="md:col-span-2">
              <Input 
                label="Carrera Principal *"
                type="datetime-local" 
                value={formData.race_date}
                onChange={(e) => setFormData({...formData, race_date: e.target.value})}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-6 mt-6">
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
              Guardar GP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminGPForm;