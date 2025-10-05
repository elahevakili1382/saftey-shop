export function faToEnDigits(str) {
  if (typeof str !== 'string') return String(str);
  const faDigits = '۰۱۲۳۴۵۶۷۸۹';
  const enDigits = '0123456789';
  return str.replace(/[۰-۹]/g, d => enDigits[faDigits.indexOf(d)]);
}

export function updateCartCount() {
  const cartCountSpan = document.getElementById('cartCount');
  if (!cartCountSpan) return;

  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const count = cart.reduce((sum, item) => sum + Number(faToEnDigits(item.qty || '0')), 0);

  if (count > 0) {
    cartCountSpan.textContent = count;
    cartCountSpan.classList.remove('hidden');
  } else {
    cartCountSpan.classList.add('hidden');
  }
}
