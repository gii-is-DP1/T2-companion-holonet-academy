# Guión de clase — T2 con HoloNet Academy

**Supuestos de partida** (cámbialos si no encajan):

- Dos sesiones de **1h40** (100 min efectivos cada una). T2 completo no entra en una.
- Proyectas **dos ventanas**: las transparencias y el navegador con el repo + el editor.
  Alt-Tab es parte del guión.
- Antes de empezar: `npm run dev` corriendo, navegador en `localhost:3000`, editor
  abierto en `src/lessons/`, zoom de fuente subido.

**Si solo tienes una sesión de 1h40**: da la sesión A completa y deja la B para
laboratorio, con las diapositivas 50-81 como lectura guiada. Lo que no se puede
recortar es el bloque 5 (estado) y el bloque 9 (fetching): son los que evitan más
bugs en las entregas.

**Convenciones del guión**

- 🖥️ = cambiar a la ventana del navegador/editor.
- 📊 = volver a las transparencias.
- ❓ = pregunta para lanzar a clase (espera respuesta, no la contestes tú).
- ⚠️ = el error típico que quieres que vean nacer.

---

# SESIÓN A — De la arquitectura al estado compartido

| Min | Bloque | Transp. | Demo |
|-----|--------|---------|------|
| 0-5 | Recordatorios y plazos | 63-67 | — |
| 5-15 | Previously on DP1 | 4-17 | — |
| 15-22 | React en pocas palabras | 18-22 | — |
| 22-30 | Módulos | 23 | 01 Holocrón |
| 30-45 | Componentes y descomposición | 24-30 | 02 Cantina |
| 45-52 | La ecuación de React · Props | 31-36, 48 | 03 Hangar |
| 52-72 | Estado y hooks | 36-41 | 04 Sable láser |
| 72-79 | El estado es local | 42-43, 46 | 05 Droides |
| 79-94 | Lifting state up | 44-47 | 06 Trinchera |
| 94-100 | Cierre y enganche | — | — |

---

## 0-5 · Recordatorios primero (transp. 63-67)

Los plazos son inminentes (17, 20 y 27 de septiembre) y la atención está al máximo
en los primeros cinco minutos. No los dejes para el final, que es cuando la gente
recoge la mochila.

> "Antes de React, tres fechas. Formulario de juegos: abre el 15 a las 8:00 y el
> que llega tarde se queda con lo que sobra. Contrato de aprendizaje firmado por
> todos, el 20. Vídeo con las reglas, el 27. Y el Sprint 1 el 6 de octubre, que
> parece lejos y no lo está."

---

## 5-15 · Previously on DP1 (transp. 4-17)

Ritmo rápido, es repaso. Lo único que tiene que quedar clarísimo es que **todo lo
que viene hoy es consecuencia de decisiones ya tomadas**.

- Transp. 5: alta cohesión, bajo acoplamiento. **Marca esta frase**: vas a volver a
  ella tres veces hoy (módulos, componentes, container/presentational).
- Transp. 8-10: aplicación web, ciclo SPA, monolito con BD relacional.
- Transp. 12: arquitectura en tres capas.
- Transp. 15: MVC dentro de la capa de presentación.
- Transp. 17: la vista global. Déjala en pantalla unos segundos.

> "Hoy nos metemos en esa cajita de la izquierda. Las otras dos, más adelante."

❓ *"¿Por qué separar en capas si al final todo acaba en el mismo `.jar`?"*
(Respuesta que buscas: para poder cambiar una sin tocar las otras.)

---

## 15-22 · React en pocas palabras (transp. 18-22)

Transparencias 21-22: la lista de cosas que dan todos estos frameworks. Úsala como
**índice del resto de la clase** y vuelve a ella entre bloques.

> "Todo lo que veréis hoy son cinco cosas: modularidad, componentes, estado,
> navegación y acceso a datos. Cada una tiene un ejemplo ejecutable que os pasaré."

Aquí es el momento de presentar el repo, sin entrar todavía.

🖥️ Abre `localhost:3000`, enseña la barra lateral 10 segundos.

> "Ocho lecciones, cada una con su demo y su código comentado. Los números de
> transparencia están en el menú, para que podáis volver."

📊

---

## 22-30 · Módulos — el holocrón (transp. 23)

**Cuenta primero, demuestra después.** Explica la transparencia entera: `export`,
`import`, export por defecto vs. nombrado, y la frase clave: *lo que no se exporta
es privado*.

🖥️ **Lección 01 — Modules**

