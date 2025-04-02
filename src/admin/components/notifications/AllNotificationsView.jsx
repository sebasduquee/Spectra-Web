// src/admin/components/notifications/AllNotificationsView.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Bell, MessageSquare, Users, FileText, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../layout/AdminLayout';

const NotificationItem = ({ notification }) => {
 const getIcon = () => {
   switch (notification.type) {
     case 'message':
       return <MessageSquare className="w-5 h-5" />;
     case 'user':
       return <Users className="w-5 h-5" />;
     case 'document':
       return <FileText className="w-5 h-5" />;
     case 'analytics':
       return <TrendingUp className="w-5 h-5" />;
     default:
       return <Bell className="w-5 h-5" />;
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
   <div className={`p-4 bg-white/5 rounded-xl mb-4 ${!notification.read ? 'border border-[#CBDFF4]/20' : ''}`}>
     <div className="flex items-start space-x-4">
       <div className={`p-3 rounded-xl ${getModuleColor()}`}>
         {getIcon()}
       </div>
       <div className="flex-1">
         <div className="flex items-center justify-between mb-2">
           <span className={`text-xs px-2 py-0.5 rounded-full ${getModuleColor()}`}>
             {notification.moduleLabel}
           </span>
           <span className="text-sm text-white/40">
             {notification.time}
           </span>
         </div>
         <h3 className="text-white font-medium mb-1">{notification.title}</h3>
         <p className="text-white/60 text-sm">{notification.message}</p>
       </div>
       {!notification.read && (
         <div className="w-2 h-2 rounded-full bg-[#CBDFF4] flex-shrink-0 mt-2" />
       )}
     </div>
   </div>
 );
};

const AllNotificationsView = () => {
 const navigate = useNavigate();
 const [filter, setFilter] = useState('all');

 // Usando los mismos datos que el menú de notificaciones
 const allNotifications = [
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
   },
   // Notificaciones adicionales
   {
     id: 5,
     type: 'message',
     module: 'legal',
     moduleLabel: 'Legal',
     title: 'Actualización de términos',
     message: 'Nuevos términos y condiciones disponibles para revisión.',
     time: '5 horas',
     read: true
   },
   {
     id: 6,
     type: 'analytics',
     module: 'media',
     moduleLabel: 'Media',
     title: 'Tendencia detectada',
     message: 'Se ha detectado un incremento significativo en el engagement.',
     time: '6 horas',
     read: false
   }
 ];

 const filteredNotifications = allNotifications.filter(notification => {
   switch (filter) {
     case 'unread':
       return !notification.read;
     case 'read':
       return notification.read;
     default:
       return true;
   }
 });

 const handleBack = () => {
   navigate('/admin/dashboard');
 };

 return (
   <AdminLayout>
     <div className="mb-8">
       <div className="flex items-center space-x-4 mb-6">
         <button
           onClick={handleBack}
           className="p-2 hover:bg-white/10 rounded-lg transition-colors"
         >
           <ArrowLeft className="w-5 h-5 text-white" />
         </button>
         <div>
           <h1 className="text-2xl font-bold text-white">Notificaciones</h1>
           <p className="text-white/60">Centro de notificaciones</p>
         </div>
       </div>

       {/* Filtros */}
       <div className="flex space-x-4 mb-6">
         <button
           onClick={() => setFilter('all')}
           className={`px-4 py-2 rounded-lg transition-colors ${
             filter === 'all' 
               ? 'bg-white/10 text-white' 
               : 'text-white/60 hover:bg-white/10'
           }`}
         >
           Todas ({allNotifications.length})
         </button>
         <button
           onClick={() => setFilter('unread')}
           className={`px-4 py-2 rounded-lg transition-colors ${
             filter === 'unread' 
               ? 'bg-white/10 text-white' 
               : 'text-white/60 hover:bg-white/10'
           }`}
         >
           No leídas ({allNotifications.filter(n => !n.read).length})
         </button>
         <button
           onClick={() => setFilter('read')}
           className={`px-4 py-2 rounded-lg transition-colors ${
             filter === 'read' 
               ? 'bg-white/10 text-white' 
               : 'text-white/60 hover:bg-white/10'
           }`}
         >
           Leídas ({allNotifications.filter(n => n.read).length})
         </button>
       </div>

       {/* Lista de notificaciones */}
       <div className="space-y-4">
         {filteredNotifications.map(notification => (
           <NotificationItem key={notification.id} notification={notification} />
         ))}
       </div>
     </div>
   </AdminLayout>
 );
};

export default AllNotificationsView;