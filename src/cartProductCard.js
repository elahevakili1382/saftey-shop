// src/cartProductCard.js
export function createCartProductCard(item) {
  const price = Number(item.price);
  const quantity = Number(item.quantity);

  const card = document.createElement('div');
  card.className = `
    flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4 bg-white rounded shadow-md border border-gray-300
    hover:shadow-lg transition duration-300
  `;

  card.innerHTML = `
    <!-- بخش مشخصات محصول -->
    <div class="flex-1 sm:flex-[5] text-right space-y-1">
      <img src="${item.image}" alt="${item.title}" class="w-24 h-24 object-cover rounded-lg mb-2 sm:mb-0 sm:mr-4 float-right" />
      <h3 class="text-lg font-semibold text-gray-900 truncate">${item.title}</h3>
      <p class="text-gray-600 text-sm">قیمت واحد: 
        <span class="text-orange-600 font-bold">${price.toLocaleString()} تومان</span>
      </p>
      <p class="text-gray-600 text-sm">تعداد: 
        <span class="font-medium">${quantity}</span>
      </p>
      <p class="text-orange-600 font-bold text-base">جمع: 
        ${(price * quantity).toLocaleString()} تومان
      </p>
    </div>

    <!-- بخش دکمه تکمیل سفارش و جمع کل محصول -->
    <div class="flex flex-col justify-between items-center sm:flex-[7] p-4 bg-gray-50 rounded-lg w-full sm:w-auto">
      <button class="bg-green-600 text-white rounded-md px-6 py-2 hover:bg-green-700 transition-colors duration-300 mb-4 w-full sm:w-auto">
        تکمیل سفارش
      </button>
      <p class="text-right text-gray-700 font-bold text-lg w-full sm:w-auto">
        کل مبلغ: 
        <span class="text-orange-600">${(price * quantity).toLocaleString()} تومان</span>
      </p>
    </div>
  `;

  // هندلر کلیک تکمیل سفارش
  const checkoutBtn = card.querySelector('button');
  checkoutBtn.addEventListener('click', () => {
    alert(`✅ سفارش ${item.title} با موفقیت ثبت شد!`);
    // عملیات پرداخت یا ریدایرکت می‌تونه اینجا اضافه شه
  });

  return card;
}
