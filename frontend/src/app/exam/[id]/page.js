'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getExamById } from '@/services/examService';

const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'practice', label: 'Practice' },
  { id: 'test-series', label: 'Test Series' },
  { id: 'subject-practice', label: 'Subjects' },
  { id: 'pattern', label: 'Exam Pattern' },
  { id: 'dates', label: 'Important Dates' },
  { id: 'eligibility', label: 'Eligibility' },
  { id: 'resources', label: 'Resources' },
  { id: 'faq', label: 'FAQ' },
];

const defaultSubjects = [
  {
    name: 'Quantitative Aptitude',
    description:
      'Arithmetic, algebra, geometry, mensuration and data interpretation.',
    questions: 'Practice questions',
    topics: 'Multiple topics',
  },
  {
    name: 'Reasoning',
    description:
      'Verbal and non-verbal reasoning, series, analogy, puzzles and coding.',
    questions: 'Practice questions',
    topics: 'Multiple topics',
  },
  {
    name: 'English',
    description:
      'Grammar, vocabulary, comprehension and error spotting.',
    questions: 'Practice questions',
    topics: 'Multiple topics',
  },
  {
    name: 'General Awareness',
    description:
      'Static GK, current affairs, polity, history and geography.',
    questions: 'Practice questions',
    topics: 'Multiple topics',
  },
];

const defaultTestSeries = [
  {
    type: 'Full-Length',
    plan: 'Free',
    title: 'Full-Length Mock Series',
    details: 'Exam-focused full-length practice tests',
  },
  {
    type: 'Sectional',
    plan: 'Premium',
    title: 'Section-wise Practice Sets',
    details: 'Focused practice for individual sections',
  },
  {
    type: 'Subject / Topic',
    plan: 'Premium',
    title: 'Subject & Topic Drills',
    details: 'Practice specific subjects and topics',
  },
  {
    type: 'Performance',
    plan: 'Premium',
    title: 'Adaptive Performance Tests',
    details: 'Practice based on your performance',
  },
];

const defaultFaqs = [
  {
    question: 'What is this exam?',
    answer:
      'This page provides exam-specific preparation information, practice options and useful resources.',
  },
  {
    question: 'Who can apply?',
    answer:
      'Eligibility depends on the latest official notification for the selected exam.',
  },
  {
    question: 'What is the exam pattern?',
    answer:
      'The latest official notification should be checked for the exact pattern, sections, duration and marking scheme.',
  },
  {
    question: 'How can I practice?',
    answer:
      'Use the practice options on this page to access exam-focused tests and topic-wise preparation.',
  },
  {
    question: 'Where can I find the syllabus?',
    answer:
      'Use the Resources section for syllabus and preparation material when available.',
  },
];

const SSC_CGL_DATA = {
  category: 'SSC',
  conductingBody: 'Staff Selection Commission',
  level: 'National',
  stages: 'Tier I - IV',
  duration: '60-120 min',
  eligibility: "Bachelor’s · Age 18-32",
  mode: 'Online (CBT)',
  language: 'English & Hindi',
  frequency: 'Annual',

  patternDescription:
    'SSC CGL is conducted across multiple stages — pattern and syllabus differ by stage.',

  ageLimit: '18 – 32 years',

  education:
    'Bachelor’s degree from a recognized university',

  otherEligibility:
    'Indian citizen · post-specific physical standards may apply',

  dates: [
    {
      title: 'Notification Released',
      status: 'Completed',
      prefix: 'Released',
      date: '15 Mar 2026',
    },
    {
      title: 'Registration Opens',
      status: 'Completed',
      prefix: 'Opened',
      date: '15 Mar 2026',
    },
    {
      title: 'Registration Closes',
      status: 'Open now',
      prefix: 'Closes',
      date: '10 Apr 2026',
    },
    {
      title: 'Application Correction Window',
      status: 'Not announced',
      prefix: 'Expected',
      date: 'To be announced',
    },
    {
      title: 'Admit Card',
      status: 'Upcoming',
      prefix: 'Expected',
      date: 'May 2026',
    },
    {
      title: 'Exam Date (Tier I)',
      status: 'Upcoming',
      prefix: 'Expected',
      date: 'June 2026',
    },
    {
      title: 'Answer Key (Tier I)',
      status: 'Not announced',
      prefix: 'Expected',
      date: 'To be announced',
    },
    {
      title: 'Result (Tier I)',
      status: 'Not announced',
      prefix: 'Expected',
      date: 'To be announced',
    },
    {
      title: 'Exam Date (Tier II)',
      status: 'Not announced',
      prefix: 'Expected',
      date: 'To be announced',
    },
    {
      title: 'Answer Key (Tier II)',
      status: 'Not announced',
      prefix: 'Expected',
      date: 'To be announced',
    },
    {
      title: 'Final Result',
      status: 'Not announced',
      prefix: 'Expected',
      date: 'To be announced',
    },
    {
      title: 'Cut-off / Final Selection',
      status: 'Not announced',
      prefix: 'Expected',
      date: 'To be announced',
    },
  ],

  patterns: {
    'Tier I': {
      totalQuestions: '100',
      totalMarks: '200',
      duration: '60 min',
      negativeMarking: '-0.50',
      rows: [
        {
          subject: 'Quantitative Aptitude',
          questions: '25',
          marks: '50',
          duration: 'Combined',
        },
        {
          subject: 'Reasoning',
          questions: '25',
          marks: '50',
          duration: 'Combined',
        },
        {
          subject: 'English Comprehension',
          questions: '25',
          marks: '50',
          duration: 'Combined',
        },
        {
          subject: 'General Awareness',
          questions: '25',
          marks: '50',
          duration: 'Combined',
        },
      ],
    },

    'Tier II': {
      totalQuestions: '120',
      totalMarks: '240',
      duration: '150 min',
      negativeMarking: 'Varies by section',
      rows: [
        {
          subject: 'Quantitative Aptitude',
          questions: '30',
          marks: '60',
          duration: '60 min',
        },
        {
          subject: 'Reasoning & GI',
          questions: '30',
          marks: '60',
          duration: '30 min',
        },
        {
          subject: 'English & Comprehension',
          questions: '30',
          marks: '60',
          duration: '30 min',
        },
        {
          subject: 'General Awareness',
          questions: '30',
          marks: '60',
          duration: '30 min',
        },
      ],
    },
  },
};

