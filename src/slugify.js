// src/slugify.js
export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')           // فاصله‌ها به -
    .replace(/[^\w\-]+/g, '')       // حذف کاراکترهای غیر مجاز
    .replace(/\-\-+/g, '-')         // چند - پشت سر هم
    .replace(/^-+/, '')             // حذف - ابتدای متن
    .replace(/-+$/, '');            // حذف - انتهای متن
}
