
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    fontFamily: {
      playfair: ["'Playfair Display'", "serif"],
      inter: ["Inter", "system-ui", "sans-serif"],
    },
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1440px'
      }
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: '#352cf6', // Brand blue
          foreground: '#fff'
        },
        accent: {
          DEFAULT: '#97ff5c', // brand highlight
          foreground: '#202020'
        },
        muted: {
          DEFAULT: '#cfd8dc', // soft muted
          foreground: '#313a44'
        }
      },
      gradientColorStops: {
        hero: ['#eff7fa', '#edeaff', '#f9f8fa'],
      },
      boxShadow: {
        'feature': '0 6px 24px rgba(53,44,246,0.10), 0 1.5px 4px rgba(24,19,96,0.07);'
      },
      fontSize: {
        'hero': '3.6rem',
        'section': '2.1rem'
      },
      animation: {
        'fade-in': 'fade-in 0.6s cubic-bezier(.52,1.16,.52,1) both',
        'bounce-hover': 'bounce 0.3s',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: 0, transform: 'translateY(16px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' }
        },
        'bounce': {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' }
        },
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
