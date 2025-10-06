// فایل: forgot-password.js
import '../css/styles.css';

document.getElementById("forgotForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("forgotEmail").value.trim();
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(u => u.email === email);

  const result = document.getElementById("result");

  if (!user) {
    result.textContent = "کاربری با این ایمیل پیدا نشد.";
    result.classList.replace("text-green-600", "text-red-600");
  } else {
    result.textContent = `رمز عبور شما: ${user.password}`;
    result.classList.replace("text-red-600", "text-green-600");
  }
});
