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
  const response = await fetch('/saftey-shop/products.json');
  const data = await response.json();
  return data;
}
