import '../css/styles.css';
import '../css/output.css';
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'primeicons/primeicons.css';

import { addToCart } from './storage.js';
import { createProductCard } from './productCard.js';
import { updateCartCount } from './cartCount.js';

function slugify(text) {
  return text.toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

const navItems = [
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

// رندر منوی دسکتاپ
function renderDesktopMenu() {
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
      submenu.className = 'absolute right-0 top-full hidden group-hover:flex flex-col bg-white text-base text-orange-700 shadow-md w-48 border border-orange-800 z-40';

      item.links.forEach(link => {
        const subLi = document.createElement('li');
        const a = document.createElement('a');
        a.href = link.to;
        a.className = 'block px-4 py-2 hover:bg-orange-600 hover:text-white';
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

// رندر منوی موبایل
function renderMobileMenu() {
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

function toggleMobileMenu(show) {
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

document.addEventListener('DOMContentLoaded', () => {
  renderDesktopMenu();
  renderMobileMenu();
  updateCartCount();
    loadLatestProducts();
    loadBestSellingProducts();



  document.getElementById('mobileMenuBtn')?.addEventListener('click', () => toggleMobileMenu(true));
  document.getElementById('closeMobileMenu')?.addEventListener('click', () => toggleMobileMenu(false));
  document.getElementById('mobileMenuOverlay')?.addEventListener('click', () => toggleMobileMenu(false));

  // محصولات بروز 
async function loadLatestProducts() {
  try {
    const basePath = import.meta.env.BASE_URL;
    const res = await fetch(`${basePath}data/products.json`);
    if (!res.ok) throw new Error('خطا در دریافت لیست محصولات');
    
    const allProducts = await res.json();
    const latestProducts = allProducts.slice(0, 8); // آخرین ۸ محصول

    const container = document.getElementById('latestProducts');
    if (!container) return console.warn('المنت #latestProducts پیدا نشد');

    container.innerHTML = ''; // پاک‌سازی قبلی

    latestProducts.forEach(product => {
      const card = createProductCard(product);
      container.appendChild(card);
    });

  } catch (err) {
    console.error('❌ خطا در بارگذاری محصولات بروز:', err);
  }
}

//محصولات پر فرو ش

 async function loadBestSellingProducts() {
  try {
    const basePath = import.meta.env.BASE_URL;
    const res = await fetch(`${basePath}data/products.json`);
    if (!res.ok) throw new Error('خطا در دریافت محصولات');

    const products = await res.json();

    const firstRowContainer = document.getElementById('first-row');
    const secondRowContainer = document.getElementById('second-row');

    if (!firstRowContainer || !secondRowContainer) return;

    const midpoint = Math.ceil(products.length / 2);
    const firstRowProducts = products.slice(0, midpoint);
    const secondRowProducts = products.slice(midpoint);

    function createProductCard(product) {
      const div = document.createElement('div');
      div.classList.add('swiper-slide');
      div.innerHTML = `
        <div class="bg-white shadow border p-4 text-center rounded-lg">
          <div class="aspect-square mb-4 overflow-hidden rounded-lg max-h-64 mx-auto">
            <img src="${product.image}" alt="${product.title}" class="w-full h-full object-cover" />
          </div>
          <h3 class="text-lg font-semibold mb-2">${product.title}</h3>
          <p class="text-orange-600 font-bold">${product.price.toLocaleString('fa-IR')} تومان</p>
          <div class="text-yellow-400 mt-2">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star-half-alt"></i>
          </div>
        </div>
      `;
      return div;
    }

    firstRowContainer.innerHTML = '';
    secondRowContainer.innerHTML = '';

    firstRowProducts.forEach(product => {
      firstRowContainer.appendChild(createProductCard(product));
    });

    secondRowProducts.forEach(product => {
      secondRowContainer.appendChild(createProductCard(product));
    });

    // بارگذاری آیکون های فونت آوسام
    // const faScript = document.createElement('script');
    // faScript.src = "https://kit.fontawesome.com/a076d05399.js";
    // faScript.crossOrigin = "anonymous";
    // document.head.appendChild(faScript);

    // تنظیمات swiper
    const swiperOptions = {
      slidesPerView: 3,
      spaceBetween: 24,
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        0: { slidesPerView: 1 },
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }
    };

    // باید تو HTML کلاس ها این باشن
    const swiper1 = new Swiper('.swiper1', swiperOptions);
    const swiper2 = new Swiper('.swiper2', swiperOptions);

  } catch (error) {
    console.error('خطا در بارگذاری محصولات:', error);
  }
}

//نظرات 
//نظرات 
async function loadReviews() {
  try {
    const basePath = import.meta.env.BASE_URL || '/';  // مسیر پایه پروژه
    const res = await fetch(`${basePath}data/reviews.json`);
    if (!res.ok) throw new Error('خطا در دریافت نظرات');

    const reviews = await res.json();
    const wrapper = document.getElementById('reviews-wrapper');
    if (!wrapper) return;

    wrapper.innerHTML = ''; // خالی کردن قبلی

    reviews.forEach(review => {
      const slide = document.createElement('div');
      slide.classList.add('swiper-slide', 'p-6', 'bg-white', 'rounded-lg', 'shadow-md');

      slide.innerHTML = `
        <p class="text-gray-700 mb-4">"${review.text}"</p>
        <div class="flex items-center space-x-4">
          <img src="${review.avatar}" alt="${review.name}" class="w-12 h-12 rounded-full object-cover" />
          <div>
            <h4 class="font-semibold">${review.name}</h4>
            <p class="text-sm text-gray-500">${review.date}</p>
          </div>
        </div>
      `;

      wrapper.appendChild(slide);
    });

    new Swiper('.mySwiper', {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      },
    });

  } catch (error) {
    console.error('خطا در بارگذاری نظرات:', error);
  }
}





  // بنر امکانات
  const features = [
    { icon: 'pi pi-truck', title: 'ارسال رایگان', subtitle: 'برای سفارشات بالای ۵۰۰ هزار تومان' },
    { icon: 'pi pi-cog', title: 'تضمین کیفیت', subtitle: 'تضمین بهترین کیفیت محصول' },
    { icon: 'pi pi-phone', title: 'پشتیبانی ۲۴ ساعته', subtitle: 'پشتیبانی آنلاین و تلفنی' },
    { icon: 'pi pi-thumbs-up', title: 'رضایت مشتری', subtitle: 'مشتریان راضی و بازگشت خرید' }
  ];

  const featuresContainer = document.getElementById('featuresContainer');
  if (featuresContainer) {
    featuresContainer.innerHTML = '';
    features.forEach(f => {
      const div = document.createElement('div');
      div.className = 'flex flex-col items-center p-4 text-center gap-2';

      div.innerHTML = `
        <span class="text-5xl text-orange-600"><i class="${f.icon}"></i></span>
        <h3 class="text-lg font-semibold text-orange-600">${f.title}</h3>
        <p class="text-gray-500">${f.subtitle}</p>
      `;

      featuresContainer.appendChild(div);
    });
  }

  // اسلایدر محصولات
  new Swiper('.swiper-container', {
    slidesPerView: 4,
    spaceBetween: 24,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    loop: true,
    breakpoints: {
      768: { slidesPerView: 2 },
      992: { slidesPerView: 3 },
      1200: { slidesPerView: 4 }
    }
  });
});

//جزئیات محصولات product-detail 
