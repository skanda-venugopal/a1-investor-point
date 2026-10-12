/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Sampled from the supplied logo: navy #0D3863, green #498744
        navy: {
          50: '#eef3f9', 100: '#d9e4f0', 200: '#b3c8e0', 300: '#82a1c6', 400: '#4f78a6',
          500: '#2a5688', 600: '#1a4474', 700: '#0d3863', 800: '#0a2e52', 900: '#08243f', 950: '#051728',
        },
        leaf: {
          50: '#f1f8f0', 100: '#dcecd9', 200: '#bad9b5', 300: '#8fc088', 400: '#67a560',
          500: '#498744', 600: '#3a6f37', 700: '#2f592d', 800: '#264826', 900: '#1e3a20',
        },
        teal: { 400: '#2c9aa6', 500: '#1f7f8c', 600: '#18646f' },
        paper: '#f7f9f6',
        ink: { DEFAULT: '#14243a', soft: '#44546a', mute: '#6b7a8e' },
      },
      fontFamily: {
        serif: ['Newsreader', 'Georgia', 'Cambria', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(8,36,63,.05), 0 8px 24px -8px rgba(8,36,63,.12)',
        lift: '0 2px 4px rgba(8,36,63,.06), 0 18px 40px -12px rgba(8,36,63,.22)',
      },
      maxWidth: { page: '76rem' },
    },
  },
  plugins: [],
}