1. Abre `src/lessons/01-modules/holocron.js` al lado de la demo.
2. Señala las dos zonas del fichero: la privada arriba, la pública abajo.
3. Pulsa los botones `jedi-code` y `order-66`.
4. ⚠️ **Descomenta la línea 12 del `index.jsx`** (el import de
   `decryptKyberSignature`). Espera al error de Vite y **léelo en voz alta**.

> "La función existe. Está ahí, la estáis viendo en la pantalla. Pero desde fuera
> del módulo no existe. Eso es ocultación de información, y en JavaScript no hace
> falta ninguna palabra clave: basta con no exportarla."

5. Vuelve a comentar la línea.

❓ *"Si mañana cambio el algoritmo de cifrado, ¿cuántos ficheros tengo que tocar?"*
→ Ninguno. Enlaza con la transp. 5: eso es bajo acoplamiento.

**Pulla útil**: pregunta quién tiene ya un `utils.js` con veinte funciones que no
tienen nada que ver entre sí. Suele levantar la mano medio aula. Cohesión cero.

📊

---

## 30-45 · Componentes y descomposición (transp. 24-30)

Este bloque es **suyo, no tuyo**. La transparencia 28 es el "do it yourself".

1. Transp. 24: qué es un componente, en una frase.
2. Transp. 27: el ejemplo de `FilterableProductTable`. Recorre las cajas.
3. Transp. 28: **para la clase 3 minutos**. Que dibujen las cajas ellos.
4. Transp. 30: la solución del panel de juego (App, NavBar, MetricsBar…).

🖥️ **Lección 02 — Components**

Antes de enseñar el código, enseña **solo la demo** y repite el ejercicio en
caliente:

> "Esto es la cantina. Sin mirar el código: ¿qué componentes haríais vosotros?"

Recoge dos o tres propuestas en la pizarra. **Después** abre `index.jsx` y compara:
`CantinaBoard` → `SpeciesSection` → `PatronRow`.

> "Fijaos en que la descomposición sigue a los *datos*, no a los píxeles. Cada
> componente corresponde a un trozo del modelo."

⚠️ Momento `key`: cambia `key={p.id}` por `key={index}` en vivo.

> "Ahora mismo no pasa nada. Guardadlo en la memoria, porque dentro de tres
> lecciones esto va a explotar."

❓ *"¿Cómo sé que un componente está haciendo demasiado?"*
→ Cuando no puedes nombrarlo en tres palabras, o cuando cambia por dos motivos
distintos.

📊

---

## 45-52 · La ecuación de React y las props (transp. 31-36, 48)

Transp. 35 es la diapositiva más importante de la primera mitad:
**`UI = f(state)`**. Insiste en el "cada componente, no solo la vista global".

Transp. 36, alternativa 1: props.

🖥️ **Lección 03 — Props**

1. Enseña `StarshipCard` usado tres veces con datos distintos. Un componente, tres
   naves. Reutilización.
2. Enseña las dos sintaxis (desestructurada y objeto `props`) — se van a encontrar
   las dos en cualquier tutorial.
3. ⚠️ **Descomenta `name = 'Death Star'`** dentro de `StarshipCard`.

> "Le he asignado un valor a la prop. ¿Qué pasa? Nada. Las props son de solo
> lectura: el hijo no manda sobre el dato del padre."

📊 Salta un momento a la transp. 48 para dejar plantada la semilla:

> "Si las props solo bajan… ¿cómo hago yo para que un componente de abajo cambie
> algo de arriba? Guardad la pregunta veinte minutos."

---

## 52-72 · Estado y hooks — el bloque denso (transp. 36-41)

**20 minutos, tres ideas, no las mezcles.** Es el bloque que más bugs evita.

### Idea 1 — UI declarativa (transp. 36 alt. 2, 37, 38) · 7 min

Cuenta la transp. 38 entera antes de tocar nada. La frase:

> "En React no modificamos la interfaz. Describimos cómo es la interfaz **para cada
> estado**, y luego cambiamos el estado."

🖥️ **Lección 04 — State**, primera demo. Enciende el sable, cambia el cristal.
Abre el código y señala:

> "No hay ni un `document.querySelector` en todo el fichero. La hoja está o no está
> según `ignited`. Eso es todo."

Menciona de pasada la transp. 39 (Trigger → Render → Commit): al pulsar, React
**vuelve a llamar a tu función**, y solo después toca el DOM en lo que cambió.

### Idea 2 — El estado es una foto (transp. 40) · 7 min

🖥️ Segunda demo, "Bolts fired".

**Enseña primero el código de las dos funciones** y lanza la apuesta:

