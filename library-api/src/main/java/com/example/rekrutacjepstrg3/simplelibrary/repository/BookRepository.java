package com.example.rekrutacjepstrg3.simplelibrary.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.rekrutacjepstrg3.simplelibrary.domain.Book;

@Repository
public interface BookRepository extends CrudRepository<Book, Long> {

}
