# FoodHub - Food Ordering Website

A modern, responsive food ordering website built with HTML, CSS, and JavaScript. This project demonstrates a complete frontend implementation with advanced features including dark mode, cart management, and form validation.

## 🚀 Features

### Core Features
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Dark/Light Mode**: Toggle between themes with persistent preference
- **Shopping Cart**: Full cart functionality with LocalStorage persistence
- **Search & Filter**: Real-time search and category filtering
- **Form Validation**: Comprehensive client-side validation
- **Order Management**: Complete checkout process with order confirmation

### Advanced Features
- **Food Rating System**: Star ratings for all food items
- **Loading Animations**: Professional loading spinners and transitions
- **Success Animations**: Order success confirmation with animations
- **Social Login**: Mock social authentication (Google, Facebook)
- **FAQ Section**: Interactive frequently asked questions
- **Contact Form**: Functional contact form with validation
- **Navigation Strategies**: Smooth scrolling and active link highlighting

## 📁 Project Structure

```
food-website/
│
├── index.html              # Home page
├── menu.html               # Menu page with search/filter
├── cart.html               # Shopping cart
├── checkout.html           # Checkout process
├── login.html              # Login/Register page
├── register.html           # Registration page
├── contact.html            # Contact page with FAQ
│
├── css/
│   └── style.css           # Complete styling with dark mode
│
├── js/
│   ├── data.js             # Food data and helper functions
│   ├── cart.js             # Cart management system
│   └── main.js             # Main application logic
│
├── images/
│   └── food/               # Food images (add your images here)
│
└── README.md               # This file
```

## 🛠️ Technologies Used

- **HTML5**: Semantic markup and modern HTML features
- **CSS3**: 
  - Flexbox and Grid layouts
  - CSS Variables for theming
  - Responsive design with media queries
  - Smooth animations and transitions
- **JavaScript (ES6+)**:
  - Modern ES6+ features
  - LocalStorage for data persistence
  - Event handling and DOM manipulation
  - Form validation
  - Modular code structure

## 📱 Pages Overview

### 1. Home Page (`index.html`)
- Hero section with call-to-action
- Featured food items
- Restaurant features
- Customer testimonials
- About section with statistics

### 2. Menu Page (`menu.html`)
- Search functionality
- Category filtering (Pizza, Burger, Drinks, Dessert, Pasta, Salad)
- Food grid with detailed cards
- Modal for food details
- Load more functionality

### 3. Cart Page (`cart.html`)
- Cart item management
- Quantity controls
- Price calculation
- Promo code support
- Recommended items

### 4. Checkout Page (`checkout.html`)
- Customer information form
- Delivery address
- Payment method selection
- Order summary
- Form validation

### 5. Login/Register (`login.html`, `register.html`)
- Tab-based interface
- Social login options
- Password visibility toggle
- Form validation
- Remember me functionality

### 6. Contact Page (`contact.html`)
- Contact information
- Interactive contact form
- Google Maps integration
- FAQ section
- Social media links

## 🎨 Design Features

### Dark Mode
- Toggle between light and dark themes
- Persistent preference using LocalStorage
- Smooth transitions between themes
- Optimized color schemes for both modes

### Responsive Design
- Mobile-first approach
- Breakpoints for tablet and desktop
- Collapsible navigation menu
- Touch-friendly interface elements

### Animations
- Loading spinners
- Hover effects
- Smooth transitions
- Success animations
- Modal animations

## 🔧 Installation & Setup

1. **Clone or download the project**
   ```bash
   git clone <repository-url>
   cd food-website
   ```

2. **Add food images**
   - Place your food images in the `images/food/` directory
   - Update image paths in `js/data.js` if needed

3. **Open the website**
   - Simply open `index.html` in your web browser
   - No server required for basic functionality

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 📋 Key Functionalities

### Cart Management
- Add items to cart with quantity selection
- Update item quantities
- Remove items from cart
- Persistent cart using LocalStorage
- Real-time price calculation

### Search & Filter
- Real-time search by food name
- Category-based filtering
- Combined search and filter functionality
- Debounced search for performance

### Form Validation
- Email format validation
- Phone number validation
- Required field checking
- Password strength validation
- Real-time error messages

### Theme System
- CSS variables for consistent theming
- Dark/light mode toggle
- Persistent theme preference
- Smooth theme transitions

## 🎯 Interactive Elements

### Navigation
- Sticky navigation bar
- Active link highlighting
- Smooth scrolling to sections
- Mobile hamburger menu
- Cart item counter

### Modals
- Food detail modal
- Order success modal
- Contact success modal
- Click outside to close
- Keyboard navigation support

### Forms
- Interactive form validation
- Password visibility toggle
- Social login buttons
- Remember me functionality
- Newsletter subscription

## 🔮 Future Enhancements

- **Backend Integration**: Connect to a real API
- **Payment Processing**: Integrate payment gateways
- **User Accounts**: Real user authentication
- **Order Tracking**: Real-time order status
- **Reviews System**: Customer reviews and ratings
- **Admin Panel**: Content management system

## 📝 Notes

- This is a frontend-only implementation
- Images are placeholders - replace with actual food photos
- Forms are validated but don't submit to a backend
- Social login buttons are mock implementations
- LocalStorage is used for data persistence

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🎓 Learning Objectives

This project demonstrates:
- Modern HTML5 semantic structure
- Advanced CSS3 techniques
- JavaScript ES6+ features
- Responsive web design
- User experience best practices
- Form validation techniques
- LocalStorage usage
- Event handling
- DOM manipulation
- Modular JavaScript architecture

Perfect for students and developers looking to build a complete, modern web application! 🍔🍕
