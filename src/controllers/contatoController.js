const Contato = require('../models/ContatoModel')

exports.index = function (req, res){
    res.render("contato", {contato: null})
}

exports.register = async function (req, res){
    const contato = new Contato(req.body);
    try{
        await contato.edit()
        if(contato.errors.length > 0){
            req.flash('errors', contato.errors)
            req.session.save(function() {
              res.redirect('/contato/index')
            })
            return
          } 

          req.flash('sucess', "Contato salvo com sucesso")
          req.session.save(function() {
            res.redirect(`/contato/index/${contato.contato._id}`)
            return
          })
        
    }catch(e){
        console.log(e)
        res.render('404')
    }
}

exports.editIndex = async function (req, res){
  if(!req.params.id){
    res.render('404') 
    return
  }
  try{
    const contato = await Contato.procurarId(req.params.id)
    console.log(contato)
    console.log(req.params.id)
    res.render('contato', {
      contato: contato
    }) 
  
  }catch(e){
    console.log(e)
    res.render('404')
  }

}

exports.edit = async function (req, res){
  const contato = new Contato(req.body);
        await contato.register()
        if(contato.errors.length > 0){
            req.flash('errors', contato.errors)
            req.session.save(function() {
              res.redirect('/contato/index')
            })
            return
          } 

          req.flash('sucess', "Contato editado com sucesso")
          req.session.save(function() {
            res.redirect(`/contato/index/${contato.contato._id}`)
            return
          })
}

exports.delete = async function (req, res){
 try{
  Contato.delete( req.params.id)
  req.flash('sucess', "Contato apagado com sucesso")
          req.session.save(function() {
            res.redirect(`back`)
            return
          })
 }catch(e){
  console.log(e)
  res.render('404')
 }
 
}