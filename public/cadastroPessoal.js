function Continuar() {
    const emailPessoal = emailPessoa.value;
    const loginSenha = senha.value;
    const nomeResp = nomeResponsavel.value;
    
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

    if (emailPessoal.length <= 0 || loginSenha.length <= 0 || nomeResp.length <= 0) {
        alert("Preencha corretamente o formulário");
    } else if (!emailRegex.test(emailPessoal)) {
        alert("Insira um e-mail válido, contendo @, números e .com ");
    } else {
        const dadosPessoal = {
            nomePessoal: nomeResp,
            emailPessoal: emailPessoal,
            senhaPessoal: loginSenha,
        }
        cadastrarUsuario(dadosPessoal);
    }
}

function cadastrarUsuario(dadosPessoal) {
    fetch("cadastro/usuario", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(
            dadosPessoal
        ),
    })
    .then(function (resposta) {
        if(resposta.ok) {
            window.location = "/logar";
        }
    })
    .catch(function (resposta) {
        console.log("Erro: " + resposta);
    });

    return false;
}