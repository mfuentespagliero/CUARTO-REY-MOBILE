# Cuarto Rey 🃏👑

**Un mazo, muchas reglas, cero escapatoria.**

## Descripción

Cuarto Rey es un juego de cartas web pensado para jugar entre amigos en el teléfono. Aparece un mazo de cartas boca abajo en el centro de la pantalla. El usuario toca el mazo y se revela una carta aleatoria de una baraja inglesa. Cada carta activa una regla, reto o minijuego social.

La app está completamente funcional sin necesidad de:
- ❌ Backend
- ❌ Login
- ❌ Base de datos
- ❌ Conexión a internet

## Características

✨ **Interfaz**: Estética voxel/isométrica inspirada en Crossy Road
🎮 **Gameplay**: 52 cartas + 2 comodines con reglas únicas
📱 **Mobile-First**: Diseño totalmente responsive para teléfono
🎨 **Animaciones**: Efectos visuales juguerones y arcade
🔄 **Dos Modos**: Suave (retos amigables) y Carrete (más atrevido)
📋 **Pantalla de Reglas**: Visualiza todas las reglas antes de jugar
👑 **Cuarto de Rey**: Los reyes tienen mechanic especial con 3 preguntas

## Contenido de Reglas

### Cartas A-10
Cada valor tiene reglas diferentes según el color:
- **Rojas** (♥️ ♦️): Generalmente penalizaciones para otros
- **Negras** (♠️ ♣️): Generalmente retos colectivos

### Figuras (J, Q, K)
- **J (Jota)**: Juegos de atención y ritmo
- **Q (Reina)**: Dinámicas personales
- **K (Rey)**: **Cuarto de Rey** - responde 3 preguntas aleatorias

### Comodín 🃏
¡Todos los jugadores reciben penalización o reto grupal!

## Cómo Jugar

1. **Abre** `index.html` en tu navegador (o servidor local)
2. **Elige modo**: Suave o Carrete
3. **Presiona** "Empezar"
4. **Toca el mazo** para revelar una carta
5. **Lee la regla** y **cumple el reto**
6. **Presiona** "Siguiente carta" para continuar
7. **Cuando se acaben** las cartas, ¡ganaste!

## Archivo Técnico

### HTML (`index.html`)
Estructura de 4 pantallas:
1. Pantalla de Inicio (selector de modo)
2. Pantalla de Juego (mazo + regla)
3. Pantalla de Reglas (lista completa)
4. Pantalla Final (juego terminado)

### CSS (`css/styles.css`)
- Variables de color personalizables
- Animaciones voxel/isométricas
- Grid responsive
- Estilos mobile-first
- Efectos visuales arcade

### JavaScript (`js/app.js`)
- **createDeck()**: Genera el mazo completo
- **shuffleArray()**: Mezcla las cartas
- **getRuleForCard()**: Obtiene regla según carta
- **generateKingQuestions()**: Crea preguntas del Rey
- Gestión de pantallas y eventos
- Sin librerías externas ✅

## Personalización

### Cambiar Colores
Edita las variables en `css/styles.css` (línea 10-25)

### Editar Reglas
Modifica `rulesDatabase` en `js/app.js` (línea ~70-350)

### Agregar/Quitar Comodines
Edita `createDeck()` en `js/app.js` (línea ~436)

### Cambiar Textos de Modo
Busca `title: { suave: '...', carrete: '...' }` en las reglas

## Paleta de Colores

- 🌙 Fondo oscuro: `#1a0f3f`
- 🔵 Plataforma: `#00d4ff` (cian)
- 💛 Botones primarios: `#ffd500` (oro)
- ❤️ Cartas rojas: `#ff4757` (rojo coral)
- 🖤 Cartas negras: `#2f3542` (gris oscuro)
- 🟠 Acentos: `#ffa502` (naranja)
- 🟣 Comodín: `#c93ff7` (púrpura)

## Animaciones Incluidas

- 🎯 Entrada con bounce
- 🎴 Flip de cartas suave
- ✨ Brillo para reyes
- 🌀 Shake para comodines
- 💫 Twinkle de estrellas
- 🎲 Rotación de dados
- 🎪 Float de corona

## Responsividad

- ✅ Desktop (1920px+)
- ✅ Tablet (768px-1024px)
- ✅ Mobile (320px-480px)
- ✅ Orientación vertical optimizada

## Compatibilidad

- ✅ Chrome
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Navegadores móviles

## Desarrollo Local

### Opción 1: Abrir directamente
Simplemente abre `index.html` en tu navegador

### Opción 2: Servidor local (Python)
```bash
cd cuarto-rey-mobile
python -m http.server 8000
# Abre http://localhost:8000
```

### Opción 3: Servidor local (Node.js)
```bash
npx http-server
```

## En Celular

1. Conecta tu PC y celular a la **misma red WiFi**
2. Encuentra la **IP local** de tu PC (ej: `192.168.1.100`)
3. En el celular abre: `http://192.168.1.100:8000`
4. ¡A jugar!

## Tips de Edición

### Agregar nueva regla
1. Abre `js/app.js`
2. Busca `rulesDatabase`
3. Agrega una nueva entrada siguiendo el patrón:
```javascript
customCard: {
    red: {
        title: { suave: '...', carrete: '...' },
        description: { suave: '...', carrete: '...' },
        type: 'Tipo'
    },
    black: { /* ... */ }
}
```

### Cambiar cantidad de comodines
1. Abre `js/app.js`
2. Busca la función `createDeck()`
3. Modifica las líneas de `deck.push({ value: 'Joker', ... })`

### Agregar sonidos (futuro)
Edita el HTML para incluir tags `<audio>` y llama desde JavaScript

## Estructura de Datos

### Objeto Carta
```javascript
{
    value: 'A',      // Valor: A, 2-10, J, Q, K, Joker
    suit: '♥️',      // Pinta: ♥️ ♦️ ♠️ ♣️ 🃏
    color: 'red'     // Color: red, black, multicolor
}
```

### Objeto Regla
```javascript
{
    title: string,           // Nombre de la regla
    description: string,     // Descripción
    type: string,            // Tipo: Penalización, Grupal, Físico, etc.
    isKing: boolean,         // Si es un Rey
    isJoker: boolean         // Si es un Comodín
}
```

## Créditos

Diseño e implementación: Cuarto Rey Team 👑

Inspiración visual: Crossy Road (voxel style)

## Licencia

Uso libre para jugar entre amigos. No incluye assets originales.

---

**¡A sacar cartas y cumplir reglas! 🎴✨**
