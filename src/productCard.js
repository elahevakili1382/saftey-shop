// productCard.js
import { addToCart } from './storage.js';

export function createProductCard(product) {
  const card = document.createElement('div');
card.className = `
  relative bg-white h-96 w-full  max-w-sm flex flex-col justify-between rounded-xl shadow-md
  hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer
  border border-orange-400 hover:border-orange-600 p-4`;


  card.innerHTML = `
    <img src="${product.image}" alt="${product.title}" class="w-full h-48 object-contain rounded">
    <h3 class="mt-4 text-lg font-semibold text-gray-800 truncate">${product.title}</h3>
    <p class="text-orange-600 text-xl mt-1">${product.price.toLocaleString()} تومان</p>
   <button
  class="absolute left-4 bottom-4 bg-orange-600 text-white w-10 h-10 flex items-center justify-center rounded-full shadow hover:bg-orange-700 transition-all duration-300"
  aria-label="افزودن به سبد خرید"
  title="افزودن به سبد خرید"
>
  <i class="fa-solid fa-cart-shopping"></i>
</button>

  `;

  const btn = card.querySelector('button');
  btn.addEventListener('click', () => {
    addToCart(product);
    alert(`✅ ${product.title} به سبد خرید اضافه شد`);
    window.dispatchEvent(new CustomEvent('cartUpdated'));
  });

  return card;
}
