import { fetchProducts } from './common.js';
import { createProductCard } from './productCard.js';
import { updateCartCount } from './cartCount.js';


(async function () {
  const products = await fetchProducts();

  const categoryTitleEl = document.getElementById('categoryTitle');
  const productListEl = document.getElementById('product-list');

  if (!products || products.length === 0) {
    categoryTitleEl.textContent = 'هیچ محصولی موجود نیست';
    productListEl.innerHTML = '<p class="col-span-full text-center text-gray-500">محصولی یافت نشد.</p>';
        updateCartCount(); // ⬅️ اینجا هم در صورت خالی بودن

    return;
  }

  categoryTitleEl.textContent = 'ملزومات ایمنی ';

  products.forEach(product => {
    const card = createProductCard(product);
    productListEl.appendChild(card);
  });
  updateCartCount();

})();
