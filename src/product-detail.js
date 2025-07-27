import { addToCart, getCart } from './storage.js';
import { updateCartCount } from './cartCount.js';

document.addEventListener('DOMContentLoaded', () => {
  const productData = localStorage.getItem('selectedProduct');
  if (!productData) return;

  const product = JSON.parse(productData);

  // نمایش اطلاعات محصول در صفحه
  document.getElementById('productTitle').textContent = product.title;
  document.getElementById('productPrice').textContent = `${(+product.price).toLocaleString()} تومان`;
  document.getElementById('mainImage').src = product.image;

  // تغییر تصویر اصلی با کلیک روی تصاویر کوچک
  document.querySelectorAll('.thumbnail-image').forEach(thumbnail => {
    thumbnail.addEventListener('click', () => {
      document.getElementById('mainImage').src = thumbnail.src;
    });
  });

  // افزودن به سبد خرید
  document.getElementById('add-to-cart-btn').addEventListener('click', () => {
    const quantity = parseInt(document.querySelector('input[type="number"]').value) || 1;

    const cartProduct = {
      id: product.id,
      title: product.title,
      price: +product.price,
      image: product.image,
      quantity,
    };

    const cart = getCart();
    const existingItem = cart.find(item => item.id === cartProduct.id);

    if (existingItem) {
      existingItem.quantity += cartProduct.quantity;
    } else {
      cart.push(cartProduct);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();

    alert(`✅ «${product.title}» به سبد خرید اضافه شد`);
  });
});
