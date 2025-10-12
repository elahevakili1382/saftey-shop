import { fetchCarts, fetchProducts, fetchUsers } from './api.js';
import { seededDateFromId, toToman, debounce } from './utils.js';
import '../css/styles.css';

let ORDERS = [];
let chartInstance = null;
let profitChartInstance = null;
let filterFrom = null;
let filterTo = null;
let currentQuery = '';

const searchInput = document.querySelector('input[placeholder^="جستجو"]') || document.querySelector('input[type="search"]');
const fromInput = document.getElementById('fromDate');
const toInput = document.getElementById('toDate');
const chartCanvas = document.getElementById('revenueChart');

// ------------------ ابزار کمکی برای کارت‌ها ------------------
function setCardValueByLabel(labelStartsWith, valueText) {
  document.querySelectorAll('section .bg-white p.text-gray-400').forEach(p => {
    if (p.textContent && p.textContent.trim().startsWith(labelStartsWith)) {
      const h2 = p.nextElementSibling;
      if (h2) h2.textContent = valueText;
    }
  });
}

// ------------------ درج بلوک آمار سریع ------------------
function ensureStatsAreaInserted() {
  if (document.getElementById('dashboardQuickStats')) return;
  const main = document.querySelector('main') || document.body;
  const container = document.createElement('div');
  container.id = 'dashboardQuickStats';
  container.className = 'grid grid-cols-1 md:grid-cols-3 gap-6 mb-6';
  container.innerHTML = `
    <div class="bg-white shadow-md rounded-2xl p-4 text-center">
      <h3 class="text-sm text-gray-500">فروش این هفته</h3>
      <p id="weekRevenue" class="text-2xl font-bold text-orange-600 mt-2">—</p>
      <small id="weekCount" class="text-xs text-gray-400 block mt-1"></small>
    </div>
    <div class="bg-white shadow-md rounded-2xl p-4 text-center">
      <h3 class="text-sm text-gray-500">فروش این ماه</h3>
      <p id="monthRevenue" class="text-2xl font-bold text-orange-600 mt-2">—</p>
      <small id="monthCount" class="text-xs text-gray-400 block mt-1"></small>
    </div>
    <div class="bg-white shadow-md rounded-2xl p-4 text-center">
      <h3 class="text-sm text-gray-500">فروش سالانه</h3>
      <p id="yearRevenue" class="text-2xl font-bold text-orange-600 mt-2">—</p>
      <small id="yearCount" class="text-xs text-gray-400 block mt-1"></small>
    </div>
  `;
  const firstSection = document.querySelector('section.grid');
  if (firstSection) firstSection.parentNode.insertBefore(container, firstSection);
  else main.prepend(container);
}

// ------------------ لود داده‌ها ------------------
async function loadData() {
  const [carts, products, users] = await Promise.all([
    fetchCarts(),
    fetchProducts(),
    fetchUsers()
  ]);

  ORDERS = (carts || []).map(cart => {
    const date = seededDateFromId(cart.id);
    const total = cart.total || (cart.products || []).reduce((s, p) => s + (p.price * (p.quantity || 1)), 0);
    const items = cart.totalProducts || (cart.products || []).reduce((s,p) => s + (p.quantity || 1), 0);
    const titles = (cart.products || []).map(p => {
      const prod = (products || []).find(x => x.id === p.id);
      return prod ? prod.title : (p.title || 'محصول');
    });
    const user = (users || []).find(u => u.id === cart.userId) || {};
    return {
      id: cart.id,
      date,
      total,
      items,
      customer: `${user.firstName || ''} ${user.lastName || ''}`.trim() || `کاربر ${cart.userId}`,
      products: titles
    };
  });
}

// ------------------ محاسبه آمار دوره‌ها ------------------
function computePeriodStats(orders = []) {
  const now = new Date();
  const weekAgo = new Date(now);
  weekAgo.setDate(now.getDate() - 7);

  const thisWeek = orders.filter(o => o.date >= weekAgo && o.date <= now);
  const thisMonth = orders.filter(o => o.date.getMonth() === now.getMonth() && o.date.getFullYear() === now.getFullYear());
  const thisYear = orders.filter(o => o.date.getFullYear() === now.getFullYear());

  const sum = arr => arr.reduce((s, o) => s + (o.total || 0), 0);

  return {
    week: { revenue: sum(thisWeek), count: thisWeek.length },
    month: { revenue: sum(thisMonth), count: thisMonth.length },
    year: { revenue: sum(thisYear), count: thisYear.length },
  };
}

