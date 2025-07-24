/*
GALERÍA PREMIUM - RESTAURANTE TASTY
Sistema avanzado de galería con filtros, efectos y organización profesional
*/

class PremiumGallery {
    constructor() {
        this.currentFilter = 'all';
        this.galleryData = this.initializeGalleryData();
        this.lightboxOpen = false;
        this.currentImageIndex = 0;
        
        // Inicializar cuando el DOM esté listo
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }
    
    init() {
        console.log('🖼️ Premium Gallery initialized');
        console.log('📊 Gallery data:', this.galleryData);

        const galleryContainer = document.getElementById('fh5co-gallery');
        console.log('📦 Gallery container found:', !!galleryContainer);

        // Inyectar CSS crítico
        this.injectCriticalCSS();

        this.createGalleryStructure();

        // Forzar visibilidad inmediatamente después de crear
        setTimeout(() => {
            this.forceVisibility();
        }, 50);

        setTimeout(() => {
            this.setupEventListeners();
            this.setupLazyLoading();
            this.animateGalleryItems();

            // Forzar visibilidad una vez más después de todo
            this.forceVisibility();

            // Verificar que las colecciones funcionen
            this.testCollections();

            console.log('✅ All gallery components initialized');
        }, 300);
    }

    // Inyectar CSS crítico para asegurar que los estilos se apliquen
    injectCriticalCSS() {
        const cssId = 'gallery-premium-styles';
        if (document.getElementById(cssId)) return; // Ya existe

        const css = `
        <style id="${cssId}">
        /* SOLUCIÓN: Sobrescribir la regla que oculta los animate-box */
        .js #fh5co-gallery .gallery-collection.animate-box {
            opacity: 1 !important;
            visibility: visible !important;
        }

        .js #fh5co-gallery .video-showcase.animate-box {
            opacity: 1 !important;
            visibility: visible !important;
        }

        /* SOLUCIÓN: Hacer visible el título y descripción */
        .js #fh5co-gallery .fh5co-heading.animate-box {
            opacity: 1 !important;
            visibility: visible !important;
        }

        .js #fh5co-gallery .fh5co-heading.animate-box h2 {
            opacity: 1 !important;
            visibility: visible !important;
            color: rgba(255, 255, 255, 0.9) !important;
            display: block !important;
        }

        .js #fh5co-gallery .fh5co-heading.animate-box p {
            opacity: 1 !important;
            visibility: visible !important;
            color: rgba(255, 255, 255, 0.7) !important;
            display: block !important;
        }

        /* Grid de Galería - Colecciones */
        #fh5co-gallery .gallery-grid {
            display: grid !important;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)) !important;
            grid-gap: 30px !important;
            grid-auto-rows: 300px !important;
            margin: 40px 0 60px 0 !important;
            padding: 25px !important;
            background: rgba(0, 0, 0, 0.3) !important;
            border-radius: 15px !important;
            border: 1px solid rgba(255, 255, 255, 0.1) !important;
        }

        /* Tarjetas de Colección */
        #fh5co-gallery .gallery-collection {
            position: relative !important;
            overflow: hidden !important;
            border-radius: 20px !important;
            cursor: pointer !important;
            transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
            border: 3px solid rgba(255, 255, 255, 0.1) !important;
            background: rgba(0, 0, 0, 0.5) !important;
            display: block !important;
            opacity: 1 !important;
            visibility: visible !important;
        }

        #fh5co-gallery .gallery-collection:hover {
            transform: translateY(-10px) scale(1.02) !important;
            box-shadow: 0 25px 50px rgba(234, 39, 45, 0.4) !important;
            border-color: #ea272d !important;
        }

        #fh5co-gallery .collection-cover {
            width: 100% !important;
            height: 100% !important;
            background-size: cover !important;
            background-position: center !important;
            background-repeat: no-repeat !important;
            position: relative !important;
            transition: all 0.4s ease !important;
        }

        #fh5co-gallery .gallery-collection:hover .collection-cover {
            transform: scale(1.05) !important;
        }

        #fh5co-gallery .collection-overlay {
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
            background: linear-gradient(135deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.8)) !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: space-between !important;
            padding: 25px !important;
            opacity: 0 !important;
            transition: opacity 0.3s ease !important;
        }

        #fh5co-gallery .gallery-collection:hover .collection-overlay {
            opacity: 1 !important;
        }

        #fh5co-gallery .collection-info h3 {
            color: #fff !important;
            font-size: 24px !important;
            font-weight: 700 !important;
            margin: 0 0 10px 0 !important;
            font-family: "Cormorant Garamond", Georgia, serif !important;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.7) !important;
        }

        #fh5co-gallery .collection-info p {
            color: rgba(255, 255, 255, 0.9) !important;
            font-size: 16px !important;
            margin: 0 0 15px 0 !important;
            line-height: 1.5 !important;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5) !important;
        }

        #fh5co-gallery .collection-meta {
            display: flex !important;
            align-items: center !important;
            gap: 15px !important;
        }

        #fh5co-gallery .image-count {
            display: flex !important;
            align-items: center !important;
            gap: 5px !important;
            color: rgba(255, 255, 255, 0.8) !important;
            font-size: 14px !important;
            font-weight: 600 !important;
        }

        #fh5co-gallery .image-count i {
            font-size: 16px !important;
            color: #ea272d !important;
        }

        #fh5co-gallery .collection-view-btn {
            background: #ea272d !important;
            color: #fff !important;
            border: none !important;
            padding: 12px 25px !important;
            border-radius: 30px !important;
            display: flex !important;
            align-items: center !important;
            gap: 8px !important;
            cursor: pointer !important;
            transition: all 0.3s ease !important;
            font-family: "Cormorant Garamond", Georgia, serif !important;
            font-size: 16px !important;
            font-weight: 600 !important;
            align-self: flex-start !important;
            box-shadow: 0 4px 15px rgba(234, 39, 45, 0.3) !important;
        }

        #fh5co-gallery .collection-view-btn:hover {
            background: #fff !important;
            color: #ea272d !important;
            transform: translateY(-2px) !important;
            box-shadow: 0 6px 20px rgba(234, 39, 45, 0.4) !important;
        }

        #fh5co-gallery .collection-indicator {
            position: absolute !important;
            top: 20px !important;
            right: 20px !important;
            background: rgba(0, 0, 0, 0.7) !important;
            backdrop-filter: blur(10px) !important;
            border-radius: 20px !important;
            padding: 8px 12px !important;
        }

        #fh5co-gallery .indicator-dots {
            display: flex !important;
            align-items: center !important;
            gap: 6px !important;
        }

        #fh5co-gallery .dot {
            width: 8px !important;
            height: 8px !important;
            border-radius: 50% !important;
            background: rgba(255, 255, 255, 0.5) !important;
            transition: all 0.3s ease !important;
        }

        #fh5co-gallery .dot.active {
            background: #ea272d !important;
            transform: scale(1.2) !important;
        }

        #fh5co-gallery .dot-more {
            color: rgba(255, 255, 255, 0.8) !important;
            font-size: 12px !important;
            font-weight: 600 !important;
            margin-left: 3px !important;
        }

        /* Elementos de la Galería - Forzar visibilidad */
        #fh5co-gallery .gallery-item {
            position: relative !important;
            overflow: hidden !important;
            border-radius: 15px !important;
            cursor: pointer !important;
            transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
            border: 3px solid rgba(255, 255, 255, 0.1) !important;
            background: rgba(0, 0, 0, 0.5) !important;
            display: block !important;
            opacity: 1 !important;
            visibility: visible !important;
        }

        /* Animaciones de filtrado */
        #fh5co-gallery .gallery-item.show {
            opacity: 1 !important;
            visibility: visible !important;
            display: block !important;
            transform: scale(1) translateY(0) !important;
        }

        #fh5co-gallery .gallery-item.hide {
            opacity: 0 !important;
            transform: scale(0.8) translateY(20px) !important;
            transition: all 0.3s ease !important;
        }

        #fh5co-gallery .gallery-item.large {
            grid-row-span: 2 !important;
        }

        #fh5co-gallery .gallery-item.wide {
            grid-column-span: 2 !important;
        }

        #fh5co-gallery .gallery-image {
            width: 100% !important;
            height: 100% !important;
            background-size: cover !important;
            background-position: center !important;
            background-repeat: no-repeat !important;
            position: relative !important;
            transition: all 0.4s ease !important;
            display: block !important;
            min-height: 200px !important;
        }

        #fh5co-gallery .gallery-item:hover {
            transform: translateY(-10px) !important;
            box-shadow: 0 25px 50px rgba(234, 39, 45, 0.4) !important;
            border-color: #ea272d !important;
        }

        #fh5co-gallery .gallery-item:hover .gallery-image {
            transform: scale(1.08) !important;
        }

        /* Overlay de información */
        #fh5co-gallery .gallery-overlay {
            position: absolute !important;
            bottom: 0 !important;
            left: 0 !important;
            right: 0 !important;
            background: linear-gradient(transparent, rgba(0, 0, 0, 0.95)) !important;
            padding: 40px 25px 25px !important;
            transform: translateY(100%) !important;
            transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
        }

        #fh5co-gallery .gallery-item:hover .gallery-overlay {
            transform: translateY(0) !important;
        }

        #fh5co-gallery .gallery-content h4 {
            color: #fff !important;
            font-size: 20px !important;
            font-weight: 700 !important;
            margin: 0 0 10px 0 !important;
            font-family: "Cormorant Garamond", Georgia, serif !important;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5) !important;
        }

        #fh5co-gallery .gallery-content p {
            color: rgba(255, 255, 255, 0.8) !important;
            font-size: 15px !important;
            margin: 0 0 20px 0 !important;
            line-height: 1.5 !important;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5) !important;
        }

        #fh5co-gallery .gallery-zoom {
            background: #ea272d !important;
            color: #fff !important;
            border: none !important;
            width: 45px !important;
            height: 45px !important;
            border-radius: 50% !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            cursor: pointer !important;
            transition: all 0.3s ease !important;
            position: absolute !important;
            top: 20px !important;
            right: 20px !important;
            opacity: 0 !important;
            transform: scale(0.8) !important;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3) !important;
        }

        #fh5co-gallery .gallery-item:hover .gallery-zoom {
            opacity: 1 !important;
            transform: scale(1) !important;
        }

        #fh5co-gallery .gallery-zoom:hover {
            background: #fff !important;
            color: #ea272d !important;
            transform: scale(1.15) !important;
            box-shadow: 0 6px 20px rgba(234, 39, 45, 0.4) !important;
        }

        #fh5co-gallery .gallery-zoom i {
            font-size: 18px !important;
        }

        /* Animaciones */
        .gallery-item.animate-in {
            opacity: 1;
            transform: translateY(0);
        }

        .gallery-item.show {
            opacity: 1;
            transform: translateY(0);
        }

        /* Video Showcase */
        .video-showcase {
            text-align: center;
            padding: 40px 0;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .video-showcase h3 {
            color: rgba(255, 255, 255, 0.9);
            font-size: 32px;
            font-weight: 400;
            margin-bottom: 40px;
            font-family: "Cormorant Garamond", Georgia, serif;
        }

        .video-placeholder {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
            max-width: 800px;
            margin: 0 auto;
        }

        .video-item {
            position: relative;
            border-radius: 12px;
            overflow: hidden;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .video-item:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 30px rgba(234, 39, 45, 0.2);
        }

        .video-poster {
            height: 200px;
            background-size: cover;
            background-position: center;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .play-button {
            width: 60px;
            height: 60px;
            background: rgba(234, 39, 45, 0.9);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            font-size: 24px;
            transition: all 0.3s ease;
        }

        .video-item:hover .play-button {
            background: #ea272d;
            transform: scale(1.1);
        }

        .video-overlay {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
            padding: 20px;
            color: #fff;
        }

        .video-overlay h4 {
            margin: 0 0 5px 0;
            font-size: 18px;
            font-weight: 600;
        }

        .video-overlay p {
            margin: 0;
            font-size: 14px;
            opacity: 0.8;
        }

        /* Collection Slider */
        .collection-slider {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100% !important;
            z-index: 10000 !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            opacity: 0 !important;
            visibility: hidden !important;
            transition: all 0.3s ease !important;
        }

        .collection-slider.show {
            opacity: 1 !important;
            visibility: visible !important;
        }

        .slider-overlay {
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100% !important;
            background: rgba(0, 0, 0, 0.95) !important;
            backdrop-filter: blur(10px) !important;
        }

        .slider-container {
            position: relative !important;
            width: 95vw !important;
            height: 90vh !important;
            background: rgba(0, 0, 0, 0.9) !important;
            border-radius: 20px !important;
            border: 2px solid rgba(234, 39, 45, 0.3) !important;
            display: flex !important;
            flex-direction: column !important;
            overflow: hidden !important;
        }

        .slider-header {
            display: flex !important;
            justify-content: space-between !important;
            align-items: center !important;
            padding: 25px 30px !important;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
            background: rgba(0, 0, 0, 0.8) !important;
        }

        .slider-title h2 {
            color: #fff !important;
            font-size: 28px !important;
            font-weight: 700 !important;
            margin: 0 0 5px 0 !important;
            font-family: "Cormorant Garamond", Georgia, serif !important;
        }

        .slider-title p {
            color: rgba(255, 255, 255, 0.7) !important;
            font-size: 16px !important;
            margin: 0 !important;
        }

        .slider-close {
            background: rgba(255, 255, 255, 0.1) !important;
            border: none !important;
            width: 45px !important;
            height: 45px !important;
            border-radius: 50% !important;
            color: #fff !important;
            cursor: pointer !important;
            transition: all 0.3s ease !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
        }

        .slider-close:hover {
            background: #ea272d !important;
            transform: scale(1.1) !important;
        }

        .slider-content {
            flex: 1 !important;
            display: flex !important;
            flex-direction: column !important;
            padding: 20px !important;
        }

        .slider-main {
            flex: 1 !important;
            display: flex !important;
            align-items: center !important;
            gap: 20px !important;
            margin-bottom: 20px !important;
        }

        .slider-nav {
            background: rgba(0, 0, 0, 0.7) !important;
            border: 2px solid rgba(255, 255, 255, 0.2) !important;
            width: 50px !important;
            height: 50px !important;
            border-radius: 50% !important;
            color: #fff !important;
            cursor: pointer !important;
            transition: all 0.3s ease !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            font-size: 20px !important;
        }

        .slider-nav:hover {
            background: #ea272d !important;
            border-color: #ea272d !important;
            transform: scale(1.1) !important;
        }

        .slider-image-container {
            flex: 1 !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
        }

        .slider-image-container img {
            max-width: 100% !important;
            max-height: 60vh !important;
            object-fit: contain !important;
            border-radius: 10px !important;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5) !important;
        }

        .slider-image-info {
            margin-top: 20px !important;
        }

        .slider-image-info h3 {
            color: #fff !important;
            font-size: 24px !important;
            font-weight: 600 !important;
            margin: 0 0 10px 0 !important;
            font-family: "Cormorant Garamond", Georgia, serif !important;
        }

        .slider-image-info p {
            color: rgba(255, 255, 255, 0.8) !important;
            font-size: 16px !important;
            margin: 0 !important;
            line-height: 1.5 !important;
        }

        .slider-thumbnails {
            display: flex !important;
            justify-content: center !important;
            gap: 10px !important;
            margin-bottom: 15px !important;
            padding: 0 20px !important;
        }

        .thumbnail {
            width: 60px !important;
            height: 60px !important;
            border-radius: 8px !important;
            overflow: hidden !important;
            cursor: pointer !important;
            border: 2px solid transparent !important;
            transition: all 0.3s ease !important;
            opacity: 0.6 !important;
        }

        .thumbnail.active {
            border-color: #ea272d !important;
            opacity: 1 !important;
            transform: scale(1.1) !important;
        }

        .thumbnail img {
            width: 100% !important;
            height: 100% !important;
            object-fit: cover !important;
        }

        .slider-counter {
            text-align: center !important;
            color: rgba(255, 255, 255, 0.7) !important;
            font-size: 14px !important;
            font-weight: 600 !important;
        }

        /* Responsive */
        @media screen and (max-width: 768px) {
            .gallery-filters {
                padding: 10px 15px;
            }

            .filter-btn {
                padding: 8px 15px;
                font-size: 14px;
            }

            .filter-btn span {
                display: none;
            }

            .gallery-grid {
                grid-template-columns: 1fr !important;
                grid-gap: 20px;
                grid-auto-rows: 250px;
            }

            .slider-container {
                width: 98vw !important;
                height: 95vh !important;
            }

            .slider-header {
                padding: 15px 20px !important;
            }

            .slider-title h2 {
                font-size: 22px !important;
            }

            .slider-main {
                flex-direction: column !important;
                gap: 15px !important;
            }

            .slider-nav {
                width: 40px !important;
                height: 40px !important;
                font-size: 16px !important;
            }

            .slider-thumbnails {
                gap: 8px !important;
                padding: 0 10px !important;
            }

            .thumbnail {
                width: 50px !important;
                height: 50px !important;
            }
        }
        </style>
        `;

        document.head.insertAdjacentHTML('beforeend', css);
        console.log('🎨 Critical CSS injected');
    }
    
