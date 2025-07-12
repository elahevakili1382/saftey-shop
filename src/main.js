import '../css/styles.css';
import '../css/output.css';
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';
import 'primeicons/primeicons.css';
import { addToCart } from './storage.js';



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
        to: '/contact'
      }
    ];

    // تابع slugify مشابه نسخه Vue
    function slugify(text) {
      return text
        .toString()
        .normalize('NFD') // حذف نشانه‌ها
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/\s+/g, '-') // فاصله‌ها به خط تیره
        .replace(/[^\w\-]+/g, '') // حذف کاراکترهای خاص
        .replace(/\-\-+/g, '-') // چند خط تیره پشت هم
        .replace(/^-+/, '') // خط تیره اول
        .replace(/-+$/, ''); // خط تیره آخر
    }

    // رندر منوی دسکتاپ
    function renderDesktopMenu() {
      const navContainer = document.getElementById('navItems');
      navContainer.innerHTML = '';

      navItems.forEach(item => {
        const li = document.createElement('li');
        li.className = 'relative group';

        if(item.links) {
          const span = document.createElement('span');
          span.className = 'cursor-pointer text-base text-white';
          span.textContent = item.label;

          const submenu = document.createElement('ul');
          submenu.className = 'absolute right-0 mt-2 my-0 hidden group-hover:flex flex-col bg-white text-base text-orange-700 shadow-md w-48 border border-orange-800 z-40';

          item.links.forEach(link => {
            const subLi = document.createElement('li');
            const a = document.createElement('a');
            a.href = link.to;
            a.textContent = link.name;
            a.className = 'block px-4 py-2 hover:bg-orange-600 hover:text-white';
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
      mobileNav.innerHTML = '';

      navItems.forEach(item => {
        const li = document.createElement('li');

        if(item.links) {
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

            // بستن منو هنگام کلیک روی لینک موبایل
            a.addEventListener('click', () => {
              toggleMobileMenu(false);
            });

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

          a.addEventListener('click', () => {
            toggleMobileMenu(false);
          });

          li.appendChild(a);
        }

        mobileNav.appendChild(li);
      });
    }

    // مدیریت منوی موبایل
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const closeMobileMenuBtn = document.getElementById('closeMobileMenu');

    function toggleMobileMenu(show) {
      if(show === undefined) {
        show = mobileMenu.classList.contains('translate-x-full'); // اگر بسته است، باز کن
      }

      if(show) {
        mobileMenu.classList.remove('translate-x-full');
        mobileMenuOverlay.classList.remove('hidden');
      } else {
        mobileMenu.classList.add('translate-x-full');
        mobileMenuOverlay.classList.add('hidden');
      }
    }

    mobileMenuBtn.addEventListener('click', () => toggleMobileMenu(true));
    closeMobileMenuBtn.addEventListener('click', () => toggleMobileMenu(false));
    mobileMenuOverlay.addEventListener('click', () => toggleMobileMenu(false));

    // در صورت نیاز، مقدار سبد خرید را نمایش بده (مثلا از لوکال استوریج یا داده تستی)
    const cartCountSpan = document.getElementById('cartCount');
    let cartCount = 3; // فرضی، باید از منبع داده واقعی بیاد
    if(cartCount > 0) {
      cartCountSpan.textContent = cartCount;
      cartCountSpan.classList.remove('hidden');
    }

    // اجرا در ابتدا
    renderDesktopMenu();
    renderMobileMenu();

  // swiper js 
   document.addEventListener('DOMContentLoaded', () => {
    new Swiper('.swiper', {
      loop: false,
      autoplay: {
        delay: 5000,
      },
    });
  });

  // feature banner
   const features = [
      {
        icon: 'pi pi-truck',
        title: 'ارسال رایگان',
        subtitle: 'برای سفارشات بالای ۵۰۰ هزار تومان',
      },
      {
        icon: 'pi pi-lock',
        title: 'پرداخت امن',
        subtitle: 'با درگاه‌های معتبر بانکی',
      },
      {
        icon: 'pi pi-headphones',
        title: 'پشتیبانی ۲۴ ساعته',
        subtitle: 'در هفت روز هفته',
      },
      {
        icon: 'pi pi-tag',
        title: 'تضمین قیمت',
        subtitle: 'بهترین قیمت بازار',
      },
    ];

    const container = document.getElementById('features');

    features.forEach((feature) => {
      const div = document.createElement('div');
      div.className = 'flex flex-col items-center text-center space-y-2 px-2 sm:px-4';

      div.innerHTML = `
        <i class="${feature.icon} text-orange-500 text-4xl sm:text-3xl md:text-4xl"></i>
        <div>
          <h3 class="text-base sm:text-lg md:text-xl font-semibold">${feature.title}</h3>
          <p class="text-xs sm:text-sm text-gray-600">${feature.subtitle}</p>
        </div>
      `;

      container.appendChild(div);
    });


    // محصولات بروز 
  fetch(import.meta.env.BASE_URL + 'data/products.json')
  .then((res) => res.json())
  .then((products) => {
    const grid = document.getElementById('product-grid');

    products.forEach((product) => {
      const card = document.createElement('div');
      card.className =
        `bg-white w-full max-w-[300px] sm:max-w-full min-h-[460px] flex flex-col justify-between mx-auto rounded-xl shadow-md
         hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer group border border-orange-400
         hover:border-orange-600`;

      card.innerHTML = `
        <div class="overflow-hidden rounded-t-xl ">
          <img src="${product.image}" alt="${product.title}"
             class="w-full h-[240px] sm:h-[260px] md:h-[280px] lg:h-[300px] object-contain rounded-t-xl transform group-hover:scale-105 transition duration-300">
        </div>

        <div class="flex justify-between items-center px-5 py-4 mt-auto">
          <div class="text-right">
            <h3 class="text-sm sm:text-base font-semibold mb-1 truncate" title="${product.title}">
              ${product.title}
            </h3>
            <p class="text-orange-600 text-lg ">${product.price.toLocaleString()} تومان</p>
          </div>
          <button
            class=" text-2xl bg-orange-600 text-white p-2 rounded-full shadow-lg hover:bg-orange-700 transition-colors duration-300
            focus:outline-none focus:ring-2 focus:ring-orange-500 flex items-center justify-center"
            aria-label="افزودن به سبد خرید"
            data-id="${product.id}"
            title="افزودن به سبد خرید"
          >
            <i class="pi pi-shopping-cart"></i>
          </button>
        </div>
      `;

      grid.appendChild(card);
    });

   grid.addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-id]');
  if (btn) {
    const productId = btn.dataset.id;
    const product = products.find((p) => p.id == productId);

    btn.classList.add('animate-pulse');
    setTimeout(() => btn.classList.remove('animate-pulse'), 500);

    // ✅ اضافه کردن به سبد خرید
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      description: product.description || '', // اگر خواستی
      quantity: 1,
    });
    // نمایش پیغام دلخواه
    alert(`✅ ${product.title} به سبد خرید اضافه شد`);
  }
});

  })
  .catch((err) => console.error('خطا در دریافت محصولات:', err));
