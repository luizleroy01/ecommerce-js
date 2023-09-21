import React from 'react'
import {useState,useEffect} from 'react'
import axios from 'axios'
import Card from '../components/Card'
import FormP from '../components/FormP'


const Home = () => {
    const url = 'http://localhost:5000/'
    
    const [produtos,setProdutos] = useState(null)

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
        <FormP/>
        {!produtos && <p>Ainda não há produtos cadastrados ... :(</p>}
            {produtos && (
                produtos.map((prod)=>(
                    <Card key={prod.id} produto={prod}/>
                ))
            )}
    </div>
  )
}

export default Home