document.addEventListener("DOMContentLoaded", function(){

let products = JSON.parse(localStorage.getItem("products")) || [];

let container = document.getElementById("product-container");

products.forEach(product => {

container.innerHTML += `

<div class="col-md-4 product-item mb-4" data-category="${product.category}">

<div class="card product-card">

<img src="${product.image}" class="card-img-top" alt="${product.name}">

<div class="card-body text-center">

<h5>${product.name}</h5>

<p class="price">₹${product.price}</p>

<button class="btn btn-dark add-cart"
data-name="${product.name}"
data-price="${product.price}">

<i class="fa fa-cart-plus"></i> Cart

</button>

<button class="btn btn-outline-danger wishlist"
data-name="${product.name}"
data-price="${product.price}">

<i class="fa fa-heart"></i>

</button>

</div>

</div>

</div>

`;

});

attachProductEvents();

});


function attachProductEvents(){

// CART BUTTON
document.querySelectorAll(".add-cart").forEach(button => {

button.addEventListener("click", function(){

let name = this.dataset.name;
let price = this.dataset.price;

let cart = JSON.parse(localStorage.getItem("cart")) || [];

cart.push({name:name,price:price});

localStorage.setItem("cart", JSON.stringify(cart));

alert("Added to Cart");

});

});


// WISHLIST BUTTON
document.querySelectorAll(".wishlist").forEach(button => {

button.addEventListener("click", function(){

let name = this.dataset.name;
let price = this.dataset.price;

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

wishlist.push({name:name,price:price});

localStorage.setItem("wishlist", JSON.stringify(wishlist));

alert("Added to Wishlist");

});

});

}