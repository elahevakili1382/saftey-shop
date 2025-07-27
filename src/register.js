document.getElementById('registerForm')?.addEventListener('submit', async function (e) {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  if (password !== confirmPassword) {
    alert("رمزها یکسان نیستند!");
    return;
  }

  try {
    const response = await fetch('https://example.com/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    });

    if (!response.ok){
        const errData = await res.json();
        throw new Error(errData.message || "خطایی رخ داده است ");
    }
        

    const data = await response.json();
    alert('ثبت‌نام موفق بود، حالا وارد شوید.');
    window.location.href = "/login.html";
  } catch (err) {
console.error('⛔ ثبت‌نام ناموفق:', err);
    alert(`⛔ خطا: ${err.message}`);  }
});