    // Datos de la galería organizados por colecciones
    initializeGalleryData() {
        return {
            ambiente: {
                title: "Ambiente del Restaurante",
                description: "Espacios elegantes y acogedores donde cada rincón cuenta una historia",
                coverImage: 'images/gallery_1.jpeg',
                images: [
                    { src: 'images/gallery_1.jpeg', title: 'Salón Principal', description: 'Ambiente elegante con iluminación cálida y decoración sofisticada' },
                    { src: 'images/gallery_2.jpeg', title: 'Área VIP', description: 'Espacio exclusivo para ocasiones especiales y celebraciones íntimas' },
                    { src: 'images/gallery_3.jpeg', title: 'Terraza Exterior', description: 'Comedor al aire libre con vista panorámica y ambiente relajado' },
                    { src: 'images/gallery_4.jpeg', title: 'Área del Bar', description: 'Barra de cócteles con ambiente sofisticado y mixología premium' }
                ]
            },
            platos: {
                title: "Nuestras Creaciones Gastronómicas",
                description: "Arte culinario en cada plato, donde la tradición se encuentra con la innovación",
                coverImage: 'images/gallery_8.jpeg',
                images: [
                    { src: 'images/gallery_8.jpeg', title: 'Especialidad del Chef', description: 'Salmón atlántico a la parrilla con quinoa tricolor y reducción de vino blanco' },
                    { src: 'images/gallery_9.jpeg', title: 'Pasta Artesanal', description: 'Pasta fresca hecha en casa con salsa de tomates San Marzano y albahaca' },
                    { src: 'images/gallery_7.jpeg', title: 'Postre Signature', description: 'Tiramisú clásico con toque especial de café espresso y mascarpone artesanal' },
                    { src: 'images/gallery_6.jpeg', title: 'Plato Gourmet', description: 'Presentación artística de alta cocina con ingredientes de temporada' }
                ]
            },
            eventos: {
                title: "Eventos y Celebraciones",
                description: "Momentos especiales que se convierten en recuerdos inolvidables",
                coverImage: 'images/gallery_5.jpeg',
                images: [
                    { src: 'images/gallery_5.jpeg', title: 'Celebración Familiar', description: 'Reuniones familiares en un ambiente cálido y acogedor' },
                    { src: 'images/gallery_2.jpeg', title: 'Cena Romántica', description: 'Ambiente íntimo perfecto para parejas y ocasiones especiales' },
                    { src: 'images/gallery_1.jpeg', title: 'Evento Corporativo', description: 'Reuniones de negocios en un entorno elegante y profesional' }
                ]
            },
            chef: {
                title: "En la Cocina",
                description: "El arte culinario en acción, donde la pasión se convierte en sabor",
                coverImage: 'images/gallery_3.jpeg',
                images: [
                    { src: 'images/gallery_3.jpeg', title: 'Chef en Acción', description: 'Maestría culinaria en cada preparación, técnica y dedicación' },
                    { src: 'images/gallery_4.jpeg', title: 'Cocina Abierta', description: 'Transparencia en nuestros procesos, calidad visible en cada paso' }
                ]
            }
        };
    }
    
