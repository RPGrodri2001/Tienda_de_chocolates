// ==========================================
// CHOCOLATEVENTAS - CATALOGO JAVASCRIPT v1.0
// ==========================================

// Estado global del catálogo
const CatalogState = {
    cart: JSON.parse(localStorage.getItem('chocolateCart')) || [],
    products: [],
    filteredProducts: [],
    currentFilter: 'all',
    currentPage: 1,
    productsPerPage: 12
};

// Base de datos completa del catálogo
const CATALOG_DB = [
    // ROSAS
    {
        id: 101,
        name: 'Rosa Roja Premium',
        description: 'Hermosa rosa roja de tallo largo, perfecta para expresar amor y pasión.',
        price: 8.99,
        category: 'rosas',
        image: '🌹',
        type: 'roses'
    },
    {
        id: 102,
        name: 'Rosa Blanca Elegante',
        description: 'Rosa blanca símbolo de pureza, ideal para ocasiones especiales.',
        price: 7.99,
        category: 'rosas',
        image: '🤍',
        type: 'roses'
    },
    {
        id: 103,
        name: 'Rosa Rosada Delicada',
        description: 'Tierna rosa rosada que transmite dulzura y cariño.',
        price: 7.50,
        category: 'rosas',
        image: '🌸',
        type: 'roses'
    },
    {
        id: 104,
        name: 'Rosa Amarilla Radiante',
        description: 'Rosa amarilla que simboliza amistad y alegría.',
        price: 6.99,
        category: 'rosas',
        image: '🌻',
        type: 'roses'
    },
    {
        id: 105,
        name: 'Rosa Morada Exclusiva',
        description: 'Exótica rosa morada, única y sofisticada.',
        price: 12.99,
        category: 'rosas',
        image: '💜',
        type: 'roses'
    },
    {
        id: 106,
        name: 'Docena de Rosas Rojas',
        description: 'Docena de rosas rojas premium en hermoso empaque.',
        price: 89.99,
        category: 'rosas',
        image: '💐',
        type: 'roses'
    },

    // CHOCOLATES
    {
        id: 201,
        name: 'Trufa de Chocolate Negro',
        description: 'Exquisita trufa artesanal con chocolate negro 70% y ganache cremoso.',
        price: 15.99,
        category: 'chocolates',
        image: '🍫',
        type: 'chocolates'
    },
    {
        id: 202,
        name: 'Bombones de Frambuesa',
        description: 'Deliciosos bombones rellenos de mermelada de frambuesa natural.',
        price: 24.99,
        category: 'chocolates',
        image: '🍬',
        type: 'chocolates'
    },
    {
        id: 203,
        name: 'Tableta Chocolate Premium',
        description: 'Tableta premium con chocolate con leche y almendras tostadas.',
        price: 12.50,
        category: 'chocolates',
        image: '🍫',
        type: 'chocolates'
    },
    {
        id: 204,
        name: 'Trufas de Café Colombiano',
        description: 'Trufas gourmet con intenso sabor a café colombiano premium.',
        price: 18.99,
        category: 'chocolates',
        image: '☕',
        type: 'chocolates'
    },
    {
        id: 205,
        name: 'Chocolate Blanco Artesanal',
        description: 'Suave chocolate blanco belga con vainilla natural.',
        price: 14.99,
        category: 'chocolates',
        image: '🤍',
        type: 'chocolates'
    },
    {
        id: 206,
        name: 'Bombones Mixtos Premium',
        description: 'Surtido de bombones con diferentes rellenos y sabores únicos.',
        price: 32.99,
        category: 'chocolates',
        image: '🎁',
        type: 'chocolates'
    },
    {
        id: 207,
        name: 'Chocolate con Caramelo Salado',
        description: 'Irresistible chocolate con centro de caramelo salado.',
        price: 21.99,
        category: 'chocolates',
        image: '🍯',
        type: 'chocolates'
    },
    {
        id: 208,
        name: 'Trufas de Champagne',
        description: 'Exclusivas trufas con champagne francés y chocolate premium.',
        price: 28.99,
        category: 'chocolates',
        image: '🥂',
        type: 'chocolates'
    },

    // ARREGLOS
    {
        id: 301,
        name: 'Arreglo Romántico Deluxe',
        description: 'Hermoso arreglo con rosas rojas y chocolates premium en caja elegante.',
        price: 89.99,
        category: 'arreglos',
        image: '💝',
        type: 'arrangements'
    },
    {
        id: 302,
        name: 'Cesta de Amor',
        description: 'Cesta artesanal con rosas mixtas, chocolates y tarjeta personalizada.',
        price: 65.99,
        category: 'arreglos',
        image: '🧺',
        type: 'arrangements'
    },
    {
        id: 303,
        name: 'Bouquet de Rosas y Trufas',
        description: 'Elegante bouquet combinando rosas frescas con trufas gourmet.',
        price: 55.99,
        category: 'arreglos',
        image: '💐',
        type: 'arrangements'
    },
    {
        id: 304,
        name: 'Arreglo San Valentín',
        description: 'Arreglo especial con rosas en forma de corazón y chocolates temáticos.',
        price: 75.99,
        category: 'arreglos',
        image: '💕',
        type: 'arrangements'
    },
    {
        id: 305,
        name: 'Caja Sorpresa Premium',
        description: 'Elegante caja con rosas preservadas y selección de chocolates finos.',
        price: 125.99,
        category: 'arreglos',
        image: '🎁',
        type: 'arrangements'
    },
    {
        id: 306,
        name: 'Arreglo Corporativo',
        description: 'Sofisticado arreglo ideal para regalos empresariales y eventos.',
        price: 149.99,
        category: 'arreglos',
        image: '🏢',
        type: 'arrangements'
    },
    {
        id: 307,
        name: 'Torre de Chocolates y Flores',
        description: 'Impresionante torre con niveles de rosas y chocolates artesanales.',
        price: 199.99,
        category: 'arreglos',
        image: '🗼',
        type: 'arrangements'
    },
    {
        id: 308,
        name: 'Arreglo de Mesa Elegante',
        description: 'Hermoso arreglo de mesa con rosas y chocolates para decorar ocasiones especiales.',
        price: 45.99,
        category: 'arreglos',
        image: '🕯️',
        type: 'arrangements'
    },

    // MÁS ROSAS
    {
        id: 109,
        name: 'Ramo de Rosas Mixtas',
        description: 'Colorido ramo con rosas de diferentes colores y tonalidades.',
        price: 42.99,
        category: 'rosas',
        image: '🌈',
        type: 'roses'
    },
    {
        id: 110,
        name: 'Rosa Eterna en Cúpula',
        description: 'Rosa preservada en elegante cúpula de cristal, dura para siempre.',
        price: 85.99,
        category: 'rosas',
        image: '🔮',
        type: 'roses'
    },

    // MÁS CHOCOLATES
    {
        id: 209,
        name: 'Chocolate Artesanal de Menta',
        description: 'Refrescante chocolate con hojas de menta natural y crema.',
        price: 17.99,
        category: 'chocolates',
        image: '🌿',
        type: 'chocolates'
    },
    {
        id: 210,
        name: 'Caja de Bombones Deluxe',
        description: 'Lujosa caja con 24 bombones de diferentes sabores y texturas.',
        price: 49.99,
        category: 'chocolates',
        image: '📦',
        type: 'chocolates'
    }
];

