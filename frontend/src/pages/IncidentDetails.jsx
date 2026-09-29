import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageHeader } from '../components/ui/PageHeader';
import { GlassCard } from '../components/ui/GlassCard';
import { StatusBadge } from '../components/ui/StatusBadge';
import { IncidentSeverityBadge } from '../components/ui/IncidentSeverityBadge';
import { GradientButton } from '../components/ui/GradientButton';
import { Toast } from '../components/ui/Modal';
import { ArrowLeft, Terminal, Search, Filter, Copy, ArrowDown, Activity, BrainCircuit, BookOpen, Clock, FileText, CheckCircle2, User } from 'lucide-react';
import { getIncidentById, updateIncidentStatus } from '../services/incidentService';
import { ResolutionSimulationModal } from '../components/ui/ResolutionSimulationModal';
import { PostMortemGenerator } from '../components/ui/PostMortemGenerator';

const LogViewer = ({ logs = '' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [autoScroll, setAutoScroll] = useState(true);
  const logsEndRef = useRef(null);
  
  const logLines = logs.split('\n').filter(line => line.trim() !== '');
  const filteredLogs = logLines.filter(line => line.toLowerCase().includes(searchTerm.toLowerCase()));

  useEffect(() => {
    if (autoScroll && logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [filteredLogs, autoScroll]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(logs);
    alert('Logs copied to clipboard!'); // Minimal feedback
  };

  return (
    <GlassCard className="overflow-hidden border-cyan-500/30 p-0 flex flex-col h-96">
      <div className="bg-[#050816] border-b border-white/10 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <Terminal className="w-4 h-4 text-cyan-400" />
          system_logs.tail
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-500" />
            <input 
              type="text" 
              placeholder="Grep logs..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-[#10172A] border border-white/10 rounded px-2 pl-6 py-1 text-xs text-slate-200 outline-none w-32 focus:border-cyan-500/50" 
            />
          </div>
          <button onClick={() => setAutoScroll(!autoScroll)} className={`px-2 py-1 text-xs rounded border transition-colors ${autoScroll ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30' : 'bg-transparent text-slate-400 border-white/10 hover:text-white'}`}>
            <ArrowDown className="w-3 h-3 inline mr-1" />
            Auto-scroll
          </button>
          <button onClick={copyToClipboard} className="px-2 py-1 text-xs rounded bg-transparent border border-white/10 text-slate-400 hover:text-white transition-colors">
            <Copy className="w-3 h-3 inline mr-1" />
            Copy
          </button>
        </div>
      </div>
      <div className="p-4 bg-[#050816] flex-1 overflow-y-auto font-mono text-xs custom-scrollbar">
        {filteredLogs.length === 0 ? (
          <div className="text-slate-500 text-center mt-10">No matching logs found.</div>
        ) : (
          filteredLogs.map((line, i) => {
            let color = 'text-slate-300';
            if (line.includes('ERROR')) color = 'text-red-400';
            if (line.includes('WARN')) color = 'text-amber-400';
            if (line.includes('INFO')) color = 'text-cyan-400';
            return (
              <div key={i} className="mb-1 leading-relaxed">
                <span className={color}>{line}</span>
              </div>
            );
          })
        )}
        <div ref={logsEndRef} />
      </div>
    </GlassCard>
  );
};

const Timeline = () => {
  const events = [
    { time: "14:32:00", title: "Incident detected", desc: "Automated alert from API Gateway.", icon: Activity, color: "red" },
    { time: "14:32:05", title: "AI analysis started", desc: "Nexus AI correlating logs & metrics.", icon: BrainCircuit, color: "violet" },
    { time: "14:32:10", title: "Similar incident found", desc: "Correlated with INC-195.", icon: Search, color: "blue" },
    { time: "14:32:15", title: "Runbook recommended", desc: "Connection pool drain runbook proposed.", icon: BookOpen, color: "emerald" },
    { time: "14:35:00", title: "Human approval", desc: "Operations Engineer approved execution.", icon: User, color: "cyan" },
    { time: "14:38:00", title: "Resolution", desc: "Latency returned to normal.", icon: CheckCircle2, color: "emerald" },
    { time: "Pending", title: "Post-mortem", desc: "Awaiting automated generation.", icon: FileText, color: "slate" },
  ];

  return (
    <div className="relative border-l border-white/10 ml-3 space-y-6 pt-2">
      {events.map((ev, i) => {
        const colorClasses = {
          red: "bg-red-500/20 text-red-400 border-red-500/50",
          violet: "bg-violet-500/20 text-violet-400 border-violet-500/50",
          blue: "bg-blue-500/20 text-blue-400 border-blue-500/50",
          emerald: "bg-emerald-500/20 text-emerald-400 border-emerald-500/50",
          cyan: "bg-cyan-500/20 text-cyan-400 border-cyan-500/50",
          slate: "bg-slate-500/20 text-slate-400 border-slate-500/50",
        };

        return (
          <div key={i} className="pl-6 relative">
            <span className={`absolute -left-[11px] top-1 w-5 h-5 rounded-full flex items-center justify-center border ${colorClasses[ev.color]} bg-[#050816]`}>
              <ev.icon className="w-3 h-3" />
            </span>
            <div>
              <h4 className="text-sm font-medium text-slate-200">{ev.title}</h4>
              <p className="text-xs text-slate-400 mt-0.5">{ev.desc}</p>
              <span className="text-[10px] font-mono text-slate-500 mt-1 block">{ev.time}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const IncidentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [incident, setIncident] = useState(null);
  const [toast, setToast] = useState(null);
  const [isSimulationOpen, setIsSimulationOpen] = useState(false);
  const [isPMGeneratorOpen, setIsPMGeneratorOpen] = useState(false);

  useEffect(() => {
    const data = getIncidentById(id);
    if (data) {
      setIncident(data);
    }
  }, [id]);

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    const updated = updateIncidentStatus(id, newStatus);
    if (updated) {
      setIncident(updated);
      setToast({ message: `Status updated to ${newStatus.toUpperCase()}`, type: 'success' });
    }
  };

  if (!incident) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-cyan-500/20 border-t-cyan-400 rounded-full animate-spin mb-4"></div>
        <p className="text-slate-400">Loading incident details...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-700 pb-12">
      <div className="flex items-center gap-4 mb-2">
        <button onClick={() => navigate('/incidents')} className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
              <span className="text-cyan-400 font-mono">{incident.id}</span>
            </h1>
            <IncidentSeverityBadge severity={incident.severity} />
            <select 
              value={incident.status}
              onChange={handleStatusChange}
              className={`text-xs font-semibold px-2 py-1 rounded-full outline-none appearance-none cursor-pointer border ${
                incident.status === 'resolved' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                incident.status === 'investigating' ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
                'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
              }`}
            >
              <option value="detected">Detected</option>
              <option value="investigating">Investigating</option>
              <option value="mitigating">Mitigating</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
            <GradientButton 
              variant="primary" 
              className="ml-4 flex items-center gap-2 shadow-[0_0_15px_rgba(34,211,238,0.3)] animate-pulse hover:animate-none" 
              onClick={() => setIsSimulationOpen(true)}
            >
              <BrainCircuit className="w-4 h-4" /> Start AI-Assisted Resolution
            </GradientButton>
          </div>
          <p className="text-xl text-slate-300 mt-1">{incident.service} Failure</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          
          <GlassCard className="p-6">
            <h2 className="text-lg font-semibold text-white mb-4 border-b border-white/10 pb-2">1. Incident Overview</h2>
            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
              <div><span className="text-slate-500">Service:</span> <span className="text-slate-200">{incident.service}</span></div>
              <div><span className="text-slate-500">Environment:</span> <span className="text-slate-200">{incident.environment || 'Production'}</span></div>
              <div><span className="text-slate-500">Detected:</span> <span className="text-slate-200">{new Date(incident.detected).toLocaleString()}</span></div>
              <div><span className="text-slate-500">Assigned To:</span> <span className="text-slate-200">{incident.assigned}</span></div>
            </div>
            <h3 className="text-sm font-medium text-slate-400 mt-4 mb-1">Symptoms</h3>
            <p className="text-slate-300 text-sm leading-relaxed">{incident.description}</p>
            <h3 className="text-sm font-medium text-slate-400 mt-4 mb-1">Root Error</h3>
            <div className="bg-[#050816] border border-red-500/20 text-red-400 font-mono text-xs p-3 rounded-lg">
              {incident.error || 'No stack trace provided.'}
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <h2 className="text-lg font-semibold text-white mb-4 border-b border-white/10 pb-2">4. Logs & Telemetry</h2>
            <LogViewer logs={incident.logs} />
          </GlassCard>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <GlassCard className="p-6 border-violet-500/30">
              <h2 className="text-lg font-semibold text-violet-400 flex items-center gap-2 mb-4 border-b border-white/10 pb-2">
                <BrainCircuit className="w-5 h-5" /> 8. AI Analysis
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                Analysis of logs and metrics indicates a high probability (94%) of a connection pool exhaustion in the primary database replica caused by a sudden spike in unoptimized search queries.
              </p>
              <div className="bg-violet-500/10 rounded p-3 text-xs border border-violet-500/20">
                <span className="font-semibold text-violet-300 block mb-1">7. Similar Incidents</span>
                <span className="text-cyan-400 hover:underline cursor-pointer">INC-195</span> - DB Connection Timeout (Resolved 14 days ago)
              </div>
            </GlassCard>

            <GlassCard className="p-6 border-emerald-500/30">
              <h2 className="text-lg font-semibold text-emerald-400 flex items-center gap-2 mb-4 border-b border-white/10 pb-2">
                <BookOpen className="w-5 h-5" /> 9. Recommended Runbook
              </h2>
              
              <div className="space-y-4 mb-5">
                <div>
                  <h3 className="text-xs text-slate-500 mb-1">Reason</h3>
                  <p className="text-sm text-slate-300">
                    The automated system recommends safely draining the connection pool and scaling the replica count to mitigate the high probability of exhaustion.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-xs text-slate-500 mb-1">Similar Incident</h3>
                    <p className="text-sm text-cyan-400 hover:underline cursor-pointer">INC-195</p>
                  </div>
                  <div>
                    <h3 className="text-xs text-slate-500 mb-1">Similarity</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-emerald-400 font-mono">94%</span>
                      <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 w-[94%]"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs text-slate-500 mb-1">Expected Resolution</h3>
                  <p className="text-sm text-slate-300">
                    Restores DB connectivity. Expected downtime ~5 minutes.
                  </p>
                </div>
              </div>

              <GradientButton variant="primary" className="w-full text-sm" onClick={() => navigate('/runbooks')}>
                View Runbook: DB-RECOVERY-01
              </GradientButton>
            </GlassCard>
          </div>

          <GlassCard className="p-6">
            <h2 className="text-lg font-semibold text-white mb-4 border-b border-white/10 pb-2">11. Post-Mortem (Draft)</h2>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
              <FileText className="w-8 h-8 text-slate-500 mx-auto mb-2" />
              <p className="text-sm text-slate-400 mb-4">AI will generate a draft post-mortem once the incident is marked as resolved.</p>
              <GradientButton 
                variant="outline" 
                className="text-xs" 
                disabled={incident.status !== 'resolved'}
                onClick={() => setIsPMGeneratorOpen(true)}
              >
                Generate AI Post-Mortem
              </GradientButton>
            </div>
          </GlassCard>

        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          <GlassCard className="p-6">
            <h2 className="text-lg font-semibold text-white mb-4 border-b border-white/10 pb-2">3. Timeline</h2>
            <Timeline />
          </GlassCard>

          <GlassCard className="p-6">
            <h2 className="text-lg font-semibold text-white mb-4 border-b border-white/10 pb-2">5. Metrics Context</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400">CPU Usage</span>
                  <span className="text-red-400 font-mono">98%</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 w-[98%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400">Memory</span>
                  <span className="text-amber-400 font-mono">75%</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 w-[75%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400">Active Connections</span>
                  <span className="text-red-400 font-mono">9,942 / 10,000</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 w-[99%]"></div>
                </div>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <h2 className="text-lg font-semibold text-white mb-4 border-b border-white/10 pb-2">6. Recent Changes</h2>
            <div className="space-y-3">
              <div className="p-3 bg-white/5 rounded-lg border border-white/10 text-sm">
                <span className="text-cyan-400 font-mono text-xs block mb-1">PR #8492</span>
                <span className="text-slate-200 block">Deploy new search indexer</span>
                <span className="text-slate-500 text-xs mt-1 block">By alice@ 4 hours ago</span>
              </div>
              <div className="p-3 bg-white/5 rounded-lg border border-white/10 text-sm">
                <span className="text-cyan-400 font-mono text-xs block mb-1">PR #8488</span>
                <span className="text-slate-200 block">Update node dependencies</span>
                <span className="text-slate-500 text-xs mt-1 block">By bob@ 1 day ago</span>
              </div>
            </div>
          </GlassCard>
        </div>
        
      </div>
      <ResolutionSimulationModal 
        isOpen={isSimulationOpen} 
        onClose={() => setIsSimulationOpen(false)} 
        incidentId={incident.id}
        onGeneratePM={() => setIsPMGeneratorOpen(true)}
        onSuccess={() => handleStatusChange({target: {value: 'resolved'}})}
      />
      <PostMortemGenerator 
        isOpen={isPMGeneratorOpen} 
        onClose={() => setIsPMGeneratorOpen(false)} 
        incident={incident} 
      />
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default IncidentDetails;
