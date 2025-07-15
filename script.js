  const products = [
      { 
        id: 1,
        name: "Classic T-Shirt", 
        price: 15.99, 
        image:"/images/1.jpg",

      },
      { 
        id: 2, 
        name: "Denim Jeans", 
        price: 29.99, 
        image: "https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/64/986649/1.jpg?6662",
      },
      { 
        id: 3, 
        name: "Hoodie", 
        price: 39.99, 
        image: "" 
      },
      { 
        id: 4, 
        name: "Sneakers", 
        price: 49.99, 
        image: "" 
      },
      { 
        id: 5, 
        name: "Leather Jacket", 
        price: 89.99, 
        image: "" 
      },
      {
        id: 6, 
        name: "Baseball Cap", 
        price: 9.99, 
        image: "" 
      },
      { 
        id: 7, 
        name: "Sweatpants", 
        price: 24.99, 
        image: "" 
      },
      { 
        id: 8, 
        name: "Summer Dress", 
        price: 34.99, 
        image: "" 
      },

    ];
    const cart = [];

    const productList = document.getElementById("product-list");
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

   function renderProducts() {
  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <h3>${product.name}</h3>
      <p>Price: $${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productList.appendChild(card);
  });
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);
  
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCart();
}

function removeFromCart(id) {
  const index = cart.findIndex(item => item.id === id);
  if (index !== -1) {
    cart.splice(index, 1);
    updateCart();
  }
}

function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} x ${item.quantity} - $${item.price * item.quantity}
      <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
    `;
    cartItems.appendChild(li);
  });

  cartTotal.textContent = total;
}

window.onload = renderProducts;