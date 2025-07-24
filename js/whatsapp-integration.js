/*
WHATSAPP INTEGRATION PREMIUM - RESTAURANTE TASTY
Sistema avanzado de WhatsApp con mensajes personalizados, analytics y funcionalidad premium
*/

class WhatsAppIntegration {
    constructor() {
        this.phoneNumber = '525555550123'; // Número de WhatsApp del restaurante
        this.businessName = 'Restaurante Tasty';
        this.currentPage = this.getCurrentPage();
        this.isVisible = true;
        this.clickCount = 0;
        
        this.init();
    }
    
    init() {
        console.log('💬 WhatsApp Integration initialized');
        this.createWhatsAppButton();
        this.setupEventListeners();
        this.setupPageSpecificBehavior();
        this.trackVisibility();
    }
    
    // Crear el botón flotante de WhatsApp
    createWhatsAppButton() {
        // Verificar si ya existe
        if (document.getElementById('whatsapp-float')) {
            return;
        }

        // Detectar si Font Awesome está disponible
        const fontAwesomeIcon = this.isFontAwesomeLoaded()
            ? '<i class="fab fa-whatsapp" aria-hidden="true"></i>'
            : '<span style="font-size: 28px;">💬</span>';

        const whatsappHTML = `
            <div class="whatsapp-float" id="whatsapp-float">
                <a href="${this.getWhatsAppURL()}"
                   target="_blank"
                   rel="noopener noreferrer"
                   class="whatsapp-link"
                   id="whatsapp-link"
                   aria-label="Contactar por WhatsApp">
                    <div class="whatsapp-icon">
                        ${fontAwesomeIcon}
                    </div>
                    <div class="whatsapp-tooltip">
                        <span data-translate="ui.whatsapp.tooltip">${this.getTooltipText()}</span>
                        <div class="tooltip-arrow"></div>
                    </div>
                </a>
            </div>
        `;

        // Insertar el botón en el body
        document.body.insertAdjacentHTML('beforeend', whatsappHTML);

        // Agregar clase específica de página al body
        document.body.classList.add(`${this.currentPage}-page`);

        // Verificar que el ícono se muestre correctamente después de un momento
        setTimeout(() => {
            this.verifyIconDisplay();
        }, 500);

        console.log('✅ WhatsApp button created for page:', this.currentPage);
    }
    
    // Configurar event listeners
    setupEventListeners() {
        const whatsappLink = document.getElementById('whatsapp-link');
        if (!whatsappLink) return;
        
        // Click en el botón
        whatsappLink.addEventListener('click', (e) => {
            this.handleWhatsAppClick(e);
        });
        
        // Hover events para analytics
        whatsappLink.addEventListener('mouseenter', () => {
            this.trackEvent('whatsapp_hover', { page: this.currentPage });
        });
        
        // Touch events para móvil
        whatsappLink.addEventListener('touchstart', () => {
            this.handleMobileTouch();
        });
        
        // Scroll behavior
        window.addEventListener('scroll', () => {
            this.handleScroll();
        });
        
        // Resize behavior
        window.addEventListener('resize', () => {
            this.handleResize();
        });
        
        // Visibility API para detectar cuando el usuario vuelve a la pestaña
        document.addEventListener('visibilitychange', () => {
            this.handleVisibilityChange();
        });
    }
    
    // Manejar click en WhatsApp
    handleWhatsAppClick(e) {
        this.clickCount++;
        
        // Animación de click
        const whatsappFloat = document.getElementById('whatsapp-float');
        whatsappFloat.classList.add('clicked');
        setTimeout(() => {
            whatsappFloat.classList.remove('clicked');
        }, 300);
        
        // Analytics
        this.trackEvent('whatsapp_click', {
            page: this.currentPage,
            message: this.getPersonalizedMessage(),
            click_count: this.clickCount,
            timestamp: new Date().toISOString()
        });
        
        // Actualizar URL con mensaje personalizado
        const newURL = this.getWhatsAppURL();
        e.target.closest('a').href = newURL;
        
        console.log('📱 WhatsApp clicked:', {
            page: this.currentPage,
            message: this.getPersonalizedMessage()
        });
    }
    
    // Manejar touch en móvil
    handleMobileTouch() {
        const whatsappFloat = document.getElementById('whatsapp-float');
        whatsappFloat.classList.add('mobile-touched');
        
        setTimeout(() => {
            whatsappFloat.classList.remove('mobile-touched');
        }, 2000);
    }
    
    // Comportamiento específico por página
    setupPageSpecificBehavior() {
        switch(this.currentPage) {
            case 'reservation':
                this.setupReservationBehavior();
                break;
            case 'menu':
                this.setupMenuBehavior();
                break;
            case 'gallery':
                this.setupGalleryBehavior();
                break;
            case 'contact':
                this.setupContactBehavior();
                break;
            default:
                this.setupHomeBehavior();
        }
    }
    
