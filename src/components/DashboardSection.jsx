import React, { useState } from 'react';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { 
  Activity, 
  Wind, 
  ShieldCheck, 
  Award, 
  Zap, 
  Sparkles, 
  CheckCircle2, 
  FileText, 
  RefreshCw,
  TrendingUp,
  Cpu,
  Layers,
  Calendar,
  CreditCard
} from 'lucide-react';
import { playClickSound, playSuccessChime } from '../utils/audio';

// Sample 24h respiratory volume data
const respiratoryData = [
  { hour: '00h', volume: 420, premiumRate: 98 },
  { hour: '04h', volume: 380, premiumRate: 99 },
  { hour: '08h', volume: 740, premiumRate: 97 },
  { hour: '12h', volume: 890, premiumRate: 100 },
  { hour: '16h', volume: 820, premiumRate: 99 },
  { hour: '20h', volume: 680, premiumRate: 98 },
  { hour: 'Agora', volume: 910, premiumRate: 100 },
];

const gasBreakdown = [
  { name: 'Nitrogênio Gourmet', value: 78, color: '#0ea5e9' },
  { name: 'Oxigênio 8K', value: 21, color: '#38bdf8' },
  { name: 'Argônio de Grife', value: 0.9, color: '#f59e0b' },
  { name: 'Pureza Psicológica', value: 0.1, color: '#10b981' },
];

