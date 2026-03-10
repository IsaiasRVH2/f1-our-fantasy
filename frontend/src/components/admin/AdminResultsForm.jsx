import { useState, useEffect, useMemo } from 'react';
import toast from 'react-hot-toast';
import Input from '../base/Input';

// Reglamento de puntos de la F1
const RACE_POINTS = { 1: 25, 2: 18, 3: 15, 4: 12, 5: 10, 6: 8, 7: 6, 8: 4, 9: 2, 10: 1 };
const SPRINT_POINTS = { 1: 8, 2: 7, 3: 6, 4: 5, 5: 4, 6: 3, 7: 2, 8: 1 };

const AdminResultsForm = ({ gps, drivers, onSave }) => {
  // Encontrar el GP activo por defecto
  const activeGp = useMemo(() => gps.find(g => g.is_active) || gps[0], [gps]);
  
  const [selectedGpId, setSelectedGpId] = useState('');
  const [resultsState, setResultsState] = useState({});

  // Inicializar el formulario cuando cambian los pilotos o el GP
  useEffect(() => {
    if (activeGp) {
      setSelectedGpId(activeGp.id.toString());
    }
    
    // Pre-poblar el estado para los 20/22 pilotos
    const initialState = {};
    drivers.forEach(driver => {
      initialState[driver.id] = {
        race_pos: '',
        sprint_pos: '',
        is_dnf: false
      };
    });
    setResultsState(initialState);
  }, [drivers, activeGp]);

  const selectedGp = useMemo(() => 
    gps.find(g => g.id.toString() === selectedGpId), 
  [gps, selectedGpId]);

  // Manejar cambios en los inputs
  const handleInputChange = (driverId, field, value) => {
    setResultsState(prev => ({
      ...prev,
      [driverId]: {
        ...prev[driverId],
        [field]: value
      }
    }));
  };

  // Procesar y enviar los datos
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = [];
    const usedRacePositions = new Set();

    for (const driver of drivers) {
      const data = resultsState[driver.id];
      const racePos = parseInt(data.race_pos);
      const sprintPos = selectedGp?.has_sprint ? parseInt(data.sprint_pos) : null;
      
      // Validaciones básicas
      if (isNaN(racePos) || racePos < 1 || racePos > drivers.length) {
        return toast.error(`Falta la posición de carrera de ${driver.full_name} o es inválida.`);
      }

      if (usedRacePositions.has(racePos)) {
        return toast.error(`La posición ${racePos} está duplicada.`);
      }
      usedRacePositions.add(racePos);

      // Calcular puntos
      const rPoints = (!data.is_dnf && RACE_POINTS[racePos]) ? RACE_POINTS[racePos] : 0;
      const sPoints = (selectedGp?.has_sprint && !data.is_dnf && SPRINT_POINTS[sprintPos]) ? SPRINT_POINTS[sprintPos] : 0;
      
      payload.push({
        gp_id: parseInt(selectedGpId),
        driver_id: driver.id,
        race_pos: racePos,
        race_points: rPoints,
        sprint_pos: sprintPos,
        sprint_points: sPoints,
        gp_points: rPoints + sPoints,
        is_dnf: data.is_dnf
      });
    }

    const success = await onSave(parseInt(selectedGpId), payload);

    if (success) {
      const resetState = {};
      drivers.forEach(driver => {
        resetState[driver.id] = {
          race_pos: '',
          sprint_pos: '',
          is_dnf: false
        };
      });
      setResultsState(resetState);
      
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (!selectedGp) return null;

  return (
    <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-xl p-6" noValidate>

      {/* Selector de GP */}
      <div className="mb-8 p-4 bg-slate-950 rounded-lg border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            Gran Premio a Evaluar
          </label>
          <select 
            value={selectedGpId}
            onChange={(e) => setSelectedGpId(e.target.value)}
            className="w-full md:w-80 p-2 bg-slate-800 border border-slate-700 rounded text-white font-bold outline-none focus:border-cyan-500"
          >
            {gps.map(gp => (
              <option key={gp.id} value={gp.id}>
                {gp.name} {gp.is_active ? ' (ACTIVO)' : ''}
              </option>
            ))}
          </select>
        </div>
        {selectedGp.has_sprint && (
          <div className="px-4 py-2 bg-purple-500/20 border border-purple-500/50 rounded text-purple-400 font-bold uppercase text-sm tracking-wider flex items-center">
            🏁 Formato Sprint
          </div>
        )}
      </div>

      {/* Tabla de Resultados */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-700 text-slate-400 text-xs uppercase tracking-wider">
              <th className="pb-3 font-bold w-1/3">Piloto</th>
              {selectedGp.has_sprint && <th className="pb-3 font-bold w-1/4 text-left">Pos. Sprint</th>}
              <th className="pb-3 font-bold w-1/4 text-left">Pos. Carrera</th>
              <th className="pb-3 font-bold text-center">DNF</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {drivers.map(driver => (
              <tr key={driver.id} className="hover:bg-slate-800/30 transition-colors">
                <td className="py-3">
                  <div className="font-bold text-white">{driver.full_name}</div>
                  <div className="text-xs text-slate-500 font-mono">{driver.team_name}</div>
                </td>
                
                {/* Input Sprint (Condicional) */}
                {selectedGp.has_sprint && (
                  <td className="py-3 pr-4">
                    <div className="w-24">
                      <Input 
                        type="number" min="1" max={drivers.length}
                        value={resultsState[driver.id]?.sprint_pos}
                        onChange={(e) => handleInputChange(driver.id, 'sprint_pos', e.target.value)}
                        disabled={resultsState[driver.id]?.is_dnf}
                      />
                    </div>
                  </td>
                )}

                {/* Input Carrera */}
                <td className="py-3 pr-4">
                  <div className="w-24">
                    <Input 
                      type="number" min="1" max={drivers.length}
                      required={!resultsState[driver.id]?.is_dnf}
                      value={resultsState[driver.id]?.race_pos}
                      onChange={(e) => handleInputChange(driver.id, 'race_pos', e.target.value)}
                      disabled={resultsState[driver.id]?.is_dnf}
                    />
                  </div>
                </td>

                {/* Checkbox DNF */}
                <td className="py-3 text-center">
                  <input 
                    type="checkbox"
                    className="w-5 h-5 accent-red-500 cursor-pointer"
                    checked={resultsState[driver.id]?.is_dnf}
                    onChange={(e) => handleInputChange(driver.id, 'is_dnf', e.target.checked)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 pt-6 border-t border-slate-800 flex justify-end">
        <button 
          type="submit"
          className="px-8 py-3 bg-cyan-600 hover:bg-cyan-500 rounded text-white font-black uppercase tracking-widest transition-colors shadow-lg shadow-cyan-900/50"
        >
          Guardar
        </button>
      </div>
    </form>
  );
};

export default AdminResultsForm;