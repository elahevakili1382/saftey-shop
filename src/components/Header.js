import { renderDesktopMenu, renderMobileMenu, toggleMobileMenu } from '../nav.js';
import { updateCartCount } from '../cartCount.js';

export function HeaderWithNav() {
  const header = document.createElement('header');

  header.innerHTML = `
    <div class="flex items-center justify-between min-h-[60px] mx-5">
      <div class="text-orange-500 text-2xl font-bold">سیفتی مارکت</div>
      <div class="hidden md:flex w-full max-w-md relative items-center">
        <input type="text" placeholder="...جست وجو" class="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"/>
        <i class="fas fa-search px-3 absolute left-3 top-1/2 -translate-y-1/2 text-black pointer-events-none"></i>
      </div>
      <div class="flex items-center gap-4 text-gray-600 text-xl">
        <a href="login.html"><i class="fas fa-user hover:text-orange-500 transition cursor-pointer" title="حساب کاربری"></i></a>
        <a href="cart.html" class="relative"><i class="fas fa-shopping-cart hover:text-orange-500 transition cursor-pointer" title="سبد خرید"></i>
        <span id="cartCount" class="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full hidden">0</span></a>
        <div class="flex flex-row-reverse md:hidden">
          <button id="mobileMenuBtn" class="text-2xl text-orange-500 focus:outline-none z-50" aria-label="باز کردن منو"><i class="fas fa-bars"></i></button>
        </div>
      </div>
    </div>
    <nav class="hidden md:block w-full py-2 bg-orange-500 my-3 px-3"><ul id="navItems" class="md:flex justify-center w-full top-full gap-8 items-center text-sm font-semibold text-white"></ul></nav>
    <div id="mobileMenuOverlay" class="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden hidden"></div>
    <aside id="mobileMenu" class="fixed top-0 right-0 h-full w-3/4 max-w-xs bg-white shadow-lg z-50 overflow-y-auto transition-transform duration-300 md:hidden translate-x-full">
      <div class="flex justify-between items-center px-4 py-4 border-b">
        <span class="font-bold text-orange-600 text-lg">منو</span>
        <button id="closeMobileMenu" aria-label="بستن"><i class="fas fa-times text-xl text-orange-600"></i></button>
      </div>
      <ul id="mobileNavItems" class="flex flex-col gap-4 text-base px-4 py-6 text-orange-800"></ul>
    </aside>
  `;

  return header;
}

// این تابع جداگانه برای نصب event ها بعد از append کردن Header به DOM
export function attachHeaderEvents() {
  renderDesktopMenu();
  renderMobileMenu();
  updateCartCount();

  document.getElementById('mobileMenuBtn').addEventListener('click', () => toggleMobileMenu(true));
  document.getElementById('closeMobileMenu').addEventListener('click', () => toggleMobileMenu(false));
  document.getElementById('mobileMenuOverlay').addEventListener('click', () => toggleMobileMenu(false));
}
