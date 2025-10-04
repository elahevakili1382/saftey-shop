/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: [
    "./*.html",                 // همه فایل‌های HTML در ریشه
    "./src/**/*.{js,ts,jsx,tsx}" // همه فایل‌های داخل src
  ],
  theme: {
    extend: {
      fontFamily: {
        vazir: ['Vazir', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
