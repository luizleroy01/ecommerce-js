const handleProdutos = (produto)=>{
    const prod = [...produtos];
    prod.push(produto)
    
    setProdutos(prod)
};
export default handleProdutos;