// src/admin/components/common/ProfileMenu.jsx
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Settings, LogOut, ChevronDown,
  Bell, Moon, Sun, Languages
} from 'lucide-react';

const ProfileMenu = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Cerrar el menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {/* Botón del perfil */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 p-2 hover:bg-white/5 rounded-xl transition-colors"
      >
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div className="text-right hidden md:block">
            <div className="text-sm font-medium text-white">Admin User</div>
            <div className="text-xs text-white/60">admin@spectrum.com</div>
          </div>
        </div>
        <ChevronDown 
          className={`w-4 h-4 text-white/60 transition-transform duration-200 hidden md:block
            ${isOpen ? 'transform rotate-180' : ''}`}
        />
      </button>

      {/* Menú desplegable */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-72 bg-[#090744]/95 backdrop-blur-sm border border-white/10 rounded-xl shadow-lg overflow-hidden z-50"
          >
            {/* Header del menú */}
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-sm font-medium text-white">Admin User</div>
                  <div className="text-xs text-white/60">admin@spectrum.com</div>
                  <div className="text-xs text-[#CBDFF4] mt-1">Ver perfil</div>
                </div>
              </div>
            </div>

            {/* Configuraciones rápidas */}
            <div className="p-2">
              <div className="px-2 py-1.5 text-xs text-white/40 uppercase">
                Configuración rápida
              </div>

              {/* Modo oscuro/claro */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="w-full flex items-center justify-between p-2 hover:bg-white/5 rounded-lg text-white/80 hover:text-white transition-colors"
              >
                <div className="flex items-center space-x-3">
                  {isDarkMode ? (
                    <Moon className="w-4 h-4" />
                  ) : (
                    <Sun className="w-4 h-4" />
                  )}
                  <span className="text-sm">Modo {isDarkMode ? 'oscuro' : 'claro'}</span>
                </div>
                <div className="w-8 h-4 bg-white/10 rounded-full relative">
                  <div className={`absolute top-1 ${isDarkMode ? 'left-1' : 'right-1'} w-2 h-2 rounded-full bg-white transition-all`} />
                </div>
              </button>

              {/* Idioma */}
              <button className="w-full flex items-center space-x-3 p-2 hover:bg-white/5 rounded-lg text-white/80 hover:text-white transition-colors">
                <Languages className="w-4 h-4" />
                <span className="text-sm">Idioma</span>
              </button>
            </div>

            {/* Separador */}
            <div className="border-t border-white/10" />

            {/* Opciones principales */}
            <div className="p-2">
              <button className="w-full flex items-center space-x-3 p-2 hover:bg-white/5 rounded-lg text-white/80 hover:text-white transition-colors">
                <Settings className="w-4 h-4" />
                <span className="text-sm">Configuración</span>
              </button>

              <button
                onClick={() => {
                  setIsOpen(false);
                  onLogout();
                }}
                className="w-full flex items-center space-x-3 p-2 hover:bg-red-500/10 rounded-lg text-red-400 hover:text-red-300 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm">Cerrar sesión</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileMenu;