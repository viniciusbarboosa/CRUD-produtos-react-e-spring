package com.dio.restapiprodutos;

import java.util.List;
import java.util.Optional;

import com.dio.restapiprodutos.entidade.Produto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dio.restapiprodutos.database.RepositorioProduto;

@RestController
@RequestMapping("/produto")
@CrossOrigin(origins = "http://localhost:3000")
public class ProdutoRest {
    @Autowired
    private RepositorioProduto repositorio;

    @GetMapping
    public List<Produto> listar(){
        return repositorio.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Produto> getProdutoById(@PathVariable Long id) {
        Optional<Produto> produtoOptional = repositorio.findById(id);
        if (produtoOptional.isPresent()) {
            Produto produto = produtoOptional.get();
            return ResponseEntity.ok(produto);
        } else {
            return ResponseEntity.notFound().build();
        }
}

    @PostMapping
    public void salvar(@RequestBody Produto produto){
        repositorio.save(produto);
    }

    @PutMapping
    public void alterar(@RequestBody Produto produto){
        if(produto.getId()>0)
            repositorio.save(produto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> excluir(@PathVariable Long id) {
        try {
            Optional<Produto> produtoOptional = repositorio.findById(id);
            if (produtoOptional.isPresent()) {
                Produto produto = produtoOptional.get();
                repositorio.delete(produto);
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Produto excluído com sucesso.");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Produto não encontrado.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao excluir o produto.");
        }
    }
    //PASSANDO POR JSON O METHOD DELETE
    /*public void excluir(@RequestBody Produto produto){
        repositorio.delete(produto); 
    }*/
}
