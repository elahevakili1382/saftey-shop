import { getCart, clearCart } from './storage.js';
import { faToEnDigits, updateCartCount } from './cartCount.js';

const cartContainer = document.getElementById('cart-container');
const totalPriceEl = document.getElementById('total-price');
const totalItemsEl = document.getElementById('total-items');
const clearBtn = document.getElementById('clear-cart');

function renderCartTable() {
  const cart = getCart();
  cartContainer.innerHTML = '';

  if (!cart.length) {
    cartContainer.innerHTML = `
      <tr>
        <td colspan="6" class="text-center py-4 text-gray-500">سبد خرید شما خالی است.</td>
      </tr>`;
    updateTotal();
    updateCartCount();
    return;
  }

  cart.forEach(item => {
   const price = Number(faToEnDigits(String(item.price))) || 0;
const quantity = Number(faToEnDigits(String(item.quantity))) || 0;


    const row = document.createElement('tr');
    row.className = 'border-b hover:bg-gray-50';
   row.innerHTML = `
  <td class="px-4 py-3">
    <img src="${item.image}" alt="${item.title}" class="w-16 h-16 object-cover rounded" />
  </td>

  <td class="px-4 py-3 font-medium">${item.title}</td>

  <td class="px-4 py-3 text-sm text-gray-800">${price.toLocaleString('fa-IR')} تومان</td>

  <td class="px-4 py-3">
    <div class="flex items-center justify-center gap-2">
      <button class="decrease-qty bg-orange-100 hover:bg-orange-200 text-orange-700 font-bold rounded-full w-8 h-8 transition" data-id="${item.id}">-</button>
      <span class="quantity-display font-bold text-gray-900">${quantity.toLocaleString('fa-IR')}</span>
      <button class="increase-qty bg-orange-100 hover:bg-orange-200 text-orange-700 font-bold rounded-full w-8 h-8 transition" data-id="${item.id}">+</button>
    </div>
  </td>

  <td class="px-4 py-3 text-sm text-gray-800">
    ${(price * quantity).toLocaleString('fa-IR')} تومان
  </td>

  <td class="px-4 py-3">
    <button class="remove-btn w-full bg-orange-500 text-white hover:border-2 border-orange-700 hover:bg-slate-50 hover:text-orange-700 py-2 rounded-lg text-sm transition mt-2" data-id="${item.id}">
      <i class="fa-solid fa-trash"></i>
    </button>
  </td>
`;


    row.querySelector('.remove-btn').addEventListener('click', () => removeItemFromCart(item.id));
    cartContainer.appendChild(row);


    // دکمه افزایش
row.querySelector('.increase-qty').addEventListener('click', () => {
  updateQuantity(item.id, quantity + 1);
});

row.querySelector('.decrease-qty').addEventListener('click', () => {
  if (quantity > 1) updateQuantity(item.id, quantity - 1);
});


  });

  updateTotal();
  updateCartCount();
}
function updateQuantity(productId, newQuantity) {
  const cart = getCart().map(item => {
    if (item.id === productId) {
      return { ...item, quantity: newQuantity };
    }
    return item;
  });
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCartTable();
}


function removeItemFromCart(productId) {
  const updatedCart = getCart().filter(item => item.id !== productId);
  localStorage.setItem('cart', JSON.stringify(updatedCart));
  renderCartTable();
}

function updateTotal() {
  if (!totalPriceEl || !totalItemsEl) return;
  const cart = getCart();

  const total = cart.reduce((sum, item) => {
    const price = Number(faToEnDigits(item.price)) || 0;
    const quantity = Number(faToEnDigits(item.quantity)) || 0;
    return sum + price * quantity;
  }, 0);

  const totalItems = cart.reduce((sum, item) => sum + (Number(faToEnDigits(item.quantity)) || 0), 0);

  totalPriceEl.textContent = `${total.toLocaleString('fa-IR')} تومان`;
  totalItemsEl.textContent = totalItems.toLocaleString('fa-IR');
}

clearBtn.addEventListener('click', () => {
  clearCart();
  renderCartTable();
});

document.addEventListener('DOMContentLoaded', () => {
  renderCartTable();
});
