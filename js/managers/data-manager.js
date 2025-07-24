/*
GESTOR CENTRAL DE DATOS - RESTAURANTE TASTY
Administra todos los datos centralizados y proporciona una API unificada
*/

class DataManager {
    constructor() {
        this.initialized = false;
        this.currentLanguage = 'es';
        this.cache = new Map();
        this.observers = new Map();
        
        this.init();
    }
    
    // Inicializar el gestor de datos
    async init() {
        try {
            // Verificar que todos los datos estén disponibles
            this.waitForData().then(() => {
                this.initialized = true;
                this.notifyObservers('initialized', true);
                console.log('✅ DataManager initialized successfully');
            });
        } catch (error) {
            console.error('❌ Error initializing DataManager:', error);
        }
    }
    
    // Esperar a que todos los datos estén cargados
    waitForData() {
        return new Promise((resolve) => {
            const checkData = () => {
                if (window.BusinessInfo && window.MenuData && window.TestimonialsData) {
                    resolve();
                } else {
                    setTimeout(checkData, 100);
                }
            };
            checkData();
        });
    }
    
    // MÉTODOS DE INFORMACIÓN EMPRESARIAL
    
    getBusinessInfo() {
        return window.BusinessInfo;
    }
    
    getContactInfo() {
        return window.BusinessInfo.contact;
    }
    
    getAddress(format = 'full') {
        const address = window.BusinessInfo.contact.address;
        return format === 'short' ? address.short : address.full;
    }
    
    getPhone(type = 'display') {
        const phones = window.BusinessInfo.contact.phone;
        return phones[type] || phones.display;
    }
    
    getEmail(type = 'main') {
        const emails = window.BusinessInfo.contact.email;
        return emails[type] || emails.main;
    }
    
    getHours(language = null) {
        const lang = language || this.currentLanguage;
        return window.BusinessInfo.getHours(lang);
    }
    
    getSocialLinks() {
        return window.BusinessInfo.getSocialLinks();
    }
    
    // MÉTODOS DEL MENÚ
    
    getMenuData() {
        return window.MenuData;
    }
    
    getMenuCategories() {
        return window.MenuData.getActiveCategories();
    }
    
    getMenuItem(itemId) {
        return window.MenuData.getItem(itemId);
    }
    
    getMenuItemsByCategory(categoryId) {
        return window.MenuData.getItemsByCategory(categoryId);
    }
    
    getFeaturedMenuItems() {
        return window.MenuData.getFeaturedItems();
    }
    
    formatPrice(price, currency = 'USD') {
        return window.MenuData.formatPrice(price, currency, this.currentLanguage);
    }
    
    searchMenuItems(query) {
        return window.MenuData.searchItems(query, this.currentLanguage);
    }
    
    // MÉTODOS DE TESTIMONIOS
    
    getTestimonialsData() {
        return window.TestimonialsData;
    }
    
    getFeaturedTestimonials() {
        return window.TestimonialsData.getFeaturedTestimonials();
    }
    
    getTestimonialStats() {
        return window.TestimonialsData.getStats();
    }
    
    getRandomTestimonial() {
        return window.TestimonialsData.getRandomTestimonial();
    }
    
    // MÉTODOS DE IDIOMA
    
    setLanguage(language) {
        if (language !== this.currentLanguage) {
            this.currentLanguage = language;
            this.clearCache();
            this.notifyObservers('languageChanged', language);
        }
    }
    
    getCurrentLanguage() {
        return this.currentLanguage;
    }
    
    // MÉTODOS DE CACHÉ
    
    getCached(key) {
        return this.cache.get(key);
    }
    
    setCached(key, value, ttl = 300000) { // 5 minutos por defecto
        this.cache.set(key, {
            value,
            expires: Date.now() + ttl
        });
    }
    
    clearCache() {
        this.cache.clear();
    }
    
    // Limpiar caché expirado
    cleanExpiredCache() {
        const now = Date.now();
        for (const [key, data] of this.cache.entries()) {
            if (data.expires < now) {
                this.cache.delete(key);
            }
        }
    }
    
    // SISTEMA DE OBSERVADORES
    
    subscribe(event, callback) {
        if (!this.observers.has(event)) {
            this.observers.set(event, []);
        }
        this.observers.get(event).push(callback);
    }
    
