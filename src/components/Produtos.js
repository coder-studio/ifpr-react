import React from 'react';
//import ProdutosService from '../services/ProdutosService';

class Produtos extends React.Component{

    url = `https://outlife.com.br/ifpr/react-api/api.php`;

    state = {
        produtos: [],
        novoNome: "",
        novoDescricao: "",
        novoValor:0,
        editNome: "",
        editDescricao: "",
        editValor:0,
        editar: null,
        text: ""
    };    
    
    async componentDidMount() {
        this.getProdutos();       
        this.setState({text: this.state.text.concat('componentDidMount\r\n')});       
    }

    async getProdutos(){
        this.setState({text: this.state.text.concat('Buscando Produtos...\r\n')});
        const options = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };
        const response = await fetch(this.url, options);                
        const json = await response.json();
        this.setState({ produtos: json }); 
        this.setState({text: this.state.text.concat('Produtos Ok\r\n')});
    }

    async insertProduto(){
        this.setState({text: this.state.text.concat('Criando novo produto no banco de dados\r\n')});
        var novoProduto = {pro_name: this.state.novoNome, pro_descricao:this.state.novoDescricao, pro_valor: this.state.novoValor};
        const options = {
            method: 'POST',
            body: JSON.stringify(novoProduto),
            headers: {'Content-Type': 'application/json'}
        };
        const response = await fetch(this.url, options);    
        const json = await response.json();    
        this.getProdutos();     
        this.setState({text: this.state.text.concat('Novo produto criado\r\n')});
    }    

    async editProduto(id){
        this.setState({text: this.state.text.concat('Editando produto no banco de dados\r\n')});
        var editProduto = {pro_id: id, pro_name: this.state.editNome, pro_descricao: this.state.editDescricao, pro_valor: this.state.editValor};
        
        const options = {
            method: 'PUT',
            body: JSON.stringify(editProduto),
            headers: {'Content-Type': 'application/json'}            
        };       
        
        const response = await fetch(this.url, options);    
        const json = await response.json(); 
        this.cancelarEdit();
        this.getProdutos();        
        this.setState({text: this.state.text.concat('Produto atualizado\r\n')}); 
    }

    async deleteProduto(id){       
        this.setState({text: this.state.text.concat('Excluindo produto no banco de dados\r\n')}); 
        var deleteProduto = {pro_id: id};
        const options = {
            method: 'DELETE',
            body: JSON.stringify(deleteProduto),
            headers: {'Content-Type': 'application/json'}
        };
        const response = await fetch(this.url, options);    
        const json = await response.json(); 
        this.getProdutos(); 
        this.setState({text: this.state.text.concat('Produto excluido\r\n')}); 
    }

    novoSubmit = (e) => {
        e.preventDefault();
        this.insertProduto();
    }

    editSubmit = (id) => {        
        this.editProduto(id);
    }

    editarChange(id){        
        this.setState({text: this.state.text.concat('Modo de edição ativado\r\n')}); 
        var produtosArray = this.state.produtos;        
        produtosArray.filter(item => item.pro_id == id).map(produto => 
            {                
                this.setState({editNome: produto.pro_name});
                this.setState({editDescricao: produto.pro_descricao});
                this.setState({editValor: produto.pro_valor});
            }
            );
        this.setState({ editar: id });
    }

    apagarLog = (e) => {
        this.setState({ text: "" });
         
    }

    cancelarEdit = (e) => {        
        this.setState({text: this.state.text.concat('Modo de edição cancelado\r\n')});
        this.setState({ editar: null });
    }

    changeEditName = (e) => {
        this.setState({ editNome: e.target.value });
    }   

    changeEditDescricao = (e) => {
        this.setState({ editDescricao: e.target.value });
    }
    changeEditValor = (e) => {
        this.setState({ editValor: e.target.value });
    }

    nameChange = (e) => {
        this.setState({ novoNome: e.target.value });
    }   

    descricaoChange = (e) => {
        this.setState({ novoDescricao: e.target.value });
    }
    valorChange = (e) => {
        this.setState({ novoValor: e.target.value });
    }
    textChange = (e) => {
        this.setState({ text: e.target.value });
    }

     render(){         
        return(        
        <div className="my-3 p-2">       
            <div className='row'>
                <div className="col-6">
                <h4>Novo Produto</h4>
                <form onSubmit={this.novoSubmit}>
                    <div className="form-group">
                        <label for="pro_name">Produto</label>
                        <input type="text" className="form-control" name="pro_name" value={this.state.novoNome} onChange={this.nameChange}/>
                    </div>             
                    <div className="form-group">
                        <label for="pro_descricao">Descrição</label>
                        <input type="text" className="form-control" name="pro_descricao" value={this.state.novoDescricao} onChange={this.descricaoChange}/>
                    </div>
                    <div className="form-group">
                        <label for="pro_valor">Valor</label>
                        <input type="text" className="form-control" name="pro_valor" value={this.state.novoValor} onChange={this.valorChange}/>
                    </div>
                    <button type="submit" className="btn btn-primary my-3">Novo</button> 
                </form>
                </div>
                <div className='col-6'>
                    <h4>Log</h4>
                    <div class="form-group">                        
                        <textarea value={this.state.text} class="form-control" rows="7" onChange={this.textChange}></textarea>
                    </div>
                    <button type="button" className="btn btn-primary my-3" onClick={this.apagarLog}>Apagar log</button>
                </div>
            </div>
            <div className='row'>
                <div className='col-12'>    
                <h4>Lista de Produtos</h4>
                    <table className='table table-sm my-5'>
                        <thead className='thead-dark'>
                            <tr>
                                <th scope='col'>Produto</th>
                                <th scope='col'>Descrição</th>
                                <th scope='col'>Valor</th>
                                <th scope='col'>Ação</th>
                            </tr>
                        </thead>
                        <tbody>            

                        {this.state.produtos.map((produto) => {
                    
                        return this.state.editar === produto.pro_id ? 
                        (
                            <tr key={produto.id} className="animate__animated animate__fadeIn">
                                <td className="col-3"><input type="text" className="field" value={this.state.editNome} onChange={this.changeEditName}/></td>
                                <td className="col-3"><input type="text" className="field" value={this.state.editDescricao} onChange={this.changeEditDescricao}/></td>
                                <td className="col-3"><input type="text" className="field" value={this.state.editValor} onChange={this.changeEditValor}/></td>
                                <td className="col-3">
                                    <button className="btn btn btn-success btn-sm mx-1" onClick={() => this.editSubmit(produto.pro_id)}>
                                        <i className="fa fa-save fa-xs"></i> salvar                                  
                                    </button>
                                    <button className="btn btn btn-light btn-sm mx-1" onClick={() => this.cancelarEdit()}>
                                        <i className="fa fa-door-open fa-xs"></i> cancelar                                  
                                    </button>
                                </td>
                            </tr> 
                               
                        ) : (
                            <tr key={produto.id}>
                                <td className="col-3">{produto.pro_name}</td>
                                <td className="col-3">{produto.pro_descricao}</td>
                                <td className="col-3">{produto.pro_valor}</td>
                                <td className="col-3">
                                <button className="btn btn-danger btn-sm mx-1" onClick={() => this.deleteProduto(produto.pro_id)}>
                                    <i className="fa fa-trash-o fa-xs"></i> excluir                                  
                                </button>
                                <button className="btn btn-primary btn-sm mx-1" onClick={() => this.editarChange(produto.pro_id)}>
                                    <i className="fa fa-edit fa-xs"></i> editar                                  
                                </button>
                                </td>
                            </tr>                                                           
                        );                        
                        })}
                    </tbody>
                </table> 
                </div>
            </div>
        </div>
        );
    }
}
export default Produtos;