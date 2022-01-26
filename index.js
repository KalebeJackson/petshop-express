const express = require('express')
const methodOverride = require('method-override')
const petsRouter = require('./routes/pets')
const servicosRouter = require('./routes/servicos')
const {body, check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt')
const fs = require('fs')
var usuarios = ('/usuarios.json')

const { get } = require('./routes/pets');
const { json } = require('express');
const { findSourceMap } = require('module');
const app = express()

app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(methodOverride ('_method'))


app.use(express.static('public'))
app.set('view engine', 'ejs')

app.use(petsRouter)
app.use(servicosRouter)


app.get('/', (req, res) => {
    return res.render('index')
})

app.get('/contato', (req, res) => {
    return res.render('contato')
})

app.get('/sobre', (req, res) => {
    return res.render('sobre')
})

app.get('/login', (req, res) => {
    return res.render('login')
})

app.get('/usuarios', (req, res) => {
    return res.render(usuarios)
})

app.get('/cadastroCliente', (req, res) => {
    return res.render('cadastroCliente')
})

app.get('/cadastro', (req, res) => {
    return res.render('cadastro')
})


app.post('/contato', [
    body('nome').isLength({min : 3}),
    body('mensagem'),
    body('email')
],
(req, res) => {   
    const erros = validationResult(req)

    if (!erros.isEmpty()) {
    return res.status(400).json({ erros: erros.array() });
    }

    console.log(erros)
    return res.json(req.body)
})



app.post('/cadastro', [
    body('nome').isLength({min : 3}),
    body('valor').isNumeric(true)],
    
    //app.use((req, res, next) => {
        
        //continuar aqui(criar validação usando o req)
    //}),

    (req, res) => {   
        const erro = validationResult(req)

    if (!erro.isEmpty()) {
        return res.status(400).json({ erro: erro.array() });
    }

    console.log(erro)
    return res.json(req.body)
})


app.post('/cadastroCliente', 
[
    check('nome').isLength({min : 3}),
    check('senha'),
    check('email')
],
(req, res) => {
    const erros = validationResult(req)
    const {nome, email, senha} = req.body;

    if (!erros.isEmpty()) {
    return res.status(400).json({ erros: erros.array() });
    }
    
    let content = fs.readFileSync("usuarios.json", "utf8")
    const usuarios = JSON.parse(content) 
    const hash = bcrypt.hashSync(senha, 2)

    usuarios.push({nome, email, senha: hash})
    
    content = JSON.stringify(usuarios)
    fs.writeFileSync("usuarios.json", content, "utf8")
    return res.json(hash)
})   
    
app.post('/login',[
    check('email'),
    check('senha')
],
    (req, senha, email) => {
        var resultado = bcrypt.compareSync(senha, req.senha);
if (resultado) {
    console.log("senha correta");
} else {
    console.log("senha incorreta");
}

let content = fs.readFileSync("usuarios.json", "utf8")
const usuarios = JSON.parse(content) 
const hash = bcrypt.hashSync(senha, 2)

usuarios.push({email, senha: hash})

content = JSON.stringify(usuarios)
fs.writeFileSync("usuarios.json", content, "utf8")
return res.json(hash)
    }
    )



app.listen(3000, () => {
    console.log('Servidor rodando')
})

