let products = [];
let filteredProducts = [];

fetch("data/products.json")
.then(response => response.json())
.then(data => {

products = data;
filteredProducts = products;

displayProducts(filteredProducts);

});

function displayProducts(productArray){

let html = "";

productArray.forEach(product => {

html += `
<div class="col-md-4 mb-4">

<div class="card product-card">

<img src="${product.image}" class="card-img-top">

<div class="card-body text-center">

<h5>${product.name}</h5>

<p class="price">₹${product.price}</p>

<button class="btn btn-dark add-cart" data-id="${product.id}">
<i class="fa fa-cart-plus"></i> Cart
</button>

<button class="btn btn-outline-danger add-wishlist" data-id="${product.id}">
<i class="fa fa-heart"></i>
</button>

</div>

</div>

</div>
`;

});

document.getElementById("product-list").innerHTML = html;

}


document.querySelectorAll(".filter-btn").forEach(button => {

button.addEventListener("click", function(){

let category = this.dataset.category;

if(category === "all"){

filteredProducts = products;

}else{

filteredProducts = products.filter(product => product.category === category);

}

displayProducts(filteredProducts);

});

});

document.addEventListener("click",function(e){

if(e.target.closest(".add-cart")){

let id = e.target.closest(".add-cart").dataset.id;

let product = products.find(p => p.id == id);

let cart = JSON.parse(localStorage.getItem("cart")) || [];

cart.push(product);

localStorage.setItem("cart",JSON.stringify(cart));

showMessage(product.name);
}

});