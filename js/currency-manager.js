/**
 * Currency Manager - Sistema de Conversión de Monedas
 * Restaurante Tasty - Gestión de Precios Dinámicos
 * Última actualización: Diciembre 2024
 */

class CurrencyManager {
    constructor() {
        this.exchangeRates = {
            USD_TO_MXN: 20.15, // Tipo de cambio base (actualizable)
            MXN_TO_USD: 0.0496
        };
        
        this.currencies = {
            USD: {
                symbol: '$',
                code: 'USD',
                name: 'US Dollar',
                decimals: 2,
                format: 'before' // símbolo antes del número
            },
            MXN: {
                symbol: '$',
                code: 'MXN',
                name: 'Peso Mexicano',
                decimals: 2,
                format: 'before'
            }
        };
        
        this.currentLanguage = 'es';
        this.currentCurrency = 'MXN';
        
        this.init();
    }
    
    init() {
        // Detectar idioma actual
        this.currentLanguage = localStorage.getItem('selectedLanguage') || 'es';
        this.currentCurrency = this.currentLanguage === 'es' ? 'MXN' : 'USD';
        
        // Escuchar cambios de idioma
        document.addEventListener('languageChanged', (e) => {
            this.currentLanguage = e.detail.language;
            this.currentCurrency = this.currentLanguage === 'es' ? 'MXN' : 'USD';
            this.updateAllPrices();
        });
        
        // Actualizar tipo de cambio periódicamente (opcional)
        this.updateExchangeRate();
        
        console.log('💱 Currency Manager initialized');
    }
    
    // Actualizar tipo de cambio (simulado - en producción sería una API real)
    async updateExchangeRate() {
        try {
            // Simulación de API de tipo de cambio
            // En producción, usar una API real como fixer.io, exchangerate-api.com, etc.
            const simulatedRate = this.getSimulatedExchangeRate();
            this.exchangeRates.USD_TO_MXN = simulatedRate;
            this.exchangeRates.MXN_TO_USD = 1 / simulatedRate;
            
            console.log(`💱 Exchange rate updated: 1 USD = ${simulatedRate} MXN`);
        } catch (error) {
            console.warn('⚠️ Could not update exchange rate, using default:', error);
        }
    }
    
    // Simular tipo de cambio realista (fluctúa ligeramente)
    getSimulatedExchangeRate() {
        const baseRate = 20.15;
        const variation = (Math.random() - 0.5) * 0.5; // Variación de ±0.25
        return parseFloat((baseRate + variation).toFixed(4));
    }
    
    // Convertir precio de USD a la moneda objetivo
    convertPrice(usdPrice, targetCurrency = null) {
        const currency = targetCurrency || this.currentCurrency;
        const price = parseFloat(usdPrice);
        
        if (currency === 'MXN') {
            return price * this.exchangeRates.USD_TO_MXN;
        }
        
        return price; // USD
    }
    
    // Formatear precio con símbolo de moneda
    formatPrice(price, currency = null, showCurrency = true) {
        const curr = currency || this.currentCurrency;
        const currencyInfo = this.currencies[curr];
        const formattedPrice = parseFloat(price).toFixed(currencyInfo.decimals);
        
        if (showCurrency) {
            return `${currencyInfo.symbol}${formattedPrice} ${curr}`;
        } else {
            return `${currencyInfo.symbol}${formattedPrice}`;
        }
    }
    
    // Formatear precio para mostrar en HTML con superíndice
    formatPriceHTML(price, currency = null, showCurrency = true) {
        const curr = currency || this.currentCurrency;
        const currencyInfo = this.currencies[curr];
        const numPrice = parseFloat(price);
        const integerPart = Math.floor(numPrice);
        const decimalPart = (numPrice % 1).toFixed(2).slice(2);
        
        let formattedHTML = `${currencyInfo.symbol}${integerPart}`;
        
        if (decimalPart !== '00') {
            formattedHTML += `<sup>.${decimalPart}</sup>`;
        }
        
        if (showCurrency) {
            formattedHTML += ` <small style="font-size: 0.8em; opacity: 0.8;">${curr}</small>`;
        }
        
        return formattedHTML;
    }
    
