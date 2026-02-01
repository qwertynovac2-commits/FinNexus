
import React from 'react';
import { Calendar, CreditCard, ChevronRight, AlertCircle } from 'lucide-react';

const LoanManager: React.FC = () => {
  const activeLoans = [
    { id: 'L-50122', client: 'Amit Jha', principal: 1250000, outstanding: 940000, nextEmi: '05 Dec 2023', status: 'Standard', dpd: 0 },
    { id: 'L-50123', client: 'Suman Singh', principal: 450000, outstanding: 442000, nextEmi: '01 Dec 2023', status: 'Sub-standard', dpd: 32 },
    { id: 'L-50124', client: 'Kiran Devi', principal: 100000, outstanding: 12000, nextEmi: '10 Dec 2023', status: 'Standard', dpd: 0 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Loan Lifecycle Management</h2>
          <p className="text-sm text-slate-500">Servicing, schedules, and collections</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">Active Portfolio</h3>
              <button className="text-xs font-bold text-blue-600">View All</button>
            </div>
            <div className="divide-y divide-slate-100">
              {activeLoans.map((loan) => (
                <div key={loan.id} className="p-4 hover:bg-slate-50 transition-colors cursor-pointer group">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        loan.dpd > 0 ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'
                      }`}>
                        <CreditCard className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-800 flex items-center gap-2">
                          {loan.client}
                          {loan.dpd > 0 && <span className="px-1.5 py-0.5 bg-red-100 text-red-700 text-[10px] rounded uppercase font-bold">DPD {loan.dpd}</span>}
                        </div>
                        <div className="text-xs text-slate-500">ID: {loan.id} • Tenure: 24M</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-slate-800">₹{loan.outstanding.toLocaleString('en-IN')}</div>
                      <div className="text-[10px] text-slate-400 uppercase font-bold">Outstanding</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-xs text-slate-500">
                        <Calendar className="w-3 h-3" />
                        Next EMI: {loan.nextEmi}
                      </div>
                    </div>
                    <button className="text-slate-400 group-hover:text-blue-600 transition-colors">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold mb-4">Quick Collections</h3>
            <div className="space-y-3">
              <button className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-200 hover:bg-blue-700">
                Trigger NACH Batch
              </button>
              <button className="w-full py-3 border border-slate-200 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-50">
                Generate NPA Report
              </button>
            </div>
          </div>

          <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4 text-slate-400">
                <AlertCircle className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-bold uppercase tracking-wider">Risk Alert</span>
              </div>
              <p className="text-sm font-medium mb-1">Bucket Move Prediction</p>
              <h4 className="text-2xl font-bold mb-4">42 Accounts</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Our ML models predict these accounts will move to SMA-1 in the next 15 days.
              </p>
              <button className="mt-6 text-xs font-bold text-blue-400 hover:text-blue-300">Run Collection Strategy →</button>
            </div>
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanManager;