const BANKING_EXAM_DATA = {
  category: 'Banking',
  conductingBody: 'Banking Recruitment Exam',
  level: 'National',
  stages: 'Prelims - Mains',
  duration: 'Varies by exam',
  eligibility: 'Graduation · Check latest notification',
  mode: 'Online (CBT)',
  language: 'English & Hindi',
  frequency: 'As notified',

  patternDescription:
    'Banking exams commonly have multiple stages. Exact sections, marks and duration vary by exam.',

  ageLimit: 'As per latest official notification',

  education:
    'Graduation from a recognized university',

  otherEligibility:
    'Eligibility conditions vary by the selected banking exam.',

  dates: [
    {
      title: 'Notification',
      status: 'Not announced',
      prefix: 'Expected',
      date: 'To be announced',
    },
    {
      title: 'Registration Opens',
      status: 'Not announced',
      prefix: 'Expected',
      date: 'To be announced',
    },
    {
      title: 'Registration Closes',
      status: 'Not announced',
      prefix: 'Expected',
      date: 'To be announced',
    },
    {
      title: 'Admit Card',
      status: 'Not announced',
      prefix: 'Expected',
      date: 'To be announced',
    },
    {
      title: 'Prelims Exam',
      status: 'Not announced',
      prefix: 'Expected',
      date: 'To be announced',
    },
    {
      title: 'Mains Exam',
      status: 'Not announced',
      prefix: 'Expected',
      date: 'To be announced',
    },
    {
      title: 'Final Result',
      status: 'Not announced',
      prefix: 'Expected',
      date: 'To be announced',
    },
  ],

  patterns: {
    Prelims: {
      totalQuestions: 'Representative',
      totalMarks: 'Representative',
      duration: 'Varies by exam',
      negativeMarking: 'Usually applicable',

      rows: [
        {
          subject: 'English Language',
          questions: 'As notified',
          marks: 'As notified',
          duration: 'Section-wise / combined',
        },
        {
          subject: 'Quantitative Aptitude',
          questions: 'As notified',
          marks: 'As notified',
          duration: 'Section-wise / combined',
        },
        {
          subject: 'Reasoning Ability',
          questions: 'As notified',
          marks: 'As notified',
          duration: 'Section-wise / combined',
        },
      ],
    },

    Mains: {
      totalQuestions: 'Representative',
      totalMarks: 'Representative',
      duration: 'Varies by exam',
      negativeMarking: 'Usually applicable',

      rows: [
        {
          subject: 'Reasoning & Computer Aptitude',
          questions: 'As notified',
          marks: 'As notified',
          duration: 'As notified',
        },
        {
          subject: 'Data Analysis / Quantitative Aptitude',
          questions: 'As notified',
          marks: 'As notified',
          duration: 'As notified',
        },
        {
          subject: 'English Language',
          questions: 'As notified',
          marks: 'As notified',
          duration: 'As notified',
        },
        {
          subject: 'General / Banking Awareness',
          questions: 'As notified',
          marks: 'As notified',
          duration: 'As notified',
        },
      ],
    },
  },
};

const UPSC_EXAM_DATA = {
  category: 'UPSC',
  conductingBody: 'Union Public Service Commission',
  level: 'National',
  stages: 'Prelims - Mains',
  duration: 'As notified',
  eligibility: 'Graduation · Check latest notification',
  mode: 'Offline / Online as notified',
  language: 'English & Hindi',
  frequency: 'Annual',
  patternDescription:
    'UPSC Civil Services Examination has a Preliminary stage followed by the Main examination. Confirm the latest official notification for the current scheme.',
  ageLimit: 'As per latest official notification',
  education: 'Graduation from a recognized university',
  otherEligibility: 'Nationality and attempt limits depend on the latest official notification.',
  dates: [
    { title: 'Notification', status: 'Not announced', prefix: 'Expected', date: 'To be announced' },
    { title: 'Registration Opens', status: 'Not announced', prefix: 'Expected', date: 'To be announced' },
    { title: 'Registration Closes', status: 'Not announced', prefix: 'Expected', date: 'To be announced' },
    { title: 'Prelims Exam', status: 'Not announced', prefix: 'Expected', date: 'To be announced' },
    { title: 'Mains Exam', status: 'Not announced', prefix: 'Expected', date: 'To be announced' },
    { title: 'Final Result', status: 'Not announced', prefix: 'Expected', date: 'To be announced' },
  ],
  patterns: {
    Prelims: {
      totalQuestions: 'As notified',
      totalMarks: 'As notified',
      duration: 'As notified',
      negativeMarking: 'As notified',
      rows: [
        { subject: 'General Studies Paper I', questions: 'As notified', marks: 'As notified', duration: 'As notified' },
        { subject: 'General Studies Paper II (CSAT)', questions: 'As notified', marks: 'As notified', duration: 'As notified' },
      ],
    },
    Mains: {
      totalQuestions: 'As notified',
      totalMarks: 'As notified',
      duration: 'As notified',
      negativeMarking: 'As notified',
      rows: [
        { subject: 'Qualifying Language Papers', questions: 'As notified', marks: 'As notified', duration: 'As notified' },
        { subject: 'Essay', questions: 'As notified', marks: 'As notified', duration: 'As notified' },
        { subject: 'General Studies Papers I-IV', questions: 'As notified', marks: 'As notified', duration: 'As notified' },
        { subject: 'Optional Subject Papers', questions: 'As notified', marks: 'As notified', duration: 'As notified' },
      ],
    },
  },
};

const DEFENCE_EXAM_DATA = {
  category: 'Defence',
  conductingBody: 'Defence Recruitment',
  level: 'National',
  stages: 'Written Exam - Selection Stages',
  duration: 'Varies by exam',
  eligibility: 'As per exam-specific notification',
  mode: 'Online / Offline',
  language: 'English & Hindi',
  frequency: 'As notified',

  patternDescription:
    'Defence recruitment exams differ by entry and post. Exact stages and marking schemes depend on the selected exam.',

  ageLimit: 'As per latest official notification',

  education:
    'Qualification varies by defence entry.',

  otherEligibility:
    'Medical, physical and other conditions may apply depending on the entry.',

  dates: [
    {
      title: 'Notification',
      status: 'Not announced',
      prefix: 'Expected',
      date: 'To be announced',
    },
    {
      title: 'Registration Opens',
      status: 'Not announced',
      prefix: 'Expected',
      date: 'To be announced',
    },
    {
      title: 'Registration Closes',
      status: 'Not announced',
      prefix: 'Expected',
      date: 'To be announced',
    },
    {
      title: 'Admit Card',
      status: 'Not announced',
      prefix: 'Expected',
      date: 'To be announced',
    },
    {
      title: 'Written Exam',
      status: 'Not announced',
      prefix: 'Expected',
      date: 'To be announced',
    },
    {
      title: 'Result',
      status: 'Not announced',
      prefix: 'Expected',
      date: 'To be announced',
    },
    {
      title: 'Selection / Final Result',
      status: 'Not announced',
      prefix: 'Expected',
      date: 'To be announced',
    },
  ],

  patterns: {
    'Written Exam': {
      totalQuestions: 'As notified',
      totalMarks: 'As notified',
      duration: 'As notified',
      negativeMarking: 'As notified',

      rows: [
        {
          subject: 'Subject 1',
          questions: 'As notified',
          marks: 'As notified',
          duration: 'As notified',
        },
        {
          subject: 'Subject 2',
          questions: 'As notified',
          marks: 'As notified',
          duration: 'As notified',
        },
        {
          subject: 'Subject 3',
          questions: 'As notified',
          marks: 'As notified',
          duration: 'As notified',
        },
      ],
    },
  },
};

