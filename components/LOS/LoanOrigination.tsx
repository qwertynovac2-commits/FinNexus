
import React, { useState, useEffect } from 'react';
import { Search, Plus, Filter, ArrowRight, UserCheck, ShieldCheck, FileText, CheckCircle2, IndianRupee, Camera, Eye, Zap, FileSignature, Fingerprint, Smartphone, ShieldClose, Loader2, Info, FileSearch, Clock, ClipboardCheck, Lock, Shield } from 'lucide-react';
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
              <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Origination Funnel</h2>
              <p className="text-sm text-slate-500">Track and manage new loan applications</p>
            </div>
            <button 
              onClick={() => setView('new')}
              className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
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
                  <span className="text-3xl font-black text-slate-800">{card.count}</span>
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
                          app.status === 'SANCTIONED' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
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
            className="px-10 py-3 bg-blue-600 text-white rounded-2xl text-sm font-bold hover:bg-blue-700 shadow-xl shadow-blue-100 hover:bg-blue-700 disabled:opacity-50 transition-all flex items-center gap-2"
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
  const [showAgreementCenter, setShowAgreementCenter] = useState(false);
  const [loanStatus, setLoanStatus] = useState(app.status);
  const [esignStatus, setEsignStatus] = useState(app.esignStatus || 'NOT_STARTED');

  const runAiAnalysis = async () => {
    setIsAnalyzing(true);
    const result = await analyzeLoanRisk(app);
    setAiAnalysis(result);
    setIsAnalyzing(false);
  };

  const handleAgreementComplete = () => {
    setEsignStatus('COMPLETED');
    setLoanStatus('SIGNED');
    setShowAgreementCenter(false);
  };

  const roadmap = [
    { label: 'Application Filed', status: 'COMPLETED', date: app.createdAt, icon: <FileText /> },
    { label: 'KYC Verification', status: app.customer.kycStatus === 'VERIFIED' ? 'COMPLETED' : 'PENDING', date: app.createdAt, icon: <UserCheck /> },
    { label: 'Credit Assessment', status: (loanStatus !== 'LEAD' && loanStatus !== 'KYC_PENDING') ? 'COMPLETED' : 'PENDING', icon: <ShieldCheck /> },
    { label: 'Sanction Letter', status: (loanStatus === 'SANCTIONED' || loanStatus === 'SIGNED' || loanStatus === 'DISBURSED') ? 'COMPLETED' : 'PENDING', icon: <CheckCircle2 /> },
    { label: 'Digital Agreement', status: esignStatus === 'COMPLETED' ? 'COMPLETED' : 'PENDING', icon: <FileSignature /> },
    { label: 'Disbursement', status: loanStatus === 'DISBURSED' ? 'COMPLETED' : 'PENDING', icon: <IndianRupee /> },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex justify-between items-center">
        <button onClick={onBack} className="text-sm font-bold text-blue-600 flex items-center gap-2 hover:translate-x-[-4px] transition-transform">
          ← Back to Origination Funnel
        </button>
        <div className="flex gap-3">
          {loanStatus === 'SANCTIONED' && (
            <button 
              onClick={() => setShowAgreementCenter(true)}
              className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all flex items-center gap-2 shadow-lg"
            >
              <FileSignature className="w-4 h-4 text-blue-400" />
              Generate & eSign Agreement
            </button>
          )}
          {loanStatus === 'SIGNED' && (
            <button className="px-5 py-2.5 bg-green-600 text-white rounded-xl text-sm font-bold hover:bg-green-700 transition-colors shadow-lg shadow-green-100 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              Approve & Disburse
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
           <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100">
              <div className="flex justify-between items-start mb-8">
                 <div className="flex gap-5">
                    <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center text-white text-3xl font-black shadow-xl shadow-blue-100">
                       {app.customer.name.charAt(0)}
                    </div>
                    <div>
                       <h3 className="text-3xl font-black text-slate-900 tracking-tight">{app.customer.name}</h3>
                       <div className="flex items-center gap-2 mt-1">
                          <span className="text-slate-500 font-bold">#{app.id}</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-200"></span>
                          <span className="text-slate-400 font-medium tracking-wide uppercase text-[10px]">{app.productType} Loan</span>
                       </div>
                    </div>
                 </div>
                 <div className="text-right space-y-2">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Application Lifecycle</p>
                    <div className="flex flex-col items-end gap-2">
                       <span className={`px-4 py-1.5 rounded-full text-sm font-black uppercase tracking-wider ${
                         loanStatus === 'SIGNED' ? 'bg-green-100 text-green-700' : 
                         loanStatus === 'SANCTIONED' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
                       }`}>
                         {loanStatus.replace('_', ' ')}
                       </span>
                       <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border ${
                         esignStatus === 'COMPLETED' ? 'bg-green-50 text-green-700 border-green-100' :
                         esignStatus === 'PENDING' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                         'bg-slate-100 text-slate-500 border-slate-200'
                       }`}>
                         <div className={`w-1.5 h-1.5 rounded-full ${
                           esignStatus === 'COMPLETED' ? 'bg-green-500' :
                           esignStatus === 'PENDING' ? 'bg-amber-500' :
                           'bg-slate-400'
                         }`}></div>
                         <span className="text-[10px] font-black uppercase tracking-widest">
                           eSign: {esignStatus.replace('_', ' ')}
                         </span>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="grid grid-cols-3 gap-8 py-10 border-y border-slate-50">
                 <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100/50">
                    <p className="text-[10px] font-black text-slate-400 uppercase mb-2 tracking-widest">Principal Amount</p>
                    <p className="text-2xl font-black text-slate-900">₹{app.amount.toLocaleString('en-IN')}</p>
                 </div>
                 <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100/50">
                    <p className="text-[10px] font-black text-slate-400 uppercase mb-2 tracking-widest">Bureau Confidence</p>
                    <p className={`text-2xl font-black ${app.customer.cibilScore! > 750 ? 'text-green-600' : 'text-amber-600'}`}>
                      {app.customer.cibilScore || 'N/A'}
                    </p>
                 </div>
                 <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100/50">
                    <p className="text-[10px] font-black text-slate-400 uppercase mb-2 tracking-widest">Tenure Structure</p>
                    <p className="text-2xl font-black text-slate-900">{app.tenure} <span className="text-sm font-bold text-slate-400">Months</span></p>
                 </div>
              </div>
              
              <div className="mt-8">
                 <h4 className="font-black text-slate-800 mb-6 flex items-center gap-2">
                    <ClipboardCheck className="w-5 h-5 text-blue-600" />
                    Onboarding Verification Checklist
                 </h4>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['Aadhaar eKYC', 'PAN NSDL Check', '6M Bank Stmt', 'V-KYC Liveness'].map(doc => (
                       <div key={doc} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between hover:bg-white hover:shadow-sm transition-all group">
                          <span className="text-xs font-bold text-slate-600">{doc}</span>
                          <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white shadow-sm">
                             <CheckCircle2 className="w-3.5 h-3.5" />
                          </div>
                       </div>
                    ))}
                 </div>
              </div>
           </div>

           <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-8">
                 <h4 className="text-lg font-black text-slate-800 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-blue-600" />
                    AI-Driven Risk Insights
                 </h4>
                 {aiAnalysis && (
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Last Analyzed: 2 mins ago</span>
                 )}
              </div>
              
              {!aiAnalysis && !isAnalyzing && (
                 <div className="flex flex-col items-center justify-center py-16 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                    <div className="p-4 bg-blue-100 rounded-2xl mb-6">
                       <Zap className="w-8 h-8 text-blue-600" />
                    </div>
                    <h5 className="text-lg font-bold text-slate-800">Advanced AI Underwriting</h5>
                    <p className="text-sm text-slate-500 mt-2 mb-8 text-center max-w-sm">Use our proprietary LLM to analyze income volatility, fraud patterns, and spending behavior.</p>
                    <button 
                       onClick={runAiAnalysis}
                       className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold text-sm shadow-xl hover:bg-slate-800 transition-all hover:scale-[1.02]"
                    >
                       Execute Deep Risk Scan
                    </button>
                 </div>
              )}

              {isAnalyzing && (
                 <div className="flex flex-col items-center justify-center py-16 space-y-6">
                    <div className="relative">
                       <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                       <div className="absolute inset-0 flex items-center justify-center">
                          <Zap className="w-6 h-6 text-blue-600" />
                       </div>
                    </div>
                    <div className="text-center">
                       <p className="text-sm font-black text-slate-600 animate-pulse tracking-wide">Processing Account Aggregator Data...</p>
                       <p className="text-xs text-slate-400 mt-1">Cross-referencing 24 months of bureau and GST logs</p>
                    </div>
                 </div>
              )}

              {aiAnalysis && (
                 <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
                    <div className="flex items-center gap-10">
                       <div className="w-40 h-40 rounded-[40px] bg-slate-50 border border-slate-100 flex items-center justify-center relative shadow-inner">
                          <svg className="w-32 h-32 transform -rotate-90">
                             <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-200" />
                             <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className={aiAnalysis.score > 70 ? 'text-green-500' : 'text-amber-500'} strokeDasharray={364} strokeDashoffset={364 - (364 * aiAnalysis.score) / 100} />
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                             <span className={`text-4xl font-black ${aiAnalysis.score > 70 ? 'text-green-600' : 'text-amber-600'}`}>{aiAnalysis.score}</span>
                             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">SCORE</span>
                          </div>
                       </div>
                       <div className="flex-1 space-y-6">
                          <div>
                             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">AI Recommendation</p>
                             <h5 className="text-2xl font-black text-slate-800">{aiAnalysis.recommendation}</h5>
                          </div>
                          <div className="space-y-3">
                             {aiAnalysis.factors.map((f: string, i: number) => (
                                <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100/50 text-sm font-medium text-slate-700">
                                   <div className={`w-2 h-2 rounded-full ${aiAnalysis.score > 70 ? 'bg-green-400' : 'bg-amber-400'}`}></div>
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
           <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100">
              <h4 className="font-black text-slate-800 mb-6 flex items-center gap-2">
                 <Clock className="w-5 h-5 text-indigo-600" />
                 Process Roadmap
              </h4>
              <div className="space-y-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
                 {roadmap.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-4 relative z-10">
                       <div className={`w-6 h-6 rounded-full flex items-center justify-center shadow-sm border-2 ${
                         step.status === 'COMPLETED' ? 'bg-green-500 border-green-500 text-white' : 'bg-white border-slate-200 text-slate-300'
                       }`}>
                         {React.cloneElement(step.icon as React.ReactElement<any>, { className: 'w-3 h-3' })}
                       </div>
                       <div className="flex-1">
                          <p className={`text-xs font-black uppercase tracking-wider ${step.status === 'COMPLETED' ? 'text-slate-800' : 'text-slate-400'}`}>
                            {step.label}
                          </p>
                          {step.date && (
                            <p className="text-[10px] text-slate-400 font-medium">{step.date}</p>
                          )}
                          {step.status === 'PENDING' && idx === roadmap.findIndex(r => r.status === 'PENDING') && (
                            <span className="inline-block mt-1 px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-black rounded uppercase">Next Step</span>
                          )}
                       </div>
                    </div>
                 ))}
              </div>
           </div>

           <div className="bg-slate-900 text-white p-8 rounded-[32px] shadow-xl relative overflow-hidden">
              <h4 className="font-black mb-6 flex items-center gap-2 tracking-tight">
                 <ShieldCheck className="w-5 h-5 text-blue-400" />
                 Compliance Score
              </h4>
              <div className="space-y-5">
                 {[
                   { label: 'AML Check', status: 'Passed' },
                   { label: 'Negative Area', status: 'Cleared' },
                   { label: 'Dedupe Engine', status: 'No Match' },
                   { label: 'RBI Rule 14.1', status: 'OK' }
                 ].map(rule => (
                    <div key={rule.label} className="flex justify-between items-center text-xs border-b border-slate-800 pb-3 last:border-0">
                       <span className="text-slate-400 font-bold tracking-wide uppercase">{rule.label}</span>
                       <span className="text-green-400 font-black tracking-widest">{rule.status}</span>
                    </div>
                 ))}
              </div>
              <div className="absolute -right-20 -top-20 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl"></div>
           </div>
        </div>
      </div>

      {showAgreementCenter && (
        <AgreementCenter 
          app={app} 
          onClose={() => setShowAgreementCenter(false)} 
          onComplete={handleAgreementComplete}
        />
      )}
    </div>
  );
};

const AgreementCenter: React.FC<{ 
  app: LoanApplication, 
  onClose: () => void, 
  onComplete: () => void 
}> = ({ app, onClose, onComplete }) => {
  const [step, setStep] = useState<'generating' | 'review' | 'esign' | 'otp' | 'success'>('generating');
  const [otp, setOtp] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [docId] = useState(() => 'AGR-' + Math.random().toString(36).substr(2, 9).toUpperCase());
  const [timestamp] = useState(() => new Date().toISOString());

  const steps = [
    { id: 'review', label: 'Review' },
    { id: 'esign', label: 'Consent' },
    { id: 'otp', label: 'Verify' },
    { id: 'success', label: 'Done' },
  ];

  const currentStepIdx = steps.findIndex(s => s.id === step);

  useEffect(() => {
    if (step === 'generating') {
      const timer = setTimeout(() => setStep('review'), 2000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleVerifyOtp = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setStep('success');
    }, 2500);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[110] flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-6xl h-[90vh] rounded-[48px] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300 border border-white/20">
        
        <div className="px-10 py-6 border-b border-slate-100 flex justify-between items-center bg-white relative">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-[20px] flex items-center justify-center text-white shadow-xl shadow-blue-100">
              <FileSignature className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Legal Execution Hub</h3>
              <div className="flex items-center gap-2">
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Pipeline ID: {docId}</p>
                <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest">NSDL e-Sign v3.0</p>
              </div>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-8 px-8 py-3 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm">
             {steps.map((s, idx) => (
                <div key={s.id} className="flex items-center gap-2">
                   <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black border-2 transition-all ${
                      idx <= currentStepIdx ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-slate-200 text-slate-400'
                   }`}>
                      {idx < currentStepIdx ? <CheckCircle2 className="w-3 h-3" /> : idx + 1}
                   </div>
                   <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${
                      idx <= currentStepIdx ? 'text-slate-800' : 'text-slate-400'
                   }`}>{s.label}</span>
                   {idx < steps.length - 1 && <div className="w-4 h-0.5 bg-slate-200 ml-2"></div>}
                </div>
             ))}
          </div>

          <button onClick={onClose} className="p-3 hover:bg-slate-50 rounded-2xl transition-all text-slate-400 hover:text-red-500">
            <ShieldClose className="w-7 h-7" />
          </button>
        </div>

        <div className="flex-1 overflow-hidden bg-slate-50 flex flex-col">
          {step === 'generating' && (
            <div className="flex-1 flex flex-col items-center justify-center space-y-6">
              <div className="relative">
                <div className="w-28 h-28 border-4 border-blue-100 border-t-blue-600 rounded-[36px] animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <FileText className="w-10 h-10 text-blue-600" />
                </div>
              </div>
              <div className="text-center">
                <h4 className="text-2xl font-black text-slate-900 tracking-tight">Compiling Legal Facility</h4>
                <p className="text-sm text-slate-500 mt-2 font-medium">Embedding sanction schedules and Key Fact Statement (KFS)...</p>
              </div>
            </div>
          )}

          {step === 'review' && (
            <div className="flex-1 flex flex-col h-full overflow-hidden animate-in slide-in-from-right-10 duration-500">
              <div className="flex-1 flex overflow-hidden p-8 gap-8">
                
                <div className="w-80 bg-white border border-slate-200 rounded-[32px] p-8 shadow-sm overflow-y-auto hidden lg:block">
                  <div className="flex items-center gap-2 mb-8 pb-6 border-b border-slate-50">
                    <Info className="w-5 h-5 text-blue-600" />
                    <h5 className="font-black text-slate-900 text-sm tracking-tight">Key Fact Statement</h5>
                  </div>
                  
                  <div className="space-y-8">
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Core Sanction Metrics</p>
                      <div className="space-y-4">
                        <div className="flex justify-between text-xs font-bold">
                          <span className="text-slate-500">Amount</span>
                          <span className="text-slate-900">₹{app.amount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-xs font-bold">
                          <span className="text-slate-500">Fixed ROI</span>
                          <span className="text-slate-900">{app.interestRate}% p.a.</span>
                        </div>
                        <div className="flex justify-between text-xs font-bold">
                          <span className="text-slate-500">Tenure</span>
                          <span className="text-slate-900">{app.tenure} Months</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 bg-slate-900 rounded-[24px] text-white">
                      <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-3">Effective Cost</p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-black">
                          <span>APR</span>
                          <span>16.2%</span>
                        </div>
                        <div className="flex justify-between text-xs font-bold text-slate-400 mt-2">
                          <span>EMI Value</span>
                          <span>₹{Math.round(app.amount * 0.048).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex-1 flex flex-col bg-slate-200 rounded-[40px] border border-slate-300/50 overflow-hidden relative shadow-inner">
                   <div className="flex-1 overflow-y-auto p-16 bg-white m-6 rounded-[32px] shadow-2xl">
                      <div className="max-w-2xl mx-auto font-serif text-slate-800 leading-relaxed text-sm">
                         <div className="text-center border-b pb-12 mb-12">
                            <h2 className="text-4xl font-black uppercase tracking-tighter text-slate-900 mb-2">Facility Agreement</h2>
                            <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] font-sans">FinNexus Operating System x {app.customer.name}</p>
                            <p className="text-[10px] font-sans text-slate-400 mt-4 uppercase tracking-widest font-bold">Document Code: {docId}</p>
                         </div>
                         
                         <div className="space-y-10">
                            <section>
                               <h3 className="font-bold text-slate-900 mb-3 border-l-4 border-blue-600 pl-4 font-sans uppercase text-xs tracking-widest">Section 1: The Facility</h3>
                               <p>THIS AGREEMENT executed on {new Date().toLocaleDateString()} by <strong>FinNexus Capital Ltd</strong> (the "Lender") in favor of <strong>{app.customer.name}</strong>, PAN: {app.customer.pan} (the "Borrower").</p>
                               <p className="mt-4">The Lender hereby agrees to grant a credit facility for an amount of <strong>INR {app.amount.toLocaleString()}</strong> for the purpose specified in the loan application.</p>
                            </section>

                            <section>
                               <h3 className="font-bold text-slate-900 mb-3 border-l-4 border-blue-600 pl-4 font-sans uppercase text-xs tracking-widest">Section 2: Repayment & Interest</h3>
                               <p>The Borrower shall repay the loan amount along with interest at a fixed rate of <strong>{app.interestRate}% per annum</strong> on a reducing balance basis. The repayment shall be made in {app.tenure} monthly installments ("EMIs").</p>
                               <p className="mt-4">In case of any delay in payment of EMI, the Borrower shall be liable to pay additional penal interest at the rate of 2% per month on the overdue amount.</p>
                            </section>

                            <section>
                               <h3 className="font-bold text-slate-900 mb-3 border-l-4 border-blue-600 pl-4 font-sans uppercase text-xs tracking-widest">Section 3: Disbursement Terms</h3>
                               <p>Disbursement of the facility is subject to completion of KYC, execution of necessary security documents, and creation of a valid NACH/e-NACH mandate for the designated repayment bank account.</p>
                            </section>

                            <section>
                               <h3 className="font-bold text-slate-900 mb-3 border-l-4 border-blue-600 pl-4 font-sans uppercase text-xs tracking-widest">Section 4: Events of Default</h3>
                               <p>The following events shall constitute an "Event of Default": (a) Failure to pay any EMI on the due date; (b) Use of funds for purposes other than declared; (c) Providing false or misleading information during underwriting.</p>
                            </section>

                            <div className="mt-24 flex justify-between pt-12 border-t border-dashed border-slate-200">
                               <div className="text-center">
                                  <div className="w-36 h-20 bg-slate-50 border border-slate-100 rounded-2xl mb-3 flex items-center justify-center text-[10px] text-slate-300 font-bold uppercase italic tracking-widest">FinNexus Signature</div>
                                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Lender Signatory</p>
                               </div>
                               <div className="text-center">
                                  <div className="w-36 h-20 border-2 border-dashed border-blue-200 rounded-2xl mb-3 flex flex-col items-center justify-center bg-blue-50/30">
                                     <Loader2 className="w-5 h-5 text-blue-400 animate-spin mb-2" />
                                     <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest">Awaiting eSign</span>
                                  </div>
                                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Borrower's Digital Sign</p>
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
              </div>

              <div className="px-10 py-8 border-t border-slate-100 bg-white flex justify-between items-center shadow-lg">
                <div className="flex items-center gap-3 text-slate-500">
                   <Info className="w-5 h-5 text-blue-600" />
                   <p className="text-xs font-bold uppercase tracking-tight">Review all legal sections before proceeding to eSign.</p>
                </div>
                <div className="flex gap-4">
                   <button onClick={onClose} className="px-8 py-3.5 border border-slate-200 rounded-2xl font-black text-slate-600 hover:bg-slate-50 transition-all text-xs uppercase tracking-widest">Discard</button>
                   <button onClick={() => setStep('esign')} className="px-12 py-4 bg-blue-600 text-white rounded-2xl font-black shadow-2xl shadow-blue-100 hover:bg-blue-700 transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-widest hover:scale-[1.02]">
                      Proceed to eSign
                      <ArrowRight className="w-4 h-4" />
                   </button>
                </div>
              </div>
            </div>
          )}

          {step === 'esign' && (
             <div className="flex-1 flex flex-col items-center justify-center max-w-lg mx-auto w-full p-8 animate-in zoom-in-95 duration-500">
                <div className="bg-white p-12 rounded-[48px] shadow-2xl border border-slate-100 w-full text-center relative overflow-hidden">
                   <div className="w-24 h-24 bg-amber-50 rounded-[32px] flex items-center justify-center mx-auto mb-10 shadow-inner">
                      <Fingerprint className="w-12 h-12 text-amber-600" />
                   </div>
                   <h4 className="text-2xl font-black text-slate-900 tracking-tight">Digital Execution Consent</h4>
                   <p className="text-sm text-slate-500 mt-4 mb-12 leading-relaxed px-6 font-medium">You are providing explicit legal consent to execute the facility agreement using NSDL e-Gov e-Sign services.</p>
                   
                   <div className="p-8 bg-slate-50 rounded-[32px] border border-slate-100 text-left mb-12">
                      <div className="flex gap-4 p-5 bg-white rounded-2xl border border-slate-200/50 shadow-sm">
                         <input type="checkbox" className="mt-1 w-5 h-5 rounded-lg text-blue-600 border-slate-300 focus:ring-blue-500" defaultChecked />
                         <p className="text-[11px] font-bold text-slate-600 leading-relaxed uppercase">I accept the terms and voluntarily provide consent for UIDAI OTP based e-KYC signature.</p>
                      </div>
                   </div>

                   <button onClick={() => setStep('otp')} className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black shadow-2xl hover:bg-slate-800 transition-all hover:-translate-y-1 active:scale-95 uppercase tracking-widest text-xs">Verify Aadhaar OTP</button>
                </div>
             </div>
          )}

          {step === 'otp' && (
             <div className="flex-1 flex flex-col items-center justify-center max-w-lg mx-auto w-full p-8 animate-in slide-in-from-bottom-8 duration-500">
                <div className="bg-white p-12 rounded-[48px] shadow-2xl border border-slate-100 w-full text-center relative overflow-hidden">
                   {isVerifying && (
                     <div className="absolute inset-0 bg-white/90 z-20 flex flex-col items-center justify-center p-12">
                        <Loader2 className="w-16 h-16 text-blue-600 animate-spin mb-6" />
                        <h5 className="text-xl font-black text-slate-900 tracking-tight">Authenticating with UIDAI...</h5>
                     </div>
                   )}

                   <div className="w-24 h-24 bg-blue-50 rounded-[32px] flex items-center justify-center mx-auto mb-10 shadow-inner">
                      <Smartphone className="w-12 h-12 text-blue-600 animate-pulse" />
                   </div>
                   <h4 className="text-2xl font-black text-slate-900 tracking-tight">Enter Secure Code</h4>
                   <p className="text-sm text-slate-500 mt-4 mb-12 px-6 font-medium uppercase tracking-tight">Sent to mobile ending in ****{app.customer.phone.slice(-4)}</p>
                   
                   <div className="flex justify-center gap-4 mb-12">
                      {[1,2,3,4,5,6].map(i => (
                        <input 
                          key={i} 
                          type="text" 
                          maxLength={1} 
                          value={otp[i-1] || ''}
                          onChange={(e) => {
                             const val = e.target.value;
                             if (/^\d*$/.test(val)) {
                                setOtp(prev => (prev + val).slice(0, 6));
                             }
                          }}
                          className="w-14 h-16 bg-slate-50 border-2 border-slate-200 rounded-2xl text-center text-3xl font-black focus:border-blue-600 outline-none transition-all shadow-sm" 
                        />
                      ))}
                   </div>

                   <button 
                    disabled={otp.length < 6 || isVerifying}
                    onClick={handleVerifyOtp} 
                    className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black shadow-2xl shadow-blue-100 hover:bg-blue-700 disabled:opacity-40 transition-all uppercase tracking-widest text-xs"
                   >
                     Apply Signature
                   </button>
                </div>
             </div>
          )}

          {step === 'success' && (
             <div className="flex-1 flex flex-col items-center justify-center text-center p-16 space-y-10 animate-in zoom-in-90 duration-700">
                <div className="w-40 h-40 bg-green-100 rounded-[56px] flex items-center justify-center shadow-xl">
                   <CheckCircle2 className="w-20 h-20 text-green-600" />
                </div>
                <div>
                   <h4 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">Contract Active</h4>
                   <p className="text-slate-500 mt-4 max-w-md mx-auto leading-relaxed font-bold uppercase text-xs tracking-widest">Document Hash: {docId.split('-')[1]}</p>
                </div>
                
                <button 
                  onClick={onComplete}
                  className="px-20 py-6 bg-slate-900 text-white rounded-[24px] font-black shadow-2xl hover:bg-slate-800 hover:-translate-y-1 transition-all text-xs tracking-[0.2em] uppercase"
                >
                  Finalize Disbursement
                </button>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoanOrigination;
