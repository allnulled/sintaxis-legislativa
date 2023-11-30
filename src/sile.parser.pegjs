{
    const reducir_se_crea_ley = function(sentencia) {
        const salida = {...sentencia};
        const { nombre, padre, contenido } = sentencia;
        salida.toSQL = function(cabecera) {
            let sql = "";
            sql += "";
            sql += "INSERT INTO Ley (nombre, padre, contenido, modificacion_de_ley) VALUES (\n";
            sql += "  " + sqlstring.escape(nombre) + ",\n";
            sql += "  " + sqlstring.escape(padre) + ",\n";
            sql += "  " + sqlstring.escape(contenido) + ",\n";
            sql += "  " + sqlstring.escape(cabecera ? cabecera.titulo : "") + "\n";
            sql += ");";
            return [sql];
        };
        return salida;
    };
    const reducir_se_actualiza_ley = function(sentencia) {
        const salida = {...sentencia};
        salida.toSQL = function() {
            const { nombre, contenido } = sentencia;
            let sql = "";
            sql += "";
            sql += "UPDATE Ley SET \n";
            sql += "  contenido = ";
            sql += sqlstring.escape(contenido);
            sql += "\nWHERE nombre = ";
            sql += sqlstring.escape(nombre);
            sql += ";";
            return [sql];
        };
        return salida;
    };
    const reducir_se_elimina_ley = function(sentencia) {
        const salida = {...sentencia};
        salida.toSQL = function() {
            const { nombre, descendencia } = sentencia;
            const sqls = [];
            if(descendencia) {
                let sql1 = "";
                sql1 += "";
                sql1 += "DELETE FROM Ley WHERE padre = ";
                sql1 += sqlstring.escape(nombre);
                sql1 += ";";
                sqls.push(sql1);
            }
            let sql2 = "";
            sql2 += "DELETE FROM Ley WHERE nombre = ";
            sql2 += sqlstring.escape(nombre);
            sql2 += ";";
            sqls.push(sql2);
            return sqls;
        };
        return salida;
    };
    const reducir_modificacion_de_ley = function(modificacion) {
        const { titulo } = modificacion;
        const salida = {...modificacion};
        salida.toSQL = function() {
            let sql = "";
            sql += "";
            sql += "INSERT INTO Modificacion_de_ley ('contenido') VALUES (\n";
            sql += sqlstring.escape(titulo);
            sql += "\n);";
            sql += "";
            sql += "";
            return [sql];
        };
        return salida;
    };
    const reducir_bloque = function(bloque) {
        const { cabecera, sentencias } = bloque;
        let sqls = [];
        if(cabecera) {
            let sql = "";
            sql += "";
            sql += "INSERT INTO Modificacion_de_ley (nombre) VALUES (\n";
            sql += "  " + sqlstring.escape(cabecera.titulo);
            sql += "\n);";
            sql += "";
            sqls.push(sql);
        }
        for(let index=0; index<sentencias.length; index++) {
          const sentencia = sentencias[index];
          const subsentencias = sentencia.toSQL(cabecera);
          for(let index_subs=0; index_subs<subsentencias.length; index_subs++) {
            const subsentencia = subsentencias[index_subs];
            let sql = "";
            sql += subsentencia;
            sql += "\n";
            sqls.push(sql);
          }
        }
        bloque.toSQL = sqls;
        return bloque;
    };
    const reducir_sintaxis = function(sintaxis) {
        const salida = {...sintaxis};
        const sqls = [];
        for(let index_bloque=0; index_bloque<sintaxis.ast.length; index_bloque++) {
          const bloque = sintaxis.ast[index_bloque];
          const subsentencias = bloque.toSQL;
          for(let index_subs=0; index_subs<subsentencias.length; index_subs++) {
            const subsentencia = subsentencias[index_subs];
            sqls.push(subsentencia);
          }
        }
        salida.toSQL = sqls;
        return salida;
    };
}

Sintaxis_legislativa = ast:Bloque* { return reducir_sintaxis({ ast }) }

Bloque =
    _*
    cabecera:Cabecera?
    sentencias:Sentencia+
    _*
        { return reducir_bloque({ cabecera, sentencias }) }

Cabecera =
    token0:_*
    token1:"Modificación de ley "
    titulo:Entrada_de_variable
    tokenZ:"."
        { return reducir_modificacion_de_ley({ titulo }) }

Sentencia = sentencia:(
  Sentencia_de_crear_ley /
  Sentencia_de_actualizar_ley /
  Sentencia_de_eliminar_ley )
    {return sentencia;}

Sentencia_de_crear_ley = 
    token0:_*
    token2:("Se crea ley ")
    nombre:Entrada_de_variable
    padre:Subsentencia_con_padre?
    contenido:Subsentencia_con_contenido
        { return reducir_se_crea_ley({ tipo:"creación de ley", nombre, padre, contenido }); }

Subsentencia_con_padre =
    token1:(_+ "con padre" _+ )
    padre:Entrada_de_variable
        { return padre }

Subsentencia_con_contenido = 
    token1:(_+ "con contenido" ":"? _+ )
    contenido:Entrada_hasta_nueva_sentencia
        { return contenido }

Sentencia_de_actualizar_ley = 
    token0:_*
    token2:("Se actualiza ley ")
    nombre:Entrada_de_variable
    contenido:Subsentencia_con_contenido
        { return reducir_se_actualiza_ley({ tipo: "actualización de ley", nombre, contenido }) }

Sentencia_de_eliminar_ley = 
    token0:_*
    token2:("Se elimina ley ")
    nombre:Entrada_de_variable
    descendencia:" y toda su descendencia"?
    tokenZ:"."
        { return reducir_se_elimina_ley({ tipo: "eliminación de ley", nombre, descendencia: descendencia ? true : false }) }

Entrada_hasta_nueva_sentencia = (!(Sentencia/Cabecera).)+
        { return text() }

Entrada_de_variable = "<" (!(">>"/">").)+ ">"
        { return text() }

_ = __ / ___ {}
__ = "\r\n" / "\r" / "\n" {}
___ = " " / "\t" {}