import '../css/styles.css';
import '../css/output.css';


// داده‌های منو
const navItems = [
  { name: 'main', label: 'صفحه اصلی', to: '/' },
  {
    name: 'safety',
    label: 'تجهیزات حفاظت فردی',
    links: [
      'جعبه کمک‌های اولیه',
      'پوتین و کفش اداری',
      'ماسک ایمنی',
      'کلاه ایمنی',
    ],
  },
  {
    name: 'breath',
    label: 'تجهیزات تنفسی',
    to: '/products/category/تجهیزات-تنفسی',
  },
  {
    name: 'contact',
    label: 'تماس با ما',
    to: '/contact',
  },
];

// ابزار تبدیل به slug
const slugify = str =>
  str.trim().replace(/\s+/g, '-').replace(/[^\w\-آ-ی]/g, '');

// پر کردن منوی دسکتاپ
const desktopMenu = document.getElementById('desktopMenu');
const mobileMenuList = document.getElementById('mobileMenuList');

navItems.forEach(item => {
  const li = document.createElement('li');
  li.className = 'relative group';

  if (item.links) {
    li.innerHTML = `
      <span class="cursor-pointer text-base text-white">${item.label}</span>
      <ul class="absolute right-0 mt-2 hidden group-hover:flex flex-col bg-white text-orange-700 shadow-md w-48 border z-40">
        ${item.links
          .map(
            link => `
          <li>
            <a href="/products/category/${slugify(link)}" class="block px-4 py-2 hover:bg-orange-600 hover:text-white">
              ${link}
            </a>
          </li>`
          )
          .join('')}
      </ul>`;
  } else {
    li.innerHTML = `<a href="${item.to}" class="cursor-pointer text-base text-white">${item.label}</a>`;
  }

  desktopMenu.appendChild(li);
});

// پر کردن منوی موبایل
navItems.forEach(item => {
  const li = document.createElement('li');

  if (item.links) {
    li.innerHTML = `
      <details>
        <summary class="cursor-pointer py-2">${item.label}</summary>
        <ul class="pl-4 mt-2 flex flex-col gap-2 text-orange-600">
          ${item.links
            .map(
              link => `
            <li>
              <a href="/products/category/${slugify(link)}" class="hover:text-black">${link}</a>
            </li>`
            )
            .join('')}
        </ul>
      </details>`;
  } else {
    li.innerHTML = `<a href="${item.to}" class="block py-2">${item.label}</a>`;
  }

  mobileMenuList.appendChild(li);
});

// منوی موبایل
const openBtn = document.getElementById('mobileMenuBtn');
const closeBtn = document.getElementById('closeMobileMenu');
const mobileMenu = document.getElementById('mobileMenu');
const overlay = document.getElementById('mobileOverlay');

openBtn?.addEventListener('click', () => {
  mobileMenu.classList.remove('translate-x-full');
  overlay.classList.remove('hidden');
});

closeBtn?.addEventListener('click', () => {
  mobileMenu.classList.add('translate-x-full');
  overlay.classList.add('hidden');
});

overlay?.addEventListener('click', () => {
  closeBtn.click();
});

// سبد خرید نمونه
const cartCount = document.getElementById('cartCount');
const count = 3; // نمونه دیتا
if (count > 0) {
  cartCount.textContent = count;
  cartCount.classList.remove('hidden');
}
