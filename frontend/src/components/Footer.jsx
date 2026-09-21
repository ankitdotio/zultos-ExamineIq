'use client';

import { useState } from 'react';
import useViewport from '@/hooks/useViewport.js';
import { FOOTER_GROUPS, LEGAL_LINKS } from '@/data/mockData.js';


export default function Footer() {
  const width = useViewport();
  const isMobile = width < 1040;
  const isTablet = width >= 1040 && width < 1180;
  const paddingX = isMobile ? 20 : isTablet ? 28 : 32;
  const footerCols = isMobile ? '1fr' : isTablet ? 'repeat(2,1fr)' : '1.6fr 1fr 1fr 1fr 1fr';

  const [openGroups, setOpenGroups] = useState({});
  const toggleGroup = (title) => setOpenGroups((s) => ({ ...s, [title]: !s[title] }));

  return (
    <footer className="bg-navy-dark border-t border-white/[0.08]">
      <div className="max-w-[1280px] mx-auto" style={{ padding: `64px ${paddingX}px 32px ${paddingX}px` }}>
        <div className="grid gap-10 mb-12" style={{ gridTemplateColumns: footerCols }}>
          <div>
            <div className="bg-white rounded-lg px-3 py-2 inline-flex mb-[18px]">
              <img src="/examineiq-logo-clean.png" alt="ExamineIQ" style={{ height: 22 }} className="w-auto object-contain block" />
            </div>
            <p className="text-sm leading-[1.6] text-white/65 max-w-[260px]">
              Prepare with purpose. Get recognized for your performance.
            </p>
          </div>

          {isMobile ? (
            <div className="flex flex-col">
              {FOOTER_GROUPS.map((g) => {
                const open = !!openGroups[g.title];
                return (
                  <div key={g.title} className="border-t border-white/10">
                    <button
                      onClick={() => toggleGroup(g.title)}
                      aria-expanded={open}
                      className="w-full bg-transparent border-none py-4 px-0.5 flex justify-between items-center cursor-pointer font-heading text-[13px] font-bold tracking-[0.06em] uppercase text-white/85 min-h-11"
                    >
                      <span>{g.title}</span>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        className="transition-transform duration-200"
                        style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
                      >
                        <polyline points="4,5 7,9 10,5" stroke="rgba(255,255,255,0.7)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                      </svg>
                    </button>
                    {open && (
                      <div className="flex flex-col gap-0.5 pb-4">
                        {g.links.map((l) => (
                          <a
                          key={l}
                          href="#"
                          className="text-sm text-white/65 py-3 px-0.5 min-h-11 flex items-center hover:text-cyan-light hover:underline"
                        >  {l}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            FOOTER_GROUPS.map((g) => (
              <div key={g.title}>
                <div className="font-heading text-xs font-bold tracking-[0.06em] uppercase text-white/50 mb-4">
                  {g.title}
                </div>
                <div className="flex flex-col gap-3">
                  {g.links.map((l) => (
                    <a key={l} href="#" className="text-sm text-white/[0.68] hover:text-cyan-light hover:underline">
                      {l}
                    </a>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="flex flex-wrap justify-between items-center gap-4 pt-7 border-t border-white/10">
          <div className="text-[13px] text-white/50">© 2026 ExamineIQ. All rights reserved.</div>
          <div className="flex flex-wrap gap-5">
            {LEGAL_LINKS.map((ll) => (
              <a key={ll} href="#" className="text-[13px] text-white/50 py-1.5 min-h-11 flex items-center hover:text-cyan-light hover:underline">
                {ll}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
