// Shopping cart page functionality

document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartEmptyContainer = document.getElementById('cartEmpty');
    const cartTotalContainer = document.getElementById('cartTotal');
    const checkoutBtn = document.getElementById('checkoutBtn');

    function renderCart() {
        if (!cartItemsContainer) return;

        const cartItems = cart.items;
        
        if (cartItems.length === 0) {
            cartItemsContainer.style.display = 'none';
            cartTotalContainer.style.display = 'none';
            cartEmptyContainer.classList.remove('hidden');
            return;
        }

        cartEmptyContainer.classList.add('hidden');
        cartItemsContainer.style.display = 'block';
        cartTotalContainer.style.display = 'block';

        // Render cart items
        cartItemsContainer.innerHTML = cartItems.map(item => `
            <div class="cart-item" data-product="${item.product}">
                <img src="${item.image}" alt="${item.product}">
                <div class="item-details">
                    <h3>${item.product}</h3>
                    <p class="item-price">$${item.price.toFixed(2)}</p>
                </div>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateQuantity('${item.product}', ${item.quantity - 1})">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity('${item.product}', ${item.quantity + 1})">+</button>
                </div>
                <div class="item-actions">
                    <p class="item-total">$${(item.price * item.quantity).toFixed(2)}</p>
                    <button class="remove-btn" onclick="removeFromCart('${item.product}')">Remove</button>
                </div>
            </div>
        `).join('');

        // Update totals
        updateTotals();
    }

    function updateTotals() {
        const subtotal = cart.getTotal();
        const shipping = subtotal > 0 ? 15.00 : 0;
        const tax = subtotal * 0.08; // 8% tax
        const total = subtotal + shipping + tax;

        document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
        document.getElementById('shipping').textContent = `$${shipping.toFixed(2)}`;
        document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
        document.getElementById('total').textContent = `$${total.toFixed(2)}`;
    }

    // Global functions for cart operations
    window.updateQuantity = function(product, quantity) {
        cart.updateQuantity(product, quantity);
        renderCart();
    };

    window.removeFromCart = function(product) {
        cart.removeItem(product);
        renderCart();
    };

    // Checkout functionality
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.items.length === 0) {
                cart.showNotification('Your cart is empty!', 'error');
                return;
            }

            // Simulate checkout process
            const checkoutModal = document.createElement('div');
            checkoutModal.className = 'checkout-modal';
            checkoutModal.innerHTML = `
                <div class="modal-overlay">
                    <div class="modal-content">
                        <h2>Checkout</h2>
                        <form id="checkoutForm">
                            <div class="form-group">
                                <label>Full Name</label>
                                <input type="text" name="fullName" class="form-input" required>
                            </div>
                            <div class="form-group">
                                <label>Email</label>
                                <input type="email" name="email" class="form-input" required>
                            </div>
                            <div class="form-group">
                                <label>Address</label>
                                <textarea name="address" class="form-input" rows="3" required></textarea>
                            </div>
                            <div class="form-group">
                                <label>Phone Number</label>
                                <input type="tel" name="phone" class="form-input" required>
                            </div>
                            <div class="checkout-total">
                                <h3>Order Total: $${(cart.getTotal() + 15 + (cart.getTotal() * 0.08)).toFixed(2)}</h3>
                            </div>
                            <div style="display: flex; gap: var(--spacing-md);">
                                <button type="submit" class="btn btn-primary" style="flex: 1;">Place Order</button>
                                <button type="button" class="btn btn-secondary" onclick="closeCheckoutModal()">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            `;

            document.body.appendChild(checkoutModal);
            document.body.style.overflow = 'hidden';

            // Handle checkout form submission
            const checkoutForm = document.getElementById('checkoutForm');
            checkoutForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Simulate order processing
                setTimeout(() => {
                    cart.clear();
                    closeCheckoutModal();
                    cart.showNotification('Order placed successfully! You will receive a confirmation email shortly.', 'success');
                    renderCart();
                }, 1000);
            });
        });
    }

    window.closeCheckoutModal = function() {
        const modal = document.querySelector('.checkout-modal');
        if (modal) {
            modal.remove();
            document.body.style.overflow = '';
        }
    };

    // Initial render
    renderCart();

    // Add cart-specific styles
    const cartStyles = `
        .cart-item {
            border: 1px solid var(--neutral-200);
            border-radius: var(--border-radius);
            margin-bottom: var(--spacing-md);
        }
        
        .item-details h3 {
            margin: 0 0 var(--spacing-xs) 0;
            color: var(--neutral-800);
        }
        
        .item-price {
            color: var(--primary-color);
            font-weight: 600;
            margin: 0;
        }
        
        .quantity-controls {
            display: flex;
            align-items: center;
            gap: var(--spacing-sm);
        }
        
        .quantity-btn {
            background-color: var(--neutral-200);
            border: none;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            font-weight: 600;
            transition: var(--transition);
        }
        
        .quantity-btn:hover {
            background-color: var(--primary-color);
            color: white;
        }
        
        .quantity {
            font-weight: 600;
            min-width: 30px;
            text-align: center;
        }
        
        .item-actions {
            text-align: right;
        }
        
        .item-total {
            font-size: var(--font-size-lg);
            font-weight: 600;
            color: var(--neutral-800);
            margin: 0 0 var(--spacing-sm) 0;
        }
        
        .remove-btn {
            background: none;
            border: none;
            color: var(--error-color);
            cursor: pointer;
            font-size: var(--font-size-sm);
            text-decoration: underline;
        }
        
        .remove-btn:hover {
            color: #B91C1C;
        }
        
        .checkout-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
        }
        
        .checkout-modal .modal-overlay {
            background: rgba(0, 0, 0, 0.8);
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: var(--spacing-md);
        }
        
        .checkout-modal .modal-content {
            background: white;
            border-radius: var(--border-radius-lg);
            padding: var(--spacing-xl);
            max-width: 500px;
            width: 100%;
            max-height: 90vh;
            overflow-y: auto;
        }
        
        .checkout-total {
            background-color: var(--neutral-50);
            padding: var(--spacing-md);
            border-radius: var(--border-radius);
            margin: var(--spacing-lg) 0;
            text-align: center;
        }
        
        .checkout-total h3 {
            color: var(--primary-color);
            margin: 0;
        }
        
        .cart-container {
            max-width: 800px;
            margin: 0 auto;
        }
    `;

    const styleSheet = document.createElement('style');
    styleSheet.textContent = cartStyles;
    document.head.appendChild(styleSheet);
});