export default function DashboardSection({ 
  state, 
  onToggleTurbo, 
  onOpenCertificate, 
  onOpenCheckout,
  onAddManualBreath,
  isDarkMode 
}) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'analytics' | 'contract'
  const { user, subscription, stats } = state;

  return (
    <section id="dashboard" className="py-20 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800 text-xs font-semibold mb-3">
              <Cpu className="w-3.5 h-3.5" />
              <span>Painel do Assinante • Telemetria Pulmonar</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Dashboard de Inalação AIR+
            </h2>
            <p className="mt-2 text-base text-slate-600 dark:text-slate-400">
              Acompanhe suas métricas fisiológicas comercializadas em tempo real.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                playClickSound();
                onOpenCertificate();
              }}
              className="px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-brand-400 text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-sm transition-all"
            >
              <Award className="w-4 h-4 text-amber-500" />
              <span>Gerar Certificado de Respirador</span>
            </button>

            <button
              onClick={() => {
                playSuccessChime();
                onToggleTurbo();
              }}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all shadow-md ${
                subscription.turboEnabled
                  ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-amber-500/25 ring-2 ring-amber-300'
                  : 'bg-gradient-to-r from-brand-600 to-sky-500 hover:from-brand-500 hover:to-sky-400 text-white shadow-brand-500/25'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>{subscription.turboEnabled ? 'Respiração Turbo: ATIVADA' : 'Ativar Respiração Premium'}</span>
            </button>
          </div>
        </div>

        {/* Top 4 KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          
          {/* Card 1: Total Breaths */}
          <div className="glass-panel rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider">Respirações Simuladas</span>
              <Activity className="w-5 h-5 text-brand-500" />
            </div>
            <div className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono">
              {stats.respirationsCount.toLocaleString('pt-BR')}
            </div>
            <div className="mt-3 flex items-center justify-between text-xs">
              <span className="text-emerald-500 font-semibold flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" /> +16 / min
              </span>
              <button 
                onClick={onAddManualBreath}
                className="text-brand-600 dark:text-brand-400 hover:underline font-medium"
              >
                +1 Inspiração
              </button>
            </div>
          </div>

          {/* Card 2: Liters of Air */}
          <div className="glass-panel rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider">Litros Consumidos</span>
              <Wind className="w-5 h-5 text-sky-400" />
            </div>
            <div className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono">
              {stats.litersConsumed.toLocaleString('pt-BR')} L
            </div>
            <div className="mt-3 text-xs text-slate-500 dark:text-slate-400">
              Equivalente a <strong className="text-slate-800 dark:text-slate-200">14.2 cilindros virtuais</strong>
            </div>
          </div>

          {/* Card 3: Air Quality Index */}
          <div className="glass-panel rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider">Qualidade do Ar Premium</span>
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
            </div>
            <div className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono">
              {subscription.qualityRating || '99.98%'}
            </div>
            <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>CO2 Filtrado Psicologicamente</span>
            </div>
          </div>

          {/* Card 4: Subscription Status */}
          <div className="glass-panel rounded-2xl p-6 border border-brand-200 dark:border-brand-900/60 bg-brand-50/40 dark:bg-brand-950/20">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider">Status da Assinatura</span>
              <CreditCard className="w-5 h-5 text-brand-600 dark:text-brand-400" />
            </div>
            <div className="text-2xl font-black text-brand-700 dark:text-brand-300">
              {subscription.planName}
            </div>
            <div className="mt-3 flex items-center justify-between text-xs">
              <span className="text-slate-500 dark:text-slate-400">
                R$ {subscription.price}/mês
              </span>
              <button
                onClick={() => {
                  playClickSound();
                  onOpenCheckout();
                }}
                className="text-brand-600 dark:text-brand-400 hover:underline font-semibold"
              >
                Mudar Plano
              </button>
            </div>
          </div>

        </div>

        {/* Charts & Gas Composition Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          
          {/* Main Chart: Volume Over Time */}
          <div className="lg:col-span-2 glass-panel rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Desempenho Respiratório (Últimas 24h)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Volume de oxigênio de grife processado pelos seus pulmões (em mL/h)
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 text-xs font-medium text-brand-600 dark:text-brand-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-500" /> Ar Premium
                </span>
              </div>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={respiratoryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#1e293b' : '#e2e8f0'} />
                  <XAxis 
                    dataKey="hour" 
                    stroke={isDarkMode ? '#64748b' : '#94a3b8'} 
                    fontSize={12} 
                    tickLine={false}
                  />
                  <YAxis 
                    stroke={isDarkMode ? '#64748b' : '#94a3b8'} 
                    fontSize={12} 
                    tickLine={false}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: isDarkMode ? '#0f172a' : '#ffffff',
                      borderColor: isDarkMode ? '#1e293b' : '#e2e8f0',
                      borderRadius: '12px',
                      color: isDarkMode ? '#f8fafc' : '#0f172a',
                      fontSize: '12px'
                    }}
                    formatter={(value) => [`${value} mL`, 'Volume Consumido']}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="volume" 
                    stroke="#0ea5e9" 
                    strokeWidth={3} 
                    fillOpacity={1} 
                    fill="url(#colorVolume)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Side Chart: Atmospheric Composition */}
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                Composição do Seu Ar
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                Fórmula gasosa certificada pelo selo AIR+
              </p>

              <div className="h-48 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={gasBreakdown}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={75}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {gasBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`${value}%`, 'Proporção']}
                      contentStyle={{
                        backgroundColor: isDarkMode ? '#0f172a' : '#ffffff',
                        borderColor: isDarkMode ? '#1e293b' : '#e2e8f0',
                        borderRadius: '12px',
                        fontSize: '12px'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="space-y-2 mt-4 pt-4 border-t border-slate-200/60 dark:border-slate-800">
              {gasBreakdown.map((item, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span>{item.name}</span>
                  </div>
                  <span className="font-mono font-semibold text-slate-900 dark:text-white">
                    {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Disclaimer Banner */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center">
          <p className="text-xs text-amber-800 dark:text-amber-300">
            <strong>Aviso de Telemetria:</strong> Todos os dados de litros consumidos, pureza e vazão alveolar são simulações humorísticas destinadas a entreter. Seus pulmões continuam funcionando por biologia orgânica pura e não cobram fatura no fim do mês.
          </p>
        </div>

      </div>
    </section>
  );
}
