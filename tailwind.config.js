/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        void: {
          950: '#040814',
          900: '#081027',
          800: '#0d1a3c',
          700: '#13254f',
        },
        signal: {
          purple: '#0B3FA0',
          blue: '#1568D6',
          pink: '#38BDF8',
          cyan: '#69EAFC',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'grid-lines':
          'linear-gradient(to right, rgba(56,150,240,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(56,150,240,0.07) 1px, transparent 1px)',
        'signal-gradient':
          'linear-gradient(135deg, #0B3FA0 0%, #1568D6 35%, #38BDF8 70%, #69EAFC 100%)',
      },
      backgroundSize: {
        grid: '48px 48px',
      },
      boxShadow: {
        glow: '0 0 20px rgba(21,104,214,0.45), 0 0 60px rgba(56,189,248,0.18)',
        'glow-cyan': '0 0 20px rgba(105,234,252,0.55)',
        'glow-pink': '0 0 20px rgba(56,189,248,0.45)',
      },
      keyframes: {
        blob: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -40px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.95)' },
        },
        'pulse-node': {
          '0%, 100%': { opacity: 0.4, transform: 'scale(1)' },
          '50%': { opacity: 1, transform: 'scale(1.4)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'dash-flow': {
          to: { strokeDashoffset: -200 },
        },
      },
      animation: {
        blob: 'blob 12s infinite ease-in-out',
        'pulse-node': 'pulse-node 2.4s infinite ease-in-out',
        shimmer: 'shimmer 3s infinite linear',
        'dash-flow': 'dash-flow 6s linear infinite',
      },
    },
  },
  plugins: [],
};