const GATE_EXAM_DATA = {
  category: 'Engineering',
  conductingBody: 'IITs / IISc',
  level: 'National',
  stages: 'One computer-based test',
  duration: '180 min',
  eligibility: 'As per latest official notification',
  mode: 'Online (CBT)',
  language: 'English',
  frequency: 'Annual',
  patternDescription:
    'GATE is conducted as a computer-based test. Paper-specific details should be confirmed from the latest official notification.',
  ageLimit: 'No age limit stated in the standard eligibility criteria',
  education: 'Relevant undergraduate degree or equivalent qualification, as notified',
  otherEligibility: 'Paper and qualification requirements depend on the selected GATE paper.',
  dates: [
    { title: 'Notification', status: 'Not announced', prefix: 'Expected', date: 'To be announced' },
    { title: 'Registration Opens', status: 'Not announced', prefix: 'Expected', date: 'To be announced' },
    { title: 'Registration Closes', status: 'Not announced', prefix: 'Expected', date: 'To be announced' },
    { title: 'Admit Card', status: 'Not announced', prefix: 'Expected', date: 'To be announced' },
    { title: 'Exam Date', status: 'Not announced', prefix: 'Expected', date: 'To be announced' },
    { title: 'Result', status: 'Not announced', prefix: 'Expected', date: 'To be announced' },
  ],
  patterns: {
    'General Pattern': {
      totalQuestions: '65',
      totalMarks: '100',
      duration: '180 min',
      negativeMarking: 'Paper-specific',
      rows: [
        { subject: 'General Aptitude', questions: '10', marks: '15', duration: 'Combined' },
        { subject: 'Subject / Paper Section', questions: '55', marks: '85', duration: 'Combined' },
      ],
    },
    'Paper Details': {
      totalQuestions: 'As notified',
      totalMarks: 'As notified',
      duration: 'As notified',
      negativeMarking: 'As notified',
      rows: [
        { subject: 'Selected GATE paper', questions: 'As notified', marks: 'As notified', duration: 'As notified' },
        { subject: 'Question types', questions: 'MCQ / MSQ / NAT', marks: 'As notified', duration: 'Combined' },
      ],
    },
  },
};

function getExamTemplate(name) {
  const lower = name.toLowerCase();

  if (lower.includes('gate')) return GATE_EXAM_DATA;

  if (lower.includes('upsc cse') || lower === 'upsc') return UPSC_EXAM_DATA;

  if (
    lower.includes('bank') ||
    lower.includes('ibps') ||
    lower.includes('sbi po') ||
    lower.includes('sbi clerk') ||
    lower.includes('rrb')
  ) {
    return BANKING_EXAM_DATA;
  }

  if (
    lower.includes('defence') ||
    lower.includes('defense') ||
    lower.includes('nda') ||
    lower.includes('cds') ||
    lower.includes('agniveer') ||
    lower.includes('air force') ||
    lower.includes('navy')
  ) {
    return DEFENCE_EXAM_DATA;
  }

  return {
    category: 'Competitive Exam',
    conductingBody: 'As per official notification',
    level: 'As notified',
    stages: 'As notified',
    duration: 'As notified',
    eligibility: 'Check latest official notification',
    mode: 'As notified',
    language: 'As notified',
    frequency: 'As notified',

    patternDescription:
      'Exam pattern information will be updated with exam-specific data. Always confirm the latest official notification.',

    ageLimit: 'As per latest official notification',
    education: 'As per latest official notification',
    otherEligibility: 'As per latest official notification',

    dates: [
      {
        title: 'Notification',
        status: 'Not announced',
        prefix: 'Expected',
        date: 'To be announced',
      },
      {
        title: 'Registration Opens',
        status: 'Not announced',
        prefix: 'Expected',
        date: 'To be announced',
      },
      {
        title: 'Registration Closes',
        status: 'Not announced',
        prefix: 'Expected',
        date: 'To be announced',
      },
      {
        title: 'Admit Card',
        status: 'Not announced',
        prefix: 'Expected',
        date: 'To be announced',
      },
      {
        title: 'Exam Date',
        status: 'Not announced',
        prefix: 'Expected',
        date: 'To be announced',
      },
      {
        title: 'Result',
        status: 'Not announced',
        prefix: 'Expected',
        date: 'To be announced',
      },
    ],

    patterns: {
      'Exam Pattern': {
        totalQuestions: 'As notified',
        totalMarks: 'As notified',
        duration: 'As notified',
        negativeMarking: 'As notified',

        rows: [
          {
            subject: 'Subject 1',
            questions: 'As notified',
            marks: 'As notified',
            duration: 'As notified',
          },
          {
            subject: 'Subject 2',
            questions: 'As notified',
            marks: 'As notified',
            duration: 'As notified',
          },
          {
            subject: 'Subject 3',
            questions: 'As notified',
            marks: 'As notified',
            duration: 'As notified',
          },
        ],
      },
    },
  };
}

function valueOrDash(value) {
  return value === undefined || value === null || value === ''
    ? '—'
    : value;
}

