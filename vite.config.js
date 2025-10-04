import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        cart: resolve(__dirname, 'public/cart.html'),
        login: resolve(__dirname, 'public/login.html'),
        register: resolve(__dirname, 'public/register.html'),
        productDetail: resolve(__dirname, 'public/product-detail.html'),
        productCategory: resolve(__dirname, 'public/product-category.html'),
        adminOrders: resolve(__dirname, 'public/adminOrders.html'),
        contact: resolve(__dirname, 'public/contact.html'),
        success: resolve(__dirname, 'public/success.html'),
        fail: resolve(__dirname, 'public/fail.html'),
        forgetPassword: resolve(__dirname, 'public/forget-password.html'),
        firefightingEquipment: resolve(__dirname, 'public/firefighting-equipment.html'),
        safteyEquipment: resolve(__dirname, 'public/saftey-equipment.html'),
      },
    },
  },
})
