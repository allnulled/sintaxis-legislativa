const Sile_parser = require(__dirname + "/../src/sintaxis-legislativa.js");
const fs = require("fs");
const path = require("path");
const ficheros = fs.readdirSync(__dirname + "/ejemplos");
for(let index=0; index<ficheros.length; index++) {
  const fichero = ficheros[index];
  const ruta = path.resolve(__dirname + "/ejemplos", fichero);
  const ejemplo_codigo = fs.readFileSync(ruta).toString();
  try {
    const ast = Sile_parser.parse(ejemplo_codigo);
    const ruta_destino = path.resolve(__dirname + "/ejemplos.salida/" + fichero + ".json");
    fs.writeFileSync(ruta_destino, JSON.stringify(ast, null, 2), "utf8");
  } catch (error) {
    console.log("Error parseando ejemplo «" + fichero + "»");
    console.log(error);
  }
}