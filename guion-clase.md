# Guión de clase — T2 en una sesión de 1h40

**Formato**: una sesión, 100 minutos efectivos, alternando transparencias y demo
proyectada en vivo.

**T2 completo no cabe cómodamente en 100 minutos.** Cabe si aceptas una regla:
**cada demo tiene un solo gesto**. Ese gesto está marcado como 🎯 en cada bloque y
es lo único que haces si vas justo. Todo lo demás (segundas demos, ejercicios
largos, el paseo por el código) está marcado como *opcional* y se sacrifica sin
remordimiento.

**Los dos bloques intocables** son el 6 (estado y hooks, 16 min) y el 11 (acceso a
datos, 12 min). Son los que evitan más bugs en las entregas. Si tienes que recortar,
recorta de los bloques 3, 5, 10 y 12, en ese orden.

**Antes de entrar**: `npm run dev` corriendo, navegador en `localhost:3000`, editor
abierto en `src/lessons/`, zoom de fuente subido, y **una segunda terminal
preparada** con `npm run api` parado (lo necesitas en el minuto 78).

**Convenciones**: 🖥️ cambiar al navegador/editor · 📊 volver a transparencias ·
🎯 el gesto mínimo · ❓ pregunta para el aula · ⚠️ el error que quieres que vean
nacer · ⏱️ punto de control de tiempo.

---

## Plan de vuelo

| Min | Bloque | Transp. | Demo | Recortable |
|-----|--------|---------|------|------------|
| 0-4 | Recordatorios y plazos | 63-67 | — | no |
| 4-11 | Previously on DP1 | 4-17 | — | poco |
| 11-16 | React en pocas palabras | 18-22 | vistazo al repo | sí |
| 16-21 | Módulos | 23 | 01 Holocrón | poco |
| 21-31 | Componentes y descomposición | 24-30 | 02 Cantina | **sí** |
| 31-36 | Ecuación de React · Props | 31-36 | 03 Hangar | sí |
| **36-52** | **Estado y hooks** | 36-41 | 04 Sable | **NO** |
| 52-57 | El estado es local | 42-43, 46 | 05 Droides | **sí** |
| 57-66 | Lifting state up | 44-47 | 06 Trinchera | poco |
| 66-73 | Prop drilling y contexto | 48-49 | 07 La Fuerza | poco |
| 73-78 | Enrutado | 50-53 | `App.jsx` | **sí** |
| **78-90** | **Acceso a datos** | 54-59 | 08 HoloNet | **NO** |
| 90-96 | Patrones de vista y Container/Presentational | 71-81 | 08 otra vez | **sí** |
| 96-100 | Wrapping up | 60-62 | — | no |

---

## 1 · Recordatorios primero — 4 min (transp. 63-67)

Los plazos son inminentes y la atención está al máximo en los primeros minutos. No
los dejes para el final, que es cuando la gente recoge la mochila.

> "Antes de React, tres fechas. Formulario de juegos: abre el 15 a las 8:00, y el
> que llega tarde se queda con lo que sobra. Contrato de aprendizaje firmado por
> todos, el 20. Vídeo con las reglas, el 27. Y el Sprint 1 el 6 de octubre, que
> parece lejos y no lo está."

**No abras debate sobre los juegos aquí.** Si alguien pregunta, "al final de clase
o por el foro". Un debate de tres minutos aquí te come el bloque 5 entero.

---

## 2 · Previously on DP1 — 7 min (transp. 4-17)

Ritmo alto, es repaso. Solo tiene que quedar una idea: **todo lo de hoy es
consecuencia de decisiones ya tomadas**.

Pasa rápido por 8, 9, 10 y 12 (aplicación web, ciclo SPA, monolito, tres capas).
Párate solo en dos:

- **Transp. 5**: alta cohesión, bajo acoplamiento. **Márcala.** Vuelves a ella tres
  veces hoy: en módulos, en componentes y en el cierre.
- **Transp. 17**: la vista global. Déjala en pantalla unos segundos.

> "Hoy nos metemos en la cajita de la izquierda. Las otras dos, más adelante."

⏱️ **Minuto 11.** Si vas por la transp. 12, salta directamente a la 17 y sigue.

---

## 3 · React en pocas palabras — 5 min (transp. 18-22)

Transp. 21-22 es **el índice de la clase**. Úsala así explícitamente:

