import { ArrowRight, Gauge, BatteryCharging, Shield, Sparkles, Layers, Calculator, Info, Zap } from 'lucide-react';
import { TeslaModel } from '../types/index.ts';

interface HeroProps {
  featuredModel?: TeslaModel;
  onExploreCars: () => void;
  onCompareModels: () => void;
  onCalculateCost: () => void;
  onSelectModel: (model: TeslaModel) => void;
}

export default function Hero({
  featuredModel,
  onExploreCars,
  onCompareModels,
  onCalculateCost,
  onSelectModel
}: HeroProps) {
  return (
    <section id="home" className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background Graphic & Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-red-600/15 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 -left-40 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[160px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Verification & Regulatory Announcement Pill */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-xs text-zinc-300 shadow-xl">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="font-semibold text-white">India EV Policy Update:</span>
            <span className="text-zinc-400 hidden sm:inline">15% Concessional Duty for EV Manufacturers</span>
            <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-white/10">Verified Govt Scheme</span>
          </div>
        </div>

        {/* Primary Hero Headings */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-display leading-[1.15]">
            Tesla in India —{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-zinc-100 to-zinc-400">
              The Future of Electric Mobility
            </span>
          </h1>
          <p className="text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Explore Tesla cars, prices, range, features, charging and ownership information for India.
          </p>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onExploreCars}
              id="hero-btn-explore"
              className="px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-sm transition-all shadow-lg shadow-red-600/30 hover:shadow-red-500/50 flex items-center gap-2 group cursor-pointer"
            >
              <span>Explore Tesla Cars</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onCompareModels}
              id="hero-btn-compare"
              className="px-6 py-3.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-sm transition-all border border-white/10 hover:border-white/20 flex items-center gap-2 cursor-pointer"
            >
              <Layers className="w-4 h-4 text-red-400" />
              <span>Compare Models</span>
            </button>

            <button
              onClick={onCalculateCost}
              id="hero-btn-calculate"
              className="px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-200 hover:text-white font-semibold text-sm transition-all border border-white/10 flex items-center gap-2 cursor-pointer"
            >
              <Calculator className="w-4 h-4 text-emerald-400" />
              <span>Calculate EV Cost</span>
            </button>
          </div>
        </div>

        {/* Large Hero Car Display Banner */}
        <div className="mt-10 relative max-w-5xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-gradient-to-b from-zinc-900/60 to-black/80 shadow-2xl backdrop-blur-sm group">
            <img
              src="https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1800&q=85"
              alt="Tesla Model in India"
              className="w-full h-[320px] sm:h-[440px] lg:h-[500px] object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 opacity-90"
              loading="eager"
            />
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c10] via-black/30 to-transparent" />

            {/* Float Card Info */}
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/70 backdrop-blur-md border border-white/15 text-[11px] font-medium text-red-400">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Featured Benchmark: Tesla Model 3 & Model Y</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                  Engineered for Zero Emissions & Instant Torque
                </h3>
                <p className="text-xs text-zinc-300 max-w-lg">
                  Over 530 km range, 250 kW DC fast charging capabilities, and dual-motor all-weather traction.
                </p>
              </div>

              {featuredModel && (
                <button
                  onClick={() => onSelectModel(featuredModel)}
                  className="px-4 py-2 rounded-lg bg-white text-zinc-900 font-semibold text-xs hover:bg-zinc-200 transition-colors shadow-lg cursor-pointer whitespace-nowrap"
                >
                  View Model Details
                </button>
              )}
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm flex items-center gap-3">
              <div className="p-2 rounded-lg bg-red-500/10 text-red-400">
                <Gauge className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-zinc-400">0–100 km/h</div>
                <div className="text-base font-bold text-white font-display">2.1s – 4.4s</div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                <BatteryCharging className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-zinc-400">Max WLTP Range</div>
                <div className="text-base font-bold text-white font-display">Up to 652 km</div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-zinc-400">Fast Charging</div>
                <div className="text-base font-bold text-white font-display">250 kW Peak</div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-zinc-400">Safety Rating</div>
                <div className="text-base font-bold text-white font-display">5-Star Euro NCAP</div>
              </div>
            </div>
          </div>
        </div>

        {/* Data Authenticity Notice */}
        <div className="mt-8 max-w-3xl mx-auto p-3.5 rounded-xl bg-zinc-900/60 border border-amber-500/20 flex items-start gap-3 text-xs text-zinc-400">
          <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-amber-300">Data Transparency Disclaimer:</span> Information on this portal clearly distinguishes between officially confirmed regulatory updates and estimated market figures. Prices shown for India are estimates based on the notified 15% EV policy import duty and are subject to official launch announcements.
          </div>
        </div>
      </div>
    </section>
  );
}