    // Comportamiento en página de reservas - minimalista
    setupReservationBehavior() {
        // Solo mostrar notificación si hay errores en el formulario
        const formInputs = document.querySelectorAll('#form-wrap input, #form-wrap select');
        let errorCount = 0;

        formInputs.forEach(input => {
            input.addEventListener('invalid', () => {
                errorCount++;
                if (errorCount >= 3) {
                    this.showNotification('¿Necesitas ayuda?', 2000);
                }
            });
        });
    }
    
    // Comportamiento en página de menú - minimalista
    setupMenuBehavior() {
        // Sin notificaciones automáticas, solo funcionalidad básica
    }

    // Comportamiento en galería - minimalista
    setupGalleryBehavior() {
        // Sin notificaciones automáticas, solo funcionalidad básica
    }
    
    // Comportamiento en contacto
    setupContactBehavior() {
        // En la página de contacto, cambiar el mensaje
        const tooltip = document.querySelector('.whatsapp-tooltip span');
        if (tooltip) {
            tooltip.textContent = '¡Escríbenos directamente!';
        }
    }
    
    // Comportamiento en home - minimalista
    setupHomeBehavior() {
        // Sin notificaciones automáticas, solo funcionalidad básica
    }
    
    // Obtener página actual
    getCurrentPage() {
        const path = window.location.pathname;
        if (path === '/' || path.includes('index')) return 'home';
        if (path.includes('menu')) return 'menu';
        if (path.includes('gallery')) return 'gallery';
        if (path.includes('reservation')) return 'reservation';
        if (path.includes('contact')) return 'contact';
        return 'home';
    }
    
    // Obtener mensaje personalizado por página
    getPersonalizedMessage() {
        const messages = {
            home: `Hola, me interesa conocer más sobre ${this.businessName}. ¿Podrían darme información?`,
            menu: `Hola, estoy viendo su menú en línea y me gustaría hacer algunas preguntas sobre los platos y precios.`,
            gallery: `Hola, he visto las fotos de ${this.businessName} y me encanta el ambiente. ¿Podrían darme más información?`,
            reservation: `Hola, me gustaría hacer una reserva en ${this.businessName}. ¿Podrían ayudarme con la disponibilidad?`,
            contact: `Hola, me gustaría contactar con ${this.businessName} para hacer una consulta.`
        };
        
        return messages[this.currentPage] || messages.home;
    }
    
    // Obtener texto del tooltip
    getTooltipText() {
        const tooltips = {
            home: '¡Contáctanos por WhatsApp!',
            menu: '¿Preguntas sobre el menú?',
            gallery: '¿Te gusta lo que ves?',
            reservation: '¡Reserva más rápido!',
            contact: '¡Escríbenos directamente!'
        };
        
        return tooltips[this.currentPage] || tooltips.home;
    }
    
    // Generar URL de WhatsApp
    getWhatsAppURL() {
        const message = encodeURIComponent(this.getPersonalizedMessage());
        return `https://wa.me/${this.phoneNumber}?text=${message}`;
    }
    
    // Mostrar notificación temporal
    showNotification(text, duration = 3000) {
        const whatsappFloat = document.getElementById('whatsapp-float');
        if (!whatsappFloat) return;
        
        // Crear notificación si no existe
        let notification = whatsappFloat.querySelector('.whatsapp-notification');
        if (!notification) {
            notification = document.createElement('div');
            notification.className = 'whatsapp-notification';
            notification.textContent = '1';
            whatsappFloat.appendChild(notification);
        }
        
        // Mostrar notificación
        notification.style.display = 'flex';
        
        // Ocultar después del tiempo especificado
        setTimeout(() => {
            if (notification) {
                notification.style.display = 'none';
            }
        }, duration);
        
        // Analytics
        this.trackEvent('whatsapp_notification_shown', {
            text: text,
            page: this.currentPage
        });
    }
    
    // Manejar scroll
    handleScroll() {
        const scrollY = window.scrollY;
        const whatsappFloat = document.getElementById('whatsapp-float');
        
        if (!whatsappFloat) return;
        
        // Ocultar/mostrar basado en scroll (opcional)
        if (scrollY > 100 && !this.isVisible) {
            this.showButton();
        } else if (scrollY <= 100 && this.isVisible && this.currentPage !== 'home') {
            // Solo ocultar en páginas que no sean home
            // this.hideButton();
        }
    }
    
    // Mostrar botón
    showButton() {
        const whatsappFloat = document.getElementById('whatsapp-float');
        if (whatsappFloat) {
            whatsappFloat.style.opacity = '1';
            whatsappFloat.style.visibility = 'visible';
            whatsappFloat.style.transform = 'translateX(0) scale(1)';
            this.isVisible = true;
        }
    }
    
