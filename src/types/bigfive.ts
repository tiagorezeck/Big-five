export type DomainKey = 'O' | 'C' | 'E' | 'A' | 'N';

export type KeyedDirection = 'plus' | 'minus';

export interface Question {
  id: string;
  text: string;
  keyed: KeyedDirection;
  domain: DomainKey;
  facet: number; // 1 to 6
  num: number; // 1 to 120
}

export interface Choice {
  text: string;
  score: number;
  color?: number;
}

export type ScoreLevel = 'low' | 'neutral' | 'high';

export interface AnswerItem {
  questionId: string;
  domain: DomainKey;
  facet: number;
  score: number; // 1 to 5
}

export interface FacetResult {
  facet: number;
  title: string;
  text: string;
  score: number;
  count: number;
  scoreText: ScoreLevel;
  maxScore: number;
  percentage: number;
}

export interface DomainResult {
  domain: DomainKey;
  title: string;
  shortDescription: string;
  description: string;
  scoreText: ScoreLevel;
  score: number;
  count: number;
  maxScore: number;
  percentage: number;
  text: string;
  facets: FacetResult[];
}

export interface BigFiveResult {
  timestamp: string;
  mode: 'full' | 'short';
  totalQuestions: number;
  answersCount: number;
  results: DomainResult[];
  scores: Record<DomainKey, {
    score: number;
    count: number;
    result: ScoreLevel;
    facet: Record<string, { score: number; count: number; result: ScoreLevel }>;
  }>;
}

export interface DomainMeta {
  key: DomainKey;
  name: string;
  englishName: string;
  subtitle: string;
  color: string;
  bgLight: string;
  borderColor: string;
  textColor: string;
  icon: string;
  summary: string;
  lowLabel: string;
  highLabel: string;
}
