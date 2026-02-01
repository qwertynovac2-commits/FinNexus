
import React, { useState } from 'react';
import { 
  Users, Building2, ShieldCheck, LayoutGrid, Settings, ChevronRight, Layers, Database, 
  Handshake, FileText, Target, ReceiptIndianRupee, ShieldAlert, Mail, GitBranch, 
  Percent, SearchCode, Truck, Landmark, Map, Calendar, BookOpen, UserCircle, 
  Megaphone, XCircle, AlertOctagon, ShieldHalf, Gavel
} from 'lucide-react';
import UserMaster from './UserMaster';
import UnitMaster from './UnitMaster';
import CreditMaster from './CreditMaster';
import MenuMaster from './MenuMaster';
import PartnerMaster from './PartnerMaster';
import DocumentMaster from './DocumentMaster';
import CollectionStrategyMaster from './CollectionStrategyMaster';
import FeeChargesMaster from './FeeChargesMaster';
import RiskParameterMaster from './RiskParameterMaster';

const MasterDataHub: React.FC = () => {
  const [activeMaster, setActiveMaster] = useState<string | null>(null);

  const categories = [
    {
      title: 'Core Administration',
      items: [
        { id: 'USER', label: 'User Master', desc: 'RBAC, roles & access', icon: <Users />, color: 'bg-blue-50 text-blue-600', count: '42 Users' },
        { id: 'UNIT', label: 'Unit Master', desc: 'Branches & hierarchy', icon: <Building2 />, color: 'bg-indigo-50 text-indigo-600', count: '14 Units' },
        { id: 'MENU', label: 'Menu Master', desc: 'UI & navigation config', icon: <Layers />, color: 'bg-amber-50 text-amber-600', count: '24 Modules' },
      ]
    },
    {
      title: 'Product & Credit',
      items: [
        { id: 'CREDIT', label: 'Product Master', desc: 'Loan lifecycle config', icon: <ShieldCheck />, color: 'bg-emerald-50 text-emerald-600', count: '8 Products' },
        { id: 'DOC', label: 'Document Master', desc: 'OCR & upload rules', icon: <FileText />, color: 'bg-sky-50 text-sky-600', count: '32 Doc Types' },
        { id: 'FEE', label: 'Fees & Charges', desc: 'Pricing & penalties', icon: <ReceiptIndianRupee />, color: 'bg-rose-50 text-rose-600', count: '12 Slabs' },
        { id: 'RISK', label: 'Risk Parameters', desc: 'Scoring & thresholds', icon: <ShieldAlert />, color: 'bg-orange-50 text-orange-600', count: '15 Rules' },
      ]
    },
    {
      title: 'Partners & Channels',
      items: [
        { id: 'PARTNER', label: 'Partner/DSA', desc: 'Agency & commission', icon: <Handshake />, color: 'bg-violet-50 text-violet-600', count: '120 Partners' },
        { id: 'VENDOR', label: 'Vendor Master', desc: 'Third-party providers', icon: <Truck />, color: 'bg-slate-50 text-slate-600', count: '8 Vendors' },
      ]
    },
    {
      title: 'Collections & Strategy',
      items: [
        { id: 'STRATEGY', label: 'Collection Strategy', desc: 'Bucket & action plans', icon: <Target />, color: 'bg-red-50 text-red-600', count: '4 Strategies' },
        { id: 'LEGAL', label: 'Legal & Recovery', desc: 'Courts & auction config', icon: <Gavel />, color: 'bg-zinc-50 text-zinc-600', count: 'Ready' },
      ]
    }
  ];

  if (activeMaster) {
    return (
      <div className="space-y-6">
        <button 
          onClick={() => setActiveMaster(null)}
          className="group text-xs font-black text-blue-600 uppercase tracking-widest flex items-center gap-1 hover:translate-x-1 transition-transform"
        >
          <ChevronRight className="w-4 h-4 rotate-180" />
          Return to Master Hub
        </button>
        {activeMaster === 'USER' && <UserMaster />}
        {activeMaster === 'UNIT' && <UnitMaster />}
        {activeMaster === 'CREDIT' && <CreditMaster />}
        {activeMaster === 'MENU' && <MenuMaster />}
        {activeMaster === 'PARTNER' && <PartnerMaster />}
        {activeMaster === 'DOC' && <DocumentMaster />}
        {activeMaster === 'STRATEGY' && <CollectionStrategyMaster />}
        {activeMaster === 'FEE' && <FeeChargesMaster />}
        {activeMaster === 'RISK' && <RiskParameterMaster />}
        {!['USER','UNIT','CREDIT','MENU','PARTNER','DOC','STRATEGY','FEE','RISK'].includes(activeMaster) && (
          <div className="p-20 bg-white rounded-[48px] border border-slate-100 flex flex-col items-center justify-center text-center space-y-4 shadow-sm animate-in zoom-in-95">
             <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-300">
                <Database className="w-10 h-10" />
             </div>
             <div>
                <h3 className="text-xl font-black text-slate-800">Module Initializing</h3>
                <p className="text-sm text-slate-400 max-w-xs mt-2 font-medium">This master screen is currently being provisioned with live data streams. Available shortly.</p>
             </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Master Configuration Hub</h2>
          <p className="text-slate-500 font-medium mt-2 max-w-lg">Centralized data governance for FinNexus Operating System. Configure lending DNA, organizational nodes, and ecosystem partners.</p>
        </div>
        <div className="flex flex-col items-end gap-2">
           <div className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em]">
              <Database className="w-4 h-4" />
              Master Store v2.4.0
           </div>
           <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Last Sync: 2 mins ago</p>
        </div>
      </div>

      <div className="space-y-12">
        {categories.map((cat, idx) => (
          <div key={idx} className="space-y-6">
            <div className="flex items-center gap-4">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em]">{cat.title}</h3>
              <div className="h-px bg-slate-100 flex-1"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {cat.items.map((m) => (
                <div 
                  key={m.id}
                  onClick={() => setActiveMaster(m.id)}
                  className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-2xl hover:border-blue-200 transition-all group cursor-pointer flex flex-col justify-between h-56"
                >
                  <div className="flex justify-between items-start">
                    <div className={`p-4 rounded-[20px] ${m.color} shadow-sm group-hover:scale-110 transition-transform`}>
                      {/* Fixed: Explicitly type-casting the icon to React.ReactElement<any> to allow dynamic prop injection like className via cloneElement */}
                      {React.cloneElement(m.icon as React.ReactElement<any>, { className: 'w-6 h-6' })}
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-2 transition-all" />
                  </div>
                  <div>
                     <h3 className="text-lg font-black text-slate-800 tracking-tight mb-1">{m.label}</h3>
                     <p className="text-xs text-slate-400 font-medium leading-relaxed mb-4">{m.desc}</p>
                     <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{m.count}</span>
                        <span className="text-[9px] font-black text-blue-600 uppercase opacity-0 group-hover:opacity-100 transition-opacity">Configure →</span>
                     </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 text-white p-12 rounded-[56px] shadow-2xl relative overflow-hidden flex items-center justify-between">
         <div className="space-y-4 relative z-10">
            <h4 className="text-2xl font-black tracking-tight">Audit & Governance Trail</h4>
            <p className="text-slate-400 max-w-md text-sm font-medium">Every change in the master data layer is cryptographically logged for RBI regulatory compliance. Zero-trust architecture enforced.</p>
            <div className="flex gap-4 pt-4">
               <button className="px-6 py-3 bg-blue-600 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-blue-500 transition-all shadow-xl shadow-blue-900/50">View Activity Logs</button>
               <button className="px-6 py-3 bg-slate-800 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-700 transition-all">Export Policy Docs</button>
            </div>
         </div>
         <Settings className="w-64 h-64 text-white/5 absolute -right-16 -bottom-16 rotate-12" />
         <div className="w-1/3 hidden lg:block relative z-10">
            <div className="grid grid-cols-2 gap-4">
               {[1,2,3,4].map(i => (
                  <div key={i} className="p-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
                     <div className="w-2 h-2 bg-green-500 rounded-full mb-3"></div>
                     <p className="text-[10px] font-bold text-slate-300">Cluster {i} Sync</p>
                     <p className="text-xs font-black text-white mt-1">Operational</p>
                  </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};

export default MasterDataHub;
