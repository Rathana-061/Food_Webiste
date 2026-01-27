// Cart Management System
class Cart {
    constructor() {
        this.items = this.loadCart();
        this.deliveryFee = 2.99;
        this.taxRate = 0.08;
    }

    // Load cart from localStorage
    loadCart() {
        const savedCart = localStorage.getItem('foodhub_cart');
        return savedCart ? JSON.parse(savedCart) : [];
    }

    // Save cart to localStorage
    saveCart() {
        localStorage.setItem('foodhub_cart', JSON.stringify(this.items));
        this.updateCartUI();
    }

    // Add item to cart
    addItem(food, quantity = 1) {
        const existingItem = this.items.find(item => item.id === food.id);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({
                id: food.id,
                name: food.name,
                price: food.price,
                image: food.image,
                quantity: quantity
            });
        }
        
        this.saveCart();
        this.showNotification('Item added to cart!');
    }

    // Remove item from cart
    removeItem(id) {
        this.items = this.items.filter(item => item.id !== id);
        this.saveCart();
        this.showNotification('Item removed from cart!');
    }

    // Update item quantity
    updateQuantity(id, quantity) {
        const item = this.items.find(item => item.id === id);
        if (item) {
            if (quantity <= 0) {
                this.removeItem(id);
            } else {
                item.quantity = quantity;
                this.saveCart();
            }
        }
    }

    // Calculate subtotal
    getSubtotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // Calculate tax
    getTax() {
        return this.getSubtotal() * this.taxRate;
    }

    // Calculate total
    getTotal() {
        return this.getSubtotal() + this.deliveryFee + this.getTax();
    }

    // Get cart count
    getCartCount() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    // Clear cart
    clearCart() {
        this.items = [];
        this.saveCart();
    }

    // Update cart UI elements
    updateCartUI() {
        // Update cart count in navigation
        const cartCountElements = document.querySelectorAll('#cartCount');
        cartCountElements.forEach(element => {
            element.textContent = this.getCartCount();
        });

        // Update cart page if on cart page
        if (window.location.pathname.includes('cart.html')) {
            this.renderCartItems();
            this.renderCartSummary();
        }

        // Update checkout page if on checkout page
        if (window.location.pathname.includes('checkout.html')) {
            this.renderOrderSummary();
        }
    }

    // Render cart items on cart page
    renderCartItems() {
        const cartItemsContainer = document.getElementById('cartItems');
        const emptyCart = document.getElementById('emptyCart');

        if (this.items.length === 0) {
            cartItemsContainer.style.display = 'none';
            emptyCart.style.display = 'block';
            return;
        }

        cartItemsContainer.style.display = 'block';
        emptyCart.style.display = 'none';

        cartItemsContainer.innerHTML = this.items.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn minus" onclick="cart.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn plus" onclick="cart.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                </div>
                <div class="cart-item-actions">
                    <div class="cart-item-total">$${(item.price * item.quantity).toFixed(2)}</div>
                    <button class="remove-item" onclick="cart.removeItem(${item.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }

    // Render cart summary on cart page
    renderCartSummary() {
        const subtotal = document.getElementById('subtotal');
        const tax = document.getElementById('tax');
        const total = document.getElementById('total');

        if (subtotal) subtotal.textContent = `$${this.getSubtotal().toFixed(2)}`;
        if (tax) tax.textContent = `$${this.getTax().toFixed(2)}`;
        if (total) total.textContent = `$${this.getTotal().toFixed(2)}`;
    }

    // Render order summary on checkout page
    renderOrderSummary() {
        const orderItemsContainer = document.getElementById('orderItems');
        const subtotal = document.getElementById('subtotal');
        const tax = document.getElementById('tax');
        const total = document.getElementById('total');

        if (orderItemsContainer) {
            orderItemsContainer.innerHTML = this.items.map(item => `
                <div class="order-item">
                    <span>${item.name} x${item.quantity}</span>
                    <span>$${(item.price * item.quantity).toFixed(2)}</span>
                </div>
            `).join('');
        }

        if (subtotal) subtotal.textContent = `$${this.getSubtotal().toFixed(2)}`;
        if (tax) tax.textContent = `$${this.getTax().toFixed(2)}`;
        if (total) total.textContent = `$${this.getTotal().toFixed(2)}`;
    }

    // Show notification
    showNotification(message) {
        // Create notification element if it doesn't exist
        let notification = document.querySelector('.notification');
        if (!notification) {
            notification = document.createElement('div');
            notification.className = 'notification';
            document.body.appendChild(notification);
        }

        notification.textContent = message;
        notification.classList.add('show');

        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
}

// Initialize cart
const cart = new Cart();

// Cart functionality for menu page
function initializeMenuPage() {
    // Render food items
    renderFoodItems(getFeaturedFoods(), 'featuredFoodGrid');
    renderFoodItems(getFoodsByCategory('all'), 'menuFoodGrid');

    // Filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.dataset.category;
            const foods = getFoodsByCategory(category);
            renderFoodItems(foods, 'menuFoodGrid');
        });
    });

    // Search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.trim();
            const foods = query ? searchFoods(query) : getFoodsByCategory('all');
            renderFoodItems(foods, 'menuFoodGrid');
        });
    }

    // Load more button
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // In a real app, this would load more items from the server
            this.style.display = 'none';
        });
    }
}

