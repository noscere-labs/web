import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Dark mode colors (primary)
        dark: {
          bg: '#0a0a0a',
          card: '#111827',
          elevated: '#1f2937',
          text: {
            primary: '#f1f5f9',
            secondary: '#94a3b8',
            muted: '#64748b',
          }
        },
        // Light mode colors
        light: {
          bg: '#ffffff',
          card: '#f8fafc',
          elevated: '#f1f5f9',
          text: {
            primary: '#0f172a',
            secondary: '#475569',
            muted: '#64748b',
          }
        },
        // Brand colors
        brand: {
          blue: {
            DEFAULT: '#3b82f6',
            dark: '#1e40af',
            light: '#2563eb',
            'light-dark': '#1d4ed8',
          },
          purple: {
            DEFAULT: '#8b5cf6',
            light: '#7c3aed',
          },
          cyan: {
            DEFAULT: '#06b6d4',
            light: '#0891b2',
          }
        }
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
