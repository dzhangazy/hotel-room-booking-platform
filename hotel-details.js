// Hotel Details Page Functions

let currentHotel = null;

// Load hotel details on page load
document.addEventListener("DOMContentLoaded", function () {
  loadHotelDetails();
  setupDateListeners();
});

// Get hotel ID from URL parameters
function getHotelIdFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return parseInt(urlParams.get("id"));
}

// Load hotel details
function loadHotelDetails() {
  const hotelId = getHotelIdFromURL();
  currentHotel = hotelsData.find((hotel) => hotel.id === hotelId);

  if (!currentHotel) {
    window.location.href = "browse.html";
    return;
  }

  displayHotelDetails(currentHotel);
  updatePriceDisplay();
}

// Display hotel details
function displayHotelDetails(hotel) {
  const container = document.getElementById("hotelDetails");
  const favoriteClass = isFavorite(hotel.id) ? "active" : "";

  container.innerHTML = `
        <div class="card mb-4">
            <div class="hotel-details-image" style="background-image: url('${
              hotel.image
            }')">
                <button class="favorite-btn ${favoriteClass}" 
                        data-hotel-id="${hotel.id}" 
                        onclick="handleFavoriteClick(${hotel.id})">
                    <i class="fas fa-heart"></i>
                </button>
            </div>
            <div class="card-body">
                <h2 class="mb-3">${hotel.name}</h2>
                
                <div class="d-flex align-items-center mb-3">
                    <div class="rating me-3">
                        ${'<i class="fas fa-star"></i>'.repeat(
                          Math.floor(hotel.rating)
                        )}
                        ${
                          hotel.rating % 1 !== 0
                            ? '<i class="fas fa-star-half-alt"></i>'
                            : ""
                        }
                        <span class="ms-1">${hotel.rating}</span>
                    </div>
                    <span class="text-muted">|</span>
                    <span class="ms-3">
                        <i class="fas fa-map-marker-alt text-danger"></i> ${
                          hotel.location
                        }
                    </span>
                </div>

                <div class="alert alert-info">
                    <i class="fas fa-info-circle"></i> 
                    <strong>₸${hotel.price.toLocaleString()}</strong> per night
                </div>

                <p class="lead">${hotel.description}</p>

                <hr>

                <h4 class="mb-3">Amenities</h4>
                <div class="row">
                    ${hotel.amenities
                      .map(
                        (amenity) => `
                        <div class="col-md-6 mb-2">
                            <div class="amenity-item">
                                <i class="fas fa-check-circle text-success"></i> ${amenity}
                            </div>
                        </div>
                    `
                      )
                      .join("")}
                </div>

                <hr>

                <h4 class="mb-3">Hotel Information</h4>
                <div class="row">
                    <div class="col-md-6">
                        <p><strong><i class="fas fa-door-open"></i> Total Rooms:</strong> ${
                          hotel.rooms
                        }</p>
                        <p><strong><i class="fas fa-clock"></i> Check-in:</strong> ${
                          hotel.checkInTime
                        }</p>
                    </div>
                    <div class="col-md-6">
                        <p><strong><i class="fas fa-door-closed"></i> Check-out:</strong> ${
                          hotel.checkOutTime
                        }</p>
                        <p><strong><i class="fas fa-city"></i> City:</strong> ${
                          hotel.city
                        }</p>
                    </div>
                </div>

                <div id="weatherWidget" class="mt-3">
                    <!-- Weather will be loaded here -->
                </div>
            </div>
        </div>
    `;

  // Load weather for hotel city
  loadWeatherForCity(hotel.city);
}

// Load weather for city
async function loadWeatherForCity(city) {
  const weatherData = await fetchWeather(city);
  const weatherWidget = document.getElementById("weatherWidget");

  if (weatherData && weatherWidget) {
    weatherWidget.innerHTML = displayWeather(weatherData, city);
  }
}

// Setup date input listeners
function setupDateListeners() {
  const checkInDate = document.getElementById("checkInDate");
  const checkOutDate = document.getElementById("checkOutDate");

  // Set minimum dates
  const today = new Date().toISOString().split("T")[0];
  checkInDate.min = today;
  checkInDate.value = today;

  // Set check-out min date to tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  checkOutDate.min = tomorrow.toISOString().split("T")[0];
  checkOutDate.value = tomorrow.toISOString().split("T")[0];

  // Add event listeners to update price
  checkInDate.addEventListener("change", function () {
    // Update checkout minimum date
    const selectedDate = new Date(this.value);
    selectedDate.setDate(selectedDate.getDate() + 1);
    checkOutDate.min = selectedDate.toISOString().split("T")[0];

    // If checkout is before new minimum, update it
    if (new Date(checkOutDate.value) <= new Date(this.value)) {
      checkOutDate.value = selectedDate.toISOString().split("T")[0];
    }

    updatePriceDisplay();
  });

  checkOutDate.addEventListener("change", updatePriceDisplay);
}

// Update price display
function updatePriceDisplay() {
  if (!currentHotel) return;

  const checkIn = document.getElementById("checkInDate").value;
  const checkOut = document.getElementById("checkOutDate").value;

  if (checkIn && checkOut) {
    const nights = calculateNights(checkIn, checkOut);
    const total = currentHotel.price * nights;

    document.getElementById("pricePerNight").textContent = formatPrice(
      currentHotel.price
    );
    document.getElementById("numberOfNights").textContent = nights;
    document.getElementById("totalPrice").textContent = formatPrice(total);
  }
}

// Handle booking form submission
function handleBooking(event) {
  event.preventDefault();

  if (!currentHotel) return;

  // Get form data
  const checkIn = document.getElementById("checkInDate").value;
  const checkOut = document.getElementById("checkOutDate").value;
  const guests = document.getElementById("guests").value;
  const guestName = document.getElementById("guestName").value;
  const guestEmail = document.getElementById("guestEmail").value;
  const guestPhone = document.getElementById("guestPhone").value;

  // Validate email
  if (!validateEmail(guestEmail)) {
    alert("Please enter a valid email address");
    return;
  }

  // Validate phone
  if (!validatePhone(guestPhone)) {
    alert("Please enter a valid phone number");
    return;
  }

  // Calculate booking details
  const nights = calculateNights(checkIn, checkOut);
  const totalPrice = currentHotel.price * nights;

  // Create booking object
  const booking = {
    hotel: currentHotel,
    checkIn: checkIn,
    checkOut: checkOut,
    nights: nights,
    guests: guests,
    guestName: guestName,
    guestEmail: guestEmail,
    guestPhone: guestPhone,
    totalPrice: totalPrice,
  };

  // Save booking
  addBooking(booking);

  // Show confirmation
  alert(
    `Booking Confirmed!\n\nHotel: ${currentHotel.name}\nCheck-in: ${formatDate(
      checkIn
    )}\nCheck-out: ${formatDate(checkOut)}\nTotal: ${formatPrice(
      totalPrice
    )}\n\nConfirmation details sent to ${guestEmail}`
  );

  // Redirect to bookings page
  window.location.href = "bookings.html";
}

// Add current hotel to cart
function addCurrentToCart() {
  if (!currentHotel) return;

  const success = addToCart(currentHotel);

  if (success) {
    alert("Hotel added to cart!");
  } else {
    alert("This hotel is already in your cart");
  }
}
