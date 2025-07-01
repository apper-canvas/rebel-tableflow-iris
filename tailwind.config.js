/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'display': ['Outfit', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#FFF3E0',
          100: '#FFE0B2',
          200: '#FFCC80',
          300: '#FFB74D',
          400: '#FFA726',
          500: '#D84315',
          600: '#F57C00',
          700: '#E65100',
          800: '#D84315',
          900: '#BF360C',
        },
        secondary: {
          50: '#EFEBE9',
          100: '#D7CCC8',
          200: '#BCAAA4',
          300: '#A1887F',
          400: '#8D6E63',
          500: '#795548',
          600: '#6D4C41',
          700: '#5D4037',
          800: '#4E342E',
          900: '#3E2723',
        },
        accent: {
          50: '#FFF8E1',
          100: '#FFECB3',
          200: '#FFE082',
          300: '#FFD54F',
          400: '#FFCA28',
          500: '#FF6F00',
          600: '#FFB300',
          700: '#FFA000',
          800: '#FF8F00',
          900: '#FF6F00',
        },
        surface: '#FFF3E0',
        success: '#558B2F',
        warning: '#F57C00',
        error: '#C62828',
        info: '#1565C0',
      },
      boxShadow: {
        'card': '0 4px 8px rgba(0, 0, 0, 0.1)',
        'elevated': '0 8px 16px rgba(0, 0, 0, 0.15)',
      },
      animation: {
        'pulse-success': 'pulse-success 0.6s ease-out',
        'scale-in': 'scale-in 0.2s ease-out',
      },
      keyframes: {
        'pulse-success': {
          '0%': { transform: 'scale(1)', backgroundColor: 'rgb(85, 139, 47)' },
          '50%': { transform: 'scale(1.05)', backgroundColor: 'rgb(76, 175, 80)' },
          '100%': { transform: 'scale(1)', backgroundColor: 'rgb(85, 139, 47)' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}