❓ *"Los dos botones llaman a `setBolts` tres veces. ¿Qué marcador saldrá en cada
uno? Levantad la mano los que digáis tres y tres."*

Casi todos dirán +3 y +3. **Déjalos equivocarse.** Luego pulsa.

> "Uno. Porque `bolts` no es una variable viva: es una foto del valor que tenía
> cuando se renderizó este componente. Las tres líneas calculan `0 + 1`."

Es el minuto que más se recuerda de la sesión. No lo aceleres.

### Idea 3 — Inmutabilidad (transp. 41) · 6 min

🖥️ Tercera demo, el Consejo Jedi.

1. Pulsa "Admit by mutating". **No pasa nada.**

> "He hecho `push` en el array y he llamado a `setCouncil`. React compara
> referencias: el objeto es el mismo objeto, así que para React no ha cambiado
> nada."

2. Ahora pulsa "Admit with spread syntax". ⚠️ **Anakin aparece dos veces.**

> "Aquí está lo gordo. La mutación **sí ocurrió**, solo que en silencio. Corrompió
> el estado y no se ha visto hasta que ha llegado una actualización legítima. Por
> eso estos errores son tan difíciles de encontrar: el síntoma aparece lejos de la
> causa."

> "Esto es, con diferencia, el bug número uno de las entregas de DP1."

📊

---

## 72-79 · El estado es local (transp. 42-43, 46)

Transp. 43 y 46: dos contadores independientes.

🖥️ **Lección 05 — State is local**

1. Primera demo: dos droides, dos contadores. Obvio, pásalo rápido.
2. Segunda demo, que es la interesante:
   - Pulsa el contador del primer droide un par de veces.
   - "Rename the first droid" → **el contador sobrevive**.
   - "Send the second droid away" y traerlo de vuelta → **su contador se ha
     reseteado**.

> "El estado no vive dentro de vuestra función. Vive en React, indexado por la
> posición del componente en el árbol. Si el nodo desaparece del árbol, su memoria
> se va con él."

Aquí recuperas el `key` de la lección 2:

> "Y si le dais una `key`, el estado va atado a la `key` en vez de a la posición.
> Por eso cambiar la `key` de un formulario es la manera estándar de resetearlo."

❓ *"Entonces, si dos componentes hermanos necesitan el mismo dato, ¿quién lo
guarda?"* → puente perfecto al siguiente bloque.

📊

---

## 79-94 · Lifting state up (transp. 44-47)

Cuenta las transparencias 44-45 (los botones que suben el estado al ancestro común)
y **luego** ve a la demo.

🖥️ **Lección 06 — Lifting state up**

1. Primera demo (la de arriba, en gris): dos baterías, cada una a su aire.

> "Cada una lleva su propia cuenta. Nadie manda. Esto es exactamente lo que os va a
> pasar en el proyecto la primera vez."

2. Segunda demo: cambia de objetivo y dispara desde las dos estaciones.

> "El mismo valor y el mismo manejador bajan a los dos hijos. Es imposible que se
> desincronicen porque solo hay una copia del dato."

3. Abre el código y señala la asimetría, que es **la regla que tienen que memorizar**:

> "Los datos bajan como valores. Los eventos suben como funciones. Nunca, jamás,
> nada se mueve de lado."

4. Señala que los hijos ya **no tienen estado**: son *controlados*.

> "Y fijaos en el efecto secundario: ahora `GunneryStation` se puede probar con
> props fijas, sin ratón y sin servidor. Apuntad esto, que en la sesión siguiente
> se convierte en un patrón con nombre y apellidos."

⚠️ Advertencia obligatoria, o subirán todo al `App`:

> "Cuidado con el entusiasmo. Subir estado que solo le importa a un componente es
> un error tan grave como no subirlo. Y subir de más produce el problema con el que
> empezamos la próxima sesión."

📊

---

## 94-100 · Cierre y enganche

Vuelve a la transp. 22 (la lista de características) y tacha lo cubierto:
modularidad, componentes, estado. Quedan navegación y datos.

Deja la pregunta abierta con la transp. 49 en pantalla:

> "Mirad este árbol. El nombre del usuario tiene que llegar cuatro niveles abajo, y
> tres componentes que no lo usan para nada tienen que ir pasándolo de mano en
> mano. Esto tiene nombre: *prop drilling*. La semana que viene lo arreglamos, y de
> paso vemos cómo hablar con el backend."

**Tarea para casa** (30 segundos, sin florituras):

