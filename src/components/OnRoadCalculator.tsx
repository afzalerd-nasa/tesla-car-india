import { useState, useMemo } from 'react';
import { TeslaModel, TeslaVariant } from '../types/index.ts';
import { 
  Calculator, 
  MapPin, 
  ShieldCheck, 
  Info, 
  Car, 
  Receipt,
  Sparkles
} from 'lucide-react';
import { formatInr, formatNumberInr } from '../utils/formatters.ts';

interface OnRoadCalculatorProps {
  models: TeslaModel[];
}

interface StateTaxRule {
  stateName: string;
  rtoPercent: number; // Percent of ex-showroom
  subsidyInr: number;
  note: string;
}

const INDIAN_STATES: Record<string, StateTaxRule> = {
  'delhi': {
    stateName: 'Delhi NCR',
    rtoPercent: 0, // 100% waiver for EVs in Delhi EV Policy
    subsidyInr: 0,
    note: '100% Road Tax (RTO) and Registration Fee waiver under Delhi EV Policy.'
  },
  'maharashtra': {
    stateName: 'Maharashtra (Mumbai / Pune)',
    rtoPercent: 0, // Zero road tax for EVs
    subsidyInr: 0,
    note: 'Zero RTO registration tax for Electric Vehicles in Maharashtra.'
  },
  'karnataka': {
    stateName: 'Karnataka (Bengaluru)',
    rtoPercent: 4.0, // 4% cess on luxury EVs > ₹25L
    subsidyInr: 0,
    note: 'EV road tax is heavily subsidized at ~4% for high-end luxury imports.'
  },
  'telangana': {
    stateName: 'Telangana (Hyderabad)',
    rtoPercent: 0, // 100% exemption on road tax for pure EVs
    subsidyInr: 0,
    note: '100% Road Tax exemption for first 200,000 electric vehicles.'
  },
  'tamil_nadu': {
    stateName: 'Tamil Nadu (Chennai)',
    rtoPercent: 0, // 100% tax exemption extended
    subsidyInr: 0,
    note: '100% exemption from motor vehicle tax for battery-operated vehicles.'
  },
  'gujarat': {
    stateName: 'Gujarat (Ahmedabad)',
    rtoPercent: 2.0,
    subsidyInr: 0,
    note: '50% road tax rebate for electric passenger vehicles.'
  },
  'up': {
    stateName: 'Uttar Pradesh (Noida / Lucknow)',
    rtoPercent: 0,
    subsidyInr: 0,
    note: '100% exemption on registration fee and road tax for EVs under UP EV Policy.'
  },
  'haryana': {
    stateName: 'Haryana (Gurugram)',
    rtoPercent: 0,
    subsidyInr: 0,
    note: 'Complete road tax waiver on electric vehicles registered in Haryana.'
  }
};

