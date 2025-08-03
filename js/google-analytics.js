/**
 * Google Analytics 4 Configuration
 * Restaurante Tasty - Analytics Setup
 * Última actualización: Diciembre 2024
 */

// Configuración de Google Analytics 4
const GA4_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Reemplazar con ID real

// Cargar Google Analytics 4
(function() {
    // Crear script tag para gtag
    const gtagScript = document.createElement('script');
    gtagScript.async = true;
    gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`;
    document.head.appendChild(gtagScript);

    // Inicializar gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    // Configuración básica de GA4
    gtag('config', GA4_MEASUREMENT_ID, {
        // Configuración de privacidad
        anonymize_ip: true,
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
        
        // Configuración de cookies
        cookie_flags: 'SameSite=None;Secure',
        cookie_expires: 63072000, // 2 años
        
        // Configuración de eventos automáticos
        send_page_view: true,
        enhanced_measurement: {
            scrolls: true,
            outbound_clicks: true,
            site_search: true,
            video_engagement: true,
            file_downloads: true
        }
    });

    // Eventos personalizados para restaurante
    window.trackRestaurantEvent = function(eventName, parameters = {}) {
        gtag('event', eventName, {
            event_category: 'Restaurant',
            ...parameters
        });
    };

    // Tracking de reservas
    window.trackReservation = function(reservationData) {
        gtag('event', 'make_reservation', {
            event_category: 'Reservation',
            event_label: 'Online Booking',
            value: 1,
            custom_parameters: {
                date: reservationData.date || '',
                time: reservationData.time || '',
                guests: reservationData.guests || 0,
                table_type: reservationData.tableType || 'standard'
            }
        });
    };

    // Tracking de contacto
    window.trackContact = function(contactType) {
        gtag('event', 'contact', {
            event_category: 'Contact',
            event_label: contactType,
            value: 1
        });
    };

    // Tracking de menú
    window.trackMenuView = function(menuSection) {
        gtag('event', 'view_menu', {
            event_category: 'Menu',
            event_label: menuSection,
            value: 1
        });
    };

    // Tracking de WhatsApp
    window.trackWhatsApp = function() {
        gtag('event', 'whatsapp_click', {
            event_category: 'Contact',
            event_label: 'WhatsApp',
            value: 1
        });
    };

    // Tracking de llamadas telefónicas
    window.trackPhoneCall = function() {
        gtag('event', 'phone_call', {
            event_category: 'Contact',
            event_label: 'Phone',
            value: 1
        });
    };

    // Tracking de galería
    window.trackGalleryView = function(imageId) {
        gtag('event', 'view_gallery_image', {
            event_category: 'Gallery',
            event_label: imageId,
            value: 1
        });
    };

    // Tracking de redes sociales
    window.trackSocialClick = function(platform) {
        gtag('event', 'social_click', {
            event_category: 'Social',
            event_label: platform,
            value: 1
        });
    };

    // Tracking de descargas (menú PDF, etc.)
    window.trackDownload = function(fileName) {
        gtag('event', 'file_download', {
            event_category: 'Download',
            event_label: fileName,
            value: 1
        });
    };

    // Tracking de tiempo en página (para páginas importantes)
    let startTime = Date.now();
    window.trackTimeOnPage = function(pageName) {
        const timeSpent = Math.round((Date.now() - startTime) / 1000);
        if (timeSpent > 10) { // Solo trackear si estuvo más de 10 segundos
            gtag('event', 'time_on_page', {
                event_category: 'Engagement',
                event_label: pageName,
                value: timeSpent
            });
        }
    };

    // Auto-tracking al salir de la página
    window.addEventListener('beforeunload', function() {
        const pageName = document.title;
        window.trackTimeOnPage(pageName);
    });

    // Tracking de scroll profundo (75% de la página)
    let scrollTracked = false;
    window.addEventListener('scroll', function() {
        if (!scrollTracked) {
            const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
            if (scrollPercent > 75) {
                gtag('event', 'scroll_deep', {
                    event_category: 'Engagement',
                    event_label: '75_percent',
                    value: 1
                });
                scrollTracked = true;
            }
        }
    });

    // Configuración de consentimiento (RGPD)
    gtag('consent', 'default', {
        'analytics_storage': 'denied',
        'ad_storage': 'denied',
        'functionality_storage': 'granted',
        'security_storage': 'granted'
    });

    // Función para actualizar consentimiento
    window.updateGAConsent = function(analyticsConsent) {
        gtag('consent', 'update', {
            'analytics_storage': analyticsConsent ? 'granted' : 'denied'
        });
    };

    console.log('Google Analytics 4 configurado para Restaurante Tasty');
})();

// Configuración de eventos automáticos en elementos específicos
document.addEventListener('DOMContentLoaded', function() {
    // Tracking automático de enlaces de WhatsApp
    const whatsappLinks = document.querySelectorAll('a[href*="whatsapp"], a[href*="wa.me"]');
    whatsappLinks.forEach(link => {
        link.addEventListener('click', function() {
            window.trackWhatsApp();
        });
    });

    // Tracking automático de enlaces telefónicos
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            window.trackPhoneCall();
        });
    });

    // Tracking automático de redes sociales
    const socialLinks = document.querySelectorAll('a[href*="facebook"], a[href*="instagram"], a[href*="twitter"], a[href*="linkedin"]');
    socialLinks.forEach(link => {
        link.addEventListener('click', function() {
            const platform = link.href.includes('facebook') ? 'Facebook' :
                           link.href.includes('instagram') ? 'Instagram' :
                           link.href.includes('twitter') ? 'Twitter' :
                           link.href.includes('linkedin') ? 'LinkedIn' : 'Other';
            window.trackSocialClick(platform);
        });
    });

    // Tracking de formularios
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function() {
            const formType = form.id || form.className || 'unknown';
            gtag('event', 'form_submit', {
                event_category: 'Form',
                event_label: formType,
                value: 1
            });
        });
    });
});
