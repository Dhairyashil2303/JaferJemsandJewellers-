function loadStats(){

let products = JSON.parse(localStorage.getItem("products")) || [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

document.getElementById("total-products").innerText = products.length;
document.getElementById("cart-items").innerText = cart.length;
document.getElementById("wishlist-items").innerText = wishlist.length;
document.getElementById("orders").innerText = cart.length;

}

function loadProducts(){

let products = JSON.parse(localStorage.getItem("products")) || [];

let table = document.getElementById("product-table");

table.innerHTML = "";

products.forEach((product,index)=>{

table.innerHTML += `

<tr>

<td>${product.name}</td>
<td>₹${product.price}</td>
<td>${product.category}</td>

<td>

<input type="number" id="price-${index}" class="form-control mb-2" placeholder="New Price">

<button class="btn btn-success btn-sm" onclick="updatePrice(${index})">
Update
</button>

</td>

</tr>

`;

});

}

function updatePrice(index){

let products = JSON.parse(localStorage.getItem("products")) || [];

let newPrice = document.getElementById("price-"+index).value;

if(newPrice !== ""){

products[index].price = newPrice;

localStorage.setItem("products",JSON.stringify(products));

loadProducts();

alert("Price Updated");

}

}

function logout(){

window.location.href="login.html";

}

loadStats();
loadProducts();