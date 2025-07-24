/*
SCRIPT AUTOMATIZADO PARA APLICAR MULTIIDIOMA
Aplica el sistema multiidioma a todas las páginas HTML
*/

const fs = require('fs');
const path = require('path');

// Lista de archivos HTML a procesar
const htmlFiles = [
    'gallery.html',
    'reservation.html', 
    'about.html',
    'contact.html'
];

// Navegación con traducciones
const navWithTranslations = `						<div class="col-xs-12 text-center menu-1 menu-wrap">
							<ul>
								<li><a href="index.html" data-translate="nav.home">Home</a></li>
								<li><a href="menu.html" data-translate="nav.menu">Menu</a></li>
								<li class="has-dropdown">
									<a href="gallery.html" data-translate="nav.gallery">Gallery</a>
									<ul class="dropdown">
										<li><a href="#" data-translate="nav.events">Events</a></li>
										<li><a href="#" data-translate="nav.food">Food</a></li>
										<li><a href="#" data-translate="nav.coffees">Coffees</a></li>
									</ul>
								</li>
								<li><a href="reservation.html" data-translate="nav.reservation">Reservation</a></li>
								<li><a href="about.html" data-translate="nav.about">About</a></li>
								<li><a href="contact.html" data-translate="nav.contact">Contact</a></li>
							</ul>
						</div>`;

// Scripts multiidioma
const multiLangScripts = `	
	<!-- Sistema Multiidioma -->
	<script src="js/translations.js"></script>
	<script src="js/language-manager.js"></script>

	</body>`;

// Función para actualizar cada archivo
function updateHtmlFile(filename) {
    const filePath = path.join(__dirname, filename);
    
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // 1. Actualizar navegación
        const navRegex = /(<div class="col-xs-12 text-center menu-1 menu-wrap">[\s\S]*?<\/div>)/;
        if (navRegex.test(content)) {
            content = content.replace(navRegex, navWithTranslations);
            console.log(`✅ Navegación actualizada en ${filename}`);
        }
        
        // 2. Agregar scripts multiidioma
        const scriptsRegex = /(\s*<!-- Main -->\s*<script src="js\/main\.js"><\/script>\s*<\/body>)/;
        if (scriptsRegex.test(content)) {
            content = content.replace(scriptsRegex, `	<!-- Main -->
	<script src="js/main.js"></script>${multiLangScripts}`);
            console.log(`✅ Scripts multiidioma agregados en ${filename}`);
        }
        
        // 3. Actualizar clase active según la página
        const activeClass = getActiveClass(filename);
        if (activeClass) {
            content = updateActiveClass(content, activeClass);
            console.log(`✅ Clase active actualizada en ${filename}`);
        }
        
        // Guardar archivo actualizado
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`🎉 ${filename} actualizado exitosamente\n`);
        
    } catch (error) {
        console.error(`❌ Error procesando ${filename}:`, error.message);
    }
}

// Función para determinar qué elemento debe tener clase active
function getActiveClass(filename) {
    const activeMap = {
        'gallery.html': 'gallery',
        'reservation.html': 'reservation', 
        'about.html': 'about',
        'contact.html': 'contact'
    };
    return activeMap[filename];
}

// Función para actualizar la clase active
function updateActiveClass(content, activePage) {
    // Remover todas las clases active existentes
    content = content.replace(/class="active"/g, '');
    
    // Agregar clase active al elemento correcto
    const activePatterns = {
        'gallery': /<li><a href="gallery\.html"/,
        'reservation': /<li><a href="reservation\.html"/,
        'about': /<li><a href="about\.html"/,
        'contact': /<li><a href="contact\.html"/
    };
    
    if (activePatterns[activePage]) {
        content = content.replace(activePatterns[activePage], `<li class="active"><a href="${activePage}.html"`);
    }
    
    return content;
}

// Ejecutar para todos los archivos
console.log('🚀 Iniciando aplicación de sistema multiidioma...\n');

htmlFiles.forEach(filename => {
    console.log(`📄 Procesando ${filename}...`);
    updateHtmlFile(filename);
});

console.log('✅ ¡Proceso completado! Todas las páginas ahora tienen sistema multiidioma.');
console.log('\n📋 Próximos pasos:');
console.log('1. Revisar cada página en el navegador');
console.log('2. Probar el cambio de idioma en cada una');
console.log('3. Agregar contenido específico con data-translate');
