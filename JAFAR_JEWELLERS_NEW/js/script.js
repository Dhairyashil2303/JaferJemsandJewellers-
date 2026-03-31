/* ============================================
   Jafar Gems & Jewellers — Main Script
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  // ---- NAVBAR: scroll shadow + hamburger ----
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  if (navbar) {
    window.addEventListener('scroll', function () {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    });
  }

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    // Close menu on link click (mobile)
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  // ---- BADGE COUNTS ----
  function updateBadges() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const cartBadge = document.getElementById('cart-badge');
    const wishBadge = document.getElementById('wish-badge');
    if (cartBadge) cartBadge.textContent = cart.length;
    if (wishBadge) wishBadge.textContent = wishlist.length;
  }
  updateBadges();

  // ---- CART: Add to cart ----
  function showToast(message) {
    let toast = document.getElementById('cart-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'cart-toast';
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(function () {
      toast.classList.remove('show');
    }, 2200);
  }

  document.querySelectorAll('.add-cart').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const name = btn.dataset.name;
      const price = parseInt(btn.dataset.price);
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      // Prevent duplicates — increment qty instead
      const existing = cart.find(function (item) { return item.name === name; });
      if (existing) {
        existing.qty = (existing.qty || 1) + 1;
      } else {
        cart.push({ name, price, qty: 1 });
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      updateBadges();
      showToast('✔ ' + name + ' added to cart');
      btn.style.transform = 'scale(0.95)';
      setTimeout(function () { btn.style.transform = ''; }, 150);
    });
  });

  // ---- WISHLIST: Add to wishlist ----
  document.querySelectorAll('.wishlist').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const card = btn.closest('.product-card') || btn.closest('.card');
      const name = btn.dataset.name || card.querySelector('h3,h5').innerText;
      const price = parseInt(btn.dataset.price || card.querySelector('.product-price,.price').innerText.replace(/[₹,]/g, ''));
      const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
      const already = wishlist.find(function (item) { return item.name === name; });
      if (already) {
        showToast('Already in wishlist ❤');
        return;
      }
      wishlist.push({ name, price });
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      updateBadges();
      btn.classList.add('active');
      showToast('❤ ' + name + ' added to wishlist');
    });
  });

  // ---- FILTER BUTTONS (Products page) ----
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      const items = document.querySelectorAll('.product-item');
      items.forEach(function (item) {
        const show = filter === 'all' || item.dataset.category === filter;
        item.style.display = show ? '' : 'none';
        if (show) {
          // Re-trigger reveal animation
          item.classList.remove('visible');
          setTimeout(function () { item.classList.add('visible'); }, 10);
        }
      });
    });
  });

  // ---- SCROLL REVEAL ----
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length > 0) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (entry.isIntersecting) {
          setTimeout(function () {
            entry.target.classList.add('visible');
          }, i * 80);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { observer.observe(el); });
  }

  // ---- URL PARAM FILTER (products.html?cat=gold) ----
  const urlParams = new URLSearchParams(window.location.search);
  const catParam = urlParams.get('cat');
  if (catParam) {
    const matchBtn = document.querySelector('.filter-btn[data-filter="' + catParam + '"]');
    if (matchBtn) matchBtn.click();
  }

});
