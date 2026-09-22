// Placeholder/mock data — replace with real API-backed content during development.

export const NAV_ITEMS = [
  { label: 'Exams', href: '/exams' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Scholarship', href: '#scholarship' },
  { label: 'Resources', href: '#resources' },
  { label: 'About', href: '#about' },
  { label: 'FAQ', href: '#faq' },
];

export const TRUST_POINTS = ['Exam-specific practice', 'AI-evaluated mock tests', 'Performance tracking'];

// TODO: replace with verified production exam count
export const EXAM_COUNT = '1,600+';

// TODO: replace with an API-backed exam directory; shape stays { name, category }
export const SAMPLE_EXAMS = [
  { name: 'SSC CGL', category: 'SSC' },
  { name: 'SSC CHSL', category: 'SSC' },
  { name: 'SSC MTS', category: 'SSC' },
  { name: 'SSC GD Constable', category: 'SSC' },
  { name: 'SSC CPO', category: 'SSC' },
  { name: 'UPSC CSE', category: 'UPSC' },
  { name: 'UPSC CDS', category: 'UPSC' },
  { name: 'UPSC NDA', category: 'UPSC' },
  { name: 'UPSC CAPF', category: 'UPSC' },
  { name: 'IBPS PO', category: 'Banking' },
  { name: 'IBPS Clerk', category: 'Banking' },
  { name: 'SBI PO', category: 'Banking' },
  { name: 'SBI Clerk', category: 'Banking' },
  { name: 'RBI Grade B', category: 'Banking' },
  { name: 'RRB NTPC', category: 'Railways' },
  { name: 'RRB Group D', category: 'Railways' },
  { name: 'RRB JE', category: 'Railways' },
  { name: 'CDS', category: 'Defence' },
  { name: 'AFCAT', category: 'Defence' },
  { name: 'Territorial Army', category: 'Defence' },
  { name: 'GATE', category: 'Engineering' },
  { name: 'ESE (IES)', category: 'Engineering' },
  { name: 'State PSC', category: 'State Exams' },
  { name: 'State TET', category: 'State Exams' },
  { name: 'NEET', category: 'Other Competitive Exams' },
  { name: 'CLAT', category: 'Other Competitive Exams' },
];

export const POPULAR_SEARCHES = ['SSC CGL', 'UPSC CSE', 'IBPS PO', 'GATE', 'NEET'];

// [VERIFY BEFORE DEVELOPMENT — final taxonomy]
export const CATEGORIES = ['SSC', 'Banking', 'Defence', 'Railway', 'UPSC', 'Teaching', 'State Exams', 'Other'];

// Short cycling preview shown in the hero mockup (Practice -> Evaluate demo)
export const HERO_DEMO = [
  { tag: 'QUANTITATIVE APTITUDE', text: 'A train 120m long crosses a pole in 8 seconds. What is its speed?', options: ['12 m/s', '15 m/s', '18 m/s'], correct: 1 },
  { tag: 'REASONING', text: 'Find the next number in the series: 3, 7, 15, 31, ...', options: ['47', '63', '55'], correct: 1 },
  { tag: 'ENGLISH', text: "Choose the word closest in meaning to 'Meticulous'.", options: ['Careless', 'Careful', 'Vague'], correct: 1 },
];

export const DEMO_QUESTIONS = [
  {
    tag: 'QUANTITATIVE APTITUDE',
    text: 'A train 120m long crosses a pole in 8 seconds. What is its speed?',
    options: ['12 m/s', '15 m/s', '18 m/s', '20 m/s'],
    section: 'Quant',
    correct: 1,
  },
  {
    tag: 'REASONING',
    text: 'Find the next number in the series: 3, 7, 15, 31, ...',
    options: ['47', '63', '55', '59'],
    section: 'Reasoning',
    correct: 1,
  },
  {
    tag: 'ENGLISH',
    text: "Choose the word closest in meaning to 'Meticulous'.",
    options: ['Careless', 'Careful', 'Hasty', 'Vague'],
    section: 'English',
    correct: 1,
  },
  {
    tag: 'GENERAL AWARENESS',
    text: "Which body prepares India's Union Budget?",
    options: ['Reserve Bank of India', 'Ministry of Finance', 'NITI Aayog', 'SEBI'],
    section: 'GA',
    correct: 1,
  },
];

export const SECTION_TABS = ['Quant', 'Reasoning', 'English', 'GA'];

// TODO: replace descriptions once final scholarship rules (eligibility, ranks, amounts) are confirmed
export const RECOGNITION_STAGES = [
  { title: 'Prepare', desc: 'Study with structured, exam-specific practice content.' },
  { title: 'Practice', desc: 'Attempt AI-evaluated mock tests to build readiness.' },
  { title: 'Take the real exam', desc: 'Sit for your actual competitive exam.' },
  { title: 'Verify performance', desc: 'Submit your real exam result for verification.' },
  { title: 'Get recognized', desc: "Recognition is granted according to ExamineIQ's published scholarship rules." },
];

export const TOPIC_PERFORMANCE = [
  { topic: 'Quantitative Aptitude', pct: 82, color: '#5FAE6A' },
  { topic: 'Reasoning', pct: 65, color: '#1BAFD9' },
  { topic: 'English', pct: 74, color: '#1BAFD9' },
  { topic: 'General Awareness', pct: 58, color: '#D5484B' },
];

export const RECOGNITION_STEPS = [
  { number: 1, label: 'Prepare' },
  { number: 2, label: 'Practice' },
  { number: 3, label: 'Perform' },
  { number: 4, label: 'Verify' },
  { number: 5, label: 'Recognize' },
];

export const FAQS = [
  {
    q: 'What is ExamineIQ?',
    a: "ExamineIQ is a preparation platform for competitive-exam aspirants in India. Choose your exam, practice with AI-powered mock tests, and track exactly how you're improving.",
  },
  {
    q: 'Which exams are covered?',
    a: 'ExamineIQ covers a wide range of competitive exams across categories including UPSC, SSC, Banking, Railways, Defence and more. [VERIFY BEFORE DEVELOPMENT — final exam list and count]',
  },
  {
    q: 'How do mock tests work?',
    a: 'Mock tests are exam-specific and timed by section, with instant performance analysis — accuracy, time and topic-wise strengths and weaknesses — after every attempt.',
  },
  {
    q: 'How does the scholarship / recognition program work?',
    a: "Consistent, verified performance on real exams can be recognized through ExamineIQ's scholarship program. [FINAL SCHOLARSHIP RULES TO BE CONFIRMED — eligibility, ranks, amounts]",
  },
  {
    q: 'How is my result verified?',
    a: 'Only performance from verified real-exam activity is considered for recognition. [FINAL SCHOLARSHIP RULES TO BE CONFIRMED — verification method]',
  },
];

export const FOOTER_GROUPS = [
  { title: 'Product', links: ['Exams', 'Mock Tests', 'Performance', 'Scholarship'] },
  { title: 'Exams', links: ['All Exams', 'Popular Exams', 'State Exams', 'Upcoming Exams'] },
  { title: 'Resources', links: ['Exam Notifications', 'Syllabus', 'Preparation Guides', 'Current Affairs', 'Previous Papers'] },
  { title: 'Company', links: ['About', 'Contact', 'FAQ', 'Help'] },
];

export const LEGAL_LINKS = ['Privacy Policy', 'Terms of Use', 'Scholarship Terms', 'Cookie Policy'];
