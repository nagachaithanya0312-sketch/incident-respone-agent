import React, { useEffect, useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PageHeader } from '../components/ui/PageHeader';
import { GlassCard } from '../components/ui/GlassCard';
import { StatusBadge } from '../components/ui/StatusBadge';
import { IncidentSeverityBadge } from '../components/ui/IncidentSeverityBadge';
import { GradientButton } from '../components/ui/GradientButton';
import { Modal, Toast } from '../components/ui/Modal';
import { Search, Filter, Plus, ArrowRight, User, Clock } from 'lucide-react';
import { getIncidents, createIncident } from '../services/incidentService';

const Incidents = () => {
  const navigate = useNavigate();
  const [incidents, setIncidents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSeverity, setFilterSeverity] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [newIncident, setNewIncident] = useState({
    service: '',
    severity: 'MEDIUM',
    description: '',
    error: '',
    logs: '',
    environment: 'Production'
  });

  useEffect(() => {
    setIncidents(getIncidents());
  }, []);

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    const created = createIncident(newIncident);
    setIncidents(getIncidents());
    setIsCreateModalOpen(false);
    setToast({ message: `Incident ${created.id} created successfully!`, type: 'success' });
    setNewIncident({ service: '', severity: 'MEDIUM', description: '', error: '', logs: '', environment: 'Production' });
  };

  const filteredIncidents = useMemo(() => {
    return incidents.filter(inc => {
      const matchSearch = (inc.id + inc.service + inc.description + inc.error).toLowerCase().includes(searchQuery.toLowerCase());
      const matchSeverity = filterSeverity === 'All' || inc.severity.toUpperCase() === filterSeverity.toUpperCase();
      const matchStatus = filterStatus === 'All' || inc.status.toLowerCase() === filterStatus.toLowerCase();
      return matchSearch && matchSeverity && matchStatus;
    });
  }, [incidents, searchQuery, filterSeverity, filterStatus]);

  const activeCount = incidents.filter(i => !['resolved', 'closed'].includes(i.status.toLowerCase())).length;
  const resolvedCount = incidents.length - activeCount;

  return (
    <div className="space-y-6 animate-in fade-in duration-700 pb-12">
      <PageHeader 
        title="Incident Directory" 
        description="Monitor, analyze, and resolve system anomalies."
        actions={
          <GradientButton variant="primary" className="flex items-center gap-2" onClick={() => setIsCreateModalOpen(true)}>
            <Plus className="w-4 h-4" />
            <span>Declare Incident</span>
          </GradientButton>
        }
      />

      {/* Filters and Search */}
      <GlassCard className="overflow-hidden border border-white/10 p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="relative w-full lg:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by ID, service, description, or error..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#10172A] border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:shadow-[0_0_10px_rgba(34,211,238,0.1)] transition-all"
            />
          </div>
          
          <div className="flex flex-wrap gap-4 items-center w-full lg:w-auto">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Filter className="w-4 h-4" />
              <span>Severity:</span>
              <select 
                value={filterSeverity} 
                onChange={(e) => setFilterSeverity(e.target.value)}
                className="bg-[#10172A] border border-white/10 rounded px-2 py-1 outline-none focus:border-cyan-500/50"
              >
                <option value="All">All</option>
                <option value="CRITICAL">Critical</option>
                <option value="HIGH">High</option>
                <option value="MEDIUM">Medium</option>
                <option value="LOW">Low</option>
              </select>
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-400">
              <span>Status:</span>
              <select 
                value={filterStatus} 
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-[#10172A] border border-white/10 rounded px-2 py-1 outline-none focus:border-cyan-500/50"
              >
                <option value="All">All</option>
                <option value="detected">Detected</option>
                <option value="investigating">Investigating</option>
                <option value="mitigating">Mitigating</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Quick Tabs */}
        <div className="flex gap-2 text-sm mt-4 pt-4 border-t border-white/5">
          <button onClick={() => { setFilterStatus('All'); setFilterSeverity('All'); }} className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${filterStatus === 'All' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-slate-400 hover:text-slate-200'}`}>All ({incidents.length})</button>
          <button onClick={() => { setFilterStatus('All'); setFilterSeverity('CRITICAL'); }} className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${filterSeverity === 'CRITICAL' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'text-slate-400 hover:text-slate-200'}`}>Critical ({incidents.filter(i => i.severity === 'CRITICAL').length})</button>
          <button onClick={() => setFilterStatus('investigating')} className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${filterStatus === 'investigating' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'text-slate-400 hover:text-slate-200'}`}>Active ({activeCount})</button>
          <button onClick={() => setFilterStatus('resolved')} className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${filterStatus === 'resolved' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-slate-400 hover:text-slate-200'}`}>Resolved ({resolvedCount})</button>
        </div>
      </GlassCard>

      {/* Table */}
      <GlassCard className="overflow-hidden border border-white/10">
        <div className="overflow-x-auto custom-scrollbar min-h-[400px]">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-[#0B1020]/80 text-slate-400 border-b border-white/10 text-sm">
                <th className="p-4 font-medium tracking-wide">Incident ID</th>
                <th className="p-4 font-medium tracking-wide">Service</th>
                <th className="p-4 font-medium tracking-wide">Severity</th>
                <th className="p-4 font-medium tracking-wide">Status</th>
                <th className="p-4 font-medium tracking-wide">Detected / Duration</th>
                <th className="p-4 font-medium tracking-wide">Assigned</th>
                <th className="p-4 font-medium tracking-wide text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredIncidents.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-slate-500">
                    No incidents found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredIncidents.map((incident) => (
                  <tr key={incident.id} className="hover:bg-white/[0.02] transition-colors group cursor-pointer" onClick={() => navigate(`/incidents/${incident.id}`)}>
                    <td className="p-4">
                      <span className="font-mono text-cyan-400 font-medium bg-cyan-400/10 px-2 py-1 rounded border border-cyan-400/20">
                        {incident.id}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="text-slate-200 font-medium">{incident.service}</div>
                      <div className="text-xs text-slate-500 max-w-[200px] truncate mt-0.5">{incident.description}</div>
                    </td>
                    <td className="p-4">
                      <IncidentSeverityBadge severity={incident.severity} />
                    </td>
                    <td className="p-4">
                      <StatusBadge status={incident.status} />
                    </td>
                    <td className="p-4 text-sm text-slate-400">
                      <div className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> {new Date(incident.detected).toLocaleTimeString()}</div>
                      <div className="text-xs text-slate-500 mt-0.5">Duration: {incident.duration}</div>
                    </td>
                    <td className="p-4 text-sm text-slate-400">
                      <div className="flex items-center gap-1.5"><User className="w-3 h-3" /> {incident.assigned}</div>
                    </td>
                    <td className="p-4 text-right">
                      <button 
                        onClick={(e) => { e.stopPropagation(); navigate(`/incidents/${incident.id}`); }} 
                        className="inline-flex items-center gap-1.5 text-slate-400 hover:text-cyan-400 font-medium transition-colors"
                      >
                        Details
                        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* Create Modal */}
      <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} title="Declare New Incident">
        <form onSubmit={handleCreateSubmit} className="space-y-4 text-sm">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="font-medium text-slate-300">Service Affected <span className="text-red-400">*</span></label>
              <input required value={newIncident.service} onChange={e => setNewIncident({...newIncident, service: e.target.value})} type="text" className="w-full bg-[#050816] border border-white/10 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500" placeholder="e.g. Payment API" />
            </div>
            <div className="space-y-1.5">
              <label className="font-medium text-slate-300">Environment</label>
              <select value={newIncident.environment} onChange={e => setNewIncident({...newIncident, environment: e.target.value})} className="w-full bg-[#050816] border border-white/10 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500">
                <option value="Production">Production</option>
                <option value="Staging">Staging</option>
                <option value="Development">Development</option>
              </select>
            </div>
          </div>
          
          <div className="space-y-1.5">
            <label className="font-medium text-slate-300">Severity <span className="text-red-400">*</span></label>
            <div className="flex gap-4">
              {['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'].map(sev => (
                <label key={sev} className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="severity" value={sev} checked={newIncident.severity === sev} onChange={e => setNewIncident({...newIncident, severity: e.target.value})} className="text-cyan-500 focus:ring-cyan-500 bg-[#050816] border-white/10" />
                  <IncidentSeverityBadge severity={sev} />
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="font-medium text-slate-300">Short Description <span className="text-red-400">*</span></label>
            <input required value={newIncident.description} onChange={e => setNewIncident({...newIncident, description: e.target.value})} type="text" className="w-full bg-[#050816] border border-white/10 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500" placeholder="Brief summary of the issue" />
          </div>

          <div className="space-y-1.5">
            <label className="font-medium text-slate-300">Error Message / Stack Trace</label>
            <textarea value={newIncident.error} onChange={e => setNewIncident({...newIncident, error: e.target.value})} className="w-full h-20 bg-[#050816] border border-white/10 rounded-lg px-3 py-2 text-slate-200 font-mono text-xs focus:outline-none focus:border-cyan-500" placeholder="Paste relevant error messages here..."></textarea>
          </div>

          <div className="space-y-1.5">
            <label className="font-medium text-slate-300">Relevant Logs</label>
            <textarea value={newIncident.logs} onChange={e => setNewIncident({...newIncident, logs: e.target.value})} className="w-full h-20 bg-[#050816] border border-white/10 rounded-lg px-3 py-2 text-slate-200 font-mono text-xs focus:outline-none focus:border-cyan-500" placeholder="[14:32:00] ERROR..."></textarea>
          </div>

          <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
            <button type="button" onClick={() => setIsCreateModalOpen(false)} className="px-4 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors font-medium">Cancel</button>
            <GradientButton variant="primary" type="submit">Submit Incident</GradientButton>
          </div>
        </form>
      </Modal>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default Incidents;
