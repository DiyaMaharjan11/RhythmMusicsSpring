// Admin authentication functionality

document.addEventListener('DOMContentLoaded', () => {
    const adminLoginForm = document.getElementById('adminLoginForm');
    
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = document.getElementById('admin-email').value;
            const password = document.getElementById('admin-password').value;
            const adminCode = document.getElementById('admin-code').value;
            const securityAnswer = document.getElementById('security-question').value;
            
            // Basic validation
            if (!email || !password || !adminCode || !securityAnswer) {
                showMessage('Please fill in all fields', 'error');
                return;
            }
            
            // Validate admin code format (6 digits)
            if (!adminCode.match(/^\d{6}$/)) {
                showMessage('Admin code must be 6 digits', 'error');
                return;
            }
            
            // Simulate admin authentication with strict validation
            const isValidAdmin = 
                email === 'admin@rhythmmusics.com' && 
                password === 'admin123' && 
                adminCode === '123456' && 
                securityAnswer.toLowerCase() === 'harmony city';
            
            if (isValidAdmin) {
                // Store admin login state
                localStorage.setItem('adminLoggedIn', 'true');
                localStorage.setItem('adminEmail', email);
                localStorage.setItem('adminLoginTime', new Date().toISOString());
                
                // Log security event
                console.log('Admin login successful:', {
                    email,
                    timestamp: new Date().toISOString(),
                    ip: 'xxx.xxx.xxx.xxx' // In real app, get actual IP
                });
                
                showMessage('Admin authentication successful! Redirecting to admin panel...', 'success');
                
                setTimeout(() => {
                    window.location.href = 'admin-dashboard.html';
                }, 1500);
            } else {
                // Log failed attempt
                console.warn('Failed admin login attempt:', {
                    email,
                    timestamp: new Date().toISOString(),
                    reason: 'Invalid credentials'
                });
                
                showMessage('Access denied. Invalid credentials or security information.', 'error');
                
                // Clear form for security
                setTimeout(() => {
                    adminLoginForm.reset();
                }, 2000);
            }
        });
    }

    function showMessage(message, type) {
        // Remove existing messages
        const existingMessages = document.querySelectorAll('.message');
        existingMessages.forEach(msg => msg.remove());
        
        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = `message message-${type}`;
        messageDiv.innerHTML = `
            <div style="display: flex; align-items: center; gap: var(--spacing-sm);">
                <span>${type === 'error' ? '🚫' : '✅'}</span>
                <span>${message}</span>
            </div>
        `;
        
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

    // Enhanced security: Clear form on page leave
    window.addEventListener('beforeunload', () => {
        if (adminLoginForm) {
            adminLoginForm.reset();
        }
    });

    // Add security warning
    const securityWarning = document.createElement('div');
    securityWarning.className = 'message message-warning';
    securityWarning.innerHTML = `
        <div style="text-align: center;">
            <strong>🔒 Security Notice</strong><br>
            This is a secure admin area. All access attempts are monitored and logged.
            Unauthorized access attempts will be reported to system administrators.
        </div>
    `;
    
    const formContainer = document.querySelector('.form-container');
    if (formContainer && window.location.pathname.includes('admin-login')) {
        formContainer.insertBefore(securityWarning, formContainer.firstChild);
    }
});

// Admin-specific functions
function getAdminInfo() {
    return {
        email: localStorage.getItem('adminEmail'),
        loginTime: localStorage.getItem('adminLoginTime')
    };
}

function isAdminLoggedIn() {
    return localStorage.getItem('adminLoggedIn') === 'true';
}

// Enhanced security check for admin access
function verifyAdminAccess() {
    const isLoggedIn = isAdminLoggedIn();
    const loginTime = localStorage.getItem('adminLoginTime');
    
    if (!isLoggedIn) {
        return false;
    }
    
    // Check if session is expired (24 hours)
    if (loginTime) {
        const loginDate = new Date(loginTime);
        const now = new Date();
        const hoursElapsed = (now - loginDate) / (1000 * 60 * 60);
        
        if (hoursElapsed > 24) {
            localStorage.removeItem('adminLoggedIn');
            localStorage.removeItem('adminEmail');
            localStorage.removeItem('adminLoginTime');
            return false;
        }
    }
    
    return true;
}

// Session management
function extendAdminSession() {
    if (isAdminLoggedIn()) {
        localStorage.setItem('adminLoginTime', new Date().toISOString());
    }
}

// Extend session on activity (every 5 minutes)
setInterval(() => {
    if (window.location.pathname.includes('admin-dashboard')) {
        extendAdminSession();
    }
}, 5 * 60 * 1000);