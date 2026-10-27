import React from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  Users, 
  Heart, 
  ShieldAlert, 
  Clock, 
  Award, 
  ShieldCheck, 
  Layers, 
  ArrowRight, 
  Play, 
  RotateCcw,
  BookOpen
} from 'lucide-react';
import { DOMAINS_META } from '../data/bigfiveData';

interface HeroHomeProps {
  onStartTest: (mode: 'full' | 'short') => void;
  inProgressCount: number;
  totalQuestions: number;
  activeMode: 'full' | 'short';
  onResumeTest: () => void;
  onResetTest: () => void;
  onOpenFacets: () => void;
  onOpenAbout: () => void;
}

export const HeroHome: React.FC<HeroHomeProps> = ({
  onStartTest,
  inProgressCount,
  totalQuestions,
  activeMode,
  onResumeTest,
  onResetTest,
  onOpenFacets,
  onOpenAbout,
}) => {
  const oceanKeys: Array<'O' | 'C' | 'E' | 'A' | 'N'> = ['O', 'C', 'E', 'A', 'N'];

  const getDomainIcon = (key: string) => {
    switch (key) {
      case 'O': return <Sparkles className="w-5 h-5 text-sky-600" />;
      case 'C': return <CheckCircle2 className="w-5 h-5 text-emerald-600" />;
      case 'E': return <Users className="w-5 h-5 text-amber-600" />;
      case 'A': return <Heart className="w-5 h-5 text-purple-600" />;
      case 'N': return <ShieldAlert className="w-5 h-5 text-rose-600" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Banner */}
      <section className="relative pt-8 sm:pt-14 text-center max-w-4xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs sm:text-sm font-semibold mb-6 shadow-xs">
          <Award className="w-4 h-4 text-indigo-600" />
          <span>O padrão-ouro científico da psicologia moderna</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
          Descubra quem você é com o{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-sky-600">
            Teste Big Five
          </span>
        </h1>

        <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
          Avalie sua personalidade através do Modelo dos Cinco Grandes Fatores (OCEAN) e receba uma análise detalhada das suas <strong>30 facetas comportamentais</strong>. Totalmente em português, gratuito e 100% confidencial.
        </p>

        {/* In-Progress Notification */}
        {inProgressCount > 0 && (
          <div className="mt-8 p-4 rounded-xl bg-indigo-50/90 border border-indigo-200 text-left max-w-xl mx-auto shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-indigo-900 font-bold text-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-pulse"></span>
                Teste em andamento ({inProgressCount} de {totalQuestions} respondidas)
              </div>
              <p className="text-xs text-indigo-700 mt-0.5">
                Suas respostas anteriores estão salvas no navegador.
              </p>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={onResumeTest}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs transition"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                Continuar
              </button>
              <button
                onClick={onResetTest}
                className="inline-flex items-center justify-center px-3 py-2 rounded-lg bg-white hover:bg-rose-50 text-slate-600 hover:text-rose-600 border border-slate-200 text-xs font-medium transition"
                title="Recomeçar do zero"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Test Selection Cards */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto text-left">
          {/* 120 Questions (Recommended) */}
          <div className="relative rounded-2xl border-2 border-indigo-500 bg-white p-6 sm:p-7 shadow-lg shadow-indigo-100 flex flex-col justify-between hover:shadow-xl transition-all">
            <div className="absolute -top-3 right-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-[11px] font-bold px-3 py-0.5 rounded-full tracking-wider uppercase shadow-xs">
              Recomendado
            </div>

            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold tracking-wide uppercase text-indigo-600">
                  Inventário IPIP-NEO-120
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-slate-500 font-medium bg-slate-100 px-2 py-0.5 rounded-md">
                  <Clock className="w-3.5 h-3.5" /> ~10 a 12 min
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mt-2">
                Teste Completo (120 Questões)
              </h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Mapeamento psicométrico profundo dos 5 grandes domínios e das <strong>30 sub-facetas individuais</strong>. É a versão de referência utilizada em pesquisas científicas.
              </p>

              <ul className="mt-4 space-y-2 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Análise detalhada de todas as 30 facetas de personalidade</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Gráfico radar OCEAN completo com percentis</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Relatório completo para imprimir e salvar</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-5 border-t border-slate-100">
              <button
                onClick={() => onStartTest('full')}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold text-sm shadow-md shadow-indigo-500/25 transition group cursor-pointer"
              >
                <span>Começar Teste Completo (120)</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* 30 Questions (Quick) */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-sm hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold tracking-wide uppercase text-slate-500">
                  Triagem Rápida
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-slate-500 font-medium bg-slate-100 px-2 py-0.5 rounded-md">
                  <Clock className="w-3.5 h-3.5" /> ~3 a 4 min
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mt-2">
                Teste Rápido (30 Questões)
              </h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Versão condensada com 1 item representativo para cada uma das facetas. Ideal para quem tem pouco tempo e quer uma avaliação geral rápida.
              </p>

              <ul className="mt-4 space-y-2 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0" />
                  <span>Pontuação nos 5 domínios fundamentais (OCEAN)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0" />
                  <span>Visão geral dos pontos fortes e de atenção</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0" />
                  <span>Rápido e prático para dispositivos móveis</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-5 border-t border-slate-100">
              <button
                onClick={() => onStartTest('short')}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-sm transition group cursor-pointer"
              >
                <span>Fazer Versão Rápida (30)</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>100% Anônimo & Privado</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-indigo-600" />
            <span>Sem necessidade de cadastro</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-600" />
            <span>Inventário IPIP-NEO Oficial</span>
          </div>
        </div>
      </section>

      {/* The 5 Great Factors (OCEAN) Presentation */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Os Cinco Grandes Fatores (OCEAN)
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Ao contrário de testes tipológicos populares (como o MBTI), o Big Five avalia sua personalidade em espectros contínuos validados por décadas de pesquisas científicas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {oceanKeys.map((key) => {
            const meta = DOMAINS_META[key];
            return (
              <div
                key={key}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:border-slate-300 hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                      {getDomainIcon(key)}
                    </div>
                    <span className="text-xs font-bold font-mono px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                      Fator {key}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900">
                    {meta.name}
                  </h3>
                  <p className="text-xs text-indigo-600 font-medium">
                    {meta.englishName}
                  </p>

                  <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                    {meta.summary}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500">
                    <span className="text-slate-600">{meta.lowLabel}</span>
                    <span className="text-slate-400">↔</span>
                    <span className="text-slate-600">{meta.highLabel}</span>
                  </div>
                </div>
              </div>
            );
          })}

          {/* 30 Facets Banner Card */}
          <div className="rounded-2xl border border-dashed border-indigo-200 bg-gradient-to-br from-indigo-50/70 to-purple-50/50 p-6 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center mb-4 shadow-sm shadow-indigo-600/30">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                As 30 Sub-facetas
              </h3>
              <p className="text-xs text-indigo-700 font-medium">
                6 facetas por dimensão
              </p>
              <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                Cada um dos 5 grandes fatores é composto por 6 traços comportamentais específicos, como Ansiedade, Altruísmo, Imaginação, Ordem e Sociabilidade.
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-indigo-100">
              <button
                onClick={onOpenFacets}
                className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white border border-indigo-200 hover:bg-indigo-50 text-indigo-700 font-bold text-xs shadow-2xs transition"
              >
                <BookOpen className="w-3.5 h-3.5" />
                Explorar todas as 30 facetas
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Science & Comparison Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wide">
                Rigour Científico
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                Por que o Big Five é diferente?
              </h3>
            </div>
            <button
              onClick={onOpenAbout}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 hover:underline"
            >
              Saiba mais sobre a ciência
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <h4 className="font-bold text-slate-900">Base Empírica Real</h4>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Desenvolvido através de análise fatorial lexical ao longo de 50 anos por Goldberg, Costa, McCrae e John Johnson.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <h4 className="font-bold text-slate-900">Sem Rótulos Fixos</h4>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Você não é colocado em uma "caixinha" estática de 4 letras. Os traços são medidos em uma escala contínua com nuances.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <h4 className="font-bold text-slate-900">Alta Reprodutibilidade</h4>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Apresenta a maior consistência teste-reteste da psicologia, com validade preditiva comprovada em mais de 50 países.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
