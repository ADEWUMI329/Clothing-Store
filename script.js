const products = [
  { id: 1, name: "Classic T-Shirt", price: 15.99, image: "/images/1.jpg" },
  { id: 2, name: "Denim Jeans", price: 29.99, image: "/images/2.jpg" },
  { id: 3, name: "Hoodie", price: 39.99, image: "/images/3.jpg" },
  { id: 4, name: "Sneakers", price: 49.99, image: "/images/4.jpeg" },
  { id: 5, name: "Leather Jacket", price: 89.99, image: "/images/7.jpeg" },
  { id: 6, name: "Baseball Cap", price: 9.99, image: "/images/5.jpeg" },
  { id: 7, name: "Sweatpants", price: 24.99, image: "/images/download (4).jpeg" },
  { id: 8, name: "Summer Dress", price: 34.99, image: "/images/istockphoto.jpg" },
  { id: 9, name: "Gown", price: 40.99, image: "/images/9.webp" },
  { id: 10, name: "Crop tops", price: 40.99, image: "/images/11.jpg" }
];

const cart = [];

const productList = document.getElementById("product-list");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

function renderProducts() {
  productList.innerHTML = "";

  products.forEach(product => {
    const inCart = cart.find(item => item.id === product.id);
    const qty = inCart ? inCart.quantity : 0;

    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>$${product.price.toFixed(2)}</p>
      <div class="btn-group">
        <button onclick="addToCart(${product.id})">Add</button>
        <button onclick="removeFromCart(${product.id})" ${qty === 0 ? 'disabled' : ''}>Remove</button>
        <span>${qty > 0 ? + qty : ''}</span>
      </div>
    `;

    productList.appendChild(card);
  });
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const existing = cart.find(item => item.id === productId);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCart();
  renderProducts();
}

function removeFromCart(productId) {
  const existing = cart.find(item => item.id === productId);
  if (!existing) return;

  if (existing.quantity > 1) {
    existing.quantity--;
  } else {
    const index = cart.findIndex(item => item.id === productId);
    cart.splice(index, 1);
  }

  updateCart();
  renderProducts();
}

function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    const line = document.createElement("li");
    line.textContent = `${item.name} x ${item.quantity} = $${(item.price * item.quantity).toFixed(2)}`;
    cartItems.appendChild(line);
    total += item.price * item.quantity;
  });

  cartTotal.textContent = total.toFixed(2);
}

window.onload = () => {
  renderProducts();
  updateCart();
};
document.getElementById("order-now").addEventListener("click", function() {
  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  let orderSummary = "You have ordered:\n";
  cart.forEach(item => {
    orderSummary += `${item.name} x ${item.quantity}\n`;
  });

  orderSummary += `\nTotal: $${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}`;
  alert(orderSummary);
});
