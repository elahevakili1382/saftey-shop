import { getCart } from '../storage.js';
import { faToEnDigits, updateCartCount } from '../cartCount.js';

export function CartTable() {
  const container = document.createElement('div');
  container.innerHTML = `
    <table class="w-full bg-white border border-gray-200 rounded-lg table-auto">
      <thead>
        <tr>
          <th>تصویر</th>
          <th>نام محصول</th>
          <th>قیمت</th>
          <th>تعداد</th>
          <th>جمع</th>
          <th>عملیات</th>
        </tr>
      </thead>
      <tbody id="cart-container"></tbody>
    </table>
  `;

  function render() {
    const cart = getCart();
    const tbody = container.querySelector('#cart-container');
    tbody.innerHTML = '';
    cart.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td><img src="${item.image}" class="w-16 h-16" /></td>
        <td>${item.title}</td>
        <td>${faToEnDigits(item.price)} تومان</td>
        <td>${faToEnDigits(item.quantity)}</td>
        <td>${faToEnDigits(item.price * item.quantity)} تومان</td>
        <td><button class="remove-btn">❌</button></td>
      `;
      tbody.appendChild(row);
    });
    updateCartCount();
  }

  render();
  return container;
}
