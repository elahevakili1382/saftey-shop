// src/utils.js

// تبدیل عدد به تومان فارسی
export function toToman(num = 0) {
  if (typeof num !== 'number') num = Number(num) || 0;
  return num.toLocaleString('fa-IR') + ' تومان';
}

// تاریخ تولید‌شدهٔ ثابت براساس id (برای تست: توزیع در 365 روز گذشته)
export function seededDateFromId(id) {
  const now = new Date();
  const seed = Number(id) || Math.floor(Math.random() * 1000);
  const days = (seed * 37) % 365;
  const d = new Date(now);
  d.setDate(now.getDate() - days);
  d.setHours((seed * 13) % 24, (seed * 7) % 60, 0, 0);
  return d;
}

// تبدیل به تاریخ شمسی (با persianDate موجود در صفحه)
export function formatPersian(date) {
  try {
    return new persianDate(date).format('YYYY/MM/DD');
  } catch (e) {
    return date.toLocaleDateString();
  }
}

// debounce ساده
export function debounce(fn, wait = 300) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), wait); };
}
