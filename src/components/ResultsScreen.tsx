import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Printer, 
  Share2, 
  Download, 
  Copy, 
  Check, 
  RotateCcw, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  CheckCircle2, 
  Users, 
  Heart, 
  ShieldAlert, 
  BarChart3, 
  Briefcase, 
  MessageSquare, 
  Lightbulb, 
  Award,
  Layers,
  ArrowRight
} from 'lucide-react';
import { BigFiveResult, DomainKey, DomainResult, FacetResult } from '../types/bigfive';
import { DOMAINS_META } from '../data/bigfiveData';
import { RadarChart } from './RadarChart';

interface ResultsScreenProps {
  results: BigFiveResult;
  onRetake: () => void;
  onOpenAbout: () => void;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({
  results,
  onRetake,
  onOpenAbout,
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [activeDomainTab, setActiveDomainTab] = useState<DomainKey>('O');
  const [expandedFacets, setExpandedFacets] = useState<Record<string, boolean>>({});

  // Trigger celebration confetti on mount
  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // gracefully ignore if canvas confetti is blocked
    }
  }, []);

  const getDomainIcon = (key: DomainKey, className = "w-5 h-5") => {
    switch (key) {
      case 'O': return <Sparkles className={className} />;
      case 'C': return <CheckCircle2 className={className} />;
      case 'E': return <Users className={className} />;
      case 'A': return <Heart className={className} />;
      case 'N': return <ShieldAlert className={className} />;
    }
  };

  const getScoreBadge = (scoreText: 'low' | 'neutral' | 'high') => {
    switch (scoreText) {
      case 'low':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
            Baixo
          </span>
        );
      case 'neutral':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
            Médio / Neutro
          </span>
        );
      case 'high':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            Alto
          </span>
        );
    }
  };

  const toggleFacetExpand = (facetKey: string) => {
    setExpandedFacets(prev => ({ ...prev, [facetKey]: !prev[facetKey] }));
  };

  // Copy formatted text summary for sharing
  const handleCopySummary = () => {
    const lines = [
      '🧠 Meu Resultado no Teste Big Five de Personalidade (OCEAN):',
      '────────────────────────────',
      ...results.results.map(r => {
        const level = r.scoreText === 'high' ? 'Alto' : r.scoreText === 'low' ? 'Baixo' : 'Médio';
        return `• ${r.title}: ${r.percentage}% (${level})`;
      }),
      '────────────────────────────',
      'Avaliação psicométrica baseada no IPIP-NEO-120 em Português.'
    ];

    navigator.clipboard.writeText(lines.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Download JSON results file
  const handleDownloadJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(results, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `bigfive-resultado-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Print results
  const handlePrint = () => {
    window.print();
  };

  const activeDomain = results.results.find(r => r.domain === activeDomainTab) || results.results[0];
  const activeMeta = DOMAINS_META[activeDomain.domain];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 pb-24 space-y-12">
      {/* Top Banner & Actions */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold mb-3">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Teste concluído com sucesso</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Seu Perfil de Personalidade
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
              Avaliação {results.mode === 'full' ? 'completa (120 perguntas)' : 'rápida (30 perguntas)'} realizada em {new Date(results.timestamp).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
            </p>
          </div>

          {/* Action buttons */}
          <div className="no-print flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            <button
              onClick={handleCopySummary}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition"
              title="Copiar resumo para compartilhar"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copiado!' : 'Copiar Resumo'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Salvar em PDF / Imprimir</span>
            </button>

            <button
              onClick={handleDownloadJson}
              className="inline-flex items-center justify-center p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition"
              title="Baixar arquivo JSON"
            >
              <Download className="w-4 h-4" />
            </button>

            <button
              onClick={onRetake}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold border border-indigo-200 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Refazer</span>
            </button>
          </div>
        </div>

        {/* Radar Chart & High-Level Summary Grid */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Radar Chart Container */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 bg-slate-50/80 rounded-2xl border border-slate-100">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Gráfico Radar OCEAN
            </h3>
            <RadarChart results={results.results} size={340} />
          </div>

          {/* 5 Factors Cards Grid */}
          <div className="lg:col-span-7 space-y-3">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Pontuação nos 5 Grandes Domínios
            </h3>
            {results.results.map((domain) => {
              const meta = DOMAINS_META[domain.domain];
              const isSelected = activeDomainTab === domain.domain;

              return (
                <div
                  key={domain.domain}
                  onClick={() => setActiveDomainTab(domain.domain)}
                  className={`p-3.5 sm:p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-indigo-500 bg-indigo-50/40 shadow-xs ring-1 ring-indigo-500/30'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-white shrink-0"
                        style={{ backgroundColor: meta.color }}
                      >
                        {getDomainIcon(domain.domain, 'w-4 h-4')}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-slate-900">
                            {domain.title}
                          </h4>
                          <span className="text-xs text-slate-400 font-mono">
                            ({domain.domain})
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 line-clamp-1">
                          {meta.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right">
                        <span className="text-sm font-extrabold text-slate-900">
                          {domain.percentage}%
                        </span>
                        <div className="text-[10px] text-slate-400">
                          {domain.score} / {domain.maxScore} pts
                        </div>
                      </div>
                      {getScoreBadge(domain.scoreText)}
                    </div>
                  </div>

                  {/* Micro Progress Bar */}
                  <div className="mt-2.5 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${domain.percentage}%`,
                        backgroundColor: meta.color
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Deep-Dive Trait & Facets Analysis */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-wide">
            Análise Aprofundada
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Exploração Detalhada das Facetas
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Selecione uma dimensão abaixo para conferir a explicação científica completa e as 6 sub-facetas que compõem sua pontuação.
          </p>
        </div>

        {/* Domain Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
          {results.results.map((domain) => {
            const meta = DOMAINS_META[domain.domain];
            const isActive = activeDomainTab === domain.domain;

            return (
              <button
                key={domain.domain}
                onClick={() => setActiveDomainTab(domain.domain)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {getDomainIcon(domain.domain, 'w-3.5 h-3.5')}
                <span>{domain.title}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-md ${
                  isActive ? 'bg-slate-800 text-slate-300' : 'bg-slate-200 text-slate-600'
                }`}>
                  {domain.percentage}%
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Domain Main Card */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full inline-block"
                  style={{ backgroundColor: activeMeta.color }}
                />
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  {activeDomain.title}
                </h3>
                <span className="text-xs font-semibold text-slate-400">
                  ({activeMeta.englishName})
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                {activeDomain.shortDescription}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-xl font-extrabold text-slate-900">
                  {activeDomain.percentage}%
                </span>
                <span className="text-xs text-slate-400 block">
                  Nível {activeDomain.scoreText === 'high' ? 'Alto' : activeDomain.scoreText === 'low' ? 'Baixo' : 'Médio'}
                </span>
              </div>
              {getScoreBadge(activeDomain.scoreText)}
            </div>
          </div>

          {/* Continuous Spectrum Meter */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500">
              <span>{activeMeta.lowLabel} (0-40%)</span>
              <span>Neutro (41-60%)</span>
              <span>{activeMeta.highLabel} (61-100%)</span>
            </div>
            <div className="relative w-full bg-slate-200 h-3 rounded-full overflow-hidden">
              {/* Threshold lines */}
              <div className="absolute left-[40%] top-0 bottom-0 w-0.5 bg-white/70 z-10" />
              <div className="absolute left-[60%] top-0 bottom-0 w-0.5 bg-white/70 z-10" />
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${activeDomain.percentage}%`,
                  backgroundColor: activeMeta.color
                }}
              />
            </div>
          </div>

          {/* Official Evaluation Text */}
          <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-2xs space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Interpretação da sua pontuação
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
              {activeDomain.text}
            </p>
            {activeDomain.description && (
              <p className="text-xs text-slate-500 leading-relaxed pt-2 border-t border-slate-100 whitespace-pre-line">
                {activeDomain.description}
              </p>
            )}
          </div>

          {/* Facets Accordion / Grid */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-500" />
                <span>As 6 Sub-facetas de {activeDomain.title}</span>
              </h4>
              <span className="text-xs text-slate-500">
                Clique na faceta para ver a interpretação
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {activeDomain.facets.map((facet) => {
                const facetKey = `${activeDomain.domain}-${facet.facet}`;
                const isExpanded = !!expandedFacets[facetKey];

                return (
                  <div
                    key={facet.facet}
                    className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all space-y-3"
                  >
                    <div
                      onClick={() => toggleFacetExpand(facetKey)}
                      className="flex items-start justify-between gap-3 cursor-pointer select-none"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold text-slate-400 font-mono">
                            #{facet.facet}
                          </span>
                          <h5 className="text-sm font-bold text-slate-900">
                            {facet.title}
                          </h5>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs font-semibold text-slate-700">
                            {facet.percentage}%
                          </span>
                          <span className="text-slate-300">•</span>
                          {getScoreBadge(facet.scoreText)}
                        </div>
                      </div>

                      <button
                        className="text-slate-400 hover:text-slate-600 p-1"
                        aria-label="Expandir detalhes da faceta"
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* Progress meter */}
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{
                          width: `${facet.percentage}%`,
                          backgroundColor: activeMeta.color
                        }}
                      />
                    </div>

                    {/* Collapsible details text */}
                    {isExpanded && (
                      <div className="pt-2 text-xs text-slate-600 leading-relaxed border-t border-slate-100 whitespace-pre-line animate-in fade-in">
                        {facet.text}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Practical Applications & Daily Life Guidance */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-wide">
            Aplicações Práticas
          </span>
          <h2 className="text-2xl font-bold text-slate-900 mt-1">
            Como aplicar seus resultados no dia a dia
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Recomendações fundamentadas em psicologia comportamental para trabalho, comunicação e autorregulação.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Work & Career */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <Briefcase className="w-4 h-4" />
            </div>
            <h4 className="text-base font-bold text-slate-900">Trabalho & Carreira</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Use sua pontuação em <strong>Conscienciosidade</strong> para calibrar métodos de gestão de tempo, e sua <strong>Abertura</strong> para direcionar projetos analíticos ou criativos.
            </p>
          </div>

          {/* Relationships */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
              <MessageSquare className="w-4 h-4" />
            </div>
            <h4 className="text-base font-bold text-slate-900">Comunicação & Relações</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Sua pontuação em <strong>Amabilidade</strong> e <strong>Extroversão</strong> indica como você prefere resolver impasses, negociar acordos e dosar seu tempo de socialização.
            </p>
          </div>

          {/* Self-Regulation */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2.5">
            <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center">
              <Lightbulb className="w-4 h-4" />
            </div>
            <h4 className="text-base font-bold text-slate-900">Bem-estar & Estresse</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              O nível de <strong>Neuroticismo</strong> ajuda a antecipar gatilhos de sobrecarga emocional, facilitando a adoção prévia de pausas, respiração e estratégias de descompressão.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison with Population Norms */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <h3 className="text-xl font-bold text-slate-900 mb-2">
          Comparativo com a Distribuição Populacional
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
          Na população geral, os traços de personalidade Big Five seguem uma curva normal (curva de sino ou Gaussiana). A grande maioria das pessoas situa-se na faixa intermediária (40% a 60%), enquanto pontuações abaixo de 30% ou acima de 70% representam características mais raras e marcantes.
        </p>

        <div className="space-y-4">
          {results.results.map((domain) => {
            const meta = DOMAINS_META[domain.domain];
            return (
              <div key={domain.domain} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">{domain.title}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-400">Média geral: ~50%</span>
                    <span className="font-extrabold text-indigo-700">Seu valor: {domain.percentage}%</span>
                  </div>
                </div>

                <div className="relative w-full bg-slate-100 h-3 rounded-full overflow-hidden border border-slate-200/60">
                  {/* Standard average marker at 50% */}
                  <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-400 z-10" title="Média da População (50%)" />
                  
                  {/* User score bar */}
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${domain.percentage}%`,
                      backgroundColor: meta.color
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA to Retake or Explore */}
      <div className="no-print text-center pt-4">
        <button
          onClick={onRetake}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Refazer o teste de personalidade</span>
        </button>
      </div>
    </div>
  );
};
