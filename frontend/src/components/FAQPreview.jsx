'use client';

import { useState } from 'react';
import useViewport from '@/hooks/useViewport.js';
import { FAQS } from '@/data/mockData.js';

export default function FAQPreview() {
  const width = useViewport();
  const isMobile = width < 1040;
  const isTablet = width >= 1040 && width < 1180;
  const paddingX = isMobile ? 20 : isTablet ? 28 : 32;
  const discoveryPadY = isMobile ? 56 : 88;
  const h2Size = isMobile ? 30 : 38;
  const faqStack = isMobile ? '1fr' : '1fr 1.4fr';

  const [openFaq, setOpenFaq] = useState(-1);

  return (
    <div id="faq" className="bg-surface border-t border-[#EEF0F3]">
      <div className="max-w-[1280px] mx-auto" style={{ padding: `${discoveryPadY}px ${paddingX}px` }}>
        <div className="grid gap-12" style={{ gridTemplateColumns: faqStack }}>
          <div>
            <div className="font-heading text-[13px] font-bold tracking-[0.08em] uppercase text-navy mb-4">FAQ</div>
            <h2 className="font-heading font-bold tracking-[-0.01em] text-navy mb-3" style={{ fontSize: h2Size }}>
              Questions, answered.
            </h2>
            <p className="text-base leading-[1.6] text-text-secondary max-w-[360px] mb-6">
              A few things worth knowing before you start practicing.
            </p>
            <a href="#faq" className="font-body text-[15px] font-semibold text-cyan hover:underline">
              View All FAQs →
            </a>
          </div>

          <div className="border-t border-border">
            {FAQS.map((f, i) => {
              const open = openFaq === i;
              const qId = `faq-q-${i}`;
              const aId = `faq-a-${i}`;
              return (
                <div key={f.q} className="border-b border-border">
                  <button
                    id={qId}
                    onClick={() => setOpenFaq(open ? -1 : i)}
                    aria-expanded={open}
                    aria-controls={aId}
                    className="w-full text-left bg-transparent border-none py-[18px] px-1 flex justify-between items-center gap-4 cursor-pointer font-body text-base font-semibold text-navy min-h-11 hover:text-cyan focus:outline-none focus:rounded-md focus:shadow-[0_0_0_3px_rgba(23,40,74,0.18)]"
                  >
                    <span>{f.q}</span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="flex-shrink-0 transition-transform duration-200"
                      style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    >
                      <polyline points="4,6 8,10 12,6" stroke="#5B6B82" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    </svg>
                  </button>
                  {open && (
                    <div id={aId} role="region" aria-labelledby={qId} className="px-1 pb-5 text-sm leading-[1.6] text-text-secondary max-w-[520px]">
                      {f.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
