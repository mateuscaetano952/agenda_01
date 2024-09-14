const Contato = require('../models/ContatoModel')

exports.paginaInicial = async function (req, res){
  const contatos = await Contato.listaContatos()
  console.log(contatos)
  res.render('index', {contatos: contatos});
  return;
};
