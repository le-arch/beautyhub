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
        'gradient-beauty-secondary': 'linear-gradient(135deg, hsl(var(--primary-50)) 0%, hsl(var(--secondary-50)) 100%)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        headline: ['Belleza', 'serif'],
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
        'purple-50': '#faf5ff',
        'purple-100': '#f3e8ff',
        'purple-200': '#e9d5ff',
        'purple-300': '#d8b4fe',
        'purple-400': '#c084fc',
        'purple-500': '#a855f7',
        'purple-600': '#8b5a9f',
        'purple-700': '#7e22ce',
        'purple-800': '#6b21a8',
        'purple-900': '#581c87',
        'pink-50': '#fdf2f8',
        'pink-100': '#fce7f3',
        'pink-200': '#fbcfe8',
        'pink-300': '#f9a8d4',
        'pink-400': '#f472b6',
        'pink-500': '#ec4899',
        'pink-600': '#d13d63',
        'pink-700': '#be185d',
        'pink-800': '#9d174d',
        'pink-900': '#831843',
      },
      borderRadius: {
        lg: '12px',
        md: '8px',
        sm: '4px',
        xl: '16px',
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
