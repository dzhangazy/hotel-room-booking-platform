// Generate modern hotel card HTML
function generateHotelCard(hotel) {
  const favoriteClass = isFavorite(hotel.id) ? "active" : "";

  return `
        <div class="col-md-6 col-lg-4">
            <div class="hotel-card">
                <div class="hotel-image" style="background-image: url('${
                  hotel.image
                }')">
                    <button class="favorite-btn ${favoriteClass}" 
                            data-hotel-id="${hotel.id}" 
                            onclick="handleFavoriteClick(${hotel.id}, event)">
                        <i class="fas fa-heart"></i>
                    </button>
                    <div class="price-badge">₸${hotel.price.toLocaleString()}</div>
                </div>
                <div class="card-body">
                    <h5 class="card-title">${hotel.name}</h5>
                    <p class="location">
                        <i class="fas fa-map-marker-alt"></i> ${hotel.location}
                    </p>
                    <div class="rating">
                        ${generateStars(hotel.rating)}
                        <span>${hotel.rating}</span>
                    </div>
                    <p class="card-text text-muted">${hotel.description}</p>
                    <div class="amenities">
                        ${hotel.amenities
                          .slice(0, 3)
                          .map(
                            (amenity) =>
                              `<span class="amenity-badge">${amenity}</span>`
                          )
                          .join("")}
                    </div>
                    <a href="hotel-details.html?id=${
                      hotel.id
                    }" class="btn-view-details">
                        <i class="fas fa-eye me-2"></i> View Details
                    </a>
                </div>
            </div>
        </div>
    `;
}

// Generate star rating
function generateStars(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  let stars = "";

  for (let i = 0; i < fullStars; i++) {
    stars += '<i class="fas fa-star"></i>';
  }
  if (hasHalfStar) {
    stars += '<i class="fas fa-star-half-alt"></i>';
  }

  return stars;
}

// Handle favorite button click
function handleFavoriteClick(hotelId, event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }

  const isNowFavorite = toggleFavorite(hotelId);
  const btn = document.querySelector(`[data-hotel-id="${hotelId}"]`);

  if (btn) {
    if (isNowFavorite) {
      btn.classList.add("active");
      showToast("Added to favorites! ❤️", "success");
    } else {
      btn.classList.remove("active");
      showToast("Removed from favorites", "info");
    }
  }

  // Reload favorites page if we're on it
  if (window.location.pathname.includes("favorites.html")) {
    setTimeout(() => {
      if (typeof loadFavorites === "function") {
        loadFavorites();
      }
    }, 300);
  }
}

// Handle search form submission
function handleSearch(event) {
  event.preventDefault();

  const location = document.getElementById("searchLocation").value;
  const checkIn = document.getElementById("checkIn").value;
  const checkOut = document.getElementById("checkOut").value;
  const guests = document.getElementById("guests").value;

  // Validate dates
  if (new Date(checkOut) <= new Date(checkIn)) {
    showToast("Check-out date must be after check-in date", "error");
    return;
  }

  // Save search data
  saveSearchFilters({
    location: location,
    checkIn: checkIn,
    checkOut: checkOut,
    guests: guests,
  });

  showToast("Searching hotels...", "info");

  // Redirect to browse page
  setTimeout(() => {
    window.location.href = "browse.html";
  }, 500);
}

// Show modern toast notification
function showToast(message, type = "info") {
  // Remove existing toast
  const existingToast = document.querySelector(".custom-toast");
  if (existingToast) {
    existingToast.remove();
  }

  const toast = document.createElement("div");
  toast.className = `custom-toast toast-${type}`;

  const icons = {
    success: "fa-check-circle",
    error: "fa-exclamation-circle",
    info: "fa-info-circle",
    warning: "fa-exclamation-triangle",
  };

  toast.innerHTML = `
        <i class="fas ${icons[type] || icons.info}"></i>
        <span>${message}</span>
    `;

  document.body.appendChild(toast);

  // Animate in
  setTimeout(() => toast.classList.add("show"), 100);

  // Remove after 3 seconds
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Calculate number of nights between dates
function calculateNights(checkIn, checkOut) {
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

// Format date to readable string
function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
}

// Format price with currency
function formatPrice(price) {
  return `₸${price.toLocaleString()}`;
}

// Validate email
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Validate phone number (Kazakhstan format)
function validatePhone(phone) {
  const re = /^[\+]?[7]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  return re.test(phone);
}

// Set minimum date for date inputs (today's date)
function setMinDate() {
  const today = new Date().toISOString().split("T")[0];
  const checkInInputs = document.querySelectorAll('input[type="date"]');

  checkInInputs.forEach((input) => {
    if (!input.min) {
      input.min = today;
    }
  });
}

// Initialize page
document.addEventListener("DOMContentLoaded", function () {
  // Set minimum dates for date inputs
  setMinDate();

  // Load featured hotels on home page
  if (
    window.location.pathname.includes("index.html") ||
    window.location.pathname === "/" ||
    window.location.pathname.endsWith("/")
  ) {
    loadFeaturedHotels();
  }

  // Add scroll effect to navbar
  handleNavbarScroll();
  window.addEventListener("scroll", handleNavbarScroll);

  // Animate elements on scroll
  animateOnScroll();
  window.addEventListener("scroll", animateOnScroll);
});

// Load featured hotels (first 6)
function loadFeaturedHotels() {
  const container = document.getElementById("featuredHotels");
  if (container) {
    const featured = hotelsData.slice(0, 6);
    container.innerHTML = featured
      .map((hotel) => generateHotelCard(hotel))
      .join("");
  }
}

// Handle navbar scroll effect
function handleNavbarScroll() {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.1)";
    navbar.style.padding = "0.5rem 0";
  } else {
    navbar.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.05)";
    navbar.style.padding = "1rem 0";
  }
}

