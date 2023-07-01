const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const products = require('./src/database/tables/product')
const methodOverride = require('method-override')
const app = express()
const port = 5000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(methodOverride(req => req.body._method));


//configure express engine to render html files
//and set diretory pages
app.engine('html',require('ejs').renderFile);
app.set('view engine','html');
app.use('/src',express.static(path.join(__dirname,'src')));
app.set('views',path.join(__dirname,'/src/pages'));

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
  
      res.send(`${record.id} ${record.name} - Updated successfully`);
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
  

app.get('/',(req,res)=>{
    res.render('home',{})
})

app.listen(port,()=>{
    console.log(`Servidor rodando na porta ${port}`)
})