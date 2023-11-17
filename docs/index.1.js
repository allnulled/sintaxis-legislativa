
// [castelog:html5izable] ACTIVADO con: {"autor":"allnulled","nombre":"index","version":"1","contenido":{"head":"<head>\n    <title>🌐 SiLe | Editor</title>\n    <meta charset=\"utf8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n    <link rel=\"stylesheet\" type=\"text/css\" href=\"lib/win7/win7.scoped.2.css\" />\n    <link rel=\"stylesheet\" type=\"text/css\" href=\"lib/codemirror/codemirror.css\" />\n    <script src=\"lib/calo/calo.js\"></script>\n    <script src=\"lib/codemirror/codemirror.js\"></script>\n    <script src=\"lib/sile/sile.js\"></script>\n    <style>\n      .error_box {\n        background-color: red;\n        color: white;\n        padding: 4px;\n        cursor: pointer;\n      }\n    </style>\n</head>","body":"<body><div id=\"app\"></div></body>"}}

window.PaginaDeInicio = Castelog.metodos.un_componente_vue2("PaginaDeInicio",
  "<div class=\"PaginaDeInicio Component\">"
 + "    <div class=\"window\">"
 + "      <div class=\"title-bar\">"
 + "        <div class=\"title-bar-text\">"
 + "          🌐 SiLe | Editor"
 + "        </div>"
 + "      </div>"
 + "      <div class=\"window-body has-space\">"
 + "        <textarea style=\"width: 100%;\" ref=\"entrada_de_texto\"></textarea>"
 + "        <button style=\"width:100%;\" v-on:click=\"validarTexto\">Validar</button>"
 + "        <div class=\"error_box\" v-if=\"error\" v-on:click=\"limpiarError\">"
 + "          <div>Nombre: {{ error.name }}</div>"
 + "          <div v-if=\"error.location\">"
 + "            <div>Localización: {{ error.location.start.offset }}-{{error.location.end.offset}}</div>"
 + "            <div>Localización: {{ error.location.start.line }}:{{error.location.start.column}}-{{ error.location.end.line }}:{{error.location.end.column}}</div>"
 + "            <div>Sugerencias: {{ JSON.stringify(error.expected, null, 2) }}</div>"
 + "          </div>"
 + "          <div>Mensaje: {{ error.message }}</div>"
 + "          <div>Pila: {{ error.stack }}</div>"
 + "        </div>"
 + "        <div class=\"success_box\" v-if=\"ast && !error\">"
 + "          <pre style=\"word-wrap: anywhere; white-space: pre-wrap;\">{{ JSON.stringify(ast) }}</pre>"
 + "        </div>"
 + "      </div>"
 + "    </div>"
 + "  </div>",
  function(component) {return { props:{ root:{ type:Object,
required:true
}
},
data() {try {
return { cmEntrada:undefined,
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
gestionarError( error ) {try {
this.error = error;
this.$focreUpdate( true );
} catch(error) {
console.log(error);
throw error;
}

},
validarTexto() {try {
const valorDeEntrada = this.cmEntrada.getValue(  );
const ast = this.$window.Sile_parser.parse( valorDeEntrada );
this.ast = ast;
} catch(error) {
this.gestionarError( error );}
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
methods:{ 
},
watch:{ 
},
beforeMount() {try {
this.$window = window;
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