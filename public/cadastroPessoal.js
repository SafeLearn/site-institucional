function Continuar() {
    const loginUsuario = usuario.value
    const loginSenha = senha.value
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i
    const nomeCompPessoal = nomeComp.value
    const telPessoal = telPessoal.value

    if (loginUsuario.length <= 0 || loginSenha.length <= 0 || nomeCompPessoal.length <= 0 || telPessoal.length <= 0) {
        alert("Preencha corretamente o formulário")
    }else if (!emailRegex.test(emailInstituicao)) {
        alert("Insira um e-mail válido, contendo @, números e .com ")
    }
    window.location.href = "cadastroInstitucional.html";
}