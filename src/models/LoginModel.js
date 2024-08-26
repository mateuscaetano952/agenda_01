const mongoose = require('mongoose');
var validator = require("email-validator");

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

         this.user = await loginModel.create(this.body)
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
