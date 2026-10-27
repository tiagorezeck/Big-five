import React from 'react';
import { Brain, Heart, Github, ExternalLink, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigateHome: () => void;
  onOpenAbout: () => void;
  onOpenFacets: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateHome,
  onOpenAbout,
  onOpenFacets,
}) => {
  return (
    <footer className="no-print bg-white border-t border-slate-200 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand & mission */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-xs">
                <Brain className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-base text-slate-900">
                Big Five <span className="text-indigo-600">Brasil</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
              Plataforma científica aberta para autoavaliação de personalidade baseada no Modelo dos Cinco Grandes Fatores (OCEAN) e no inventário IPIP-NEO de 120 itens. 100% em português brasileiro, gratuito e confidencial.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100 max-w-fit">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Privacidade total: dados processados apenas no seu navegador.</span>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Navegação
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <button
                  onClick={onNavigateHome}
                  className="hover:text-indigo-600 transition"
                >
                  Página Inicial
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenFacets}
                  className="hover:text-indigo-600 transition"
                >
                  Glossário das 30 Facetas
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAbout}
                  className="hover:text-indigo-600 transition"
                >
                  Fundamentos Científicos
                </button>
              </li>
            </ul>
          </div>

          {/* References & credits */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Créditos & Fontes
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <a
                  href="https://github.com/rubynor/bigfive-web"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-indigo-600 transition"
                >
                  <span>rubynor / bigfive-web</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://ipip.ori.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-indigo-600 transition"
                >
                  <span>IPIP (Oregon Research Inst.)</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <span className="text-slate-500">
                  Dr. John A. Johnson (IPIP-NEO-120)
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} Big Five Brasil • Licenciado sob MIT.
          </p>
          <div className="flex items-center gap-1 text-slate-500">
            <span>Traduzido e adaptado para o Português do Brasil com carinho 🇧🇷</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
