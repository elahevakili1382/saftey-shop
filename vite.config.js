import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: './', // مسیر نسبی برای کارکرد درست در Vercel
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        cart: resolve(__dirname, 'cart.html'),
        login: resolve(__dirname, 'login.html'),
        register: resolve(__dirname, 'register.html'),
        productDetail: resolve(__dirname, 'product-detail.html'),
        productCategory: resolve(__dirname, 'product-category.html'),
        adminDashbord: resolve(__dirname, 'admin-dashbord.html'),
       adminProducts: resolve(__dirname, 'products.html'),
       adminOrders: resolve(__dirname, 'orders.html'),
        adminCustomers: resolve(__dirname, 'customers.html'),
        adminCategory: resolve(__dirname, 'categories.html'),
        contact: resolve(__dirname, 'contact.html'),
        success: resolve(__dirname, 'success.html'),
        fail: resolve(__dirname, 'fail.html'),
        forgetPassword: resolve(__dirname, 'forget-password.html'),
        firefightingEquipment: resolve(__dirname, 'firefighting-equipment.html'),
        safteyEquipment: resolve(__dirname, 'saftey-equipment.html'),
      },
    },
  },
})
