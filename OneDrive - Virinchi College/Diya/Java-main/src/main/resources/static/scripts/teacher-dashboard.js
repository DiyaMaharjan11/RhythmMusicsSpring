// Teacher dashboard functionality

document.addEventListener('DOMContentLoaded', () => {
    // Check if teacher is logged in
    if (!isTeacherLoggedIn()) {
        window.location.href = 'teacher-login.html';
        return;
    }

    // Get teacher info and update display
    const teacherInfo = getTeacherInfo();
    if (teacherInfo.name) {
        document.querySelector('.dashboard-header h1').textContent = `Teacher Dashboard - ${teacherInfo.name} 🎓`;
    }

    // Dashboard navigation
    const navLinks = document.querySelectorAll('.dashboard-nav .nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            const targetId = link.getAttribute('href').substring(1);
            handleNavigation(targetId);
        });
    });

    function handleNavigation(section) {
        const container = document.querySelector('main .container');
        
        // Remove existing dynamic content
        const existingContent = document.getElementById('dynamic-content');
        if (existingContent) existingContent.remove();

        switch(section) {
            case 'my-courses':
                showMyCourses(container);
                break;
            case 'students':
                showStudents(container);
                break;
            case 'create-course':
                showCreateCourse(container);
                break;
            case 'assignments':
                showAssignments(container);
                break;
            case 'analytics':
                showAnalytics(container);
                break;
        }
    }

    function showMyCourses(container) {
        const content = document.createElement('section');
        content.id = 'dynamic-content';
        content.innerHTML = `
            <h2>My Courses</h2>
            <div class="grid">
                <div class="course-card">
                    <img src="https://images.pexels.com/photos/1751731/pexels-photo-1751731.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Guitar Course">
                    <div class="course-info">
                        <h3>Guitar Basics for Beginners</h3>
                        <p>127 enrolled students • 4.8/5 rating</p>
                        <div class="course-stats">
                            <span>8 weeks • 24 lessons</span>
                        </div>
                        <button class="btn btn-primary">Manage Course</button>
                    </div>
                </div>
                <div class="course-card">
                    <img src="https://images.pexels.com/photos/442540/pexels-photo-442540.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Vocal Course">
                    <div class="course-info">
                        <h3>Vocal Training Fundamentals</h3>
                        <p>89 enrolled students • 4.9/5 rating</p>
                        <div class="course-stats">
                            <span>10 weeks • 30 lessons</span>
                        </div>
                        <button class="btn btn-primary">Manage Course</button>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(content);
    }

    function showStudents(container) {
        const content = document.createElement('section');
        content.id = 'dynamic-content';
        content.innerHTML = `
            <h2>Student Management</h2>
            <div class="card">
                <h3>Recent Student Activity</h3>
                <div class="student-list">
                    <div class="student-item">
                        <div class="student-info">
                            <h4>Sarah Johnson</h4>
                            <p>Guitar Basics • Last active: 2 hours ago</p>
                        </div>
                        <div class="student-progress">
                            <span>Progress: 75%</span>
                            <button class="btn btn-secondary">View Details</button>
                        </div>
                    </div>
                    <div class="student-item">
                        <div class="student-info">
                            <h4>Mike Davis</h4>
                            <p>Vocal Training • Last active: 1 day ago</p>
                        </div>
                        <div class="student-progress">
                            <span>Progress: 45%</span>
                            <button class="btn btn-secondary">View Details</button>
                        </div>
                    </div>
                    <div class="student-item">
                        <div class="student-info">
                            <h4>Emma Wilson</h4>
                            <p>Guitar Basics • Last active: 3 days ago</p>
                        </div>
                        <div class="student-progress">
                            <span>Progress: 30%</span>
                            <button class="btn btn-secondary">View Details</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(content);
    }

    function showCreateCourse(container) {
        const content = document.createElement('section');
        content.id = 'dynamic-content';
        content.innerHTML = `
            <h2>Create New Course</h2>
            <div class="card">
                <form id="createCourseForm">
                    <div class="form-group">
                        <label for="course-title">Course Title</label>
                        <input type="text" id="course-title" class="form-input" required>
                    </div>
                    <div class="form-group">
                        <label for="course-description">Course Description</label>
                        <textarea id="course-description" class="form-input" rows="4" required></textarea>
                    </div>
                    <div class="form-group">
                        <label for="course-level">Difficulty Level</label>
                        <select id="course-level" class="form-input" required>
                            <option value="">Select level</option>
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="course-duration">Duration (weeks)</label>
                        <input type="number" id="course-duration" class="form-input" min="1" max="52" required>
                    </div>
                    <div class="form-group">
                        <label for="course-price">Price ($)</label>
                        <input type="number" id="course-price" class="form-input" min="0" step="0.01" required>
                    </div>
                    <button type="submit" class="btn btn-primary">Create Course</button>
                </form>
            </div>
        `;
        container.appendChild(content);

        // Handle form submission
        const form = document.getElementById('createCourseForm');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            cart.showNotification('Course created successfully!', 'success');
            form.reset();
        });
    }

    function showAssignments(container) {
        const content = document.createElement('section');
        content.id = 'dynamic-content';
        content.innerHTML = `
            <h2>Assignment Management</h2>
            <div class="dashboard-grid">
                <div class="card">
                    <h3>Create Assignment</h3>
                    <form id="assignmentForm">
                        <div class="form-group">
                            <label for="assignment-title">Assignment Title</label>
                            <input type="text" id="assignment-title" class="form-input" required>
                        </div>
                        <div class="form-group">
                            <label for="assignment-course">Course</label>
                            <select id="assignment-course" class="form-input" required>
                                <option value="">Select course</option>
                                <option value="guitar-basics">Guitar Basics for Beginners</option>
                                <option value="vocal-training">Vocal Training Fundamentals</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="assignment-instructions">Instructions</label>
                            <textarea id="assignment-instructions" class="form-input" rows="3" required></textarea>
                        </div>
                        <div class="form-group">
                            <label for="assignment-due">Due Date</label>
                            <input type="date" id="assignment-due" class="form-input" required>
                        </div>
                        <button type="submit" class="btn btn-primary">Create Assignment</button>
                    </form>
                </div>
                <div class="card">
                    <h3>Recent Assignments</h3>
                    <div class="assignment-list">
                        <div class="assignment-item">
                            <div class="assignment-info">
                                <h4>Practice Major Scales</h4>
                                <p>Piano Course • Due: Tomorrow • 15 submissions</p>
                            </div>
                            <button class="btn btn-secondary">Review</button>
                        </div>
                        <div class="assignment-item">
                            <div class="assignment-info">
                                <h4>Chord Progression Exercise</h4>
                                <p>Guitar Course • Due: Next Week • 8 submissions</p>
                            </div>
                            <button class="btn btn-secondary">Review</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(content);

        // Handle assignment form
        const form = document.getElementById('assignmentForm');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            cart.showNotification('Assignment created successfully!', 'success');
            form.reset();
        });
    }

    function showAnalytics(container) {
        const content = document.createElement('section');
        content.id = 'dynamic-content';
        content.innerHTML = `
            <h2>Teaching Analytics</h2>
            <div class="dashboard-grid">
                <div class="card">
                    <h3>Course Performance</h3>
                    <div class="analytics-chart">
                        <div class="chart-placeholder">
                            <p>📊 Course enrollment and completion rates would be displayed here</p>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <h3>Student Engagement</h3>
                    <div class="engagement-stats">
                        <div class="stat-item">
                            <span>Average Session Time:</span>
                            <span>45 minutes</span>
                        </div>
                        <div class="stat-item">
                            <span>Course Completion Rate:</span>
                            <span>78%</span>
                        </div>
                        <div class="stat-item">
                            <span>Average Rating:</span>
                            <span>4.8/5</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(content);
    }

    // Add teacher dashboard specific styles
    const teacherStyles = `
        .student-list {
            display: flex;
            flex-direction: column;
            gap: var(--spacing-md);
        }
        
        .student-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: var(--spacing-md);
            border: 1px solid var(--neutral-200);
            border-radius: var(--border-radius);
            transition: var(--transition);
        }
        
        .student-item:hover {
            box-shadow: var(--shadow-md);
        }
        
        .student-info h4 {
            margin: 0 0 var(--spacing-xs) 0;
            color: var(--neutral-800);
        }
        
        .student-info p {
            margin: 0;
            font-size: var(--font-size-sm);
            color: var(--neutral-600);
        }
        
        .student-progress {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            gap: var(--spacing-sm);
        }
        
        .course-stats {
            font-size: var(--font-size-sm);
            color: var(--neutral-600);
            margin-bottom: var(--spacing-md);
        }
        
        .analytics-chart {
            text-align: center;
            padding: var(--spacing-xl);
        }
        
        .chart-placeholder {
            background-color: var(--neutral-50);
            border: 2px dashed var(--neutral-300);
            border-radius: var(--border-radius);
            padding: var(--spacing-xl);
            color: var(--neutral-600);
        }
        
        .engagement-stats {
            display: flex;
            flex-direction: column;
            gap: var(--spacing-md);
        }
        
        @media (max-width: 768px) {
            .student-item,
            .student-progress {
                flex-direction: column;
                align-items: flex-start;
            }
        }
    `;

    const teacherStyleSheet = document.createElement('style');
    teacherStyleSheet.textContent = teacherStyles;
    document.head.appendChild(teacherStyleSheet);
});