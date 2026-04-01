const express = require('express')
const path = require('path')

const app = express()
const PORT = 3000

// Caminho da pasta public
const publicPath = path.join(__dirname, '..', 'public')

// Caminho do arquivo login
const loginAqv = path.join(__dirname, '..', 'public', 'login', 'login.html')

// Servir arquivos estáticos
app.use(express.static(publicPath))

// Rota principal
app.get('/', (req, res) => {
    res.sendFile(loginAqv)
})

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})