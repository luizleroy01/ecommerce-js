import React from 'react'
import {useState} from 'react'
import './style.css'

const FormP = () => {
    const [name,setName] = useState()
    const [preco,setPreco] = useState()
    const [qtd,setQtd] = useState()
    const [insert,setInsert] = useState(false)

    const sendProduct = async(product)=>{
        const url = "http://localhost:5000/new-product"
        await fetch(url,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(product)
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const product ={
            name:name,
            price:preco,
            amount:qtd
        }
        console.log(product)

        sendProduct(product)
        setName("")
        setPreco("")
        setQtd("")
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