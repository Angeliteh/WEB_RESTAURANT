/*
SCRIPT PARA AGREGAR PWA META TAGS A TODAS LAS PÁGINAS
Este script agrega los meta tags PWA necesarios a todas las páginas HTML
*/

const fs = require('fs');
const path = require('path');

// Meta tags PWA que se agregarán a todas las páginas
const PWA_META_TAGS = `
	<!-- PWA Meta Tags -->
	<meta name="theme-color" content="#ea272d">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
	<meta name="apple-mobile-web-app-title" content="Restaurante Tasty">
	<meta name="msapplication-TileColor" content="#ea272d">
	<meta name="msapplication-TileImage" content="/images/icons/icon-144x144.png">
	<meta name="mobile-web-app-capable" content="yes">
	
	<!-- PWA Manifest -->
	<link rel="manifest" href="/manifest.json">
	
	<!-- PWA Icons -->
	<link rel="apple-touch-icon" sizes="72x72" href="/images/icons/icon-72x72.png">
	<link rel="apple-touch-icon" sizes="96x96" href="/images/icons/icon-96x96.png">
	<link rel="apple-touch-icon" sizes="128x128" href="/images/icons/icon-128x128.png">
	<link rel="apple-touch-icon" sizes="144x144" href="/images/icons/icon-144x144.png">
	<link rel="apple-touch-icon" sizes="152x152" href="/images/icons/icon-152x152.png">
	<link rel="apple-touch-icon" sizes="192x192" href="/images/icons/icon-192x192.png">
	<link rel="apple-touch-icon" sizes="384x384" href="/images/icons/icon-384x384.png">
	<link rel="apple-touch-icon" sizes="512x512" href="/images/icons/icon-512x512.png">
	
	<!-- Favicon -->
	<link rel="icon" type="image/png" sizes="32x32" href="/images/icons/favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="16x16" href="/images/icons/favicon-16x16.png">
	<link rel="shortcut icon" href="/images/icons/favicon.ico">`;

// Script PWA Manager que se agregará antes del </body>
const PWA_SCRIPT = `
	<!-- PWA Manager -->
	<script src="js/pwa-manager.js"></script>`;

// Páginas a procesar (excluyendo index.html que ya se procesó)
const pages = [
    'menu.html',
    'gallery.html', 
    'reservation.html',
    'contact.html'
];

// Función para agregar PWA meta tags a una página
function addPWAToPage(filename) {
    try {
        console.log(`Processing ${filename}...`);
        
        // Leer el archivo
        let content = fs.readFileSync(filename, 'utf8');
        
        // Buscar donde insertar los meta tags PWA
        // Los insertaremos después del último <link> o <meta> tag existente
        const headEndIndex = content.indexOf('</head>');
        if (headEndIndex === -1) {
            console.error(`No </head> tag found in ${filename}`);
            return false;
        }
        
        // Verificar si ya tiene PWA meta tags
        if (content.includes('PWA Meta Tags')) {
            console.log(`${filename} already has PWA meta tags, skipping...`);
        } else {
            // Insertar PWA meta tags antes de </head>
            content = content.substring(0, headEndIndex) + 
                     PWA_META_TAGS + '\n\n' +
                     content.substring(headEndIndex);
        }
        
        // Buscar donde insertar el PWA script
        const bodyEndIndex = content.lastIndexOf('</body>');
        if (bodyEndIndex === -1) {
            console.error(`No </body> tag found in ${filename}`);
            return false;
        }
        
        // Verificar si ya tiene PWA Manager script
        if (content.includes('pwa-manager.js')) {
            console.log(`${filename} already has PWA Manager script, skipping...`);
        } else {
            // Insertar PWA script antes de </body>
            content = content.substring(0, bodyEndIndex) + 
                     PWA_SCRIPT + '\n\n' +
                     content.substring(bodyEndIndex);
        }
        
        // Escribir el archivo actualizado
        fs.writeFileSync(filename, content, 'utf8');
        console.log(`✅ ${filename} updated successfully`);
        return true;
        
    } catch (error) {
        console.error(`❌ Error processing ${filename}:`, error.message);
        return false;
    }
}

// Procesar todas las páginas
console.log('🚀 Adding PWA support to all pages...\n');

let successCount = 0;
let totalCount = pages.length;

pages.forEach(page => {
    if (addPWAToPage(page)) {
        successCount++;
    }
});

console.log(`\n📊 Results:`);
console.log(`✅ Successfully processed: ${successCount}/${totalCount} pages`);

if (successCount === totalCount) {
    console.log('🎉 All pages now have PWA support!');
    console.log('\n📱 Next steps:');
    console.log('1. Create the required icon files in /images/icons/');
    console.log('2. Test the PWA installation on mobile devices');
    console.log('3. Verify offline functionality');
    console.log('4. Test push notifications (optional)');
} else {
    console.log('⚠️ Some pages could not be processed. Check the errors above.');
}

// Crear lista de iconos necesarios
console.log('\n🖼️ Required icon files:');
const requiredIcons = [
    'icon-72x72.png',
    'icon-96x96.png', 
    'icon-128x128.png',
    'icon-144x144.png',
    'icon-152x152.png',
    'icon-192x192.png',
    'icon-384x384.png',
    'icon-512x512.png',
    'icon-maskable-192x192.png',
    'icon-maskable-512x512.png',
    'favicon-32x32.png',
    'favicon-16x16.png',
    'favicon.ico',
    'shortcut-reservation.png',
    'shortcut-menu.png',
    'shortcut-gallery.png',
    'shortcut-contact.png'
];

requiredIcons.forEach(icon => {
    console.log(`- /images/icons/${icon}`);
});

console.log('\n💡 Tip: You can generate all these icons from a single 512x512 PNG using online tools like:');
console.log('- https://realfavicongenerator.net/');
console.log('- https://www.pwabuilder.com/imageGenerator');
console.log('- https://maskable.app/ (for maskable icons)');

module.exports = { addPWAToPage, PWA_META_TAGS, PWA_SCRIPT };
