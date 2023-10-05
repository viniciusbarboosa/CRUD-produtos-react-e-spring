import Home from './components/Home';
import Sobre from './components/Sobre';
import Produtos from './components/Produtos';
import FormProdutos from './components/FormProdutos';
import { BrowserRouter,Routes,Route,Link } from 'react-router-dom';
import { Nav, NavLink } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
      <h1>CRUD PRODUTOS</h1>
      <BrowserRouter>
      <Nav variant="tabs">
        <NavLink as={Link} to="/">Pagina Inicial</NavLink>
        <NavLink as={Link} to="/produtos">Produtos</NavLink>
        <NavLink as={Link} to="/Sobre">Sobre</NavLink>
      </Nav>
    
      <Routes>
        <Route path='/' exact={true} element={<Home/>}></Route>
        <Route path='/produtos' element={<Produtos/>}></Route>
        <Route path='/produtos' element={<FormProdutos/>}></Route>
        <Route path='/sobre' element={<Sobre/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;