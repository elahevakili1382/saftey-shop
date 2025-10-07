import AOS from 'aos';
import 'aos/dist/aos.css';
import '../css/styles.css';

import { fetchProducts } from './common.js';
import { createProductCard } from './productCard.js';
import { updateCartCount } from './cartCount.js';
import { HeaderWithNav, attachHeaderEvents } from './components/Header.js';
import { Footer } from './components/Footer.js';
import { renderDesktopMenu, renderMobileMenu, toggleMobileMenu } from './nav.js';

AOS.init({ duration: 700, offset: 120, once: true });

document.addEventListener('DOMContentLoaded', async () => {
  // هدر و فوتر
  const headerEl = HeaderWithNav();
  document.body.prepend(headerEl);
  attachHeaderEvents();

  const footerEl = Footer();
  document.body.appendChild(footerEl);

  // منوها
  renderDesktopMenu();
  renderMobileMenu();

  document.getElementById('mobileMenuBtn')?.addEventListener('click', () => toggleMobileMenu(true));
  document.getElementById('closeMobileMenu')?.addEventListener('click', () => toggleMobileMenu(false));
  document.getElementById('mobileMenuOverlay')?.addEventListener('click', () => toggleMobileMenu(false));

  // پارامتر دسته‌بندی از URL
  const params = new URLSearchParams(window.location.search);
  const categorySlug = params.get('category') || '';

  const productListEl = document.getElementById('product-list');
  const categoryTitleEl = document.getElementById('categoryTitle');

  try {
    const products = await fetchProducts();

    if (!products || products.length === 0) {
      categoryTitleEl.textContent = 'هیچ محصولی موجود نیست';
      productListEl.innerHTML = '<p class="col-span-full text-center text-gray-500">محصولی یافت نشد.</p>';
      updateCartCount();
      return;
    }

    // فیلتر محصولات بر اساس slug
    const filtered = categorySlug
      ? products.filter(p => p.categorySlug === categorySlug)
      : products;

    categoryTitleEl.textContent = filtered.length
      ? filtered[0].categoryName
      : 'همه محصولات';

    filtered.forEach(product => {
      const card = createProductCard(product);
      productListEl.appendChild(card);
    });

    updateCartCount();
  } catch (err) {
    console.error('خطا در بارگذاری محصولات:', err);
    categoryTitleEl.textContent = 'خطا در بارگذاری محصولات';
  }
});
