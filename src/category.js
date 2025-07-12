import { fetchProducts, slugify } from './common.js';

// دریافت slug دسته از URL
function getCategorySlug() {
  const parts = window.location.pathname.split('/');
  return decodeURIComponent(parts.at(-1));
}

(async function () {
  const categorySlug = getCategorySlug();
  const products = await fetchProducts();

  // ساخت اسلاگ برای هر محصول
  const enhanced = products.map(p => ({
    ...p,
    slug: slugify(p.title),
    categorySlug: slugify(p.category || 'عمومی')
  }));

  // فیلتر محصولات براساس categorySlug
  const filtered = enhanced.filter(p => p.categorySlug === categorySlug);

  // نمایش عنوان دسته
  document.getElementById("categoryTitle").textContent = filtered[0]?.category || 'نامشخص';

  const container = document.getElementById("product-list");

  // رندر محصولات
  filtered.forEach(p => {
    const card = document.createElement('div');
    card.className = "bg-white p-4 rounded shadow";
    card.innerHTML = `
      <img src="${p.image}" class="w-full h-40 object-cover rounded" alt="${p.title}">
      <h2 class="text-lg font-bold mt-2">${p.title}</h2>
      <p class="text-orange-600 mt-1">${p.price} تومان</p>
      <a href="/src/product.html?id=${p.id}" class="text-sm text-blue-600 mt-2 block">مشاهده محصول</a>
    `;
    container.appendChild(card);
  });
})();
