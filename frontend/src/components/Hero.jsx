'use client';

import { useEffect, useRef, useState } from 'react';
import useViewport from '@/hooks/useViewport.js';
import useReducedMotion from '@/hooks/useReducedMotion.js';
import useOnScreen from '@/hooks/useOnScreen.js';
import { TRUST_POINTS, HERO_DEMO } from '@/data/mockData.js';

export default function Hero() {
  const width = useViewport();
  const isMobile = width < 1040;
  const isTablet = width >= 1040 && width < 1180;
  const paddingX = isMobile ? 20 : isTablet ? 28 : 32;
  const heroStack = width < 860;

  const h1Size = heroStack ? 34 : 52;
  const bodySize = heroStack ? 16 : 18;

  const reducedMotion = useReducedMotion();
  const [visualRef, visible] = useOnScreen({ threshold: 0.2 });
  const [qIndex, setQIndex] = useState(0);
  const [phase, setPhase] = useState('idle'); // idle -> selected -> evaluated
  const timerRef = useRef(null);

  useEffect(() => {
    if (reducedMotion || !visible) return undefined;
    if (phase === 'idle') timerRef.current = setTimeout(() => setPhase('selected'), 1600);
    else if (phase === 'selected') timerRef.current = setTimeout(() => setPhase('evaluated'), 900);
    else if (phase === 'evaluated') {
      timerRef.current = setTimeout(() => {
        setQIndex((i) => (i + 1) % HERO_DEMO.length);
        setPhase('idle');
      }, 1900);
    }
    return () => clearTimeout(timerRef.current);
  }, [phase, visible, reducedMotion]);

  const HD = HERO_DEMO[qIndex];
  const accuracy = phase === 'evaluated' ? [62, 74, 84][qIndex] : qIndex === 0 ? 58 : [62, 74, 84][qIndex - 1];
  const progressPct = Math.round(((qIndex + (phase !== 'idle' ? 1 : 0.3)) / HERO_DEMO.length) * 100);

  return (
    <div id="main-content" className="bg-white">
      <div
        className="max-w-[1280px] mx-auto grid items-center"
        style={{
          padding: `${heroStack ? 48 : 80}px ${paddingX}px ${heroStack ? 56 : 88}px ${paddingX}px`,
          gridTemplateColumns: heroStack ? '1fr' : 'minmax(0,1.05fr) minmax(0,0.95fr)',
          gap: heroStack ? 40 : 64,
        }}
      >
        {/* HERO CONTENT */}
        <div className="min-w-0">
          <div className="font-heading text-[13px] font-bold tracking-[0.08em] uppercase text-cyan mb-[18px]">
            AI-Powered Exam Preparation
          </div>
          <h1
            className="font-heading font-extrabold tracking-[-0.02em] leading-[1.08] text-navy mb-[22px]"
            style={{ fontSize: h1Size }}
          >
            Practice like it's exam day.
          </h1>
          <p className="font-body leading-[1.6] text-text-secondary max-w-[520px] mb-8" style={{ fontSize: bodySize }}>
            ExamineIQ gives competitive-exam aspirants AI-powered mock tests, real performance
            analysis, and a clear path to improve — for every major exam in India.
          </p>

          <div className="flex flex-wrap gap-4 mb-8">
            <a
              href="#practice"
              className="group h-[52px] px-7 bg-green text-white rounded-full flex items-center gap-2 font-body text-[15px] font-semibold tracking-[0.01em] shadow-[0_2px_8px_rgba(95,174,106,0.28)] hover:bg-green-dark hover:shadow-[0_5px_16px_rgba(95,174,106,0.4)] hover:-translate-y-px active:bg-green-darker active:scale-[0.97] transition-all focus:outline-none focus:shadow-[0_0_0_3px_rgba(95,174,106,0.35)]"
            >
              Start Practicing
              <ArrowIcon color="#FFFFFF" className="transition-transform group-hover:translate-x-[3px]" />
            </a>
            <a
              href="#exams"
              className="h-[52px] px-7 bg-white text-navy border-[1.5px] border-navy rounded-full flex items-center font-body text-[15px] font-semibold hover:bg-surface active:bg-[#EEF0F3] transition-colors focus:outline-none focus:shadow-[0_0_0_3px_rgba(23,40,74,0.18)]"
            >
              Explore Exams
            </a>
          </div>

          <div className="flex flex-wrap gap-7">
            {TRUST_POINTS.map((tp) => (
              <div key={tp} className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <polyline points="3,8 6.5,11.5 13,4.5" stroke="#5FAE6A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
                <div className="text-sm text-text-secondary font-medium">{tp}</div>
              </div>
            ))}
          </div>
        </div>

        {/* HERO PRODUCT VISUAL — cycling select -> evaluate -> next demo */}
        <div className="relative min-w-0" ref={visualRef}>
          <div className="bg-white border border-border rounded-2xl shadow-[0_12px_32px_rgba(23,40,74,0.12)] overflow-hidden">
            <div className="flex items-center gap-1.5 px-5 py-3.5 bg-surface border-b border-border">
              <div className="text-[13px] font-semibold text-text-muted">Discover</div>
              <div className="w-3.5 h-px bg-[#D8DDE4]" />
              <div
                className="text-[13px] font-bold px-3 py-1 rounded-full transition-colors"
                style={{ color: phase === 'evaluated' ? '#9AA4B2' : '#FFFFFF', background: phase === 'evaluated' ? 'transparent' : '#1BAFD9' }}
              >
                Practice
              </div>
              <div className="w-3.5 h-px bg-[#D8DDE4]" />
              <div
                className="text-[13px] font-bold px-3 py-1 rounded-full transition-colors"
                style={{ color: phase === 'evaluated' ? '#FFFFFF' : '#9AA4B2', background: phase === 'evaluated' ? '#1BAFD9' : 'transparent' }}
              >
                Analyze
              </div>
            </div>
            <div className="p-6">
              <div className="text-xs text-text-secondary font-semibold tracking-[0.02em] mb-2.5">
                QUESTION {qIndex + 1} OF 100 · {HD.tag}
              </div>
              <div className="text-base font-semibold text-navy leading-[1.5] mb-[18px] min-h-[48px]">{HD.text}</div>
              <div className="flex flex-col gap-2.5 mb-5">
                {HD.options.map((opt, i) => {
                  const isCorrect = i === HD.correct;
                  const showAsSelected = isCorrect && phase === 'selected';
                  const showAsEvaluated = isCorrect && phase === 'evaluated';
                  return (
                    <div
                      key={opt}
                      className="border-[1.5px] rounded-[10px] px-3.5 py-3 text-sm flex justify-between items-center transition-colors"
                      style={{
                        borderColor: showAsEvaluated ? '#5FAE6A' : showAsSelected ? '#1BAFD9' : '#E2E6ED',
                        background: showAsEvaluated ? '#F1FAF2' : showAsSelected ? '#EAF7FB' : '#FFFFFF',
                        color: showAsEvaluated ? '#2E7A3B' : showAsSelected ? '#0F6E8C' : '#17284A',
                        fontWeight: showAsSelected || showAsEvaluated ? 600 : 400,
                      }}
                    >
                      {opt}
                      {showAsEvaluated && (
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <polyline points="3,8 6.5,11.5 13,4.5" stroke="#5FAE6A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                        </svg>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-1.5 bg-[#EEF0F3] rounded-full overflow-hidden">
                  <div className="h-full bg-cyan transition-[width] duration-500" style={{ width: `${progressPct}%` }} />
                </div>
                <div className="text-xs text-text-secondary font-mono flex-shrink-0">00:42</div>
              </div>
            </div>
          </div>

          <div className="absolute -left-5 -bottom-6 bg-white border border-border rounded-xl shadow-[0_8px_24px_rgba(23,40,74,0.14)] px-[18px] py-3.5 flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-full border-[5px] flex items-center justify-center text-xs font-bold text-navy flex-shrink-0 transition-colors"
              style={{ borderColor: '#EAF7FB', borderTopColor: '#5FAE6A', borderRightColor: '#5FAE6A' }}
            >
              {accuracy}%
            </div>
            <div>
              <div className="text-xs text-text-secondary">Accuracy</div>
              <div className="text-[13px] font-semibold text-success flex items-center gap-1">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <polyline points="2,8 6,4 10,8" stroke="#3E8A4B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
                Improving
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ArrowIcon({ color, className }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={className}>
      <line x1="3" y1="8" x2="13" y2="8" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <polyline points="9,4 13,8 9,12" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}
