/*
SEO MANAGER AVANZADO - RESTAURANTE TASTY
Sistema completo de SEO con Schema.org, Open Graph y meta tags optimizados
*/

class SEOManager {
    constructor() {
        this.baseUrl = 'https://restaurantetasty.com';
        this.businessInfo = {
            name: 'Restaurante Tasty',
            description: 'La mejor experiencia gastronómica en CDMX',
            phone: '+52 55 5555-0123',
            email: 'info@restaurantetasty.com',
            address: {
                street: 'Av. Reforma 123',
                city: 'Ciudad de México',
                state: 'CDMX',
                postalCode: '06600',
                country: 'MX'
            },
            hours: 'Mo-Su 12:00-23:00',
            priceRange: '$$',
            cuisine: ['Mexican', 'International', 'Gourmet'],
            social: {
                facebook: 'https://facebook.com/restaurantetasty',
                instagram: 'https://instagram.com/restaurantetasty',
                twitter: 'https://twitter.com/restaurantetasty'
            }
        };
        
        this.init();
    }
    
    init() {
        console.log('🔍 SEO Manager initialized');
        this.setupBasicSEO();
        this.setupPageSpecificSEO();
        this.setupStructuredData();
        this.setupOpenGraph();
        this.setupTwitterCards();
        this.setupCanonicalURL();
    }
    
    // SEO básico para todas las páginas
    setupBasicSEO() {
        // Meta viewport (si no existe)
        if (!document.querySelector('meta[name="viewport"]')) {
            this.addMetaTag('viewport', 'width=device-width, initial-scale=1.0');
        }
        
        // Meta charset (si no existe)
        if (!document.querySelector('meta[charset]')) {
            const charset = document.createElement('meta');
            charset.setAttribute('charset', 'UTF-8');
            document.head.insertBefore(charset, document.head.firstChild);
        }
        
        // Meta robots
        this.addMetaTag('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
        this.addMetaTag('googlebot', 'index, follow');
        
        // Meta author
        this.addMetaTag('author', 'Restaurante Tasty');
        
        // Meta language
        this.addMetaTag('language', 'Spanish');
        
        // Meta geo tags
        this.addMetaTag('geo.region', 'MX-CMX');
        this.addMetaTag('geo.placename', 'Ciudad de México');
        this.addMetaTag('geo.position', '19.4326;-99.1332');
        this.addMetaTag('ICBM', '19.4326, -99.1332');
    }
    
    // SEO específico por página
    setupPageSpecificSEO() {
        const currentPage = this.getCurrentPage();
        const seoData = this.getPageSEOData(currentPage);
        
        if (seoData) {
            // Actualizar title si no está optimizado
            if (!document.title.includes('Restaurante Tasty')) {
                document.title = seoData.title;
            }
            
            // Actualizar meta description
            this.updateMetaTag('description', seoData.description);
            
            // Agregar keywords
            this.addMetaTag('keywords', seoData.keywords);
            
            console.log(`✅ SEO configured for: ${currentPage}`);
        }
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
    
    // Datos SEO por página
    getPageSEOData(page) {
        const seoData = {
            home: {
                title: 'Restaurante Tasty - La Mejor Experiencia Gastronómica en CDMX | Cocina Gourmet',
                description: 'Descubre Restaurante Tasty, el mejor restaurante de CDMX. Cocina gourmet, ambiente elegante y servicio excepcional. Reserva tu mesa ahora. ⭐ Calificación 4.8/5',
                keywords: 'restaurante CDMX, cocina gourmet, reservas restaurante, mejor restaurante México, gastronomía premium, cena romántica, eventos especiales'
            },
            menu: {
                title: 'Menú Gourmet - Restaurante Tasty | Especialidades Culinarias y Precios',
                description: 'Explora nuestro menú gourmet con especialidades únicas. Platos principales desde $18.50, postres artesanales y bebidas premium. Cocina internacional en CDMX.',
                keywords: 'menú restaurante, cocina gourmet, especialidades culinarias, platos principales, postres artesanales, bebidas premium, precios restaurante'
            },
            gallery: {
                title: 'Galería - Restaurante Tasty | Ambiente Elegante y Especialidades Gastronómicas',
                description: 'Descubre el ambiente elegante de Restaurante Tasty. Galería de fotos de nuestros espacios VIP, platos gourmet, eventos especiales y cocina abierta.',
                keywords: 'galería restaurante, ambiente elegante, espacios VIP, platos gourmet, eventos especiales, cocina abierta, fotos restaurante'
            },
            reservation: {
                title: 'Reservaciones Online - Restaurante Tasty | Reserva Tu Mesa Fácil y Rápido',
                description: 'Reserva tu mesa en Restaurante Tasty de forma fácil y rápida. Sistema de reservaciones online con selección de fecha, hora y número de personas. ¡Garantiza tu lugar!',
                keywords: 'reservaciones online, reservar mesa, sistema reservas, restaurante CDMX, reserva fácil, mesa restaurante, booking online'
            },
            contact: {
                title: 'Contacto - Restaurante Tasty | Ubicación, Teléfono y Horarios en CDMX',
                description: 'Contacta con Restaurante Tasty. Ubicados en Av. Reforma 123, CDMX. Teléfono: +52 55 5555-0123. Horarios: Lun-Dom 12:00-23:00. ¡Te esperamos!',
                keywords: 'contacto restaurante, ubicación CDMX, teléfono restaurante, horarios, dirección, como llegar, Av. Reforma'
            }
        };
        
        return seoData[page];
    }
    
    // Configurar datos estructurados (Schema.org)
    setupStructuredData() {
        const currentPage = this.getCurrentPage();
        let schemaData;
        
        switch(currentPage) {
            case 'home':
                schemaData = this.getRestaurantSchema();
                break;
            case 'menu':
                schemaData = this.getMenuSchema();
                break;
            case 'reservation':
                schemaData = this.getReservationSchema();
                break;
            default:
                schemaData = this.getRestaurantSchema();
        }
        
        this.addStructuredData(schemaData);
    }
    
    // Schema para restaurante (página principal)
    getRestaurantSchema() {
        return {
            "@context": "https://schema.org",
            "@type": "Restaurant",
            "name": this.businessInfo.name,
            "description": this.businessInfo.description,
            "url": this.baseUrl,
            "telephone": this.businessInfo.phone,
            "email": this.businessInfo.email,
            "address": {
                "@type": "PostalAddress",
                "streetAddress": this.businessInfo.address.street,
                "addressLocality": this.businessInfo.address.city,
                "addressRegion": this.businessInfo.address.state,
                "postalCode": this.businessInfo.address.postalCode,
                "addressCountry": this.businessInfo.address.country
            },
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": "19.4326",
                "longitude": "-99.1332"
            },
            "openingHours": [this.businessInfo.hours],
            "priceRange": this.businessInfo.priceRange,
            "servesCuisine": this.businessInfo.cuisine,
            "acceptsReservations": true,
            "hasMenu": `${this.baseUrl}/menu.html`,
            "image": [
                `${this.baseUrl}/images/gallery_1.jpeg`,
                `${this.baseUrl}/images/gallery_2.jpeg`,
                `${this.baseUrl}/images/gallery_8.jpeg`
            ],
            "sameAs": [
                this.businessInfo.social.facebook,
                this.businessInfo.social.instagram,
                this.businessInfo.social.twitter
            ],
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "127",
                "bestRating": "5",
                "worstRating": "1"
            },
            "review": [
                {
                    "@type": "Review",
                    "author": {
                        "@type": "Person",
                        "name": "María González"
                    },
                    "reviewRating": {
                        "@type": "Rating",
                        "ratingValue": "5",
                        "bestRating": "5"
                    },
                    "reviewBody": "Experiencia gastronómica excepcional. El ambiente es elegante y la comida deliciosa. Altamente recomendado."
                }
            ]
        };
    }
    
