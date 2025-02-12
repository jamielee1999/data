/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        blue: {
          DEFAULT: '#0043C1',
          900: '#061143',
        },
        purple: {
          400: '#8A56FF',
          DEFAULT: '#7853F6',
          600: '#6B2BF2',
        },
        cyan: {
          100: '#9BEEF8',
          200: '#87FFFD',
          300: '#4AE1FF',
          DEFAULT: '#1CC1D7',
        },
        dark: {
          DEFAULT: '#000D25',
        },
        gray: {
          DEFAULT: '#555555',
        },
      },
      fontSize: {
        'xl': ['1.25rem', '1.5'],
        '2xl': ['1.5rem', '1.5'],
        '3xl': ['1.875rem', '1.5'],
        '4xl': ['2.25rem', '1.5'],
        '5xl': ['3rem', '1.5'],
        '6xl': ['3.75rem', '1.5'],
        '7xl': ['4.5rem', '1.5'],
        '8': ['2rem', '1.2'],
        '10': ['2.5rem', '1.2'],
        '14': ['3.5rem', '1.2'],
        '20': ['5rem', '1.2'],

      },
      spacing: {
        13: '3.25rem',
        18: '4.5rem',
        30: '7.5rem',
      },
      fontFamily: {
        popping: ['Poppins', 'sans-serif'],
        fugaz: ['Fugaz One', 'cursive'],
        roboto: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
