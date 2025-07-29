// storage.js
import { faToEnDigits } from "./cartCount";
export function getCart() {
  return JSON.parse(localStorage.getItem('cart') || '[]');
}

export function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(product) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  const existingItem = cart.find(item => item.id === product.id);

  // 👇 تنظیم قیمت اصلی و تخفیف‌خورده قبل از ذخیره
  const originalPrice = product.discountPrice ? product.price : null;
  const finalPrice = product.discountPrice || product.price;

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      ...product,
      price: finalPrice,
      originalPrice: originalPrice,
      quantity: 1,
    });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
}


export function clearCart() {
  localStorage.removeItem('cart');
}
