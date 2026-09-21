'use client';

import { useEffect, useRef, useState } from 'react';
import useViewport from '@/hooks/useViewport.js';
import { DEMO_QUESTIONS, SECTION_TABS, TOPIC_PERFORMANCE } from '@/data/mockData.js';

export default function ProductExperience() {
  const width = useViewport();
  const isMobile = width < 1040;
  const isTablet = width >= 1040 && width < 1180;
  const paddingX = isMobile ? 20 : isTablet ? 28 : 32;
  const discoveryPadY = isMobile ? 56 : 88;
  const h2Size = isMobile ? 30 : 38;
  const introSpacing = isMobile ? 40 : 56;
  const topBarPadX = isMobile ? 18 : 24;
  const panelPadX = isMobile ? 20 : 28;
  const metricCols = isMobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)';

  const [activeTab, setActiveTab] = useState('test');
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [phase, setPhase] = useState('idle'); // idle -> pending -> evaluated
  const [answeredCount, setAnsweredCount] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const answerTimer = useRef(null);

  useEffect(() => () => clearTimeout(answerTimer.current), []);

  const isTestTab = activeTab === 'test';
  const q = DEMO_QUESTIONS[qIndex];
  const isLast = qIndex === DEMO_QUESTIONS.length - 1;
  const answered = phase === 'evaluated';
  const progressPct = Math.round(((qIndex + (answered ? 1 : 0.4)) / DEMO_QUESTIONS.length) * 100);
  const wasCorrect = answered && selected === q.correct;
  const accuracy = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 74;

  const selectOption = (i) => {
    if (phase !== 'idle') return;
    clearTimeout(answerTimer.current);
    setSelected(i);
    setPhase('pending');
    answerTimer.current = setTimeout(() => {
      setPhase('evaluated');
      setAnsweredCount((c) => c + 1);
      setCorrectCount((c) => c + (i === q.correct ? 1 : 0));
    }, 700);
  };

  const jumpToSection = (label) => {
    clearTimeout(answerTimer.current);
    const idx = DEMO_QUESTIONS.findIndex((dq) => dq.section === label);
    setQIndex(idx);
    setSelected(null);
    setPhase('idle');
  };

  const nextQuestion = () => {
    if (!answered) return;
    if (isLast) setActiveTab('analytics');
    else {
      setQIndex((i) => i + 1);
      setSelected(null);
      setPhase('idle');
    }
  };

  return (
    <div id="how-it-works" className="bg-surface border-t border-[#EEF0F3]">
      <div className="max-w-[1280px] mx-auto" style={{ padding: `${discoveryPadY}px ${paddingX}px` }}>
        <div className="max-w-[560px] mx-auto text-center" style={{ marginBottom: introSpacing }}>
          <div className="font-heading text-[13px] font-bold tracking-[0.08em] uppercase text-cyan mb-4">
            The ExamineIQ Experience
          </div>
          <h2 className="font-heading font-bold tracking-[-0.01em] text-navy mb-3" style={{ fontSize: h2Size }}>
            Practice with purpose.
          </h2>
          <p className="text-base leading-[1.6] text-text-secondary">
            Don't just take another mock. Understand your performance and know exactly what to improve.
          </p>
        </div>

        <div className="max-w-[920px] mx-auto bg-white border border-border rounded-card-lg shadow-[0_16px_40px_rgba(23,40,74,0.10)] overflow-hidden">
          <div className="bg-navy flex items-center justify-between gap-3 flex-wrap" style={{ padding: `16px ${topBarPadX}px` }}>
            <div className="text-white text-sm font-semibold">SSC CGL Tier 1 — Mock Test 3</div>
            <div className="flex bg-white/10 rounded-full p-1">
              <button
                onClick={() => { clearTimeout(answerTimer.current); setActiveTab('test'); }}
                className="h-[30px] px-4 rounded-full border-none text-[13px] font-semibold cursor-pointer transition-colors"
                style={{ background: isTestTab ? '#FFFFFF' : 'transparent', color: isTestTab ? '#17284A' : '#FFFFFF' }}
              >
                Mock Test
              </button>
              <button
                onClick={() => { clearTimeout(answerTimer.current); setActiveTab('analytics'); }}
                className="h-[30px] px-4 rounded-full border-none text-[13px] font-semibold cursor-pointer transition-colors"
                style={{ background: !isTestTab ? '#FFFFFF' : 'transparent', color: !isTestTab ? '#17284A' : '#FFFFFF' }}
              >
                Analytics
              </button>
            </div>
          </div>

          {isTestTab ? (
            <div style={{ padding: panelPadX }}>
              <div className="flex items-center justify-between gap-3 flex-wrap mb-5">
                <div className="flex gap-2 flex-wrap">
                  {SECTION_TABS.map((label) => {
                    const active = label === q.section;
                    return (
                      <button
                        key={label}
                        onClick={() => jumpToSection(label)}
                        className="text-[13px] font-semibold py-1.5 px-1 border-b-2 bg-transparent cursor-pointer"
                        style={{ borderColor: active ? '#1BAFD9' : 'transparent', color: active ? '#17284A' : '#9AA4B2' }}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
                <div className="font-mono text-[13px] text-text-secondary bg-surface px-3 py-1.5 rounded-lg">⏱ 18:42</div>
              </div>

              <div className="flex items-center gap-3 mb-5">
                <div className="flex-1 h-1.5 bg-[#EEF0F3] rounded-full overflow-hidden">
                  <div className="h-full bg-cyan transition-[width] duration-300" style={{ width: `${progressPct}%` }} />
                </div>
                <div className="text-xs text-text-muted font-mono flex-shrink-0">
                  Q{qIndex + 1}/{DEMO_QUESTIONS.length}
                </div>
              </div>

              <div className="text-xs text-text-secondary font-semibold tracking-[0.02em] mb-2">{q.tag}</div>
              <div className="text-[17px] font-semibold text-navy leading-[1.5] mb-[18px] min-h-[52px]">{q.text}</div>

              <div className="flex flex-col gap-2.5 mb-4">
                {q.options.map((opt, i) => {
                  const isSelected = selected === i;
                  const isCorrectOpt = i === q.correct;
                  let borderColor = '#E2E6ED', background = '#FFFFFF', color = '#17284A', fontWeight = 400, showCheck = false, showCross = false;
                  if (phase === 'pending' && isSelected) { borderColor = '#1BAFD9'; background = '#EAF7FB'; color = '#0F6E8C'; fontWeight = 600; }
                  else if (phase === 'evaluated') {
                    if (isSelected && isCorrectOpt) { borderColor = '#5FAE6A'; background = '#F1FAF2'; color = '#2E7A3B'; fontWeight = 600; showCheck = true; }
                    else if (isSelected && !isCorrectOpt) { borderColor = '#D5484B'; background = '#FDEEEE'; color = '#B23A3D'; fontWeight = 600; showCross = true; }
                    else if (!isSelected && isCorrectOpt) { borderColor = '#5FAE6A'; color = '#2E7A3B'; fontWeight = 600; showCheck = true; }
                    else { color = '#B9C0CA'; }
                  }
                  return (
                    <button
                      key={opt}
                      onClick={() => selectOption(i)}
                      disabled={phase !== 'idle'}
                      className="text-left rounded-[10px] px-4 py-3 text-sm cursor-pointer transition-colors flex justify-between items-center border-[1.5px] disabled:cursor-default"
                      style={{ borderColor, background, color, fontWeight }}
                    >
                      {opt}
                      {showCheck && (
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <polyline points="3,8 6.5,11.5 13,4.5" stroke="#5FAE6A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                        </svg>
                      )}
                      {showCross && (
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <line x1="4" y1="4" x2="12" y2="12" stroke="#D5484B" strokeWidth="2" strokeLinecap="round" />
                          <line x1="12" y1="4" x2="4" y2="12" stroke="#D5484B" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      )}
                    </button>
                  );
                })}
              </div>

              {answered && (
                <div className="text-[13px] font-semibold mb-4" style={{ color: wasCorrect ? '#2E7A3B' : '#B23A3D' }}>
                  {wasCorrect ? '✓ Correct.' : `✗ Not quite — correct answer: ${q.options[q.correct]}`}
                </div>
              )}

              <div className="flex justify-between items-center flex-wrap gap-3">
                <div className="text-xs text-[#B9C0CA] italic">[PRODUCT FEATURE TO CONFIRM — negative marking rules]</div>
                <button
                  onClick={nextQuestion}
                  disabled={!answered}
                  className="h-11 px-6 bg-navy text-white border-none rounded-full text-sm font-semibold cursor-pointer hover:bg-navy-dark transition-opacity disabled:cursor-not-allowed"
                  style={{ opacity: answered ? 1 : 0.45 }}
                >
                  {isLast ? 'View Results' : 'Next Question'}
                </button>
              </div>
            </div>
          ) : (
            <div style={{ padding: panelPadX }}>
              <div className="grid gap-4 mb-7" style={{ gridTemplateColumns: metricCols }}>
                <Metric label="Score" value="74 / 100" />
                <Metric label="Accuracy" value={`${accuracy}%`} note={answeredCount > 0 ? 'This preview session' : undefined} />
                <Metric label="Avg. Time / Qn" value="52s" />
                <Metric label="Percentile" value="—" note="[PRODUCT FEATURE TO CONFIRM]" />
              </div>

              <div className="text-[13px] font-bold text-navy mb-3.5">Topic-wise performance</div>
              <div className="flex flex-col gap-3.5 mb-7">
                {TOPIC_PERFORMANCE.map((t) => (
                  <div key={t.topic}>
                    <div className="flex justify-between text-[13px] mb-1.5">
                      <div className="text-navy font-medium">{t.topic}</div>
                      <div className="text-text-secondary font-semibold">{t.pct}%</div>
                    </div>
                    <div className="h-2 bg-[#EEF0F3] rounded-full overflow-hidden">
                      <div className="h-full" style={{ width: `${t.pct}%`, background: t.color }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-success-bg border border-success-border rounded-xl px-[18px] py-4 flex justify-between items-center gap-3 flex-wrap">
                <div>
                  <div className="text-[13px] font-bold text-success mb-0.5">Recommended next: General Awareness</div>
                  <div className="text-[11px] text-[#5B8A61] italic">[PRODUCT FEATURE TO CONFIRM — recommendation logic]</div>
                </div>
                <div className="text-[13px] font-semibold text-success flex items-center gap-1.5 whitespace-nowrap">
                  Practice now
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <polyline points="5,3 10,7 5,11" stroke="#3E8A4B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </svg>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Metric({ label, value, note }) {
  return (
    <div className="bg-surface rounded-xl p-4">
      <div className="text-xs text-text-secondary mb-1.5">{label}</div>
      <div className="font-heading text-[22px] font-bold text-navy">{value}</div>
      {note && <div className="text-[10px] text-[#B9C0CA] italic mt-0.5">{note}</div>}
    </div>
  );
}
