import AOS from 'aos';
import 'aos/dist/aos.css';

import { updateCartCount } from './cartCount.js';
import { renderDesktopMenu, renderMobileMenu, toggleMobileMenu } from './nav.js';
import { loadLatestProducts, loadBestSellingProducts } from './products.js';
import { loadReviews } from './reviews.js';
import { initBrands } from './brands.js';
import { renderFeatures } from './features.js';
import { HeaderWithNav, attachHeaderEvents } from './components/Header.js';
import { Footer } from './components/Footer.js';

AOS.init({ duration: 700, offset: 120, once: true });

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
 const headerEl = HeaderWithNav();
  document.body.prepend(headerEl);
  attachHeaderEvents();
    const footerEl = Footer();
  document.body.appendChild(footerEl); // ← اضافه کردن به DOM

  renderDesktopMenu();
  renderMobileMenu();

  document.getElementById('mobileMenuBtn')?.addEventListener('click', () => toggleMobileMenu(true));
  document.getElementById('closeMobileMenu')?.addEventListener('click', () => toggleMobileMenu(false));
  document.getElementById('mobileMenuOverlay')?.addEventListener('click', () => toggleMobileMenu(false));

  loadLatestProducts();
  loadBestSellingProducts();
  loadReviews();
  initBrands();
  renderFeatures();


  
    updateCartCount();

});
