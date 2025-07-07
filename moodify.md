# Como Construí Moodify - Update para el Grupo

## Lo que Implementé
Tomé nuestro concepto de "música basada en emociones" y lo transformé en una aplicación web funcional. Está deployada y andando: https://moodify-eight-navy.vercel.app

## Stack técnico y por qué funciona bien

**React:** Es una biblioteca para crear interfaces interactivas. En Moodify maneja toda la parte visual - el formulario donde escribís tu emoción, mostrar los resultados, los loading states. Lo bueno es que actualiza solo las partes que cambian, entonces cuando llegan las playlists no se re-dibuja toda la página.

**Node.js + Express:** Node.js permite usar JavaScript en el servidor. Express es un framework que simplifica crear APIs. En el proyecto maneja todas las llamadas a OpenAI y Spotify, procesa las respuestas y las devuelve al frontend en formato limpio.

**TypeScript:** Es JavaScript pero con tipos. Te obliga a declarar qué tipo de data esperás (string, number, object). En el proyecto es clave porque las APIs externas devuelven estructuras complejas - si esperás que `playlist.id` sea string y llega null, TypeScript te avisa antes de que explote en producción.

**Vercel:** Plataforma de deployment que integra directo con GitHub. Cada vez que hago push, automáticamente compila y deploy la app. Además maneja tanto frontend como backend desde el mismo dominio.

## Los problemas

### 1. ¿Cómo detectar emociones en texto?
Probé varias opciones:
- Sentiment analysis básico → muy limitado
- **Solución:** OpenAI GPT-3.5 con prompt engineering específico

Le doy un prompt que SIEMPRE me devuelve JSON con:
```json
{
  "emotion": "feliz",
  "confidence": 0.9,
  "language": "es",
  "searchTerms": ["música alegre", "pop latino", "reggaeton"]
}
```

### 2. ¿Cómo conectar emociones con música real?
No quería fake playlists, así que integré Spotify Web API. No anda 100% pero casi

### 3. ¿Cómo hacer que funcione en diferentes idiomas?
El prompt de OpenAI detecta automáticamente español/inglés/portugués y genera términos de búsqueda culturalmente apropiados. "Feliz" busca salsa/reggaeton, "happy" busca pop/dance.

## Lo que funciona ahora
- Escribís tu estado emocional en cualquier idioma
- IA detecta la emoción y genera términos de búsqueda
- Busca playlists reales en Spotify
- Si falla, muestra playlists mock pero coherentes
- UI responsive, funciona en mobile
