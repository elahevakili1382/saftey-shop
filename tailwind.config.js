/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: [
    "./index.html",
    "./contact.html",  
    "./login.html",
    "./register.html",
    "./cart.html",
    "./fail.html",
    "./success.html",
    "./firefighting-equipment.html",
    "./forget-password.html",
    "./product-category.html",
    "./register.html",
    "./saftey-equipment.html",
    "./product-detail.html",
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
