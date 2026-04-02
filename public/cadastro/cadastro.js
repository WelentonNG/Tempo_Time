let InputLogin           = document.getElementById('InputLogin')
let InputPassword        = document.getElementById('inputPassword')
let InputConfirmPassword = document.getElementById('inputConfirmPassword')
let cadastroForm         = document.getElementById('cadastroForm')

cadastroForm.addEventListener('submit', cadastrar)

async function cadastrar(event) {
    event.preventDefault()

    const login = InputLogin.value.trim()
    const senha = InputPassword.value
    const confirmSenha = InputConfirmPassword.value

    if (senha !== confirmSenha) {
        alert('As senhas não coincidem.')
        return
    }

    try {
        const resposta = await fetch('/cadastro', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ login, senha })
        })

        const dados = await resposta.json()

        if (resposta.ok && dados.sucesso) {
            alert('Conta criada com sucesso!')
            window.location.href = '/'
        } else {
            alert(dados.erro || 'Erro ao criar conta.')
        }
    } catch (err) {
        alert('Erro ao conectar com o servidor.')
    }
}
