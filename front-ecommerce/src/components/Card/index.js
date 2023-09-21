import React from 'react'
import'./style.css'

const Card = ({produto}) => {
  return (
    <div className='cardProdutos'>
      <div className='formato'>
        <h2>{produto.name.toUpperCase()}</h2>
        <p>Preço:{produto.price}</p>
        <p>Quantidade:{produto.amount}</p>
      </div>
            
    </div>
    
  )
}

export default Card;