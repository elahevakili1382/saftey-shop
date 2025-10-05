import Swiper from 'swiper';

export function initBrands() {
  const container = document.getElementById('brands-wrapper');
  if (!container) return;

  // آرایه برندها
  const brands = [
    { name: '3M', image: '/images/brands/3m.png' },
    { name: 'CT', image: '/images/brands/ct.png' },
    { name: 'Petzl', image: '/images/brands/250px-Logo_petzl.png' },
    { name: 'CanaSafe', image: '/images/brands/canasafe-min.png' },
    { name: 'Clan', image: '/images/brands/clan.jpg' },
    { name: 'Drager', image: '/images/brands/drager.png' },
    { name: 'Hellberg', image: '/images/brands/hellberg.png' },
    { name: 'North', image: '/images/brands/north.png' },
    { name: 'Uvex', image: '/images/brands/uvex.png' },
    { name: 'Peltor', image: '/images/brands/images.png' },
  ];

  // پاکسازی قبلی
  container.innerHTML = '';

  // ساخت اسلایدها
  brands.forEach(brand => {
    const slide = document.createElement('div');
    slide.className = 'swiper-slide flex justify-center items-center';
    slide.innerHTML = `
      <img src="${brand.image}" alt="${brand.name}" class="w-24 h-24 object-contain" title="${brand.name}" />
    `;
    container.appendChild(slide);
  });

  // فعال‌سازی Swiper بعد از ایجاد برندها
  new Swiper('.brandSwiper', {
    loop: true,
    slidesPerView: 2,
    spaceBetween: 20,
    breakpoints: {
      640: { slidesPerView: 3 },
      768: { slidesPerView: 4 },
      1024: { slidesPerView: 5 },
    },
    autoplay: { delay: 2500, disableOnInteraction: false },
    navigation: {
      nextEl: '.brand-swiper-nex',
      prevEl: '.brand-swiper-pre',
    },
  });
}
