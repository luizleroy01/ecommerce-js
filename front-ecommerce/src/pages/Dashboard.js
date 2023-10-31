import React from 'react'
import {useState,useEffect} from 'react'
import axios from 'axios'
import FormP from '../components/FormP'
import Tabela from '../components/Tabela'
import FormEdit from '../components/FormEdit/FormEdit'
import CaixaExcluir from '../components/caixaExcluir/caixaExcluir'
import SearchBar from '../components/SearchBar/SearchBar'



const Dashboard = () => {
    const url = 'http://localhost:5000/'
    
    const [produtos,setProdutos] = useState([])
    const [edit,setEdit] = useState(false)
    const [produtoEdit,setProdutoEdit] = useState([])
    const [del,setDel] = useState(false)
    const [produtoDel,setProdutoDel] = useState([])

    useEffect(()=>{
        async function searchData(){
            const response = await axios.get(url);
            const {data} = response.data
            
            setProdutos(data)
        }
        searchData()
    },[url])


    const deleteProduto = (state,produto)=>{
      if(state){
          setDel(state)
          setProdutoDel(produto)
      }else{
          setDel(false)
          setProdutoDel([])
          let prods = [...produtos]
          prods = prods.filter(prod=>(prod.id != produto.id))
          setProdutos(prods)
      }
    }

    const dadosBusca = (data)=>{
      let prods = [...produtos]
      prods = prods.filter(
          prod=>(
              prod.name.toLowerCase().includes(
              data.toLowerCase()
                  )
              )
          )
      setProdutos(prods)
    }
  
    const handleFormEdit = (state,produto)=>{
      if(state){
          setEdit(state)
          setProdutoEdit(produto)
          
      }else{
          let prods = [...produtos]
          console.log(produtos)
          console.log("atualizado", produto)
          prods.map((prod)=>{
              if(prod.id == produto.id){
                  prod.name = produto.name
                  prod.price = produto.price
                  prod.amount = produto.amount
              }
          })
          setProdutos(prods)
          setEdit(false)
          setProdutoEdit([])
      }
      
    }

    const handleProdutos = (produto)=>{
      const prod = [...produtos];
      prod.push(produto)
      
      setProdutos(prod)
    };
  

  return (
    <div>
        <h1>Dashboard</h1>
        <h2>Produtos</h2>

        <SearchBar dadosBusca={dadosBusca}/>

        {!edit && !del && (<FormP 
        handleProdutos={handleProdutos}/>)}

        {edit && (<FormEdit  
        produto={produtoEdit} 
        handleFormEdit={handleFormEdit}/>)}

        {del && (<CaixaExcluir
         produto={produtoDel}
         deleteProduto={deleteProduto}/>)}

        {!produtos && <p>Ainda não há produtos cadastrados ... :(</p>}

        {produtos && (<Tabela 
        produtos={produtos} 
        handleFormEdit={handleFormEdit} 
        deleteProduto={deleteProduto}/>)}
    </div>
  )
}
export default Dashboard;