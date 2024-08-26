const Login = require('../models/LoginModel');

exports.paginaInicial = (req, res) => {
  res.render('login');
  return
};

exports.cadastra = async function(req, res) {
 try{
  const login = new Login(req.body)
  await login.register()

  //Se a autenficação do email ou senha falhar
  if(login.errors.length > 0){
    req.flash('errors', login.errors)
    req.session.save(function() {
      res.redirect('/login/index')
    })
    return
  } 

  req.flash('sucess', "Usuario cadastro com sucesso")
  req.session.save(function() {
    res.redirect('/login/index')
  })
  
 } catch(e){
  console.log(e)
  res.render('404')
 }

 //Caso tudo de certo

}