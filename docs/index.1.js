
// [castelog:html5izable] ACTIVADO con: {"autor":"allnulled","nombre":"index","version":"1","contenido":{"head":"<head>\n    <title>🌐 SiLe | Editor</title>\n    <meta charset=\"utf8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n    <link rel=\"stylesheet\" type=\"text/css\" href=\"lib/win7/win7.scoped.2.css\" />\n    <link rel=\"stylesheet\" type=\"text/css\" href=\"lib/codemirror/codemirror.css\" />\n    <script src=\"lib/sqlite3/sqlite3.js\"></script>\n    <script src=\"lib/calo/calo.js\"></script>\n    <script src=\"lib/codemirror/codemirror.js\"></script>\n    <script src=\"lib/sqlstring/sqlstring.js\"></script>\n    <script src=\"lib/sile/sile.standalone.js\"></script>\n    <style>\n      html {\n        background-color: #222;\n      }\n      .error_box {\n        background-color: red;\n        color: white;\n        padding: 4px;\n        cursor: pointer;\n      }\n      .caja_de_boton_de_ley {\n        display: inline-block;\n        padding-top: 4px;\n        padding-right: 4px;\n      }\n    </style>\n</head>","body":"<body><div id=\"app\"></div></body>"}}

window.NavegadorDeLey = Castelog.metodos.un_componente_vue2("NavegadorDeLey",
  "<div class=\"NavegadorDeLey Component\">"
 + "    <div class=\"window\">"
 + "      <div class=\"title-bar\">"
 + "        <div class=\"title-bar-text\" style=\"width:100%;\">"
 + "          <span>🌐 SiLe | Explorer 🌐</span>"
 + "          <button style=\"float:right;\" v-on:click=\"actualizar_datos\">Refrescar</button>"
 + "        </div>"
 + "      </div>"
 + "      <div class=\"window-body has-space\">"
 + "        <div>"
 + "          "
 + "        </div>"
 + "        <div>"
 + "          <button v-on:click=\"() => seleccionar_ley(undefined)\">Ir a raíz</button>"
 + "        </div>"
 + "        <div v-if=\"ley_seleccionada && ley_seleccionada.padre\">"
 + "          <button v-on:click=\"() => seleccionar_ley(ley_seleccionada.padre)\">Ir a ley padre</button>"
 + "        </div>"
 + "        <div v-if=\"ley_seleccionada\">"
 + "          <div class=\"nombre_de_ley_seleccionada\"><b>Ley:</b> {{ ley_seleccionada.nombre }}</div>"
 + "          <div class=\"padre_de_ley_seleccionada\"><b>Ley padre:</b> {{ ley_seleccionada.padre }}</div>"
 + "          <div class=\"modificacion_de_ley_seleccionada\"><b>Modificación de ley:</b> {{ ley_seleccionada.modificacion_de_ley }}</div>"
 + "          <div class=\"contenido_de_ley_seleccionada\"><b>Contenido:</b> {{ ley_seleccionada.contenido }}</div>"
 + "        </div>"
 + "        <div v-if=\"ley_seleccionada_descendencia\">"
 + "          <span class=\"caja_de_boton_de_ley\" v-for=\"descendiente, descendiente_index in ley_seleccionada_descendencia\" v-bind:key=\"'descendiente-' + descendiente_index\">"
 + "            <button href=\"javascript:void(0)\" v-on:click=\"() => seleccionar_ley(descendiente.nombre)\">{{ descendiente.nombre }}</button>"
 + "          </span>"
 + "        </div>"
 + "      </div>"
 + "    </div>"
 + "  </div>",
  function(component) {return { props:{ root:{ type:Object,
required:true
}
},
data() {try {
return { nombre_de_ley_seleccionada:null,
ley_seleccionada:undefined,
ley_seleccionada_descendencia:[  ]
};
} catch(error) {
console.log(error);
throw error;
}

},
methods:{ async obtener_ley_seleccionada(  ) {try {
if((!(typeof this.nombre_de_ley_seleccionada === 'string')) || this.nombre_de_ley_seleccionada.length === 0) {
return (await this.obtener_leyes_raiz(  ));
}
let sql = "";
sql += "SELECT * FROM Ley WHERE nombre = ";
sql += sqlstring.escape( this.nombre_de_ley_seleccionada );
sql += ";";
const resultado = (await this.root.$db.run( sql ));
this.ley_seleccionada = resultado[ 0 ];
this.$forceUpdate( true );
} catch(error) {
console.log(error);
throw error;
}

},
async obtener_descendencia_de_ley_seleccionada(  ) {try {
let sql = "";
sql += "SELECT * FROM Ley WHERE padre = ";
sql += sqlstring.escape( this.ley_seleccionada.nombre );
sql += ";";
const resultado = (await this.root.$db.run( sql ));
this.ley_seleccionada_descendencia = resultado;
this.$forceUpdate( true );
} catch(error) {
console.log(error);
throw error;
}

},
async obtener_leyes_raiz(  ) {try {
let sql = "";
sql += "SELECT * FROM Ley WHERE padre IS NULL;";
const resultado = (await this.root.$db.run( sql ));
this.ley_seleccionada_descendencia = resultado;
this.$forceUpdate( true );
} catch(error) {
console.log(error);
throw error;
}

},
async seleccionar_ley( nombre ) {try {
this.ley_seleccionada = undefined;
this.ley_seleccionada_descendencia = undefined;
this.nombre_de_ley_seleccionada = nombre;
(await this.actualizar_datos(  ));
this.$forceUpdate( true );
} catch(error) {
console.log(error);
throw error;
}

},
async actualizar_datos(  ) {try {
(await this.obtener_ley_seleccionada(  ));
this.$forceUpdate( true );
} catch(error) {
console.log(error);
throw error;
}

}
},
watch:{ nombre_de_ley_seleccionada( nuevo_valor ) {try {
if(typeof nuevo_valor === 'undefined') {
return;
}
return this.obtener_ley_seleccionada(  );
} catch(error) {
console.log(error);
throw error;
}

},
ley_seleccionada( nuevo_valor ) {try {
if(typeof nuevo_valor === 'undefined') {
return;
}
return this.obtener_descendencia_de_ley_seleccionada(  );
} catch(error) {
console.log(error);
throw error;
}

}
},
beforeMount() {
},
async mounted() {try {
(await setTimeout( () => {try {
this.seleccionar_ley( undefined );
} catch(error) {
console.log(error);
throw error;
}

},
1000 ));
} catch(error) {
console.log(error);
throw error;
}

}
};},
  null);
