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
        
        // Mostrar banner de instalación si es apropiado
        this.checkInstallBanner();
        
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
            
            // Mostrar nuestro banner personalizado
            this.showInstallBanner();
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
                right: 20px;
                background: rgba(0, 0, 0, 0.95);
                color: white;
                border-radius: 15px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
                z-index: 10000;
                backdrop-filter: blur(10px);
                border: 2px solid rgba(234, 39, 45, 0.3);
                animation: slideUp 0.5s ease;
            }
            
            .pwa-banner-content {
                display: flex;
                align-items: center;
                padding: 15px 20px;
                gap: 15px;
            }
            
            .pwa-banner-icon img {
                width: 50px;
                height: 50px;
                border-radius: 10px;
            }
            
            .pwa-banner-text {
                flex: 1;
            }
            
            .pwa-banner-text h4 {
                margin: 0 0 5px 0;
                font-size: 16px;
                font-weight: 600;
            }
            
            .pwa-banner-text p {
                margin: 0;
                font-size: 13px;
                opacity: 0.8;
            }
            
            .pwa-banner-actions {
                display: flex;
                gap: 10px;
                align-items: center;
            }
            
            .pwa-install-btn {
                background: #ea272d;
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 25px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .pwa-install-btn:hover {
                background: #c21e24;
                transform: translateY(-2px);
            }
            
            .pwa-close-btn {
                background: transparent;
                color: white;
                border: none;
                font-size: 24px;
                cursor: pointer;
                opacity: 0.7;
                transition: opacity 0.3s ease;
            }
            
            .pwa-close-btn:hover {
                opacity: 1;
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
                    right: 10px;
                    bottom: 10px;
                }
                
                .pwa-banner-content {
                    padding: 12px 15px;
                    gap: 12px;
                }
                
                .pwa-banner-icon img {
                    width: 40px;
                    height: 40px;
                }
                
                .pwa-banner-text h4 {
                    font-size: 14px;
                }
                
                .pwa-banner-text p {
                    font-size: 12px;
                }
                
                .pwa-install-btn {
                    padding: 8px 16px;
                    font-size: 14px;
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
        // No mostrar si ya está instalado o es iOS Safari
        if (this.isInstalled || this.isIOSSafari()) {
            return;
        }
        
        // Mostrar después de 5 segundos si no se ha mostrado antes
        const hasSeenBanner = localStorage.getItem('pwa-banner-seen');
        if (!hasSeenBanner) {
            setTimeout(() => {
                if (this.deferredPrompt) {
                    this.showInstallBanner();
                    localStorage.setItem('pwa-banner-seen', 'true');
                }
            }, 5000);
        }
    }
    
    // Detectar iOS Safari
    isIOSSafari() {
        const ua = window.navigator.userAgent;
        const iOS = !!ua.match(/iPad|iPhone|iPod/);
        const webkit = !!ua.match(/WebKit/);
        return iOS && webkit && !ua.match(/CriOS/);
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
