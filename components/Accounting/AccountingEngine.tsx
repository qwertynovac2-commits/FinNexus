
import React from 'react';
import { MOCK_LEDGER } from '../../constants';
import { Download, Filter, Plus, TrendingUp, TrendingDown } from 'lucide-react';

const AccountingEngine: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Financial Accounting & GL</h2>
          <p className="text-sm text-slate-500">Double-entry ledger for NBFC operations</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-all">
            <Download className="w-4 h-4" /> Export T-Symmetry
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-semibold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
            <Plus className="w-4 h-4" /> Manual Entry
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Cash & Bank Balance</p>
          <h3 className="text-3xl font-black text-slate-800">₹14.28 Cr</h3>
          <div className="mt-4 flex items-center gap-2 text-green-600 text-xs font-bold">
            <TrendingUp className="w-3 h-3" /> +₹2.1M this week
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Interest Income (Accrued)</p>
          <h3 className="text-3xl font-black text-slate-800">₹85.4 L</h3>
          <div className="mt-4 flex items-center gap-2 text-blue-600 text-xs font-bold">
            <TrendingUp className="w-3 h-3" /> As per Ind AS 109
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">NPA Provisioning</p>
          <h3 className="text-3xl font-black text-red-600">₹12.5 L</h3>
          <div className="mt-4 flex items-center gap-2 text-slate-400 text-xs font-bold">
             Regulatory Required: ₹10.2L
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
          <h3 className="font-bold text-slate-800">General Ledger (Live)</h3>
          <div className="flex gap-2">
            <button className="p-2 bg-white border border-slate-200 rounded-lg"><Filter className="w-4 h-4 text-slate-500" /></button>
          </div>
        </div>
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <tr>
              <th className="px-6 py-4">TXN ID</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Description</th>
              <th className="px-6 py-4">A/C Head</th>
              <th className="px-6 py-4 text-right">Debit (Dr)</th>
              <th className="px-6 py-4 text-right">Credit (Cr)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {MOCK_LEDGER.map((entry) => (
              <tr key={entry.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 font-mono text-[11px] font-bold text-slate-500">{entry.id}</td>
                <td className="px-6 py-4 font-medium text-slate-600">{entry.date}</td>
                <td className="px-6 py-4 text-slate-800 font-semibold">{entry.description}</td>
                <td className="px-6 py-4">
                  <span className="bg-slate-100 px-2 py-0.5 rounded-lg text-[10px] font-bold text-slate-600">
                    {entry.accountHead.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4 text-right font-bold text-red-600">
                  {entry.type === 'DEBIT' ? `₹${entry.amount.toLocaleString()}` : '-'}
                </td>
                <td className="px-6 py-4 text-right font-bold text-green-600">
                  {entry.type === 'CREDIT' ? `₹${entry.amount.toLocaleString()}` : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AccountingEngine;
