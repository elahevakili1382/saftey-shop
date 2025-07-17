export function slugify(text) {
  return text
    .toString()
    .trim()
    .normalize('NFD')
    .replace(/[\u064B-\u0652]/g, '') // حذف حرکات
    .replace(/[\u200c]/g, '-')       // ZWNJ به خط تیره
    .replace(/\s+/g, '-')            // فاصله‌ها به -
    .replace(/[؟،.،؛«»"'()]/g, '')   // علائم نگارشی
    .replace(/‌/g, '-')              // کاراکترهای خاص
    .replace(/--+/g, '-')            // خط تیره اضافه
    .toLowerCase();
}

export async function fetchProducts() {
  try {
const basePath = import.meta.env.BASE_URL || '/';
const res = await fetch(`${basePath}data/products.json`);
    if (!res.ok) throw new Error('Failed to load products');
    const products = await res.json();
    return products;
  } catch (err) {
    console.error('❌ خطا در بارگیری محصولات:', err);
    return [];
  }
}