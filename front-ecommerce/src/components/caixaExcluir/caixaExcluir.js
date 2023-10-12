import React from 'react'

const CaixaExcluir = ({produto}) => {
    const url = `http://localhost:5000/delete-product`

    const sendData = async ()=>{
        const response = await fetch(url,{
            method:'DELETE', 
        })
        return response;
    }
    const handleSubmit = () => {
        console.log("chamou handleSubmit")
        console.log(produto)
        const resposta = sendData();
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
        <form onSubmit={handleSubmit}>
        <p>Tem certeza que deseja excluir o produto 
            {produto.name} de id {produto.id}
        </p>
        <input type="submit" value="Sim" />
        <button>Não</button>
        </form>
    </div>
  )
}

export default CaixaExcluir;