// Render food items
function renderFoodItems(foods, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = foods.map(food => `
        <div class="food-card">
            <div class="food-card-image">
                <img src="${food.image}" alt="${food.name}">
                <span class="food-category">${food.category}</span>
            </div>
            <div class="food-card-content">
                <h3>${food.name}</h3>
                <div class="food-rating">
                    <div class="stars">${generateStarRating(food.rating)}</div>
                    <span>(${food.rating})</span>
                </div>
                <div class="food-price">$${food.price.toFixed(2)}</div>
                <button class="add-to-cart" onclick="addToCart(${food.id})">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

// Add to cart function
function addToCart(foodId) {
    const food = getFoodById(foodId);
    if (food) {
        cart.addItem(food);
        
        // Show loading animation
        showLoadingSpinner();
        setTimeout(() => {
            hideLoadingSpinner();
        }, 500);
    }
}

// Show food detail modal
function showFoodDetail(foodId) {
    const food = getFoodById(foodId);
    if (!food) return;

    const modal = document.getElementById('foodModal');
    const modalImage = document.getElementById('modalFoodImage');
    const modalName = document.getElementById('modalFoodName');
    const modalRating = document.getElementById('modalFoodRating');
    const modalDescription = document.getElementById('modalFoodDescription');
    const modalPrice = document.getElementById('modalFoodPrice');
    const modalQuantity = document.getElementById('modalQuantity');

    modalImage.src = food.image;
    modalImage.alt = food.name;
    modalName.textContent = food.name;
    modalRating.innerHTML = generateStarRating(food.rating);
    modalDescription.textContent = food.description;
    modalPrice.textContent = `$${food.price.toFixed(2)}`;
    modalQuantity.value = 1;

    modal.style.display = 'block';

    // Add to cart from modal
    const modalAddToCart = document.getElementById('modalAddToCart');
    modalAddToCart.onclick = function() {
        const quantity = parseInt(modalQuantity.value);
        for (let i = 0; i < quantity; i++) {
            cart.addItem(food);
        }
        modal.style.display = 'none';
    };
}

// Close modal
function closeModal() {
    const modal = document.getElementById('foodModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Loading spinner functions
function showLoadingSpinner() {
    const spinner = document.getElementById('loadingSpinner');
    if (spinner) {
        spinner.style.display = 'flex';
    }
}

function hideLoadingSpinner() {
    const spinner = document.getElementById('loadingSpinner');
    if (spinner) {
        spinner.style.display = 'none';
    }
}

// Initialize cart page
function initializeCartPage() {
    cart.renderCartItems();
    cart.renderCartSummary();

    // Render recommended items
    const recommendedGrid = document.getElementById('recommendedGrid');
    if (recommendedGrid) {
        const recommendedFoods = getRandomFoods(4);
        recommendedGrid.innerHTML = recommendedFoods.map(food => `
            <div class="food-card">
                <div class="food-card-image">
                    <img src="${food.image}" alt="${food.name}">
                    <span class="food-category">${food.category}</span>
                </div>
                <div class="food-card-content">
                    <h3>${food.name}</h3>
                    <div class="food-rating">
                        <div class="stars">${generateStarRating(food.rating)}</div>
                        <span>(${food.rating})</span>
                    </div>
                    <div class="food-price">$${food.price.toFixed(2)}</div>
                    <button class="add-to-cart" onclick="addToCart(${food.id})">
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                </div>
            </div>
        `).join('');
    }

    // Apply promo code
    const applyPromo = document.getElementById('applyPromo');
    if (applyPromo) {
        applyPromo.addEventListener('click', function() {
            const promoCode = document.getElementById('promoCode').value.trim();
            if (promoCode === 'FOOD10') {
                cart.showNotification('Promo code applied! 10% discount');
                // In a real app, you would apply the discount here
            } else {
                cart.showNotification('Invalid promo code');
            }
        });
    }
}

// Initialize checkout page
function initializeCheckoutPage() {
    cart.renderOrderSummary();

    // Checkout form submission
    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (cart.items.length === 0) {
                cart.showNotification('Your cart is empty!');
                return;
            }

            // Validate form
            if (validateCheckoutForm()) {
                // Show loading spinner
                showLoadingSpinner();

                // Simulate order processing
                setTimeout(() => {
                    hideLoadingSpinner();
                    showOrderSuccess();
                    cart.clearCart();
                }, 2000);
            }
        });
    }
}

// Validate checkout form
function validateCheckoutForm() {
    let isValid = true;
    const requiredFields = ['fullName', 'email', 'phone', 'address', 'city', 'zipCode'];
    
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        const errorElement = document.getElementById(fieldId + 'Error');
        
        if (!field.value.trim()) {
            errorElement.textContent = 'This field is required';
            isValid = false;
        } else {
            errorElement.textContent = '';
        }
    });

    // Email validation
    const email = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    if (email.value && !isValidEmail(email.value)) {
        emailError.textContent = 'Please enter a valid email address';
        isValid = false;
    }

    // Phone validation
    const phone = document.getElementById('phone');
    const phoneError = document.getElementById('phoneError');
    if (phone.value && !isValidPhone(phone.value)) {
        phoneError.textContent = 'Please enter a valid phone number';
        isValid = false;
    }

    return isValid;
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Phone validation helper
function isValidPhone(phone) {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

// Show order success modal
function showOrderSuccess() {
    const modal = document.getElementById('successModal');
    const orderNumber = document.getElementById('orderNumber');
    
    if (orderNumber) {
        orderNumber.textContent = 'FH' + Date.now().toString().slice(-8);
    }
    
    if (modal) {
        modal.style.display = 'block';
    }
}

// Initialize contact page
function initializeContactPage() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateContactForm()) {
                showLoadingSpinner();
                
                setTimeout(() => {
                    hideLoadingSpinner();
                    showContactSuccess();
                    contactForm.reset();
                }, 1500);
            }
        });
    }

    // FAQ functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
}

// Validate contact form
function validateContactForm() {
    let isValid = true;
    const requiredFields = ['name', 'email', 'subject', 'message'];
    
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        const errorElement = document.getElementById(fieldId + 'Error');
        
        if (!field.value.trim()) {
            errorElement.textContent = 'This field is required';
            isValid = false;
        } else {
            errorElement.textContent = '';
        }
    });

    // Email validation
    const email = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    if (email.value && !isValidEmail(email.value)) {
        emailError.textContent = 'Please enter a valid email address';
        isValid = false;
    }

    return isValid;
}

// Show contact success modal
function showContactSuccess() {
    const modal = document.getElementById('contactSuccessModal');
    if (modal) {
        modal.style.display = 'block';
    }
}

// Initialize auth pages
function initializeAuthPage() {
    // Tab switching
    const authTabs = document.querySelectorAll('.auth-tab');
    const authForms = document.querySelectorAll('.auth-form');
    
    authTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.dataset.tab;
            
            authTabs.forEach(t => t.classList.remove('active'));
            authForms.forEach(f => f.classList.remove('active'));
            
            this.classList.add('active');
            document.getElementById(targetTab + 'Form').classList.add('active');
        });
    });

    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateLoginForm()) {
                showLoadingSpinner();
                setTimeout(() => {
                    hideLoadingSpinner();
                    cart.showNotification('Login successful!');
                    window.location.href = 'index.html';
                }, 1500);
            }
        });
    }

    // Register form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateRegisterForm()) {
                showLoadingSpinner();
                setTimeout(() => {
                    hideLoadingSpinner();
                    cart.showNotification('Registration successful!');
                    window.location.href = 'index.html';
                }, 1500);
            }
        });
    }

    // Password toggle
    const toggleButtons = document.querySelectorAll('.toggle-password');
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });
}

// Validate login form
function validateLoginForm() {
    let isValid = true;
    const email = document.getElementById('loginEmail');
    const password = document.getElementById('loginPassword');
    
    if (!email.value.trim()) {
        document.getElementById('loginEmailError').textContent = 'Email is required';
        isValid = false;
    } else if (!isValidEmail(email.value)) {
        document.getElementById('loginEmailError').textContent = 'Please enter a valid email';
        isValid = false;
    } else {
        document.getElementById('loginEmailError').textContent = '';
    }
    
    if (!password.value) {
        document.getElementById('loginPasswordError').textContent = 'Password is required';
        isValid = false;
    } else {
        document.getElementById('loginPasswordError').textContent = '';
    }
    
    return isValid;
}

// Validate register form
function validateRegisterForm() {
    let isValid = true;
    const name = document.getElementById('registerName');
    const email = document.getElementById('registerEmail');
    const phone = document.getElementById('registerPhone');
    const password = document.getElementById('registerPassword');
    const confirmPassword = document.getElementById('confirmPassword');
    const agreeTerms = document.getElementById('agreeTerms');
    
    // Name validation
    if (!name.value.trim()) {
        document.getElementById('registerNameError').textContent = 'Name is required';
        isValid = false;
    } else {
        document.getElementById('registerNameError').textContent = '';
    }
    
    // Email validation
    if (!email.value.trim()) {
        document.getElementById('registerEmailError').textContent = 'Email is required';
        isValid = false;
    } else if (!isValidEmail(email.value)) {
        document.getElementById('registerEmailError').textContent = 'Please enter a valid email';
        isValid = false;
    } else {
        document.getElementById('registerEmailError').textContent = '';
    }
    
    // Phone validation
    if (!phone.value.trim()) {
        document.getElementById('registerPhoneError').textContent = 'Phone is required';
        isValid = false;
    } else if (!isValidPhone(phone.value)) {
        document.getElementById('registerPhoneError').textContent = 'Please enter a valid phone number';
        isValid = false;
    } else {
        document.getElementById('registerPhoneError').textContent = '';
    }
    
    // Password validation
    if (!password.value) {
        document.getElementById('registerPasswordError').textContent = 'Password is required';
        isValid = false;
    } else if (password.value.length < 6) {
        document.getElementById('registerPasswordError').textContent = 'Password must be at least 6 characters';
        isValid = false;
    } else {
        document.getElementById('registerPasswordError').textContent = '';
    }
    
    // Confirm password validation
    if (!confirmPassword.value) {
        document.getElementById('confirmPasswordError').textContent = 'Please confirm your password';
        isValid = false;
    } else if (password.value !== confirmPassword.value) {
        document.getElementById('confirmPasswordError').textContent = 'Passwords do not match';
        isValid = false;
    } else {
        document.getElementById('confirmPasswordError').textContent = '';
    }
    
    // Terms validation
    if (!agreeTerms.checked) {
        cart.showNotification('You must agree to the terms and conditions');
        isValid = false;
    }
    
    return isValid;
}
