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
/*
//testing database sync
app.get('/syncDatabase',async(req,res)=>{
    const database = require('./src/database/db')
    try{
        await database.sync()
        res.send('Database succesfully synched')
    }catch(error){
        console.log(error)
    }
})

app.get('/cadastrar',(req,res)=>{
    res.render('cadastroProduto',{})
})

app.post('/novoProduto', async(req,res)=>{
    
    try{
        const params = req.body;
        const properties = ['name','price','amount','description']
        const check = properties.every((property)=>{
            return property in params;
        });

        if(!check){
            const propStr = properties.join(', ')
            res.send('All parameters needed to create a product')
            return
        }

        const newProduct = await products.create({
            name:params.name,
            price:params.price,
            amount:params.amount,
            description:params.description
        })
        
        res.send(newProduct)
    }catch(error){
        res.send('Ocorreu um problema: '+ error)
    }
})

app.get('/produtos',async(req,res)=>{
    try{
        const params = req.body
        if('id' in params){
            const record = await products.findByPk(params.id);
            if(record){
                res.send(record)
            }else{
                res.send('No one product find with this id')
            }
            return
        }

        const record = await products.findAll();
        if(record){
            res.render('visualizaProdutos',{records:record})
        }else{
            res.send('There are no products stored yet')
        }
        
    }catch(error){
        res.send(error)
    }
})

app.get('/editar',async(req,res)=>{
        try{
          const params = req.body
          
          const record = await products.findAll();
          if(record){
              res.render('editarProduto',{records:record})
          }else{
              res.send('There are no products stored yet')
          }
          
      }catch(error){
          res.send(error)
      }
})
app.get('/formUpdateProduct/:id',async(req,res)=>{
  try {
    const params = req.body;

    if (!params) {
      res.send(`Missing 'id' in request body`);
      return;
    }

    const record = await products.findByPk(req.params.id);

    if (!record) {
      res.send(`Product ID not found.`);
      return;
    }
    res.render('formUpdateProduto',{record:record});

  }catch(error){
    res.send(error)
  }
})
app.put('/updateProduct', async (req, res) => {
    try {
      const params = req.body;
  
      if (!('id' in params)) {
        res.send(`Missing 'id' in request body`);
        return;
      }
  
      const record = await products.findByPk(params.id);
  
      if (!record) {
        res.send(`Product ID not found.`);
        return;
      }
  
      const properties = ['name', 'price', 'amount', 'description'];
  
      const check = properties.some((property) => {
        return property in params;
      });
  
      if (!check) {
        const propStr = properties.join(', ');
        res.send(`Request body doesn't have any of the following properties: ${propStr}`);
        return;
      }

      record.name = params.name || record.name;
      record.price = params.price || record.price;
      record.amount = params.amount || record.amount;
      record.description = params.description || record.description;
  
      await record.save();
  
      res.redirect('/')
    } catch (error) {
      res.send(error);
    }
  });

  //delete operation
  app.delete('/deleteProduct', async (req, res) => {
    try {
      const params = req.body;
  
      if (!('id' in params)) {
        res.send(`Missing 'id' in request body`);
        return;
      }
       
      const record = await products.findByPk(params.id);
     
      if (!record) {
        res.send(`Product ID not found.`);
        return;
      }
  
      await record.destroy();
  
      //res.send(`${record.id} ${record.name} - Deleted successfully`);
      res.redirect('/')
    } catch (error) {
      res.send(error);
    }
  });
  */

app.get('/',(req,res)=>{
    res.render('home',{})
})

app.listen(port,()=>{
    console.log(`Servidor rodando na porta ${port}`)
})
