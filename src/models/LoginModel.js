const mongoose = require('mongoose');
var validator = require("email-validator");
var bcrypt = require('bcryptjs');

const LoginSchema = new mongoose.Schema({
  email: { type: String, required: true },
  senha: { type: String, required: true },
});

const loginModel = mongoose.model('Login', LoginSchema);

class Login {
    constructor(body){
        this.body = body;
        this.errors = [];
        this.user = null;
    }

   async register(){
        this.valida()
        if(this.errors.length > 0){return}

        await this.existeUsuario()

        if(this.errors.length > 0){return}

        //Criar um hash para a senha
        var salt = bcrypt.genSaltSync(10)
        this.body.senha = bcrypt.hashSync(this.body.senha, salt);

         this.user = await loginModel.create(this.body)
    }

    async entra(){
    
        this.user = await loginModel.findOne({ email: this.body.email });
        if(!this.user){ this.errors.push("Não existe usuario com esse email") 
          return}

        console.log(bcrypt.compareSync(this.body.senha, this.user.senha))
        console.log(this.user)  
        if(!bcrypt.compareSync(this.body.senha, this.user.senha)){
          this.errors.push("Senha incorreta")
          this.user = null
            return
        }
  }

    async existeUsuario(){
      try{
      const userEmail = await loginModel.findOne({ email: this.body.email });
      console.log(userEmail)
      if(userEmail && userEmail.email === this.body.email) {
        this.errors.push("Já existe um usuario com esse email")
        console.log(this.errors)
      }
      }catch(e){
        console.log(e)
      }

    }

    valida(){
      this.cleanUp()
      //Verificar se email é validaor usando o pacote email-validator
      if(!validator.validate(this.body.email)) {this.errors.push("Esse email não é valido")}
      //Verificar se o tamanho da senha. deve estar entre 3 a 25 caracteres
      if(this.body.senha.length < 3 || this.body.senha.length > 25) {this.errors.push("Tamanho da senha deve estar entre 3 a 25 caracteres")}
    }


    //Verificar se contem tipos que não são strings
    cleanUp(){
      for(const key in this.body){
        if(typeof key != 'string'){
          this.body[key] = ''
        }
      }

      this.body = {
        email:this.body.email,
        senha:this.body.senha
      }
    }
}

module.exports = Login;
