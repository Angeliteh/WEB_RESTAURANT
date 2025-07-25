# 🚀 GUÍA COMPLETA: PWA COMPATIBLE CON GITHUB PAGES

## 🎯 **PROBLEMA IDENTIFICADO**

**GitHub Pages** requiere **rutas relativas** en lugar de rutas absolutas para que el PWA funcione correctamente. Las rutas que comienzan con `/` causan errores 404.

---

## ❌ **ERRORES COMUNES EN GITHUB PAGES**

### **🔴 SÍNTOMAS:**
```javascript
❌ Service Worker registration failed (404)
❌ Manifest fetch failed (404)  
❌ Icons not loading (404)
❌ PWA install prompt no aparece
❌ App no funciona offline
```

### **🔍 CAUSA RAÍZ:**
```javascript
❌ INCORRECTO (Rutas absolutas):
href="/manifest.json"
src="/images/icons/icon-192x192.png"
register('/sw.js')

✅ CORRECTO (Rutas relativas):
href="manifest.json"
src="images/icons/icon-192x192.png"
register('./sw.js')
```

---

## 🛠️ **SOLUCIÓN PASO A PASO**

### **📋 CHECKLIST DE ARCHIVOS A CORREGIR:**

#### **1. 📄 MANIFEST.JSON**
```json
❌ ANTES:
{
  "start_url": "/",
  "scope": "/",
  "icons": [
    { "src": "/images/icons/icon-192x192.png" }
  ]
}

✅ DESPUÉS:
{
  "start_url": "./",
  "scope": "./", 
  "icons": [
    { "src": "images/icons/icon-192x192.png" }
  ]
}
```

#### **2. 🏠 ARCHIVOS HTML (index.html, menu.html, etc.)**
```html
❌ ANTES:
<link rel="manifest" href="/manifest.json">
<link rel="icon" href="/images/icons/favicon-32x32.png">
<meta name="msapplication-TileImage" content="/images/icons/icon-144x144.png">

✅ DESPUÉS:
<link rel="manifest" href="manifest.json">
<link rel="icon" href="images/icons/favicon-32x32.png">
<meta name="msapplication-TileImage" content="images/icons/icon-144x144.png">
```

#### **3. ⚙️ SERVICE WORKER (sw.js)**
```javascript
❌ ANTES:
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/main.js',
  '/images/gallery_1.jpeg'
];

✅ DESPUÉS:
const STATIC_ASSETS = [
  './',
  './index.html',
  './css/style.css',
  './js/main.js',
  './images/gallery_1.jpeg'
];
```

#### **4. 📱 PWA-MANAGER.JS**
```javascript
❌ ANTES:
navigator.serviceWorker.register('/sw.js', {
    scope: '/'
});

✅ DESPUÉS:
navigator.serviceWorker.register('./sw.js', {
    scope: './'
});
```

#### **5. 📊 ARCHIVOS DE CONFIGURACIÓN**
```javascript
❌ ANTES:
offlinePages: [
    "/",
    "/index.html",
    "/menu.html"
]

✅ DESPUÉS:
offlinePages: [
    "./",
    "./index.html", 
    "./menu.html"
]
```

---

## 🔧 **SCRIPT AUTOMÁTICO DE CORRECCIÓN**

### **📝 CREAR: fix-github-paths.js**
```javascript
const fs = require('fs');
const path = require('path');

// Archivos a procesar
const filesToFix = [
    'index.html',
    'menu.html', 
    'gallery.html',
    'reservation.html',
    'contact.html',
    'manifest.json',
    'sw.js',
    'js/pwa-manager.js',
    'js/data/site-config.js'
];

// Patrones de reemplazo
const replacements = [
    // HTML files
    { from: 'href="/manifest.json"', to: 'href="manifest.json"' },
    { from: 'href="/images/', to: 'href="images/' },
    { from: 'content="/images/', to: 'content="images/' },
    
    // JavaScript files
    { from: "register('/sw.js'", to: "register('./sw.js'" },
    { from: "scope: '/'", to: "scope: './'" },
    { from: 'src="/images/', to: 'src="images/' },
    { from: 'icon: "/images/', to: 'icon: "images/' },
    
    // JSON files
    { from: '"start_url": "/"', to: '"start_url": "./"' },
    { from: '"scope": "/"', to: '"scope": "./"' },
    { from: '"/images/', to: '"images/' },
    
    // Service Worker
    { from: "  '/'", to: "  './'" },
    { from: "  '/", to: "  './" }
];

function fixFile(filePath) {
    try {
        if (!fs.existsSync(filePath)) {
            console.log(`⚠️ File not found: ${filePath}`);
            return false;
        }
        
        let content = fs.readFileSync(filePath, 'utf8');
        let modified = false;
        
        replacements.forEach(replacement => {
            if (content.includes(replacement.from)) {
                content = content.replaceAll(replacement.from, replacement.to);
                modified = true;
            }
        });
        
        if (modified) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✅ Fixed: ${filePath}`);
            return true;
        } else {
            console.log(`ℹ️ No changes needed: ${filePath}`);
            return false;
        }
        
    } catch (error) {
        console.error(`❌ Error fixing ${filePath}:`, error.message);
        return false;
    }
}

