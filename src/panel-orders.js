import { fetchCarts, fetchProducts, fetchUsers } from './api.js';
import { seededDateFromId, toToman, debounce } from './utils.js';
import '../css/styles.css';

let ORDERS = [];
let USERS = [];
let PRODUCTS = [];
let filterFrom = null;
let filterTo = null;
let currentQuery = '';

let weekChartInstance = null;

const searchInput = document.getElementById('searchOrderInput');
const fromInput = document.getElementById('fromDate');
const toInput = document.getElementById('toDate');

async function loadData() {
  const [carts, products, users] = await Promise.all([
    fetchCarts(),
    fetchProducts(),
    fetchUsers()
  ]);

  PRODUCTS = products;
  USERS = users;

 ORDERS = carts.map(cart => {
  const date = seededDateFromId(cart.id);
  const total = cart.total || (cart.products || []).reduce((s,p) => s + (p.price * (p.quantity||1)),0);
  const items = cart.totalProducts || (cart.products || []).reduce((s,p) => s + (p.quantity||1),0);
  const customer = USERS.find(u => u.id === cart.userId) || {};

  const status = Math.random() < 0.7 ? 'موفق' : (Math.random()<0.5 ? 'در حال انجام' : 'لغو شده');

  return {
    id: cart.id,
    date,
    total,
    items,
    status,            
    customer: `${customer.firstName||''} ${customer.lastName||''}`.trim() || `کاربر ${cart.userId}`,
    products: (cart.products||[]).map(p => {
      const prod = PRODUCTS.find(x => x.id === p.id);
      return prod ? prod.title : (p.title||'محصول');
    })
  };
});

}

function computeStats(orders) {
  const now = new Date();
  const weekAgo = new Date(now); weekAgo.setDate(now.getDate()-7);
  const weekOrders = orders.filter(o => o.date >= weekAgo && o.date <= now);
  const returned = orders.filter(o => o.items === 0); // نمونه برگشت خورده
  const success = orders.filter(o => o.items > 0);
  const totalRevenue = orders.reduce((s,o)=>s+(o.total||0),0);
  return { weekOrders, returned, success, totalRevenue };
}

function renderCards() {
  const { weekOrders, returned, success, totalRevenue } = computeStats(ORDERS);
  document.getElementById('card-week-orders').textContent = weekOrders.length;
  document.getElementById('card-returns').textContent = returned.length;
  document.getElementById('card-success-orders').textContent = success.length;
  document.getElementById('card-total-revenue').textContent = toToman(totalRevenue);

  const ctx = document.getElementById('card-week-orders-chart');
  if(weekChartInstance) weekChartInstance.destroy();
  const labels = weekOrders.map(o => o.date.getDate()+'/'+(o.date.getMonth()+1));
  const data = weekOrders.map(o=>o.total);
  weekChartInstance = new Chart(ctx, {
    type:'line',
    data:{labels,datasets:[{label:'درآمد روزانه',data,backgroundColor:'rgba(249,115,22,0.2)',borderColor:'#F97316',tension:0.3}]},
    options:{plugins:{legend:{display:false}},scales:{y:{display:false},x:{display:false}}}
  });
}

function renderTable(filteredOrders) {
  const tbody = document.getElementById('ordersTableBody');
  tbody.innerHTML = '';
  filteredOrders.forEach(o=>{
    const tr = document.createElement('tr');
    tr.className = 'hover:bg-gray-100';
  tr.innerHTML = `
  <td class="p-2 border">${o.id}</td>
  <td class="p-2 border">${o.date.toLocaleDateString('fa-IR')}</td>
  <td class="p-2 border">${o.customer}</td>
  <td class="p-2 border">
    <span class="${getStatusClass(o.status)}">${o.status}</span>
  </td>
  <td class="p-2 border">${toToman(o.total)}</td>
  <td class="p-2 border">${o.total>0?'دریافت شد':'در انتظار'}</td>
  <td class="p-2 border">${o.items}</td>
  <td class="p-2 border">
    <button class="text-blue-600 hover:underline" onclick="alert('نمایش جزئیات سفارش ${o.id}')">نمایش</button>
  </td>
`;

    tbody.appendChild(tr);
  });

  const summary = document.getElementById('filteredSummary');
  const totalSum = filteredOrders.reduce((s,o)=>s+(o.total||0),0);
  summary.innerHTML = `نتایج فیلتر: <strong>${filteredOrders.length}</strong> سفارش — مجموع: <strong>${toToman(totalSum)}</strong>`;
}

function applyFilters() {
  let filtered = ORDERS.slice();
  if(filterFrom) filtered = filtered.filter(o=>o.date>=filterFrom);
  if(filterTo) filtered = filtered.filter(o=>o.date<=filterTo);
  if(currentQuery && currentQuery.trim()) {
    const q = currentQuery.trim().toLocaleLowerCase();
    filtered = filtered.filter(o=>{
      const inCust = (o.customer||'').toLowerCase().includes(q);
      const inProd = (o.products||[]).some(p=>p.toLowerCase().includes(q));
      return inCust || inProd;
    });
  }
  renderTable(filtered);
}

function getStatusClass(status) {
  switch(status) {
    case 'موفق': return 'status-badge status-success';
    case 'در حال انجام': return 'status-badge status-pending';
    case 'لغو شده': return 'status-badge status-canceled';
    default: return 'status-badge';
  }
}


function initDatepickers() {
  $(fromInput).persianDatepicker({
    format:'YYYY/MM/DD', autoClose:true,
    onSelect: unix=>{ filterFrom=new persianDate(unix).toDate(); applyFilters(); }
  });
  $(toInput).persianDatepicker({
    format:'YYYY/MM/DD', autoClose:true,
    onSelect: unix=>{ filterTo=new persianDate(unix).toDate(); applyFilters(); }
  });
}


function initSearch() {
  if(!searchInput) return;
  searchInput.addEventListener('input', debounce(e=>{
    currentQuery = e.target.value||'';
    applyFilters();
  },300));
}


document.getElementById('exportOrdersBtn').addEventListener('click',()=>{
  window.print();
});


(async function init(){
  try{
    await loadData();
    renderCards();
    renderTable(ORDERS);
    initDatepickers();
    initSearch();
  }catch(e){console.error('Orders init error', e);}
})();
