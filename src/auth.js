import '../css/styles.css';

document.getElementById('loginForm')?.addEventListener('submit', async function (e) {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  if (!username || !email || !password) {
    alert('لطفاً تمام فیلدها را پر کنید.');
    return;
  }

  try {
    const response = await fetch('https://example.com/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, email, password })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'ورود ناموفق بود');
    }

    const data = await response.json();

    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));

    alert('✅ ورود موفقیت‌آمیز بود');
    window.location.href = '/dashboard.html'; // مسیر پنل کاربری

  } catch (err) {
    console.error('❌ خطا:', err.message);
    alert(err.message || 'مشکلی در ورود به وجود آمده است.');
  }
});
