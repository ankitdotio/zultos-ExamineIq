'use client';

import useViewport from '@/hooks/useViewport.js';

const PRINCIPLES = [
  {
    title: 'Clear rules',
    desc: 'Scholarship and recognition criteria are published in full, so you always know what counts.',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="3" y="2" width="10" height="12" rx="1.5" stroke="#17284A" strokeWidth="1.5" />
        <line x1="5.5" y1="6" x2="10.5" y2="6" stroke="#17284A" strokeWidth="1.5" />
        <line x1="5.5" y1="9" x2="10.5" y2="9" stroke="#17284A" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: 'Verified performance',
    desc: 'Only performance from verified real-exam activity is considered for recognition.',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="6" stroke="#17284A" strokeWidth="1.5" />
        <polyline points="5,8 7,10 11,6" stroke="#17284A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    ),
  },
  {
    title: 'Transparent ranking',
    desc: 'The methodology behind any ranking or recognition is defined and published, not a black box.',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <line x1="3" y1="13" x2="3" y2="9" stroke="#17284A" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="8" y1="13" x2="8" y2="5" stroke="#17284A" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="13" y1="13" x2="13" y2="7" stroke="#17284A" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Data privacy',
    desc: 'Your preparation data is used to power your own analytics — not sold or shared for marketing.',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="3.5" y="7" width="9" height="7" rx="1.5" stroke="#17284A" strokeWidth="1.5" />
        <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" stroke="#17284A" strokeWidth="1.5" fill="none" />
      </svg>
    ),
  },
];

export default function Trust() {
  const width = useViewport();
  const isMobile = width < 1040;
  const isTablet = width >= 1040 && width < 1180;
  const paddingX = isMobile ? 20 : isTablet ? 28 : 32;
  const discoveryPadY = isMobile ? 56 : 88;
  const h2Size = isMobile ? 30 : 38;

  return (
    <div className="bg-white">
      <div className="max-w-[760px] mx-auto" style={{ padding: `${discoveryPadY}px ${paddingX}px` }}>
        <div className="text-center mb-12">
          <div className="font-heading text-[13px] font-bold tracking-[0.08em] uppercase text-navy mb-4">
            Trust &amp; Transparency
          </div>
          <h2 className="font-heading font-bold tracking-[-0.01em] text-navy mb-3" style={{ fontSize: h2Size }}>
            Built on clear rules, not vague promises.
          </h2>
          <p className="text-base leading-[1.6] text-text-secondary max-w-[520px] mx-auto">
            Before you invest your preparation time, here's exactly how ExamineIQ works behind the scenes.
          </p>
        </div>

        <div className="border-t border-border">
          {PRINCIPLES.map((p) => (
            <div
              key={p.title}
              tabIndex={0}
              className="group flex items-center gap-5 py-6 px-4 -mx-4 border-b border-border rounded-[10px] transition-colors hover:bg-[#FAFBFC] hover:border-[#D8DDE4] focus:outline-none focus:shadow-[0_0_0_3px_rgba(23,40,74,0.14)]"
            >
              <div className="w-9 h-9 rounded-[10px] bg-surface-alt flex items-center justify-center flex-shrink-0">
                {p.icon}
              </div>
              <div className="flex-1">
                <div className="font-heading text-base font-bold text-navy mb-1">{p.title}</div>
                <div className="text-sm leading-[1.6] text-text-secondary">{p.desc}</div>
              </div>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0 transition-transform group-hover:translate-x-[3px]">
                <polyline points="5,3 10,7 5,11" stroke="#9AA4B2" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </div>
          ))}
        </div>

        <div className="text-xs text-text-muted italic mt-4">
          [VERIFY BEFORE DEVELOPMENT — align wording with the final published scholarship rules, ranking methodology
          and privacy policy]
        </div>

        <div className="text-center mt-9">
          <a href="#scholarship" className="font-body text-[15px] font-semibold text-cyan hover:underline">
            View Scholarship Rules →
          </a>
        </div>
      </div>
    </div>
  );
}
