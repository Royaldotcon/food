var swiper = new Swiper(".mySwiper", {
    loop: true,
    navigation: {
        nextEl: "#next",
        prevEl: "#previous",
    },
});

/* ===========================
   Mobile Menu Toggle
=========================== */
const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".mobile-menu");

hamburger.addEventListener("click", () => {
    mobileMenu.classList.toggle("mobile-menu-active");
});

/* ===========================
   Cart Toggle
=========================== */
const cartIcon = document.querySelector(".cart-icon");
const cartTab = document.querySelector(".cart-tab");
const closeCartBtn = document.querySelector(".close-btn");

cartIcon.addEventListener("click", (e) => {
    e.preventDefault();
    cartTab.classList.add("cart-tab-active");
});

closeCartBtn.addEventListener("click", (e) => {
    e.preventDefault();
    cartTab.classList.remove("cart-tab-active");
});

/* ===========================
   Menu Data
=========================== */
const products = [
    {
        id: 1,
        name: "Double Cheese Burger",
        price: 200,
        image: "images/burger.png"
    },
    {
        id: 2,
        name: "Chicken Pizza",
        price: 350,
        image: "images/pizza.png"
    },
    {
        id: 3,
        name: "Fried Chicken",
        price: 150,
        image: "images/fried-chicken.png"
    },
    {
        id: 4,
        name: "Chicken Chicken",
        price: 150,
        image: "images/chicken-roll.png"
    },
    {
        id: 5,
        name: "Lasagna",
        price: 150,
        image: "images/lasagna.png"
    },
    {
        id: 6,
        name: "Sandwich",
        price: 150,
        image: "images/sandwich.png"
    },
    {
        id: 7,
        name: "Spaghetti",
        price: 150,
        image: "images/spaghetti.png"
    },
    {
        id: 8,
        name: "Spring Roll",
        price: 150,
        image: "images/spring-roll.png"
    }
];

/* ===========================
   Render Menu Cards
=========================== */
const cardList = document.querySelector(".card-list");

products.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("order-card");

    card.innerHTML = `
    <div class="card-image">
      <img src="${product.image}" alt="${product.name}">
    </div>
    <h4>${product.name}</h4>
    <h4 class="price">₹${product.price}</h4>
    <a href="#" class="btn add-to-cart">Add to Cart</a>
  `;

    card.querySelector(".add-to-cart").addEventListener("click", (e) => {
        e.preventDefault();
        addToCart(product);

        cartTab.classList.add("cart-tab-active");
    });

    cardList.appendChild(card);
});

/* ===========================
   Cart Logic
=========================== */
let cart = [];

const cartList = document.querySelector(".cart-list");
const cartValue = document.querySelector(".cart-value");
const cartTotal = document.querySelector(".cart-total");

function addToCart(product) {
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
        existing.qty++;
    } else {
        cart.push({ ...product, qty: 1 });
    }

    updateCart();
}

function updateCart() {
    cartList.innerHTML = "";

    let total = 0;
    let totalItems = 0;

    cart.forEach(item => {
        total += item.price * item.qty;
        totalItems += item.qty;

        const div = document.createElement("div");
        div.classList.add("item");

        div.innerHTML = `
      <div class="item-image">
        <img src="${item.image}">
      </div>
      <div>
        <h4>${item.name}</h4>
        <h4 class="item-total">₹${item.price * item.qty}</h4>
      </div>
      <div class="flex quantity">
        <a href="#" class="quantity-btn minus">−</a>
        <h4 class="quantity-value">${item.qty}</h4>
        <a href="#" class="quantity-btn plus">+</a>
      </div>
    `;

        div.querySelector(".minus").addEventListener("click", (e) => {
            e.preventDefault();
            item.qty--;
            if (item.qty === 0) {
                cart = cart.filter(p => p.id !== item.id);
            }
            updateCart();
        });

        div.querySelector(".plus").addEventListener("click", (e) => {
            e.preventDefault();
            item.qty++;
            updateCart();
        });

        cartList.appendChild(div);
    });

    cartValue.textContent = totalItems;
    cartTotal.textContent = `₹${total}`;
}

/* ===========================
   Swiper Slider
=========================== */