    // Actualizar todos los precios en la página
    updateAllPrices() {
        // Actualizar precios con atributo data-price-usd
        document.querySelectorAll('[data-price-usd]').forEach(element => {
            const usdPrice = parseFloat(element.dataset.priceUsd);
            const convertedPrice = this.convertPrice(usdPrice);
            const formattedHTML = this.formatPriceHTML(convertedPrice, this.currentCurrency, false);
            element.innerHTML = formattedHTML;
        });
        
        // Actualizar precios en tarjetas del menú
        document.querySelectorAll('.menu-card-price').forEach(element => {
            const parentCard = element.closest('.menu-item-card');
            if (parentCard && parentCard.dataset.price) {
                const usdPrice = parseFloat(parentCard.dataset.price);
                const convertedPrice = this.convertPrice(usdPrice);
                const formattedHTML = this.formatPriceHTML(convertedPrice, this.currentCurrency, false);
                element.innerHTML = formattedHTML;
            }
        });
        
        // Actualizar indicador de moneda en el carrito
        this.updateCartCurrency();
        
        // Disparar evento personalizado
        document.dispatchEvent(new CustomEvent('pricesUpdated', {
            detail: {
                currency: this.currentCurrency,
                exchangeRate: this.exchangeRates.USD_TO_MXN
            }
        }));
    }
    
    // Actualizar indicador de moneda en el carrito
    updateCartCurrency() {
        const cartTotal = document.getElementById('cartTotal');
        if (cartTotal && cartTotal.textContent.includes('$')) {
            // Mantener el valor numérico pero actualizar la moneda
            const numericValue = cartTotal.textContent.match(/[\d.]+/);
            if (numericValue) {
                const price = parseFloat(numericValue[0]);
                cartTotal.textContent = this.formatPrice(price, this.currentCurrency);
            }
        }
    }
    
    // Obtener información de la moneda actual
    getCurrentCurrencyInfo() {
        return {
            currency: this.currentCurrency,
            symbol: this.currencies[this.currentCurrency].symbol,
            code: this.currencies[this.currentCurrency].code,
            exchangeRate: this.currentCurrency === 'MXN' ? this.exchangeRates.USD_TO_MXN : 1
        };
    }
    
    // Agregar indicador visual de moneda
    addCurrencyIndicator() {
        // Crear indicador de moneda en la esquina
        const indicator = document.createElement('div');
        indicator.id = 'currency-indicator';
        indicator.style.cssText = `
            position: fixed;
            top: 120px;
            right: 20px;
            background: rgba(234, 39, 45, 0.9);
            color: white;
            padding: 8px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            z-index: 1000;
            backdrop-filter: blur(10px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            transition: all 0.3s ease;
            cursor: pointer;
        `;
        
        this.updateCurrencyIndicator(indicator);
        
        // Agregar tooltip
        indicator.title = this.currentLanguage === 'es' 
            ? `Precios en ${this.currentCurrency}. Tipo de cambio: $1 USD = $${this.exchangeRates.USD_TO_MXN.toFixed(2)} MXN`
            : `Prices in ${this.currentCurrency}. Exchange rate: $1 USD = $${this.exchangeRates.USD_TO_MXN.toFixed(2)} MXN`;
        
        document.body.appendChild(indicator);
        
        // Actualizar indicador cuando cambien los precios
        document.addEventListener('pricesUpdated', () => {
            this.updateCurrencyIndicator(indicator);
        });
    }
    
    // Actualizar el indicador de moneda
    updateCurrencyIndicator(indicator) {
        const currInfo = this.getCurrentCurrencyInfo();
        indicator.innerHTML = `
            <span style="opacity: 0.8;">💱</span> ${currInfo.code}
            ${currInfo.currency === 'MXN' ? 
                `<small style="opacity: 0.7; margin-left: 4px;">($1 USD = $${currInfo.exchangeRate.toFixed(2)})</small>` : 
                ''
            }
        `;
        
        indicator.title = this.currentLanguage === 'es' 
            ? `Precios en ${currInfo.code}. ${currInfo.currency === 'MXN' ? `Tipo de cambio: $1 USD = $${currInfo.exchangeRate.toFixed(2)} MXN` : 'Precios originales en USD'}`
            : `Prices in ${currInfo.code}. ${currInfo.currency === 'MXN' ? `Exchange rate: $1 USD = $${currInfo.exchangeRate.toFixed(2)} MXN` : 'Original prices in USD'}`;
    }
    
    // Método público para obtener precio convertido (para uso en carrito)
    getConvertedPrice(usdPrice) {
        return this.convertPrice(usdPrice);
    }
    
    // Método público para formatear precio (para uso en carrito)
    getFormattedPrice(price, showCurrency = true) {
        return this.formatPrice(price, this.currentCurrency, showCurrency);
    }
}

// Inicializar el gestor de monedas globalmente
window.currencyManager = new CurrencyManager();

// Exportar para uso en otros scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CurrencyManager;
}
