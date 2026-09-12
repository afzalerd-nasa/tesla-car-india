import React, { useState } from 'react';
import { 
  X, 
  SlidersHorizontal, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  Save, 
  RotateCcw, 
  ShieldCheck,
  Building,
  Newspaper,
  Zap,
  HelpCircle,
  Car
} from 'lucide-react';
import { TeslaModel, ChargingStation, NewsArticle, FAQItem } from '../types/index.ts';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  models: TeslaModel[];
  chargingStations: ChargingStation[];
  news: NewsArticle[];
  faqs: FAQItem[];
  onUpdateModelPrice: (modelId: string, newPriceDisplay: string, newPriceInr: number) => void;
  onAddNews: (article: NewsArticle) => void;
  onDeleteNews: (id: string) => void;
  onAddStation: (station: ChargingStation) => void;
  onDeleteStation: (id: string) => void;
  onResetDefaults: () => void;
}

export default function AdminModal({
  isOpen,
  onClose,
  models,
  chargingStations,
  news,
  faqs,
  onUpdateModelPrice,
  onAddNews,
  onDeleteNews,
  onAddStation,
  onDeleteStation,
  onResetDefaults
}: AdminModalProps) {
  const [activeTab, setActiveTab] = useState<'models' | 'news' | 'stations' | 'faq'>('models');
  
  // Model Edit state
  const [editingModelId, setEditingModelId] = useState<string | null>(null);
  const [editPriceDisplay, setEditPriceDisplay] = useState<string>('');
  const [editPriceInr, setEditPriceInr] = useState<number>(0);

  // New Article Form
  const [newsHeadline, setNewsHeadline] = useState('');
  const [newsCategory, setNewsCategory] = useState('Tesla India');
  const [newsSummary, setNewsSummary] = useState('');
  const [newsSource, setNewsSource] = useState('Reuters / MoHI');

  // New Station Form
  const [stationName, setStationName] = useState('');
  const [stationCity, setStationCity] = useState('Delhi NCR');
  const [stationAddress, setStationAddress] = useState('');
  const [stationSpeed, setStationSpeed] = useState(150);
  const [stationType, setStationType] = useState('Verified Public CCS2 Hub');
  const [stationStatus, setStationStatus] = useState('Operational (Partner CCS2)');

  if (!isOpen) return null;

  const handleStartEditModel = (model: TeslaModel) => {
    setEditingModelId(model.id);
    setEditPriceDisplay(model.startingPriceDisplay);
    setEditPriceInr(model.startingPriceInrMin);
  };

  const handleSaveModel = (modelId: string) => {
    onUpdateModelPrice(modelId, editPriceDisplay, editPriceInr);
    setEditingModelId(null);
  };

  const handleCreateNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsHeadline.trim() || !newsSummary.trim()) return;
    const newArticle: NewsArticle = {
      id: `news-${Date.now()}`,
      headline: newsHeadline,
      slug: newsHeadline.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category: newsCategory as any,
      publishedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      summary: newsSummary,
      fullContent: newsSummary,
      sourceName: newsSource,
      sourceUrl: 'https://pib.gov.in',
      verifiedStatus: 'Verified Official',
      imageUrl: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=600&q=80'
    };
    onAddNews(newArticle);
    setNewsHeadline('');
    setNewsSummary('');
  };

  const handleCreateStation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!stationName.trim() || !stationAddress.trim()) return;
    const newStation: ChargingStation = {
      id: `station-${Date.now()}`,
      city: stationCity,
      state: stationCity,
      locationName: stationName,
      chargerType: stationType as any,
      chargingSpeedKw: stationSpeed,
      stallsCount: 4,
      status: stationStatus.includes('Operational') ? 'Operational (Partner CCS2)' : 'Proposed / In Dialogue',
      isVerifiedOperational: stationStatus.includes('Operational'),
      address: stationAddress,
      latitude: 28.6139,
      longitude: 77.2090,
      connectorType: 'CCS2 Dual Gun',
      navigationUrl: `https://maps.google.com/?q=${encodeURIComponent(stationName + ' ' + stationAddress)}`,
      notes: 'Added via Admin portal management'
    };
    onAddStation(newStation);
    setStationName('');
    setStationAddress('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        id="admin-dashboard-modal"
        className="bg-[#10131b] border border-white/15 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl"
      >
        {/* Modal Top Bar */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-[#141823]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-red-600/20 border border-red-500/30 text-red-400 flex items-center justify-center">
              <SlidersHorizontal className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-white font-display">
                Portal Management & Data Admin
              </h2>
              <span className="text-xs text-zinc-400">
                Tesla Cars India Independent Portal Control Center
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onResetDefaults}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-white/10"
              title="Reset all content to verified baseline data"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
              <span>Reset Data</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Headers */}
        <div className="flex items-center gap-2 px-5 py-2.5 border-b border-white/10 bg-[#0d0f15] overflow-x-auto">
          {[
            { id: 'models', label: 'Models & Prices', icon: Car },
            { id: 'news', label: 'News & Announcements', icon: Newspaper },
            { id: 'stations', label: 'Charging Directory', icon: Zap },
            { id: 'faq', label: 'FAQs List', icon: HelpCircle }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-red-600 text-white shadow-md'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-xs">
          {/* TAB 1: MODELS */}
          {activeTab === 'models' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white font-display">Manage Model Pricing & Status</h3>
                  <p className="text-zinc-400 text-[11px]">Update starting ex-showroom estimates and view homologation status.</p>
                </div>
              </div>

              <div className="rounded-xl border border-white/10 overflow-hidden bg-white/5">
                <table className="w-full text-left">
                  <thead className="bg-white/5 text-[11px] font-semibold text-zinc-400 uppercase">
                    <tr>
                      <th className="p-3">Model</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Current Display Price</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {models.map((m) => (
                      <tr key={m.id} className="hover:bg-white/5">
                        <td className="p-3 font-semibold text-white">{m.name}</td>
                        <td className="p-3 text-zinc-300">{m.category}</td>
                        <td className="p-3 text-zinc-200 font-mono">
                          {editingModelId === m.id ? (
                            <div className="flex items-center gap-2">
                              <input
                                type="text"
                                value={editPriceDisplay}
                                onChange={(e) => setEditPriceDisplay(e.target.value)}
                                className="p-1 rounded bg-black/50 border border-white/20 text-white text-xs w-36"
                              />
                              <input
                                type="number"
                                value={editPriceInr}
                                onChange={(e) => setEditPriceInr(Number(e.target.value))}
                                className="p-1 rounded bg-black/50 border border-white/20 text-white text-xs w-28 font-mono"
                              />
                            </div>
                          ) : (
                            m.startingPriceDisplay
                          )}
                        </td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-white/5 border border-white/10 text-amber-300">
                            {m.dataStatus}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          {editingModelId === m.id ? (
                            <button
                              onClick={() => handleSaveModel(m.id)}
                              className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1 ml-auto cursor-pointer"
                            >
                              <Save className="w-3.5 h-3.5" />
                              <span>Save</span>
                            </button>
                          ) : (
                            <button
                              onClick={() => handleStartEditModel(m)}
                              className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1 ml-auto cursor-pointer"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              <span>Edit</span>
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: NEWS */}
          {activeTab === 'news' && (
            <div className="space-y-6">
              {/* Add New Article Form */}
              <form onSubmit={handleCreateNews} className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
                <h3 className="font-bold text-white text-sm font-display flex items-center gap-1.5">
                  <Plus className="w-4 h-4 text-red-500" />
                  <span>Publish New Market Update / Policy News</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Headline (e.g. Tesla Secures Lease in Aerocity Delhi)"
                    value={newsHeadline}
                    onChange={(e) => setNewsHeadline(e.target.value)}
                    className="p-2 rounded-lg bg-black/50 border border-white/10 text-white text-xs focus:outline-none focus:border-red-500"
                    required
                  />
                  <div className="flex gap-2">
                    <select
                      value={newsCategory}
                      onChange={(e) => setNewsCategory(e.target.value)}
                      className="p-2 rounded-lg bg-black/50 border border-white/10 text-white text-xs focus:outline-none"
                    >
                      <option value="Tesla India">Tesla India</option>
                      <option value="Government Policy">Government Policy</option>
                      <option value="Charging">Charging</option>
                      <option value="Showrooms">Showrooms</option>
                      <option value="Manufacturing">Manufacturing</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Source Name"
                      value={newsSource}
                      onChange={(e) => setNewsSource(e.target.value)}
                      className="p-2 rounded-lg bg-black/50 border border-white/10 text-white text-xs flex-1"
                    />
                  </div>
                </div>
                <textarea
                  rows={2}
                  placeholder="Summary text of the verified announcement..."
                  value={newsSummary}
                  onChange={(e) => setNewsSummary(e.target.value)}
                  className="w-full p-2 rounded-lg bg-black/50 border border-white/10 text-white text-xs focus:outline-none focus:border-red-500"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-semibold text-xs transition-colors cursor-pointer"
                >
                  Publish News Entry
                </button>
              </form>

              {/* News Articles List */}
              <div className="space-y-2">
                <h4 className="font-bold text-white text-xs uppercase tracking-wider">Active News Articles ({news.length})</h4>
                <div className="divide-y divide-white/5 border border-white/10 rounded-xl overflow-hidden bg-white/5">
                  {news.map((n) => (
                    <div key={n.id} className="p-3 flex items-center justify-between gap-4">
                      <div className="space-y-0.5">
                        <div className="font-bold text-white">{n.headline}</div>
                        <div className="text-[11px] text-zinc-400">{n.category} • {n.publishedDate} • {n.sourceName}</div>
                      </div>
                      <button
                        onClick={() => onDeleteNews(n.id)}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-red-950/40 text-zinc-400 hover:text-red-400 transition-colors"
                        title="Delete article"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CHARGING STATIONS */}
          {activeTab === 'stations' && (
            <div className="space-y-6">
              {/* Add Station Form */}
              <form onSubmit={handleCreateStation} className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
                <h3 className="font-bold text-white text-sm font-display flex items-center gap-1.5">
                  <Plus className="w-4 h-4 text-emerald-400" />
                  <span>Register Charging Hub / Proposed Location</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    placeholder="Station Name (e.g. Aerocity Fast Hub)"
                    value={stationName}
                    onChange={(e) => setStationName(e.target.value)}
                    className="p-2 rounded-lg bg-black/50 border border-white/10 text-white text-xs"
                    required
                  />
                  <select
                    value={stationCity}
                    onChange={(e) => setStationCity(e.target.value)}
                    className="p-2 rounded-lg bg-black/50 border border-white/10 text-white text-xs"
                  >
                    <option value="Delhi NCR">Delhi NCR</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Bengaluru">Bengaluru</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Pune">Pune</option>
                    <option value="Ahmedabad">Ahmedabad</option>
                    <option value="Kolkata">Kolkata</option>
                  </select>
                  <input
                    type="number"
                    placeholder="Speed in kW"
                    value={stationSpeed}
                    onChange={(e) => setStationSpeed(Number(e.target.value))}
                    className="p-2 rounded-lg bg-black/50 border border-white/10 text-white text-xs font-mono"
                    required
                  />
                </div>
                <input
                  type="text"
                  placeholder="Complete Address / Landmark"
                  value={stationAddress}
                  onChange={(e) => setStationAddress(e.target.value)}
                  className="w-full p-2 rounded-lg bg-black/50 border border-white/10 text-white text-xs"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors cursor-pointer"
                >
                  Save Station to Directory
                </button>
              </form>

              {/* Stations List */}
              <div className="space-y-2">
                <h4 className="font-bold text-white text-xs uppercase tracking-wider">Registered Charging Locations ({chargingStations.length})</h4>
                <div className="divide-y divide-white/5 border border-white/10 rounded-xl overflow-hidden bg-white/5">
                  {chargingStations.map((st) => (
                    <div key={st.id} className="p-3 flex items-center justify-between gap-4">
                      <div className="space-y-0.5">
                        <div className="font-bold text-white">{st.locationName} ({st.city})</div>
                        <div className="text-[11px] text-zinc-400">{st.address} • {st.chargingSpeedKw} kW • {st.status}</div>
                      </div>
                      <button
                        onClick={() => onDeleteStation(st.id)}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-red-950/40 text-zinc-400 hover:text-red-400 transition-colors"
                        title="Delete station"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: FAQ */}
          {activeTab === 'faq' && (
            <div className="space-y-3">
              <h3 className="font-bold text-white text-sm font-display">Active FAQ Knowledge Base ({faqs.length} items)</h3>
              <div className="space-y-2">
                {faqs.map((f) => (
                  <div key={f.id} className="p-3 rounded-lg bg-white/5 border border-white/5">
                    <div className="font-semibold text-white">{f.question}</div>
                    <div className="text-[11px] text-zinc-400 mt-1 line-clamp-2">{f.answer}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
