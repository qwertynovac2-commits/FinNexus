
import React, { useState } from 'react';
import { 
  Search, Plus, FileText, Settings, ShieldCheck, 
  Eye, Zap, Clock, CheckCircle2, AlertCircle, Trash2, 
  Edit, ArrowRight, Database, Fingerprint, Lock, Layers, RefreshCw
} from 'lucide-react';

const DocumentMaster: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('IDENTITY');
  const [showConfigModal, setShowConfigModal] = useState(false);

  const docTypes = [
    { id: 'DOC-01', name: 'Aadhaar Card', cat: 'IDENTITY', ocr: true, mandatory: 'Pre-Approval', status: 'Active', api: 'UIDAI e-KYC' },
    { id: 'DOC-02', name: 'PAN Card', cat: 'IDENTITY', ocr: true, mandatory: 'Pre-Approval', status: 'Active', api: 'NSDL NSDL' },
    { id: 'DOC-03', name: 'Latest Salary Slip', cat: 'INCOME', ocr: true, mandatory: 'Underwriting', status: 'Active', api: 'In-house Parser' },
    { id: 'DOC-04', name: 'Form 16 / ITR', cat: 'INCOME', ocr: false, mandatory: 'Underwriting', status: 'Active', api: 'None' },
    { id: 'DOC-05', name: 'Property Tax Receipt', cat: 'COLLATERAL', ocr: false, mandatory: 'Post-Approval', status: 'Inactive', api: 'State Portal' },
    { id: 'DOC-06', name: 'Bank Statement (6M)', cat: 'INCOME', ocr: true, mandatory: 'Underwriting', status: 'Active', api: 'Account Aggregator' },
  ].filter(d => d.cat === activeCategory || activeCategory === 'ALL');

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-black text-slate-800 tracking-tight">Document Intelligence Master</h3>
          <p className="text-sm text-slate-500 font-medium uppercase tracking-widest text-[10px] mt-1">Manage OCR, Field Extraction & Statutory Retention</p>
        </div>
        <button className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
          <Plus className="w-4 h-4" />
          Add Document Requirement
        </button>
      </div>

      <div className="flex gap-4 border-b border-slate-100">
        {['ALL', 'IDENTITY', 'INCOME', 'BUSINESS', 'COLLATERAL'].map(cat => (
          <button 
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`pb-4 px-2 text-sm font-black uppercase tracking-widest border-b-2 transition-all ${
              activeCategory === cat ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-4 bg-slate-50/30 border-b border-slate-100 flex items-center justify-between">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="text" placeholder="Search doc code..." className="w-full pl-9 pr-4 py-1.5 bg-white border border-slate-200 rounded-lg text-xs outline-none" />
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Showing {docTypes.length} types</span>
                <button className="p-1.5 hover:bg-white rounded-md transition-all"><RefreshCw className="w-4 h-4 text-slate-400" /></button>
              </div>
            </div>
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <tr>
                  <th className="px-6 py-4">Document / Code</th>
                  <th className="px-6 py-4 text-center">Extraction</th>
                  <th className="px-6 py-4">Mandatory At</th>
                  <th className="px-6 py-4">Verification API</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm font-bold">
                {docTypes.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                         <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl shadow-sm"><FileText className="w-4 h-4" /></div>
                         <div>
                            <div className="text-slate-800">{doc.name}</div>
                            <div className="text-[9px] text-slate-400 uppercase tracking-widest font-black">{doc.id}</div>
                         </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {doc.ocr ? (
                        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-amber-50 text-amber-700 rounded-md border border-amber-100">
                           <Zap className="w-3 h-3 fill-amber-500" />
                           <span className="text-[9px] font-black uppercase">OCR ACTIVE</span>
                        </div>
                      ) : <span className="text-slate-300 font-medium">None</span>}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-lg text-[10px] font-black uppercase tracking-tight">{doc.mandatory}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-slate-500 font-medium">
                        <Lock className="w-3 h-3" />
                        {doc.api}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                       <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black uppercase ${
                         doc.status === 'Active' ? 'bg-green-50 text-green-700' : 'bg-slate-200 text-slate-600'
                       }`}>{doc.status}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                       <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => setShowConfigModal(true)} className="p-2 text-slate-400 hover:text-blue-600 bg-white border border-slate-100 rounded-lg shadow-sm"><Settings className="w-4 h-4" /></button>
                          <button className="p-2 text-slate-400 hover:text-red-600 bg-white border border-slate-100 rounded-lg shadow-sm"><Trash2 className="w-4 h-4" /></button>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm space-y-10">
             <div className="flex justify-between items-center">
                <div>
                   <h4 className="text-xl font-black text-slate-800 tracking-tight">AI Extraction & Field Mapping</h4>
                   <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Configure JSON mapping for automated credit scoring</p>
                </div>
                <div className="flex gap-2">
                   <button className="p-2.5 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-all"><Database className="w-5 h-5" /></button>
                   <button className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100 transition-all"><Layers className="w-5 h-5" /></button>
                </div>
             </div>
             
             <div className="grid grid-cols-2 gap-8">
                <div className="p-8 bg-slate-50 rounded-[40px] border border-slate-100 space-y-8 shadow-inner">
                   <div className="flex items-center gap-4 border-b border-slate-200 pb-6">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-md text-slate-400">
                        <Fingerprint className="w-6 h-6" />
                      </div>
                      <div>
                        <h5 className="font-black text-slate-800 text-sm tracking-tight">Aadhaar e-KYC Map</h5>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Engine: Google Vision x FinNexus</p>
                      </div>
                   </div>
                   <div className="space-y-4">
                      {[
                        { label: 'Full Name', match: '98% Conf.', path: 'customer.name', status: 'mapped' },
                        { label: 'Date of Birth', match: '95% Conf.', path: 'customer.dob', status: 'mapped' },
                        { label: 'Aadhaar No.', match: 'SHA-256 Mask', path: 'customer.aadhaar', status: 'mapped' },
                        { label: 'House No.', match: 'Custom RegEx', path: 'customer.addr_hno', status: 'review' }
                      ].map((field, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm border border-slate-100 group hover:border-blue-300 transition-all cursor-pointer">
                           <div>
                              <p className="text-xs font-black text-slate-800">{field.label}</p>
                              <p className="text-[9px] font-mono text-blue-600 mt-1 uppercase tracking-widest">Path: {field.path}</p>
                           </div>
                           <div className="text-right">
                              <span className={`text-[8px] font-black uppercase px-2 py-1 rounded-full ${field.status === 'mapped' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>{field.match}</span>
                           </div>
                        </div>
                      ))}
                   </div>
                   <button className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 hover:border-blue-300 transition-all">Add Extraction Parameter</button>
                </div>

                <div className="p-8 bg-slate-50 rounded-[40px] border border-slate-100 space-y-8 shadow-inner">
                   <div className="flex items-center gap-4 border-b border-slate-200 pb-6">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-md text-slate-400">
                        <FileText className="w-6 h-6" />
                      </div>
                      <div>
                        <h5 className="font-black text-slate-800 text-sm tracking-tight">6M Bank Statement Map</h5>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Engine: Perfios / Account Aggregator</p>
                      </div>
                   </div>
                   <div className="space-y-4">
                      {[
                        { label: 'Average Balance', match: 'Calculated', path: 'income.amb', status: 'mapped' },
                        { label: 'Salary Credits', match: 'Keyword Check', path: 'income.sal_logs', status: 'mapped' },
                        { label: 'EMI Bounces', match: 'Pattern Scan', path: 'risk.bounce_logs', status: 'mapped' },
                        { label: 'Other Loans', match: 'Dedupe Pull', path: 'risk.external_oblig', status: 'mapped' }
                      ].map((field, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm border border-slate-100 hover:border-blue-300 transition-all cursor-pointer">
                           <div>
                              <p className="text-xs font-black text-slate-800">{field.label}</p>
                              <p className="text-[9px] font-mono text-indigo-600 mt-1 uppercase tracking-widest">Path: {field.path}</p>
                           </div>
                           <CheckCircle2 className="w-4 h-4 text-green-500" />
                        </div>
                      ))}
                   </div>
                </div>
             </div>
          </div>
        </div>

        <div className="space-y-6">
           <div className="bg-slate-900 text-white p-8 rounded-[40px] shadow-2xl relative overflow-hidden">
              <h4 className="font-black text-xs uppercase tracking-[0.2em] mb-8 flex items-center gap-2 text-blue-400">
                 <ShieldCheck className="w-5 h-5" />
                 Retention & Compliance
              </h4>
              <div className="space-y-6">
                 {[
                   { label: 'Statutory Retention', val: '7 Years' },
                   { label: 'Archive Frequency', val: 'Quarterly' },
                   { label: 'Storage Encryption', val: 'AES-256' },
                   { label: 'Geo-Redundancy', val: 'Active' }
                 ].map(rule => (
                    <div key={rule.label} className="space-y-1.5">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{rule.label}</p>
                       <p className="text-sm font-black text-white">{rule.val}</p>
                    </div>
                 ))}
              </div>
              <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl"></div>
           </div>

           <div className="p-8 bg-white border border-slate-100 rounded-[40px] shadow-sm">
              <h4 className="font-black text-slate-800 text-sm mb-6 flex items-center gap-2">
                 <Clock className="w-4 h-4 text-blue-600" />
                 SLA Thresholds
              </h4>
              <div className="space-y-6">
                 <div>
                    <div className="flex justify-between text-[10px] font-black uppercase text-slate-400 mb-2">
                       <span>OCR Extraction</span>
                       <span className="text-blue-600">&lt; 2.4 Sec</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                       <div className="h-full bg-blue-600 w-[88%]"></div>
                    </div>
                 </div>
                 <div>
                    <div className="flex justify-between text-[10px] font-black uppercase text-slate-400 mb-2">
                       <span>Manual Verif.</span>
                       <span className="text-amber-600">&lt; 15 Mins</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                       <div className="h-full bg-amber-500 w-[62%]"></div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentMaster;
