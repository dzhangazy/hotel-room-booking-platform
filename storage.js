// Save data to localStorage
function saveToLocalStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error("Error saving to localStorage:", error);
    return false;
  }
}

// Get data from localStorage
function getFromLocalStorage(key) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error reading from localStorage:", error);
    return null;
  }
}

// Remove data from localStorage
function removeFromLocalStorage(key) {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error("Error removing from localStorage:", error);
    return false;
  }
}

// Clear all localStorage
function clearAllStorage() {
  try {
    localStorage.clear();
    return true;
  } catch (error) {
    console.error("Error clearing localStorage:", error);
    return false;
  }
}

// Initialize storage arrays
let cart = getFromLocalStorage("cart") || [];
let favorites = getFromLocalStorage("favorites") || [];
let bookings = getFromLocalStorage("bookings") || [];
let searchFilters = getFromLocalStorage("searchFilters") || {};

// Cart Functions
function addToCart(hotel) {
  // Check if hotel already in cart
  const existingIndex = cart.findIndex((item) => item.id === hotel.id);

  if (existingIndex === -1) {
    const cartItem = {
      ...hotel,
      addedDate: new Date().toISOString(),
      quantity: 1,
    };
    cart.push(cartItem);
    saveToLocalStorage("cart", cart);
    updateCartCount();
    return true;
  }
  return false;
}

function removeFromCart(hotelId) {
  cart = cart.filter((item) => item.id !== hotelId);
  saveToLocalStorage("cart", cart);
  updateCartCount();
}

function clearCart() {
  cart = [];
  saveToLocalStorage("cart", cart);
  updateCartCount();
}

function getCart() {
  return cart;
}

function getCartTotal() {
  return cart.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );
}

// Favorites Functions
function toggleFavorite(hotelId) {
  const index = favorites.indexOf(hotelId);

  if (index > -1) {
    // Remove from favorites
    favorites.splice(index, 1);
  } else {
    // Add to favorites
    favorites.push(hotelId);
  }

  saveToLocalStorage("favorites", favorites);
  return favorites.includes(hotelId);
}

function isFavorite(hotelId) {
  return favorites.includes(hotelId);
}

function getFavorites() {
  return favorites;
}

function getFavoriteHotels() {
  return hotelsData.filter((hotel) => favorites.includes(hotel.id));
}

// Bookings Functions
function addBooking(bookingData) {
  const booking = {
    id: Date.now(),
    ...bookingData,
    bookingDate: new Date().toISOString(),
    status: "confirmed",
  };

  bookings.push(booking);
  saveToLocalStorage("bookings", bookings);
  return booking;
}

function getBookings() {
  return bookings;
}
function saveBookings(bookings) {
  localStorage.setItem("bookings", JSON.stringify(bookings));
}

function cancelBooking(bookingId) {
  const booking = bookings.find((b) => b.id === bookingId);
  if (booking) {
    booking.status = "cancelled";
    saveToLocalStorage("bookings", bookings);
    return true;
  }
  return false;
}

function deleteBooking(bookingId) {
  bookings = bookings.filter((b) => b.id !== bookingId);
  saveToLocalStorage("bookings", bookings);
}

// Search Filters Functions
function saveSearchFilters(filters) {
  searchFilters = filters;
  saveToLocalStorage("searchFilters", filters);
}

function getSearchFilters() {
  return searchFilters;
}

function clearSearchFilters() {
  searchFilters = {};
  removeFromLocalStorage("searchFilters");
}

// Update cart count in navbar
function updateCartCount() {
  const cartCountElement = document.getElementById("cartCount");
  if (cartCountElement) {
    cartCountElement.textContent = cart.length;
  }
}

// Initialize cart count on page load
document.addEventListener("DOMContentLoaded", function () {
  updateCartCount();
});
