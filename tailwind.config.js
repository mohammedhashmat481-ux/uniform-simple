/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '400px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0B1B33',
          dark: '#071224',
          light: '#132847',
          surface: '#182E4F',
          muted: '#243A5E'
        },
        gold: {
          DEFAULT: '#C9A24B',
          light: '#E2BD68',
          dark: '#A68233',
          shimmer: '#F7E7C4',
        },
        ivory: {
          DEFAULT: '#FAF7F2',
          light: '#FDFBF7',
          dark: '#F3EDE2',
        },
        charcoal: {
          DEFAULT: '#12161C',
          light: '#1D232C',
          muted: '#2A323E'
        },
        body: '#5A6270',
        heading: '#1B1F24',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      maxWidth: {
        'site': '1240px',
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(11, 27, 51, 0.07)',
        'luxury-hover': '0 30px 60px -15px rgba(11, 27, 51, 0.15)',
        'gold-glow': '0 0 20px rgba(201, 162, 75, 0.25)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.05)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        }
      }
    },
  },
  plugins: [],
}
