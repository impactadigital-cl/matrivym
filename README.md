
# Parte Matrimonio Premium - Mauricio & Valentina

Landing page premium lista para VS Code. Enfoque elegante, acuarela, terracota, beige, musgo.

## Estructura
```
parte_matrimonio_premium/
├── index.html
├── css/style.css
├── js/main.js
├── assets/
│   ├── img/ (4 ilustraciones acuarela generadas)
│   │   ├── vintage_fountain_birds.webp - pileta con pajaritos (SOBRE1 + separador)
│   │   ├── watercolor_couple_gala.webp - dresscode / pareja
│   │   ├── wedding_envelopes_flatlay.webp - sobres regalo
│   │   └── atacama_desert_ceremony.webp - lugar San Pablo
│   └── audio/ (agrega aquí tus mp3)
│       ├── is-this-love-classical.mp3
│       └── tan-enamorados-piano.mp3
```

## Cómo usar en VS Code
1. Abre la carpeta `parte_matrimonio_premium` en VS Code
2. Instala Live Server extension y haz click en "Go Live"
3. Edita textos directamente en index.html
4. Paleta editable en css/style.css :root
5. Reemplaza links de pago en js/main.js (sección gifts)

## Features premium implementadas
- Sobre animado SOBRE1 con sello dorado (bloquea scroll hasta abrir)
- Hero con animación pileta + pajaritos volando (CSS + acuarela)
- Botones transparentes con brillo sutil (glass + shimmer)
- Reproductor minimalista flotante con 2 tracks: Is This Love / Tan Enamorados
- Cuenta regresiva elegante hasta 17 Oct 2026 19:00 CL
- Botón Add to Google Calendar + Apple Calendar .ics
- Timeline itinerario con animación reveal
- Dress code acuarela + bloque "sin niños" elegante
- 3 sobres regalo: celeste $60k, rosa $100k, blanco $50k con botón pago
- Formulario RSVP con límite 30 sept, mensaje + upload foto/video, envía a impactadigital.cl@gmail.com
- Scroll reveal, float animations, blur glass

## Para conectar formulario real
Actualmente el formulario RSVP envía los datos por **Formspree** al endpoint `https://formspree.io/f/mkjwkppg`.
No tiene otras salidas de correo configuradas.

## Audio
Agrega tus mp3 en assets/audio/ y el player los reproducirá en loop. Por copyright no incluí los tracks originales.

## Tipografía
Allura (nombres manuscrita elegante) + Cormorant Garamond + Montserrat

Diseñado por ImpactaDigital - enfoque premium.
