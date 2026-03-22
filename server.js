const express = require('express')
const path = require('path')

const app = express()
const PORT = 3000

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')))

// Rota pricipal
app.get('/', (req, res) => {
    res.sendfile(path.join(__dirname , 'public', 'index.html'))
})

// Inciar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http//localhost:${PORT}`)
})