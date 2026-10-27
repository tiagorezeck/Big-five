import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroHome } from './components/HeroHome';
import { TestScreen } from './components/TestScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { AboutModal } from './components/AboutModal';
import { FacetsExplorerModal } from './components/FacetsExplorerModal';
import { Footer } from './components/Footer';
import { 
  RAW_QUESTIONS, 
  SHORT_QUESTIONS, 
  calculateTestResults 
} from './data/bigfiveData';
import { BigFiveResult } from './types/bigfive';

const STORAGE_KEY_ANSWERS = 'bigfive_ptbr_answers';
const STORAGE_KEY_MODE = 'bigfive_ptbr_mode';
const STORAGE_KEY_RESULTS = 'bigfive_ptbr_results';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'test' | 'results'>('home');
  const [mode, setMode] = useState<'full' | 'short'>('full');
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [results, setResults] = useState<BigFiveResult | null>(null);

  const [isAboutOpen, setIsAboutOpen] = useState<boolean>(false);
  const [isFacetsOpen, setIsFacetsOpen] = useState<boolean>(false);

  // Load saved state from localStorage on initial render
  useEffect(() => {
    try {
      const savedMode = localStorage.getItem(STORAGE_KEY_MODE) as 'full' | 'short' | null;
      if (savedMode === 'full' || savedMode === 'short') {
        setMode(savedMode);
      }

      const savedAnswersStr = localStorage.getItem(STORAGE_KEY_ANSWERS);
      if (savedAnswersStr) {
        const parsedAnswers = JSON.parse(savedAnswersStr);
        if (parsedAnswers && typeof parsedAnswers === 'object') {
          setAnswers(parsedAnswers);
        }
      }

      const savedResultsStr = localStorage.getItem(STORAGE_KEY_RESULTS);
      if (savedResultsStr) {
        const parsedResults = JSON.parse(savedResultsStr);
        if (parsedResults && parsedResults.results) {
          setResults(parsedResults);
        }
      }
    } catch {
      // localStorage read fallback
    }
  }, []);

  const activeQuestions = mode === 'full' ? RAW_QUESTIONS : SHORT_QUESTIONS;
  const answeredCount = Object.keys(answers).length;

  const handleStartTest = (selectedMode: 'full' | 'short') => {
    if (selectedMode !== mode) {
      setMode(selectedMode);
      try {
        localStorage.setItem(STORAGE_KEY_MODE, selectedMode);
      } catch {}
    }
    setCurrentView('test');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResumeTest = () => {
    setCurrentView('test');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAnswer = (questionId: string, score: number) => {
    setAnswers(prev => {
      const updated = { ...prev, [questionId]: score };
      try {
        localStorage.setItem(STORAGE_KEY_ANSWERS, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const handleComplete = () => {
    const calculated = calculateTestResults(answers, mode);
    setResults(calculated);
    try {
      localStorage.setItem(STORAGE_KEY_RESULTS, JSON.stringify(calculated));
    } catch {}
    setCurrentView('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetTest = () => {
    setAnswers({});
    setResults(null);
    try {
      localStorage.removeItem(STORAGE_KEY_ANSWERS);
      localStorage.removeItem(STORAGE_KEY_RESULTS);
    } catch {}
    setCurrentView('home');
  };

  const handleRetake = () => {
    setAnswers({});
    setResults(null);
    try {
      localStorage.removeItem(STORAGE_KEY_ANSWERS);
      localStorage.removeItem(STORAGE_KEY_RESULTS);
    } catch {}
    setCurrentView('test');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Header */}
      <Header
        currentView={currentView}
        inProgressCount={answeredCount}
        totalQuestions={activeQuestions.length}
        onNavigate={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenFacets={() => setIsFacetsOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HeroHome
            onStartTest={handleStartTest}
            inProgressCount={answeredCount}
            totalQuestions={activeQuestions.length}
            activeMode={mode}
            onResumeTest={handleResumeTest}
            onResetTest={handleResetTest}
            onOpenFacets={() => setIsFacetsOpen(true)}
            onOpenAbout={() => setIsAboutOpen(true)}
          />
        )}

        {currentView === 'test' && (
          <TestScreen
            questions={activeQuestions}
            mode={mode}
            answers={answers}
            onAnswer={handleAnswer}
            onComplete={handleComplete}
            onReset={handleResetTest}
            onBackToHome={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentView === 'results' && results && (
          <ResultsScreen
            results={results}
            onRetake={handleRetake}
            onOpenAbout={() => setIsAboutOpen(true)}
          />
        )}
      </main>

      {/* Modals */}
      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />

      <FacetsExplorerModal
        isOpen={isFacetsOpen}
        onClose={() => setIsFacetsOpen(false)}
      />

      {/* Footer */}
      <Footer
        onNavigateHome={() => {
          setCurrentView('home');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenFacets={() => setIsFacetsOpen(true)}
      />
    </div>
  );
}
