const Contato = require('../models/ContatoModel')

exports.index = function (req, res){
    res.render("contato")
}

exports.register = async function (req, res){
    const contato = new Contato(req.body);
    try{
        await contato.register()
        if(contato.errors.length > 0){
            req.flash('errors', contato.errors)
            req.session.save(function() {
              res.redirect('/contato/index')
            })
            return
          } 

          req.flash('sucess', "Contato salvo com sucesso")
          req.session.save(function() {
            res.redirect('/contato/index')
            return
          })
        
    }catch(e){
        console.log(e)
        res.render('404')
    }
}