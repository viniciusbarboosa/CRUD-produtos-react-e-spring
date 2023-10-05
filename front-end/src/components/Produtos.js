import React from "react";
import {Button, Table,Modal} from "react-bootstrap";
import Form from 'react-bootstrap/Form';

class Produtos extends React.Component{
    
    constructor(props){
        super(props);

        this.state = {
            id:0,
            nome:'',
            preco:0,
            descricao:'',
            urlImg:'',
            produtos : [],
            modalAberta:false
        }
    }

    componentDidMount(){
        fetch("http://localhost:8080/produto")
            .then(resposta => resposta.json())
            .then(dados=> {
                this.setState({produtos:dados})
            })
            .catch(error => {
                console.error("Erro ao buscar dados da API:", error);
              });
    }

    componentWillUnmount(){
        
    }

    buscarProduto = () => {
        fetch("http://localhost:8080/produto")
            .then(resposta => resposta.json())
            .then(dados=> {
                this.setState({produtos:dados})
            })
            .catch(error => {
                console.error("Erro ao buscar dados da API:", error);
              });
    }

    deletarProduto = (id) => {
        fetch("http://localhost:8080/produto/"+id,{method:'DELETE'})
            .then(resposta =>{
                if (resposta.status === 204) {
                    this.buscarProduto();
                    console.error('Excluiu com sucesso');
                  } else {
                    console.error('Falha ao excluir o produto.');
                  }
            } )
            .catch((error) => {
                console.error('Erro ao excluir o produto:', error);
              });
            
    }

    carregarDados = (id) => {
        fetch("http://localhost:8080/produto/"+id,{method:'GET'})
        .then((resposta) => resposta.json())
        .then((produto) => {
          this.setState({ id: produto.id, 
                        nome:produto.nome,
                        preco:produto.preco,
                        descricao:produto.descricao,
                        urlImg:produto.urlImgProduto
        });
        this.abrirModal();
        })
        .catch((error) => {
          console.error('Erro ao obter detalhes do produto:', error);
        });   
            
    }

    cadastrarProduto = (produto) =>{
        console.log('Produto a ser cadastrado:', produto);
        fetch("http://localhost:8080/produto", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(produto)
          })
            .then(resposta => {
              if (resposta.status === 204 || resposta.status === 200) {
                this.buscarProduto();
                console.log('ADICIONADO COM SUCESSO');
              } else {
                console.error('Falha ao adicionar o produto.');
              }
            })
            .catch((error) => {
              console.error('Erro ao adicionar o produto:', error);
            });                
    }

    atualizarProduto = (produto) =>{
        console.log('Produto a ser cadastrado:', produto);
        fetch("http://localhost:8080/produto", {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(produto)
          })
            .then(resposta => {
              if (resposta.status === 204 || resposta.status === 200) {
                this.buscarProduto();
                console.log('ATUALIZADO COM SUCESSO');
                alert("Atualizado com sucesso")
              } else {
                console.error('Falha ao adicionar o produto.');
              }
            })
            .catch((error) => {
              console.error('Erro ao atualizar o produto:', error);
            });                
    }
    

    atualizarNome = (e) => {
        this.setState(
            {
                nome:e.target.value
            }
        )
    }

    atualizarPreco = (e) => {
        this.setState(
            {
                preco:e.target.value
            }
        )
    }

    atualizarDescricao = (e) => {
        this.setState(
            {
                descricao:e.target.value
            }
        )
    }

    atualizarUrlImg = (e) => {
        this.setState(
            {
                urlImg:e.target.value
            }
        )
    }

    submit(e){
        e.preventDefault();

        if(this.state.id === 0){
            const produtos ={
                nome:this.state.nome,
                preco:this.state.preco,
                descricao:this.state.descricao,
                urlImgProduto:this.state.urlImg
            }
    
            this.cadastrarProduto(produtos);
        }else{
            const produtos ={
                id:this.state.id,
                nome:this.state.nome,
                preco:this.state.preco,
                descricao:this.state.descricao,
                urlImgProduto:this.state.urlImg
            }
    
            this.atualizarProduto(produtos);
        }
        this.fecharModal()
    }

    reset = () =>{
        this.setState({
            id:0,
            nome:'',
            descricao:'',
            preco:0,
            urlImg:''
        })
        this.abrirModal();
    }

    fecharModal = () => {
        this.setState({
            modalAberta:false
        })
    }

    abrirModal = () => {
      this.setState({
          modalAberta:true
      })
  }

    render(){
        return(
            <div>
        <Modal show={this.state.modalAberta} onHide={this.fecharModal}>
        <Modal.Header closeButton>
          <Modal.Title>Dados do Produto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
      <Form.Group className="mb-3" controlId="idControl">
      <Form.Label>ID</Form.Label> 
        <Form.Control type="text" placeholder="Digite seu nome" value={this.state.id}  readOnly={true}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="nomeControl">
      <Form.Label>Nome</Form.Label>
        <Form.Control type="text" placeholder="Digite seu nome" value={this.state.nome} onChange={this.atualizarNome}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="precoControl">
      <Form.Label>Preço</Form.Label>
        <Form.Control type="number" placeholder="Digite o preço" value={this.state.preco} onChange={this.atualizarPreco}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="descricaoControl">
      <Form.Label>Descrição</Form.Label>
        <Form.Control type="text" placeholder="Digite a descrição" value={this.state.descricao} onChange={this.atualizarDescricao}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="urlImgControl">
      <Form.Label>Url Imagem</Form.Label>
        <Form.Control type="text" placeholder="Digite a url da imagem" value={this.state.urlImg} onChange={this.atualizarUrlImg}/>
      </Form.Group>

    </Form>  
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.fecharModal}>
            Close
          </Button>
          
          <Button variant="primary" onClick={(e) => this.submit(e)}>
            Salvar 
          </Button>

        </Modal.Footer>
      </Modal>

      
      <Button variant="secondary" onClick={() => this.reset()}>
        Novo 
      </Button>

      
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Preço</th>
                        <th>Descrição</th>
                        <th>Imagem Do Produto</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.produtos.map((produto)=>
                    <tr key={produto.id}>
                        <td>{produto.id}</td>
                        <td>{produto.nome}</td>
                        <td>{produto.preco}</td>
                        <td>{produto.descricao}</td>
                        <td><img src={produto.urlImgProduto} alt="Imagem do Produto"  style={{ width: '50px', height: '50px' }}/></td>
                        <td><Button variant="secondary" onClick={() => this.carregarDados(produto.id)}>ALTERAR</Button> 
                        <Button variant="danger" onClick={() => this.deletarProduto(produto.id)}>EXCLUIR</Button></td>
                    </tr>
                        )
                    }
                    

                </tbody>
            </Table>
            </div>
        )
    } 
}

export default Produtos;