import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import HealthCheck from './pages/HealthCheck';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Toaster 
        position="bottom-right" 
        toastOptions={{
          style: {
            background: '#1e293b', // Color de fondo slate-800
            color: '#fff',
            border: '1px solid #334155', // slate-700
          },
          success: {
            iconTheme: { primary: '#10b981', secondary: '#fff' }, // Verde
          },
          error: {
            iconTheme: { primary: '#ef4444', secondary: '#fff' }, // Rojo
          },
        }} 
      />
      
      <Router>
        <Routes>
          {/* RUTAS PÚBLICAS */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/health" element={<HealthCheck />} />
          
          {/* RUTAS PROTEGIDAS */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="*" element={
            <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white font-black uppercase italic text-4xl">
              404 - Out of Track
            </div>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;