
import React, { useState } from 'react';
import { Search, Plus, Filter, IndianRupee, Percent, Clock, Target, ShieldCheck, ArrowRight, Zap, Copy, Edit, Trash2, CheckCircle2 } from 'lucide-react';

const CreditMaster: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'PERSONAL' | 'BUSINESS' | 'GOLD'>('PERSONAL');

  const mockProducts = [
    { id: 'PROD-101', code: 'PL-SAL', name: 'Salaried Personal Loan', roi: '14.5%', tenure: '12-60M', limit: '₹5L', category: 'PERSONAL', status: 'Active' },
    { id: 'PROD-102', code: 'PL-SEL', name: 'Professional Personal Loan', roi: '16.2%', tenure: '24-72M', limit: '₹15L', category: 'PERSONAL', status: 'Active' },
    { id: 'PROD-103', code: 'BL-MSME', name: 'Micro Business Loan', roi: '11.5%', tenure: '12-36M', limit: '₹50L', category: 'BUSINESS', status: 'Active' },
  ].filter(p => p.category === activeTab);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-black text-slate-800 tracking-tight">Product & Credit Engine</h3>
          <p className="text-sm text-slate-500 font-medium uppercase tracking-widest text-[10px] mt-1">Configure Slabs, ROI, Eligibility & TAT</p>
        </div>
        <button className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
          <Plus className="w-4 h-4" />
          Add New Loan Product
        </button>
      </div>

      <div className="flex gap-4 border-b border-slate-100">
        {(['PERSONAL', 'BUSINESS', 'GOLD'] as const).map(cat => (
          <button 
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`pb-4 px-2 text-sm font-black uppercase tracking-widest border-b-2 transition-all ${
              activeTab === cat ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400'
            }`}
          >
            {cat} LOANS
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <tr>
                  <th className="px-6 py-4">Product Name / Code</th>
                  <th className="px-6 py-4">Interest (p.a.)</th>
                  <th className="px-6 py-4">Max Limit</th>
                  <th className="px-6 py-4">Tenure (Max)</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm font-bold">
                {mockProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/50 transition-colors group cursor-pointer">
                    <td className="px-6 py-4">
                      <div className="text-slate-800">{p.name}</div>
                      <div className="text-[10px] text-blue-600 font-black tracking-widest">{p.code}</div>
                    </td>
                    <td className="px-6 py-4 text-indigo-600">{p.roi}</td>
                    <td className="px-6 py-4 text-slate-700">{p.limit}</td>
                    <td className="px-6 py-4 text-slate-600">{p.tenure}</td>
                    <td className="px-6 py-4">
                       <span className="px-2 py-0.5 bg-green-50 text-green-700 rounded-lg text-[10px] font-black">ACTIVE</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                       <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-2 text-slate-400 hover:text-blue-600 rounded-lg transition-colors bg-white shadow-sm border border-slate-100"><Edit className="w-4 h-4" /></button>
                          <button className="p-2 text-slate-400 hover:text-slate-600 rounded-lg transition-colors bg-white shadow-sm border border-slate-100"><Copy className="w-4 h-4" /></button>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-8">
             <div className="flex justify-between items-center">
                <h4 className="text-lg font-black text-slate-800 flex items-center gap-2">
                   <Zap className="w-5 h-5 text-amber-500" />
                   Rule-Based Underwriting Slabs
                </h4>
                <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest flex items-center gap-1">
                   <Plus className="w-3 h-3" /> Add Rule Slab
                </button>
             </div>
             <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'CIBIL > 750', action: 'Auto-Approval (STP)', color: 'border-emerald-200 bg-emerald-50/30 text-emerald-700' },
                  { label: 'DTI Ratio > 60%', action: 'Mandatory Hard-Review', color: 'border-amber-200 bg-amber-50/30 text-amber-700' },
                  { label: 'Pincode in Neg-List', action: 'Immediate Hard-Rejection', color: 'border-red-200 bg-red-50/30 text-red-700' },
                  { label: 'Age < 21 Years', action: 'Co-Applicant Mandatory', color: 'border-indigo-200 bg-indigo-50/30 text-indigo-700' }
                ].map((rule, idx) => (
                   <div key={idx} className={`p-4 rounded-2xl border-2 border-dashed flex items-center justify-between ${rule.color}`}>
                      <div>
                         <p className="text-[10px] font-black uppercase tracking-widest opacity-60">IF</p>
                         <p className="text-sm font-black">{rule.label}</p>
                      </div>
                      <div className="text-right">
                         <p className="text-[10px] font-black uppercase tracking-widest opacity-60">THEN</p>
                         <p className="text-xs font-bold">{rule.action}</p>
                      </div>
                   </div>
                ))}
             </div>
          </div>
        </div>

        <div className="space-y-6">
           <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-xl relative overflow-hidden">
              <h4 className="font-black text-sm uppercase tracking-widest mb-6 flex items-center gap-2">
                 <ShieldCheck className="w-4 h-4 text-blue-400" />
                 Compliance DNA
              </h4>
              <div className="space-y-4">
                 {[
                   'Fair Practice Code v2.4',
                   'RBI Digital Lending Rules',
                   'AML-KYC Master Direction',
                   'Data Localization Policy'
                 ].map(rule => (
                    <div key={rule} className="flex items-center gap-2 text-[10px] font-bold text-slate-400 bg-slate-800/50 p-3 rounded-xl border border-slate-700">
                       <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                       {rule}
                    </div>
                 ))}
              </div>
              <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl"></div>
           </div>

           <div className="p-6 bg-white border border-slate-100 rounded-3xl shadow-sm">
              <h4 className="font-black text-slate-800 text-sm mb-4">Quick Price Calculator</h4>
              <div className="space-y-4">
                 <div>
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Principal (INR)</label>
                    <input type="number" className="w-full mt-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold" defaultValue={100000} />
                 </div>
                 <div>
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Yield (%)</label>
                    <input type="number" className="w-full mt-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold" defaultValue={14.5} />
                 </div>
                 <div className="pt-2 border-t border-slate-50">
                    <div className="flex justify-between items-center text-xs font-black text-slate-800">
                       <span>Estimated EMI</span>
                       <span className="text-blue-600">₹9,420</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CreditMaster;
