import { useState } from 'react';
import { 
  ShieldCheck, 
  Home, 
  FileText, 
  Wrench, 
  SunMedium, 
  Coins, 
  Award,
  ChevronRight,
  Check
} from 'lucide-react';

export default function OwnershipGuide() {
  const [activeTab, setActiveTab] = useState<string>('buying');

  const tabs = [
    { id: 'buying', label: '1. Buying & Import Rules', icon: FileText },
    { id: 'home', label: '2. Apartment & Home Charging', icon: Home },
    { id: 'insurance', label: '3. EV Insurance Coverage', icon: ShieldCheck },
    { id: 'maintenance', label: '4. Tyres & Maintenance', icon: Wrench },
    { id: 'battery', label: '5. Battery Care in Summers', icon: SunMedium },
    { id: 'warranty', label: '6. Warranty & Resale', icon: Award }
  ];

  return (
    <section id="ownership" className="py-20 bg-[#0c0e15] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400 mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Complete Buyer's Handbook</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
            Tesla Ownership Guide in India
          </h2>
          <p className="text-zinc-400 text-sm mt-2">
            A practical, realistic walkthrough covering domestic home electrical installation, apartment association permissions, insurance riders, hot weather pack health, and factory warranties.
          </p>
        </div>

        {/* Tab Headers */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 justify-start sm:justify-center">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/20'
                    : 'bg-[#121520] text-zinc-400 hover:text-white border border-white/5 hover:border-white/10'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Panels */}
        <div className="bg-[#121520] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl">
          {activeTab === 'buying' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white font-display">
                Buying a Tesla in India: CBU Import Scheme vs Future Local Assembly
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                Under the March 2024 Ministry of Heavy Industries scheme, manufacturers that invest at least ₹4,150 Crore in Indian production facilities can import up to 8,000 completely built units (CBUs) annually at a reduced customs duty rate of <strong>15%</strong> (for cars priced CIF above $35,000 / ~₹29 Lakh).
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1 text-xs">
                  <span className="font-bold text-emerald-400 block">Concessional CBU (15%)</span>
                  <p className="text-zinc-400">Available to eligible brands with manufacturing commitments. Enables starting price around ₹55-65 Lakh for Model 3 and Model Y.</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1 text-xs">
                  <span className="font-bold text-amber-400 block">Standard CBU (70-100%)</span>
                  <p className="text-zinc-400">Applies to individual private imports outside the scheme. Pushes prices up to ₹1.1 Crore+ due to 100% customs tariff.</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1 text-xs">
                  <span className="font-bold text-blue-400 block">GST Structure</span>
                  <p className="text-zinc-400">All pure electric passenger cars enjoy a flat 5% GST rate with zero luxury compensation cess.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'home' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white font-display">
                Home Charging Setup: Independent Villas vs Apartment Resident Welfare Associations (RWAs)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-zinc-300">
                <div className="space-y-2">
                  <h4 className="font-bold text-white text-sm">Independent House / Villa Setup:</h4>
                  <ul className="space-y-1.5 text-zinc-400 text-xs">
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Sanctioned load: Request 11 kW to 15 kW 3-phase connection from your state DISCOM (e.g. BSES, TATA Power, MSEDCL, BESCOM).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Dedicated copper earthing pit with low earth-resistance (&lt; 2 Ohms) required for Tesla vehicle safety handshake.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Tesla 11 kW Wall Connector charges battery in ~6.5 hours overnight.</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-white text-sm">High-Rise Apartment & Society Guidelines:</h4>
                  <ul className="space-y-1.5 text-zinc-400 text-xs">
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Ministry of Housing and Urban Affairs (MoHUA) model building bye-laws mandate 20% EV-ready parking slots in societies.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Sub-metering cabling routed from your apartment's meter board down to your allotted basement slot.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Equipped with MCB, RCCB, and surge protection devices (SPD).</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'insurance' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white font-display">
                EV Insurance Considerations & Essential Add-On Covers
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300">
                Electric vehicle insurance policies in India require specific add-on covers due to high battery replacement costs and aluminium structural stampings:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 space-y-1">
                  <span className="font-bold text-white block">1. Battery Pack Protector</span>
                  <p className="text-zinc-400">Covers non-accidental water ingress, flooding damage during monsoons, and electrical power surges.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 space-y-1">
                  <span className="font-bold text-white block">2. Zero Depreciation</span>
                  <p className="text-zinc-400">Ensures full compensation for glass, rubber, plastics, and metallic repair parts without depreciation deduction.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 space-y-1">
                  <span className="font-bold text-white block">3. Return to Invoice (RTI)</span>
                  <p className="text-zinc-400">Pays the full original ex-showroom invoice amount including road tax if the car suffers total loss or theft.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 space-y-1">
                  <span className="font-bold text-white block">4. Tyre & Rim Shield</span>
                  <p className="text-zinc-400">Covers alloy damage from deep potholes and sidewall tears on Indian secondary roads.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'maintenance' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white font-display">
                Maintenance Schedule & EV Tyre Replacement
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300">
                With zero engine oil, spark plugs, clutch plates, or timing belts, Tesla routine maintenance costs are up to 75% lower than comparable internal combustion German luxury cars:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1.5">
                  <span className="font-bold text-white block">Brake Fluid & Brake Pads</span>
                  <p className="text-zinc-400">
                    Regenerative braking does 90% of stopping work. Brake pads often last over 100,000 km! Brake fluid test recommended every 2 to 3 years.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1.5">
                  <span className="font-bold text-white block">Cabin Air Filter & AC Service</span>
                  <p className="text-zinc-400">
                    Replace HEPA cabin air filter every 2 years or 30,000 km to maintain optimal dust and PM2.5 filtration in Indian cities.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1.5">
                  <span className="font-bold text-white block">EV-Specific Tyres (Acoustic Foam)</span>
                  <p className="text-zinc-400">
                    Tesla uses tyres featuring sound-absorbing polyurethane foam inside (e.g. Michelin e-Primacy, Hankook iON). Rotate every 10,000 km.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'battery' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white font-display">
                Best Practices for Battery Health During Hot Indian Summers (40°C - 48°C)
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-zinc-300">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Keep it plugged in when parked:</strong> Tesla’s thermal management automatically cools the battery pack even when switched off. When plugged into AC power, it draws current from the grid rather than draining the battery.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Set Daily Charge Limit to 80%:</strong> For NMC / NCA battery packs (Long Range & Plaid trims), keeping daily charging capped at 80% maximizes cell chemistry life. Charge to 100% only prior to highway road trips. Standard Range LFP packs can be charged to 100% weekly.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Pre-Cool Before Departure:</strong> Activate cabin climate via the Tesla App 10 minutes before starting your trip while still connected to your home charger.</span>
                </li>
              </ul>
            </div>
          )}

          {activeTab === 'warranty' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white font-display">
                Official Tesla Factory Warranty Terms & Projected EV Resale
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-zinc-300">
                <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
                  <h4 className="font-bold text-emerald-400 text-sm">Comprehensive Factory Warranty:</h4>
                  <ul className="space-y-1.5 text-xs text-zinc-400">
                    <li>• <strong>Basic Vehicle:</strong> 4 Years or 80,000 km (whichever comes first)</li>
                    <li>• <strong>Battery & Drive Unit (RWD):</strong> 8 Years or 160,000 km with minimum 70% retention</li>
                    <li>• <strong>Battery & Drive Unit (AWD / Plaid):</strong> 8 Years or 192,000 km with minimum 70% retention</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
                  <h4 className="font-bold text-blue-400 text-sm">Depreciation & Second-Hand Market:</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Electric vehicles in India typically retain 65-70% value after 3 years. Because Tesla models receive continuous OTA software features and maintain minimal battery degradation, global residual values rank among the highest in the luxury vehicle segment.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
