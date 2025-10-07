import Chart from 'chart.js/auto';
import '../css/styles.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Initialize AOS
AOS.init({ duration: 700, offset: 120, once: true });

$(document).ready(function() {
  // 🔹 فعال‌سازی تقویم شمسی
  $('.datepicker').persianDatepicker({
    format: 'YYYY/MM/DD',
    autoClose: true
  });

  // 📈 چارت فروش
  const revenueCtx = document.getElementById('revenueChart').getContext('2d');
  new Chart(revenueCtx, {
    type: 'bar',
    data: {
      labels: ["جمعه","شنبه","یک‌شنبه","دوشنبه","سه‌شنبه","چهارشنبه"],
      datasets: [{
        label: "درآمد",
        data: [8000,15000,22430,13000,17000,19000],
        backgroundColor: "#f97316",
        borderRadius: 8
      }]
    },
    options: {
      plugins: { legend: { display: false } },
      scales: { y: { grid: { display: false } }, x: { grid: { display: false } } }
    }
  });

  // 📉 چارت سود و زیان
  const profitCtx = document.getElementById('profitChart').getContext('2d');
  new Chart(profitCtx, {
    type: 'bar',
    data: {
      labels: ["فروردین","اردیبهشت","خرداد","تیر","مرداد","شهریور"],
      datasets: [
        { label:"سود", data:[12000,15000,18000,22000,25000,27000], backgroundColor:"#f97316" },
        { label:"زیان", data:[5000,7000,4000,6000,8000,9000], backgroundColor:"#1f2937" }
      ]
    },
    options: { scales:{ y:{ grid:{ color:"#f3f4f6" } } } }
  });
});
