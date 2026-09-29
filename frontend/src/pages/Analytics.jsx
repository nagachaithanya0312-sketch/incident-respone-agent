import React, { useState, useEffect } from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { GlassCard } from '../components/ui/GlassCard';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { BrainCircuit, TrendingUp, AlertTriangle, Clock, Target, CheckCircle2, Search, Zap } from 'lucide-react';
import { getIncidents } from '../services/incidentService';
import { getIncidentMemory } from '../services/incidentMemoryService';

// ... (Rest of DEMO DATA is unchanged)
const incidentsOverTime = [
  { date: 'Mon', total: 12, critical: 2 },
  { date: 'Tue', total: 18, critical: 3 },
  { date: 'Wed', total: 14, critical: 1 },
  { date: 'Thu', total: 25, critical: 5 },
  { date: 'Fri', total: 16, critical: 2 },
  { date: 'Sat', total: 8, critical: 0 },
  { date: 'Sun', total: 10, critical: 1 },
];

const incidentsBySeverity = [
  { name: 'Critical', value: 18, color: '#f87171' },
  { name: 'High', value: 34, color: '#fbbf24' },
  { name: 'Medium', value: 65, color: '#60a5fa' },
  { name: 'Low', value: 25, color: '#94a3b8' },
];

const incidentsByService = [
  { service: 'Payment API', incidents: 42 },
  { service: 'Database', incidents: 38 },
  { service: 'Auth Service', incidents: 24 },
  { service: 'Search Index', incidents: 18 },
  { service: 'Frontend', incidents: 20 },
];

const mttrOverTime = [
  { month: 'Jan', mttr: 45 },
  { month: 'Feb', mttr: 42 },
  { month: 'Mar', mttr: 38 },
  { month: 'Apr', mttr: 31 },
  { month: 'May', mttr: 26 },
  { month: 'Jun', mttr: 22 },
];

const runbookUsage = [
  { runbook: 'DB-RECOVERY-01', count: 42 },
  { runbook: 'API-RESTART-01', count: 28 },
  { runbook: 'HIGH-CPU-01', count: 18 },
  { runbook: 'REDIS-REC-01', count: 12 },
  { runbook: 'FE-SCALE-02', count: 8 },
];

const runbookSuccess = [
  { name: 'Successful', value: 94, color: '#34d399' },
  { name: 'Failed/Escalated', value: 14, color: '#f87171' },
];

const rootCauses = [
  { name: 'Config Error', value: 35, color: '#a78bfa' },
  { name: 'Resource Exhaustion', value: 42, color: '#f472b6' },
  { name: 'Code Bug', value: 25, color: '#38bdf8' },
  { name: 'Network Issue', value: 18, color: '#fbbf24' },
  { name: 'Third Party API', value: 22, color: '#94a3b8' },
];

