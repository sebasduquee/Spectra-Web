// src/admin/components/layout/Header.jsx
import React, { useState, useRef } from 'react';
import { Menu, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProfileMenu from '../common/ProfileMenu';
import NotificationsMenu from '../common/NotificationsMenu';

const Header = ({ toggleSidebar, onLogout }) => {
 const [showNotifications, setShowNotifications] = useState(false);
 const notificationButtonRef = useRef(null);
 const navigate = useNavigate();

 const handleNotificationsToggle = () => {
   setShowNotifications(!showNotifications);
 };

 const handleCloseNotifications = () => {
   setShowNotifications(false);
 };

 const handleViewAllNotifications = () => {
   setShowNotifications(false);
   navigate('/admin/notifications');
 };

 return (
   <header className="sticky top-0 h-16 bg-white/5 border-b border-white/10 px-6 flex items-center justify-between backdrop-blur-sm z-50">
     <div className="flex items-center space-x-4">
       <button
         onClick={toggleSidebar}
         className="p-2 hover:bg-white/10 rounded-lg transition-colors"
       >
         <Menu className="w-5 h-5 text-white" />
       </button>
       <div className="hidden md:block">
         <span className="text-white/60">Dashboard</span>
       </div>
     </div>

     <div className="flex items-center space-x-4">
       {/* Notificaciones */}
       <div className="relative">
         <button 
           ref={notificationButtonRef}
           onClick={handleNotificationsToggle}
           className="p-4 hover:bg-white/10 rounded-lg transition-colors relative"
         >
           <Bell className="w-5 h-5 text-white" />
           <span className="absolute top-1 right-1 w-2 h-2 bg-[#CBDFF4] rounded-full"></span>
         </button>

         <NotificationsMenu 
           isOpen={showNotifications}
           onClose={handleCloseNotifications}
           onViewAll={handleViewAllNotifications}
           buttonRef={notificationButtonRef}
         />
       </div>

       {/* Perfil */}
       <ProfileMenu onLogout={onLogout} />
     </div>
   </header>
 );
};

export default Header;