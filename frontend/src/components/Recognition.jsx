'use client';

import { useEffect, useRef, useState } from 'react';
import useViewport from '@/hooks/useViewport.js';
import { RECOGNITION_STEPS, RECOGNITION_STAGES } from '@/data/mockData.js';

export default function Recognition() {
  const width = useViewport();
  const isMobile = width < 1040;
  const isTablet = width >= 1040 && width < 1180;
  const paddingX = isMobile ? 20 : isTablet ? 28 : 32;
  const discoveryPadY = isMobile ? 56 : 88;
  const h2Size = isMobile ? 30 : 38;
  const introSpacing = isMobile ? 40 : 56;
  const panelPadX = isMobile ? 20 : 28;
  const direction = isMobile ? 'column' : 'row';

  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const el = sectionRef.current;
        if (el) {
          const rect = el.getBoundingClientRect();
          const vh = window.innerHeight;
          const start = vh * 0.85;
          const end = vh * 0.25;
          const p = Math.max(0, Math.min(1, (start - rect.top) / (start - end)));
          setProgress(p);
        }
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const activeIdx = Math.min(4, Math.floor(progress * 5));

  return (
    <div className="bg-navy" ref={sectionRef}>
      <div className="max-w-[1280px] mx-auto" style={{ padding: `${discoveryPadY}px ${paddingX}px` }}>
        <div className="max-w-[600px] mx-auto text-center" style={{ marginBottom: introSpacing }}>
          <div className="font-heading text-[13px] font-bold tracking-[0.08em] uppercase text-cyan-light mb-4">
            Differentiation
          </div>
          <h2 className="font-heading font-bold tracking-[-0.01em] text-white mb-3" style={{ fontSize: h2Size }}>
            Your preparation doesn't end with a mock-test score.
          </h2>
          <p className="text-base leading-[1.6] text-[#B9C4D6]">
            ExamineIQ connects your preparation to real exam performance — and recognizes genuine, consistent effort.
          </p>
        </div>

        <div className="flex items-start max-w-[840px] mx-auto" style={{ flexDirection: direction, marginBottom: introSpacing }}>
          {RECOGNITION_STEPS.map((step, i) => {
            const reached = i <= activeIdx;
            const isCurrent = i === activeIdx;
            const isFinal = step.number === 5;
            return (
              <div key={step.label} className="contents">
                <div className="flex flex-col items-center gap-3 w-24 flex-shrink-0">
                  {isFinal ? (
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300"
                      style={{
                        background: reached ? '#5FAE6A' : 'rgba(255,255,255,0.08)',
                        transform: isCurrent ? 'scale(1.08)' : 'scale(1)',
                        boxShadow: isCurrent && reached ? '0 4px 14px rgba(95,174,106,0.4)' : 'none',
                      }}
                    >
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <polyline points="3,9 7,13 15,4" stroke={reached ? '#FFFFFF' : 'rgba(255,255,255,0.35)'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                      </svg>
                    </div>
                  ) : (
                    <div
                      className="w-11 h-11 rounded-full border-[1.5px] flex items-center justify-center font-heading text-[15px] font-bold transition-all duration-300"
                      style={{
                        borderColor: reached ? '#1BAFD9' : 'rgba(255,255,255,0.28)',
                        background: isCurrent ? 'rgba(27,175,217,0.16)' : 'transparent',
                        color: reached ? '#FFFFFF' : 'rgba(255,255,255,0.45)',
                        transform: isCurrent ? 'scale(1.08)' : 'scale(1)',
                        boxShadow: isCurrent ? '0 4px 14px rgba(27,175,217,0.35)' : 'none',
                      }}
                    >
                      {step.number}
                    </div>
                  )}
                  <div
                    className="text-sm transition-colors duration-300"
                    style={{ color: reached ? '#FFFFFF' : 'rgba(255,255,255,0.45)', fontWeight: isCurrent ? 700 : 600 }}
                  >
                    {step.label}
                  </div>
                </div>
                {i < RECOGNITION_STEPS.length - 1 && (
                  <div
                    className="transition-[background] duration-300"
                    style={
                      isMobile
                        ? { width: 2, height: 28, margin: '4px 0 4px 21px', background: `linear-gradient(180deg, #1BAFD9 ${Math.round(Math.max(0, Math.min(1, progress * 5 - i)) * 100)}%, rgba(255,255,255,0.15) 0%)` }
                        : { flex: 1, height: 2, marginTop: 22, minWidth: 16, background: `linear-gradient(90deg, #1BAFD9 ${Math.round(Math.max(0, Math.min(1, progress * 5 - i)) * 100)}%, rgba(255,255,255,0.15) 0%)` }
                    }
                  />
                )}
              </div>
            );
          })}
        </div>

        <div
          id="scholarship"
          className="max-w-[680px] mx-auto bg-white/5 border border-white/10 rounded-card-lg text-center transition-all duration-200 hover:border-white/20 hover:shadow-[0_12px_32px_rgba(0,0,0,0.18)] hover:-translate-y-0.5"
          style={{ padding: panelPadX }}
        >
          <div className="font-heading text-[17px] font-bold text-white mb-2.5">Effort-based recognition</div>
          <p className="text-sm leading-[1.6] text-[#B9C4D6] mb-1.5">
            Consistent, verified performance on real exams can be recognized through ExamineIQ's scholarship program.
          </p>
          <div className="text-xs text-[#8A97AC] italic mb-[22px]">
            [FINAL SCHOLARSHIP RULES TO BE CONFIRMED — eligibility, ranks, amounts, number of recipients]
          </div>
          <button
            onClick={() => setExpanded((e) => !e)}
            aria-expanded={expanded}
            className="inline-flex items-center gap-2 h-12 px-6 bg-green text-white rounded-full font-body text-[15px] font-semibold hover:bg-green-dark transition-colors focus:outline-none focus:shadow-[0_0_0_3px_rgba(95,174,106,0.4)]"
          >
            Understand the Scholarship
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform" style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>
              <polyline points="4,6 8,10 12,6" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </button>

          {expanded && (
            <div className="mt-6 text-left bg-white/[0.04] border border-white/10 rounded-xl px-6 py-[22px]">
              <div className="text-[13px] font-bold text-white mb-4">How recognition works</div>
              <div className="flex flex-col gap-3.5">
                {RECOGNITION_STAGES.map((rs, i) => (
                  <div key={rs.title} className="flex gap-3 items-start">
                    <div className="w-[22px] h-[22px] rounded-full bg-cyan/20 text-cyan-light text-xs font-bold flex items-center justify-center flex-shrink-0 mt-px">
                      {i + 1}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{rs.title}</div>
                      <div className="text-[13px] leading-[1.5] text-[#B9C4D6] mt-0.5">{rs.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