> "Todo lo de hoy son cinco cosas: modularidad, componentes, estado, navegación y
> acceso a datos. Cada una tiene un ejemplo ejecutable."

🖥️ Enseña la barra lateral del repo **20 segundos**, sin entrar en nada.

> "Ocho lecciones, cada una con su demo y su código comentado, y el número de
> transparencia en el menú. Os lo paso al acabar."

📊

*(Este bloque es el primero que se sacrifica: si vas tarde, enseña el repo en el
minuto 16 al hilo de la primera demo y ahórrate 4 minutos.)*

---

## 4 · Módulos — 5 min (transp. 23)

Cuenta la transparencia entera: `export` / `import`, por defecto vs. nombrado, y la
frase que importa: **lo que no se exporta es privado**.

🖥️ **Lección 01 — Modules**. Abre `holocron.js` al lado.

🎯 **El gesto**: descomenta el import de `decryptKyberSignature` en `index.jsx`,
espera el error de Vite y **léelo en voz alta**.

> "La función existe. La estáis viendo en pantalla. Pero desde fuera del módulo no
> existe. Eso es ocultación de información, y en JavaScript no hace falta ninguna
> palabra clave: basta con no exportarla."

❓ *"Si mañana cambio el algoritmo de cifrado, ¿cuántos ficheros toco?"* → ninguno.
Enlaza con la transp. 5.

Vuelve a comentar la línea. 📊

*Opcional si sobra tiempo (no lo habrá): la pulla del `utils.js` con veinte
funciones inconexas.*

---

## 5 · Componentes y descomposición — 10 min (transp. 24-30)

El bloque con más grasa recortable, porque el ejercicio se puede hacer largo o
corto.

1. Transp. 24: qué es un componente, una frase.
2. Transp. 27: `FilterableProductTable`, recorre las cajas.
3. Transp. 28: **90 segundos** para que dibujen las cajas. Cronométralo de verdad.
   Recoge **dos** propuestas, no cinco.
4. Transp. 30: la solución del panel de juego.

🖥️ **Lección 02 — Components**

🎯 **El gesto**: enseña **solo la demo** (sin código) y pregunta:

> "Esto es la cantina. Sin mirar el código: ¿qué componentes haríais?"

Una respuesta, y abres `index.jsx`: `CantinaBoard` → `SpeciesSection` → `PatronRow`.

> "Fijaos en que la descomposición sigue a los *datos*, no a los píxeles."

Menciona `key` **de pasada, sin demostrarlo**:

> "El `key` de la lista identifica cada elemento entre renders. Guardadlo, que
> vuelve dentro de veinte minutos."

📊 ⏱️ **Minuto 31.** Si vas tarde: corta el ejercicio de la 28 a cero, cuenta la
solución de la 30 y quédate solo con el gesto de la demo. Ahorras 4 min.

---

## 6 · La ecuación de React y las props — 5 min (transp. 31-36)

Transp. 35, **`UI = f(state)`**, es la diapositiva más importante de la primera
mitad. Insiste en el "no solo la vista global, **cada componente**".

Transp. 36, alternativa 1: props.

🖥️ **Lección 03 — Props**

🎯 **El gesto**: descomenta `name = 'Death Star'` dentro de `StarshipCard`.

> "Le asigno un valor a la prop. ¿Qué pasa? Nada. Las props son de solo lectura: el
> hijo no manda sobre el dato del padre."

Y planta la semilla, que la recoges en el minuto 66:

> "Si las props solo bajan… ¿cómo hace un componente de abajo para cambiar algo de
> arriba? Guardad la pregunta."

📊

*Sáltate la tarjeta con sintaxis de objeto `props` y las tres naves: se entienden
solas mirando la pantalla mientras hablas.*

---

## 7 · Estado y hooks — 16 min · **BLOQUE INTOCABLE** (transp. 36-41)

Tres ideas, en orden, sin mezclarlas. Es el bloque que más bugs evita.

### 7a · UI declarativa — 5 min (transp. 36 alt. 2, 37, 38)

Cuenta la transp. 38 antes de tocar nada. La frase:

> "En React no modificamos la interfaz. Describimos cómo es la interfaz **para cada
> estado**, y luego cambiamos el estado."

🖥️ Enciende el sable, cambia el cristal. Abre el código:

> "No hay ni un `document.querySelector` en todo el fichero. La hoja está o no está
> según `ignited`. Ya está."

