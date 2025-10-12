import { fetchProducts } from './api.js';
import { toToman, debounce } from './utils.js';

let PRODUCTS = [];
let filtered = [];
let currentPage = 1;
const perPage = 10;
let editingProductId = null; // فقط یک بار تعریف

// 🟢 بارگذاری محصولات
async function loadProducts() {
  PRODUCTS = await fetchProducts();
  filtered = [...PRODUCTS];
  fillFilterOptions();
  renderTable(filtered);
}

// 🟢 پر کردن جدول با داده‌ها
function renderTable(data) {
  const tbody = document.getElementById('productTableBody');
  tbody.innerHTML = '';

  const start = (currentPage - 1) * perPage;
  const end = start + perPage;
  const pageData = data.slice(start, end);

  pageData.forEach(p => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="border p-2">${p.id}</td>
      <td class="border p-2">${p.title}</td>
      <td class="border p-2">${p.category}</td>
      <td class="border p-2">${toToman(p.price)}</td>
      <td class="border p-2">${p.stock}</td>
    <td class="border p-2 flex gap-2 justify-center">
  <button class="edit-btn px-2 py-1 text-green-700" data-id="${p.id}">
    <i class="fa-solid fa-pencil"></i>
  </button>
  <button class="delete-btn px-2 py-1 text-red-500" data-id="${p.id}">
    <i class="fa-solid fa-trash"></i>
  </button>
</td>

    `;
    tbody.appendChild(tr);
  });

  renderPagination(data);
  initRowEvents();
}

// 🟢 فیلتر
function fillFilterOptions() {
  const cats = [...new Set(PRODUCTS.map(p => p.category))];
  const brands = [...new Set(PRODUCTS.map(p => p.brand))];

  const catSel = document.getElementById('filterCategory');
  const brandSel = document.getElementById('filterBrand');

  catSel.innerHTML = '<option value="">دسته‌بندی</option>';
  brandSel.innerHTML = '<option value="">برند</option>';

  cats.forEach(c => catSel.insertAdjacentHTML('beforeend', `<option>${c}</option>`));
  brands.forEach(b => brandSel.insertAdjacentHTML('beforeend', `<option>${b}</option>`));
}

// 🟢 فیلتر محصولات
function applyFilters() {
  const cat = document.getElementById('filterCategory').value;
  const brand = document.getElementById('filterBrand').value;
  const discount = document.getElementById('filterDiscount').value;
  const q = document.getElementById('searchProductInput').value.toLowerCase();

  filtered = PRODUCTS.filter(p => {
    let ok = true;
    if (cat) ok = ok && p.category === cat;
    if (brand) ok = ok && p.brand === brand;
    if (discount) {
      const d = p.discountPercentage || 0;
      if (discount === 'بدون تخفیف') ok = ok && d === 0;
      else if (discount === 'زیر ۱۰٪') ok = ok && d < 10;
      else if (discount === '۱۰ تا ۳۰٪') ok = ok && d >= 10 && d <= 30;
      else if (discount === 'بالای ۳۰٪') ok = ok && d > 30;
    }
    if (q) ok = ok && p.title.toLowerCase().includes(q);
    return ok;
  });

  currentPage = 1;
  renderTable(filtered);
}

// 🟢 مرتب‌سازی
function applySort() {
  const sortPrice = document.getElementById('sortPrice').value;
  const sortDate = document.getElementById('sortDate').value;
  const sortDiscount = document.getElementById('sortDiscount').value;
  let sorted = [...filtered];

  if (sortPrice.includes('کم')) sorted.sort((a, b) => a.price - b.price);
  else if (sortPrice.includes('زیاد')) sorted.sort((a, b) => b.price - a.price);

  if (sortDiscount.includes('کم')) sorted.sort((a, b) => (a.discountPercentage || 0) - (b.discountPercentage || 0));
  else if (sortDiscount.includes('بیش')) sorted.sort((a, b) => (b.discountPercentage || 0) - (a.discountPercentage || 0));

  if (sortDate.includes('جدید')) sorted.reverse();

  currentPage = 1;
  renderTable(sorted);
}

// 🟢 افزودن محصول جدید (modal افزودن)
function saveProduct() {
  const title = document.getElementById('productTitle').value.trim();
  const category = document.getElementById('productCategory').value.trim();
  const brand = document.getElementById('productBrand').value.trim();
  const price = parseInt(document.getElementById('productPrice').value);
  const discount = parseFloat(document.getElementById('productDiscount').value) || 0;
  const stock = parseInt(document.getElementById('productStock').value);
  const description = document.getElementById('productDescription').value.trim();

  if (!title || !category || !price) {
    alert('لطفاً فیلدهای ضروری را پر کنید.');
    return;
  }

  const newP = {
    id: PRODUCTS.length ? Math.max(...PRODUCTS.map(p => p.id)) + 1 : 1,
    title,
    category,
    brand,
    price,
    discountPercentage: discount,
    stock,
    description,
  };
  PRODUCTS.push(newP);
  filtered.push(newP);
  renderTable(filtered);
  alert('✅ محصول جدید اضافه شد.');
}

// 🟢 حذف محصول
function deleteProduct(id) {
  if (!confirm('آیا از حذف محصول مطمئن هستید؟')) return;
  PRODUCTS = PRODUCTS.filter(p => p.id !== id);
  filtered = filtered.filter(p => p.id !== id);
  renderTable(filtered);
}

// 🟢 modal ویرایش
function openEditModal(product) {
  editingProductId = product.id;
  document.getElementById('editProductTitle').value = product.title;
  document.getElementById('editProductCategory').value = product.category;
  document.getElementById('editProductBrand').value = product.brand;
  document.getElementById('editProductPrice').value = product.price;
  document.getElementById('editProductDiscount').value = product.discountPercentage || 0;
  document.getElementById('editProductStock').value = product.stock;
  document.getElementById('editProductDescription').value = product.description || '';

  document.getElementById('editProductModal').classList.remove('hidden');
}

// 🟢 ذخیره تغییرات modal ویرایش
document.getElementById('saveEditProduct').addEventListener('click', () => {
  const product = PRODUCTS.find(p => p.id === editingProductId);
  if (!product) return;

  product.title = document.getElementById('editProductTitle').value.trim();
  product.category = document.getElementById('editProductCategory').value.trim();
  product.brand = document.getElementById('editProductBrand').value.trim();
  product.price = parseInt(document.getElementById('editProductPrice').value);
  product.discountPercentage = parseFloat(document.getElementById('editProductDiscount').value) || 0;
  product.stock = parseInt(document.getElementById('editProductStock').value);
  product.description = document.getElementById('editProductDescription').value.trim();

  document.getElementById('editProductModal').classList.add('hidden');
  editingProductId = null;
  renderTable(filtered);
  alert('✅ تغییرات ذخیره شد');
});

// 🟢 بستن modal ویرایش
document.getElementById('closeEditModal').addEventListener('click', () => {
  document.getElementById('editProductModal').classList.add('hidden');
  editingProductId = null;
});

// 🟢 ایونت‌های دکمه‌ها در جدول
function initRowEvents() {
  document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      const product = PRODUCTS.find(p => p.id === id);
      if (product) openEditModal(product);
    });
  });
  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', () => deleteProduct(parseInt(btn.dataset.id)));
  });
}

// 🟢 Pagination
function renderPagination(data) {
  const totalPages = Math.ceil(data.length / perPage);
  let pagination = document.getElementById('pagination');

  if (!pagination) {
    pagination = document.createElement('div');
    pagination.id = 'pagination';
    pagination.className = 'flex justify-center mt-4 gap-2';
    const tableSection = document.querySelector('section.bg-white:last-of-type');
    tableSection.appendChild(pagination);
  }

  pagination.innerHTML = '';

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    btn.className = `px-3 py-1 rounded border ${
      i === currentPage
        ? 'bg-orange-500 text-white border-orange-500'
        : 'bg-white text-gray-700 border-gray-300 hover:bg-orange-100'
    }`;
    btn.addEventListener('click', () => {
      currentPage = i;
      renderTable(filtered);
      scrollToTableTop();
    });
    pagination.appendChild(btn);
  }
}

// 🟢 Scroll top
function scrollToTableTop() {
  const table = document.getElementById('productTableBody');
  if (table) table.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// 🟢 ایونت‌ها
function initEvents() {
  ['filterCategory', 'filterBrand', 'filterDiscount'].forEach(id =>
    document.getElementById(id).addEventListener('change', applyFilters)
  );
  ['sortPrice', 'sortDate', 'sortDiscount'].forEach(id =>
    document.getElementById(id).addEventListener('change', applySort)
  );
  document.getElementById('searchProductInput').addEventListener('input', debounce(applyFilters, 300));
  document.getElementById('addProductBtn').addEventListener('click', saveProduct);
}

// 🟢 Initialization
(async function init() {
  await loadProducts();
  initEvents();
})();
