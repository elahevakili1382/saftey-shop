export function showToast(message = 'عملیات با موفقیت انجام شد') {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.textContent = message;
   toast.classList.remove('hidden');
  toast.classList.remove('animate-slide-fade-in');

    void toast.offsetWidth;

  toast.classList.add('animate-slide-fade-in');

  // مخفی کردن بعد از ۳ ثانیه
  setTimeout(() => {
    toast.classList.add('hidden');
  }, 3000);
}
