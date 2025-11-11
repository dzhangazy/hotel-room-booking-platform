# LuxStay - Hotel Room Booking Platform

## Final Project - Astana IT University

### Student Information

- **Name**: [Bakytzhan Jangazy]
- **Group**: [SE-2431]

---

## 📋 Project Overview

LuxStay is a fully functional, multi-page hotel room booking platform that demonstrates proficiency in front-end web development technologies including HTML5, CSS3, JavaScript, jQuery, Bootstrap, Local Storage, and API integration.

---

## 🗂️ File Structure

```
hotel-booking-platform/
│
├── index.html              # Home page with hero section and featured hotels
├── browse.html             # Browse all hotels with filters and search
├── hotel-details.html      # Individual hotel details and booking form
├── cart.html               # Shopping cart page
├── bookings.html           # User's booking history
├── favorites.html          # User's favorite hotels
├── contact.html            # Contact page with form
│
├── styles.css              # Main stylesheet with all CSS
│
├── data.js                 # Hotels database
├── storage.js              # Local Storage management functions
├── theme.js                # Dark/Light mode toggle
├── main.js                 # Main JavaScript functions
├── browse.js               # Browse page specific functions
├── hotel-details.js        # Hotel details page functions
├── cart.js                 # Cart page functions
│
└── README.md               # This file
```

---

## ✨ Features Implemented

### Required Features:

#### 1. **Basic Structure** ✅

- ✅ 7 interconnected pages (Home, Browse, Hotel Details, Cart, Bookings, Favorites, Contact)
- ✅ Consistent design with header, footer, and navigation
- ✅ Responsive layout using Bootstrap Grid System
- ✅ Custom CSS for unique design elements

#### 2. **Advanced Features** ✅

**Local Storage** (Primary Feature):

- ✅ Shopping cart persistence
- ✅ Favorites/Wishlist system
- ✅ Booking history storage
- ✅ Dark/Light theme preference
- ✅ Search filters memory

**Additional Features**:

- ✅ Dark/Light mode toggle
- ✅ Form validation (booking form, contact form)
- ✅ Dynamic content updates
- ✅ Interactive hotel cards
- ✅ Real-time price calculations

#### 3. **API Integration** (Bonus) 🎯

- Weather API integration (OpenWeatherMap) for hotel locations
- Note: Requires API key for full functionality

---

## 🎨 Design Features

### Visual Elements:

- Modern gradient hero section
- Smooth animations and transitions
- Hover effects on cards
- Responsive images (SVG placeholders)
- Icon integration (Font Awesome)
- Rating stars display
- Color-coded status badges

### Responsive Design:

- Mobile-first approach
- Tablet-optimized layouts
- Desktop enhanced experience
- Bootstrap breakpoints utilized

---

## 🛠️ Technologies Used

1. **HTML5** - Semantic markup
2. **CSS3** - Custom styling and animations
3. **Bootstrap 5.3** - Responsive grid and components
4. **JavaScript (ES6+)** - Interactive functionality
5. **jQuery 3.6** - DOM manipulation and AJAX
6. **Font Awesome 6.4** - Icons
7. **Local Storage API** - Data persistence
8. **Fetch API** - Weather data

---

## 📱 Pages Description

### 1. **Home Page (index.html)**

- Hero section with search box
- Featured hotels showcase
- Customer testimonials
- Call-to-action buttons

### 2. **Browse Hotels (browse.html)**

- Complete hotel listing
- Advanced filtering system:
  - Location filter
  - Price range filter
  - Rating filter
  - Sorting options
- Results counter

### 3. **Hotel Details (hotel-details.html)**

- Comprehensive hotel information
- Image gallery
- Amenities list
- Weather widget
- Booking form with:
  - Date selection
  - Guest information
  - Price calculation
  - Add to cart option

### 4. **Shopping Cart (cart.html)**

- Cart items display
- Remove items functionality
- Cart summary with total
- Proceed to checkout
- Clear cart option

### 5. **My Bookings (bookings.html)**

- Booking history display
- Booking status (confirmed/cancelled)
- Booking details
- Cancel booking option

