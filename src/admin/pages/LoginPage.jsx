import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useFormValidation, commonValidations } from '../../hooks/useFormValidation';
import { InputField } from '../../components/shared/form/InputField';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const validationSchema = {
    email: [commonValidations.required, commonValidations.email],
    password: [commonValidations.required, commonValidations.password]
  };

  const {
    values,
    errors,
    handleChange,
    handleBlur,
    validateForm
  } = useFormValidation(
    { email: '', password: '' },
    validationSchema
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const success = await login(values.email, values.password);
      if (success) {
        navigate('/admin/dashboard');
      } else {
        alert('Credenciales incorrectas');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#090744] to-black flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
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

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
              label="Correo electrónico"
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.email}
              required
              placeholder="admin@spectrum.com"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pl-12 text-white 
              placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#CBDFF4]/50"
            />

            <div className="relative">
              <InputField
                label="Contraseña"
                type={showPassword ? "text" : "password"}
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.password}
                required
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pl-12 pr-12 text-white 
                placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#CBDFF4]/50"
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

            <button
              type="submit"
              className="w-full py-3 px-4 bg-[#CBDFF4] text-[#090744] rounded-xl font-medium hover:bg-[#CBDFF4]/90 transition-all focus:outline-none focus:ring-2 focus:ring-[#CBDFF4]/50 focus:ring-offset-2 focus:ring-offset-[#090744]"
            >
              Iniciar Sesión
            </button>
          </form>
        </div>

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