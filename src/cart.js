// فایل: cart.js
import { getCart, saveCart } from './storage.js';

const cartContainer = document.getElementById('cart-container');
const totalContainer = document.getElementById('total');
const clearCartBtn = document.getElementById('clear-cart');

function renderCart() {
  const cart = getCart();
  cartContainer.innerHTML = '';

  if (cart.length === 0) {
    cartContainer.innerHTML = `
      <p class="col-span-full text-center text-gray-500 text-xl">سبد خرید شما خالی است.</p>
    `;
    totalContainer.textContent = '';
    return;
  }

  let totalPrice = 0;
  let totalCount = 0;

  cart.forEach((item) => {
    totalPrice += item.price * item.quantity;
    totalCount += item.quantity;

    const card = document.createElement('div');
    card.className = `
      bg-white w-full min-h-[460px] flex flex-col justify-between rounded-xl shadow-md
      hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer group border border-orange-400
      hover:border-orange-600
    `;

    card.innerHTML = `
      <div class="overflow-hidden rounded-t-xl">
        <img src="${item.image}" class="w-full aspect-[4/3] object-contain transform group-hover:scale-105 transition duration-300" alt="${item.title}">
      </div>
      <div class="flex flex-col items-start px-5 py-4">
        <h3 class="text-lg font-bold text-orange-700 mb-1">${item.title}</h3>
        <p class="text-gray-700 mb-3">${item.price.toLocaleString()} تومان</p>

        <div class="flex items-center gap-2 mb-3">
          <button data-id="${item.id}" data-action="decrease" class="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300">➖</button>
          <span class="text-sm font-bold text-black">${item.quantity}</span>
          <button data-id="${item.id}" data-action="increase" class="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300">➕</button>
        </div>

        <button data-id="${item.id}" data-action="remove" class="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition">
          🗑 حذف
        </button>
      </div>
    `;

    cartContainer.appendChild(card);
  });

  totalContainer.textContent = `مجموع: ${totalPrice.toLocaleString()} تومان (${totalCount} عدد)`;
}

cartContainer.addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-id]');
  if (!btn) return;

  const id = btn.dataset.id;
  const action = btn.dataset.action;
  let cart = getCart();
  const index = cart.findIndex((p) => p.id == id);

  if (index === -1) return;

  if (action === 'increase') {
    cart[index].quantity++;
  } else if (action === 'decrease') {
    cart[index].quantity--;
    if (cart[index].quantity <= 0) cart.splice(index, 1);
  } else if (action === 'remove') {
    cart.splice(index, 1);
  }

  saveCart(cart);
  renderCart();
});

clearCartBtn.addEventListener('click', () => {
  localStorage.removeItem('shopping_cart');
  renderCart();
});

renderCart();
