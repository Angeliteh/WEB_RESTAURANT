/*
ACTUALIZADOR DE CONTENIDO - RESTAURANTE TASTY
Aplica los datos centralizados a todos los elementos de la web dinámicamente
*/

class ContentUpdater {
    constructor() {
        this.dataManager = null;
        this.updateQueue = [];
        this.isUpdating = false;
        
        this.init();
    }
    
    async init() {
        // Esperar a que DataManager esté listo
        if (window.DataManager) {
            this.dataManager = window.DataManager;
            this.setupEventListeners();
            await this.waitForDataManager();
            this.performInitialUpdate();
        } else {
            setTimeout(() => this.init(), 100);
        }
    }
    
    waitForDataManager() {
        return new Promise((resolve) => {
            if (this.dataManager.initialized) {
                resolve();
            } else {
                this.dataManager.subscribe('initialized', () => {
                    resolve();
                });
            }
        });
    }
    
    setupEventListeners() {
        // Escuchar cambios de idioma
        this.dataManager.subscribe('languageChanged', (language) => {
            this.updateAllContent();
        });
        
        // Limpiar caché periódicamente
        setInterval(() => {
            this.dataManager.cleanExpiredCache();
        }, 60000); // Cada minuto
    }
    
    performInitialUpdate() {
        console.log('🔄 Starting initial content update...');
        this.updateAllContent();
        console.log('✅ Initial content update completed');
    }
    
    // ACTUALIZACIÓN COMPLETA DE CONTENIDO
    
    updateAllContent() {
        if (this.isUpdating) {
            this.updateQueue.push('full');
            return;
        }
        
        this.isUpdating = true;
        
        try {
            // Actualizar en orden de prioridad
            this.updateBusinessInfo();
            this.updateContactInfo();
            this.updateMenuContent();
            this.updateTestimonials();
            this.updateMetaTags();
            this.updateSchemaData();
            this.updateSocialLinks();
            
            console.log('✅ Content update completed successfully');
        } catch (error) {
            console.error('❌ Error updating content:', error);
        } finally {
            this.isUpdating = false;
            this.processQueue();
        }
    }
    
    processQueue() {
        if (this.updateQueue.length > 0) {
            this.updateQueue.shift();
            setTimeout(() => this.updateAllContent(), 100);
        }
    }
    
    // ACTUALIZACIÓN DE INFORMACIÓN EMPRESARIAL
    
    updateBusinessInfo() {
        const business = this.dataManager.getBusinessInfo();
        
        // Actualizar nombre del restaurante
        this.updateElements('[data-business="name"]', business.name);
        
        // Actualizar tagline
        this.updateElements('[data-business="tagline"]', business.tagline);
        
        // Actualizar historia
        const story = business.story[this.dataManager.getCurrentLanguage()];
        this.updateElements('[data-business="story"]', story);
        
        // Actualizar descripción
        const description = business.description[this.dataManager.getCurrentLanguage()];
        this.updateElements('[data-business="description"]', description);
        
        // Actualizar año de establecimiento
        this.updateElements('[data-business="established"]', business.established);
    }
    
    // ACTUALIZACIÓN DE INFORMACIÓN DE CONTACTO
    
    updateContactInfo() {
        const contact = this.dataManager.getContactInfo();
        
        // Actualizar dirección
        this.updateElements('[data-contact="address"]', contact.address.full);
        this.updateElements('[data-contact="address-short"]', contact.address.short);
        
        // Actualizar teléfonos
        this.updateElements('[data-contact="phone"]', contact.phone.display);
        this.updateElements('a[href^="tel:"]', null, (el) => {
            el.href = `tel:${contact.phone.main.replace(/\s+/g, '')}`;
            if (!el.textContent || el.textContent.includes('5555')) {
                el.textContent = contact.phone.display;
            }
        });
        
        // Actualizar emails
        this.updateElements('[data-contact="email"]', contact.email.main);
        this.updateElements('a[href^="mailto:"]', null, (el) => {
            if (el.href.includes('reservas')) {
                el.href = `mailto:${contact.email.reservations}`;
                el.textContent = contact.email.reservations;
            } else {
                el.href = `mailto:${contact.email.main}`;
                el.textContent = contact.email.main;
            }
        });
        
        // Actualizar horarios
        const hours = this.dataManager.getHours();
        this.updateElements('[data-contact="hours"]', hours);
    }
    
    // ACTUALIZACIÓN DE CONTENIDO DEL MENÚ
    
    updateMenuContent() {
        // Actualizar precios dinámicamente
        this.updateMenuPrices();
        
        // Actualizar disponibilidad de items
        this.updateMenuAvailability();
        
        // Actualizar badges
        this.updateMenuBadges();
    }
    
    updateMenuPrices() {
        const menuData = this.dataManager.getMenuData();
        
        document.querySelectorAll('[data-price-usd]').forEach(element => {
            const priceUSD = parseFloat(element.getAttribute('data-price-usd'));
            if (!isNaN(priceUSD)) {
                const formattedPrice = this.dataManager.formatPrice(priceUSD, 'USD');
                element.innerHTML = formattedPrice.replace(/\$(\d+)\.(\d+)/, '$$$1<sup>.$2</sup>');
            }
        });
    }
    
    updateMenuAvailability() {
        const menuData = this.dataManager.getMenuData();
        
        document.querySelectorAll('[data-item]').forEach(element => {
            const itemId = element.getAttribute('data-item');
            const item = menuData.getItem(itemId);
            
            if (item) {
                if (!item.available) {
                    element.classList.add('unavailable');
                    element.style.opacity = '0.5';
                } else {
                    element.classList.remove('unavailable');
                    element.style.opacity = '1';
                }
            }
        });
    }
    
