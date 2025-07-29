import { updateCartCount } from './cartCount.js';
import { addToCart } from './storage.js';
import { showToast } from './toast.js';

function parsePersianNumber(str) {
  if (typeof str === 'number') return str;
  return Number(str.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d)).replace(/٬/g, ''));
}

function toPersianDigits(number) {
  return number.toLocaleString('fa-IR');
}

export function createProductCard(product) {
  const card = document.createElement('div');
  card.setAttribute('data-aos', 'fade-up');
  card.setAttribute('data-aos-delay', '100');
  card.setAttribute('data-aos-duration', '800');

  card.className = `
    relative bg-white h-auto w-full max-w-sm flex flex-col justify-between
    rounded-md md:rounded-2xl border border-gray-200 shadow-md
    hover:shadow-lg transition-shadow duration-300
    overflow-hidden cursor-pointer p-4 sm:h-96
  `;

  const originalPrice = parsePersianNumber(product.price);
  const discountPrice = product.discountPrice ? parsePersianNumber(product.discountPrice) : null;

  const priceSection = discountPrice
    ? `
      <div class="flex flex-col items-start gap-1 mt-1">
        <span class="text-red-600 font-bold text-md md:text-lg">
          ${toPersianDigits(discountPrice)} تومان
        </span>
        <span class="line-through text-gray-400 text-sm">
          ${toPersianDigits(originalPrice)} تومان
        </span>
      </div>
    `
    : `
      <p class="text-orange-600 text-md md:text-lg mt-1">
        ${toPersianDigits(originalPrice)} تومان
      </p>
    `;

  card.innerHTML = `
    <img src="${product.image}" alt="${product.title}" class="product-link w-[70%] md:w-full h-48 object-contain rounded">
    <h3 class="product-link mt-4 text-sm md:text-lg font-semibold text-gray-800 truncate">${product.title}</h3>
    ${priceSection}
    <button
      class="absolute left-4 bottom-4 bg-orange-600 text-white w-10 h-10 flex items-center justify-center rounded-full shadow hover:bg-orange-700 transition-all duration-300"
      aria-label="افزودن به سبد خرید"
      title="افزودن به سبد خرید"
    >
      <i class="fa-solid fa-cart-shopping"></i>
    </button>
  `;

  // کلیک روی کارت (تصویر یا عنوان)
  card.querySelectorAll('.product-link').forEach(el => {
    el.addEventListener('click', () => {
      localStorage.setItem('selectedProduct', JSON.stringify(product));
      window.location.href = 'product-detail.html';
    });
  });

  // دکمه افزودن به سبد خرید
  const btn = card.querySelector('button');
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    addToCart(product);
    showToast(`✅ «${product.title}» به سبد خرید اضافه شد`);
    updateCartCount();
  });

  return card;
}
