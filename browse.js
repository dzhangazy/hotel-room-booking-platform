// Browse Page Functions

// Load all hotels on page load
document.addEventListener("DOMContentLoaded", function () {
  loadAllHotels();
  loadSavedFilters();
});

// Load all hotels
function loadAllHotels() {
  const container = document.getElementById("hotelsList");
  if (container) {
    container.innerHTML = hotelsData
      .map((hotel) => generateHotelCard(hotel))
      .join("");
    updateResultsCount(hotelsData.length);
  }
}

// Load saved search filters from localStorage
function loadSavedFilters() {
  const filters = getSearchFilters();

  if (filters && filters.location) {
    const locationSelect = document.getElementById("filterLocation");
    if (locationSelect) {
      // Try to match the location
      const options = Array.from(locationSelect.options);
      const matchingOption = options.find(
        (opt) =>
          opt.value &&
          filters.location.toLowerCase().includes(opt.value.toLowerCase())
      );

      if (matchingOption) {
        locationSelect.value = matchingOption.value;
        applyFilters();
      }
    }

    // Clear filters after using them once
    clearSearchFilters();
  }
}

// Apply all filters
function applyFilters() {
  const location = document.getElementById("filterLocation").value;
  const maxPrice = document.getElementById("filterPrice").value;
  const minRating = document.getElementById("filterRating").value;
  const sortBy = document.getElementById("sortBy").value;

  let filtered = [...hotelsData];

  // Filter by location
  if (location) {
    filtered = filtered.filter((hotel) => hotel.city === location);
  }

  // Filter by price
  if (maxPrice) {
    filtered = filtered.filter((hotel) => hotel.price <= parseInt(maxPrice));
  }

  // Filter by rating
  if (minRating) {
    filtered = filtered.filter(
      (hotel) => hotel.rating >= parseFloat(minRating)
    );
  }

  // Sort results
  filtered = sortHotels(filtered, sortBy);

  // Display results
  displayFilteredHotels(filtered);
}

// Sort hotels based on criteria
function sortHotels(hotels, sortBy) {
  const sorted = [...hotels];

  switch (sortBy) {
    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating);
    case "price-low":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-high":
      return sorted.sort((a, b) => b.price - a.price);
    case "name":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return sorted;
  }
}

// Display filtered hotels
function displayFilteredHotels(hotels) {
  const container = document.getElementById("hotelsList");
  const noResults = document.getElementById("noResults");

  if (hotels.length > 0) {
    container.innerHTML = hotels
      .map((hotel) => generateHotelCard(hotel))
      .join("");
    container.style.display = "flex";
    noResults.style.display = "none";
    updateResultsCount(hotels.length);
  } else {
    container.innerHTML = "";
    container.style.display = "none";
    noResults.style.display = "block";
    updateResultsCount(0);
  }
}

// Update results count display
function updateResultsCount(count) {
  const resultsCount = document.getElementById("resultsCount");
  if (resultsCount) {
    resultsCount.innerHTML = `<strong>${count}</strong> ${
      count === 1 ? "hotel" : "hotels"
    } found`;
  }
}

// Clear all filters
function clearFilters() {
  document.getElementById("filterLocation").value = "";
  document.getElementById("filterPrice").value = "";
  document.getElementById("filterRating").value = "";
  document.getElementById("sortBy").value = "rating";

  loadAllHotels();
}

// Using jQuery for AJAX example (alternative to fetch)
// Search hotels using jQuery AJAX
function searchHotelsAjax(query) {
  $.ajax({
    url: "api/hotels", // This would be your backend API endpoint
    method: "GET",
    data: { search: query },
    success: function (data) {
      // Handle successful response
      console.log("Hotels found:", data);
    },
    error: function (error) {
      console.error("Error searching hotels:", error);
    },
  });
}
