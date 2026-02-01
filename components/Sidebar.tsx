
import React from 'react';
import { NAVIGATION } from '../constants';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="w-64 bg-slate-900 h-full fixed left-0 top-0 flex flex-col text-white shadow-xl z-50">
      <div className="p-6 flex items-center gap-3 border-b border-slate-800">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-lg">F</div>
        <h1 className="text-xl font-bold tracking-tight">FinNexus</h1>
      </div>
      
      <nav className="flex-1 mt-6 px-4 space-y-2">
        {NAVIGATION.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              activeTab === item.id 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            {item.icon}
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 bg-slate-800/50 m-4 rounded-xl">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-slate-300 font-medium tracking-wider uppercase">Compliance Status</span>
        </div>
        <p className="text-[10px] text-slate-400">RBI Master Direction: Compliant (v2.4)</p>
      </div>
    </div>
  );
};

export default Sidebar;
