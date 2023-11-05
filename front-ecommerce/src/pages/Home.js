import React from 'react'
import CardProdutos from '../components/cardProdutos/CardProdutos'

const Home = () => {
  return (
    <div>
        <h1>Home</h1>
        <p>Página inicial do cliente</p>
        <div>
            <section>
              <div>
                <h2>Produtos</h2>
                <CardProdutos/>
              </div>
            </section>
            <section>

            </section>
            <footer>

            </footer>
        </div>
    </div>
  )
}

export default Home