import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import api from '../../services/apiClient';
import { useToast } from '../../contexts/ToastContext';

const ContactSection = () => {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = 'El nombre es obligatorio';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'El nombre debe tener al menos 2 caracteres';
    }

    if (!formData.email.trim()) {
      errors.email = 'El correo electrónico es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Ingresa un correo electrónico válido (ejemplo@dominio.com)';
    }

    if (!formData.phone.trim()) {
      errors.phone = 'El teléfono es obligatorio';
    } else {
      // Regex que permite formato internacional con código de país
      const phoneRegex = /^(\+?\d{1,3})?[\d\s()-]{6,}$/;
      if (!phoneRegex.test(formData.phone.trim())) {
        errors.phone = 'Ingresa un número válido. Puedes incluir el código de país (+57)';
      }
    }

    // El mensaje es opcional, no necesita validación
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Limpiar mensajes anteriores
    setSubmitStatus({ type: '', message: '' });
    setFormErrors({});

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setSubmitStatus({ 
        type: 'error', 
        message: 'Por favor, completa todos los campos obligatorios correctamente.' 
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    try {
      // Formatear el número de teléfono para asegurar que tenga formato internacional
      let formattedPhone = formData.phone;
      // Si no comienza con +, agregamos el prefijo de Colombia +57
      if (!formattedPhone.startsWith('+')) {
        formattedPhone = `+57${formattedPhone.replace(/^0/, '')}`;
      }

      console.log("Enviando número de teléfono formateado:", formattedPhone);

      const response = await api.post('/auth/contact-request', {
        name: formData.name,
        email: formData.email,
        phoneNumber: formattedPhone, // Número de teléfono con formato internacional
        metadata: {
          message: formData.message,
          contactReason: "landing_page",
          source: "website"
        }
      });

      addToast({ 
        type: 'success', 
        message: '¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.',
        duration: 5000
      });
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('Error de contacto:', error);
      addToast({ 
        type: 'error', 
        message: `Hubo un error al enviar el mensaje: ${error}. Por favor, intenta nuevamente.`,
        duration: 7000
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contactSection" className="bg-white py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-[#090744] mb-4">
            ¿Te gustaría saber más?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Déjanos tus datos y nuestro equipo se pondrá en contacto contigo para resolver todas tus dudas.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          noValidate
          className="max-w-xl mx-auto space-y-6"
        >
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Nombre completo
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => {
                setFormData({...formData, name: e.target.value});
                setFormErrors({...formErrors, name: ''});
              }}
              className={`w-full px-4 py-3 rounded-lg border ${formErrors.name ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#CBDFF4] text-gray-900`}
              required
            />
            {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Correo electrónico
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => {
                setFormData({...formData, email: e.target.value});
                setFormErrors({...formErrors, email: ''});
              }}
              className={`w-full px-4 py-3 rounded-lg border ${formErrors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#CBDFF4] text-gray-900`}
              required
            />
            {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Teléfono (con código de país)
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#CBDFF4] text-gray-900"
              placeholder="+57 000 000 0000"
            />
            <small className="text-gray-500 text-xs">Ejemplo: +57 300 123 4567</small>
            {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Mensaje (opcional)
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              rows="4"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#CBDFF4] text-gray-900"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full px-6 py-4 bg-[#090744] text-white rounded-xl font-medium hover:bg-[#090744]/90 transition-all flex items-center justify-center space-x-2 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <span>{isSubmitting ? 'Enviando...' : 'Enviar mensaje'}</span>
            <Send className="w-4 h-4" />
          </button>

          {submitStatus.message && (
            <div className={`mt-4 p-4 rounded-lg ${
              submitStatus.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {submitStatus.message}
            </div>
          )}
        </motion.form>
      </div>
    </section>
  );
};

export default ContactSection;