/*
INICIALIZADOR DEL SISTEMA DE DATOS - RESTAURANTE TASTY
Carga y inicializa todo el sistema de datos centralizados
*/

(function() {
    'use strict';
    
    // Configuración de carga
    const LOAD_CONFIG = {
        timeout: 10000, // 10 segundos
        retries: 3,
        retryDelay: 1000, // 1 segundo
        debug: true
    };
    
    // Lista de archivos a cargar en orden
    const DATA_FILES = [
        {
            id: 'site-config',
            src: 'js/data/site-config.js',
            required: true,
            global: 'SiteConfig'
        },
        {
            id: 'business-info',
            src: 'js/data/business-info.js',
            required: true,
            global: 'BusinessInfo'
        },
        {
            id: 'menu-data',
            src: 'js/data/menu-data.js',
            required: true,
            global: 'MenuData'
        },
        {
            id: 'testimonials-data',
            src: 'js/data/testimonials-data.js',
            required: true,
            global: 'TestimonialsData'
        },
        {
            id: 'data-manager',
            src: 'js/managers/data-manager.js',
            required: true,
            global: 'DataManager',
            dependencies: ['site-config', 'business-info', 'menu-data', 'testimonials-data']
        },
        {
            id: 'content-updater',
            src: 'js/managers/content-updater.js',
            required: true,
            global: 'ContentUpdater',
            dependencies: ['data-manager']
        }
    ];
    
    // Estado del sistema
    const systemState = {
        loaded: new Set(),
        failed: new Set(),
        loading: new Set(),
        initialized: false,
        startTime: Date.now()
    };
    
    // Utilidades de logging
    const log = {
        info: (msg, ...args) => {
            if (LOAD_CONFIG.debug) {
                console.log(`🔄 DataSystem: ${msg}`, ...args);
            }
        },
        success: (msg, ...args) => {
            if (LOAD_CONFIG.debug) {
                console.log(`✅ DataSystem: ${msg}`, ...args);
            }
        },
        error: (msg, ...args) => {
            console.error(`❌ DataSystem: ${msg}`, ...args);
        },
        warn: (msg, ...args) => {
            console.warn(`⚠️ DataSystem: ${msg}`, ...args);
        }
    };
    
    // Función principal de inicialización
    async function initializeDataSystem() {
        log.info('Starting data system initialization...');
        
        try {
            // Cargar archivos en orden de dependencias
            await loadDataFiles();
            
            // Verificar que todo esté cargado correctamente
            await verifySystemIntegrity();
            
            // Marcar como inicializado
            systemState.initialized = true;
            
            const loadTime = Date.now() - systemState.startTime;
            log.success(`Data system initialized successfully in ${loadTime}ms`);
            
            // Disparar evento de inicialización completa
            dispatchSystemEvent('dataSystemReady', {
                loadTime,
                loadedFiles: Array.from(systemState.loaded),
                failedFiles: Array.from(systemState.failed)
            });
            
            // Configurar debugging si está habilitado
            if (window.SiteConfig && window.SiteConfig.isDevelopment()) {
                setupDevelopmentTools();
            }
            
        } catch (error) {
            log.error('Failed to initialize data system:', error);
            dispatchSystemEvent('dataSystemError', { error: error.message });
            throw error;
        }
    }
    
    // Cargar archivos de datos
    async function loadDataFiles() {
        const loadPromises = DATA_FILES.map(file => loadFileWithDependencies(file));
        await Promise.all(loadPromises);
    }
    
    // Cargar archivo con manejo de dependencias
    async function loadFileWithDependencies(file) {
        // Verificar dependencias
        if (file.dependencies) {
            for (const dep of file.dependencies) {
                if (!systemState.loaded.has(dep)) {
                    const depFile = DATA_FILES.find(f => f.id === dep);
                    if (depFile) {
                        await loadFileWithDependencies(depFile);
                    }
                }
            }
        }
        
        // Cargar el archivo si no está ya cargado
        if (!systemState.loaded.has(file.id) && !systemState.loading.has(file.id)) {
            await loadSingleFile(file);
        }
    }
    
    // Cargar un archivo individual
    function loadSingleFile(file) {
        return new Promise((resolve, reject) => {
            if (systemState.loaded.has(file.id)) {
                resolve();
                return;
            }
            
            systemState.loading.add(file.id);
            log.info(`Loading ${file.id}...`);
            
            const script = document.createElement('script');
            script.src = file.src;
            script.async = false; // Mantener orden de ejecución
            
            let attempts = 0;
            
            const attemptLoad = () => {
                attempts++;
                
                script.onload = () => {
                    // Verificar que el objeto global esté disponible
                    if (file.global && !window[file.global]) {
                        if (attempts < LOAD_CONFIG.retries) {
                            log.warn(`Global ${file.global} not found, retrying... (${attempts}/${LOAD_CONFIG.retries})`);
                            setTimeout(attemptLoad, LOAD_CONFIG.retryDelay);
                            return;
                        } else {
                            const error = new Error(`Global object ${file.global} not found after loading ${file.src}`);
                            handleLoadError(file, error, reject);
                            return;
                        }
                    }
                    
                    systemState.loading.delete(file.id);
                    systemState.loaded.add(file.id);
                    log.success(`Loaded ${file.id}`);
                    resolve();
                };
                
                script.onerror = (error) => {
                    if (attempts < LOAD_CONFIG.retries) {
                        log.warn(`Failed to load ${file.id}, retrying... (${attempts}/${LOAD_CONFIG.retries})`);
                        setTimeout(attemptLoad, LOAD_CONFIG.retryDelay);
                    } else {
                        handleLoadError(file, error, reject);
                    }
                };
                
                // Timeout para evitar cuelgues
                setTimeout(() => {
                    if (systemState.loading.has(file.id)) {
                        const error = new Error(`Timeout loading ${file.src}`);
                        handleLoadError(file, error, reject);
                    }
                }, LOAD_CONFIG.timeout);
            };
            
            document.head.appendChild(script);
            attemptLoad();
        });
    }
    
    // Manejar errores de carga
    function handleLoadError(file, error, reject) {
        systemState.loading.delete(file.id);
        systemState.failed.add(file.id);
        log.error(`Failed to load ${file.id}:`, error);
        
        if (file.required) {
            reject(new Error(`Required file ${file.id} failed to load: ${error.message}`));
        } else {
            log.warn(`Optional file ${file.id} failed to load, continuing...`);
            // No rechazar la promesa para archivos opcionales
        }
    }
    
    // Verificar integridad del sistema
    async function verifySystemIntegrity() {
        log.info('Verifying system integrity...');
        
        const requiredFiles = DATA_FILES.filter(f => f.required);
        const missingFiles = requiredFiles.filter(f => !systemState.loaded.has(f.id));
        
        if (missingFiles.length > 0) {
            throw new Error(`Missing required files: ${missingFiles.map(f => f.id).join(', ')}`);
        }
        
        // Verificar que DataManager esté funcionando
        if (window.DataManager) {
            const validation = window.DataManager.validateData();
            if (!validation.isValid) {
                log.warn('Data validation issues found:', validation.errors);
            }
        }
        
        log.success('System integrity verified');
    }
    
    // Disparar eventos del sistema
    function dispatchSystemEvent(eventName, detail = {}) {
        const event = new CustomEvent(eventName, {
            detail: {
                timestamp: Date.now(),
                systemState: { ...systemState },
                ...detail
            }
        });
        
        document.dispatchEvent(event);
        log.info(`Event dispatched: ${eventName}`);
    }
    
    // Configurar herramientas de desarrollo
    function setupDevelopmentTools() {
        // Agregar métodos de debugging al objeto global
        window.DataSystemDebug = {
            state: systemState,
            reload: initializeDataSystem,
            verify: verifySystemIntegrity,
            info: () => {
                console.group('🔍 Data System Debug Info');
                console.log('State:', systemState);
                console.log('Load Time:', Date.now() - systemState.startTime, 'ms');
                console.log('Loaded Files:', Array.from(systemState.loaded));
                console.log('Failed Files:', Array.from(systemState.failed));
                
                if (window.DataManager) {
                    console.log('DataManager Stats:', window.DataManager.getGeneralStats());
                }
                
                console.groupEnd();
            }
        };
        
        log.info('Development tools available at window.DataSystemDebug');
    }
    
    // Función de limpieza
    function cleanup() {
        // Limpiar event listeners y recursos si es necesario
        log.info('Cleaning up data system...');
    }
    
    // Manejar errores globales
    window.addEventListener('error', (event) => {
        if (event.filename && event.filename.includes('js/data/') || event.filename.includes('js/managers/')) {
            log.error('Global error in data system:', event.error);
        }
    });
    
    // Manejar visibilidad de la página
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            // Página oculta - pausar actualizaciones si es necesario
        } else {
            // Página visible - reanudar actualizaciones
            if (window.DataManager && systemState.initialized) {
                window.DataManager.cleanExpiredCache();
            }
        }
    });
    
    // Inicializar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeDataSystem);
    } else {
        // DOM ya está listo
        initializeDataSystem();
    }
    
    // Limpiar al descargar la página
    window.addEventListener('beforeunload', cleanup);
    
    // Exportar funciones útiles
    window.DataSystemInit = {
        initialize: initializeDataSystem,
        getState: () => ({ ...systemState }),
        isReady: () => systemState.initialized
    };
    
})();
