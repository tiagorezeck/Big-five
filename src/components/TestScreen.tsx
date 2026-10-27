import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  RotateCcw, 
  ArrowLeft, 
  Clock, 
  HelpCircle,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { Question } from '../types/bigfive';
import { CHOICES_PT_BR } from '../data/bigfiveData';

interface TestScreenProps {
  questions: Question[];
  mode: 'full' | 'short';
  answers: Record<string, number>;
  onAnswer: (questionId: string, score: number) => void;
  onComplete: () => void;
  onReset: () => void;
  onBackToHome: () => void;
}

export const TestScreen: React.FC<TestScreenProps> = ({
  questions,
  mode,
  answers,
  onAnswer,
  onComplete,
  onReset,
  onBackToHome,
}) => {
  const [pageSize, setPageSize] = useState<number>(5); // 5 per page (like bigfive-test.com) or 1
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [showResetModal, setShowResetModal] = useState<boolean>(false);
  const [validationAlert, setValidationAlert] = useState<string | null>(null);
  const topRef = useRef<HTMLDivElement>(null);

  const totalQuestions = questions.length;
  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  const totalPages = Math.ceil(totalQuestions / pageSize);
  const startIndex = currentPage * pageSize;
  const currentQuestions = questions.slice(startIndex, startIndex + pageSize);

  // Remaining time estimate (~5 seconds per question answered)
  const remainingQuestions = totalQuestions - answeredCount;
  const remainingMinutes = Math.max(1, Math.ceil((remainingQuestions * 5.5) / 60));

  // Auto-scroll to top when page changes
  const changePage = (newPage: number) => {
    setCurrentPage(newPage);
    setValidationAlert(null);
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Check if current page is all answered
  const isCurrentPageComplete = currentQuestions.every(q => answers[q.id] !== undefined);

  const handleNext = () => {
    // If not all answered in current page, warn
    const unansweredInPage = currentQuestions.filter(q => answers[q.id] === undefined);
    if (unansweredInPage.length > 0) {
      setValidationAlert(`Por favor, responda todas as ${unansweredInPage.length} perguntas desta página antes de prosseguir.`);
      return;
    }

    if (currentPage < totalPages - 1) {
      changePage(currentPage + 1);
    } else {
      // Check if all questions across the entire test are answered
      if (answeredCount < totalQuestions) {
        // Find first unanswered question page
        const firstUnansweredIndex = questions.findIndex(q => answers[q.id] === undefined);
        if (firstUnansweredIndex !== -1) {
          const targetPage = Math.floor(firstUnansweredIndex / pageSize);
          changePage(targetPage);
          setValidationAlert(`Ainda faltam perguntas a serem respondidas.`);
          return;
        }
      }
      onComplete();
    }
  };

  // Keyboard shortcut listener: numbers 1 to 5 for single question mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (pageSize === 1 && ['1', '2', '3', '4', '5'].includes(e.key)) {
        const val = parseInt(e.key, 10);
        const currentQ = currentQuestions[0];
        if (currentQ) {
          onAnswer(currentQ.id, val);
          // auto advance in single question mode after 250ms
          setTimeout(() => {
            if (currentPage < totalPages - 1) {
              changePage(currentPage + 1);
            }
          }, 250);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pageSize, currentPage, currentQuestions, totalPages, onAnswer]);

  return (
    <div ref={topRef} className="max-w-3xl mx-auto px-4 sm:px-6 py-6 pb-20 space-y-6">
      {/* Sticky Progress Header */}
      <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-slate-200/90 shadow-sm space-y-3">
        <div className="flex items-center justify-between text-xs sm:text-sm">
          <div className="flex items-center gap-2 font-bold text-slate-800">
            <span>Progresso:</span>
            <span className="text-indigo-600 font-extrabold">{answeredCount} de {totalQuestions}</span>
            <span className="text-slate-400 font-normal">({progressPercent}%)</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 text-xs text-slate-500 font-medium bg-slate-100 px-2.5 py-1 rounded-md">
              <Clock className="w-3.5 h-3.5 text-indigo-500" />
              <span>~{remainingMinutes} min restantes</span>
            </span>

            {/* Page Size toggle */}
            <div className="hidden sm:flex items-center bg-slate-100 p-0.5 rounded-lg text-xs font-semibold">
              <button
                onClick={() => setPageSize(5)}
                className={`px-2 py-0.5 rounded-md transition ${pageSize === 5 ? 'bg-white text-indigo-700 shadow-2xs' : 'text-slate-500 hover:text-slate-800'}`}
              >
                5 por página
              </button>
              <button
                onClick={() => setPageSize(1)}
                className={`px-2 py-0.5 rounded-md transition ${pageSize === 1 ? 'bg-white text-indigo-700 shadow-2xs' : 'text-slate-500 hover:text-slate-800'}`}
              >
                1 por vez
              </button>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden p-0.5 border border-slate-200/60">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${Math.max(2, progressPercent)}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5">
          <div className="flex items-center gap-1.5 text-emerald-700">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Salvo automaticamente no seu dispositivo</span>
          </div>
          <span>Página {currentPage + 1} de {totalPages}</span>
        </div>
      </div>

      {/* Validation Alert */}
      {validationAlert && (
        <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm flex items-center justify-between gap-3 animate-shake">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{validationAlert}</span>
          </div>
          <button
            onClick={() => setValidationAlert(null)}
            className="text-amber-700 hover:text-amber-900 font-bold text-xs"
          >
            Dispensar
          </button>
        </div>
      )}

      {/* Questions List */}
      <div className="space-y-6">
        {currentQuestions.map((question) => {
          const selectedValue = answers[question.id];

          return (
            <div
              key={question.id}
              className={`p-5 sm:p-6 rounded-2xl border transition-all duration-200 bg-white shadow-xs ${
                selectedValue !== undefined
                  ? 'border-indigo-200/90 shadow-indigo-50/50'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-400 font-mono tracking-wider">
                  QUESTÃO {question.num} DE {totalQuestions}
                </span>
                {selectedValue !== undefined && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
                    <CheckCircle2 className="w-3 h-3" />
                    Respondida
                  </span>
                )}
              </div>

              {/* Question Statement */}
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-5 leading-snug">
                "{question.text}"
              </h3>

              {/* Likert Scale Choices */}
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 pt-1">
                {CHOICES_PT_BR.map((choice) => {
                  const isSelected = selectedValue === choice.value;

                  // Choice color themes
                  let activeClasses = '';
                  let badgeColor = '';
                  if (choice.value === 1) {
                    activeClasses = 'bg-rose-50 border-rose-500 text-rose-900 ring-2 ring-rose-400/40';
                    badgeColor = 'bg-rose-500 text-white';
                  } else if (choice.value === 2) {
                    activeClasses = 'bg-amber-50 border-amber-500 text-amber-900 ring-2 ring-amber-400/40';
                    badgeColor = 'bg-amber-500 text-white';
                  } else if (choice.value === 3) {
                    activeClasses = 'bg-slate-100 border-slate-500 text-slate-900 ring-2 ring-slate-400/40';
                    badgeColor = 'bg-slate-500 text-white';
                  } else if (choice.value === 4) {
                    activeClasses = 'bg-sky-50 border-sky-500 text-sky-900 ring-2 ring-sky-400/40';
                    badgeColor = 'bg-sky-500 text-white';
                  } else {
                    activeClasses = 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-400/40';
                    badgeColor = 'bg-emerald-500 text-white';
                  }

                  return (
                    <button
                      key={choice.value}
                      onClick={() => {
                        onAnswer(question.id, choice.value);
                        setValidationAlert(null);
                        // If single question mode, auto advance
                        if (pageSize === 1) {
                          setTimeout(() => {
                            if (currentPage < totalPages - 1) {
                              changePage(currentPage + 1);
                            }
                          }, 220);
                        }
                      }}
                      className={`relative flex sm:flex-col items-center justify-between sm:justify-center p-3 rounded-xl border text-xs sm:text-[11px] font-semibold text-center transition-all cursor-pointer group select-none ${
                        isSelected
                          ? `${activeClasses} shadow-xs font-bold`
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/80 text-slate-700'
                      }`}
                    >
                      {/* Circle Number */}
                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono shrink-0 mb-0 sm:mb-2 transition ${
                          isSelected
                            ? badgeColor
                            : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                        }`}
                      >
                        {choice.value}
                      </span>

                      {/* Text Label */}
                      <span className="leading-tight px-1 flex-1 sm:flex-initial">
                        {choice.text}
                      </span>

                      {/* Radio indicator for mobile */}
                      <span
                        className={`w-4 h-4 rounded-full border sm:hidden flex items-center justify-center ${
                          isSelected
                            ? 'border-indigo-600 bg-indigo-600'
                            : 'border-slate-300'
                        }`}
                      >
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Navigation Toolbar */}
      <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => currentPage > 0 && changePage(currentPage - 1)}
            disabled={currentPage === 0}
            className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-semibold transition ${
              currentPage === 0
                ? 'border-slate-200 text-slate-300 cursor-not-allowed bg-slate-50'
                : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 active:scale-98'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Página Anterior</span>
          </button>

          <button
            onClick={() => setShowResetModal(true)}
            className="inline-flex items-center justify-center p-2.5 rounded-xl border border-slate-200 bg-white text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition"
            title="Reiniciar teste e limpar respostas"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={onBackToHome}
            className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-medium text-slate-600 hover:bg-slate-50 transition"
          >
            Pausar e Voltar ao Início
          </button>

          <button
            onClick={handleNext}
            className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-md transition ${
              currentPage === totalPages - 1 && answeredCount === totalQuestions
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700 shadow-emerald-500/25 active:scale-98'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/25 active:scale-98'
            }`}
          >
            <span>
              {currentPage === totalPages - 1
                ? 'Concluir e Ver Resultados'
                : 'Próxima Página'}
            </span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Confirmation Reset Modal */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Reiniciar o teste?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                Todas as suas {answeredCount} respostas já assinaladas serão apagadas e o teste recomeçará do zero. Esta ação não pode ser desfeita.
              </p>
            </div>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowResetModal(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  setShowResetModal(false);
                  onReset();
                  setCurrentPage(0);
                }}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs sm:text-sm font-bold shadow-xs transition"
              >
                Sim, reiniciar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
