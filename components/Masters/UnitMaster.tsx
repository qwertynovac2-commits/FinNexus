
import React, { useState } from 'react';
import { Search, Plus, Filter, MapPin, Building2, ChevronRight, CheckCircle2, Globe, Building, MoreVertical, Edit, ShieldCheck } from 'lucide-react';

const UnitMaster: React.FC = () => {
  const [viewType, setViewType] = useState<'list' | 'hierarchy'>('list');

  const mockUnits = [
    { id: 'UNIT-001', code: 'MUM-HO', name: 'Mumbai Head Office', type: 'Head Office', city: 'Mumbai', status: 'Active', products: 6 },
    { id: 'UNIT-002', code: 'DEL-RO', name: 'Delhi North Regional', type: 'Regional Office', city: 'New Delhi', status: 'Active', products: 4 },
    { id: 'UNIT-003', code: 'AND-01', name: 'Andheri Branch', type: 'Branch Office', city: 'Mumbai', status: 'Active', products: 3 },
    { id: 'UNIT-004', code: 'BNG-RO', name: 'Bangalore South Regional', type: 'Regional Office', city: 'Bangalore', status: 'Inactive', products: 5 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-black text-slate-800 tracking-tight">Organization & Unit Master</h3>
          <p className="text-sm text-slate-500 font-medium uppercase tracking-widest text-[10px] mt-1">Manage Branches, Regional Nodes & Hubs</p>
        </div>
        <div className="flex gap-3">
           <div className="bg-white border border-slate-200 rounded-xl p-1 flex">
              <button 
                onClick={() => setViewType('list')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${viewType === 'list' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-400'}`}
              >List</button>
              <button 
                onClick={() => setViewType('hierarchy')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${viewType === 'hierarchy' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-400'}`}
              >Hierarchy</button>
           </div>
           <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
             <Plus className="w-4 h-4" />
             Create New Unit
           </button>
        </div>
      </div>

      {viewType === 'list' ? (
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex gap-4 items-center bg-slate-50/30">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search units by name, code or city..." 
                className="w-full pl-12 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-4 focus:ring-blue-500/10 transition-all outline-none"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <tr>
                  <th className="px-6 py-4">Unit Identification</th>
                  <th className="px-6 py-4">Node Type</th>
                  <th className="px-6 py-4">Location</th>
                  <th className="px-6 py-4">Products Linked</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {mockUnits.map((unit) => (
                  <tr key={unit.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                          <Building2 className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-bold text-slate-800">{unit.name}</div>
                          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Code: {unit.code}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-slate-600">{unit.type}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-slate-500 font-medium">
                        <MapPin className="w-3.5 h-3.5" />
                        {unit.city}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-black text-blue-600">{unit.products} Assets</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black uppercase ${
                        unit.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-600'
                      }`}>
                        {unit.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                       <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-white rounded-lg transition-all shadow-sm"><Edit className="w-4 h-4" /></button>
                          <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-white rounded-lg transition-all shadow-sm"><MoreVertical className="w-4 h-4" /></button>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm flex flex-col items-center">
           <div className="w-full max-w-2xl space-y-6">
              <div className="p-6 bg-slate-900 text-white rounded-[32px] text-center shadow-xl border-4 border-slate-800">
                 <h4 className="font-black text-lg">FinNexus Capital HO</h4>
                 <p className="text-[10px] uppercase font-bold text-blue-400 tracking-widest mt-1">Level 0: Corporate Center</p>
              </div>
              <div className="h-10 w-0.5 bg-slate-200 mx-auto"></div>
              <div className="grid grid-cols-2 gap-10">
                 {['North Regional', 'West Regional'].map(reg => (
                   <div key={reg} className="space-y-6">
                      <div className="p-5 bg-blue-50 border-2 border-blue-100 rounded-[28px] text-center">
                         <h5 className="font-black text-slate-800 text-sm">{reg}</h5>
                         <p className="text-[9px] uppercase font-bold text-blue-600 mt-1">Level 1: Region Node</p>
                      </div>
                      <div className="h-8 w-0.5 bg-slate-200 mx-auto"></div>
                      <div className="space-y-3">
                         {[1, 2].map(b => (
                           <div key={b} className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm hover:border-blue-300 transition-colors flex items-center justify-between group cursor-pointer">
                              <span className="text-xs font-bold text-slate-600">Branch Unit {b}</span>
                              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-transform" />
                           </div>
                         ))}
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-6">
         <div className="p-6 bg-indigo-900 text-white rounded-3xl shadow-xl flex items-center justify-between relative overflow-hidden">
            <div className="z-10">
               <p className="text-[10px] font-black uppercase text-indigo-300 tracking-widest mb-1">Total Coverage</p>
               <h4 className="text-3xl font-black">28 States</h4>
            </div>
            <Globe className="w-16 h-16 text-white/10 absolute -right-4 -bottom-4" />
         </div>
         <div className="p-6 bg-slate-50 border border-slate-100 rounded-3xl flex items-center justify-between">
            <div>
               <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Operational Nodes</p>
               <h4 className="text-3xl font-black text-slate-800 tracking-tight">142 Units</h4>
            </div>
            <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100 text-blue-600">
               <Building className="w-6 h-6" />
            </div>
         </div>
         <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-3xl flex items-center justify-between">
            <div>
               <p className="text-[10px] font-black uppercase text-emerald-600 tracking-widest mb-1">Compliance Status</p>
               <h4 className="text-3xl font-black text-emerald-800 tracking-tight">100% Audit</h4>
            </div>
            <ShieldCheck className="w-10 h-10 text-emerald-600" />
         </div>
      </div>
    </div>
  );
};

export default UnitMaster;