export default function OnRoadCalculator({ models }: OnRoadCalculatorProps) {
  const [selectedModelId, setSelectedModelId] = useState<string>('model-3');
  const [selectedStateKey, setSelectedStateKey] = useState<string>('delhi');
  const [customExShowroom, setCustomExShowroom] = useState<number>(5500000); // 55 Lakh default
  const [includeExtendedWarranty, setIncludeExtendedWarranty] = useState<boolean>(true);
  const [includeAccessories, setIncludeAccessories] = useState<boolean>(true);

  // Sync default price when model changes
  const handleModelChange = (modelId: string) => {
    setSelectedModelId(modelId);
    const m = models.find(mod => mod.id === modelId);
    if (m) {
      setCustomExShowroom(m.startingPriceInrMin);
    }
  };

  const calculation = useMemo(() => {
    const stateRule = INDIAN_STATES[selectedStateKey] || INDIAN_STATES['delhi'];
    const exShowroom = customExShowroom;

    // RTO Tax
    const rtoTax = Math.round((exShowroom * stateRule.rtoPercent) / 100);

    // Comprehensive Insurance (Zero-Depreciation + 3 Yrs TP + 1 Yr OD + Battery Shield ~ 3.2%)
    const insurance = Math.round(exShowroom * 0.032);

    // TCS (1% of ex-showroom above 10 Lakhs)
    const tcs = Math.round(exShowroom * 0.01);

    // FASTag & Automated Registration processing
    const fastagAndCharges = 3500;

    // Optional Tesla Wall Connector / Accessories Package (₹ 65,000)
    const accessories = includeAccessories ? 65000 : 0;

    // Extended Warranty 2 Years (₹ 90,000)
    const extendedWarranty = includeExtendedWarranty ? 90000 : 0;

    // Total on-road
    const totalOnRoad = exShowroom + rtoTax + insurance + tcs + fastagAndCharges + accessories + extendedWarranty - stateRule.subsidyInr;

    return {
      stateRule,
      exShowroom,
      rtoTax,
      insurance,
      tcs,
      fastagAndCharges,
      accessories,
      extendedWarranty,
      totalOnRoad
    };
  }, [customExShowroom, selectedStateKey, includeExtendedWarranty, includeAccessories]);

  return (
    <section id="on-road-calculator" className="py-20 bg-[#090b10] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-xs font-semibold text-red-400 mb-3">
            <Receipt className="w-3.5 h-3.5" />
            <span>State-Wise Pricing Estimator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
            Tesla On-Road Price Calculator (India)
          </h2>
          <p className="text-zinc-400 text-sm mt-2">
            Calculate the exact estimated on-road price across Indian states factoring in concessional RTO policies, 5% EV GST, comprehensive zero-dep insurance, and TCS.
          </p>
        </div>

        {/* Calculator Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls (6 Cols) */}
          <div className="lg:col-span-6 bg-[#121520] border border-white/10 rounded-2xl p-6 space-y-5 shadow-xl">
            <h3 className="text-base font-bold text-white flex items-center gap-2 font-display border-b border-white/10 pb-3">
              <Car className="w-4 h-4 text-red-500" />
              <span>Configure Vehicle & Location</span>
            </h3>

            {/* Model Select */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-300">Tesla Model:</label>
              <select
                value={selectedModelId}
                onChange={(e) => handleModelChange(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-red-500"
              >
                {models.map((m) => (
                  <option key={m.id} value={m.id} className="bg-zinc-900 text-white">
                    {m.name} ({m.startingPriceDisplay})
                  </option>
                ))}
              </select>
            </div>

            {/* State Select */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-red-400" />
                <span>Registration State / City:</span>
              </label>
              <select
                value={selectedStateKey}
                onChange={(e) => setSelectedStateKey(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-red-500"
              >
                {Object.entries(INDIAN_STATES).map(([key, s]) => (
                  <option key={key} value={key} className="bg-zinc-900 text-white">
                    {s.stateName} {s.rtoPercent === 0 ? '(0% RTO Waiver)' : `(${s.rtoPercent}% RTO)`}
                  </option>
                ))}
              </select>
              <div className="text-[11px] text-emerald-400 pt-0.5 flex items-start gap-1">
                <ShieldCheck className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span>{calculation.stateRule.note}</span>
              </div>
            </div>

            {/* Editable Ex-Showroom Price */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-zinc-300">Estimated Ex-Showroom (INR):</span>
                <span className="text-white font-mono font-bold">{formatInr(customExShowroom)}</span>
              </div>
              <input
                type="number"
                value={customExShowroom}
                onChange={(e) => setCustomExShowroom(Math.max(1000000, Number(e.target.value)))}
                className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white font-mono focus:outline-none focus:border-red-500"
              />
            </div>

            {/* Optional Addons */}
            <div className="space-y-2 pt-2 border-t border-white/5">
              <span className="text-xs font-semibold text-zinc-300 block">Optional Addons:</span>
              
              <label className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 text-xs text-zinc-300 cursor-pointer hover:bg-white/10">
                <span>Tesla Wall Connector (Home 11 kW Charger + Installation)</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-zinc-400">₹ 65,000</span>
                  <input
                    type="checkbox"
                    checked={includeAccessories}
                    onChange={(e) => setIncludeAccessories(e.target.checked)}
                    className="accent-red-600 w-4 h-4 cursor-pointer"
                  />
                </div>
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 text-xs text-zinc-300 cursor-pointer hover:bg-white/10">
                <span>Extended Warranty (+2 Years / 40,000 km)</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-zinc-400">₹ 90,000</span>
                  <input
                    type="checkbox"
                    checked={includeExtendedWarranty}
                    onChange={(e) => setIncludeExtendedWarranty(e.target.checked)}
                    className="accent-red-600 w-4 h-4 cursor-pointer"
                  />
                </div>
              </label>
            </div>
          </div>

          {/* Itemized Price Receipt Card (6 Cols) */}
          <div className="lg:col-span-6 bg-gradient-to-br from-[#141926] to-[#0c0e14] border border-white/15 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[11px] font-bold text-red-400 uppercase tracking-wider">
                  Total Estimated On-Road Price
                </span>
                <h4 className="text-2xl sm:text-3xl font-extrabold text-white font-display mt-0.5">
                  {formatInr(calculation.totalOnRoad)}
                </h4>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-zinc-400 block">Registration City:</span>
                <span className="text-xs font-semibold text-zinc-200">{calculation.stateRule.stateName}</span>
              </div>
            </div>

            {/* Line Item Table */}
            <div className="space-y-2 text-xs divide-y divide-white/5">
              <div className="flex justify-between pt-2 text-zinc-300">
                <span className="text-zinc-400">Ex-Showroom Price</span>
                <span className="font-mono font-medium text-white">{formatInr(calculation.exShowroom)}</span>
              </div>

              <div className="flex justify-between pt-2 text-zinc-300">
                <div>
                  <span className="text-zinc-400">Road Tax (RTO)</span>
                  <span className="text-[10px] text-emerald-400 block font-sans">{calculation.stateRule.rtoPercent}% State EV Slab</span>
                </div>
                <span className="font-mono font-medium text-white">
                  {calculation.rtoTax === 0 ? '₹ 0 (100% Waived)' : formatInr(calculation.rtoTax)}
                </span>
              </div>

              <div className="flex justify-between pt-2 text-zinc-300">
                <div>
                  <span className="text-zinc-400">Comprehensive EV Insurance</span>
                  <span className="text-[10px] text-zinc-500 block">1 Yr OD + 3 Yrs TP + Battery Shield</span>
                </div>
                <span className="font-mono font-medium text-white">{formatInr(calculation.insurance)}</span>
              </div>

              <div className="flex justify-between pt-2 text-zinc-300">
                <span className="text-zinc-400">TCS (Tax Collected at Source - 1%)</span>
                <span className="font-mono font-medium text-white">{formatInr(calculation.tcs)}</span>
              </div>

              <div className="flex justify-between pt-2 text-zinc-300">
                <span className="text-zinc-400">FASTag & Registration Documentation</span>
                <span className="font-mono font-medium text-white">₹ {formatNumberInr(calculation.fastagAndCharges)}</span>
              </div>

              {includeAccessories && (
                <div className="flex justify-between pt-2 text-zinc-300">
                  <span className="text-zinc-400">Tesla 11 kW Wall Connector</span>
                  <span className="font-mono font-medium text-white">{formatInr(calculation.accessories)}</span>
                </div>
              )}

              {includeExtendedWarranty && (
                <div className="flex justify-between pt-2 text-zinc-300">
                  <span className="text-zinc-400">Extended Warranty (+2 Yrs)</span>
                  <span className="font-mono font-medium text-white">{formatInr(calculation.extendedWarranty)}</span>
                </div>
              )}
            </div>

            {/* Total Highlight */}
            <div className="p-4 rounded-xl bg-red-950/30 border border-red-500/30 flex items-center justify-between text-white font-bold">
              <span className="text-sm">Estimated Total Amount:</span>
              <span className="text-xl font-mono text-red-400 font-display">{formatInr(calculation.totalOnRoad)}</span>
            </div>

            <p className="text-[10px] text-zinc-500 italic text-center">
              *Estimated calculations based on announced 15% EV policy scheme and current state road transport regulations. Final pricing will be determined upon official delivery billing.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
