import React from 'react'
import {useState,useEffect} from 'react'
import axios from 'axios'
import Card from '../components/Card'
import FormP from '../components/FormP'
import Tabela from '../components/Tabela'
import FormEdit from '../components/FormEdit/FormEdit'
import caixaExcluir from '../components/caixaExcluir/caixaExcluir'


const Home = () => {
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

    const handleProdutos = (produto)=>{
        const prod = [...produtos];
        prod.push(produto)
        
        setProdutos(prod)
    };
    
    const handleFormEdit = (state,produto)=>{
        if(state){
            setEdit(state)
            setProdutoEdit(produto)
            let prods = [...produtos]
            prods.map((prod)=>{
                if(prod.id == produto.id){
                    prod.name = produto.name
                    prod.price = produto.price
                    prod.amount = produto.amount
                }
            })
            setProdutos(prods)
        }else{
            setEdit(false)
            setProdutoEdit([])
        }
        
    }
    const deleteProduto = (state,produto)=>{
        if(state){
            setDel(state)
            setProdutoDel(produto)
            let prods = [...produtos]
            prods = prods.filter(prod=>(prod.id != produto.id))
            setProdutos(prods)
        }else{
            setDel(false)
            setProdutoDel([])
        }
    }
  return (
    <div>
        <h1>Home</h1>
        <h2>Produtos</h2>
        {!edit && !del && (<FormP 
        handleProdutos={handleProdutos}/>)}

        {edit && (<FormEdit  
        produto={produtoEdit} 
        handleFormEdit={handleFormEdit}/>)}

        {del && (<caixaExcluir produto={produtoDel}/>)}

        {!produtos && <p>Ainda não há produtos cadastrados ... :(</p>}

        {produtos && (<Tabela 
        produtos={produtos} 
        handleFormEdit={handleFormEdit} 
        deleteProduto={deleteProduto}/>)}
    </div>
  )
}

export default Home