    updateMenuBadges() {
        const menuData = this.dataManager.getMenuData();
        const language = this.dataManager.getCurrentLanguage();
        
        document.querySelectorAll('[data-item] .menu-item-badges').forEach(badgeContainer => {
            const itemElement = badgeContainer.closest('[data-item]');
            const itemId = itemElement.getAttribute('data-item');
            const badges = menuData.getItemBadges(itemId, language);
            
            // Limpiar badges existentes
            badgeContainer.innerHTML = '';
            
            // Agregar badges actualizados
            badges.forEach(badge => {
                const badgeElement = document.createElement('span');
                badgeElement.className = `menu-badge badge-${badge.id}`;
                badgeElement.textContent = badge.name;
                badgeElement.style.backgroundColor = badge.color;
                badgeContainer.appendChild(badgeElement);
            });
        });
    }
    
    // ACTUALIZACIÓN DE TESTIMONIOS
    
    updateTestimonials() {
        const testimonialsData = this.dataManager.getTestimonialsData();
        const language = this.dataManager.getCurrentLanguage();
        
        // Actualizar testimonio principal
        const mainTestimonial = testimonialsData.getFeaturedTestimonials()[0];
        if (mainTestimonial) {
            this.updateElements('[data-testimonial="quote"]', mainTestimonial.text[language]);
            this.updateElements('[data-testimonial="author"]', `— ${mainTestimonial.fullName}, ${mainTestimonial.role}`);
        }
        
        // Actualizar estadísticas de reviews
        const stats = testimonialsData.getStats();
        this.updateElements('[data-testimonial="rating"]', stats.averageRating);
        this.updateElements('[data-testimonial="count"]', stats.totalReviews);
    }
    
    // ACTUALIZACIÓN DE META TAGS
    
    updateMetaTags() {
        const currentPage = this.getCurrentPageType();
        const metaData = this.dataManager.getMetaData(currentPage);
        
        // Actualizar title
        if (metaData.title) {
            document.title = metaData.title;
        }
        
        // Actualizar meta description
        this.updateMetaTag('name', 'description', metaData.description);
        
        // Actualizar Open Graph
        this.updateMetaTag('property', 'og:title', metaData.title);
        this.updateMetaTag('property', 'og:description', metaData.description);
        this.updateMetaTag('property', 'og:url', metaData.url);
        
        // Actualizar Twitter Cards
        this.updateMetaTag('name', 'twitter:title', metaData.title);
        this.updateMetaTag('name', 'twitter:description', metaData.description);
    }
    
    updateMetaTag(attribute, name, content) {
        if (!content) return;
        
        let meta = document.querySelector(`meta[${attribute}="${name}"]`);
        if (!meta) {
            meta = document.createElement('meta');
            meta.setAttribute(attribute, name);
            document.head.appendChild(meta);
        }
        meta.setAttribute('content', content);
    }
    
    // ACTUALIZACIÓN DE SCHEMA.ORG
    
    updateSchemaData() {
        const schemaData = this.dataManager.getSchemaData();
        
        // Buscar script de Schema.org existente
        let schemaScript = document.querySelector('script[type="application/ld+json"]');
        
        if (!schemaScript) {
            schemaScript = document.createElement('script');
            schemaScript.type = 'application/ld+json';
            document.head.appendChild(schemaScript);
        }
        
        schemaScript.textContent = JSON.stringify(schemaData, null, 2);
    }
    
    // ACTUALIZACIÓN DE ENLACES SOCIALES
    
    updateSocialLinks() {
        const socialLinks = this.dataManager.getSocialLinks();
        
        // Actualizar enlaces en footer
        document.querySelectorAll('.fh5co-social-icons a').forEach((link, index) => {
            if (socialLinks[index]) {
                link.href = socialLinks[index].url;
                link.title = `Síguenos en ${socialLinks[index].platform}`;
            }
        });
    }
    
    // MÉTODOS DE UTILIDAD
    
    updateElements(selector, content, customUpdater = null) {
        document.querySelectorAll(selector).forEach(element => {
            if (customUpdater) {
                customUpdater(element);
            } else if (content !== null) {
                if (element.tagName === 'INPUT' && element.type === 'text') {
                    element.placeholder = content;
                } else {
                    element.textContent = content;
                }
            }
        });
    }
    
    getCurrentPageType() {
        const path = window.location.pathname;
        const filename = path.split('/').pop() || 'index.html';
        
        const pageMap = {
            'index.html': 'home',
            '': 'home',
            'menu.html': 'menu',
            'gallery.html': 'gallery',
            'reservation.html': 'reservation',
            'contact.html': 'contact'
        };
        
        return pageMap[filename] || 'home';
    }
    
    // Método para forzar actualización manual
    forceUpdate() {
        console.log('🔄 Forcing content update...');
        this.updateAllContent();
    }
    
    // Método para debugging
    debug() {
        console.group('🔍 ContentUpdater Debug Info');
        console.log('DataManager:', this.dataManager ? 'Connected' : 'Not connected');
        console.log('Is Updating:', this.isUpdating);
        console.log('Update Queue:', this.updateQueue);
        console.log('Current Page:', this.getCurrentPageType());
        console.groupEnd();
    }
}

// Crear instancia global
window.ContentUpdater = new ContentUpdater();

// Exportar para uso en módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ContentUpdater;
}
