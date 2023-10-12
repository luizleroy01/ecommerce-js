import React from 'react'
import {useState} from'react'
import './style.css'

const FormEdit = ({produto,handleFormEdit}) => {
    const [id,setId] = useState(produto.id)
    const [name,setName] = useState(produto.name)
    const [preco,setPreco] = useState(produto.price)
    const [qtd,setQtd] = useState(produto.amount)
    
    const sendProduct = async(product)=>{
        const url = "http://localhost:5000/update-product"
        const res = await fetch(url,{
            method:'PUT',
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
            handleFormEdit(false,product)  
        })
        .catch((erro)=>{
            console.log(erro)
        })
        setName("")
        setPreco("")
        setQtd("")
        setId(null)

    }
    
  return (
    <div className='formulario'>
            <button 
                className='bVoltar' 
                onClick={()=>handleFormEdit(false,produto)}>
                    Voltar
            </button>

            <form onSubmit={handleSubmit}>
            <input type="hidden" 
            name="idp"
            value ={produto.id}
            />
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
            <input id="id01" type="submit"value="Atualizar"/>
        </form>
    </div>
  )
}

export default FormEdit