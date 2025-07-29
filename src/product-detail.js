import { addToCart, getCart } from './storage.js';
import { updateCartCount } from './cartCount.js';
import { comment } from 'postcss';

document.addEventListener('DOMContentLoaded', () => {
  const commentForm = document.getElementById('.commentForm');
  const commentList = document.getElementById('.commentList');
  const productId = JSON.parse(localStorage.getItem('selectedProduct'))?.id;
  const productData = localStorage.getItem('selectedProduct');
  if (!productData) return;

  const product = JSON.parse(productData);

  // نمایش اطلاعات محصول در صفحه
  document.getElementById('productTitle').textContent = product.title;
  document.getElementById('productPrice').textContent = `${(+product.price).toLocaleString()} تومان`;
  document.getElementById('mainImage').src = product.image;

  // تغییر تصویر اصلی با کلیک روی تصاویر کوچک
  document.querySelectorAll('.thumbnail-image').forEach(thumbnail => {
    thumbnail.addEventListener('click', () => {
      document.getElementById('mainImage').src = thumbnail.src;
    });
  });

  // افزودن به سبد خرید
  document.getElementById('add-to-cart-btn').addEventListener('click', () => {
    const quantity = parseInt(document.querySelector('input[type="number"]').value) || 1;

    const cartProduct = {
      id: product.id,
      title: product.title,
      price: +product.price,
      image: product.image,
      quantity,
    };

    const cart = getCart();
    const existingItem = cart.find(item => item.id === cartProduct.id);

    if (existingItem) {
      existingItem.quantity += cartProduct.quantity;
    } else {
      cart.push(cartProduct);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();

    alert(`✅ «${product.title}» به سبد خرید اضافه شد`);
  });

  function loadComments(){
    const comments = JSON.parse(localStorage.getItem(`comments-${productId}`)) || [ ];

    comments.forEach(comment =>{
      const commentEl = document.createElement('div');
         commentEl.className = 'bg-gray-100 p-3 rounded shadow-sm';
      commentEl.innerHTML = `
        <p class="font-semibold text-sm text-orange-600">${comment.username}</p>
        <p class="text-sm mt-1 text-gray-700">${comment.text}</p>
      `;

      commentList.appendChild(commentEl);
    });
  }

  commentForm.addEventListener('submit', (e) =>{
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const commentText = document.getElementById('commentText').value.trim();

    if(!username || !commentText) return;

    const newComment = {username, text:commentText};

    const existingComments = JSON.parse(localStorage.getItem(`comments-${productId}`)) || [];
    existingComments.push(newComment);

    localStorage.setItem(`comments-${productId}`, JSON.stringify(existingComments));

    commentForm.reset();
    loadComments()

  });

  loadComments();

});
