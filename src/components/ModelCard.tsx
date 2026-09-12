import { 
  Gauge, 
  BatteryCharging, 
  Zap, 
  Users, 
  Layers, 
  ChevronRight, 
  AlertCircle, 
  Clock, 
  ShieldAlert,
  Sparkles
} from 'lucide-react';
import { TeslaModel } from '../types/index.ts';

interface ModelCardProps {
  key?: string;
  model: TeslaModel;
  onSelectDetails: (model: TeslaModel) => void;
  onToggleCompare: (model: TeslaModel) => void;
  isCompared: boolean;
}

export default function ModelCard({
  model,
  onSelectDetails,
  onToggleCompare,
  isCompared
}: ModelCardProps) {
  const isReferenceOnly = !model.isOfficiallyAvailable && (model.id === 'model-s' || model.id === 'model-x' || model.id === 'cybertruck' || model.id === 'roadster');

  return (
    <div 
      id={`model-card-${model.slug}`}
      className="group relative rounded-2xl bg-[#12151e] border border-white/10 hover:border-white/25 transition-all duration-300 overflow-hidden flex flex-col shadow-xl hover:shadow-2xl hover:shadow-red-950/20"
    >
      {/* Top Image Container */}
      <div className="relative h-56 w-full overflow-hidden bg-zinc-950">
        <img
          src={model.heroImage}
          alt={model.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#12151e] via-transparent to-black/40" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide uppercase bg-black/70 backdrop-blur-md border border-white/15 text-white">
            {model.category}
          </span>

          <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border backdrop-blur-md flex items-center gap-1 ${
            model.dataStatus === 'Estimated'
              ? 'bg-blue-950/70 border-blue-500/40 text-blue-300'
              : 'bg-zinc-900/80 border-amber-500/40 text-amber-300'
          }`}>
            <Clock className="w-3 h-3" />
            <span>{model.dataStatus}</span>
          </span>
        </div>

        {/* Model Title Floating on Image Base */}
        <div className="absolute bottom-3 left-4 right-4">
          <h3 className="text-2xl font-extrabold text-white font-display tracking-tight drop-shadow-md">
            {model.name}
          </h3>
          <p className="text-xs text-zinc-300 line-clamp-1">
            {model.tagline}
          </p>
        </div>
      </div>

      {/* Mandatory Reference Notice for non-official models */}
      {isReferenceOnly && (
        <div className="bg-amber-500/10 border-y border-amber-500/20 px-3.5 py-2 flex items-center gap-2 text-[11px] text-amber-300 font-medium">
          <ShieldAlert className="w-3.5 h-3.5 shrink-0 text-amber-400" />
          <span>Not officially available in India — information shown for reference.</span>
        </div>
      )}

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        {/* Pricing Section */}
        <div className="border-b border-white/10 pb-3">
          <div className="text-[11px] uppercase tracking-wider text-zinc-400 font-semibold">
            Estimated Ex-Showroom India Price
          </div>
          <div className="text-xl font-bold text-white font-display mt-0.5 flex items-baseline gap-2">
            <span>{model.startingPriceDisplay}</span>
          </div>
          <p className="text-[11px] text-zinc-400 mt-1 italic line-clamp-1">
            {model.priceNote}
          </p>
        </div>

        {/* Core Specs Grid */}
        <div className="grid grid-cols-2 gap-2.5 text-xs">
          <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
            <div className="flex items-center gap-1.5 text-zinc-400 text-[11px]">
              <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" />
              <span>WLTP Range</span>
            </div>
            <div className="font-bold text-white text-sm mt-0.5 font-display">
              {model.wltpRangeKm} km
            </div>
            <div className="text-[10px] text-zinc-500">Real-world: ~{model.realWorldRangeKm} km</div>
          </div>

          <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
            <div className="flex items-center gap-1.5 text-zinc-400 text-[11px]">
              <Gauge className="w-3.5 h-3.5 text-red-400" />
              <span>0–100 km/h</span>
            </div>
            <div className="font-bold text-white text-sm mt-0.5 font-display">
              {model.acceleration0to100} s
            </div>
            <div className="text-[10px] text-zinc-500">Top Speed: {model.topSpeedKmh} km/h</div>
          </div>

          <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
            <div className="flex items-center gap-1.5 text-zinc-400 text-[11px]">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Battery & Drive</span>
            </div>
            <div className="font-bold text-white text-sm mt-0.5 font-display">
              {model.batteryCapacityKwh} kWh
            </div>
            <div className="text-[10px] text-zinc-500 truncate">{model.driveType}</div>
          </div>

          <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
            <div className="flex items-center gap-1.5 text-zinc-400 text-[11px]">
              <Users className="w-3.5 h-3.5 text-blue-400" />
              <span>Seating & Port</span>
            </div>
            <div className="font-bold text-white text-sm mt-0.5 font-display">
              {model.seatingCapacity} Seater
            </div>
            <div className="text-[10px] text-zinc-500 truncate">{model.chargingConnector}</div>
          </div>
        </div>

        {/* Fast Charging & Quick Features */}
        <div className="space-y-1.5 text-xs text-zinc-300 pt-1 border-t border-white/5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-zinc-400">DC Fast Charging:</span>
            <span className="font-semibold text-zinc-200">Up to {model.dcFastChargingKw} kW ({model.dcCharging10to80Min} min 10-80%)</span>
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-zinc-400">Status in India:</span>
            <span className="font-medium text-amber-300 truncate max-w-[180px]">{model.statusLabel}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex items-center gap-2">
          <button
            onClick={() => onSelectDetails(model)}
            id={`btn-details-${model.slug}`}
            className="flex-1 py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>View Details</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => onToggleCompare(model)}
            id={`btn-compare-${model.slug}`}
            className={`py-2.5 px-3.5 rounded-xl border text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              isCompared
                ? 'bg-red-600 border-red-500 text-white shadow-lg shadow-red-600/30'
                : 'bg-zinc-800/80 border-white/10 hover:border-white/25 text-zinc-300 hover:text-white'
            }`}
            title={isCompared ? 'Remove from Compare' : 'Add to Compare'}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{isCompared ? 'Added' : 'Compare'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