Transp. 39 en 30 segundos: Trigger → Render → Commit. Al pulsar, React **vuelve a
llamar a tu función**, y solo después toca el DOM en lo que cambió.

### 7b · El estado es una foto — 6 min (transp. 40)

🖥️ Segunda demo, "Bolts fired".

Enseña **primero el código** de las dos funciones y lanza la apuesta:

❓ *"Los dos botones llaman a `setBolts` tres veces. ¿Qué marcador sale en cada uno?
Manos arriba los que digáis tres y tres."*

Casi todos dirán +3 y +3. **Déjalos equivocarse.** Luego pulsa.

> "Uno. Porque `bolts` no es una variable viva: es una foto del valor que tenía
> cuando se renderizó este componente. Las tres líneas calculan `0 + 1`."

Es el minuto que más se recuerda de la sesión. **No lo aceleres aunque vayas tarde**
— recorta el bloque siguiente en su lugar.

### 7c · Inmutabilidad — 5 min (transp. 41)

🖥️ Tercera demo, el Consejo Jedi.

1. Pulsa **"Admit by mutating"**. No pasa nada.

> "He hecho `push` en el array y he llamado a `setCouncil`. React compara
> referencias: el objeto es el mismo, así que para React no ha cambiado nada."

2. ⚠️ Ahora pulsa **"Admit with spread syntax"**. **Anakin aparece dos veces.**

> "Aquí está lo gordo. La mutación **sí ocurrió**, en silencio. Corrompió el estado
> y no se ha visto hasta que ha llegado una actualización legítima. Por eso estos
> bugs son tan caros: el síntoma aparece lejos de la causa."

> "Esto es, con diferencia, el error número uno de las entregas de DP1."

📊 ⏱️ **Minuto 52.** Punto de control crítico. Si llegas después del 55, recorta el
bloque 8 a la mitad y el 12 entero.

---

## 8 · El estado es local — 5 min (transp. 42-43, 46)

🖥️ **Lección 05 — State is local**. Vete **directo a la segunda demo**; la primera
(dos droides independientes) se cuenta en una frase sin enseñarla.

🎯 **El gesto**: pulsa el contador, luego "Rename the first droid" (**el contador
sobrevive**) y luego "Send the second droid away" y traerlo (**se ha reseteado**).

> "El estado no vive dentro de vuestra función. Vive en React, indexado por la
> posición del componente en el árbol. Si el nodo desaparece del árbol, su memoria
> se va con él."

Recupera el `key` del bloque 5, en una frase:

> "Y si le dais una `key`, el estado va atado a la `key` en vez de a la posición.
> Por eso cambiar la `key` de un formulario es la forma estándar de resetearlo."

❓ *"Entonces, si dos hermanos necesitan el mismo dato, ¿quién lo guarda?"* → puente
directo al siguiente bloque, sin transición.

📊

---

## 9 · Lifting state up — 9 min (transp. 44-47)

Cuenta las transparencias 44-45 y **luego** la demo.

🖥️ **Lección 06 — Lifting state up**

1. Demo gris de arriba, 20 segundos: dos baterías, cada una a su aire.

> "Cada una lleva su cuenta. Nadie manda. Esto es exactamente lo que os va a pasar
> en el proyecto la primera vez."

2. 🎯 **El gesto**: en la segunda demo, cambia de objetivo y dispara desde las dos
   estaciones. Se mueven juntas.

> "El mismo valor y el mismo manejador bajan a los dos hijos. Es imposible que se
> desincronicen porque solo hay una copia del dato."

3. Abre el código y di **la regla que tienen que memorizar**:

> "Los datos bajan como valores. Los eventos suben como funciones. Nunca, jamás,
> nada se mueve de lado."

4. Señala que los hijos ya no tienen estado — son *controlados* — y **guarda la
   frase para el minuto 90**:

> "Efecto secundario: ahora esa estación se puede probar con props fijas, sin ratón
> y sin servidor. Apuntadlo, que al final de la clase tiene nombre propio."

⚠️ Advertencia obligatoria o subirán todo al `App`:

> "Cuidado con el entusiasmo: subir estado que solo le importa a un componente es
> tan malo como no subirlo. Y subir de más produce justo el problema que viene
> ahora."

📊 ⏱️ **Minuto 66.**

---

