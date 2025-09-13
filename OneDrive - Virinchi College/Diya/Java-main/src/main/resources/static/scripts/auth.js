// Authentication functionality for students

document.addEventListener('DOMContentLoaded', () => {
    // Student Login Form
    const studentLoginForm = document.getElementById('studentLoginForm');
    if (studentLoginForm) {
        studentLoginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Simulate authentication
            if (email && password) {
                // Store login state
                localStorage.setItem('userLoggedIn', 'true');
                localStorage.setItem('userEmail', email);
                localStorage.setItem('userName', email.split('@')[0]);
                
                // Show success message
                showMessage('Login successful! Redirecting to dashboard...', 'success');
                
                // Redirect to dashboard
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1500);
            } else {
                showMessage('Please fill in all fields', 'error');
            }
        });
    }

    // Student Signup Form
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('signup-name').value;
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            const terms = document.querySelector('input[name="terms"]').checked;
            
            // Validation
            if (!name || !email || !password || !confirmPassword) {
                showMessage('Please fill in all required fields', 'error');
                return;
            }
            
            if (password !== confirmPassword) {
                showMessage('Passwords do not match', 'error');
                return;
            }
            
            if (password.length < 6) {
                showMessage('Password must be at least 6 characters long', 'error');
                return;
            }
            
            if (!terms) {
                showMessage('Please accept the terms of service', 'error');
                return;
            }
            
            // Simulate account creation
            localStorage.setItem('userLoggedIn', 'true');
            localStorage.setItem('userEmail', email);
            localStorage.setItem('userName', name);
            
            showMessage('Account created successfully! Redirecting to dashboard...', 'success');
            
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);
        });
    }

    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('contact-name').value;
            const email = document.getElementById('contact-email').value;
            const subject = document.getElementById('contact-subject').value;
            const message = document.getElementById('contact-message').value;
            
            if (!name || !email || !subject || !message) {
                showMessage('Please fill in all fields', 'error');
                return;
            }
            
            // Simulate sending message
            showMessage('Message sent successfully! We will get back to you soon.', 'success');
            contactForm.reset();
        });
    }

    function showMessage(message, type) {
        // Remove existing messages
        const existingMessages = document.querySelectorAll('.message');
        existingMessages.forEach(msg => msg.remove());
        
        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = `message message-${type}`;
        messageDiv.textContent = message;
        
        // Insert at the top of the form container
        const formContainer = document.querySelector('.form-container');
        if (formContainer) {
            formContainer.insertBefore(messageDiv, formContainer.firstChild);
            
            // Auto remove after 5 seconds
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.remove();
                }
            }, 5000);
        }
    }
});

// Check authentication status
function checkAuth() {
    return localStorage.getItem('userLoggedIn') === 'true';
}

// Get user info
function getUserInfo() {
    return {
        email: localStorage.getItem('userEmail'),
        name: localStorage.getItem('userName')
    };
}

// Logout function
function logout() {
    localStorage.removeItem('userLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('teacherLoggedIn');
    localStorage.removeItem('adminLoggedIn');
    window.location.href = 'index.html';
}

// Protect dashboard pages
function protectPage(requiredRole = 'user') {
    const currentPage = window.location.pathname.split('/').pop();
    const isDashboard = currentPage.includes('dashboard');
    
    if (isDashboard) {
        let isAuthorized = false;
        
        switch (requiredRole) {
            case 'user':
                isAuthorized = localStorage.getItem('userLoggedIn') === 'true';
                break;
            case 'teacher':
                isAuthorized = localStorage.getItem('teacherLoggedIn') === 'true';
                break;
            case 'admin':
                isAuthorized = localStorage.getItem('adminLoggedIn') === 'true';
                break;
        }
        
        if (!isAuthorized) {
            alert('Access denied. Please login first.');
            window.location.href = 'index.html';
        }
    }
}

// Initialize authentication check
document.addEventListener('DOMContentLoaded', () => {
    // Determine required role based on page
    const currentPage = window.location.pathname.split('/').pop();
    
    if (currentPage === 'dashboard.html') {
        protectPage('user');
    } else if (currentPage === 'teacher-dashboard.html') {
        protectPage('teacher');
    } else if (currentPage === 'admin-dashboard.html') {
        protectPage('admin');
    }
});