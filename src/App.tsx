import { useState, useEffect } from 'react';
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import TeslaCarsSection from './components/TeslaCarsSection.tsx';
import PriceSection from './components/PriceSection.tsx';
import RangeSection from './components/RangeSection.tsx';
import ChargingSection from './components/ChargingSection.tsx';
import ChargingNetworkSection from './components/ChargingNetworkSection.tsx';
import CompareSection from './components/CompareSection.tsx';
import RunningCostCalculator from './components/RunningCostCalculator.tsx';
import OnRoadCalculator from './components/OnRoadCalculator.tsx';
import FeaturesSection from './components/FeaturesSection.tsx';
import TimelineSection from './components/TimelineSection.tsx';
import ShowroomSection from './components/ShowroomSection.tsx';
import OwnershipGuide from './components/OwnershipGuide.tsx';
import NewsSection from './components/NewsSection.tsx';
import FaqSection from './components/FaqSection.tsx';
import Footer from './components/Footer.tsx';
import ModelDetailModal from './components/ModelDetailModal.tsx';
import AdminModal from './components/AdminModal.tsx';

import { 
  TESLA_MODELS, 
  CHARGING_STATIONS, 
  NEWS_ARTICLES, 
  FAQS_LIST, 
  COMPARISON_VEHICLES 
} from './data/teslaDatabase.ts';
import { TeslaModel, ChargingStation, NewsArticle } from './types/index.ts';

