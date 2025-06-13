// ==========================================
// CHOCOLATEVENTAS - JAVASCRIPT v2.0
// ==========================================

// Estado global de la aplicación
const AppState = {
    cart: JSON.parse(localStorage.getItem('chocolateCart')) || [],
    products: [],
    filteredProducts: [],
    currentFilter: 'all',
    currentPage: 1,
    productsPerPage: 8,
    searchQuery: '',
    user: {
        name: 'Cliente Premium',
        avatar: '👤'
    }
};

// Base de datos de productos simulada
const PRODUCTS_DB = [
    {
        id: 1,
        name: 'Trufa de Chocolate Negro',
        description: 'Exquisita trufa artesanal con chocolate negro 70% y ganache cremoso.',
        price: 15.99,
        originalPrice: 19.99,
        category: 'trufas',
        stock: 25,
        rating: 4.8,
        image: '🍫',
        badges: ['featured', 'sale'],
        ingredients: ['Chocolate negro', 'Crema', 'Mantequilla']
    },
    {
        id: 2,
        name: 'Bombones de Frambuesa',
        description: 'Deliciosos bombones rellenos de mermelada de frambuesa natural.',
        price: 24.99,
        category: 'bombones',
        stock: 18,
        rating: 4.9,
        image: '🍬',
        badges: ['new'],
        ingredients: ['Chocolate blanco', 'Frambuesa', 'Azúcar']
    },
    {
        id: 3,
        name: 'Tableta Chocolate con Almendras',
        description: 'Tableta premium con chocolate con leche y almendras tostadas.',
        price: 12.50,
        category: 'tabletas',
        stock: 32,
        rating: 4.7,
        image: '🍫',
        badges: [],
        ingredients: ['Chocolate con leche', 'Almendras', 'Vainilla']
    },
    {
        id: 4,
        name: 'Caja Regalo Especial',
        description: 'Elegante caja con una selección de nuestros mejores chocolates.',
        price: 49.99,
        originalPrice: 65.99,
        category: 'regalos',
        stock: 12,
        rating: 4.9,
        image: '💝',
        badges: ['featured', 'sale'],
        ingredients: ['Variedad de chocolates', 'Empaque premium']
    },
    {
        id: 5,
        name: 'Trufas de Café',
        description: 'Trufas gourmet con intenso sabor a café colombiano.',
        price: 18.99,
        category: 'trufas',
        stock: 22,
        rating: 4.6,
        image: '🍫',
        badges: [],
        ingredients: ['Chocolate negro', 'Café colombiano', 'Licor de café']
    },
    {
        id: 6,
        name: 'Bombones Mixtos Premium',
        description: 'Surtido de bombones con diferentes rellenos y sabores únicos.',
        price: 32.99,
        category: 'bombones',
        stock: 15,
        rating: 4.8,
        image: '🍬',
        badges: ['featured'],
        ingredients: ['Chocolates variados', 'Rellenos gourmet']
    },
    {
        id: 7,
        name: 'Tableta Chocolate Blanco',
        description: 'Suave tableta de chocolate blanco belga con vainilla natural.',
        price: 14.99,
        category: 'tabletas',
        stock: 28,
        rating: 4.5,
        image: '🍫',
        badges: ['new'],
        ingredients: ['Chocolate blanco', 'Vainilla', 'Leche']
    },
    {
        id: 8,
        name: 'Set Chocolates San Valentín',
        description: 'Romántica colección de chocolates en forma de corazón.',
        price: 35.99,
        category: 'regalos',
        stock: 8,
        rating: 4.9,
        image: '💝',
        badges: ['featured'],
        ingredients: ['Chocolates temáticos', 'Empaque romántico']
    },
    {
        id: 9,
        name: 'Trufas de Champagne',
        description: 'Exclusivas trufas con champagne francés y chocolate premium.',
        price: 28.99,
        category: 'trufas',
        stock: 10,
        rating: 4.9,
        image: '🍫',
        badges: ['featured'],
        ingredients: ['Chocolate premium', 'Champagne francés']
    },
    {
        id: 10,
        name: 'Bombones de Caramelo',
        description: 'Irresistibles bombones con centro de caramelo salado.',
        price: 21.99,
        category: 'bombones',
        stock: 20,
        rating: 4.7,
        image: '🍬',
        badges: [],
        ingredients: ['Chocolate con leche', 'Caramelo', 'Sal marina']
    },
    {
        id: 11,
        name: 'Tableta Chocolate 85%',
        description: 'Intensa tableta de chocolate negro con 85% de cacao.',
        price: 16.99,
        category: 'tabletas',
        stock: 24,
        rating: 4.6,
        image: '🍫',
        badges: [],
        ingredients: ['Cacao 85%', 'Azúcar orgánico']
    },
    {
        id: 12,
        name: 'Caja Corporativa Deluxe',
        description: 'Impresionante caja para regalos corporativos y eventos especiales.',
        price: 89.99,
        originalPrice: 110.99,
        category: 'regalos',
        stock: 5,
        rating: 4.9,
        image: '💝',
        badges: ['featured', 'sale'],
        ingredients: ['Selección premium', 'Empaque corporativo']
    }
];

