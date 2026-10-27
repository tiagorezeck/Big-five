import React, { useState } from 'react';
import { X, Search, Layers, Sparkles, CheckCircle2, Users, Heart, ShieldAlert } from 'lucide-react';
import { RAW_TEMPLATES, DOMAINS_META } from '../data/bigfiveData';
import { DomainKey } from '../types/bigfive';

interface FacetsExplorerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FacetsExplorerModal: React.FC<FacetsExplorerModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedDomain, setSelectedDomain] = useState<DomainKey | 'ALL'>('ALL');

  if (!isOpen) return null;

  const domainsOrder: DomainKey[] = ['O', 'C', 'E', 'A', 'N'];

  const getDomainIcon = (key: DomainKey) => {
    switch (key) {
      case 'O': return <Sparkles className="w-4 h-4 text-sky-600" />;
      case 'C': return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
      case 'E': return <Users className="w-4 h-4 text-amber-600" />;
      case 'A': return <Heart className="w-4 h-4 text-purple-600" />;
      case 'N': return <ShieldAlert className="w-4 h-4 text-rose-600" />;
    }
  };

  // Flatten all 30 facets with their domain info
  const allFacets = domainsOrder.flatMap(dKey => {
    const template = RAW_TEMPLATES.find(t => t.domain === dKey);
    const meta = DOMAINS_META[dKey];
    if (!template) return [];

    return template.facets.map(f => ({
      domain: dKey,
      domainTitle: template.title,
      facetNumber: f.facet,
      title: f.title,
      text: f.text,
      color: meta.color
    }));
  });

  const filteredFacets = allFacets.filter(f => {
    const matchesDomain = selectedDomain === 'ALL' || f.domain === selectedDomain;
    const term = searchTerm.toLowerCase();
    const matchesSearch = !searchTerm || 
      f.title.toLowerCase().includes(term) ||
      f.text.toLowerCase().includes(term) ||
      f.domainTitle.toLowerCase().includes(term);

    return matchesDomain && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Glossário das 30 Facetas de Personalidade
              </h3>
              <p className="text-xs text-slate-500">
                Explore os 30 traços comportamentais específicos que compõem o Modelo Big Five
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filters & Search */}
        <div className="p-4 sm:p-6 bg-slate-50 border-b border-slate-200 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por faceta (ex: Ansiedade, Empatia, Ordem, Altruísmo)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <button
              onClick={() => setSelectedDomain('ALL')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                selectedDomain === 'ALL'
                  ? 'bg-slate-900 text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              Todas (30)
            </button>
            {domainsOrder.map(dKey => {
              const meta = DOMAINS_META[dKey];
              const isSelected = selectedDomain === dKey;
              return (
                <button
                  key={dKey}
                  onClick={() => setSelectedDomain(dKey)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    isSelected
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {getDomainIcon(dKey)}
                  <span>{meta.name.split(' ')[0]} (6)</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Facets Grid Scrollable */}
        <div className="p-6 overflow-y-auto space-y-4">
          {filteredFacets.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-sm">
              Nenhuma faceta encontrada com o termo "{searchTerm}".
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredFacets.map((facet, idx) => (
                <div
                  key={`${facet.domain}-${facet.facetNumber}`}
                  className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 transition space-y-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full inline-block shrink-0"
                        style={{ backgroundColor: facet.color }}
                      />
                      <h4 className="font-bold text-slate-900 text-sm">
                        {facet.title}
                      </h4>
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                      {facet.domainTitle.split(' ')[0]} #{facet.facetNumber}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">
                    {facet.text}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span>Mostrando {filteredFacets.length} de 30 facetas</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
