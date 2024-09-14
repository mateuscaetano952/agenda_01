const mongoose = require('mongoose');
var validator = require("email-validator");

const ContatoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  sobrenome: { type: String },
  email: { type: String},
  telefone: { type: String},
  criadoEm: { type: Date, default: Date.now},
});

const contatoModel = mongoose.model('Contato', ContatoSchema);

class Contato {
    constructor(body){
        this.body = body;
        this.errors = [];
        this.contato = null;
    }

   async register(){
        this.valida()
        if(this.errors.length > 0){return}

         this.contato = await contatoModel.create(this.body)
    }


   async edit(){
    this.valida()
    if(this.errors.length > 0){return}

     this.contato = await contatoModel.updateOne(
      { _id: this.contato._id },
      { $set: { name: this.contato.nome,sobrenome: this.contato.sobrenome, email: this.contato.email,telefone: this.contato.telefone } }
     )
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

   static async procurarId(UrlParams){
    if(typeof UrlParams !== 'string') return
      const contato = await contatoModel.findOne({_id: UrlParams}); 
      return contato
   }

   static async listaContatos (){
      const contatos = await contatoModel.find(); 
      return contatos
   }

   static async delete(UrlParams){
    if(typeof UrlParams !== 'string') return
      const contato = await contatoModel.deleteOne({_id: UrlParams}); 
      return contato
   }
}

module.exports = Contato;
