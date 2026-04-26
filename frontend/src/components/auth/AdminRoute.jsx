import { Navigate, Outlet } from 'react-router-dom';
import toast from 'react-hot-toast';
import { jwtDecode } from 'jwt-decode';

const AdminRoute = () => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decodedToken = jwtDecode(token);
    console.log(decodedToken)
    const isAdmin = decodedToken.role === 'admin';
    console.error(isAdmin)
    if (!isAdmin) {
      toast.error("Acceso denegado: Área exclusiva de adminstración.");
      return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
    
  } catch (error) {
    // Si algo falla al leer los datos, por seguridad lo sacamos
    console.log(error)
    return <Navigate to="/login" replace />;
  }
};

export default AdminRoute;