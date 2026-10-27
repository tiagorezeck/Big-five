import React from 'react';
import { Brain, Sparkles, BookOpen, Layers, ShieldCheck, Play } from 'lucide-react';

interface HeaderProps {
  currentView: 'home' | 'test' | 'results';
  inProgressCount?: number;
  totalQuestions?: number;
  onNavigate: (view: 'home' | 'test' | 'results') => void;
  onOpenAbout: () => void;
  onOpenFacets: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  inProgressCount = 0,
  totalQuestions = 120,
  onNavigate,
  onOpenAbout,
  onOpenFacets,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 text-left group focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg p-1 transition"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-sky-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
                Big Five <span className="text-indigo-600">Brasil</span>
              </span>
              <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-full border border-emerald-200/60 hidden sm:inline-block">
                IPIP-NEO-120
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
              Modelo dos Cinco Grandes Fatores
            </p>
          </div>
        </button>

        {/* Navigation links */}
        <nav className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => onNavigate('home')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
              currentView === 'home'
                ? 'bg-slate-100 text-indigo-700'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
            }`}
          >
            Início
          </button>

          <button
            onClick={onOpenFacets}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 transition"
          >
            <Layers className="w-4 h-4 text-indigo-500" />
            30 Facetas
          </button>

          <button
            onClick={onOpenAbout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 transition"
          >
            <BookOpen className="w-4 h-4 text-indigo-500" />
            <span className="hidden sm:inline">Sobre a Ciência</span>
            <span className="sm:hidden">Sobre</span>
          </button>

          {/* Test CTA or resume */}
          {currentView !== 'test' && (
            <button
              onClick={() => onNavigate('test')}
              className="ml-2 flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 active:scale-95 shadow-sm shadow-indigo-600/30 transition"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              {inProgressCount > 0 ? (
                <span>Continuar ({inProgressCount}/{totalQuestions})</span>
              ) : (
                <span>Fazer o Teste</span>
              )}
            </button>
          )}

          {/* Language Flag */}
          <div className="ml-1 sm:ml-2 flex items-center gap-1 px-2 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200" title="Português do Brasil">
            <span>🇧🇷</span>
            <span className="hidden sm:inline">PT-BR</span>
          </div>
        </nav>
      </div>
    </header>
  );
};
