import { useState } from 'react';
import { 
  X, 
  BatteryCharging, 
  Gauge, 
  Zap, 
  Maximize2, 
  ShieldCheck, 
  Calendar, 
  Check, 
  Layers, 
  ArrowRight,
  Info,
  ShieldAlert
} from 'lucide-react';
import { TeslaModel, TeslaVariant, SpecificationDetail, OnRoadPriceEstimate } from '../types/index.ts';
import { MODEL_SPECS, ON_ROAD_PRICES_ESTIMATE, TESLA_VARIANTS } from '../data/teslaDatabase.ts';
import { formatInr, formatNumberInr } from '../utils/formatters.ts';

interface ModelDetailModalProps {
  model: TeslaModel | null;
  onClose: () => void;
  onCompare: (model: TeslaModel) => void;
}

export default function ModelDetailModal({
  model,
  onClose,
  onCompare
}: ModelDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'pricing' | 'variants'>('overview');

  if (!model) return null;

  const specs: SpecificationDetail | undefined = MODEL_SPECS[model.id];
  const priceData: OnRoadPriceEstimate | undefined = ON_ROAD_PRICES_ESTIMATE[model.id];
  const variants: TeslaVariant[] = TESLA_VARIANTS.filter(v => v.modelId === model.id);
  const isReferenceOnly = !model.isOfficiallyAvailable && (model.id === 'model-s' || model.id === 'model-x' || model.id === 'cybertruck' || model.id === 'roadster');

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        id="model-detail-modal"
        className="bg-[#10131b] border border-white/15 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl relative"
      >
        {/* Header Bar */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-[#141823]">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white font-display">
                {model.name}
              </h2>
              <span className="text-xs text-zinc-400">
                {model.category} • {model.bodyType}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onCompare(model)}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5 text-red-400" />
              <span>Compare</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-5 py-2.5 border-b border-white/10 bg-[#0d0f15] overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview & Market Status' },
            { id: 'pricing', label: 'Price & Ownership Breakdown' },
            { id: 'specs', label: 'Technical Specifications' },
            { id: 'variants', label: `Variants (${variants.length})` }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          {/* Reference Banner if not officially on sale */}
          {isReferenceOnly && (
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-2.5 text-xs text-amber-300">
              <ShieldAlert className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
              <div>
                <strong>Reference Notice:</strong> Not officially available in India — information shown for reference. Figures represent global vehicle capabilities and estimated landed import tariffs.
              </div>
            </div>
          )}

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Vehicle Banner */}
              <div className="relative rounded-xl overflow-hidden border border-white/10 h-64 sm:h-80 bg-zinc-950">
                <img
                  src={model.exteriorImage || model.heroImage}
                  alt={model.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[11px] font-bold text-red-400 uppercase tracking-widest bg-black/60 px-2 py-0.5 rounded border border-white/10">
                    Indian Market Evaluation
                  </span>
                  <p className="text-sm sm:text-base text-zinc-200 mt-1 font-medium max-w-2xl">
                    {model.overview}
                  </p>
                </div>
              </div>

              {/* Status & Indian Market Suitability */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                  <div className="text-xs uppercase tracking-wider font-semibold text-zinc-400 flex items-center gap-1.5">
                    <Info className="w-4 h-4 text-blue-400" />
                    <span>Indian Market Outlook</span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {model.indianMarketInfo}
                  </p>
                  <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px]">
                    <span className="text-zinc-400">Launch Feasibility:</span>
                    <span className="font-semibold text-emerald-400">{model.statusLabel}</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                  <div className="text-xs uppercase tracking-wider font-semibold text-zinc-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Road & Infrastructure Compatibility</span>
                  </div>
                  <ul className="text-xs text-zinc-300 space-y-1.5">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span><strong>Ground Clearance:</strong> {specs?.groundClearance || '140-167 mm'}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span><strong>Charging Standard:</strong> CCS2 (Native match with Indian fast DC chargers)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span><strong>Tropical Heat Resistance:</strong> Octovalve active liquid cooling prevents overheating</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PRICING & ON-ROAD BREAKDOWN */}
          {activeTab === 'pricing' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[11px] uppercase font-bold text-red-400 tracking-wider">Estimated Base Model Price</span>
                  <div className="text-2xl sm:text-3xl font-bold text-white font-display mt-0.5">
                    {model.startingPriceDisplay}
                  </div>
                  <span className="text-xs text-zinc-400">Last Estimated: {model.lastUpdated}</span>
                </div>
                <div className="text-xs text-zinc-400 max-w-xs text-right">
                  <span className="text-amber-300 font-semibold">Important Tariff Notice:</span> Price reflects concessional 15% import duty for eligible EV makers under MoHI policy.
                </div>
              </div>

              {/* On-Road Price Breakdown Table */}
              {priceData ? (
                <div className="rounded-xl border border-white/10 overflow-hidden bg-white/5">
                  <div className="p-3.5 bg-white/5 border-b border-white/10 flex items-center justify-between text-xs font-semibold text-white">
                    <span>Itemized On-Road Cost Component (Estimated)</span>
                    <span className="text-zinc-400">Amount (INR)</span>
                  </div>
                  <div className="divide-y divide-white/5 text-xs">
                    <div className="p-3 flex justify-between">
                      <span className="text-zinc-300">Estimated Ex-Showroom Price</span>
                      <span className="font-semibold text-white font-mono">{formatInr(priceData.exShowroomInr)}</span>
                    </div>
                    <div className="p-3 flex justify-between">
                      <div>
                        <span className="text-zinc-300">Registration & Road Tax (RTO)</span>
                        <div className="text-[10px] text-zinc-500">Concessional 0% - 1% road tax for electric cars in Delhi/MH</div>
                      </div>
                      <span className="font-semibold text-white font-mono">{formatInr(priceData.registrationRtoInr)}</span>
                    </div>
                    <div className="p-3 flex justify-between">
                      <div>
                        <span className="text-zinc-300">Comprehensive EV Insurance (3 Years Third-Party + 1 Year Own Damage)</span>
                        <div className="text-[10px] text-zinc-500">Includes battery coverage and zero-depreciation add-on</div>
                      </div>
                      <span className="font-semibold text-white font-mono">{formatInr(priceData.insuranceInr)}</span>
                    </div>
                    <div className="p-3 flex justify-between">
                      <span className="text-zinc-300">Tax Collected at Source (TCS 1%)</span>
                      <span className="font-semibold text-white font-mono">{formatInr(priceData.tcsInr)}</span>
                    </div>
                    <div className="p-3 flex justify-between">
                      <span className="text-zinc-300">FASTag & Processing Charges</span>
                      <span className="font-semibold text-white font-mono">{formatInr(priceData.fastagChargesInr)}</span>
                    </div>
                    <div className="p-3.5 bg-red-600/10 flex justify-between text-sm font-bold text-white border-t border-red-500/30">
                      <span>Estimated Total On-Road Price:</span>
                      <span className="text-red-400 font-mono font-display text-base">{formatInr(priceData.estimatedOnRoadInr)}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 text-center text-xs text-zinc-400">
                  Detailed on-road tax model pending official India announcement.
                </div>
              )}
            </div>
          )}

          {/* TAB 3: SPECIFICATIONS */}
          {activeTab === 'specs' && specs && (
            <div className="space-y-4">
              <div className="rounded-xl border border-white/10 overflow-hidden bg-white/5">
                <table className="w-full text-xs text-left">
                  <tbody className="divide-y divide-white/5">
                    <tr className="bg-white/5">
                      <td colSpan={2} className="px-4 py-2 font-bold text-white uppercase text-[11px] tracking-wider text-red-400">
                        Powertrain & Performance
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5 text-zinc-400 w-1/3">Motor Configuration</td>
                      <td className="px-4 py-2.5 text-white font-medium">{specs.motorConfiguration}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5 text-zinc-400">Peak Power</td>
                      <td className="px-4 py-2.5 text-white font-medium">{specs.power}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5 text-zinc-400">Peak Torque</td>
                      <td className="px-4 py-2.5 text-white font-medium">{specs.torque}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5 text-zinc-400">0–100 km/h Acceleration</td>
                      <td className="px-4 py-2.5 text-emerald-400 font-bold">{specs.acceleration0to100}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5 text-zinc-400">Top Speed</td>
                      <td className="px-4 py-2.5 text-white font-medium">{specs.topSpeed}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5 text-zinc-400">Drive Type</td>
                      <td className="px-4 py-2.5 text-white font-medium">{specs.driveType}</td>
                    </tr>

                    <tr className="bg-white/5">
                      <td colSpan={2} className="px-4 py-2 font-bold text-white uppercase text-[11px] tracking-wider text-emerald-400">
                        Battery & Charging
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5 text-zinc-400">Battery Capacity</td>
                      <td className="px-4 py-2.5 text-white font-medium">{specs.batteryCapacity}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5 text-zinc-400">Cell Chemistry</td>
                      <td className="px-4 py-2.5 text-white font-medium">{specs.batteryType}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5 text-zinc-400">Claimed Range (WLTP)</td>
                      <td className="px-4 py-2.5 text-white font-medium">{specs.claimedRange}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5 text-zinc-400">Estimated Real-World Range (India)</td>
                      <td className="px-4 py-2.5 text-amber-300 font-semibold">{specs.realWorldEstRange}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5 text-zinc-400">Charging Connector</td>
                      <td className="px-4 py-2.5 text-white font-medium">{specs.chargingConnector}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5 text-zinc-400">AC Home Charging</td>
                      <td className="px-4 py-2.5 text-white font-medium">{specs.acCharging}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5 text-zinc-400">DC Fast Charging</td>
                      <td className="px-4 py-2.5 text-white font-medium">{specs.dcFastCharging}</td>
                    </tr>

                    <tr className="bg-white/5">
                      <td colSpan={2} className="px-4 py-2 font-bold text-white uppercase text-[11px] tracking-wider text-blue-400">
                        Dimensions & Weight
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5 text-zinc-400">Ground Clearance</td>
                      <td className="px-4 py-2.5 text-white font-semibold">{specs.groundClearance}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5 text-zinc-400">Length x Width x Height</td>
                      <td className="px-4 py-2.5 text-white font-medium">{specs.length} × {specs.width} × {specs.height}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5 text-zinc-400">Wheelbase</td>
                      <td className="px-4 py-2.5 text-white font-medium">{specs.wheelbase}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5 text-zinc-400">Kerb Weight</td>
                      <td className="px-4 py-2.5 text-white font-medium">{specs.kerbWeight}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5 text-zinc-400">Boot & Frunk Capacity</td>
                      <td className="px-4 py-2.5 text-white font-medium">{specs.bootSpace} (Frunk: {specs.frunkSpace})</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5 text-zinc-400">Seating Capacity</td>
                      <td className="px-4 py-2.5 text-white font-medium">{specs.seatingCapacity}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: VARIANTS */}
          {activeTab === 'variants' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {variants.map((variant) => (
                  <div key={variant.id} className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-white text-sm font-display">{variant.name}</h4>
                        <span className="text-[11px] text-zinc-400">{variant.trim}</span>
                      </div>
                      <span className="text-xs font-bold text-red-400 font-mono">{variant.priceDisplay}</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-[11px] pt-2 border-t border-white/5">
                      <div>
                        <span className="text-zinc-500 block">0–100 km/h</span>
                        <span className="font-semibold text-white">{variant.acceleration0to100} s</span>
                      </div>
                      <div>
                        <span className="text-zinc-500 block">WLTP Range</span>
                        <span className="font-semibold text-emerald-400">{variant.rangeWltpKm} km</span>
                      </div>
                      <div>
                        <span className="text-zinc-500 block">Top Speed</span>
                        <span className="font-semibold text-white">{variant.topSpeedKmh} km/h</span>
                      </div>
                    </div>

                    <div className="pt-2 text-[11px] text-zinc-400 italic">
                      {variant.availabilityStatus}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-[#0d0f15] flex items-center justify-between text-xs text-zinc-500">
          <span>Official Specifications subject to Ministry CMVR certification</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white font-medium text-xs transition-colors cursor-pointer"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
}
