
import React, { useState } from 'react';
import { 
  Search, Plus, Filter, Handshake, ShieldCheck, IndianRupee, 
  TrendingUp, Star, MoreVertical, Edit2, Copy, FileText, 
  CheckCircle2, AlertTriangle, Building, Globe, Zap, Clock, UserPlus, XCircle, ChevronRight, Save, Trash2, Smartphone, Mail, MapPin, CreditCard, Info
} from 'lucide-react';

const PartnerMaster: React.FC = () => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  
  const mockPartners = [
    { id: 'DSA-1022', name: 'Elite FinSolutions', type: 'DSA', rating: 4.8, volume: '₹12.4Cr', npa: '0.2%', status: 'Active', region: 'Mumbai' },
    { id: 'FIN-440', name: 'QuickCash Marketplace', type: 'Fintech', rating: 4.2, volume: '₹8.1Cr', npa: '1.4%', status: 'Active', region: 'Bangalore' },
    { id: 'AGG-901', name: 'North India Connect', type: 'Aggregator', rating: 3.5, volume: '₹4.2Cr', npa: '2.8%', status: 'Under Review', region: 'Delhi' },
    { id: 'DSA-1025', name: 'Sunrise Connectors', type: 'Connector', rating: 4.0, volume: '₹1.5Cr', npa: '0.0%', status: 'Active', region: 'Chennai' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-black text-slate-800 tracking-tight">Distribution Partner Master</h3>
          <p className="text-sm text-slate-500 font-medium uppercase tracking-widest text-[10px] mt-1">Manage DSAs, Connectors & Co-Lending Nodes</p>
        </div>
        <button 
          onClick={() => {
            setIsAddOpen(true);
            setActiveStep(1);
          }}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
        >
          <UserPlus className="w-4 h-4" />
          Onboard New Partner
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Sourcing Nodes', value: '142', trend: '+12%', color: 'blue' },
          { label: 'Disbursement Vol (MTD)', value: '₹48.2Cr', trend: '+5.4%', color: 'emerald' },
          { label: 'Avg. Login Rate', value: '62%', trend: '-2%', color: 'amber' },
          { label: 'Commission Payout', value: '₹84.5L', trend: '+8%', color: 'indigo' }
        ].map((card, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{card.label}</p>
            <div className="flex justify-between items-end">
              <span className="text-2xl font-black text-slate-800">{card.value}</span>
              <span className={`text-[10px] font-bold ${card.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>{card.trend}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex gap-4 items-center bg-slate-50/30">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by Partner ID, Name, PAN or Region..." 
              className="w-full pl-12 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-4 focus:ring-blue-500/10 transition-all outline-none"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-600 font-bold hover:bg-slate-50">
            <Filter className="w-4 h-4" />
            Region Filter
          </button>
        </div>
        
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <tr>
              <th className="px-6 py-4">Partner Entity</th>
              <th className="px-6 py-4">Model & Channel</th>
              <th className="px-6 py-4">Sourcing Vol (YTD)</th>
              <th className="px-6 py-4">NPA Quality</th>
              <th className="px-6 py-4">Rating</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {mockPartners.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50/50 transition-colors group cursor-pointer">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center font-black text-slate-400">
                      {p.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-slate-800">{p.name}</div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase">{p.id} • {p.region}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-slate-700 font-bold">{p.type}</span>
                    <span className="text-[10px] text-blue-600 font-bold uppercase">Commission Based</span>
                  </div>
                </td>
                <td className="px-6 py-4 font-black text-slate-800">{p.volume}</td>
                <td className="px-6 py-4">
                  <span className={`font-black ${parseFloat(p.npa) > 2 ? 'text-red-600' : 'text-emerald-600'}`}>{p.npa}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                    <span className="font-black text-slate-700">{p.rating}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase ${
                    p.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {p.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-slate-400 hover:text-blue-600 bg-white border rounded-lg shadow-sm"><Edit2 className="w-4 h-4" /></button>
                    <button className="p-2 text-slate-400 hover:text-slate-600 bg-white border rounded-lg shadow-sm"><MoreVertical className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isAddOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[200] flex items-center justify-center p-6">
          <div className="bg-white w-full max-w-6xl h-[90vh] rounded-[48px] shadow-2xl flex flex-col animate-in zoom-in-95 duration-300 overflow-hidden">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-white relative">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-[20px] flex items-center justify-center text-white shadow-xl shadow-blue-100">
                  <Handshake className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-black text-slate-900 tracking-tight">Onboard Distribution Partner</h4>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Regulatory Compliant Onboarding Journey</p>
                </div>
              </div>
              
              <div className="flex items-center gap-8 px-6 py-2 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm">
                {[
                  { id: 1, label: 'Identification' },
                  { id: 2, label: 'Legal & Business' },
                  { id: 3, label: 'Payout & Rules' },
                  { id: 4, label: 'Compliance' }
                ].map((s) => (
                  <div key={s.id} className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black border-2 ${
                      activeStep === s.id ? 'bg-blue-600 border-blue-600 text-white' : 
                      activeStep > s.id ? 'bg-green-500 border-green-500 text-white' : 'border-slate-200 text-slate-400'
                    }`}>
                      {activeStep > s.id ? <CheckCircle2 className="w-3 h-3" /> : s.id}
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-widest ${activeStep === s.id ? 'text-slate-800' : 'text-slate-400'}`}>{s.label}</span>
                  </div>
                ))}
              </div>

              <button onClick={() => setIsAddOpen(false)} className="p-3 hover:bg-slate-50 rounded-2xl text-slate-400 transition-colors">
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-10 bg-slate-50/30">
              <div className="max-w-4xl mx-auto">
                {activeStep === 1 && (
                  <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
                    <section className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-6">
                      <div className="flex items-center gap-2 border-b pb-4 border-slate-50">
                        <Building className="w-5 h-5 text-blue-600" />
                        <h5 className="font-black text-slate-800 uppercase text-xs tracking-widest">Business Identification</h5>
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-500 uppercase">Registered Partner Name</label>
                          <input type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:ring-4 focus:ring-blue-500/10 outline-none" placeholder="e.g. Apex Finvest Pvt Ltd" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-500 uppercase">Partner Type</label>
                          <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none">
                            <option>Direct Selling Agent (DSA)</option>
                            <option>Fintech Aggregator</option>
                            <option>Connector</option>
                            <option>Co-Lending Partner</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-500 uppercase">PAN Number (Entity)</label>
                          <input type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold uppercase" placeholder="ABCDE1234F" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-500 uppercase">Establishment Date</label>
                          <input type="date" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold" />
                        </div>
                      </div>
                    </section>

                    <section className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-6">
                      <div className="flex items-center gap-2 border-b pb-4 border-slate-50">
                        <Globe className="w-5 h-5 text-blue-600" />
                        <h5 className="font-black text-slate-800 uppercase text-xs tracking-widest">Contact & Communication</h5>
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-500 uppercase">Official Email</label>
                          <input type="email" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold" placeholder="contact@partner.com" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-500 uppercase">Mobile Number</label>
                          <input type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold" placeholder="+91 XXXXX XXXXX" />
                        </div>
                        <div className="col-span-2 space-y-2">
                          <label className="text-[10px] font-black text-slate-500 uppercase">Registered Address</label>
                          <textarea className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold h-24" placeholder="Full office address with Pincode..."></textarea>
                        </div>
                      </div>
                    </section>
                  </div>
                )}

                {activeStep === 2 && (
                  <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
                    <section className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-6">
                      <div className="flex items-center gap-2 border-b pb-4 border-slate-50">
                        <Smartphone className="w-5 h-5 text-blue-600" />
                        <h5 className="font-black text-slate-800 uppercase text-xs tracking-widest">Owner / Director Profile</h5>
                      </div>
                      <div className="grid grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-500 uppercase">Full Name</label>
                          <input type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold" placeholder="Authorized Signatory" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-500 uppercase">Aadhaar Number</label>
                          <input type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold" placeholder="XXXX-XXXX-XXXX" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-500 uppercase">Designation</label>
                          <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold">
                            <option>Proprietor</option>
                            <option>Director</option>
                            <option>Partner</option>
                          </select>
                        </div>
                      </div>
                      <div className="p-6 border-2 border-dashed border-slate-200 rounded-[32px] flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 transition-all cursor-pointer">
                        <FileText className="w-8 h-8 text-slate-400 mb-2" />
                        <p className="text-xs font-black text-slate-600 uppercase">Upload Identity Proof (PAN/Aadhaar)</p>
                        <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold">Max 2MB • PDF/JPG</p>
                      </div>
                    </section>

                    <section className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-6">
                      <div className="flex items-center gap-2 border-b pb-4 border-slate-50">
                        <CreditCard className="w-5 h-5 text-blue-600" />
                        <h5 className="font-black text-slate-800 uppercase text-xs tracking-widest">Payout Settlement Account</h5>
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-500 uppercase">Account Holder Name</label>
                          <input type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold" placeholder="As per bank records" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-500 uppercase">IFSC Code</label>
                          <input type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold uppercase" placeholder="HDFC0001234" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-500 uppercase">Account Number</label>
                          <input type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold" placeholder="Settlement A/C" />
                        </div>
                        <div className="flex items-end pb-1">
                          <button className="flex items-center gap-2 bg-indigo-50 text-indigo-700 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-100 transition-all">
                            <Zap className="w-4 h-4" /> Verify (Penny Drop)
                          </button>
                        </div>
                      </div>
                    </section>
                  </div>
                )}

                {activeStep === 3 && (
                  <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
                    <section className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-8">
                      <div className="flex items-center justify-between border-b pb-4 border-slate-50">
                         <div className="flex items-center gap-2">
                            <IndianRupee className="w-5 h-5 text-blue-600" />
                            <h5 className="font-black text-slate-800 uppercase text-xs tracking-widest">Commission Payout Matrix</h5>
                         </div>
                         <button className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 uppercase tracking-widest">Add Custom Slab</button>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="grid grid-cols-4 gap-6 p-4 bg-slate-50 rounded-2xl text-[10px] font-black uppercase text-slate-400 tracking-widest">
                          <div className="col-span-2">Volume Range (MTD Disbursement)</div>
                          <div>Rate %</div>
                          <div className="text-right">Action</div>
                        </div>
                        {[
                          { range: '₹0 - ₹50 Lakhs', rate: '1.25%', id: 'S1' },
                          { range: '₹50 Lakhs - ₹5 Crores', rate: '1.75%', id: 'S2' },
                          { range: '> ₹5 Crores', rate: '2.25%', id: 'S3' }
                        ].map((slab) => (
                          <div key={slab.id} className="grid grid-cols-4 gap-6 p-6 border border-slate-100 rounded-3xl items-center hover:border-blue-200 transition-all bg-white group">
                            <div className="col-span-2 text-sm font-black text-slate-800">{slab.range}</div>
                            <div className="text-lg font-black text-blue-600">{slab.rate}</div>
                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button className="p-2 hover:bg-slate-100 rounded-xl"><Edit2 className="w-4 h-4 text-slate-400" /></button>
                              <button className="p-2 hover:bg-red-50 rounded-xl text-red-400"><Trash2 className="w-4 h-4" /></button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>

                    <section className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-6">
                      <div className="flex items-center gap-2 border-b pb-4 border-slate-50">
                        <Zap className="w-5 h-5 text-amber-500" />
                        <h5 className="font-black text-slate-800 uppercase text-xs tracking-widest">Product Access & Sourcing Channels</h5>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        {['Personal Loans', 'Business Loans', 'Gold Loans', 'Vehicle Loans', 'LAP', 'Microfinance'].map(p => (
                          <div key={p} className="p-4 rounded-2xl border border-slate-200 flex items-center justify-between group hover:border-blue-600 hover:bg-blue-50 transition-all cursor-pointer">
                            <span className="text-xs font-black text-slate-700">{p}</span>
                            <div className="w-5 h-5 border-2 border-slate-300 rounded-md group-hover:border-blue-600 group-hover:bg-blue-600 flex items-center justify-center transition-all">
                              <CheckCircle2 className="w-3 h-3 text-white" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  </div>
                )}

                {activeStep === 4 && (
                  <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <section className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-8">
                          <h5 className="font-black text-slate-800 uppercase text-xs tracking-widest border-b pb-4">Background Verification (BGV)</h5>
                          <div className="space-y-4">
                             {[
                               { label: 'Criminal Check', status: 'In-Progress' },
                               { label: 'CIBIL Entity Pull', status: 'Ready' },
                               { label: 'Director KYC Match', status: 'Success' },
                               { label: 'Address Physical FI', status: 'Pending' }
                             ].map((b, i) => (
                                <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                   <span className="text-xs font-black text-slate-600">{b.label}</span>
                                   <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                                      b.status === 'Success' ? 'bg-green-100 text-green-700' : 
                                      b.status === 'Ready' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
                                   }`}>{b.status}</span>
                                </div>
                             ))}
                          </div>
                          <button className="w-full py-4 bg-slate-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl hover:bg-slate-800 transition-all">Initiate Full Cloud BGV Scan</button>
                       </section>

                       <section className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-8">
                          <h5 className="font-black text-slate-800 uppercase text-xs tracking-widest border-b pb-4">Agreement & Legal eSign</h5>
                          <div className="p-8 bg-indigo-50 border-2 border-dashed border-indigo-200 rounded-[32px] flex flex-col items-center justify-center text-center">
                             <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-md mb-4">
                                <FileText className="w-8 h-8 text-indigo-600" />
                             </div>
                             <p className="text-xs font-black text-indigo-900 uppercase tracking-widest">Master Service Agreement (MSA)</p>
                             <p className="text-[10px] text-indigo-600 mt-1 font-bold">Standard Distribution Contract v4.2</p>
                             <button className="mt-6 px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all">Generate & Send Link</button>
                          </div>
                          <div className="space-y-3">
                             <div className="flex gap-3">
                                <input type="checkbox" className="mt-1" defaultChecked />
                                <p className="text-[10px] font-bold text-slate-500 leading-relaxed uppercase">I confirm adherence to the RBI Fair Practices Code for distribution partners and verify that this entity is not blacklisted by any FIU.</p>
                             </div>
                          </div>
                       </section>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="p-8 border-t border-slate-100 flex justify-between items-center bg-white rounded-b-[48px]">
              <div className="flex items-center gap-3">
                <Info className="w-5 h-5 text-blue-600" />
                <p className="text-xs font-bold text-slate-500 uppercase tracking-tight">System State: Auto-saved</p>
              </div>
              <div className="flex gap-4">
                <button 
                  disabled={activeStep === 1}
                  onClick={() => setActiveStep(prev => prev - 1)}
                  className="px-8 py-3.5 border border-slate-200 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all disabled:opacity-30"
                >
                  Previous
                </button>
                <button 
                  onClick={() => activeStep < 4 ? setActiveStep(prev => prev + 1) : setIsAddOpen(false)}
                  className="px-12 py-3.5 bg-blue-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-2xl shadow-blue-100 hover:bg-blue-700 transition-all flex items-center gap-2"
                >
                  {activeStep === 4 ? 'Confirm & Finalize' : 'Continue Journey'}
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PartnerMaster;
