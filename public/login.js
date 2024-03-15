function fazerLogin() {
    const loginUsuario = usuario.value
    const loginSenha = senha.value

    const admin = "SafeLearn"
    const senhaAdmin = "SafeLearn123"

    if (loginUsuario.length <= 0 || loginSenha.length <= 0) {
        alert("Preencha corretamente o formulário")
    }else if (loginUsuario != admin || loginSenha != senhaAdmin) {
        alert("Login ou senha incorretos!")
    }
}