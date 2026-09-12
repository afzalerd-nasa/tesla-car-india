import { useState, useMemo } from 'react';
import { 
  Zap, 
  Home, 
  BatteryCharging, 
  Clock, 
  Info, 
  ArrowRight, 
  Calculator, 
  CheckCircle2,
  PlugZap,
  DollarSign
} from 'lucide-react';
import { TeslaModel } from '../types/index.ts';
import { formatNumberInr } from '../utils/formatters.ts';

interface ChargingSectionProps {
  models: TeslaModel[];
}

export default function ChargingSection({ models }: ChargingSectionProps) {
  // Calculator States
  const [selectedBatterySize, setSelectedBatterySize] = useState<number>(75); // 75 kWh (Model Y Long Range)
  const [tariffRate, setTariffRate] = useState<number>(8.5); // ₹ 8.5 / unit average domestic tier
  const [startSoc, setStartSoc] = useState<number>(20); // 20%
  const [targetSoc, setTargetSoc] = useState<number>(80); // 80% (recommended daily)
  const [chargerSpeedKw, setChargerSpeedKw] = useState<number>(11); // 11 kW AC

  // Calculations
  const calculations = useMemo(() => {
    const deltaPercent = Math.max(0, targetSoc - startSoc);
    const nominalKwh = (selectedBatterySize * deltaPercent) / 100;
    // 10% charging loss (AC to DC conversion and thermal management)
    const totalKwhConsumed = nominalKwh * 1.10;
    const totalCostInr = Math.round(totalKwhConsumed * tariffRate);
    
    // Time estimates
    const hoursAc16A = (totalKwhConsumed / 3.3).toFixed(1); // 16A 230V = ~3.3 kW
    const hoursAcWallbox = (totalKwhConsumed / 11).toFixed(1); // 11 kW 3-phase
    const minDcFast150 = Math.round((totalKwhConsumed / 120) * 60); // DC taper average ~120kW
    
    // Cost per km calculation (assuming 150 Wh/km or 6.6 km per kWh)
    const kmAdded = Math.round((nominalKwh / selectedBatterySize) * (selectedBatterySize * 6.5));
    const costPerKm = kmAdded > 0 ? (totalCostInr / kmAdded).toFixed(2) : '0.00';

    return {
      nominalKwh: nominalKwh.toFixed(1),
      totalKwhConsumed: totalKwhConsumed.toFixed(1),
      totalCostInr,
      hoursAc16A,
      hoursAcWallbox,
      minDcFast150,
      kmAdded,
      costPerKm
    };
  }, [selectedBatterySize, tariffRate, startSoc, targetSoc]);

  return (
    <section id="charging" className="py-20 bg-[#0b0d13] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400 mb-3">
            <Zap className="w-3.5 h-3.5" />
            <span>Infrastructure & Energy Economics</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
            Tesla Charging Guide & Cost in India
          </h2>
          <p className="text-zinc-400 text-sm mt-2">
            Everything you need to know about charging a Tesla in India: home electrical connections, public CCS2 fast charging compatibility, Superchargers, and exact per-kilometer electricity costs.
          </p>
        </div>

        {/* 4 Core Charging Methods in India */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {/* Method 1 */}
          <div className="p-5 rounded-2xl bg-[#12151f] border border-white/10 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                <Home className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base font-display">1. Standard 16A Home Socket</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Plug into any standard 3-pin 16 Amp Indian power outlet using the Tesla Mobile Connector with an approved earthing circuit.
              </p>
            </div>
            <div className="pt-3 border-t border-white/5 space-y-1 text-xs">
              <div className="flex justify-between text-zinc-300">
                <span className="text-zinc-500">Speed:</span>
                <span className="font-semibold">3.3 kW (15–20 km/hr)</span>
              </div>
              <div className="flex justify-between text-zinc-300">
                <span className="text-zinc-500">Full Charge:</span>
                <span className="font-semibold text-amber-300">20–24 Hours</span>
              </div>
              <div className="flex justify-between text-zinc-300">
                <span className="text-zinc-500">Best For:</span>
                <span className="font-semibold">Emergency / Overnight Top-up</span>
              </div>
            </div>
          </div>

          {/* Method 2 */}
          <div className="p-5 rounded-2xl bg-[#12151f] border border-white/10 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <PlugZap className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base font-display">2. Tesla Wall Connector (AC)</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Dedicated home or office charger installed on a 32A single-phase or 3-phase Indian power line. Wi-Fi connected with auto-scheduling.
              </p>
            </div>
            <div className="pt-3 border-t border-white/5 space-y-1 text-xs">
              <div className="flex justify-between text-zinc-300">
                <span className="text-zinc-500">Speed:</span>
                <span className="font-semibold">7.4 kW to 11 kW (65 km/hr)</span>
              </div>
              <div className="flex justify-between text-zinc-300">
                <span className="text-zinc-500">Full Charge:</span>
                <span className="font-semibold text-emerald-400">6–7 Hours (Overnight)</span>
              </div>
              <div className="flex justify-between text-zinc-300">
                <span className="text-zinc-500">Best For:</span>
                <span className="font-semibold">Primary Daily Home Charging</span>
              </div>
            </div>
          </div>

          {/* Method 3 */}
          <div className="p-5 rounded-2xl bg-[#12151f] border border-white/10 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <BatteryCharging className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base font-display">3. Public CCS2 DC Fast Chargers</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Tesla vehicles in India utilize the standard CCS Type 2 port, giving native plug-and-play access to 10,000+ Indian fast public chargers.
              </p>
            </div>
            <div className="pt-3 border-t border-white/5 space-y-1 text-xs">
              <div className="flex justify-between text-zinc-300">
                <span className="text-zinc-500">Speed:</span>
                <span className="font-semibold">50 kW – 120 kW</span>
              </div>
              <div className="flex justify-between text-zinc-300">
                <span className="text-zinc-500">10% to 80%:</span>
                <span className="font-semibold text-emerald-400">35–50 Minutes</span>
              </div>
              <div className="flex justify-between text-zinc-300">
                <span className="text-zinc-500">Providers:</span>
                <span className="font-semibold">Tata Power, Jio-bp, Statiq</span>
              </div>
            </div>
          </div>

          {/* Method 4 */}
          <div className="p-5 rounded-2xl bg-[#12151f] border border-red-500/30 space-y-3 flex flex-col justify-between bg-gradient-to-b from-red-950/20 to-transparent">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base font-display">4. Tesla Superchargers</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Tesla's proprietary high-power fast charging network (V3 & V4 architecture). Automatically bills your Tesla account without RFID tags.
              </p>
            </div>
            <div className="pt-3 border-t border-white/5 space-y-1 text-xs">
              <div className="flex justify-between text-zinc-300">
                <span className="text-zinc-500">Speed:</span>
                <span className="font-semibold text-red-400">Up to 250 kW Peak</span>
              </div>
              <div className="flex justify-between text-zinc-300">
                <span className="text-zinc-500">10% to 80%:</span>
                <span className="font-semibold text-white">15–20 Minutes</span>
              </div>
              <div className="flex justify-between text-zinc-300">
                <span className="text-zinc-500">Status in India:</span>
                <span className="font-semibold text-amber-300">Planned for Key Expressways</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Charging Cost Calculator */}
        <div className="rounded-2xl border border-white/15 bg-gradient-to-br from-[#121520] to-[#0d0f15] p-6 sm:p-8 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 border-b border-white/10 pb-4">
            <div>
              <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <Calculator className="w-3.5 h-3.5" />
                <span>Interactive Tool</span>
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white font-display mt-0.5">
                Tesla Charging Cost Calculator (India)
              </h3>
            </div>
            <span className="text-xs text-zinc-400">
              Calculate electricity cost based on your state electricity board (DISCOM) rates
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Input Sliders (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Battery Size Selection */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-zinc-300">Battery Pack Size:</span>
                  <span className="text-white font-bold font-mono">{selectedBatterySize} kWh</span>
                </div>
                <div className="flex gap-2">
                  {[
                    { label: 'Model 3 (60 kWh)', size: 60 },
                    { label: 'Model Y LR (75 kWh)', size: 75 },
                    { label: 'Model S / X (100 kWh)', size: 100 }
                  ].map((preset) => (
                    <button
                      key={preset.size}
                      onClick={() => setSelectedBatterySize(preset.size)}
                      className={`flex-1 py-2 px-2.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                        selectedBatterySize === preset.size
                          ? 'bg-red-600 border-red-500 text-white'
                          : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* State Electricity Tariff (₹ / kWh) */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-zinc-300">Electricity Tariff Rate (DISCOM / Charging Station):</span>
                  <span className="text-emerald-400 font-bold font-mono text-sm">₹ {tariffRate} / unit (kWh)</span>
                </div>
                <input
                  type="range"
                  min="4.0"
                  max="24.0"
                  step="0.5"
                  value={tariffRate}
                  onChange={(e) => setTariffRate(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-zinc-500">
                  <span>₹ 5.5 (Domestic Base)</span>
                  <span>₹ 8.5 (Avg Domestic Tier)</span>
                  <span>₹ 15.0 (Commercial EV Meter)</span>
                  <span>₹ 22.0 (High-Speed DC Public)</span>
                </div>
              </div>

              {/* Charge SOC Range (e.g. 20% to 80%) */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300">Starting Battery: {startSoc}%</label>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    step="5"
                    value={startSoc}
                    onChange={(e) => setStartSoc(Number(e.target.value))}
                    className="w-full accent-blue-500 cursor-pointer"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300">Target Battery: {targetSoc}%</label>
                  <input
                    type="range"
                    min="60"
                    max="100"
                    step="5"
                    value={targetSoc}
                    onChange={(e) => setTargetSoc(Number(e.target.value))}
                    className="w-full accent-red-500 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Output Calculation Card (5 Cols) */}
            <div className="lg:col-span-5 bg-black/60 border border-white/15 rounded-2xl p-6 space-y-5 text-center shadow-inner">
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                Charging Session Estimation
              </span>

              {/* Cost Highlight */}
              <div>
                <div className="text-4xl sm:text-5xl font-extrabold text-emerald-400 font-display">
                  ₹ {formatNumberInr(calculations.totalCostInr)}
                </div>
                <div className="text-xs text-zinc-400 mt-1">
                  for adding {calculations.nominalKwh} kWh (~{calculations.kmAdded} km range)
                </div>
              </div>

              {/* Cost Per Km Metric Pill */}
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-around">
                <div>
                  <span className="text-[10px] text-zinc-400 uppercase block">Running Cost</span>
                  <span className="text-base font-bold text-white font-mono">₹ {calculations.costPerKm} / km</span>
                </div>
                <div className="h-7 w-px bg-white/10" />
                <div>
                  <span className="text-[10px] text-zinc-400 uppercase block">Petrol Luxury Car</span>
                  <span className="text-base font-bold text-red-400 font-mono">₹ 11.50 / km</span>
                </div>
              </div>

              {/* Charging Times */}
              <div className="space-y-2 text-left text-xs pt-2 border-t border-white/10">
                <div className="flex justify-between text-zinc-300">
                  <span className="text-zinc-400">Home 11 kW AC Wallbox:</span>
                  <span className="font-semibold text-white font-mono">{calculations.hoursAcWallbox} hours</span>
                </div>
                <div className="flex justify-between text-zinc-300">
                  <span className="text-zinc-400">Standard 16A Socket:</span>
                  <span className="font-semibold text-amber-400 font-mono">{calculations.hoursAc16A} hours</span>
                </div>
                <div className="flex justify-between text-zinc-300">
                  <span className="text-zinc-400">Public DC Fast (150 kW):</span>
                  <span className="font-semibold text-emerald-400 font-mono">~{calculations.minDcFast150} minutes</span>
                </div>
              </div>

              <p className="text-[10px] text-zinc-500 italic">
                *Includes estimated 10% AC-to-DC rectification losses and thermal pack conditioning.
              </p>
            </div>
          </div>
        </div>

        {/* Public EV Charging Apps in India Guide */}
        <div className="mt-12">
          <h3 className="text-lg font-bold text-white font-display mb-4">
            Popular Public EV Charging Apps in India for Tesla Owners
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
              <span className="font-bold text-white block">Tata Power EZ Charge</span>
              <span className="text-zinc-400 text-[11px]">5,000+ chargers across national highways & Taj hotels</span>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
              <span className="font-bold text-white block">Jio-bp pulse</span>
              <span className="text-zinc-400 text-[11px]">High-capacity 60 kW and 120 kW highway hubs</span>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
              <span className="font-bold text-white block">Statiq EV</span>
              <span className="text-zinc-400 text-[11px]">Extensive urban mall and commercial complex network</span>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
              <span className="font-bold text-white block">Zeon Charging</span>
              <span className="text-zinc-400 text-[11px]">Leading high-speed DC highway network in South India</span>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
              <span className="font-bold text-white block">ChargeZone</span>
              <span className="text-zinc-400 text-[11px]">Highways connecting Delhi, Mumbai, and Ahmedabad</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
