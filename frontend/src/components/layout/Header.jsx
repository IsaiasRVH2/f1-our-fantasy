import { useNavigate } from 'react-router-dom';
import Button from '../base/Button';

const Header = ({ username }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    

    navigate('/login');
  };

  return (
    <header className="mb-10 border-b border-slate-800 pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-4xl font-black italic uppercase text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">
          Bienvenido, {username || 'Piloto'}
        </h1>
        <p className="text-slate-400 mt-2">Paddock General - Temporada 2026</p>
      </div>

      <div>
        <Button 
          onClick={handleLogout}
        >
          Cerrar Sesión
        </Button>
      </div>
    </header>
  );
};

export default Header;