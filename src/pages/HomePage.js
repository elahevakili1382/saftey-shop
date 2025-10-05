import { Header } from '../components/Header.js';
import { Footer } from '../components/Footer.js';
import { loadLatestProducts, loadBestSellingProducts, brands, loadReviews } from '../mainHelpers.js';

export function HomePage() {
  const app = document.getElementById('app');
  app.innerHTML = ''; // پاک کردن صفحه قبلی
  app.appendChild(Header());

  const main = document.createElement('main');
  main.innerHTML = `
    <div id="latestProducts" class="swiper-container"></div>
    <div id="first-row"></div>
    <div id="second-row"></div>
    <div id="featuresContainer" class="grid grid-cols-3 gap-4"></div>
    <div id="reviews-wrapper" class="swiper review-swiper"></div>
  `;
  app.appendChild(main);
  app.appendChild(Footer());

  loadLatestProducts();
  loadBestSellingProducts();
  brands();
  loadReviews();
}
