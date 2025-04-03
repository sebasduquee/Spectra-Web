import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, MessageSquare, FileText, TrendingUp, 
  ArrowUpRight, ArrowDownRight, Clock, CheckCircle2,
  XCircle, AlertCircle
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import AdminLayout from '../components/layout/AdminLayout';

// Componente de tarjeta de estadísticas
const StatCard = ({ icon: Icon, label, value, trend }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white/5 rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-colors"
  >
    <div className="flex items-start justify-between">
      <div>
        <p className="text-white/60">{label}</p>
        <h3 className="text-2xl font-bold text-white mt-2">{value}</h3>
      </div>
      <div className="w-10 h-10 rounded-lg bg-[#CBDFF4]/10 flex items-center justify-center">
        <Icon className="w-5 h-5 text-[#CBDFF4]" />
      </div>
    </div>
    <div className="flex items-center mt-4">
      {trend > 0 ? (
        <ArrowUpRight className="w-4 h-4 text-green-400 mr-1" />
      ) : (
        <ArrowDownRight className="w-4 h-4 text-red-400 mr-1" />
      )}
      <p className={`text-sm ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
        {trend > 0 ? '+' : ''}{trend}% vs mes anterior
      </p>
    </div>
  </motion.div>
);

// Componente de actividad reciente
const ActivityItem = ({ module, action, user, time }) => (
  <div className="flex items-center justify-between py-4 border-b border-white/10 last:border-0">
    <div className="flex items-center space-x-4">
      <div className={`w-8 h-8 rounded-lg bg-${module.color} flex items-center justify-center`}>
        <module.icon className="w-4 h-4 text-white" />
      </div>
      <div>
        <p className="text-white text-sm">{action}</p>
        <p className="text-white/60 text-xs">{user}</p>
      </div>
    </div>
    <div className="flex items-center text-white/40 text-sm">
      <Clock className="w-4 h-4 mr-2" />
      {time}
    </div>
  </div>
);

// Componente de estado de agentes
const AgentStatus = ({ name, role, status, lastActive }) => (
  <div className="flex items-center justify-between py-3">
    <div className="flex items-center space-x-3">
      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
        <span className="text-white text-sm">{name.charAt(0)}</span>
      </div>
      <div>
        <p className="text-white text-sm font-medium">{name}</p>
        <p className="text-white/60 text-xs">{role}</p>
      </div>
    </div>
    <div className="flex items-center space-x-2">
      <span className={`w-2 h-2 rounded-full ${
        status === 'online' ? 'bg-green-400' :
        status === 'away' ? 'bg-yellow-400' :
        'bg-red-400'
      }`} />
      <span className="text-white/40 text-xs">{lastActive}</span>
    </div>
  </div>
);

const DashboardPage = () => {
  // Datos de ejemplo para las métricas
  const stats = [
    { icon: Users, label: 'Usuarios Activos', value: '2,543', trend: 12.5 },
    { icon: MessageSquare, label: 'Chats Activos', value: '1,826', trend: 8.2 },
    { icon: FileText, label: 'Documentos', value: '15,279', trend: -2.4 },
    { icon: TrendingUp, label: 'Tasa de Conversión', value: '3.2%', trend: 4.1 },
  ];

  // Datos de ejemplo para el gráfico
  const chartData = [
    { name: 'Ene', usuarios: 1500, interacciones: 2400 },
    { name: 'Feb', usuarios: 1800, interacciones: 3200 },
    { name: 'Mar', usuarios: 2200, interacciones: 3800 },
    { name: 'Abr', usuarios: 2400, interacciones: 4300 },
    { name: 'May', usuarios: 2600, interacciones: 4800 },
    { name: 'Jun', usuarios: 3100, interacciones: 5200 },
  ];

  // Datos de ejemplo para actividad reciente
  const recentActivity = [
    {
      module: { icon: MessageSquare, color: 'blue-500/20' },
      action: 'Nueva consulta legal',
      user: 'María González',
      time: 'Hace 5 min'
    },
    {
      module: { icon: FileText, color: 'purple-500/20' },
      action: 'Documento firmado',
      user: 'Juan Pérez',
      time: 'Hace 15 min'
    },
    {
      module: { icon: Users, color: 'green-500/20' },
      action: 'Nuevo registro',
      user: 'Ana Martínez',
      time: 'Hace 30 min'
    }
  ];

  // Datos de ejemplo para estado de agentes
  const agents = [
    { name: 'Carlos Ramírez', role: 'Asesor Legal', status: 'online', lastActive: 'Ahora' },
    { name: 'Laura González', role: 'Asesora Media', status: 'away', lastActive: 'Hace 5m' },
    { name: 'Daniel Torres', role: 'Soporte', status: 'offline', lastActive: 'Hace 30m' }
  ];

  return (
    <AdminLayout>
      {/* Encabezado */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-white/60">Bienvenido al panel de administración</p>
      </div>

      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Contenido principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gráfico principal */}
        <div className="lg:col-span-2 bg-white/5 rounded-xl p-6 border border-white/10 relative z-0">
          <h2 className="text-lg font-medium text-white mb-6">Actividad General</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="name" 
                  stroke="rgba(255,255,255,0.5)"
                  tick={{ fill: 'rgba(255,255,255,0.5)' }}
                />
                <YAxis 
                  stroke="rgba(255,255,255,0.5)"
                  tick={{ fill: 'rgba(255,255,255,0.5)' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '0.5rem'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="usuarios" 
                  stroke="#CBDFF4" 
                  strokeWidth={2}
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="interacciones" 
                  stroke="#A7BC94" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Estado de agentes */}
        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
          <h2 className="text-lg font-medium text-white mb-6">Estado de Agentes</h2>
          <div className="space-y-4">
            {agents.map((agent, index) => (
              <AgentStatus key={index} {...agent} />
            ))}
          </div>
        </div>

        {/* Actividad reciente */}
        <div className="lg:col-span-2 bg-white/5 rounded-xl p-6 border border-white/10">
          <h2 className="text-lg font-medium text-white mb-6">Actividad Reciente</h2>
          <div className="divide-y divide-white/10">
            {recentActivity.map((activity, index) => (
              <ActivityItem key={index} {...activity} />
            ))}
          </div>
        </div>

        {/* Resumen de Módulos */}
        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
          <h2 className="text-lg font-medium text-white mb-6">Resumen de Módulos</h2>
          <div className="space-y-4">
            {/* Concierge AI */}
            <div className="p-4 bg-white/5 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white text-sm">Concierge AI</span>
                <span className="text-[#CBDFF4] text-sm">42,891 tokens</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div 
                  className="bg-[#CBDFF4] h-full rounded-full" 
                  style={{ width: '85%' }}
                />
              </div>
              <div className="mt-1 text-white/60 text-xs">
                85% de tokens utilizados este mes
              </div>
            </div>

            {/* Módulo Legal */}
            <div className="p-4 bg-white/5 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white text-sm">Legal</span>
                <span className="text-[#A7BC94] text-sm">38 contratos</span>
              </div>
              <div className="flex items-center justify-between text-xs text-white/60">
                <span>28 firmados</span>
                <span>10 pendientes</span>
              </div>
            </div>

            {/* Módulo Media */}
            <div className="p-4 bg-white/5 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white text-sm">Engagement</span>
                <span className="text-[#E29471] text-sm">+12.5%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div 
                  className="bg-[#E29471] h-full rounded-full" 
                  style={{ width: '62%' }}
                />
              </div>
              <div className="mt-1 text-white/60 text-xs">
                62% de crecimiento mensual
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default DashboardPage;