    // Ocultar botón
    hideButton() {
        const whatsappFloat = document.getElementById('whatsapp-float');
        if (whatsappFloat) {
            whatsappFloat.style.opacity = '0';
            whatsappFloat.style.visibility = 'hidden';
            whatsappFloat.style.transform = 'translateX(100px) scale(0.8)';
            this.isVisible = false;
        }
    }
    
    // Manejar cambio de tamaño
    handleResize() {
        // Ajustar posición en dispositivos móviles si es necesario
        const whatsappFloat = document.getElementById('whatsapp-float');
        if (!whatsappFloat) return;
        
        if (window.innerWidth <= 480) {
            whatsappFloat.style.bottom = '15px';
            whatsappFloat.style.right = '15px';
        } else if (window.innerWidth <= 768) {
            whatsappFloat.style.bottom = '20px';
            whatsappFloat.style.right = '20px';
        } else {
            whatsappFloat.style.bottom = '25px';
            whatsappFloat.style.right = '25px';
        }
    }
    
    // Manejar cambio de visibilidad de la página - minimalista
    handleVisibilityChange() {
        if (document.hidden) {
            // Usuario cambió de pestaña
            this.trackEvent('page_hidden', { page: this.currentPage });
        } else {
            // Usuario volvió a la pestaña
            this.trackEvent('page_visible', { page: this.currentPage });
            // Sin notificaciones automáticas
        }
    }
    
    // Rastrear visibilidad del botón
    trackVisibility() {
        // Usar Intersection Observer para detectar cuando el botón es visible
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.trackEvent('whatsapp_button_visible', { page: this.currentPage });
                    }
                });
            });
            
            const whatsappFloat = document.getElementById('whatsapp-float');
            if (whatsappFloat) {
                observer.observe(whatsappFloat);
            }
        }
    }
    
    // Función de analytics
    trackEvent(eventName, data = {}) {
        console.log(`📊 WhatsApp Event: ${eventName}`, data);
        
        // Integrar con Google Analytics si está disponible
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, {
                event_category: 'whatsapp',
                event_label: this.currentPage,
                custom_parameter_page: this.currentPage,
                ...data
            });
        }
        
        // Integrar con Facebook Pixel si está disponible
        if (typeof fbq !== 'undefined') {
            fbq('trackCustom', eventName, {
                page: this.currentPage,
                ...data
            });
        }
    }
    
    // Actualizar número de teléfono
    updatePhoneNumber(newNumber) {
        this.phoneNumber = newNumber;
        const whatsappLink = document.getElementById('whatsapp-link');
        if (whatsappLink) {
            whatsappLink.href = this.getWhatsAppURL();
        }
    }
    
    // Verificar si Font Awesome está cargado
    isFontAwesomeLoaded() {
        // Verificar si existe la clase CSS de Font Awesome
        const testElement = document.createElement('i');
        testElement.className = 'fab fa-whatsapp';
        testElement.style.position = 'absolute';
        testElement.style.left = '-9999px';
        document.body.appendChild(testElement);

        const computedStyle = window.getComputedStyle(testElement, '::before');
        const fontFamily = computedStyle.getPropertyValue('font-family');

        document.body.removeChild(testElement);

        // Font Awesome usa "Font Awesome 6 Brands" o similar
        return fontFamily.includes('Font Awesome') || fontFamily.includes('FontAwesome');
    }

    // Verificar que el ícono se muestre correctamente
    verifyIconDisplay() {
        const whatsappIcon = document.querySelector('.whatsapp-icon');
        if (!whatsappIcon) return;

        const icon = whatsappIcon.querySelector('i');
        const span = whatsappIcon.querySelector('span');

        // Si no hay ícono visible, agregar fallback
        if (!icon && !span) {
            whatsappIcon.innerHTML = '<span style="font-size: 28px;">💬</span>';
            console.log('⚠️ WhatsApp icon fallback applied');
        }

        // Si Font Awesome no se cargó correctamente, usar emoji
        if (icon && !this.isFontAwesomeLoaded()) {
            whatsappIcon.innerHTML = '<span style="font-size: 28px;">💬</span>';
            console.log('⚠️ Font Awesome not loaded, using emoji fallback');
        }
    }

    // Destruir la instancia
    destroy() {
        const whatsappFloat = document.getElementById('whatsapp-float');
        if (whatsappFloat) {
            whatsappFloat.remove();
        }

        // Remover event listeners
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('resize', this.handleResize);
        document.removeEventListener('visibilitychange', this.handleVisibilityChange);

        console.log('💬 WhatsApp Integration destroyed');
    }
}

// Inicializar WhatsApp Integration
let whatsappIntegration;

// Esperar a que el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        whatsappIntegration = new WhatsAppIntegration();
    });
} else {
    whatsappIntegration = new WhatsAppIntegration();
}

// Exportar para uso global
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WhatsAppIntegration;
} else {
    window.WhatsAppIntegration = WhatsAppIntegration;
    window.whatsappIntegration = whatsappIntegration;
}
