
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import LoanOrigination from './components/LOS/LoanOrigination';
import LoanManager from './components/LMS/LoanManager';
import CollectionsHub from './components/LMS/Collections';
import AccountingEngine from './components/Accounting/AccountingEngine';
import RegulatoryCenter from './components/Compliance/RegulatoryCenter';
import MasterDataHub from './components/Masters/MasterDataHub';
import BIAnalytics from './components/BI/BIAnalytics';
import AIChatbot from './components/AIChatbot';
import { Bell, Search, ShieldCheck } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'los': return <LoanOrigination />;
      case 'lms': return <LoanManager />;
      case 'collections': return <CollectionsHub />;
      case 'accounting': return <AccountingEngine />;
      case 'compliance': return <RegulatoryCenter />;
      case 'settings': return <MasterDataHub />;
      case 'analytics': return <BIAnalytics />;
      default: return (
        <div className="flex flex-col items-center justify-center h-[70vh] text-slate-400 space-y-4">
          <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center">
            <ShieldCheck className="w-10 h-10 text-slate-300" />
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold text-slate-800">Module Access Restricted</h3>
            <p className="text-sm max-w-sm mx-auto">This module ({activeTab}) is undergoing final internal audit and will be available shortly for the live environment.</p>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 ml-64 p-8">
        <header className="flex justify-between items-center mb-10">
          <div className="relative w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search across Ledger, LOS or Customers..." 
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/5 transition-all shadow-sm"
            />
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center gap-3 px-4 py-2 bg-indigo-50 border border-indigo-100 rounded-2xl shadow-sm">
               <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
               <span className="text-[10px] font-black text-indigo-700 uppercase tracking-widest">RBI Master Direction: Compliant (2024)</span>
            </div>
            
            <div className="flex items-center gap-2">
               <button className="relative p-2.5 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-slate-600 transition-all shadow-sm">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-blue-600 rounded-full border-2 border-white"></span>
               </button>
            </div>

            <div className="flex items-center gap-4 pl-6 border-l border-slate-200">
              <div className="text-right">
                <p className="text-sm font-black text-slate-800 tracking-tight">Vinay Sharma</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">VP - Credit & Operations</p>
              </div>
              <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white font-black shadow-lg shadow-slate-200">
                VS
              </div>
            </div>
          </div>
        </header>

        <div className="pb-20">
          {renderContent()}
        </div>
      </main>

      <AIChatbot />
    </div>
  );
};

export default App;
