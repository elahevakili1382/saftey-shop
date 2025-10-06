import { HeaderWithNav, attachHeaderEvents } from './components/Header.js';
import { Footer } from './components/Footer.js';
import { updateCartCount } from './cartCount.js';
import '../css/styles.css';

// محصول پیش‌فرض دمو
const defaultProduct = {
  id: 1,
  title: "کلاه ایمنی مهندسی",
  brand: "Demo Brand",
  category: "تجهیزات حفاظت فردی",
  subcategory: "ماسک ایمنی",
  price: 150000,
  discountPrice: 190000,
  mainImage: "/images/full-face-mask.jpg",
  gallery: [
    "/images/x-plore-6570-3-2-full-face.avif",
    "/images/x-plore-6300-v2-3-2-full-face.avif",
    "/images/x-plore-5500-3-2-full-face-2-filter.avif",
    "/images/X-plore-3000-half-mask.avif",
  ],
  sizes: ["کوچک", "متوسط", "بزرگ"],
  description: "صنایع پیشنهادی شامل ساخت و ساز، تولید عمومی، زیرساخت‌های سنگین...",
  specs: [
    { label: "نوع محصول", value: "کلاه ایمنی مهندسی" },
    { label: "برند", value: "Demo Brand" },
    { label: "کاربرد", value: "صنایع ساخت و ساز، تولید و ..." }
  ]
};

// 🧱 رندر کامل صفحه محصول
function renderProductDetail(product) {
  const container = document.getElementById('product-detail');
  if (!container) return;

  container.innerHTML = `
    <div class="flex flex-col md:flex-row gap-8">
      <!-- گالری عکس -->
      <div class="w-full md:w-1/2">
        <img id="mainImage" src="${product.mainImage}" alt="${product.title}" 
          class="w-full max-w-md mx-auto rounded-lg shadow hover:scale-105 transition-transform duration-300" />
        <div class="flex justify-center gap-2 mt-4 flex-wrap">
          ${product.gallery.map(img => `<img src="${img}" class="thumbnail w-20 h-20 rounded cursor-pointer border hover:border-orange-500 transition" />`).join('')}
        </div>
      </div>

      <!-- مشخصات -->
      <div class="grow pt-4">
        <h4 class="text-gray-500 text-lg mb-1">${product.category}</h4>
        <h2 class="text-3xl font-bold mb-1">${product.title}</h2>
        <h3 class="text-xl font-semibold mb-2">${product.brand}</h3>
        <h6 class="text-red-500 text-2xl mb-4">${product.price.toLocaleString()} تومان</h6>

        <div class="flex items-center gap-4 my-4">
          <input id="qtyInput" type="number" min="1" value="1"
            class="w-16 text-center border rounded py-2" />
          <button id="addToCartBtn"
            class="bg-orange-600 hover:bg-orange-700 text-white py-2 px-6 rounded text-lg transition">
            افزودن به سبد خرید 🛒
          </button>
        </div>

        <h4 class="text-xl font-bold mt-6 mb-2">جزئیات محصول</h4>
        <p class="text-base leading-8 text-gray-700">${product.description}</p>
      </div>
    </div>

    <!-- مشخصات فنی -->
    <section class="bg-white rounded-lg shadow p-4 mt-12 max-w-3xl mx-auto">
      <h3 class="text-2xl font-bold mb-4">مشخصات فنی</h3>
      <div class="space-y-2">
        ${product.specs.map(s => `
          <div class="grid grid-cols-[1fr_2fr] border-b border-gray-100 pb-2">
            <span class="font-semibold text-gray-700">${s.label}</span>
            <span class="text-gray-600">${s.value}</span>
          </div>`).join('')}
      </div>
    </section>
  `;

  // تغییر عکس اصلی هنگام کلیک روی بندانگشتی‌ها
  document.querySelectorAll('.thumbnail').forEach((thumb) => {
    thumb.addEventListener('click', () => {
      document.getElementById('mainImage').src = thumb.src;
    });
  });

  // افزودن به سبد خرید
  document.getElementById('addToCartBtn').addEventListener('click', () => {
    const qty = parseInt(document.getElementById('qtyInput').value);
    addToCart(product, qty);
  });
}

// 🛍 ذخیره در لوکال استورج
function addToCart(product, qty =1) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existing = cart.find((item) => item.id === product.id);

  if (existing) existing.qty += qty;
  else cart.push({ ...product, qty }); // دقت: باید qty ذخیره شود

  localStorage.setItem('cart', JSON.stringify(cart));

  updateCartCount(); // ← اینجا حتما باید صدا زده شود
  showToast('محصول با موفقیت به سبد خرید اضافه شد ✅');
}


// 🔔 نوتیف توست ساده
function showToast(msg) {
  const toast = document.createElement('div');
  toast.textContent = msg;
  toast.className =
    'fixed top-5 right-5 bg-orange-500 text-white py-3 px-6 rounded shadow-lg z-50 animate-bounce';
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2500);
}

// 🔧 اجرای اولیه
document.addEventListener('DOMContentLoaded', () => {
  const headerElement = HeaderWithNav();
  document.body.prepend(headerElement);
  attachHeaderEvents();
  updateCartCount();

  renderProductDetail(defaultProduct);
  document.body.appendChild(Footer());
});