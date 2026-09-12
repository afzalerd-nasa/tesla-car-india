import { useState, useEffect } from 'react';
import { 
  Zap, 
  Search, 
  Layers, 
  Menu, 
  X, 
  Shield, 
  SlidersHorizontal,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { TeslaModel, NewsArticle, FAQItem } from '../types/index.ts';

interface NavbarProps {
  onOpenCompare: () => void;
  compareCount: number;
  models: TeslaModel[];
  news: NewsArticle[];
  faqs: FAQItem[];
  onSelectModel: (model: TeslaModel) => void;
  onOpenAdmin: () => void;
}

export default function Navbar({
  onOpenCompare,
  compareCount,
  models,
  news,
  faqs,
  onSelectModel,
  onOpenAdmin
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Tesla Cars', href: '#models' },
    { name: 'Prices', href: '#prices' },
    { name: 'Compare', href: '#compare' },
    { name: 'Charging', href: '#charging' },
    { name: 'Features', href: '#features' },
    { name: 'News', href: '#news' },
    { name: 'Ownership', href: '#ownership' },
    { name: 'FAQ', href: '#faq' }
  ];

  // Search results
  const filteredModels = searchQuery.trim()
    ? models.filter(m => m.name.toLowerCase().includes(searchQuery.toLowerCase()) || m.category.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];
  const filteredNews = searchQuery.trim()
    ? news.filter(n => n.headline.toLowerCase().includes(searchQuery.toLowerCase()) || n.summary.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];
  const filteredFaqs = searchQuery.trim()
    ? faqs.filter(f => f.question.toLowerCase().includes(searchQuery.toLowerCase()) || f.answer.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header 
        id="main-header" 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#0b0c10]/95 backdrop-blur-md border-b border-white/10 shadow-2xl py-3' 
            : 'bg-gradient-to-b from-[#0b0c10]/90 via-[#0b0c10]/60 to-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Brand */}
          <a 
            href="#home" 
            className="flex items-center gap-2.5 group focus:outline-none"
            id="brand-logo-link"
          >
            <div className="w-9 h-9 rounded-lg bg-red-600 flex items-center justify-center text-white font-bold tracking-widest shadow-lg shadow-red-600/30 group-hover:bg-red-500 transition-colors">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-white font-display flex items-center gap-1.5">
                TESLA <span className="text-red-500 text-xs font-semibold uppercase px-1.5 py-0.5 rounded bg-red-500/10 border border-red-500/20">India</span>
              </span>
              <span className="text-[10px] text-zinc-400 font-medium tracking-wide">
                Electric Mobility Portal
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-1 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-sm">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                className="px-3 py-1.5 text-xs font-medium text-zinc-300 hover:text-white hover:bg-white/10 rounded-full transition-all cursor-pointer"
                id={`nav-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* Actions: Search, Compare Button, Admin & Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-colors flex items-center gap-2 text-xs font-medium px-3 cursor-pointer"
              title="Search cars, news, specs"
              id="search-button-trigger"
            >
              <Search className="w-4 h-4 text-zinc-400" />
              <span className="hidden md:inline text-zinc-400">Search portal...</span>
            </button>

            {/* Compare Button */}
            <button
              onClick={onOpenCompare}
              className="relative p-2 text-zinc-200 hover:text-white bg-zinc-800/80 hover:bg-zinc-700/80 border border-white/10 rounded-full transition-all flex items-center gap-1.5 px-3 text-xs font-medium cursor-pointer"
              id="compare-nav-button"
            >
              <Layers className="w-4 h-4 text-red-400" />
              <span className="hidden sm:inline">Compare</span>
              {compareCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-red-600 text-white text-[11px] font-bold flex items-center justify-center animate-pulse">
                  {compareCount}
                </span>
              )}
            </button>

            {/* Admin Portal Quick Access */}
            <button
              onClick={onOpenAdmin}
              className="hidden lg:flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 px-2.5 py-2 rounded-full border border-white/10 transition-colors"
              title="Portal Data Management"
              id="admin-nav-button"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span className="text-[11px]">Admin</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors cursor-pointer"
              id="mobile-menu-toggle"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-[#0d0f14]/98 border-b border-white/10 px-4 pt-3 pb-6 space-y-2 mt-2 shadow-2xl backdrop-blur-xl animate-fadeIn">
            <div className="grid grid-cols-2 gap-2 pt-2">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left px-3 py-2.5 text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/5 rounded-lg border border-transparent hover:border-white/10 transition-all"
                >
                  {link.name}
                </button>
              ))}
            </div>
            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="flex items-center gap-2 text-xs text-zinc-400 hover:text-white py-2"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Admin Management Panel</span>
              </button>
              <span className="text-[11px] text-zinc-500">Updated Sept 2026</span>
            </div>
          </div>
        )}
      </header>

      {/* Global Instant Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-start justify-center pt-20 px-4">
          <div className="bg-[#12151d] border border-white/20 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl animate-scaleUp">
            <div className="p-4 border-b border-white/10 flex items-center gap-3">
              <Search className="w-5 h-5 text-red-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Model 3, Model Y, prices, range, Superchargers, FAQs..."
                className="w-full bg-transparent text-white placeholder-zinc-500 text-sm focus:outline-none"
                autoFocus
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="p-1.5 text-zinc-400 hover:text-white rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4 text-xs">
              {!searchQuery.trim() ? (
                <div className="text-zinc-500 text-center py-8">
                  <p className="font-medium text-zinc-400">Instant Search Across All Tesla India Information</p>
                  <p className="text-[11px] mt-1">Try typing "Model Y price", "ground clearance", "Supercharger Delhi", or "import duty".</p>
                </div>
              ) : (
                <>
                  {filteredModels.length > 0 && (
                    <div>
                      <div className="text-[11px] font-semibold tracking-wider text-red-400 uppercase mb-2">Tesla Models</div>
                      <div className="space-y-1.5">
                        {filteredModels.map((m) => (
                          <div
                            key={m.id}
                            onClick={() => {
                              onSelectModel(m);
                              setSearchOpen(false);
                            }}
                            className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-between cursor-pointer border border-white/5 hover:border-white/20 transition-all"
                          >
                            <div className="flex items-center gap-3">
                              <img src={m.heroImage} alt={m.name} className="w-10 h-7 object-cover rounded" />
                              <div>
                                <div className="font-semibold text-white">{m.name}</div>
                                <div className="text-[11px] text-zinc-400">{m.category} • {m.startingPriceDisplay}</div>
                              </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-zinc-400" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {filteredNews.length > 0 && (
                    <div>
                      <div className="text-[11px] font-semibold tracking-wider text-emerald-400 uppercase mb-2">News & Policy</div>
                      <div className="space-y-1.5">
                        {filteredNews.map((n) => (
                          <a
                            key={n.id}
                            href="#news"
                            onClick={() => setSearchOpen(false)}
                            className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 block border border-white/5 hover:border-white/20 transition-all"
                          >
                            <div className="font-medium text-white">{n.headline}</div>
                            <div className="text-[11px] text-zinc-400 mt-0.5">{n.category} • {n.sourceName}</div>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {filteredFaqs.length > 0 && (
                    <div>
                      <div className="text-[11px] font-semibold tracking-wider text-sky-400 uppercase mb-2">Frequently Asked Questions</div>
                      <div className="space-y-1.5">
                        {filteredFaqs.map((f) => (
                          <a
                            key={f.id}
                            href="#faq"
                            onClick={() => setSearchOpen(false)}
                            className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 block border border-white/5 hover:border-white/20 transition-all"
                          >
                            <div className="font-medium text-white">{f.question}</div>
                            <div className="text-[11px] text-zinc-400 line-clamp-1 mt-0.5">{f.answer}</div>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {filteredModels.length === 0 && filteredNews.length === 0 && filteredFaqs.length === 0 && (
                    <div className="text-center py-6 text-zinc-500">
                      No exact match found for "{searchQuery}". Try a different keyword.
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
