// src/shared/layouts/AdminLayout.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#090744] to-black relative">
      <Sidebar 
        isOpen={sidebarOpen} 
        setIsOpen={setSidebarOpen}
        onLogout={handleLogout}
      />
      <div className={`${sidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
        <Header 
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          onLogout={handleLogout}
        />
        <main className="p-6 relative z-0">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;