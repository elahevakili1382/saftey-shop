import { slugify } from './slugify.js';
import '../css/styles.css';

export const navItems = [
  { name: 'main', label: 'صفحه اصلی', to: '/' },
  { name: 'saftey', label: 'تجهیزات حفاظت فردی', links: ['جعبه ی کمک های اولیه','پوتین و کفش اداری','تجهیزات عایق برق','چکمه لاستیکی','دستکش ایمنی','ماسک ایمنی','گوشی صداگیر','عینک ایمنی','کلاه ایمنی','لباس کار'] },
  { name: 'breath', label: 'تجهیزات تنفسی', links: ['تجهیزات تنفسی'] },
  { name: 'fire', label: 'تجهیزات آتش نشانی', links: ['لباس آتش نشانی','شیلنگ آتش نشانی','کپسول آتش نشانی','سیستم اعلان حریق','دستکش آتش نشانی','چکمه عملیاتی','کلاه آتش نشانی','چراغ قوه','گازسنج'] },
  { name: 'trafic', label: 'تجهیزات ترافیکی', links: ['آیینه ترافیکی','سرعت گیر','تابلو و علائم','مانع ترافیکی','چراغ های ترافیکی'] },
  { name: 'height', label: 'تجهیزات کار در ارتفاع', links: ['کلاه کار در ارتفاع','کمربند ایمنی','نردبان طنابی','طناب ابریشمی'] },
  { name: 'contact', label: 'تماس با ما', to: '/contact.html' }
];

export function renderDesktopMenu() {
  const navContainer = document.getElementById('navItems');
  if (!navContainer) return;
  navContainer.innerHTML = '';

  navItems.forEach(item => {
    const li = document.createElement('li');
    li.className = 'relative group';

    if (item.links) {
      const span = document.createElement('span');
      span.className = 'cursor-pointer text-base text-white';
      span.textContent = item.label;

      const submenu = document.createElement('ul');
      submenu.className =
        'absolute right-0 top-full hidden group-hover:flex flex-col bg-white text-base text-orange-700 shadow-lg w-48 z-40 rounded-md';

      item.links.forEach(linkName => {
        const subLi = document.createElement('li');
        const a = document.createElement('a');
        a.href = `product-category.html?category=${slugify(linkName)}`;
        a.className = 'block px-4 py-2 hover:bg-orange-600 hover:text-white rounded-md';
        a.textContent = linkName;
        subLi.appendChild(a);
        submenu.appendChild(subLi);
      });

      li.appendChild(span);
      li.appendChild(submenu);
    } else {
      const a = document.createElement('a');
      a.href = item.to || '/';
      a.className = 'cursor-pointer text-base text-white';
      a.textContent = item.label;
      li.appendChild(a);
    }

    navContainer.appendChild(li);
  });
}

export function renderMobileMenu() {
  const mobileNav = document.getElementById('mobileNavItems');
  if (!mobileNav) return;
  mobileNav.innerHTML = '';

  navItems.forEach(item => {
    const li = document.createElement('li');

    if (item.links) {
      const details = document.createElement('details');
      details.className = 'group';

      const summary = document.createElement('summary');
      summary.className = 'cursor-pointer py-4';
      summary.textContent = item.label;

      const ul = document.createElement('ul');
      ul.className = 'pl-4 mt-2 flex flex-col gap-2 text-orange-600';

      item.links.forEach(linkName => {
        const subLi = document.createElement('li');
        const a = document.createElement('a');
        a.href = `product-category.html?category=${slugify(linkName)}`;
        a.className = 'text-orange-600 hover:text-black transition-colors duration-200 block';
        a.addEventListener('click', () => toggleMobileMenu(false));
        a.textContent = linkName;
        subLi.appendChild(a);
        ul.appendChild(subLi);
      });

      details.appendChild(summary);
      details.appendChild(ul);
      li.appendChild(details);
    } else {
      const a = document.createElement('a');
      a.href = item.to;
      a.className = 'block py-2';
      a.textContent = item.label;
      a.addEventListener('click', () => toggleMobileMenu(false));
      li.appendChild(a);
    }

    mobileNav.appendChild(li);
  });
}

export function toggleMobileMenu(show) {
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
  if (!mobileMenu || !mobileMenuOverlay) return;

  if (show) {
    mobileMenu.classList.remove('translate-x-full');
    mobileMenuOverlay.classList.remove('hidden');
  } else {
    mobileMenu.classList.add('translate-x-full');
    mobileMenuOverlay.classList.add('hidden');
  }
}