function normalizePatterns(patterns) {
  if (Array.isArray(patterns)) {
    return patterns.map((pattern, index) => ({
      name: pattern.name || pattern.title || `Stage ${index + 1}`,
      totalQuestions: pattern.totalQuestions,
      totalMarks: pattern.totalMarks,
      duration: pattern.duration,
      negativeMarking: pattern.negativeMarking,
      rows: (pattern.sections || pattern.rows || []).map((section) => ({
        subject: section.name || section.subject || 'Section',
        questions: section.questions,
        marks: section.marks,
        duration: section.duration,
      })),
    }));
  }

  return Object.entries(patterns || {}).map(([name, pattern]) => ({
    name,
    totalQuestions: pattern.totalQuestions,
    totalMarks: pattern.totalMarks,
    duration: pattern.duration,
    negativeMarking: pattern.negativeMarking,
    rows: (pattern.sections || pattern.rows || []).map((section) => ({
      subject: section.name || section.subject || 'Section',
      questions: section.questions,
      marks: section.marks,
      duration: section.duration,
    })),
  }));
}

function normalizeDates(dates) {
  return (Array.isArray(dates) ? dates : []).map((item) => ({
    label: item.label || item.title || item.name || 'Exam milestone',
    date: item.date || null,
    status: item.status || item.state || 'Dates TBA',
    description: item.description || item.prefix || 'To be announced',
  }));
}

function normalizeExam(exam) {
  return {
    ...exam,
    patterns: normalizePatterns(exam.patterns),
    dates: normalizeDates(exam.dates),
  };
}

function eligibilityValue(value) {
  return value === undefined || value === null || value === ''
    ? 'Depends on the latest official notification.'
    : value;
}

function normalizeDateStatus(item) {
  const status = String(item?.status || item?.state || '').trim().toLowerCase();
  const title = String(item?.label || item?.title || item?.name || '').trim().toLowerCase();
  const date = String(item?.date || '').trim().toLowerCase();

  if (status.includes('complete') || status.includes('released') || status.includes('closed')) {
    return title.includes('registration') && status.includes('closed')
      ? 'registration closed'
      : 'completed';
  }
  if (status.includes('open') || status.includes('ongoing') || status.includes('active')) return 'ongoing';
  if (status.includes('upcoming') || status.includes('expected')) return 'upcoming';
  if (status.includes('tba') || status.includes('not announced') || status.includes('not available')) return 'dates tba';
  if (title.includes('registration close') && status.includes('not')) return 'registration closed';
  if (date.includes('to be announced') || date.includes('tba')) return 'dates tba';
  return status || 'dates tba';
}

function formatDateStatus(status) {
  return {
    upcoming: 'Upcoming',
    ongoing: 'Ongoing',
    'registration closed': 'Closed',
    completed: 'Completed',
    'dates tba': 'Not announced',
  }[status] || 'Not announced';
}

function getRelatedExams(category, currentName) {
  const relatedByCategory = {
    SSC: ['SSC CGL', 'SSC CHSL', 'SSC CPO', 'SSC MTS'],
    Banking: ['SBI PO', 'IBPS PO', 'SBI Clerk', 'IBPS Clerk'],
    Defence: ['NDA', 'CDS', 'AFCAT'],
    UPSC: ['UPSC CSE', 'UPSC CDS', 'UPSC NDA', 'UPSC CAPF'],
    Railway: ['RRB NTPC', 'RRB Group D', 'RRB JE'],
    Teaching: ['State TET', 'CTET', 'KVS'],
  };

  return (relatedByCategory[category] || []).filter((name) => name !== currentName);
}

function relatedCategory(name, fallback) {
  if (name.startsWith('SSC')) return 'SSC';
  if (name.startsWith('SBI') || name.startsWith('IBPS')) return 'Banking';
  if (['NDA', 'CDS', 'AFCAT'].includes(name)) return 'Defence';
  return fallback;
}

function getExamValue(exam, keys) {
  for (const key of keys) {
    if (
      exam?.[key] !== undefined &&
      exam?.[key] !== null &&
      exam?.[key] !== ''
    ) {
      return exam[key];
    }
  }

  return '—';
}

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
}

function SectionTitle({ eyebrow, title, description }) {
  return (
    <div className="mb-6">
      {eyebrow && (
        <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#1BAFD9] mb-3">
          {eyebrow}
        </div>
      )}

          <h2 className="text-3xl md:text-[34px] font-bold tracking-[-0.02em] text-[#17284A]">
        {title}
      </h2>

      {description && (
        <p className="mt-3 text-[15px] text-[#55708F] leading-7 max-w-3xl">
          {description}
        </p>
      )}
    </div>
  );
}

function QuickFact({ label, value }) {
  return (
    <div className="rounded-card border border-[#D9E1EA] bg-white px-4 py-4 min-h-[96px]">
      <div className="text-[11px] font-medium uppercase tracking-[0.02em] text-[#55708F] mb-3">
        {label}
      </div>

      <div className="text-base font-semibold leading-6 text-[#17284A]">
        {valueOrDash(value)}
      </div>
    </div>
  );
}