// ==========================================
// UTILIDADES Y HELPERS
// ==========================================

const Utils = {
    // Formatear precio
    formatPrice: (price) => {
        return `$${price.toFixed(2)}`;
    },

    // Generar estrellas de rating
    generateStars: (rating) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        let stars = '';
        
        for (let i = 0; i < fullStars; i++) {
            stars += '⭐';
        }
        if (hasHalfStar) {
            stars += '⭐';
        }
        
        return stars;
    },

    // Debounce para búsquedas
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

    // Validar stock
    getStockStatus: (stock) => {
        if (stock === 0) return { class: 'out-of-stock', text: 'Agotado' };
        if (stock <= 5) return { class: 'low-stock', text: `Solo ${stock} disponibles` };
        return { class: '', text: `${stock} disponibles` };
    },

    // Animación de scroll suave
    smoothScroll: (targetId) => {
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    },

    // Generar ID único
    generateId: () => {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
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

        // Mostrar toast
        setTimeout(() => toast.classList.add('show'), 100);

        // Auto-remover
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
    // Agregar producto al carrito
    add: (productId, quantity = 1) => {
        const product = AppState.products.find(p => p.id === productId);
        if (!product) return;

        const existingItem = AppState.cart.find(item => item.id === productId);
        
        if (existingItem) {
            if (existingItem.quantity + quantity <= product.stock) {
                existingItem.quantity += quantity;
                Toast.show(`Se agregó ${quantity} más al carrito`);
            } else {
                Toast.show('No hay suficiente stock disponible', 'warning');
                return;
            }
        } else {
            if (quantity <= product.stock) {
                AppState.cart.push({
                    id: productId,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity: quantity,
                    maxStock: product.stock
                });
                Toast.show(`${product.name} agregado al carrito`);
            } else {
                Toast.show('No hay suficiente stock disponible', 'warning');
                return;
            }
        }

        Cart.save();
        Cart.updateUI();
    },

    // Remover producto del carrito
    remove: (productId) => {
        const index = AppState.cart.findIndex(item => item.id === productId);
        if (index > -1) {
            const item = AppState.cart[index];
            AppState.cart.splice(index, 1);
            Toast.show(`${item.name} removido del carrito`);
            Cart.save();
            Cart.updateUI();
        }
    },

    // Actualizar cantidad
    updateQuantity: (productId, newQuantity) => {
        const item = AppState.cart.find(item => item.id === productId);
        if (item) {
            if (newQuantity <= 0) {
                Cart.remove(productId);
            } else if (newQuantity <= item.maxStock) {
                item.quantity = newQuantity;
                Cart.save();
                Cart.updateUI();
            } else {
                Toast.show('Cantidad excede el stock disponible', 'warning');
            }
        }
    },

    // Vaciar carrito
    clear: () => {
        AppState.cart = [];
        Cart.save();
        Cart.updateUI();
        Toast.show('Carrito vaciado');
    },

    // Obtener total
    getTotal: () => {
        return AppState.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    },

    // Obtener cantidad total de items
    getTotalItems: () => {
        return AppState.cart.reduce((total, item) => total + item.quantity, 0);
    },

    // Guardar en localStorage
    save: () => {
        localStorage.setItem('chocolateCart', JSON.stringify(AppState.cart));
    },

    // Actualizar UI del carrito
    updateUI: () => {
        const totalItems = Cart.getTotalItems();
        const total = Cart.getTotal();

        // Actualizar badge del carrito
        const cartBadge = document.getElementById('cartBadge');
        const cartTotalDisplay = document.getElementById('cartTotalDisplay');
        
        if (totalItems > 0) {
            cartBadge.textContent = totalItems;
            cartBadge.classList.add('show');
        } else {
            cartBadge.classList.remove('show');
        }

        cartTotalDisplay.textContent = Utils.formatPrice(total).replace(', '');

        // Actualizar stats dashboard
        document.getElementById('cartValue').textContent = Utils.formatPrice(total);
        document.getElementById('cartItems').textContent = totalItems;

        // Actualizar modal del carrito si está abierto
        if (document.getElementById('cartModal').classList.contains('active')) {
            Cart.renderModal();
        }
    },

    // Renderizar modal del carrito
    renderModal: () => {
        const cartItemsList = document.getElementById('cartItemsList');
        const cartSubtotal = document.getElementById('cartSubtotal');
        const cartTotal = document.getElementById('cartTotal');
        const shippingCost = document.getElementById('shippingCost');

        if (AppState.cart.length === 0) {
            cartItemsList.innerHTML = `
                <div class="empty-cart">
                    <h3>Tu carrito está vacío</h3>
                    <p>¡Agrega algunos chocolates deliciosos!</p>
                </div>
            `;
            cartSubtotal.textContent = '$0.00';
            cartTotal.textContent = '$0.00';
            return;
        }

        cartItemsList.innerHTML = AppState.cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">${item.image}</div>
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
// GESTIÓN DE PRODUCTOS
// ==========================================

const Products = {
    // Inicializar productos
    init: () => {
        AppState.products = [...PRODUCTS_DB];
        AppState.filteredProducts = [...PRODUCTS_DB];
        Products.render();
        Products.updateCategoryFilters();
        Products.updateStats();
    },

    // Filtrar productos
    filter: (category) => {
        AppState.currentFilter = category;
        AppState.currentPage = 1;

        if (category === 'all') {
            AppState.filteredProducts = [...AppState.products];
        } else {
            AppState.filteredProducts = AppState.products.filter(product => 
                product.category === category
            );
        }

        // Aplicar filtro de búsqueda si existe
        if (AppState.searchQuery) {
            Products.search(AppState.searchQuery, false);
        }

        Products.render();
        Products.updateCategoryFilters();
    },

    // Buscar productos
    search: (query, updateFilters = true) => {
        AppState.searchQuery = query.toLowerCase();
        
        let productsToSearch = AppState.currentFilter === 'all' 
            ? AppState.products 
            : AppState.products.filter(p => p.category === AppState.currentFilter);

        if (query) {
            AppState.filteredProducts = productsToSearch.filter(product =>
                product.name.toLowerCase().includes(AppState.searchQuery) ||
                product.description.toLowerCase().includes(AppState.searchQuery) ||
                product.category.toLowerCase().includes(AppState.searchQuery)
            );
        } else {
            AppState.filteredProducts = productsToSearch;
        }

        AppState.currentPage = 1;
        Products.render();
        
        if (updateFilters) {
            Products.updateCategoryFilters();
        }
    },

    // Renderizar productos
    render: () => {
        const productsGrid = document.getElementById('productsGrid');
        const startIndex = (AppState.currentPage - 1) * AppState.productsPerPage;
        const endIndex = startIndex + AppState.productsPerPage;
        const productsToShow = AppState.filteredProducts.slice(0, endIndex);

        if (productsToShow.length === 0) {
            productsGrid.innerHTML = `
                <div class="no-products">
                    <h3>No se encontraron productos</h3>
                    <p>Intenta con otros términos de búsqueda o categoría</p>
                </div>
            `;
            return;
        }

        productsGrid.innerHTML = productsToShow.map(product => {
            const stockStatus = Utils.getStockStatus(product.stock);
            const isOutOfStock = product.stock === 0;
            
            return `
                <div class="product-card" data-id="${product.id}">
                    <div class="product-image">
                        ${product.image}
                        ${product.badges.includes('featured') ? '<span class="featured-badge">Destacado</span>' : ''}
                        ${product.badges.includes('new') ? '<span class="new-badge">Nuevo</span>' : ''}
                        ${product.badges.includes('sale') ? '<span class="sale-badge">Oferta</span>' : ''}
                    </div>
                    <div class="product-info">
                        <h3>${product.name}</h3>
                        <p>${product.description}</p>
                        <div class="product-rating">
                            <span class="rating-stars">${Utils.generateStars(product.rating)}</span>
                            <span class="rating-number">${product.rating}</span>
                        </div>
                        <div class="product-stock ${stockStatus.class}">${stockStatus.text}</div>
                        <div class="product-price">
                            <div class="price-container">
                                <span class="price">${Utils.formatPrice(product.price)}</span>
                                ${product.originalPrice ? `<span class="original-price">${Utils.formatPrice(product.originalPrice)}</span>` : ''}
                            </div>
                            <button class="add-to-cart ${isOutOfStock ? 'disabled' : ''}" 
                                    onclick="Cart.add(${product.id})" 
                                    ${isOutOfStock ? 'disabled' : ''}>
                                ${isOutOfStock ? 'Agotado' : 'Agregar'}
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        // Actualizar botón "Cargar más"
        const loadMoreBtn = document.querySelector('.load-more-btn');
        if (endIndex >= AppState.filteredProducts.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'inline-flex';
        }
    },

    // Actualizar filtros de categoría
    updateCategoryFilters: () => {
        const categories = ['all', 'trufas', 'bombones', 'tabletas', 'regalos'];
        
        categories.forEach(category => {
            const count = category === 'all' 
                ? AppState.products.length 
                : AppState.products.filter(p => p.category === category).length;
            
            const countElement = document.getElementById(`count${category.charAt(0).toUpperCase() + category.slice(1)}`);
            if (countElement) {
                countElement.textContent = count;
            }
        });
    },

    // Actualizar estadísticas
    updateStats: () => {
        document.getElementById('totalProducts').textContent = AppState.products.length;
    },

    // Cargar más productos
    loadMore: () => {
        AppState.currentPage++;
        Products.render();
    }
};

// ==========================================
// GESTIÓN DE BÚSQUEDA
// ==========================================

const Search = {
    suggestions: [
        'Chocolate negro', 'Trufas', 'Bombones', 'Tabletas', 'Regalos',
        'Chocolate blanco', 'Caramelo', 'Frambuesa', 'Café', 'Almendras'
    ],

    init: () => {
        const searchInput = document.getElementById('searchInput');
        const searchSuggestions = document.getElementById('searchSuggestions');

        // Debounced search
        const debouncedSearch = Utils.debounce((query) => {
            Products.search(query);
        }, 300);

        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim();
            debouncedSearch(query);
            
            if (query.length > 0) {
                Search.showSuggestions(query);
            } else {
                Search.hideSuggestions();
            }
        });

        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                Search.hideSuggestions();
                Utils.smoothScroll('products');
            }
        });

        // Cerrar sugerencias al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-container')) {
                Search.hideSuggestions();
            }
        });
    },

    showSuggestions: (query) => {
        const searchSuggestions = document.getElementById('searchSuggestions');
        const filteredSuggestions = Search.suggestions.filter(suggestion =>
            suggestion.toLowerCase().includes(query.toLowerCase())
        );

        if (filteredSuggestions.length > 0) {
            searchSuggestions.innerHTML = filteredSuggestions.map(suggestion => `
                <div class="suggestion-item" onclick="Search.selectSuggestion('${suggestion}')">
                    ${suggestion}
                    <small>sugerencia</small>
                </div>
            `).join('');
            searchSuggestions.classList.add('active');
        } else {
            Search.hideSuggestions();
        }
    },

    hideSuggestions: () => {
        const searchSuggestions = document.getElementById('searchSuggestions');
        searchSuggestions.classList.remove('active');
    },

    selectSuggestion: (suggestion) => {
        const searchInput = document.getElementById('searchInput');
        searchInput.value = suggestion;
        Products.search(suggestion);
        Search.hideSuggestions();
        Utils.smoothScroll('products');
    }
};

// ==========================================
// FUNCIONES GLOBALES (llamadas desde HTML)
// ==========================================

// Toggle búsqueda
function toggleSearch() {
    const searchBar = document.getElementById('searchBarExpanded');
    const searchInput = document.getElementById('searchInput');
    
    searchBar.classList.toggle('active');
    
    if (searchBar.classList.contains('active')) {
        setTimeout(() => searchInput.focus(), 300);
    } else {
        searchInput.value = '';
        AppState.searchQuery = '';
        Products.search('');
        Search.hideSuggestions();
    }
}

// Realizar búsqueda
function performSearch() {
    const query = document.getElementById('searchInput').value.trim();
    if (query) {
        Products.search(query);
        Utils.smoothScroll('products');
        Search.hideSuggestions();
    }
}

// Filtrar productos por categoría
function filterProducts(category, buttonElement) {
    // Actualizar botón activo
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    buttonElement.classList.add('active');
    
    // Filtrar productos
    Products.filter(category);
}

// Cargar más productos
function loadMoreProducts() {
    const loadMoreBtn = document.querySelector('.load-more-btn');
    loadMoreBtn.disabled = true;
    loadMoreBtn.innerHTML = '<span>Cargando...</span><i>⏳</i>';
    
    setTimeout(() => {
        Products.loadMore();
        loadMoreBtn.disabled = false;
        loadMoreBtn.innerHTML = '<span>Cargar Más Productos</span><i>⬇️</i>';
    }, 1000);
}

// Scroll a productos
function scrollToProducts() {
    Utils.smoothScroll('products');
}

// Abrir video promocional
function openPromoVideo() {
    Toast.show('Funcionalidad de video en desarrollo', 'info');
}

// Toggle carrito
function toggleCart() {
    const cartModal = document.getElementById('cartModal');
    cartModal.classList.add('active');
    Cart.renderModal();
}

// Cerrar carrito
function closeCart() {
    const cartModal = document.getElementById('cartModal');
    cartModal.classList.remove('active');
}

// Vaciar carrito
function clearCart() {
    if (AppState.cart.length > 0) {
        if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
            Cart.clear();
        }
    }
}

// Proceder al pago
function proceedToCheckout() {
    if (AppState.cart.length === 0) {
        Toast.show('Tu carrito está vacío', 'warning');
        return;
    }
    
    Toast.show('Redirigiendo al proceso de pago...', 'info');
    setTimeout(() => {
        Toast.show('Funcionalidad de pago en desarrollo', 'info');
    }, 1500);
}

// Toggle menú usuario
function toggleUserMenu() {
    const userDropdown = document.getElementById('userDropdown');
    userDropdown.classList.toggle('active');
}

// Cerrar sesión
function logout() {
    if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
        localStorage.removeItem('chocolateCart');
        Toast.show('Sesión cerrada correctamente');
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }
}

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
        Products.init();
        Search.init();
        Cart.updateUI();

        // Ocultar loading
        loadingOverlay.classList.remove('active');

        // Mostrar mensaje de bienvenida
        setTimeout(() => {
            Toast.show('¡Bienvenido a ChocolateVentas!', 'success');
        }, 500);
    }, 2000);

    // Event listeners globales
    document.addEventListener('click', (e) => {
        // Cerrar menú usuario al hacer clic fuera
        if (!e.target.closest('.user-menu')) {
            document.getElementById('userDropdown').classList.remove('active');
        }

        // Cerrar modal al hacer clic en el overlay
        if (e.target.classList.contains('modal-overlay')) {
            e.target.classList.remove('active');
        }
    });

    // Navegación suave
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.getAttribute('data-section');
            
            // Actualizar navegación activa
            document.querySelectorAll('.nav-link').forEach(nav => nav.classList.remove('active'));
            link.classList.add('active');
            
            // Scroll suave
            if (section === 'home') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                Utils.smoothScroll(section);
            }
        });
    });

    // Teclas de acceso rápido
    document.addEventListener('keydown', (e) => {
        // Escape para cerrar modales
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal-overlay.active').forEach(modal => {
                modal.classList.remove('active');
            });
            document.getElementById('searchBarExpanded').classList.remove('active');
            document.getElementById('userDropdown').classList.remove('active');
        }

        // Ctrl+K para búsqueda
        if (e.ctrlKey && e.key === 'k') {
            e.preventDefault();
            toggleSearch();
        }
    });
});

// ==========================================
// FUNCIONES DE UTILIDAD ADICIONALES
// ==========================================

// Función para simular carga de más productos (para futuras implementaciones)
function simulateProductLoad() {
    const additionalProducts = [
        {
            id: 13,
            name: 'Chocolate Artesanal de Menta',
            description: 'Refrescante chocolate con hojas de menta natural.',
            price: 17.99,
            category: 'tabletas',
            stock: 15,
            rating: 4.4,
            image: '🍫',
            badges: ['new']
        }
    ];
    
    AppState.products.push(...additionalProducts);
    Products.updateStats();
    Products.updateCategoryFilters();
}

// Función para exportar datos del carrito (para futuras implementaciones)
function exportCartData() {
    const cartData = {
        items: AppState.cart,
        total: Cart.getTotal(),
        timestamp: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(cartData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = 'carrito-chocolateventas.json';
    link.click();
    
    Toast.show('Datos del carrito exportados', 'success');
}

// Función para animar elementos en viewport
function animateOnScroll() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });

    document.querySelectorAll('.product-card, .feature-card, .stat-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Inicializar animaciones cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(animateOnScroll, 2500);
});

console.log('🍫 ChocolateVentas v2.0 - Sistema iniciado correctamente');