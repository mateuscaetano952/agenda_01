exports.middlewareGlobal = (req, res, next) => {
  res.locals.errors= req.flash('errors')
  res.locals.sucess= req.flash('sucess')
  res.locals.user = req.session.user
  console.log(res.locals.user )
  next();
};


exports.checkCsrfError = (err, req, res, next) => {
  if(err) {
    return res.render('404');
  }
};

exports.csrfMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
};

exports.loginRequired = (req, res, next) => {
  if(!res.locals.user){
    req.flash('errors', 'Você deve estar logado')
    req.session.save(function() {
     res.redirect('/login/index')
    
    })
    return 
  }
  next();
};
