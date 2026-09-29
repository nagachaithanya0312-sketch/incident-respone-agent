import React, { useState, useEffect } from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { GlassCard } from '../components/ui/GlassCard';
import { GradientButton } from '../components/ui/GradientButton';
import { IncidentSeverityBadge } from '../components/ui/IncidentSeverityBadge';
import { SimilarityRing } from '../components/ui/SimilarityRing';
import { Search, Filter, BrainCircuit, Activity, Database, CheckCircle2, AlertTriangle, BookOpen, Clock, ArrowRight } from 'lucide-react';
import { searchIncidentMemory } from '../services/incidentMemoryService';
import { useNavigate } from 'react-router-dom';

const IncidentMemory = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [results, setResults] = useState([]);
  
  // Filters
  const [filterService, setFilterService] = useState('All');
  const [filterSeverity, setFilterSeverity] = useState('All');
  const [filterDate, setFilterDate] = useState('All Time');
  const [filterStatus, setFilterStatus] = useState('All');

  const handleSearch = async (e) => {
    e?.preventDefault();
    setIsSearching(true);
    setHasSearched(true);
    
    const filters = {
      service: filterService,
      severity: filterSeverity,
      date: filterDate,
      resolutionStatus: filterStatus
    };

    const data = await searchIncidentMemory(query, filters);
    setResults(data);
    setIsSearching(false);
  };

  // Run initial search to populate if needed, or leave empty until user types.
  // The requirements say "Search what your organization has already learned."
  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in duration-700 pb-12">
      <PageHeader 
        title="Incident Memory" 
        description="Search what your organization has already learned."
      />

      <GlassCard className="p-6 border-cyan-500/20 relative overflow-hidden">
        {/* Animated background glow for search box */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-cyan-500/5 blur-3xl transition-opacity duration-1000 ${isSearching ? 'opacity-100 animate-pulse' : 'opacity-0'}`}></div>
        
        <form onSubmit={handleSearch} className="relative z-10 space-y-4">
          <div className="relative">
            <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 transition-colors duration-300 ${isSearching ? 'text-cyan-400' : 'text-slate-500'}`} />
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search incidents, symptoms, errors or root causes..." 
              className="w-full bg-[#050816] border border-white/10 rounded-xl pl-14 pr-4 py-4 text-lg text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 focus:shadow-[0_0_20px_rgba(34,211,238,0.15)] transition-all"
            />
            <GradientButton variant="primary" type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 px-6">
              Search Memory
            </GradientButton>
          </div>
          
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Filter className="w-4 h-4" />
              <span className="font-medium uppercase tracking-wider text-xs">Filters:</span>
            </div>
            
            <select value={filterService} onChange={e => setFilterService(e.target.value)} className="bg-[#10172A] border border-white/10 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-cyan-500/50">
              <option value="All">All Services</option>
              <option value="Payment API">Payment API</option>
              <option value="Auth Service">Auth Service</option>
              <option value="Search Index">Search Index</option>
              <option value="Notification Service">Notification Service</option>
              <option value="User Profile DB">User Profile DB</option>
              <option value="Frontend App">Frontend App</option>
              <option value="Background Workers">Background Workers</option>
            </select>
            
            <select value={filterSeverity} onChange={e => setFilterSeverity(e.target.value)} className="bg-[#10172A] border border-white/10 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-cyan-500/50">
              <option value="All">All Severities</option>
              <option value="CRITICAL">Critical</option>
              <option value="HIGH">High</option>
              <option value="MEDIUM">Medium</option>
              <option value="LOW">Low</option>
            </select>

            <select value={filterDate} onChange={e => setFilterDate(e.target.value)} className="bg-[#10172A] border border-white/10 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-cyan-500/50">
              <option value="All Time">All Time</option>
              <option value="Last 30 Days">Last 30 Days</option>
              <option value="Last 90 Days">Last 90 Days</option>
            </select>
            
            <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="bg-[#10172A] border border-white/10 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-cyan-500/50">
              <option value="All">All Resolutions</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
        </form>
      </GlassCard>

      {/* Results Area */}
      <div className="space-y-6 pt-4">
        {isSearching ? (
          <div className="flex flex-col items-center justify-center py-20 text-cyan-400 space-y-4 animate-in fade-in duration-300">
            <div className="relative">
              <BrainCircuit className="w-12 h-12 absolute opacity-20" />
              <BrainCircuit className="w-12 h-12 animate-ping opacity-50" />
            </div>
            <p className="font-mono text-sm tracking-widest uppercase">Searching incident memory...</p>
          </div>
        ) : hasSearched && results.length === 0 ? (
          <GlassCard className="p-12 text-center border-dashed border-white/20">
            <Search className="w-12 h-12 text-slate-500 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-slate-200 mb-2">No historical incidents found</h3>
            <p className="text-slate-400">Try adjusting your search terms or expanding your filters.</p>
          </GlassCard>
        ) : (
          <div className="space-y-6">
            {hasSearched && (
              <p className="text-sm font-medium text-slate-400 flex items-center gap-2">
                <Database className="w-4 h-4" /> Found {results.length} relevant historical {results.length === 1 ? 'incident' : 'incidents'}
              </p>
            )}
            
            {results.map((inc, i) => (
              <GlassCard key={inc.id} className="p-0 overflow-hidden animate-in slide-in-from-bottom-4 fade-in" style={{ animationFillMode: 'both', animationDelay: `${i * 100}ms` }}>
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    
                    {/* Left Column: ID & Similarity */}
                    <div className="flex lg:flex-col items-center lg:items-start justify-between lg:justify-start lg:w-48 shrink-0 border-b lg:border-b-0 lg:border-r border-white/10 pb-4 lg:pb-0 lg:pr-6">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-lg font-bold text-cyan-400">{inc.id}</span>
                        </div>
                        <p className="text-sm font-medium text-slate-300 mb-2">{inc.service}</p>
                        <IncidentSeverityBadge severity={inc.severity} />
                      </div>
                      
                      {query.trim().length > 0 && inc.similarity && (
                        <div className="flex flex-col items-center mt-0 lg:mt-6">
                          <SimilarityRing percentage={inc.similarity * 100} size={70} strokeWidth={5} />
                          <p className="text-[10px] text-slate-500 text-center mt-3 max-w-[120px] leading-relaxed">
                            High similarity based on incident symptoms, service and error patterns.
                          </p>
                        </div>
                      )}
                    </div>
                    
                    {/* Main Details */}
                    <div className="flex-1 space-y-4">
                      
                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1.5"><AlertTriangle className="w-3.5 h-3.5" /> Symptoms / Problem</h4>
                        <p className="text-slate-200 text-sm leading-relaxed">{inc.problem}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1.5"><Activity className="w-3.5 h-3.5" /> Root Cause</h4>
                        <p className="text-red-300 bg-red-500/5 p-3 rounded-lg border border-red-500/10 text-sm leading-relaxed">{inc.rootCause}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5" /> Successful Resolution</h4>
                        <p className="text-emerald-300 bg-emerald-500/5 p-3 rounded-lg border border-emerald-500/10 text-sm leading-relaxed">{inc.resolution}</p>
                      </div>
                      
                    </div>
                  </div>
                </div>
                
                {/* Card Footer */}
                <div className="bg-[#0B1020]/50 border-t border-white/5 p-4 px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-slate-400">
                    <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-slate-500" /> Resolution Time: {inc.resolutionTime}</span>
                    <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4 text-slate-500" /> Runbook: <span className="font-mono text-cyan-400 cursor-pointer hover:underline">{inc.runbook}</span></span>
                  </div>
                  <GradientButton variant="outline" className="px-4 py-1.5 text-sm" onClick={() => navigate(`/incidents/${inc.id}`)}>
                    View Incident <ArrowRight className="w-4 h-4 inline ml-1" />
                  </GradientButton>
                </div>
              </GlassCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default IncidentMemory;
