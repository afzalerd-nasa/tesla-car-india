import { useState } from 'react';
import { TeslaModel } from '../types/index.ts';
import { Check, Info, ShieldAlert, Sparkles, HelpCircle, ArrowUpRight } from 'lucide-react';

interface PriceSectionProps {
  models: TeslaModel[];
  onSelectModel: (model: TeslaModel) => void;
  onOpenCalculator: () => void;
}

export default function PriceSection({
  models,
  onSelectModel,
  onOpenCalculator
}: PriceSectionProps) {
  const [filterType, setFilterType] = useState<'All' | 'Sedan' | 'SUV' | 'Specialty'>('All');

  const filteredModels = models.filter((m) => {
    if (filterType === 'All') return true;
    if (filterType === 'Specialty') return m.category === 'Pickup' || m.category === 'Supercar';
    return m.category === filterType;
  });

  return (
    <section id="prices" className="py-20 bg-[#090b10] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-red-400 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Price Guide & Taxation Structure</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
            Tesla Car Price in India
          </h2>
          <p className="text-zinc-400 text-sm mt-2">
            Comparison of estimated ex-showroom pricing, body types, range benchmarks, and Indian availability status formatted in Lakhs and Crores.
          </p>
        </div>

        {/* Pricing Comparison Table Card */}
        <div className="rounded-2xl border border-white/15 bg-[#12151e] overflow-hidden shadow-2xl">
          {/* Table Header Controls */}
          <div className="p-4 sm:p-5 border-b border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#141823]">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider">Filter By Type:</span>
              <div className="flex items-center gap-1 bg-black/40 p-1 rounded-lg border border-white/10">
                {(['All', 'Sedan', 'SUV', 'Specialty'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setFilterType(type)}
                    className={`px-3 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                      filterType === type
                        ? 'bg-red-600 text-white shadow-sm'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={onOpenCalculator}
              className="text-xs text-red-400 hover:text-red-300 font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Calculate On-Road Price for Your State</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-white/5 border-b border-white/10 text-[11px] uppercase tracking-wider text-zinc-400 font-semibold">
                <tr>
                  <th className="py-3.5 px-4 sm:px-6">Model</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Estimated Price in India</th>
                  <th className="py-3.5 px-4 sm:px-6 text-center">Range (WLTP)</th>
                  <th className="py-3.5 px-4 sm:px-6">Body Type</th>
                  <th className="py-3.5 px-4 sm:px-6">Availability Status</th>
                  <th className="py-3.5 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-zinc-300">
                {filteredModels.map((model) => {
                  const isEstimated = model.dataStatus === 'Estimated';
                  return (
                    <tr 
                      key={model.id}
                      className="hover:bg-white/5 transition-colors group cursor-pointer"
                      onClick={() => onSelectModel(model)}
                    >
                      <td className="py-4 px-4 sm:px-6">
                        <div className="flex items-center gap-3">
                          <img
                            src={model.heroImage}
                            alt={model.name}
                            className="w-12 h-8 object-cover rounded-md border border-white/10"
                          />
                          <div>
                            <div className="font-bold text-white group-hover:text-red-400 transition-colors font-display">
                              {model.name}
                            </div>
                            <div className="text-[11px] text-zinc-400 font-sans">
                              0–100 km/h in {model.acceleration0to100}s
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-4 sm:px-6 text-right">
                        <div className="font-bold text-white font-mono text-sm sm:text-base">
                          {model.startingPriceDisplay}
                        </div>
                        <div className="text-[10px] text-zinc-400">
                          {isEstimated ? 'Estimated (15% EV Tariff)' : 'Global Reference (CBU)'}
                        </div>
                      </td>

                      <td className="py-4 px-4 sm:px-6 text-center">
                        <span className="inline-flex items-center gap-1 font-semibold text-emerald-400">
                          {model.wltpRangeKm} km
                        </span>
                        <div className="text-[10px] text-zinc-500">Real: ~{model.realWorldRangeKm} km</div>
                      </td>

                      <td className="py-4 px-4 sm:px-6">
                        <span className="px-2.5 py-1 rounded-full text-[11px] bg-white/5 border border-white/10 text-zinc-200">
                          {model.category}
                        </span>
                      </td>

                      <td className="py-4 px-4 sm:px-6">
                        <div className="flex items-center gap-1.5">
                          <span className={`w-2 h-2 rounded-full ${
                            model.id === 'model-3' || model.id === 'model-y'
                              ? 'bg-blue-400 animate-pulse'
                              : 'bg-zinc-500'
                          }`} />
                          <span className="text-xs font-medium text-zinc-300">
                            {model.statusLabel}
                          </span>
                        </div>
                      </td>

                      <td className="py-4 px-4 text-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectModel(model);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors"
                        >
                          Specs
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Indian Taxation & Duty Context Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5 text-xs">
            <div className="font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Concessional 15% Import Duty</span>
            </div>
            <p className="text-zinc-400">
              India’s New EV Policy cuts CBU duty from 70-100% to 15% for manufacturers committing ₹4,150 Cr ($500M) in domestic facilities, allowing Model 3 & Y to start around ₹55–65 Lakh.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5 text-xs">
            <div className="font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              <span>Concessional 5% GST on Electric Cars</span>
            </div>
            <p className="text-zinc-400">
              Unlike petrol luxury cars taxed at 28% GST + up to 22% compensation cess (total ~50%), all pure electric cars in India enjoy a flat, single-tier 5% GST rate with zero compensation cess.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5 text-xs">
            <div className="font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>State RTO Waivers</span>
            </div>
            <p className="text-zinc-400">
              States including Delhi, Maharashtra, Uttar Pradesh, and Haryana provide 100% exemption or substantial waivers on Road Tax (RTO) for pure battery electric vehicles.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