const knowledgeReuse = [
  { week: 'W1', manual: 15, aiAssisted: 5 },
  { week: 'W2', manual: 12, aiAssisted: 12 },
  { week: 'W3', manual: 10, aiAssisted: 18 },
  { week: 'W4', manual: 5, aiAssisted: 25 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#10172A] border border-cyan-500/30 p-3 rounded-lg shadow-[0_0_15px_rgba(34,211,238,0.2)] text-sm">
        <p className="font-bold text-slate-200 mb-1">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const Analytics = () => {
  const [dateFilter, setDateFilter] = useState('30 Days');
  const [dynamicKpis, setDynamicKpis] = useState([]);

  useEffect(() => {
    // Merge demo data with actual local incidents to show dynamic updates
    const localIncidents = getIncidents();
    const memory = getIncidentMemory();
    
    // Calculate totals (142 is demo base)
    const totalLocal = localIncidents.length - 2; // base 2 in default array
    const totalIncidents = 142 + totalLocal;
    const criticalIncidents = 14 + localIncidents.filter(i => i.severity === 'CRITICAL').length - 1; // Base 1
    const resolvedIncidents = 139 + localIncidents.filter(i => i.status === 'resolved' || i.status === 'closed').length;
    const successfulRunbooks = 94 + (memory.length - 4); // 4 base memory items, added ones are simulated runbook successes

    setDynamicKpis([
      { title: 'Total Incidents', value: totalIncidents.toString(), icon: Target, color: 'text-blue-400', border: 'border-blue-500/20' },
      { title: 'Critical Incidents', value: criticalIncidents.toString(), icon: AlertTriangle, color: 'text-red-400', border: 'border-red-500/20' },
      { title: 'Average MTTR', value: '22m 14s', icon: Clock, color: 'text-amber-400', border: 'border-amber-500/20' },
      { title: 'Resolved Incidents', value: resolvedIncidents.toString(), icon: CheckCircle2, color: 'text-emerald-400', border: 'border-emerald-500/20' },
      { title: 'Successful Runbooks', value: successfulRunbooks.toString(), icon: Zap, color: 'text-cyan-400', border: 'border-cyan-500/20' },
      { title: 'Knowledge Reuse', value: '78%', icon: BrainCircuit, color: 'text-violet-400', border: 'border-violet-500/20' },
    ]);
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in duration-700 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <PageHeader 
          title="System Analytics" 
          description="Identify patterns, measure performance, and track AI impact. (Demo Data)"
        />
        
        <div className="flex bg-white/5 border border-white/10 rounded-lg overflow-hidden">
          {['7 Days', '30 Days', '90 Days', 'All Time'].map(filter => (
            <button 
              key={filter}
              onClick={() => setDateFilter(filter)}
              className={`px-4 py-2 text-sm font-medium transition-colors ${dateFilter === filter ? 'bg-cyan-500/20 text-cyan-400' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'}`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {dynamicKpis.map((kpi, i) => (
          <GlassCard key={i} className={`p-4 border ${kpi.border} flex flex-col items-center justify-center text-center group hover:bg-white/5 transition-colors`}>
            <kpi.icon className={`w-6 h-6 ${kpi.color} mb-2 group-hover:scale-110 transition-transform`} />
            <div className="text-2xl font-bold text-white mb-1 font-mono">{kpi.value}</div>
            <div className="text-xs text-slate-400">{kpi.title}</div>
          </GlassCard>
        ))}
      </div>

      {/* AI Insights Banner */}
      <GlassCard className="p-6 border-violet-500/30 bg-violet-500/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl"></div>
        <h3 className="text-lg font-bold text-violet-400 mb-4 flex items-center gap-2">
          <BrainCircuit className="w-5 h-5" /> AI Knowledge Insights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
          <div className="flex items-start gap-3 bg-[#050816]/50 p-4 rounded-lg border border-violet-500/20">
            <TrendingUp className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <p className="text-sm text-slate-300">
              <span className="font-semibold text-white">Database connection pool exhaustion</span> is the leading root cause. Implementing dynamic connection pooling could reduce critical incidents by ~25%.
            </p>
          </div>
          <div className="flex items-start gap-3 bg-[#050816]/50 p-4 rounded-lg border border-violet-500/20">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <p className="text-sm text-slate-300">
              Runbook <span className="font-mono text-cyan-400">DB-RECOVERY-01</span> was executed 42 times this period with a 100% success rate, significantly driving down MTTR.
            </p>
          </div>
        </div>
      </GlassCard>

      {/* Charts Grid - Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Incidents Over Time */}
        <GlassCard className="p-6 h-[350px] flex flex-col">
          <h3 className="text-sm font-semibold text-white mb-4">Incidents Over Time</h3>
          <div className="flex-1 min-h-0 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={incidentsOverTime} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorCritical" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f87171" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f87171" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="date" stroke="#ffffff50" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#ffffff50" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                <Area type="monotone" dataKey="total" name="Total Incidents" stroke="#38bdf8" fillOpacity={1} fill="url(#colorTotal)" />
                <Area type="monotone" dataKey="critical" name="Critical Incidents" stroke="#f87171" fillOpacity={1} fill="url(#colorCritical)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Incidents by Service */}
        <GlassCard className="p-6 h-[350px] flex flex-col">
          <h3 className="text-sm font-semibold text-white mb-4">Incidents by Service</h3>
          <div className="flex-1 min-h-0 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={incidentsByService} layout="vertical" margin={{ top: 0, right: 20, left: 20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" horizontal={true} vertical={false} />
                <XAxis type="number" stroke="#ffffff50" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis dataKey="service" type="category" stroke="#ffffff80" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: '#ffffff05' }} />
                <Bar dataKey="incidents" name="Incidents" fill="#8b5cf6" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>

      {/* Charts Grid - Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Incidents by Severity */}
        <GlassCard className="p-6 h-[300px] flex flex-col">
          <h3 className="text-sm font-semibold text-white mb-4">Incidents by Severity</h3>
          <div className="flex-1 min-h-0 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={incidentsBySeverity}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {incidentsBySeverity.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Root Cause Categories */}
        <GlassCard className="p-6 h-[300px] flex flex-col">
          <h3 className="text-sm font-semibold text-white mb-4">Root Cause Categories</h3>
          <div className="flex-1 min-h-0 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={rootCauses}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  stroke="#050816"
                  strokeWidth={2}
                >
                  {rootCauses.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Runbook Success Rate */}
        <GlassCard className="p-6 h-[300px] flex flex-col">
          <h3 className="text-sm font-semibold text-white mb-4">Runbook Success Rate</h3>
          <div className="flex-1 min-h-0 w-full flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={runbookSuccess}
                  cx="50%"
                  cy="50%"
                  startAngle={180}
                  endAngle={0}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={0}
                  dataKey="value"
                  stroke="none"
                >
                  {runbookSuccess.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute top-[65%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
               <div className="text-3xl font-bold font-mono text-emerald-400">87%</div>
               <div className="text-xs text-slate-400">Success Rate</div>
            </div>
          </div>
        </GlassCard>

      </div>

      {/* Charts Grid - Row 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Knowledge Reuse Rate */}
        <GlassCard className="p-6 h-[350px] flex flex-col">
          <h3 className="text-sm font-semibold text-white mb-4">Knowledge Reuse (Manual vs AI)</h3>
          <div className="flex-1 min-h-0 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={knowledgeReuse} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="week" stroke="#ffffff50" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#ffffff50" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: '#ffffff05' }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                <Bar dataKey="manual" name="Manual Resolution" stackId="a" fill="#64748b" radius={[0, 0, 4, 4]} barSize={30} />
                <Bar dataKey="aiAssisted" name="AI-Assisted Resolution" stackId="a" fill="#2dd4bf" radius={[4, 4, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Average MTTR */}
        <GlassCard className="p-6 h-[350px] flex flex-col border-emerald-500/20">
          <h3 className="text-sm font-semibold text-white mb-4 flex justify-between">
            <span>Average Resolution Time (MTTR)</span>
            <span className="text-emerald-400 flex items-center gap-1 text-xs"><TrendingUp className="w-3 h-3" /> Down 42%</span>
          </h3>
          <div className="flex-1 min-h-0 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mttrOverTime} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="month" stroke="#ffffff50" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#ffffff50" fontSize={12} tickLine={false} axisLine={false} unit="m" />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="mttr" name="MTTR (minutes)" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

      </div>
    </div>
  );
};

export default Analytics;
