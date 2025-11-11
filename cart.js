document.addEventListener("DOMContentLoaded", function () {
  loadCartItems();
});

// Load and display cart items
function loadCartItems() {
  const cartItems = getCart();
  const container = document.getElementById("cartItems");
  const emptyCart = document.getElementById("emptyCart");
  const checkoutBtn = document.getElementById("checkoutBtn");

  if (cartItems.length === 0) {
    container.style.display = "none";
    emptyCart.style.display = "block";
    if (checkoutBtn) checkoutBtn.disabled = true;
    updateCartSummary();
    return;
  }

  container.style.display = "block";
  emptyCart.style.display = "none";
  if (checkoutBtn) checkoutBtn.disabled = false;

  container.innerHTML = cartItems
    .map((hotel) => generateCartItem(hotel))
    .join("");
  updateCartSummary();
}

// Generate cart item HTML
function generateCartItem(hotel) {
  return `
        <div class="cart-item-card">
            <div class="row g-3 align-items-center">
                <div class="col-md-4">
                    <div class="cart-item-image" style="background-image: url('${
                      hotel.image
                    }')"></div>
                </div>
                <div class="col-md-8">
                    <div class="d-flex justify-content-between align-items-start mb-2">
                        <div>
                            <h5 style="color: var(--text-dark); margin-bottom: 0.5rem;">${
                              hotel.name
                            }</h5>
                            <p style="color: var(--text-light); margin: 0;">
                                <i class="fas fa-map-marker-alt me-1"></i> ${
                                  hotel.location
                                }
                            </p>
                        </div>
                        <button class="btn btn-sm btn-outline-danger" onclick="removeCartItem(${
                          hotel.id
                        })">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                    
                    <div class="rating mb-2">
                        ${generateStars(hotel.rating)}
                        <span class="ms-1">${hotel.rating}</span>
                    </div>
                    
                    <p style="color: var(--text-light); margin-bottom: 1rem;">${
                      hotel.description
                    }</p>
                    
                    <div class="d-flex flex-wrap gap-2 mb-3">
                        ${hotel.amenities
                          .slice(0, 4)
                          .map(
                            (amenity) =>
                              `<span class="amenity-badge">${amenity}</span>`
                          )
                          .join("")}
                    </div>
                    
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <small style="color: var(--text-light);">Price per night:</small>
                            <div style="color: var(--primary-color); font-size: 1.5rem; font-weight: 700;">
                                ₸${hotel.price.toLocaleString()}
                            </div>
                        </div>
                        <a href="hotel-details.html?id=${
                          hotel.id
                        }" class="btn btn-outline-primary">
                            <i class="fas fa-eye me-1"></i> View Details
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Remove item from cart
function removeCartItem(hotelId) {
  if (confirm("Remove this hotel from cart?")) {
    removeFromCart(hotelId);
    loadCartItems();
    showToast("Hotel removed from cart", "info");
  }
}

// Update cart summary
function updateCartSummary() {
  const cartItems = getCart();
  const total = getCartTotal();

  const cartItemCount = document.getElementById("cartItemCount");
  const cartSubtotal = document.getElementById("cartSubtotal");
  const cartTotal = document.getElementById("cartTotal");

  if (cartItemCount) cartItemCount.textContent = cartItems.length;
  if (cartSubtotal) cartSubtotal.textContent = formatPrice(total);
  if (cartTotal) cartTotal.textContent = formatPrice(total);
}

// Clear cart with confirmation
function clearCartConfirm() {
  const cartItems = getCart();

  if (cartItems.length === 0) {
    showToast("Your cart is already empty", "info");
    return;
  }

  if (confirm("Are you sure you want to clear your entire cart?")) {
    clearCart();
    loadCartItems();
    showToast("Cart cleared successfully", "success");
  }
}

// Proceed to checkout
function proceedToCheckout() {
  const cartItems = getCart();

  if (cartItems.length === 0) {
    showToast("Your cart is empty!", "error");
    return;
  }

  const confirmed = confirm(
    `You have ${cartItems.length} hotel(s) in your cart.\n\nWould you like to proceed with booking all of them?`
  );

  if (confirmed) {
    // Create bookings for all cart items
    let successCount = 0;

    cartItems.forEach((hotel) => {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const dayAfter = new Date(tomorrow);
      dayAfter.setDate(dayAfter.getDate() + 1);

      const booking = {
        hotel: hotel,
        checkIn: tomorrow.toISOString().split("T")[0],
        checkOut: dayAfter.toISOString().split("T")[0],
        nights: 1,
        guests: 2,
        guestName: "Guest User",
        guestEmail: "guest@example.com",
        guestPhone: "+7 (123) 456-7890",
        totalPrice: hotel.price,
      };

      addBooking(booking);
      successCount++;
    });

    // Clear cart
    clearCart();

    showToast(
      `${successCount} booking(s) confirmed! Check your bookings page.`,
      "success"
    );

    // Redirect to bookings page after a short delay
    setTimeout(() => {
      window.location.href = "bookings.html";
    }, 2000);
  }
}
