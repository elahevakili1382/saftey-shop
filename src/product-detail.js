import { addToCart } from './storage.js';
import { getCart } from './storage.js';
import { updateCartCount } from './cartCount.js';

const mainImage = document.querySelector('.main-product-image');
const thumbnails = document.querySelectorAll('.thumbnail-image');

thumbnails.forEach(thumbnail => {
  thumbnail.addEventListener('click', () => {
    mainImage.src = thumbnail.src;
  });
});

document.getElementById('add-to-cart-btn').addEventListener('click', () => {
  const product = {
    id: 'mask-6200',
    title: 'ماسک نیم صورت تک فیلتر 6200',
    price: '2300000',
    quantity: parseInt(document.querySelector('input[type="number"]').value) || 1,
    image: 'images/mask/6200-1.avif',
  };

  add(product);
});

function add(product) {
  const cart = getCart();
  const existingItem = cart.find(item => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += product.quantity;
  } else {
    cart.push(product);
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  alert('✅ محصول به سبد خرید اضافه شد');
}
