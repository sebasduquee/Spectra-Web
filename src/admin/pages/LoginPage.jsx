// src/admin/pages/LoginPage.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simulación de autenticación básica
    if (formData.email === 'admin@spectrum.com' && formData.password === 'admin123') {
      // Redirigir al dashboard
      window.location.href = '/admin/dashboard';
    } else {
      alert('Credenciales incorrectas');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#090744] to-black flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/">
            <img 
              src="/images/brand/logo.svg" 
              alt="SPECTRUM" 
              className="h-12 mx-auto cursor-pointer hover:opacity-80 transition-opacity" 
            />
          </Link>
          <h2 className="text-2xl font-bold text-white mt-6 mb-2">
            Admin Portal
          </h2>
          <p className="text-white/60">
            Gestiona usuarios y configuraciones de Spectrum
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Correo electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pl-12 text-white 
                  placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#CBDFF4]/50
                  autofill:bg-white/5 autofill:text-white
                  [-webkit-autofill]:bg-white/5
                  [-webkit-autofill]:text-white
                  [&:-webkit-autofill]:bg-white/5
                  [&:-webkit-autofill]:text-white
                  [&:-webkit-autofill]:[-webkit-text-fill-color:white]
                  [&:-webkit-autofill]:[transition:background-color_9999s_ease-in-out_0s]
                  [&:-webkit-autofill:hover]:[transition:background-color_9999s_ease-in-out_0s]
                  [&:-webkit-autofill:focus]:[transition:background-color_9999s_ease-in-out_0s]
                  [&:-webkit-autofill:active]:[transition:background-color_9999s_ease-in-out_0s]"
                  placeholder="admin@spectrum.com"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pl-12 pr-12 text-white 
                  placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#CBDFF4]/50
                  autofill:bg-white/5 autofill:text-white
                  [-webkit-autofill]:bg-white/5
                  [-webkit-autofill]:text-white
                  [&:-webkit-autofill]:bg-white/5
                  [&:-webkit-autofill]:text-white
                  [&:-webkit-autofill]:[-webkit-text-fill-color:white]
                  [&:-webkit-autofill]:[transition:background-color_9999s_ease-in-out_0s]
                  [&:-webkit-autofill:hover]:[transition:background-color_9999s_ease-in-out_0s]
                  [&:-webkit-autofill:focus]:[transition:background-color_9999s_ease-in-out_0s]
                  [&:-webkit-autofill:active]:[transition:background-color_9999s_ease-in-out_0s]"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white/60"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember me & Forgot password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-white/10 bg-white/5 text-[#CBDFF4] focus:ring-[#CBDFF4]/50"
                />
                <span className="ml-2 text-sm text-white/60">Recordarme</span>
              </label>
              <a href="#" className="text-sm text-[#CBDFF4] hover:text-[#CBDFF4]/80">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 px-4 bg-[#CBDFF4] text-[#090744] rounded-xl font-medium hover:bg-[#CBDFF4]/90 transition-all focus:outline-none focus:ring-2 focus:ring-[#CBDFF4]/50 focus:ring-offset-2 focus:ring-offset-[#090744]"
            >
              Iniciar Sesión
            </button>
          </form>
        </div>

        {/* Help text */}
        <p className="text-center mt-8 text-white/60 text-sm">
          ¿Necesitas ayuda? {" "}
          <a href="mailto:support@spectrum.com" className="text-[#CBDFF4] hover:text-[#CBDFF4]/80">
            Contacta a soporte
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;