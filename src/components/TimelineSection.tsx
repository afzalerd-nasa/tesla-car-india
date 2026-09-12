import { Calendar, CheckCircle2, Clock, MapPin, Building, Flag } from 'lucide-react';

export default function TimelineSection() {
  const milestones = [
    {
      year: 'Jan 2021',
      title: 'Company Incorporated in Bengaluru',
      desc: 'Tesla officially registered "Tesla India Motors and Energy Private Limited" with the Registrar of Companies (RoC) in Bengaluru, Karnataka.',
      status: 'Completed'
    },
    {
      year: 'Aug 2021',
      title: 'ARAI Homologation of Model 3 & Y',
      desc: 'Automotive Research Association of India (ARAI) granted homologation certificates for 4 Tesla variants (Model 3 & Model Y configurations).',
      status: 'Completed'
    },
    {
      year: 'Mar 2024',
      title: 'New Electric Vehicle (EV) Import Policy Notified',
      desc: 'Government of India notified the Scheme for Promotion of Manufacturing of Electric Passenger Cars, slashing import duty on CBUs from 70-100% down to 15% for manufacturers committing ₹4,150 Cr in local assembly.',
      status: 'Completed'
    },
    {
      year: 'Late 2025',
      title: 'Retail Real Estate & Service Hub Leases',
      desc: 'Site surveys and commercial retail negotiations finalized for flagship experience centers in Mumbai BKC, New Delhi Aerocity, and Bengaluru.',
      status: 'Completed'
    },
    {
      year: '2026',
      title: 'Customer Deliveries & Supercharger Corridor Rollout',
      desc: 'Commencement of customer deliveries for Model 3 and Model Y via the 15% concessional import scheme alongside pilot Superchargers on Mumbai-Pune & Delhi-Jaipur expressways.',
      status: 'Targeted'
    }
  ];

  return (
    <section id="timeline" className="py-20 bg-[#0d0f16] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400 mb-3">
            <Clock className="w-3.5 h-3.5" />
            <span>Chronology of Events</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
            Tesla India Launch & Availability Timeline
          </h2>
          <p className="text-zinc-400 text-sm mt-2">
            The factual trajectory of Tesla's engagement with the Indian government, homologation milestones, and retail readiness.
          </p>
        </div>

        {/* Timeline Horizontal / Vertical Steps */}
        <div className="relative border-l-2 border-white/10 ml-4 md:ml-32 space-y-10">
          {milestones.map((m, idx) => (
            <div key={idx} className="relative pl-6 sm:pl-8 group">
              {/* Dot */}
              <div className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 transition-all ${
                m.status === 'Completed'
                  ? 'bg-emerald-500 border-emerald-400 shadow-lg shadow-emerald-500/50'
                  : 'bg-red-500 border-red-400 animate-ping'
              }`} />

              <div className="p-5 rounded-2xl bg-[#121520] border border-white/10 space-y-2 group-hover:border-white/25 transition-all shadow-xl">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold text-red-400 font-mono tracking-wider">
                    {m.year}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                    m.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
                  }`}>
                    {m.status}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white font-display">
                  {m.title}
                </h3>

                <p className="text-xs text-zinc-400 leading-relaxed">
                  {m.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
