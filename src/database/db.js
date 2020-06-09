//Inportar a dependecia do sqlite3
const sqlite3 = require("sqlite3").verbose()

//Criar que ira fazer operaçoes  no Objeto de banco de dados 
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db 
 /*
 //Utillizar o objeto de banco de dados para nossas aplicação
db.serialize(() => {
    //criar uma tabela
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
            name TEXT,
            image TEXT,
            contato NUMBER,
            email TEXT,
            address TEXT,
            numero NUMBER,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `)

    //Inserir dados na tabela 
    const query = `
    INSERT INTO places (
        name,
        image,
        contato,
        email,
        address,
        numero,
        address2,
        state,
        city,
        items
    ) VALUES (?,?,?,?,?,?,?,?,?,?);
`

    const values = [
        "Colectoria",
        "URL",
        "2334561900",
        "atendimento@colectoria",
        "Guilherme Genbala, Jardim America",
        "675",
        "Galpão 13",
        "Santa catarina",
        "Rio do Sul",
        "Residos eletronicos e lampadas"
    ]

    function afterInsertData(err) {

        db.run(query, function (err) {
            if(err) {
                return console.log(err)
            }
            console.log("Cadastrado com sucesso")
            console.log(this)
        })

    }

    db.run(query, values, afterInsertData)


/*

    //deletar dados da tabela 
    db.run(`DELETE FROM places WHERE id = ?` , [1], function(err) {
       if(err) {
           return console.log(err)
        }

       console.log("Registro deletado com sucesso!")
    })

     //Consultar dados da tabela 
   db.all(`SELECT name FROM places`, function(err, rows) {
     if(err) {
       return console.log(err)
   }

       console.log("Aqui estão seus registros: ")
       console.log(rows)
   })
})


db.all(`SELECT name FROM places`, function(err, rows) {
    if(err) {
      return console.log(err)
  }

      console.log("Aqui estão seus registros: ")
      console.log(rows)
  })
})
 
*/
db.all(`SELECT name, city, state FROM places`, function(err, rows) {
    if(err) {
      return console.log(err)
  }

      console.log("Aqui estão seus registros: ")
      console.log(rows)
  })

