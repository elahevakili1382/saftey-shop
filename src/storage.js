// storage.js
import { faToEnDigits } from "./cartCount";
export function getCart() {
  return JSON.parse(localStorage.getItem('cart') || '[]');
}

export function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(product) {
  const cart = getCart();
  const existingItem = cart.find(item => item.id === product.id);

  const price = Number(faToEnDigits(product.price));
  const discountPrice = product.discountPrice ? Number(faToEnDigits(product.discountPrice)) : null;
  const originalPrice = discountPrice ? price : null;
  const finalPrice = discountPrice || price;

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

  saveCart(cart);
}



export function clearCart() {
  localStorage.removeItem('cart');
}
