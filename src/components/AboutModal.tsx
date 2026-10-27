import React from 'react';
import { X, BookOpen, Award, ShieldCheck, ExternalLink, CheckCircle2 } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Sobre o Teste Big Five & IPIP-NEO
              </h3>
              <p className="text-xs text-slate-500">
                Fundamentos científicos, metodologia e origem do inventário
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

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-700 text-sm leading-relaxed">
          {/* Section 1: O que é o Big Five */}
          <div className="space-y-2">
            <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-4 h-4 text-indigo-600" />
              <span>O que é o Modelo dos Cinco Grandes Fatores (OCEAN)?</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-600">
              O Modelo Big Five é o instrumento psicométrico mais aceito, pesquisado e validado empiricamente na psicologia contemporânea. Fruto de décadas de análise lexical e fatorial iniciadas por pesquisadores como Lewis Goldberg, Warren Norman, Paul Costa e Robert McCrae, o modelo demonstra que a personalidade humana pode ser descrita de maneira confiável através de 5 dimensões fundamentais:
            </p>
            <ul className="text-xs text-slate-600 space-y-1.5 pl-4 list-disc">
              <li><strong>O - Abertura à Experiência (Openness):</strong> originalidade, imaginação, apreciação estética e curiosidade intelectual.</li>
              <li><strong>C - Conscienciosidade (Conscientiousness):</strong> autodisciplina, organização, senso de responsabilidade e perseverança.</li>
              <li><strong>E - Extroversão (Extraversion):</strong> sociabilidade, assertividade, busca por estímulos e entusiasmo.</li>
              <li><strong>A - Amabilidade / Afabilidade (Agreeableness):</strong> altruísmo, cooperação, confiança mútua e empatia.</li>
              <li><strong>N - Neuroticismo (Neuroticism):</strong> sensibilidade emocional, reatividade ao estresse e vulnerabilidade.</li>
            </ul>
          </div>

          {/* Section 2: O inventário IPIP-NEO-120 */}
          <div className="space-y-2 p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <h4 className="text-sm font-bold text-slate-900">
              O Inventário Johnson IPIP-NEO-120
            </h4>
            <p className="text-xs text-slate-600">
              Este aplicativo utiliza o inventário <strong>IPIP-NEO-120</strong>, desenvolvido pelo psicólogo <strong>Dr. John A. Johnson (2014)</strong> a partir do banco público do <em>International Personality Item Pool (IPIP)</em> coordenado pelo Dr. Lewis Goldberg. O instrumento contém 120 itens balanceados psicometricamente que medem com precisão não apenas os 5 grandes fatores, mas também <strong>30 facetas comportamentais específicas</strong> (4 itens por faceta).
            </p>
          </div>

          {/* Section 3: Big Five vs MBTI */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-slate-900">
              Por que o Big Five supera o MBTI e testes de arquétipos?
            </h4>
            <p className="text-xs text-slate-600">
              Enquanto o MBTI e outros testes populares forçam as pessoas em "caixas binárias" (por exemplo: ou você é 100% extrovertido ou 100% introvertido), a ciência psicológica comprovou que os traços humanos existem em um <strong>espectro contínuo</strong> com distribuição normal. O Big Five não rotula você com siglas fixas, mas mostra suas posições relativas e nuances reais.
            </p>
          </div>

          {/* Section 4: Confidencialidade e Open Source */}
          <div className="space-y-2 p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100">
            <h4 className="text-sm font-bold text-emerald-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Privacidade e Código Aberto</span>
            </h4>
            <p className="text-xs text-emerald-800">
              Esta aplicação replica e expande o projeto de código aberto <strong>rubynor/bigfive-web</strong> (originalmente desenvolvido por Alheimsins / Rubynor) totalmente adaptado e traduzido para o Português do Brasil.
            </p>
            <p className="text-xs text-emerald-800">
              Suas respostas e pontuações são processadas <strong>100% no seu navegador</strong>. Nenhuma resposta é transmitida para bancos de dados de terceiros, garantindo confidencialidade absoluta.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
