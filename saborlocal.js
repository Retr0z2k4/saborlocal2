//requisitando os modulos
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");

//configurando o express para o postman e para usar a pagina
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const port = 3000;

//configurando o banco de dados
mongoose.connect("mongodb://127.0.0.1:27017/haircare", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//criando a model usuario do meu projeto
const UsuarioSchema = new mongoose.Schema({
    email : {type : String, required : true},
    senha : {type : String}
});

const ProdutoartesanatoSchema = new mongoose.Schema({
    id_produtoartesanato : {type : String, required : true},
    descricao : {type : String},
    artesao : {type : String},
    datacriacao : {type : Date},
    quantidadeestoque : {type : Number}
})

const Usuario = mongoose.model("Usuario", UsuarioSchema);

const Produtoartesanato = mongoose.model("Produtoartesanato",ProdutoartesanatoSchema)

//configuração dos roteamendos
//cadastrousuario
app.post("/cadastrousuario", async (req, res) => {
  const email = req.body.email;
  const senha = req.body.senha;
  
   
  const usuario = new Usuario({
    email: email,
    senha: senha
});

  try {
    const newUsuario = await usuario.save();
    res.json({ error: null, msg: "Cadastro ok", UsuarioId: newUsuario._id });
  } catch (error) {}

});


//rota de cadastro especifico
app.post("/cadastroprodutoartesanato", async (req, res) => {
    
    
    const id_produtoartesanato  = req.body.id_produtoartesanato;
    const descricao  = req.body.descricao;
    const artesao = req.body.id_artesao;
    const datacriacao = req.body.datacriacao;
    const quantidadeestoque = req.body.quantidadeestoque;
     
    const produtoartesanato = new Produtoartesanato({
      id_produtoartesanato: id_produtoartesanato,
      descricao: descricao,
      artesao: artesao,
      datacriacao: datacriacao,
      quantidadeestoque: quantidadeestoque
    });
  
    try {
      const newProdutoartesanato = await produtoartesanato.save();
      res.json({ error: null, msg: "Cadastro ok", Produtoartesanato: newProdutoartesanato._id });
    } catch (error) {}
  
  });

//rota padrao
app.get("/", async (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

//tem que ter o comando de listen
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

