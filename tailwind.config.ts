import type { Config } from 'tailwindcss';
import { withUt } from 'uploadthing/tw';

const config: Config = {
  darkMode: ['class'],
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        primary: ['var(--font-manrope)']
      },
      colors: {
        primary: '#ff5117',
        secondary: '#0d0c22',
        'gray-e8d': '#e8ebed',
        'gray-e8e': '#e8e8e8',
        'gray-66': '#666',
        'black-o8': '#00000008',
        'black-4d': '#0000004d',
        'black-44': '#444',
        'red-f3': '#f33a58',
        'orange-ff8': '#ff8f26',
        'green-00b': '#00b14f'
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0'
          },
          to: {
            height: 'var(--radix-accordion-content-height)'
          }
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)'
          },
          to: {
            height: '0'
          }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: []
  // require('tailwindcss-animate')
};
export default withUt(config);
