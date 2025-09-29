/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: [
    "./index.html",
    "./contact.html",  
    "./login.html",
    "./register.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./css/**/*.css"
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
