import axios from 'axios';

// Vite carga las variables de entorno en import.meta.env
const BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * Servicio para verificar la salud de los sistemas (Hito H1)
 * Realiza una petición GET al endpoint /health del backend.
 */
export const checkHealth = async () => {
    try {
        const response = await api.get('/health');
        return response.data;
    } catch (error) {
        console.error("Error conectando con el servidor:", error);
        throw error;
    }
};

/**
 * Registra un nuevo usuario en el sistema.
 * @param {*} userData - Los datos del usuario a registrar.
 * @returns {Promise} - La promesa que se resuelve con los datos del usuario registrado.
 */
export const registerUser = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

/**
 * Inicia sesión en el sistema.
 * @param {*} credentials - Las credenciales del usuario (email y contraseña).
 * @returns {Promise} - La promesa que se resuelve con los datos del usuario autenticado.
 */

export const loginUser = async (credentials) => {
  
  const formData = new URLSearchParams();
  // Mapeamos nuestro 'email' al campo 'username' que espera FastAPI
  formData.append('username', credentials.email); 
  formData.append('password', credentials.password);

  const response = await api.post('/auth/login', formData, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  return response.data; 
};

export const getDrivers = async () => {
  const response = await api.get('/drivers/');
  return response.data;
};

export const deleteDriver = async (driverId) => {
  const token = localStorage.getItem('token');
  const response = await api.delete(`/drivers/${driverId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const createDriver = async (driverData) => {
  const token = localStorage.getItem('token');
  const response = await api.post('/drivers/', driverData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const updateDriver = async (driverId, driverData) => {
  const token = localStorage.getItem('token');
  const response = await api.patch(`/drivers/${driverId}`, driverData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const getGPs = async () => {
  const response = await api.get('/gp/');
  return response.data;
};

export const createGP = async (gpData) => {
  const token = localStorage.getItem('token');
  const response = await api.post('/gp/', gpData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const updateGP = async (gpId, gpData) => {
  const token = localStorage.getItem('token');
  const response = await api.patch(`/gp/${gpId}`, gpData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const deleteGP = async (gpId) => {
  const token = localStorage.getItem('token');
  const response = await api.delete(`/gp/${gpId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export default api;