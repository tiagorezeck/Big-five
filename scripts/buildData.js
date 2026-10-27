import fs from 'fs';
import path from 'path';

// Load raw data
const raw = JSON.parse(fs.readFileSync('./src/data/rawBigFive.json', 'utf8'));

const questions = raw.questions;
const template = raw.template;

// Fix N facet 4 text if it has the bug
const nDomain = template.find(t => t.domain === 'N');
if (nDomain) {
  const f4 = nDomain.facets.find(f => f.facet === 4);
  if (f4 && f4.text.includes('Pessoas impulsivas')) {
    f4.text = 'Pessoas com alta autoconsciência tendem a ser tímidas, constrangidas em situações sociais e sensíveis ao que os outros pensam sobre elas. Costumam temer o ridículo ou a rejeição. Já pessoas com baixa pontuação raramente se sentem intimidadas ou deslocadas em público.';
  }
}

// Select 30 items for short test: 1 item per domain-facet combination
const shortQuestions = [];
const domains = ['O', 'C', 'E', 'A', 'N'];
domains.forEach(d => {
  for (let facet = 1; facet <= 6; facet++) {
    const q = questions.find(item => item.domain === d && item.facet === facet);
    if (q) {
      shortQuestions.push(q);
    }
  }
});

const tsCode = `import { Question, DomainKey, DomainResult, FacetResult, ScoreLevel, DomainMeta, BigFiveResult } from '../types/bigfive';

export const CHOICES_PT_BR = [
  { text: 'Discordo totalmente', value: 1, level: 'low' },
  { text: 'Discordo parcialmente', value: 2, level: 'low' },
  { text: 'Nem discordo, nem concordo', value: 3, level: 'neutral' },
  { text: 'Concordo parcialmente', value: 4, level: 'high' },
  { text: 'Concordo totalmente', value: 5, level: 'high' },
] as const;

export const DOMAINS_META: Record<DomainKey, DomainMeta> = {
  O: {
    key: 'O',
    name: 'Abertura à Experiência',
    englishName: 'Openness to Experience',
    subtitle: 'Criatividade, imaginação e curiosidade intelectual',
    color: '#0284c7',
    bgLight: 'bg-sky-50',
    borderColor: 'border-sky-300',
    textColor: 'text-sky-700',
    icon: 'Sparkles',
    summary: 'Mede a abertura a novas ideias, arte, sensações e imaginação ativa em contraste com o convencional e prático.',
    lowLabel: 'Pragmático & Tradicional',
    highLabel: 'Criativo & Curioso'
  },
  C: {
    key: 'C',
    name: 'Conscienciosidade',
    englishName: 'Conscientiousness',
    subtitle: 'Organização, disciplina e persistência focada em metas',
    color: '#059669',
    bgLight: 'bg-emerald-50',
    borderColor: 'border-emerald-300',
    textColor: 'text-emerald-700',
    icon: 'CheckCircle2',
    summary: 'Reflete como controlamos, regulamos e direcionamos nossos impulsos para cumprir metas e manter organização.',
    lowLabel: 'Flexível & Espontâneo',
    highLabel: 'Disciplinado & Metódico'
  },
  E: {
    key: 'E',
    name: 'Extroversão',
    englishName: 'Extraversion',
    subtitle: 'Energia social, assertividade e busca por estímulos',
    color: '#d97706',
    bgLight: 'bg-amber-50',
    borderColor: 'border-amber-300',
    textColor: 'text-amber-700',
    icon: 'Users',
    summary: 'Indica a orientação e intensidade das interações interpessoais, entusiasmo e disposição para a ação em grupo.',
    lowLabel: 'Reservado & Introspectivo',
    highLabel: 'Comunicativo & Entusiasmado'
  },
  A: {
    key: 'A',
    name: 'Amabilidade / Afabilidade',
    englishName: 'Agreeableness',
    subtitle: 'Cooperação, empatia, altruísmo e consideração mútua',
    color: '#7c3aed',
    bgLight: 'bg-purple-50',
    borderColor: 'border-purple-300',
    textColor: 'text-purple-700',
    icon: 'Heart',
    summary: 'Avalia a qualidade das relações interpessoais ao longo de um continuum que vai da compaixão à cooperação calorosa.',
    lowLabel: 'Competitivo & Cético',
    highLabel: 'Empático & Cooperativo'
  },
  N: {
    key: 'N',
    name: 'Neuroticismo',
    englishName: 'Neuroticism (Reatividade Emocional)',
    subtitle: 'Estabilidade emocional vs. sensibilidade ao estresse',
    color: '#e11d48',
    bgLight: 'bg-rose-50',
    borderColor: 'border-rose-300',
    textColor: 'text-rose-700',
    icon: 'ShieldAlert',
    summary: 'Mede a sensibilidade ao estresse e a propensão a vivenciar oscilações emocionais perante desafios da vida.',
    lowLabel: 'Calmo & Resiliente',
    highLabel: 'Sensível & Emotivo'
  }
};

export const RAW_QUESTIONS: Question[] = ${JSON.stringify(questions, null, 2)};

export const SHORT_QUESTIONS: Question[] = ${JSON.stringify(shortQuestions, null, 2)};

export const RAW_TEMPLATES = ${JSON.stringify(template, null, 2)};

export function calculateTestResults(
  answersMap: Record<string, number>,
  mode: 'full' | 'short' = 'full'
): BigFiveResult {
  const questionPool = mode === 'full' ? RAW_QUESTIONS : SHORT_QUESTIONS;
  
  const accumulator: Record<DomainKey, {
    score: number;
    count: number;
    result: ScoreLevel;
    facet: Record<string, { score: number; count: number; result: ScoreLevel }>;
  }> = {
    O: { score: 0, count: 0, result: 'neutral', facet: {} },
    C: { score: 0, count: 0, result: 'neutral', facet: {} },
    E: { score: 0, count: 0, result: 'neutral', facet: {} },
    A: { score: 0, count: 0, result: 'neutral', facet: {} },
    N: { score: 0, count: 0, result: 'neutral', facet: {} },
  };

  for (let f = 1; f <= 6; f++) {
    for (const d of ['O', 'C', 'E', 'A', 'N'] as DomainKey[]) {
      accumulator[d].facet[f.toString()] = { score: 0, count: 0, result: 'neutral' };
    }
  }

  let answeredCount = 0;

  for (const q of questionPool) {
    const rawVal = answersMap[q.id];
    if (rawVal !== undefined) {
      answeredCount++;
      const effectiveScore = q.keyed === 'plus' ? rawVal : (6 - rawVal);
      const d = q.domain;
      const f = q.facet.toString();

      accumulator[d].score += effectiveScore;
      accumulator[d].count += 1;

      if (!accumulator[d].facet[f]) {
        accumulator[d].facet[f] = { score: 0, count: 0, result: 'neutral' };
      }
      accumulator[d].facet[f].score += effectiveScore;
      accumulator[d].facet[f].count += 1;
    }
  }

  const getLevel = (score: number, count: number): ScoreLevel => {
    if (count === 0) return 'neutral';
    const avg = score / count;
    if (avg > 3.2) return 'high';
    if (avg < 2.8) return 'low';
    return 'neutral';
  };

  for (const d of ['O', 'C', 'E', 'A', 'N'] as DomainKey[]) {
    accumulator[d].result = getLevel(accumulator[d].score, accumulator[d].count);
    for (let f = 1; f <= 6; f++) {
      const fKey = f.toString();
      const facetData = accumulator[d].facet[fKey];
      facetData.result = getLevel(facetData.score, facetData.count);
    }
  }

  const domainOrder: DomainKey[] = ['O', 'C', 'E', 'A', 'N'];
  
  const domainResults: DomainResult[] = domainOrder.map(domainKey => {
    const domainData = accumulator[domainKey];
    const templateData = RAW_TEMPLATES.find(t => t.domain === domainKey)!;
    
    const resultObj = templateData.results.find(r => r.score === domainData.result) || templateData.results[1];
    
    const maxScore = domainData.count * 5;
    const minScore = domainData.count * 1;
    const percentage = maxScore > minScore 
      ? Math.round(((domainData.score - minScore) / (maxScore - minScore)) * 100)
      : 50;

    const facets: FacetResult[] = templateData.facets.map(f => {
      const fKey = f.facet.toString();
      const fData = domainData.facet[fKey] || { score: 0, count: 0, result: 'neutral' };
      const fMax = fData.count * 5;
      const fMin = fData.count * 1;
      const fPct = fMax > fMin 
        ? Math.round(((fData.score - fMin) / (fMax - fMin)) * 100)
        : 50;

      return {
        facet: f.facet,
        title: f.title,
        text: f.text,
        score: fData.score,
        count: fData.count,
        scoreText: fData.result,
        maxScore: fMax,
        percentage: fPct
      };
    });

    return {
      domain: domainKey,
      title: templateData.title,
      shortDescription: templateData.shortDescription,
      description: templateData.description,
      scoreText: domainData.result,
      score: domainData.score,
      count: domainData.count,
      maxScore,
      percentage,
      text: resultObj.text,
      facets
    };
  });

  return {
    timestamp: new Date().toISOString(),
    mode,
    totalQuestions: questionPool.length,
    answersCount: answeredCount,
    results: domainResults,
    scores: accumulator
  };
}
`;

fs.writeFileSync('./src/data/bigfiveData.ts', tsCode, 'utf8');
console.log('src/data/bigfiveData.ts written successfully!');
