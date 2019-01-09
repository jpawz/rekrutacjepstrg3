package com.example.rekrutacjepstrg3.simplelibrary.service;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.rekrutacjepstrg3.simplelibrary.domain.Checkout;
import com.example.rekrutacjepstrg3.simplelibrary.exception.BookCheckoutException;
import com.example.rekrutacjepstrg3.simplelibrary.repository.BookRepository;
import com.example.rekrutacjepstrg3.simplelibrary.repository.CheckoutRepository;

@Service
public class CheckoutService {

	private final CheckoutRepository checkoutRepository;
	private final BookRepository bookRepository;

	@Autowired
	public CheckoutService(CheckoutRepository checkoutRepository, BookRepository bookRepository) {
		super();
		this.checkoutRepository = checkoutRepository;
		this.bookRepository = bookRepository;
	}

	public Checkout borrowBook(long bookId) {
		if (bookCanBeBorrowed(bookId)) {
			return checkoutRepository.save(
					new Checkout(bookRepository.findById(bookId).get(), LocalDateTime.now(), null));
		} else {
			throw new BookCheckoutException("Can't borrow book with ID: " + bookId);
		}
	}

	public Checkout returnBook(Checkout checkout) {
		checkout.setReturnDate(LocalDateTime.now());
		return checkoutRepository.save(checkout);
	}

	private boolean bookCanBeBorrowed(long bookId) {
		Checkout c = checkoutRepository.findFirstByBookIdOrderByCheckoutDate(bookId).orElse(null);
		if (c == null || c.getReturnDate() != null) {
			return true;
		}
		return false;

	}
}
