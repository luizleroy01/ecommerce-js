import React from 'react'
import {useState} from 'react'
import './style.css'

const FormP = ({handleProdutos}) => {
    const [idp,setIdp] = useState(0)
    const [name,setName] = useState("")
    const [preco,setPreco] = useState("")
    const [qtd,setQtd] = useState("")
    const [insert,setInsert] = useState(false)
   

    const sendProduct = async(product)=>{
        const url = "http://localhost:5000/new-product"
        const res = await fetch(url,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(product)
        })
        return res.json()
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const idProduct = parseInt(e.target.idp.value)
        const product ={
            id:idProduct,
            name:name,
            price:preco,
            amount:qtd
        }
        

        const resposta = sendProduct(product)
        resposta.then((message) =>{
            console.log(message.message)
            console.log(product)
            handleProdutos(product)   
        })
        .catch((erro)=>{
            console.log(erro)
        })
        setName("")
        setPreco("")
        setQtd("")
        setIdp(null)
        setInsert(false)

        
    }
    
  return (
    <div className='formulario'>
        {!insert && (
            <button onClick={()=>setInsert(true)}>Inserir</button>
        )}
        
        {insert && (
            <form onSubmit={handleSubmit}>
            <label>
                Id:
                <input type="number" 
                name="idp"
                value={idp}
                onChange={(e)=>setIdp(e.target.value)} 
                placeholder="Digite seu id"
                required />
            </label>
            <label>
                Nome:
                <input type="text" 
                name="nome"
                value={name}
                onChange={(e)=>setName(e.target.value)} 
                placeholder="Digite seu nome"
                required />
            </label>
            <label>
                Preço:
                <input type="text" 
                name="preco"
                value={preco}
                onChange={(e)=>setPreco(e.target.value)} 
                placeholder="Digite o preço do produto"
                required />
            </label>
            <label>
                Quantidade:
                <input type="text" 
                name="qtd"
                value={qtd}
                onChange={(e)=>setQtd(e.target.value)} 
                placeholder="Digite a quantidade"
                required />
            </label>
            <input id="id01" type="submit"value="Inserir"/>
        </form>
        )}
        
    </div>
  )
}

export default FormP