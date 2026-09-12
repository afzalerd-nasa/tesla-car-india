import { useState } from 'react';
import { NewsArticle } from '../types/index.ts';
import { 
  Newspaper, 
  Calendar, 
  Tag, 
  ExternalLink, 
  ShieldCheck, 
  ChevronRight,
  X,
  Clock
} from 'lucide-react';

interface NewsSectionProps {
  news: NewsArticle[];
}

export default function NewsSection({ news }: NewsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeArticle, setActiveArticle] = useState<NewsArticle | null>(null);

  const categories = ['All', 'Tesla India', 'Government Policy', 'Charging', 'Showrooms', 'Manufacturing'];

  const filteredNews = selectedCategory === 'All'
    ? news
    : news.filter(n => n.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  return (
    <section id="news" className="py-20 bg-[#090b10] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-xs font-semibold text-red-400 mb-3">
            <Newspaper className="w-3.5 h-3.5" />
            <span>Verified Intelligence & Updates</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
            Tesla India News & Developments
          </h2>
          <p className="text-zinc-400 text-sm mt-2">
            Stay informed with factual, verified coverage of Tesla's Indian market strategy, import tariff concessions, homologation updates, and retail infrastructure.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex items-center justify-center gap-1.5 flex-wrap mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-red-600 text-white font-semibold shadow-md'
                  : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveArticle(item)}
              className="rounded-2xl bg-[#121520] border border-white/10 overflow-hidden flex flex-col justify-between hover:border-white/25 transition-all shadow-xl hover:shadow-2xl group cursor-pointer"
            >
              <div className="space-y-3 p-5">
                {/* Image */}
                {item.imageUrl && (
                  <div className="h-44 w-full rounded-xl overflow-hidden bg-zinc-900 mb-3 -mt-1">
                    <img
                      src={item.imageUrl}
                      alt={item.headline}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                )}

                {/* Category & Date */}
                <div className="flex items-center justify-between text-[11px] text-zinc-400">
                  <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 font-semibold text-red-400 uppercase tracking-wider">
                    {item.category}
                  </span>
                  <span className="flex items-center gap-1 text-zinc-500">
                    <Calendar className="w-3 h-3" />
                    <span>{item.publishedDate}</span>
                  </span>
                </div>

                {/* Headline */}
                <h3 className="text-base font-bold text-white font-display group-hover:text-red-400 transition-colors line-clamp-2">
                  {item.headline}
                </h3>

                {/* Summary */}
                <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed">
                  {item.summary}
                </p>
              </div>

              {/* Card Footer */}
              <div className="p-4 bg-white/5 border-t border-white/5 flex items-center justify-between text-xs">
                <span className="text-[11px] text-zinc-400">Source: <strong className="text-zinc-300">{item.sourceName}</strong></span>
                <span className="text-red-400 font-semibold flex items-center gap-1 text-[11px] group-hover:translate-x-1 transition-transform">
                  <span>Read Brief</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Article Reader Modal */}
        {activeArticle && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#121520] border border-white/15 rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl animate-scaleUp">
              <div className="p-4 border-b border-white/10 flex items-center justify-between bg-[#151926]">
                <div className="flex items-center gap-2 text-xs text-zinc-400">
                  <span className="px-2 py-0.5 rounded bg-red-500/10 text-red-400 font-bold uppercase">
                    {activeArticle.category}
                  </span>
                  <span>•</span>
                  <span>{activeArticle.publishedDate}</span>
                </div>
                <button
                  onClick={() => setActiveArticle(null)}
                  className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
                {activeArticle.imageUrl && (
                  <img
                    src={activeArticle.imageUrl}
                    alt={activeArticle.headline}
                    className="w-full h-56 object-cover rounded-xl border border-white/10"
                  />
                )}

                <h2 className="text-xl sm:text-2xl font-bold text-white font-display leading-snug">
                  {activeArticle.headline}
                </h2>

                <p className="text-zinc-300 leading-relaxed text-sm">
                  {activeArticle.summary}
                </p>

                <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2 text-xs">
                  <div className="flex justify-between text-zinc-400">
                    <span>Source Attribution:</span>
                    <strong className="text-white">{activeArticle.sourceName}</strong>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Authenticity Verification:</span>
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Verified Industry Record
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-white/10 bg-[#0d0f15] flex justify-end">
                <button
                  onClick={() => setActiveArticle(null)}
                  className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold"
                >
                  Close Article
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
