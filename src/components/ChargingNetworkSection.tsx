import { useState } from 'react';
import { ChargingStation } from '../types/index.ts';
import { 
  MapPin, 
  Zap, 
  Search, 
  Navigation, 
  ShieldCheck, 
  Clock, 
  ExternalLink,
  Building,
  Radio
} from 'lucide-react';

interface ChargingNetworkSectionProps {
  stations: ChargingStation[];
}

export default function ChargingNetworkSection({ stations }: ChargingNetworkSectionProps) {
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [stationTypeFilter, setStationTypeFilter] = useState<'All' | 'Supercharger' | 'CCS2 Public'>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const cities = ['All', 'Delhi NCR', 'Mumbai', 'Bengaluru', 'Hyderabad', 'Chennai', 'Pune', 'Ahmedabad', 'Kolkata'];

  const filteredStations = stations.filter((st) => {
    const matchesCity = selectedCity === 'All' || st.city.toLowerCase().includes(selectedCity.toLowerCase());
    const matchesType = stationTypeFilter === 'All' 
      ? true 
      : stationTypeFilter === 'Supercharger'
        ? st.chargerType.toLowerCase().includes('supercharger')
        : st.chargerType.toLowerCase().includes('ccs2');
    const matchesSearch = !searchQuery.trim() || 
      st.locationName.toLowerCase().includes(searchQuery.toLowerCase()) || 
      st.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCity && matchesType && matchesSearch;
  });

  return (
    <section id="network" className="py-20 bg-[#090b10] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-xs font-semibold text-red-400 mb-3">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>Charging Directory & Locations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
            Tesla Charging Network in India
          </h2>
          <p className="text-zinc-400 text-sm mt-2">
            Explore verified operational partner CCS2 fast chargers and proposed Tesla Supercharger hub locations across major Indian metropolitan cities and expressways.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-[#12151e] border border-white/10 rounded-2xl p-4 sm:p-5 mb-8 shadow-xl space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search station, mall, expressway..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
              />
            </div>

            {/* Type Filters */}
            <div className="flex items-center gap-2 w-full md:w-auto justify-end">
              <span className="text-xs text-zinc-400 font-semibold">Network:</span>
              {(['All', 'Supercharger', 'CCS2 Public'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setStationTypeFilter(type)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    stationTypeFilter === type
                      ? 'bg-red-600 text-white'
                      : 'bg-white/5 text-zinc-400 hover:text-white'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* City Pills Horizontal Scroll */}
          <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-white/5 scrollbar-thin">
            <span className="text-xs text-zinc-400 font-semibold shrink-0 mr-1">City:</span>
            {cities.map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  selectedCity === city
                    ? 'bg-white text-zinc-950 font-bold shadow-md'
                    : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* Stations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredStations.map((station) => {
            const isProposed = !station.isVerifiedOperational;

            return (
              <div
                key={station.id}
                className="rounded-xl bg-[#12151e] border border-white/10 p-5 space-y-4 flex flex-col justify-between hover:border-white/25 transition-all shadow-lg group"
              >
                <div className="space-y-2.5">
                  {/* Status & Power Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 ${
                      isProposed
                        ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                        : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    }`}>
                      {isProposed ? <Clock className="w-3 h-3" /> : <ShieldCheck className="w-3 h-3" />}
                      <span>{station.status}</span>
                    </span>

                    <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white font-mono text-xs font-bold">
                      {station.chargingSpeedKw} kW
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-white font-display group-hover:text-red-400 transition-colors">
                    {station.locationName}
                  </h3>

                  {/* Address */}
                  <div className="flex items-start gap-2 text-xs text-zinc-400">
                    <MapPin className="w-3.5 h-3.5 text-zinc-500 shrink-0 mt-0.5" />
                    <span className="line-clamp-2">{station.address}, {station.city}</span>
                  </div>
                </div>

                {/* Stalls & Provider Meta */}
                <div className="pt-3 border-t border-white/5 space-y-2 text-xs">
                  <div className="flex justify-between text-zinc-400">
                    <span>Charger Standard:</span>
                    <span className="font-medium text-zinc-200">{station.chargerType}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Available Stalls:</span>
                    <span className="font-semibold text-white">{station.stallsCount} Bays</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Connector:</span>
                    <span className="font-medium text-zinc-300">{station.connectorType}</span>
                  </div>

                  {/* Navigation Action */}
                  <a
                    href={station.navigationUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(station.locationName + ' ' + station.address + ' ' + station.city)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 w-full py-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Navigation className="w-3.5 h-3.5 text-red-400" />
                    <span>Open in Maps</span>
                    <ExternalLink className="w-3 h-3 text-zinc-500" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Informational Guidance Notice */}
        <div className="mt-8 p-4 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3 text-xs text-zinc-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <strong>Authenticity Rule:</strong> Verified operational stations indicate existing third-party CCS2 chargers fully tested with electric vehicles in India. "Proposed Tesla Supercharger" locations represent officially surveyed highway corridors and metro hubs aligned with Tesla India's retail rollout plans.
          </div>
        </div>
      </div>
    </section>
  );
}
