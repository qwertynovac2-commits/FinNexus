
import React, { useState } from 'react';
import { Search, Plus, Filter, MoreVertical, Edit2, Lock, Key, Copy, UserPlus, Shield, Eye, Mail, Phone, ChevronRight, Check, ShieldClose } from 'lucide-react';

const UserMaster: React.FC = () => {
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  
  const mockUsers = [
    { id: 'USR-1001', name: 'Arjun Mehra', email: 'arjun.m@finnexus.com', role: 'Super Admin', dept: 'IT', status: 'Active', branch: 'Mumbai HO' },
    { id: 'USR-1002', name: 'Sita Ramaswamy', email: 'sita.r@finnexus.com', role: 'Credit Manager', dept: 'Credit', status: 'Active', branch: 'Chennai Regional' },
    { id: 'USR-1003', name: 'Vikram Singh', email: 'vikram.s@finnexus.com', role: 'Underwriter', dept: 'Operations', status: 'Active', branch: 'Delhi Branch' },
    { id: 'USR-1004', name: 'Anjali Sharma', email: 'anjali.s@finnexus.com', role: 'Collection Manager', dept: 'Collections', status: 'Inactive', branch: 'Mumbai HO' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-black text-slate-800 tracking-tight">User Management Master</h3>
          <p className="text-sm text-slate-500 font-medium uppercase tracking-widest text-[10px] mt-1">Configure access, roles & approval limits</p>
        </div>
        <button 
          onClick={() => setIsAddUserOpen(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
        >
          <UserPlus className="w-4 h-4" />
          Onboard New User
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex gap-4 items-center bg-slate-50/30">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by Employee ID, Name, or Email..." 
              className="w-full pl-12 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-4 focus:ring-blue-500/10 transition-all outline-none"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-600 font-bold hover:bg-slate-50">
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>
        
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <tr>
              <th className="px-6 py-4">User Details</th>
              <th className="px-6 py-4">Role / Department</th>
              <th className="px-6 py-4">Branch / Unit</th>
              <th className="px-6 py-4">Access Level</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {mockUsers.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center font-black text-slate-400">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-slate-800">{user.name}</div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase">{user.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="font-bold text-slate-700">{user.role}</div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase">{user.dept}</div>
                </td>
                <td className="px-6 py-4 font-medium text-slate-600">{user.branch}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-lg text-[10px] font-black uppercase">Branch Level</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase ${
                    user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"><Edit2 className="w-4 h-4" /></button>
                    <button className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all"><Lock className="w-4 h-4" /></button>
                    <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all"><MoreVertical className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isAddUserOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[200] flex items-center justify-center p-6">
          <div className="bg-white w-full max-w-4xl h-[85vh] rounded-[40px] shadow-2xl flex flex-col animate-in zoom-in-95 duration-300">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center">
              <div>
                <h4 className="text-xl font-black text-slate-800 tracking-tight">Onboard System User</h4>
                <p className="text-xs text-slate-500 font-medium">RBAC based user configuration for Indian NBFC nodes</p>
              </div>
              <button onClick={() => setIsAddUserOpen(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400">
                <ShieldClose className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-10 space-y-10">
              <section className="space-y-6">
                <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 pb-2">Basic Profile Info</h5>
                <div className="grid grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Employee Code</label>
                    <input type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 transition-colors" placeholder="EMP-4420" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Full Name</label>
                    <input type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 transition-colors" placeholder="e.g. Rahul Verma" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Official Email</label>
                    <input type="email" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 transition-colors" placeholder="rahul.v@finnexus.com" />
                  </div>
                </div>
              </section>

              <section className="space-y-6">
                <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 pb-2">Organizational & Access</h5>
                <div className="grid grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Role Definition</label>
                    <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 appearance-none">
                      <option>Underwriter</option>
                      <option>Credit Manager</option>
                      <option>Branch Manager</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Assigned Unit</label>
                    <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 appearance-none">
                      <option>Mumbai HO</option>
                      <option>Chennai Regional</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Reporting Manager</label>
                    <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 appearance-none">
                      <option>Vinay Sharma (VP)</option>
                      <option>Arjun Mehra (HO)</option>
                    </select>
                  </div>
                </div>
              </section>

              <section className="space-y-6">
                <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 pb-2">Approval Authority Matrix</h5>
                <div className="grid grid-cols-2 gap-6 p-6 bg-slate-50 rounded-[32px] border border-slate-100">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Sanction Limit (Min)</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                      <input type="number" className="w-full pl-8 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm outline-none" defaultValue={0} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Sanction Limit (Max)</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                      <input type="number" className="w-full pl-8 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm outline-none" defaultValue={1000000} />
                    </div>
                  </div>
                </div>
              </section>

              <section className="space-y-6 pb-10">
                <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 pb-2">Granular Module Permissions</h5>
                <div className="border border-slate-100 rounded-2xl overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      <tr>
                        <th className="px-6 py-3">Module</th>
                        <th className="px-6 py-3 text-center">View</th>
                        <th className="px-6 py-3 text-center">Create</th>
                        <th className="px-6 py-3 text-center">Edit</th>
                        <th className="px-6 py-3 text-center">Approve</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {['LOS - Application', 'LOS - Underwriting', 'LMS - Collections', 'Regulatory Reporting'].map(mod => (
                        <tr key={mod} className="text-xs font-bold">
                          <td className="px-6 py-4 text-slate-700">{mod}</td>
                          {[1,2,3,4].map(i => (
                            <td key={i} className="px-6 py-4 text-center">
                              <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" defaultChecked={i===1} />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>

            <div className="p-8 border-t border-slate-100 flex justify-end gap-4 bg-white rounded-b-[40px]">
              <button onClick={() => setIsAddUserOpen(false)} className="px-8 py-3 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">Cancel</button>
              <button className="px-12 py-3 bg-slate-900 text-white rounded-xl text-sm font-bold shadow-xl hover:bg-slate-800 transition-all">Save & Onboard User</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMaster;
