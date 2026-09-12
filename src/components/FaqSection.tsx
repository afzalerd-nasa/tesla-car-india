import { useState } from 'react';
import { FAQItem } from '../types/index.ts';
import { HelpCircle, ChevronDown, ChevronUp, Search, Sparkles } from 'lucide-react';

interface FaqSectionProps {
  faqs: FAQItem[];
}

export default function FaqSection({ faqs }: FaqSectionProps) {
  const [openIds, setOpenIds] = useState<string[]>(['faq-1', 'faq-2', 'faq-3']);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Launch & Price', 'Charging & Range', 'Autopilot & Roads', 'Ownership & Service'];

  const toggleFaq = (id: string) => {
    if (openIds.includes(id)) {
      setOpenIds(openIds.filter(i => i !== id));
    } else {
      setOpenIds([...openIds, id]);
    }
  };

  const filteredFaqs = faqs.filter((f) => {
    const matchesCategory = selectedCategory === 'All' || f.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch = !searchQuery.trim() ||
      f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="faq" className="py-20 bg-[#090b10] border-t border-white/5 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-xs font-semibold text-red-400 mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions? We Have Verified Answers</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-zinc-400 text-sm mt-2">
            Clear, honest, and factual answers to the most common questions regarding Tesla prices, Indian road compatibility, import policies, and charging.
          </p>
        </div>

        {/* Search and Category Filter */}
        <div className="space-y-4 mb-8">
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search questions (e.g. speed breakers, import duty, autopilot)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[#121520] border border-white/10 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 shadow-md"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-red-600 text-white font-semibold'
                    : 'bg-white/5 text-zinc-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = openIds.includes(faq.id);
            return (
              <div
                key={faq.id}
                className="rounded-xl bg-[#121520] border border-white/10 overflow-hidden transition-all shadow-md"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <span className="font-bold text-white text-sm font-display">
                    {faq.question}
                  </span>
                  <div className="p-1 rounded bg-white/5 text-zinc-400 shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-xs sm:text-sm text-zinc-300 leading-relaxed border-t border-white/5 animate-fadeIn">
                    <p className="mt-3 text-zinc-300">
                      {faq.answer}
                    </p>
                    <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-zinc-500">
                      <span>Category: {faq.category}</span>
                      <span className="text-emerald-400 font-medium">Fact-Checked Sept 2026</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {filteredFaqs.length === 0 && (
            <div className="text-center py-10 text-zinc-500 text-xs">
              No questions found matching your search. Try another query or check all categories.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
