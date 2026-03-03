import { useState, useEffect } from 'react';
import { checkHealth } from '../../services/api';
import { motion } from 'framer-motion';

const ConnectionStatus = () => {
  const [status, setStatus] = useState('checking'); // 'checking', 'connected', 'error'

  useEffect(() => {
    const verifyConnection = async () => {
      try {
        const data = await checkHealth();
        if (data.status === 'ok' && data.db === 'connected') {
          setStatus('connected');
        } else {
          setStatus('error');
        }
      } catch (error) {
        setStatus('error');
      }
    };

    verifyConnection();
  }, []);

  const variants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
  };

  return (
    <motion.div 
      initial="initial"
      animate="animate"
      variants={variants}
      className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4 border-l-4"
      style={{ borderColor: status === 'connected' ? '#22c55e' : status === 'error' ? '#ef4444' : '#eab308' }}
    >
      <div className="flex-shrink-0">
        <div className={`h-4 w-4 rounded-full animate-pulse ${
          status === 'connected' ? 'bg-green-500' : status === 'error' ? 'bg-red-500' : 'bg-yellow-500'
        }`} />
      </div>
      <div>
        <div className="text-xl font-medium text-black">F1 Fantasy TCG</div>
        <p className="text-slate-500">
          {status === 'connected' ? 'Sistemas Operativos' : 
           status === 'error' ? 'Error de Conexión' : 'Verificando sistemas...'}
        </p>
      </div>
    </motion.div>
  );
};

export default ConnectionStatus;