import { fetchProducts, slugify } from './common.js';

function getProductIdFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return parseInt(urlParams.get("id"));
}

(async function () {
  const productId = getProductIdFromURL();
  const products = await fetchProducts();

  // اضافه کردن slug و categorySlug به هر محصول (اختیاری ولی مفید برای consistency)
  const enhanced = products.map(p => ({
    ...p,
    slug: slugify(p.title),
    categorySlug: slugify(p.category || 'عمومی')
  }));

  const product = enhanced.find(p => p.id === productId);
  const container = document.getElementById("product-detail");

  if (!product) {
    container.innerHTML = "<p>محصول پیدا نشد.</p>";
    return;
  }

  container.innerHTML = `
    <div class="flex flex-col md:flex-row gap-6">
      <img src="${product.image}" class="w-full md:w-1/2 object-cover rounded" alt="${product.title}" />
      <div class="flex-1 text-right">
        <h1 class="text-2xl font-bold mb-4">${product.title}</h1>
        <p class="text-orange-600 text-xl mb-4">${product.price} تومان</p>
        <p class="text-sm mb-6">${product.description || 'توضیحی برای این محصول وارد نشده است.'}</p>
        <button class="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">افزودن به سبد خرید</button>
      </div>
    </div>
  `;
})();
