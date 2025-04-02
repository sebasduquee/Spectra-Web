import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Send } from 'lucide-react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario
    console.log('Form submitted:', formData);
  };

  return (
    <section className="py-24 px-6" id="contactSection">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            ¿Listo para empezar?
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Contáctanos y descubre cómo podemos ayudarte a gestionar tu contenido digital
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Información de contacto */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
              <h3 className="text-2xl font-bold text-white mb-4">
                Conecta con nosotros
              </h3>
              <p className="text-white/70 mb-6">
                Estamos aquí para responder tus dudas y ayudarte a elegir el plan perfecto para ti.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-white/70">
                  <Mail className="w-5 h-5" />
                  <span>contacto@spectrum.com</span>
                </div>
                <div className="flex items-center gap-3 text-white/70">
                  <MessageSquare className="w-5 h-5" />
                  <span>Soporte 24/7</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Formulario */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Nombre completo"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#CBDFF4]/50"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#CBDFF4]/50"
                  required
                />
              </div>
              <div>
                <textarea
                  placeholder="Tu mensaje"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#CBDFF4]/50 h-32 resize-none"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#CBDFF4] text-[#090744] py-4 rounded-xl font-medium hover:bg-[#CBDFF4]/90 transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Enviar mensaje
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;