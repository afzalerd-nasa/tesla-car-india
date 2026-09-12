import { useState } from 'react';
import { TeslaModel } from '../types/index.ts';
import ModelCard from './ModelCard.tsx';
import { Filter, Info, ShieldCheck } from 'lucide-react';

interface TeslaCarsSectionProps {
  models: TeslaModel[];
  onSelectDetails: (model: TeslaModel) => void;
  onToggleCompare: (model: TeslaModel) => void;
  comparedModelIds: string[];
}

export default function TeslaCarsSection({
  models,
  onSelectDetails,
  onToggleCompare,
  comparedModelIds
}: TeslaCarsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Sedan', 'SUV', 'Pickup', 'Supercar'];

  const filteredModels = selectedCategory === 'All'
    ? models
    : models.filter(m => m.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <section id="models" className="py-20 bg-[#0d0f15] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-red-400 mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Indian Market Lineup & Evaluations</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
              Tesla Electric Vehicles
            </h2>
            <p className="text-zinc-400 text-sm mt-1 max-w-2xl">
              Comprehensive specifications, real-world range, acceleration benchmarks, and estimated Indian pricing for Tesla sedans, SUVs, and future mobility models.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 bg-white/5 border border-white/10 rounded-xl overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-red-600 text-white shadow-md'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Model Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModels.map((model) => (
            <ModelCard
              key={model.id}
              model={model}
              onSelectDetails={onSelectDetails}
              onToggleCompare={onToggleCompare}
              isCompared={comparedModelIds.includes(model.id)}
            />
          ))}
        </div>

        {/* Clarification banner */}
        <div className="mt-12 p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between flex-wrap gap-3 text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-zinc-400 shrink-0" />
            <span>
              <strong>Note on Homologation:</strong> All dimensions, battery capacities, and performance benchmarks represent official worldwide manufacturer data. Indian on-road compliance undergoes ARAI certification.
            </span>
          </div>
          <span className="text-zinc-500 font-medium">Last Verified: September 2026</span>
        </div>
      </div>
    </section>
  );
}