export default function App() {
  // State management with localStorage persistence for admin modifications
  const [models, setModels] = useState<TeslaModel[]>(() => {
    const saved = localStorage.getItem('tci_models');
    return saved ? JSON.parse(saved) : TESLA_MODELS;
  });

  const [stations, setStations] = useState<ChargingStation[]>(() => {
    const saved = localStorage.getItem('tci_stations');
    return saved ? JSON.parse(saved) : CHARGING_STATIONS;
  });

  const [news, setNews] = useState<NewsArticle[]>(() => {
    const saved = localStorage.getItem('tci_news');
    return saved ? JSON.parse(saved) : NEWS_ARTICLES;
  });

  const [comparedModelIds, setComparedModelIds] = useState<string[]>(['model-3', 'byd-seal', 'hyundai-ioniq-5']);
  const [selectedModelDetail, setSelectedModelDetail] = useState<TeslaModel | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Sync state changes to localStorage
  useEffect(() => {
    localStorage.setItem('tci_models', JSON.stringify(models));
  }, [models]);

  useEffect(() => {
    localStorage.setItem('tci_stations', JSON.stringify(stations));
  }, [stations]);

  useEffect(() => {
    localStorage.setItem('tci_news', JSON.stringify(news));
  }, [news]);

  // Comparison toggle handler
  const handleToggleCompare = (modelOrId: TeslaModel | string) => {
    const id = typeof modelOrId === 'string' ? modelOrId : modelOrId.id;
    setComparedModelIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter(i => i !== id);
      } else {
        if (prev.length >= 3) {
          // Replace last one if 3 are already selected
          return [prev[1], prev[2], id];
        }
        return [...prev, id];
      }
    });
  };

  const handleOpenCompare = () => {
    const el = document.getElementById('compare');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleExploreCars = () => {
    const el = document.getElementById('models');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCalculateCost = () => {
    const el = document.getElementById('running-cost');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenOnRoadCalc = () => {
    const el = document.getElementById('on-road-calculator');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Admin mutation callbacks
  const handleUpdateModelPrice = (modelId: string, newPriceDisplay: string, newPriceInr: number) => {
    setModels(prev => prev.map(m => m.id === modelId ? { ...m, startingPriceDisplay: newPriceDisplay, startingPriceInr: newPriceInr } : m));
  };

  const handleAddNews = (article: NewsArticle) => {
    setNews(prev => [article, ...prev]);
  };

  const handleDeleteNews = (id: string) => {
    setNews(prev => prev.filter(n => n.id !== id));
  };

  const handleAddStation = (station: ChargingStation) => {
    setStations(prev => [station, ...prev]);
  };

  const handleDeleteStation = (id: string) => {
    setStations(prev => prev.filter(s => s.id !== id));
  };

  const handleResetDefaults = () => {
    setModels(TESLA_MODELS);
    setStations(CHARGING_STATIONS);
    setNews(NEWS_ARTICLES);
    localStorage.removeItem('tci_models');
    localStorage.removeItem('tci_stations');
    localStorage.removeItem('tci_news');
  };

  return (
    <div className="min-h-screen bg-[#090b10] text-zinc-100 font-sans selection:bg-red-600 selection:text-white antialiased">
      {/* Top Navigation */}
      <Navbar
        onOpenCompare={handleOpenCompare}
        compareCount={comparedModelIds.length}
        models={models}
        news={news}
        faqs={FAQS_LIST}
        onSelectModel={(m) => setSelectedModelDetail(m)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      <main>
        {/* 1. Hero Section */}
        <Hero
          featuredModel={models[0]}
          onExploreCars={handleExploreCars}
          onCompareModels={handleOpenCompare}
          onCalculateCost={handleCalculateCost}
          onSelectModel={(m) => setSelectedModelDetail(m)}
        />

        {/* 2. Tesla Cars Lineup Section */}
        <TeslaCarsSection
          models={models}
          onSelectDetails={(m) => setSelectedModelDetail(m)}
          onToggleCompare={(m) => handleToggleCompare(m)}
          comparedModelIds={comparedModelIds}
        />

        {/* 3. Tesla Car Price in India Table & Taxation */}
        <PriceSection
          models={models}
          onSelectModel={(m) => setSelectedModelDetail(m)}
          onOpenCalculator={handleOpenOnRoadCalc}
        />

        {/* 4. Real-World Range Simulator */}
        <RangeSection models={models} />

        {/* 5. Charging Guide & Electricity Cost Calculator */}
        <ChargingSection models={models} />

        {/* 6. Charging Network & Verified Hubs */}
        <ChargingNetworkSection stations={stations} />

        {/* 7. Tesla vs Other EV Cars Comparison */}
        <CompareSection
          teslaModels={models}
          comparisonVehicles={COMPARISON_VEHICLES}
          activeModelIds={comparedModelIds}
          onToggleModel={(id) => handleToggleCompare(id)}
        />

        {/* 8. Running Cost Calculator (EV vs Petrol) */}
        <RunningCostCalculator />

        {/* 9. On-Road Price Calculator (State-wise) */}
        <OnRoadCalculator models={models} />

        {/* 10. Technology & Software Features */}
        <FeaturesSection />

        {/* 11. India Launch Timeline */}
        <TimelineSection />

        {/* 12. Showrooms & Corporate Service Centers */}
        <ShowroomSection />

        {/* 13. Comprehensive Ownership Guide */}
        <OwnershipGuide />

        {/* 14. Verified India News & Policy Updates */}
        <NewsSection news={news} />

        {/* 15. FAQ Accordion */}
        <FaqSection faqs={FAQS_LIST} />
      </main>

      {/* Footer with Mandatory Disclaimer */}
      <Footer />

      {/* Modals */}
      <ModelDetailModal
        model={selectedModelDetail}
        onClose={() => setSelectedModelDetail(null)}
        onCompare={(m) => {
          handleToggleCompare(m);
          handleOpenCompare();
          setSelectedModelDetail(null);
        }}
      />

      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        models={models}
        chargingStations={stations}
        news={news}
        faqs={FAQS_LIST}
        onUpdateModelPrice={handleUpdateModelPrice}
        onAddNews={handleAddNews}
        onDeleteNews={handleDeleteNews}
        onAddStation={handleAddStation}
        onDeleteStation={handleDeleteStation}
        onResetDefaults={handleResetDefaults}
      />
    </div>
  );
}