// ==========================================
// UTILIDADES
// ==========================================

const Utils = {
    formatPrice: (price) => {
        return `$${price.toFixed(2)}`;
    },

    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    generateId: () => {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    },

    smoothScroll: (targetId) => {
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
};

// ==========================================
// SISTEMA DE NOTIFICACIONES
// ==========================================

const Toast = {
    show: (message, type = 'success', duration = 3000) => {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };

        toast.innerHTML = `
            <div class="toast-icon">${icons[type]}</div>
            <div class="toast-content">
                <h4>${type.charAt(0).toUpperCase() + type.slice(1)}</h4>
                <p>${message}</p>
            </div>
            <button class="toast-close" onclick="this.parentElement.remove()">✕</button>
        `;

        document.getElementById('toastContainer').appendChild(toast);

        setTimeout(() => toast.classList.add('show'), 100);

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }
};

// ==========================================
// GESTIÓN DEL CARRITO
// ==========================================

const Cart = {
    add: (productId, quantity = 1) => {
        const product = CatalogState.products.find(p => p.id === productId);
        if (!product) return;

        const existingItem = CatalogState.cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += quantity;
            Toast.show(`Se agregó ${quantity} más al carrito`);
        } else {
            CatalogState.cart.push({
                id: productId,
                name: product.name,
                price: product.price,
                image: product.image,
                type: product.type,
                quantity: quantity
            });
            Toast.show(`${product.name} agregado al carrito`);
        }

        Cart.save();
        Cart.updateUI();
    },

    remove: (productId) => {
        const index = CatalogState.cart.findIndex(item => item.id === productId);
        if (index > -1) {
            const item = CatalogState.cart[index];
            CatalogState.cart.splice(index, 1);
            Toast.show(`${item.name} removido del carrito`);
            Cart.save();
            Cart.updateUI();
        }
    },

    updateQuantity: (productId, newQuantity) => {
        const item = CatalogState.cart.find(item => item.id === productId);
        if (item) {
            if (newQuantity <= 0) {
                Cart.remove(productId);
            } else {
                item.quantity = newQuantity;
                Cart.save();
                Cart.updateUI();
            }
        }
    },

    clear: () => {
        CatalogState.cart = [];
        Cart.save();
        Cart.updateUI();
        Toast.show('Carrito vaciado');
    },

    getTotal: () => {
        return CatalogState.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    },

    getTotalItems: () => {
        return CatalogState.cart.reduce((total, item) => total + item.quantity, 0);
    },

    save: () => {
        localStorage.setItem('chocolateCart', JSON.stringify(CatalogState.cart));
    },

    updateUI: () => {
        const totalItems = Cart.getTotalItems();
        const total = Cart.getTotal();

        const cartBadge = document.getElementById('cartBadge');
        const cartTotalDisplay = document.getElementById('cartTotalDisplay');
        
        if (totalItems > 0) {
            cartBadge.textContent = totalItems;
            cartBadge.classList.add('show');
        } else {
            cartBadge.classList.remove('show');
        }

        cartTotalDisplay.textContent = Utils.formatPrice(total).replace(', '');

        if (document.getElementById('cartModal').classList.contains('active')) {
            Cart.renderModal();
        }
    },

    renderModal: () => {
        const cartItemsList = document.getElementById('cartItemsList');
        const cartSubtotal = document.getElementById('cartSubtotal');
        const cartTotal = document.getElementById('cartTotal');
        const shippingCost = document.getElementById('shippingCost');

        if (CatalogState.cart.length === 0) {
            cartItemsList.innerHTML = `
                <div class="empty-cart">
                    <h3>Tu carrito está vacío</h3>
                    <p>¡Agrega algunos productos deliciosos!</p>
                </div>
            `;
            cartSubtotal.textContent = '$0.00';
            cartTotal.textContent = '$0.00';
            return;
        }

        cartItemsList.innerHTML = CatalogState.cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image ${item.type}">${item.image}</div>
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">${Utils.formatPrice(item.price)}</div>
                </div>
                <div class="cart-item-controls">
                    <button class="quantity-btn" onclick="Cart.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <span class="quantity-display">${item.quantity}</span>
                    <button class="quantity-btn" onclick="Cart.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    <button class="remove-btn" onclick="Cart.remove(${item.id})">🗑️</button>
                </div>
            </div>
        `).join('');

        const subtotal = Cart.getTotal();
        const shipping = subtotal >= 50 ? 0 : 5.99;
        const total = subtotal + shipping;

        cartSubtotal.textContent = Utils.formatPrice(subtotal);
        shippingCost.textContent = shipping === 0 ? 'Gratis' : Utils.formatPrice(shipping);
        cartTotal.textContent = Utils.formatPrice(total);
    }
};

// ==========================================
// GESTIÓN DE PRODUCTOS DEL CATÁLOGO
// ==========================================

const Catalog = {
    init: () => {
        CatalogState.products = [...CATALOG_DB];
        CatalogState.filteredProducts = [...CATALOG_DB];
        Catalog.render();
        Catalog.updateCategoryFilters();
    },

    filter: (category) => {
        CatalogState.currentFilter = category;
        CatalogState.currentPage = 1;

        if (category === 'all') {
            CatalogState.filteredProducts = [...CatalogState.products];
        } else {
            CatalogState.filteredProducts = CatalogState.products.filter(product => 
                product.category === category
            );
        }

        Catalog.render();
        Catalog.updateCategoryFilters();
    },

    render: () => {
        const catalogGrid = document.getElementById('catalogGrid');
        const startIndex = (CatalogState.currentPage - 1) * CatalogState.productsPerPage;
        const endIndex = startIndex + CatalogState.productsPerPage;
        const productsToShow = CatalogState.filteredProducts.slice(0, endIndex);

        if (productsToShow.length === 0) {
            catalogGrid.innerHTML = `
                <div class="no-products">
                    <h3>No se encontraron productos</h3>
                    <p>Intenta con otra categoría</p>
                </div>
            `;
            return;
        }

        catalogGrid.innerHTML = productsToShow.map(product => `
            <div class="product-card" data-id="${product.id}">
                <div class="product-image ${product.type}">
                    ${product.image}
                    <span class="category-badge ${product.type}">${product.category}</span>
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <div class="product-price">
                        <span class="price">${Utils.formatPrice(product.price)}</span>
                        <button class="add-to-cart" onclick="Cart.add(${product.id})">
                            Agregar
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        // Actualizar botón "Ver más"
        const loadMoreBtn = document.querySelector('.load-more-btn');
        if (endIndex >= CatalogState.filteredProducts.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'inline-flex';
        }

        // Animar elementos
        Catalog.animateProducts();
    },

    updateCategoryFilters: () => {
        const categories = ['all', 'rosas', 'chocolates', 'arreglos'];
        
        categories.forEach(category => {
            const count = category === 'all' 
                ? CatalogState.products.length 
                : CatalogState.products.filter(p => p.category === category).length;
            
            const countElement = document.getElementById(`count${category.charAt(0).toUpperCase() + category.slice(1)}`);
            if (countElement) {
                countElement.textContent = count;
            }
        });
    },

    loadMore: () => {
        CatalogState.currentPage++;
        Catalog.render();
    },

    animateProducts: () => {
        const productCards = document.querySelectorAll('.product-card');
        productCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
};

// ==========================================
// FUNCIONES GLOBALES
// ==========================================

function filterCategory(category, buttonElement) {
    // Actualizar botón activo
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    buttonElement.classList.add('active');
    
    // Filtrar productos
    Catalog.filter(category);
    
    // Scroll suave al catálogo
    setTimeout(() => {
        Utils.smoothScroll('catalogGrid');
    }, 100);
}

function loadMoreProducts() {
    const loadMoreBtn = document.querySelector('.load-more-btn');
    loadMoreBtn.disabled = true;
    loadMoreBtn.innerHTML = '<span>Cargando...</span><i>⏳</i>';
    
    setTimeout(() => {
        Catalog.loadMore();
        loadMoreBtn.disabled = false;
        loadMoreBtn.innerHTML = '<span>Ver Más Productos</span><i>⬇️</i>';
    }, 1000);
}

function toggleCart() {
    const cartModal = document.getElementById('cartModal');
    cartModal.classList.add('active');
    Cart.renderModal();
}

function closeCart() {
    const cartModal = document.getElementById('cartModal');
    cartModal.classList.remove('active');
}

function clearCart() {
    if (CatalogState.cart.length > 0) {
        if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
            Cart.clear();
        }
    }
}

