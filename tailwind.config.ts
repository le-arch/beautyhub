
import type {Config} from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
    extend: {
      backgroundImage: {
        'gradient-beauty-primary': 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 100%)',
        'gradient-beauty-secondary': 'linear-gradient(135deg, hsl(var(--purple-50)) 0%, hsl(var(--pink-50)) 100%)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          '50': 'hsl(var(--primary-50))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
          '50': 'hsl(var(--secondary-50))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: {
          DEFAULT: 'hsl(var(--input))',
          border: 'hsl(var(--input-border))'
        },
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
         'warmgray-50': '#f7f5f3',
        'warmgray-100': '#e7e5e4',
        'warmgray-200': '#d6d3d1',
        'warmgray-300': '#b5b0ad',
        'warmgray-400': '#a8a29e',
        'warmgray-500': '#78716c',
        'warmgray-600': '#57534e',
        'warmgray-700': '#44403c',
        'warmgray-800': '#292524',
        'warmgray-900': '#1c1917',
        'purple': {
            '50': '#faf5ff',
            '100': '#f3e8ff',
            '200': '#e9d5ff',
            '300': '#d8b4fe',
            '400': '#c084fc',
            '500': '#a855f7',
            '600': '#8b5a9f',
            '700': '#7e22ce',
            '800': '#6b21a8',
            '900': '#581c87'
        },
        'pink': {
            '50': '#fdf2f8',
            '100': '#fce7f3',
            '200': '#fbcfe8',
            '300': '#f9a8d4',
            '400': '#f472b6',
            '500': '#ec4899',
            '600': '#d13d63',
            '700': '#be185d',
            '800': '#9d174d',
            '900': '#831843'
        },
        'indigo-600': '#4f46e5',
        'rose-400': '#fb7185',
        'rose-600': '#e11d48',
        'emerald-400': '#34d399',
        'emerald-500': '#10b981',
        'emerald-600': '#059669',
        'orange-400': '#fb923c',
        'orange-500': '#f97316',
        'orange-600': '#ea580c',
        'blue-400': '#60a5fa',
        'blue-500': '#3b82f6',
        'blue-600': '#2563eb',
        'green-500': '#22c55e',
        'green-600': '#16a34a',
        'gray-600': '#4b5563',
        'gray-700': '#374151',
        'gray-900': '#111827',
      },
      borderRadius: {
        lg: '12px',
        md: '8px',
        sm: '4px',
        xl: '16px',
        '2xl': '24px',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
