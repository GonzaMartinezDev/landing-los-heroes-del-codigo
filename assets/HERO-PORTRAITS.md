# Retratos del consejo: estado de los recursos

La sección usa exclusivamente la ilustración existente `consejo-1600.webp`, generada en la primera iteración a partir de las referencias visuales. Los encuadres CSS muestran a La Cabra, Gonza, Juanma, Alfred, Frida, Dami y Omelis. Estos encuadres son provisionales y pueden incluir parte del escenario o de otros personajes; no son fotografías reales ni retratos individuales originales.

Seba no aparece en esa ilustración local. Se usa la inicial S dentro de un emblema, acompañada en su ficha por «Retrato por incorporar». No se le asignó la cara de otro integrante ni un retrato genérico.

## Pendientes

- Retratos individuales aprobados de los ocho personajes del universo original.
- Ilustración individual de La Cabra, preferentemente con transparencia, que conserve cabra blanca antropomórfica, grandes cuernos curvos, corona dorada, túnica azul y oro, báculo y energía violeta.
- Retrato original de Seba, con prioridad para reemplazar el emblema provisional.

Se recomienda WebP/AVIF y una proporción de 3:4 para las fichas, con un encuadre cuadrado adicional para miniaturas si fuera necesario. Los originales deben guardarse en esta carpeta. No se requiere generar estos recursos para que la selección funcione.

## Reemplazo

Editar `portrait` de cada objeto del arreglo `heroes` en `js/main.js`:

```js
portrait: {
  src: 'assets/retrato-aprobado.webp',
  alt: 'Descripción del personaje que aparece en el retrato.',
  crop: null,
  thumbnail: null
}
```

Con `crop: null` se usa la imagen completa mediante object-fit. Los encuadres actuales usan `[x, y, ancho, alto]`, en píxeles de la ilustración de 1600 × 714; las miniaturas son cuadradas y la ficha usa 3:4. No editar esas coordenadas para un recurso diferente: quitar los encuadres o adaptar primero el cálculo de `applyPortrait` a las dimensiones del nuevo recurso. Todas las imágenes fuera del hero conservan lazy loading. El cambio de héroe no solicita ningún servicio ni almacena datos.
