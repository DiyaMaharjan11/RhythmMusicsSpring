// Dashboard JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    checkAuth();
    
    // Initialize dashboard
    initializeDashboard();
    
    // Initialize sidebar navigation
    initializeSidebarNavigation();
    
    // Load user data
    loadUserData();
});

function checkAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userData = JSON.parse(localStorage.getItem('rhythmUser') || '{}');
    
    if (isLoggedIn !== 'true' || !userData.email) {
        window.location.href = 'login.html';
        return;
    }
    
    // Check if admin trying to access regular dashboard
    if (userData.userType === 'admin' && !window.location.pathname.includes('admin-dashboard.html')) {
        window.location.href = 'admin-dashboard.html';
        return;
    }
    
    // Check if regular user trying to access admin dashboard
    if (userData.userType !== 'admin' && window.location.pathname.includes('admin-dashboard.html')) {
        window.location.href = 'dashboard.html';
        return;
    }
}

function initializeDashboard() {
    // Show overview section by default
    showSection('overview');
    
    // Initialize progress bars with animation
    setTimeout(() => {
        animateProgressBars();
    }, 500);
    
    // Update greeting based on time
    updateGreeting();
    
    // Load dashboard stats
    loadDashboardStats();
}

function initializeSidebarNavigation() {
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all items
            menuItems.forEach(mi => mi.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Get section to show
            const href = this.getAttribute('href');
            const sectionId = href.substring(1); // Remove #
            
            showSection(sectionId);
        });
    });
}

function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        
        // Animate section entrance
        targetSection.style.opacity = '0';
        targetSection.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            targetSection.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            targetSection.style.opacity = '1';
            targetSection.style.transform = 'translateY(0)';
        }, 10);
    }
    
    // Update URL hash without scrolling
    history.replaceState(null, null, `#${sectionId}`);
}

function loadUserData() {
    const userData = JSON.parse(localStorage.getItem('rhythmUser') || '{}');
    
    // Update user name displays
    const userNameElements = document.querySelectorAll('#userName, #dashboardUserName');
    userNameElements.forEach(element => {
        if (element) {
            const name = userData.fullName ? userData.fullName.split(' ')[0] : userData.userType || 'User';
            element.textContent = name;
        }
    });
    
    // Update user type specific content
    updateUserTypeContent(userData.userType);
}

function updateUserTypeContent(userType) {
    // Customize content based on user type
    const roleSpecificContent = {
        'student': {
            greeting: 'Continue your musical journey',
            primaryColor: 'var(--primary-color)'
        },
        'teacher': {
            greeting: 'Manage your students and classes',
            primaryColor: 'var(--secondary-color)'
        },
        'user': {
            greeting: 'Explore musical opportunities',
            primaryColor: 'var(--accent-color)'
        }
    };
    
    const content = roleSpecificContent[userType] || roleSpecificContent['user'];
    
    // Update greeting
    const greetingElement = document.querySelector('.dashboard-header p');
    if (greetingElement) {
        greetingElement.textContent = content.greeting;
    }
}

function updateGreeting() {
    const hour = new Date().getHours();
    let greeting = 'Good morning';
    
    if (hour >= 12 && hour < 18) {
        greeting = 'Good afternoon';
    } else if (hour >= 18) {
        greeting = 'Good evening';
    }
    
    const userData = JSON.parse(localStorage.getItem('rhythmUser') || '{}');
    const name = userData.fullName ? userData.fullName.split(' ')[0] : 'there';
    
    const headerElement = document.querySelector('.dashboard-header h1');
    if (headerElement) {
        headerElement.innerHTML = `${greeting}, <span id="dashboardUserName">${name}</span>!`;
    }
}

function loadDashboardStats() {
    // Simulate loading stats with animation
    const statValues = document.querySelectorAll('.stat-info h3');
    
    statValues.forEach(stat => {
        const target = parseInt(stat.textContent);
        animateCounter(stat, target);
    });
}

function animateCounter(element, target) {
    let count = 0;
    const increment = target / 30;
    const timer = setInterval(() => {
        count += increment;
        if (count >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(count);
        }
    }, 50);
}

function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.transition = 'width 1s ease-out';
            bar.style.width = width;
        }, 100);
    });
    
    // Animate skill bars
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.transition = 'width 1.2s ease-out';
            bar.style.width = width;
        }, 200);
    });
}

function logout() {
    // Clear user data
    localStorage.removeItem('rhythmUser');
    localStorage.removeItem('isLoggedIn');
    
    // Show logout notification
    showNotification('Logged out successfully');
    
    // Redirect to home page
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

// Course interaction functions
function continueCourse(courseId) {
    showNotification(`Continuing ${courseId} course...`);
    // Add course continuation logic here
}

function startCourse(courseId) {
    showNotification(`Starting ${courseId} course...`);
    // Add course start logic here
}

// Schedule navigation
function navigateSchedule(direction) {
    const scheduleHeader = document.querySelector('.schedule-header h3');
    if (scheduleHeader) {
        const currentText = scheduleHeader.textContent;
        if (direction === 'next') {
            scheduleHeader.textContent = 'Next Week';
        } else {
            scheduleHeader.textContent = 'Previous Week';
        }
        
        // Reset to current week after 2 seconds
        setTimeout(() => {
            scheduleHeader.textContent = 'This Week';
        }, 2000);
    }
    
    showNotification(`Navigating to ${direction} week`);
}

// Utility function for notifications
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        color: white;
        font-weight: 500;
        z-index: 9999;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    } else if (type === 'error') {
        notification.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
    } else if (type === 'warning') {
        notification.style.background = 'linear-gradient(135deg, #f59e0b, #d97706)';
    }
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Handle hash navigation
window.addEventListener('hashchange', function() {
    const hash = window.location.hash.substring(1);
    if (hash) {
        showSection(hash);
        
        // Update active menu item
        document.querySelectorAll('.menu-item').forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${hash}`) {
                item.classList.add('active');
            }
        });
    }
});

// Initialize hash navigation on load
window.addEventListener('load', function() {
    const hash = window.location.hash.substring(1);
    if (hash) {
        showSection(hash);
        
        // Update active menu item
        document.querySelectorAll('.menu-item').forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${hash}`) {
                item.classList.add('active');
            }
        });
    }
});