
import React, { useState } from 'react';
import { 
  Search, Plus, Target, ShieldAlert, IndianRupee, 
  MessageSquare, Scale, Phone, UserCheck, AlertTriangle,
  Clock, ArrowRight, Zap, CheckCircle2, MoreVertical, Edit2, XCircle, Info, ChevronRight, Gavel, Mail, Smartphone
} from 'lucide-react';

const CollectionStrategyMaster: React.FC = () => {
  const [activeStrategy, setActiveStrategy] = useState('STD-PL');
  const [isEditOpen, setIsEditOpen] = useState(false);

  const buckets = [
    { id: 'B0', range: '-5 to 0 DPD', cat: 'Preventive', tone: 'Friendly', channel: 'WA, SMS, Push', owner: 'System Bot', action: 'Payment Reminder' },
    { id: 'B1', range: '1 to 30 DPD', cat: 'Early Delinq.', tone: 'Helpful', channel: 'Calls, SMS, WA', owner: 'Call Center', action: 'Reason for Miss' },
    { id: 'B2', range: '31 to 60 DPD', cat: 'Moderate', tone: 'Firm', channel: 'Daily Calls, Visit', owner: 'Sr. Officer', action: 'Hard Demand' },
    { id: 'B3', range: '61 to 90 DPD', cat: 'Pre-NPA', tone: 'Strict', channel: 'Legal, Field, Daily', owner: 'Manager', action: 'Collateral Warning' },
    { id: 'B4', range: '90+ DPD (NPA)', cat: 'Recovery', tone: 'Legal', channel: 'Court, Agency, Repo', owner: 'Legal Team', action: 'SARFAESI / Legal' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-black text-slate-800 tracking-tight">Debt Recovery & Collection DNA</h3>
          <p className="text-sm text-slate-500 font-medium uppercase tracking-widest text-[10px] mt-1">Configure DPD Logic, Automated Triggers & Legal Thresholds</p>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-50">Compare Strategies</button>
          <button className="flex items-center gap-2 bg-red-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-100">
            <Plus className="w-4 h-4" />
            New Recovery Plan
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-8">
           <div className="bg-white p-10 rounded-[56px] border border-slate-100 shadow-sm relative overflow-hidden">
              <h4 className="text-lg font-black text-slate-800 mb-10 flex items-center gap-2">
                 <Zap className="w-5 h-5 text-amber-500 fill-amber-500" />
                 Delinquency Lifecycle Flow
              </h4>
              <div className="flex items-start justify-between relative px-4">
                 <div className="absolute top-[28px] left-12 right-12 h-1 bg-slate-100 z-0"></div>
                 {buckets.map((b, i) => (
                    <div key={b.id} className="relative z-10 flex flex-col items-center group w-32 cursor-pointer">
                       <div className={`w-14 h-14 rounded-[22px] flex items-center justify-center border-4 border-white shadow-xl mb-4 transition-all group-hover:scale-110 ${
                          i === 0 ? 'bg-green-500 text-white shadow-green-100' : 
                          i === 1 ? 'bg-blue-500 text-white shadow-blue-100' : 
                          i === 2 ? 'bg-amber-500 text-white shadow-amber-100' :
                          i === 3 ? 'bg-orange-500 text-white shadow-orange-100' : 'bg-slate-900 text-white shadow-slate-100'
                       }`}>
                          <span className="font-black text-sm">{b.id}</span>
                       </div>
                       <div className="text-center">
                          <p className="text-[10px] font-black text-slate-800 uppercase tracking-widest">{b.range}</p>
                          <p className="text-[9px] font-bold text-slate-400 mt-1">{b.cat}</p>
                       </div>
                    </div>
                 ))}
              </div>
              <div className="absolute -right-20 -top-20 w-48 h-48 bg-slate-50 rounded-full blur-3xl opacity-50"></div>
           </div>

           <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
                 <div className="flex items-center gap-3">
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Active Strategy: Standard Personal Loan (PL-01)</h4>
                    <span className="text-[9px] font-black bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full uppercase">Effective: 01 Jan 2024</span>
                 </div>
                 <div className="flex gap-2">
                    <button onClick={() => setIsEditOpen(true)} className="p-2 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-all"><Edit2 className="w-4 h-4 text-slate-500" /></button>
                 </div>
              </div>
              <div className="divide-y divide-slate-100">
                 {buckets.map((b, i) => (
                    <div key={b.id} className="p-8 flex items-center gap-12 hover:bg-slate-50/50 transition-all group">
                       <div className="w-16 flex flex-col items-center">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black mb-1 ${
                            i === 0 ? 'bg-green-50 text-green-600' : 'bg-slate-100 text-slate-600'
                          }`}>{b.id}</div>
                          <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Bucket</span>
                       </div>
                       
                       <div className="flex-1 space-y-4">
                          <div className="flex items-center gap-4">
                             <p className="text-lg font-black text-slate-800 tracking-tight">{b.cat}</p>
                             <div className="flex items-center gap-2">
                                <span className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-[9px] font-black uppercase tracking-widest">{b.owner}</span>
                                <span className="px-2 py-1 bg-slate-100 text-slate-500 rounded-lg text-[9px] font-black uppercase tracking-widest">{b.tone} Tone</span>
                             </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-8">
                             <div className="space-y-2">
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Primary Action Plan</p>
                                <p className="text-xs font-bold text-slate-600 flex items-center gap-2">
                                   <ArrowRight className="w-3 h-3 text-blue-500" />
                                   {b.action}
                                </p>
                             </div>
                             <div className="space-y-2">
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Channels Configured</p>
                                <div className="flex gap-2">
                                   {b.channel.split(',').map((ch, idx) => (
                                      <span key={idx} className="text-[9px] font-black text-slate-700 bg-white border border-slate-200 px-2 py-1 rounded-lg shadow-sm">{ch.trim()}</span>
                                   ))}
                                </div>
                             </div>
                          </div>
                       </div>

                       <div className="flex flex-col gap-2">
                          <button className="px-4 py-2 border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:border-blue-300 transition-all">Templates</button>
                          <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 shadow-md shadow-blue-100 transition-all">Configure</button>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>

        <div className="space-y-6">
           <div className="bg-slate-900 text-white p-8 rounded-[48px] shadow-2xl relative overflow-hidden">
              <h4 className="font-black text-xs uppercase tracking-[0.2em] mb-8 flex items-center gap-2 text-red-400">
                 <ShieldAlert className="w-5 h-5" />
                 Escalation Matrix
              </h4>
              <div className="space-y-8">
                 {[
                   { trigger: 'Broken PTP x 2', action: 'Immediate Field Visit Trigger', risk: 'High' },
                   { trigger: 'Unreachable > 3 Days', action: 'Reference/Guarantor Contact', risk: 'Critical' },
                   { trigger: 'Overdue > ₹2.5L', action: 'Managerial Intervention', risk: 'Medium' }
                 ].map((esc, i) => (
                    <div key={i} className="space-y-2 border-l-4 border-red-500/20 pl-4 relative">
                       <div className="flex justify-between items-center">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{esc.trigger}</p>
                          <span className="text-[8px] font-black text-red-400 bg-red-400/10 px-2 py-0.5 rounded-full uppercase">{esc.risk}</span>
                       </div>
                       <p className="text-xs font-black text-white leading-relaxed">{esc.action}</p>
                    </div>
                 ))}
              </div>
              <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-red-600/10 rounded-full blur-3xl"></div>
           </div>

           <div className="p-8 bg-white border border-slate-100 rounded-[48px] shadow-sm space-y-8">
              <h4 className="font-black text-slate-800 text-sm flex items-center gap-2">
                 <Scale className="w-4 h-4 text-blue-600" />
                 Settlement & Waiver Slabs
              </h4>
              <div className="space-y-6">
                 {[
                   { role: 'Collection Executive', limit: '₹2,500', waiver: 'Charges only' },
                   { role: 'Unit Manager', limit: '₹25,000', waiver: 'Principal (0%)' },
                   { role: 'Regional Risk Head', limit: '₹1.5L', waiver: 'Full Charges' },
                   { role: 'CRO/Committee', limit: 'No Limit', waiver: 'Full Settlement' }
                 ].map((w, i) => (
                    <div key={i} className="flex flex-col gap-1 py-3 border-b border-slate-50 last:border-0">
                       <div className="flex justify-between items-center">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{w.role}</span>
                          <span className="text-sm font-black text-slate-900">{w.limit}</span>
                       </div>
                       <p className="text-[9px] font-bold text-blue-600 uppercase tracking-tighter">Authority: {w.waiver}</p>
                    </div>
                 ))}
              </div>
           </div>

           <div className="p-6 bg-indigo-50 border border-indigo-100 rounded-[40px] shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-indigo-600">
                <Gavel className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-black text-indigo-900 uppercase tracking-widest">Legal Portal</p>
                <p className="text-[10px] text-indigo-600 font-bold">12 Pending Filings</p>
              </div>
              <button className="ml-auto p-2 bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-100 hover:scale-110 transition-transform">
                <ArrowRight className="w-4 h-4" />
              </button>
           </div>
        </div>
      </div>

      {isEditOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[200] flex items-center justify-center p-6">
          <div className="bg-white w-full max-w-4xl rounded-[48px] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
             <div className="p-8 border-b border-slate-100 flex justify-between items-center">
                <h4 className="text-xl font-black text-slate-800 tracking-tight">Configure Recovery Actions</h4>
                <button onClick={() => setIsEditOpen(false)} className="p-2 hover:bg-slate-50 rounded-xl text-slate-400"><XCircle className="w-6 h-6" /></button>
             </div>
             <div className="p-10 space-y-8 bg-slate-50/50">
                <div className="grid grid-cols-2 gap-8">
                   <div className="space-y-4">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Communication Frequency</label>
                      <div className="grid grid-cols-2 gap-4">
                         <div className="p-4 bg-white border border-slate-200 rounded-2xl flex flex-col gap-1">
                            <span className="text-[9px] font-black text-slate-400 uppercase">Max Calls/Day</span>
                            <input type="number" className="text-lg font-black text-slate-800 outline-none" defaultValue={2} />
                         </div>
                         <div className="p-4 bg-white border border-slate-200 rounded-2xl flex flex-col gap-1">
                            <span className="text-[9px] font-black text-slate-400 uppercase">Max SMS/Day</span>
                            <input type="number" className="text-lg font-black text-slate-800 outline-none" defaultValue={5} />
                         </div>
                      </div>
                   </div>
                   <div className="space-y-4">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Operational Timings (RBI Adherence)</label>
                      <div className="grid grid-cols-2 gap-4">
                         <div className="p-4 bg-white border border-slate-200 rounded-2xl flex flex-col gap-1">
                            <span className="text-[9px] font-black text-slate-400 uppercase">Call From</span>
                            <input type="time" className="text-sm font-black text-slate-800 outline-none" defaultValue="08:00" />
                         </div>
                         <div className="p-4 bg-white border border-slate-200 rounded-2xl flex flex-col gap-1">
                            <span className="text-[9px] font-black text-slate-400 uppercase">Call To</span>
                            <input type="time" className="text-sm font-black text-slate-800 outline-none" defaultValue="19:00" />
                         </div>
                      </div>
                   </div>
                </div>
                
                <div className="space-y-4">
                   <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Message Template Priority</label>
                   <div className="space-y-3">
                      {[
                        { id: 'WA', icon: <MessageSquare className="w-3 h-3" />, label: 'WhatsApp - Direct Payment Link' },
                        { id: 'SMS', icon: <Smartphone className="w-3 h-3" />, label: 'SMS - Due Date Reminder' },
                        { id: 'MAIL', icon: <Mail className="w-3 h-3" />, label: 'Email - Informal Overdue Notice' }
                      ].map(t => (
                        <div key={t.id} className="p-4 bg-white border border-slate-200 rounded-2xl flex items-center justify-between">
                           <div className="flex items-center gap-3">
                              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">{t.icon}</div>
                              <span className="text-xs font-black text-slate-700">{t.label}</span>
                           </div>
                           <button className="text-[9px] font-black text-blue-600 uppercase tracking-widest">Edit Template</button>
                        </div>
                      ))}
                   </div>
                </div>
             </div>
             <div className="p-8 border-t border-slate-100 flex justify-end gap-4 bg-white">
                <button onClick={() => setIsEditOpen(false)} className="px-8 py-3.5 border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500">Cancel</button>
                <button onClick={() => setIsEditOpen(false)} className="px-12 py-3.5 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-slate-800 transition-all">Update Recovery Strategy</button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollectionStrategyMaster;
