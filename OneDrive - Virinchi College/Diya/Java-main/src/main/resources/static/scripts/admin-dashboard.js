// Admin dashboard functionality

document.addEventListener('DOMContentLoaded', () => {
    // Enhanced security check for admin access
    if (!verifyAdminAccess()) {
        alert('Access denied. Please login as administrator.');
        window.location.href = 'admin-login.html';
        return;
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
            handleAdminNavigation(targetId);
        });
    });

    function handleAdminNavigation(section) {
        const container = document.querySelector('main .container');
        
        // Remove existing dynamic content
        const existingContent = document.getElementById('admin-dynamic-content');
        if (existingContent) existingContent.remove();

        switch(section) {
            case 'users':
                showUserManagement(container);
                break;
            case 'courses':
                showCourseManagement(container);
                break;
            case 'products':
                showProductManagement(container);
                break;
            case 'orders':
                showOrderManagement(container);
                break;
            case 'analytics':
                showSystemAnalytics(container);
                break;
            case 'settings':
                showSystemSettings(container);
                break;
        }
    }

    function showUserManagement(container) {
        const content = document.createElement('section');
        content.id = 'admin-dynamic-content';
        content.innerHTML = `
            <h2>User Management</h2>
            <div class="dashboard-grid">
                <div class="card">
                    <h3>User Statistics</h3>
                    <div class="user-stats">
                        <div class="stat-item">
                            <span>Total Students:</span>
                            <span>1,247</span>
                        </div>
                        <div class="stat-item">
                            <span>Active Teachers:</span>
                            <span>89</span>
                        </div>
                        <div class="stat-item">
                            <span>New Registrations (This Month):</span>
                            <span>156</span>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <h3>Recent User Activity</h3>
                    <div class="activity-log">
                        <div class="activity-item">
                            <span class="activity-time">2 hours ago</span>
                            <span class="activity-desc">New student registration: John Smith</span>
                        </div>
                        <div class="activity-item">
                            <span class="activity-time">5 hours ago</span>
                            <span class="activity-desc">Teacher approved: Sarah Johnson</span>
                        </div>
                        <div class="activity-item">
                            <span class="activity-time">1 day ago</span>
                            <span class="activity-desc">Bulk user import completed: 25 users</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card mt-xl">
                <h3>User Search & Management</h3>
                <div class="search-controls">
                    <input type="text" placeholder="Search users..." class="form-input" style="flex: 1;">
                    <select class="form-input" style="width: 150px;">
                        <option value="">All Roles</option>
                        <option value="student">Students</option>
                        <option value="teacher">Teachers</option>
                    </select>
                    <button class="btn btn-primary">Search</button>
                </div>
            </div>
        `;
        container.appendChild(content);
    }

    function showCourseManagement(container) {
        const content = document.createElement('section');
        content.id = 'admin-dynamic-content';
        content.innerHTML = `
            <h2>Course Management</h2>
            <div class="card">
                <h3>Course Approval Queue</h3>
                <div class="approval-queue">
                    <div class="course-approval-item">
                        <div class="course-info">
                            <h4>Advanced Jazz Theory</h4>
                            <p>Submitted by: Prof. Michael Brown • 2 days ago</p>
                        </div>
                        <div class="approval-actions">
                            <button class="btn btn-primary">Approve</button>
                            <button class="btn btn-secondary">Review</button>
                            <button class="btn" style="background-color: var(--error-color); color: white;">Reject</button>
                        </div>
                    </div>
                    <div class="course-approval-item">
                        <div class="course-info">
                            <h4>Electronic Music Production</h4>
                            <p>Submitted by: DJ Alex Turner • 1 week ago</p>
                        </div>
                        <div class="approval-actions">
                            <button class="btn btn-primary">Approve</button>
                            <button class="btn btn-secondary">Review</button>
                            <button class="btn" style="background-color: var(--error-color); color: white;">Reject</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="dashboard-grid mt-xl">
                <div class="card">
                    <h3>Course Statistics</h3>
                    <div class="course-stats">
                        <div class="stat-item">
                            <span>Total Courses:</span>
                            <span>156</span>
                        </div>
                        <div class="stat-item">
                            <span>Pending Approval:</span>
                            <span>8</span>
                        </div>
                        <div class="stat-item">
                            <span>Most Popular:</span>
                            <span>Guitar Basics</span>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <h3>Quick Actions</h3>
                    <div style="display: flex; flex-direction: column; gap: var(--spacing-md);">
                        <button class="btn btn-primary">Bulk Course Import</button>
                        <button class="btn btn-secondary">Generate Course Report</button>
                        <button class="btn btn-accent">Course Categories Settings</button>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(content);
    }

    function showProductManagement(container) {
        const content = document.createElement('section');
        content.id = 'admin-dynamic-content';
        content.innerHTML = `
            <h2>Product Management</h2>
            <div class="card">
                <h3>Inventory Overview</h3>
                <div class="inventory-grid">
                    <div class="inventory-item">
                        <h4>Guitars</h4>
                        <p>15 products • 127 in stock</p>
                        <button class="btn btn-secondary">Manage</button>
                    </div>
                    <div class="inventory-item">
                        <h4>Pianos & Keyboards</h4>
                        <p>8 products • 45 in stock</p>
                        <button class="btn btn-secondary">Manage</button>
                    </div>
                    <div class="inventory-item">
                        <h4>Drums</h4>
                        <p>12 products • 23 in stock</p>
                        <button class="btn btn-secondary">Manage</button>
                    </div>
                    <div class="inventory-item">
                        <h4>Accessories</h4>
                        <p>67 products • 234 in stock</p>
                        <button class="btn btn-secondary">Manage</button>
                    </div>
                </div>
            </div>
            <div class="card mt-xl">
                <h3>Add New Product</h3>
                <form id="productForm">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-lg);">
                        <div class="form-group">
                            <label for="product-name">Product Name</label>
                            <input type="text" id="product-name" class="form-input" required>
                        </div>
                        <div class="form-group">
                            <label for="product-category">Category</label>
                            <select id="product-category" class="form-input" required>
                                <option value="">Select category</option>
                                <option value="guitar">Guitars</option>
                                <option value="piano">Pianos & Keyboards</option>
                                <option value="drums">Drums</option>
                                <option value="accessories">Accessories</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="product-price">Price ($)</label>
                            <input type="number" id="product-price" class="form-input" min="0" step="0.01" required>
                        </div>
                        <div class="form-group">
                            <label for="product-stock">Stock Quantity</label>
                            <input type="number" id="product-stock" class="form-input" min="0" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="product-description">Description</label>
                        <textarea id="product-description" class="form-input" rows="3" required></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary">Add Product</button>
                </form>
            </div>
        `;
        container.appendChild(content);

        // Handle product form
        const form = document.getElementById('productForm');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            cart.showNotification('Product added successfully!', 'success');
            form.reset();
        });
    }

    function showOrderManagement(container) {
        const content = document.createElement('section');
        content.id = 'admin-dynamic-content';
        content.innerHTML = `
            <h2>Order Management</h2>
            <div class="card">
                <h3>Recent Orders</h3>
                <div class="orders-table">
                    <div class="order-item">
                        <div class="order-info">
                            <h4>Order #RM-2024-001</h4>
                            <p>Customer: John Doe • $1,299.99 • 2 hours ago</p>
                        </div>
                        <div class="order-status">
                            <span class="status-badge status-pending">Pending</span>
                            <button class="btn btn-secondary">View Details</button>
                        </div>
                    </div>
                    <div class="order-item">
                        <div class="order-info">
                            <h4>Order #RM-2024-002</h4>
                            <p>Customer: Sarah Smith • $299.99 • 1 day ago</p>
                        </div>
                        <div class="order-status">
                            <span class="status-badge status-shipped">Shipped</span>
                            <button class="btn btn-secondary">View Details</button>
                        </div>
                    </div>
                    <div class="order-item">
                        <div class="order-info">
                            <h4>Order #RM-2024-003</h4>
                            <p>Customer: Mike Johnson • $899.99 • 2 days ago</p>
                        </div>
                        <div class="order-status">
                            <span class="status-badge status-delivered">Delivered</span>
                            <button class="btn btn-secondary">View Details</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(content);
    }

    function showSystemAnalytics(container) {
        const content = document.createElement('section');
        content.id = 'admin-dynamic-content';
        content.innerHTML = `
            <h2>System Analytics</h2>
            <div class="dashboard-grid">
                <div class="card">
                    <h3>Revenue Analytics</h3>
                    <div class="revenue-stats">
                        <div class="stat-item">
                            <span>This Month:</span>
                            <span style="color: var(--accent-color); font-weight: 600;">$45,280</span>
                        </div>
                        <div class="stat-item">
                            <span>Last Month:</span>
                            <span>$38,950</span>
                        </div>
                        <div class="stat-item">
                            <span>Growth:</span>
                            <span style="color: var(--accent-color);">+16.3%</span>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <h3>Platform Usage</h3>
                    <div class="usage-stats">
                        <div class="stat-item">
                            <span>Daily Active Users:</span>
                            <span>892</span>
                        </div>
                        <div class="stat-item">
                            <span>Course Completions:</span>
                            <span>234</span>
                        </div>
                        <div class="stat-item">
                            <span>New Enrollments:</span>
                            <span>67</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(content);
    }

    function showSystemSettings(container) {
        const content = document.createElement('section');
        content.id = 'admin-dynamic-content';
        content.innerHTML = `
            <h2>System Settings</h2>
            <div class="dashboard-grid">
                <div class="card">
                    <h3>Platform Configuration</h3>
                    <form id="settingsForm">
                        <div class="form-group">
                            <label for="site-name">Site Name</label>
                            <input type="text" id="site-name" class="form-input" value="RhythmMusics">
                        </div>
                        <div class="form-group">
                            <label for="currency">Default Currency</label>
                            <select id="currency" class="form-input">
                                <option value="USD">USD ($)</option>
                                <option value="EUR">EUR (€)</option>
                                <option value="GBP">GBP (£)</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="timezone">Timezone</label>
                            <select id="timezone" class="form-input">
                                <option value="UTC">UTC</option>
                                <option value="EST">Eastern Time</option>
                                <option value="PST">Pacific Time</option>
                            </select>
                        </div>
                        <button type="submit" class="btn btn-primary">Save Settings</button>
                    </form>
                </div>
                <div class="card">
                    <h3>Security Settings</h3>
                    <div class="security-options">
                        <div class="setting-item">
                            <label>
                                <input type="checkbox" checked> Enable two-factor authentication
                            </label>
                        </div>
                        <div class="setting-item">
                            <label>
                                <input type="checkbox"> Require password reset every 90 days
                            </label>
                        </div>
                        <div class="setting-item">
                            <label>
                                <input type="checkbox" checked> Log all admin activities
                            </label>
                        </div>
                    </div>
                    <button class="btn btn-accent mt-md">Update Security Settings</button>
                </div>
            </div>
        `;
        container.appendChild(content);

        // Handle settings form
        const form = document.getElementById('settingsForm');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            cart.showNotification('Settings saved successfully!', 'success');
        });
    }

    // Add admin-specific styles
    const adminStyles = `
        .user-stats,
        .revenue-stats,
        .usage-stats {
            display: flex;
            flex-direction: column;
            gap: var(--spacing-md);
        }
        
        .activity-log {
            display: flex;
            flex-direction: column;
            gap: var(--spacing-sm);
        }
        
        .activity-item {
            display: flex;
            flex-direction: column;
            gap: var(--spacing-xs);
            padding: var(--spacing-sm);
            border-bottom: 1px solid var(--neutral-200);
        }
        
        .activity-item:last-child {
            border-bottom: none;
        }
        
        .activity-time {
            font-size: var(--font-size-sm);
            color: var(--neutral-500);
        }
        
        .activity-desc {
            color: var(--neutral-700);
        }
        
        .search-controls {
            display: flex;
            gap: var(--spacing-md);
            align-items: end;
        }
        
        .approval-queue {
            display: flex;
            flex-direction: column;
            gap: var(--spacing-md);
        }
        
        .course-approval-item,
        .order-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: var(--spacing-md);
            border: 1px solid var(--neutral-200);
            border-radius: var(--border-radius);
        }
        
        .approval-actions,
        .order-status {
            display: flex;
            gap: var(--spacing-sm);
            align-items: center;
        }
        
        .inventory-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: var(--spacing-lg);
        }
        
        .inventory-item {
            text-align: center;
            padding: var(--spacing-lg);
            border: 1px solid var(--neutral-200);
            border-radius: var(--border-radius);
        }
        
        .orders-table {
            display: flex;
            flex-direction: column;
            gap: var(--spacing-md);
        }
        
        .status-badge {
            padding: var(--spacing-xs) var(--spacing-sm);
            border-radius: var(--border-radius);
            font-size: var(--font-size-xs);
            font-weight: 600;
        }
        
        .status-pending {
            background-color: var(--warning-color);
            color: white;
        }
        
        .status-shipped {
            background-color: var(--primary-color);
            color: white;
        }
        
        .status-delivered {
            background-color: var(--accent-color);
            color: white;
        }
        
        .security-options {
            display: flex;
            flex-direction: column;
            gap: var(--spacing-md);
        }
        
        .setting-item label {
            display: flex;
            align-items: center;
            gap: var(--spacing-sm);
            cursor: pointer;
        }
        
        @media (max-width: 768px) {
            .search-controls {
                flex-direction: column;
                align-items: stretch;
            }
            
            .course-approval-item,
            .order-item {
                flex-direction: column;
                align-items: flex-start;
                gap: var(--spacing-md);
            }
            
            .approval-actions,
            .order-status {
                align-self: flex-end;
            }
        }
    `;

    const adminStyleSheet = document.createElement('style');
    adminStyleSheet.textContent = adminStyles;
    document.head.appendChild(adminStyleSheet);
});