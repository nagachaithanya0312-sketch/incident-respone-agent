import React, { useState, useEffect } from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { MetricCard } from '../components/ui/MetricCard';
import { GlassCard } from '../components/ui/GlassCard';
import { GradientButton } from '../components/ui/GradientButton';
import { StatusBadge } from '../components/ui/StatusBadge';
import { IncidentSeverityBadge } from '../components/ui/IncidentSeverityBadge';
import { 
  AlertTriangle, BrainCircuit, CheckCircle2, Clock, 
  BookOpen, Database, Plus, Search, Terminal,
  Activity, Server, Key, CreditCard, Search as SearchIcon, ShieldAlert, Rocket, Network
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { createIncident } from '../services/incidentService';

const LiveNetworkNode = ({ name, status, x, y, delay }) => {
  const statusColors = {
    healthy: 'border-emerald-500/50 text-emerald-400 bg-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.2)]',
    warning: 'border-amber-500/50 text-amber-400 bg-amber-500/10 shadow-[0_0_15px_rgba(245,158,11,0.2)]',
    critical: 'border-red-500/50 text-red-400 bg-red-500/10 shadow-[0_0_15px_rgba(239,68,68,0.4)] animate-pulse'
  };

  return (
    <div 
      className={`absolute flex flex-col items-center justify-center p-2 rounded-xl border ${statusColors[status]} backdrop-blur-sm transition-all duration-500 animate-float-slow`}
      style={{ top: `${y}%`, left: `${x}%`, animationDelay: `${delay}s`, transform: 'translate(-50%, -50%)' }}
    >
      <Server className="w-5 h-5 mb-1" />
      <span className="text-[10px] font-bold tracking-wider text-slate-200 whitespace-nowrap">{name}</span>
    </div>
  );
};

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  const initialEvents = [
    "> OpsMind AI initialized",
    "> Incident detector online",
    "> Listening for anomaly signals...",
    "> [14:32:08] Payment API latency increased",
    "> [14:32:14] Database connection threshold exceeded",
    "> [14:32:18] Incident INC-204 created",
    "> Loading incident context...",
    "> Searching historical memory...",
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    let currentEventIndex = 0;
    const eventTimer = setInterval(() => {
      if (currentEventIndex < initialEvents.length) {
        setEvents(prev => [...prev, initialEvents[currentEventIndex]]);
        currentEventIndex++;
      } else {
        clearInterval(eventTimer);
      }
    }, 1200);

    return () => {
      clearTimeout(timer);
      clearInterval(eventTimer);
    };
  }, []);

  const handleLaunchDemo = () => {
    const demoIncident = {
      service: 'Payment API',
      severity: 'CRITICAL',
      description: 'Payment API returning HTTP 500 errors. Database connection timeout. Connection pool utilization is 98%.',
      error: 'java.sql.SQLTransientConnectionException: HikariPool-1 - Connection is not available, request timed out after 30005ms.',
      logs: '[14:32:00] ERROR [PaymentController] Failed to process transaction: java.sql.SQLTransientConnectionException: Connection is not available\n[14:32:02] WARN  [HikariPool-1] Connection pool is full (100/100 active)\n[14:32:03] INFO  [MetricsRegistry] Active connections: 9942, Wait queue: 450\n[14:32:05] ERROR [GatewayFilter] Gateway timeout 504 for route payment-api',
      environment: 'Production'
    };
    const created = createIncident(demoIncident);
    navigate(`/incidents/${created.id}`);
  };

  const activeIncidents = [
    {
      id: "INC-204",
      service: "Payment Gateway",
      severity: "CRITICAL",
      status: "investigating",
      time: "12m ago",
      description: "Payment API latency increased beyond 2000ms SLA, affecting checkout."
    },
    {
      id: "INC-203",
      service: "Auth Service",
      severity: "HIGH",
      status: "identified",
      time: "45m ago",
      description: "Intermittent token validation failures in EU region."
    }
  ];

  const recentIncidents = [
    { time: "2h ago", service: "Search Index", severity: "MEDIUM", status: "resolved" },
    { time: "5h ago", service: "User Profile DB", severity: "HIGH", status: "resolved" },
    { time: "1d ago", service: "Notification Service", severity: "LOW", status: "resolved" },
  ];

  const systemHealth = [
    { name: "API Gateway", icon: Activity, status: "Healthy" },
    { name: "Core Database", icon: Database, status: "Warning" },
    { name: "Authentication", icon: Key, status: "Healthy" },
    { name: "Payment Service", icon: CreditCard, status: "Critical" },
    { name: "Search Engine", icon: SearchIcon, status: "Healthy" },
  ];

  if (loading) {
    return (
      <div className="space-y-6 pb-12 animate-in fade-in duration-500">
        <div className="flex justify-between items-center mb-8">
          <div className="space-y-2">
            <div className="h-8 w-64 bg-white/5 rounded-lg animate-pulse"></div>
            <div className="h-4 w-96 bg-white/5 rounded-lg animate-pulse"></div>
          </div>
          <div className="h-10 w-48 bg-white/5 rounded-lg animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-700 pb-12 relative z-10">
      
      {/* Header section with status indicator */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-3">
            Operations Command Center
          </h1>
          <p className="text-slate-400 mt-1 font-medium">
            Monitor, investigate and resolve incidents with AI-assisted intelligence.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <GradientButton variant="primary" onClick={handleLaunchDemo} className="flex items-center gap-2 font-bold px-6 shadow-[0_0_25px_rgba(34,211,238,0.4)] animate-pulse hover:animate-none">
            <Rocket className="w-5 h-5" /> Launch Demo Incident
          </GradientButton>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold text-emerald-400 tracking-widest uppercase">
              ALL SYSTEMS OPERATIONAL
            </span>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <MetricCard title="Active Incidents" value="2" icon={AlertTriangle} trend={-30} trendLabel="vs avg" color="red" />
        <MetricCard title="Critical Incidents" value="1" icon={ShieldAlert} trend={0} trendLabel="stable" color="red" />
        <MetricCard title="Resolved Today" value="14" icon={CheckCircle2} trend={12} trendLabel="vs yesterday" color="emerald" />
        <MetricCard title="Avg Resolution" value="18m" icon={Clock} trend={-15} trendLabel="faster" color="cyan" />
        <MetricCard title="Runbooks Executed" value="45" icon={BookOpen} trend={22} trendLabel="automated" color="blue" />
        <MetricCard title="Memory Reused" value="1,402" icon={BrainCircuit} trend={5} trendLabel="new insights" color="violet" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Live Operations Network */}
          <GlassCard className="p-0 overflow-hidden relative h-72 border-cyan-500/20">
             <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                <Network className="w-5 h-5 text-cyan-400" />
                <span className="text-sm font-bold tracking-widest uppercase text-white">Live Operations Network</span>
             </div>
             <div className="absolute inset-0 bg-[#030712] flex items-center justify-center">
                {/* SVG connection lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
                  <path d="M 20% 50% L 40% 30%" stroke="rgba(16,185,129,0.3)" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse" />
                  <path d="M 20% 50% L 40% 70%" stroke="rgba(16,185,129,0.3)" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse" />
                  <path d="M 40% 30% L 65% 50%" stroke="rgba(239,68,68,0.5)" strokeWidth="2" />
                  <path d="M 40% 70% L 65% 50%" stroke="rgba(245,158,11,0.5)" strokeWidth="2" />
                  <path d="M 65% 50% L 85% 50%" stroke="rgba(239,68,68,0.5)" strokeWidth="2" />
                </svg>
                {/* Nodes */}
                <div className="w-full h-full relative" style={{ zIndex: 2 }}>
                  <LiveNetworkNode name="API Gateway" status="healthy" x={20} y={50} delay={0} />
                  <LiveNetworkNode name="Auth Service" status="healthy" x={40} y={30} delay={0.5} />
                  <LiveNetworkNode name="Search Index" status="warning" x={40} y={70} delay={1} />
                  <LiveNetworkNode name="Payment API" status="critical" x={65} y={50} delay={1.5} />
                  <LiveNetworkNode name="Database" status="critical" x={85} y={50} delay={0.2} />
                </div>
             </div>
          </GlassCard>
          
          {/* Active Incidents */}
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                Active Incidents
              </h2>
              <Link to="/incidents" className="text-sm text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
                View All Directory →
              </Link>
            </div>
            
            <div className="space-y-4">
              {activeIncidents.length === 0 ? (
                <div className="text-center py-8 text-slate-500 border border-dashed border-white/10 rounded-lg">
                  <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-emerald-500/50" />
                  <p>No active incidents.</p>
                </div>
              ) : (
                activeIncidents.map(incident => (
                  <div key={incident.id} className="p-5 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-500/30 hover:bg-[#0B1120] transition-all group shadow-lg">
                    <div className="flex flex-col sm:flex-row justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-mono text-sm font-semibold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded">{incident.id}</span>
                          <IncidentSeverityBadge severity={incident.severity} />
                          <StatusBadge status={incident.status} />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">{incident.service}</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">{incident.description}</p>
                      </div>
                      <div className="flex flex-col items-end justify-between min-w-[120px]">
                        <span className="text-xs font-bold text-slate-500 flex items-center gap-1 uppercase tracking-wider">
                          <Clock className="w-3 h-3" /> {incident.time}
                        </span>
                        <GradientButton variant="outline" className="px-4 py-2 text-xs mt-3 sm:mt-0 opacity-0 group-hover:opacity-100 transition-opacity border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10">
                          Investigate
                        </GradientButton>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </GlassCard>

          {/* AI Insight */}
          <GlassCard className="p-6 border-violet-500/30 shadow-[0_0_30px_rgba(139,92,246,0.1)] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-violet-500/20 transition-all pointer-events-none"></div>
            <div className="relative z-10">
              <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
                <BrainCircuit className="w-6 h-6 text-violet-400" />
                AI Operations Insight
              </h2>
              
              <div className="bg-[#030712]/50 border border-violet-500/20 rounded-xl p-5 backdrop-blur-sm">
                <p className="text-lg text-white font-medium mb-4 leading-relaxed">
                  "3 recent incidents show patterns related to database connectivity."
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1.5">Affected Service</span>
                    <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                      <Database className="w-4 h-4 text-cyan-400" /> Core Database
                    </span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1.5">Related Incidents</span>
                    <span className="font-mono text-xs text-cyan-400 bg-cyan-400/10 px-2 py-1 rounded">INC-204, INC-198, INC-195</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1.5">Recommendation</span>
                    <span className="text-emerald-400 font-bold flex items-center gap-1.5 cursor-pointer hover:text-emerald-300 bg-emerald-500/10 px-2 py-1 rounded w-fit">
                      <BookOpen className="w-4 h-4" /> Connection Drain
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>

        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          
          {/* Quick Actions */}
          <GlassCard className="p-6">
            <h2 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              <GradientButton variant="primary" className="flex flex-col items-center justify-center gap-2 py-4 h-auto rounded-xl">
                <Plus className="w-5 h-5" />
                <span className="text-xs font-bold tracking-wide">Create Incident</span>
              </GradientButton>
              <GradientButton variant="secondary" className="flex flex-col items-center justify-center gap-2 py-4 h-auto rounded-xl">
                <Activity className="w-5 h-5" />
                <span className="text-xs font-bold tracking-wide">Analyze</span>
              </GradientButton>
              <GradientButton variant="outline" className="flex flex-col items-center justify-center gap-2 py-4 h-auto rounded-xl border-white/10 text-slate-300 hover:border-cyan-500/50 hover:text-cyan-400 hover:bg-cyan-500/5">
                <Search className="w-5 h-5" />
                <span className="text-xs font-bold tracking-wide">Search Memory</span>
              </GradientButton>
              <GradientButton variant="outline" className="flex flex-col items-center justify-center gap-2 py-4 h-auto rounded-xl border-white/10 text-slate-300 hover:border-cyan-500/50 hover:text-cyan-400 hover:bg-cyan-500/5">
                <BookOpen className="w-5 h-5" />
                <span className="text-xs font-bold tracking-wide">Runbooks</span>
              </GradientButton>
            </div>
          </GlassCard>

          {/* Live Event Feed (Terminal) */}
          <GlassCard className="p-0 overflow-hidden border-cyan-500/30 shadow-[0_0_20px_rgba(34,211,238,0.1)]">
            <div className="bg-[#030712] border-b border-white/10 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-slate-400 uppercase">
                <Terminal className="w-4 h-4 text-cyan-400" />
                opsmind_event_feed
              </div>
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></div>
              </div>
            </div>
            <div className="p-5 bg-[#030712] h-72 overflow-y-auto font-mono text-sm custom-scrollbar shadow-inner">
              {events.map((ev, i) => (
                <div key={i} className="mb-2.5 opacity-0 animate-in fade-in slide-in-from-bottom-2 duration-300" style={{ animationFillMode: 'forwards' }}>
                  <span className={ev && (ev.includes('ERROR') || ev.includes('threshold') || ev.includes('latency')) ? 'text-red-400' : 'text-slate-300'}>
                    {ev}
                  </span>
                </div>
              ))}
              <div className="flex items-center mt-2 text-cyan-500">
                <span className="mr-2">&gt;</span>
                <span className="w-2 h-4 bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]"></span>
              </div>
            </div>
          </GlassCard>
          
          {/* System Health */}
          <GlassCard className="p-6">
            <h2 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">System Health</h2>
            <div className="space-y-2">
              {systemHealth.map((sys, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-[#030712]/50 border border-white/5 hover:border-white/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`p-1.5 rounded-md ${
                      sys.status === 'Critical' ? 'bg-red-500/10 text-red-400 shadow-[0_0_10px_rgba(239,68,68,0.2)]' :
                      sys.status === 'Warning' ? 'bg-amber-500/10 text-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.2)]' :
                      'bg-emerald-500/10 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.2)]'
                    }`}>
                      <sys.icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-bold text-slate-200">{sys.name}</span>
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-widest ${
                      sys.status === 'Critical' ? 'text-red-400' :
                      sys.status === 'Warning' ? 'text-amber-400' :
                      'text-emerald-400'
                  }`}>
                    {sys.status}
                  </span>
                </div>
              ))}
            </div>
          </GlassCard>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
