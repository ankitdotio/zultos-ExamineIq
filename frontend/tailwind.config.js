/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/app/**/*.{js,jsx}',
    './src/components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#17284A',
        'navy-dark': '#0F1D34',
        cyan: '#1BAFD9',
        'cyan-light': '#8FD8EC',
        green: '#5FAE6A',
        'green-dark': '#4E9A59',
        'green-darker': '#458650',
        'text-secondary': '#5B6B82',
        'text-muted': '#6B7686',
        border: '#E2E6ED',
        surface: '#F7F8FA',
        'surface-alt': '#EEF1F4',
        success: '#3E8A4B',
        'success-bg': '#F1FAF2',
        'success-border': '#CFE9D3',
        error: '#D5484B',
      },
      fontFamily: {
        heading: ['Manrope', 'sans-serif'],
        body: ['Public Sans', 'sans-serif'],
      },
      borderRadius: { card: '12px', 'card-lg': '16px' },
      keyframes: { float: {'0%, 100%': {transform:'translateY(0)'}, '50%': {transform:'translateY(-8px)'}} },
      animation: { float: 'float 4.5s ease-in-out infinite' },
    },
  },
  plugins: [],
};
