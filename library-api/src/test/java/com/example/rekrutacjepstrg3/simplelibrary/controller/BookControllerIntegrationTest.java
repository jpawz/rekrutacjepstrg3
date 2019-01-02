package com.example.rekrutacjepstrg3.simplelibrary.controller;

import static io.restassured.RestAssured.given;

import java.util.HashMap;
import java.util.Map;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.test.context.junit4.SpringRunner;

import com.example.rekrutacjepstrg3.simplelibrary.domain.Book;
import com.example.rekrutacjepstrg3.simplelibrary.repository.BookRepository;

import io.restassured.RestAssured;
import io.restassured.http.ContentType;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class BookControllerIntegrationTest {

	@LocalServerPort
	int port;

	@Autowired
	BookRepository repository;

	@Before
	public void setup() {
		RestAssured.port = port;
	}

	@Test
	public void checkAddBook() {
		Map<Book, Integer> bookAndStatus = new HashMap<>();
		bookAndStatus.put(new Book("title", "author", ""), HttpStatus.CREATED.value());
		bookAndStatus.put(new Book("", "author", "description"), HttpStatus.BAD_REQUEST.value());
		bookAndStatus.put(new Book("title", "", ""), HttpStatus.BAD_REQUEST.value());

		bookAndStatus.forEach((book, status) -> {
			// @formatter:off
			given()
				.contentType(ContentType.JSON)
				.body(book)
			.when()
				.post("/book/add")
			.then()
				.statusCode(status);
			// @formatter:on
		});
	}

	@Test
	public void checkUpdateBook() {
		Book book = repository.save(new Book("The title", "The author", "anything"));

		book.setAuthor("");
		makePutRequest(book, HttpStatus.BAD_REQUEST.value());
		book.setAuthor("The author");

		book.setTitle("");
		makePutRequest(book, HttpStatus.BAD_REQUEST.value());

		book.setTitle("Correct Title");
		makePutRequest(book, HttpStatus.OK.value());
	}

	private void makePutRequest(Book body, int expectedStatus) {
		// @// @formatter:off
		given()
			.contentType(ContentType.JSON)
			.body(body)
		.when()
			.put("/book/" + body.getId())
		.then()
			.statusCode(expectedStatus);
		// @formatter:on
	}
}