export default function ExamDetails() {
  const { id } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('overview');
  const [activeDateStatus, setActiveDateStatus] =
    useState('All Dates');
  const [activeTier, setActiveTier] = useState('Tier I');

    const filteredDates = useMemo(() => {
    const dates = exam?.dates || [];
    const matchesStatus = (item, statuses) => {
      const status = normalizeDateStatus(item);
      return statuses.includes(status);
    };

    if (activeDateStatus === 'All Dates') {
      return dates;
    }

    if (activeDateStatus === 'Upcoming') {
      return dates.filter((item) => matchesStatus(item, ['upcoming']));
    }

    if (activeDateStatus === 'Ongoing') {
      return dates.filter((item) => matchesStatus(item, ['ongoing']));
    }

    if (activeDateStatus === 'Registration closed') {
      return dates.filter((item) => matchesStatus(item, ['registration closed']));
    }

    if (activeDateStatus === 'Completed') {
      return dates.filter((item) => matchesStatus(item, ['completed']));
    }

    if (activeDateStatus === 'Dates TBA') {
      return dates.filter((item) => matchesStatus(item, ['dates tba']));
    }

    return dates;
  }, [exam, activeDateStatus]);

  useEffect(() => {
    if (!id) return;

    let active = true;
    const selectedName = searchParams.get('name') || decodeURIComponent(String(id));
    const cleanName = selectedName.trim();
    const template = cleanName.toLowerCase() === 'ssc cgl'
      ? SSC_CGL_DATA
      : getExamTemplate(cleanName);

    const fallbackExam = {
      name: cleanName,
      description: `Prepare for ${cleanName} with exam-focused practice, mock tests and performance-based preparation.`,
      topics: [],
      ...template,
    };

    const loadExam = async () => {
      try {
        const apiExam = await getExamById(cleanName);
        if (active && apiExam) {
            setExam(normalizeExam({ ...fallbackExam, ...apiExam, name: apiExam.name || cleanName }));
          return;
        }
      } catch {
        // Local template keeps the public page usable until the API is configured.
        if (active) setExam(normalizeExam(fallbackExam));
      } finally {
        if (active) setLoading(false);
      }
    };

    loadExam();
    return () => { active = false; };
  }, [id, searchParams]);

  useEffect(() => {
    if (!exam?.patterns) return;

    const tiers = exam.patterns.map((pattern) => pattern.name);

    if (tiers.length) {
      setActiveTier(tiers[0]);
    }

    setActiveDateStatus('All Dates');
  }, [exam]);

  useEffect(() => {
    if (!exam) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio - a.intersectionRatio
          );

        if (visible[0]) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: '-120px 0px -55% 0px',
        threshold: [0.1, 0.25, 0.5],
      }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);

      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [exam]);

  const subjects = useMemo(() => {
    if (
      Array.isArray(exam?.subjects) &&
      exam.subjects.length > 0
    ) {
      return exam.subjects.map((subject) => {
        if (typeof subject === 'string') {
          return {
            name: subject,
            description:
              'Exam-focused practice and topic-wise questions.',
            questions: 'Practice questions',
            topics: 'Multiple topics',
          };
        }

        return {
          name:
            subject.name ||
            subject.title ||
            'Subject',
          description:
            subject.description ||
            'Exam-focused practice and topic-wise questions.',
          questions:
            subject.questions ||
            subject.questionCount ||
            'Practice questions',
          topics:
            subject.topics ||
            subject.topicCount ||
            'Multiple topics',
        };
      });
    }

    if (
      Array.isArray(exam?.topics) &&
      exam.topics.length > 0
    ) {
      return exam.topics.slice(0, 4).map((topic) => ({
        name: topic,
        description:
          'Practice important questions and concepts related to this topic.',
        questions: 'Practice questions',
        topics: 'Topic practice',
      }));
    }

    return defaultSubjects;
  }, [exam]);

  const faqs =
    Array.isArray(exam?.faqs) && exam.faqs.length > 0
      ? exam.faqs.map((faq) => ({
          question:
            faq.question || faq.q || 'Question',
          answer:
            faq.answer ||
            faq.a ||
            'Answer will be available soon.',
        }))
      : defaultFaqs;

  const testSeries =
    Array.isArray(exam?.testSeries) &&
    exam.testSeries.length > 0
      ? exam.testSeries
      : defaultTestSeries;

  const resources = Array.isArray(exam?.resources) && exam.resources.length > 0
    ? exam.resources
    : [
        { title: 'Syllabus', description: 'Complete syllabus and topic coverage.' },
        { title: 'Previous Year Papers', description: 'Practice questions from previous exam cycles.' },
        { title: 'Official Notification', description: 'Confirm the latest eligibility, dates and pattern.' },
        { title: 'Preparation Guide', description: 'Guides, strategies and study material.' },
        { title: 'Exam Calendar', description: 'Check the latest published examination schedule.' },
      ];

  const activePattern = exam?.patterns.find((pattern) => pattern.name === activeTier);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />

        <main className="max-w-[1280px] mx-auto px-8 py-20">
          <div className="animate-pulse space-y-6">
            <div className="h-5 bg-[#F7F8FA] rounded w-32" />
            <div className="h-14 bg-[#F7F8FA] rounded w-2/3" />
            <div className="h-6 bg-[#F7F8FA] rounded w-1/2" />

            <div className="grid grid-cols-4 gap-4 pt-8">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="h-28 bg-[#F7F8FA] rounded-2xl"
                />
              ))}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  if (!exam) {
    return (
      <div className="min-h-screen bg-white">
        <Header />

        <main className="max-w-[1280px] mx-auto px-8 py-24 text-center">
          <h1 className="text-4xl font-bold text-[#17284A] mb-4">
            Exam Not Found
          </h1>

          <p className="text-lg text-[#55708F] mb-8">
            The exam you are looking for could not be found.
          </p>

          <Link
            href="/exams"
            className="inline-flex items-center gap-2 h-12 px-7 bg-[#5FAE6A] text-white rounded-full font-semibold"
          >
            Back to Exams
          </Link>
        </main>

        <Footer />
      </div>
    );
  }

  const examName =
    exam.name || exam.title || 'Exam';

  const category =
    exam.category || 'Competitive Exam';

  const conductingBody = getExamValue(exam, [
    'conductingBody',
    'organization',
    'conductedBy',
  ]);

  const level = getExamValue(exam, [
    'level',
    'examLevel',
  ]);

  const stages = getExamValue(exam, [
    'stages',
    'numberOfStages',
  ]);

  const duration = getExamValue(exam, [
    'duration',
    'durationMinutes',
  ]);

  const eligibility = getExamValue(exam, [
    'eligibility',
    'eligibilityCriteria',
  ]);

  const mode = getExamValue(exam, [
    'mode',
    'examMode',
  ]);

  const language = getExamValue(exam, [
    'language',
    'languages',
  ]);

  const frequency = getExamValue(exam, ['frequency']);

  return (
    <div className="min-h-screen bg-white text-[#17284A]">
      <Header />

      <div className="sticky top-0 z-40 border-b border-[#D9E1EA] bg-white/95 backdrop-blur">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="flex items-center gap-1 overflow-x-auto py-3">
            {sections.map((section) => (
              <button
                key={section.id}
                type="button"
                onClick={() => scrollToSection(section.id)}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeSection === section.id
                    ? 'bg-[#1BAFD9] text-white'
                    : 'text-[#55708F] hover:text-[#17284A] hover:bg-[#F7F8FA]'
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main>
        <section
          id="overview"
          className="scroll-mt-28 bg-gradient-to-b from-[#F2FBFD] to-white"
        >
          <div className="max-w-[1280px] mx-auto px-8 py-16 md:py-20">
            <div className="flex items-center gap-2 text-sm text-[#55708F] mb-8">
              <Link
                href="/"
                className="hover:text-[#1BAFD9]"
              >
                Home
              </Link>

              <span>›</span>

              <Link
                href="/exams"
                className="hover:text-[#1BAFD9]"
              >
                Exams
              </Link>

              <span>›</span>

              <span className="text-[#17284A] font-medium">
                {examName}
              </span>
            </div>

            <div className="grid lg:grid-cols-[1.5fr_0.8fr] gap-12 items-start">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-5">
                  <span className="inline-flex items-center px-4 py-2 bg-[#E7F7FB] text-[#1BAFD9] rounded-full text-sm font-semibold">
                    {category}
                  </span>

                  {exam.status && (
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#EDF8EF] text-[#5FAE6A] rounded-full text-sm font-semibold">
                      <span className="w-2 h-2 rounded-full bg-[#5FAE6A]" />
                      {exam.status}
                    </span>
                  )}
                </div>

                <h1 className="text-4xl md:text-[48px] font-bold leading-[1.05] text-[#17284A] mb-5">
                  {examName}
                </h1>

                <p className="text-base text-[#55708F] leading-7 max-w-3xl">
                  {exam.description ||
                    `Prepare for ${examName} with exam-focused practice, mock tests and performance-based preparation.`}
                </p>

                <div className="flex flex-wrap gap-4 mt-8">
                  <button
                    type="button"
                    onClick={() =>
                      scrollToSection('practice')
                    }
                    className="inline-flex items-center gap-2 h-11 px-6 bg-[#5FAE6A] text-white rounded-full text-sm font-semibold hover:-translate-y-1 hover:shadow-lg transition-all"
                  >
                    Start Practicing
                    <span className="text-xl">→</span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      scrollToSection('pattern')
                    }
                    className="inline-flex items-center gap-2 h-11 px-6 border border-[#17284A] text-[#17284A] rounded-full text-sm font-semibold hover:bg-[#17284A] hover:text-white transition-all"
                  >
                    View Exam Pattern
                  </button>
                </div>
              </div>

              <div className="rounded-3xl border border-[#D9E1EA] bg-white shadow-sm p-7">
                <div className="text-sm font-semibold text-[#55708F] mb-5">
                  Exam at a glance
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <QuickFact
                    label="Category"
                    value={category}
                  />

                  <QuickFact
                    label="Level"
                    value={level}
                  />

                  <QuickFact
                    label="Stages"
                    value={stages}
                  />

                  <QuickFact
                    label="Duration"
                    value={duration}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-[1280px] mx-auto px-8 py-16">
          <SectionTitle
            eyebrow="Quick Facts"
            title="Exam at a glance"
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <QuickFact
              label="Conducting Body"
              value={conductingBody}
            />

            <QuickFact
              label="Exam Level"
              value={level}
            />

            <QuickFact
              label="Stages"
              value={stages}
            />

            <QuickFact
              label="Duration"
              value={duration}
            />

            <QuickFact
              label="Eligibility"
              value={eligibility}
            />

            <QuickFact
              label="Mode"
              value={mode}
            />

            <QuickFact
              label="Language"
              value={language}
            />

            <QuickFact
              label="Frequency"
              value={frequency}
            />
          </div>
        </section>
                <section
          id="practice"
          className="scroll-mt-28 bg-[#17284A] py-20"
        >
          <div className="max-w-[1280px] mx-auto px-8">
            <div className="text-center mb-12">
              <div className="text-sm font-bold uppercase tracking-[0.16em] text-[#1BAFD9] mb-4">
                Start Practicing
              </div>

              <h2 className="text-4xl md:text-[40px] font-bold text-white">
                Build your preparation with focused practice.
              </h2>

              <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
                Practice full-length tests, sectional tests and topic-wise
                questions for {examName}.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {[
                [
                  'Full-length mocks',
                  'Attempt complete exam-style tests.',
                ],
                [
                  'Sectional practice',
                  'Focus on one section at a time.',
                ],
                [
                  'Topic practice',
                  'Strengthen individual concepts and topics.',
                ],
              ].map(([title, description]) => (
                <div
                  key={title}
                  className="bg-[#203455] border border-white/10 rounded-2xl p-7"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#1BAFD9]/15 text-[#1BAFD9] flex items-center justify-center text-xl mb-5">
                    ✓
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">
                    {title}
                  </h3>

                  <p className="text-white/65 leading-7">
                    {description}
                  </p>

                  <button
                    type="button"
                    className="mt-6 text-[#5FAE6A] font-semibold"
                  >
                    Practice →
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="test-series"
          className="scroll-mt-28 max-w-[1280px] mx-auto px-8 py-20"
        >
          <SectionTitle
            eyebrow="Test Series"
            title="Structured test series to track your prep."
            description={`Structured practice programs for the ${examName} syllabus.`}
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {testSeries.map((series, index) => (
              <div
                key={series.title || index}
                className="border border-[#D9E1EA] rounded-2xl p-6 bg-white hover:-translate-y-1 hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-between gap-3 mb-5">
                  <span className="text-xs font-bold uppercase tracking-wide text-[#1BAFD9]">
                    {series.type || 'Practice'}
                  </span>

                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#F7F8FA] text-[#55708F]">
                    {series.plan || 'Free'}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#17284A] mb-3">
                  {series.title || 'Practice Test Series'}
                </h3>

                <p className="text-sm text-[#55708F] leading-6">
                  {series.details ||
                    series.description ||
                    'Exam-focused practice tests.'}
                </p>

                <button
                  type="button"
                  className="mt-6 text-sm font-semibold text-[#1BAFD9]"
                >
                  Practice in App →
                </button>
              </div>
            ))}
          </div>
        </section>

        <section
          id="subject-practice"
          className="scroll-mt-28 bg-[#F7F8FA] py-20"
        >
          <div className="max-w-[1280px] mx-auto px-8">
            <SectionTitle
              eyebrow="Subject Practice"
              title="Know where you're weak. Practice exactly that."
              description={`Practice individual subjects for ${examName}.`}
            />

            <div className="grid md:grid-cols-2 gap-5">
              {subjects.map((subject, index) => (
                <div
                  key={`${subject.name}-${index}`}
                  className="bg-white border border-[#D9E1EA] rounded-2xl p-7"
                >
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <h3 className="text-xl font-bold text-[#17284A] mb-3">
                        {subject.name}
                      </h3>

                      <p className="text-[#55708F] leading-6">
                        {subject.description}
                      </p>

                      <div className="flex gap-3 mt-5 text-sm text-[#55708F]">
                        <span>{subject.questions}</span>
                        <span>·</span>
                        <span>{subject.topics}</span>
                      </div>
                    </div>

                    <div className="w-12 h-12 shrink-0 rounded-xl bg-[#E7F7FB] text-[#1BAFD9] flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                  </div>

                  <button
                    type="button"
                    className="mt-6 text-sm font-semibold text-[#1BAFD9]"
                  >
                    Practice {subject.name} →
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="pattern"
          className="scroll-mt-28 max-w-[1280px] mx-auto px-8 py-20"
        >
          <SectionTitle
            eyebrow="Exam Pattern"
            title="Know exactly what to prepare."
            description={
              exam.patternDescription ||
              `${examName} pattern and syllabus information. Confirm the latest official notification before relying on exam-specific details.`
            }
          />

          {exam.patterns.length > 0 && (
            <div className="flex flex-wrap items-center gap-1 mb-5 border-b border-[#D9E1EA]">
              {exam.patterns.map((pattern) => (
                <button
                  key={pattern.name}
                  type="button"
                  onClick={() => setActiveTier(pattern.name)}
                  className={`px-3 py-2.5 text-[13px] font-semibold border-b-2 transition-all ${
                    activeTier === pattern.name
                      ? 'text-[#1BAFD9] border-[#1BAFD9]'
                      : 'text-[#71839A] border-transparent hover:text-[#17284A]'
                  }`}
                >
                    {pattern.name}
                </button>
              ))}
            </div>
          )}

          {activePattern ? (
            <div className="rounded-[18px] border border-[#D9E1EA] overflow-hidden bg-white">
                <div className="grid grid-cols-2 md:grid-cols-4 bg-[#F7F8FA]">
                <div className="p-4 border-r border-b md:border-b-0 border-[#D9E1EA]">
                  <div className="text-xs text-[#55708F] mb-1.5">
                    Total Questions
                  </div>

                  <div className="text-xl font-bold text-[#17284A]">
                    {valueOrDash(
                      activePattern.totalQuestions
                    )}
                  </div>
                </div>

                <div className="p-4 border-r border-b md:border-b-0 border-[#D9E1EA]">
                  <div className="text-xs text-[#55708F] mb-1.5">
                    Total Marks
                  </div>

                  <div className="text-xl font-bold text-[#17284A]">
                    {valueOrDash(
                      activePattern.totalMarks
                    )}
                  </div>
                </div>

                <div className="p-4 border-r border-b md:border-b-0 border-[#D9E1EA]">
                  <div className="text-xs text-[#55708F] mb-1.5">
                    Duration
                  </div>

                  <div className="text-xl font-bold text-[#17284A]">
                    {valueOrDash(
                      activePattern.duration
                    )}
                  </div>
                </div>

                <div className="p-4">
                  <div className="text-xs text-[#55708F] mb-1.5">
                    Negative Marking
                  </div>

                  <div className="text-xl font-bold text-[#17284A]">
                    {valueOrDash(
                      activePattern.negativeMarking
                    )}
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-t border-[#D9E1EA] bg-white">
                      <th className="px-4 py-3 text-xs font-semibold text-[#17284A]">
                        Subject
                      </th>

                      <th className="px-4 py-3 text-xs font-semibold text-[#17284A]">
                        Questions
                      </th>

                      <th className="px-4 py-3 text-xs font-semibold text-[#17284A]">
                        Marks
                      </th>

                      <th className="px-4 py-3 text-xs font-semibold text-[#17284A]">
                        Duration
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {activePattern.rows.map(
                      (row, index) => (
                        <tr
                          key={`${row.subject}-${index}`}
                          className="border-t border-[#D9E1EA]"
                        >
                          <td className="px-4 py-3 text-[13px] font-medium text-[#17284A]">
                            {row.subject}
                          </td>

                          <td className="px-4 py-3 text-[13px] text-[#55708F]">
                            {row.questions}
                          </td>

                          <td className="px-4 py-3 text-[13px] text-[#55708F]">
                            {row.marks}
                          </td>

                          <td className="px-4 py-3 text-[13px] text-[#55708F]">
                            {row.duration}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-[#D9E1EA] bg-white p-8 text-[#55708F]">
              Detailed exam pattern will be shown here when available.
            </div>
          )}
        </section>

        <section
          id="dates"
          className="scroll-mt-28 bg-[#F7F8FA]"
        >
          <div className="max-w-[1280px] mx-auto px-8 py-20">
            <div className="grid lg:grid-cols-2 gap-14 items-start">
              <div>
                <div className="text-sm font-bold uppercase tracking-[0.16em] text-[#1BAFD9] mb-5">
                  Important Dates
                </div>

                <h2 className="text-4xl md:text-[40px] font-bold tracking-[-0.025em] text-[#17284A] mb-4">
                  {examName} 2026 timeline
                </h2>

                <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#EAF0F5] text-[#71839A] text-sm mb-7">
                  Sample dates — confirm with the official notification
                </div>

                <div className="flex flex-wrap items-center gap-1 rounded-xl border border-[#D9E1EA] bg-white p-1.5 mb-6">
                  {[
                    'All Dates',
                    'Upcoming',
                    'Ongoing',
                    'Registration closed',
                    'Completed',
                    'Dates TBA',
                  ].map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() =>
                        setActiveDateStatus(status)
                      }
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        activeDateStatus === status
                          ? 'bg-[#F7F8FA] text-[#17284A]'
                          : 'text-[#71839A] hover:text-[#17284A]'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>

                <div className="bg-white border border-[#D9E1EA] rounded-card p-5">
                  <div className="relative">
                    <div className="absolute left-[8px] top-3 bottom-3 w-px bg-[#D9E1EA]" />

                    <div className="space-y-7">
                      {filteredDates.length > 0 ? (
                        filteredDates.map((item) => {
                          const dateStatus = normalizeDateStatus(item);
                          const completed = dateStatus === 'completed';
                          const ongoing = dateStatus === 'ongoing';

                          return (
                            <div
                              key={`${item.label}-${item.date || 'tba'}`}
                              className="relative flex gap-4"
                            >
                              <div className="relative z-10 shrink-0 pt-1">
                                <div
                                  className={`w-[17px] h-[17px] rounded-full border-2 ${
                                    completed
                                      ? 'bg-[#5FAE6A] border-[#5FAE6A]'
                                      : ongoing
                                      ? 'bg-[#1BAFD9] border-[#1BAFD9]'
                                      : dateStatus === 'upcoming'
                                      ? 'bg-white border-[#17284A]'
                                      : 'bg-white border-[#CBD5E1]'
                                  }`}
                                />
                              </div>

                              <div className="min-w-0">
                                <div className="flex flex-wrap items-center gap-2">
                                  <h3 className="text-[15px] font-bold text-[#17284A]">
                                    {item.label}
                                  </h3>

                                  <span
                                    className={`text-xs font-semibold ${
                                      activeDateStatus ===
                                      'Registration closed'
                                        ? 'text-[#71839A]'
                                        : completed
                                        ? 'text-[#5FAE6A]'
                                        : ongoing
                                        ? 'text-[#1BAFD9]'
                                        : dateStatus === 'upcoming'
                                        ? 'text-[#17284A]'
                                        : 'text-[#94A3B8]'
                                    }`}
                                  >
                                    {activeDateStatus ===
                                    'Registration closed'
                                      ? 'Closed'
                                      : formatDateStatus(dateStatus)}
                                  </span>
                                </div>

                                <p className="text-[13px] text-[#55708F] mt-1">
                                  <span>
                                    {activeDateStatus ===
                                    'Registration closed'
                                      ? 'Closed'
                                      : item.description}
                                  </span>

                                  <span className="mx-1">·</span>

                                  <span
                                    className={
                                      ongoing
                                        ? 'text-[#17284A] font-medium'
                                        : ''
                                    }
                                  >
                                    {item.date || 'To be announced'}
                                  </span>
                                </p>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div className="py-10 text-center text-[#71839A]">
                          No dates available for this status.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div
                id="eligibility"
                className="scroll-mt-28"
              >
                <div className="text-sm font-bold uppercase tracking-[0.16em] text-[#1BAFD9] mb-5">
                  Eligibility
                </div>

                <h2 className="text-4xl md:text-[40px] font-bold tracking-[-0.025em] text-[#17284A] mb-8">
                  Who can apply
                </h2>

                <div className="space-y-4">
                  <div className="bg-white border border-[#D9E1EA] rounded-[18px] p-5">
                    <h3 className="text-base font-bold text-[#17284A]">
                      Age Limit
                    </h3>

                    <p className="text-sm text-[#55708F] mt-1">
                      {eligibilityValue(exam.ageLimit)}
                    </p>

                    <button
                      type="button"
                      className="text-sm font-medium text-[#1BAFD9] mt-2 hover:underline"
                    >
                      View relaxation details
                    </button>
                  </div>

                  <div className="bg-white border border-[#D9E1EA] rounded-[18px] p-5">
                    <h3 className="text-base font-bold text-[#17284A]">
                      Educational Qualification
                    </h3>

                    <p className="text-sm text-[#55708F] mt-1 leading-6">
                      {eligibilityValue(exam.education)}
                    </p>
                  </div>

                  <div className="bg-white border border-[#D9E1EA] rounded-[18px] p-5">
                    <h3 className="text-base font-bold text-[#17284A]">
                      Nationality
                    </h3>

                    <p className="text-sm text-[#55708F] mt-1 leading-6">
                      {eligibilityValue(exam.nationality)}
                    </p>
                  </div>

                  <div className="bg-white border border-[#D9E1EA] rounded-[18px] p-5">
                    <h3 className="text-base font-bold text-[#17284A]">
                      Age Relaxation
                    </h3>

                    <p className="text-sm text-[#55708F] mt-1 leading-6">
                      {eligibilityValue(exam.ageRelaxation)}
                    </p>
                  </div>

                  <div className="bg-white border border-[#D9E1EA] rounded-[18px] p-5">
                    <h3 className="text-base font-bold text-[#17284A]">
                      Other Conditions
                    </h3>

                    <p className="text-sm text-[#55708F] mt-1 leading-6">
                      {eligibilityValue(exam.otherEligibility)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
                <section
          id="resources"
          className="scroll-mt-28 bg-[#F7F8FA] py-20"
        >
          <div className="max-w-[1280px] mx-auto px-8">
            <SectionTitle
              eyebrow="Resources"
              title="More for your preparation"
              description={`Useful preparation resources for ${examName}.`}
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {resources.map((resource, index) => (
                <div
                  key={resource.title || index}
                  className="bg-white border border-[#D9E1EA] rounded-card p-5"
                >
                  <h3 className="text-base font-bold text-[#17284A] mb-2">
                    {resource.title || resource.name || 'Resource'}
                  </h3>

                  <p className="text-sm text-[#55708F] leading-6">
                    {resource.description || 'Details will be available when published.'}
                  </p>

                  {resource.href ? (
                    <a href={resource.href} target="_blank" rel="noreferrer" className="mt-4 inline-flex text-sm font-semibold text-[#1BAFD9]">
                      Open resource →
                    </a>
                  ) : (
                    <span className="mt-4 inline-flex text-xs text-[#71839A]">Latest link pending</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="faq"
          className="scroll-mt-28 max-w-[900px] mx-auto px-8 py-20"
        >
          <SectionTitle
            eyebrow="FAQ"
            title="Frequently asked questions"
          />

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group border border-[#D9E1EA] rounded-2xl px-6 py-5"
              >
                <summary className="cursor-pointer list-none flex items-center justify-between gap-6 font-semibold text-[#17284A]">
                  {faq.question}

                  <span className="text-xl text-[#55708F] group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>

                <p className="pt-4 text-[#55708F] leading-7">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        <section className="bg-[#F7F8FA] py-20">
          <div className="max-w-[1280px] mx-auto px-8">
            <SectionTitle
              eyebrow="Related Exams"
              title="Other exams you might be preparing for"
            />

            <div className="grid md:grid-cols-3 gap-5">
              {getRelatedExams(category, examName)
                .filter((name) => name !== examName)
                .slice(0, 3)
                .map((name) => (
                  <div
                    key={name}
                    className="bg-white border border-[#D9E1EA] rounded-2xl p-6"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <h3 className="font-bold text-[#17284A]">
                          {name}
                        </h3>

                        <span className="text-xs text-[#55708F]">
                          {relatedCategory(name, category)}
                        </span>
                      </div>

                      <Link
                        href={`/exam/${encodeURIComponent(name)}`}
                        className="text-[#1BAFD9] font-semibold text-sm"
                      >
                        Practice →
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>

        <section className="max-w-[1280px] mx-auto px-8 py-20">
          <div className="rounded-3xl bg-[#17284A] p-10 md:p-14 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to start preparing for {examName}?
            </h2>

            <p className="text-white/75 text-lg mb-8 max-w-2xl mx-auto">
              Jump into practice and see where you stand.
            </p>

            <button
              type="button"
              onClick={() => scrollToSection('practice')}
              className="inline-flex items-center gap-2 h-14 px-8 bg-[#5FAE6A] text-white rounded-full font-semibold hover:-translate-y-1 transition-all"
            >
              Start Practicing Free
              <span className="text-xl">→</span>
            </button>

            <button
              type="button"
              onClick={() => router.push('/exams')}
              className="ml-3 inline-flex items-center gap-2 h-14 px-8 border border-white/30 text-white rounded-full font-semibold hover:bg-white hover:text-[#17284A] transition-all"
            >
              Explore All Exams
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}