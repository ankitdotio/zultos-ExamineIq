'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import useViewport from '@/hooks/useViewport.js';
import { POPULAR_SEARCHES, CATEGORIES } from '@/data/mockData';
import { getAllExams } from '@/services/examService';

export default function ExamDiscovery() {
  const width = useViewport();
  const isMobile = width < 1040;
  const isTablet = width >= 1040 && width < 1180;
  const paddingX = isMobile ? 20 : isTablet ? 28 : 32;
  const discoveryPadY = isMobile ? 56 : 88;
  const h2Size = isMobile ? 30 : 38;

  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [category, setCategory] = useState('All');

  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await getAllExams();
        setExams(Array.isArray(response) ? response : response.data || []);
      } catch (err) {
        setError(err.message || 'Failed to load exams');
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, []);

  const q = query.trim().toLowerCase();
  const hasQuery = query.trim().length > 0;

  const results = q
    ? exams.filter((e) => e.name.toLowerCase().includes(q)).slice(0, 6)
    : [];

  const noResults = hasQuery && results.length === 0;

  const categoryResults = category !== 'All'
    ? exams.filter((e) => e.category === category).slice(0, 6)
    : exams.slice(0, 6);
  
  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIdx((i) => Math.min(i + 1, results.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIdx((i) => Math.max(i - 1, -1)); }
    else if (e.key === 'Escape') { setQuery(''); setActiveIdx(-1); e.target.blur(); }
  };

  return (
    <div id="exams" className="bg-white">
      <div className="max-w-[840px] mx-auto text-center" style={{ padding: `${discoveryPadY}px ${paddingX}px` }}>
        <div className="font-heading text-[13px] font-bold tracking-[0.08em] uppercase text-cyan mb-4">Exam Discovery</div>
        <h2 className="font-heading font-bold tracking-[-0.01em] text-navy mb-3" style={{ fontSize: h2Size }}>
          What are you preparing for?
        </h2>
        <p className="text-base leading-[1.6] text-text-secondary max-w-[460px] mx-auto mb-9">
          Search any competitive exam in India and jump straight into focused practice.
        </p>

        {/* SEARCH */}
        <div className="relative max-w-[640px] mx-auto">
          <div
            className="relative flex items-center h-[60px] bg-white border-[1.5px] rounded-full pl-[22px] pr-2 transition-all hover:border-[#C9CFD8]"
            style={{
              borderColor: focused ? '#1BAFD9' : '#E2E6ED',
              boxShadow: focused ? '0 4px 16px rgba(27,175,217,0.16)' : '0 2px 8px rgba(23,40,74,0.05)',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="flex-shrink-0">
              <circle cx="9" cy="9" r="6" stroke="#9AA4B2" strokeWidth="1.8" />
              <line x1="13.2" y1="13.2" x2="17" y2="17" stroke="#9AA4B2" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              role="combobox"
              aria-label="Search for an exam"
              aria-expanded={hasQuery}
              aria-controls="search-results-listbox"
              aria-activedescendant={activeIdx >= 0 ? `search-opt-${activeIdx}` : undefined}
              value={query}
              onChange={(e) => { setQuery(e.target.value); setActiveIdx(-1); }}
              onKeyDown={onKeyDown}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="Search SSC CGL, UPSC CSE, IBPS PO, GATE..."
              className="flex-1 border-none outline-none bg-transparent font-body text-base text-navy px-3 h-full"
            />
            {hasQuery ? (
              <button
                onClick={() => { setQuery(''); setActiveIdx(-1); }}
                aria-label="Clear search"
                className="w-8 h-8 rounded-full border-none bg-[#F1F3F6] flex items-center justify-center cursor-pointer flex-shrink-0 mr-1.5 hover:bg-[#E7EAEE]"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <line x1="3" y1="3" x2="11" y2="11" stroke="#5B6B82" strokeWidth="1.8" strokeLinecap="round" />
                  <line x1="11" y1="3" x2="3" y2="11" stroke="#5B6B82" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
            ) : (
              <div className="h-10 px-5 bg-navy text-white rounded-full flex items-center text-sm font-semibold flex-shrink-0">
                Search
              </div>
            )}
          </div>

          {hasQuery && (
            <div id="search-results-listbox" role="listbox" className="mt-3 bg-white border border-border rounded-[14px] shadow-[0_8px_24px_rgba(23,40,74,0.08)] text-left overflow-hidden">
              {results.length > 0 ? (
                results.map((r, i) => (
                  <Link
                    key={r._id || r.name}
                    href={`/exam/${r._id}`}
                    id={`search-opt-${i}`}
                    role="option"
                    aria-selected={i === activeIdx}
                    className="flex items-center justify-between px-5 py-3.5 border-b border-[#F1F3F6] last:border-b-0 hover:bg-surface"
                    style={{ background: i === activeIdx ? '#F7F8FA' : '#FFFFFF' }}
                  >
                    <div>
                      <div className="text-[15px] font-semibold text-navy">{r.name}</div>
                      <div className="text-xs text-text-muted mt-0.5">{r.category}</div>
                    </div>
                    <div className="text-[13px] font-semibold text-cyan flex items-center gap-1.5 whitespace-nowrap">
                      Practice
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <polyline points="5,3 10,7 5,11" stroke="#1BAFD9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                      </svg>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="px-5 py-7 text-center">
                  <div className="text-sm font-semibold text-navy mb-1">No exam found</div>
                  <div className="text-[13px] text-text-secondary">
                    Try another exam name or browse a category below.
                  </div>
                </div>
              )}
            </div>
          )}

          {!hasQuery && (
            <div className="flex flex-wrap justify-center gap-2.5 mt-5">
              {POPULAR_SEARCHES.map((label) => (
                <button
                  key={label}
                  onClick={() => { setQuery(label); setCategory(null); }}
                  className="h-9 px-4 bg-surface border border-border rounded-full text-[13px] font-semibold text-navy cursor-pointer hover:border-cyan hover:text-cyan transition-colors"
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* CATEGORIES */}
        <div className="mt-14">
          <div className="flex items-center justify-center gap-2 mb-5">
            <div className="text-[13px] font-bold text-text-secondary uppercase tracking-[0.06em]">Browse by category</div>
            <div className="text-[11px] text-[#B9C0CA] italic">[VERIFY BEFORE DEVELOPMENT — final taxonomy]</div>
          </div>
          <div
            className={isMobile ? 'flex flex-nowrap overflow-x-auto gap-2.5 pb-1.5 -mx-0.5 px-0.5' : 'flex flex-wrap justify-center gap-3 max-w-[760px] mx-auto'}
          >
            {CATEGORIES.map((cat) => {
              const active = category === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setCategory((c) => (c === cat ? null : cat))}
                  aria-pressed={active}
                  className="flex-shrink-0 px-5 py-3 rounded-[10px] text-sm font-semibold cursor-pointer whitespace-nowrap border transition-all hover:border-cyan hover:shadow-[0_2px_8px_rgba(23,40,74,0.06)]"
                  style={{
                    background: active ? '#17284A' : '#FFFFFF',
                    borderColor: active ? '#17284A' : '#E2E6ED',
                    color: active ? '#FFFFFF' : '#17284A',
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {category && (
            <div className="mt-5 max-w-[640px] mx-auto bg-white border border-border rounded-[14px] shadow-[0_8px_24px_rgba(23,40,74,0.08)] text-left overflow-hidden">
              {categoryResults.map((r) => (
                <Link
                  key={r._id || r.name}
                  href={`/exam/${r._id}`}
                  className="flex items-center justify-between px-5 py-3.5 border-b border-[#F1F3F6] last:border-b-0 hover:bg-surface"
                >
                  <div>
                    <div className="text-[15px] font-semibold text-navy">{r.name}</div>
                    <div className="text-xs text-text-muted mt-0.5">{r.category}</div>
                  </div>
                  <div className="text-[13px] font-semibold text-cyan flex items-center gap-1.5 whitespace-nowrap">
                    Practice
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <polyline points="5,3 10,7 5,11" stroke="#1BAFD9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <a
          href="#exams"
          className="inline-flex items-center gap-2 mt-10 h-[50px] px-[26px] bg-white text-navy border-[1.5px] border-navy rounded-full font-body text-[15px] font-semibold hover:bg-surface transition-colors"
        >
          Explore All Exams
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <line x1="3" y1="8" x2="13" y2="8" stroke="#17284A" strokeWidth="1.8" strokeLinecap="round" />
            <polyline points="9,4 13,8 9,12" stroke="#17284A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        </a>

        <div className="text-[11px] text-[#C4CAD3] mt-5">
          Exam data shown is representative for design purposes — the live list will be sourced dynamically.
        </div>
      </div>
    </div>
  );
}
