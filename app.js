// Array to store cart items
let cartItems = [];

// Function to update cart display
function updateCart() {
  const cartCount = document.querySelector('.cart-icons span');
  const cartTotal = document.querySelector('.cart-total');
  const confirmOrderButton = document.getElementById('confirmOrder');
  const cartMenu = document.querySelector('.cart-menu');
  
  // Clear existing cart items in the sidebar
  cartMenu.querySelectorAll('.cart-item').forEach(item => item.remove());
  
  // Calculate total quantity and price
  let totalQuantity = 0;
  let totalPrice = 0;

  cartItems.forEach(item => {
    totalQuantity += item.quantity;
    totalPrice += item.quantity * item.price;
    
    // Add item to the sidebar
    const cartItemDiv = document.createElement('div');
    cartItemDiv.className = 'cart-item';
    cartItemDiv.innerHTML = `
      <p>${item.name}</p>
      <div class="quantity-controls">
        <button class="subtract">-</button>
        <span>${item.quantity}</span>
        <button class="add">+</button>
      </div>
      <p>$${(item.price * item.quantity).toFixed(2)}</p>
    `;
    cartMenu.appendChild(cartItemDiv);
    
    // Add event listeners for add and subtract buttons
    cartItemDiv.querySelector('.add').addEventListener('click', () => {
      item.quantity += 1;
      updateCart();
    });
    
    cartItemDiv.querySelector('.subtract').addEventListener('click', () => {
      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        cartItems = cartItems.filter(cartItem => cartItem !== item);
      }
      updateCart();
    });
  });
  
  // Update cart count and total price 
  cartCount.textContent = totalQuantity;
  cartTotal.textContent = `$${totalPrice.toFixed(2)}`;
}

// Function to add item to cart
function addToCart(itemName, itemPrice) {
  const existingItem = cartItems.find(item => item.name === itemName);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cartItems.push({ name: itemName, price: itemPrice, quantity: 1 });
  }
  
  updateCart();
}

// Function to confirm order
function confirmOrder() {
  if (cartItems.length === 0) {
    alert("Your cart is empty. Please add some items before confirming your order.");
  } else {
    alert(`Order confirmed! You have ordered ${cartItems.length} items totaling ${document.querySelector('.cart-total').textContent}`);
    cartItems = [];
    updateCart();
  }
}

// Add event listeners to "Add to Cart" buttons
document.querySelectorAll('.part button').forEach(button => {
  button.addEventListener('click', function() {
    const itemName = this.previousElementSibling.previousElementSibling.textContent;
    const itemPrice = parseFloat(this.previousElementSibling.textContent.replace('$', ''));
    addToCart(itemName, itemPrice);
  });
});

// Add event listener to the "Confirm Order" button
confirmOrderButton.addEventListener('click', () => {
  alert('Order Confirmed! Thank you for your purchase.');
  // Reset the cart
  cartQuantity = 0;
  cartTotal = 0;
  updateCart();
});

// Initial cart update
updateCart();
document.addEventListener('DOMContentLoaded', function() {
  const burgerIcon = document.querySelector('.burger--icon');
  const sidebar = document.getElementById('sidebar');

  burgerIcon.addEventListener('click', function() {
    sidebar.classList.toggle('active');
  });
});
