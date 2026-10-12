/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      colors: {
        brand: {
          50:  '#f0f0ff',
          100: '#e4e4ff',
          200: '#cdcbfe',
          300: '#aea9fc',
          400: '#8b7ef8',
          500: '#7c5bf1',
          600: '#6d3ce6',
          700: '#5c2dcb',
          800: '#4c27a5',
          900: '#3e2284',
          950: '#251358',
        },
        surface: {
          DEFAULT: '#ffffff',
          soft: '#f8f8fc',
          muted: '#f1f1f7',
        },
      },
      boxShadow: {
        card: '0 2px 12px 0 rgba(80,60,160,0.07)',
        'card-lg': '0 8px 32px 0 rgba(80,60,160,0.11)',
        glow: '0 0 24px 0 rgba(108,91,241,0.22)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease forwards',
        'slide-up': 'slideUp 0.4s cubic-bezier(0.22,1,0.36,1) forwards',
      },
      keyframes: {
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp: { from: { opacity: 0, transform: 'translateY(16px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [],
}
