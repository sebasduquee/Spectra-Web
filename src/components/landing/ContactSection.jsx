
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, User, Phone } from 'lucide-react';
import { useFormValidation, validations } from '../../hooks/useFormValidation';
import InputField from '../shared/form/InputField';
import FormGroup from '../shared/form/FormGroup';

const ContactSection = () => {
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Definir el esquema de validación
  const validationSchema = {
    name: [
      validations.required,
      validations.minLength(2)
    ],
    email: [
      validations.required,
      validations.email
    ],
    phone: [
      validations.required,
      validations.phone
    ]
  };

  // Usar el hook de validación
  const {
    values: formData,
    errors: formErrors,
    handleChange,
    handleBlur,
    validateForm,
    setValues
  } = useFormValidation(
    {
      name: '',
      email: '',
      phone: '',
      message: ''
    },
    validationSchema
  );

  const isFormValid = () => {
    const errors = validateForm();
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Limpiar mensajes anteriores
    setSubmitStatus({ type: '', message: '' });

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setSubmitStatus({ 
        type: 'error', 
        message: 'Por favor, completa todos los campos obligatorios correctamente.' 
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    try {
      const API_URL = `${import.meta.env.VITE_API_BASE_URL}/auth/contact-request`;
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phoneNumber: formData.phone,
          metadata: {
            message: formData.message
          }
        })
      });

      if (response.ok) {
        setSubmitStatus({ 
          type: 'success', 
          message: '¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.' 
        });
        setValues({ name: '', email: '', phone: '', message: '' });
      } else {
        throw new Error('Error al enviar el mensaje');
      }
    } catch (error) {
      setSubmitStatus({ 
        type: 'error', 
        message: 'Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.' 
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
          <InputField
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            label="Nombre completo"
            placeholder="Tu nombre completo"
            error={formErrors.name}
            required={true}
            icon={<User className="text-gray-400" />}
          />

          <InputField
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            label="Correo electrónico"
            placeholder="tu@email.com"
            error={formErrors.email}
            required={true}
            icon={<Mail className="text-gray-400" />}
          />

          <InputField
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            label="Teléfono"
            placeholder="+57 300 123 4567"
            error={formErrors.phone}
            required={true}
            icon={<Phone className="text-gray-400" />}
          />

          <FormGroup label="Mensaje (opcional)">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#CBDFF4] text-gray-900"
              placeholder="Escribe tu mensaje aquí..."
            />
          </FormGroup>

          <button
            type="submit"
            disabled={isSubmitting || !isFormValid()}
            className={`w-full px-6 py-4 bg-[#090744] text-white rounded-xl font-medium hover:bg-[#090744]/90 transition-all flex items-center justify-center space-x-2 ${(isSubmitting || !isFormValid()) ? 'opacity-50 cursor-not-allowed' : ''}`}
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
