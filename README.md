# SiLe: Sintaxis legislativa

Lenguaje de programación para dejar constancia de los cambios de estado aplicados a las leyes. 

## Versión online

Puedes acceder a una versión online mínima donde testear la sintaxis en:

- [https://allnulled.github.io/sintaxis-legislativa/](https://allnulled.github.io/sintaxis-legislativa/)


## Instalación

Con npm te lo instalas:

```sh
npm install --save sile
```

## Uso

Desde node.js lo usas:

```js
const SileParser = require("sile");
const ast = SileParser.parse(
`Modificación de ley <Nombre de modificación de ley>.

Se crea ley <Nombre de ley> con contenido:

Bla bla bla
Bla bla bla
Bla bla bla

Se actualiza ley <Id> con contenido:

Nuevo bla bla bla
Bla bla bla
Bla bla bla

Se elimina ley <Id>.
Se elimina ley <Id> y toda su descendencia.
`
)
```

En navegadores:

```html
<script src="node_modules/sile/docs/lib/sile/sile.js"></script>
<script>
    const ast = window.Sile_parser.parse(texto_para_sile);
</script>
```

## Sintaxis

Esto es un texto válido.

```
Modificación de ley <Nombre de la modificación de ley>.

Se crea ley <Nombre de ley> con padre <Id de ley padre> con contenido:

Bla bla bla.
Bla bla bla.
Bla bla bla.

Se actualiza ley <Id> con contenido:

Bla bla bla.
Bla bla bla.
Bla bla bla.

Se elimina ley <Id>.

Se elimina ley <Id> y toda su descendencia.
```

La asignación del padre en la creación de leyes es opcional. En un estado constitucional, podría no serlo, porque todas las leyes emanarían de la constitución, de la ley inicial.

Esto es transformado a JSON, y puede usarse para buildear queries a bases de datos, abstractamente.