// خبرنامه 

  const form = document.getElementById('newsletterForm');
  const emailInput = document.getElementById('emailInput');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    alert(`ایمیل شما به موفقیت ثبت شد: ${emailInput.value}`);
    emailInput.value = '';
  });

  // محصولات پر فروش 

  const firstRow = document.getElementById("first-row");
  const secondRow = document.getElementById("second-row");

  fetch(import.meta.env.BASE_URL + 'data/products.json')
  .then(res => res.json())
  .then(products =>{
    const half = Math.ceil(products.length / 2);
    const first = products.slice(0, half);
    const second = products.slice(half);


    const createSlide = (item) => `
    <div  class="swiper-slide">
    <div class="bg-white shadow border p-4 text-center">
    <div class="aspect-square mb-4 overflow-hidden rounded-lg max-h-64 mx-auto">
    <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover" />
    </div>

    <h3 class="text-lg font-semibold mb-2">${item.title}</h3>
    <p class="text-orange-600">${item.price.toLocaleString()}</p>
    
    </div>
    
    </div>
    
    `;

    firstRow.innerHTML = first.map(createSlide).join("");
    secondRow.innerHTML = second.map(createSlide).join("");

    // Initialize both swipers
        document.querySelectorAll('.mySwiper').forEach(swiperEl => {
          new Swiper(swiperEl, {
            slidesPerView: 1,
            spaceBetween: 24,
            loop: true,
            pagination: {
              el: swiperEl.querySelector('.swiper-pagination'),
              clickable: true,
            },
            breakpoints: {
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            },
          });
        });
    

  })
