 // Courses page functionality

document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.category-filters .btn');
    const courseCards = document.querySelectorAll('.course-card');

    // Course filtering functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter courses
            courseCards.forEach(card => {
                const level = card.getAttribute('data-level');
                
                if (filter === 'all' || level === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Course enrollment functionality
    document.addEventListener('click', (e) => {
        if (e.target.textContent === 'Enroll Now') {
            e.preventDefault();
            
            const courseCard = e.target.closest('.course-card');
            const courseName = courseCard.querySelector('h3').textContent;
            const coursePrice = courseCard.querySelector('.price').textContent;
            
            // Check if user is logged in (simulate)
            const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
            
            if (!isLoggedIn) {
                showEnrollmentModal(courseName, coursePrice, false);
            } else {
                showEnrollmentModal(courseName, coursePrice, true);
            }
        }
    });

    function showEnrollmentModal(courseName, price, isLoggedIn) {
        const modal = document.createElement('div');
        modal.className = 'enrollment-modal';
        
        const modalContent = isLoggedIn ? `
            <div class="modal-overlay" onclick="closeEnrollmentModal()">
                <div class="modal-content" onclick="event.stopPropagation()">
                    <h2>Enroll in Course</h2>
                    <div class="course-details">
                        <h3>${courseName}</h3>
                        <p class="course-price">${price}</p>
                        <p>Are you ready to start your musical journey with this course?</p>
                    </div>
                    <div class="enrollment-actions">
                        <button class="btn btn-primary" onclick="confirmEnrollment('${courseName}')">
                            Confirm Enrollment
                        </button>
                        <button class="btn btn-secondary" onclick="closeEnrollmentModal()">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        ` : `
            <div class="modal-overlay" onclick="closeEnrollmentModal()">
                <div class="modal-content" onclick="event.stopPropagation()">
                    <h2>Login Required</h2>
                    <div class="course-details">
                        <h3>${courseName}</h3>
                        <p class="course-price">${price}</p>
                        <p>Please login or create an account to enroll in this course.</p>
                    </div>
                    <div class="enrollment-actions">
                        <a href="login.html" class="btn btn-primary">Login</a>
                        <a href="signup.html" class="btn btn-secondary">Sign Up</a>
                        <button class="btn btn-secondary" onclick="closeEnrollmentModal()">Cancel</button>
                    </div>
                </div>
            </div>
        `;

        modal.innerHTML = modalContent;
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
    }

    window.closeEnrollmentModal = function() {
        const modal = document.querySelector('.enrollment-modal');
        if (modal) {
            modal.remove();
            document.body.style.overflow = '';
        }
    };

    window.confirmEnrollment = function(courseName) {
        // Simulate enrollment process
        setTimeout(() => {
            closeEnrollmentModal();
            cart.showNotification(`Successfully enrolled in ${courseName}!`, 'success');
            
            // Redirect to dashboard after a delay
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 2000);
        }, 1000);
    };

    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = courseStyles;
    document.head.appendChild(styleSheet);

    // Course search functionality
    const searchInput = document.getElementById('courseSearch');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            
            courseCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const description = card.querySelector('p').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // Course progress simulation for enrolled courses
    const enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses')) || [];
    
    courseCards.forEach(card => {
        const courseName = card.querySelector('h3').textContent;
        const enrollBtn = card.querySelector('.btn-accent');
        
        if (enrolledCourses.includes(courseName)) {
            enrollBtn.textContent = 'Continue Learning';
            enrollBtn.classList.remove('btn-accent');
            enrollBtn.classList.add('btn-primary');
            
            // Add progress indicator
            const progressBar = document.createElement('div');
            progressBar.className = 'progress-bar';
            progressBar.innerHTML = `
                <div class="progress-label">Progress: 45%</div>
                <div class="progress-track">
                    <div class="progress-fill" style="width: 45%"></div>
                </div>
            `;
            
            const courseInfo = card.querySelector('.course-info');
            courseInfo.insertBefore(progressBar, enrollBtn);
        }
    });

    

    const progressStyleSheet = document.createElement('style');
    progressStyleSheet.textContent = progressStyles;
    document.head.appendChild(progressStyleSheet);
});
  