## 10 · Prop drilling y contexto — 7 min (transp. 48-49)

Transp. 48 y 49 seguidas, rápido. Recoge la semilla del minuto 31.

🖥️ **Lección 07 — Context**. La demo está en dos columnas a propósito.

🎯 **El gesto**: cuenta en voz alta cuántos componentes llevan `user` sin usarlo en
la columna izquierda (**tres**) y cuántos en la derecha (**cero**). Luego pulsa
"Turn to the dark side" y que vean reaccionar al componente de cuatro niveles abajo.

> "Añadid una planta más al templo. En la izquierda tocáis cuatro ficheros. En la
> derecha, ninguno."

Abre `ForceContext.jsx` **10 segundos**, solo para señalar los exports:

> "Se exportan el proveedor y un hook. El objeto contexto **no**. ¿Os suena? Es el
> holocrón de la primera lección aplicado a la gestión de estado."

⚠️ Las dos advertencias, siempre juntas:

> "Uno: el contexto **no sustituye a las props**; es para lo que es global de
> verdad — el usuario autenticado, el tema, el token. Dos: **todo lo que cuelga del
> proveedor se repinta** cuando cambia el valor."

Y el aterrizaje que les interesa:

> "En vuestro proyecto, aquí vive el usuario logueado y el JWT. Y de aquí lee un
> guardián de ruta para decidir si os pinta la página o os manda a `/login`."

📊

---

## 11 · Enrutado — 5 min (transp. 50-53)

Aquí **el repo es el ejemplo**, no hay lección aparte. Bloque muy comprimible.

Transp. 52: `<BrowserRouter>`, `<Routes>`, `<Route>`.

🖥️ 🎯 **El gesto**: navega entre dos lecciones con la pestaña de red abierta.

> "La barra de direcciones cambia. La red no recarga nada. Eso es el ciclo SPA de
> la transparencia 9, funcionando delante de vosotros."

Enseña `main.jsx` (tres líneas, ahí está el `BrowserRouter`) y menciona que las
rutas salen de `registry.js`, no escritas a mano.

Transp. 53: `useParams`, **solo contada**. Nada de añadir rutas en vivo.

📊 ⏱️ **Minuto 78.** Si llegas tarde, este bloque baja a 2 minutos sin pérdida real:
lo van a usar en laboratorio con el guion delante.

---

## 12 · Acceso a datos — 12 min · **BLOQUE INTOCABLE** (transp. 54-59)

**Puesta en escena**: antes de empezar, **para el backend** (`Ctrl-C` en la terminal
de `npm run api`).

🖥️ **Lección 08 — Fetching**. Recarga. Sale el error rojo.

🎯 **El gesto**: empezar roto.

> "Empezamos por el final. Esto es lo que ve un usuario cuando el backend no está.
> ¿Cuántos habéis programado alguna vez este caso? Pues es un tercio del trabajo."

Arranca la API y recarga: se ve "Scanning the HoloNet…" (400 ms de retardo puestos a
propósito) y luego los datos.

> "Tres estados, siempre: cargando, error y éxito. Si solo programáis el tercero,
> funciona en localhost con la base de datos vacía y en ningún sitio más."

Recorre el camino del dato con las transp. 56-57 al lado — **rápido, tres paradas**:

1. `api.js` — la transp. 57 dice literalmente que la carga se delegue a otro
   fichero. ❓ *"Si el backend cambia de URL o hay que meter el JWT en la cabecera,
   ¿cuántos ficheros toco?"* → uno.
2. `useHoloNet.js` — el hook propio.
   > "Los tres estados y el `useEffect` son idénticos en todas las pantallas que
   > leen del backend. Un hook personalizado no reutiliza *marcado*: reutiliza
   > **lógica con estado**. Es el patrón Hook de la transparencia 62."
3. ⚠️ El array de dependencias, **un minuto entero, sin prisa**:
   > "Array vacío, una vez. Con dependencias, cuando cambian. **Sin array, después
   > de cada render** — y con un `fetch` dentro, eso es un bucle infinito."

Transp. 58-59 en **60 segundos**: la pregunta "WHY?" contestada por ti mismo si no
hay tiempo → porque importándolo el empaquetador sabe que ese recurso pertenece a
ese componente: entra en el bundle, se le pone hash, y se detecta si falta en
tiempo de compilación.

📊 ⏱️ **Minuto 90.**

