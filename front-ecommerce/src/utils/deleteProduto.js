const deleteProduto = (state,produto)=>{
    if(state){
        setDel(state)
        setProdutoDel(produto)
    }else{
        setDel(false)
        setProdutoDel([])
        let prods = [...produtos]
        prods = prods.filter(prod=>(prod.id != produto.id))
        setProdutos(prods)
    }
}
export default deleteProduto;