function FinalizarCadastro() {

    const nomeInstituicao = nomeInst.value;
    const cepInstituicao = cep.value;
    const estadoInstituicao = estado.value;
    const cidadeInstituicao = cidade.value;
    const ruaInstituicao = rua.value;
    const numeroEnderecoInstituicao = num.value;
    const emailInstituicao = emailInst.value;
    const telefoneInstituicao = telefoneInst.value;
    const cnpjInstituicao = cnpj.value;

    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i

    if (nomeInstituicao == "" || cepInstituicao == "" || estadoInstituicao == "" ||
        cidadeInstituicao == "" || ruaInstituicao == "" || numeroEnderecoInstituicao
        == "" || emailInstituicao == "" || telefoneInstituicao == "" || cnpjInstituicao == "") {
        alert("Você não pode deixar nenhum campo em branco!");
    } else if (numeroEnderecoInstituicao <= 0) {
        alert("O número do endereço não é válido!");
    } else if (cepInstituicao.length < 8 || cepInstituicao.length > 8) {
        alert("Insira um CEP válido");
    } else if (estadoInstituicao.length < 2 || estadoInstituicao.length > 2) {
        alert("Insira um estado válido!")
    } else if (!emailRegex.test(emailInstituicao)) {
        alert("E-mail incorreto!");
    } else if (cnpjInstituicao.length != 14) {
        alert("Insira um CNPJ válido!");
    } else if (telefoneInstituicao.length <= 10 || telefoneInstituicao.length >= 14) {
        alert("Insira um telefone válido!");
    } else {
        const dadosInstituicao = {
            nomeInstituicao: nomeInstituicao,
            cepInstituicao: cepInstituicao,
            estadoInstituicao: estadoInstituicao,
            cidadeInstituicao: cidadeInstituicao,
            ruaInstituicao: ruaInstituicao,
            numeroEnderecoInstituicao: numeroEnderecoInstituicao,
            emailInstituicao: emailInstituicao,
            telefoneInstituicao: telefoneInstituicao,
            cnpjInstituicao: cnpjInstituicao
        }
        cadastrarInstituicao(dadosInstituicao);
    }
}

function cadastrarInstituicao(dadosInstituicao) {
    fetch("cadastro/instituicao", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(
            dadosInstituicao
        ),
    })
    .then(function (resposta) {
        if(resposta.ok) {
            window.location = "/logar";
        }
    })
    .catch(function (resposta) {
        console.log("Erro: " + resposta)
    });

    return false;
}