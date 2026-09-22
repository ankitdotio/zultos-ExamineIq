'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SAMPLE_EXAMS, CATEGORIES } from '@/data/mockData';
import { getAllExams } from '@/services/examService';

const CATEGORY_ICONS = {
  UPSC: '⌂',
  SSC: '▣',
  Banking: '▰',
  Railways: '▦',
  Defence: '◯',
  Engineering: '✦',
  Teaching: '▤',
  'State Exams': '⌖',
  'Other Competitive Exams': '▦',
};

export default function ExamsPage() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('relevance');
  const [upcomingOnly, setUpcomingOnly] = useState(false);

  useEffect(() => {
    let active = true;

    getAllExams()
      .then((response) => {
        if (!active) return;
        setExams(response.length > 0 ? response : SAMPLE_EXAMS);
      })
      .catch(() => {
        if (!active) return;
        setError('Exams are temporarily unavailable. Please try again shortly.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => { active = false; };
  }, []);

  /*
   * Create the category list from the available mock data.
   * This means we don't show categories that currently
   * have no exams.
   */
  const availableCategories = useMemo(() => {
    const categories = exams.map((exam) => normalizeCategory(exam.category));

    return CATEGORIES.filter((category) => categories.includes(category));
  }, [exams]);

  /*
   * Popular exams
   */
 const popularExams = useMemo(() => {
  const markedPopular = exams.filter(
    (exam) =>
      exam?.isPopular === true ||
      exam?.popular === true ||
      exam?.is_popular === true
  );

  if (markedPopular.length > 0) {
    return markedPopular;
  }

  return exams.slice(0, 6);
}, [exams]);

  /*
   * Category counts
   */
  const categoryCounts = useMemo(() => {
    const counts = {};

    exams.forEach((exam) => {
      const category = normalizeCategory(exam.category);
      counts[category] = (counts[category] || 0) + 1;
    });

    return counts;
  }, [exams]);

  /*
   * Filter + sort the exam directory.
   */
  const filteredExams = useMemo(() => {
    let filtered = [...exams];

    if (query.trim()) {
      const search = query.trim().toLowerCase();
      filtered = filtered.filter((exam) =>
        `${exam.name || ''} ${exam.category || ''}`.toLowerCase().includes(search)
      );
    }

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(
        (exam) => normalizeCategory(exam.category) === selectedCategory
      );
    }

    if (upcomingOnly) {
      filtered = filtered.filter((exam) => isUpcoming(exam));
    }

    if (sortBy === 'alphabetical') {
      filtered.sort((a, b) =>
        String(a.name || '').localeCompare(String(b.name || ''))
      );
    }

    if (sortBy === 'popularity') {
      filtered.sort((a, b) => {
        const aPopularity = Number(a.popularity ?? a.popularityScore ?? 0);
        const bPopularity = Number(b.popularity ?? b.popularityScore ?? 0);
        return bPopularity - aPopularity || String(a.name || '').localeCompare(String(b.name || ''));
      });
    }

    return filtered;
  }, [
    exams,
    query,
    selectedCategory,
    sortBy,
    upcomingOnly,
  ]);

  /*
   * Group exams by category.
   */
  const groupedExams = useMemo(() => {
    const groups = {};

    filteredExams.forEach((exam) => {
      const category = normalizeCategory(exam.category);
      if (!groups[category]) {
        groups[category] = [];
      }

      groups[category].push(exam);
    });

    return groups;
  }, [filteredExams]);

  /*
   * Clicking a category should move the user
   * directly to the All Exams section.
   */
  const selectCategory = (category) => {
    setSelectedCategory(category);

    setTimeout(() => {
      document
        .getElementById('all-exams')
        ?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
    }, 50);
  };

  /*
   * Reset filters.
   */
  const clearFilters = () => {
    setSelectedCategory('All');
    setSortBy('relevance');
    setUpcomingOnly(false);
  };

  return (
    <div className="font-body text-navy bg-white min-h-screen">
      <Header />

      <main>
        {/* =========================================
            POPULAR EXAMS
        ========================================== */}
        <section className="max-w-[1280px] mx-auto px-8 pt-12 pb-16">
          <div className="mb-6">
            <p className="text-sm font-bold uppercase tracking-[0.12em] text-text-secondary">
              Popular Exams
            </p>
          </div>

          <div className="grid grid-cols-5 gap-4">
            {popularExams.map((exam) => (
              <ExamCard
                key={exam.name}
                exam={exam}
              />
            ))}
          </div>
        </section>

        {/* =========================================
            BROWSE BY CATEGORY
        ========================================== */}
        <section className="bg-surface border-y border-border">
          <div className="max-w-[1280px] mx-auto px-8 py-14">
            <div className="mb-8">
              <h2 className="text-2xl font-bold font-heading text-navy">
                Browse by Category
              </h2>
            </div>

            <div className="grid grid-cols-3 gap-5">
              {availableCategories.map((category) => {
                const isSelected =
                  selectedCategory === category;

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() =>
                      selectCategory(category)
                    }
                    className={`text-left p-5 rounded-card-lg border transition-all ${
                      isSelected
                        ? 'border-cyan bg-cyan/5 shadow-sm'
                        : 'border-border bg-white hover:border-cyan hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-11 h-11 rounded-xl flex items-center justify-center text-lg ${
                          isSelected
                            ? 'bg-cyan/10 text-cyan'
                            : 'bg-surface text-text-secondary'
                        }`}
                      >
                        {CATEGORY_ICONS[category] || '▦'}
                      </div>

                      <div>
                        <h3 className="font-semibold text-navy">
                          {category}
                        </h3>

                        <p className="text-sm text-text-secondary mt-1">
                          {categoryCounts[category] || 0}{' '}
                          exams
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================
            ALL EXAMS
        ========================================== */}
        <section
          id="all-exams"
          className="scroll-mt-24 max-w-[1280px] mx-auto px-8 py-16"
        >
          <div className="flex items-end justify-between gap-8 mb-8">
            <div>
              <h2 className="text-3xl font-bold font-heading text-navy">
                {selectedCategory === 'All'
                  ? 'All Exams'
                  : selectedCategory}
              </h2>

              <p className="text-text-secondary mt-2">
                {filteredExams.length}{' '}
                {filteredExams.length === 1
                  ? 'exam'
                  : 'exams'}
              </p>
            </div>

            {selectedCategory !== 'All' && (
              <button
                type="button"
                onClick={clearFilters}
                className="text-sm font-semibold text-cyan hover:text-navy transition-colors"
              >
                Clear · view all exams
              </button>
            )}
          </div>

          {/* FILTER BAR */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <label htmlFor="exam-search" className="sr-only">Search exams</label>
            <input
              id="exam-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search exams"
              className="h-10 w-full max-w-xs rounded-full border border-border bg-white px-4 text-sm text-navy outline-none focus:border-cyan focus:ring-2 focus:ring-cyan/20"
            />
            <SortButton
              active={sortBy === 'relevance'}
              onClick={() =>
                setSortBy('relevance')
              }
            >
              Relevance
            </SortButton>

            <SortButton
              active={sortBy === 'popularity'}
              onClick={() =>
                setSortBy('popularity')
              }
            >
              Popularity
            </SortButton>

            <SortButton
              active={sortBy === 'alphabetical'}
              onClick={() =>
                setSortBy('alphabetical')
              }
            >
              A–Z
            </SortButton>

            <button
              type="button"
              onClick={() =>
                setUpcomingOnly((value) => !value)
              }
              className={`ml-2 px-4 py-2 rounded-full border text-sm font-semibold transition-all ${
                upcomingOnly
                  ? 'bg-green/10 border-green text-green'
                  : 'border-border text-text-secondary hover:border-cyan hover:text-cyan'
              }`}
            >
              Upcoming only
            </button>
          </div>

          <div className="grid grid-cols-[210px_1fr] gap-12">
            {/* CATEGORY SIDEBAR */}
            <aside>
              <div className="sticky top-28">
                <p className="text-xs uppercase tracking-[0.12em] font-bold text-text-secondary mb-4">
                  Categories
                </p>

                <div className="space-y-1">
                  <CategorySideButton
                    active={selectedCategory === 'All'}
                    onClick={() =>
                      setSelectedCategory('All')
                    }
                  >
                    All Exams
                  </CategorySideButton>

                  {availableCategories.map(
                    (category) => (
                      <CategorySideButton
                        key={category}
                        active={
                          selectedCategory ===
                          category
                        }
                        onClick={() =>
                          setSelectedCategory(
                            category
                          )
                        }
                      >
                        {category}
                      </CategorySideButton>
                    )
                  )}
                </div>
              </div>
            </aside>

            {/* EXAM DIRECTORY */}
            <div>
              {loading ? (
                <div className="border border-border rounded-card-lg p-10 text-center text-sm text-text-secondary">
                  Loading exams...
                </div>
              ) : error ? (
                <div className="border border-border rounded-card-lg p-10 text-center">
                  <h3 className="text-base font-bold text-navy mb-2">Unable to load exams</h3>
                  <p className="text-sm text-text-secondary">{error}</p>
                </div>
              ) : filteredExams.length === 0 ? (
                <div className="border border-border rounded-card-lg p-12 text-center">
                  <h3 className="text-xl font-bold text-navy mb-2">
                    No exams found
                  </h3>

                  <p className="text-text-secondary mb-6">
                    Try changing your filters.
                  </p>

                  <button
                    type="button"
                    onClick={clearFilters}
                    className="px-5 py-2.5 bg-green text-white rounded-full font-semibold"
                  >
                    Clear filters
                  </button>
                </div>
              ) : (
                Object.entries(groupedExams).map(
                      ([category, categoryExams]) => (
                    <div
                      key={category}
                      className="mb-12"
                    >
                      <h3 className="text-lg font-bold text-navy mb-2">
                        {category}
                      </h3>

                      <div className="divide-y divide-border border-t border-border">
                        {categoryExams.map((exam) => (
                          <ExamRow
                            key={exam.name}
                            exam={exam}
                          />
                        ))}
                      </div>
                    </div>
                  )
                )
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

/* =========================================
   POPULAR EXAM CARD
========================================= */

function ExamCard({ exam }) {
  return (
    <div className="group min-w-0 border border-border rounded-card-lg bg-white p-5 hover:border-cyan hover:shadow-sm transition-all">
      <div className="flex items-start justify-between gap-3 mb-8">
        <h3 className="font-semibold text-navy truncate">
          {exam.name}
        </h3>

        <span className="shrink-0 px-2.5 py-1 bg-cyan/10 text-cyan rounded-full text-[11px] font-semibold">
          {normalizeCategory(exam.category)}
        </span>
      </div>

      <Link
       href={`/exam/${encodeURIComponent(exam._id || exam.id || exam.name)}`}
        className="inline-flex items-center gap-2 text-sm font-semibold text-cyan hover:text-navy transition-colors"
      >
        Practice
        <span>›</span>
      </Link>
    </div>
  );
}

/* =========================================
   EXAM ROW
========================================= */

function ExamRow({ exam }) {
  const isPopular = isPopularExam(exam);

  return (
    <div className="flex items-center justify-between gap-6 py-5">
      <div className="min-w-0">
        <div className="flex items-center gap-3 flex-wrap">
          <h4 className="text-base font-semibold text-navy">
            {exam.name}
          </h4>

          <span className="px-2.5 py-1 bg-surface border border-border rounded-full text-[11px] font-medium text-text-secondary">
            {normalizeCategory(exam.category)}
          </span>

          {isPopular && (
            <span className="inline-flex items-center gap-1 text-xs text-green font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-green" />
              Popular
            </span>
          )}
        </div>
      </div>

      <Link
        href={`/exam/${encodeURIComponent(
          exam.name
        )}`}
        className="shrink-0 inline-flex items-center gap-2 text-sm font-semibold text-cyan hover:text-navy transition-colors"
      >
        Practice
        <span>›</span>
      </Link>
    </div>
  );
}

function normalizeCategory(category) {
  const value = String(category || '').trim();
  const normalized = value.toLowerCase();

  if (normalized === 'railways' || normalized === 'railway') return 'Railway';
  if (normalized === 'other competitive exams' || normalized === 'other') return 'Other';
  if (normalized === 'teaching') return 'Teaching';
  return value || 'Other';
}

function isPopularExam(exam) {
  return Boolean(exam?.popular || exam?.isPopular || exam?.featured);
}

function isUpcoming(exam) {
  const status = String(exam?.status || exam?.scheduleStatus || '').toLowerCase();
  return Boolean(exam?.upcoming || status.includes('upcoming'));
}

/* =========================================
   SORT BUTTON
========================================= */

function SortButton({
  active,
  onClick,
  children,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
        active
          ? 'bg-surface text-navy'
          : 'text-text-secondary hover:text-navy'
      }`}
    >
      {children}
    </button>
  );
}

/* =========================================
   CATEGORY SIDEBAR BUTTON
========================================= */

function CategorySideButton({
  active,
  onClick,
  children,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`block w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all ${
        active
          ? 'bg-surface text-navy font-semibold'
          : 'text-text-secondary hover:bg-surface hover:text-navy'
      }`}
    >
      {children}
    </button>
  );
}