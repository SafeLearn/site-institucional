function Continuar() {
    const emailPessoal = emailPessoa.value;
    const loginSenha = senha.value;
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    const nomeResp = nomeResponsavel.value;
    const telResp = telPessoal.value;
    const selectCargo = cargo.value;

    if (emailPessoal.length <= 0 || loginSenha.length <= 0 || nomeResp.length <= 0 || telResp.length <= 0) {
        alert("Preencha corretamente o formulário");
    } else if (!emailRegex.test(emailPessoal)) {
        alert("Insira um e-mail válido, contendo @, números e .com ");
    } else if (telResp.length <= 8 || telResp.length >= 13) {
        alert("Insira um número de telefone válido!");
    }else {
        window.location.href = "cadastroInstitucional.html";
    };




}