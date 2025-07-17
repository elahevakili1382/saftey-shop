import { fetchProducts } from './common.js';
import { createProductCard } from './productCard.js';

(async function () {
  const products = await fetchProducts();

  const categoryTitleEl = document.getElementById('categoryTitle');
  const productListEl = document.getElementById('product-list');

  if (!products || products.length === 0) {
    categoryTitleEl.textContent = 'هیچ محصولی موجود نیست';
    productListEl.innerHTML = '<p class="col-span-full text-center text-gray-500">محصولی یافت نشد.</p>';
    return;
  }

  categoryTitleEl.textContent = 'همه محصولات'; // یا هر متن دلخواه

  products.forEach(product => {
    const card = createProductCard(product);
    productListEl.appendChild(card);
  });
})();
