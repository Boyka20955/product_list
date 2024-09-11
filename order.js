// Select elements from the DOM
const cartCountElement = document.querySelector('.cart-icons span');
const cartTotalElement = document.querySelector('.cart-total');
const confirmOrderButton = document.getElementById('confirmOrder');
const cartMenu = document.getElementById('cartMenu');
const cartIcon = document.querySelector('.cart-icons');
const closeShopping =document.getElementById('cartMenu');
const catalogueContainer= document.getElementById('catalogueContainer');
const getCatalogue = async () => {
    const catalogue = await fetch('./data.json').then(data => data.json()).then(data => data);
    console.log(catalogue);
     const output = catalogue.map(data => {
        console.log(data);
        return `
        <div class="part">
            <img src="${data.image.desktop}">
            <p>${data.category}</p>
            <h1>${data.name}</h1>
            <h2>$${data.price}</h2>
            <button><img class="img" src="assets/images/icon-add-to-cart.svg" alt="Add to Cart">Add to Cart</button>
        </div>
`
    })

    catalogueContainer.innerHTML = output;
    
}

getCatalogue();

// Initialize the cart
let cart = [];
let totalAmount = 0;

// Function to update the cart display
function updateCartDisplay() {
    cartCountElement.textContent = cart.length;
    cartTotalElement.textContent = `$${totalAmount.toFixed(2)}`;

    // Display the items in the cart menu
    const productContainer = cartMenu.querySelector('.product');
    if (cart.length === 0) {
        productContainer.innerHTML = '<p>No items in cart.</p>';
    } else {
        productContainer.innerHTML = cart.map((item, index) => `
            <p class="product-name">${item.name}</p>
            <div class="quantity-controls">
              <button class="subtract" onclick="changeQuantity(${index}, -1)">-</button>
              <span class="product-quantity">${item.quantity}</span>
              <button class="add" onclick="changeQuantity(${index}, 1)">+</button>
            </div>
            <p class="product-total">$${(item.price * item.quantity).toFixed(2)}</p>
        `).join('');
    }
}

// Function to add an item to the cart
function addToCart(name, price) {
    // Check if item already in cart
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    totalAmount += price;
    updateCartDisplay();
}

// Function to change the quantity of an item in the cart
function changeQuantity(index, change) {
    const item = cart[index];
    item.quantity += change;
    if (item.quantity <= 0) {
        totalAmount -= item.price;
        cart.splice(index, 1); // Remove item from cart if quantity is 0
    } else {
        totalAmount += item.price * change;
    }
    updateCartDisplay();
}

// Event listeners for "Add to Cart" buttons
document.querySelectorAll('.part button').forEach((button, index) => {
    const name = button.previousElementSibling.previousElementSibling.textContent;
    const price = parseFloat(button.previousElementSibling.textContent.replace('$', ''));
    button.addEventListener('click', () => addToCart(name, price));
});

// Confirm Order Button
confirmOrderButton.addEventListener('click', () => {
    alert('Order Confirmed!');
    cart = [];
    totalAmount = 0;
    updateCartDisplay();
});
cartIcon.addEventListener('click', () => {
    cartMenu.classList.toggle('visible');
});
// Function to close the cart menu
function closeCartMenu() {
    cartMenu.classList.remove('visible');
}
    document.getElementById('closeShopping').addEventListener('click', closeCartMenu);

 