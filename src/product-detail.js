import { fetchProducts } from './common.js'; 
import { addToCart } from './storage.js';
// یک محصول فرضی ثابت برای تست
const product = {
  slug: 'mask-3m-6200',
  title: 'ماسک ایمنی 2 فیلتر نیم صورت 6200',
  price: '2,300,000',
  category: 'تجهیزات حفاظت فردی',
  subcategory: 'ماسک ایمنی',
  mainImage: '/saftey-shop/images/mask/6200-1.avif',
  gallery: [
    '/saftey-shop/images/mask/6200-1.avif',
    '/saftey-shop/images/mask/6200-3m-2.avif',
    '/saftey-shop/images/mask/6200-3m-3.avif',
    '/saftey-shop/images/mask/6200-3m-4.avif',
  ],
  sizes: ['کوچک', 'متوسط', 'بزرگ'],
  description: 'صنایع پیشنهادی شامل ساخت و ساز، تولید عمومی، زیرساخت‌های سنگین...'
};

function loadProduct() {
  const section = document.getElementById('productdetail');
  section.style.display = 'flex';

  document.getElementById('MainImg').src = product.mainImage;
  document.getElementById('MainImg').alt = product.title;

  document.getElementById('category').textContent = `${product.category} / ${product.subcategory}`;
  document.getElementById('title').textContent = product.title;
  document.getElementById('price').textContent = product.price + ' تومان';
  document.getElementById('description').textContent = product.description;

  const sizeSelect = document.getElementById('sizeSelect');
  sizeSelect.innerHTML = '<option disabled selected>انتخاب سایز</option>';
  product.sizes.forEach(size => {
    const option = document.createElement('option');
    option.value = size;
    option.textContent = size;
    sizeSelect.appendChild(option);
  });

  const gallery = document.getElementById('gallery');
  gallery.innerHTML = '';
  product.gallery.forEach(img => {
    const div = document.createElement('div');
    div.className = 'cursor-pointer';

    const image = document.createElement('img');
    image.src = img;
    image.alt = product.title;
    image.className = 'w-16 h-16 rounded-md hover:scale-110 transition-transform duration-200';

    div.appendChild(image);
    gallery.appendChild(div);

    div.addEventListener('click', () => {
      document.getElementById('MainImg').src = img;
    });
  });

  // دکمه افزودن به سبد خرید
  const quantityInput = document.getElementById('quantityInput');
  const addToCartBtn = document.getElementById('addToCartBtn');

  addToCartBtn.onclick = () => {
    const selectedSize = sizeSelect.value;
    const quantity = parseInt(quantityInput.value, 10);
    if (!selectedSize) {
      alert('لطفا سایز را انتخاب کنید');
      return;
    }
    if (quantity < 1 || isNaN(quantity)) {
      alert('لطفا تعداد معتبر وارد کنید');
      return;
    }

    alert(`محصول ${product.title} به تعداد ${quantity} و سایز ${selectedSize} به سبد خرید اضافه شد!`);
    // اینجا می‌تونی کد اضافه کردن به سبد خرید رو بذاری
  };
}

document.addEventListener('DOMContentLoaded', loadProduct);
