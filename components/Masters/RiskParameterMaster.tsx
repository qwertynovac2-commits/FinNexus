
import React, { useState } from 'react';
import { 
  ShieldAlert, Plus, Target, CheckCircle2, AlertTriangle, ShieldCheck, 
  Database, Zap, Edit, Trash2, XCircle, ChevronRight, BarChart, 
  Settings, Sliders, Clock, Info 
} from 'lucide-react';

const RiskParameterMaster: React.FC = () => {
  const [activeModel, setActiveModel] = useState('RETAIL-V1');
  const [isAddOpen, setIsAddOpen] = useState(false);

  const riskRules = [
    { id: 'RSK-01', factor: 'Credit Bureau Score (CIBIL)', weight: '40%', threshold: '> 750', action: 'Auto-Approve', status: 'Live' },
    { id: 'RSK-02', factor: 'Debt-to-Income (DTI) Ratio', weight: '25%', threshold: '< 55%', action: 'Soft Review', status: 'Live' },
    { id: 'RSK-03', factor: 'Employment Stability (Yrs)', weight: '15%', threshold: '> 2 Yrs', action: 'Hard Review', status: 'Live' },
    { id: 'RSK-04', factor: 'Alternative Data Scans', weight: '10%', threshold: '> 60 Sc.', action: 'Review', status: 'Live' },
    { id: 'RSK-05', factor: 'Negative Area Check', weight: 'Critical', threshold: 'Pincode List', action: 'Hard Reject', status: 'Live' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-black text-slate-800 tracking-tight">Credit Risk & Decision Framework</h3>
          <p className="text-sm text-slate-500 font-medium uppercase tracking-widest text-[10px] mt-1">Configure Scoring Bands, Thresholds & Auto-Decisioning Logic</p>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 shadow-sm transition-colors">Decision Logs</button>
          <button 
            onClick={() => setIsAddOpen(true)}
            className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
          >
            <Plus className="w-4 h-4" />
            New Decision Rule
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         <div className="bg-white p-10 rounded-[56px] border border-slate-100 shadow-sm space-y-10">
            <div className="flex justify-between items-center border-b border-slate-50 pb-6">
               <div>
                  <h4 className="text-sm font-black text-slate-800 uppercase tracking-widest">Weightage Distribution</h4>
                  <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Model: {activeModel}</p>
               </div>
               <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-2 py-1 rounded">Total 100%</span>
            </div>
            <div className="space-y-8">
               {[
                 { label: 'Bureau Data (CIBIL)', pct: 40, color: 'bg-indigo-600' },
                 { label: 'Financials & DTI', pct: 30, color: 'bg-blue-600' },
                 { label: 'Collateral/LTV', pct: 20, color: 'bg-emerald-600' },
                 { label: 'Social/Alternative', pct: 10, color: 'bg-amber-600' }
               ].map((w, i) => (
                  <div key={i} className="space-y-3">
                     <div className="flex justify-between text-[10px] font-black uppercase text-slate-500 tracking-widest">
                        <span>{w.label}</span>
                        <span className="text-slate-800">{w.pct}%</span>
                     </div>
                     <div className="h-3 bg-slate-50 rounded-full overflow-hidden border border-slate-100 relative shadow-inner">
                        <div className={`h-full ${w.color} transition-all duration-1000 ease-out shadow-lg`} style={{ width: `${w.pct}%` }}></div>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         <div className="lg:col-span-2 bg-slate-900 text-white p-10 rounded-[56px] shadow-2xl relative overflow-hidden flex flex-col justify-between">
            <div className="z-10">
               <div className="flex items-center gap-4 mb-8">
                  <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-md">
                     <Zap className="w-8 h-8 text-blue-400 fill-blue-400" />
                  </div>
                  <div>
                     <h4 className="text-2xl font-black tracking-tight">Decisioning Engine</h4>
                     <p className="text-slate-400 text-sm font-medium tracking-wide">AI-powered Straight Through Processing (STP)</p>
                  </div>
               </div>
               
               <div className="grid grid-cols-3 gap-6 mb-10">
                  {[
                    { label: 'STP Rate', val: '64.2%', icon: <Target className="w-4 h-4" /> },
                    { label: 'Default Pred.', val: '92% Acc.', icon: <ShieldAlert className="w-4 h-4" /> },
                    { label: 'Decision Time', val: '4.2s', icon: <Clock className="w-4 h-4" /> }
                  ].map((stat, i) => (
                    <div key={i} className="p-4 bg-white/5 rounded-[28px] border border-white/10 space-y-2">
                       <div className="text-blue-400">{stat.icon}</div>
                       <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</p>
                       <p className="text-lg font-black text-white">{stat.val}</p>
                    </div>
                  ))}
               </div>
            </div>
            <BarChart className="w-64 h-64 text-white/5 absolute -right-16 -bottom-16 rotate-12" />
         </div>
      </div>

      <div className="bg-white rounded-[48px] border border-slate-100 shadow-sm overflow-hidden mt-8">
        <div className="p-6 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between">
           <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Active Decision Rule Master</h4>
           <div className="flex gap-2">
              <button className="p-2.5 bg-white border border-slate-200 rounded-xl shadow-sm hover:bg-slate-50 transition-colors"><Sliders className="w-4 h-4 text-slate-400" /></button>
           </div>
        </div>
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <tr>
              <th className="px-6 py-4">Risk Factor / KPI</th>
              <th className="px-6 py-4">Weightage</th>
              <th className="px-6 py-4">Decision Threshold</th>
              <th className="px-6 py-4">Automated Action</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm font-bold">
            {riskRules.map((r) => (
              <tr key={r.id} className="hover:bg-slate-50/50 transition-colors group cursor-pointer">
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-slate-800">{r.factor}</span>
                    <span className="text-[9px] text-indigo-600 font-black uppercase tracking-widest">{r.id}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-900 font-black">
                   <span className={`px-2 py-1 rounded-lg ${r.weight === 'Critical' ? 'bg-red-50 text-red-700' : 'bg-slate-100 text-slate-600'}`}>{r.weight}</span>
                </td>
                <td className="px-6 py-4">
                   <code className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-600 font-mono shadow-sm">{r.threshold}</code>
                </td>
                <td className="px-6 py-4">
                   <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                     r.action.includes('Reject') ? 'bg-red-100 text-red-700' : 
                     r.action.includes('Approve') ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                   }`}>{r.action}</span>
                </td>
                <td className="px-6 py-4">
                   <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
                      <span className="text-[10px] font-black text-slate-500 uppercase">{r.status}</span>
                   </div>
                </td>
                <td className="px-6 py-4 text-right">
                   <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-slate-400 hover:text-blue-600 bg-white border border-slate-100 rounded-lg shadow-sm"><Edit className="w-4 h-4" /></button>
                      <button className="p-2 text-slate-400 hover:text-red-600 bg-white border border-slate-100 rounded-lg shadow-sm"><Trash2 className="w-4 h-4" /></button>
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isAddOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[200] flex items-center justify-center p-6">
          <div className="bg-white w-full max-w-4xl rounded-[48px] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
             <div className="p-8 border-b border-slate-100 flex justify-between items-center">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-100">
                      <Target className="w-6 h-6" />
                   </div>
                   <h4 className="text-xl font-black text-slate-800 tracking-tight">Define Credit Decisioning Logic</h4>
                </div>
                <button onClick={() => setIsAddOpen(false)} className="p-2 hover:bg-slate-50 rounded-xl text-slate-400"><XCircle className="w-6 h-6" /></button>
             </div>
             
             <div className="p-10 bg-slate-50/50 flex-1 overflow-y-auto">
                <div className="grid grid-cols-2 gap-10">
                   <div className="space-y-8">
                      <section className="space-y-4">
                         <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b pb-2">Rule Configuration</h5>
                         <div className="space-y-4">
                            <div className="space-y-2">
                               <label className="text-[10px] font-black text-slate-500 uppercase">Decision Parameter</label>
                               <select className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold outline-none shadow-sm appearance-none">
                                  <option>Fixed Obligation to Income (FOIR)</option>
                                  <option>Loan-to-Value (LTV)</option>
                                  <option>Bureau Delinquency Pattern</option>
                                  <option>Employment Vintage</option>
                               </select>
                            </div>
                            <div className="space-y-2">
                               <label className="text-[10px] font-black text-slate-500 uppercase">Operator</label>
                               <select className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold outline-none shadow-sm appearance-none">
                                  <option>Less Than (&lt;)</option>
                                  <option>Greater Than (&gt;)</option>
                                  <option>Equals (=)</option>
                                  <option>In Range (Between)</option>
                               </select>
                            </div>
                            <div className="space-y-2">
                               <label className="text-[10px] font-black text-slate-500 uppercase">Threshold Value</label>
                               <input type="text" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold outline-none shadow-sm" placeholder="e.g. 55" />
                            </div>
                         </div>
                      </section>
                   </div>

                   <div className="space-y-8">
                      <section className="space-y-4">
                         <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b pb-2">Decision Mapping</h5>
                         <div className="space-y-4">
                            <div className="space-y-2">
                               <label className="text-[10px] font-black text-slate-500 uppercase">Engine Action</label>
                               <div className="grid grid-cols-2 gap-4">
                                  {['Auto-Approve', 'Auto-Reject', 'Soft-Review', 'Hard-Review'].map(act => (
                                     <div key={act} className="p-4 border-2 border-slate-200 rounded-2xl flex items-center gap-3 bg-white cursor-pointer hover:border-indigo-600 transition-all group">
                                        <div className="w-4 h-4 rounded-full border-2 border-slate-200 group-hover:border-indigo-600 transition-colors"></div>
                                        <span className="text-[10px] font-black text-slate-700 uppercase">{act}</span>
                                     </div>
                                  ))}
                               </div>
                            </div>
                         </div>
                      </section>
                      
                      <div className="p-6 bg-amber-50 border border-amber-100 rounded-[32px] flex items-start gap-4">
                         <Info className="w-5 h-5 text-amber-600 mt-1" />
                         <p className="text-[10px] font-bold text-amber-800 leading-relaxed uppercase tracking-tight">Warning: Changing decision thresholds for DTI will impact ~14% of the current pipeline approval rate. Ensure historical backtest is completed.</p>
                      </div>
                   </div>
                </div>
             </div>
             <div className="p-8 border-t border-slate-100 flex justify-end gap-4 bg-white">
                <button onClick={() => setIsAddOpen(false)} className="px-8 py-3.5 border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 transition-colors hover:bg-slate-50">Cancel</button>
                <button onClick={() => setIsAddOpen(false)} className="px-16 py-3.5 bg-indigo-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl hover:bg-slate-800 transition-all">Publish Rule</button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RiskParameterMaster;
