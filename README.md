# LOS HÉROES DEL CÓDIGO

Landing estática en HTML5, CSS3 y JavaScript ES6+. Sin dependencias, backend, servidor Node.js ni compilación. Abrir `index.html` en un navegador para verla.

## Publicación en Vercel

Importar esta carpeta o su repositorio. Seleccionar el preset **Other**, sin comando de instalación ni de compilación, y usar la raíz del proyecto como directorio de salida. No se necesitan variables de entorno ni rutas de aplicación.

Antes de publicar con dominio definitivo, agregar `og:url`, un enlace `canonical` y convertir `og:image` en una URL absoluta al archivo `assets/og-cover.jpg`.

## Contacto

El formulario está deshabilitado porque no se proporcionó un destinatario confirmado. No hace solicitudes ni almacena datos.

Para habilitar la alternativa de correo, colocar una dirección real verificada en `data-contact-email=""` del formulario en `index.html`. JavaScript habilita los campos, explica el uso de la aplicación de correo y valida nombre, email y mensaje con errores asociados y foco al primer campo inválido. El botón prepara un `mailto:`; el visitante envía el correo desde su aplicación. No se muestra ninguna confirmación de envío.

Para conectar otro proveedor de recepción se debe adaptar explícitamente el formulario y sus avisos. No agregar claves privadas al código del navegador.

## Diseño y recursos

Paleta azul noche, oro envejecido y acentos violetas, con ilustración original inspirada en las referencias medievales aportadas. Los nombres y roles toman como referencia las imágenes y deben revisarse con el equipo antes de publicar. No se incluyen clientes, métricas, certificaciones o testimonios inventados.

La ilustración se sirve localmente en WebP con dos tamaños. La imagen principal tiene prioridad alta; la secundaria usa carga diferida. El favicon es SVG. Consultar `assets/ART-DIRECTION.md` para el prompt del recurso generado.

## Accesibilidad e interacciones

Menú móvil con estado expandido, cierre con Escape, fuera del header, al salir con teclado y al navegar. Enlaces internos con foco en el destino. Enlace para saltar al contenido. Animaciones progresivas con IntersectionObserver y contenido visible sin JavaScript. `prefers-reduced-motion` desactiva movimiento y scroll animado. Sin cookies, analítica, almacenamiento local ni fuentes externas.

## Selección de héroes — iteración 2

Se conserva la landing y se sustituye la grilla de roles por un selector de ocho personajes. El arreglo `heroes` al comienzo de `js/main.js` centraliza nombres, títulos, especialidades, descripciones, aportes y retratos. Los aportes son descripciones del rol narrativo; no se agregan CVs, certificaciones ni tecnologías atribuidas al equipo.

La Cabra está seleccionada inicialmente. Cada botón tiene `aria-pressed` y controla la ficha común. Las flechas recorren los retratos (dos columnas en desktop, secuencia horizontal en móvil), Inicio/Fin saltan al primer/último personaje, y Enter/Espacio confirman. La selección se anuncia mediante una región de estado. El foco permanece en el selector y el recorrido con Tab continúa hacia los controles siguientes. Sin JavaScript se muestra una lista textual de los ocho roles.

La presentación del Hechicero Supremo se activa con IntersectionObserver al alcanzar su área visual. Combina resplandor violeta, círculo SVG giratorio, seis partículas CSS junto al báculo y aumento de opacidad de la ilustración. El título y el nombre permanecen visibles. Cambiar a otro héroe y volver a La Cabra dispara una nueva presentación; pulsar el retrato que ya está seleccionado no la reinicia. La animación ambiental usa transforms y opacity, se pausa fuera de pantalla y con la pestaña oculta, y dispone de un botón «Pausar animación». El modo de movimiento reducido muestra la ficha completa de forma estática.

No se incorporaron imágenes nuevas ni retratos genéricos. Los siete personajes presentes en la ilustración local se muestran mediante encuadres CSS de ese mismo WebP, reutilizado desde caché. Seba tiene un emblema provisional explícito. Los recursos individuales originales están pendientes; ver `assets/HERO-PORTRAITS.md`.

Validación realizada en Chrome headless con anchos de 360, 390, 768, 1024 y 1440 px: sin desbordamiento horizontal del documento; selección de los ocho personajes; una sola selección semántica activa; navegación con flechas, Enter, Espacio y Fin; desplazamiento horizontal del selector móvil; animación inicial; pausa manual y fuera de pantalla; modo de movimiento reducido; imágenes disponibles y anclas válidas. Sin excepciones JavaScript durante esas pruebas. Se revisaron capturas de escritorio y móvil. Esto no reemplaza una auditoría completa con lectores de pantalla ni una medición de Core Web Vitals en producción.

## Sistema audiovisual — iteración 3

El selector admite videos locales WebM y MP4 por personaje, con poster y pose final WebP. La configuración está centralizada en `heroMedia`, en `js/main.js`. Todas las fuentes están vacías porque todavía no existen archivos de cinemáticas reales; no se generan rutas ni peticiones a archivos pendientes.

Se reutiliza un reproductor silenciado e inline, con carga bajo demanda, pausa por visibilidad, protección contra respuestas tardías al cambiar de personaje y retorno a la ilustración si falla la reproducción. Repetir, omitir y pausar son controles accesibles. El nombre, las especialidades y la información comercial permanecen visibles durante la presentación. Con movimiento reducido se usa la imagen estática sin descargar videos.

Las instrucciones de recursos, nombres de archivo, configuración y secuencia de ocho segundos de La Cabra están en [assets/heroes/README.md](assets/heroes/README.md). La integración mantiene la landing estática y sin compilación ni dependencias. Los efectos CSS actuales funcionan como alternativa ilustrada; no se presentan como animación cinematográfica real.

La infraestructura se verificó en Chrome headless con un clip técnico VP8/WebM de 1,8 segundos, creado temporalmente en memoria y usado en una página de prueba fuera del proyecto. Se probaron carga bajo demanda, reproducción/finalización, imagen final y fotograma estable, fuentes corruptas y alternativa, imágenes inválidas, rechazo de autoplay, rechazo tardío después de omitir, cambios rápidos, pausa/reanudación, omitir durante carga y reproducción y movimiento reducido durante un video activo. El sitio real se verificó sin fuentes de video y con anchos de 360 a 1440 px, sin referencias locales rotas ni excepciones JavaScript. La reproducción de MP4 y las cinemáticas reales en navegadores/dispositivos físicos siguen pendientes hasta disponer de esos archivos.
