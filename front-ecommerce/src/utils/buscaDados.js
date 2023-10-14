const dadosBusca = (data)=>{
    let prods = [...produtos]
    prods = prods.filter(
        prod=>(
            prod.name.toLowerCase().includes(
            data.toLowerCase()
                )
            )
        )
    setProdutos(prods)
}
export default dadosBusca;