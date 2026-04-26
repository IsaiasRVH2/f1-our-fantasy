import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Users, Calendar, Flag, LogOut, Home, Menu, X, UserCog } from 'lucide-react';

const AdminLayout = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const navLinks = [
    { path: '/admin/drivers', name: 'Pilotos', icon: Users },
    { path: '/admin/gp', name: 'Calendario', icon: Calendar },
    { path: '/admin/results', name: 'Resultados', icon: Flag },
    { path: '/admin/users', name: 'Usuarios', icon: UserCog },
  ];
  
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-white overflow-hidden">
      
      {/* ENCABEZADO SUPERIOR */}
      <header className="flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800 z-40">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-xl md:text-2xl font-black italic uppercase text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">
            Administrador
          </h1>
        </div>
        <div className="text-xs text-slate-400 uppercase tracking-wider hidden md:block">
          Panel de Control
        </div>
      </header>

      <div className="flex-1 relative overflow-hidden flex">
        
        {/* BARRA LATERAL DESPLEGABLE (SIDEBAR) */}
        <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 flex flex-col transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          
          <div className="p-4 border-b border-slate-800 flex justify-between items-center">
            <span className="font-bold text-slate-300 uppercase tracking-widest text-sm">Menú</span>
            <button 
              onClick={closeSidebar}
              className="p-1 text-slate-400 hover:text-red-400 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navegación */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={closeSidebar}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-cyan-600/20 text-cyan-400 border border-cyan-500/50'
                        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                    }`
                  }
                >
                  <Icon size={20} />
                  <span className="font-bold">{link.name}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Botones inferiores */}
          <div className="p-4 border-t border-slate-800 space-y-2">
            <button
              onClick={() => { closeSidebar(); navigate('/dashboard'); }}
              className="flex items-center space-x-3 w-full px-4 py-3 text-slate-400 hover:text-emerald-400 hover:bg-emerald-400/10 rounded-lg transition-colors"
            >
              <Home size={20} />
              <span className="font-bold text-sm">Volver al Paddock</span>
            </button>
            
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 w-full px-4 py-3 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
            >
              <LogOut size={20} />
              <span className="font-bold text-sm">Cerrar Sesión</span>
            </button>
          </div>
        </aside>

        {/* OVERLAY */}
    
        {isSidebarOpen && (
          <div 
            className="absolute inset-0 bg-black/60 z-40 backdrop-blur-sm transition-opacity"
            onClick={closeSidebar}
          />
        )}

        {/* ÁREA PRINCIPAL */}
        <main className="flex-1 overflow-y-auto bg-slate-950 p-4 md:p-8">
          <Outlet /> 
        </main>

      </div>
    </div>
  );
};

export default AdminLayout;