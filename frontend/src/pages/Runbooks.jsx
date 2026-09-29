import React, { useState } from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { GlassCard } from '../components/ui/GlassCard';
import { GradientButton } from '../components/ui/GradientButton';
import { Modal } from '../components/ui/Modal';
import { BookOpen, Clock, Activity, Search, Server, Shield, CheckCircle2, Play, AlertCircle, XCircle } from 'lucide-react';

const RUNBOOKS = [
  {
    id: 'DB-RECOVERY-01',
    name: 'Database Connection Recovery',
    problemType: 'Connection Pool Exhaustion',
    affectedService: 'Database (PostgreSQL)',
    estimatedDuration: '5 mins',
    lastUsed: '2 days ago',
    successHistory: '98%',
    purpose: 'Safely recover database connectivity by terminating stale connections and restarting the affected service without data loss.',
    whenToUse: 'When connection pool is at 100% and queries are timing out.',
    prerequisites: ['Admin access to DB', 'Service restart permissions'],
    steps: [
      'Check database connectivity',
      'Check active connections',
      'Identify stale connections',
      'Restart affected service',
      'Verify health endpoint',
      'Monitor recovery'
    ],
    verification: 'Health endpoint returns 200 OK and active connections < 80%.',
    rollback: 'Revert service to previous version if restart fails.',
    historicalUsage: 'Used 12 times this month. 100% success rate.'
  },
  {
    id: 'API-RESTART-01',
    name: 'Service Restart',
    problemType: 'Service Unresponsive',
    affectedService: 'API Gateway',
    estimatedDuration: '2 mins',
    lastUsed: '1 week ago',
    successHistory: '95%',
    purpose: 'Gracefully restart the API gateway to clear stuck threads.',
    whenToUse: 'When API latency exceeds 5s or returns 502/504 errors.',
    prerequisites: ['Kubernetes cluster access'],
    steps: [
      'Drain traffic from target pod',
      'Initiate graceful shutdown',
      'Start new pod instance',
      'Run health checks',
      'Route traffic to new pod'
    ],
    verification: 'API responds within 200ms to health check pings.',
    rollback: 'Scale up previous replica set if new pods fail to start.',
    historicalUsage: 'Used 4 times this month.'
  },
  {
    id: 'HIGH-CPU-01',
    name: 'High CPU Investigation',
    problemType: 'Resource Exhaustion',
    affectedService: 'Worker Nodes',
    estimatedDuration: '15 mins',
    lastUsed: '3 weeks ago',
    successHistory: '85%',
    purpose: 'Identify and mitigate processes consuming excessive CPU.',
    whenToUse: 'When node CPU usage stays above 90% for more than 5 minutes.',
    prerequisites: ['SSH access to worker nodes', 'Monitoring tools access'],
    steps: [
      'Gather CPU profiles',
      'Identify top consuming processes',
      'Check for memory leaks',
      'Rate limit aggressive clients',
      'Scale worker nodes if necessary'
    ],
    verification: 'CPU usage drops below 70% sustained.',
    rollback: 'N/A - Non-destructive investigation primarily.',
    historicalUsage: 'Used 2 times this month.'
  },
  {
    id: 'REDIS-RECOVERY-01',
    name: 'Redis Recovery',
    problemType: 'Cache Failure',
    affectedService: 'Redis Cluster',
    estimatedDuration: '10 mins',
    lastUsed: '1 month ago',
    successHistory: '92%',
    purpose: 'Restore Redis functionality after an OOM event or node failure.',
    whenToUse: 'When cache hit rate drops to 0 or Redis nodes are unreachable.',
    prerequisites: ['Redis admin privileges'],
    steps: [
      'Check Redis cluster state',
      'Identify failed nodes',
      'Restart failed Redis instances',
      'Trigger cluster rebalance',
      'Verify cache hit rate recovery'
    ],
    verification: 'Cluster state is OK and cache hit rate > 80%.',
    rollback: 'Restore from last RDB backup if data is corrupted.',
    historicalUsage: 'Used 1 time this month.'
  },
  {
    id: 'DEPLOYMENT-ROLLBACK-01',
    name: 'Deployment Rollback',
    problemType: 'Bad Release',
    affectedService: 'Any Microservice',
    estimatedDuration: '3 mins',
    lastUsed: '5 days ago',
    successHistory: '99%',
    purpose: 'Revert a service to its last known good configuration.',
    whenToUse: 'Immediately following a deployment that causes critical errors or alerts.',
    prerequisites: ['CI/CD pipeline access'],
    steps: [
      'Identify current broken version',
      'Identify last known good version',
      'Trigger rollback pipeline',
      'Monitor deployment status',
      'Verify service health'
    ],
    verification: 'Error rates return to baseline levels.',
    rollback: 'N/A - This is a rollback procedure.',
    historicalUsage: 'Used 3 times this month.'
  }
];

