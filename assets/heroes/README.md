# Recursos de invocación — iteración 3

## Estado real

Todavía **no hay cinemáticas reales incorporadas**. Ninguno de los ocho personajes tiene archivos de video, poster o pose final individuales. Las carpetas se prepararon vacías, sin archivos multimedia ficticios.

La landing sigue funcionando con los encuadres de la ilustración del consejo y los efectos CSS existentes. Seba conserva su emblema provisional. No se consultan URLs de archivos pendientes ni se descargan videos al cargar la página.

## Ubicación y nombres

Usar una carpeta por personaje: `cabra`, `gonza`, `juanma`, `alfred`, `frida`, `dami`, `omelis`, `seba`.

```text
assets/heroes/<personaje>/
  invocacion.webm   Video principal
  invocacion.mp4    Alternativa compatible, opcional
  poster.webp      Presentación estática
  final.webp       Pose final estática
```

Los cuatro archivos están pendientes para cada personaje. No basta con copiar archivos: deben registrarse en `heroMedia`, en `js/main.js`, después de verificar que existen y se reproducen. Las carpetas vacías pueden no conservarse al subir un repositorio; crearlas al agregar los recursos.

Ejemplo **para habilitar solo después de incorporar los archivos reales**:

```js
cabra: {
  sources: [
    { src: 'assets/heroes/cabra/invocacion.webm', type: 'video/webm' },
    { src: 'assets/heroes/cabra/invocacion.mp4', type: 'video/mp4' }
  ],
  poster: 'assets/heroes/cabra/poster.webp',
  final: 'assets/heroes/cabra/final.webp'
},
```

Si solo existe WebM, registrar únicamente esa fuente. Si faltan las imágenes, mantener `poster: null` y `final: null`. Con `sources: []` se conserva la presentación ilustrada. No agregar rutas a recursos inexistentes.

## Preparación de los recursos

- Preferir encuadre vertical 3:4, consistente entre video, poster y final; el reproductor usa `object-fit: contain` y no deforma ni recorta el video. Otros formatos se muestran con espacio alrededor.
- La Cabra: aproximadamente ocho segundos. Cabra blanca antropomórfica, cuernos curvos, corona dorada, túnica azul y oro y báculo. Despierta y mira al visitante, levanta el báculo, invoca runas y un círculo arcano, libera energía violeta y dorada y termina en pose heroica. Mantener continuidad de identidad y cámara estable.
- Exportar WebM compatible con los navegadores objetivo, más MP4 H.264 como alternativa cuando corresponda; probar ambos en dispositivos reales. Preferir una exportación sin pista de audio. El sitio siempre fuerza reproducción silenciada e inline.
- Optimizar resolución y bitrate para móvil. No se requiere video 4K. Poster y final deben tener dimensiones y composición consistentes para evitar cambios de encuadre.
- No incrustar nombres, descripciones ni información comercial dentro del video: la ficha HTML permanece visible y accesible durante toda la presentación.

## Comportamiento implementado

Un único elemento `video` se reutiliza. Solo se asigna una fuente al necesitar la presentación del personaje activo y cuando su área visual está en pantalla. El sitio elige las fuentes declaradas compatibles en orden; si una falla, intenta la siguiente y luego vuelve a la ilustración. Las imágenes nuevas se aplican solo después de cargarse; si fallan, se mantiene el recurso disponible.

Cambiar de personaje pausa y libera el video anterior, elimina sus listeners y descarta respuestas tardías. Seleccionar el mismo personaje no reinicia nada. «Repetir invocación» inicia una nueva reproducción o la animación ilustrada. «Omitir presentación» detiene la secuencia; muestra la pose final si existe, o mantiene el último fotograma decodificado/poster. La navegación permanece habilitada.

Al terminar se carga `final.webp` si está registrado. Hasta que esté listo, se conserva el fotograma final del video. Si no hay imagen final, el video queda pausado en su último fotograma. Al cambiar de personaje se libera ese recurso.

No hay autoplay con sonido ni reproducción en bucle. La primera invocación de La Cabra ocurre una sola vez al ver su área de presentación. Una denegación de autoplay se maneja sin excepciones y ofrece reintentar manualmente; volver a entrar en pantalla no reinicia la secuencia.

Mientras corre el video, se ocultan círculo, partículas y destello CSS superpuestos. Con una imagen final se mantiene solo un ambiente tenue, sin duplicar runas. Las animaciones y el video se pausan fuera de pantalla, al ocultar la pestaña o mediante «Pausar animación». Con movimiento reducido se evita cargar el video, se muestra una imagen estática y se deshabilitan repetir/omitir. Si se activa esa preferencia durante la reproducción, se detiene y libera el video inmediatamente.

## Validación antes de publicar una cinemática real

Verificar cada archivo en sus navegadores objetivo: decodificación de WebM/MP4, duración, reproducción silenciada inline, poster, pose final, continuidad y tamaño de descarga. Probar cambios rápidos, misma selección, repetir, omitir, pausa fuera de pantalla, pestaña oculta, movimiento reducido y fallos de red. Confirmar que no haya errores ni archivos 404.

Las pruebas de la infraestructura usan un clip técnico temporal en memoria; ese clip **no es una cinemática de un personaje y no se distribuye**. La verificación artística y audiovisual de las cinemáticas reales queda pendiente hasta incorporarlas.
