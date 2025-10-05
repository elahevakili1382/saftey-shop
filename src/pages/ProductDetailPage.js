import { Header } from '../components/Header.js';
import { Footer } from '../components/Footer.js';
import { getCart, addToCart } from '../storage.js';
import { updateCartCount } from '../cartCount.js';

export function renderProductDetailPage() {
  const root = document.getElementById('root');
  if (!root) return;

  root.innerHTML = ''; // پاک کردن محتوای قبلی

  // 1️⃣ هدر
  root.appendChild(Header());

  // 2️⃣ محصول
  const productData = JSON.parse(localStorage.getItem('selectedProduct'));
  if (!productData) {
    root.innerHTML += '<p class="text-center text-red-500 mt-10">هیچ محصولی انتخاب نشده است!</p>';
    return;
  }

  const productDiv = document.createElement('div');
  productDiv.className = 'container p-4';
  productDiv.innerHTML = `
    <div class="flex flex-col md:flex-row gap-6 justify-center items-start">
      <div class="w-full md:w-[45%]">
        <img id="mainImage" src="${productData.image}" class="rounded w-full max-w-md" />
        <div class="flex gap-2 mt-2" id="thumbnails">
          <img src="${productData.image}" class="thumbnail-image w-16 h-16 rounded cursor-pointer" />
        </div>
      </div>
      <div class="grow p-4">
        <h2 class="text-3xl font-bold">${productData.title}</h2>
        <p class="text-xl text-red-500 mt-2">${(+productData.price).toLocaleString()} تومان</p>
        <input type="number" min="1" value="1" class="w-16 border rounded mt-2" />
        <button id="add-to-cart-btn" class="bg-orange-600 text-white py-2 px-4 rounded mt-2">افزودن به سبد خرید</button>
      </div>
    </div>

    <section class="mt-8">
      <h3 class="text-2xl font-bold mb-2">جزئیات محصول</h3>
      <p class="text-base text-gray-700">${productData.description || 'توضیحی موجود نیست.'}</p>
    </section>

    <section class="mt-8">
      <h3 class="text-2xl font-bold mb-4">نظرات کاربران</h3>
      <form id="commentForm" class="space-y-2 mb-4">
        <input type="text" id="username" placeholder="نام شما" class="border p-2 rounded w-full" required />
        <textarea id="commentText" placeholder="نظر شما" class="border p-2 rounded w-full" rows="3" required></textarea>
        <button class="bg-orange-500 text-white py-2 px-4 rounded">ثبت نظر</button>
      </form>
      <div id="commentList" class="space-y-2"></div>
    </section>
  `;
  root.appendChild(productDiv);

  // 3️⃣ مدیریت تصاویر کوچک
  productDiv.querySelectorAll('.thumbnail-image').forEach(img => {
    img.addEventListener('click', () => {
      productDiv.querySelector('#mainImage').src = img.src;
    });
  });

  // 4️⃣ افزودن به سبد خرید
  productDiv.querySelector('#add-to-cart-btn').addEventListener('click', () => {
    const qty = parseInt(productDiv.querySelector('input[type="number"]').value) || 1;
    const cartProduct = { ...productData, quantity: qty };

    const cart = getCart();
    const existing = cart.find(item => item.id === cartProduct.id);
    if (existing) existing.quantity += cartProduct.quantity;
    else cart.push(cartProduct);

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`✅ «${productData.title}» به سبد خرید اضافه شد`);
  });

  // 5️⃣ مدیریت کامنت‌ها
  const commentForm = productDiv.querySelector('#commentForm');
  const commentList = productDiv.querySelector('#commentList');
  const productId = productData.id;

  function loadComments() {
    commentList.innerHTML = '';
    const comments = JSON.parse(localStorage.getItem(`comments-${productId}`)) || [];
    comments.forEach(c => {
      const div = document.createElement('div');
      div.className = 'border p-2 rounded bg-gray-100';
      div.innerHTML = `<p class="font-semibold text-orange-600">${c.username}</p><p class="text-gray-700">${c.text}</p>`;
      commentList.appendChild(div);
    });
  }

  commentForm.addEventListener('submit', e => {
    e.preventDefault();
    const username = commentForm.querySelector('#username').value.trim();
    const text = commentForm.querySelector('#commentText').value.trim();
    if (!username || !text) return;

    const comments = JSON.parse(localStorage.getItem(`comments-${productId}`)) || [];
    comments.push({ username, text });
    localStorage.setItem(`comments-${productId}`, JSON.stringify(comments));

    commentForm.reset();
    loadComments();
  });

  loadComments();

  // 6️⃣ فوتر
  root.appendChild(Footer());
}

// بارگذاری صفحه
document.addEventListener('DOMContentLoaded', renderProductDetailPage);
