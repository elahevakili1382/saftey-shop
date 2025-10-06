// src/register.js
import '../css/styles.css';

// گرفتن فرم ثبت‌نام
const registerForm = document.getElementById('registerForm');

registerForm?.addEventListener('submit', async function (e) {
  e.preventDefault();

  // گرفتن مقادیر فرم
  const username = document.getElementById('username').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  // اعتبارسنجی رمز عبور
  if (password !== confirmPassword) {
    alert("رمزها یکسان نیستند!");
    return;
  }

  try {
    // ارسال داده‌ها به API (مثال)
    const response = await fetch('https://example.com/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.message || "خطایی رخ داده است");
    }

    // موفقیت ثبت‌نام
    alert('ثبت‌نام موفق بود، حالا وارد شوید.');
    window.location.href = "/login.html";

  } catch (err) {
    console.error('⛔ ثبت‌نام ناموفق:', err);
    alert(`⛔ خطا: ${err.message}`);
  }
});
