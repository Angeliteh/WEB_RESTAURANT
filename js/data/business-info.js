/*
INFORMACIÓN EMPRESARIAL CENTRALIZADA - RESTAURANTE TASTY
Toda la información del negocio en un solo lugar para fácil mantenimiento
*/

const BusinessInfo = {
    // INFORMACIÓN BÁSICA
    name: "Restaurante Tasty",
    tagline: "La mejor experiencia gastronómica en CDMX",
    established: "2018",
    founder: "Chef María Elena Vásquez",
    
    // HISTORIA Y DESCRIPCIÓN
    story: {
        es: "Desde 2018, Restaurante Tasty ha sido el hogar de la alta cocina en el corazón de la Ciudad de México. Fundado por la Chef María Elena Vásquez, nuestro restaurante combina técnicas culinarias tradicionales mexicanas con influencias internacionales, creando una experiencia gastronómica única que ha conquistado el paladar de los más exigentes comensales.",
        en: "Since 2018, Restaurante Tasty has been the home of haute cuisine in the heart of Mexico City. Founded by Chef María Elena Vásquez, our restaurant combines traditional Mexican culinary techniques with international influences, creating a unique gastronomic experience that has conquered the palate of the most demanding diners."
    },
    
    description: {
        es: "Experiencia gastronómica excepcional con cocina gourmet, ambiente elegante y servicio de primera clase en el corazón de CDMX.",
        en: "Exceptional gastronomic experience with gourmet cuisine, elegant atmosphere and first-class service in the heart of CDMX."
    },
    
    // INFORMACIÓN DE CONTACTO
    contact: {
        // Dirección principal (ÚNICA FUENTE DE VERDAD)
        address: {
            street: "Av. Reforma 1847",
            neighborhood: "Col. Lomas de Chapultepec",
            city: "Ciudad de México",
            state: "CDMX",
            postalCode: "11000",
            country: "México",
            countryCode: "MX",
            // Formato completo para mostrar
            full: "Av. Reforma 1847, Col. Lomas de Chapultepec, CDMX 11000",
            // Formato corto para meta tags
            short: "Av. Reforma 1847, CDMX"
        },
        
        // Teléfonos
        phone: {
            main: "+52 55 1234-5678",
            reservations: "+52 55 1234-5679",
            whatsapp: "525512345678", // Sin espacios ni símbolos para WhatsApp
            display: "+52 55 1234-5678" // Para mostrar en la web
        },
        
        // Emails
        email: {
            main: "info@restaurantetasty.mx",
            reservations: "reservas@restaurantetasty.mx",
            events: "eventos@restaurantetasty.mx",
            chef: "chef@restaurantetasty.mx"
        },
        
        // Horarios
        hours: {
            // Para Schema.org
            schema: "Mo-Su 12:00-23:00",
            // Para mostrar en la web
            display: {
                es: "Lunes a Domingo: 12:00 - 23:00 hrs",
                en: "Monday to Sunday: 12:00 - 23:00"
            },
            // Horarios detallados
            detailed: {
                monday: { open: "12:00", close: "23:00", closed: false },
                tuesday: { open: "12:00", close: "23:00", closed: false },
                wednesday: { open: "12:00", close: "23:00", closed: false },
                thursday: { open: "12:00", close: "23:00", closed: false },
                friday: { open: "12:00", close: "23:00", closed: false },
                saturday: { open: "12:00", close: "23:00", closed: false },
                sunday: { open: "12:00", close: "23:00", closed: false }
            }
        }
    },
    
    // UBICACIÓN GEOGRÁFICA
    location: {
        coordinates: {
            latitude: 19.4326,
            longitude: -99.1332
        },
        // Para Schema.org
        geo: "19.4326, -99.1332",
        // Para mapas
        googleMapsUrl: "https://maps.google.com/?q=19.4326,-99.1332",
        // Zona de la ciudad
        area: "Lomas de Chapultepec",
        landmarks: ["Castillo de Chapultepec", "Museo de Antropología", "Polanco"]
    },
    
    // REDES SOCIALES
    social: {
        facebook: {
            url: "https://facebook.com/restaurantetasty",
            handle: "@restaurantetasty",
            active: true
        },
        instagram: {
            url: "https://instagram.com/restaurantetasty",
            handle: "@restaurantetasty",
            active: true
        },
        twitter: {
            url: "https://twitter.com/restaurantetasty",
            handle: "@restaurantetasty",
            active: true
        },
        tiktok: {
            url: "https://tiktok.com/@restaurantetasty",
            handle: "@restaurantetasty",
            active: false
        },
        youtube: {
            url: "https://youtube.com/c/restaurantetasty",
            handle: "Restaurante Tasty",
            active: false
        }
    },
    
    // INFORMACIÓN PARA SEO
    seo: {
        baseUrl: "https://restaurantetasty.com",
        siteName: "Restaurante Tasty",
        defaultImage: "/images/gallery_1.jpeg",
        priceRange: "$$",
        cuisine: ["Mexican", "International", "Gourmet"],
        acceptsReservations: true,
        rating: {
            value: 4.8,
            count: 127,
            max: 5
        }
    },
    
    // CAPACIDADES Y SERVICIOS
    services: {
        dineIn: true,
        takeout: false,
        delivery: false,
        catering: true,
        privateEvents: true,
        valet: true,
        wifi: true,
        creditCards: true,
        reservationsRequired: false,
        wheelchairAccessible: true
    },
    
    // INFORMACIÓN ADICIONAL
    features: {
        capacity: {
            total: 120,
            mainDining: 80,
            privateRoom: 40,
            bar: 20
        },
        parking: {
            available: true,
            valet: true,
            spaces: 30
        },
        ambiance: ["Elegant", "Romantic", "Business", "Family-friendly"],
        dressCode: "Smart Casual",
        averageMealDuration: 90, // minutos
        languages: ["Spanish", "English"]
    },
    
    // CERTIFICACIONES Y RECONOCIMIENTOS
    certifications: [
        {
            name: "Distintivo H",
            year: 2019,
            description: "Certificación en higiene y calidad alimentaria"
        },
        {
            name: "TripAdvisor Certificate of Excellence",
            year: 2023,
            description: "Reconocimiento por excelencia en servicio"
        }
    ],
    
    // MÉTODOS PARA OBTENER INFORMACIÓN FORMATEADA
    getFullAddress() {
        return this.contact.address.full;
    },
    
    getDisplayPhone() {
        return this.contact.phone.display;
    },
    
    getMainEmail() {
        return this.contact.email.main;
    },
    
    getHours(language = 'es') {
        return this.contact.hours.display[language];
    },
    
    getSocialLinks() {
        return Object.entries(this.social)
            .filter(([key, social]) => social.active)
            .map(([key, social]) => ({
                platform: key,
                url: social.url,
                handle: social.handle
            }));
    },
    
    getCoordinates() {
        return `${this.location.coordinates.latitude}, ${this.location.coordinates.longitude}`;
    },
    
    // Para Schema.org
    getSchemaData() {
        return {
            "@context": "https://schema.org",
            "@type": "Restaurant",
            "name": this.name,
            "description": this.description.es,
            "url": this.seo.baseUrl,
            "telephone": this.contact.phone.main,
            "email": this.contact.email.main,
            "address": {
                "@type": "PostalAddress",
                "streetAddress": this.contact.address.street,
                "addressLocality": this.contact.address.city,
                "addressRegion": this.contact.address.state,
                "postalCode": this.contact.address.postalCode,
                "addressCountry": this.contact.address.countryCode
            },
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": this.location.coordinates.latitude,
                "longitude": this.location.coordinates.longitude
            },
            "openingHours": [this.contact.hours.schema],
            "priceRange": this.seo.priceRange,
            "servesCuisine": this.seo.cuisine,
            "acceptsReservations": this.seo.acceptsReservations,
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": this.seo.rating.value,
                "reviewCount": this.seo.rating.count,
                "bestRating": this.seo.rating.max
            }
        };
    }
};

// Exportar para uso en otros archivos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BusinessInfo;
} else {
    window.BusinessInfo = BusinessInfo;
}

// Hacer disponible globalmente
window.BusinessInfo = BusinessInfo;