function proceedToCheckout() {
    if (CatalogState.cart.length === 0) {
        Toast.show('Tu carrito está vacío', 'warning');
        return;
    }
    
    Toast.show('Redirigiendo al proceso de pago...', 'info');
    setTimeout(() => {
        Toast.show('Funcionalidad de pago en desarrollo', 'info');
    }, 1500);
}

// ==========================================
// EFECTOS VISUALES ADICIONALES
// ==========================================

const VisualEffects = {
    init: () => {
        VisualEffects.setupHoverEffects();
        VisualEffects.setupScrollEffects();
    },

    setupHoverEffects: () => {
        // Efecto hover para tarjetas de productos
        document.addEventListener('mouseover', (e) => {
            if (e.target.closest('.product-card')) {
                const card = e.target.closest('.product-card');
                card.style.transform = 'translateY(-10px) scale(1.02)';
            }
        });

        document.addEventListener('mouseout', (e) => {
            if (e.target.closest('.product-card')) {
                const card = e.target.closest('.product-card');
                card.style.transform = 'translateY(0) scale(1)';
            }
        });
    },

    setupScrollEffects: () => {
        // Efecto parallax suave en el hero
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = document.querySelector('.hero-particles');
            if (parallax) {
                parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });

        // Observer para animaciones al entrar en viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        // Observar elementos que deben animarse
        document.querySelectorAll('.filter-btn, .product-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
};

// ==========================================
// ESTADÍSTICAS Y ANALYTICS (SIMULADO)
// ==========================================

const Analytics = {
    trackPageView: () => {
        console.log('📊 Página de catálogo visitada');
    },

    trackProductView: (productId) => {
        console.log(`👁️ Producto ${productId} visualizado`);
    },

    trackAddToCart: (productId, productName) => {
        console.log(`🛒 Producto agregado al carrito: ${productName} (ID: ${productId})`);
    },

    trackCategoryFilter: (category) => {
        console.log(`🔍 Filtrado por categoría: ${category}`);
    }
};

// ==========================================
// INICIALIZACIÓN
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // Mostrar loading
    const loadingOverlay = document.getElementById('loadingOverlay');
    loadingOverlay.classList.add('active');

    // Simular carga de datos
    setTimeout(() => {
        // Inicializar módulos
        Catalog.init();
        Cart.updateUI();
        VisualEffects.init();
        Analytics.trackPageView();

        // Ocultar loading
        loadingOverlay.classList.remove('active');

        // Mensaje de bienvenida
        setTimeout(() => {
            Toast.show('¡Bienvenido a nuestro catálogo premium!', 'success');
        }, 500);
    }, 2000);

    // Event listeners globales
    document.addEventListener('click', (e) => {
        // Cerrar modal al hacer clic en el overlay
        if (e.target.classList.contains('modal-overlay')) {
            e.target.classList.remove('active');
        }

        // Track product clicks
        if (e.target.closest('.product-card')) {
            const productId = e.target.closest('.product-card').dataset.id;
            Analytics.trackProductView(productId);
        }

        // Track add to cart
        if (e.target.classList.contains('add-to-cart')) {
            const productCard = e.target.closest('.product-card');
            const productId = productCard.dataset.id;
            const productName = productCard.querySelector('h3').textContent;
            Analytics.trackAddToCart(productId, productName);
        }
    });

    // Teclas de acceso rápido
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal-overlay.active').forEach(modal => {
                modal.classList.remove('active');
            });
        }
    });

    // Smooth scroll para navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// ==========================================
