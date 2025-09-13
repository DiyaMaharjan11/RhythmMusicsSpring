// Admin Dashboard JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check admin authentication
    checkAdminAuth();
    
    // Initialize admin dashboard
    initializeAdminDashboard();
    
    // Initialize sidebar navigation
    initializeAdminNavigation();
    
    // Load admin data
    loadAdminData();
});

function checkAdminAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userData = JSON.parse(localStorage.getItem('rhythmUser') || '{}');
    
    if (isLoggedIn !== 'true' || userData.userType !== 'admin') {
        window.location.href = 'login.html';
        return;
    }
}

function initializeAdminDashboard() {
    // Show dashboard section by default
    showAdminSection('dashboard');
    
    // Initialize stats animation
    setTimeout(() => {
        animateAdminStats();
    }, 500);
    
    // Load admin dashboard data
    loadAdminDashboardData();
}

function initializeAdminNavigation() {
    const menuItems = document.querySelectorAll('.admin-sidebar .menu-item');
    
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
            
            showAdminSection(sectionId);
        });
    });
}

function showAdminSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.admin-section').forEach(section => {
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
    
    // Load section-specific data
    loadSectionData(sectionId);
}

function loadAdminData() {
    const userData = JSON.parse(localStorage.getItem('rhythmUser') || '{}');
    
    // Update admin name
    const userNameElement = document.querySelector('.user-name');
    if (userNameElement) {
        userNameElement.textContent = userData.fullName?.split(' ')[0] || 'Admin';
    }
}

function loadAdminDashboardData() {
    // Simulate loading dashboard stats
    const stats = [
        { selector: '.admin-stats .stat-card:nth-child(1) .stat-info h3', value: 1234 },
        { selector: '.admin-stats .stat-card:nth-child(2) .stat-info h3', value: 856 },
        { selector: '.admin-stats .stat-card:nth-child(3) .stat-info h3', value: 47 },
        { selector: '.admin-stats .stat-card:nth-child(4) .stat-info h3', value: 23 }
    ];
    
    stats.forEach(stat => {
        const element = document.querySelector(stat.selector);
        if (element) {
            animateCounter(element, stat.value);
        }
    });
    
    // Animate instrument popularity bars
    setTimeout(() => {
        animateInstrumentBars();
    }, 1000);
}

function loadSectionData(sectionId) {
    switch (sectionId) {
        case 'users':
            loadUsersData();
            break;
        case 'teachers':
            loadTeachersData();
            break;
        case 'students':
            loadStudentsData();
            break;
        case 'courses':
            loadCoursesData();
            break;
        case 'instruments':
            loadInstrumentsData();
            break;
        case 'reports':
            loadReportsData();
            break;
    }
}

function animateAdminStats() {
    const statCards = document.querySelectorAll('.admin-stats .stat-card');
    
    statCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 50);
        }, index * 100);
    });
}

function animateCounter(element, target) {
    let count = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        count += increment;
        if (count >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(count).toLocaleString();
        }
    }, 40);
}

function animateInstrumentBars() {
    const bars = document.querySelectorAll('.stat-fill');
    
    bars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.transition = 'width 1.5s ease-out';
            bar.style.width = width;
        }, 100);
    });
}

function loadUsersData() {
    // Simulate loading users data
    showNotification('Users data loaded');
}

function loadTeachersData() {
    // Simulate loading teachers data
    showNotification('Teachers data loaded');
}

function loadStudentsData() {
    // Simulate loading students data  
    showNotification('Students data loaded');
}

function loadCoursesData() {
    // Simulate loading courses data
    showNotification('Courses data loaded');
}

function loadInstrumentsData() {
    // Simulate loading instruments data
    showNotification('Instruments data loaded');
}

function loadReportsData() {
    // Simulate loading reports data
    showNotification('Reports data loaded');
    
    // Animate chart bars
    setTimeout(() => {
        const chartBars = document.querySelectorAll('.chart-bar');
        chartBars.forEach((bar, index) => {
            setTimeout(() => {
                bar.style.transition = 'height 0.8s ease-out';
                const height = bar.style.height;
                bar.style.height = '0%';
                setTimeout(() => {
                    bar.style.height = height;
                }, 100);
            }, index * 200);
        });
    }, 500);
}

// Admin action functions
function addNewUser() {
    showNotification('Add new user dialog would open here', 'warning');
}

function editUser(userId) {
    showNotification(`Editing user ${userId}`, 'warning');
}

function deleteUser(userId) {
    if (confirm('Are you sure you want to delete this user?')) {
        showNotification(`User ${userId} deleted`, 'success');
    }
}

function addTeacher() {
    showNotification('Add teacher dialog would open here', 'warning');
}

function editTeacher(teacherId) {
    showNotification(`Editing teacher ${teacherId}`, 'warning');
}

function viewTeacherProfile(teacherId) {
    showNotification(`Viewing teacher ${teacherId} profile`, 'warning');
}

function createCourse() {
    showNotification('Create course dialog would open here', 'warning');
}

function editCourse(courseId) {
    showNotification(`Editing course ${courseId}`, 'warning');
}

function viewCourse(courseId) {
    showNotification(`Viewing course ${courseId}`, 'warning');
}

function addInstrument() {
    showNotification('Add instrument dialog would open here', 'warning');
}

function manageInstrument(instrumentId) {
    showNotification(`Managing instrument ${instrumentId}`, 'warning');
}

// Filter and search functions
function filterUsers(filterType) {
    showNotification(`Filtering users by: ${filterType}`);
}

function searchUsers(query) {
    showNotification(`Searching users: ${query}`);
}

function logout() {
    // Clear user data
    localStorage.removeItem('rhythmUser');
    localStorage.removeItem('isLoggedIn');
    
    // Show logout notification
    showNotification('Admin logged out successfully');
    
    // Redirect to home page
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

// Utility functions
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

// Initialize filters and search
document.addEventListener('change', function(e) {
    if (e.target.classList.contains('filter-select')) {
        filterUsers(e.target.value);
    }
});

document.addEventListener('input', function(e) {
    if (e.target.classList.contains('search-input')) {
        const query = e.target.value;
        if (query.length > 2 || query.length === 0) {
            searchUsers(query);
        }
    }
});

// Handle hash navigation for admin
window.addEventListener('hashchange', function() {
    const hash = window.location.hash.substring(1);
    if (hash) {
        showAdminSection(hash);
        
        // Update active menu item
        document.querySelectorAll('.admin-sidebar .menu-item').forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${hash}`) {
                item.classList.add('active');
            }
        });
    }
});

// Table sorting (simple example)
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'TH' && e.target.closest('.admin-table')) {
        const table = e.target.closest('.admin-table');
        const tbody = table.querySelector('tbody');
        const rows = Array.from(tbody.querySelectorAll('tr'));
        const columnIndex = Array.from(e.target.parentNode.children).indexOf(e.target);
        
        rows.sort((a, b) => {
            const aText = a.children[columnIndex].textContent.trim();
            const bText = b.children[columnIndex].textContent.trim();
            return aText.localeCompare(bText);
        });
        
        rows.forEach(row => tbody.appendChild(row));
        
        showNotification('Table sorted');
    }
});