    // Crear la estructura HTML de la galería
    createGalleryStructure() {
        const galleryContainer = document.getElementById('fh5co-gallery');
        if (!galleryContainer) {
            console.error('❌ Gallery container not found!');
            return;
        }

        console.log('🏗️ Creating gallery structure...');
        
        const galleryHTML = `
            <div class="container">
                <div class="row">
                    <div class="col-md-12 fh5co-heading animate-box">
                        <h2 data-translate="pages.gallery.main.title">Momentos Especiales</h2>
                        <div class="row">
                            <div class="col-md-6">
                                <p data-translate="pages.gallery.main.description">Descubre la atmósfera única de nuestro restaurante a través de estas imágenes que capturan la esencia de la experiencia gastronómica que ofrecemos a nuestros comensales.</p>
                            </div>
                        </div>
                    </div>
                    

                    
                    <!-- Grid de Galería -->
                    <div class="col-md-12">
                        <div class="gallery-grid" id="galleryGrid">
                            ${this.generateGalleryItems()}
                        </div>
                    </div>
                    
                    <!-- Sección de Videos (preparada para futuro) -->
                    <div class="col-md-12">
                        <div class="video-showcase animate-box" style="margin-top: 60px;">
                            <h3 data-translate="pages.gallery.video.title">Conoce Nuestro Restaurante</h3>
                            <div class="video-placeholder">
                                <div class="video-item">
                                    <div class="video-poster" style="background-image: url(images/gallery_8.jpeg);">
                                        <div class="play-button">
                                            <i class="icon-play3"></i>
                                        </div>
                                        <div class="video-overlay">
                                            <h4 data-translate="pages.gallery.video.tour.title">Tour Virtual</h4>
                                            <p data-translate="pages.gallery.video.tour.description">Recorre nuestras instalaciones</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="video-item">
                                    <div class="video-poster" style="background-image: url(images/gallery_9.jpeg);">
                                        <div class="play-button">
                                            <i class="icon-play3"></i>
                                        </div>
                                        <div class="video-overlay">
                                            <h4 data-translate="pages.gallery.video.chef.title">Chef en Acción</h4>
                                            <p data-translate="pages.gallery.video.chef.description">El arte culinario en movimiento</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        galleryContainer.innerHTML = galleryHTML;
        console.log('✅ Gallery HTML structure created');

        // Forzar visibilidad inmediatamente
        this.forceVisibility();

        // Verificar que los filtros se crearon
        const filters = document.querySelectorAll('.filter-btn');
        console.log('🔍 Filters created:', filters.length);

        // Verificar que los elementos de galería se crearon
        const items = document.querySelectorAll('.gallery-item');
        console.log('🖼️ Gallery items created:', items.length);
    }

    // Forzar visibilidad de todos los elementos
    forceVisibility() {
        console.log('👁️ Forcing visibility of all gallery elements...');

        // Forzar visibilidad del título y descripción
        const heading = document.querySelector('#fh5co-gallery .fh5co-heading');
        if (heading) {
            heading.style.opacity = '1';
            heading.style.visibility = 'visible';
            heading.style.display = 'block';

            const title = heading.querySelector('h2');
            const description = heading.querySelector('p');

            if (title) {
                title.style.opacity = '1';
                title.style.visibility = 'visible';
                title.style.display = 'block';
                title.style.color = 'rgba(255, 255, 255, 0.9)';
            }

            if (description) {
                description.style.opacity = '1';
                description.style.visibility = 'visible';
                description.style.display = 'block';
                description.style.color = 'rgba(255, 255, 255, 0.7)';
            }

            console.log('✅ Heading visibility forced');
        }

        // Forzar visibilidad de colecciones
        document.querySelectorAll('.gallery-collection').forEach(collection => {
            collection.style.opacity = '1';
            collection.style.visibility = 'visible';
            collection.style.display = 'block';
        });

        // Forzar visibilidad del grid
        const grid = document.querySelector('.gallery-grid');
        if (grid) {
            grid.style.opacity = '1';
            grid.style.visibility = 'visible';
            grid.style.display = 'grid';
            console.log('✅ Grid visibility forced');
        }

        console.log('✅ All elements visibility forced');

        // Debug: Verificar estilos aplicados
        this.debugVisibility();
    }

    // Debug: Verificar por qué los elementos no son visibles
    debugVisibility() {
        const heading = document.querySelector('#fh5co-gallery .fh5co-heading');
        if (heading) {
            const computedStyle = window.getComputedStyle(heading);
            console.log('📝 Heading computed styles:', {
                display: computedStyle.display,
                opacity: computedStyle.opacity,
                visibility: computedStyle.visibility
            });
        }

        const firstCollection = document.querySelector('.gallery-collection');
        if (firstCollection) {
            const computedStyle = window.getComputedStyle(firstCollection);
            console.log('🎨 First collection computed styles:', {
                display: computedStyle.display,
                opacity: computedStyle.opacity,
                visibility: computedStyle.visibility,
                position: computedStyle.position
            });
        }

        const grid = document.querySelector('.gallery-grid');
        if (grid) {
            const computedStyle = window.getComputedStyle(grid);
            console.log('🔲 Grid computed styles:', {
                display: computedStyle.display,
                gridTemplateColumns: computedStyle.gridTemplateColumns
            });
        }
    }

    // Función de prueba para verificar que las colecciones funcionen
    testCollections() {
        console.log('🧪 Testing collections functionality...');

        const collections = document.querySelectorAll('.gallery-collection');
        const viewButtons = document.querySelectorAll('.collection-view-btn');

        console.log('🎨 Collections found:', collections.length);
        console.log('👁️ View buttons found:', viewButtons.length);

        // Verificar categorías de las colecciones
        const categories = {};
        collections.forEach(collection => {
            const category = collection.getAttribute('data-category');
            if (!categories[category]) categories[category] = 0;
            categories[category]++;
        });

        console.log('📊 Collections by category:', categories);

        // Verificar que los botones tengan los data-collection correctos
        viewButtons.forEach(btn => {
            const collection = btn.getAttribute('data-collection');
            console.log(`👁️ Button has collection: "${collection}"`);
        });

        // Verificar datos de colecciones
        Object.keys(this.galleryData).forEach(key => {
            const collection = this.galleryData[key];
            console.log(`📁 Collection "${key}": ${collection.images.length} images`);
        });
    }
    
    // Generar tarjetas de colección con traducciones
    generateGalleryItems() {
        let html = '';

        Object.keys(this.galleryData).forEach((category, index) => {
            const collection = this.galleryData[category];
            const imageCount = collection.images.length;

            // Obtener traducciones
            const translate = window.languageManager ? window.languageManager.translate.bind(window.languageManager) : (key) => key;
            const title = translate(`pages.gallery.categories.${category}.title`);
            const description = translate(`pages.gallery.categories.${category}.description`);
            const viewCollectionText = translate('pages.gallery.ui.viewCollection');
            const photosText = translate('pages.gallery.ui.photos');

            html += `
                <div class="gallery-collection ${category}" data-category="${category}" data-collection="${category}">
                    <div class="collection-cover" style="background-image: url(${collection.coverImage});">
                        <div class="collection-overlay">
                            <div class="collection-content">
                                <div class="collection-info">
                                    <h3>${title}</h3>
                                    <p>${description}</p>
                                    <div class="collection-meta">
                                        <span class="image-count">
                                            <i class="icon-camera"></i>
                                            ${imageCount} ${photosText}
                                        </span>
                                    </div>
                                </div>
                                <button class="collection-view-btn" data-collection="${category}">
                                    <i class="icon-eye"></i>
                                    <span>${viewCollectionText}</span>
                                </button>
                            </div>
                        </div>

                        <!-- Indicador de múltiples fotos -->
                        <div class="collection-indicator">
                            <div class="indicator-dots">
                                ${Array.from({length: Math.min(imageCount, 4)}, (_, i) =>
                                    `<div class="dot ${i === 0 ? 'active' : ''}"></div>`
                                ).join('')}
                                ${imageCount > 4 ? '<div class="dot-more">+</div>' : ''}
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });

        return html;
    }
    
    // Configurar event listeners
    setupEventListeners() {
        console.log('🔘 Setting up collection event listeners...');
        
        // Collection viewer
        document.addEventListener('click', (e) => {
            if (e.target.closest('.collection-view-btn')) {
                e.preventDefault();
                const btn = e.target.closest('.collection-view-btn');
                const collection = btn.getAttribute('data-collection');
                this.openCollectionSlider(collection);
            }
        });
        
        // Videos placeholder
        document.querySelectorAll('.video-poster').forEach(poster => {
            poster.addEventListener('click', () => {
                // Placeholder para futuros videos
                alert('¡Próximamente videos del restaurante!');
            });
        });
    }
    

    
    // Configurar lazy loading
    setupLazyLoading() {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.style.backgroundImage = `url(${img.dataset.src})`;
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });
        
        document.querySelectorAll('.gallery-image').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Animar elementos de la galería
    animateGalleryItems() {
        const items = document.querySelectorAll('.gallery-item');
        console.log('🎬 Animating gallery items:', items.length);

        items.forEach((item, index) => {
            // Asegurar que el elemento sea visible
            item.style.display = 'block';
            item.style.opacity = '1';
            item.style.visibility = 'visible';

            setTimeout(() => {
                item.classList.add('animate-in');
                item.classList.add('show');

                // Forzar visibilidad una vez más
                item.style.opacity = '1';
                item.style.visibility = 'visible';
            }, index * 50);
        });

        // Forzar visibilidad de todo después de animar
        setTimeout(() => {
            this.forceVisibility();
        }, items.length * 50 + 100);
    }
    
    // Abrir slider de colección
    openCollectionSlider(collectionKey) {
        if (this.lightboxOpen) return;

        const collection = this.galleryData[collectionKey];
        if (!collection) return;

        this.lightboxOpen = true;
        this.currentImageIndex = 0;

        // Obtener traducciones
        const translate = window.languageManager ? window.languageManager.translate.bind(window.languageManager) : (key) => key;
        const title = translate(`pages.gallery.categories.${collectionKey}.title`);
        const description = translate(`pages.gallery.categories.${collectionKey}.description`);
        const firstImageTitle = translate(`pages.gallery.items.${collection.images[0].key || 'image_1'}.title`) || collection.images[0].title;
        const firstImageDescription = translate(`pages.gallery.items.${collection.images[0].key || 'image_1'}.description`) || collection.images[0].description;

        const sliderHTML = `
            <div class="collection-slider" id="collectionSlider">
                <div class="slider-overlay"></div>
                <div class="slider-container">
                    <div class="slider-header">
                        <div class="slider-title">
                            <h2>${title}</h2>
                            <p>${description}</p>
                        </div>
                        <button class="slider-close">
                            <i class="icon-close"></i>
                        </button>
                    </div>

                    <div class="slider-content">
                        <div class="slider-main">
                            <button class="slider-nav prev" id="sliderPrev">
                                <i class="icon-chevron-left"></i>
                            </button>

                            <div class="slider-image-container">
                                <img src="${collection.images[0].src}" alt="${collection.images[0].title}" id="sliderMainImage">
                                <div class="slider-image-info">
                                    <h3 id="sliderImageTitle">${collection.images[0].title}</h3>
                                    <p id="sliderImageDescription">${collection.images[0].description}</p>
                                </div>
                            </div>

                            <button class="slider-nav next" id="sliderNext">
                                <i class="icon-chevron-right"></i>
                            </button>
                        </div>

                        <div class="slider-thumbnails">
                            ${collection.images.map((img, index) => `
                                <div class="thumbnail ${index === 0 ? 'active' : ''}" data-index="${index}">
                                    <img src="${img.src}" alt="${img.title}">
                                </div>
                            `).join('')}
                        </div>

                        <div class="slider-counter">
                            <span id="sliderCounter">1 / ${collection.images.length}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', sliderHTML);

        // Configurar event listeners
        this.setupSliderEvents(collection);

        // Animar entrada
        setTimeout(() => {
            document.getElementById('collectionSlider').classList.add('show');
        }, 10);
    }

    // Configurar eventos del slider
    setupSliderEvents(collection) {
        const slider = document.getElementById('collectionSlider');
        const closeBtn = slider.querySelector('.slider-close');
        const overlay = slider.querySelector('.slider-overlay');
        const prevBtn = slider.querySelector('#sliderPrev');
        const nextBtn = slider.querySelector('#sliderNext');
        const thumbnails = slider.querySelectorAll('.thumbnail');

        // Cerrar slider
        [closeBtn, overlay].forEach(el => {
            el.addEventListener('click', () => this.closeSlider());
        });

        // Navegación con flechas
        prevBtn.addEventListener('click', () => this.navigateSlider(collection, -1));
        nextBtn.addEventListener('click', () => this.navigateSlider(collection, 1));

        // Thumbnails
        thumbnails.forEach((thumb, index) => {
            thumb.addEventListener('click', () => this.goToSlide(collection, index));
        });

        // Teclado
        document.addEventListener('keydown', (e) => {
            if (!this.lightboxOpen) return;

            switch(e.key) {
                case 'Escape':
                    this.closeSlider();
                    break;
                case 'ArrowLeft':
                    this.navigateSlider(collection, -1);
                    break;
                case 'ArrowRight':
                    this.navigateSlider(collection, 1);
                    break;
            }
        });
    }

    // Navegar en el slider
    navigateSlider(collection, direction) {
        const newIndex = this.currentImageIndex + direction;

        if (newIndex >= 0 && newIndex < collection.images.length) {
            this.goToSlide(collection, newIndex);
        }
    }

    // Ir a slide específico
    goToSlide(collection, index) {
        this.currentImageIndex = index;
        const image = collection.images[index];

        // Actualizar imagen principal
        const mainImage = document.getElementById('sliderMainImage');
        const title = document.getElementById('sliderImageTitle');
        const description = document.getElementById('sliderImageDescription');
        const counter = document.getElementById('sliderCounter');

        mainImage.src = image.src;
        mainImage.alt = image.title;
        title.textContent = image.title;
        description.textContent = image.description;
        counter.textContent = `${index + 1} / ${collection.images.length}`;

        // Actualizar thumbnails
        document.querySelectorAll('.thumbnail').forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
        });

        // Actualizar botones de navegación
        const prevBtn = document.getElementById('sliderPrev');
        const nextBtn = document.getElementById('sliderNext');

        prevBtn.style.opacity = index === 0 ? '0.5' : '1';
        nextBtn.style.opacity = index === collection.images.length - 1 ? '0.5' : '1';
    }

    // Cerrar slider
    closeSlider() {
        const slider = document.getElementById('collectionSlider');
        if (slider) {
            slider.classList.remove('show');
            setTimeout(() => {
                slider.remove();
                this.lightboxOpen = false;
            }, 300);
        }
    }
    
    // Cerrar lightbox
    closeLightbox() {
        const lightbox = document.getElementById('premiumLightbox');
        if (lightbox) {
            lightbox.classList.remove('show');
            setTimeout(() => {
                lightbox.remove();
                this.lightboxOpen = false;
            }, 300);
        }
    }
}

// Inicializar la galería premium
let premiumGallery;

// Función para inicializar cuando todo esté listo
function initializePremiumGallery() {
    console.log('🚀 Initializing Premium Gallery...');
    if (typeof PremiumGallery !== 'undefined') {
        premiumGallery = new PremiumGallery();
        console.log('✅ Premium Gallery initialized successfully');
    } else {
        console.error('❌ PremiumGallery class not found');
    }
}

// Esperar a que todo esté cargado
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(initializePremiumGallery, 100);
    });
} else {
    setTimeout(initializePremiumGallery, 100);
}

// Exportar para uso global
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PremiumGallery;
} else {
    window.PremiumGallery = PremiumGallery;
    window.premiumGallery = premiumGallery;
}
