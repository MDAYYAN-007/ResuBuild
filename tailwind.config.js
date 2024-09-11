/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        lora: ['Lora', 'serif'],
        noto: ['Noto Serif', 'serif'],
        crimson: ['Crimson Pro', 'serif'],
        playpen: ['Playpen Sans', 'serif'],
        balsamiq: ['Balsamiq Sans', 'serif'],
      },
      screens: {
        'max-2xl': { 'max': '1535px' },
        'max-xl': { 'max': '1200px' },
        'max-lg': { 'max': '1000px' },
        'max-md': { 'max': '820px' },
        'max-sm': { 'max': '639px' },
        'max-xsm': { 'max': '500px' },
        'max-vxsm': { 'max': '390px' },
        'max-vvxsm': { 'max': '360px' },
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