    // Schema para menú
    getMenuSchema() {
        return {
            "@context": "https://schema.org",
            "@type": "Menu",
            "name": "Menú Restaurante Tasty",
            "description": "Menú completo con especialidades gourmet y cocina internacional",
            "hasMenuSection": [
                {
                    "@type": "MenuSection",
                    "name": "Platos Principales",
                    "description": "Especialidades gourmet preparadas con ingredientes frescos",
                    "hasMenuItem": [
                        {
                            "@type": "MenuItem",
                            "name": "Salmón a la Parrilla",
                            "description": "Salmón atlántico con quinoa tricolor y reducción de vino blanco",
                            "offers": {
                                "@type": "Offer",
                                "price": "28.50",
                                "priceCurrency": "USD"
                            },
                            "nutrition": {
                                "@type": "NutritionInformation",
                                "calories": "420"
                            }
                        }
                    ]
                },
                {
                    "@type": "MenuSection",
                    "name": "Postres",
                    "description": "Postres artesanales preparados por nuestro chef pastelero",
                    "hasMenuItem": [
                        {
                            "@type": "MenuItem",
                            "name": "Tiramisú Clásico",
                            "description": "Tiramisú tradicional con toque especial de café espresso",
                            "offers": {
                                "@type": "Offer",
                                "price": "12.50",
                                "priceCurrency": "USD"
                            }
                        }
                    ]
                }
            ]
        };
    }
    
