import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';
import Input from '../components/base/Input';
import Button from '../components/base/Button';
import AuthCard from '../components/base/AuthCard';
import toast from 'react-hot-toast';

const Register = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
      username: '', email: '', password: '', confirmPassword: '', accessCode: ''
  });
    
  const [error, setError] = useState('');

  const [loading, setLoading] = useState(false);
    
  const ACCESS_CODE_VALID = import.meta.env.VITE_ACCESS_CODE;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validaciones de Frontend
    const hasEmptyFields = Object.values(formData).some(value => value.trim() === '');
    
    if (hasEmptyFields) {
      toast.error("No puedes dejar espacios vacios. Llena todos los campos.");
      return setError("Todos los campos son obligatorios.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Ingresa un email válido.");
      return setError("Email inválido.");
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Las contraseñas no coinciden.");
      console.warn("Error de validación: Contraseñas no coinciden.");
      return setError("Las contraseñas no coinciden.");
    }
    if (formData.accessCode !== ACCESS_CODE_VALID) {
      toast.error("Código de acceso inválido.");
      console.warn("Error de validación: Código de acceso inválido.");
      return setError("Código de acceso inválido.");
    }

    setLoading(true);

    const toastId = toast.loading('Calentando neumáticos... registrando piloto.');

    try {
      // Limpiamos el objeto para el backend
      const { confirmPassword, accessCode, ...restOfData } = formData;
      
      const dataToSend = {
        ...restOfData,
        access_code: accessCode
      };

      // Llamada al backend
      await registerUser(dataToSend);
      
      toast.success('¡Registro exitoso! Bienvenido a la parrilla...', { id: toastId });

      navigate('/login');
    } catch (err) {
      // Captura el error que viene de FastAPI (400, 422, etc.)
      const message = err.response?.data?.detail || "Error en el servidor";
      setError(typeof message === 'string' ? message : "Datos inválidos");
      toast.error(`¡Error en el registro! ${message}`, { id: toastId });
      console.error("Error en registro:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
      <AuthCard title="Registro de Usuario">
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <Input 
            label="Nombre de Usuario" 
            placeholder="Ej: MagicAlonso"
            onChange={(e) => setFormData({...formData, username: e.target.value})}
          />
          <Input 
            label="Email" 
            type="email"
            placeholder="tu@email.com"
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          <Input 
            label="Contraseña" 
            type="password"
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
          <Input 
            label="Confirmar Contraseña" 
            type="password"
            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
          />
          <Input 
            label="Código de Invitación" 
            placeholder="F1-XXXX-2026"
            onChange={(e) => setFormData({...formData, accessCode: e.target.value})}
          />
          <div className="pt-4">
            <Button type="submit">Registrarme</Button>
          </div>
        </form>
      </AuthCard>
    </div>
  );
};

export default Register;