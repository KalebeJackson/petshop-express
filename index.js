const express = require('express')

const { get } = require('./routes/pets')
const app = express()

const methodOverride = require('method-override')
const petsRouter = require('./routes/pets')
const servicosRouter = require('./routes/servicos')

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

app.get('/cadastro', (req, res) => {
    return res.render('cadastro')
})

// app.get('/servicos/cadastro', (req, res) => {
//     return res.render('servicosCadastro')
// })

app.listen(3000, () => {
    console.log('Servidor rodando')
})