window.PaginaDeInicio = Castelog.metodos.un_componente_vue2("PaginaDeInicio",
  "<div class=\"PaginaDeInicio Component\">"
 + "    <NavegadorDeLey :root=\"root\" />"
 + "    <div class=\"window\">"
 + "      <div class=\"title-bar\">"
 + "        <div class=\"title-bar-text\">"
 + "          🌐 SiLe | Editor 🌐"
 + "        </div>"
 + "      </div>"
 + "      <div class=\"window-body has-space\">"
 + "        <div style=\"\">"
 + "          <textarea style=\"width: 100%;\" ref=\"entrada_de_texto\" v-model=\"entrada_de_texto\"></textarea>"
 + "          <button style=\"width:100%;\" v-on:click=\"ejecutar_sql\">▶ Ejecutar</button>"
 + "          <div class=\"error_box\" v-if=\"error\" v-on:click=\"limpiarError\">"
 + "            <div><b>Nombre:</b> {{ error.name }}</div>"
 + "            <div v-if=\"error.location\">"
 + "              <div><b>Localización:</b> {{ error.location }}</div>"
 + "              <div><b>Sugerencias:</b> {{ JSON.stringify(error.expected, null, 2) }}</div>"
 + "            </div>"
 + "            <div><b>Mensaje:</b> {{ error.message }}</div>"
 + "          </div>"
 + "          <div class=\"success_box\" v-if=\"ast && !error\">"
 + "            <pre style=\"overflow:scroll;\">{{ ast.toSQL.join(\"\\n\") }}</pre>"
 + "          </div>"
 + "        </div>"
 + "      </div>"
 + "    </div>"
 + "  </div>",
  function(component) {return { props:{ root:{ type:Object,
required:true
}
},
data() {try {
const texto_valido = this.root.obtener_ultimo_texto_valido(  );
return { cmEntrada:undefined,
entrada_de_texto:texto_valido,
ast:undefined,
error:false
};
} catch(error) {
console.log(error);
throw error;
}

},
methods:{ limpiarError() {try {
this.error = false;
this.$forceUpdate( true );
} catch(error) {
console.log(error);
throw error;
}

},
gestion_de_error( error ) {try {
this.error = error;
this.$forceUpdate( true );
} catch(error) {
console.log(error);
throw error;
}

},
async ejecutar_sql() {try {
const sile_script = this.cmEntrada.getValue(  );
const ast = this.root.$window.Sile_api.parser.parse( sile_script );
this.ast = ast;
const sentencias_sql = ast.toSQL;
const inicio = new Date(  );
let resultados = [  ];
for(let index = 0; index < sentencias_sql.length; index++) {let sql = "";
try {
sql = sentencias_sql[ index ];
const resultado = (await this.root.$db.run( sql ));
resultados.push( { sql,
resultado
} );
} catch(error) {
console.log("Error en la sentencia en memoria nº " + index + ":");
console.log(error);
error.message += " [sentence " + index + ": " + sql + "]";
throw error;}}
const finalizamiento = new Date(  );
const tardanza = finalizamiento - inicio;
this.script_de_salida = JSON.stringify(resultados, null, 2) + "\n\nRespuesta procesada en " + ( tardanza / 1000 ) + " segundos.";
this.root.guardar_ultimo_texto_valido( sile_script );
} catch(error) {
this.gestion_de_error( error );}
}
},
watch:{ 
},
beforeMount() {
},
mounted() {try {
this.cmEntrada = CodeMirror.fromTextArea( this.$refs.entrada_de_texto,
{ lineNumbers:true
} );
} catch(error) {
console.log(error);
throw error;
}

}
};},
  null);
