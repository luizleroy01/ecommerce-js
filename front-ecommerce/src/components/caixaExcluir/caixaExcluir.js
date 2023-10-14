import React from 'react'
import './style.css'

const CaixaExcluir = ({produto,deleteProduto}) => {
    const url = `http://localhost:5000/delete-product`

    const sendData = async (produto)=>{
        const response = await fetch(url,{
            method:'DELETE',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(produto),
        })
        return response;
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("meu",produto)
        
        const resposta = sendData(produto);
        resposta.then((message)=>{
            console.log(message)
            //função para excluir produto no front end
            deleteProduto(false,produto)
        })
        .catch((error)=>{
            console.log(error)
        })
    }
  return (
    <div className="caixa">
        <p>Tem certeza que deseja excluir o produto 
            {produto.name} de id {produto.id}
        </p>
        <button type="submit" onClick={handleSubmit}>Sim</button> 
        <button>Não</button>
    </div>
  )
}

export default CaixaExcluir;