
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
}

function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (let c of cookies) {
    const [key, val] = c.split("=");
    if (key === name) return val;
  }
  return "";
}

// LOGIN
function login() {
  const username = document.getElementById("username").value;
  if (username) {
    setCookie("username", username, 7); // Save username for 7 days
    document.getElementById("welcome").innerText = `Welcome back, ${username}!`;
  }
}

// Auto-load username and cart
window.onload = () => {
  const savedUser = getCookie("username");
  if (savedUser) {
    document.getElementById("welcome").innerText = `Welcome back, ${savedUser}!`;
  }
  loadCart(); // Load cart from localStorage
};

//  CART 
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(product, price) {
  cart.push({ product, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

function deleteFromCart(index) {
  cart.splice(index, 1); // Remove item from array
  localStorage.setItem("cart", JSON.stringify(cart)); // Update localStorage
  loadCart(); // Re-render
}

function loadCart() {
  const cartList = document.getElementById("cartItems");
  const totalEl = document.getElementById("total");
  cartList.innerHTML = "";
  let total = 0;

  cart.forEach((item, i) => {
    total += item.price;
    cartList.innerHTML += `
      <li>
        <span>${item.product} - $${item.price}</span>
        <button onclick="deleteFromCart(${i})" class="delete-btn">🗑</button>
      </li>`;
  });


  let discount = sessionStorage.getItem("discount");
  if (discount) {
    total = total - (total * (discount / 100));
  }

  totalEl.innerText = total.toFixed(2);
}

//disscount
function applyDiscount() {
  const code = document.getElementById("discountCode").value;
  let msg = "";

  if (code === "10OFF") {
    sessionStorage.setItem("discount", 10); // 10% discount
    msg = "✅ 10% discount applied!";
  } else if (code === "WELCOME5") {
    sessionStorage.setItem("discount", 5); // 5% discount
    msg = "✅ 5% discount applied!";
  } else {
    sessionStorage.removeItem("discount");
    msg = "❌ Invalid code!";
  }

  document.getElementById("discountMsg").innerText = msg;
  loadCart();
}
