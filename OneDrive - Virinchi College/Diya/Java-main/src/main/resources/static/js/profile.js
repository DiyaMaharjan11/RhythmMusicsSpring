// Profile JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    checkAuth();
    
    // Initialize profile
    initializeProfile();
    
    // Load user data
    loadProfileData();
    
    // Initialize form handlers
    initializeFormHandlers();
});

function checkAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userData = JSON.parse(localStorage.getItem('rhythmUser') || '{}');
    
    if (isLoggedIn !== 'true' || !userData.email) {
        window.location.href = 'login.html';
        return;
    }
}

function initializeProfile() {
    // Show general section by default
    showProfileSection('general');
    
    // Initialize navigation
    const navItems = document.querySelectorAll('.profile-nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all items
            navItems.forEach(ni => ni.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Get section to show
            const href = this.getAttribute('href');
            const sectionId = href.substring(1); // Remove #
            
            showProfileSection(sectionId);
        });
    });
}

function showProfileSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.profile-section').forEach(section => {
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
}

function loadProfileData() {
    const userData = JSON.parse(localStorage.getItem('rhythmUser') || '{}');
    
    // Update user name in navigation
    const userNameElement = document.getElementById('userName');
    if (userNameElement) {
        const name = userData.fullName ? userData.fullName.split(' ')[0] : userData.userType || 'User';
        userNameElement.textContent = name;
    }
    
    // Update avatar initials
    const avatarInitials = document.getElementById('avatarInitials');
    if (avatarInitials && userData.fullName) {
        const names = userData.fullName.split(' ');
        const initials = names.length > 1 ? 
            (names[0][0] + names[names.length - 1][0]).toUpperCase() : 
            names[0][0].toUpperCase();
        avatarInitials.textContent = initials;
    }
    
    // Populate form fields
    populateFormFields(userData);
}

function populateFormFields(userData) {
    // General information
    if (userData.fullName) {
        const names = userData.fullName.split(' ');
        document.getElementById('firstName').value = names[0] || '';
        document.getElementById('lastName').value = names.slice(1).join(' ') || '';
    }
    
    if (userData.email) {
        document.getElementById('email').value = userData.email;
    }
    
    if (userData.phone) {
        document.getElementById('phone').value = userData.phone;
    }
    
    if (userData.userType) {
        document.getElementById('userType').value = userData.userType;
    }
    
    // Set join date
    const joinDate = userData.joinDate ? new Date(userData.joinDate) : new Date();
    document.getElementById('dateJoined').value = formatDate(joinDate);
}

function initializeFormHandlers() {
    // General form submission
    const generalForm = document.getElementById('generalForm');
    if (generalForm) {
        generalForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveGeneralInfo();
        });
    }
    
    // Password form submission
    const passwordForm = document.querySelector('.password-form');
    if (passwordForm) {
        passwordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            changePassword();
        });
    }
    
    // Preferences form
    const preferencesSection = document.getElementById('preferences');
    const savePreferencesButton = preferencesSection?.querySelector('.btn-primary');
    if (savePreferencesButton) {
        savePreferencesButton.addEventListener('click', function() {
            savePreferences();
        });
    }
}

function toggleEdit(section) {
    const form = document.getElementById(`${section}Form`);
    const inputs = form.querySelectorAll('input, select, textarea');
    const actions = document.getElementById(`${section}Actions`);
    const editButton = form.parentElement.querySelector('.section-header .btn-primary');
    
    const isEditing = !inputs[0].disabled;
    
    if (isEditing) {
        // Cancel editing
        cancelEdit(section);
    } else {
        // Enable editing
        inputs.forEach(input => {
            input.disabled = false;
        });
        actions.classList.remove('hidden');
        editButton.textContent = 'Cancel';
        editButton.classList.remove('btn-primary');
        editButton.classList.add('btn-secondary');
    }
}

function cancelEdit(section) {
    const form = document.getElementById(`${section}Form`);
    const inputs = form.querySelectorAll('input, select, textarea');
    const actions = document.getElementById(`${section}Actions`);
    const editButton = form.parentElement.querySelector('.section-header .btn');
    
    // Disable editing
    inputs.forEach(input => {
        input.disabled = true;
    });
    actions.classList.add('hidden');
    editButton.textContent = 'Edit';
    editButton.classList.remove('btn-secondary');
    editButton.classList.add('btn-primary');
    
    // Reset form values
    loadProfileData();
}

function saveGeneralInfo() {
    const formData = new FormData(document.getElementById('generalForm'));
    const userData = JSON.parse(localStorage.getItem('rhythmUser') || '{}');
    
    // Update user data
    userData.fullName = `${formData.get('firstName')} ${formData.get('lastName')}`.trim();
    userData.email = formData.get('email');
    userData.phone = formData.get('phone');
    userData.bio = formData.get('bio');
    userData.interests = formData.get('interests');
    
    // Save to localStorage
    localStorage.setItem('rhythmUser', JSON.stringify(userData));
    
    // Show success message
    showNotification('Profile updated successfully!');
    
    // Disable editing
    cancelEdit('general');
    
    // Reload profile data
    loadProfileData();
}

function changePassword() {
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmNewPassword = document.getElementById('confirmNewPassword').value;
    
    // Validation
    if (!currentPassword || !newPassword || !confirmNewPassword) {
        showNotification('Please fill in all password fields', 'error');
        return;
    }
    
    if (newPassword.length < 6) {
        showNotification('New password must be at least 6 characters long', 'error');
        return;
    }
    
    if (newPassword !== confirmNewPassword) {
        showNotification('New passwords do not match', 'error');
        return;
    }
    
    // Simulate password change
    setTimeout(() => {
        showNotification('Password changed successfully!');
        
        // Clear form
        document.querySelector('.password-form').reset();
    }, 1000);
}

function savePreferences() {
    const preferences = {
        skillLevel: document.getElementById('skillLevel').value,
        learningPace: document.getElementById('learningPace').value,
        practiceTime: document.getElementById('practiceTime').value,
        instruments: []
    };
    
    // Get selected instruments
    document.querySelectorAll('.instrument-pref input[type="checkbox"]:checked').forEach(checkbox => {
        preferences.instruments.push(checkbox.parentElement.parentElement.textContent.trim());
    });
    
    const userData = JSON.parse(localStorage.getItem('rhythmUser') || '{}');
    userData.preferences = preferences;
    
    localStorage.setItem('rhythmUser', JSON.stringify(userData));
    
    showNotification('Preferences saved successfully!');
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

// Utility functions
function formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(new Date(date));
}

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

// Email preferences toggle handling
document.addEventListener('change', function(e) {
    if (e.target.type === 'checkbox' && e.target.closest('.preference-item')) {
        const prefName = e.target.closest('.preference-item').querySelector('h4').textContent;
        const isEnabled = e.target.checked;
        
        console.log(`${prefName}: ${isEnabled ? 'enabled' : 'disabled'}`);
        // Add logic to save email preferences
    }
});