    // Schema para reservaciones
    getReservationSchema() {
        return {
            "@context": "https://schema.org",
            "@type": "ReservationAction",
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": `${this.baseUrl}/reservation.html`,
                "actionPlatform": [
                    "http://schema.org/DesktopWebPlatform",
                    "http://schema.org/MobileWebPlatform"
                ]
            },
            "result": {
                "@type": "Reservation",
                "name": "Reserva en Restaurante Tasty"
            },
            "object": {
                "@type": "Restaurant",
                "name": this.businessInfo.name,
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": this.businessInfo.address.street,
                    "addressLocality": this.businessInfo.address.city
                }
            }
        };
    }
    
    // Configurar Open Graph
    setupOpenGraph() {
        const currentPage = this.getCurrentPage();
        const seoData = this.getPageSEOData(currentPage);
        const currentUrl = window.location.href;
        
        // Open Graph básico
        this.addMetaProperty('og:type', currentPage === 'home' ? 'restaurant' : 'website');
        this.addMetaProperty('og:title', seoData.title);
        this.addMetaProperty('og:description', seoData.description);
        this.addMetaProperty('og:url', currentUrl);
        this.addMetaProperty('og:site_name', this.businessInfo.name);
        this.addMetaProperty('og:locale', 'es_MX');
        this.addMetaProperty('og:locale:alternate', 'en_US');
        
        // Imagen específica por página
        const ogImage = this.getPageImage(currentPage);
        this.addMetaProperty('og:image', ogImage);
        this.addMetaProperty('og:image:width', '1200');
        this.addMetaProperty('og:image:height', '630');
        this.addMetaProperty('og:image:alt', `${this.businessInfo.name} - ${seoData.title}`);
        
        // Para restaurante
        if (currentPage === 'home') {
            this.addMetaProperty('restaurant:contact_info:phone_number', this.businessInfo.phone);
            this.addMetaProperty('restaurant:contact_info:website', this.baseUrl);
        }
    }
    
    // Configurar Twitter Cards
    setupTwitterCards() {
        const currentPage = this.getCurrentPage();
        const seoData = this.getPageSEOData(currentPage);
        
        this.addMetaTag('twitter:card', 'summary_large_image');
        this.addMetaTag('twitter:site', '@restaurantetasty');
        this.addMetaTag('twitter:creator', '@restaurantetasty');
        this.addMetaTag('twitter:title', seoData.title);
        this.addMetaTag('twitter:description', seoData.description);
        this.addMetaTag('twitter:image', this.getPageImage(currentPage));
        this.addMetaTag('twitter:image:alt', `${this.businessInfo.name} - ${seoData.title}`);
    }
    
    // Configurar URL canónica
    setupCanonicalURL() {
        const currentUrl = window.location.href.split('?')[0].split('#')[0];
        
        // Remover canonical existente
        const existingCanonical = document.querySelector('link[rel="canonical"]');
        if (existingCanonical) {
            existingCanonical.remove();
        }
        
        // Agregar nuevo canonical
        const canonical = document.createElement('link');
        canonical.rel = 'canonical';
        canonical.href = currentUrl;
        document.head.appendChild(canonical);
    }
    
    // Obtener imagen específica por página
    getPageImage(page) {
        const images = {
            home: `${this.baseUrl}/images/gallery_1.jpeg`,
            menu: `${this.baseUrl}/images/gallery_8.jpeg`,
            gallery: `${this.baseUrl}/images/gallery_2.jpeg`,
            reservation: `${this.baseUrl}/images/gallery_5.jpeg`,
            contact: `${this.baseUrl}/images/gallery_1.jpeg`
        };
        
        return images[page] || images.home;
    }
    
    // Funciones auxiliares
    addMetaTag(name, content) {
        const existing = document.querySelector(`meta[name="${name}"]`);
        if (existing) {
            existing.setAttribute('content', content);
        } else {
            const meta = document.createElement('meta');
            meta.setAttribute('name', name);
            meta.setAttribute('content', content);
            document.head.appendChild(meta);
        }
    }
    
    addMetaProperty(property, content) {
        const existing = document.querySelector(`meta[property="${property}"]`);
        if (existing) {
            existing.setAttribute('content', content);
        } else {
            const meta = document.createElement('meta');
            meta.setAttribute('property', property);
            meta.setAttribute('content', content);
            document.head.appendChild(meta);
        }
    }
    
    updateMetaTag(name, content) {
        this.addMetaTag(name, content);
    }
    
    addStructuredData(data) {
        // Remover schema existente
        const existingSchema = document.querySelector('script[type="application/ld+json"]');
        if (existingSchema) {
            existingSchema.remove();
        }
        
        // Agregar nuevo schema
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(data, null, 2);
        document.head.appendChild(script);
    }
}

// Inicializar SEO Manager
document.addEventListener('DOMContentLoaded', () => {
    new SEOManager();
});

// Exportar para uso global
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SEOManager;
} else {
    window.SEOManager = SEOManager;
}