const Runbooks = () => {
  const [selectedRunbook, setSelectedRunbook] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [simulationState, setSimulationState] = useState('idle'); // idle, running, completed
  const [simulatedSteps, setSimulatedSteps] = useState([]);

  const filteredRunbooks = RUNBOOKS.filter(r => 
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.affectedService.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSimulate = () => {
    setSimulationState('running');
    setSimulatedSteps([]);
    
    let currentStep = 0;
    const totalSteps = selectedRunbook.steps.length;
    
    const interval = setInterval(() => {
      if (currentStep < totalSteps) {
        setSimulatedSteps(prev => [...prev, `Step ${currentStep + 1} completed`]);
        currentStep++;
      } else {
        setSimulatedSteps(prev => [...prev, 'Health check passed']);
        setSimulationState('completed');
        clearInterval(interval);
      }
    }, 800);
  };

  const resetSimulation = () => {
    setSimulationState('idle');
    setSimulatedSteps([]);
  };

  const closeRunbookDetails = () => {
    setSelectedRunbook(null);
    resetSimulation();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-700 pb-12">
      <PageHeader 
        title="Runbook Management" 
        description="Automated procedures for known incident types."
      />

      {/* Search */}
      <GlassCard className="p-4 flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search runbooks by ID, name, or service..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#10172A] border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:shadow-[0_0_10px_rgba(34,211,238,0.1)] transition-all"
          />
        </div>
      </GlassCard>

      {/* Runbook Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredRunbooks.map(runbook => (
          <GlassCard 
            key={runbook.id} 
            className="p-6 cursor-pointer hover:border-cyan-500/30 transition-all group flex flex-col h-full"
            onClick={() => setSelectedRunbook(runbook)}
          >
            <div className="flex justify-between items-start mb-4">
              <span className="px-2 py-1 bg-cyan-500/10 text-cyan-400 text-xs font-mono rounded border border-cyan-500/20">
                {runbook.id}
              </span>
              <span className="flex items-center gap-1 text-xs text-emerald-400 font-medium">
                <Activity className="w-3 h-3" /> {runbook.successHistory} Success
              </span>
            </div>
            
            <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-cyan-300 transition-colors">{runbook.name}</h3>
            <p className="text-sm text-slate-400 mb-4 flex-1">{runbook.problemType}</p>
            
            <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-xs border-t border-white/10 pt-4 mt-auto">
              <div className="flex items-center gap-1.5 text-slate-300">
                <Server className="w-3.5 h-3.5 text-slate-500" />
                <span className="truncate">{runbook.affectedService}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                {runbook.estimatedDuration}
              </div>
              <div className="flex items-center gap-1.5 text-slate-300 col-span-2">
                <BookOpen className="w-3.5 h-3.5 text-slate-500" />
                Last used {runbook.lastUsed}
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Runbook Details Modal */}
      <Modal isOpen={!!selectedRunbook} onClose={closeRunbookDetails} title={`Runbook: ${selectedRunbook?.id}`}>
        {selectedRunbook && (
          <div className="space-y-6">
            
            {/* Header info */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h2 className="text-xl font-bold text-white">{selectedRunbook.name}</h2>
                <p className="text-sm text-cyan-400 mt-1">{selectedRunbook.problemType} • {selectedRunbook.affectedService}</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-slate-300">Duration: ~{selectedRunbook.estimatedDuration}</div>
                <div className="text-sm text-emerald-400 font-medium">{selectedRunbook.successHistory} Success Rate</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column: Details */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-violet-400" /> Purpose
                  </h3>
                  <p className="text-sm text-slate-300 bg-white/5 p-3 rounded-lg border border-white/5">{selectedRunbook.purpose}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-400" /> When to use
                  </h3>
                  <p className="text-sm text-slate-300 bg-white/5 p-3 rounded-lg border border-white/5">{selectedRunbook.whenToUse}</p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-white mb-2">Prerequisites</h3>
                  <ul className="list-disc pl-5 text-sm text-slate-300 space-y-1">
                    {selectedRunbook.prerequisites.map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-sm font-semibold text-white mb-2">Verification</h3>
                  <p className="text-sm text-slate-300 bg-white/5 p-3 rounded-lg border border-white/5">{selectedRunbook.verification}</p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-white mb-2">Rollback Procedure</h3>
                  <p className="text-sm text-slate-300 bg-white/5 p-3 rounded-lg border border-white/5">{selectedRunbook.rollback}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-semibold text-white mb-2">Historical Usage</h3>
                  <p className="text-sm text-slate-300 italic">{selectedRunbook.historicalUsage}</p>
                </div>
              </div>

              {/* Right Column: Steps & Simulation */}
              <div className="space-y-6">
                <GlassCard className="p-4 border-cyan-500/20 bg-cyan-500/5">
                  <h3 className="text-md font-semibold text-cyan-300 mb-4 flex items-center gap-2">
                    <BookOpen className="w-4 h-4" /> Execution Steps
                  </h3>
                  <ol className="space-y-3 mb-6">
                    {selectedRunbook.steps.map((step, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs font-bold mt-0.5">
                          {i + 1}
                        </span>
                        <span className="pt-1">{step}</span>
                      </li>
                    ))}
                  </ol>

                  {/* SAFE SIMULATION MODE */}
                  <div className="border-t border-cyan-500/20 pt-4 mt-6">
                    <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                      <Shield className="w-4 h-4 text-emerald-400" /> Safe Simulation Mode
                    </h4>
                    <p className="text-xs text-slate-400 mb-4">
                      Safely simulate the runbook execution without running destructive commands.
                    </p>

                    {simulationState === 'idle' && (
                      <GradientButton variant="primary" onClick={handleSimulate} className="w-full flex justify-center items-center gap-2">
                        <Play className="w-4 h-4" /> Simulate Runbook
                      </GradientButton>
                    )}

                    {(simulationState === 'running' || simulationState === 'completed') && (
                      <div className="bg-[#050816] rounded-lg p-4 font-mono text-xs border border-white/10 min-h-[150px]">
                        <div className="space-y-2 mb-4">
                          {simulatedSteps.map((log, index) => (
                            <div key={index} className="flex items-center gap-2 text-emerald-400 animate-in slide-in-from-left-2 duration-300">
                              <CheckCircle2 className="w-3 h-3" />
                              {log}
                            </div>
                          ))}
                          {simulationState === 'running' && (
                            <div className="flex items-center gap-2 text-cyan-400 animate-pulse">
                              <div className="w-3 h-3 rounded-full border-2 border-cyan-500/50 border-t-cyan-400 animate-spin" />
                              Executing next step...
                            </div>
                          )}
                        </div>

                        {simulationState === 'completed' && (
                          <div className="mt-4 pt-4 border-t border-white/10 text-center animate-in fade-in duration-500">
                            <p className="text-emerald-400 font-bold mb-4">Simulation completed successfully.</p>
                            
                            <div className="space-y-2">
                              <h5 className="text-slate-300 font-sans font-semibold mb-2">Human Approval Required</h5>
                              <div className="flex flex-col sm:flex-row gap-2 justify-center font-sans">
                                <button className="px-3 py-1.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 rounded hover:bg-emerald-500/30 transition-colors flex items-center justify-center gap-1.5">
                                  <CheckCircle2 className="w-3 h-3" /> Approve Simulation
                                </button>
                                <button className="px-3 py-1.5 bg-red-500/20 text-red-400 border border-red-500/50 rounded hover:bg-red-500/30 transition-colors flex items-center justify-center gap-1.5">
                                  <XCircle className="w-3 h-3" /> Reject
                                </button>
                                <button className="px-3 py-1.5 bg-amber-500/20 text-amber-400 border border-amber-500/50 rounded hover:bg-amber-500/30 transition-colors flex items-center justify-center gap-1.5">
                                  <Search className="w-3 h-3" /> Investigate Further
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                </GlassCard>
              </div>
            </div>

          </div>
        )}
      </Modal>

    </div>
  );
};

export default Runbooks;
