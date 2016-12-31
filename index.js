(function() {

  var db = SQL({ name: 'DataBase' });

  var Table = null;

  db.createTable({ tableName: 'ejemplo', fields: ['id', 'campo', 'date'] }, function (res) {

    Table = res;

    res.insert([
              { id: 1, campo: 'Ejemplo ', date: new Date().getTime() },
              { id: 2, campo: 'Ejemplo ', date: new Date().getTime() },
              { id: 3, campo: 'Ejemplo ', date: new Date().getTime() },
              { id: 4, campo: 'Ejemplo 2', date: new Date().getTime() },
              { id: 5, campo: 'Ejemplo 2', date: new Date().getTime() },
              { id: 6, campo: 'Ejemplo 2', date: new Date().getTime() },
              { id: 7, campo: 'Ejemplo 3', date: new Date().getTime() },
              { id: 8, campo: 'Ejemplo 3', date: new Date().getTime() },
              { id: 9, campo: 'Ejemplo 3', date: new Date().getTime() }
              ]);
    
    // Actualiza la fila con id 9
    res.update({ id: 9 }, { campo: 'Ejemplo 4', date: new Date().getTime() });
    // Obtiene 3 valores
    res.getVal({ campo: 'Ejemplo 3' });
    // Obtiene todos los valores en un array
    res.getVal();
    // Elimina una fila
    res.deleted({ id: 1, campo: 'Ejemplo ' });
    // Elimina las filas con id 2 y 3
    res.deleted({ id: { OR: [2, 3] } });
    // Elimina las filas con id 4, 5 y 6
    res.deleted({ campo: 'Ejemplo 2' });
    // No elimina ninguna celda
    res.deleted({ id: { AND: [7, 8] } });
    // Elimina las filas con id 7 y 8, la fila con id queda ya que se actualizó a "Ejemplo  4"
    res.deleted({ id: { OR: [4, 5, 6, 7, 8, 9] }, campo: 'Ejemplo 3' });
  });

  // O puedo llamarlo desde otro lado con el objecto
  // Y además todas las funciones tienen callback
  setTimeout(function(){

    // Se inserta una nueva fila, puedo pasarle la función success solamente
    Table.insert({ id: 10, campo: 'Ejemplo 4', date: new Date().getTime() }, function(tx, res){

      console.log('Se insertó '+ res.rowsAffected +' celda nueva ');

    });

    // O pasarle un atributo null
    Table.deleted({ campo: 'Ejemplo 4' }, function(tx, res){

      console.log(" Se eliminaron " + res.rowsAffected + " celdas");

    }, null )

    // Esto dará un error porque no existe una fila con campo "campo1"
    Table.deleted({ campo1: 'Ejemplo 4' }, null, function(tx, err){

      alert(
        "Código del error: "+ err.code +"\n"+
        "Mensaje de error: "+ err.message
        );

    })

  },5000)


})();