---

## 13 · Patrones — 6 min (transp. 71-72, 75-81)

Comprime los dos temas en uno. Transp. 71-72 (template vs. transform view) en **90
segundos**, con Fowler en la mano y sin profundizar.

Container/Presentational: las transparencias usan Rick and Morty, el repo usa la
flota rebelde. Cuenta con las transparencias, señala con el repo.

🖥️ 🎯 **El gesto**: vuelve a la lección 08 y dibuja la estructura en voz alta.

```
FleetContainer   → QUÉ se muestra (fetch, carga, errores, filtro)
  └── FleetList  → CÓMO se muestra (marcado puro, sin estado)
```

Señala que `FleetList` no tiene ni `useState`, ni `useEffect`, ni `fetch`, y que el
filtro por facción está en el **contenedor**.

**El argumento que convence** (recoge la frase del minuto 57):

> "`FleetList` la podéis probar con un array escrito a mano, sin servidor y sin base
> de datos. `FleetContainer` no. Ese es el motivo entero del patrón — y como la
> asignatura se llama *Diseño y Pruebas*, os imagináis que esto vuelve."

📊

---

## 14 · Wrapping up — 4 min (transp. 60-62)

Cierra el círculo de toda la sesión:

> "Módulo, componente, contenedor. Tres escalas distintas, la misma idea: alta
> cohesión y bajo acoplamiento. Transparencia 5, hace hora y media."

Las preguntas de la transp. 62, lanzadas al aire **sin contestarlas**:

1. ¿Cuál es el estado de un componente React y dónde vive de verdad?
2. ¿Cuándo props y cuándo contexto?
3. ¿Cómo usaríais react-router para imponer una restricción de seguridad?
4. De los patrones de la lista, ¿cuáles habéis visto hoy sin que os dijera el
   nombre? (Módulo, Hook y Container/Presentational: los tres.)

**Tarea, 30 segundos:**

> "Clonad el repo, `npm install`, `npm run dev`. En el README hay una tabla con
> cinco errores puestos a propósito: descomentadlos y leed lo que pasa. Y haced el
> 'Your turn, Padawan' de las lecciones 4 y 6, que son las que os van a doler en el
> Sprint 1."

---

## Apéndice A — Plan de contingencia por minutos

| Si en el minuto… | vas por… | recorta |
|---|---|---|
| 20 | aún en Previously | el vistazo al repo (bloque 3) y el ejercicio de la transp. 28 |
| 35 | aún en componentes | props (bloque 6) a 2 min: solo el gesto de la trampa |
| 55 | aún en estado | el bloque 8 (estado local) a 2 min: solo la segunda demo |
| 70 | aún en lifting state | enrutado (bloque 11) a 2 min, sin abrir `main.jsx` |
| 85 | aún en contexto | patrones (bloque 13) entero: quedan en las transparencias |

**Lo que nunca se recorta**: la apuesta del "+1 vs +3", la doble aparición de
Anakin, y el arranque con el backend caído.

---

## Apéndice B — Chuleta de emergencia

- Si se cae `npm run dev`: el error sale en la terminal, no en el navegador.
  `Ctrl-C` y arrancar otra vez tarda 3 segundos.
- Si falla solo la lección 8, es la API: `npm run api` en otra terminal.
- Si has descomentado una trampa y no recuerdas cuál: `git checkout .`.

**Las cinco trampas y dónde están:**

| Lección | Fichero | Qué demuestra |
|---|---|---|
| 01 | `index.jsx`, import comentado | No exportado = no existe |
| 03 | `index.jsx`, `name = 'Death Star'` | Las props son de solo lectura |
| 04 | botón "snapshot (+1)" | El estado es una foto del render |
| 04 | botón "Admit by mutating" | Mutar corrompe en silencio |
| 08 | parar `npm run api` | Los estados de carga y error no son opcionales |

---

## Apéndice C — Qué queda para laboratorio

Con este ritmo, lo que se cuenta pero **no se practica** en clase y conviene
recuperar en el laboratorio:

- `useParams` y rutas con parámetros (transp. 53) — ejercicio 3 de la lección 8.
- Guardián de ruta con el contexto — ejercicio 3 de la lección 7.
- Recursos estáticos y por qué se importan (transp. 58-59).
- Reducers (mencionados en la transp. 62, no cubiertos en el repo).