.catch(err => console.error("❌ خطا در دریافت محصولات:", err));


    // نظرات کاربران 
    const reviews = [
      {
        name: 'جان دو',
        image: 'images/client1.jpg',
        text: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.'
      },
      {
        name: 'سارا رضایی',
        image: 'images/client2.jpg',
        text: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و گرافیک. با ابزارهای گرافیکی کاربردی.'
      },
      {
        name: 'علیرضا امیدی',
        image: 'images/client3.jpg',
        text: 'از نرم‌افزارهای طراحی گرافیک استفاده می‌شود. کاربردهای زیادی دارد برای صفحات وب و اپلیکیشن‌ها.'
      },
      {
        name: 'مریم احمدی',
        image: 'images/client4.jpg',
        text: 'لورم ایپسوم به عنوان متن پیش‌فرض در طراحی مورد استفاده قرار می‌گیرد و خوانایی خوبی دارد.'
      },
      {
        name: 'امیر غلامی',
        image: 'images/client5.jpg',
        text: 'این متن نمایشی است و هدف آن صرفاً پر کردن فضا جهت بررسی طراحی می‌باشد.'
      }
    ];

    const wrapper = document.getElementById("reviews-wrapper");

    const slideTemplate = (review) => `

       <div class="swiper-slide bg-white rounded-xl shadow border p-6 text-center max-w-xl mx-auto">
        <img src="${review.image}" alt="${review.name}" class="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-orange-200" />
        <h3 class="text-lg font-bold mb-2">${review.name}</h3>
        <p class="text-gray-600 mb-4 text-sm leading-relaxed">${review.text}</p>
        </div>
    `;

    wrapper.innerHTML = reviews.map(slideTemplate).join('');

    new Swiper(".mySwiper", {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true
      },
      breakpoints: {
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 }
      }
    });


    // login js

    //     const loginTab = document.getElementById('loginTab');
    // const registerTab = document.getElementById('registerTab');
    // const loginForm = document.getElementById('loginForm');
    // const registerForm = document.getElementById('registerForm');

    // loginTab.addEventListener('click', () => {
    //   loginForm.classList.remove('hidden');
    //   registerForm.classList.add('hidden');
    //   loginTab.classList.add('text-orange-600', 'font-bold', 'border-b-2', 'border-orange-500');
    //   registerTab.classList.remove('text-orange-600', 'font-bold', 'border-b-2', 'border-orange-500');
    //   registerTab.classList.add('text-gray-500');
    // });

    // registerTab.addEventListener('click', () => {
    //   loginForm.classList.add('hidden');
    //   registerForm.classList.remove('hidden');
    //   registerTab.classList.add('text-orange-600', 'font-bold', 'border-b-2', 'border-orange-500');
    //   loginTab.classList.remove('text-orange-600', 'font-bold', 'border-b-2', 'border-orange-500');
    //   loginTab.classList.add('text-gray-500');
    // });

    // // برای دمو فقط
    // loginForm.addEventListener('submit', e => {
    //   e.preventDefault();
    //   alert('ورود با موفقیت!');
    // });

    // registerForm.addEventListener('submit', e => {
    //   e.preventDefault();
    //   alert('ثبت‌نام انجام شد!');
    // });