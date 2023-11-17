# SiLe: Sintaxis legislativa

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

En navegadores todavía no.

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

Esto es transformado a JSON, y puede usarse para buildear queries a bases de datos, abstractamente.