const mongoose = require('mongoose');
var validator = require("email-validator");

const ContatoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  sobrenome: { type: String },
  email: { type: String},
  telefone: { type: String},
});

const contatoModel = mongoose.model('Contato', ContatoSchema);

class Contato {
    constructor(body){
        this.body = body;
        this.errors = [];
        this.user = null;
    }

   async register(){
        this.valida()
        if(this.errors.length > 0){return}

         this.user = await contatoModel.create(this.body)
    }

    valida(){
      this.cleanUp()
      console.log(this.body)
      if(!this.body.nome)  {this.errors.push("O contato precisa de um nomer")}

      if(this.body.email && !validator.validate(this.body.email)) {this.errors.push("Esse email não é valido")}
      
      if(!this.body.email && !this.body.telefone) {this.errors.push("O contato precisar um email ou número")}
    }


    //Verificar se contem tipos que não são strings
    cleanUp(){
      for(const key in this.body){
        if(typeof key != 'string'){
          this.body[key] = ''
        }
      }

      this.body = {
        nome:this.body.nome,
        sobrenome:this.body.sobrenome,
        email:this.body.email,
        telefone:this.body.telefone
      }
    }
}

module.exports = Contato;
