
import React, { useState } from 'react';
import { Search, Plus, Filter, LayoutDashboard, FilePlus, Wallet, ShieldAlert, BookOpen, FileSpreadsheet, BarChart3, Settings, ChevronRight, Eye, Edit, Trash2, GripVertical, CheckCircle2 } from 'lucide-react';

const MenuMaster: React.FC = () => {
  const [activeLevel, setActiveLevel] = useState(0);

  const mockMenus = [
    { id: 'MENU-1', code: 'LOS-APP', name: 'Loan Applications', level: 1, parent: 'Origination (LOS)', icon: <FilePlus />, roles: 4, status: 'Active' },
    { id: 'MENU-2', code: 'LOS-UW', name: 'Underwriting Queue', level: 1, parent: 'Origination (LOS)', icon: <ShieldAlert />, roles: 3, status: 'Active' },
    { id: 'MENU-3', code: 'LMS-COLL', name: 'Collections Hub', level: 0, parent: null, icon: <Wallet />, roles: 5, status: 'Active' },
    { id: 'MENU-4', code: 'ADM-USR', name: 'User Master', level: 1, parent: 'System Config', icon: <Settings />, roles: 1, status: 'Active' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-black text-slate-800 tracking-tight">Navigation & Menu Master</h3>
          <p className="text-sm text-slate-500 font-medium uppercase tracking-widest text-[10px] mt-1">Configure Feature Access & Sidebar Hierarchy</p>
        </div>
        <button className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
          <Plus className="w-4 h-4" />
          Define New Navigation Node
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
           <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-4 bg-slate-50/50 border-b border-slate-100 flex justify-between items-center">
                 <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Application Tree Structure</h4>
                 <div className="flex gap-2">
                    <button className="p-1.5 hover:bg-white rounded-lg transition-all text-slate-400"><Search className="w-4 h-4" /></button>
                 </div>
              </div>
              <div className="divide-y divide-slate-50">
                 {mockMenus.map((menu) => (
                    <div key={menu.id} className="p-5 flex items-center gap-6 hover:bg-slate-50/80 transition-all group cursor-pointer">
                       <div className="text-slate-300 cursor-grab active:cursor-grabbing">
                          <GripVertical className="w-5 h-5" />
                       </div>
                       <div className={`p-3 rounded-2xl bg-white border border-slate-100 shadow-sm text-slate-600 group-hover:bg-blue-600 group-hover:text-white transition-all`}>
                          {/* Fixed: Explicitly type-casting the icon to React.ReactElement<any> to allow dynamic prop injection like className via cloneElement */}
                          {React.cloneElement(menu.icon as React.ReactElement<any>, { className: 'w-5 h-5' })}
                       </div>
                       <div className="flex-1">
                          <div className="font-bold text-slate-800">{menu.name}</div>
                          <div className="flex items-center gap-2">
                             <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{menu.code}</span>
                             {menu.parent && (
                                <>
                                   <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                                   <span className="text-[10px] text-slate-400 font-bold">Under {menu.parent}</span>
                                </>
                             )}
                          </div>
                       </div>
                       <div className="flex items-center gap-6">
                          <div className="text-right">
                             <div className="text-xs font-black text-slate-700">{menu.roles} Roles</div>
                             <div className="text-[10px] font-bold text-slate-400 uppercase">Access Matrix</div>
                          </div>
                          <div className="flex gap-2">
                             <button className="p-2 text-slate-400 hover:text-blue-600 bg-white border border-slate-50 rounded-lg shadow-sm"><Edit className="w-4 h-4" /></button>
                             <button className="p-2 text-slate-400 hover:text-red-600 bg-white border border-slate-50 rounded-lg shadow-sm"><Trash2 className="w-4 h-4" /></button>
                          </div>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>

        <div className="space-y-6">
           <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
              <h4 className="font-black text-slate-800 text-sm mb-6 flex items-center gap-2">
                 <Eye className="w-4 h-4 text-blue-600" />
                 Role Access Preview
              </h4>
              <div className="space-y-4">
                 <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold uppercase tracking-widest outline-none">
                    <option>Select Role to Preview</option>
                    <option>Credit Manager</option>
                    <option>Branch Executive</option>
                 </select>
                 
                 <div className="space-y-2 pt-4">
                    {['Dashboard', 'Loan Origination', 'LMS Management', 'Collections'].map(nav => (
                       <div key={nav} className="flex items-center justify-between p-3 bg-slate-50/50 rounded-xl border border-slate-100">
                          <span className="text-xs font-bold text-slate-600">{nav}</span>
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                       </div>
                    ))}
                    {['System Configuration', 'Accounting & GL'].map(nav => (
                       <div key={nav} className="flex items-center justify-between p-3 opacity-50 grayscale bg-slate-100 rounded-xl">
                          <span className="text-xs font-bold text-slate-400">{nav}</span>
                          <div className="w-4 h-4 border-2 border-slate-200 rounded-full"></div>
                       </div>
                    ))}
                 </div>
              </div>
           </div>

           <div className="p-6 bg-blue-600 text-white rounded-3xl shadow-xl shadow-blue-100 relative overflow-hidden">
              <h4 className="font-black text-sm mb-2 relative z-10">Dynamic UI Config</h4>
              <p className="text-xs text-blue-100 opacity-80 relative z-10 font-medium">FinNexus automatically adjusts the navigation based on your geographic location and departmental permissions.</p>
              <div className="mt-6 flex justify-end relative z-10">
                 <button className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl text-[10px] font-black uppercase tracking-widest backdrop-blur-md transition-all">Audit Structure</button>
              </div>
              <Settings className="w-24 h-24 text-white/10 absolute -left-4 -bottom-4" />
           </div>
        </div>
      </div>
    </div>
  );
};

export default MenuMaster;