// ------------------ کارت‌های اصلی ------------------
function updateExistingCards(orders) {
  const totals = orders.reduce((s,o) => s + (o.total || 0), 0);
  const uniqueCustomers = new Set(orders.map(o => o.customer)).size;

  setCardValueByLabel('کل فروش', (orders.length).toLocaleString('fa-IR'));
  setCardValueByLabel('مشتریان جدید', uniqueCustomers.toLocaleString('fa-IR'));
  setCardValueByLabel('محصولات مرجوعی', 0);
  setCardValueByLabel('درآمد کل', toToman(totals));
}

// ------------------ خلاصه سریع ------------------
function renderQuickStats(orders) {
  const stats = computePeriodStats(orders);
  document.getElementById('weekRevenue').textContent = toToman(stats.week.revenue);
  document.getElementById('weekCount').textContent = `تعداد سفارش: ${stats.week.count}`;
  document.getElementById('monthRevenue').textContent = toToman(stats.month.revenue);
  document.getElementById('monthCount').textContent = `تعداد سفارش: ${stats.month.count}`;
  document.getElementById('yearRevenue').textContent = toToman(stats.year.revenue);
  document.getElementById('yearCount').textContent = `تعداد سفارش: ${stats.year.count}`;
}

// ------------------ داده ۶ ماه اخیر ------------------
function buildMonthlySeries(orders) {
  const now = new Date();
  const months = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push(d);
  }

  const totals = new Array(6).fill(0);
  orders.forEach(o => {
    const first = months[0];
    const monthIndex = (o.date.getFullYear() - first.getFullYear()) * 12 + (o.date.getMonth() - first.getMonth());
    if (monthIndex >= 0 && monthIndex < 6) totals[monthIndex] += (o.total || 0);
  });

  const labels = months.map(d => {
    try {
      return new persianDate(d).format('MMMM');
    } catch {
      const monthNames = ['فروردین','اردیبهشت','خرداد','تیر','مرداد','شهریور','مهر','آبان','آذر','دی','بهمن','اسفند'];
      return monthNames[d.getMonth()];
    }
  });

  return { labels, totals };
}

// ------------------ چارت تحلیل درآمد (ستونی نارنجی) ------------------
function renderChartForOrders(orders) {
  const ctx = chartCanvas;
  if (!ctx) return;
  const { labels, totals } = buildMonthlySeries(orders);

  // 👇 نرمال‌سازی داده‌ها برای نمایش زیباتر (نمونه کار)
  const maxVal = Math.max(...totals);
  const base = 5_000_000; // پایه فروش برای هر ماه
  const adjustedTotals = totals.map(v => {
    const randBoost = Math.random() * 0.4 + 0.8; // کمی نوسان
    return base * randBoost + (v || 0) * 0.5;    // تقویت مقدار
  });

  if (chartInstance) chartInstance.destroy();

  chartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'درآمد ماهانه (تومان)',
        data: adjustedTotals,
        backgroundColor: '#F95509',
        borderWidth: 2,
      }]
    },
    options: {
      plugins: { legend: { display: false } },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: '#444',
            callback: v => v ? v.toLocaleString('fa-IR') : v
          },
          grid: { color: 'rgba(249,115,22,0.08)' }
        },
        x: {
          ticks: { color: '#555' },
          grid: { display: false }
        }
      }
    }
  });
}


