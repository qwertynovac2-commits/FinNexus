
import React, { useState } from 'react';
import { 
  Plus, ReceiptIndianRupee, Search, Filter, Percent, IndianRupee, 
  ShieldCheck, ChevronRight, Edit, Trash2, XCircle, Info, Database, Zap, CheckCircle2 
} from 'lucide-react';

const FeeChargesMaster: React.FC = () => {
  const [isAddOpen, setIsAddOpen] = useState(false);

  const fees = [
    { id: 'FEE-01', name: 'Processing Fee', type: 'Percentage', val: '2.0%', applyAt: 'Sanction', gst: '18% Extra', category: 'ORIGINATION' },
    { id: 'FEE-02', name: 'Documentation Charge', type: 'Flat', val: '₹1,500', applyAt: 'Agreement', gst: 'Inclusive', category: 'ORIGINATION' },
    { id: 'FEE-03', name: 'Late Payment Penalty', type: 'Percentage', val: '24% p.a.', applyAt: 'Default', gst: 'Not Applicable', category: 'SERVICING' },
    { id: 'FEE-04', name: 'Foreclosure Charge', type: 'Percentage', val: '4.0%', applyAt: 'Early Closure', gst: '18% Extra', category: 'SERVICING' },
    { id: 'FEE-05', name: 'Bounce Charge', type: 'Flat', val: '₹450', applyAt: 'NACH Return', gst: 'Inclusive', category: 'SERVICING' },
    { id: 'FEE-06', name: 'NOC Issuance', type: 'Flat', val: '₹500', applyAt: 'Loan Closure', gst: 'Inclusive', category: 'SERVICING' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-black text-slate-800 tracking-tight">Revenue & Pricing Master</h3>
          <p className="text-sm text-slate-500 font-medium uppercase tracking-widest text-[10px] mt-1">Configure Fees, Slabs, GST Treatments & Waiver Authority</p>
        </div>
        <button 
          onClick={() => setIsAddOpen(true)}
          className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
        >
          <Plus className="w-4 h-4" />
          Add Fee Structure
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between">
              <div className="flex gap-4">
                 {['ALL', 'ORIGINATION', 'SERVICING', 'RECOVERY'].map(cat => (
                    <button key={cat} className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors">{cat}</button>
                 ))}
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="text" placeholder="Filter by ID..." className="pl-9 pr-4 py-1.5 bg-white border border-slate-200 rounded-lg text-xs outline-none" />
              </div>
            </div>
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <tr>
                  <th className="px-6 py-4">Fee Identification</th>
                  <th className="px-6 py-4">Calculation Logic</th>
                  <th className="px-6 py-4">Value</th>
                  <th className="px-6 py-4">Trigger Stage</th>
                  <th className="px-6 py-4">GST Mode</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm font-bold">
                {fees.map((f) => (
                  <tr key={f.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 border border-slate-100"><Database className="w-4 h-4" /></div>
                        <div>
                           <div className="text-slate-800">{f.name}</div>
                           <div className="text-[9px] text-blue-600 font-black uppercase tracking-widest">{f.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                       <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-lg text-[10px] font-black uppercase tracking-tighter">{f.type}</span>
                    </td>
                    <td className="px-6 py-4 text-slate-900">{f.val}</td>
                    <td className="px-6 py-4">
                       <span className="text-[10px] font-bold text-slate-500 uppercase">{f.applyAt}</span>
                    </td>
                    <td className="px-6 py-4">
                       <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-black">{f.gst}</span>
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
        </div>

        <div className="space-y-6">
           <div className="p-8 bg-blue-600 text-white rounded-[48px] shadow-2xl relative overflow-hidden flex flex-col justify-between h-64">
              <div className="z-10">
                 <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                    <Info className="w-6 h-6" />
                 </div>
                 <h4 className="text-xl font-black tracking-tight mb-2">Automated Waivers</h4>
                 <p className="text-xs text-blue-100 font-medium leading-relaxed">System automatically waives documentation charges for existing customers with CIBIL > 780.</p>
              </div>
              <button className="z-10 text-[10px] font-black uppercase tracking-widest text-white border-b-2 border-white/30 pb-1 w-fit">Edit Policy</button>
              <ReceiptIndianRupee className="w-48 h-48 text-white/5 absolute -right-10 -bottom-10 rotate-12" />
           </div>
        </div>
      </div>
    </div>
  );
};

export default FeeChargesMaster;
