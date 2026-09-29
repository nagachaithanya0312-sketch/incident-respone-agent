import React, { useEffect, useState } from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { GlassCard } from '../components/ui/GlassCard';
import { FileText, Calendar, AlertTriangle, Zap, CheckCircle, Lightbulb } from 'lucide-react';
import { getPostMortems } from '../services/postMortemService';

const PostMortems = () => {
  const [postMortems, setPostMortems] = useState([]);

  useEffect(() => {
    setPostMortems(getPostMortems());
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in duration-700 pb-12">
      <PageHeader 
        title="Post-Mortem Reports" 
        description="Review past incidents, their root causes, and lessons learned."
      />

      <div className="grid grid-cols-1 gap-6">
        {postMortems.map(pm => (
          <GlassCard key={pm.id} className="p-6">
            <div className="flex justify-between items-start mb-4 border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                  <FileText className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{pm.id}</h3>
                  <span className="text-slate-400 text-sm">for incident {pm.incidentId}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                <Calendar className="w-4 h-4" />
                {pm.createdDate}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-amber-400 flex items-center gap-2 mb-2 uppercase tracking-wider">
                    <AlertTriangle className="w-4 h-4" /> Impact
                  </h4>
                  <p className="text-slate-300 text-sm bg-white/5 p-4 rounded-lg border border-white/5">{pm.impact}</p>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-red-400 flex items-center gap-2 mb-2 uppercase tracking-wider">
                    <Zap className="w-4 h-4" /> Root Cause
                  </h4>
                  <p className="text-slate-300 text-sm bg-white/5 p-4 rounded-lg border border-white/5">{pm.rootCause}</p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-2 mb-2 uppercase tracking-wider">
                    <CheckCircle className="w-4 h-4" /> Resolution
                  </h4>
                  <p className="text-slate-300 text-sm bg-white/5 p-4 rounded-lg border border-white/5">{pm.resolution}</p>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-cyan-400 flex items-center gap-2 mb-2 uppercase tracking-wider">
                    <Lightbulb className="w-4 h-4" /> Lessons Learned
                  </h4>
                  <p className="text-slate-300 text-sm bg-white/5 p-4 rounded-lg border border-white/5">{pm.lessonsLearned}</p>
                </div>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

export default PostMortems;
