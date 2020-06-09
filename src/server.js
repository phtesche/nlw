const express = require("express")
const server = express()

//pegar o banco de dados 
const db = require("./database/db.js")

//Configurar pasta publica
server.use(express.static("public"))

//habilitar o uso do req.body
server.use(express.urlencoded({ extended: true}))

//Utilizando template enine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

//Configurar caminhos da aplicação 
//Pagina inicial 
//get configura o caminho da aplicação
server.get("/", (req, res) => {
//req: Requisição / res: Resposta
    return res.render("index.html", {title: "Um titulo"})
})

server.get("/create-point", (req, res) => {
//req.query Query Strings da nossa url
//  console.log(req.query)

    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {

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
        req.body.name,
        req.body.image,
        req.body.contato,
        req.body.email,
        req.body.address,
        req.body.numero,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err) {
            if(err) {
                 console.log(err)
                 return res.send("Erro no cadastro")
            }
            console.log("Cadastrado com sucesso")
            console.log(this)

            return res.send("create-point.html", {save: true})

    }

    db.run(query, values, afterInsertData)

})

server.get("/search", (req, res) => {

    const search = req.query.search

    if(search == ""){
        //pesquisa vazia
        return res.render("search-results.html", {total: 0})
    }


        

    //pegar dados do banco de dados 
    db.all(`SELECT * FROM places WHERE city = '${search}'`, function (err, rows) {
        if(err) {
            return console.log(err)
        }

        const total = rows.length

        return res.render("search-results.html", { places: rows, total: total })

    })
})


//ligar o servidor 
server.listen(3000)
