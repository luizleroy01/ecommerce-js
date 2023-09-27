import React from 'react'

const caixaExcluir = ({produto}) => {
    const url = 'http://localhost:5000/delete-product'

    const sendData = async ()=>{
        const response = await fetch(url,{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(produto)
        })
        return response
    }
    const handleSubmit = () => {
        console.log(produto)
        const resposta = sendData()
        resposta.then((message)=>{
            console.log(message)
            //função para excluir produto no front end
        })
        .catch((error)=>{
            console.log(error)
        })
    }
  return (
    <div>
        <p>Tem certeza que deseja excluir o produto 
            {produto.name} de id {produto.id}
        </p>
        <button onClick={handleSubmit}>Sim</button>
        <button>Não</button>
    </div>
  )
}

export default caixaExcluir