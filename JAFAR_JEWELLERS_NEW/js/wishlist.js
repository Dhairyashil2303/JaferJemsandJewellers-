/* ============================================
   Jafar Gems — Wishlist Logic (Improved)
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  const wishContent = document.getElementById('wishlist-content');
  const wishEmpty = document.getElementById('wishlist-empty');
  const wishBadge = document.getElementById('wish-badge');
  const cartBadge = document.getElementById('cart-badge');

  if (wishBadge) wishBadge.textContent = wishlist.length;
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (cartBadge) cartBadge.textContent = cart.length;

  if (wishlist.length === 0) {
    if (wishEmpty) wishEmpty.style.display = 'block';
    return;
  }

  const tableWrap = document.createElement('div');
  tableWrap.className = 'cart-table-wrap';
  tableWrap.innerHTML = `
    <table class="cart-table">
      <thead>
        <tr>
          <th>Product</th>
          <th>Price</th>
          <th>Action</th>
          <th></th>
        </tr>
      </thead>
      <tbody id="wishlist-items"></tbody>
    </table>
  `;
  wishContent.appendChild(tableWrap);

  const tbody = document.getElementById('wishlist-items');

  wishlist.forEach(function (product, index) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td style="font-weight:500">${product.name}</td>
      <td style="color:var(--gold);font-weight:500">₹${Number(product.price).toLocaleString('en-IN')}</td>
      <td>
        <button onclick="moveToCart(${index})" class="btn-cart" style="font-size:0.8rem;padding:8px 16px;display:inline-flex;align-items:center;gap:6px">
          <i class="fa fa-shopping-bag"></i> Move to Cart
        </button>
      </td>
      <td>
        <button onclick="removeWish(${index})" style="color:var(--ink-light);font-size:0.85rem;background:none;border:none;cursor:pointer;padding:6px;border-radius:6px;transition:0.2s" onmouseover="this.style.color='#e63946'" onmouseout="this.style.color='var(--ink-light)'">
          <i class="fa fa-trash-alt"></i>
        </button>
      </td>
    `;
    tbody.appendChild(row);
  });
});


function removeWish(index) {
  const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  wishlist.splice(index, 1);
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
  location.reload();
}

function moveToCart(index) {
  const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const item = wishlist[index];
  const existing = cart.find(function (c) { return c.name === item.name; });
  if (existing) {
    existing.qty = (existing.qty || 1) + 1;
  } else {
    cart.push({ name: item.name, price: item.price, qty: 1 });
  }
  wishlist.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
  location.reload();
}
