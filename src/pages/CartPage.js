import { Header } from '../components/Header.js';
import { Footer } from '../components/Footer.js';
import { CartTable } from '../components/CartTable.js';

export function renderCartPage() {
  const app = document.getElementById('app');
  app.innerHTML = ''; // پاک کردن محتوای قبلی
  app.appendChild(Header());
  app.appendChild(CartTable());
  app.appendChild(Footer());
}
