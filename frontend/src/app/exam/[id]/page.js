'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getExamById } from '@/services/examService';

export default function ExamDetails() {
  const { id } = useParams();
  const router = useRouter();

  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchExam = async () => {
      try {
        setLoading(true);
        setError('');

        const data = await getExamById(id);
        setExam(data);
      } catch (err) {
        setError(err.message || 'Failed to load exam details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchExam();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="font-body text-navy bg-white min-h-screen">
        <Header />

        <main className="max-w-[1280px] mx-auto px-8 py-16 text-center">
          <div className="animate-pulse">
            <div className="h-12 bg-surface rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-6 bg-surface rounded w-1/4 mx-auto"></div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  if (error || !exam) {
    return (
      <div className="font-body text-navy bg-white min-h-screen">
        <Header />

        <main className="max-w-[1280px] mx-auto px-8 py-16 text-center">
          <div className="max-w-md mx-auto">
            <h1 className="text-4xl font-bold font-heading text-navy mb-4">
              Exam Not Found
            </h1>

            <p className="text-lg text-text-secondary mb-8">
              {error ||
                'The exam you are looking for does not exist or has been removed.'}
            </p>

            <Link
              href="/"
              className="inline-flex items-center gap-2 h-[50px] px-[26px] bg-green text-white rounded-full font-body text-[15px] font-semibold hover:bg-green-dark hover:shadow-[0_5px_16px_rgba(95,174,106,0.3)] hover:-translate-y-0.5 transition-all"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M10 12L6 8L10 4"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              Back to Home
            </Link>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="font-body text-navy bg-white min-h-screen">
      <Header />

      <main className="max-w-[1280px] mx-auto px-8 py-16">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-text-secondary mb-8">
          <Link
            href="/"
            className="hover:text-cyan transition-colors"
          >
            Home
          </Link>

          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M6 4L10 8L6 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <span className="text-navy font-medium">
            {exam.name}
          </span>
        </div>

        {/* Exam Header */}
        <div className="mb-12">
          <div className="inline-block px-4 py-1.5 bg-cyan/10 text-cyan rounded-full text-sm font-semibold mb-4">
            {exam.category}
          </div>

          <h1 className="text-5xl font-bold font-heading text-navy mb-4">
            {exam.name}
          </h1>

          <p className="text-xl text-text-secondary max-w-3xl">
            {exam.description ||
              'Comprehensive exam preparation with practice questions and detailed solutions.'}
          </p>
        </div>

        {/* Exam Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {exam.totalQuestions !== undefined &&
            exam.totalQuestions !== null && (
              <div className="bg-surface rounded-card-lg p-6 border border-border">
                <div className="text-3xl font-bold text-navy mb-2">
                  {exam.totalQuestions}
                </div>

                <div className="text-sm text-text-secondary">
                  Total Questions
                </div>
              </div>
            )}

          {exam.duration !== undefined &&
            exam.duration !== null && (
              <div className="bg-surface rounded-card-lg p-6 border border-border">
                <div className="text-3xl font-bold text-navy mb-2">
                  {exam.duration} min
                </div>

                <div className="text-sm text-text-secondary">
                  Duration
                </div>
              </div>
            )}

          {exam.difficulty && (
            <div className="bg-surface rounded-card-lg p-6 border border-border">
              <div className="text-3xl font-bold text-navy mb-2 capitalize">
                {exam.difficulty}
              </div>

              <div className="text-sm text-text-secondary">
                Difficulty Level
              </div>
            </div>
          )}
        </div>

        {/* Exam Details */}
        <div className="bg-white rounded-card-lg border border-border p-8 mb-12">
          <h2 className="text-2xl font-bold font-heading text-navy mb-6">
            About This Exam
          </h2>

          <div className="space-y-4 text-text-secondary">
            <p>
              Prepare for the {exam.name} with our comprehensive practice
              tests. Our question bank covers all important topics and helps
              you assess your readiness for the actual exam.
            </p>

            {Array.isArray(exam.topics) && exam.topics.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-navy mb-3">
                  Key Topics Covered:
                </h3>

                <div className="flex flex-wrap gap-2">
                  {exam.topics.map((topic) => (
                    <span
                      key={topic}
                      className="px-4 py-2 bg-surface border border-border rounded-full text-sm text-navy"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-green/5 to-cyan/5 rounded-card-lg border border-border p-12 text-center">
          <h2 className="text-3xl font-bold font-heading text-navy mb-4">
            Ready to Start Practicing?
          </h2>

          <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
            Begin your preparation journey with our interactive practice tests
            and detailed explanations.
          </p>

          <button
            type="button"
            onClick={() => {
              console.log('Start practicing:', {
                examId: exam._id,
                examName: exam.name,
              });
            }}
            className="inline-flex items-center gap-2 h-[56px] px-8 bg-green text-white rounded-full font-body text-base font-semibold hover:bg-green-dark hover:shadow-[0_5px_16px_rgba(95,174,106,0.4)] hover:-translate-y-1 active:bg-green-darker active:scale-[0.98] transition-all"
          >
            Start Practicing

            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
            >
              <line
                x1="3"
                y1="9"
                x2="15"
                y2="9"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeLinecap="round"
              />

              <polyline
                points="10,4 15,9 10,14"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </button>
        </div>

        {/* Back Button */}
        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-text-secondary hover:text-navy transition-colors"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M10 12L6 8L10 4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            Back to Search
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}