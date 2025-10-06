import '../css/styles.css';
import { getCart, clearCart } from './storage.js';

import { HeaderWithNav, attachHeaderEvents } from './components/Header.js';
import { Footer } from './components/Footer.js';
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
const quantity = Number(faToEnDigits(item.qty)) || 0;


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


function updateQuantity(productId, newQty) {
  const cart = getCart().map(item => {
    if (item.id === productId) {
      return { ...item, qty: newQty };
    }
    return item;
  });
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCartTable();
  updateCartCount();
}


function removeItemFromCart(productId) {
  const updatedCart = getCart().filter(item => item.id !== productId);
  localStorage.setItem('cart', JSON.stringify(updatedCart));
  renderCartTable();
}

function updateTotal() {
  if (!totalPriceEl || !totalItemsEl) return;
  const cart = getCart();

  let total = 0;
  let totalItems = 0;
  let totalProfit = 0;

  cart.forEach(item => {
    const price = Number(faToEnDigits(item.price)) || 0;
    const quantity = Number(faToEnDigits(item.quantity)) || 0;

    total += price * quantity;
    totalItems += quantity;

    // فرض سود به صورت تفاوت قیمت اصلی و تخفیف (در صورت وجود)
    const originalPrice = item.originalPrice ? Number(faToEnDigits(item.originalPrice)) : price;
    const profitPerItem = originalPrice - price;
    totalProfit += profitPerItem * quantity;
  });

  totalPriceEl.textContent = `${total.toLocaleString('fa-IR')} تومان`;
  totalItemsEl.textContent = totalItems.toLocaleString('fa-IR');

  const totalProfitEl = document.getElementById('total-profit');
  if (totalProfitEl) {
    totalProfitEl.textContent = `${totalProfit > 0 ? totalProfit.toLocaleString('fa-IR') : 0} تومان`;
  }
}


clearBtn.addEventListener('click', () => {
  clearCart();
  renderCartTable();
});

document.addEventListener('DOMContentLoaded', () => {
  const headerElement = HeaderWithNav();
  document.body.prepend(headerElement);
  attachHeaderEvents(); // فعال سازی منو و بروزرسانی cartCount
  renderCartTable();   // پر کردن جدول
  document.body.appendChild(Footer());
});


 document.addEventListener("DOMContentLoaded", () => {
    const select = document.getElementById("province-select");
    const shippingInfo = document.getElementById("shipping-methods");

    select?.addEventListener("change", () => {
      const province = select.value;

      if (province === "تهران") {
        shippingInfo.innerHTML = `
          <p>🔸 ارسال با پیک فوری یا پیک استاندارد</p>
          <p>🕓 تحویل: همان روز یا حداکثر روز بعد</p>
        `;
      } else {
        shippingInfo.innerHTML = `
          <p>🔸 ارسال با پست پیشتاز یا تیپاکس</p>
          <p>🕓 تحویل: ۲ تا ۵ روز کاری بسته به موقعیت شما</p>
        `;
      }
    });
  });