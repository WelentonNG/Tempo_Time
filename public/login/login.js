let Credentials = {
    Login: 'admin',
    Password: '1234'
}
const PageClima = '/clima/index.html'

let InputLogin = document.getElementById('InputLogin')
let InputPassword = document.getElementById('inputPassword')
let loginForm = document.getElementById('loginForm')


loginForm.addEventListener('submit', login)

function login(event) {
    event.preventDefault() 

    let usuario = InputLogin.value
    let senha = InputPassword.value

    if (usuario === Credentials.Login && senha === Credentials.Password) {

        localStorage.setItem("logado", "true")
        window.location.href = PageClima

    } else {
        console.log("Houve algum problema de login, contate o administrador")
        alert("Login inválido")
    }
}

