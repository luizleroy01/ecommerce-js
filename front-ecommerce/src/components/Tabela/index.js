import React from 'react'
import './style.css'

const Tabela = ({produtos,handleFormEdit,deleteProduto}) => {
  return (
    <table>
            <thead>
                    <th>Nome</th>
                    <th>Preço</th>
                    <th>Quantidade</th>
                    <th>Ações</th>
            </thead>
            {produtos && (
                produtos.map((prod)=>(
                    <tr key={prod.id}>
                        <td>{prod.name}</td>
                        <td>{prod.price}</td>
                        <td>{prod.amount}</td>
                        <td>
                            <button className="bDelete" onClick={()=>deleteProduto(true,prod)}>Excluir</button>
                            <button className="bEdit" onClick={()=>handleFormEdit(true,prod)}>Editar</button>
                        </td>
                    </tr>
                ))
            )}
        </table>
  )
}
export default Tabela