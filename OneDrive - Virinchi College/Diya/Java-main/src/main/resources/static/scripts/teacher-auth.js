// Teacher authentication functionality

document.addEventListener('DOMContentLoaded', () => {
    const teacherLoginForm = document.getElementById('teacherLoginForm');
    
    if (teacherLoginForm) {
        teacherLoginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = document.getElementById('teacher-email').value;
            const password = document.getElementById('teacher-password').value;
            const teacherId = document.getElementById('teacher-id').value;
            
            // Basic validation
            if (!email || !password || !teacherId) {
                showMessage('Please fill in all fields', 'error');
                return;
            }
            
            // Validate teacher ID format
            if (!teacherId.match(/^TCH-\d{5}$/)) {
                showMessage('Invalid Teacher ID format. Use format: TCH-XXXXX', 'error');
                return;
            }
            
            // Simulate teacher authentication
            // In a real app, this would validate against a database
            const validTeachers = [
                { email: 'john.smith@rhythmmusics.com', id: 'TCH-00001', name: 'John Smith' },
                { email: 'sarah.johnson@rhythmmusics.com', id: 'TCH-00002', name: 'Sarah Johnson' },
                { email: 'mike.davis@rhythmmusics.com', id: 'TCH-00003', name: 'Mike Davis' }
            ];
            
            const teacher = validTeachers.find(t => t.email === email && t.id === teacherId);
            
            if (teacher) {
                // Store teacher login state
                localStorage.setItem('teacherLoggedIn', 'true');
                localStorage.setItem('teacherEmail', email);
                localStorage.setItem('teacherId', teacherId);
                localStorage.setItem('teacherName', teacher.name);
                
                showMessage('Teacher login successful! Redirecting to dashboard...', 'success');
                
                setTimeout(() => {
                    window.location.href = 'teacher-dashboard.html';
                }, 1500);
            } else {
                showMessage('Invalid credentials or teacher ID. Please check your information.', 'error');
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

// Teacher-specific functions
function getTeacherInfo() {
    return {
        email: localStorage.getItem('teacherEmail'),
        id: localStorage.getItem('teacherId'),
        name: localStorage.getItem('teacherName')
    };
}

function isTeacherLoggedIn() {
    return localStorage.getItem('teacherLoggedIn') === 'true';
}