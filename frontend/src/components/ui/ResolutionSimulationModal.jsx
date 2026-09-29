import React, { useState, useEffect, useRef } from 'react';
import { Modal } from './Modal';
import { GradientButton } from './GradientButton';
import { BrainCircuit, CheckCircle2, Search, Zap, Terminal, Activity, Shield, BookOpen, AlertCircle, Database, Network } from 'lucide-react';
import { GlassCard } from './GlassCard';

export const ResolutionSimulationModal = ({ isOpen, onClose, incidentId, onGeneratePM, onSuccess }) => {
  const [step, setStep] = useState(0);
  const [validationSteps, setValidationSteps] = useState([]);
  const [searchProgress, setSearchProgress] = useState(0);
  const [executionLogs, setExecutionLogs] = useState([]);
  
  const logsEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      startSimulation();
    } else {
      setStep(0);
      setValidationSteps([]);
      setSearchProgress(0);
      setExecutionLogs([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [executionLogs]);

  const startSimulation = () => {
    setStep(1); // Validation
    
    setTimeout(() => setValidationSteps(p => [...p, 'Service identified']), 800);
    setTimeout(() => setValidationSteps(p => [...p, 'Severity confirmed']), 1600);
    setTimeout(() => setValidationSteps(p => [...p, 'Logs loaded']), 2400);
    
    setTimeout(() => {
      setStep(2); // Memory search
      const interval = setInterval(() => {
        setSearchProgress(p => {
          if (p >= 247) {
            clearInterval(interval);
            setTimeout(() => setStep(3), 2000); // Diagnosis
            return 247;
          }
          return p + 11;
        });
      }, 50);
    }, 3200);
  };

  const handleApprove = () => {
    setStep(6); // Execute
    
    const logs = [
      '> Starting runbook...',
      '> Checking database...',
      '> Checking connection pool...',
      '> Identifying stale connections...',
      '> Restarting Payment API...',
      '> Running health check...',
      '> Health check passed.'
    ];
    
    let currentLog = 0;
    const interval = setInterval(() => {
      if (currentLog < logs.length) {
        setExecutionLogs(p => [...p, logs[currentLog]]);
        currentLog++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setStep(7); // Resolved
          if (onSuccess) onSuccess();
        }, 1200); 
      }
    }, 700);
  };

  const handleReject = () => {
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`AI-Assisted Resolution: ${incidentId}`} maxWidth="max-w-6xl">
      <div className="min-h-[600px] flex flex-col justify-center relative">
        
        {/* Animated Background for Modal */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden rounded-2xl">
           <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-cyan-600/5 rounded-full blur-[100px] animate-float-slow"></div>
           <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-violet-600/5 rounded-full blur-[100px] animate-float-medium"></div>
        </div>

        <div className="relative z-10 w-full">
          {/* STEP 1: VALIDATION */}
          {step === 1 && (
            <div className="flex flex-col items-center justify-center py-20 animate-in zoom-in duration-500">
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full"></div>
                <Activity className="w-16 h-16 text-cyan-400 relative z-10 animate-pulse" />
              </div>
              <h2 className="text-3xl font-black text-white mb-10 tracking-tight">Validating incident data...</h2>
              <div className="space-y-6 min-w-[300px]">
                <div className="flex items-center gap-5 text-xl font-medium text-slate-300 transition-all duration-300">
                  {validationSteps.includes('Service identified') ? <CheckCircle2 className="w-8 h-8 text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]" /> : <div className="w-8 h-8 rounded-full border-2 border-slate-700" />}
                  Service identified
                </div>
                <div className="flex items-center gap-5 text-xl font-medium text-slate-300 transition-all duration-300">
                  {validationSteps.includes('Severity confirmed') ? <CheckCircle2 className="w-8 h-8 text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]" /> : <div className="w-8 h-8 rounded-full border-2 border-slate-700" />}
                  Severity confirmed
                </div>
                <div className="flex items-center gap-5 text-xl font-medium text-slate-300 transition-all duration-300">
                  {validationSteps.includes('Logs loaded') ? <CheckCircle2 className="w-8 h-8 text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]" /> : <div className="w-8 h-8 rounded-full border-2 border-slate-700" />}
                  Logs loaded
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: MEMORY SEARCH */}
          {step === 2 && (
            <div className="flex flex-col items-center justify-center py-16 animate-in fade-in zoom-in duration-700 relative w-full">
              {/* Connection Graph Visualization */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
                 <svg className="w-[600px] h-[400px]">
                    <circle cx="300" cy="200" r="150" fill="none" stroke="rgba(139,92,246,0.2)" strokeWidth="1" strokeDasharray="4 4" className="animate-spin-slow" style={{ animationDuration: '20s' }} />
                    <circle cx="300" cy="200" r="100" fill="none" stroke="rgba(34,211,238,0.2)" strokeWidth="1" strokeDasharray="4 4" className="animate-spin-slow" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
                    <line x1="300" y1="200" x2="150" y2="200" stroke="rgba(139,92,246,0.5)" strokeWidth="2" className="animate-pulse" />
                    <line x1="300" y1="200" x2="400" y2="100" stroke="rgba(139,92,246,0.5)" strokeWidth="2" className="animate-pulse" />
                    <line x1="300" y1="200" x2="400" y2="300" stroke="rgba(139,92,246,0.5)" strokeWidth="2" className="animate-pulse" />
                 </svg>
              </div>

              <div className="relative mb-8 z-10">
                <div className="absolute inset-0 bg-violet-500/30 blur-2xl rounded-full"></div>
                <Database className="w-20 h-20 text-violet-400 relative z-10 animate-pulse" />
              </div>
              <h2 className="text-3xl font-black text-white mb-10 z-10 tracking-tight">Searching historical incidents...</h2>
              
              <div className="text-center z-10">
                <div className="text-7xl font-mono text-violet-300 mb-2 font-black drop-shadow-[0_0_15px_rgba(139,92,246,0.5)] tracking-tighter">{searchProgress}</div>
                <p className="text-slate-400 mb-10 text-lg uppercase tracking-widest font-bold">incidents searched</p>
                
                {searchProgress >= 247 && (
                  <div className="animate-in slide-in-from-bottom-4 fade-in duration-500 bg-[#0B1120] border-2 border-emerald-500/40 text-emerald-400 px-8 py-4 rounded-xl font-bold text-xl shadow-[0_0_30px_rgba(16,185,129,0.2)] flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6" /> 3 similar incidents found
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 3, 4, 5: PROPOSAL & APPROVAL */}
          {step >= 3 && step <= 5 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 py-4 w-full">
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 mb-6 relative shadow-[0_0_30px_rgba(34,211,238,0.2)]">
                  <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-2xl animate-pulse"></div>
                  <BrainCircuit className="w-12 h-12 text-cyan-400 relative z-10" />
                </div>
                <h2 className="text-4xl font-black text-white tracking-tight drop-shadow-md">AI Diagnosis Complete</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <GlassCard className="p-8 border-violet-500/40 bg-[#0B1120]/80 relative overflow-hidden group hover:border-violet-500/60 transition-colors shadow-[0_0_30px_rgba(139,92,246,0.15)]">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl group-hover:bg-violet-500/20 transition-all"></div>
                  <h3 className="text-sm font-bold text-violet-400 mb-4 flex items-center gap-2 tracking-widest uppercase">
                    <AlertCircle className="w-5 h-5" /> Possible Root Cause
                  </h3>
                  <p className="text-3xl text-white mb-8 font-black tracking-tight leading-tight">Database connection pool exhaustion</p>
                  <div>
                    <div className="flex justify-between text-sm mb-2 font-bold uppercase tracking-widest">
                      <span className="text-slate-500">Similarity</span>
                      <span className="text-emerald-400 text-lg drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]">92%</span>
                    </div>
                    <div className="w-full h-3 bg-[#030712] rounded-full overflow-hidden border border-white/10">
                      <div className="h-full bg-gradient-to-r from-emerald-500/80 to-emerald-400 w-[92%] shadow-[0_0_15px_rgba(52,211,153,0.8)]"></div>
                    </div>
                  </div>
                </GlassCard>

                <GlassCard className="p-8 border-cyan-500/40 bg-[#0B1120]/80 relative overflow-hidden group hover:border-cyan-500/60 transition-colors shadow-[0_0_30px_rgba(34,211,238,0.15)]">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-all"></div>
                  <h3 className="text-sm font-bold text-cyan-400 mb-6 flex items-center gap-2 tracking-widest uppercase">
                    <BookOpen className="w-5 h-5" /> Runbook Recommendation
                  </h3>
                  <div className="flex items-center gap-6 mb-8">
                    <div className="p-5 bg-[#030712] rounded-2xl border border-cyan-500/30 shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                      <Terminal className="w-10 h-10 text-cyan-400" />
                    </div>
                    <div>
                      <div className="text-4xl font-mono font-black text-white tracking-tighter drop-shadow-[0_0_10px_rgba(255,255,255,0.2)] mb-2">DB-RECOVERY-01</div>
                      <div className="text-slate-400 font-medium text-lg">Database Connection Recovery</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-bold text-emerald-400 bg-emerald-500/10 px-4 py-2.5 rounded-lg border border-emerald-500/30 w-fit tracking-wide">
                    <Activity className="w-4 h-4" /> 98% Historical Success Rate
                  </div>
                </GlassCard>
              </div>

              <div className="bg-[#0B1120] border-2 border-cyan-500/30 rounded-2xl p-10 text-center relative overflow-hidden shadow-[0_0_40px_rgba(34,211,238,0.1)]">
                <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-transparent pointer-events-none"></div>
                <h4 className="text-2xl font-bold text-white mb-10 flex items-center justify-center gap-3 relative z-10">
                  <Shield className="w-8 h-8 text-amber-400 drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
                  AI recommends executing this runbook.
                </h4>
                <div className="flex justify-center gap-6 relative z-10">
                  <button onClick={handleReject} className="px-10 py-4 rounded-xl border-2 border-white/10 text-slate-300 hover:text-white hover:bg-white/5 transition-all font-bold text-lg hover:border-red-500/50 hover:text-red-400 tracking-wide bg-[#030712]">
                    Reject
                  </button>
                  <GradientButton onClick={handleApprove} variant="primary" className="px-12 py-4 flex items-center gap-3 text-xl font-black shadow-[0_0_30px_rgba(34,211,238,0.5)] hover:shadow-[0_0_40px_rgba(34,211,238,0.6)]">
                    <Zap className="w-6 h-6 fill-cyan-100" /> Approve
                  </GradientButton>
                </div>
              </div>
            </div>
          )}

          {/* STEP 6: EXECUTION */}
          {step === 6 && (
            <div className="animate-in fade-in zoom-in-95 duration-500 w-full max-w-5xl mx-auto py-4">
              <div className="mb-8 flex items-center justify-between">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-full border-4 border-cyan-500/30 border-t-cyan-400 animate-spin shadow-[0_0_20px_rgba(34,211,238,0.4)]" />
                  <div>
                    <h2 className="text-3xl font-black text-white tracking-tight">Executing Runbook</h2>
                    <p className="text-cyan-400 font-mono text-lg mt-1 font-bold">DB-RECOVERY-01</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-slate-500 block mb-1">Status</span>
                  <span className="text-cyan-400 font-bold tracking-widest uppercase animate-pulse">Running</span>
                </div>
              </div>
              
              <div className="border border-cyan-500/30 rounded-xl overflow-hidden bg-[#030712] shadow-[0_0_40px_rgba(34,211,238,0.15)]">
                <div className="bg-[#0B1120] border-b border-white/10 px-6 py-4 flex items-center gap-4">
                  <div className="flex gap-2">
                    <div className="w-3.5 h-3.5 rounded-full bg-red-500/80"></div>
                    <div className="w-3.5 h-3.5 rounded-full bg-amber-500/80"></div>
                    <div className="w-3.5 h-3.5 rounded-full bg-emerald-500/80"></div>
                  </div>
                  <div className="text-sm font-mono font-bold tracking-widest text-slate-500 flex-1 text-center pr-10 uppercase">OpsMind-AI-Core ~ execution-shell</div>
                </div>
                <div className="p-8 font-mono text-lg min-h-[400px] bg-[#030712] shadow-inner">
                  {executionLogs.map((log, i) => (
                    <div key={i} className="mb-4 flex items-start gap-4 animate-in slide-in-from-bottom-2 duration-300">
                      <span className={log.includes('passed') ? 'text-emerald-400 font-bold drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]' : 'text-slate-300'}>{log}</span>
                    </div>
                  ))}
                  <div ref={logsEndRef} />
                  {executionLogs.length < 7 && (
                     <div className="flex items-center gap-4 text-cyan-500 animate-pulse mt-4">
                       <span className="font-bold">{'>'}</span> <div className="w-3 h-6 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                     </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* STEP 7: RESOLVED */}
          {step === 7 && (
            <div className="flex flex-col items-center justify-center py-16 animate-in zoom-in-105 fade-in duration-700 w-full">
              <div className="relative mb-10">
                <div className="absolute inset-0 bg-emerald-500/20 blur-[50px] rounded-full scale-150"></div>
                <CheckCircle2 className="w-36 h-36 text-emerald-400 relative z-10 drop-shadow-[0_0_20px_rgba(52,211,153,0.8)]" />
              </div>
              <h1 className="text-6xl font-black text-white mb-16 tracking-tighter drop-shadow-[0_0_30px_rgba(52,211,153,0.5)] text-center">
                INCIDENT RESOLVED
              </h1>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl mb-16">
                <GlassCard className="p-8 text-center border-emerald-500/30 bg-[#0B1120] hover:border-emerald-500/50 transition-colors shadow-xl">
                  <div className="text-xs text-slate-500 uppercase tracking-widest mb-3 font-bold">Resolution Time</div>
                  <div className="text-4xl font-mono text-emerald-400 font-black drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]">2m 18s</div>
                </GlassCard>
                
                <GlassCard className="p-8 text-center border-violet-500/30 bg-[#0B1120] hover:border-violet-500/50 transition-colors shadow-xl">
                  <div className="text-xs text-slate-500 uppercase tracking-widest mb-3 font-bold">Root Cause</div>
                  <div className="text-2xl text-violet-400 font-black leading-tight drop-shadow-[0_0_10px_rgba(139,92,246,0.3)]">Database connection pool exhaustion</div>
                </GlassCard>
                
                <GlassCard className="p-8 text-center border-cyan-500/30 bg-[#0B1120] hover:border-cyan-500/50 transition-colors shadow-xl">
                  <div className="text-xs text-slate-500 uppercase tracking-widest mb-3 font-bold">Runbook</div>
                  <div className="text-4xl font-mono text-cyan-400 font-black drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">DB-RECOVERY-01</div>
                </GlassCard>
              </div>
              
              <GradientButton variant="primary" className="px-12 py-5 text-xl font-black tracking-wide flex items-center gap-4 shadow-[0_0_40px_rgba(34,211,238,0.4)] animate-bounce hover:animate-none" onClick={() => { onClose(); if (onGeneratePM) onGeneratePM(); }}>
                <BookOpen className="w-7 h-7" /> Generate Post-Mortem
              </GradientButton>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};
