
import React, { useState } from 'react';
import { Search, Plus, Filter, ArrowRight, UserCheck, ShieldCheck, FileText, CheckCircle2, IndianRupee, Camera, Eye, Zap } from 'lucide-react';
import { LoanApplication } from '../../types';
import { MOCK_APPLICATIONS } from '../../constants';
import { analyzeLoanRisk } from '../../services/geminiService';

const LoanOrigination: React.FC = () => {
  const [view, setView] = useState<'list' | 'new' | 'detail'>('list');
  const [selectedApp, setSelectedApp] = useState<LoanApplication | null>(null);

  const handleAppClick = (app: LoanApplication) => {
    setSelectedApp(app);
    setView('detail');
  };

  return (
    <div className="space-y-6">
      {view === 'list' && (
        <>
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Origination Funnel</h2>
              <p className="text-sm text-slate-500">Track and manage new loan applications</p>
            </div>
            <button 
              onClick={() => setView('new')}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
            >
              <Plus className="w-4 h-4" />
              New Application
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { label: 'KYC Verification', count: 12, color: 'blue' },
              { label: 'Credit Underwriting', count: 8, color: 'amber' },
              { label: 'Sanctioned', count: 24, color: 'green' },
              { label: 'Awaiting Disbursement', count: 5, color: 'indigo' }
            ].map((card, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{card.label}</p>
                <div className="flex justify-between items-end">
                  <span className="text-3xl font-bold text-slate-800">{card.count}</span>
                  <div className={`w-8 h-1 bg-${card.color}-500 rounded-full mb-2`}></div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex gap-4 items-center bg-slate-50/50">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search by Applicant Name, PAN, or Application ID..." 
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-600 font-medium hover:bg-slate-50 transition-colors">
                <Filter className="w-4 h-4" />
                Advanced Filters
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-500 text-[10px] font-bold uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Application ID</th>
                    <th className="px-6 py-4">Customer / KYC</th>
                    <th className="px-6 py-4">Bureau Score</th>
                    <th className="px-6 py-4">Requested Amount</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {MOCK_APPLICATIONS.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50/80 transition-colors group cursor-pointer" onClick={() => handleAppClick(app)}>
                      <td className="px-6 py-4 font-bold text-blue-600">#{app.id}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-xs">
                            {app.customer.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-semibold text-slate-800">{app.customer.name}</div>
                            <div className="text-[10px] text-slate-500 flex items-center gap-1">
                              <span className="bg-slate-100 px-1 rounded uppercase">{app.customer.pan}</span>
                              <span className={`w-1.5 h-1.5 rounded-full ${app.customer.kycStatus === 'VERIFIED' ? 'bg-green-500' : 'bg-amber-500'}`}></span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className={`font-bold ${app.customer.cibilScore! > 750 ? 'text-green-600' : app.customer.cibilScore! > 650 ? 'text-amber-600' : 'text-red-600'}`}>
                            {app.customer.cibilScore || 'N/A'}
                          </span>
                          <span className="text-[10px] text-slate-400">CIBIL v3</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-bold text-slate-700">₹{app.amount.toLocaleString('en-IN')}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                          app.status === 'UNDERWRITING' ? 'bg-amber-100 text-amber-700' : 
                          app.status === 'APPROVED' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {app.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-2 group-hover:bg-blue-600 group-hover:text-white text-blue-600 rounded-lg transition-all">
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {view === 'new' && <NewApplicationForm onCancel={() => setView('list')} />}
      
      {view === 'detail' && selectedApp && (
        <ApplicationDetail app={selectedApp} onBack={() => setView('list')} />
      )}
    </div>
  );
};

const NewApplicationForm: React.FC<{ onCancel: () => void }> = ({ onCancel }) => {
  const [activeStep, setActiveStep] = useState(1);
  const steps = [
    { id: 1, title: 'Identity Verification', icon: <UserCheck /> },
    { id: 2, title: 'Credit Bureau & Data', icon: <ShieldCheck /> },
    { id: 3, title: 'Loan Product Config', icon: <FileText /> },
    { id: 4, title: 'Disbursement Info', icon: <CheckCircle2 /> },
  ];

  return (
    <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-5xl mx-auto overflow-hidden animate-in zoom-in-95 duration-300">
      <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <div>
          <h3 className="text-xl font-bold text-slate-800">New Loan Origination Journey</h3>
          <p className="text-sm text-slate-500">Completing all RBI mandatory checks digitally</p>
        </div>
        <button onClick={onCancel} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
          <Zap className="w-5 h-5 text-slate-400" />
        </button>
      </div>

      <div className="flex border-b border-slate-100 bg-white">
        {steps.map((s) => (
          <div key={s.id} className={`flex-1 p-6 flex flex-col items-center gap-2 border-b-4 transition-all ${
            activeStep === s.id ? 'border-blue-600 text-blue-600 bg-blue-50/30' : 
            activeStep > s.id ? 'border-green-50 text-green-600' : 'border-transparent text-slate-400'
          }`}>
            <div className={`p-3 rounded-2xl ${
              activeStep === s.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 
              activeStep > s.id ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-400'
            }`}>
              {/* Added <any> to React.ReactElement cast to allow the 'className' property in React.cloneElement */}
              {React.cloneElement(s.icon as React.ReactElement<any>, { className: 'w-6 h-6' })}
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-center">{s.title}</span>
          </div>
        ))}
      </div>

      <div className="p-10 min-h-[400px]">
        {activeStep === 1 && (
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Aadhaar Number (eKYC)</label>
                <input type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 transition-all outline-none" placeholder="XXXX XXXX XXXX" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">PAN Card (NSDL Link)</label>
                <input type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 transition-all outline-none" placeholder="ABCDE1234F" />
              </div>
            </div>
            
            <div className="flex gap-6">
              <div className="flex-1 p-8 border-2 border-dashed border-blue-200 rounded-3xl flex flex-col items-center justify-center bg-blue-50/30 hover:bg-blue-50 transition-all group cursor-pointer">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-md mb-4 group-hover:scale-110 transition-transform">
                  <Camera className="text-blue-600 w-8 h-8" />
                </div>
                <p className="font-bold text-slate-800">Start Video KYC</p>
                <p className="text-xs text-slate-400 mt-1">RBI Compliant Face Match & Liveness</p>
              </div>
              
              <div className="flex-1 p-8 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center bg-slate-50/30 hover:bg-slate-100 transition-all cursor-pointer">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-md mb-4">
                  <Eye className="text-slate-400 w-8 h-8" />
                </div>
                <p className="font-bold text-slate-800">OCR Extraction</p>
                <p className="text-xs text-slate-400 mt-1">Upload Documents for Auto-filling</p>
              </div>
            </div>
          </div>
        )}

        {activeStep === 2 && (
          <div className="max-w-2xl mx-auto space-y-8 animate-in slide-in-from-right-4 duration-300">
             <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-xl flex items-center justify-between overflow-hidden relative">
                <div className="z-10">
                   <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-1">CIBIL Engine</p>
                   <h4 className="text-xl font-bold">Fetch Real-time Credit Report</h4>
                   <p className="text-sm text-slate-400 mt-1">Integration with TransUnion, Experian & Equifax</p>
                </div>
                <button className="z-10 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-2xl font-bold text-sm shadow-xl transition-all">Fetch Bureau Data</button>
                <div className="absolute -right-10 top-0 w-32 h-32 bg-blue-600/20 rounded-full blur-3xl"></div>
             </div>
             
             <div className="grid grid-cols-2 gap-4">
                <div className="p-6 bg-white border border-slate-100 rounded-3xl shadow-sm">
                   <p className="text-xs font-bold text-slate-400 uppercase mb-4">Bank Statement Analysis</p>
                   <div className="flex items-center gap-4 p-4 border-2 border-dashed border-slate-100 rounded-2xl hover:bg-slate-50 cursor-pointer">
                      <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl"><FileText className="w-6 h-6" /></div>
                      <span className="text-sm font-medium">Link via Account Aggregator</span>
                   </div>
                </div>
                <div className="p-6 bg-white border border-slate-100 rounded-3xl shadow-sm">
                   <p className="text-xs font-bold text-slate-400 uppercase mb-4">Income Verification</p>
                   <div className="flex items-center gap-4 p-4 border-2 border-dashed border-slate-100 rounded-2xl hover:bg-slate-50 cursor-pointer">
                      <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><IndianRupee className="w-6 h-6" /></div>
                      <span className="text-sm font-medium">Upload ITR / Form 16</span>
                   </div>
                </div>
             </div>
          </div>
        )}

        {activeStep === 3 && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="grid grid-cols-3 gap-4">
               {['Personal Loan', 'Gold Loan', 'MSME Business', 'LAP', 'Vehicle Loan', 'Micro-finance'].map(p => (
                 <div key={p} className="p-4 border border-slate-200 rounded-2xl hover:border-blue-600 hover:bg-blue-50 cursor-pointer transition-all flex flex-col items-center">
                    <span className="text-sm font-bold">{p}</span>
                    <span className="text-[10px] text-slate-400 mt-1">Fixed @ 12.5% p.a</span>
                 </div>
               ))}
            </div>
            
            <div className="bg-slate-50 p-6 rounded-3xl grid grid-cols-2 gap-6">
               <div className="space-y-2">
                 <label className="text-xs font-bold text-slate-500 uppercase">Sanction Amount (₹)</label>
                 <input type="range" min="100000" max="5000000" step="50000" className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer" />
                 <div className="flex justify-between text-lg font-bold">
                    <span>₹1,00,000</span>
                    <span className="text-blue-600">₹15,00,000</span>
                    <span>₹50L</span>
                 </div>
               </div>
               <div className="space-y-2">
                 <label className="text-xs font-bold text-slate-500 uppercase">Tenure (Months)</label>
                 <select className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none">
                    <option>12 Months</option>
                    <option>24 Months</option>
                    <option selected>36 Months</option>
                    <option>60 Months</option>
                 </select>
               </div>
            </div>
          </div>
        )}

        <div className="mt-12 flex justify-between gap-4 max-w-2xl mx-auto">
          <button 
            disabled={activeStep === 1}
            onClick={() => setActiveStep(prev => prev - 1)}
            className="px-8 py-3 border border-slate-200 rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-30 transition-all"
          >
            Back
          </button>
          <button 
            onClick={() => activeStep < 4 ? setActiveStep(prev => prev + 1) : onCancel()}
            className="px-10 py-3 bg-blue-600 text-white rounded-2xl text-sm font-bold hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all flex items-center gap-2"
          >
            {activeStep === 4 ? 'Confirm & Final Submit' : 'Continue Journey'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

const ApplicationDetail: React.FC<{ app: LoanApplication, onBack: () => void }> = ({ app, onBack }) => {
  const [aiAnalysis, setAiAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const runAiAnalysis = async () => {
    setIsAnalyzing(true);
    const result = await analyzeLoanRisk(app);
    setAiAnalysis(result);
    setIsAnalyzing(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex justify-between items-center">
        <button onClick={onBack} className="text-sm font-bold text-blue-600 flex items-center gap-1">
          ← Back to Funnel
        </button>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-slate-200 rounded-xl text-sm font-medium hover:bg-white transition-colors">Generate Sanction Letter</button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-xl text-sm font-bold hover:bg-green-700 transition-colors shadow-lg shadow-green-100">Approve & Disburse</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
           <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <div className="flex justify-between items-start mb-8">
                 <div className="flex gap-4">
                    <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                       {app.customer.name.charAt(0)}
                    </div>
                    <div>
                       <h3 className="text-2xl font-bold text-slate-800">{app.customer.name}</h3>
                       <p className="text-slate-500 font-medium">#{app.id} • {app.productType} Loan</p>
                    </div>
                 </div>
                 <div className="text-right">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Application Status</p>
                    <span className="text-lg font-bold text-amber-600 uppercase">{app.status.replace('_', ' ')}</span>
                 </div>
              </div>

              <div className="grid grid-cols-3 gap-8 py-8 border-y border-slate-50">
                 <div>
                    <p className="text-xs font-bold text-slate-400 uppercase mb-1">Loan Amount</p>
                    <p className="text-xl font-bold text-slate-800">₹{app.amount.toLocaleString('en-IN')}</p>
                 </div>
                 <div>
                    <p className="text-xs font-bold text-slate-400 uppercase mb-1">CIBIL Score</p>
                    <p className="text-xl font-bold text-green-600">{app.customer.cibilScore || 'N/A'}</p>
                 </div>
                 <div>
                    <p className="text-xs font-bold text-slate-400 uppercase mb-1">Tenure</p>
                    <p className="text-xl font-bold text-slate-800">{app.tenure} Months</p>
                 </div>
              </div>
              
              <div className="mt-8">
                 <h4 className="font-bold text-slate-800 mb-4">KYC Documents</h4>
                 <div className="grid grid-cols-4 gap-4">
                    {['Aadhaar Card', 'PAN Card', 'Bank Stmt (6M)', 'V-KYC Video'].map(doc => (
                       <div key={doc} className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between group cursor-pointer hover:bg-white transition-all">
                          <span className="text-xs font-semibold text-slate-600">{doc}</span>
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                       </div>
                    ))}
                 </div>
              </div>
           </div>

           <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h4 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                 <Zap className="w-5 h-5 text-blue-600" />
                 AI-Driven Risk Analysis
              </h4>
              
              {!aiAnalysis && !isAnalyzing && (
                 <div className="flex flex-col items-center justify-center py-10">
                    <button 
                       onClick={runAiAnalysis}
                       className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold text-sm shadow-xl hover:bg-slate-800 transition-all"
                    >
                       Run Advanced Risk Intelligence
                    </button>
                    <p className="text-xs text-slate-400 mt-4 italic">Uses LLM to evaluate fraud, income stability and bureau trends</p>
                 </div>
              )}

              {isAnalyzing && (
                 <div className="flex flex-col items-center justify-center py-10 space-y-4">
                    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-sm font-bold text-slate-600 animate-pulse">Scanning 24 months of bureau history...</p>
                 </div>
              )}

              {aiAnalysis && (
                 <div className="space-y-6 animate-in fade-in zoom-in-95">
                    <div className="flex items-center gap-6">
                       <div className="w-32 h-32 rounded-full border-8 border-slate-100 flex items-center justify-center relative">
                          <span className={`text-3xl font-black ${aiAnalysis.score > 70 ? 'text-green-600' : 'text-amber-600'}`}>{aiAnalysis.score}</span>
                          <span className="absolute -bottom-2 bg-slate-900 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">SCORE</span>
                       </div>
                       <div className="flex-1">
                          <h5 className="font-bold text-slate-800">Recommendation: {aiAnalysis.recommendation}</h5>
                          <div className="mt-4 space-y-2">
                             {aiAnalysis.factors.map((f: string, i: number) => (
                                <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
                                   <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                                   {f}
                                </div>
                             ))}
                          </div>
                       </div>
                    </div>
                 </div>
              )}
           </div>
        </div>

        <div className="space-y-6">
           <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-xl">
              <h4 className="font-bold mb-4 flex items-center gap-2">
                 <ShieldCheck className="w-5 h-5 text-blue-400" />
                 Compliance Scorecard
              </h4>
              <div className="space-y-4">
                 {[
                   { label: 'AML Check', status: 'Passed' },
                   { label: 'Pincode Check', status: 'Allowed' },
                   { label: 'Dedupe Check', status: 'Clean' },
                   { label: 'RBI Rule 14.1', status: 'Compliant' }
                 ].map(rule => (
                    <div key={rule.label} className="flex justify-between items-center text-sm border-b border-slate-800 pb-3 last:border-0">
                       <span className="text-slate-400 font-medium">{rule.label}</span>
                       <span className="text-green-400 font-bold">{rule.status}</span>
                    </div>
                 ))}
              </div>
           </div>

           <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
              <h4 className="font-bold text-slate-800 mb-4">Underwriter Notes</h4>
              <textarea 
                 className="w-full h-32 p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10"
                 placeholder="Enter assessment notes..."
              ></textarea>
              <button className="w-full mt-4 py-3 bg-slate-100 text-slate-700 font-bold text-sm rounded-xl hover:bg-slate-200 transition-colors">Save Notes</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default LoanOrigination;
