import { Building2, MapPin, ShieldCheck, ExternalLink, Info } from 'lucide-react';
import { SHOWROOM_LOCATIONS } from '../data/teslaDatabase.ts';

export default function ShowroomSection() {
  return (
    <section id="showrooms" className="py-20 bg-[#090b10] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-xs font-semibold text-red-400 mb-3">
            <Building2 className="w-3.5 h-3.5" />
            <span>Corporate & Experience Footprint</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
            Tesla Showrooms & Corporate Entity in India
          </h2>
          <p className="text-zinc-400 text-sm mt-2">
            Verified corporate entity registrations and designated flagship retail locations evaluated for customer handovers in India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SHOWROOM_LOCATIONS.map((loc) => (
            <div
              key={loc.id}
              className="rounded-2xl bg-[#121520] border border-white/10 p-6 space-y-4 flex flex-col justify-between shadow-xl"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-white/5 border border-white/10 text-red-400">
                    {loc.type}
                  </span>
                  <span className={`text-[11px] font-medium flex items-center gap-1 ${
                    loc.isOfficialTeslaEntity ? 'text-emerald-400' : 'text-amber-400'
                  }`}>
                    <ShieldCheck className="w-3 h-3" />
                    <span>{loc.openingStatus}</span>
                  </span>
                </div>

                <h3 className="text-base font-bold text-white font-display">
                  {loc.name}
                </h3>

                <div className="flex items-start gap-2 text-xs text-zinc-300">
                  <MapPin className="w-4 h-4 text-zinc-500 shrink-0 mt-0.5" />
                  <span>{loc.address}</span>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed">
                  {loc.notes}
                </p>
              </div>

              <div className="pt-3 border-t border-white/5 space-y-2 text-xs text-zinc-400">
                <div className="flex items-center gap-2">
                  <Info className="w-3.5 h-3.5 text-zinc-500" />
                  <span className="text-[11px] text-zinc-400">{loc.contactInfo}</span>
                </div>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.mapQuery)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 w-full py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors border border-white/5 cursor-pointer"
                >
                  <span>Locate On Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