// FUNCIONES ADICIONALES
// ==========================================

// Función para buscar productos (para futuras implementaciones)
function searchProducts(query) {
    const filteredProducts = CatalogState.products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
    );
    
    CatalogState.filteredProducts = filteredProducts;
    CatalogState.currentPage = 1;
    Catalog.render();
}

// Función para ordenar productos
function sortProducts(criteria) {
    switch (criteria) {
        case 'price-low':
            CatalogState.filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            CatalogState.filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            CatalogState.filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        default:
            CatalogState.filteredProducts = [...CatalogState.products];
    }
    
    CatalogState.currentPage = 1;
    Catalog.render();
}

// Función para compartir productos (simulada)
function shareProduct(productId) {
    const product = CatalogState.products.find(p => p.id === productId);
    if (product) {
        if (navigator.share) {
            navigator.share({
                title: product.name,
                text: product.description,
                url: window.location.href
            });
        } else {
            // Fallback para navegadores sin soporte nativo
            const shareText = `${product.name} - ${product.description} ${window.location.href}`;
            navigator.clipboard.writeText(shareText).then(() => {
                Toast.show('Enlace copiado al portapapeles', 'success');
            });
        }
    }
}

// Función para vista rápida de producto (modal)
function quickView(productId) {
    const product = CatalogState.products.find(p => p.id === productId);
    if (product) {
        // Crear modal de vista rápida
        const quickViewModal = document.createElement('div');
        quickViewModal.className = 'modal-overlay active';
        quickViewModal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Vista Rápida</h3>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">✕</button>
                </div>
                <div class="modal-body">
                    <div class="product-image ${product.type}" style="margin-bottom: 1rem; height: 200px;">
                        ${product.image}
                    </div>
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <div class="product-price" style="margin-top: 1rem;">
                        <span class="price">${Utils.formatPrice(product.price)}</span>
                        <button class="add-to-cart" onclick="Cart.add(${product.id}); this.closest('.modal-overlay').remove();">
                            Agregar al Carrito
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(quickViewModal);
        
        // Auto-remover después de un tiempo o al hacer clic fuera
        quickViewModal.addEventListener('click', (e) => {
            if (e.target === quickViewModal) {
                quickViewModal.remove();
            }
        });
    }
}

console.log('🌹🍫💐 Catálogo ChocolateVentas v1.0 - Sistema iniciado correctamente');