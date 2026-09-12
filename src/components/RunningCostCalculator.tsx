import { useState, useMemo } from 'react';
import { 
  Calculator, 
  TrendingDown, 
  Fuel, 
  Zap, 
  CheckCircle2, 
  Calendar,
  Sparkles
} from 'lucide-react';
import { formatInr, formatNumberInr } from '../utils/formatters.ts';

export default function RunningCostCalculator() {
  // Inputs
  const [dailyKm, setDailyKm] = useState<number>(45);
  const [electricityTariff, setElectricityTariff] = useState<number>(8.5); // ₹/kWh
  const [evEfficiencyWhPerKm, setEvEfficiencyWhPerKm] = useState<number>(155); // 155 Wh/km (Tesla Model 3/Y average)
  const [petrolPrice, setPetrolPrice] = useState<number>(102); // ₹/L in Mumbai/Delhi
  const [petrolMileage, setPetrolMileage] = useState<number>(11); // 11 km/L for German luxury sedan

  // Calculations
  const stats = useMemo(() => {
    const monthlyKm = dailyKm * 30;
    const annualKm = dailyKm * 365;

    // Tesla Electricity consumption
    const dailyKwh = (dailyKm * evEfficiencyWhPerKm) / 1000;
    const dailyEvCost = dailyKwh * electricityTariff;
    const monthlyEvCost = dailyEvCost * 30;
    const annualEvCost = dailyEvCost * 365;
    const evCostPerKm = dailyKm > 0 ? dailyEvCost / dailyKm : 0;

    // Petrol luxury consumption
    const dailyPetrolLitres = dailyKm / petrolMileage;
    const dailyPetrolCost = dailyPetrolLitres * petrolPrice;
    const monthlyPetrolCost = dailyPetrolCost * 30;
    const annualPetrolCost = dailyPetrolCost * 365;
    const petrolCostPerKm = dailyKm > 0 ? dailyPetrolCost / dailyKm : 0;

    // Savings
    const annualSavings = annualPetrolCost - annualEvCost;
    const fiveYearSavings = annualSavings * 5;

    return {
      monthlyKm,
      annualKm,
      dailyEvCost: Math.round(dailyEvCost),
      monthlyEvCost: Math.round(monthlyEvCost),
      annualEvCost: Math.round(annualEvCost),
      evCostPerKm: evCostPerKm.toFixed(2),
      dailyPetrolCost: Math.round(dailyPetrolCost),
      monthlyPetrolCost: Math.round(monthlyPetrolCost),
      annualPetrolCost: Math.round(annualPetrolCost),
      petrolCostPerKm: petrolCostPerKm.toFixed(2),
      annualSavings: Math.round(annualSavings),
      fiveYearSavings: Math.round(fiveYearSavings)
    };
  }, [dailyKm, electricityTariff, evEfficiencyWhPerKm, petrolPrice, petrolMileage]);

  return (
    <section id="running-cost" className="py-20 bg-[#0d0f16] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400 mb-3">
            <TrendingDown className="w-3.5 h-3.5" />
            <span>Economic Advantage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
            Tesla Running Cost & Savings Calculator
          </h2>
          <p className="text-zinc-400 text-sm mt-2">
            Calculate your operational fuel savings when driving a Tesla in India compared to an equivalent petrol luxury sedan (e.g. BMW 3 Series, Mercedes-Benz C-Class).
          </p>
        </div>

        {/* Calculator Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Controls Column (6 Cols) */}
          <div className="lg:col-span-6 bg-[#121520] border border-white/10 rounded-2xl p-6 space-y-6 shadow-xl flex flex-col justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2 font-display border-b border-white/10 pb-3">
              <Calculator className="w-4 h-4 text-emerald-400" />
              <span>Input Your Driving Habits & Energy Tariffs</span>
            </h3>

            {/* Daily Distance Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-zinc-300">Daily Commute Distance:</span>
                <span className="text-emerald-400 font-bold font-mono text-sm">{dailyKm} km/day (~{stats.monthlyKm} km/month)</span>
              </div>
              <input
                type="range"
                min="10"
                max="250"
                step="5"
                value={dailyKm}
                onChange={(e) => setDailyKm(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-zinc-500">
                <span>15 km (Short)</span>
                <span>45 km (Typical Metro)</span>
                <span>100 km (NCR/MMR Commute)</span>
                <span>250 km (Fleet/High)</span>
              </div>
            </div>

            {/* Electricity Rate Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-zinc-300">Electricity Tariff (Home DISCOM):</span>
                <span className="text-white font-bold font-mono">₹ {electricityTariff} / kWh</span>
              </div>
              <input
                type="range"
                min="4.0"
                max="16.0"
                step="0.5"
                value={electricityTariff}
                onChange={(e) => setElectricityTariff(Number(e.target.value))}
                className="w-full accent-blue-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-zinc-500">
                <span>₹ 5.0 (Subsidized)</span>
                <span>₹ 8.5 (Metro Average)</span>
                <span>₹ 14.0 (Commercial Tier)</span>
              </div>
            </div>

            {/* Petrol Luxury Parameters */}
            <div className="grid grid-cols-2 gap-4 pt-3 border-t border-white/5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300">Petrol Price (₹/Litre):</label>
                <input
                  type="number"
                  value={petrolPrice}
                  onChange={(e) => setPetrolPrice(Number(e.target.value))}
                  className="w-full p-2.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white font-mono focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300">Petrol Car Mileage (km/L):</label>
                <input
                  type="number"
                  value={petrolMileage}
                  onChange={(e) => setPetrolMileage(Number(e.target.value))}
                  className="w-full p-2.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white font-mono focus:outline-none focus:border-red-500"
                />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-[11px] text-zinc-400">
              Assumes Tesla average efficiency of ~155 Wh/km with regenerative braking in standard mixed city-highway Indian traffic.
            </div>
          </div>

          {/* Results Summary Card (6 Cols) */}
          <div className="lg:col-span-6 bg-gradient-to-br from-[#141a29] to-[#0c0e15] border border-white/15 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                  Estimated 5-Year Fuel Savings
                </span>
                <span className="text-xs text-zinc-400">based on {dailyKm} km/day</span>
              </div>

              {/* Big Savings Metric */}
              <div className="mt-3">
                <div className="text-4xl sm:text-5xl font-extrabold text-emerald-400 font-display">
                  {formatInr(stats.fiveYearSavings)}
                </div>
                <p className="text-xs text-zinc-300 mt-1">
                  Saved directly in fuel costs over 5 years ({formatNumberInr(stats.annualKm * 5)} km)
                </p>
              </div>

              {/* Per Kilometer Direct Comparison */}
              <div className="grid grid-cols-2 gap-3 mt-6">
                <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
                    <Zap className="w-3.5 h-3.5" />
                    <span>Tesla EV Cost</span>
                  </div>
                  <div className="text-2xl font-bold text-white font-mono">
                    ₹ {stats.evCostPerKm} <span className="text-xs font-normal text-zinc-400">/ km</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-red-950/30 border border-red-500/30 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-red-400 font-semibold">
                    <Fuel className="w-3.5 h-3.5" />
                    <span>Petrol Luxury Cost</span>
                  </div>
                  <div className="text-2xl font-bold text-white font-mono">
                    ₹ {stats.petrolCostPerKm} <span className="text-xs font-normal text-zinc-400">/ km</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Time Breakdown Table */}
            <div className="rounded-xl border border-white/10 bg-black/40 overflow-hidden text-xs">
              <div className="grid grid-cols-3 p-2.5 bg-white/5 font-semibold text-zinc-400 text-[11px] uppercase">
                <span>Period</span>
                <span className="text-right text-emerald-400">Tesla Electric</span>
                <span className="text-right text-red-400">Petrol Car</span>
              </div>
              <div className="divide-y divide-white/5">
                <div className="grid grid-cols-3 p-2.5 text-zinc-300">
                  <span>Daily ({dailyKm} km)</span>
                  <span className="text-right font-mono font-medium text-white">₹ {formatNumberInr(stats.dailyEvCost)}</span>
                  <span className="text-right font-mono font-medium text-zinc-400">₹ {formatNumberInr(stats.dailyPetrolCost)}</span>
                </div>
                <div className="grid grid-cols-3 p-2.5 text-zinc-300">
                  <span>Monthly ({stats.monthlyKm} km)</span>
                  <span className="text-right font-mono font-medium text-white">₹ {formatNumberInr(stats.monthlyEvCost)}</span>
                  <span className="text-right font-mono font-medium text-zinc-400">₹ {formatNumberInr(stats.monthlyPetrolCost)}</span>
                </div>
                <div className="grid grid-cols-3 p-2.5 text-zinc-300 bg-white/5 font-bold">
                  <span className="text-white">Annual ({stats.annualKm} km)</span>
                  <span className="text-right font-mono text-emerald-400">₹ {formatNumberInr(stats.annualEvCost)}</span>
                  <span className="text-right font-mono text-red-400">₹ {formatNumberInr(stats.annualPetrolCost)}</span>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-zinc-300 flex items-center justify-between">
              <span className="font-semibold text-white">Annual Net Bank Balance Savings:</span>
              <span className="text-sm font-bold text-emerald-400 font-mono">₹ {formatNumberInr(stats.annualSavings)} / year</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
