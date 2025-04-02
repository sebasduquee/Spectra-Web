// src/admin/components/common/NotificationsMenu.jsx
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
 Bell, X, MessageSquare, Users, FileText,
 TrendingUp, Clock, Check, ChevronRight
} from 'lucide-react';

const NotificationItem = ({ notification }) => {
 const getIcon = () => {
   switch (notification.type) {
     case 'message':
       return <MessageSquare className="w-4 h-4" />;
     case 'user':
       return <Users className="w-4 h-4" />;
     case 'document':
       return <FileText className="w-4 h-4" />;
     case 'analytics':
       return <TrendingUp className="w-4 h-4" />;
     default:
       return <Bell className="w-4 h-4" />;
   }
 };

 const getModuleColor = () => {
   switch (notification.module) {
     case 'legal':
       return 'bg-purple-500/20 text-purple-400';
     case 'inversiones':
       return 'bg-blue-500/20 text-blue-400';
     case 'contabilidad':
       return 'bg-green-500/20 text-green-400';
     case 'media':
       return 'bg-pink-500/20 text-pink-400';
     default:
       return 'bg-white/10 text-white/60';
   }
 };

 return (
   <div className={`p-4 hover:bg-white/5 cursor-pointer transition-colors ${!notification.read ? 'bg-[#090744]/30' : ''}`}>
     <div className="flex items-start space-x-3">
       <div className={`p-2 rounded-xl ${getModuleColor()}`}>
         {getIcon()}
       </div>
       <div className="flex-1 min-w-0">
         <div className="flex items-center justify-between gap-2">
           <span className={`text-xs px-2 py-0.5 rounded-full ${getModuleColor()}`}>
             {notification.moduleLabel}
           </span>
           <span className="text-xs text-white/40 whitespace-nowrap">
             {notification.time}
           </span>
         </div>
         <p className="text-sm text-white mt-1 mb-1">
           {notification.title}
         </p>
         <p className="text-xs text-white/60 line-clamp-2">
           {notification.message}
         </p>
       </div>
       {!notification.read && (
         <div className="w-2 h-2 rounded-full bg-[#CBDFF4] flex-shrink-0 mt-2" />
       )}
     </div>
   </div>
 );
};

const NotificationsMenu = ({ isOpen, onClose, onViewAll, buttonRef }) => {
 const menuRef = useRef(null);

 // Datos de ejemplo para las notificaciones
 const notifications = [
   {
     id: 1,
     type: 'message',
     module: 'legal',
     moduleLabel: 'Legal',
     title: 'Nuevo mensaje del asesor legal',
     message: 'Hemos revisado tu contrato y tenemos algunas sugerencias importantes.',
     time: '2 min',
     read: false
   },
   {
     id: 2,
     type: 'user',
     module: 'inversiones',
     moduleLabel: 'Inversiones',
     title: 'Nuevo cliente registrado',
     message: 'Juan Pérez completó su registro y requiere asignación de asesor.',
     time: '15 min',
     read: false
   },
   {
     id: 3,
     type: 'document',
     module: 'contabilidad',
     moduleLabel: 'Contabilidad',
     title: 'Documentos pendientes',
     message: 'Hay 3 documentos pendientes de revisión para el cierre mensual.',
     time: '1 hora',
     read: true
   },
   {
     id: 4,
     type: 'analytics',
     module: 'media',
     moduleLabel: 'Media',
     title: 'Reporte semanal disponible',
     message: 'El reporte de engagement de la última semana está listo.',
     time: '3 horas',
     read: true
   }
 ];

 useEffect(() => {
   const handleClickOutside = (event) => {
     if (
       menuRef.current && 
       !menuRef.current.contains(event.target) &&
       buttonRef?.current && 
       !buttonRef.current.contains(event.target)
     ) {
       onClose();
     }
   };

   if (isOpen) {
     document.addEventListener('mousedown', handleClickOutside);
   }

   return () => {
     document.removeEventListener('mousedown', handleClickOutside);
   };
 }, [isOpen, onClose, buttonRef]);

 const getMenuPosition = () => {
   if (!buttonRef?.current) return {};

   const buttonRect = buttonRef.current.getBoundingClientRect();
   return {
     top: buttonRect.bottom + 8,
     right: window.innerWidth - buttonRect.right - 16,
   };
 };

 return (
   <AnimatePresence>
     {isOpen && (
       <motion.div
         ref={menuRef}
         initial={{ opacity: 0, y: 10 }}
         animate={{ opacity: 1, y: 0 }}
         exit={{ opacity: 0, y: 10 }}
         transition={{ duration: 0.2 }}
         style={getMenuPosition()}
         className="fixed w-[480px] bg-[#090744] border border-white/10 rounded-xl shadow-lg overflow-hidden z-[9999]"
       >
         {/* Header */}
         <div className="p-4 border-b border-white/10 flex items-center justify-between">
           <div>
             <h2 className="text-lg font-medium text-white">Notificaciones</h2>
             <p className="text-sm text-white/60">Tienes 2 sin leer</p>
           </div>
           <button
             onClick={onClose}
             className="p-2 hover:bg-white/10 rounded-lg transition-colors"
           >
             <X className="w-5 h-5 text-white/60" />
           </button>
         </div>

         {/* Lista de notificaciones */}
         <div className="divide-y divide-white/10 max-h-[400px] overflow-y-auto">
           {notifications.map((notification) => (
             <NotificationItem key={notification.id} notification={notification} />
           ))}
         </div>

         {/* Footer */}
         <div className="p-4 border-t border-white/10">
           <button
             onClick={() => {
               onClose();
               onViewAll();
             }}
             className="w-full flex items-center justify-center space-x-2 p-2 hover:bg-white/10 rounded-lg text-[#CBDFF4] transition-colors"
           >
             <span>Ver todas las notificaciones</span>
             <ChevronRight className="w-4 h-4" />
           </button>
         </div>
       </motion.div>
     )}
   </AnimatePresence>
 );
};

export default NotificationsMenu;