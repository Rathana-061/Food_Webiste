// Main JavaScript file for FoodHub

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize cart UI
    cart.updateCartUI();
    
    // Initialize page-specific functionality
    initializePage();
    
    // Initialize global functionality
    initializeNavigation();
    initializeThemeToggle();
    initializeModals();
}

// Initialize page-specific functionality
function initializePage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    switch(currentPage) {
        case 'index.html':
            initializeHomePage();
            break;
        case 'menu.html':
            initializeMenuPage();
            break;
        case 'cart.html':
            initializeCartPage();
            break;
        case 'checkout.html':
            initializeCheckoutPage();
            break;
        case 'login.html':
        case 'register.html':
            initializeAuthPage();
            break;
        case 'contact.html':
            initializeContactPage();
            break;
    }
}

// Initialize home page
function initializeHomePage() {
    // Render featured foods
    const featuredGrid = document.getElementById('featuredFoodGrid');
    if (featuredGrid) {
        const featuredFoods = getFeaturedFoods();
        featuredGrid.innerHTML = featuredFoods.map(food => `
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
}

// Initialize navigation
function initializeNavigation() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Dropdown menu functionality for desktop
    const dropdowns = document.querySelectorAll('.nav-dropdown');
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('.nav-link');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        if (link && menu) {
            // Mobile dropdown toggle
            link.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                    
                    // Close other dropdowns
                    dropdowns.forEach(other => {
                        if (other !== dropdown) {
                            other.classList.remove('active');
                        }
                    });
                }
            });
        }
    });

    // Quick search toggle
    const searchToggle = document.getElementById('searchToggle');
    const quickSearch = document.getElementById('quickSearch');
    
    if (searchToggle && quickSearch) {
        searchToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            quickSearch.classList.toggle('active');
            
            // Focus on input when opened
            if (quickSearch.classList.contains('active')) {
                setTimeout(() => {
                    document.getElementById('quickSearchInput').focus();
                }, 100);
            }
        });
    }

    // Close quick search when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.quick-search') && !e.target.closest('.search-toggle')) {
            quickSearch.classList.remove('active');
        }
    });

    // Quick search functionality
    const quickSearchInput = document.getElementById('quickSearchInput');
    if (quickSearchInput) {
        quickSearchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performQuickSearch();
            }
        });
    }

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation link based on scroll position
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
                navLink.classList.add('active');
            }
        });
    });
}

// Quick search function
function performQuickSearch() {
    const searchInput = document.getElementById('quickSearchInput');
    const query = searchInput.value.trim();
    
    if (query) {
        // Track search event
        trackEvent('quick_search', { query: query });
        
        // Redirect to menu page with search query
        window.location.href = `menu.html?search=${encodeURIComponent(query)}`;
    }
}

// Apply offer function
function applyOffer(code) {
    cart.showNotification(`Offer code "${code}" applied successfully!`);
    trackEvent('offer_applied', { code: code });
}

// Show delivery info
function showDeliveryInfo() {
    cart.showNotification('Free delivery on orders above $30. No minimum order required!');
}

// Show weekend deals
function showWeekendDeals() {
    const day = new Date().getDay();
    if (day === 0 || day === 6) { // Weekend
        cart.showNotification('Weekend BOGO deals are now active!');
        window.location.href = 'menu.html?category=pizza';
    } else {
        cart.showNotification('Weekend deals are only available on Saturdays and Sundays!');
    }
}

// Show order history
function showOrderHistory() {
    cart.showNotification('Order history feature coming soon!');
    trackEvent('order_history_accessed');
}

// Enhanced navigation strategies
function enhanceNavigation() {
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Alt + S for quick search
        if (e.altKey && e.key === 's') {
            e.preventDefault();
            document.getElementById('searchToggle').click();
        }
        
        // Alt + M for menu
        if (e.altKey && e.key === 'm') {
            e.preventDefault();
            window.location.href = 'menu.html';
        }
        
        // Alt + C for cart
        if (e.altKey && e.key === 'c') {
            e.preventDefault();
            window.location.href = 'cart.html';
        }
    });

    // Add breadcrumb navigation
    addBreadcrumbNavigation();
    
    // Add progress indicator
    addProgressIndicator();
}

// Breadcrumb navigation
function addBreadcrumbNavigation() {
    const path = window.location.pathname;
    const breadcrumbs = document.createElement('div');
    breadcrumbs.className = 'breadcrumb';
    
    let breadcrumbHTML = '<a href="index.html">Home</a>';
    
    if (path.includes('menu.html')) {
        breadcrumbHTML += ' > <a href="menu.html">Menu</a>';
    } else if (path.includes('about.html')) {
        breadcrumbHTML += ' > <a href="about.html">About</a>';
    } else if (path.includes('contact.html')) {
        breadcrumbHTML += ' > <a href="contact.html">Contact</a>';
    } else if (path.includes('cart.html')) {
        breadcrumbHTML += ' > <a href="cart.html">Cart</a>';
    } else if (path.includes('checkout.html')) {
        breadcrumbHTML += ' > <a href="cart.html">Cart</a> > Checkout';
    }
    
    breadcrumbs.innerHTML = breadcrumbHTML;
    
    // Insert after navbar
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.insertAdjacentElement('afterend', breadcrumbs);
    }
}

// Progress indicator for multi-step processes
function addProgressIndicator() {
    if (window.location.pathname.includes('checkout.html')) {
        const progress = document.createElement('div');
        progress.className = 'progress-indicator';
        progress.innerHTML = `
            <div class="progress-step active">
                <span class="step-number">1</span>
                <span class="step-label">Cart</span>
            </div>
            <div class="progress-step">
                <span class="step-number">2</span>
                <span class="step-label">Delivery</span>
            </div>
            <div class="progress-step">
                <span class="step-number">3</span>
                <span class="step-label">Payment</span>
            </div>
            <div class="progress-step">
                <span class="step-number">4</span>
                <span class="step-label">Confirm</span>
            </div>
        `;
        
        // Insert after navbar
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            navbar.insertAdjacentElement('afterend', progress);
        }
    }
}

// Initialize enhanced navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    enhanceNavigation();
});

// Initialize theme toggle
function initializeThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Apply saved theme
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            const isDarkMode = document.body.classList.contains('dark-mode');
            
            // Update icon
            this.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
            
            // Save theme preference
            localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        });
    }
}

// Initialize modals
function initializeModals() {
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });

    // Close modal with close button
    const closeButtons = document.querySelectorAll('.close-modal');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
            }
        });
    });

    // Close success modals
    const closeContactModal = document.getElementById('closeContactModal');
    if (closeContactModal) {
        closeContactModal.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
            }
        });
    }

    const continueShoppingBtn = document.getElementById('continueShoppingBtn');
    if (continueShoppingBtn) {
        continueShoppingBtn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
            }
            window.location.href = 'menu.html';
        });
    }

    const trackOrderBtn = document.getElementById('trackOrderBtn');
    if (trackOrderBtn) {
        trackOrderBtn.addEventListener('click', function() {
            cart.showNotification('Order tracking feature coming soon!');
        });
    }
}

// Quantity controls for modals
document.addEventListener('DOMContentLoaded', function() {
    // Quantity increase/decrease buttons
    const quantityControls = document.querySelectorAll('.quantity-controls');
    
    quantityControls.forEach(control => {
        const minusBtn = control.querySelector('.minus');
        const plusBtn = control.querySelector('.plus');
        const input = control.querySelector('input');
        
        if (minusBtn && plusBtn && input) {
            minusBtn.addEventListener('click', function() {
                const currentValue = parseInt(input.value);
                if (currentValue > 1) {
                    input.value = currentValue - 1;
                }
            });
            
            plusBtn.addEventListener('click', function() {
                const currentValue = parseInt(input.value);
                if (currentValue < 10) {
                    input.value = currentValue + 1;
                }
            });
            
            // Ensure input value stays within bounds
            input.addEventListener('change', function() {
                let value = parseInt(this.value);
                if (isNaN(value) || value < 1) {
                    this.value = 1;
                } else if (value > 10) {
                    this.value = 10;
                }
            });
        }
    });
});

// Form validation helpers
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

function validateRequired(fieldId) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(fieldId + 'Error');
    
    if (!field || !field.value.trim()) {
        if (errorElement) {
            errorElement.textContent = 'This field is required';
        }
        return false;
    }
    
    if (errorElement) {
        errorElement.textContent = '';
    }
    return true;
}

// Utility functions
function formatPrice(price) {
    return '$' + price.toFixed(2);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimization
const optimizeImages = () => {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
};

// Initialize image optimization
optimizeImages();

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // In production, you might want to send this to an error tracking service
});

// Service Worker registration for PWA (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}

// Analytics tracking (placeholder)
function trackEvent(eventName, properties) {
    // In production, this would send data to Google Analytics or similar
    console.log('Event tracked:', eventName, properties);
}

// Track page views
trackEvent('page_view', {
    page: window.location.pathname,
    title: document.title
});

// Track add to cart events
function trackAddToCart(food) {
    trackEvent('add_to_cart', {
        food_id: food.id,
        food_name: food.name,
        category: food.category,
        price: food.price
    });
}

// Track search events
function trackSearch(query) {
    trackEvent('search', {
        query: query
    });
}

// Enhanced search functionality
const enhancedSearch = debounce(function(query) {
    trackSearch(query);
    // Additional search logic can be added here
}, 300);

// Social login handlers
function handleSocialLogin(provider) {
    showLoadingSpinner();
    trackEvent('social_login_attempt', { provider: provider });
    
    // Simulate social login
    setTimeout(() => {
        hideLoadingSpinner();
        cart.showNotification(`${provider} login successful!`);
        window.location.href = 'index.html';
    }, 2000);
}

// Add social login event listeners
document.addEventListener('DOMContentLoaded', function() {
    const socialButtons = document.querySelectorAll('.btn-social');
    socialButtons.forEach(button => {
        button.addEventListener('click', function() {
            const provider = this.textContent.trim();
            handleSocialLogin(provider);
        });
    });
});

// Notification system
class NotificationSystem {
    constructor() {
        this.container = this.createContainer();
    }

    createContainer() {
        const container = document.createElement('div');
        container.className = 'notification-container';
        container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 9999;
            pointer-events: none;
        `;
        document.body.appendChild(container);
        return container;
    }

    show(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            background: ${this.getBackgroundColor(type)};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            margin-bottom: 10px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            transform: translateX(100%);
            transition: transform 0.3s ease;
            pointer-events: auto;
            max-width: 300px;
        `;
        notification.textContent = message;

        this.container.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);

        // Remove after duration
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, duration);
    }

    getBackgroundColor(type) {
        const colors = {
            success: '#27ae60',
            error: '#e74c3c',
            warning: '#f39c12',
            info: '#3498db'
        };
        return colors[type] || colors.info;
    }
}

// Initialize notification system
const notifications = new NotificationSystem();

// Update cart notification to use new system
const originalShowNotification = cart.showNotification.bind(cart);
cart.showNotification = function(message, type = 'success') {
    notifications.show(message, type);
    originalShowNotification(message);
};

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K for search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.focus();
        }
    }
    
    // Escape to close modals
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (modal.style.display === 'block') {
                modal.style.display = 'none';
            }
        });
    }
});

// Print order summary
function printOrderSummary() {
    const orderSummary = document.querySelector('.order-summary');
    if (orderSummary) {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>Order Summary</title>
                    <style>
                        body { font-family: Arial, sans-serif; padding: 20px; }
                        h2 { color: #333; }
                        .order-item { margin: 10px 0; }
                        .total { font-weight: bold; margin-top: 20px; }
                    </style>
                </head>
                <body>
                    ${orderSummary.innerHTML}
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    }
}

// Add print button to checkout page
document.addEventListener('DOMContentLoaded', function() {
    const orderSummary = document.querySelector('.order-summary');
    if (orderSummary && window.location.pathname.includes('checkout.html')) {
        const printButton = document.createElement('button');
        printButton.className = 'btn btn-secondary';
        printButton.textContent = 'Print Summary';
        printButton.style.marginTop = '10px';
        printButton.onclick = printOrderSummary;
        orderSummary.appendChild(printButton);
    }
});

// Accessibility improvements
function improveAccessibility() {
    // Add ARIA labels to buttons that don't have them
    const buttons = document.querySelectorAll('button:not([aria-label])');
    buttons.forEach(button => {
        if (button.textContent.trim()) {
            button.setAttribute('aria-label', button.textContent.trim());
        }
    });

    // Add skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-color);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10000;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
}

// Initialize accessibility improvements
improveAccessibility();

// Performance monitoring
function measurePerformance() {
    if ('performance' in window) {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Page load time: ${loadTime}ms`);
        
        // Track performance metrics
        trackEvent('performance_metrics', {
            load_time: loadTime,
            page: window.location.pathname
        });
    }
}

