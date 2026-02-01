
import React from 'react';
import { FileText, ShieldAlert, CheckCircle2, AlertTriangle, FileSpreadsheet } from 'lucide-react';

const RegulatoryCenter: React.FC = () => {
  const reports = [
    { name: 'NBS-7 Return (Quarterly)', due: '15 Jan 2024', status: 'READY', risk: 'LOW' },
    { name: 'ALM Statement (Structural Liquidity)', due: '05 Dec 2023', status: 'PENDING', risk: 'HIGH' },
    { name: 'Interest Rate Change Audit', due: 'Weekly', status: 'COMPLETED', risk: 'NONE' },
    { name: 'Fair Practices Compliance', due: 'Annual', status: 'READY', risk: 'LOW' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Regulatory Compliance Center</h2>
          <p className="text-sm text-slate-500">RBI Master Directions & Statutory Reporting</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all">
          <FileSpreadsheet className="w-4 h-4" /> Run Automated NBS Return
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-slate-50/30 font-bold text-slate-800">Upcoming Regulatory Filings</div>
          <div className="divide-y divide-slate-100">
            {reports.map((report, idx) => (
              <div key={idx} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-2xl ${
                    report.status === 'READY' ? 'bg-green-100 text-green-600' : 
                    report.status === 'PENDING' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'
                  }`}>
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">{report.name}</h4>
                    <p className="text-xs text-slate-500 font-medium">Next Due: {report.due}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                   <div className="text-right">
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter ${
                        report.risk === 'HIGH' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                      }`}>
                        Risk: {report.risk}
                      </span>
                   </div>
                   <button className="text-sm font-bold text-blue-600 hover:text-blue-700">Submit Now</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
            <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-400" />
              Grievance Redressal
            </h4>
            <div className="space-y-4">
              <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700">
                 <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Active Cases</span>
                    <span className="text-xl font-bold">12</span>
                 </div>
                 <p className="text-[10px] text-slate-400">0 cases pending beyond 30 days (RBI Compliant)</p>
              </div>
            </div>
            <div className="absolute -right-20 -bottom-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
             <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                Audit Trail Status
             </h4>
             <div className="space-y-3">
                {[
                  'KYC Logs: Synced',
                  'Disbursement Audit: Verified',
                  'Interest Accrual: Consistent',
                  'Negative Area Check: Active'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-semibold text-slate-600 py-2 border-b border-slate-50 last:border-0">
                     <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                     {item}
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegulatoryCenter;
