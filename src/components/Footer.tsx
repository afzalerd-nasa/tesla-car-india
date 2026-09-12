import { Zap, ShieldAlert, Heart, ExternalLink, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#07080c] border-t border-white/10 pt-16 pb-12 text-xs text-zinc-400 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1: Brand & Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white font-bold tracking-widest shadow-md shadow-red-600/30">
                <Zap className="w-4 h-4 fill-current" />
              </div>
              <span className="text-lg font-bold text-white font-display">
                TESLA <span className="text-red-500 text-xs font-semibold uppercase px-1.5 py-0.5 rounded bg-red-500/10 border border-red-500/20">India</span>
              </span>
            </div>

            <p className="text-xs text-zinc-400 max-w-sm leading-relaxed">
              India's premier independent information and data portal for Tesla electric vehicles. Providing verified specifications, real-world range simulations, charging guides, and state-wise on-road price estimates.
            </p>

            <div className="text-[11px] text-zinc-500">
              Updated for the 2026 Indian Electric Vehicle Policy & Homologation standards.
            </div>
          </div>

          {/* Col 2: Tesla Models */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider font-display">
              Tesla Models
            </h4>
            <ul className="space-y-2">
              <li><a href="#models" className="hover:text-white transition-colors">Tesla Model 3</a></li>
              <li><a href="#models" className="hover:text-white transition-colors">Tesla Model Y</a></li>
              <li><a href="#models" className="hover:text-white transition-colors">Tesla Model S Plaid</a></li>
              <li><a href="#models" className="hover:text-white transition-colors">Tesla Model X</a></li>
              <li><a href="#models" className="hover:text-white transition-colors">Tesla Cybertruck</a></li>
              <li><a href="#models" className="hover:text-white transition-colors">Tesla Roadster</a></li>
            </ul>
          </div>

          {/* Col 3: Calculators & Tools */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider font-display">
              Tools & Guides
            </h4>
            <ul className="space-y-2">
              <li><a href="#prices" className="hover:text-white transition-colors">Price Comparison</a></li>
              <li><a href="#range" className="hover:text-white transition-colors">Real-World Range Simulator</a></li>
              <li><a href="#charging" className="hover:text-white transition-colors">Charging Cost Calculator</a></li>
              <li><a href="#running-cost" className="hover:text-white transition-colors">EV vs Petrol Savings</a></li>
              <li><a href="#on-road-calculator" className="hover:text-white transition-colors">On-Road State Calculator</a></li>
              <li><a href="#compare" className="hover:text-white transition-colors">Tesla vs Competitors</a></li>
            </ul>
          </div>

          {/* Col 4: Network & Legal */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider font-display">
              Information
            </h4>
            <ul className="space-y-2">
              <li><a href="#network" className="hover:text-white transition-colors">Charging Directory</a></li>
              <li><a href="#showrooms" className="hover:text-white transition-colors">Showroom Hubs</a></li>
              <li><a href="#timeline" className="hover:text-white transition-colors">India Launch Timeline</a></li>
              <li><a href="#ownership" className="hover:text-white transition-colors">Ownership Handbook</a></li>
              <li><a href="#news" className="hover:text-white transition-colors">Policy News</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">FAQ Knowledge Base</a></li>
            </ul>
          </div>
        </div>

        {/* Mandatory Independent Website Disclaimer Banner */}
        <div className="p-4 rounded-xl bg-[#11131a] border border-amber-500/20 text-xs text-zinc-400 space-y-2">
          <div className="flex items-center gap-2 text-amber-400 font-semibold">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>Independent Legal Disclaimer</span>
          </div>
          <p className="text-zinc-300 font-medium">
            <strong>Tesla Cars India is an independent informational website and is not affiliated with Tesla, Inc.</strong>
          </p>
          <p className="text-[11px] text-zinc-500 leading-relaxed">
            All brand names, model trademarks, logos, and imagery remain the property of Tesla, Inc. Pricing estimates displayed on this website are modeled according to the Government of India Ministry of Heavy Industries scheme for manufacturing electric passenger cars and standard state motor vehicle taxation guidelines.
          </p>
        </div>

        {/* Bottom Strip */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <div>
            © {new Date().getFullYear()} Tesla Cars India. Independent portal for Indian electric vehicle enthusiasts.
          </div>

          <button
            onClick={scrollToTop}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
