function confirmarEmail() {
    const mail1 = email.value;
    const emailConfirmar = cmail.value;

    if (mail1 != emailConfirmar) {
        alert("Os e-mails estão diferentes!")
    }
    else{
        alert("O código foi enviado!")
    }

}