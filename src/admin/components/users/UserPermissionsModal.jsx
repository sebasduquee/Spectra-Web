import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Shield, CheckCircle, AlertCircle, Clock, 
  History, Info, Check // Eliminado 'Preset'
} from 'lucide-react';

// Componente Tooltip
const Tooltip = ({ content, children }) => (
  <div className="group relative inline-block">
    {children}
    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-3 py-2 text-sm text-white bg-black/90 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
      {content}
      <div className="absolute left-1/2 -translate-x-1/2 top-full -mt-2 border-4 border-transparent border-t-black/90" />
    </div>
  </div>
);

// Componente de Item de Historial
const HistoryItem = ({ date, user, changes }) => (
  <div className="flex items-start space-x-3 p-4 border-b border-white/5 last:border-0">
    <Clock className="w-4 h-4 text-white/40 mt-1 flex-shrink-0" />
    <div className="flex-1">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm text-white/80">{user}</span>
        <span className="text-xs text-white/40">{date}</span>
      </div>
      <div className="space-y-1">
        {changes.map((change, index) => (
          <div key={index} className="text-xs text-white/60 flex items-center space-x-2">
            <span className={change.type === 'enabled' ? 'text-green-400' : 'text-red-400'}>
              {change.type === 'enabled' ? 'Activó' : 'Desactivó'}
            </span>
            <span>{change.permission}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Componente de Preset de Plan
const PlanPreset = ({ name, description, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full p-4 rounded-xl border transition-all ${
      isActive 
        ? 'border-[#CBDFF4] bg-[#CBDFF4]/5' 
        : 'border-white/10 hover:border-white/20'
    }`}
  >
    <div className="flex items-center justify-between mb-2">
      <h4 className="text-white font-medium">{name}</h4>
      {isActive && <Check className="w-4 h-4 text-[#CBDFF4]" />}
    </div>
    <p className="text-white/60 text-sm text-left">{description}</p>
  </button>
);

// Componente PermissionItem mejorado
const PermissionItem = ({ label, description, isEnabled, onChange, tooltip }) => (
  <div className="flex items-center justify-between py-4 border-b border-white/5 last:border-0 group">
    <div className="flex-1 pr-8">
      <div className="flex items-center space-x-2 mb-0.5">
        <h4 className="text-white text-base font-medium">{label}</h4>
        {tooltip && (
          <Tooltip content={tooltip}>
            <Info className="w-4 h-4 text-white/40 hover:text-white/60 cursor-help" />
          </Tooltip>
        )}
      </div>
      <p className="text-white/60 text-sm">{description}</p>
    </div>
    <div className="flex items-center">
      <button
        onClick={onChange}
        className={`w-12 h-6 rounded-full relative flex items-center transition-colors ${
          isEnabled ? 'bg-[#CBDFF4]' : 'bg-white/10'
        } group-hover:ring-2 group-hover:ring-white/10`}
      >
        <span className={`absolute left-0.5 w-5 h-5 rounded-full shadow-sm transition-transform duration-200 ease-in-out ${
          isEnabled ? 'translate-x-6 bg-[#090744]' : 'translate-x-0.5 bg-white'
        }`} />
      </button>
    </div>
  </div>
);

// Componente Modal Principal
const UserPermissionsModal = ({ isOpen, onClose, user, onSave }) => {
  // Estados
  const [permissions, setPermissions] = useState({
    canAccessAI: true,
    canAccessAccounting: true,
    canAccessLegal: false,
    canAccessInvestments: false,
    canAccessMedia: false,
    isAdmin: false
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [currentPlan, setCurrentPlan] = useState(null);

  // Definición de planes preset
  const plans = {
    basic: {
      name: 'Plan Básico',
      description: 'Acceso a Concierge AI y Contabilidad básica',
      permissions: {
        canAccessAI: true,
        canAccessAccounting: true,
        canAccessLegal: false,
        canAccessInvestments: false,
        canAccessMedia: false,
        isAdmin: false
      }
    },
    silver: {
      name: 'Plan Silver',
      description: 'Añade acceso a módulo legal',
      permissions: {
        canAccessAI: true,
        canAccessAccounting: true,
        canAccessLegal: true,
        canAccessInvestments: false,
        canAccessMedia: false,
        isAdmin: false
      }
    },
    gold: {
      name: 'Plan Gold',
      description: 'Incluye módulo de inversiones',
      permissions: {
        canAccessAI: true,
        canAccessAccounting: true,
        canAccessLegal: true,
        canAccessInvestments: true,
        canAccessMedia: false,
        isAdmin: false
      }
    },
    diamond: {
      name: 'Plan Diamond',
      description: 'Acceso completo a todos los módulos',
      permissions: {
        canAccessAI: true,
        canAccessAccounting: true,
        canAccessLegal: true,
        canAccessInvestments: true,
        canAccessMedia: true,
        isAdmin: false
      }
    }
  };

  // Datos de ejemplo para el historial
  const historyData = [
    {
      date: 'Hace 2 horas',
      user: 'Admin User',
      changes: [
        { type: 'enabled', permission: 'Módulo Legal' },
        { type: 'disabled', permission: 'Acceso Administrativo' }
      ]
    },
    {
      date: 'Ayer, 15:30',
      user: 'System',
      changes: [
        { type: 'enabled', permission: 'Concierge AI' },
        { type: 'enabled', permission: 'Contabilidad' }
      ]
    }
  ];

  // Tooltips para cada permiso
  const permissionTooltips = {
    canAccessAI: 'Acceso al asistente virtual 24/7 con límite de tokens según plan',
    canAccessAccounting: 'Gestión financiera, declaraciones y documentos contables',
    canAccessLegal: 'Contratos, documentos legales y asesoría jurídica',
    canAccessInvestments: 'Gestión de portafolio y asesoría financiera',
    canAccessMedia: 'Estrategia de contenido y análisis de audiencia',
    isAdmin: 'Acceso total a todas las funcionalidades y configuraciones'
  };

  // Efecto para detectar cambios
  useEffect(() => {
    setHasChanges(true);
  }, [permissions]);

  const handleTogglePermission = (key) => {
    setPermissions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleApplyPlan = (planKey) => {
    setPermissions(plans[planKey].permissions);
    setCurrentPlan(planKey);
  };

  const handleSave = () => {
    onSave(permissions);
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
      <span>Permisos actualizados correctamente</span>
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
                  <h2 className="text-xl font-semibold text-white">Gestión de Permisos</h2>
                  <p className="text-sm text-white/60 mt-1">
                    {user?.name} ({user?.email})
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  title="Historial de cambios"
                >
                  <History className="w-5 h-5 text-white/60" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-hidden">
              <div className="h-full flex divide-x divide-white/10">
                {/* Panel Principal */}
                <div className="flex-1 overflow-y-auto p-6">
                  {/* Presets de Planes */}
                  <div className="max-w-4xl mx-auto">
                    <h3 className="text-sm font-medium text-white/60 mb-4">Planes Predefinidos</h3>
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      {Object.entries(plans).map(([key, plan]) => (
                        <PlanPreset
                          key={key}
                          name={plan.name}
                          description={plan.description}
                          isActive={currentPlan === key}
                          onClick={() => handleApplyPlan(key)}
                        />
                      ))}
                    </div>

                    {/* Lista de Permisos */}
                    <div className="bg-white/5 rounded-xl p-6">
                      <div className="mb-6">
                        <h3 className="text-[#CBDFF4] font-medium text-lg mb-2">Acceso a Módulos</h3>
                        <p className="text-white/60">
                          Configura los módulos a los que el usuario tendrá acceso.
                        </p>
                      </div>

                      <div className="space-y-6">
                        <PermissionItem
                          label="Concierge AI"
                          description="Acceso al asistente AI y todas sus funcionalidades"
                          isEnabled={permissions.canAccessAI}
                          onChange={() => handleTogglePermission('canAccessAI')}
                          tooltip={permissionTooltips.canAccessAI}
                        />

                        <PermissionItem
                          label="Contabilidad"
                          description="Acceso al módulo de contabilidad y gestión financiera"
                          isEnabled={permissions.canAccessAccounting}
                          onChange={() => handleTogglePermission('canAccessAccounting')}
                          tooltip={permissionTooltips.canAccessAccounting}
                        />

                        <PermissionItem
                          label="Legal"
                          description="Acceso al módulo legal y gestión de contratos"
                          isEnabled={permissions.canAccessLegal}
                          onChange={() => handleTogglePermission('canAccessLegal')}
                          tooltip={permissionTooltips.canAccessLegal}
                        />

                        <PermissionItem
                          label="Inversiones"
                          description="Acceso al módulo de inversiones y gestión de portafolio"
                          isEnabled={permissions.canAccessInvestments}
                          onChange={() => handleTogglePermission('canAccessInvestments')}
                          tooltip={permissionTooltips.canAccessInvestments}
                        />

                        <PermissionItem
                          label="Media"
                          description="Acceso al módulo de media y estrategia de contenido"
                          isEnabled={permissions.canAccessMedia}
                          onChange={() => handleTogglePermission('canAccessMedia')}
                          tooltip={permissionTooltips.canAccessMedia}
                        />

                        <div className="border-t border-white/10 mt-6 pt-6">
                          <PermissionItem
                            label="Acceso Administrativo"
                            description="Otorga permisos administrativos completos al usuario"
                            isEnabled={permissions.isAdmin}
                            onChange={() => handleTogglePermission('isAdmin')}
                            tooltip={permissionTooltips.isAdmin}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Panel de Historial */}
                {showHistory && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="w-80 overflow-y-auto bg-white/5"
                  >
                    <div className="p-6">
                      <h3 className="text-sm font-medium text-white/60 mb-4 flex items-center space-x-2">
                        <History className="w-4 h-4" />
                        <span>Historial de Cambios</span>
                      </h3>
                      <div className="space-y-1">
                        {historyData.map((item, index) => (
                          <HistoryItem
                            key={index}
                            date={item.date}
                            user={item.user}
                            changes={item.changes}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-4 p-3 pr-6 bg-white/5">
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
                {hasChanges ? 'Guardar Permisos' : 'Sin Cambios'}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UserPermissionsModal;