import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import HealthCheck from './pages/HealthCheck';

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta de Registro */}
        <Route path="/register" element={<Register />} />
        
        {/* Ruta de Estado del Sistema */}
        <Route path="/health" element={<HealthCheck />} />
        
        {/* Redirección por defecto: si entran a la raíz, van a /health para ver si el server está vivo */}
        <Route path="/" element={<Navigate to="/health" />} />
        
        {/* 404 - Paddock no encontrado */}
        <Route path="*" element={
          <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white font-black uppercase italic text-4xl">
            404 - Out of Track
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;