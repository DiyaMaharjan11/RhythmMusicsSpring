// Products page functionality

document.addEventListener('DOMContentLoaded', () => {
    const categoryFilter = document.getElementById('categoryFilter');
    const priceFilter = document.getElementById('priceFilter');
    const productsGrid = document.getElementById('productsGrid');
    const productCards = document.querySelectorAll('.product-card');

    // Filter functionality
    function filterProducts() {
        const selectedCategory = categoryFilter?.value || '';
        const selectedPriceRange = priceFilter?.value || '';

        productCards.forEach(card => {
            const category = card.getAttribute('data-category');
            const price = parseInt(card.getAttribute('data-price'));
            
            let showCard = true;

            // Category filter
            if (selectedCategory && category !== selectedCategory) {
                showCard = false;
            }

            // Price filter
            if (selectedPriceRange && showCard) {
                const [min, max] = selectedPriceRange.includes('+') 
                    ? [parseInt(selectedPriceRange.replace('+', '')), Infinity]
                    : selectedPriceRange.split('-').map(p => parseInt(p));
                
                if (price < min || price > max) {
                    showCard = false;
                }
            }

            // Show/hide card with animation
            if (showCard) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease';
            } else {
                card.style.display = 'none';
            }
        });

        // Check if any products are visible
        const visibleCards = Array.from(productCards).filter(card => 
            card.style.display !== 'none'
        );

        if (visibleCards.length === 0 && productsGrid) {
            showNoProductsMessage();
        } else {
            hideNoProductsMessage();
        }
    }

    function showNoProductsMessage() {
        const existingMessage = document.getElementById('no-products-message');
        if (existingMessage) return;

        const message = document.createElement('div');
        message.id = 'no-products-message';
        message.className = 'text-center mt-xl';
        message.innerHTML = `
            <div style="padding: var(--spacing-2xl);">
                <div style="font-size: 4rem; margin-bottom: var(--spacing-lg);">🔍</div>
                <h3>No products found</h3>
                <p>Try adjusting your filters to see more products.</p>
                <button class="btn btn-primary mt-lg" onclick="clearFilters()">Clear Filters</button>
            </div>
        `;
        productsGrid.appendChild(message);
    }

    function hideNoProductsMessage() {
        const message = document.getElementById('no-products-message');
        if (message) {
            message.remove();
        }
    }

    // Clear filters function
    window.clearFilters = function() {
        if (categoryFilter) categoryFilter.value = '';
        if (priceFilter) priceFilter.value = '';
        filterProducts();
    };

    // Event listeners for filters
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterProducts);
    }
    
    if (priceFilter) {
        priceFilter.addEventListener('change', filterProducts);
    }

    // Product hover effects
    productCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(-4px)';
        });
    });

    // Search functionality (if search input exists)
    const searchInput = document.getElementById('productSearch');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            
            productCards.forEach(card => {
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

    // Add loading animation for product images
    document.querySelectorAll('.product-card img, .course-card img').forEach(img => {
        img.addEventListener('load', () => {
            img.style.opacity = '0';
            img.style.animation = 'fadeIn 0.5s ease forwards';
        });
    });
});

// Product quick view functionality
function showProductDetails(productName, price, description, image) {
    const modal = document.createElement('div');
    modal.className = 'product-modal';
    modal.innerHTML = `
        <div class="modal-overlay" onclick="closeModal()">
            <div class="modal-content" onclick="event.stopPropagation()">
                <button class="modal-close" onclick="closeModal()">&times;</button>
                <div class="modal-body">
                    <img src="${image}" alt="${productName}">
                    <div class="modal-info">
                        <h2>${productName}</h2>
                        <p class="modal-price">$${price}</p>
                        <p class="modal-description">${description}</p>
                        <div class="modal-actions">
                            <button class="btn btn-primary add-to-cart" 
                                data-product="${productName}" 
                                data-price="${price}" 
                                data-image="${image}">
                                Add to Cart
                            </button>
                            <button class="btn btn-secondary" onclick="closeModal()">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Add modal styles
    const modalStyles = `
        .product-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
        }
        
        .modal-overlay {
            background: rgba(0, 0, 0, 0.8);
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: var(--spacing-md);
        }
        
        .modal-content {
            background: white;
            border-radius: var(--border-radius-lg);
            max-width: 600px;
            width: 100%;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
            animation: modalSlideIn 0.3s ease;
        }
        
        .modal-close {
            position: absolute;
            top: var(--spacing-md);
            right: var(--spacing-md);
            background: none;
            border: none;
            font-size: 2rem;
            cursor: pointer;
            color: var(--neutral-500);
            z-index: 1;
        }
        
        .modal-body {
            padding: var(--spacing-xl);
        }
        
        .modal-body img {
            width: 100%;
            height: 300px;
            object-fit: cover;
            border-radius: var(--border-radius);
            margin-bottom: var(--spacing-lg);
        }
        
        .modal-price {
            font-size: var(--font-size-2xl);
            font-weight: 600;
            color: var(--primary-color);
            margin: var(--spacing-md) 0;
        }
        
        .modal-description {
            color: var(--neutral-600);
            line-height: var(--line-height-relaxed);
            margin-bottom: var(--spacing-lg);
        }
        
        .modal-actions {
            display: flex;
            gap: var(--spacing-md);
        }
        
        @keyframes modalSlideIn {
            from {
                opacity: 0;
                transform: scale(0.9) translateY(-20px);
            }
            to {
                opacity: 1;
                transform: scale(1) translateY(0);
            }
        }
    `;

    // Add styles to document
    const styleSheet = document.createElement('style');
    styleSheet.textContent = modalStyles;
    document.head.appendChild(styleSheet);

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.querySelector('.product-modal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = '';
    }
}

// Add quick view buttons to products (if desired)
document.addEventListener('DOMContentLoaded', () => {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const productName = card.querySelector('h3').textContent;
        const price = card.querySelector('.price').textContent.replace('$', '');
        const description = card.querySelector('p').textContent;
        const image = card.querySelector('img').src;
        
        // Add quick view button
        const quickViewBtn = document.createElement('button');
        quickViewBtn.className = 'btn btn-secondary';
        quickViewBtn.textContent = 'Quick View';
        quickViewBtn.style.marginTop = 'var(--spacing-sm)';
        quickViewBtn.addEventListener('click', () => {
            showProductDetails(productName, price, description, image);
        });
        
        const productInfo = card.querySelector('.product-info');
        const addToCartBtn = productInfo.querySelector('.add-to-cart');
        productInfo.insertBefore(quickViewBtn, addToCartBtn);
    });
});