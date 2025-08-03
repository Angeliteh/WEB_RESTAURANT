/*
PWA MANAGER - RESTAURANTE TASTY
Maneja instalación, actualizaciones, notificaciones y funcionalidad offline
*/

class PWAManager {
    constructor() {
        this.deferredPrompt = null;
        this.isInstalled = false;
        this.isOnline = navigator.onLine;
        this.swRegistration = null;
        
        this.init();
    }
    
    async init() {
        console.log('📱 PWA Manager initialized');
        
        // Registrar Service Worker
        await this.registerServiceWorker();
        
        // Configurar eventos de instalación
        this.setupInstallPrompt();
        
        // Configurar eventos de conectividad
        this.setupConnectivityEvents();
        
        // Configurar notificaciones
        this.setupNotifications();

        // Verificar actualizaciones
        this.checkForUpdates();
    }
    
    // Registrar Service Worker
    async registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            try {
                this.swRegistration = await navigator.serviceWorker.register('./sw.js', {
                    scope: './'
                });
                
                console.log('✅ Service Worker registered:', this.swRegistration.scope);
                
                // Escuchar actualizaciones del SW
                this.swRegistration.addEventListener('updatefound', () => {
                    console.log('🔄 Service Worker update found');
                    this.handleServiceWorkerUpdate();
                });
                
                // Verificar si hay un SW esperando
                if (this.swRegistration.waiting) {
                    this.showUpdateAvailable();
                }
                
            } catch (error) {
                console.error('❌ Service Worker registration failed:', error);
            }
        } else {
            console.warn('⚠️ Service Workers not supported');
        }
    }
    
    // Configurar prompt de instalación
    setupInstallPrompt() {
        // Capturar el evento beforeinstallprompt
        window.addEventListener('beforeinstallprompt', (e) => {
            console.log('📲 Install prompt available');

            // Prevenir el prompt automático
            e.preventDefault();

            // Guardar el evento para usarlo después
            this.deferredPrompt = e;

            // Verificar si debe mostrar el banner (solo en móviles)
            this.checkInstallBanner();
        });
        
        // Detectar cuando la app se instala
        window.addEventListener('appinstalled', () => {
            console.log('🎉 PWA installed successfully');
            this.isInstalled = true;
            this.hideInstallBanner();
            this.showInstalledMessage();
            
            // Analytics
            this.trackEvent('pwa_installed');
        });
    }
    
    // Mostrar banner de instalación personalizado
    showInstallBanner() {
        // Verificar si ya está instalado o si el banner ya existe
        if (this.isInstalled || document.getElementById('pwa-install-banner')) {
            return;
        }
        
        const banner = document.createElement('div');
        banner.id = 'pwa-install-banner';
        banner.innerHTML = `
            <div class="pwa-banner">
                <div class="pwa-banner-content">
                    <div class="pwa-banner-icon">
                        <img src="images/icons/icon-144x144.png" alt="Restaurante Tasty">
                    </div>
                    <div class="pwa-banner-text">
                        <h4>Instalar Restaurante Tasty</h4>
                        <p>Acceso rápido, funciona offline y notificaciones de promociones</p>
                    </div>
                    <div class="pwa-banner-actions">
                        <button class="pwa-install-btn" onclick="pwaManager.installApp()">
                            Instalar
                        </button>
                        <button class="pwa-close-btn" onclick="pwaManager.hideInstallBanner()">
                            ×
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        // Agregar estilos
        const style = document.createElement('style');
        style.textContent = `
            .pwa-banner {
                position: fixed;
                bottom: 20px;
                left: 20px;
                max-width: 350px;
                background: rgba(255, 255, 255, 0.98);
                color: #333;
                border-radius: 12px;
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
                z-index: 9999;
                backdrop-filter: blur(10px);
                border: 1px solid rgba(234, 39, 45, 0.2);
                animation: slideUp 0.4s ease;
            }
            
            .pwa-banner-content {
                display: flex;
                align-items: center;
                padding: 16px 18px;
                gap: 12px;
                position: relative;
            }

            .pwa-banner-icon img {
                width: 45px;
                height: 45px;
                border-radius: 8px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            }

            .pwa-banner-text {
                flex: 1;
                padding-right: 10px;
            }

            .pwa-banner-text h4 {
                margin: 0 0 4px 0;
                font-size: 15px;
                font-weight: 600;
                color: #333;
            }

            .pwa-banner-text p {
                margin: 0;
                font-size: 12px;
                opacity: 0.7;
                color: #666;
                line-height: 1.3;
            }
            
            .pwa-banner-actions {
                display: flex;
                flex-direction: column;
                gap: 8px;
                align-items: center;
                min-width: 80px;
            }

            .pwa-install-btn {
                background: #ea272d;
                color: white;
                border: none;
                padding: 8px 16px;
                border-radius: 20px;
                font-weight: 500;
                font-size: 13px;
                cursor: pointer;
                transition: all 0.3s ease;
                white-space: nowrap;
            }

            .pwa-install-btn:hover {
                background: #c21e24;
                transform: translateY(-1px);
                box-shadow: 0 4px 12px rgba(234, 39, 45, 0.3);
            }

            .pwa-close-btn {
                position: absolute;
                top: 8px;
                right: 8px;
                background: rgba(0,0,0,0.1);
                color: #666;
                border: none;
                width: 24px;
                height: 24px;
                border-radius: 50%;
                font-size: 16px;
                cursor: pointer;
                opacity: 0.6;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
                line-height: 1;
            }

            .pwa-close-btn:hover {
                opacity: 1;
                background: rgba(234, 39, 45, 0.1);
                color: #ea272d;
            }
            
            @keyframes slideUp {
                from {
                    transform: translateY(100%);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }
            
            @media (max-width: 768px) {
                .pwa-banner {
                    left: 10px;
                    bottom: 10px;
                    max-width: 280px;
                }

                .pwa-banner-content {
                    padding: 14px 16px;
                    gap: 10px;
                }

                .pwa-banner-icon img {
                    width: 40px;
                    height: 40px;
                }

                .pwa-banner-text h4 {
                    font-size: 14px;
                }

                .pwa-banner-text p {
                    font-size: 11px;
                }

                .pwa-install-btn {
                    padding: 6px 12px;
                    font-size: 12px;
                }

                .pwa-close-btn {
                    width: 22px;
                    height: 22px;
                    font-size: 14px;
                }
            }

            @media (max-width: 480px) {
                .pwa-banner {
                    left: 5px;
                    bottom: 5px;
                    max-width: 260px;
                }
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(banner);
        
        // Auto-ocultar después de 10 segundos
        setTimeout(() => {
            this.hideInstallBanner();
        }, 10000);
    }
    
    // Instalar la app
    async installApp() {
        if (!this.deferredPrompt) {
            console.warn('⚠️ Install prompt not available');
            return;
        }
        
        try {
            // Mostrar el prompt de instalación
            this.deferredPrompt.prompt();
            
            // Esperar la respuesta del usuario
            const { outcome } = await this.deferredPrompt.userChoice;
            
            console.log(`📱 Install prompt result: ${outcome}`);
            
            if (outcome === 'accepted') {
                this.trackEvent('pwa_install_accepted');
            } else {
                this.trackEvent('pwa_install_dismissed');
            }
            
            // Limpiar el prompt
            this.deferredPrompt = null;
            this.hideInstallBanner();
            
        } catch (error) {
            console.error('❌ Install failed:', error);
        }
    }
    
    // Ocultar banner de instalación
    hideInstallBanner() {
        const banner = document.getElementById('pwa-install-banner');
        if (banner) {
            banner.style.animation = 'slideDown 0.3s ease';
            setTimeout(() => {
                banner.remove();
            }, 300);

            // Marcar como cerrado por el usuario para no volver a mostrar en esta sesión
            sessionStorage.setItem('pwa-banner-dismissed', 'true');
        }
    }
    
    // Mostrar mensaje de instalación exitosa
    showInstalledMessage() {
        const message = document.createElement('div');
        message.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                right: 20px;
                background: #28a745;
                color: white;
                padding: 15px 20px;
                border-radius: 10px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.3);
                z-index: 10001;
                animation: slideInRight 0.5s ease;
            ">
                <strong>🎉 ¡App instalada!</strong><br>
                <small>Ahora puedes acceder desde tu escritorio</small>
            </div>
        `;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.remove();
        }, 5000);
    }
    
    // Configurar eventos de conectividad
    setupConnectivityEvents() {
        window.addEventListener('online', () => {
            console.log('🌐 Connection restored');
            this.isOnline = true;
            this.showConnectivityStatus('online');
        });
        
        window.addEventListener('offline', () => {
            console.log('📶 Connection lost');
            this.isOnline = false;
            this.showConnectivityStatus('offline');
        });
    }
    
    // Mostrar estado de conectividad
    showConnectivityStatus(status) {
        const existing = document.getElementById('connectivity-status');
        if (existing) existing.remove();
        
        const statusDiv = document.createElement('div');
        statusDiv.id = 'connectivity-status';
        
        if (status === 'offline') {
            statusDiv.innerHTML = `
                <div style="
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    background: #dc3545;
                    color: white;
                    text-align: center;
                    padding: 10px;
                    z-index: 10002;
                    font-weight: 600;
                ">
                    📶 Sin conexión - Funcionando en modo offline
                </div>
            `;
        } else {
            statusDiv.innerHTML = `
                <div style="
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    background: #28a745;
                    color: white;
                    text-align: center;
                    padding: 10px;
                    z-index: 10002;
                    font-weight: 600;
                    animation: slideDown 0.5s ease;
                ">
                    🌐 Conexión restaurada
                </div>
            `;
            
            setTimeout(() => {
                statusDiv.remove();
            }, 3000);
        }
        
        document.body.appendChild(statusDiv);
    }
    
    // Configurar notificaciones push
    async setupNotifications() {
        if ('Notification' in window && 'serviceWorker' in navigator) {
            // Verificar permisos
            let permission = Notification.permission;
            
            if (permission === 'default') {
                // Mostrar prompt de notificaciones después de un tiempo
                setTimeout(() => {
                    this.requestNotificationPermission();
                }, 30000); // 30 segundos después de cargar
            }
        }
    }
    
    // Solicitar permisos de notificación
    async requestNotificationPermission() {
        try {
            const permission = await Notification.requestPermission();
            
            if (permission === 'granted') {
                console.log('✅ Notification permission granted');
                this.trackEvent('notifications_enabled');
                
                // Suscribirse a push notifications
                await this.subscribeToPush();
                
                // Mostrar notificación de bienvenida
                this.showWelcomeNotification();
            } else {
                console.log('❌ Notification permission denied');
                this.trackEvent('notifications_denied');
            }
        } catch (error) {
            console.error('❌ Notification permission error:', error);
        }
    }
    
    // Suscribirse a notificaciones push
    async subscribeToPush() {
        if (!this.swRegistration) return;
        
        try {
            const subscription = await this.swRegistration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: this.urlBase64ToUint8Array('YOUR_VAPID_PUBLIC_KEY') // Reemplazar con tu clave VAPID
            });
            
            console.log('📬 Push subscription successful');
            
            // Enviar suscripción al servidor
            // await this.sendSubscriptionToServer(subscription);
            
        } catch (error) {
            console.error('❌ Push subscription failed:', error);
        }
    }
    
    // Mostrar notificación de bienvenida
    showWelcomeNotification() {
        if (Notification.permission === 'granted') {
            new Notification('¡Bienvenido a Restaurante Tasty!', {
                body: 'Recibirás notificaciones sobre promociones especiales y eventos.',
                icon: 'images/icons/icon-192x192.png',
                badge: 'images/icons/icon-144x144.png'
            });
        }
    }
    
    // Verificar actualizaciones
    checkForUpdates() {
        if (this.swRegistration) {
            this.swRegistration.update();
        }
    }
    
    // Manejar actualizaciones del Service Worker
    handleServiceWorkerUpdate() {
        const newWorker = this.swRegistration.installing;
        
        newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                this.showUpdateAvailable();
            }
        });
    }
    
    // Mostrar notificación de actualización disponible
    showUpdateAvailable() {
        const updateBanner = document.createElement('div');
        updateBanner.innerHTML = `
            <div style="
                position: fixed;
                bottom: 20px;
                left: 20px;
                right: 20px;
                background: #007bff;
                color: white;
                padding: 15px 20px;
                border-radius: 10px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.3);
                z-index: 10003;
                display: flex;
                align-items: center;
                justify-content: space-between;
            ">
                <div>
                    <strong>🔄 Actualización disponible</strong><br>
                    <small>Nueva versión de la app lista para instalar</small>
                </div>
                <button onclick="pwaManager.applyUpdate()" style="
                    background: white;
                    color: #007bff;
                    border: none;
                    padding: 8px 16px;
                    border-radius: 5px;
                    font-weight: 600;
                    cursor: pointer;
                ">
                    Actualizar
                </button>
            </div>
        `;
        
        document.body.appendChild(updateBanner);
    }
    
    // Aplicar actualización
    applyUpdate() {
        if (this.swRegistration && this.swRegistration.waiting) {
            this.swRegistration.waiting.postMessage({ type: 'SKIP_WAITING' });
            window.location.reload();
        }
    }
    
    // Verificar si debe mostrar banner de instalación
    checkInstallBanner() {
        console.log('🔍 Checking if should show install banner...');

        // No mostrar si ya está instalado o es iOS Safari
        if (this.isInstalled || this.isIOSSafari()) {
            console.log('❌ Banner not shown: App already installed or iOS Safari');
            return;
        }

        // Solo mostrar en dispositivos móviles
        if (!this.isMobileDevice()) {
            console.log('❌ Banner not shown: Not a mobile device');
            return;
        }

        // No mostrar si ya fue cerrado en esta sesión
        const wasDismissed = sessionStorage.getItem('pwa-banner-dismissed');
        if (wasDismissed) {
            console.log('❌ Banner not shown: Already dismissed in this session');
            return;
        }

        // Verificar si no se ha mostrado hoy
        const today = new Date().toDateString();
        const lastShown = localStorage.getItem('pwa-banner-last-shown');

        if (lastShown === today) {
            console.log('❌ Banner not shown: Already shown today');
            return;
        }

        // Si tenemos el deferredPrompt, mostrar inmediatamente
        if (this.deferredPrompt) {
            console.log('✅ Showing install banner for mobile device');
            setTimeout(() => {
                if (!sessionStorage.getItem('pwa-banner-dismissed')) {
                    this.showInstallBanner();
                    localStorage.setItem('pwa-banner-last-shown', today);
                }
            }, 3000); // Reducido a 3 segundos
        }
    }
    
    // Detectar iOS Safari
    isIOSSafari() {
        const ua = window.navigator.userAgent;
        const iOS = !!ua.match(/iPad|iPhone|iPod/);
        const webkit = !!ua.match(/WebKit/);
        return iOS && webkit && !ua.match(/CriOS/);
    }

    // Verificar si es un dispositivo móvil
    isMobileDevice() {
        // Verificar por user agent (más estricto)
        const mobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        // Verificar por tamaño de pantalla (debe ser consistente)
        const mobileScreen = window.innerWidth <= 768 && window.outerWidth <= 768 && screen.width <= 768;

        // Verificar si tiene capacidades táctiles reales (no mouse)
        const touchDevice = ('ontouchstart' in window || navigator.maxTouchPoints > 0) &&
                           !window.matchMedia('(pointer: fine)').matches;

        // Verificar que no sea desktop (resolución muy alta indica desktop)
        const notDesktop = screen.width <= 1024 && screen.height <= 1366;

        // Verificar orientación (móviles suelen tener portrait por defecto)
        const mobileOrientation = window.innerHeight > window.innerWidth ||
                                 Math.abs(window.orientation) === 90;

        // Es móvil solo si cumple TODAS las condiciones críticas
        const realMobile = mobileUA && mobileScreen && notDesktop && (touchDevice || mobileOrientation);

        // Log para debugging
        console.log('📱 Mobile Detection:', {
            userAgent: mobileUA,
            screenSize: mobileScreen,
            touch: touchDevice,
            notDesktop: notDesktop,
            orientation: mobileOrientation,
            realMobile: realMobile,
            innerWidth: window.innerWidth,
            outerWidth: window.outerWidth,
            screenWidth: screen.width,
            screenHeight: screen.height
        });

        return realMobile;
    }
    
    // Convertir VAPID key
    urlBase64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/-/g, '+')
            .replace(/_/g, '/');
        
        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);
        
        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }
    
    // Tracking de eventos
    trackEvent(eventName, data = {}) {
        console.log(`📊 PWA Event: ${eventName}`, data);
        
        // Integrar con Google Analytics si está disponible
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, {
                event_category: 'pwa',
                ...data
            });
        }
    }
}

// Inicializar PWA Manager
let pwaManager;

document.addEventListener('DOMContentLoaded', () => {
    pwaManager = new PWAManager();
});

// Exportar para uso global
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PWAManager;
} else {
    window.PWAManager = PWAManager;
}
