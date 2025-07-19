// storage.js
import { faToEnDigits } from "./cartCount";
export function getCart() {
  return JSON.parse(localStorage.getItem('cart') || '[]');
}

export function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(product) {
  let cart = getCart();
  const existingIndex = cart.findIndex(item => item.id === product.id);

  if (existingIndex > -1) {
    // افزایش تعداد محصول موجود در سبد
    let currentQuantity = Number(faToEnDigits(String(cart[existingIndex].quantity))) || 0;
    cart[existingIndex].quantity = String(currentQuantity + 1);
  } else {
    // اضافه کردن محصول جدید به سبد با مقدار quantity=1 (رشته انگلیسی)
    cart.push({
      ...product,
      quantity: '1',
      price: String(product.price), // مطمئن شو که قیمت به صورت رشته انگلیسی ذخیره شده
    });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function clearCart() {
  localStorage.removeItem('cart');
}
