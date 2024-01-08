const express = require("express") // aqui estou iniciando o express

const router = express.Router() // aqui estou configurando a primeira parte da rota 
const cors = require('cors')//aqui estou trazendo o pacote cors que permite consumir essa api no front

const conectaBancoDeDados = require('./bancoDeDados')// aqui estou ligando ao arquivo bando de dados
conectaBancoDeDados() // estou chamando a função que conecta o banco de dados

const Mulher = require('./mulherModel')

const app = express() // aqui estou iniciando o app
app.use(express.json())
app.use(cors())

const porta = 3333 // aqui estou criando a porta 


//GET
async function mostraMulheres(request, response) {
try{
    const MulheresVindasDoBancoDeDados = await Mulher.find()

    response.json(MulheresVindasDoBancoDeDados)
}catch(erro){
    console.log(erro)        
}

}

// POST 
async function criaMulher(request, response){
  const novaMulher = new mulherModel({
    nome: request.body.nome,
    imagem: request.body.imagem,
    minibio: request.body.minibio,
    citacao: request.body.citacao
  })
  try{
    const MulherCriada = await novaMulher.save()
    response.status(201).json(MulherCriada)
  } catch(erro){
    console.log(erro)
  }
}


//PATCH
async function corrigeMulher(request, response){
   try{
    const mulherEncontrada = await mulher.findById(request.params.id)
    if (request.body.nome){
      mulherEncontrada.nome = request.body.nome 
    }
    if (request.body.minibio){
      mulherEncontrada.minibio = request.body.minibio 
    }
    if (request.body.imagem){
      mulherEncontrada.imagem = request.body.imagem 
    }
    if (request.body.citacao){
      mulherEncontrada = request.body.citacao
    }
    const mulherAtualizadaNoBancoDeDados = await mulherEncontrada.save()
    response.json(mulherAtualizadaNoBancoDeDados)

   } catch(erro){
    console.log(erro)
   }

   }

   //DELETE 

  async function deletaMulher(request, response){
    try{  
      await mulher.findAndDelete(request.params.id)
      response.json({messagem: 'Mulher deletada com sucesso!'})
    }catch(erro){
       console.log(erro)
    }
    
  }
//PORTA
function mostraPorta() {

    console.log("Servidor criado e rodando na porta ", porta)

}



app.use(router.get('/mulheres', mostraMulheres)) // configurei rota get/mulheres
app.use(router.post('/mulheres', criaMulher)) //configurei rota post /mulheres
app.use(router.patch('/mulheres/:id',corrigeMulher)) //configurei a rota 
app.use(router.delete('/mulheres/:id', deletaMulher))
app.listen(porta, mostraPorta) // servidor ouvindo a porta 

