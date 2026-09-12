import { useState } from 'react';
import { 
  Cpu, 
  Smartphone, 
  ShieldAlert, 
  Wifi, 
  Compass, 
  Music, 
  Tv, 
  Sun, 
  Wind, 
  Check,
  AlertTriangle,
  Sparkles
} from 'lucide-react';

export default function FeaturesSection() {
  const [activeCategory, setActiveCategory] = useState<'software' | 'safety' | 'comfort'>('software');

  return (
    <section id="features" className="py-20 bg-[#0c0e14] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-xs font-semibold text-red-400 mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>Digital Architecture & Innovation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
            Tesla Features & Technology Guide
          </h2>
          <p className="text-zinc-400 text-sm mt-2">
            Explore Tesla’s industry-defining software ecosystem, mobile connectivity, active security systems, and how driver assistance technologies adapt to Indian driving conditions.
          </p>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex justify-center mb-10">
          <div className="p-1 rounded-xl bg-white/5 border border-white/10 flex gap-1">
            {[
              { id: 'software', label: 'Autopilot & Software Ecosystem' },
              { id: 'safety', label: 'Sentry Mode & Active Security' },
              { id: 'comfort', label: 'Cabin, Audio & Climate Control' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as any)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeCategory === tab.id
                    ? 'bg-red-600 text-white shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* TAB 1: SOFTWARE & AUTOPILOT */}
        {activeCategory === 'software' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Feature 1 */}
              <div className="p-6 rounded-2xl bg-[#121520] border border-white/10 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white font-display">Standard Autopilot</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Includes Traffic-Aware Cruise Control and Autosteer. Keeps vehicle centered within clearly marked lanes, adjusting speed according to traffic pace on expressways.
                </p>
                <div className="pt-2 text-[11px] text-zinc-500 border-t border-white/5">
                  Standard equipment on every Tesla model worldwide.
                </div>
              </div>

              {/* Feature 2 */}
              <div className="p-6 rounded-2xl bg-[#121520] border border-white/10 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                  <Wifi className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white font-display">Over-the-Air (OTA) Updates</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Your car continuously evolves. Seamless cellular and Wi-Fi updates add new features, improve braking performance, boost charging speed, and refine user interface over time.
                </p>
                <div className="pt-2 text-[11px] text-zinc-500 border-t border-white/5">
                  Zero dealership visits needed for software upgrades.
                </div>
              </div>

              {/* Feature 3 */}
              <div className="p-6 rounded-2xl bg-[#121520] border border-white/10 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <Smartphone className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white font-display">Tesla Smartphone App</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Turn your phone into a Bluetooth key. Pre-condition cabin AC before entering in hot Indian summers, check battery SOC, track location, flash lights, and grant guest driver access.
                </p>
                <div className="pt-2 text-[11px] text-zinc-500 border-t border-white/5">
                  Works on iOS and Android with cellular connectivity.
                </div>
              </div>
            </div>

            {/* India Autopilot Reality & Context Banner */}
            <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3.5 text-xs text-amber-200">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="font-bold text-amber-300 text-sm">
                  Full Self-Driving (FSD) & Driver Assistance in India
                </h4>
                <p className="text-zinc-300 leading-relaxed">
                  While Tesla vehicles feature advanced 8-camera Tesla Vision hardware, Full Self-Driving (FSD) capability is classified as Level 2 driver assistance requiring full driver supervision with hands on the wheel. Unmarked roads, erratic two-wheeler maneuvers, and local regulatory requirements mean autonomous features in India will be tailored strictly to expressway lane centering and adaptive cruise control.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SECURITY & SENTRY MODE */}
        {activeCategory === 'safety' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#121520] border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white font-display">Sentry Mode 360°</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Constantly monitors surroundings when parked. If an individual approaches closely or attempts vandalism, the cameras begin recording to a flash drive and flash exterior lights.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#121520] border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
                <Tv className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white font-display">Integrated Dashcam</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Automatic continuous loop recording from front, rear, and side cameras while driving. Automatically archives footage upon horn honk or collision detection.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#121520] border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                <Smartphone className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white font-display">Live Remote Camera Viewing</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                View live video feeds from your car's exterior cameras straight on your mobile phone screen from anywhere in India via the Tesla app.
              </p>
            </div>
          </div>
        )}

        {/* TAB 3: CABIN COMFORT & AUDIO */}
        {activeCategory === 'comfort' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#121520] border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <Wind className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white font-display">Bioweapon Defense Mode (HEPA)</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Medical-grade hospital HEPA filter strips 99.97% of particulate exhaust, smog, pollen, and PM2.5 pollution from entering the cabin—essential for Delhi and Mumbai air quality.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#121520] border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <Music className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white font-display">Custom Immersive Sound</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Up to 17 studio-grade speakers with dual dedicated subwoofers and active acoustic glass dampening for high-fidelity audio reproduction without engine drone.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#121520] border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                <Sun className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white font-display">All-Glass Acoustic Roof</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Treated with specialized infrared and ultraviolet reflective coatings to block 98% of solar heat and 100% of UV rays while giving an airy panoramic cabin ambience.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
