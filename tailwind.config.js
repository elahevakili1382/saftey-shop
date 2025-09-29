/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
content: [
  "./index.html",
  "./contact.html",  
  "./login.html",
  "./register.html",        // ← این رو اضافه کن اگه فایل خارج از src هست
  "./src/**/*.{js,ts,jsx,tsx}",
  "./css/**/*.css"
          // ← همه فایل‌های HTML در پروژه
],
theme: {
    extend: {
      fontFamily: {
        iran: ['IranSans', ...defaultTheme.fontFamily.sans],
      }
     
    },
  },
  plugins: [],
}
