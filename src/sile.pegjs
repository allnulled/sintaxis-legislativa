Sintaxis_legislativa =
    _*
    cabecera:Cabecera
    sentencias:Sentencia*
    _*
        { return { cabecera, sentencias } }

Cabecera =
    token1:"Modificación de ley "
    titulo:Entrada_de_variable
    tokenZ:"."
        { return { titulo } }

Sentencia = sentencia:(
  Sentencia_de_crear_ley /
  Sentencia_de_actualizar_ley /
  Sentencia_de_eliminar_ley )
    {return sentencia;}

Sentencia_de_crear_ley =
    token1:(__ __)
    token2:("Se crea ley ")
    nombre:Entrada_de_variable
    padre:Subsentencia_con_padre?
    contenido:Subsentencia_con_contenido
        { return { tipo:"creación de ley", nombre, padre, contenido }}

Subsentencia_con_padre =
    token1:(_+ "con padre" _+ )
    padre:Entrada_de_variable
        { return padre }

Subsentencia_con_contenido = 
    token1:(_+ "con contenido" ":"? _+ )
    contenido:Entrada_hasta_nueva_sentencia
        { return contenido }

Sentencia_de_actualizar_ley =
    token1:(__ __)
    token2:("Se actualiza ley ")
    nombre:Entrada_de_variable
    contenido:Subsentencia_con_contenido
        { return { tipo: "actualización de ley", nombre, contenido } }

Sentencia_de_eliminar_ley =
    token1:(__ __)
    token2:("Se elimina ley ")
    nombre:Entrada_de_variable
    descendencia:" y toda su descendencia"?
    tokenZ:"."
        { return { tipo: "eliminación de ley", nombre, descendencia: descendencia ? true : false } }

Entrada_hasta_nueva_sentencia = (!(Sentencia).)+
        { return text() }

Entrada_de_variable = "<" (!(">>"/">").)+ ">"
        { return text() }

_ = __ / ___ {}
__ = "\r\n" / "\r" / "\n" {}
___ = " " / "\t" {}