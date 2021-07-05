import logo from './logo.svg';
import './App.css';
import Produtos from './components/Produtos';


function App() {
  return (
    <div className="container-md shadow p-0">     
      <div className="jumbotron bg-light p-4">
        <h1 className="display-6">IFPR - Tópicos Especiais em Desenvolvimento Web</h1>
        <p className="lead">
          Implementar um Sistema Web Completo utilizando um dos frameworks
          e/ou bibliotecas especiais ensinadas nas aulas: Angular, ReactJS ou Django.
        </p>
        <hr className="my-4"/>
          <p>Aluno: Ericsson Beck F. Souza</p>   
          
      </div>        
        <Produtos />          
    </div>   
  );
}

export default App;
