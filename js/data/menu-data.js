/*
DATOS DEL MENÚ CENTRALIZADOS - RESTAURANTE TASTY
Toda la información del menú en un solo lugar para fácil mantenimiento
*/

const MenuData = {
    // CONFIGURACIÓN GENERAL
    config: {
        currency: {
            primary: "USD",
            secondary: "MXN",
            exchangeRate: 20.5 // 1 USD = 20.5 MXN (actualizar según necesidad)
        },
        taxRate: 0.16, // IVA México
        serviceCharge: 0.10 // Propina sugerida
    },
    
    // CATEGORÍAS DEL MENÚ
    categories: {
        appetizers: {
            id: "appetizers",
            name: {
                es: "Entradas",
                en: "Appetizers"
            },
            icon: "🥗",
            order: 1,
            active: true
        },
        mains: {
            id: "mains",
            name: {
                es: "Platos Fuertes",
                en: "Main Courses"
            },
            icon: "🍖",
            order: 2,
            active: true
        },
        desserts: {
            id: "desserts",
            name: {
                es: "Postres",
                en: "Desserts"
            },
            icon: "🍰",
            order: 3,
            active: true
        },
        drinks: {
            id: "drinks",
            name: {
                es: "Bebidas",
                en: "Drinks"
            },
            icon: "🍷",
            order: 4,
            active: true
        },
        specials: {
            id: "specials",
            name: {
                es: "Especiales del Chef",
                en: "Chef's Specials"
            },
            icon: "⭐",
            order: 5,
            active: true
        }
    },
    
    // BADGES DISPONIBLES
    badges: {
        bestseller: {
            id: "bestseller",
            name: {
                es: "⭐ Más Vendido",
                en: "⭐ Bestseller"
            },
            color: "#ff6b6b",
            priority: 1
        },
        chef: {
            id: "chef",
            name: {
                es: "👨‍🍳 Recomendación del Chef",
                en: "👨‍🍳 Chef's Recommendation"
            },
            color: "#ffd93d",
            priority: 2
        },
        new: {
            id: "new",
            name: {
                es: "🔥 Nuevo",
                en: "🔥 New"
            },
            color: "#6c5ce7",
            priority: 3
        },
        healthy: {
            id: "healthy",
            name: {
                es: "💚 Saludable",
                en: "💚 Healthy"
            },
            color: "#00b894",
            priority: 4
        },
        spicy: {
            id: "spicy",
            name: {
                es: "🌶️ Picante",
                en: "🌶️ Spicy"
            },
            color: "#e17055",
            priority: 5
        },
        vegetarian: {
            id: "vegetarian",
            name: {
                es: "🌱 Vegetariano",
                en: "🌱 Vegetarian"
            },
            color: "#55a3ff",
            priority: 6
        }
    },
    
    // ELEMENTOS DEL MENÚ
    items: {
        // ENTRADAS
        carpaccio: {
            id: "carpaccio",
            category: "appetizers",
            name: {
                es: "Carpaccio de Res Premium",
                en: "Premium Beef Carpaccio"
            },
            description: {
                es: "Láminas de res angus madurada, rúcula silvestre, parmesano reggiano 24 meses, aceite de oliva extra virgen y reducción balsámica.",
                en: "Aged angus beef slices, wild arugula, 24-month parmigiano reggiano, extra virgin olive oil and balsamic reduction."
            },
            price: 24.95,
            image: "images/gallery_1.jpeg",
            badges: ["bestseller", "chef"],
            allergens: ["dairy"],
            calories: 320,
            prepTime: 15,
            available: true,
            featured: true
        },
        
        cheese: {
            id: "cheese",
            category: "appetizers",
            name: {
                es: "Tabla de Quesos Artesanales",
                en: "Artisanal Cheese Board"
            },
            description: {
                es: "Selección de 5 quesos artesanales, miel de abeja, nueces caramelizadas, mermelada de higo y pan artesanal tostado.",
                en: "Selection of 5 artisanal cheeses, honey, caramelized walnuts, fig jam and toasted artisanal bread."
            },
            price: 28.50,
            image: "images/gallery_2.jpeg",
            badges: ["new"],
            allergens: ["dairy", "nuts", "gluten"],
            calories: 450,
            prepTime: 10,
            available: true,
            featured: false
        },
        
        ceviche: {
            id: "ceviche",
            category: "appetizers",
            name: {
                es: "Ceviche de Pescado Fresco",
                en: "Fresh Fish Ceviche"
            },
            description: {
                es: "Pescado del día marinado en limón, cebolla morada, cilantro, ají amarillo, camote y choclo peruano.",
                en: "Fresh fish of the day marinated in lime, red onion, cilantro, yellow pepper, sweet potato and Peruvian corn."
            },
            price: 22.95,
            image: "images/gallery_3.jpeg",
            badges: ["healthy", "spicy"],
            allergens: ["fish"],
            calories: 280,
            prepTime: 20,
            available: true,
            featured: true
        },
        
        // PLATOS FUERTES
        wellington: {
            id: "wellington",
            category: "mains",
            name: {
                es: "Filete Wellington Premium",
                en: "Premium Beef Wellington"
            },
            description: {
                es: "Filete de res envuelto en masa hojaldre, foie gras, duxelles de hongos, acompañado de puré de papa trufa y vegetales glaseados.",
                en: "Beef fillet wrapped in puff pastry, foie gras, mushroom duxelles, served with truffle mashed potatoes and glazed vegetables."
            },
            price: 45.00,
            image: "images/gallery_4.jpeg",
            badges: ["chef", "bestseller"],
            allergens: ["gluten", "dairy"],
            calories: 680,
            prepTime: 35,
            available: true,
            featured: true
        },
        
        salmon: {
            id: "salmon",
            category: "mains",
            name: {
                es: "Salmón Atlántico Grillado",
                en: "Grilled Atlantic Salmon"
            },
            description: {
                es: "Filete de salmón noruego con costra de hierbas mediterráneas, quinoa tricolor, espárragos y salsa de limón.",
                en: "Norwegian salmon fillet with Mediterranean herb crust, tricolor quinoa, asparagus and lemon sauce."
            },
            price: 32.95,
            image: "images/gallery_5.jpeg",
            badges: ["healthy"],
            allergens: ["fish"],
            calories: 520,
            prepTime: 25,
            available: true,
            featured: true
        },
        
        risotto: {
            id: "risotto",
            category: "mains",
            name: {
                es: "Risotto de Hongos Porcini",
                en: "Porcini Mushroom Risotto"
            },
            description: {
                es: "Arroz arborio cremoso con hongos porcini, parmesano reggiano, mantequilla de trufa y hierbas finas.",
                en: "Creamy arborio rice with porcini mushrooms, parmigiano reggiano, truffle butter and fine herbs."
            },
            price: 28.50,
            image: "images/gallery_6.jpeg",
            badges: ["vegetarian"],
            allergens: ["dairy"],
            calories: 420,
            prepTime: 30,
            available: true,
            featured: false
        },
        
        // POSTRES
        tiramisu: {
            id: "tiramisu",
            category: "desserts",
            name: {
                es: "Tiramisú Clásico",
                en: "Classic Tiramisu"
            },
            description: {
                es: "Capas de bizcocho empapado en café espresso, crema de mascarpone, cacao en polvo y un toque de amaretto.",
                en: "Layers of sponge cake soaked in espresso coffee, mascarpone cream, cocoa powder and a touch of amaretto."
            },
            price: 16.95,
            image: "images/gallery_7.jpeg",
            badges: ["bestseller"],
            allergens: ["dairy", "eggs", "gluten", "alcohol"],
            calories: 380,
            prepTime: 10,
            available: true,
            featured: true
        },
        
        cheesecake: {
            id: "cheesecake",
            category: "desserts",
            name: {
                es: "Cheesecake de Frutos Rojos",
                en: "Berry Cheesecake"
            },
            description: {
                es: "Base de galleta graham, crema de queso philadelphia, coulis de frutos rojos y fresas frescas.",
                en: "Graham cracker base, philadelphia cream cheese, berry coulis and fresh strawberries."
            },
            price: 18.50,
            image: "images/gallery_8.jpeg",
            badges: ["new"],
            allergens: ["dairy", "eggs", "gluten"],
            calories: 420,
            prepTime: 10,
            available: true,
            featured: false
        },
        
        // BEBIDAS
        wine: {
            id: "wine",
            category: "drinks",
            name: {
                es: "Vino Tinto Reserva",
                en: "Reserve Red Wine"
            },
            description: {
                es: "Cabernet Sauvignon reserva, notas a frutos rojos, vainilla y especias. Maridaje perfecto con carnes rojas.",
                en: "Reserve Cabernet Sauvignon, notes of red fruits, vanilla and spices. Perfect pairing with red meats."
            },
            price: 35.00,
            image: "images/gallery_1.jpeg",
            badges: ["chef"],
            allergens: ["sulfites"],
            available: true,
            featured: false,
            alcoholContent: 13.5
        },
        
        cocktail: {
            id: "cocktail",
            category: "drinks",
            name: {
                es: "Cóctel Signature Tasty",
                en: "Tasty Signature Cocktail"
            },
            description: {
                es: "Gin premium, licor de elderflower, jugo de limón fresco, pepino y tónica, servido con hielo y menta.",
                en: "Premium gin, elderflower liqueur, fresh lemon juice, cucumber and tonic, served with ice and mint."
            },
            price: 14.95,
            image: "images/gallery_2.jpeg",
            badges: ["new"],
            allergens: [],
            available: true,
            featured: true,
            alcoholContent: 18.0
        },
        
        // ESPECIALES
        tasting: {
            id: "tasting",
            category: "specials",
            name: {
                es: "Menú Degustación 7 Tiempos",
                en: "7-Course Tasting Menu"
            },
            description: {
                es: "Viaje gastronómico de 7 platos diseñado por nuestro chef ejecutivo, maridaje de vinos incluido. Reserva con 24h de anticipación.",
                en: "Gastronomic journey of 7 dishes designed by our executive chef, wine pairing included. Reservation required 24h in advance."
            },
            price: 85.00,
            image: "images/gallery_3.jpeg",
            badges: ["chef", "bestseller"],
            allergens: ["varies"],
            calories: 1200,
            prepTime: 120,
            available: true,
            featured: true,
            requiresReservation: true,
            minimumNotice: 24 // horas
        }
    },

    // MÉTODOS ÚTILES PARA MANEJAR EL MENÚ

    // Obtener todos los items de una categoría
    getItemsByCategory(categoryId) {
        return Object.values(this.items).filter(item =>
            item.category === categoryId && item.available
        );
    },

    // Obtener items destacados
    getFeaturedItems() {
        return Object.values(this.items).filter(item =>
            item.featured && item.available
        );
    },

    // Obtener item por ID
    getItem(itemId) {
        return this.items[itemId] || null;
    },

    // Formatear precio
    formatPrice(price, currency = 'USD', language = 'es') {
        const finalPrice = currency === 'MXN' ?
            price * this.config.currency.exchangeRate : price;

        const symbol = currency === 'USD' ? '$' : '$';
        const locale = language === 'es' ? 'es-MX' : 'en-US';

        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 2
        }).format(finalPrice);
    },

    // Obtener categorías activas
    getActiveCategories() {
        return Object.values(this.categories).filter(cat => cat.active)
            .sort((a, b) => a.order - b.order);
    },

    // Obtener badges de un item
    getItemBadges(itemId, language = 'es') {
        const item = this.getItem(itemId);
        if (!item) return [];

        return item.badges.map(badgeId => ({
            id: badgeId,
            name: this.badges[badgeId].name[language],
            color: this.badges[badgeId].color,
            priority: this.badges[badgeId].priority
        })).sort((a, b) => a.priority - b.priority);
    },

    // Buscar items por texto
    searchItems(query, language = 'es') {
        const searchTerm = query.toLowerCase();
        return Object.values(this.items).filter(item => {
            const name = item.name[language].toLowerCase();
            const description = item.description[language].toLowerCase();
            return (name.includes(searchTerm) || description.includes(searchTerm))
                && item.available;
        });
    },

    // Obtener items con badges específicos
    getItemsByBadge(badgeId) {
        return Object.values(this.items).filter(item =>
            item.badges.includes(badgeId) && item.available
        );
    },

    // Calcular precio con impuestos
    calculateTotalPrice(price, includeTax = true, includeService = false) {
        let total = price;

        if (includeTax) {
            total += price * this.config.taxRate;
        }

        if (includeService) {
            total += price * this.config.serviceCharge;
        }

        return Math.round(total * 100) / 100;
    },

    // Obtener información nutricional
    getNutritionalInfo(itemId) {
        const item = this.getItem(itemId);
        if (!item) return null;

        return {
            calories: item.calories || 0,
            allergens: item.allergens || [],
            prepTime: item.prepTime || 0,
            alcoholContent: item.alcoholContent || 0
        };
    },

    // Verificar disponibilidad
    isItemAvailable(itemId) {
        const item = this.getItem(itemId);
        return item ? item.available : false;
    },

    // Obtener estadísticas del menú
    getMenuStats() {
        const items = Object.values(this.items);
        const available = items.filter(item => item.available);

        return {
            totalItems: items.length,
            availableItems: available.length,
            categories: Object.keys(this.categories).length,
            featuredItems: available.filter(item => item.featured).length,
            priceRange: {
                min: Math.min(...available.map(item => item.price)),
                max: Math.max(...available.map(item => item.price))
            }
        };
    }
};

// Exportar para uso en otros archivos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MenuData;
} else {
    window.MenuData = MenuData;
}

// Hacer disponible globalmente
window.MenuData = MenuData;
