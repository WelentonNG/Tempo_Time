const express = require('express')
const path = require('path')
const conexao = require('./conexao')

const app = express()
const PORT = 3000

// Caminho da pasta public
const publicPath = path.join(__dirname, '..', 'public')

// Caminho do arquivo login
const loginAqv = path.join(__dirname, '..', 'public', 'login', 'login.html')

// Parsear JSON no body das requisições
app.use(express.json())

// Servir arquivos estáticos
app.use(express.static(publicPath))

// Rota principal
app.get('/', (req, res) => {
    res.sendFile(loginAqv)
})

// Rota de login
app.post('/login', (req, res) => {
    const { login, senha } = req.body

    if (!login || !senha) {
        return res.status(400).json({ erro: 'Login e senha são obrigatórios.' })
    }

    const sql = 'SELECT id, login FROM usuarios WHERE login = ? AND senha = ?'
    conexao.query(sql, [login, senha], (err, resultados) => {
        if (err) return res.status(500).json({ erro: 'Erro no servidor.' })

        if (resultados.length === 0) {
            return res.status(401).json({ erro: 'Login ou senha inválidos.' })
        }

        res.json({ sucesso: true, usuario: resultados[0] })
    })
})

// Rota de cadastro
app.post('/cadastro', (req, res) => {
    const { login, senha } = req.body

    if (!login || !senha) {
        return res.status(400).json({ erro: 'Login e senha são obrigatórios.' })
    }

    const sql = 'INSERT INTO usuarios (login, senha) VALUES (?, ?)'
    conexao.query(sql, [login, senha], (err) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ erro: 'Esse usuário já existe.' })
            }
            return res.status(500).json({ erro: 'Erro ao criar conta.' })
        }

        res.json({ sucesso: true })
    })
})

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})