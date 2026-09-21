import './globals.css';

export const metadata = {
  title: 'ExamineIQ',
  description: 'AI-powered competitive-exam preparation platform.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
