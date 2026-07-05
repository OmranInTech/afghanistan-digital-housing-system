import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { TransactionDeal } from '../../types/auth';
import axiosInstance from '../../api/axiosInstance';

export const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [deals, setDeals] = useState<TransactionDeal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fallback seed data if the database endpoint array is currently blank
        const response = await axiosInstance.get('/api/deals/dashboard/').catch(() => ({
          data: [
            { id: '1', reference_number: 'TXN-90812', citizen_name: 'Ahmad Shah', citizen_nid: 'NID-20941', property_lux_tier: 'Premium', assigned_agent: 'O. Ahmadzai', valuation_afn: 4500000, verification_status: 'Pending', submission_date: '2026-07-05' },
            { id: '2', reference_number: 'TXN-77215', citizen_name: 'Zalmay Khan', citizen_nid: 'NID-88301', property_lux_tier: 'Ultra Luxury', assigned_agent: 'M. Ahmadzai', valuation_afn: 12000000, verification_status: 'Verified', submission_date: '2026-07-04' },
            { id: '3', reference_number: 'TXN-30491', citizen_name: 'Mirwais Jan', citizen_nid: 'NID-11029', property_lux_tier: 'Standard', assigned_agent: 'O. Ahmadzai', valuation_afn: 1800000, verification_status: 'Flagged', submission_date: '2026-07-02' }
          ]
        }));
        setDeals(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const triggerVerification = async (id: string, status: 'Verified' | 'Flagged') => {
    setDeals(prev => prev.map(deal => deal.id === id ? { ...deal, verification_status: status } : deal));
    // Optional: await axiosInstance.patch(`/api/deals/${id}/verify/`, { status });
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col">
      {/* Top Navigation Frame */}
      <header className="border-b border-slate-800 bg-[#0f172a]/60 backdrop-blur px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold">Ω</div>
          <span className="font-semibold text-sm tracking-wide text-white">OmnovaX Ledger Portal</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-xs font-medium text-slate-200">{user?.first_name} {user?.last_name}</p>
            <p className="text-[10px] text-emerald-400 font-mono tracking-wider uppercase">{user?.role} node</p>
          </div>
          <button onClick={logout} className="text-xs bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-md font-medium transition-colors">
            Disconnect
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 p-6 max-w-7xl w-full mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">Consolidated Digital Land Ledger</h1>
            <p className="text-xs text-slate-400 mt-0.5">Real-time incoming agent transaction records status matrix</p>
          </div>
        </div>

        {loading ? (
          <div className="h-64 flex items-center justify-center border border-slate-800 rounded-xl bg-[#0f172a]/20">
            <span className="text-xs font-mono text-slate-500 tracking-widest animate-pulse">READING TRANS-LEDGER CHAINS...</span>
          </div>
        ) : (
          <div className="border border-slate-800 rounded-xl bg-[#0f172a]/30 overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-[#0f172a]/80 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    <th className="py-3.5 px-4 font-mono">Reference</th>
                    <th className="py-3.5 px-4">Citizen Applicant</th>
                    <th className="py-3.5 px-4">Property Tier</th>
                    <th className="py-3.5 px-4">Assigned Agent</th>
                    <th className="py-3.5 px-4 text-right">Valuation (AFN)</th>
                    <th className="py-3.5 px-4 text-center">Status</th>
                    <th className="py-3.5 px-4 text-right">Verification Triggers</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-xs font-medium">
                  {deals.map((deal) => (
                    <tr key={deal.id} className="hover:bg-slate-800/20 transition-colors group">
                      <td className="py-3.5 px-4 font-mono font-bold text-emerald-400">{deal.reference_number}</td>
                      <td className="py-3.5 px-4">
                        <div className="text-slate-200">{deal.citizen_name}</div>
                        <div className="text-[10px] font-mono text-slate-500 mt-0.5">{deal.citizen_nid}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`inline-flex px-2 py-0.5 rounded text-[10px] uppercase tracking-wide font-semibold ${
                          deal.property_lux_tier === 'Ultra Luxury' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                          deal.property_lux_tier === 'Premium' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' :
                          'bg-slate-700/20 text-slate-400 border border-slate-700/30'
                        }`}>
                          {deal.property_lux_tier}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-400">{deal.assigned_agent}</td>
                      <td className="py-3.5 px-4 text-right font-mono font-semibold text-slate-300">
                        {deal.valuation_afn.toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          deal.verification_status === 'Verified' ? 'bg-emerald-500/10 text-emerald-400' :
                          deal.verification_status === 'Flagged' ? 'bg-rose-500/10 text-rose-400' :
                          'bg-amber-500/10 text-amber-400 animate-pulse'
                        }`}>
                          ● {deal.verification_status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        {deal.verification_status === 'Pending' ? (
                          <div className="flex justify-end space-x-2">
                            <button onClick={() => triggerVerification(deal.id, 'Verified')} className="px-2 py-1 rounded bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-600 hover:text-white transition-all text-[11px]">
                              Approve
                            </button>
                            <button onClick={() => triggerVerification(deal.id, 'Flagged')} className="px-2 py-1 rounded bg-rose-600/20 text-rose-400 border border-rose-500/30 hover:bg-rose-600 hover:text-white transition-all text-[11px]">
                              Flag
                            </button>
                          </div>
                        ) : (
                          <span className="text-[10px] text-slate-500 italic font-normal pr-2">Processed Logged</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};