'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import useViewport from '@/hooks/useViewport.js';
import { useAuth } from '@/hooks/useAuth.js';
import { NAV_ITEMS } from '@/data/mockData.js';


export default function Header() {
  const width = useViewport();
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isMobile = width < 1040;
  const isTablet = width >= 1040 && width < 1180;

  const paddingX = isMobile ? 20 : isTablet ? 28 : 32;
  const navGap = isTablet ? 20 : 32;
  const logoHeight = isMobile ? 26 : 30;
  const baseHeight = isMobile ? 64 : isTablet ? 72 : 80;
  const headerHeight = scrolled ? baseHeight - 8 : baseHeight;

  // Fix: Use useEffect for scroll listener
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 bg-white transition-[box-shadow,border-color,height] duration-200"
      style={{
        borderBottom: scrolled ? '1px solid rgba(23,40,74,0.10)' : '1px solid rgba(23,40,74,0.08)',
        boxShadow: scrolled ? '0 2px 12px rgba(23,40,74,0.06)' : 'none',
      }}
    >
      <div
        className="max-w-[1280px] mx-auto grid items-center transition-[height,padding] duration-200"
        style={{ height: headerHeight, padding: `0 ${paddingX}px`, gridTemplateColumns: '1fr auto 1fr', columnGap: 24 }}
      >
        <a href="/" aria-label="ExamineIQ home" className="flex items-center flex-shrink-0 justify-self-start opacity-100 hover:opacity-80 transition-opacity">
          <img src="/examineiq-logo-clean.png" alt="ExamineIQ" style={{ height: logoHeight }} className="w-auto object-contain block" />
        </a>

        <div className="justify-self-center min-w-0 overflow-hidden">
          {!isMobile && (
            <nav className="flex items-center" style={{ gap: navGap }} aria-label="Primary">
              {NAV_ITEMS.map((item) => (
                <a
              key={item.label}
              href={item.href}
              className="font-body text-[15px] font-medium text-navy py-1.5 border-b-2 border-transparent hover:border-green hover:text-[#0F1D34] transition-colors whitespace-nowrap focus:outline-none focus:rounded-sm focus:shadow-[0_0_0_3px_rgba(23,40,74,0.18)]"
            >
                  {item.label}
                </a>
              ))}
            </nav>
          )}
        </div>

        <div className="justify-self-end flex items-center gap-4 min-w-0 flex-shrink-0">
          {!isMobile && (
            <>
              {user ? (
                // Show user name and logout when logged in
                <>
                  <span className="font-body text-[15px] font-medium text-navy">
                    Hi, <span className="text-green font-semibold">{user.name}</span>
                  </span>
                  <button
                    onClick={logout}
                    className="font-body text-[15px] font-medium text-navy hover:text-error transition-colors focus:outline-none focus:rounded-sm focus:shadow-[0_0_0_3px_rgba(23,40,74,0.18)]"
                  >
                    Logout
                  </button>
                </>
              ) : (
                // Show login and get started when not logged in
                <>
                  <Link
                    href="/login"
                    className="font-body text-[15px] font-medium text-navy hover:text-green transition-colors focus:outline-none focus:rounded-sm focus:shadow-[0_0_0_3px_rgba(23,40,74,0.18)]"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="group h-11 px-[22px] bg-green text-white rounded-full flex items-center gap-2 font-body text-[15px] font-semibold tracking-[0.01em] flex-shrink-0 shadow-[0_2px_8px_rgba(95,174,106,0.28)] hover:bg-green-dark hover:shadow-[0_5px_16px_rgba(95,174,106,0.4)] hover:-translate-y-px active:bg-green-darker active:scale-[0.97] transition-all focus:outline-none focus:shadow-[0_0_0_3px_rgba(95,174,106,0.35)]"
                  >
                    Get Started
                    <ArrowIcon />
                  </Link>
                </>
              )}
            </>
          )}

          {isMobile && (
            <button
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              className="w-11 h-11 bg-transparent border border-border rounded-lg flex items-center justify-center cursor-pointer flex-shrink-0 hover:bg-surface focus:outline-none focus:shadow-[0_0_0_3px_rgba(27,175,217,0.35)]"
            >
              {mobileOpen ? <CloseIcon /> : <BurgerIcon />}
            </button>
          )}
        </div>
      </div>

      {isMobile && mobileOpen && (
        <div
          className="bg-white border-t border-border shadow-[0_12px_32px_rgba(23,40,74,0.12)] flex flex-col gap-0.5"
          style={{ padding: `20px ${paddingX}px 24px ${paddingX}px` }}
          role="navigation"
          aria-label="Mobile"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="text-base font-medium text-navy px-2 py-3.5 rounded-lg hover:bg-surface focus:outline-none focus:shadow-[0_0_0_3px_rgba(23,40,74,0.18)]"
            >
              {item.label}
            </a>
          ))}
          {user ? (
            // Logged in mobile menu
            <div className="flex flex-col gap-2 mt-3.5">
              <div className="h-12 bg-green/10 border-2 border-green rounded-full flex items-center justify-center text-[15px] font-semibold text-navy">
                Hi, <span className="text-green ml-1">{user.name}</span>
              </div>
              <button
                onClick={logout}
                className="h-12 bg-error text-white rounded-full flex items-center justify-center text-[15px] font-semibold hover:bg-error/90"
              >
                Logout
              </button>
            </div>
          ) : (
            // Not logged in mobile menu
            <div className="flex flex-col gap-2 mt-3.5">
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="h-12 bg-transparent border-2 border-navy text-navy rounded-full flex items-center justify-center text-[15px] font-semibold hover:bg-navy/5"
              >
                Login
              </Link>
              <Link
                href="/signup"
                onClick={() => setMobileOpen(false)}
                className="h-12 bg-green text-white rounded-full flex items-center justify-center gap-2 text-[15px] font-semibold hover:bg-green-dark"
              >
                Get Started
                <ArrowIcon />
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform group-hover:translate-x-[3px]">
      <line x1="3" y1="8" x2="13" y2="8" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
      <polyline points="9,4 13,8 9,12" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}
function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <line x1="4" y1="4" x2="16" y2="16" stroke="#17284A" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="16" y1="4" x2="4" y2="16" stroke="#17284A" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
function BurgerIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <line x1="3" y1="6" x2="17" y2="6" stroke="#17284A" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="3" y1="10" x2="17" y2="10" stroke="#17284A" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="3" y1="14" x2="17" y2="14" stroke="#17284A" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
