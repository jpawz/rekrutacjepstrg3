package com.example.rekrutacjepstrg3.simplelibrary.service;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import java.time.LocalDateTime;
import java.util.Optional;

import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.example.rekrutacjepstrg3.simplelibrary.domain.Book;
import com.example.rekrutacjepstrg3.simplelibrary.domain.Checkout;
import com.example.rekrutacjepstrg3.simplelibrary.exception.BookCheckoutException;
import com.example.rekrutacjepstrg3.simplelibrary.repository.BookRepository;
import com.example.rekrutacjepstrg3.simplelibrary.repository.CheckoutRepository;

public class CheckoutServiceTest {

	private CheckoutService service;

	@Mock
	private CheckoutRepository checkoutRepository;

	@Mock
	private BookRepository bookRepository;

	@Rule
	public final ExpectedException exception = ExpectedException.none();

	@Before
	public void setup() {
		MockitoAnnotations.initMocks(this);
		this.service = new CheckoutService(checkoutRepository, bookRepository);
	}

	@Test
	public void canBorrowNeverBorrowedBook() {
		// given
		long bookId = 1L;
		given(checkoutRepository.findFirstByBookIdOrderByCheckoutDateDesc(bookId))
				.willReturn(Optional.ofNullable(null));
		given(bookRepository.findById(bookId))
				.willReturn(Optional.ofNullable(new Book("title", "author", "")));

		// when
		service.borrowBook(bookId);

		// then
		verify(checkoutRepository, times(1)).save(any());
	}

	@Test
	public void canBorrowReturnedBook() {
		// given
		long bookId = 1L;
		Book book = new Book("title", "author", "descr");
		book.setId(bookId);
		Checkout checkout = new Checkout(book, LocalDateTime.now().minusDays(3),
				LocalDateTime.now().minusDays(1));
		given(checkoutRepository.findFirstByBookIdOrderByCheckoutDateDesc(bookId))
				.willReturn(Optional.ofNullable((checkout)));
		given(bookRepository.findById(bookId)).willReturn(Optional.ofNullable(book));

		// when
		service.borrowBook(bookId);

		// then
		verify(checkoutRepository, times(1)).save(any());
	}

	@Test
	public void notReturnedBookCannotBeBorrowed() {
		// given
		long bookId = 1L;
		Book book = new Book("title", "author", "descr");
		book.setId(bookId);
		Checkout checkout = new Checkout(book, LocalDateTime.now().minusDays(3), null);
		given(checkoutRepository.findFirstByBookIdOrderByCheckoutDateDesc(bookId))
				.willReturn(Optional.ofNullable((checkout)));
		given(bookRepository.findById(bookId)).willReturn(Optional.ofNullable(book));

		// then
		exception.expect(BookCheckoutException.class);
		service.borrowBook(bookId);
	}

}
