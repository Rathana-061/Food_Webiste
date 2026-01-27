// User Authentication System
class Auth {
    constructor() {
        this.currentUser = null;
        this.users = this.loadUsers();
        this.initializeAuth();
    }

    // Load users from localStorage
    loadUsers() {
        const users = localStorage.getItem('foodhub_users');
        return users ? JSON.parse(users) : [];
    }

    // Save users to localStorage
    saveUsers() {
        localStorage.setItem('foodhub_users', JSON.stringify(this.users));
    }

    // Initialize authentication state
    initializeAuth() {
        const savedUser = localStorage.getItem('foodhub_current_user');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            this.updateUI();
        }
    }

    // Register new user
    register(userData) {
        const { name, email, password } = userData;
        
        // Check if user already exists
        if (this.users.find(user => user.email === email)) {
            return { success: false, message: 'User with this email already exists' };
        }

        // Create new user
        const newUser = {
            id: Date.now().toString(),
            name,
            email,
            password: this.hashPassword(password),
            avatar: `https://i.pravatar.cc/150?u=${email}`,
            phone: '',
            address: '',
            createdAt: new Date().toISOString()
        };

        this.users.push(newUser);
        this.saveUsers();
        
        return { success: true, message: 'Registration successful!' };
    }

    // Login user
    login(email, password, remember = false) {
        const user = this.users.find(u => u.email === email);
        
        if (!user) {
            return { success: false, message: 'User not found' };
        }

        if (user.password !== this.hashPassword(password)) {
            return { success: false, message: 'Invalid password' };
        }

        this.currentUser = { ...user };
        delete this.currentUser.password; // Remove password from current user object
        
        if (remember) {
            localStorage.setItem('foodhub_current_user', JSON.stringify(this.currentUser));
        } else {
            sessionStorage.setItem('foodhub_current_user', JSON.stringify(this.currentUser));
        }

        this.updateUI();
        return { success: true, message: 'Login successful!' };
    }

    // Logout user
    logout() {
        this.currentUser = null;
        localStorage.removeItem('foodhub_current_user');
        sessionStorage.removeItem('foodhub_current_user');
        this.updateUI();
        cart.showNotification('Logged out successfully!');
    }

    // Update user profile
    updateProfile(userData) {
        if (!this.currentUser) {
            return { success: false, message: 'No user logged in' };
        }

        const userIndex = this.users.findIndex(u => u.id === this.currentUser.id);
        if (userIndex === -1) {
            return { success: false, message: 'User not found' };
        }

        // Update user data
        this.users[userIndex] = { ...this.users[userIndex], ...userData };
        this.currentUser = { ...this.users[userIndex] };
        delete this.currentUser.password;

        // Save to storage
        if (localStorage.getItem('foodhub_current_user')) {
            localStorage.setItem('foodhub_current_user', JSON.stringify(this.currentUser));
        } else {
            sessionStorage.setItem('foodhub_current_user', JSON.stringify(this.currentUser));
        }

        this.saveUsers();
        this.updateUI();
        return { success: true, message: 'Profile updated successfully!' };
    }

    // Simple password hashing (in production, use proper hashing)
    hashPassword(password) {
        return btoa(password + 'foodhub_salt');
    }

    // Update UI based on auth state
    updateUI() {
        const authButtons = document.getElementById('authButtons');
        const userProfile = document.getElementById('userProfile');
        const userName = document.getElementById('userName');
        const userAvatar = document.getElementById('userAvatar');

        if (this.currentUser) {
            // Show user profile, hide auth buttons
            if (authButtons) authButtons.style.display = 'none';
            if (userProfile) userProfile.style.display = 'flex';
            if (userName) userName.textContent = this.currentUser.name;
            if (userAvatar) userAvatar.src = this.currentUser.avatar;
        } else {
            // Show auth buttons, hide user profile
            if (authButtons) authButtons.style.display = 'flex';
            if (userProfile) userProfile.style.display = 'none';
        }
    }

    // Get current user
    getCurrentUser() {
        return this.currentUser;
    }

    // Check if user is logged in
    isLoggedIn() {
        return this.currentUser !== null;
    }
}

// Initialize auth system
const auth = new Auth();

// Modal functions
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

// Form handlers
document.addEventListener('DOMContentLoaded', function() {
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            const rememberMe = document.getElementById('rememberMe').checked;
            
            const result = auth.login(email, password, rememberMe);
            
            if (result.success) {
                cart.showNotification(result.message);
                closeModal('loginModal');
                loginForm.reset();
            } else {
                cart.showNotification(result.message, 'error');
            }
        });
    }

    // Register form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('registerName').value;
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const agreeTerms = document.getElementById('agreeTerms').checked;
            
            // Validation
            if (!name || !email || !password || !confirmPassword) {
                cart.showNotification('Please fill in all fields', 'error');
                return;
            }
            
            if (password !== confirmPassword) {
                cart.showNotification('Passwords do not match', 'error');
                return;
            }
            
            if (password.length < 6) {
                cart.showNotification('Password must be at least 6 characters', 'error');
                return;
            }
            
            if (!agreeTerms) {
                cart.showNotification('Please agree to the terms and conditions', 'error');
                return;
            }
            
            const result = auth.register({ name, email, password });
            
            if (result.success) {
                cart.showNotification(result.message);
                closeModal('registerModal');
                registerForm.reset();
                
                // Auto login after registration
                setTimeout(() => {
                    auth.login(email, password, true);
                    cart.showNotification('Welcome to FoodHub!');
                }, 1000);
            } else {
                cart.showNotification(result.message, 'error');
            }
        });
    }

    // Profile form
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('profileName').value;
            const email = document.getElementById('profileEmail').value;
            const phone = document.getElementById('profilePhone').value;
            const address = document.getElementById('profileAddress').value;
            
            const result = auth.updateProfile({ name, email, phone, address });
            
            if (result.success) {
                cart.showNotification(result.message);
                closeModal('profileModal');
            } else {
                cart.showNotification(result.message, 'error');
            }
        });
    }

    // Close modals when clicking outside
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Close modals with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const activeModals = document.querySelectorAll('.modal.active');
            activeModals.forEach(modal => {
                modal.classList.remove('active');
            });
            document.body.style.overflow = 'auto';
        }
    });
});

// Export auth for use in other files
window.auth = auth;