// Animate elements on scroll
function animateOnScroll() {
  const elements = document.querySelectorAll(
    ".hotel-card, .feature-card, .testimonial-card"
  );

  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const elementBottom = element.getBoundingClientRect().bottom;

    if (elementTop < window.innerHeight && elementBottom > 0) {
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    }
  });
}

// Weather API Integration (OpenWeatherMap)
async function fetchWeather(city) {
  // Note: You need to replace 'YOUR_API_KEY' with actual OpenWeatherMap API key
  const API_KEY = "075b5f8558d5ebaef1d053fa07396150"; // Get free key from openweathermap.org

  // For demo purposes, return mock data if no API key
  if (API_KEY === "YOUR_API_KEY") {
    return {
      temperature: Math.floor(Math.random() * 20) + 10,
      description: ["Clear Sky", "Partly Cloudy", "Sunny"][
        Math.floor(Math.random() * 3)
      ],
      humidity: Math.floor(Math.random() * 40) + 40,
      windSpeed: (Math.random() * 5 + 2).toFixed(1),
    };
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return {
        temperature: Math.round(data.main.temp),
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
      };
    }
  } catch (error) {
    console.error("Weather fetch error:", error);
  }

  return null;
}

// Display weather widget
function displayWeather(weatherData, city) {
  if (!weatherData) return "";

  return `
        <div class="weather-widget">
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <h5><i class="fas fa-cloud-sun"></i> Weather in ${city}</h5>
                    <div class="weather-temp">${weatherData.temperature}°C</div>
                    <div class="weather-desc">${weatherData.description}</div>
                </div>
                <div class="weather-details text-end">
                    <div><i class="fas fa-tint"></i> ${weatherData.humidity}%</div>
                    <div><i class="fas fa-wind"></i> ${weatherData.windSpeed} m/s</div>
                </div>
            </div>
        </div>
    `;
}

// Handle newsletter subscription
function handleNewsletter(event) {
  event.preventDefault();
  const email = event.target.querySelector('input[type="email"]').value;

  if (validateEmail(email)) {
    showToast("Successfully subscribed to newsletter! 📧", "success");
    event.target.reset();
  } else {
    showToast("Please enter a valid email address", "error");
  }
}

// Smooth scroll to top
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// Add custom toast styles
const toastStyles = document.createElement("style");
toastStyles.textContent = `
    .custom-toast {
        position: fixed;
        top: 100px;
        right: 20px;
        background: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
        display: flex;
        align-items: center;
        gap: 1rem;
        z-index: 9999;
        transform: translateX(400px);
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        max-width: 350px;
    }
    
    .custom-toast.show {
        transform: translateX(0);
    }
    
    .custom-toast i {
        font-size: 1.5rem;
    }
    
    .custom-toast.toast-success {
        background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
        color: white;
    }
    
    .custom-toast.toast-error {
        background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        color: white;
    }
    
    .custom-toast.toast-info {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
    }
    
    body.dark-mode .custom-toast {
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.5);
    }
    
    .weather-widget {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 1.5rem;
        border-radius: 12px;
        margin-top: 1.5rem;
    }
    
    .weather-temp {
        font-size: 2.5rem;
        font-weight: 700;
        margin: 0.5rem 0;
    }
    
    .weather-desc {
        text-transform: capitalize;
        opacity: 0.9;
    }
    
    .weather-details {
        font-size: 0.95rem;
    }
    
    .weather-details > div {
        margin-bottom: 0.5rem;
    }
    
    @media (max-width: 768px) {
        .custom-toast {
            right: 10px;
            left: 10px;
            max-width: none;
        }
    }
`;
document.head.appendChild(toastStyles);
