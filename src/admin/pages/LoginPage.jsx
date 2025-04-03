
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useFormValidation, validators } from '../../hooks/useFormValidation';
import { InputField } from '../../components/shared/form/InputField';
import FormGroup from '../../components/shared/form/FormGroup';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const validationRules = {
    email: [validators.required, validators.email],
    password: validators.required
  };

  const initialState = {
    email: '',
    password: ''
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateAll
  } = useFormValidation(initialState, validationRules);

  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateAll()) {
      setIsSubmitting(true);
      setLoginError('');
      
      try {
        const success = await login(values.email, values.password);
        if (success) {
          navigate('/admin/dashboard');
        } else {
          setLoginError('Credenciales incorrectas');
        }
      } catch (error) {
        setLoginError('Error al iniciar sesión');
        console.error(error);
      } finally {
        setIsSubmitting(false);
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
            {loginError && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-sm text-white">
                {loginError}
              </div>
            )}
            
            <InputField
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.email}
              touched={touched.email}
              label="Correo electrónico"
              placeholder="admin@spectrum.com"
              required
              labelClassName="text-white"
              inputClassName="bg-white/5 border border-white/10 text-white placeholder-white/40 focus:ring-[#CBDFF4]/50
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
              leftIcon={<Mail className="w-5 h-5 text-white/40" />}
              errorClassName="text-red-400"
            />

            <FormGroup
              label="Contraseña"
              htmlFor="password"
              error={errors.password}
              touched={touched.password}
              required
              labelClassName="text-white"
              errorClassName="text-red-400"
            >
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pl-12 pr-12 text-white 
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
                  [&:-webkit-autofill:active]:[transition:background-color_9999s_ease-in-out_0s]`}
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
            </FormGroup>

            {/* Remember me & Forgot password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
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
              disabled={isSubmitting}
              className="w-full py-3 px-4 bg-[#CBDFF4] text-[#090744] rounded-xl font-medium hover:bg-[#CBDFF4]/90 transition-all focus:outline-none focus:ring-2 focus:ring-[#CBDFF4]/50 focus:ring-offset-2 focus:ring-offset-[#090744] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Iniciando sesión...' : 'Iniciar Sesión'}
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
