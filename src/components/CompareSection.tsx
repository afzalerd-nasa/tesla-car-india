import { useState } from 'react';
import { TeslaModel, ComparisonVehicle } from '../types/index.ts';
import { 
  Layers, 
  X, 
  Plus, 
  Check, 
  Sparkles, 
  Gauge, 
  BatteryCharging, 
  Zap, 
  ShieldCheck, 
  Wrench,
  HelpCircle
} from 'lucide-react';

interface CompareSectionProps {
  teslaModels: TeslaModel[];
  comparisonVehicles: ComparisonVehicle[];
  activeModelIds: string[];
  onToggleModel: (id: string) => void;
}

export default function CompareSection({
  teslaModels,
  comparisonVehicles,
  activeModelIds,
  onToggleModel
}: CompareSectionProps) {
  // Combine all available vehicles into one selectable roster
  const allVehicles = [
    ...teslaModels.map((m) => ({
      id: m.id,
      brand: 'Tesla',
      modelName: m.name,
      priceInrDisplay: m.startingPriceDisplay,
      rangeKm: `${m.wltpRangeKm} km (WLTP)`,
      batteryCapacity: `${m.batteryCapacityKwh} kWh`,
      acceleration: `${m.acceleration0to100} s`,
      chargingSpeed: `Up to ${m.dcFastChargingKw} kW DC`,
      safetyRating: '5-Star Euro NCAP / NHTSA',
      keyFeatures: 'Autopilot, 15.4" Screen, Sentry Mode, OTA Updates, Glass Roof',
      warranty: '4 Years / 80,000 km (Battery: 8 Yrs / 160k km)',
      serviceNetwork: 'Direct Mobile Service + Metro Service Hubs',
      runningCostPerKm: '₹ 1.20 / km (Home Charging)',
      heroImage: m.heroImage
    })),
    ...comparisonVehicles.map((c) => ({
      id: c.id,
      brand: c.brand,
      modelName: `${c.model} (${c.variant})`,
      priceInrDisplay: c.priceDisplay,
      rangeKm: `${c.rangeClaimedKm} km (${c.rangeRealWorldKm} km real)`,
      batteryCapacity: `${c.batteryKwh} kWh`,
      acceleration: `${c.acceleration0to100} s`,
      chargingSpeed: c.dcFastChargingTimeMin,
      safetyRating: c.safetyRating,
      keyFeatures: Array.isArray(c.keyFeatures) ? c.keyFeatures.join(', ') : c.keyFeatures,
      warranty: c.warranty,
      serviceNetwork: c.serviceNetwork,
      runningCostPerKm: `₹ ${c.runningCostPerKm.toFixed(2)} / km`,
      heroImage: c.imageUrl
    }))
  ];

  // Default selection if none is picked
  const selectedVehicleIds = activeModelIds.length > 0
    ? activeModelIds.slice(0, 3)
    : ['model-3', 'byd-seal', 'hyundai-ioniq-5'];

  const selectedVehicles = allVehicles.filter(v => selectedVehicleIds.includes(v.id));

  const handleSelectPreset = (ids: string[]) => {
    // Clear and set
    activeModelIds.forEach(id => onToggleModel(id));
    ids.forEach(id => onToggleModel(id));
  };

  return (
    <section id="compare" className="py-20 bg-[#0b0c11] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-xs font-semibold text-red-400 mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Interactive EV Benchmarks</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
            Tesla vs Other EV Cars in India
          </h2>
          <p className="text-zinc-400 text-sm mt-2">
            Side-by-side comparison across 10 critical parameters: price, battery, charging speed, 0–100 km/h acceleration, warranty, and running costs against India's leading EVs.
          </p>
        </div>

        {/* Quick Comparison Presets */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          <span className="text-xs text-zinc-400 font-semibold mr-2">Popular Matchups:</span>
          <button
            onClick={() => handleSelectPreset(['model-3', 'byd-seal', 'hyundai-ioniq-5'])}
            className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 text-xs font-medium transition-colors cursor-pointer"
          >
            Tesla Model 3 vs BYD Seal vs Hyundai Ioniq 5
          </button>
          <button
            onClick={() => handleSelectPreset(['model-y', 'kia-ev6', 'bmw-i4'])}
            className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 text-xs font-medium transition-colors cursor-pointer"
          >
            Tesla Model Y vs Kia EV6 vs BMW i4
          </button>
          <button
            onClick={() => handleSelectPreset(['model-3', 'tata-curvv-ev', 'mg-zs-ev'])}
            className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 text-xs font-medium transition-colors cursor-pointer"
          >
            Tesla Model 3 vs Tata Curvv.ev vs MG ZS EV
          </button>
        </div>

        {/* Vehicle Selectors Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[0, 1, 2].map((slotIndex) => {
            const currentVehicle = selectedVehicles[slotIndex];
            return (
              <div
                key={slotIndex}
                className="p-4 rounded-xl bg-[#121520] border border-white/10 space-y-3 relative"
              >
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <span className="font-semibold uppercase tracking-wider">Slot {slotIndex + 1}</span>
                  {currentVehicle && (
                    <button
                      onClick={() => onToggleModel(currentVehicle.id)}
                      className="text-zinc-500 hover:text-red-400 p-1 cursor-pointer"
                      title="Remove from comparison"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Dropdown Selector */}
                <select
                  value={currentVehicle?.id || ''}
                  onChange={(e) => {
                    const newId = e.target.value;
                    if (currentVehicle) onToggleModel(currentVehicle.id);
                    if (newId) onToggleModel(newId);
                  }}
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white font-medium focus:outline-none focus:border-red-500"
                >
                  <option value="" disabled>-- Choose Vehicle --</option>
                  {allVehicles.map((v) => (
                    <option key={v.id} value={v.id} className="bg-zinc-900 text-white">
                      {v.brand} {v.modelName} ({v.priceInrDisplay})
                    </option>
                  ))}
                </select>

                {currentVehicle && (
                  <div className="flex items-center gap-3 pt-1">
                    <img
                      src={currentVehicle.heroImage}
                      alt={currentVehicle.modelName}
                      className="w-14 h-10 object-cover rounded-lg border border-white/10"
                    />
                    <div>
                      <div className="text-xs font-bold text-white">{currentVehicle.brand} {currentVehicle.modelName}</div>
                      <div className="text-[11px] text-red-400 font-mono font-semibold">{currentVehicle.priceInrDisplay}</div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Side-By-Side Comparison Grid Table */}
        <div className="rounded-2xl border border-white/10 bg-[#121520] overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#151926] border-b border-white/10 text-[11px] uppercase tracking-wider text-zinc-400 font-semibold">
                <tr>
                  <th className="py-3 px-4 sm:px-6 w-1/4">Comparison Attribute</th>
                  {selectedVehicles.map((v) => (
                    <th key={v.id} className="py-3 px-4 sm:px-6 text-white font-bold font-display">
                      {v.brand} {v.modelName}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-zinc-300">
                {/* 1. Price */}
                <tr className="hover:bg-white/5">
                  <td className="py-3.5 px-4 sm:px-6 font-semibold text-white">Estimated / Ex-Showroom Price</td>
                  {selectedVehicles.map((v) => (
                    <td key={v.id} className="py-3.5 px-4 sm:px-6 font-bold text-red-400 font-mono text-sm">
                      {v.priceInrDisplay}
                    </td>
                  ))}
                </tr>

                {/* 2. Range */}
                <tr className="hover:bg-white/5">
                  <td className="py-3.5 px-4 sm:px-6 font-semibold text-white">Certified Driving Range</td>
                  {selectedVehicles.map((v) => (
                    <td key={v.id} className="py-3.5 px-4 sm:px-6 font-bold text-emerald-400">
                      {v.rangeKm}
                    </td>
                  ))}
                </tr>

                {/* 3. Battery Capacity */}
                <tr className="hover:bg-white/5">
                  <td className="py-3.5 px-4 sm:px-6 font-semibold text-white">Battery Pack Capacity</td>
                  {selectedVehicles.map((v) => (
                    <td key={v.id} className="py-3.5 px-4 sm:px-6 font-medium text-white">
                      {v.batteryCapacity}
                    </td>
                  ))}
                </tr>

                {/* 4. Acceleration */}
                <tr className="hover:bg-white/5">
                  <td className="py-3.5 px-4 sm:px-6 font-semibold text-white">0–100 km/h Acceleration</td>
                  {selectedVehicles.map((v) => (
                    <td key={v.id} className="py-3.5 px-4 sm:px-6 font-bold text-amber-300 font-mono">
                      {v.acceleration}
                    </td>
                  ))}
                </tr>

                {/* 5. Charging Speed */}
                <tr className="hover:bg-white/5">
                  <td className="py-3.5 px-4 sm:px-6 font-semibold text-white">DC Fast Charging Speed</td>
                  {selectedVehicles.map((v) => (
                    <td key={v.id} className="py-3.5 px-4 sm:px-6 font-medium text-zinc-200">
                      {v.chargingSpeed}
                    </td>
                  ))}
                </tr>

                {/* 6. Safety Rating */}
                <tr className="hover:bg-white/5">
                  <td className="py-3.5 px-4 sm:px-6 font-semibold text-white">Crash Safety Standards</td>
                  {selectedVehicles.map((v) => (
                    <td key={v.id} className="py-3.5 px-4 sm:px-6 font-semibold text-blue-400">
                      {v.safetyRating}
                    </td>
                  ))}
                </tr>

                {/* 7. Key Features */}
                <tr className="hover:bg-white/5">
                  <td className="py-3.5 px-4 sm:px-6 font-semibold text-white">Distinctive Features</td>
                  {selectedVehicles.map((v) => (
                    <td key={v.id} className="py-3.5 px-4 sm:px-6 text-zinc-400 text-[11px] leading-relaxed">
                      {v.keyFeatures}
                    </td>
                  ))}
                </tr>

                {/* 8. Warranty */}
                <tr className="hover:bg-white/5">
                  <td className="py-3.5 px-4 sm:px-6 font-semibold text-white">Vehicle & Battery Warranty</td>
                  {selectedVehicles.map((v) => (
                    <td key={v.id} className="py-3.5 px-4 sm:px-6 text-zinc-300">
                      {v.warranty}
                    </td>
                  ))}
                </tr>

                {/* 9. Service Network */}
                <tr className="hover:bg-white/5">
                  <td className="py-3.5 px-4 sm:px-6 font-semibold text-white">Service Footprint in India</td>
                  {selectedVehicles.map((v) => (
                    <td key={v.id} className="py-3.5 px-4 sm:px-6 text-zinc-300">
                      {v.serviceNetwork}
                    </td>
                  ))}
                </tr>

                {/* 10. Running Cost */}
                <tr className="hover:bg-white/5">
                  <td className="py-3.5 px-4 sm:px-6 font-semibold text-white">Cost Per Kilometer</td>
                  {selectedVehicles.map((v) => (
                    <td key={v.id} className="py-3.5 px-4 sm:px-6 font-bold text-emerald-400 font-mono">
                      {v.runningCostPerKm}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
