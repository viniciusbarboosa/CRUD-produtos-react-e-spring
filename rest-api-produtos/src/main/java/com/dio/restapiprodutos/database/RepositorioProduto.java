package com.dio.restapiprodutos.database;

import com.dio.restapiprodutos.entidade.Produto;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RepositorioProduto extends JpaRepository<Produto,Long>{
    
}
