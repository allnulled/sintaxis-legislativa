# SiLe: Sintaxis legislativa

Lenguaje de programación para dejar constancia de los cambios de estado aplicados a las leyes. 

## Versión online

Puedes acceder a una versión online mínima donde testear la sintaxis en:

- [https://allnulled.github.io/sintaxis-legislativa/](https://allnulled.github.io/sintaxis-legislativa/)

Esta aplicación tiene persistencia real pero local, por lo cual los cambios quedan almacenados en el sistema del dispositivo de navegación web, y no se comparten con nadie.


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

Se actualiza ley <Nombre de ley> con contenido:

Bla bla bla.
Bla bla bla.
Bla bla bla.

Se elimina ley <Nombre de ley>.

Se elimina ley <Nombre de ley> y toda su descendencia.
```

- La asignación del padre en la creación de leyes es opcional.
   - en un estado constitucional, podría no serlo, porque podrían usar la herencia para representar a la constitución como la raíz de todas las leyes. Pero bueno, ni siquiera tendría por qué hacerse así.
- Esto es transformado a un JSON, y puede usarse para buildear queries a bases de datos, abstractamente.
- Pueden haber múltiples modificaciones de ley, con múltiples operaciones, en cada fichero.