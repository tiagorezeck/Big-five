import React from 'react';
import { DomainResult } from '../types/bigfive';
import { DOMAINS_META } from '../data/bigfiveData';

interface RadarChartProps {
  results: DomainResult[];
  size?: number;
}

export const RadarChart: React.FC<RadarChartProps> = ({ results, size = 380 }) => {
  // Fixed order for OCEAN presentation: O, C, E, A, N
  const order: Array<'O' | 'C' | 'E' | 'A' | 'N'> = ['O', 'C', 'E', 'A', 'N'];
  
  const orderedResults = order.map(k => results.find(r => r.domain === k) || {
    domain: k,
    title: DOMAINS_META[k].name,
    percentage: 50
  } as DomainResult);

  const center = size / 2;
  const radius = (size / 2) - 45; // margin for labels
  const total = orderedResults.length;
  const angleStep = (Math.PI * 2) / total;

  // Grid levels (20%, 40%, 60%, 80%, 100%)
  const levels = [0.2, 0.4, 0.6, 0.8, 1.0];

  // Helper to get coordinates
  const getCoordinates = (valueNormalized: number, index: number) => {
    // Start from top (- PI / 2)
    const angle = index * angleStep - Math.PI / 2;
    const r = radius * valueNormalized;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle)
    };
  };

  // Generate radar polygon points
  const points = orderedResults.map((item, i) => {
    const norm = Math.max(0.1, Math.min(1, item.percentage / 100));
    const { x, y } = getCoordinates(norm, i);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="flex flex-col items-center justify-center">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="overflow-visible select-none max-w-full drop-shadow-sm"
      >
        {/* Background circular/polygonal grids */}
        {levels.map((lvl) => {
          const gridPoints = Array.from({ length: total }).map((_, i) => {
            const { x, y } = getCoordinates(lvl, i);
            return `${x},${y}`;
          }).join(' ');

          return (
            <g key={lvl}>
              <polygon
                points={gridPoints}
                className="fill-none stroke-slate-200 dark:stroke-slate-700/80"
                strokeWidth={lvl === 1 ? '1.5' : '1'}
                strokeDasharray={lvl === 1 ? '' : '3 3'}
              />
              <text
                x={center + 4}
                y={center - radius * lvl + 12}
                className="fill-slate-400 text-[10px] font-mono select-none"
              >
                {Math.round(lvl * 100)}%
              </text>
            </g>
          );
        })}

        {/* Axis radial spokes */}
        {Array.from({ length: total }).map((_, i) => {
          const { x, y } = getCoordinates(1, i);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              className="stroke-slate-200 dark:stroke-slate-700"
              strokeWidth="1"
            />
          );
        })}

        {/* Data polygon filled */}
        <polygon
          points={points}
          className="fill-indigo-500/25 stroke-indigo-600 dark:fill-indigo-400/20 dark:stroke-indigo-400 transition-all duration-700 ease-out"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Data vertices and labels */}
        {orderedResults.map((item, i) => {
          const norm = Math.max(0.1, Math.min(1, item.percentage / 100));
          const pt = getCoordinates(norm, i);
          const meta = DOMAINS_META[item.domain];
          
          // Outer label position
          const labelAngle = i * angleStep - Math.PI / 2;
          const labelRadius = radius + 28;
          const lx = center + labelRadius * Math.cos(labelAngle);
          const ly = center + labelRadius * Math.sin(labelAngle);

          return (
            <g key={item.domain} className="group cursor-pointer">
              {/* Point Circle */}
              <circle
                cx={pt.x}
                cy={pt.y}
                r="6"
                fill={meta.color}
                className="stroke-white dark:stroke-slate-900 transition-transform duration-300 group-hover:scale-125"
                strokeWidth="2.5"
              />
              <circle
                cx={pt.x}
                cy={pt.y}
                r="10"
                fill={meta.color}
                opacity="0.2"
                className="transition-all duration-300 group-hover:opacity-40"
              />

              {/* Label at outer vertex */}
              <text
                x={lx}
                y={ly}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-xs font-bold fill-slate-800 dark:fill-slate-200 transition-colors"
              >
                {item.title.split(' ')[0]} ({item.percentage}%)
              </text>
            </g>
          );
        })}
      </svg>
      <div className="flex flex-wrap items-center justify-center gap-3 mt-4 text-xs text-slate-500">
        <span className="flex items-center gap-1.5 font-medium">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 inline-block"></span>
          Seu Perfil Big Five
        </span>
        <span className="text-slate-400">•</span>
        <span>Escala de 0% a 100% por Domínio</span>
      </div>
    </div>
  );
};
