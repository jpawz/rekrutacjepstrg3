package com.example.rekrutacjepstrg3.simplelibrary.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.example.rekrutacjepstrg3.simplelibrary.domain.Checkout;
import com.example.rekrutacjepstrg3.simplelibrary.exception.BookCheckoutException;
import com.example.rekrutacjepstrg3.simplelibrary.service.CheckoutService;

@RestController
@RequestMapping("api")
public class CheckoutController {

	@Autowired
	CheckoutService service;

	@GetMapping("/checkout/{bookId}")
	public ResponseEntity<Checkout> getCheckoutByBookId(@PathVariable long bookId) {
		Checkout checkout = service.getCheckoutForBookId(bookId);
		if (checkout == null) {
			return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<>(checkout, HttpStatus.OK);
	}

	@PostMapping("/borrow/{bookId}")
	public Checkout checkoutBook(@PathVariable long bookId) {
		try {
			return service.borrowBook(bookId);
		} catch (BookCheckoutException e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
		}
	}

	@PutMapping("/return")
	public Checkout returnBook(@RequestBody Checkout checkout) {
		return service.returnBook(checkout);
	}

}
