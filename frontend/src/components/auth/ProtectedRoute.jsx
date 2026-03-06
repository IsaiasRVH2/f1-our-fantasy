import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  // Verificamos si existe el token en el almacenamiento
  const token = localStorage.getItem('token');

  // Si no hay token, lo redirigimos al login inmediatamente.
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;