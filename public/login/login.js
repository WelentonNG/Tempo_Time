const PageClima = '/clima/index.html'

let InputLogin = document.getElementById('InputLogin')
let InputPassword = document.getElementById('inputPassword')
let loginForm = document.getElementById('loginForm')


loginForm.addEventListener('submit', login)

async function login(event) {
    event.preventDefault()

    const usuario = InputLogin.value
    const senha = InputPassword.value

    try {
        const resposta = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ login: usuario, senha: senha })
        })

        const dados = await resposta.json()

        if (resposta.ok && dados.sucesso) {
            localStorage.setItem('logado', 'true')
            window.location.href = PageClima
        } else {
            alert(dados.erro || 'Login inválido')
        }
    } catch (err) {
        alert('Erro ao conectar com o servidor.')
    }
}

