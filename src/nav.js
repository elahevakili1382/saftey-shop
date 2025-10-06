import { slugify } from './slugify.js';
import '../css/styles.css';

export const navItems = [
  {
    name: 'main',
    label: 'صفحه اصلی',
    to: '/'
  },
  {
    name: 'saftey',
    label: 'تجهیزات حفاظت فردی',
    links: [
      { name: 'جعبه ی کمک های اولیه', to: `/products/category/${slugify('جعبه ی کمک های اولیه')}` },
      { name: 'پوتین و کفش اداری', to: `/products/category/${slugify('پوتین و کفش اداری')}` },
      { name: 'تجهیزات عایق برق', to: `/products/category/${slugify('تجهیزات عایق برق')}` },
      { name: 'چکمه لاستیکی', to: `/products/category/${slugify('چکمه لاستیکی')}` },
      { name: 'دستکش ایمنی', to: `/products/category/${slugify('دستکش ایمنی')}` },
      { name: 'ماسک ایمنی', to: `/products/category/${slugify('ماسک ایمنی')}` },
      { name: 'گوشی صداگیر', to: `/products/category/${slugify('گوشی صداگیر')}` },
      { name: 'عینک ایمنی', to: `/products/category/${slugify('عینک ایمنی')}` },
      { name: 'کلاه ایمنی', to: `/products/category/${slugify('کلاه ایمنی')}` },
      { name: 'لباس کار', to: `/products/category/${slugify('لباس کار')}` }
    ]
  },
  {
    name: 'breath',
    label: 'تجهیزات تنفسی',
    to: `/products/category/${slugify('تجهیزات تنفسی')}`
  },
  {
    name: 'fire',
    label: 'تجهیزات آتش نشانی',
    links: [
      { name: 'لباس آتش نشانی', to: `/products/category/${slugify('لباس آتش نشانی')}` },
      { name: 'شیلنگ آتش نشانی', to: `/products/category/${slugify('شیلنگ آتش نشانی')}` },
      { name: 'کپسول آتش نشانی', to: `/products/category/${slugify('کپسول آتش نشانی')}` },
      { name: 'سیستم اعلان حریق', to: `/products/category/${slugify('سیستم اعلان حریق')}` },
      { name: 'دستکش آتش نشانی', to: `/products/category/${slugify('دستکش آتش نشانی')}` },
      { name: 'چکمه عملیاتی', to: `/products/category/${slugify('چکمه عملیاتی')}` },
      { name: 'کلاه آتش نشانی', to: `/products/category/${slugify('کلاه آتش نشانی')}` },
      { name: 'چراغ قوه', to: `/products/category/${slugify('چراغ قوه')}` },
      { name: 'گازسنج', to: `/products/category/${slugify('گازسنج')}` }
    ]
  },
  {
    name: 'trafic',
    label: 'تجهیزات ترافیکی',
    links: [
      { name: 'آیینه ترافیکی', to: `/products/category/${slugify('آیینه ترافیکی')}` },
      { name: 'سرعت گیر', to: `/products/category/${slugify('سرعت گیر')}` },
      { name: 'تابلو و علائم', to: `/products/category/${slugify('تابلو و علائم')}` },
      { name: 'مانع ترافیکی', to: `/products/category/${slugify('مانع ترافیکی')}` },
      { name: 'چراغ های ترافیکی', to: `/products/category/${slugify('چراغ های ترافیکی')}` }
    ]
  },
  {
    name: 'height',
    label: 'تجهیزات کار در ارتفاع',
    links: [
      { name: 'کلاه کار در ارتفاع', to: `/products/category/${slugify('کلاه کار در ارتفاع')}` },
      { name: 'کمربند ایمنی', to: `/products/category/${slugify('کمربند ایمنی')}` },
      { name: 'نردبان طنابی', to: `/products/category/${slugify('نردبان طنابی')}` },
      { name: 'طناب ابریشمی', to: `/products/category/${slugify('طناب ابریشمی')}` }
    ]
  },
  {
    name: 'contact',
    label: 'تماس با ما',
    to: '/contact.html'
  }
];


export function renderDesktopMenu() { 
    const navContainer = document.getElementById('navItems');
  if (!navContainer) return console.error("عنصر با id='navItems' پیدا نشد!");

  navContainer.innerHTML = '';
  navItems.forEach(item => {
    const li = document.createElement('li');
    li.className = 'relative group';

    if (item.links) {
      const span = document.createElement('span');
      span.className = 'cursor-pointer text-base text-white';
      span.textContent = item.label;

      const submenu = document.createElement('ul');
      submenu.className = 'absolute right-0 top-full hidden group-hover:flex flex-col bg-white text-base text-orange-700 shadow-lg w-48 z-40 rounded-md';

      item.links.forEach(link => {
        const subLi = document.createElement('li');
        const a = document.createElement('a');
        a.href = link.to;
        a.className = 'block px-4 py-2 hover:bg-orange-600 hover:text-white rounded-md';
        a.textContent = link.name;
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

      item.links.forEach(link => {
        const subLi = document.createElement('li');
        const a = document.createElement('a');
        a.href = link.to;
        a.className = 'text-orange-600 hover:text-black transition-colors duration-200 block';
        a.textContent = link.name;

        a.addEventListener('click', () => toggleMobileMenu(false));
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