> "Clonad el repo, `npm install`, `npm run dev`. En el README hay una tabla con
> cinco errores puestos a propósito. Descomentadlos y leed lo que pasa. Y haced el
> 'Your turn, Padawan' de las lecciones 4 y 6."

---

# SESIÓN B — Contexto, navegación, datos y patrones

| Min | Bloque | Transp. | Demo |
|-----|--------|---------|------|
| 0-5 | Repaso relámpago | 22 | — |
| 5-22 | Prop drilling y contexto | 48-49 | 07 La Fuerza |
| 22-40 | Enrutado | 50-53 | `App.jsx` |
| 40-62 | Acceso a datos | 54-57 | 08 HoloNet |
| 62-70 | Recursos estáticos | 58-59 | — |
| 70-80 | Patrones de vista | 71-72 | — |
| 80-95 | Container / Presentational | 73-81 | 08 (segunda vuelta) |
| 95-100 | Wrapping up y plazos | 60-62 | — |

---

## 0-5 · Repaso relámpago

Tres preguntas, sin transparencias:

❓ ¿Dónde vive realmente el estado de un componente?
❓ ¿Por qué mutar un array del estado no repinta nada?
❓ ¿En qué dirección viajan los datos y en cuál los eventos?

---

## 5-22 · Prop drilling y contexto (transp. 48-49)

Retoma la transp. 49 exactamente donde la dejaste.

🖥️ **Lección 07 — Context**. La demo está partida en dos columnas a propósito.

1. Izquierda: cuenta en voz alta cuántos componentes llevan `user` sin usarlo. Tres.
2. Derecha: el mismo árbol, cero props.

> "Añadid una planta más al templo. En la versión de la izquierda tocáis cuatro
> ficheros. En la de la derecha, ninguno."

3. Abre `ForceContext.jsx`. **Este es el momento didáctico bueno**:

> "Mirad qué se exporta: el proveedor y un hook. El objeto contexto **no se
> exporta**. ¿Os suena? Es exactamente el holocrón de la primera lección, aplicado
> a la gestión de estado. Nadie de fuera toca el mecanismo."

4. Pulsa "Promote" y "Turn to the dark side": un componente a cuatro niveles de
   profundidad reacciona sin que nadie le pase nada.

⚠️ Las dos advertencias, que hay que decir siempre juntas:

> "Uno: el contexto **no sustituye a las props**. Es para lo que es de verdad
> global en un subárbol: el usuario autenticado, el tema, el idioma, el token.
> Dos: **todo lo que cuelga del proveedor se repinta** cuando cambia el valor. Un
> contexto que cambia con cada tecla pulsada es una bomba de rendimiento."

**Aterrízalo en el proyecto**, que es lo que les interesa:

> "En vuestro proyecto, aquí es donde vive el usuario logueado y el JWT. Y de aquí
> es de donde lee un guardián de ruta para decidir si os pinta la página o os manda
> a `/login`."

📊

---

## 22-40 · Enrutado (transp. 50-53)

Aquí el repo es **el propio ejemplo**, no hay lección aparte.

1. Transp. 52: `<BrowserRouter>`, `<Routes>`, `<Route>`.

🖥️ Abre `src/main.jsx` — tres líneas, ahí está el `BrowserRouter` de la
transparencia. Luego `src/App.jsx`.

> "Esto es el menú que lleváis viendo dos sesiones. Las rutas no están escritas a
> mano: salen de `registry.js`. Añadir una lección es añadir una línea, y el menú y
> las rutas se enteran solos."

2. Navega entre lecciones con la pestaña de red abierta.

> "Mirad la barra de direcciones: cambia. Mirad la red: no se recarga nada. Eso es
> el ciclo SPA de la transparencia 9, funcionando delante de vosotros."

3. Transp. 53: parámetros y `useParams`.

**Ejercicio en vivo** (5 min, muy rentable): añade tú una ruta
`/lessons/:slug/solucion` mientras hablas, y que vean el hot reload.

📊

---

## 40-62 · Acceso a datos (transp. 54-57)

**Truco de puesta en escena**: antes de empezar el bloque, **para el backend**
(`Ctrl-C` en la terminal de `npm run api`).

🖥️ **Lección 08 — Fetching**. Recarga. Sale el mensaje de error rojo.

> "Empezamos por el final. Esto es lo que ve un usuario cuando el backend no está.
> ¿Cuántos de vosotros habéis programado alguna vez este caso? Pues es un tercio
> del trabajo."

Ahora arranca la API y recarga: se ve el "Scanning the HoloNet…" (400 ms de retardo
puestos a propósito) y luego los datos.

