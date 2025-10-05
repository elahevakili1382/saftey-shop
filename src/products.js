import { createProductCard } from './productCard.js';
import { addToCart } from './storage.js';
import { updateCartCount } from './cartCount.js';
import { showToast } from './toast.js';
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

Swiper.use([Navigation, Pagination, Autoplay]);


// ------------------- محصولات جدید -------------------
export async function loadLatestProducts() {
  try {
    const basePath = import.meta.env.BASE_URL || '/';
    const res = await fetch(`${basePath}data/products.json`);
    if (!res.ok) throw new Error('خطا در دریافت لیست محصولات');

    const allProducts = await res.json();
    const latestProducts = allProducts.slice(0, 8); // ۸ محصول اول

    const container = document.getElementById('latestProducts');
    if (!container) return;

    container.innerHTML = '';

    latestProducts.forEach(product => {
      const card = createProductCard(product, {
        onAddToCart: (prod) => {
          addToCart(prod);
          updateCartCount();
          showToast('✅ محصول با موفقیت به سبد خرید اضافه شد');
        }
      });
      container.appendChild(card);
    });

  } catch (err) {
    console.error('❌ خطا در بارگذاری محصولات بروز:', err);
  }
}

// ------------------- محصولات پرفروش -------------------
export async function loadBestSellingProducts() {
  try {
    const basePath = import.meta.env.BASE_URL || '/';
    const res = await fetch(`${basePath}data/products.json`);
    if (!res.ok) throw new Error('خطا در دریافت محصولات');

    const products = await res.json();
    const firstRowContainer = document.getElementById('first-row');
    const secondRowContainer = document.getElementById('second-row');
    if (!firstRowContainer || !secondRowContainer) return;

    const midpoint = Math.ceil(products.length / 2);
    const firstRowProducts = products.slice(0, midpoint);
    const secondRowProducts = products.slice(midpoint);

    firstRowContainer.innerHTML = '';
    secondRowContainer.innerHTML = '';

    firstRowProducts.forEach(product => {
      const card = createProductCard(product, {
        onAddToCart: (prod) => {
          addToCart(prod);
          updateCartCount();
          showToast('✅ محصول با موفقیت به سبد خرید اضافه شد');
        }
      });
      firstRowContainer.appendChild(card);
    });

    secondRowProducts.forEach(product => {
      const card = createProductCard(product, {
        onAddToCart: (prod) => {
          addToCart(prod);
          updateCartCount();
          showToast('✅ محصول با موفقیت به سبد خرید اضافه شد');
        }
      });
      secondRowContainer.appendChild(card);
    });

    // مقداردهی Swiper ها
   const swiperOptions = {
  modules: [Navigation, Pagination, Autoplay],
  loop: false,
  slidesPerView: 3,
  spaceBetween: 24,
  navigation: {
    nextEl: '.brand-swiper-next, .brand-swiper-nex',
    prevEl: '.brand-swiper-prev, .brand-swiper-pre',
  },
  autoplay: { delay: 2000, disableOnInteraction: false },
  breakpoints: {
    0: { slidesPerView: 1.5, spaceBetween: 16 },
    480: { slidesPerView: 2, spaceBetween: 16 },
    768: { slidesPerView: 2.5, spaceBetween: 20 },
    1024: { slidesPerView: 3, spaceBetween: 24 },
  },
};


    new Swiper('.swiper1', swiperOptions);
    new Swiper('.swiper2', swiperOptions);

  } catch (err) {
    console.error('❌ خطا در بارگذاری محصولات پر فروش:', err);
  }
}
