'use client';

import useViewport from '@/hooks/useViewport.js';

export default function FinalCTA() {
  const width = useViewport();
  const isMobile = width < 1040;
  const isTablet = width >= 1040 && width < 1180;
  const paddingX = isMobile ? 20 : isTablet ? 28 : 32;
  const h2Size = isMobile ? 30 : 38;
  const padY = isMobile ? 56 : 80;

  return (
    <div className="bg-navy">
      <div className="max-w-[760px] mx-auto text-center" style={{ padding: `${padY}px ${paddingX}px` }}>
        <h2 className="font-heading font-bold tracking-[-0.01em] text-white mb-3" style={{ fontSize: h2Size }}>
          Your next practice session starts here.
        </h2>
        <p className="text-base leading-[1.6] text-[#B9C4D6] mb-8">
          Choose your exam and start preparing with ExamineIQ.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="#practice"
            className="group h-[52px] px-7 bg-green text-white rounded-full flex items-center gap-2 font-body text-[15px] font-semibold tracking-[0.01em] shadow-[0_2px_8px_rgba(95,174,106,0.32)] hover:bg-green-dark hover:shadow-[0_5px_16px_rgba(95,174,106,0.44)] hover:-translate-y-px active:bg-green-darker active:scale-[0.97] transition-all focus:outline-none focus:shadow-[0_0_0_3px_rgba(95,174,106,0.4)]"
          >
            Start Practicing Free
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform group-hover:translate-x-[3px]">
              <line x1="3" y1="8" x2="13" y2="8" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
              <polyline points="9,4 13,8 9,12" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </a>
          <a
          href="#exams"
          className="h-[52px] px-7 bg-transparent text-white border-[1.5px] border-white/35 rounded-full flex items-center font-body text-[15px] font-semibold hover:bg-white/10 hover:border-white/60 active:bg-white/15 transition-colors focus:outline-none focus:shadow-[0_0_0_3px_rgba(255,255,255,0.35)]"
          >
            Explore Exams
          </a>
        </div>
      </div>
    </div>
  );
}
