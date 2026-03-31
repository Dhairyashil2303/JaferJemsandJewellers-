/* ============================================
   Jafar Gems — Cart Logic (Improved)
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartContent = document.getElementById('cart-content');
  const totalRow = document.getElementById('total-row');
  const checkoutWrap = document.getElementById('checkout-wrap');
  const cartEmpty = document.getElementById('cart-empty');
  const cartTotalEl = document.getElementById('cart-total');
  const cartBadge = document.getElementById('cart-badge');
  const wishBadge = document.getElementById('wish-badge');

  // Update badges
  if (cartBadge) cartBadge.textContent = cart.length;
  const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  if (wishBadge) wishBadge.textContent = wishlist.length;

  if (cart.length === 0) {
    if (cartEmpty) cartEmpty.style.display = 'block';
    return;
  }

  let total = 0;
  const tableWrap = document.createElement('div');
  tableWrap.className = 'cart-table-wrap';
  tableWrap.innerHTML = `
    <table class="cart-table">
      <thead>
        <tr>
          <th>Product</th>
          <th>Price</th>
          <th>Qty</th>
          <th>Subtotal</th>
          <th></th>
        </tr>
      </thead>
      <tbody id="cart-items"></tbody>
    </table>
  `;
  cartContent.appendChild(tableWrap);

  const tbody = document.getElementById('cart-items');

  cart.forEach(function (product, index) {
    const qty = product.qty || 1;
    const price = Number(product.price);
    const subtotal = price * qty;
    total += subtotal;

    const row = document.createElement('tr');
    row.innerHTML = `
      <td style="font-weight:500">${product.name}</td>
      <td style="color:var(--ink-light)">₹${price.toLocaleString('en-IN')}</td>
      <td>
        <div style="display:flex;align-items:center;gap:8px">
          <button onclick="changeQty(${index},-1)" style="width:28px;height:28px;border:1px solid var(--border);border-radius:50%;background:var(--cream);cursor:pointer;font-size:1rem;display:flex;align-items:center;justify-content:center">−</button>
          <span>${qty}</span>
          <button onclick="changeQty(${index},1)" style="width:28px;height:28px;border:1px solid var(--border);border-radius:50%;background:var(--cream);cursor:pointer;font-size:1rem;display:flex;align-items:center;justify-content:center">+</button>
        </div>
      </td>
      <td style="color:var(--gold);font-weight:500">₹${subtotal.toLocaleString('en-IN')}</td>
      <td>
        <button onclick="removeItem(${index})" style="color:var(--ink-light);font-size:0.85rem;background:none;border:none;cursor:pointer;padding:6px;border-radius:6px;transition:0.2s" onmouseover="this.style.color='#e63946'" onmouseout="this.style.color='var(--ink-light)'">
          <i class="fa fa-trash-alt"></i>
        </button>
      </td>
    `;
    tbody.appendChild(row);
  });

  if (cartTotalEl) cartTotalEl.textContent = total.toLocaleString('en-IN');
  if (totalRow) totalRow.style.display = 'flex';
  if (checkoutWrap) checkoutWrap.style.display = 'block';
});


function changeQty(index, delta) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart[index].qty = Math.max(1, (cart[index].qty || 1) + delta);
  localStorage.setItem('cart', JSON.stringify(cart));
  location.reload();
}

function removeItem(index) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  location.reload();
}

function checkout() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (cart.length === 0) return;

  let message = 'Hello! I would like to order:%0A%0A';
  let total = 0;

  cart.forEach(function (item) {
    const qty = item.qty || 1;
    const sub = Number(item.price) * qty;
    total += sub;
    message += `• ${item.name} × ${qty} = ₹${sub.toLocaleString('en-IN')}%0A`;
  });

  message += `%0A*Total: ₹${total.toLocaleString('en-IN')}*`;

  window.open('https://wa.me/919370431575?text=' + message, '_blank');
}
