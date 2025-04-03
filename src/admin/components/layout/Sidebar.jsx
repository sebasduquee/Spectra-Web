// src/admin/components/layout/Sidebar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, Users, Settings, MessageSquare, FileText, 
  TrendingUp, LogOut 
} from 'lucide-react';

const Sidebar = ({ isOpen, onLogout }) => {
  const location = useLocation();
  const handleLogout = (e) => {
    e.preventDefault();
    onLogout();
  };
  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: Users, label: 'Usuarios', path: '/admin/users' },
    // { icon: MessageSquare, label: 'Chats', path: '/admin/chats' },
    // { icon: FileText, label: 'Documentos', path: '/admin/documents' },
    // { icon: TrendingUp, label: 'Análisis', path: '/admin/analytics' },
    // { icon: Settings, label: 'Configuración', path: '/admin/settings' },
  ];


  return (
    <aside 
      className={`
        fixed top-0 left-0 h-full bg-white/5 border-r border-white/10 
        transition-all duration-300 z-20
        ${isOpen ? 'w-64' : 'w-20'}
      `}
    >
      <div className="p-6">
        <img 
          src="/images/brand/logo.svg" 
          alt="SPECTRUM" 
          className={`h-8 ${!isOpen && 'mx-auto'}`}
        />
      </div>
      <nav className="mt-6">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`
                    flex items-center px-6 py-3 text-white/60 hover:text-white
                    ${location.pathname === item.path ? 'bg-white/10 text-white' : ''}
                    ${!isOpen && 'justify-center'}
                  `}
                >
                  <Icon className="w-5 h-5" />
                  {isOpen && <span className="ml-3">{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="absolute bottom-0 w-full p-6">
        <button 
          onClick={onLogout}
          className={`
            flex items-center text-white/60 hover:text-white
            ${!isOpen && 'justify-center w-full'}
          `}
        >
          <LogOut className="w-5 h-5" />
          {isOpen && <span className="ml-3">Cerrar Sesión</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;