/*
TESTIMONIOS Y REVIEWS CENTRALIZADOS - RESTAURANTE TASTY
Todos los testimonios y reseñas en un solo lugar para fácil mantenimiento
*/

const TestimonialsData = {
    // CONFIGURACIÓN GENERAL
    config: {
        averageRating: 4.8,
        totalReviews: 127,
        maxRating: 5,
        displayLimit: 6, // Máximo de testimonios a mostrar
        autoRotate: true,
        rotateInterval: 8000 // 8 segundos
    },
    
    // TESTIMONIOS PRINCIPALES (Para mostrar en la web)
    testimonials: [
        {
            id: "maria-elena",
            name: "María Elena V.",
            fullName: "María Elena Vásquez",
            role: "Cliente Frecuente",
            rating: 5,
            date: "2024-11-15",
            verified: true,
            featured: true,
            image: "images/person_1.jpg",
            text: {
                es: "Sin duda el mejor restaurante de la zona. La atención es excepcional y cada plato es una obra de arte. Llevamos años viniendo en familia y siempre nos sorprenden con nuevos sabores. El ambiente es perfecto para cualquier ocasión especial.",
                en: "Undoubtedly the best restaurant in the area. The service is exceptional and every dish is a work of art. We've been coming with our family for years and they always surprise us with new flavors. The atmosphere is perfect for any special occasion."
            },
            highlights: ["servicio", "ambiente", "sabores"],
            source: "google"
        },
        
        {
            id: "carlos-mendoza",
            name: "Carlos M.",
            fullName: "Carlos Mendoza",
            role: "Empresario",
            rating: 5,
            date: "2024-11-10",
            verified: true,
            featured: true,
            image: "images/person_2.jpg",
            text: {
                es: "El mejor restaurante de CDMX. Servicio impecable y platos creativos. El salmón a la parrilla es espectacular. Perfecto para cenas de negocios.",
                en: "The best restaurant in CDMX. Impeccable service and creative dishes. The grilled salmon is spectacular. Perfect for business dinners."
            },
            highlights: ["salmón", "servicio", "negocios"],
            source: "tripadvisor"
        },
        
        {
            id: "ana-rodriguez",
            name: "Ana R.",
            fullName: "Ana Rodríguez",
            role: "Food Blogger",
            rating: 5,
            date: "2024-11-08",
            verified: true,
            featured: true,
            image: "images/person_3.jpg",
            text: {
                es: "Una experiencia gastronómica inolvidable. El menú degustación es extraordinario y el maridaje de vinos perfecto. La Chef María Elena es una artista culinaria.",
                en: "An unforgettable gastronomic experience. The tasting menu is extraordinary and the wine pairing perfect. Chef María Elena is a culinary artist."
            },
            highlights: ["menú degustación", "vinos", "chef"],
            source: "yelp"
        },
        
        {
            id: "roberto-silva",
            name: "Roberto S.",
            fullName: "Roberto Silva",
            role: "Cliente",
            rating: 4,
            date: "2024-11-05",
            verified: true,
            featured: false,
            image: "images/person_4.jpg",
            text: {
                es: "Muy buen ambiente y comida deliciosa. El carpaccio de res es excelente. Un poco caro, pero vale la pena para ocasiones especiales. El servicio podría ser un poco más rápido.",
                en: "Very good atmosphere and delicious food. The beef carpaccio is excellent. A bit expensive, but worth it for special occasions. Service could be a bit faster."
            },
            highlights: ["carpaccio", "ambiente", "precio"],
            source: "google"
        },
        
        {
            id: "lucia-martinez",
            name: "Lucía M.",
            fullName: "Lucía Martínez",
            role: "Celebración Aniversario",
            rating: 5,
            date: "2024-11-02",
            verified: true,
            featured: true,
            image: "images/person_5.jpg",
            text: {
                es: "Celebramos nuestro aniversario aquí y fue perfecto. La mesa junto a la ventana, la música suave, y el tiramisú de postre... todo estuvo increíble. Definitivamente regresaremos.",
                en: "We celebrated our anniversary here and it was perfect. The table by the window, the soft music, and the tiramisu for dessert... everything was incredible. We will definitely return."
            },
            highlights: ["aniversario", "tiramisú", "ambiente romántico"],
            source: "facebook"
        },
        
        {
            id: "miguel-torres",
            name: "Miguel T.",
            fullName: "Miguel Torres",
            role: "Chef Visitante",
            rating: 5,
            date: "2024-10-28",
            verified: true,
            featured: true,
            image: "images/person_6.jpg",
            text: {
                es: "Como chef, puedo apreciar la técnica y creatividad en cada plato. El Wellington es una obra maestra. Felicidades al equipo de cocina por mantener este nivel de excelencia.",
                en: "As a chef, I can appreciate the technique and creativity in every dish. The Wellington is a masterpiece. Congratulations to the kitchen team for maintaining this level of excellence."
            },
            highlights: ["wellington", "técnica", "creatividad"],
            source: "professional"
        },
        
        {
            id: "patricia-gomez",
            name: "Patricia G.",
            fullName: "Patricia Gómez",
            role: "Madre de Familia",
            rating: 4,
            date: "2024-10-25",
            verified: true,
            featured: false,
            image: "images/person_7.jpg",
            text: {
                es: "Excelente para cenas familiares. Los niños disfrutaron mucho y el personal fue muy atento con ellos. La comida es deliciosa aunque las porciones podrían ser un poco más grandes.",
                en: "Excellent for family dinners. The children enjoyed it very much and the staff was very attentive to them. The food is delicious although the portions could be a bit larger."
            },
            highlights: ["familia", "niños", "personal atento"],
            source: "google"
        },
        
        {
            id: "fernando-lopez",
            name: "Fernando L.",
            fullName: "Fernando López",
            role: "Sommelier",
            rating: 5,
            date: "2024-10-20",
            verified: true,
            featured: false,
            image: "images/person_8.jpg",
            text: {
                es: "La carta de vinos es impresionante y el sommelier conoce perfectamente cada etiqueta. El maridaje con el menú degustación fue excepcional. Una experiencia enológica de primer nivel.",
                en: "The wine list is impressive and the sommelier knows each label perfectly. The pairing with the tasting menu was exceptional. A first-class wine experience."
            },
            highlights: ["vinos", "sommelier", "maridaje"],
            source: "wine_spectator"
        }
    ],
    
    // ESTADÍSTICAS POR FUENTE
    sources: {
        google: {
            name: "Google Reviews",
            count: 45,
            averageRating: 4.7,
            url: "https://g.page/r/restaurante-tasty/review"
        },
        tripadvisor: {
            name: "TripAdvisor",
            count: 38,
            averageRating: 4.8,
            url: "https://tripadvisor.com/restaurant-tasty"
        },
        yelp: {
            name: "Yelp",
            count: 22,
            averageRating: 4.9,
            url: "https://yelp.com/biz/restaurant-tasty"
        },
        facebook: {
            name: "Facebook",
            count: 15,
            averageRating: 4.8,
            url: "https://facebook.com/restaurantetasty/reviews"
        },
        professional: {
            name: "Reseñas Profesionales",
            count: 5,
            averageRating: 5.0,
            url: null
        },
        wine_spectator: {
            name: "Wine Spectator",
            count: 2,
            averageRating: 5.0,
            url: null
        }
    },
    
    // DISTRIBUCIÓN DE CALIFICACIONES
    ratingDistribution: {
        5: 89, // 89 reseñas de 5 estrellas
        4: 28, // 28 reseñas de 4 estrellas
        3: 8,  // 8 reseñas de 3 estrellas
        2: 2,  // 2 reseñas de 2 estrellas
        1: 0   // 0 reseñas de 1 estrella
    },
    
    // PALABRAS CLAVE MÁS MENCIONADAS
    keywords: {
        "excelente": 45,
        "delicioso": 38,
        "servicio": 42,
        "ambiente": 35,
        "recomendado": 29,
        "perfecto": 25,
        "increíble": 22,
        "espectacular": 18,
        "profesional": 16,
        "romántico": 14
    },
    
    // MÉTODOS ÚTILES
    
    // Obtener testimonios destacados
    getFeaturedTestimonials() {
        return this.testimonials.filter(t => t.featured && t.verified)
            .sort((a, b) => new Date(b.date) - new Date(a.date));
    },
    
    // Obtener testimonios por calificación
    getTestimonialsByRating(rating) {
        return this.testimonials.filter(t => t.rating === rating && t.verified);
    },
    
    // Obtener testimonios recientes
    getRecentTestimonials(limit = 5) {
        return this.testimonials
            .filter(t => t.verified)
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, limit);
    },
    
    // Obtener testimonio aleatorio
    getRandomTestimonial() {
        const featured = this.getFeaturedTestimonials();
        return featured[Math.floor(Math.random() * featured.length)];
    },
    
    // Obtener estadísticas generales
    getStats() {
        return {
            averageRating: this.config.averageRating,
            totalReviews: this.config.totalReviews,
            maxRating: this.config.maxRating,
            distribution: this.ratingDistribution,
            sources: Object.keys(this.sources).length,
            verifiedCount: this.testimonials.filter(t => t.verified).length
        };
    },
    
    // Buscar testimonios por palabra clave
    searchTestimonials(keyword, language = 'es') {
        const searchTerm = keyword.toLowerCase();
        return this.testimonials.filter(t => {
            const text = t.text[language].toLowerCase();
            const highlights = t.highlights.join(' ').toLowerCase();
            return text.includes(searchTerm) || highlights.includes(searchTerm);
        });
    },
    
    // Obtener testimonios por fuente
    getTestimonialsBySource(source) {
        return this.testimonials.filter(t => t.source === source && t.verified);
    },
    
    // Formatear fecha
    formatDate(dateString, language = 'es') {
        const date = new Date(dateString);
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        const locale = language === 'es' ? 'es-MX' : 'en-US';
        return date.toLocaleDateString(locale, options);
    },
    
    // Generar estrellas HTML
    generateStarsHTML(rating) {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars += '⭐';
            } else {
                stars += '☆';
            }
        }
        return stars;
    },
    
    // Obtener datos para Schema.org
    getSchemaReviews() {
        return this.getFeaturedTestimonials().slice(0, 3).map(testimonial => ({
            "@type": "Review",
            "author": {
                "@type": "Person",
                "name": testimonial.fullName
            },
            "reviewRating": {
                "@type": "Rating",
                "ratingValue": testimonial.rating,
                "bestRating": this.config.maxRating
            },
            "reviewBody": testimonial.text.es,
            "datePublished": testimonial.date
        }));
    }
};

// Exportar para uso en otros archivos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TestimonialsData;
} else {
    window.TestimonialsData = TestimonialsData;
}

// Hacer disponible globalmente
window.TestimonialsData = TestimonialsData;
