import '../css/styles.css'

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`

setupCounter(document.querySelector('#counter'))
 const mobileMenuBtn = document.getElementById('mobileMenuBtn')
  const mobileMenu = document.getElementById('mobileMenu')
  const mobileMenuOverlay = document.getElementById('mobileMenuOverlay')
  const closeMobileMenu = document.getElementById('closeMobileMenu')

  function openMobileMenu() {
    mobileMenu.classList.remove('translate-x-full')
    mobileMenuOverlay.classList.remove('hidden')
  }

  function closeMenu() {
    mobileMenu.classList.add('translate-x-full')
    mobileMenuOverlay.classList.add('hidden')
  }

  mobileMenuBtn.addEventListener('click', openMobileMenu)
  closeMobileMenu.addEventListener('click', closeMenu)
  mobileMenuOverlay.addEventListener('click', closeMenu)

  // مثال برای نمایش تعداد کالا در سبد خرید
  const cartCount = document.getElementById('cartCount')
  let totalCount = 3 // فرضا این مقدار از جاوااسکریپت یا سرور میاد
  if (totalCount > 0) {
    cartCount.textContent = totalCount
    cartCount.classList.remove('hidden')
  }