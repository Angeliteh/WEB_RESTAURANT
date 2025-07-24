/*
GESTOR DE IDIOMAS - RESTAURANTE TASTY
Manejo dinámico de traducciones con persistencia en localStorage
*/

class LanguageManager {
    constructor() {
        // Idioma por defecto: español
        this.currentLang = localStorage.getItem('tasty_language') || 'es';
        this.translations = window.translations || {};
        
        // Inicializar cuando el DOM esté listo
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }
    
    init() {
        console.log('🌐 Language Manager initialized');
        this.createLanguageSelector();
        this.updatePage();
        this.updateLanguageSelector();
    }
    
    // Crear el selector de idioma en el header
    createLanguageSelector() {
        const logoWrap = document.querySelector('.logo-wrap');
        if (!logoWrap) return;
        
        // Crear el contenedor del selector
        const selectorHTML = `
            <div class="language-selector">
                <div class="lang-toggle">
                    <button class="lang-btn" data-lang="es" title="Español">
                        <span class="lang-flag">🇪🇸</span>
                        <span class="lang-text">ES</span>
                    </button>
                    <button class="lang-btn" data-lang="en" title="English">
                        <span class="lang-flag">🇺🇸</span>
                        <span class="lang-text">EN</span>
                    </button>
                </div>
            </div>
        `;
        
        // Insertar después del logo
        logoWrap.insertAdjacentHTML('afterend', selectorHTML);
        
        // Agregar event listeners
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const lang = btn.getAttribute('data-lang');
                this.setLanguage(lang);
            });
        });
    }
    
    // Obtener traducción por clave
    translate(key) {
        const keys = key.split('.');
        let value = this.translations[this.currentLang];
        
        for (const k of keys) {
            if (value && typeof value === 'object') {
                value = value[k];
            } else {
                console.warn(`Translation key not found: ${key}`);
                return key; // Retornar la clave si no se encuentra
            }
        }
        
        return value || key;
    }
    
    // Cambiar idioma
    setLanguage(lang) {
        if (!this.translations[lang]) {
            console.error(`Language ${lang} not supported`);
            return;
        }
        
        this.currentLang = lang;
        localStorage.setItem('tasty_language', lang);
        
        console.log(`🌐 Language changed to: ${lang}`);
        
        this.updatePage();
        this.updateLanguageSelector();
        
        // Disparar evento personalizado
        document.dispatchEvent(new CustomEvent('languageChanged', {
            detail: { language: lang }
        }));
    }
    
    // Actualizar todos los elementos traducibles
    updatePage() {
        // Actualizar elementos con data-translate
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            const translation = this.translate(key);
            
            if (element.tagName === 'INPUT' && element.type === 'text') {
                element.placeholder = translation;
            } else {
                element.textContent = translation;
            }
        });
        
        // Actualizar elementos con data-translate-html (para contenido HTML)
        document.querySelectorAll('[data-translate-html]').forEach(element => {
            const key = element.getAttribute('data-translate-html');
            const translation = this.translate(key);
            element.innerHTML = translation;
        });
        
        // Actualizar atributos específicos
        document.querySelectorAll('[data-translate-title]').forEach(element => {
            const key = element.getAttribute('data-translate-title');
            const translation = this.translate(key);
            element.title = translation;
        });
        
        document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
            const key = element.getAttribute('data-translate-placeholder');
            const translation = this.translate(key);
            element.placeholder = translation;
        });
    }
    
    // Actualizar estado visual del selector
    updateLanguageSelector() {
        document.querySelectorAll('.lang-btn').forEach(btn => {
            const lang = btn.getAttribute('data-lang');
            if (lang === this.currentLang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }
    
    // Obtener idioma actual
    getCurrentLanguage() {
        return this.currentLang;
    }
    
    // Verificar si un idioma está soportado
    isLanguageSupported(lang) {
        return !!this.translations[lang];
    }
    
    // Obtener lista de idiomas soportados
    getSupportedLanguages() {
        return Object.keys(this.translations);
    }
}

// CSS para el selector de idioma y sección de ubicación
const languageSelectorCSS = `
<style>
.language-selector {
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 1000;
}

.lang-toggle {
    display: flex;
    background: rgba(0, 0, 0, 0.7);
    border-radius: 25px;
    padding: 5px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.lang-btn {
    display: flex;
    align-items: center;
    gap: 5px;
    background: transparent;
    border: none;
    color: rgba(255, 255, 255, 0.7);
    padding: 8px 12px;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 12px;
    font-weight: 500;
}

.lang-btn:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
    transform: translateY(-1px);
}

.lang-btn.active {
    background: #ea272d;
    color: #fff;
    box-shadow: 0 2px 8px rgba(234, 39, 45, 0.3);
}

.lang-flag {
    font-size: 14px;
}

.lang-text {
    font-family: "Cormorant Garamond", Georgia, serif;
    font-weight: 600;
}

/* Responsive */
@media screen and (max-width: 768px) {
    .language-selector {
        top: 15px;
        right: 15px;
    }
    
    .lang-btn {
        padding: 6px 10px;
        font-size: 11px;
    }
    
    .lang-text {
        display: none;
    }
}

/* Animación suave */
.lang-btn {
    position: relative;
    overflow: hidden;
}

.lang-btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
}

.lang-btn:hover::before {
    left: 100%;
}

/* Estilos para la sección de ubicación */
#fh5co-location {
    background: #000;
    padding: 7em 0;
}

.fh5co-contact-info {
    padding: 2em 0;
}

.fh5co-contact-title {
    color: #fff;
    font-size: 24px;
    font-weight: 400;
    margin-bottom: 30px;
    font-family: "Cormorant Garamond", Georgia, serif;
}

.fh5co-contact-details {
    list-style: none;
    padding: 0;
    margin: 0;
}

.fh5co-contact-details li {
    margin-bottom: 25px;
    color: rgba(255, 255, 255, 0.7);
    font-size: 16px;
    line-height: 1.6;
    display: flex;
    align-items: flex-start;
}

.fh5co-contact-details li i {
    color: #ea272d;
    font-size: 18px;
    margin-right: 15px;
    margin-top: 3px;
    min-width: 20px;
}

.fh5co-contact-details li span:first-of-type {
    color: #fff;
    font-weight: 600;
    display: block;
    margin-bottom: 5px;
}

.fh5co-contact-details li a {
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    transition: color 0.3s ease;
}

.fh5co-contact-details li a:hover {
    color: #ea272d;
}

.fh5co-map {
    position: relative;
}

.map-responsive {
    position: relative;
    overflow: hidden;
    border-radius: 8px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.3);
    border: 2px solid rgba(255, 255, 255, 0.1);
    transition: all 0.3s ease;
}

.map-responsive:hover {
    border-color: #ea272d;
    box-shadow: 0 6px 20px rgba(234, 39, 45, 0.2);
    transform: translateY(-2px);
}

.map-responsive iframe {
    width: 100%;
    height: 450px;
    border: none;
    border-radius: 6px;
    filter: brightness(0.9) contrast(1.1);
    transition: filter 0.3s ease;
}

.map-responsive:hover iframe {
    filter: brightness(1) contrast(1.2);
}

/* Responsive para la sección de ubicación */
@media screen and (max-width: 768px) {
    #fh5co-location {
        padding: 4em 0;
    }

    .fh5co-contact-info {
        padding: 1em 0;
        margin-bottom: 2em;
    }

    .map-responsive iframe {
        height: 350px !important;
    }
}
</style>
`;

// Inyectar CSS
document.head.insertAdjacentHTML('beforeend', languageSelectorCSS);

// Inicializar el gestor de idiomas
let languageManager;

// Esperar a que se carguen las traducciones
if (typeof translations !== 'undefined') {
    languageManager = new LanguageManager();
} else {
    document.addEventListener('DOMContentLoaded', () => {
        if (typeof translations !== 'undefined') {
            languageManager = new LanguageManager();
        } else {
            console.error('Translations not loaded. Make sure translations.js is included before language-manager.js');
        }
    });
}

// Exportar para uso global
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LanguageManager;
} else {
    window.LanguageManager = LanguageManager;
    window.languageManager = languageManager;
}
