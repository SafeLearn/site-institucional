function fazerLogin() {
    const loginUsuario = usuario.value
    const loginSenha = senha.value

    if (loginUsuario.length <= 0 || loginSenha.length <= 0) {
        alert("Preencha corretamente o formulário");
    } else {
        const dadosLogin = {
            loginUsuario: loginUsuario,
            loginSenha: loginSenha
        }
        entrar(dadosLogin);
    }
}

function entrar(dadosLogin) {
    fetch("login/logar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(
            dadosLogin
        )
    })
    .then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(json => {
            if (json && json.id) {
                sessionStorage.USER_NAME = dadosLogin.loginUsuario;
                sessionStorage.ID_USUARIO = json.id;

                setTimeout(function () {
                    window.location = `/monitorar?id=${json.id}`; // A desenvolver/aprovar
                }, 1000);
            } else {
                alert("Erro: ID do usuário não encontrado na resposta do servidor.");
                }
            });
        } else {
            resposta.json().then(json => {
                if (json && json.message) {
                    alert(json.message); 
                } else {
                    alert("Ocorreu um erro durante a autenticação."); 
                }
            });
        }
    })
    .catch(function (error) {
        console.log(error);
    });
    return false;
}

function alterarSenha() {
    window.location.href = "recuperarsenha.html";
}
