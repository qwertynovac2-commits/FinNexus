
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, Cell
} from 'recharts';
import { 
  TrendingUp, IndianRupee, Users, 
  Target, ShieldAlert, BarChart3, Download, Filter, Zap
} from 'lucide-react';

const BIAnalytics: React.FC = () => {
  const vintageData = [
    { month: 'Jan', bucket0: 98.5, bucket30: 1.2, bucket60: 0.2, bucket90: 0.1 },
    { month: 'Feb', bucket0: 97.2, bucket30: 2.1, bucket60: 0.5, bucket90: 0.2 },
    { month: 'Mar', bucket0: 96.8, bucket30: 2.4, bucket60: 0.6, bucket90: 0.2 },
    { month: 'Apr', bucket0: 97.5, bucket30: 1.8, bucket60: 0.4, bucket90: 0.3 },
    { month: 'May', bucket0: 98.2, bucket30: 1.2, bucket60: 0.3, bucket90: 0.3 },
  ];

  const channelPerformance = [
    { name: 'Direct Branch', volume: 1420, conversion: 68 },
    { name: 'DSA / Partner', volume: 2850, conversion: 52 },
    { name: 'Online Portal', volume: 920, conversion: 45 },
    { name: 'Fintech APIs', volume: 1540, conversion: 74 },
  ];

  const kpis = [
    { label: 'Overall Portfolio IRR', val: '14.8%', icon: <Zap />, trend: '+0.2%', isUp: true, color: 'blue' },
    { label: 'Collection Efficiency', val: '98.42%', icon: <Target />, trend: '+0.15%', isUp: true, color: 'emerald' },
    { label: 'GNPA Ratio', val: '1.24%', icon: <ShieldAlert />, trend: '-0.08%', isUp: false, color: 'rose' },
    { label: 'Avg. Acquisition Cost', val: '₹4,280', icon: <Users />, trend: '-₹120', isUp: false, color: 'indigo' }
  ];

  const stressScenarios = [
    { l: 'Base Case', v: '12.4% Margin' },
    { l: 'Stress Scenario A', v: '10.2% Margin' },
    { l: 'Optimistic Case', v: '14.1% Margin' },
    { l: 'Black Swan Event', v: '5.4% Margin' }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">FinNexus BI Engine</h2>
          <p className="text-slate-500 font-medium mt-1 uppercase tracking-widest text-[10px]">Portfolio Quality & Stress Simulation</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
            <Filter className="w-4 h-4" /> Segment Filter
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-xl shadow-slate-200 hover:bg-slate-800 transition-all">
            <Download className="w-4 h-4" /> Export Datasets
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {kpis.map((kpi, idx) => (
          <div key={idx} className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-xl transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div className={`p-3 rounded-2xl ${kpi.color === 'blue' ? 'bg-blue-50 text-blue-600' : kpi.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' : kpi.color === 'rose' ? 'bg-rose-50 text-rose-600' : 'bg-indigo-50 text-indigo-600'} group-hover:scale-110 transition-transform`}>
                 {React.cloneElement(kpi.icon as React.ReactElement<any>, { className: 'w-5 h-5' })}
              </div>
              <div className={`flex items-center gap-1 text-[10px] font-black uppercase ${kpi.isUp ? 'text-green-600' : 'text-slate-400'}`}>
                 {kpi.trend} {kpi.isUp ? '↑' : '↓'}
              </div>
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{kpi.label}</p>
              <h4 className="text-3xl font-black text-slate-800 tracking-tighter">{kpi.val}</h4>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-10 rounded-[56px] border border-slate-100 shadow-sm space-y-8">
          <div className="flex justify-between items-center">
             <div>
                <h3 className="text-xl font-black text-slate-800 tracking-tight">Portfolio Vintage Analysis</h3>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Roll-rate across 0-90 DPD buckets</p>
             </div>
             <select className="bg-slate-50 border border-slate-200 text-[10px] font-black uppercase px-3 py-1.5 rounded-xl outline-none">
                <option>By Disbursement Month</option>
                <option>By Product Category</option>
             </select>
          </div>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={vintageData}>
                <defs>
                  <linearGradient id="colorB0" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', padding: '20px' }}
                />
                <Area type="monotone" dataKey="bucket0" stackId="1" stroke="#22c55e" fillOpacity={1} fill="url(#colorB0)" strokeWidth={3} />
                <Area type="monotone" dataKey="bucket30" stackId="1" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.1} strokeWidth={2} />
                <Area type="monotone" dataKey="bucket60" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.1} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-10 rounded-[56px] border border-slate-100 shadow-sm space-y-8">
          <div className="flex justify-between items-center">
             <div>
                <h3 className="text-xl font-black text-slate-800 tracking-tight">Channel Conversion Efficiency</h3>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Lead to Sanction % by Sourcing Hub</p>
             </div>
             <BarChart3 className="w-6 h-6 text-slate-300" />
          </div>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={channelPerformance} layout="vertical" margin={{ left: 40 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#475569', fontSize: 11, fontWeight: 800}} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }} />
                <Bar dataKey="conversion" fill="#2563eb" radius={[0, 12, 12, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 text-white p-12 rounded-[64px] shadow-2xl relative overflow-hidden flex items-center justify-between">
         <div className="space-y-6 relative z-10">
            <h4 className="text-3xl font-black tracking-tight">Portfolio Stress Testing (v2.0)</h4>
            <p className="text-slate-400 max-w-md text-sm font-medium leading-relaxed uppercase tracking-tight">Run predictive scenarios to analyze impact of interest rate hikes or market volatility on Net Interest Margin (NIM).</p>
            <div className="flex gap-4 pt-4">
               <button className="px-10 py-4 bg-white text-slate-900 rounded-3xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all shadow-xl shadow-black/20">Launch Simulator</button>
               <button className="px-10 py-4 bg-white/10 backdrop-blur-md rounded-3xl text-[10px] font-black uppercase tracking-widest hover:bg-white/20 transition-all border border-white/10">Download Models</button>
            </div>
         </div>
         <div className="w-1/3 hidden lg:block relative z-10">
            <div className="grid grid-cols-2 gap-4">
               {stressScenarios.map((s, i) => (
                  <div key={i} className="p-5 bg-white/5 backdrop-blur-md rounded-[32px] border border-white/10 group hover:bg-white/10 transition-all cursor-default">
                     <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{s.l}</p>
                     <p className="text-sm font-black text-white mt-1">{s.v}</p>
                  </div>
               ))}
            </div>
         </div>
         <TrendingUp className="w-96 h-96 text-white/5 absolute -right-24 -bottom-24 rotate-12" />
      </div>
    </div>
  );
};

export default BIAnalytics;
