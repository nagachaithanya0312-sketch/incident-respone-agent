import React, { useState, useEffect } from 'react';
import { Modal } from './Modal';
import { GradientButton } from './GradientButton';
import { FileText, Bot, BrainCircuit, Save, CheckCircle2, ArrowDown } from 'lucide-react';
import { savePostMortem } from '../../services/postMortemService';
import { addToIncidentMemory } from '../../services/incidentMemoryService';
import { updateIncidentStatus } from '../../services/incidentService';

export const PostMortemGenerator = ({ isOpen, onClose, incident, onComplete }) => {
  const [formData, setFormData] = useState({
    summary: '',
    impact: '',
    timeline: '',
    rootCause: '',
    resolution: '',
    whatWorked: '',
    whatCouldImprove: '',
    lessonsLearned: '',
    preventiveActions: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [learningStep, setLearningStep] = useState(0);

  useEffect(() => {
    if (isOpen && incident && !isSaved) {
      setIsGenerating(true);
      setTimeout(() => {
        setFormData({
          summary: `On ${new Date().toLocaleDateString()}, the ${incident.service || 'service'} experienced an outage causing ${incident.description}.`,
          impact: 'Users were unable to complete transactions for the duration of the incident.',
          timeline: '- 14:32: Incident detected\n- 14:35: AI analysis recommended runbook\n- 14:38: Service restored',
          rootCause: incident.error || 'Database connection pool exhaustion due to traffic spike.',
          resolution: 'Safely drained the connection pool and scaled the replica count.',
          whatWorked: 'Automated AI detection and runbook recommendation worked flawlessly.',
          whatCouldImprove: 'Connection pool metrics need to alert earlier before hitting 100%.',
          lessonsLearned: 'We need to implement dynamic connection pooling based on load.',
          preventiveActions: '1. Update alerts for connection pool > 80%\n2. Review search query optimization'
        });
        setIsGenerating(false);
      }, 2000);
    }
  }, [isOpen, incident]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    savePostMortem({
      incidentId: incident.id,
      impact: formData.impact,
      rootCause: formData.rootCause,
      resolution: formData.resolution,
      lessonsLearned: formData.lessonsLearned
    });
    
    addToIncidentMemory({
      id: incident.id,
      service: incident.service,
      severity: incident.severity,
      date: new Date().toISOString().split('T')[0],
      resolutionStatus: 'Resolved',
      problem: incident.description,
      rootCause: formData.rootCause,
      resolution: formData.resolution,
      runbook: 'DB-RECOVERY-01',
      resolutionTime: incident.duration || 'Unknown'
    });
    
    updateIncidentStatus(incident.id, 'closed');
    
    setIsSaved(true);
    startLearningAnimation();
  };
  
  const startLearningAnimation = () => {
    setLearningStep(1);
    setTimeout(() => setLearningStep(2), 800);
    setTimeout(() => setLearningStep(3), 1600);
    setTimeout(() => setLearningStep(4), 2400);
    setTimeout(() => setLearningStep(5), 3200); 
  };

  const handleClose = () => {
    setIsSaved(false);
    setLearningStep(0);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="AI Post-Mortem Generator" maxWidth="max-w-4xl">
      {!isSaved ? (
        <div className="space-y-6">
          {isGenerating ? (
            <div className="flex flex-col items-center justify-center py-20 animate-pulse">
              <Bot className="w-16 h-16 text-cyan-400 mb-4 animate-bounce" />
              <h2 className="text-xl font-bold text-white mb-2">Generating AI Post-Mortem...</h2>
              <p className="text-slate-400 text-sm">Analyzing logs, metrics, and resolution steps.</p>
            </div>
          ) : (
            <div className="animate-in fade-in duration-500">
              <div className="flex items-center gap-3 bg-violet-500/10 border border-violet-500/20 text-violet-300 px-5 py-3 rounded-lg mb-6 shadow-[0_0_15px_rgba(139,92,246,0.1)]">
                <Bot className="w-5 h-5" /> 
                <span className="font-medium">AI-generated draft. Please review and edit before saving.</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">1. Incident Summary</label>
                  <textarea className="w-full h-24 bg-[#050816] border border-white/10 rounded-lg p-3 text-sm text-slate-200 outline-none focus:border-cyan-500/50 shadow-inner" value={formData.summary} onChange={(e) => handleChange('summary', e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">2. Impact</label>
                  <textarea className="w-full h-24 bg-[#050816] border border-white/10 rounded-lg p-3 text-sm text-slate-200 outline-none focus:border-cyan-500/50 shadow-inner" value={formData.impact} onChange={(e) => handleChange('impact', e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">3. Root Cause</label>
                  <textarea className="w-full h-24 bg-[#050816] border border-white/10 rounded-lg p-3 text-sm text-slate-200 outline-none focus:border-cyan-500/50 shadow-inner" value={formData.rootCause} onChange={(e) => handleChange('rootCause', e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">4. Resolution</label>
                  <textarea className="w-full h-24 bg-[#050816] border border-white/10 rounded-lg p-3 text-sm text-slate-200 outline-none focus:border-cyan-500/50 shadow-inner" value={formData.resolution} onChange={(e) => handleChange('resolution', e.target.value)} />
                </div>
                
                <div className="col-span-1 md:col-span-2 space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">5. Timeline</label>
                  <textarea className="w-full h-24 bg-[#050816] border border-white/10 rounded-lg p-3 text-sm font-mono text-slate-200 outline-none focus:border-cyan-500/50 shadow-inner" value={formData.timeline} onChange={(e) => handleChange('timeline', e.target.value)} />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">6. What Worked</label>
                  <textarea className="w-full h-24 bg-[#050816] border border-white/10 rounded-lg p-3 text-sm text-slate-200 outline-none focus:border-cyan-500/50 shadow-inner" value={formData.whatWorked} onChange={(e) => handleChange('whatWorked', e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">7. What Could Improve</label>
                  <textarea className="w-full h-24 bg-[#050816] border border-white/10 rounded-lg p-3 text-sm text-slate-200 outline-none focus:border-cyan-500/50 shadow-inner" value={formData.whatCouldImprove} onChange={(e) => handleChange('whatCouldImprove', e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">8. Lessons Learned</label>
                  <textarea className="w-full h-24 bg-[#050816] border border-white/10 rounded-lg p-3 text-sm text-slate-200 outline-none focus:border-cyan-500/50 shadow-inner" value={formData.lessonsLearned} onChange={(e) => handleChange('lessonsLearned', e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">9. Preventive Actions</label>
                  <textarea className="w-full h-24 bg-[#050816] border border-white/10 rounded-lg p-3 text-sm text-slate-200 outline-none focus:border-cyan-500/50 shadow-inner" value={formData.preventiveActions} onChange={(e) => handleChange('preventiveActions', e.target.value)} />
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-white/10">
                <button onClick={onClose} className="px-6 py-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors font-medium">Cancel</button>
                <GradientButton variant="primary" onClick={handleSave} className="flex items-center gap-2">
                  <Save className="w-4 h-4" /> Save Post-Mortem & Update Memory
                </GradientButton>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="py-12 flex flex-col items-center min-h-[400px]">
          
          <h2 className="text-3xl font-bold text-white mb-12 flex items-center gap-3">
            <BrainCircuit className={`w-8 h-8 ${learningStep >= 5 ? 'text-violet-400 drop-shadow-[0_0_10px_rgba(139,92,246,0.5)]' : 'text-slate-500'}`} />
            {learningStep >= 5 ? '🧠 Memory Updated' : 'Updating Memory...'}
          </h2>

          <div className="w-full max-w-sm flex flex-col items-center gap-2 mb-12">
            
            <div className="w-full bg-[#10172A] border border-cyan-500/30 rounded-lg p-4 text-center transition-all duration-300 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
              <span className="text-cyan-400 font-semibold tracking-wide uppercase text-sm">Incident</span>
            </div>
            
            <ArrowDown className={`w-6 h-6 transition-colors duration-500 ${learningStep >= 1 ? 'text-cyan-400' : 'text-slate-700'}`} />
            
            <div className={`w-full border rounded-lg p-4 text-center transition-all duration-500 ${learningStep >= 2 ? 'bg-[#10172A] border-emerald-500/30 shadow-[0_0_15px_rgba(52,211,153,0.2)] text-emerald-400 font-semibold tracking-wide uppercase text-sm' : 'bg-transparent border-white/5 text-slate-600 tracking-wide uppercase text-sm'}`}>
              <span>Resolution</span>
            </div>
            
            <ArrowDown className={`w-6 h-6 transition-colors duration-500 ${learningStep >= 2 ? 'text-emerald-400' : 'text-slate-700'}`} />
            
            <div className={`w-full border rounded-lg p-4 text-center transition-all duration-500 ${learningStep >= 3 ? 'bg-[#10172A] border-amber-500/30 shadow-[0_0_15px_rgba(251,191,36,0.2)] text-amber-400 font-semibold tracking-wide uppercase text-sm' : 'bg-transparent border-white/5 text-slate-600 tracking-wide uppercase text-sm'}`}>
              <span>Post-Mortem</span>
            </div>

            <ArrowDown className={`w-6 h-6 transition-colors duration-500 ${learningStep >= 3 ? 'text-amber-400' : 'text-slate-700'}`} />
            
            <div className={`w-full border rounded-lg p-4 text-center transition-all duration-500 ${learningStep >= 4 ? 'bg-[#10172A] border-pink-500/30 shadow-[0_0_15px_rgba(236,72,153,0.2)] text-pink-400 font-semibold tracking-wide uppercase text-sm' : 'bg-transparent border-white/5 text-slate-600 tracking-wide uppercase text-sm'}`}>
              <span>Lesson Learned</span>
            </div>

            <ArrowDown className={`w-6 h-6 transition-colors duration-500 ${learningStep >= 4 ? 'text-pink-400' : 'text-slate-700'}`} />
            
            <div className={`w-full border rounded-lg p-4 text-center transition-all duration-500 ${learningStep >= 5 ? 'bg-violet-500/10 border-violet-500/50 shadow-[0_0_30px_rgba(139,92,246,0.4)] text-violet-300 font-bold tracking-wide uppercase text-sm scale-105' : 'bg-transparent border-white/5 text-slate-600 tracking-wide uppercase text-sm'}`}>
              <span>Memory Updated</span>
            </div>

          </div>

          {learningStep >= 5 && (
            <div className="animate-in slide-in-from-bottom-4 fade-in duration-500 text-center">
               <p className="text-slate-300 mb-8 font-medium bg-white/5 px-8 py-4 rounded-full border border-white/10 flex items-center gap-3">
                 <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                 Future similar incidents can use this resolution history.
               </p>
               <GradientButton variant="outline" onClick={handleClose} className="px-8 py-2">
                 Close
               </GradientButton>
            </div>
          )}

        </div>
      )}
    </Modal>
  );
};
