// Select elements from the DOM
const cartCountElement = document.querySelector('.cart-icons span');
const cartTotalElement = document.querySelector('.cart-total');
const confirmOrderButton = document.getElementById('confirmOrder');
const cartMenu = document.getElementById('cartMenu');
const cartIcon = document.querySelector('.cart-icons');
const closeShoppingButton = document.getElementById('closeShopping');
const catalogueContainer = document.getElementById('catalogueContainer');

// Fetch and display the catalogue items
const getCatalogue = async () => {
  try {
    const response = await fetch('./data.json');
    const catalogue = await response.json();

    const output = catalogue.map(({ image, category, name, price }) => `
      <div class="part">
        <img src="${image.desktop}" alt="${name}">
        <p>${category}</p>
        <h1>${name}</h1>
        <h2>$${price.toFixed(2)}</h2>
        <button class="add-to-cart"><img class="img" src="assets/images/icon-add-to-cart.svg" alt="Add to Cart">Add to Cart</button>
      </div>
    `).join('');

    catalogueContainer.innerHTML = output;
    // addCartEventListeners();
  } 
  catch (error) {
    console.error('Failed to fetch catalogue:', error);
  }
};

getCatalogue();

// Initialize the cart
let cart = [];
let totalAmount = 0;

// Function to update the cart display
const updateCartDisplay = () => {
  cartCountElement.textContent = cart.length;
  cartTotalElement.textContent = `$${totalAmount.toFixed(2)}`;

  const productContainer = cartMenu.querySelector('.product');
  productContainer.innerHTML = cart.length === 0
    ? '<p>No items in cart.</p>'
    : cart.map((item, index) => `
      <div class="cart-item">
        <p class="product-name">${item.name}</p>
        <div class="quantity-controls">
          <button class="subtract" data-index="${index}" data-change="-1">-</button>
          <span class="product-quantity">${item.quantity}</span>
          <button class="add" data-index="${index}" data-change="1">+</button>
        </div>
        <p class="product-total">$${(item.price * item.quantity).toFixed(2)}</p>
      </div>
    `).join('');

  // Attach event listeners to quantity buttons
  document.querySelectorAll('.subtract, .add').forEach(button =>
    button.addEventListener('click', handleQuantityChange)
  );
};

// Function to add an item to the cart
const addToCart = (name, price) => {
  const existingItem = cart.find(item => item.name === name);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  totalAmount += price;
  updateCartDisplay();
};

// Function to handle quantity change in the cart
const handleQuantityChange = (event) => {
  const index = event.target.dataset.index;
  const change = parseInt(event.target.dataset.change, 10);
  const item = cart[index];

  item.quantity += change;
  if (item.quantity <= 0) {
    totalAmount -= item.price;
    cart.splice(index, 1);
  } else {
    totalAmount += item.price * change;
  }

  updateCartDisplay();
};

// Function to add event listeners to "Add to Cart" buttons
const addCartEventListeners = () => {
  document.querySelectorAll('.add-to-cart').forEach((button) => {
    const name = button.closest('.part').querySelector('h1').textContent;
    const price = parseFloat(button.closest('.part').querySelector('h2').textContent.replace('$', ''));
    button.addEventListener('click', () => addToCart(name, price));
  });
};

// Event listener for Confirm Order button
confirmOrderButton.addEventListener('click', () => {
  alert('Order Confirmed!');
  cart = [];
  totalAmount = 0;
  updateCartDisplay();
});

// Toggle cart menu visibility
cartIcon.addEventListener('click', () => {
  cartMenu.classList.toggle('visible');
});

// Event listener to close the cart menu
closeShoppingButton.addEventListener('click', () => {
  cartMenu.classList.remove('visible');
});
