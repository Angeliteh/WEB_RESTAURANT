/**
 * Cookie Consent Banner - RGPD Compliant
 * Restaurante Tasty - Cookie Management
 * Última actualización: Diciembre 2024
 */

(function() {
    'use strict';

    // Configuración del banner de cookies
    const COOKIE_CONSENT_CONFIG = {
        cookieName: 'tasty_cookie_consent',
        cookieExpiry: 365, // días
        showDelay: 1000, // milisegundos
        autoHide: false,
        position: 'bottom', // 'top' o 'bottom'
        theme: 'light' // 'light' o 'dark'
    };

    // Textos del banner (multiidioma)
    const CONSENT_TEXTS = {
        es: {
            title: '🍪 Uso de Cookies',
            message: 'Utilizamos cookies para mejorar tu experiencia en nuestro sitio web, analizar el tráfico y personalizar el contenido. Al continuar navegando, aceptas nuestro uso de cookies.',
            acceptAll: 'Aceptar Todas',
            acceptNecessary: 'Solo Necesarias',
            settings: 'Configurar',
            learnMore: 'Más Información',
            privacyPolicy: 'Política de Privacidad'
        },
        en: {
            title: '🍪 Cookie Usage',
            message: 'We use cookies to improve your experience on our website, analyze traffic and personalize content. By continuing to browse, you accept our use of cookies.',
            acceptAll: 'Accept All',
            acceptNecessary: 'Necessary Only',
            settings: 'Settings',
            learnMore: 'Learn More',
            privacyPolicy: 'Privacy Policy'
        }
    };

    // Tipos de cookies
    const COOKIE_TYPES = {
        necessary: {
            name: 'Necesarias',
            description: 'Cookies esenciales para el funcionamiento básico del sitio web.',
            required: true,
            cookies: ['tasty_cookie_consent', 'tasty_language', 'tasty_theme']
        },
        analytics: {
            name: 'Analíticas',
            description: 'Nos ayudan a entender cómo los visitantes interactúan con el sitio web.',
            required: false,
            cookies: ['_ga', '_ga_*', '_gid', '_gat']
        },
        marketing: {
            name: 'Marketing',
            description: 'Se utilizan para rastrear visitantes en sitios web para mostrar anuncios relevantes.',
            required: false,
            cookies: ['_fbp', '_fbc', 'fr']
        },
        functional: {
            name: 'Funcionales',
            description: 'Permiten funcionalidades mejoradas y personalización.',
            required: false,
            cookies: ['tasty_preferences', 'tasty_cart']
        }
    };

    // Estado del consentimiento
    let consentState = {
        necessary: true,
        analytics: false,
        marketing: false,
        functional: false
    };

    // Función para obtener el idioma actual
    function getCurrentLanguage() {
        return localStorage.getItem('tasty_language') || 'es';
    }

    // Función para obtener textos en el idioma actual
    function getTexts() {
        const lang = getCurrentLanguage();
        return CONSENT_TEXTS[lang] || CONSENT_TEXTS.es;
    }

    // Función para crear el CSS del banner
    function createBannerCSS() {
        const css = `
            .cookie-consent-banner {
                position: fixed;
                ${COOKIE_CONSENT_CONFIG.position}: 0;
                left: 0;
                right: 0;
                background: ${COOKIE_CONSENT_CONFIG.theme === 'dark' ? '#333' : '#fff'};
                color: ${COOKIE_CONSENT_CONFIG.theme === 'dark' ? '#fff' : '#333'};
                padding: 20px;
                box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
                z-index: 10000;
                font-family: 'Cormorant Garamond', serif;
                border-top: 3px solid #ea272d;
                transform: translateY(100%);
                transition: transform 0.3s ease-in-out;
            }
            
            .cookie-consent-banner.show {
                transform: translateY(0);
            }
            
            .cookie-consent-content {
                max-width: 1200px;
                margin: 0 auto;
                display: flex;
                align-items: center;
                justify-content: space-between;
                flex-wrap: wrap;
                gap: 20px;
            }
            
            .cookie-consent-text {
                flex: 1;
                min-width: 300px;
            }
            
            .cookie-consent-title {
                font-size: 18px;
                font-weight: 600;
                margin-bottom: 8px;
                color: #ea272d;
            }
            
            .cookie-consent-message {
                font-size: 14px;
                line-height: 1.4;
                margin-bottom: 10px;
            }
            
            .cookie-consent-actions {
                display: flex;
                gap: 10px;
                flex-wrap: wrap;
                align-items: center;
            }
            
            .cookie-consent-btn {
                padding: 10px 20px;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-size: 14px;
                font-weight: 500;
                transition: all 0.3s ease;
                text-decoration: none;
                display: inline-block;
                text-align: center;
            }
            
            .cookie-consent-btn-primary {
                background: #ea272d;
                color: white;
            }
            
            .cookie-consent-btn-primary:hover {
                background: #d41e24;
                color: white;
            }
            
            .cookie-consent-btn-secondary {
                background: transparent;
                color: #ea272d;
                border: 1px solid #ea272d;
            }
            
            .cookie-consent-btn-secondary:hover {
                background: #ea272d;
                color: white;
            }
            
            .cookie-consent-btn-link {
                background: transparent;
                color: #666;
                text-decoration: underline;
                border: none;
                padding: 5px 10px;
            }
            
            .cookie-consent-btn-link:hover {
                color: #ea272d;
            }
            
            @media (max-width: 768px) {
                .cookie-consent-content {
                    flex-direction: column;
                    text-align: center;
                }
                
                .cookie-consent-actions {
                    justify-content: center;
                    width: 100%;
                }
                
                .cookie-consent-btn {
                    flex: 1;
                    min-width: 120px;
                }
            }
        `;
        
        const style = document.createElement('style');
        style.textContent = css;
        document.head.appendChild(style);
    }

    // Función para crear el HTML del banner
    function createBannerHTML() {
        const texts = getTexts();
        
        return `
            <div class="cookie-consent-banner" id="cookieConsentBanner">
                <div class="cookie-consent-content">
                    <div class="cookie-consent-text">
                        <div class="cookie-consent-title">${texts.title}</div>
                        <div class="cookie-consent-message">${texts.message}</div>
                    </div>
                    <div class="cookie-consent-actions">
                        <button class="cookie-consent-btn cookie-consent-btn-primary" onclick="acceptAllCookies()">
                            ${texts.acceptAll}
                        </button>
                        <button class="cookie-consent-btn cookie-consent-btn-secondary" onclick="acceptNecessaryCookies()">
                            ${texts.acceptNecessary}
                        </button>
                        <a href="privacy-policy.html" class="cookie-consent-btn cookie-consent-btn-link">
                            ${texts.privacyPolicy}
                        </a>
                    </div>
                </div>
            </div>
        `;
    }

    // Función para verificar si ya se dio consentimiento
    function hasConsent() {
        const consent = localStorage.getItem(COOKIE_CONSENT_CONFIG.cookieName);
        return consent !== null;
    }

    // Función para guardar el consentimiento
    function saveConsent(consent) {
        const consentData = {
            timestamp: Date.now(),
            consent: consent,
            version: '1.0'
        };
        localStorage.setItem(COOKIE_CONSENT_CONFIG.cookieName, JSON.stringify(consentData));
        
        // Actualizar Google Analytics si está disponible
        if (typeof window.updateGAConsent === 'function') {
            window.updateGAConsent(consent.analytics);
        }
    }

    // Función para aceptar todas las cookies
    window.acceptAllCookies = function() {
        const consent = {
            necessary: true,
            analytics: true,
            marketing: true,
            functional: true
        };
        saveConsent(consent);
        hideBanner();
        
        // Recargar Google Analytics con consentimiento
        if (typeof gtag !== 'undefined') {
            gtag('consent', 'update', {
                'analytics_storage': 'granted',
                'ad_storage': 'granted'
            });
        }
    };

    // Función para aceptar solo cookies necesarias
    window.acceptNecessaryCookies = function() {
        const consent = {
            necessary: true,
            analytics: false,
            marketing: false,
            functional: false
        };
        saveConsent(consent);
        hideBanner();
    };

    // Función para ocultar el banner
    function hideBanner() {
        const banner = document.getElementById('cookieConsentBanner');
        if (banner) {
            banner.classList.remove('show');
            setTimeout(() => {
                banner.remove();
            }, 300);
        }
    }

    // Función para mostrar el banner
    function showBanner() {
        if (hasConsent()) {
            return;
        }

        // Crear CSS
        createBannerCSS();
        
        // Crear y agregar el banner al DOM
        const bannerHTML = createBannerHTML();
        document.body.insertAdjacentHTML('beforeend', bannerHTML);
        
        // Mostrar el banner con animación
        setTimeout(() => {
            const banner = document.getElementById('cookieConsentBanner');
            if (banner) {
                banner.classList.add('show');
            }
        }, COOKIE_CONSENT_CONFIG.showDelay);
    }

    // Función para obtener el consentimiento actual
    window.getCookieConsent = function() {
        const consent = localStorage.getItem(COOKIE_CONSENT_CONFIG.cookieName);
        if (consent) {
            try {
                return JSON.parse(consent);
            } catch (e) {
                return null;
            }
        }
        return null;
    };

    // Función para revocar el consentimiento
    window.revokeCookieConsent = function() {
        localStorage.removeItem(COOKIE_CONSENT_CONFIG.cookieName);
        // Limpiar cookies de terceros
        document.cookie.split(";").forEach(function(c) { 
            document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
        });
        location.reload();
    };

    // Inicializar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', showBanner);
    } else {
        showBanner();
    }

    console.log('Cookie Consent System initialized for Restaurante Tasty');
})();
