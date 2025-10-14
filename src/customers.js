import { fetchUsers } from './api.js';
import { toToman, seededDateFromId, formatPersian, debounce } from './utils.js';

let USERS = [];
let filteredUsers = [];

const searchInput = document.getElementById('searchInput');
const filterInput = document.getElementById('filterInput');
const statusFilter = document.getElementById('statusFilter');
const tableBody = document.getElementById('customerTable');

// کارت‌ها
const totalCustomersEl = document.getElementById('totalCustomers');
const newCustomersEl = document.getElementById('newCustomers');
const activeCustomersEl = document.getElementById('activeCustomers');

// ------------------ داده ------------------
async function loadUsers() {
  try {
    const users = await fetchUsers();
    USERS = users.map(u => ({
      id: u.id,
      name: `${u.firstName} ${u.lastName}`,
      email: u.email,
      country: u.address?.country || 'نامشخص',
      createdAt: seededDateFromId(u.id),
      lastPurchase: seededDateFromId(u.id * 3),
      totalSpend: Math.floor((u.id * 12345) % 10_000_000),
      status: u.id % 5 === 0 ? 'blocked' : u.id % 3 === 0 ? 'inactive' : 'active'
    }));
    filteredUsers = USERS;
    renderCards();
    renderTable(filteredUsers);
  } catch (err) {
    console.error('loadUsers error', err);
  }
}

// ------------------ کارت‌ها ------------------
function renderCards() {
  totalCustomersEl.textContent = USERS.length.toLocaleString('fa-IR');

  // جدیدترین مشتری‌ها (براساس تاریخ ساخت)
  const now = new Date();
  const last30 = USERS.filter(u => (now - u.createdAt) / (1000 * 60 * 60 * 24) <= 30);
  newCustomersEl.textContent = last30.length.toLocaleString('fa-IR');

  const activeCount = USERS.filter(u => u.status === 'active').length;
  activeCustomersEl.textContent = activeCount.toLocaleString('fa-IR');
}

// ------------------ جدول ------------------
function renderTable(data) {
  if (!tableBody) return;
  tableBody.innerHTML = '';

  data.forEach(u => {
    const statusColor =
      u.status === 'active'
        ? 'text-green-600 bg-green-50'
        : u.status === 'inactive'
        ? 'text-gray-600 bg-gray-50'
        : 'text-red-600 bg-red-50';

    const tr = document.createElement('tr');
    tr.className = 'hover:bg-orange-50 transition';
    tr.innerHTML = `
      <td class="py-3 px-4">${u.id}</td>
      <td class="py-3 px-4">
        <p class="font-semibold">${u.name}</p>
        <p class="text-xs text-gray-400">${u.email}</p>
      </td>
      <td class="py-3 px-4">${u.country}</td>
      <td class="py-3 px-4">${formatPersian(u.createdAt)}</td>
      <td class="py-3 px-4">${formatPersian(u.lastPurchase)}</td>
      <td class="py-3 px-4">${toToman(u.totalSpend)}</td>
      <td class="py-3 px-4">
        <span class="px-3 py-1 rounded-full text-xs font-medium ${statusColor}">
          ${u.status === 'active' ? 'فعال' : u.status === 'inactive' ? 'غیرفعال' : 'مسدود'}
        </span>
      </td>
    `;
    tableBody.appendChild(tr);
  });
}

// ------------------ فیلتر و جستجو ------------------
function applyFilters() {
  const q = searchInput?.value.trim().toLowerCase() || '';
  const country = filterInput?.value.trim().toLowerCase() || '';
  const status = statusFilter?.value || '';

  filteredUsers = USERS.filter(u => {
    const matchSearch =
      u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
    const matchCountry = !country || u.country.toLowerCase().includes(country);
    const matchStatus = !status || u.status === status;
    return matchSearch && matchCountry && matchStatus;
  });

  renderTable(filteredUsers);
}

// ------------------ لیسنرها ------------------
function initFilters() {
  if (searchInput) searchInput.addEventListener('input', debounce(applyFilters, 300));
  if (filterInput) filterInput.addEventListener('input', debounce(applyFilters, 300));
  if (statusFilter) statusFilter.addEventListener('change', applyFilters);
}

// ------------------ شروع ------------------
(async function init() {
  await loadUsers();
  initFilters();
})();
