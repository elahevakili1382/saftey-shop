import { fetchProducts } from './api.js';
import '../css/styles.css';


let CATEGORIES = [];
let ALL_PRODUCTS = [];
let editingCategory = null;

const container = document.getElementById('categoriesContainer');
const searchInput = document.getElementById('searchCategoryInput');
const addBtn = document.getElementById('addCategoryBtn');
const modal = document.getElementById('categoryModal');
const cancelModal = document.getElementById('cancelModal');
const confirmAdd = document.getElementById('confirmAddCategory');
const nameInput = document.getElementById('newCategoryName');
const prodInput = document.getElementById('newCategoryProducts');
const modalTitle = document.getElementById('modalTitle');
const deleteBtn = document.getElementById('deleteCategoryBtn');

// ---------- گرفتن داده‌ها ----------
async function loadCategories() {
  const products = await fetchProducts();
  ALL_PRODUCTS = products;

  const uniqueCategories = [...new Set(products.map(p => p.category))];
  CATEGORIES = uniqueCategories.map(cat => ({
    name: cat,
    products: products.filter(p => p.category === cat).map(p => p.title)
  }));

  renderCategories(CATEGORIES);
}

// ---------- رندر کارت‌ها ----------
function renderCategories(data) {
  container.innerHTML = '';
  data.forEach(cat => {
    const card = document.createElement('div');
    card.className = 'category-card relative p-4';

    card.innerHTML = `
      <!-- دکمه ویرایش گوشه بالا -->
      <button class="absolute top-3 left-3 w-10 h-10 flex items-center justify-center bg-orange-100 hover:bg-orange-200 text-orange-600 rounded-full shadow-sm transition edit-icon" title="ویرایش">
  <i class="fa-solid fa-pen text-sm"></i>
</button>


      <!-- محتوای کارت -->
      <h3 class="text-lg font-semibold text-gray-800 mb-2 mt-6">${cat.name}</h3>
      <p class="text-sm text-gray-500">${cat.products.slice(0, 3).join(', ')}${cat.products.length > 3 ? '...' : ''}</p>
    `;

    // رویداد کلیک ویرایش
    card.querySelector('.edit-icon').addEventListener('click', () => openEditModal(cat));

    container.appendChild(card);
  });
}

// ---------- جستجو ----------
searchInput.addEventListener('input', () => {
  const q = searchInput.value.trim().toLowerCase();
  const filtered = CATEGORIES.filter(c => c.name.toLowerCase().includes(q));
  renderCategories(filtered);
});

// ---------- افزودن دسته‌بندی ----------
addBtn.addEventListener('click', () => openAddModal());
cancelModal.addEventListener('click', () => closeModal());

confirmAdd.addEventListener('click', () => {
  const name = nameInput.value.trim();
  const prods = prodInput.value.split(',').map(p => p.trim()).filter(Boolean);

  if (!name) return alert('نام دسته‌بندی الزامی است.');

  if (editingCategory) {
    // ویرایش
    editingCategory.name = name;
    editingCategory.products = prods;
    editingCategory = null;
  } else {
    // افزودن جدید
    CATEGORIES.push({ name, products: prods });
  }

  renderCategories(CATEGORIES);
  closeModal();
});

// ---------- ویرایش دسته ----------
function openEditModal(cat) {
  editingCategory = cat;
  modalTitle.textContent = `ویرایش دسته "${cat.name}"`;
  nameInput.value = cat.name;
  prodInput.value = cat.products.join(', ');
  deleteBtn.classList.remove('hidden');
  modal.classList.add('active');
}

// ---------- افزودن دسته جدید ----------
function openAddModal() {
  editingCategory = null;
  modalTitle.textContent = 'افزودن دسته‌بندی جدید';
  nameInput.value = '';
  prodInput.value = '';
  deleteBtn.classList.add('hidden');
  modal.classList.add('active');
}

// ---------- حذف دسته ----------
deleteBtn.addEventListener('click', () => {
  if (!editingCategory) return;
  if (confirm(`آیا از حذف "${editingCategory.name}" مطمئنی؟`)) {
    CATEGORIES = CATEGORIES.filter(c => c !== editingCategory);
    editingCategory = null;
    renderCategories(CATEGORIES);
    closeModal();
  }
});

// ---------- بستن مودال ----------
function closeModal() {
  modal.classList.remove('active');
  editingCategory = null;
}

// ---------- شروع ----------
loadCategories();
