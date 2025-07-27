// productCard.js
import { updateCartCount } from './cartCount.js';
import { addToCart } from './storage.js';
import { showToast } from './toast.js';

export function createProductCard(product) {
  const card = document.createElement('div');
  card.setAttribute('data-aos', 'fade-up'); // یا هر انیمیشن دیگه‌ای
card.setAttribute('data-aos-delay', '100'); // اختیاری: تاخیر برای اجرای انیمیشن
card.setAttribute('data-aos-duration', '800'); // اختیاری: مدت زمان
  card.className = `
    relative bg-white h-auto w-full max-w-sm flex flex-col justify-between
    rounded-md md:rounded-2xl border border-gray-200 shadow-md
    hover:shadow-lg transition-shadow duration-300
    overflow-hidden cursor-pointer p-4
    sm:h-96 
  `;

  card.innerHTML = `
    <img src="${product.image}" alt="${product.title}" class="product-link w-[70%] md:w-full h-48 object-contain rounded">
    <h3 class="product-link mt-4 text-sm md:text-lg font-semibold text-gray-800 truncate">${product.title}</h3>
    <p class="text-orange-600 text-md md:text-lg mt-1">${product.price.toLocaleString()} تومان</p>
    <button
      class="absolute left-4 bottom-4 bg-orange-600 text-white w-10 h-10 flex items-center justify-center rounded-full shadow hover:bg-orange-700 transition-all duration-300"
      aria-label="افزودن به سبد خرید"
      title="افزودن به سبد خرید"
    >
      <i class="fa-solid fa-cart-shopping"></i>
    </button>
  `;

  // ✅ کلیک روی کل کارت یا قسمت‌های قابل کلیک (تصویر یا عنوان)
  card.querySelectorAll('.product-link').forEach(el => {
    el.addEventListener('click', () => {
      // ذخیره اطلاعات محصول در localStorage
      localStorage.setItem('selectedProduct', JSON.stringify(product));
      // هدایت به صفحه جزئیات
      window.location.href = 'product-detail.html';
    });
  }

  

);

  // ✅ دکمه افزودن به سبد خرید
  const btn = card.querySelector('button');
  btn.addEventListener('click', (e) => {
    e.stopPropagation(); // جلوگیری از کلیک کارت
    addToCart(product);
    showToast(`✅ «${product.title}» به سبد خرید اضافه شد`);
    updateCartCount();
  });

  return card;
}
