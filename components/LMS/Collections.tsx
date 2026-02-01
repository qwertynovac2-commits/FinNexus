
import React from 'react';
import { MOCK_COLLECTIONS } from '../../constants';
import { Phone, Mail, MessageSquare, Scale, MapPin, Users } from 'lucide-react';

const CollectionsHub: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Collections Hub</h2>
          <p className="text-sm text-slate-500">Managing delinquent accounts and recovery strategies</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium hover:bg-slate-50">Bulk SMS/WhatsApp</button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-100">Allocate Cases</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {[
          { bucket: 'Bucket 0', count: 420, amount: '4.2Cr', color: 'bg-green-500' },
          { bucket: 'Bucket 1-30', count: 85, amount: '1.1Cr', color: 'bg-amber-500' },
          { bucket: 'Bucket 31-60', count: 42, amount: '65L', color: 'bg-orange-500' },
          { bucket: 'Bucket 61-90', count: 18, amount: '22L', color: 'bg-red-500' },
          { bucket: 'NPA (90+)', count: 5, amount: '12L', color: 'bg-slate-900' }
        ].map((bucket, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group hover:scale-[1.02] transition-transform">
            <div className={`absolute top-0 left-0 w-full h-1 ${bucket.color}`}></div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{bucket.bucket}</p>
            <div className="mt-2">
               <h4 className="text-2xl font-black text-slate-800">{bucket.count}</h4>
               <p className="text-xs font-bold text-slate-500">₹{bucket.amount} POS</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
           <h3 className="font-bold text-slate-800">Prioritized Recovery List</h3>
           <div className="flex gap-4">
              <select className="text-sm bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg outline-none">
                 <option>Filter by DPD</option>
                 <option>30-60 DPD</option>
                 <option>60-90 DPD</option>
              </select>
           </div>
        </div>
        <table className="w-full text-left">
           <thead className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <tr>
                 <th className="px-6 py-4">Loan ID / Customer</th>
                 <th className="px-6 py-4">Overdue Amount</th>
                 <th className="px-6 py-4">DPD / Bucket</th>
                 <th className="px-6 py-4">Collector</th>
                 <th className="px-6 py-4">Status</th>
                 <th className="px-6 py-4 text-right">Actions</th>
              </tr>
           </thead>
           <tbody className="divide-y divide-slate-100 text-sm">
              {MOCK_COLLECTIONS.map((c, i) => (
                 <tr key={i} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4">
                       <div className="font-bold text-slate-800">{c.customerName}</div>
                       <div className="text-[10px] text-blue-600 font-bold">{c.loanId}</div>
                    </td>
                    <td className="px-6 py-4">
                       <div className="font-bold text-red-600">₹{c.overdueAmount.toLocaleString('en-IN')}</div>
                    </td>
                    <td className="px-6 py-4">
                       <div className="flex flex-col">
                          <span className="font-bold text-slate-800">{c.dpd} Days</span>
                          <span className="text-[10px] text-slate-400">{c.dpd > 90 ? 'NPA' : 'SMA-1'}</span>
                       </div>
                    </td>
                    <td className="px-6 py-4">
                       <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center"><Users className="w-3 h-3" /></div>
                          <span className="text-xs font-medium">{c.assignedTo}</span>
                       </div>
                    </td>
                    <td className="px-6 py-4">
                       <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                          c.status === 'LEGAL' ? 'bg-slate-900 text-white' : 'bg-blue-100 text-blue-700'
                       }`}>
                          {c.status}
                       </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                       <div className="flex gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                          <button title="Call" className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all"><Phone className="w-4 h-4" /></button>
                          <button title="Legal Action" className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all"><Scale className="w-4 h-4" /></button>
                          <button title="PTP Tracking" className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-600 hover:text-white transition-all"><MapPin className="w-4 h-4" /></button>
                       </div>
                    </td>
                 </tr>
              ))}
           </tbody>
        </table>
      </div>
    </div>
  );
};

export default CollectionsHub;
