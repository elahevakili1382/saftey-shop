import Swiper from 'swiper';

export async function loadReviews() {
  try {
    const basePath = import.meta.env.BASE_URL || '/';
    const res = await fetch(`${basePath}data/reviews.json`);
    if (!res.ok) throw new Error('خطا در دریافت نظرات');

    const reviews = await res.json();
    const reviewsWrapper = document.getElementById('reviews-wrapper');
    if (!reviewsWrapper) return;

    reviewsWrapper.innerHTML = '';
    reviews.forEach(review => {
      const slide = document.createElement('div');
      slide.className = 'swiper-slide p-4';
      slide.innerHTML = `
        <div class="bg-white rounded-xl p-6 shadow hover:shadow-md text-center border border-gray-200">
          <img src="${review.image}" alt="${review.name}" class="w-16 h-16 rounded-full mx-auto mb-4 object-cover border-2 border-orange-400"/>
          <p class="text-gray-600 text-sm mb-3 leading-relaxed">"${review.text}"</p>
          <h4 class="text-md font-semibold text-gray-800">${review.name}</h4>
        </div>
      `;
      reviewsWrapper.appendChild(slide);
    });

    new Swiper('.review-swiper', {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 20,
      grabCursor: true,
      pagination: { el: '.swiper-pagination', clickable: true },
      navigation: { nextEl: '.reviews-swiper-nex', prevEl: '.reviews-swiper-pre' },
      autoplay: { delay: 2000, disableOnInteraction: false },
      breakpoints: { 640: { slidesPerView: 1.5 }, 768: { slidesPerView: 2 }, 1024: { slidesPerView: 2.5 } },
    });

  } catch (err) {
    console.error('❌ خطا در بارگذاری نظرات:', err);
  }
}
