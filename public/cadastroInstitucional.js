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
        alert("Você não pode deixar nenhum campo em branco!")
    } else if (numeroEnderecoInstituicao <= 0) {
        alert("O número do endereço não é válido!")
    } else if (cepInstituicao.length < 8 || cepInstituicao.length > 8) {
        alert("Insira um CEP válido");
    } else if (estadoInstituicao.length < 2 || estadoInstituicao.length > 2) {
        alert("Insira um estado válido!")
    } else if (!emailRegex.test(emailInstituicao)) {
        alert("E-mail incorreto!")
    } else if (cnpjInstituicao.length != 14) {
        alert("Insira um CNPJ válido!")
    } else if (telefoneInstituicao.length != 9 || telefoneInstituicao.length != 10) {
        alert("Insira um telefone válido!")
    }else {
        alert("Cadastro realizado!")
    }
}