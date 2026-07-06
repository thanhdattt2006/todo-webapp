/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        surface: { light: '#F8F7F4', dark: '#15181D' },
        card: { light: '#FFFFFF', dark: '#1D2127' },
        borderline: { light: '#E8E6E1', dark: '#2A2F37' },
        content: {
          main: { light: '#1C1B1A', dark: '#E5E3DE' },
          sub: { light: '#6B6862', dark: '#8B9099' },
        },
        accent: { DEFAULT: '#2563EB', hover: '#1D4ED8' },
        priority: {
          urgent: '#DC2626',
          medium: '#D97706',
          low: '#16A34A',
        },
      },
      boxShadow: {
        card: '0 2px 4px -1px rgba(0,0,0,0.03), 0 8px 16px -4px rgba(0,0,0,0.03)',
        'card-hover': '0 4px 6px -1px rgba(0,0,0,0.05), 0 20px 25px -5px rgba(0,0,0,0.08), 0 0 0 1px rgba(37, 99, 235, 0.1)',
        urgent: '0 0 20px -5px rgba(220, 38, 38, 0.15)',
        accent: '0 8px 20px -6px rgba(37, 99, 235, 0.3)',
      },
      transitionTimingFunction: {
        bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
