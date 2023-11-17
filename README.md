# SiLe: Sintaxis legislativa

En node.js te lo instalas:

```sh
npm install --save sile
```

Y lo usas:

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