window.App = Castelog.metodos.una_aplicacion_vue2(
  "App",
  "<div class=\"App Component Castelog-app win7\">"
 + "    <router-view :root=\"this\"></router-view>"
 + "  </div>",
  function(component) {return { data() {try {
return { 
};
} catch(error) {
console.log(error);
throw error;
}

},
methods:{ obtener_base_de_datos_de_operaciones_persistida() {try {
if((!(typeof window.localStorage.__sintaxis_legislativa_ui__ === 'string'))) {
window.localStorage.__sintaxis_legislativa_ui__ = JSON.stringify([ `
            CREATE TABLE Modificacion_de_ley (
              nombre VARCHAR(2048) UNIQUE,
              detalles TEXT
            );`,
`
            CREATE TABLE Ley (
              nombre VARCHAR(2048) UNIQUE,
              padre VARCHAR(2048),
              contenido TEXT,
              detalles TEXT,
              modificacion_de_ley VARCHAR(2048),
              FOREIGN KEY (modificacion_de_ley) REFERENCES Modificacion_de_ley (nombre)
            );` ], null, 2);
}
try {
JSON.parse(window.localStorage.__sintaxis_legislativa_ui__);
} catch(error) {
window.localStorage.__sintaxis_legislativa_ui__ = "[]";}
return JSON.parse(window.localStorage.__sintaxis_legislativa_ui__);
} catch(error) {
console.log(error);
throw error;
}

},
guardar_base_de_datos_de_comandos_persistida( datos ) {try {
window.localStorage.__sintaxis_legislativa_ui__ = JSON.stringify(datos, null, 2);
} catch(error) {
console.log(error);
throw error;
}

},
obtener_ultimo_texto_valido() {try {
if((!(typeof window.localStorage.__sintaxis_legislativa_ui__ultimo_texto_valido === 'string'))) {
window.localStorage.__sintaxis_legislativa_ui__ultimo_texto_valido = "";
}
return window.localStorage.__sintaxis_legislativa_ui__ultimo_texto_valido;
} catch(error) {
console.log(error);
throw error;
}

},
guardar_ultimo_texto_valido( nuevo_texto ) {try {
window.localStorage.__sintaxis_legislativa_ui__ultimo_texto_valido = nuevo_texto;
} catch(error) {
console.log(error);
throw error;
}

},
async actualizar_operaciones(  ) {try {
const operacions = this.obtener_base_de_datos_de_operaciones_persistida(  );
for(let index = 0; index < operacions.length; index++) {try {
const operacion = operacions[ index ];
console.log("Cargando operación " + index + "...");
(await this.$db.run( operacion,
false ));
} catch(error) {
console.log(error);}}
} catch(error) {
console.log(error);
throw error;
}

},
async generar_base_de_datos(  ) {try {
const sqlite3 = (await window.sqlite3InitModule(  ));
const db = new sqlite3.oo1.DB( "/sqlite_ui.sqlite3",
'ct' );
return { native:db,
run:( sql,
habilitar_historial = true ) => {try {
return new Promise( ( ok,
fail ) => {try {
const resultRows = [  ];
console.log("[SQL] " + sql);
const resultado = db.exec( { sql,
rowMode:"object",
returnValue:"resultRows"
} );
if(habilitar_historial && (!(( sql.trim(  ).toUpperCase(  ).startsWith( "SELECT" ) )))) {
const comandos = this.obtener_base_de_datos_de_operaciones_persistida(  );
comandos.push(sql)
this.guardar_base_de_datos_de_comandos_persistida( comandos );
}
return ok( resultado );
} catch(error) {
return fail( error );}
} );
} catch(error) {
console.log(error);
throw error;
}

}
};
} catch(error) {
console.log(error);
throw error;
}

}
},
watch:{ 
},
async beforeMount() {try {
this.$window = window;
this.$window.root = this;
this.$db = (await this.generar_base_de_datos(  ));
(await this.actualizar_operaciones(  ));
} catch(error) {
console.log(error);
throw error;
}

},
mounted() {
}
};},
  "html {}\n    body {}\n    .Component {}\n    .App {}\n",
  {},
  [ { path:"/",
name:"PaginaDeInicio",
component:PaginaDeInicio,
props:{ 
}
} ],
  { es:{ 
},
en:{ 
},
ca:{ 
}
},
  "#app");