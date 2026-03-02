/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Calibri', 'Arial', 'Helvetica', 'sans-serif'],
        serif: ['Georgia', 'Times New Roman', 'serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      colors: {
        // UI accent — never bleeds into exported resume
        accent: {
          50:  '#f0f4ff',
          100: '#e0eaff',
          200: '#c7d7fd',
          300: '#a5bafc',
          400: '#8193f8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        // Resume document surface palette
        paper: {
          white: '#ffffff',
          offwhite: '#fafaf9',
          light: '#f5f5f4',
        },
        ink: {
          primary: '#111111',
          secondary: '#374151',
          muted: '#6b7280',
          faint: '#9ca3af',
        },
        divider: '#e5e7eb',
      },
      fontSize: {
        'resume-name': ['20pt', { lineHeight: '1.1', fontWeight: '700' }],
        'resume-section': ['12pt', { lineHeight: '1.1', fontWeight: '700', letterSpacing: '0.03em' }],
        'resume-body': ['10.5pt', { lineHeight: '1.1' }],
        'resume-meta': ['9.5pt', { lineHeight: '1.1' }],
      },
    },
  },
  plugins: [],
}
