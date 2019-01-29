package com.example.rekrutacjepstrg3.simplelibrary.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.example.rekrutacjepstrg3.simplelibrary.domain.Book;
import com.example.rekrutacjepstrg3.simplelibrary.repository.BookRepository;

@RestController
@RequestMapping("api")
public class BookController {

	@Autowired
	private BookRepository repository;

	@PostMapping("/book/add")
	@ResponseStatus(HttpStatus.CREATED)
	public Book addBook(@RequestBody @Valid Book book) {
		return repository.save(book);
	}

	@PutMapping("/book/{id}")
	private Book updateBook(@RequestBody @Valid Book book, @PathVariable long id) {
		return repository.save(book);
	}

	@GetMapping("/book/{id}")
	public Book getBook(@PathVariable long id) {
		return repository.findById(id).get();
	}

	@GetMapping("/book/all")
	public Iterable<Book> getAllBooks() {
		return repository.findAll();
	}

	@DeleteMapping("/book/{id}")
	public void deleteBook(@PathVariable long id) {
		repository.deleteById(id);
	}

}
