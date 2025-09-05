// Student dashboard functionality

document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    if (!checkAuth()) {
        window.location.href = 'login.html';
        return;
    }

    // Update user name in header
    const userInfo = getUserInfo();
    const studentNameElement = document.getElementById('studentName');
    if (studentNameElement && userInfo.name) {
        studentNameElement.textContent = userInfo.name;
    }

    // Simulate enrolled courses
    const enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses')) || [
        'Guitar Basics for Beginners',
        'Piano Performance Mastery', 
        'Vocal Training Fundamentals'
    ];

    // Update course progress simulation
    const courseProgress = {
        'Guitar Basics for Beginners': 75,
        'Piano Performance Mastery': 45,
        'Vocal Training Fundamentals': 30
    };

    // Dashboard navigation functionality
    const navLinks = document.querySelectorAll('.dashboard-nav .nav-link');
    const sections = document.querySelectorAll('section[id]');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Get target section
            const targetId = link.getAttribute('href').substring(1);
            
            // Show/hide sections based on target
            sections.forEach(section => {
                if (section.id === targetId || targetId === 'overview') {
                    section.style.display = 'block';
                    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else if (targetId !== 'overview') {
                    section.style.display = 'none';
                }
            });

            // Handle different sections
            switch(targetId) {
                case 'courses':
                    showMyCourses();
                    break;
                case 'progress':
                    showProgress();
                    break;
                case 'assignments':
                    showAssignments();
                    break;
                case 'profile':
                    showProfile();
                    break;
            }
        });
    });

    function showMyCourses() {
        const container = document.querySelector('main .container');
        const coursesSection = document.createElement('section');
        coursesSection.id = 'my-courses-content';
        coursesSection.innerHTML = `
            <h2>My Courses</h2>
            <div class="grid">
                ${enrolledCourses.map(course => `
                    <div class="course-card">
                        <img src="https://images.pexels.com/photos/1751731/pexels-photo-1751731.jpeg?auto=compress&cs=tinysrgb&w=400" alt="${course}">
                        <div class="course-info">
                            <h3>${course}</h3>
                            <div class="progress-bar">
                                <div class="progress-label">Progress: ${courseProgress[course] || 0}%</div>
                                <div class="progress-track">
                                    <div class="progress-fill" style="width: ${courseProgress[course] || 0}%"></div>
                                </div>
                            </div>
                            <button class="btn btn-primary">Continue Learning</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        
        // Remove existing content and add new
        const existingSection = document.getElementById('my-courses-content');
        if (existingSection) existingSection.remove();
        container.appendChild(coursesSection);
    }

    function showProgress() {
        const container = document.querySelector('main .container');
        const progressSection = document.createElement('section');
        progressSection.id = 'progress-content';
        progressSection.innerHTML = `
            <h2>Learning Progress</h2>
            <div class="dashboard-grid">
                <div class="card">
                    <h3>Overall Progress</h3>
                    <div class="progress-stats">
                        <div class="stat-item">
                            <span class="stat-label">Courses Completed:</span>
                            <span class="stat-value">0 / ${enrolledCourses.length}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Total Study Time:</span>
                            <span class="stat-value">24 hours</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Certificates Earned:</span>
                            <span class="stat-value">0</span>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <h3>Course Progress Details</h3>
                    ${enrolledCourses.map(course => `
                        <div class="course-progress-item">
                            <h4>${course}</h4>
                            <div class="progress-bar">
                                <div class="progress-track">
                                    <div class="progress-fill" style="width: ${courseProgress[course] || 0}%"></div>
                                </div>
                                <span>${courseProgress[course] || 0}%</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        
        const existingSection = document.getElementById('progress-content');
        if (existingSection) existingSection.remove();
        container.appendChild(progressSection);
    }

    function showAssignments() {
        const container = document.querySelector('main .container');
        const assignmentsSection = document.createElement('section');
        assignmentsSection.id = 'assignments-content';
        assignmentsSection.innerHTML = `
            <h2>Assignments</h2>
            <div class="card">
                <h3>Pending Assignments</h3>
                <div class="assignment-list">
                    <div class="assignment-item">
                        <div class="assignment-info">
                            <h4>Practice Major Scales</h4>
                            <p>Piano Performance Mastery • Due: Tomorrow</p>
                        </div>
                        <button class="btn btn-primary">Start Assignment</button>
                    </div>
                    <div class="assignment-item">
                        <div class="assignment-info">
                            <h4>Record Vocal Exercise</h4>
                            <p>Vocal Training Fundamentals • Due: Next Week</p>
                        </div>
                        <button class="btn btn-primary">Start Assignment</button>
                    </div>
                </div>
                
                <h3 class="mt-xl">Completed Assignments</h3>
                <div class="assignment-list">
                    <div class="assignment-item completed">
                        <div class="assignment-info">
                            <h4>Basic Chord Progressions</h4>
                            <p>Guitar Basics for Beginners • Completed • Score: 95%</p>
                        </div>
                        <span class="assignment-score">95%</span>
                    </div>
                </div>
            </div>
        `;
        
        const existingSection = document.getElementById('assignments-content');
        if (existingSection) existingSection.remove();
        container.appendChild(assignmentsSection);
    }

    function showProfile() {
        const container = document.querySelector('main .container');
        const profileSection = document.createElement('section');
        profileSection.id = 'profile-content';
        profileSection.innerHTML = `
            <h2>Profile Settings</h2>
            <div class="card">
                <form id="profileForm">
                    <div class="form-group">
                        <label for="profile-name">Full Name</label>
                        <input type="text" id="profile-name" class="form-input" value="${userInfo.name || ''}" required>
                    </div>
                    <div class="form-group">
                        <label for="profile-email">Email Address</label>
                        <input type="email" id="profile-email" class="form-input" value="${userInfo.email || ''}" required>
                    </div>
                    <div class="form-group">
                        <label for="profile-instrument">Primary Instrument</label>
                        <select id="profile-instrument" class="form-input">
                            <option value="">Select instrument</option>
                            <option value="guitar">Guitar</option>
                            <option value="piano">Piano</option>
                            <option value="drums">Drums</option>
                            <option value="violin">Violin</option>
                            <option value="vocals">Vocals</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="profile-level">Skill Level</label>
                        <select id="profile-level" class="form-input">
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                        </select>
                    </div>
                    <button type="submit" class="btn btn-primary">Update Profile</button>
                </form>
            </div>
        `;
        
        const existingSection = document.getElementById('profile-content');
        if (existingSection) existingSection.remove();
        container.appendChild(profileSection);

        // Handle profile form submission
        const profileForm = document.getElementById('profileForm');
        profileForm.addEventListener('submit', (e) => {
            e.preventDefault();
            cart.showNotification('Profile updated successfully!', 'success');
        });
    }

    // Add dashboard-specific styles
    const dashboardStyles = `
        .progress-stats {
            display: flex;
            flex-direction: column;
            gap: var(--spacing-md);
        }
        
        .stat-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: var(--spacing-sm) 0;
            border-bottom: 1px solid var(--neutral-200);
        }
        
        .stat-item:last-child {
            border-bottom: none;
        }
        
        .stat-label {
            color: var(--neutral-600);
        }
        
        .stat-value {
            font-weight: 600;
            color: var(--neutral-800);
        }
        
        .course-progress-item {
            margin-bottom: var(--spacing-lg);
        }
        
        .course-progress-item h4 {
            margin-bottom: var(--spacing-sm);
            color: var(--neutral-800);
        }
        
        .progress-bar {
            display: flex;
            align-items: center;
            gap: var(--spacing-sm);
        }
        
        .progress-track {
            flex: 1;
            background-color: var(--neutral-200);
            height: 8px;
            border-radius: 4px;
            overflow: hidden;
        }
        
        .progress-fill {
            background-color: var(--accent-color);
            height: 100%;
            transition: width 0.3s ease;
        }
        
        .progress-label {
            font-size: var(--font-size-sm);
            color: var(--neutral-600);
            margin-bottom: var(--spacing-xs);
        }
        
        .assignment-list {
            display: flex;
            flex-direction: column;
            gap: var(--spacing-md);
        }
        
        .assignment-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: var(--spacing-md);
            border: 1px solid var(--neutral-200);
            border-radius: var(--border-radius);
            transition: var(--transition);
        }
        
        .assignment-item:hover {
            box-shadow: var(--shadow-md);
        }
        
        .assignment-item.completed {
            background-color: var(--neutral-50);
            border-color: var(--accent-color);
        }
        
        .assignment-info h4 {
            margin: 0 0 var(--spacing-xs) 0;
            color: var(--neutral-800);
        }
        
        .assignment-info p {
            margin: 0;
            font-size: var(--font-size-sm);
            color: var(--neutral-600);
        }
        
        .assignment-score {
            font-weight: 600;
            color: var(--accent-color);
            font-size: var(--font-size-lg);
        }
        
        .dashboard-nav .nav-link.active {
            background-color: var(--primary-color);
            color: var(--white);
        }
        
        @media (max-width: 768px) {
            .assignment-item {
                flex-direction: column;
                align-items: flex-start;
                gap: var(--spacing-sm);
            }
            
            .assignment-item button {
                align-self: flex-end;
            }
        }
    `;

    const styleSheet = document.createElement('style');
    styleSheet.textContent = dashboardStyles;
    document.head.appendChild(styleSheet);
});