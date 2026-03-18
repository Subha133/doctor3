/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      },
      colors: {
        primary: {
          50: '#eff8ff',
          100: '#dbeffe',
          200: '#bfe3fd',
          300: '#93d1fb',
          400: '#60b4f7',
          500: '#3b94f2',
          600: '#2575e6',
          700: '#1d5fd4',
          800: '#1e4dab',
          900: '#1e4287',
          950: '#172853',
        },
        teal: {
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
        },
        cream: '#fafaf7',
        slate: {
          750: '#293548',
        }
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-left': 'slideLeft 0.7s ease-out forwards',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideLeft: {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #0f2557 0%, #1a3a8f 40%, #1e6fbf 70%, #0d9488 100%)',
        'card-gradient': 'linear-gradient(135deg, #ffffff 0%, #f0f7ff 100%)',
        'teal-gradient': 'linear-gradient(135deg, #0d9488 0%, #0f766e 100%)',
      },
      boxShadow: {
        'card': '0 4px 24px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 12px 40px rgba(0, 0, 0, 0.15)',
        'hero': '0 20px 60px rgba(15, 37, 87, 0.3)',
        'btn': '0 4px 20px rgba(37, 117, 230, 0.35)',
        'whatsapp': '0 4px 24px rgba(37, 211, 102, 0.4)',
      }
    },
  },
  plugins: [],
}
