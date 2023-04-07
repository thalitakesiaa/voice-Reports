const resetPass = (name, newPass) => `
        <div>
            <div style = "width: 70%; padding: 6px; border: 1px solid #202980; background-color: #202980;
                      border-radius: 3px; flex-direction: column; box-shadow: 2px 2px 1px #202980;
                      padding: 20px 80px; text-align: center; margin-left: auto; margin-right: auto;">
            
                <h1 style="text-align: center; color: white; margin-top: 0px">Redefinição de Senha do VoiceReports</h1>
                <h3 style="color: white; margin: 5px 0px">Olá, ${name}? <br></h3>
                <p style="color: white; margin: 5px 0px"><br>Esqueceu sua senha? Não precisa se preocupar...</p>
                <p style="color: white; margin: 5px 0px">Nós criamos uma nova senha para você!<br></p>
                <p style="color: white; margin: 5px 0px"><br>NOVA SENHA: <b>${newPass}</b></p>
                <p style="color: white; margin: 5px 0px 5px 0px">Ao logar com essa nova senha você deverá alterá-la!</p>
                <p style="color: white; margin: 5px 0px"><br> Por favor não responda esse email </p>
                <p style="color: white; margin: 5px 0px">Atenciosamente, <br> </p>
                <p style="color: white; margin: 5px 0px">Equipe VoiceReports</p>
            
            </div>
        </div>
    `;

module.exports = resetPass;
