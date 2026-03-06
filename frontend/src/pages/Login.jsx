import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { loginUser } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Input from '../components/base/Input';
import Button from '../components/base/Button';
import AuthCard from '../components/base/AuthCard';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación básica de campos vacíos
    if (!formData.email.trim() || !formData.password.trim()) {
      return toast.error("Llena todos los campos.");
    }

    setLoading(true);
    const toastId = toast.loading('Iniciando sesión...');

    try {
      // Llamada a capa de servicios
      const response = await loginUser(formData);
      
      // Guarda el token en el almacenamiento del navegador
      login(response.access_token);
      
      toast.success("¡Se ha iniciado sesión!", { id: toastId });
      navigate('/dashboard');

    } catch (err) {
      // Manejo de errores
      const message = err.response?.data?.detail || "Error al intentar acceder.";
      toast.error(typeof message === 'string' ? message : "Credenciales inválidas.", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
      <AuthCard title="Acceso a Boxes">
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <Input 
            label="Email" 
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          <Input 
            label="Contraseña" 
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
          
          <div className="pt-4">
            <Button type="submit" disabled={loading}>
              {loading ? 'Verificando...' : 'Iniciar Sesión'}
            </Button>
          </div>
        </form>

        {/* Link para ir al registro si no tiene cuenta */}
        <div className="mt-6 text-center text-sm text-slate-400">
          ¿Aún no tienes una cuenta?{' '}
          <Link to="/register" className="text-emerald-500 hover:text-emerald-400 font-semibold transition-colors">
            Regístrate aquí
          </Link>
        </div>
      </AuthCard>
    </div>
  );
};

export default Login;