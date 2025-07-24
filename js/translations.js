/*
SISTEMA DE TRADUCCIONES - RESTAURANTE TASTY
Soporte para Español (ES) e Inglés (EN)
*/

const translations = {
    es: {
        // Navegación
        nav: {
            home: "Inicio",
            menu: "Menú",
            gallery: "Galería",
            events: "Eventos",
            food: "Comida",
            coffees: "Cafés",
            reservation: "Reservación",
            about: "Nosotros",
            contact: "Contacto"
        },
        
        // Hero Section
        hero: {
            title: "Sabores Auténticos en el Corazón de la Ciudad",
            subtitle: "Bienvenidos a"
        },

        // About Section
        about: {
            title: "Nuestra Historia",
            description1: "Desde 1995, Tasty ha sido el hogar de la gastronomía tradicional con un toque moderno. Fundado por la familia Rodríguez, nuestro restaurante nació del sueño de compartir los sabores auténticos de nuestra tierra con la comunidad. Cada plato cuenta una historia, cada ingrediente es seleccionado cuidadosamente por nuestros chefs expertos.",
            description2: "Nos enorgullecemos de usar ingredientes frescos y locales, trabajando directamente con productores de la región. Nuestro compromiso es ofrecer una experiencia culinaria memorable en un ambiente cálido y acogedor que refleje nuestras raíces familiares.",
            button: "Conoce Más"
        },

        // Menu Section
        menu: {
            title: "Especialidades del Chef",
            description: "Descubre nuestras creaciones culinarias más populares, preparadas diariamente con ingredientes frescos y técnicas tradicionales. Cada plato es una obra de arte que combina sabores auténticos con presentación moderna.",
            filters: {
                all: "Todos",
                appetizers: "🥗 Entradas",
                mains: "🍖 Platos Fuertes",
                desserts: "🍰 Postres",
                drinks: "🍷 Bebidas",
                specials: "⭐ Especiales"
            },
            categories: {
                appetizers: "Entradas",
                mains: "Platos Fuertes",
                desserts: "Postres",
                drinks: "Bebidas",
                specials: "Especiales del Chef"
            },
            badges: {
                bestseller: "⭐ Más Vendido",
                chef: "👨‍🍳 Recomendación del Chef",
                new: "🔥 Nuevo",
                healthy: "💚 Saludable",
                spicy: "🌶️ Picante",
                vegetarian: "🌱 Vegetariano"
            },
            actions: {
                add: "🛒 Agregar",
                reserve: "📞 Reservar"
            },
            items: {
                carpaccio: {
                    name: "Carpaccio de Res Premium",
                    description: "Láminas de res angus madurada, rúcula silvestre, parmesano reggiano 24 meses, aceite de oliva extra virgen y reducción balsámica."
                },
                cheese: {
                    name: "Tabla de Quesos Artesanales",
                    description: "Selección de 5 quesos artesanales, miel de abeja, nueces caramelizadas, mermelada de higo y pan artesanal tostado."
                },
                ceviche: {
                    name: "Ceviche de Pescado Fresco",
                    description: "Pescado del día marinado en limón, cebolla morada, cilantro, ají amarillo, camote y choclo peruano."
                },
                wellington: {
                    name: "Filete Wellington Premium",
                    description: "Filete de res envuelto en masa hojaldre, foie gras, duxelles de hongos, acompañado de puré de papa trufa y vegetales glaseados."
                },
                salmon: {
                    name: "Salmón Atlántico Grillado",
                    description: "Filete de salmón noruego con costra de hierbas mediterráneas, quinoa tricolor, espárragos y salsa de limón."
                },
                risotto: {
                    name: "Risotto de Hongos Porcini",
                    description: "Arroz arborio cremoso con hongos porcini, parmesano reggiano, mantequilla de trufa y hierbas finas."
                },
                tiramisu: {
                    name: "Tiramisú Clásico",
                    description: "Capas de bizcocho empapado en café espresso, crema de mascarpone, cacao en polvo y un toque de amaretto."
                },
                cheesecake: {
                    name: "Cheesecake de Frutos Rojos",
                    description: "Base de galleta graham, crema de queso philadelphia, coulis de frutos rojos y fresas frescas."
                },
                wine: {
                    name: "Vino Tinto Reserva",
                    description: "Cabernet Sauvignon reserva, notas a frutos rojos, vainilla y especias. Maridaje perfecto con carnes rojas."
                },
                cocktail: {
                    name: "Cóctel Signature Tasty",
                    description: "Gin premium, licor de elderflower, jugo de limón fresco, pepino y tónica, servido con hielo y menta."
                },
                tasting: {
                    name: "Menú Degustación 7 Tiempos",
                    description: "Viaje gastronómico de 7 platos diseñado por nuestro chef ejecutivo, maridaje de vinos incluido. Reserva con 24h de anticipación."
                },
                // Traducciones para el index.html
                pizza: {
                    name: "Pizza Artesanal de Trufa",
                    description: "Base de masa madre fermentada 48 horas, salsa de tomate San Marzano, mozzarella di bufala, trufa negra, rúcula fresca y aceite de oliva extra virgen."
                },
                grilled: {
                    name: "Salmón a la Parrilla",
                    description: "Filete de salmón atlántico a la parrilla, acompañado de quinoa tricolor, espárragos verdes y salsa de limón con eneldo fresco."
                },
                dessert: {
                    name: "Tiramisú de la Casa",
                    description: "Clásico postre italiano preparado con café espresso, mascarpone artesanal, bizcochos savoiardi y cacao en polvo importado de Bélgica."
                },
                salad: {
                    name: "Ensalada Mediterránea",
                    description: "Mix de lechugas orgánicas, tomates cherry, aceitunas kalamata, queso feta, pepino, cebolla morada y vinagreta de hierbas mediterráneas."
                }
            }
        },

        // Cart System
        cart: {
            view: "Ver Pedido",
            title: "Mi Pedido",
            empty: "Tu pedido está vacío",
            empty: {
                subtitle: "Agrega algunos platos deliciosos"
            },
            total: "Total:",
            clear: "Limpiar Pedido",
            remove: "Quitar",
            currency: "MXN"
        },
        
        // Testimonials Section
        testimonials: {
            title: "Lo Que Dicen Nuestros Clientes",
            subtitle: "Experiencias reales de nuestros comensales que han disfrutado de la excelencia culinaria y el servicio excepcional que ofrecemos día a día.",
            quote: "\"Sin duda el mejor restaurante de la zona. La atención es excepcional y cada plato es una obra de arte. Llevamos años viniendo en familia y siempre nos sorprenden con nuevos sabores. El ambiente es perfecto para cualquier ocasión especial.\"",
            author: "— María Elena Vásquez, Cliente Frecuente"
        },

        // Featured Menu Section
        featuredMenu: {
            title: "Nuestros Platos Más Populares",
            description: "Descubre las creaciones culinarias que han conquistado el paladar de nuestros clientes. Cada plato es preparado con ingredientes premium y técnicas gastronómicas de vanguardia.",
            dishes: {
                crab: {
                    name: "Cangrejo en Salsa de Curry",
                    description: "Cangrejo fresco del Golfo de México bañado en una exquisita salsa de curry tailandés, acompañado de arroz jazmín y vegetales salteados al wok."
                },
                tuna: {
                    name: "Atún Sellado y Roast Beef",
                    description: "Atún de aleta amarilla sellado con costra de sésamo negro, acompañado de roast beef en su jugo y reducción de vino tinto con hierbas finas."
                },
                egg: {
                    name: "Huevos Benedictinos con Hongos",
                    description: "Huevos pochados sobre pan brioche artesanal, salsa holandesa casera, hongos portobello salteados y jamón serrano ibérico."
                }
            }
        },

        // Events Section
        events: {
            title: "Eventos Especiales",
            description: "Celebra tus momentos más importantes en Tasty. Ofrecemos servicios personalizados para bodas, cumpleaños, eventos corporativos y celebraciones familiares con menús exclusivos y atención de primera clase."
        },

        // Location Section
        location: {
            title: "Encuéntranos",
            description: "Ubicados en el corazón de la ciudad, en una zona exclusiva y de fácil acceso. Ven y disfruta de nuestra hospitalidad en un ambiente único.",
            info: {
                address: "Dirección",
                phone: "Teléfono",
                email: "Correo",
                hours: "Horarios",
                hoursDetail: "Lunes a Domingo: 12:00 - 23:00"
            }
        },

        // Reservation Section
        reservation: {
            title: "Reserva Tu Mesa",
            description: "Garantiza tu lugar en la mejor experiencia gastronómica de la ciudad. Nuestro equipo está listo para atenderte y hacer de tu visita un momento inolvidable.",
            button: "Reservar Ahora"
        },

        // Gallery Section
        gallery: {
            title: "Galería de Fotos"
        },
        
        // Pages Content
        pages: {
            menu: {
                hero: {
                    title: "Descubre Nuestro Menú",
                    subtitle: "Bienvenidos a"
                },
                main: {
                    title: "Nuestro Delicioso Menú",
                    description: "Explora nuestra cuidadosa selección de platos gourmet, preparados con ingredientes frescos y técnicas culinarias tradicionales. Cada creación refleja nuestra pasión por la excelencia gastronómica."
                },
                filters: {
                    all: "Todos",
                    appetizers: "🥗 Entradas",
                    mains: "🍖 Platos Fuertes",
                    desserts: "🍰 Postres",
                    drinks: "🍷 Bebidas",
                    specials: "⭐ Especiales"
                },
                categories: {
                    appetizers: "Entradas",
                    mains: "Platos Fuertes",
                    desserts: "Postres",
                    drinks: "Bebidas",
                    specials: "Especiales del Chef"
                },
                badges: {
                    bestseller: "⭐ Más Vendido",
                    chef: "👨‍🍳 Recomendación del Chef",
                    new: "🔥 Nuevo",
                    healthy: "💚 Saludable",
                    spicy: "🌶️ Picante",
                    vegetarian: "🌱 Vegetariano"
                },
                actions: {
                    add: "🛒 Agregar",
                    reserve: "📞 Reservar"
                },
                items: {
                    carpaccio: {
                        name: "Carpaccio de Res Premium",
                        description: "Láminas de res angus madurada, rúcula silvestre, parmesano reggiano 24 meses, aceite de oliva extra virgen y reducción balsámica."
                    },
                    cheese: {
                        name: "Tabla de Quesos Artesanales",
                        description: "Selección de 5 quesos artesanales, miel de abeja, nueces caramelizadas, mermelada de higo y pan artesanal tostado."
                    },
                    ceviche: {
                        name: "Ceviche de Pescado Fresco",
                        description: "Pescado del día marinado en limón, cebolla morada, cilantro, ají amarillo, camote y choclo peruano."
                    },
                    wellington: {
                        name: "Filete Wellington Premium",
                        description: "Filete de res envuelto en masa hojaldre, foie gras, duxelles de hongos, acompañado de puré de papa trufa y vegetales glaseados."
                    },
                    salmon: {
                        name: "Salmón Atlántico Grillado",
                        description: "Filete de salmón noruego con costra de hierbas mediterráneas, quinoa tricolor, espárragos y salsa de limón."
                    },
                    risotto: {
                        name: "Risotto de Hongos Porcini",
                        description: "Arroz arborio cremoso con hongos porcini, parmesano reggiano, mantequilla de trufa y hierbas finas."
                    },
                    tiramisu: {
                        name: "Tiramisú Clásico",
                        description: "Capas de bizcocho empapado en café espresso, crema de mascarpone, cacao en polvo y un toque de amaretto."
                    },
                    cheesecake: {
                        name: "Cheesecake de Frutos Rojos",
                        description: "Base de galleta graham, crema de queso philadelphia, coulis de frutos rojos y fresas frescas."
                    },
                    wine: {
                        name: "Vino Tinto Reserva",
                        description: "Cabernet Sauvignon reserva, notas a frutos rojos, vainilla y especias. Maridaje perfecto con carnes rojas."
                    },
                    cocktail: {
                        name: "Cóctel Signature Tasty",
                        description: "Gin premium, licor de elderflower, jugo de limón fresco, pepino y tónica, servido con hielo y menta."
                    },
                    tasting: {
                        name: "Menú Degustación 7 Tiempos",
                        description: "Viaje gastronómico de 7 platos diseñado por nuestro chef ejecutivo, maridaje de vinos incluido. Reserva con 24h de anticipación."
                    },
                    bruschetta: {
                        name: "Bruschetta Mediterránea",
                        description: "Pan artesanal tostado con tomates cherry, albahaca fresca, mozzarella di bufala y reducción balsámica."
                    },
                    pasta: {
                        name: "Pasta Carbonara Artesanal",
                        description: "Pasta fresca hecha en casa con huevos orgánicos, pancetta italiana, parmesano reggiano y pimienta negra recién molida."
                    },
                    chocolate: {
                        name: "Volcán de Chocolate",
                        description: "Bizcocho de chocolate belga con centro líquido, helado de vainilla y frutos rojos frescos."
                    },
                    sangria: {
                        name: "Sangría de la Casa",
                        description: "Vino tinto español con frutas frescas de temporada, especias aromáticas y un toque de brandy."
                    }
                },
                testimonials: {
                    title: "Testimonios",
                    description: "Lo que nuestros comensales dicen sobre la experiencia gastronómica en nuestro restaurante."
                }
            },
            gallery: {
                hero: {
                    title: "Nuestra Galería",
                    subtitle: "Bienvenidos a"
                },
                main: {
                    title: "Momentos Especiales",
                    description: "Descubre la atmósfera única de nuestro restaurante a través de estas imágenes que capturan la esencia de la experiencia gastronómica que ofrecemos a nuestros comensales."
                },
                filters: {
                    all: "Todas las Fotos",
                    ambiente: "Ambiente",
                    platos: "Nuestros Platos",
                    eventos: "Eventos",
                    chef: "En la Cocina"
                },
                categories: {
                    ambiente: {
                        title: "Ambiente del Restaurante",
                        description: "Espacios elegantes y acogedores"
                    },
                    platos: {
                        title: "Creaciones Gastronómicas",
                        description: "Nuestras especialidades culinarias"
                    },
                    eventos: {
                        title: "Eventos Especiales",
                        description: "Celebraciones y momentos únicos"
                    },
                    chef: {
                        title: "En la Cocina",
                        description: "El arte culinario en acción"
                    }
                },
                items: {
                    salon_principal: {
                        title: "Salón Principal",
                        description: "Ambiente elegante con iluminación cálida"
                    },
                    area_vip: {
                        title: "Área VIP",
                        description: "Espacio exclusivo para ocasiones especiales"
                    },
                    terraza: {
                        title: "Terraza Exterior",
                        description: "Comedor al aire libre con vista panorámica"
                    },
                    bar_area: {
                        title: "Área del Bar",
                        description: "Barra de cócteles con ambiente sofisticado"
                    },
                    especialidad_chef: {
                        title: "Especialidad del Chef",
                        description: "Salmón a la parrilla con quinoa tricolor"
                    },
                    pasta_artesanal: {
                        title: "Pasta Artesanal",
                        description: "Preparada fresca diariamente"
                    },
                    postre_signature: {
                        title: "Postre Signature",
                        description: "Tiramisú clásico con toque especial"
                    },
                    plato_gourmet: {
                        title: "Plato Gourmet",
                        description: "Presentación artística de alta cocina"
                    },
                    celebracion_familiar: {
                        title: "Celebración Familiar",
                        description: "Momentos especiales en familia"
                    },
                    evento_corporativo: {
                        title: "Evento Corporativo",
                        description: "Reuniones de negocios en ambiente elegante"
                    },
                    cena_romantica: {
                        title: "Cena Romántica",
                        description: "Ambiente íntimo para parejas"
                    },
                    chef_preparando: {
                        title: "Chef en Acción",
                        description: "Maestría culinaria en cada preparación"
                    },
                    cocina_abierta: {
                        title: "Cocina Abierta",
                        description: "Transparencia en nuestros procesos"
                    }
                },
                video: {
                    title: "Conoce Nuestro Restaurante",
                    tour: {
                        title: "Tour Virtual",
                        description: "Recorre nuestras instalaciones"
                    },
                    chef: {
                        title: "Chef en Acción",
                        description: "El arte culinario en movimiento"
                    }
                },
                ui: {
                    viewCollection: "Ver Colección",
                    photos: "fotos",
                    closeSlider: "Cerrar",
                    previousImage: "Imagen Anterior",
                    nextImage: "Siguiente Imagen"
                }
            },
            reservation: {
                hero: {
                    title: "Reserva Tu Mesa",
                    subtitle: "Bienvenidos a"
                },
                main: {
                    title: "Haz Tu Reservación",
                    description: "Garantiza tu lugar en la mejor experiencia gastronómica de la ciudad. Completa el formulario y nuestro equipo se pondrá en contacto contigo para confirmar tu reserva."
                },
                form: {
                    title: "Formulario de Reserva",
                    name: "Nombre completo",
                    email: "Correo electrónico",
                    phone: "Teléfono",
                    date: "Fecha",
                    time: "Hora",
                    guests: "Número de personas",
                    message: "Mensaje especial (opcional)",
                    submit: "Confirmar Reserva",
                    placeholders: {
                        name: "Ingresa tu nombre completo",
                        email: "tu@email.com",
                        phone: "+52 55 1234-5678",
                        date: "Selecciona una fecha",
                        time: "Selecciona una hora",
                        message: "Ocasión especial, alergias, preferencias..."
                    },
                    validation: {
                        required: "Este campo es obligatorio",
                        invalidEmail: "Ingresa un email válido",
                        invalidPhone: "Ingresa un teléfono válido",
                        pastDate: "La fecha no puede ser anterior a hoy",
                        invalidTime: "Selecciona una hora válida",
                        success: "¡Reserva enviada exitosamente!",
                        error: "Error al enviar la reserva. Inténtalo de nuevo."
                    },
                    timeSlots: {
                        lunch: "Almuerzo",
                        dinner: "Cena",
                        available: "Disponible",
                        unavailable: "No disponible",
                        recommended: "Recomendado"
                    },
                    guestOptions: {
                        "1": "1 persona",
                        "2": "2 personas",
                        "3": "3 personas",
                        "4": "4 personas",
                        "5": "5 personas",
                        "6": "6 personas",
                        "7": "7 personas",
                        "8": "8+ personas (contactar)"
                    }
                }
            },
            about: {
                hero: {
                    title: "Nuestra Historia",
                    subtitle: "Bienvenidos a"
                },
                main: {
                    title: "Acerca de Nosotros",
                    description: "Conoce la historia detrás de Restaurante Tasty, un legado familiar de más de 25 años dedicado a crear experiencias gastronómicas únicas que combinan tradición, innovación y pasión por la excelencia culinaria."
                },
                story: {
                    title: "Una Tradición Familiar",
                    content1: "Fundado en 1995 por la familia Rodríguez, Restaurante Tasty nació del sueño de compartir los sabores auténticos de nuestra tierra con la comunidad. Lo que comenzó como un pequeño restaurante familiar se ha convertido en un referente gastronómico en la ciudad.",
                    content2: "Nuestro compromiso con la calidad se refleja en cada plato que servimos. Trabajamos directamente con productores locales para garantizar ingredientes frescos y de temporada, mientras que nuestros chefs expertos combinan técnicas tradicionales con toques modernos.",
                    content3: "Cada día, nuestro equipo se dedica a crear no solo comida excepcional, sino experiencias memorables que celebran la rica tradición culinaria de nuestra región."
                },
                values: {
                    title: "Nuestros Valores",
                    quality: {
                        title: "Calidad Premium",
                        description: "Ingredientes frescos y de la más alta calidad en cada preparación."
                    },
                    tradition: {
                        title: "Tradición Familiar",
                        description: "Recetas transmitidas de generación en generación con amor y dedicación."
                    },
                    innovation: {
                        title: "Innovación Constante",
                        description: "Técnicas modernas que realzan los sabores tradicionales."
                    },
                    service: {
                        title: "Servicio Excepcional",
                        description: "Atención personalizada que hace de cada visita una experiencia única."
                    }
                },
                timeline: {
                    title: "Nuestra Trayectoria",
                    events: {
                        founding: {
                            title: "Fundación del Restaurante",
                            description: "La familia Rodríguez abre las puertas de Tasty con el sueño de compartir sabores auténticos con la comunidad local."
                        },
                        expansion: {
                            title: "Primera Expansión",
                            description: "Ampliamos nuestras instalaciones y agregamos nuevas especialidades al menú, consolidando nuestra reputación en la ciudad."
                        },
                        team: {
                            title: "Crecimiento del Equipo",
                            description: "Incorporamos chefs especializados y personal capacitado para mantener la excelencia en el servicio y la calidad."
                        },
                        recognition: {
                            title: "Reconocimiento Gastronómico",
                            description: "Recibimos múltiples premios y reconocimientos por nuestra contribución a la gastronomía local y regional."
                        },
                        innovation: {
                            title: "Innovación Culinaria",
                            description: "Implementamos nuevas técnicas gastronómicas mientras preservamos las recetas tradicionales que nos caracterizan."
                        },
                        present: {
                            title: "Presente y Futuro",
                            description: "Continuamos evolucionando y adaptándonos para ofrecer experiencias gastronómicas excepcionales a nuestros comensales."
                        }
                    }
                }
            },
            contact: {
                hero: {
                    title: "Ponte en Contacto",
                    subtitle: "Bienvenidos a"
                },
                main: {
                    title: "No seas tímido, conversemos",
                    description: "Estamos aquí para atenderte y responder todas tus preguntas. Ya sea para hacer una reserva, solicitar información sobre nuestros servicios o simplemente saludar, nos encanta escuchar de nuestros clientes.",
                    button: "Contáctanos"
                },
                form: {
                    name: "Tu Nombre",
                    email: "Tu Correo Electrónico",
                    message: "Tu Mensaje",
                    submit: "Enviar Mensaje",
                    placeholders: {
                        name: "Ingresa tu nombre completo",
                        email: "tu@email.com",
                        message: "Escribe tu mensaje aquí..."
                    }
                }
            }
        },

        // Footer
        footer: {
            about: {
                title: "Restaurante Tasty",
                description: "Desde 1995 ofreciendo la mejor experiencia gastronómica con ingredientes frescos y recetas tradicionales en un ambiente familiar y acogedor."
            },
            links: {
                title: "Enlaces Rápidos",
                home: "Inicio",
                about: "Nosotros",
                services: "Servicios",
                gallery: "Galería",
                contact: "Contacto"
            },
            contact: {
                title: "Contáctanos",
                address: "Av. Reforma 1847, Col. Lomas de Chapultepec, CDMX 11000",
                phone: "+52 55 5555-0123",
                email: "reservas@restaurantetasty.com"
            },
            newsletter: {
                title: "Boletín Gastronómico",
                description: "Suscríbete para recibir nuestras promociones especiales, eventos exclusivos y las últimas novedades de nuestro menú.",
                placeholder: "Tu correo electrónico",
                button: "Suscribirse"
            },
            copyright: "Copyright ©2024 Restaurante Tasty. Todos los derechos reservados."
        }
    },
    
    en: {
        // Navigation
        nav: {
            home: "Home",
            menu: "Menu",
            gallery: "Gallery",
            events: "Events",
            food: "Food",
            coffees: "Coffees",
            reservation: "Reservation",
            about: "About",
            contact: "Contact"
        },
        
        // Hero Section
        hero: {
            title: "Authentic Flavors in the Heart of the City",
            subtitle: "Welcome to"
        },

        // About Section
        about: {
            title: "Our Story",
            description1: "Since 1995, Tasty has been the home of traditional gastronomy with a modern twist. Founded by the Rodríguez family, our restaurant was born from the dream of sharing authentic flavors from our homeland with the community. Each dish tells a story, each ingredient is carefully selected by our expert chefs.",
            description2: "We pride ourselves on using fresh, local ingredients, working directly with regional producers. Our commitment is to offer a memorable culinary experience in a warm and welcoming atmosphere that reflects our family roots.",
            button: "Learn More"
        },

        // Menu Section
        menu: {
            title: "Chef's Specialties",
            description: "Discover our most popular culinary creations, prepared daily with fresh ingredients and traditional techniques. Each dish is a work of art that combines authentic flavors with modern presentation.",
            filters: {
                all: "All",
                appetizers: "🥗 Appetizers",
                mains: "🍖 Main Courses",
                desserts: "🍰 Desserts",
                drinks: "🍷 Drinks",
                specials: "⭐ Specials"
            },
            categories: {
                appetizers: "Appetizers",
                mains: "Main Courses",
                desserts: "Desserts",
                drinks: "Drinks",
                specials: "Chef's Specials"
            },
            badges: {
                bestseller: "⭐ Bestseller",
                chef: "👨‍🍳 Chef's Recommendation",
                new: "🔥 New",
                healthy: "💚 Healthy",
                spicy: "🌶️ Spicy",
                vegetarian: "🌱 Vegetarian"
            },
            actions: {
                add: "🛒 Add",
                reserve: "📞 Reserve"
            },
            items: {
                carpaccio: {
                    name: "Premium Beef Carpaccio",
                    description: "Aged angus beef slices, wild arugula, 24-month reggiano parmesan, extra virgin olive oil and balsamic reduction."
                },
                cheese: {
                    name: "Artisanal Cheese Board",
                    description: "Selection of 5 artisanal cheeses, bee honey, caramelized walnuts, fig jam and toasted artisanal bread."
                },
                ceviche: {
                    name: "Fresh Fish Ceviche",
                    description: "Fresh catch of the day marinated in lime, red onion, cilantro, yellow chili, sweet potato and Peruvian corn."
                },
                wellington: {
                    name: "Premium Beef Wellington",
                    description: "Beef fillet wrapped in puff pastry, foie gras, mushroom duxelles, served with truffle mashed potatoes and glazed vegetables."
                },
                salmon: {
                    name: "Grilled Atlantic Salmon",
                    description: "Norwegian salmon fillet with Mediterranean herb crust, tricolor quinoa, asparagus and lemon sauce."
                },
                risotto: {
                    name: "Porcini Mushroom Risotto",
                    description: "Creamy arborio rice with porcini mushrooms, reggiano parmesan, truffle butter and fine herbs."
                },
                tiramisu: {
                    name: "Classic Tiramisu",
                    description: "Layers of sponge cake soaked in espresso coffee, mascarpone cream, cocoa powder and a touch of amaretto."
                },
                cheesecake: {
                    name: "Berry Cheesecake",
                    description: "Graham cracker base, philadelphia cream cheese, berry coulis and fresh strawberries."
                },
                wine: {
                    name: "Reserve Red Wine",
                    description: "Cabernet Sauvignon reserve, notes of red fruits, vanilla and spices. Perfect pairing with red meats."
                },
                cocktail: {
                    name: "Tasty Signature Cocktail",
                    description: "Premium gin, elderflower liqueur, fresh lime juice, cucumber and tonic, served with ice and mint."
                },
                tasting: {
                    name: "7-Course Tasting Menu",
                    description: "Gastronomic journey of 7 dishes designed by our executive chef, wine pairing included. Reserve 24h in advance."
                },
                // Traducciones para el index.html
                pizza: {
                    name: "Artisanal Truffle Pizza",
                    description: "Sourdough base fermented for 48 hours, San Marzano tomato sauce, buffalo mozzarella, black truffle, fresh arugula and extra virgin olive oil."
                },
                grilled: {
                    name: "Grilled Salmon",
                    description: "Atlantic salmon fillet grilled to perfection, served with tricolor quinoa, green asparagus and fresh dill lemon sauce."
                },
                dessert: {
                    name: "House Tiramisu",
                    description: "Classic Italian dessert prepared with espresso coffee, artisanal mascarpone, savoiardi biscuits and Belgian imported cocoa powder."
                },
                salad: {
                    name: "Mediterranean Salad",
                    description: "Mix of organic lettuce, cherry tomatoes, kalamata olives, feta cheese, cucumber, red onion and Mediterranean herb vinaigrette."
                }
            }
        },

        // Cart System
        cart: {
            view: "View Order",
            title: "My Order",
            empty: "Your order is empty",
            empty: {
                subtitle: "Add some delicious dishes"
            },
            total: "Total:",
            clear: "Clear Order",
            remove: "Remove",
            currency: "USD"
        },

        // Testimonials Section
        testimonials: {
            title: "What Our Customers Say",
            subtitle: "Real experiences from our diners who have enjoyed the culinary excellence and exceptional service we offer every day.",
            quote: "\"Undoubtedly the best restaurant in the area. The service is exceptional and every dish is a work of art. We've been coming with our family for years and they always surprise us with new flavors. The atmosphere is perfect for any special occasion.\"",
            author: "— María Elena Vásquez, Regular Customer"
        },

        // Featured Menu Section
        featuredMenu: {
            title: "Our Most Popular Dishes",
            description: "Discover the culinary creations that have conquered our customers' palates. Each dish is prepared with premium ingredients and cutting-edge gastronomic techniques.",
            dishes: {
                crab: {
                    name: "Crab in Curry Sauce",
                    description: "Fresh Gulf of Mexico crab bathed in an exquisite Thai curry sauce, served with jasmine rice and wok-sautéed vegetables."
                },
                tuna: {
                    name: "Seared Tuna & Roast Beef",
                    description: "Yellow fin tuna seared with black sesame crust, accompanied by roast beef in its own juice and red wine reduction with fine herbs."
                },
                egg: {
                    name: "Eggs Benedict with Mushrooms",
                    description: "Poached eggs on artisanal brioche bread, homemade hollandaise sauce, sautéed portobello mushrooms and Iberian serrano ham."
                }
            }
        },

        // Events Section
        events: {
            title: "Special Events",
            description: "Celebrate your most important moments at Tasty. We offer personalized services for weddings, birthdays, corporate events and family celebrations with exclusive menus and first-class attention."
        },

        // Location Section
        location: {
            title: "Find Us",
            description: "Located in the heart of the city, in an exclusive and easily accessible area. Come and enjoy our hospitality in a unique atmosphere.",
            info: {
                address: "Address",
                phone: "Phone",
                email: "Email",
                hours: "Hours",
                hoursDetail: "Monday to Sunday: 12:00 - 23:00"
            }
        },

        // Reservation Section
        reservation: {
            title: "Book Your Table",
            description: "Guarantee your place in the city's best gastronomic experience. Our team is ready to serve you and make your visit an unforgettable moment.",
            button: "Book Now"
        },

        // Gallery Section
        gallery: {
            title: "Photo Gallery"
        },
        
        // Pages Content
        pages: {
            menu: {
                hero: {
                    title: "Discover Our Menu",
                    subtitle: "Welcome to"
                },
                main: {
                    title: "Our Delicious Menu",
                    description: "Explore our carefully curated selection of gourmet dishes, prepared with fresh ingredients and traditional culinary techniques. Each creation reflects our passion for gastronomic excellence."
                },
                filters: {
                    all: "All",
                    appetizers: "🥗 Appetizers",
                    mains: "🍖 Main Courses",
                    desserts: "🍰 Desserts",
                    drinks: "🍷 Drinks",
                    specials: "⭐ Specials"
                },
                categories: {
                    appetizers: "Appetizers",
                    mains: "Main Courses",
                    desserts: "Desserts",
                    drinks: "Drinks",
                    specials: "Chef's Specials"
                },
                badges: {
                    bestseller: "⭐ Bestseller",
                    chef: "👨‍🍳 Chef's Recommendation",
                    new: "🔥 New",
                    healthy: "💚 Healthy",
                    spicy: "🌶️ Spicy",
                    vegetarian: "🌱 Vegetarian"
                },
                actions: {
                    add: "🛒 Add",
                    reserve: "📞 Reserve"
                },
                items: {
                    carpaccio: {
                        name: "Premium Beef Carpaccio",
                        description: "Aged angus beef slices, wild arugula, 24-month reggiano parmesan, extra virgin olive oil and balsamic reduction."
                    },
                    cheese: {
                        name: "Artisanal Cheese Board",
                        description: "Selection of 5 artisanal cheeses, bee honey, caramelized walnuts, fig jam and toasted artisanal bread."
                    },
                    ceviche: {
                        name: "Fresh Fish Ceviche",
                        description: "Fresh catch of the day marinated in lime, red onion, cilantro, yellow chili, sweet potato and Peruvian corn."
                    },
                    wellington: {
                        name: "Premium Beef Wellington",
                        description: "Beef fillet wrapped in puff pastry, foie gras, mushroom duxelles, served with truffle mashed potatoes and glazed vegetables."
                    },
                    salmon: {
                        name: "Grilled Atlantic Salmon",
                        description: "Norwegian salmon fillet with Mediterranean herb crust, tricolor quinoa, asparagus and lemon sauce."
                    },
                    risotto: {
                        name: "Porcini Mushroom Risotto",
                        description: "Creamy arborio rice with porcini mushrooms, reggiano parmesan, truffle butter and fine herbs."
                    },
                    tiramisu: {
                        name: "Classic Tiramisu",
                        description: "Layers of sponge cake soaked in espresso coffee, mascarpone cream, cocoa powder and a touch of amaretto."
                    },
                    cheesecake: {
                        name: "Berry Cheesecake",
                        description: "Graham cracker base, philadelphia cream cheese, berry coulis and fresh strawberries."
                    },
                    wine: {
                        name: "Reserve Red Wine",
                        description: "Cabernet Sauvignon reserve, notes of red fruits, vanilla and spices. Perfect pairing with red meats."
                    },
                    cocktail: {
                        name: "Tasty Signature Cocktail",
                        description: "Premium gin, elderflower liqueur, fresh lime juice, cucumber and tonic, served with ice and mint."
                    },
                    tasting: {
                        name: "7-Course Tasting Menu",
                        description: "Gastronomic journey of 7 dishes designed by our executive chef, wine pairing included. Reserve 24h in advance."
                    },
                    bruschetta: {
                        name: "Mediterranean Bruschetta",
                        description: "Toasted artisanal bread with cherry tomatoes, fresh basil, buffalo mozzarella and balsamic reduction."
                    },
                    pasta: {
                        name: "Artisanal Carbonara Pasta",
                        description: "Fresh homemade pasta with organic eggs, Italian pancetta, reggiano parmesan and freshly ground black pepper."
                    },
                    chocolate: {
                        name: "Chocolate Lava Cake",
                        description: "Belgian chocolate sponge cake with liquid center, vanilla ice cream and fresh berries."
                    },
                    sangria: {
                        name: "House Sangria",
                        description: "Spanish red wine with fresh seasonal fruits, aromatic spices and a touch of brandy."
                    }
                },
                testimonials: {
                    title: "Testimonials",
                    description: "What our diners say about the gastronomic experience at our restaurant."
                }
            },
            gallery: {
                hero: {
                    title: "Our Gallery",
                    subtitle: "Welcome to"
                },
                main: {
                    title: "Special Moments",
                    description: "Discover the unique atmosphere of our restaurant through these images that capture the essence of the gastronomic experience we offer to our diners."
                },
                filters: {
                    all: "All Photos",
                    ambiente: "Atmosphere",
                    platos: "Our Dishes",
                    eventos: "Events",
                    chef: "In the Kitchen"
                },
                categories: {
                    ambiente: {
                        title: "Restaurant Atmosphere",
                        description: "Elegant and welcoming spaces"
                    },
                    platos: {
                        title: "Gastronomic Creations",
                        description: "Our culinary specialties"
                    },
                    eventos: {
                        title: "Special Events",
                        description: "Celebrations and unique moments"
                    },
                    chef: {
                        title: "In the Kitchen",
                        description: "Culinary art in action"
                    }
                },
                items: {
                    salon_principal: {
                        title: "Main Dining Room",
                        description: "Elegant atmosphere with warm lighting"
                    },
                    area_vip: {
                        title: "VIP Area",
                        description: "Exclusive space for special occasions"
                    },
                    terraza: {
                        title: "Outdoor Terrace",
                        description: "Al fresco dining with panoramic view"
                    },
                    bar_area: {
                        title: "Bar Area",
                        description: "Cocktail bar with sophisticated ambiance"
                    },
                    especialidad_chef: {
                        title: "Chef's Specialty",
                        description: "Grilled salmon with tricolor quinoa"
                    },
                    pasta_artesanal: {
                        title: "Artisanal Pasta",
                        description: "Freshly prepared daily"
                    },
                    postre_signature: {
                        title: "Signature Dessert",
                        description: "Classic tiramisu with special touch"
                    },
                    plato_gourmet: {
                        title: "Gourmet Dish",
                        description: "Artistic presentation of haute cuisine"
                    },
                    celebracion_familiar: {
                        title: "Family Celebration",
                        description: "Special family moments"
                    },
                    evento_corporativo: {
                        title: "Corporate Event",
                        description: "Business meetings in elegant setting"
                    },
                    cena_romantica: {
                        title: "Romantic Dinner",
                        description: "Intimate atmosphere for couples"
                    },
                    chef_preparando: {
                        title: "Chef in Action",
                        description: "Culinary mastery in every preparation"
                    },
                    cocina_abierta: {
                        title: "Open Kitchen",
                        description: "Transparency in our processes"
                    }
                },
                video: {
                    title: "Discover Our Restaurant",
                    tour: {
                        title: "Virtual Tour",
                        description: "Explore our facilities"
                    },
                    chef: {
                        title: "Chef in Action",
                        description: "Culinary art in motion"
                    }
                },
                ui: {
                    viewCollection: "View Collection",
                    photos: "photos",
                    closeSlider: "Close",
                    previousImage: "Previous Image",
                    nextImage: "Next Image"
                }
            },
            reservation: {
                hero: {
                    title: "Book Your Table",
                    subtitle: "Welcome to"
                },
                main: {
                    title: "Make Your Reservation",
                    description: "Guarantee your place in the city's best gastronomic experience. Complete the form and our team will contact you to confirm your reservation."
                },
                form: {
                    title: "Reservation Form",
                    name: "Full name",
                    email: "Email address",
                    phone: "Phone number",
                    date: "Date",
                    time: "Time",
                    guests: "Number of guests",
                    message: "Special message (optional)",
                    submit: "Confirm Reservation",
                    placeholders: {
                        name: "Enter your full name",
                        email: "your@email.com",
                        phone: "+52 55 1234-5678",
                        date: "Select a date",
                        time: "Select a time",
                        message: "Special occasion, allergies, preferences..."
                    },
                    validation: {
                        required: "This field is required",
                        invalidEmail: "Enter a valid email",
                        invalidPhone: "Enter a valid phone number",
                        pastDate: "Date cannot be in the past",
                        invalidTime: "Select a valid time",
                        success: "Reservation sent successfully!",
                        error: "Error sending reservation. Please try again."
                    },
                    timeSlots: {
                        lunch: "Lunch",
                        dinner: "Dinner",
                        available: "Available",
                        unavailable: "Unavailable",
                        recommended: "Recommended"
                    },
                    guestOptions: {
                        "1": "1 person",
                        "2": "2 people",
                        "3": "3 people",
                        "4": "4 people",
                        "5": "5 people",
                        "6": "6 people",
                        "7": "7 people",
                        "8": "8+ people (contact us)"
                    }
                }
            },
            about: {
                hero: {
                    title: "Our Story",
                    subtitle: "Welcome to"
                },
                main: {
                    title: "About Us",
                    description: "Learn the story behind Tasty Restaurant, a family legacy of over 25 years dedicated to creating unique gastronomic experiences that combine tradition, innovation and passion for culinary excellence."
                },
                story: {
                    title: "A Family Tradition",
                    content1: "Founded in 1995 by the Rodríguez family, Tasty Restaurant was born from the dream of sharing authentic flavors from our homeland with the community. What started as a small family restaurant has become a gastronomic reference in the city.",
                    content2: "Our commitment to quality is reflected in every dish we serve. We work directly with local producers to guarantee fresh, seasonal ingredients, while our expert chefs combine traditional techniques with modern touches.",
                    content3: "Every day, our team is dedicated to creating not only exceptional food, but memorable experiences that celebrate the rich culinary tradition of our region."
                },
                values: {
                    title: "Our Values",
                    quality: {
                        title: "Premium Quality",
                        description: "Fresh ingredients of the highest quality in every preparation."
                    },
                    tradition: {
                        title: "Family Tradition",
                        description: "Recipes passed down from generation to generation with love and dedication."
                    },
                    innovation: {
                        title: "Constant Innovation",
                        description: "Modern techniques that enhance traditional flavors."
                    },
                    service: {
                        title: "Exceptional Service",
                        description: "Personalized attention that makes each visit a unique experience."
                    }
                },
                timeline: {
                    title: "Our Journey",
                    events: {
                        founding: {
                            title: "Restaurant Foundation",
                            description: "The Rodríguez family opens the doors of Tasty with the dream of sharing authentic flavors with the local community."
                        },
                        expansion: {
                            title: "First Expansion",
                            description: "We expanded our facilities and added new specialties to the menu, consolidating our reputation in the city."
                        },
                        team: {
                            title: "Team Growth",
                            description: "We incorporated specialized chefs and trained staff to maintain excellence in service and quality."
                        },
                        recognition: {
                            title: "Gastronomic Recognition",
                            description: "We received multiple awards and recognitions for our contribution to local and regional gastronomy."
                        },
                        innovation: {
                            title: "Culinary Innovation",
                            description: "We implemented new gastronomic techniques while preserving the traditional recipes that characterize us."
                        },
                        present: {
                            title: "Present and Future",
                            description: "We continue evolving and adapting to offer exceptional gastronomic experiences to our diners."
                        }
                    }
                }
            },
            contact: {
                hero: {
                    title: "Get in Touch",
                    subtitle: "Welcome to"
                },
                main: {
                    title: "Don't be shy, let's chat",
                    description: "We're here to serve you and answer all your questions. Whether it's to make a reservation, request information about our services or just say hello, we love hearing from our customers.",
                    button: "Contact Us"
                },
                form: {
                    name: "Your Name",
                    email: "Your Email",
                    message: "Your Message",
                    submit: "Submit Form",
                    placeholders: {
                        name: "Enter your full name",
                        email: "your@email.com",
                        message: "Write your message here..."
                    }
                }
            }
        },

        // Footer
        footer: {
            about: {
                title: "Tasty Restaurant",
                description: "Since 1995 offering the best gastronomic experience with fresh ingredients and traditional recipes in a family and welcoming atmosphere."
            },
            links: {
                title: "Quick Links",
                home: "Home",
                about: "About",
                services: "Services",
                gallery: "Gallery",
                contact: "Contact"
            },
            contact: {
                title: "Contact Us",
                address: "Av. Reforma 1847, Col. Lomas de Chapultepec, CDMX 11000",
                phone: "+52 55 5555-0123",
                email: "reservations@restauranttasty.com"
            },
            newsletter: {
                title: "Gastronomic Newsletter",
                description: "Subscribe to receive our special promotions, exclusive events and the latest news from our menu.",
                placeholder: "Your email address",
                button: "Subscribe"
            },
            copyright: "Copyright ©2024 Tasty Restaurant. All rights reserved."
        }
    }
};

// Exportar para uso global
if (typeof module !== 'undefined' && module.exports) {
    module.exports = translations;
} else {
    window.translations = translations;
}