    unsubscribe(event, callback) {
        if (this.observers.has(event)) {
            const callbacks = this.observers.get(event);
            const index = callbacks.indexOf(callback);
            if (index > -1) {
                callbacks.splice(index, 1);
            }
        }
    }
    
    notifyObservers(event, data) {
        if (this.observers.has(event)) {
            this.observers.get(event).forEach(callback => {
                try {
                    callback(data);
                } catch (error) {
                    console.error(`Error in observer for event ${event}:`, error);
                }
            });
        }
    }
    
    // MÉTODOS DE UTILIDAD
    
    // Obtener datos para Schema.org
    getSchemaData() {
        const businessSchema = window.BusinessInfo.getSchemaData();
        const reviewsSchema = window.TestimonialsData.getSchemaReviews();
        
        return {
            ...businessSchema,
            review: reviewsSchema,
            aggregateRating: {
                "@type": "AggregateRating",
                "ratingValue": window.TestimonialsData.config.averageRating,
                "reviewCount": window.TestimonialsData.config.totalReviews,
                "bestRating": window.TestimonialsData.config.maxRating
            }
        };
    }
    
    // Obtener datos para meta tags
    getMetaData(pageType = 'home') {
        const business = window.BusinessInfo;
        const baseData = {
            siteName: business.name,
            url: business.seo.baseUrl,
            image: business.seo.baseUrl + business.seo.defaultImage,
            phone: business.contact.phone.main,
            email: business.contact.email.main,
            address: business.contact.address.full
        };
        
        const pageSpecific = {
            home: {
                title: `${business.name} - ${business.tagline}`,
                description: business.description[this.currentLanguage]
            },
            menu: {
                title: `Menú - ${business.name}`,
                description: `Descubre nuestro menú con ${window.MenuData.getMenuStats().availableItems} platillos gourmet`
            },
            contact: {
                title: `Contacto - ${business.name}`,
                description: `Contáctanos: ${business.contact.address.short} | ${business.contact.phone.display}`
            }
        };
        
        return { ...baseData, ...pageSpecific[pageType] };
    }
    
    // Validar datos
    validateData() {
        const errors = [];
        
        // Validar información empresarial
        if (!window.BusinessInfo) {
            errors.push('BusinessInfo not loaded');
        } else {
            if (!window.BusinessInfo.contact.address.full) {
                errors.push('Business address is missing');
            }
            if (!window.BusinessInfo.contact.phone.main) {
                errors.push('Business phone is missing');
            }
        }
        
        // Validar datos del menú
        if (!window.MenuData) {
            errors.push('MenuData not loaded');
        } else {
            const stats = window.MenuData.getMenuStats();
            if (stats.availableItems === 0) {
                errors.push('No menu items available');
            }
        }
        
        // Validar testimonios
        if (!window.TestimonialsData) {
            errors.push('TestimonialsData not loaded');
        } else {
            const featured = window.TestimonialsData.getFeaturedTestimonials();
            if (featured.length === 0) {
                errors.push('No featured testimonials available');
            }
        }
        
        return {
            isValid: errors.length === 0,
            errors
        };
    }
    
    // Obtener estadísticas generales
    getGeneralStats() {
        if (!this.initialized) return null;
        
        return {
            business: {
                name: window.BusinessInfo.name,
                established: window.BusinessInfo.established,
                rating: window.BusinessInfo.seo.rating.value,
                totalReviews: window.BusinessInfo.seo.rating.count
            },
            menu: window.MenuData.getMenuStats(),
            testimonials: window.TestimonialsData.getStats(),
            lastUpdated: new Date().toISOString()
        };
    }
    
    // Método para debugging
    debug() {
        console.group('🔍 DataManager Debug Info');
        console.log('Initialized:', this.initialized);
        console.log('Current Language:', this.currentLanguage);
        console.log('Cache Size:', this.cache.size);
        console.log('Observers:', Object.fromEntries(this.observers));
        console.log('Validation:', this.validateData());
        console.log('Stats:', this.getGeneralStats());
        console.groupEnd();
    }
}

// Crear instancia global
window.DataManager = new DataManager();

// Exportar para uso en módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DataManager;
}