// Measure performance after page load
window.addEventListener('load', measurePerformance);

// Modal functions for authentication
function showLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function showRegisterModal() {
    const modal = document.getElementById('registerModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function showProfile() {
    if (!auth.isLoggedIn()) {
        cart.showNotification('Please login to view your profile');
        showLoginModal();
        return;
    }

    const modal = document.getElementById('profileModal');
    if (modal) {
        // Populate profile form
        document.getElementById('profileName').value = auth.currentUser.name || '';
        document.getElementById('profileEmail').value = auth.currentUser.email || '';
        document.getElementById('profilePhone').value = auth.currentUser.phone || '';
        document.getElementById('profileAddress').value = auth.currentUser.address || '';
        document.getElementById('profileAvatar').src = auth.currentUser.avatar || 'https://i.pravatar.cc/150';
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function showSettings() {
    cart.showNotification('Settings feature coming soon!');
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function switchToRegister() {
    closeModal('loginModal');
    showRegisterModal();
}

function switchToLogin() {
    closeModal('registerModal');
    showLoginModal();
}

function forgotPassword() {
    cart.showNotification('Password reset feature coming soon!');
}

function changeAvatar() {
    const newAvatar = prompt('Enter avatar URL:', auth.currentUser.avatar);
    if (newAvatar && newAvatar.trim()) {
        auth.updateProfile({ avatar: newAvatar.trim() });
        cart.showNotification('Avatar updated successfully!');
    }
}

function logout() {
    auth.logout();
}