// ------------------ چارت سود و زیان دو ستونه ------------------
function renderProfitChart(orders, canvasId) {
  const ctx = document.getElementById(canvasId);
  if (!ctx) return;

  const { labels, totals } = buildMonthlySeries(orders);

  // 👇 داده‌ی نمایشی متعادل برای ۶ ماه آخر
  const base = 3_000_000;
  const profits = totals.map(() => base + Math.random() * 3_000_000);
  const losses  = totals.map(() => base * 0.3 + Math.random() * 1_000_000);

  if (profitChartInstance) profitChartInstance.destroy();

  profitChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: 'سود (تومان)',
          data: profits,
          backgroundColor: '#F97316',
          borderWidth: 2,
          borderRadius: 30,
        },
        {
          label: 'زیان (تومان)',
          data: losses,
          backgroundColor: '#14054D',
          borderWidth: 2,
          borderRadius: 30,
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'top',
          labels: { color: '#333', boxWidth: 15, font: { size: 13 } }
        },
        tooltip: {
          backgroundColor: '#fef3c7',
          titleColor: '#000',
          bodyColor: '#000',
          callbacks: {
            label: (ctx) => `${ctx.dataset.label}: ${ctx.formattedValue} تومان`
          }
        }
      },
      scales: {
        x: {
          ticks: { color: '#555', font: { size: 12 } },
          grid: { display: false }
        },
        y: {
          beginAtZero: true,
          ticks: {
            color: '#444',
            callback: v => v.toLocaleString('fa-IR')
          },
          grid: { color: 'rgba(0,0,0,0.05)' }
        }
      }
    }
  });
}



// ------------------ خلاصه فیلتر ------------------
function renderFilteredSummary(filtered) {
  let el = document.getElementById('filteredSummary');
  if (!el) {
    el = document.createElement('div');
    el.id = 'filteredSummary';
    el.className = 'max-w-5xl mx-auto mt-4 text-sm text-gray-600 text-right';
    const chartParent = chartCanvas ? chartCanvas.parentNode : document.body;
    chartParent.insertAdjacentElement('afterend', el);
  }
  const total = (filtered || []).reduce((s, o) => s + (o.total || 0), 0);
  el.innerHTML = `نتایج فیلتر: <strong>${(filtered || []).length}</strong> سفارش — مجموع: <strong>${toToman(total)}</strong>`;
}

// ------------------ فیلترها ------------------
function applyFiltersAndRender() {
  let filtered = ORDERS.slice();
  if (filterFrom) filtered = filtered.filter(o => o.date >= filterFrom);
  if (filterTo) filtered = filtered.filter(o => o.date <= filterTo);
  if (currentQuery && currentQuery.trim().length) {
    const q = currentQuery.trim().toLocaleLowerCase();
    filtered = filtered.filter(o => {
      const inCust = (o.customer || '').toLocaleLowerCase().includes(q);
      const inProd = (o.products || []).some(t => (t || '').toLocaleLowerCase().includes(q));
      return inCust || inProd;
    });
  }

  renderChartForOrders(filtered);
  renderProfitChart(filtered, 'profitChart');
  renderFilteredSummary(filtered);
  renderQuickStats(filtered);
}

// ------------------ datepicker ------------------
function initDatepickers() {
  if (typeof $ === 'undefined' || typeof persianDate === 'undefined') return;

  $(fromInput).persianDatepicker({
    format: 'YYYY/MM/DD',
    autoClose: true,
    onSelect: unix => {
      try { filterFrom = new persianDate(unix).toDate(); } catch { filterFrom = null; }
      applyFiltersAndRender();
    }
  });

  $(toInput).persianDatepicker({
    format: 'YYYY/MM/DD',
    autoClose: true,
    onSelect: unix => {
      try { filterTo = new persianDate(unix).toDate(); } catch { filterTo = null; }
      applyFiltersAndRender();
    }
  });
}

// ------------------ سرچ ------------------
function initSearchInput() {
  if (!searchInput) return;
  const onInput = debounce(e => {
    currentQuery = e.target.value || '';
    applyFiltersAndRender();
  }, 300);
  searchInput.addEventListener('input', onInput);
}

// ------------------ شروع ------------------
(async function init() {
  try {
    ensureStatsAreaInserted();
    await loadData();
    updateExistingCards(ORDERS);
    renderQuickStats(ORDERS);
    renderChartForOrders(ORDERS);
    renderProfitChart(ORDERS, 'profitChart');
    renderFilteredSummary(ORDERS);
    initDatepickers();
    initSearchInput();
  } catch (err) {
    console.error('Dashboard init error', err);
  }
})();