// Ejecutar correcciones
console.log('🔧 Fixing GitHub Pages paths...\n');

let fixedCount = 0;
filesToFix.forEach(file => {
    if (fixFile(file)) {
        fixedCount++;
    }
});

console.log(`\n📊 Results: ${fixedCount} files fixed`);
console.log('🎉 Ready for GitHub Pages!');
```

### **🚀 EJECUTAR:**
```bash
node fix-github-paths.js
```

---

## 🧪 **VERIFICACIÓN Y TESTING**

### **1. 📋 CHECKLIST PRE-DEPLOY:**
```javascript
✅ Manifest.json usa rutas relativas
✅ Todos los HTML usan rutas relativas  
✅ Service Worker usa rutas relativas
✅ PWA Manager usa rutas relativas
✅ Iconos existen en /images/icons/
✅ No hay rutas que empiecen con "/"
```

### **2. 🔍 VERIFICACIÓN MANUAL:**
```bash
# Buscar rutas absolutas problemáticas
grep -r 'href="/' *.html
grep -r 'src="/' *.html  
grep -r '"/images/' *.json
grep -r "'/sw.js" js/
```

### **3. 🧪 TEST EN GITHUB PAGES:**
```javascript
// Crear test-pwa.html para verificar
fetch('manifest.json').then(r => console.log('Manifest:', r.status));
fetch('sw.js').then(r => console.log('SW:', r.status));
fetch('images/icons/icon-192x192.png').then(r => console.log('Icon:', r.status));
```

---

## 📱 **PROCESO DE DEPLOY**

### **🔄 PASOS PARA SUBIR A GITHUB:**
```bash
1. git add .
2. git commit -m "Fix PWA paths for GitHub Pages"
3. git push origin main
4. Esperar 2-5 minutos para deploy
5. Probar en: https://usuario.github.io/repositorio/
```

### **⏰ TIEMPO DE PROPAGACIÓN:**
- **GitHub Pages:** 2-5 minutos
- **DNS/CDN:** Hasta 24 horas
- **Caché navegador:** Limpiar manualmente

---

## 🎯 **RESULTADO ESPERADO**

### **✅ DESPUÉS DE LAS CORRECCIONES:**
```javascript
✅ https://usuario.github.io/repo/manifest.json (200)
✅ https://usuario.github.io/repo/sw.js (200)  
✅ Service Worker se registra correctamente
✅ PWA install prompt aparece en móvil
✅ App funciona offline
✅ Iconos cargan sin errores
✅ Shortcuts funcionan
```

---

## 🚨 **TROUBLESHOOTING**

### **🔧 SI AÚN NO FUNCIONA:**

#### **1. 🧹 Limpiar Caché:**
```javascript
// En DevTools Console:
caches.keys().then(names => {
    names.forEach(name => caches.delete(name));
});
location.reload(true);
```

#### **2. 🔄 Forzar Rebuild:**
```bash
git commit --allow-empty -m "Force GitHub Pages rebuild"
git push
```

#### **3. 📱 Probar en Incógnito:**
- Sin caché previo
- Debe funcionar inmediatamente

#### **4. 🔍 Verificar URLs Directas:**
```
✅ https://usuario.github.io/repo/manifest.json
✅ https://usuario.github.io/repo/sw.js
✅ https://usuario.github.io/repo/images/icons/icon-192x192.png
```

---

## 📋 **TEMPLATE PARA NUEVAS WEBS**

### **🎯 ESTRUCTURA RECOMENDADA:**
```
proyecto/
├── index.html (rutas relativas)
├── manifest.json (rutas relativas)  
├── sw.js (rutas relativas)
├── images/
│   └── icons/ (todos los iconos PWA)
├── css/ (rutas relativas en @font-face)
└── js/
    ├── pwa-manager.js (rutas relativas)
    └── data/
        └── site-config.js (rutas relativas)
```

### **🔧 REGLAS DE ORO:**
1. **NUNCA** usar rutas que empiecen con `/`
2. **SIEMPRE** usar rutas relativas: `./` o directamente `archivo.ext`
3. **VERIFICAR** todos los fetch(), register(), href, src
4. **PROBAR** en GitHub Pages antes de entregar al cliente

---

## 🎉 **CONCLUSIÓN**

Con esta guía puedes convertir **CUALQUIER PWA** para que funcione perfectamente en **GitHub Pages**. 

**¡El secreto está en las rutas relativas!** 🚀✨
