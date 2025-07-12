/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: [
    "./index.html",               // فایل اصلی HTML در ریشه
    "./src/**/*.{js,ts,jsx,tsx}", // اسکریپت‌ها داخل src
    "./css/**/*.{html,js}"        // در صورت نیاز بررسی فایل‌های HTML/JS داخل پوشه CSS
  ],
theme: {
    extend: {
      fontFamily: {
        iran: ['IranSans', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}
