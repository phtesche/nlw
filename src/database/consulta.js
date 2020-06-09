db.run(`DELETE FROM places WHERE id = ?` , [4], function(err) {
    if(err) {
        return console.log(err)
     }

    console.log("Registro deletado com sucesso!")
 })

 db.all(`SELECT name FROM places`, function(err, rows) {
    if(err) {
      return console.log(err)
  }

      console.log("Aqui estão seus registros: ")
      console.log(rows)
  })
 