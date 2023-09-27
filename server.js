const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
//const products = require('./src/database/tables/product')
const methodOverride = require('method-override')
const app = express()
const port = 5000
const cors = require('cors')

app.use(cors({
  origin:"*"
}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.json())
app.use(methodOverride(req => req.body._method));


//array de produtos para teste de manipulação via requisições

const produtos = [
  {
    id:1,
    name:"smartphone",
    price:1000,
    amount:24,
  },
  {
    id:2,
    name:"Playstation",
    price:4000,
    amount:24,
  },
  {
    id:3,
    name:"computer",
    price:1500,
    amount:30,
  },
  {
    id:4,
    name:"books",
    price:2000,
    amount:50,
  }
]

//teste main page products
app.get('/',(req,res)=>{
  res.json({data:produtos});
})

//teste inserção de produto
//em caso de sucesso de inserção adicionar mudando 
//o estado de um array produtos em App.js
app.post('/new-product',(req,res)=>{
  console.log(req.body);
  produtos.push(req.body);
  res.status(200).json({message:"Inserido com sucesso"})
})
app.put('/update-product',(req,res)=>{
  const product = req.body

  produtos.map((prod)=>{
    if(prod.id == product.id){
      prod.name = product.name
      prod.price = product.price
      prod.amount = product.amount
    }
  })
  res.status(200).json({message:"Atualizado com sucesso"})
})


app.get('/',(req,res)=>{
    res.render('home',{})
})

app.listen(port,()=>{
    console.log(`Servidor rodando na porta ${port}`)
})