> "Tres estados, siempre: cargando, error y éxito. Si solo programáis el tercero,
> funciona en localhost con la base de datos vacía y en ningún sitio más."

Recorre el camino del dato con las transparencias 56-57 al lado:

1. `api.js` — la transp. 57 dice literalmente que la carga se delegue a otro
   fichero. Aquí está.

   ❓ *"Si mañana el backend cambia de URL o hay que meter el JWT en la cabecera,
   ¿cuántos ficheros toco?"* → uno.

2. `useHoloNet.js` — el hook propio.

> "Los tres estados y el `useEffect` son idénticos en todas las pantallas que leen
> del backend. Un hook personalizado no reutiliza *marcado*: reutiliza **lógica con
> estado**. Es el patrón Hook de la transparencia 62."

3. ⚠️ El array de dependencias, un minuto entero:

> "Array vacío, se ejecuta una vez. Con dependencias, cada vez que cambian. **Sin
> array, después de cada render** — y con un `fetch` dentro eso es un bucle
> infinito que os va a tumbar el servidor de un compañero."

4. La limpieza con `AbortController`: si el componente desaparece antes de que
   llegue la respuesta, se cancela.

📊

---

## 62-70 · Recursos estáticos (transp. 58-59)

Transparencia 59, la pregunta "WHY?" en grande. Que la contesten ellos.

→ Porque importándolo el empaquetador sabe que ese recurso pertenece a ese
componente: entra en el bundle, se le pone hash, se detecta si falta en tiempo de
compilación y se borra solo cuando borras el componente.

---

## 70-80 · Patrones de vista (transp. 71-72)

Template view vs. transform view, y dónde cae JSX (en medio, y por eso confunde).
Es el bloque más teórico de la sesión; mantenlo corto y con el Fowler a mano.

---

## 80-95 · Container / Presentational (transp. 73-81)

Las transparencias usan el ejemplo de Rick and Morty; el repo usa la misma
estructura con la flota rebelde. Puedes contarlo con las transparencias y
demostrarlo con el repo sin que se note la costura.

🖥️ **Lección 08**, segunda vuelta, ahora mirando la arquitectura:

```
FleetContainer   → QUÉ se muestra (fetch, carga, errores, filtro)
  └── FleetList  → CÓMO se muestra (marcado puro, sin estado)
        └── ShipRow
```

1. Señala que `FleetList` no tiene ni `useState`, ni `useEffect`, ni `fetch`.
2. Señala que el filtro por facción está en el **contenedor**, no en la lista.

**El argumento que convence** (guárdatelo para el final):

> "`FleetList` la podéis probar con un array escrito a mano, sin servidor y sin
> base de datos. `FleetContainer` no. Ese es el motivo entero del patrón, y como la
> asignatura se llama *Diseño y Pruebas*, os podéis imaginar que esto vuelve a
> aparecer."

Cierra el círculo de toda la asignatura:

> "Módulo, componente, contenedor. Tres escalas distintas, la misma idea: alta
> cohesión y bajo acoplamiento. Transparencia 5, primera sesión."

📊

---

## 95-100 · Wrapping up (transp. 60-62)

Las cuatro preguntas de la transparencia 62, lanzadas al aire, sin contestarlas:

1. ¿Cuál es el estado de un componente React?
2. ¿Cuándo props y cuándo contexto?
3. ¿Cómo usaríais react-router para imponer una restricción de seguridad?
4. De los patrones de la transparencia 62, ¿cuál habéis visto hoy sin que os
   dijera el nombre? (Módulo, Hook, Container/Presentational: los tres.)

Y los plazos que queden vivos.

---

## Apéndice — Chuleta de emergencia

Si se te cae el `npm run dev` en mitad de la clase:

- El error se ve en la terminal, no en el navegador. `Ctrl-C` y `npm run dev` otra
  vez tarda 3 segundos.
- Si falla solo la lección 8, es la API: `npm run api` en otra terminal.
- Si has descomentado una trampa y no recuerdas cuál, `git checkout .` deja el repo
  como estaba.

**Las cinco trampas y dónde están** (por si quieres improvisar):

| Lección | Fichero | Qué demuestra |
|---|---|---|
| 01 | `index.jsx`, import comentado | No exportado = no existe |
| 03 | `index.jsx`, `name = 'Death Star'` | Las props son de solo lectura |
| 04 | botón "snapshot (+1)" | El estado es una foto del render |
| 04 | botón "Admit by mutating" | Mutar corrompe en silencio |
| 08 | parar `npm run api` | Los estados de carga y error no son opcionales |
