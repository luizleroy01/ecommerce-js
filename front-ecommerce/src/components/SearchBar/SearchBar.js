import React from 'react'
import{useState} from 'react'

const SearchBar = ({dadosBusca}) => {
    const [busca,setBusca] = useState()

    const handleSubmit = (e)=>{
        e.preventDefault()
        const palavraChave = e.target.busca.value;
        console.log(palavraChave)
        dadosBusca(palavraChave)
    }
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input 
            type="text" 
            name ="busca" 
            value={busca}
            onChange={(e)=>setBusca(e.target.value)}
            placeholder="Digite o nome de um produto"/>

            <input 
            type="submit" 
            value="Buscar"/>
        </form>
    </div>
  )
}

export default SearchBar