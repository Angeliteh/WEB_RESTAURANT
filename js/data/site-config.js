/*
CONFIGURACIÓN GENERAL DEL SITIO - RESTAURANTE TASTY
Configuraciones globales y constantes para fácil mantenimiento
*/

const SiteConfig = {
    // INFORMACIÓN BÁSICA DEL SITIO
    site: {
        name: "Restaurante Tasty",
        version: "2.0.0",
        lastUpdated: "2024-11-20",
        environment: "production", // development, staging, production
        debug: false
    },
    
    // CONFIGURACIÓN DE IDIOMAS
    languages: {
        default: "es",
        available: ["es", "en"],
        fallback: "es",
        autoDetect: true,
        persistSelection: true
    },
    
    // CONFIGURACIÓN DE MONEDAS
    currencies: {
        primary: "USD",
        secondary: "MXN",
        exchangeRate: 20.5,
        autoUpdate: false, // Si se debe actualizar automáticamente
        updateInterval: 3600000, // 1 hora en milisegundos
        apiEndpoint: null // Para futuras integraciones
    },
    
    // CONFIGURACIÓN DE CACHÉ
    cache: {
        enabled: true,
        defaultTTL: 300000, // 5 minutos
        maxSize: 100, // Máximo número de entradas
        cleanupInterval: 60000, // 1 minuto
        strategies: {
            businessInfo: 3600000, // 1 hora
            menuData: 1800000,     // 30 minutos
            testimonials: 600000,   // 10 minutos
            images: 86400000       // 24 horas
        }
    },
    
    // CONFIGURACIÓN DE ANALYTICS
    analytics: {
        enabled: true,
        googleAnalytics: {
            trackingId: "GA_MEASUREMENT_ID", // Reemplazar con ID real
            enabled: false
        },
        facebookPixel: {
            pixelId: "FB_PIXEL_ID", // Reemplazar con ID real
            enabled: false
        },
        customEvents: {
            menuView: true,
            reservationAttempt: true,
            whatsappClick: true,
            languageChange: true
        }
    },
    
    // CONFIGURACIÓN DE PWA
    pwa: {
        enabled: true,
        updateStrategy: "immediate", // immediate, lazy, manual
        offlinePages: [
            "./",
            "./index.html",
            "./menu.html",
            "./contact.html"
        ],
        notifications: {
            enabled: false,
            vapidPublicKey: null // Para futuras implementaciones
        }
    },
    
    // CONFIGURACIÓN DE IMÁGENES
    images: {
        lazyLoading: true,
        placeholder: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='100%25' height='100%25' fill='%23f0f0f0'/%3E%3C/svg%3E",
        formats: {
            webp: true,
            avif: false
        },
        sizes: {
            thumbnail: 150,
            small: 300,
            medium: 600,
            large: 1200
        },
        quality: {
            thumbnail: 70,
            small: 80,
            medium: 85,
            large: 90
        }
    },
    
    // CONFIGURACIÓN DE FORMULARIOS
    forms: {
        validation: {
            realTime: true,
            showErrors: true,
            highlightFields: true
        },
        submission: {
            endpoint: "/api/contact", // Endpoint para envío de formularios
            method: "POST",
            timeout: 10000, // 10 segundos
            retries: 3
        },
        reservations: {
            endpoint: "/api/reservations",
            minAdvanceHours: 2,
            maxAdvanceDays: 30,
            timeSlots: [
                "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
                "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"
            ]
        }
    },
    
    // CONFIGURACIÓN DE WHATSAPP
    whatsapp: {
        enabled: true,
        number: "525512345678", // Sin espacios ni símbolos
        messages: {
            es: {
                home: "¡Hola! Me interesa conocer más sobre Restaurante Tasty",
                menu: "Hola, me gustaría hacer una consulta sobre el menú",
                reservation: "Hola, me gustaría hacer una reservación",
                contact: "Hola, tengo una consulta"
            },
            en: {
                home: "Hello! I'm interested in learning more about Restaurante Tasty",
                menu: "Hello, I would like to ask about the menu",
                reservation: "Hello, I would like to make a reservation",
                contact: "Hello, I have a question"
            }
        },
        position: {
            bottom: "30px",
            right: "30px"
        },
        notifications: {
            enabled: true,
            delay: 10000, // 10 segundos
            messages: {
                es: "¿Necesitas ayuda? ¡Escríbenos!",
                en: "Need help? Write to us!"
            }
        }
    },
    
    // CONFIGURACIÓN DE ANIMACIONES
    animations: {
        enabled: true,
        duration: {
            fast: 200,
            normal: 300,
            slow: 500
        },
        easing: {
            default: "ease",
            smooth: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)"
        },
        intersection: {
            threshold: 0.1,
            rootMargin: "50px"
        }
    },
    
    // CONFIGURACIÓN DE RENDIMIENTO
    performance: {
        lazyLoad: {
            images: true,
            iframes: true,
            threshold: 0.1
        },
        preload: {
            criticalCSS: true,
            fonts: true,
            images: ["images/hero-bg.jpg"]
        },
        compression: {
            enabled: true,
            level: 6
        }
    },
    
    // CONFIGURACIÓN DE SEGURIDAD
    security: {
        csp: {
            enabled: false, // Habilitar en producción
            reportOnly: true
        },
        headers: {
            xFrameOptions: "DENY",
            xContentTypeOptions: "nosniff",
            referrerPolicy: "strict-origin-when-cross-origin"
        }
    },
    
    // CONFIGURACIÓN DE DESARROLLO
    development: {
        logging: {
            enabled: true,
            level: "info", // error, warn, info, debug
            console: true,
            remote: false
        },
        debugging: {
            showDataManager: true,
            showContentUpdater: true,
            showPerformance: false
        },
        hotReload: {
            enabled: false,
            port: 3000
        }
    },
    
    // CONFIGURACIÓN DE APIS EXTERNAS
    apis: {
        maps: {
            provider: "google", // google, mapbox, openstreetmap
            apiKey: null, // Configurar en producción
            defaultZoom: 15,
            style: "roadmap"
        },
        weather: {
            enabled: false,
            apiKey: null,
            location: "Mexico City"
        },
        social: {
            instagram: {
                enabled: false,
                accessToken: null,
                userId: null
            }
        }
    },
    
    // CONFIGURACIÓN DE BACKUP Y MANTENIMIENTO
    maintenance: {
        backupInterval: 86400000, // 24 horas
        cleanupLogs: true,
        maxLogSize: 10485760, // 10MB
        healthCheck: {
            enabled: true,
            interval: 300000, // 5 minutos
            endpoints: [
                "/health",
                "/api/status"
            ]
        }
    },
    
    // MÉTODOS DE UTILIDAD
    
    // Obtener configuración por clave
    get(key, defaultValue = null) {
        const keys = key.split('.');
        let value = this;
        
        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                return defaultValue;
            }
        }
        
        return value;
    },
    
    // Verificar si una característica está habilitada
    isEnabled(feature) {
        return this.get(feature + '.enabled', false);
    },
    
    // Obtener configuración de idioma actual
    getLanguageConfig(language = null) {
        const lang = language || this.languages.default;
        return {
            code: lang,
            isDefault: lang === this.languages.default,
            isAvailable: this.languages.available.includes(lang)
        };
    },
    
    // Obtener configuración de moneda
    getCurrencyConfig(currency = null) {
        const curr = currency || this.currencies.primary;
        return {
            code: curr,
            isPrimary: curr === this.currencies.primary,
            exchangeRate: curr === this.currencies.primary ? 1 : this.currencies.exchangeRate
        };
    },
    
    // Verificar si estamos en modo desarrollo
    isDevelopment() {
        return this.site.environment === 'development';
    },
    
    // Verificar si estamos en producción
    isProduction() {
        return this.site.environment === 'production';
    },
    
    // Obtener configuración de caché para un tipo específico
    getCacheConfig(type) {
        return {
            ttl: this.cache.strategies[type] || this.cache.defaultTTL,
            enabled: this.cache.enabled
        };
    }
};

// Exportar para uso en otros archivos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SiteConfig;
} else {
    window.SiteConfig = SiteConfig;
}

// Hacer disponible globalmente
window.SiteConfig = SiteConfig;

// Configurar logging basado en el entorno
if (SiteConfig.isDevelopment() && SiteConfig.development.logging.enabled) {
    console.log('🔧 SiteConfig loaded in development mode');
    if (SiteConfig.site.debug) {
        console.log('📋 Site Configuration:', SiteConfig);
    }
}
