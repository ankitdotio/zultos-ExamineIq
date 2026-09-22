'use client';

import useViewport from '@/hooks/useViewport.js';
import useRevealOnScroll from '@/hooks/useRevealOnScroll.js';
import { EXAM_COUNT } from '@/data/mockData.js';

const PROOF_POINTS = [
  {
    title: `${EXAM_COUNT} Exams`,
    verify: true,
    desc: "Find preparation for the exam you're targeting.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="3" y="3" width="12" height="12" rx="2" stroke="#17284A" strokeWidth="1.6" />
        <line x1="6" y1="7" x2="12" y2="7" stroke="#17284A" strokeWidth="1.6" />
        <line x1="6" y1="10" x2="12" y2="10" stroke="#17284A" strokeWidth="1.6" />
      </svg>
    ),
    micro: (
      <div className="flex gap-1 mb-2.5">
        <div className="w-4 h-1 rounded-sm bg-cyan" />
        <div className="w-2.5 h-1 rounded-sm bg-border" />
        <div className="w-2.5 h-1 rounded-sm bg-border" />
        <div className="w-2.5 h-1 rounded-sm bg-border" />
      </div>
    ),
  },
  {
    title: 'AI-Powered Practice',
    desc: 'Practice with exam-focused mock tests that adapt to your level.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="6" stroke="#17284A" strokeWidth="1.6" />
        <circle cx="9" cy="9" r="1.6" fill="#17284A" />
        <line x1="9" y1="9" x2="12.5" y2="6.5" stroke="#17284A" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
    micro: (
      <div className="flex items-center gap-1.5 mb-2.5">
        <div className="w-1.5 h-1.5 rounded-full bg-green" />
        <div className="text-[11px] text-text-muted tracking-[0.02em]">Live evaluation</div>
      </div>
    ),
  },
  {
    title: 'Performance Analytics',
    desc: "Understand where you're improving and where you need work.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <line x1="4" y1="14" x2="4" y2="9" stroke="#17284A" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="9" y1="14" x2="9" y2="5" stroke="#17284A" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="14" y1="14" x2="14" y2="11" stroke="#17284A" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
    micro: (
      <div className="flex items-end gap-[3px] h-4 mb-2.5">
        <div className="w-[5px] rounded-sm bg-border" style={{ height: '40%' }} />
        <div className="w-[5px] rounded-sm bg-border" style={{ height: '65%' }} />
        <div className="w-[5px] rounded-sm bg-cyan" style={{ height: '100%' }} />
        <div className="w-[5px] rounded-sm bg-border" style={{ height: '55%' }} />
      </div>
    ),
  },
  {
    title: 'Exam-Specific Preparation',
    desc: "Structured practice built around your exam's actual pattern.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="3" y="3" width="12" height="12" rx="2" stroke="#17284A" strokeWidth="1.6" />
        <line x1="6" y1="11" x2="9" y2="8" stroke="#17284A" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="9" y1="8" x2="12" y2="10" stroke="#17284A" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
    micro: (
      <div className="flex items-center gap-2 mb-2.5">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <polyline points="2,6 5,9 10,3" stroke="#5FAE6A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
        <div className="w-7 h-px bg-border" />
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <polyline points="2,6 5,9 10,3" stroke="#D8DDE4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      </div>
    ),
  },
];

export default function ProductProof() {
  const width = useViewport();
  const isMobile = width < 640;
  const isTablet = width >= 640 && width < 1180;
  const paddingX = width < 1040 ? 20 : width < 1180 ? 28 : 32;
  const proofPadY = width < 1040 ? 40 : 56;
  const cols = isMobile ? '1fr' : isTablet ? 'repeat(2,1fr)' : 'repeat(4,1fr)';

  return (
    <div className="bg-surface border-y border-[#EEF0F3]">
      <div className="max-w-[1280px] mx-auto" style={{ padding: `${proofPadY}px ${paddingX}px` }}>
        <div className="grid gap-5" style={{ gridTemplateColumns: cols }}>
          {PROOF_POINTS.map((p, i) => (
            <ProofCard key={p.title} point={p} delay={i * 70} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProofCard({ point, delay }) {
  const [ref, style] = useRevealOnScroll(delay);
  return (
    <div
      ref={ref}
      style={style}
      className="bg-white border border-border rounded-card p-5 transition-all duration-200 hover:shadow-[0_6px_16px_rgba(23,40,74,0.10)] hover:border-[#C9CFD8] hover:-translate-y-[3px] group"
    >
      <div className="w-10 h-10 rounded-[10px] bg-surface-alt flex items-center justify-center mb-4 transition-transform group-hover:scale-[1.06]">
        {point.icon}
      </div>
      <div className="font-heading text-[17px] font-bold text-navy mb-1">{point.title}</div>
      {point.verify && <div className="text-[11px] text-text-muted italic mb-2.5">[VERIFY BEFORE DEVELOPMENT]</div>}
      {point.micro}
      <div className="text-sm leading-[1.55] text-text-secondary">{point.desc}</div>
    </div>
  );
}
