import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, User, Mail, Phone, Calendar,
  MapPin, Instagram, AtSign, Lock,
  CheckCircle
} from 'lucide-react';

const EditUserView = ({ isOpen, onClose, user, onSave, isCreating = false }) => {
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName1: user?.lastName1 || '',
    lastName2: user?.lastName2 || '',
    email: user?.email || '',
    phone: user?.phone || '',
    plan: user?.plan || 'Basic',
    idNumber: user?.idNumber || '',
    idType: user?.idType || 'CC',
    birthDate: user?.birthDate || '',
    birthPlace: user?.birthPlace || '',
    nationality: user?.nationality || '',
    maritalStatus: user?.maritalStatus || '',
    emergencyContact: {
      name: user?.emergencyContact?.name || '',
      phone: user?.emergencyContact?.phone || '',
      relationship: user?.emergencyContact?.relationship || ''
    },
    city: user?.city || '',
    country: user?.country || '',
    address: user?.address || '',
    instagram: user?.instagram || '',
    tiktok: user?.tiktok || '',
    twitch: user?.twitch || '',
    youtube: user?.youtube || ''
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const handleSave = () => {
    onSave(formData);
    setShowSuccess(true);
    setHasChanges(false);
    setTimeout(() => {
      setShowSuccess(false);
      onClose();
    }, 2000);
  };

  const handleClose = () => {
    if (hasChanges) {
      if (window.confirm('Hay cambios sin guardar. ¿Deseas cerrar de todas formas?')) {
        onClose();
      }
    } else {
      onClose();
    }
  };

  // Notificación de éxito
  const SuccessNotification = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed top-4 right-4 bg-green-500/90 text-white px-6 py-3 rounded-xl shadow-lg flex items-center space-x-2 z-[9999]"
    >
      <CheckCircle className="w-5 h-5" />
      <span>{isCreating ? 'Usuario creado correctamente' : 'Usuario actualizado correctamente'}</span>
    </motion.div>
  );

  return (
    <AnimatePresence>
      {showSuccess && <SuccessNotification />}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`absolute inset-0 bg-[#090744] ${isOpen ? 'block' : 'hidden'}`}
        >
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-4 bg-white/5">
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleClose}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    {isCreating ? 'Crear Nuevo Usuario' : 'Editar Usuario'}
                  </h2>
                  {!isCreating && <p className="text-sm text-white/60 mt-1">{user?.email}</p>}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-2 gap-6">
                  {/* Columna izquierda */}
                  <div className="space-y-6">
                    {/* Información Personal */}
                    <div className="bg-white/5 rounded-xl p-6">
                      <h3 className="text-[#CBDFF4] font-medium text-lg mb-6">Información Personal</h3>
                      <div className="space-y-6">
                        {/* Nombre y Apellidos */}
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <label className="block text-white/80 text-sm mb-2">Nombre</label>
                            <input
                              type="text"
                              value={formData.firstName}
                              onChange={(e) => {
                                setFormData({ ...formData, firstName: e.target.value });
                                setHasChanges(true);
                              }}
                              className="w-full bg-white/10 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20"
                              placeholder="Ana"
                            />
                          </div>
                          <div>
                            <label className="block text-white/80 text-sm mb-2">Primer Apellido</label>
                            <input
                              type="text"
                              value={formData.lastName1}
                              onChange={(e) => {
                                setFormData({ ...formData, lastName1: e.target.value });
                                setHasChanges(true);
                              }}
                              className="w-full bg-white/10 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20"
                              placeholder="Martínez"
                            />
                          </div>
                          <div>
                            <label className="block text-white/80 text-sm mb-2">Segundo Apellido</label>
                            <input
                              type="text"
                              value={formData.lastName2}
                              onChange={(e) => {
                                setFormData({ ...formData, lastName2: e.target.value });
                                setHasChanges(true);
                              }}
                              className="w-full bg-white/10 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20"
                              placeholder="García"
                            />
                          </div>
                        </div>

                        {/* Identificación */}
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-white/80 text-sm mb-2">Tipo de Identificación</label>
                            <select
                              value={formData.idType}
                              onChange={(e) => {
                                setFormData({ ...formData, idType: e.target.value });
                                setHasChanges(true);
                              }}
                              className="w-full bg-white/10 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20"
                            >
                              <option value="CC">Cédula de Ciudadanía</option>
                              <option value="CE">Cédula de Extranjería</option>
                              <option value="PA">Pasaporte</option>
                              <option value="TI">Tarjeta de Identidad</option>
                              <option value="RC">Registro Civil</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-white/80 text-sm mb-2">Número de Identificación</label>
                            <input
                              type="text"
                              value={formData.idNumber}
                              onChange={(e) => {
                                setFormData({ ...formData, idNumber: e.target.value });
                                setHasChanges(true);
                              }}
                              className="w-full bg-white/10 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20"
                              placeholder="1234567890"
                            />
                          </div>
                        </div>

                        {/* Información de Nacimiento y Estado Civil */}
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-white/80 text-sm mb-2">Lugar de Nacimiento</label>
                            <input
                              type="text"
                              value={formData.birthPlace}
                              onChange={(e) => {
                                setFormData({ ...formData, birthPlace: e.target.value });
                                setHasChanges(true);
                              }}
                              className="w-full bg-white/10 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20"
                              placeholder="Ciudad de nacimiento"
                            />
                          </div>
                          <div>
                            <label className="block text-white/80 text-sm mb-2">Nacionalidad</label>
                            <input
                              type="text"
                              value={formData.nationality}
                              onChange={(e) => {
                                setFormData({ ...formData, nationality: e.target.value });
                                setHasChanges(true);
                              }}
                              className="w-full bg-white/10 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20"
                              placeholder="Colombiana"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-white/80 text-sm mb-2">Estado Civil</label>
                          <select
                            value={formData.maritalStatus}
                            onChange={(e) => {
                              setFormData({ ...formData, maritalStatus: e.target.value });
                              setHasChanges(true);
                            }}
                            className="w-full bg-white/10 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20"
                          >
                            <option value="">Seleccione...</option>
                            <option value="soltero">Soltero/a</option>
                            <option value="casado">Casado/a</option>
                            <option value="divorciado">Divorciado/a</option>
                            <option value="viudo">Viudo/a</option>
                            <option value="unionLibre">Unión Libre</option>
                          </select>
                        </div>

                        {/* Email */}
                        <div>
                          <label className="block text-white/80 text-sm mb-2">Email</label>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => {
                              setFormData({ ...formData, email: e.target.value });
                              setHasChanges(true);
                            }}
                            className="w-full bg-white/10 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20"
                            placeholder="ana@example.com"
                          />
                        </div>

                        {/* Teléfono */}
                        <div>
                          <label className="block text-white/80 text-sm mb-2">Teléfono</label>
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => {
                              setFormData({ ...formData, phone: e.target.value });
                              setHasChanges(true);
                            }}
                            className="w-full bg-white/10 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20"
                            placeholder="+57 300 123 4567"
                          />
                        </div>

                        {/* Fecha de nacimiento */}
                        <div>
                          <label className="block text-white/80 text-sm mb-2">Fecha de nacimiento</label>
                          <input
                            type="date"
                            value={formData.birthDate}
                            onChange={(e) => {
                              setFormData({ ...formData, birthDate: e.target.value });
                              setHasChanges(true);
                            }}
                            className="w-full bg-white/10 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20"
                          />
                        </div>
                        {/* Contacto de Emergencia */}
                        <div className="space-y-4">
                          <h4 className="text-[#CBDFF4] font-medium">Contacto de Emergencia</h4>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-white/80 text-sm mb-2">Nombre Completo</label>
                              <input
                                type="text"
                                value={formData.emergencyContact.name}
                                onChange={(e) => {
                                  setFormData({
                                    ...formData,
                                    emergencyContact: {
                                      ...formData.emergencyContact,
                                      name: e.target.value
                                    }
                                  });
                                  setHasChanges(true);
                                }}
                                className="w-full bg-white/10 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20"
                                placeholder="Nombre del contacto"
                              />
                            </div>
                            <div>
                              <label className="block text-white/80 text-sm mb-2">Teléfono</label>
                              <input
                                type="tel"
                                value={formData.emergencyContact.phone}
                                onChange={(e) => {
                                  setFormData({
                                    ...formData,
                                    emergencyContact: {
                                      ...formData.emergencyContact,
                                      phone: e.target.value
                                    }
                                  });
                                  setHasChanges(true);
                                }}
                                className="w-full bg-white/10 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20"
                                placeholder="+57 300 123 4567"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-white/80 text-sm mb-2">Parentesco</label>
                            <input
                              type="text"
                              value={formData.emergencyContact.relationship}
                              onChange={(e) => {
                                setFormData({
                                  ...formData,
                                  emergencyContact: {
                                    ...formData.emergencyContact,
                                    relationship: e.target.value
                                  }
                                });
                                setHasChanges(true);
                              }}
                              className="w-full bg-white/10 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20"
                              placeholder="Ej: Padre, Madre, Hermano/a"
                            />
                          </div>
                        </div>
                        
                        {/* Plan - Solo lectura */}
                        <div>
                          <div className="flex items-center justify-between">
                            <label className="text-white/80 text-sm">Plan actual</label>
                            <span className="text-xs bg-[#CBDFF4]/20 text-[#CBDFF4] px-2 py-1 rounded-full">
                              {formData.plan}
                            </span>
                          </div>
                          <p className="text-sm text-white/40 mt-2">
                            Para cambiar de plan, edita los permisos del usuario en el menú anterior.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Columna derecha */}
                  <div className="space-y-6">
                    {/* Ubicación */}
                    <div className="bg-white/5 rounded-xl p-6">
                      <h3 className="text-[#CBDFF4] font-medium text-lg mb-6">Ubicación</h3>
                      <div className="space-y-6">
                        <div>
                          <label className="block text-white/80 text-sm mb-2">Ciudad</label>
                          <input
                            type="text"
                            value={formData.city}
                            onChange={(e) => {
                              setFormData({ ...formData, city: e.target.value });
                              setHasChanges(true);
                            }}
                            className="w-full bg-white/10 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20"
                            placeholder="Medellín"
                          />
                        </div>

                        <div>
                          <label className="block text-white/80 text-sm mb-2">País</label>
                          <input
                            type="text"
                            value={formData.country}
                            onChange={(e) => {
                              setFormData({ ...formData, country: e.target.value });
                              setHasChanges(true);
                            }}
                            className="w-full bg-white/10 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20"
                            placeholder="Colombia"
                          />
                        </div>

                        <div>
                          <label className="block text-white/80 text-sm mb-2">Dirección</label>
                          <textarea
                            value={formData.address}
                            onChange={(e) => {
                              setFormData({ ...formData, address: e.target.value });
                              setHasChanges(true);
                            }}
                            className="w-full bg-white/10 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20"
                            placeholder="Calle / Número / Apartamento"
                            rows="3"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Redes Sociales */}
                    <div className="bg-white/5 rounded-xl p-6">
                      <h3 className="text-[#CBDFF4] font-medium text-lg mb-6">Redes Sociales</h3>
                      <div className="space-y-6">
                        <div>
                          <label className="block text-white/80 text-sm mb-2">Instagram</label>
                          <input
                            type="text"
                            value={formData.instagram}
                            onChange={(e) => {
                              setFormData({ ...formData, instagram: e.target.value });
                              setHasChanges(true);
                            }}
                            className="w-full bg-white/10 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20"
                            placeholder="@username"
                          />
                        </div>

                        <div>
                          <label className="block text-white/80 text-sm mb-2">TikTok</label>
                          <input
                            type="text"
                            value={formData.tiktok}
                            onChange={(e) => {
                              setFormData({ ...formData, tiktok: e.target.value });
                              setHasChanges(true);
                            }}
                            className="w-full bg-white/10 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20"
                            placeholder="@username"
                          />
                        </div>

                        <div>
                          <label className="block text-white/80 text-sm mb-2">Twitch</label>
                          <input
                            type="text"
                            value={formData.twitch}
                            onChange={(e) => {
                              setFormData({ ...formData, twitch: e.target.value });
                              setHasChanges(true);
                            }}
                            className="w-full bg-white/10 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20"
                            placeholder="@username"
                          />
                        </div>

                        <div>
                          <label className="block text-white/80 text-sm mb-2">YouTube</label>
                          <input
                            type="text"
                            value={formData.youtube}
                            onChange={(e) => {
                              setFormData({ ...formData, youtube: e.target.value });
                              setHasChanges(true);
                            }}
                            className="w-full bg-white/10 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20"
                            placeholder="@username"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center gap-4 px-6 py-4 bg-white/5 border-t border-white/10">
              <div className="text-sm text-white/60">
                Los cambios se guardarán automáticamente
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={handleClose}
                  className="px-3 py-1 text-white hover:bg-white/10 rounded-xl transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  disabled={!hasChanges}
                  className="px-3 py-1 bg-[#CBDFF4] text-[#090744] rounded-xl font-small hover:bg-[#CBDFF4]/90 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <CheckCircle className="w-4 h-4" />
                  {isCreating ? 'Crear Usuario' : (hasChanges ? 'Guardar Cambios' : 'Sin Cambios')}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EditUserView;