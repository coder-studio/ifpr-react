export class ProdutosService{
    
url = "http://api/api.php?action=listarProdutos";

    static async listarProdutos(listaDeProdutos) {
        const options = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };
        await fetch(this.url, options)
            .then(response => response.json())
            .then(produtos => {
                produtos.forEach(produto => {
                    listaDeProdutos.push(produto);
                });
            });
    }

}

export default ProdutosService;