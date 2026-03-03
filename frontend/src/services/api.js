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

export default api;