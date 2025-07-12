// فایل: auth.js

function saveUser(user) {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePassword(password) {
  return password.length >= 6;
}

function showToast(msg) {
  alert(msg); // قابل جایگزینی با UI بهتر
}

// تب‌ها
const loginTab = document.getElementById("loginTab");
const registerTab = document.getElementById("registerTab");
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

loginTab.addEventListener("click", () => {
  loginTab.classList.add("text-orange-600", "font-bold", "border-b-2", "border-orange-500");
  registerTab.classList.remove("text-orange-600", "font-bold", "border-b-2", "border-orange-500");
  loginForm.classList.remove("hidden");
  registerForm.classList.add("hidden");
});

registerTab.addEventListener("click", () => {
  registerTab.classList.add("text-orange-600", "font-bold", "border-b-2", "border-orange-500");
  loginTab.classList.remove("text-orange-600", "font-bold", "border-b-2", "border-orange-500");
  registerForm.classList.remove("hidden");
  loginForm.classList.add("hidden");
});

// ثبت‌نام
registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("regName").value.trim();
  const email = document.getElementById("regEmail").value.trim();
  const password = document.getElementById("regPassword").value;

  if (!validateEmail(email)) return showToast("ایمیل معتبر نیست.");
  if (!validatePassword(password)) return showToast("رمز باید حداقل ۶ کاراکتر باشد.");

  const users = JSON.parse(localStorage.getItem("users")) || [];
  if (users.find(u => u.email === email)) return showToast("کاربری با این ایمیل وجود دارد.");

  saveUser({ name, email, password });
  showToast("ثبت‌نام موفق بود!");
  registerForm.reset();
});

// ورود
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) return showToast("اطلاعات ورود نادرست است.");

  localStorage.setItem("loggedInUser", JSON.stringify(user));
  showToast("ورود موفقیت‌آمیز بود!");
  loginForm.reset();
  // در صورت نیاز: location.href = "/dashboard.html";
});
