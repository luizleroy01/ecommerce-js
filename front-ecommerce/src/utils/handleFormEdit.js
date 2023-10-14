const handleFormEdit = (state,produto)=>{
    if(state){
        setEdit(state)
        setProdutoEdit(produto)
        
    }else{
        let prods = [...produtos]
        console.log(produtos)
        console.log("atualizado", produto)
        prods.map((prod)=>{
            if(prod.id == produto.id){
                prod.name = produto.name
                prod.price = produto.price
                prod.amount = produto.amount
            }
        })
        setProdutos(prods)
        setEdit(false)
        setProdutoEdit([])
    }
    
}
export default handleFormEdit;