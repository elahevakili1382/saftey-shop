import { HomePage } from './pages/HomePage.js';
import { CartPage } from './pages/cartPage.js';
import { ProductDetailPage } from './pages/ProductDetailPage.js';

const routes = {
  '/': HomePage,
  '/cart.html': CartPage,
  '/product-detail.html': ProductDetailPage
};

export function router() {
  const path = window.location.pathname;
  const page = routes[path] || HomePage;
  page();
}

window.addEventListener('DOMContentLoaded', router);
window.addEventListener('popstate', router);
