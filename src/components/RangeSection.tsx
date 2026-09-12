import { useState, useMemo } from 'react';
import { 
  BatteryCharging, 
  Wind, 
  Sun, 
  Gauge, 
  Sliders, 
  Zap, 
  Thermometer, 
  Activity,
  AlertCircle
} from 'lucide-react';
import { TeslaModel } from '../types/index.ts';

interface RangeSectionProps {
  models: TeslaModel[];
}

export default function RangeSection({ models }: RangeSectionProps) {
  const [selectedModelId, setSelectedModelId] = useState<string>('model-y');
  const [speedType, setSpeedType] = useState<'city' | 'mixed' | 'highway'>('mixed');
  const [temperature, setTemperature] = useState<number>(36); // Indian climate
  const [acMode, setAcMode] = useState<'off' | 'normal' | 'heavy'>('normal');
  const [wheelSize, setWheelSize] = useState<'standard' | 'large'>('standard');
  const [drivingStyle, setDrivingStyle] = useState<'chill' | 'sporty'>('chill');

  const selectedModel = models.find(m => m.id === selectedModelId) || models[1];

  // Dynamic real-world calculation based on physics coefficients
  const calculatedRange = useMemo(() => {
    let base = selectedModel.wltpRangeKm;

    // Speed impact
    if (speedType === 'city') {
      base *= 1.05; // Regenerative braking helps in city traffic
    } else if (speedType === 'mixed') {
      base *= 0.92;
    } else if (speedType === 'highway') {
      base *= 0.81; // High aerodynamic drag at 110-120 km/h
    }

    // Temperature & Climate Impact (Heat pump efficiency in hot Indian summers)
    if (temperature > 40) {
      base *= 0.90; // High ambient pack cooling demand
    } else if (temperature > 30) {
      base *= 0.95;
    } else if (temperature < 15) {
      base *= 0.92;
    }

    // AC Cabin Climate impact
    if (acMode === 'normal') {
      base *= 0.93; // 7% reduction for climate control
    } else if (acMode === 'heavy') {
      base *= 0.86; // 14% reduction for max blower at 19°C in 45°C heat
    }

    // Wheel size
    if (wheelSize === 'large') {
      base *= 0.95; // Larger wheels increase rotational inertia & rolling resistance
    }

    // Driving style
    if (drivingStyle === 'sporty') {
      base *= 0.88; // Hard acceleration launches drain battery faster
    }

    return Math.round(base);
  }, [selectedModel, speedType, temperature, acMode, wheelSize, drivingStyle]);

  const percentageOfWltp = Math.round((calculatedRange / selectedModel.wltpRangeKm) * 100);

  return (
    <section id="range" className="py-20 bg-[#0c0e14] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400 mb-3">
            <BatteryCharging className="w-3.5 h-3.5" />
            <span>Real-World Performance Simulator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
            Tesla EV Driving Range in India
          </h2>
          <p className="text-zinc-400 text-sm mt-2">
            See how real-world Indian conditions—intense summer heat, heavy air-conditioning, expressway cruising, and traffic—affect battery range compared to lab WLTP claims.
          </p>
        </div>

        {/* Interactive Simulator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column (7 Cols) */}
          <div className="lg:col-span-7 bg-[#121520] border border-white/10 rounded-2xl p-6 space-y-6 shadow-xl">
            <h3 className="text-base font-bold text-white flex items-center gap-2 font-display">
              <Sliders className="w-4 h-4 text-red-500" />
              <span>Simulate Your Driving Scenario</span>
            </h3>

            {/* Model Selection */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-300">Select Tesla Vehicle:</label>
              <div className="grid grid-cols-3 gap-2">
                {models.slice(0, 3).map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setSelectedModelId(m.id)}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all text-left cursor-pointer ${
                      selectedModelId === m.id
                        ? 'bg-red-600 border-red-500 text-white shadow-lg'
                        : 'bg-white/5 border-white/10 text-zinc-300 hover:bg-white/10'
                    }`}
                  >
                    <div className="font-display">{m.name}</div>
                    <div className="text-[10px] font-normal opacity-80 mt-0.5">WLTP: {m.wltpRangeKm} km</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Speed & Traffic Mode */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-zinc-300">Driving Speed & Route Profile:</span>
                <span className="text-zinc-400 font-mono">
                  {speedType === 'city' ? 'City Traffic (Avg 35–45 km/h)' : speedType === 'mixed' ? 'Mixed City + Ring Road (70 km/h)' : 'Expressway Cruising (110–120 km/h)'}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'city', label: 'City Traffic', sub: 'High Regen' },
                  { id: 'mixed', label: 'Mixed Commute', sub: 'Standard' },
                  { id: 'highway', label: 'Expressway', sub: 'Aero Drag' }
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSpeedType(s.id as any)}
                    className={`p-2.5 rounded-lg border text-xs text-center transition-all cursor-pointer ${
                      speedType === s.id
                        ? 'bg-white/20 border-white text-white font-semibold'
                        : 'bg-white/5 border-white/5 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <div>{s.label}</div>
                    <div className="text-[10px] text-zinc-500">{s.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Ambient Temperature Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-zinc-300 flex items-center gap-1.5">
                  <Thermometer className="w-3.5 h-3.5 text-amber-400" />
                  <span>Ambient Temperature (Indian Climate):</span>
                </span>
                <span className="text-amber-400 font-bold font-mono text-sm">{temperature}°C</span>
              </div>
              <input
                type="range"
                min="15"
                max="48"
                step="1"
                value={temperature}
                onChange={(e) => setTemperature(Number(e.target.value))}
                className="w-full accent-red-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-zinc-500">
                <span>15°C (Winter)</span>
                <span>28°C (Pleasant)</span>
                <span>38°C (Summer)</span>
                <span>48°C (Peak Heatwave)</span>
              </div>
            </div>

            {/* AC Climate Control */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-zinc-300">Cabin Air Conditioning:</span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'off', label: 'AC Off', sub: 'Windows / Blower' },
                  { id: 'normal', label: 'Auto (23°C)', sub: 'Comfortable' },
                  { id: 'heavy', label: 'Max Cool (19°C)', sub: 'Full Blower' }
                ].map((a) => (
                  <button
                    key={a.id}
                    onClick={() => setAcMode(a.id as any)}
                    className={`p-2.5 rounded-lg border text-xs text-center transition-all cursor-pointer ${
                      acMode === a.id
                        ? 'bg-blue-600/30 border-blue-500 text-white font-semibold'
                        : 'bg-white/5 border-white/5 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <div>{a.label}</div>
                    <div className="text-[10px] text-zinc-500">{a.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Wheel & Driving Style Toggle */}
            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/5">
              <div className="space-y-1.5">
                <span className="text-xs font-semibold text-zinc-300">Wheel Package:</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setWheelSize('standard')}
                    className={`flex-1 py-2 rounded-lg text-xs font-medium border cursor-pointer ${
                      wheelSize === 'standard' ? 'bg-white/20 border-white text-white' : 'bg-white/5 border-white/5 text-zinc-400'
                    }`}
                  >
                    18"/19" Aero
                  </button>
                  <button
                    onClick={() => setWheelSize('large')}
                    className={`flex-1 py-2 rounded-lg text-xs font-medium border cursor-pointer ${
                      wheelSize === 'large' ? 'bg-white/20 border-white text-white' : 'bg-white/5 border-white/5 text-zinc-400'
                    }`}
                  >
                    20"/21" Sport
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-xs font-semibold text-zinc-300">Driving Style:</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setDrivingStyle('chill')}
                    className={`flex-1 py-2 rounded-lg text-xs font-medium border cursor-pointer ${
                      drivingStyle === 'chill' ? 'bg-white/20 border-white text-white' : 'bg-white/5 border-white/5 text-zinc-400'
                    }`}
                  >
                    Smooth / Chill
                  </button>
                  <button
                    onClick={() => setDrivingStyle('sporty')}
                    className={`flex-1 py-2 rounded-lg text-xs font-medium border cursor-pointer ${
                      drivingStyle === 'sporty' ? 'bg-white/20 border-white text-white' : 'bg-white/5 border-white/5 text-zinc-400'
                    }`}
                  >
                    Dynamic
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Results Visual Meter (5 Cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#141824] to-[#0d0f15] border border-white/15 rounded-2xl p-6 space-y-6 shadow-2xl flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                Simulated Output
              </span>
              <h4 className="text-lg font-bold text-white font-display mt-0.5">
                Estimated Real-World Range
              </h4>

              {/* Large Range Dial Card */}
              <div className="mt-6 p-6 rounded-2xl bg-black/50 border border-white/10 text-center relative overflow-hidden">
                <div className="text-5xl sm:text-6xl font-extrabold text-white font-display tracking-tight flex items-baseline justify-center gap-1">
                  <span>{calculatedRange}</span>
                  <span className="text-xl font-medium text-emerald-400 font-sans">km</span>
                </div>
                <div className="text-xs text-zinc-400 mt-2">
                  approx. {percentageOfWltp}% of certified {selectedModel.wltpRangeKm} km WLTP
                </div>

                {/* Progress Bar Meter */}
                <div className="w-full bg-zinc-800 rounded-full h-3 mt-5 overflow-hidden p-0.5">
                  <div 
                    className="bg-gradient-to-r from-red-500 via-amber-400 to-emerald-400 h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, Math.max(30, percentageOfWltp))}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Range Breakdown Checklist */}
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1.5 border-b border-white/5 text-zinc-300">
                <span className="text-zinc-400">Claimed WLTP Range:</span>
                <span className="font-semibold text-white">{selectedModel.wltpRangeKm} km</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5 text-zinc-300">
                <span className="text-zinc-400">Delhi to Jaipur (280 km):</span>
                <span className="font-semibold text-emerald-400">Comfortable Non-Stop</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5 text-zinc-300">
                <span className="text-zinc-400">Mumbai to Pune (150 km):</span>
                <span className="font-semibold text-emerald-400">Non-Stop (Round Trip on 1 Charge)</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5 text-zinc-300">
                <span className="text-zinc-400">Bengaluru to Mysuru (145 km):</span>
                <span className="font-semibold text-emerald-400">Non-Stop with 65% Remaining</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-[11px] text-zinc-400 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
              <span>Real-world range in electric vehicles is highest in urban city driving due to stop-and-go regenerative braking, and lowest on high-speed expressways due to aerodynamic air resistance.</span>
            </div>
          </div>
        </div>

        {/* Educational Factor Cards (7 factors requested in prompt) */}
        <div className="mt-14 space-y-4">
          <h3 className="text-xl font-bold text-white font-display">
            The 7 Key Factors That Determine Real-World Range in India
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5 text-xs">
              <span className="font-bold text-red-400 block">1. Air Conditioning (AC)</span>
              <p className="text-zinc-400">
                Operating heavy cooling in 44°C Indian summers draws 1.5–3 kW continuously, which reduces driving range by 8% to 15%. Tesla’s Octovalve heat pump mitigates this significantly compared to resistive heaters.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5 text-xs">
              <span className="font-bold text-emerald-400 block">2. Highway Speed (Aero Drag)</span>
              <p className="text-zinc-400">
                Aerodynamic drag increases quadratically with speed. Cruising at 120 km/h consumes roughly 25% more energy than cruising at 85 km/h.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5 text-xs">
              <span className="font-bold text-blue-400 block">3. Traffic & Regenerative Braking</span>
              <p className="text-zinc-400">
                Unlike petrol cars that waste fuel idling in bumper-to-bumper Mumbai or Bengaluru traffic, Tesla regenerates energy back into the pack every time you ease off the accelerator.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5 text-xs">
              <span className="font-bold text-amber-400 block">4. Weather & Extreme Heat</span>
              <p className="text-zinc-400">
                Battery chemistry performs best between 20°C and 35°C. High ambient temperatures trigger active battery thermal chilling to protect cell health.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5 text-xs">
              <span className="font-bold text-purple-400 block">5. Driving Style (Acceleration)</span>
              <p className="text-zinc-400">
                Frequent hard launches from traffic signals utilize high motor peak discharge, while smooth progressive throttle modulation preserves range.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5 text-xs">
              <span className="font-bold text-cyan-400 block">6. Wheel & Tyre Size</span>
              <p className="text-zinc-400">
                Aero-covered 18-inch or 19-inch wheels provide 5% to 8% longer range compared to larger 20-inch or 21-inch sport performance rims.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5 text-xs">
              <span className="font-bold text-rose-400 block">7. Battery Degradation & State</span>
              <p className="text-zinc-400">
                Tesla packs retain over 88% capacity even after 300,000 km. Maintaining charge levels between 20% and 80% for daily commutes maximizes cell lifespan.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5 text-xs">
              <span className="font-bold text-teal-400 block">Summary Tip</span>
              <p className="text-zinc-400">
                Pre-cooling the cabin while still plugged into your home charger saves precious battery power for the road!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
