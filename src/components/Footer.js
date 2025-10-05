export function Footer() {
  const footer = document.createElement('footer');
  footer.innerHTML = `
      <div class="bg-gray-100 text-gray-800 py-10 px-4"   data-aos="fade-up"
     data-aos-delay="500"
     data-aos-duration="800">
    <div class="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
      
      <!-- موقعیت مکانی -->
      <div>
        <h3 class="text-xl font-bold mb-4">موقعیت مکانی</h3>
        <a href="#" class="flex items-center gap-2 text-sm hover:text-orange-500">
          <i class="fas fa-map-marker-alt"></i>
          ایران، تهران، میدان حسن‌آباد، خیابان امام خمینی
        </a>
      </div>

      <!-- دسترسی سریع -->
      <div>
        <h3 class="text-xl font-bold mb-4">دسترسی سریع</h3>
        <ul class="space-y-2 text-sm">
          <li><a href="#" class="flex items-center gap-2 hover:text-orange-500"><i class="fas fa-arrow-left"></i> خانه</a></li>
          <li><a href="#" class="flex items-center gap-2 hover:text-orange-500"><i class="fas fa-arrow-left"></i> محصولات بروز</a></li>
          <li><a href="#" class="flex items-center gap-2 hover:text-orange-500"><i class="fas fa-arrow-left"></i> کلاه ایمنی</a></li>
          <li><a href="#" class="flex items-center gap-2 hover:text-orange-500"><i class="fas fa-arrow-left"></i> نظرات کاربران</a></li>
        </ul>
      </div>

      <!-- لینک خارجی -->
      <div>
        <h3 class="text-xl font-bold mb-4">لینک خارجی</h3>
        <ul class="space-y-2 text-sm">
          <li><a href="#" class="flex items-center gap-2 hover:text-orange-500"><i class="fas fa-arrow-left"></i> اطلاعات تماس</a></li>
          <li><a href="#" class="flex items-center gap-2 hover:text-orange-500"><i class="fas fa-arrow-left"></i> سفارش‌ها</a></li>
          <li><a href="#" class="flex items-center gap-2 hover:text-orange-500"><i class="fas fa-arrow-left"></i> حفظ حریم خصوصی</a></li>
          <li><a href="#" class="flex items-center gap-2 hover:text-orange-500"><i class="fas fa-arrow-left"></i> روش‌های پرداخت</a></li>
          <li><a href="#" class="flex items-center gap-2 hover:text-orange-500"><i class="fas fa-arrow-left"></i> خدمات ما</a></li>
        </ul>
      </div>

      <!-- اطلاعات تماس -->
      <div>
        <h3 class="text-xl font-bold mb-4">اطلاعات تماس</h3>
        <ul class="space-y-2 text-sm">
          <li><a href="tel:09368305628" class="flex items-center gap-2 hover:text-orange-500"><i class="fas fa-phone"></i> </a></li>
          <li><a href="tel:09106419678" class="flex items-center gap-2 hover:text-orange-500"><i class="fas fa-phone"></i> 0910XXXXXX</a></li>
          <li><a href="mailto:elahevakili8@gmail.com" class="flex items-center gap-2 hover:text-orange-500"><i class="fas fa-envelope"></i> mahdi.namvar3344@gmail.com</a></li>
        </ul>
      </div>

      <div>
        <h3 class="text-xl font-bold mb-4">نماد های اعتماد </h3>
      </div>
    </div>

    <!-- آیکون شبکه‌های اجتماعی -->
    <div class="flex justify-center gap-4 mt-8 text-xl">
      <a href="#" class="hover:text-orange-500"><i class="fab fa-instagram"></i></a>
      <a href="#" class="hover:text-orange-500"><i class="fab fa-telegram"></i></a>
      <a href="#" class="hover:text-orange-500"><i class="fab fa-whatsapp"></i></a>
      <a href="#" class="hover:text-orange-500"><i class="fab fa-linkedin"></i></a>
    </div>

    <!-- اعتبار -->
    <div class="text-center mt-6 text-sm text-gray-500">
      ساخته شده توسط <span class="text-orange-500 font-semibold">Elahe Vakili</span> | تمامی حقوق محفوظ است
    </div>
  </div>
  `;
  return footer;
}
