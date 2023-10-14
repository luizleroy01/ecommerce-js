import React from 'react'
import {useState,useEffect} from 'react'
import axios from 'axios'
import FormP from '../components/FormP'
import Tabela from '../components/Tabela'
import FormEdit from '../components/FormEdit/FormEdit'
import CaixaExcluir from '../components/caixaExcluir/caixaExcluir'
import SearchBar from '../components/SearchBar/SearchBar'
import handleProdutos from '../utils/handleProdutos'
import handleFormEdit from '../utils/handleFormEdit'
import deleteProduto from '../utils/deleteProduto'
import dadosBusca from '../utils/buscaDados'


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

  return (
    <div>
        <h1>Home</h1>
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
export default Home