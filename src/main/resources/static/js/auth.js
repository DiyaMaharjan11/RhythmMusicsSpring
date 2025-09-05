// Authentication JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    // Predefined admin credentials (for demo purposes)
    const adminCredentials = {
        email: 'admin@rhythmmusic.np',
        password: 'admin123',
        userType: 'admin'
    };

    // Demo users for testing
    const demoUsers = [
        {
            email: 'student@example.com',
            password: 'student123',
            userType: 'student',
            fullName: 'John Doe'
        },
        {
            email: 'teacher@example.com',
            password: 'teacher123',
            userType: 'teacher',
            fullName: 'Sarah Johnson'
        },
        {
            email: 'user@example.com',
            password: 'user123',
            userType: 'user',
            fullName: 'Mike Wilson'
        }
    ];

    // Login form handling
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleLogin();
        });
    }

    // Signup form handling
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleSignup();
        });
    }

    function handleLogin() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const userType = document.getElementById('userType').value;

        // Clear previous error messages
        clearErrorMessages();

        // Validation
        if (!email || !password || !userType) {
            showError('Please fill in all fields');
            return;
        }

        if (!validateEmail(email)) {
            showError('Please enter a valid email address');
            return;
        }

        // Show loading state
        const submitButton = loginForm.querySelector('button[type="submit"]');
        submitButton.classList.add('loading');
        submitButton.disabled = true;

        // Simulate API call delay
        setTimeout(() => {
            let loginSuccess = false;
            let userData = null;

            // Check admin credentials
            if (userType === 'admin') {
                if (email === adminCredentials.email && password === adminCredentials.password) {
                    loginSuccess = true;
                    userData = {
                        email: email,
                        userType: 'admin',
                        fullName: 'Admin User'
                    };
                } else {
                    showError('Invalid admin credentials. Access denied.');
                    submitButton.classList.remove('loading');
                    submitButton.disabled = false;
                    return;
                }
            } else {
                // Check demo users
                const user = demoUsers.find(u => 
                    u.email === email && 
                    u.password === password && 
                    u.userType === userType
                );

                if (user) {
                    loginSuccess = true;
                    userData = user;
                }
            }

            if (loginSuccess) {
                // Store user data
                localStorage.setItem('rhythmUser', JSON.stringify(userData));
                localStorage.setItem('isLoggedIn', 'true');
                
                showSuccess('Login successful! Redirecting...');
                
                // Redirect based on user type
                setTimeout(() => {
                    if (userData.userType === 'admin') {
                        window.location.href = 'admin-dashboard.html';
                    } else {
                        window.location.href = 'dashboard.html';
                    }
                }, 1500);
            } else {
                showError('Invalid credentials. Please try again.');
                submitButton.classList.remove('loading');
                submitButton.disabled = false;
            }
        }, 1500);
    }

    function handleSignup() {
        const fullName = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const userType = document.getElementById('userType').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const termsAccepted = document.getElementById('terms').checked;

        // Clear previous error messages
        clearErrorMessages();

        // Validation
        if (!fullName || !email || !phone || !userType || !password || !confirmPassword) {
            showError('Please fill in all fields');
            return;
        }

        if (!validateEmail(email)) {
            showError('Please enter a valid email address');
            return;
        }

        if (!validatePhone(phone)) {
            showError('Please enter a valid phone number');
            return;
        }

        if (password.length < 6) {
            showError('Password must be at least 6 characters long');
            return;
        }

        if (password !== confirmPassword) {
            showError('Passwords do not match');
            return;
        }

        if (!termsAccepted) {
            showError('Please accept the Terms of Service and Privacy Policy');
            return;
        }

        // Prevent admin signup
        if (userType === 'admin') {
            showError('Admin accounts cannot be created through signup');
            return;
        }

        // Show loading state
        const submitButton = signupForm.querySelector('button[type="submit"]');
        submitButton.classList.add('loading');
        submitButton.disabled = true;

        // Simulate API call delay
        setTimeout(() => {
            // Check if user already exists (demo check)
            const existingUser = demoUsers.find(u => u.email === email);
            if (existingUser) {
                showError('An account with this email already exists');
                submitButton.classList.remove('loading');
                submitButton.disabled = false;
                return;
            }

            // Create new user data
            const userData = {
                fullName: fullName,
                email: email,
                phone: phone,
                userType: userType,
                joinDate: new Date().toISOString()
            };

            // Store user data
            localStorage.setItem('rhythmUser', JSON.stringify(userData));
            localStorage.setItem('isLoggedIn', 'true');
            
            showSuccess('Account created successfully! Redirecting...');
            
            // Redirect to dashboard
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);
        }, 2000);
    }

    function showError(message) {
        clearErrorMessages();
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        
        const form = document.querySelector('.auth-form');
        form.insertBefore(errorDiv, form.firstChild);

        // Auto remove after 5 seconds
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }

    function showSuccess(message) {
        clearErrorMessages();
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = message;
        
        const form = document.querySelector('.auth-form');
        form.insertBefore(successDiv, form.firstChild);
    }

    function clearErrorMessages() {
        document.querySelectorAll('.error-message, .success-message').forEach(el => {
            el.remove();
        });
    }

    // Show demo credentials info
    if (window.location.pathname.includes('login.html')) {
        setTimeout(() => {
            const demoInfo = document.createElement('div');
            demoInfo.style.cssText = `
                position: fixed;
                bottom: 20px;
                left: 20px;
                background: white;
                padding: 1rem;
                border-radius: 0.5rem;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                border-left: 4px solid var(--primary-color);
                max-width: 300px;
                font-size: 0.875rem;
                z-index: 1000;
            `;
            
            demoInfo.innerHTML = `
                <h4 style="margin: 0 0 0.5rem 0; color: var(--primary-color);">Demo Accounts</h4>
                <p style="margin: 0.25rem 0;"><strong>Admin:</strong> admin@rhythmmusic.np / admin123</p>
                <p style="margin: 0.25rem 0;"><strong>Student:</strong> student@example.com / student123</p>
                <p style="margin: 0.25rem 0;"><strong>Teacher:</strong> teacher@example.com / teacher123</p>
                <p style="margin: 0.25rem 0;"><strong>User:</strong> user@example.com / user123</p>
            `;
            
            document.body.appendChild(demoInfo);
            
            // Auto hide after 10 seconds
            setTimeout(() => {
                demoInfo.style.opacity = '0';
                demoInfo.style.transition = 'opacity 0.3s ease';
                setTimeout(() => demoInfo.remove(), 300);
            }, 10000);
        }, 2000);
    }
});

// Utility functions
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone) {
    return /^\+?[\d\s\-\(\)]{10,}$/.test(phone);
}

// Check if user is already logged in and redirect accordingly
function checkAuthState() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userData = JSON.parse(localStorage.getItem('rhythmUser') || '{}');
    
    if (isLoggedIn === 'true' && userData.email) {
        // User is logged in, redirect to appropriate dashboard
        if (window.location.pathname.includes('login.html') || window.location.pathname.includes('signup.html')) {
            if (userData.userType === 'admin') {
                window.location.href = 'admin-dashboard.html';
            } else {
                window.location.href = 'dashboard.html';
            }
        }
    }
}

// Call auth check on page load
checkAuthState();