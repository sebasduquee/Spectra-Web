
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useFormValidation, validators } from '../../hooks/useFormValidation';
import { InputField } from '../shared/form/InputField';
import { SelectField } from '../shared/form/SelectField';
import FormGroup from '../shared/form/FormGroup';

const ContactSection = () => {
  const validationRules = {
    name: validators.required,
    email: [validators.required, validators.email],
    phone: validators.phone,
    subject: validators.required,
    message: [validators.required, validators.minLength(10)]
  };

  const initialFormState = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateAll,
    resetForm
  } = useFormValidation(initialFormState, validationRules);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateAll()) {
      setIsSubmitting(true);
      
      try {
        // Simular envío al servidor
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        console.log('Form submitted:', values);
        setSubmitSuccess(true);
        resetForm();
        
        // Resetear estado de éxito después de un tiempo
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 5000);
      } catch (error) {
        console.error('Error submitting form:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const subjectOptions = [
    { value: 'general', label: 'Información general' },
    { value: 'support', label: 'Soporte técnico' },
    { value: 'sales', label: 'Ventas' },
    { value: 'partnership', label: 'Asociaciones' }
  ];

  return (
    <section id="contacto" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Contáctanos
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600"
          >
            ¿Tienes preguntas o necesitas más información? Estamos aquí para ayudarte.
          </motion.p>
        </div>

        <motion.form
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          noValidate
          className="max-w-xl mx-auto space-y-6"
        >
          <InputField
            name="name"
            label="Nombre completo"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.name}
            touched={touched.name}
            required
            placeholder="Tu nombre"
            labelClassName="text-gray-700"
          />

          <InputField
            name="email"
            label="Correo electrónico"
            type="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.email}
            touched={touched.email}
            required
            placeholder="correo@ejemplo.com"
            labelClassName="text-gray-700"
          />

          <InputField
            name="phone"
            label="Teléfono"
            type="tel"
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.phone}
            touched={touched.phone}
            placeholder="+1 (123) 456-7890"
            labelClassName="text-gray-700"
          />

          <SelectField
            name="subject"
            label="Asunto"
            value={values.subject}
            onChange={handleChange}
            onBlur={handleBlur}
            options={subjectOptions}
            error={errors.subject}
            touched={touched.subject}
            required
            labelClassName="text-gray-700"
          />

          <FormGroup
            label="Mensaje"
            htmlFor="message"
            error={errors.message}
            touched={touched.message}
            required
            labelClassName="text-gray-700"
          >
            <textarea
              id="message"
              name="message"
              value={values.message}
              onChange={handleChange}
              onBlur={handleBlur}
              rows="5"
              className={`w-full px-4 py-3 rounded-lg border ${
                touched.message && errors.message
                  ? 'border-red-500'
                  : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-[#CBDFF4] text-gray-900`}
              placeholder="¿En qué podemos ayudarte?"
            ></textarea>
          </FormGroup>

          <div className="text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-8 py-3 rounded-lg font-medium transition-all ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-[#090744] text-white hover:bg-[#0b0a5e]'
              }`}
            >
              {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
            </button>
            
            {submitSuccess && (
              <p className="text-green-600 mt-4">
                ¡Mensaje enviado con éxito! Te contactaremos pronto.
              </p>
            )}
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default ContactSection;
