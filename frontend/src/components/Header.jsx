'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import useViewport from '@/hooks/useViewport.js';
import { NAV_ITEMS } from '@/data/mockData.js';

export default function Header() {
  const width = useViewport();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const isMobile = width < 1040;
  const isTablet = width >= 1040 && width < 1180;

  const paddingX = isMobile ? 20 : isTablet ? 28 : 32;
  const navGap = isTablet ? 20 : 32;
  const logoHeight = isMobile ? 26 : 30;

  const baseHeight = isMobile ? 64 : isTablet ? 72 : 80;
  const headerHeight = scrolled ? baseHeight - 8 : baseHeight;

  return (
    <header
      className="sticky top-0 z-50 bg-white transition-[box-shadow,border-color,height] duration-200"
      style={{
        borderBottom: scrolled
          ? '1px solid rgba(23,40,74,0.10)'
          : '1px solid rgba(23,40,74,0.08)',
        boxShadow: scrolled
          ? '0 2px 12px rgba(23,40,74,0.06)'
          : 'none',
      }}
    >
      <div
        className="max-w-[1280px] mx-auto grid items-center transition-[height,padding] duration-200"
        style={{
          height: headerHeight,
          padding: `0 ${paddingX}px`,
          gridTemplateColumns: '1fr auto 1fr',
          columnGap: 24,
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          aria-label="ExamineIQ home"
          className="flex items-center flex-shrink-0 justify-self-start opacity-100 hover:opacity-80 transition-opacity"
        >
          <img
            src="/examineiq-logo-clean.png"
            alt="ExamineIQ"
            style={{ height: logoHeight }}
            className="w-auto object-contain block"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="justify-self-center min-w-0 overflow-hidden">
          {!isMobile && (
            <nav
              className="flex items-center"
              style={{ gap: navGap }}
              aria-label="Primary"
            >
              {NAV_ITEMS.map((item) => <NavItem key={item.label} item={item} />)}
            </nav>
          )}
        </div>

        {/* Mobile Menu Control */}
        <div className="justify-self-end flex items-center min-w-0 flex-shrink-0">
          {/* Mobile Menu Button */}
          {isMobile && (
            <button
              onClick={() => setMobileOpen((open) => !open)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              className="w-11 h-11 bg-transparent border border-border rounded-lg flex items-center justify-center cursor-pointer flex-shrink-0 hover:bg-surface focus:outline-none focus:shadow-[0_0_0_3px_rgba(27,175,217,0.35)]"
            >
              {mobileOpen ? <CloseIcon /> : <BurgerIcon />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobile && mobileOpen && (
        <div
          className="bg-white border-t border-border shadow-[0_12px_32px_rgba(23,40,74,0.12)] flex flex-col gap-0.5"
          style={{
            padding: `20px ${paddingX}px 24px ${paddingX}px`,
          }}
          role="navigation"
          aria-label="Mobile"
        >
          {NAV_ITEMS.map((item) => (
            <NavItem key={item.label} item={item} mobile onNavigate={() => setMobileOpen(false)} />
          ))}
        </div>
      )}
    </header>
  );
}

function NavItem({ item, mobile = false, onNavigate }) {
  return (
    <a
      href={item.href}
      onClick={onNavigate}
      className={mobile
        ? 'text-base font-medium text-navy px-2 py-3.5 rounded-lg hover:bg-surface focus:outline-none focus:shadow-[0_0_0_3px_rgba(23,40,74,0.18)]'
        : 'font-body text-[15px] font-medium text-navy py-1.5 border-b-2 border-transparent hover:border-green hover:text-[#0F1D34] transition-colors whitespace-nowrap focus:outline-none focus:rounded-sm focus:shadow-[0_0_0_3px_rgba(23,40,74,0.18)]'}
    >
      {item.label}
    </a>
  );
}

function CloseIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <line
        x1="4"
        y1="4"
        x2="16"
        y2="16"
        stroke="#17284A"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <line
        x1="16"
        y1="4"
        x2="4"
        y2="16"
        stroke="#17284A"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BurgerIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <line
        x1="3"
        y1="6"
        x2="17"
        y2="6"
        stroke="#17284A"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <line
        x1="3"
        y1="10"
        x2="17"
        y2="10"
        stroke="#17284A"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <line
        x1="3"
        y1="14"
        x2="17"
        y2="14"
        stroke="#17284A"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}