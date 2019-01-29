package com.example.rekrutacjepstrg3.simplelibrary.controller;

import static io.restassured.RestAssured.given;
import static io.restassured.RestAssured.when;
import static org.hamcrest.CoreMatchers.containsString;
import static org.hamcrest.CoreMatchers.nullValue;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.test.context.junit4.SpringRunner;

import com.example.rekrutacjepstrg3.simplelibrary.domain.Book;
import com.example.rekrutacjepstrg3.simplelibrary.domain.Checkout;
import com.example.rekrutacjepstrg3.simplelibrary.repository.BookRepository;
import com.example.rekrutacjepstrg3.simplelibrary.repository.CheckoutRepository;

import io.restassured.RestAssured;
import io.restassured.http.ContentType;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class CheckoutControllerIntegrationTest {

	@LocalServerPort
	int port;

	@Autowired
	BookRepository bookRepository;

	@Autowired
	CheckoutRepository checkoutRepository;

	@Before
	public void setup() {
		RestAssured.port = port;
		bookRepository.save(new Book("first book", "author1", ""));
		bookRepository.save(new Book("second book", "author2", ""));
		bookRepository.save(new Book("third book", "author3", ""));
	}

	@Test
	public void testBorrowBook() {
		Book book = bookRepository.findByTitle("first book").get(0);
		// @formatter:off
		when()
			.post("/api/borrow/" + book.getId())
		.then()
			.statusCode(HttpStatus.OK.value())
			.assertThat().body("checkoutDate", containsString(LocalDate.now().toString()))
			.assertThat().body("returnDate", nullValue())
			.assertThat().body("book.title", containsString("first book"));
		// @formatter:on
	}

	@Test
	public void testReturnBook() {
		Book book = bookRepository.findByTitle("first book").get(0);
		Checkout checkout = checkoutRepository
				.save(new Checkout(book, LocalDateTime.now().minusDays(2), null));
		// @formatter:off
		given()
			.contentType(ContentType.JSON)
			.body(checkout)
		.when()
			.put("/api/return")
		.then()
			.statusCode(HttpStatus.OK.value())
			.assertThat().body("returnDate", containsString(LocalDate.now().toString()));
		// @formatter:on
	}

}