### 6. **Favorites (favorites.html)**

- Saved favorite hotels
- Quick access to favorites
- Remove from favorites

### 7. **Contact Page (contact.html)**

- Contact form with validation
- Company information
- Social media links
- Map integration (optional)

---

## 💾 Local Storage Implementation

### Data Structures:

```javascript
// Cart
cart = [
  {
    id: 1,
    name: "Grand Palace Hotel",
    price: 15000,
    addedDate: "2024-01-01T00:00:00.000Z",
    quantity: 1
  }
]

// Favorites
favorites = [1, 3, 5]

// Bookings
bookings = [
  {
    id: 1234567890,
    hotel: {...},
    checkIn: "2024-01-01",
    checkOut: "2024-01-03",
    nights: 2,
    guests: 2,
    guestName: "John Doe",
    guestEmail: "john@example.com",
    guestPhone: "+7 123 456 7890",
    totalPrice: 30000,
    bookingDate: "2024-01-01T00:00:00.000Z",
    status: "confirmed"
  }
]

// Theme
theme = "dark" or "light"
```

---

## 🔧 Customization Guide

### Update Hotel Data:

Edit `data.js` to add/modify hotels:

```javascript
{
    id: 7,
    name: "Your Hotel Name",
    location: "City, Country",
    price: 10000,
    rating: 4.5,
    image: "your-image-url",
    amenities: ["WiFi", "Pool"],
    description: "Your description"
}
```

### Change Color Scheme:

Edit `styles.css` root variables:

```css
:root {
  --primary-color: #your-color;
  --secondary-color: #your-color;
}
```

### Add Weather API Key:

In `main.js`, replace:

```javascript
const API_KEY = "YOUR_API_KEY";
```

Get free key at: https://openweathermap.org/api

---

## ✅ Testing Checklist

- [ ] All 7 pages load correctly
- [ ] Navigation works between all pages
- [ ] Dark/Light mode toggle works
- [ ] Add to cart functionality works
- [ ] Cart persists after page reload
- [ ] Favorites toggle works
- [ ] Favorites persist after page reload
- [ ] Booking form validates correctly
- [ ] Bookings are saved to Local Storage
- [ ] Filters work on browse page
- [ ] Responsive on mobile devices
- [ ] Responsive on tablet devices
- [ ] No console errors
- [ ] All buttons have proper functionality

---

## 📝 Form Validation

### Booking Form Validation:

- ✅ All fields required
- ✅ Email format validation
- ✅ Phone number format validation
- ✅ Date validation (check-out > check-in)
- ✅ Minimum date set to today

### Contact Form Validation:

- ✅ Name required (min 2 characters)
- ✅ Email format validation
- ✅ Message required (min 10 characters)

---

## 📊 Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

---

## 🎓 Learning Outcomes Demonstrated

1. ✅ HTML5 semantic markup
2. ✅ CSS3 advanced styling (Flexbox, Grid, Animations)
3. ✅ Bootstrap responsive framework
4. ✅ JavaScript ES6+ features
5. ✅ DOM manipulation
6. ✅ Event handling
7. ✅ Local Storage API
8. ✅ Form validation
9. ✅ JSON data handling
10. ✅ AJAX/Fetch API
11. ✅ jQuery library usage
12. ✅ Responsive web design principles

---

## 🔗 Resources Used

- Bootstrap Documentation: https://getbootstrap.com/
- Font Awesome Icons: https://fontawesome.com/
- jQuery Documentation: https://jquery.com/
- MDN Web Docs: https://developer.mozilla.org/
- OpenWeatherMap API: https://openweathermap.org/

---

## 📞 Support

For questions or issues:

- Email: info@luxstay.com
- GitHub Issues: [Your Repository Issues Page]

---

## 📄 License

This project is created for educational purposes as part of the Final Project for Astana IT University.

---

## 👤 Author

**Bakytzhan Jangazy**

- Group: [SE-2431]
- Email: [bakitzh082006@gmail.com]
- GitHub: [[Your GitHub Profile](https://github.com/dzhangazy)]

---

**Good luck with your project defense! 🎉**
