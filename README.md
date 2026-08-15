# Jsonly

Herramientas de JSON: formatear, validar, explorar en árbol y comparar — todo en el navegador, sin backend.

## Qué hace

**Formatear / Validar**
- Formatea con 2 o 4 espacios, o minifica, con un clic.
- Vista de árbol colapsable: expande/contrae objetos y arreglos, con color por tipo de valor.
- Validación en vivo: si el JSON es inválido, muestra línea y columna exactas (cuando el motor de JSON las expone) más un fragmento del texto con un `^` señalando el punto del error, en vez de solo un mensaje genérico.
- Copiar al portapapeles con confirmación visual.

**Comparar**
- Dos editores lado a lado (JSON A / JSON B).
- Diferencia línea a línea sobre la versión formateada de cada uno (mismo indentado), calculada con un algoritmo LCS clásico — igual principio que un diff de texto normal, así que el resultado es predecible y fácil de leer.
- Contador de líneas añadidas/eliminadas.
- Si cualquiera de los dos lados tiene JSON inválido, se muestra el error en vez de un diff falso.

## Por qué es honesto, no una demo

El parseo y la validación usan `JSON.parse` nativo del navegador — no hay un parser JSON reimplementado a mano, así que la validación es exactamente la que tendría cualquier código real. El mensaje de error y su posición vienen directamente del motor; cuando el motor no expone línea/columna para un caso particular, se muestra igual el mensaje sin inventar una posición falsa.

El diff no intenta ser un "diff semántico" de JSON (que ignoraría el orden de claves): compara el texto formateado línea por línea, como una herramienta de diff de texto real. Es una decisión deliberada de alcance — un diff semántico completo es mucho más complejo y no aporta valor proporcional para un MVP.

## Stack

Next.js 16 (App Router), TypeScript, Tailwind CSS 4, React 19.

## Estructura

- `lib/jsonFormat.ts` — parseo con extracción de línea/columna del mensaje de error nativo, formateo, minificado.
- `lib/diff.ts` — diff de líneas por LCS (con fallback lineal para entradas muy grandes).
- `components/JsonTreeView.tsx` — árbol colapsable recursivo.
- `components/FormatterView.tsx`, `DiffView.tsx` — las dos pestañas principales.
- `components/JsonlyView.tsx` — orquestador con el selector de pestañas.

## Estado

Completo y funcional. Verificado con build, lint y pruebas end-to-end (formateo, minificado, indentado, copiar, error de validación con posición, diff con estadísticas, invalidación del diff ante JSON roto).

## Pendientes

Ninguno bloqueante. Posible mejora futura: diff semántico opcional (ignorando orden de claves) como modo alternativo.
