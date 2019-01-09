package com.example.rekrutacjepstrg3.simplelibrary.domain;

import java.time.LocalDateTime;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "checkout")
public class Checkout {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;

	@OneToOne(cascade = { CascadeType.MERGE })
	@JoinColumn(name = "book_id")
	private Book book;

	@NotNull
	@Column(name = "checkout_date")
	private LocalDateTime checkoutDate;

	@Column(name = "return_date")
	private LocalDateTime returnDate;

	public Checkout(Book book, LocalDateTime checkoutDate, LocalDateTime returnDate) {
		this.book = book;
		this.checkoutDate = checkoutDate;
		this.returnDate = returnDate;
	}

	public Checkout() {

	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Book getBook() {
		return book;
	}

	public void setBooks(Book book) {
		this.book = book;
	}

	public LocalDateTime getCheckoutDate() {
		return checkoutDate;
	}

	public void setCheckoutDate(LocalDateTime checkoutDate) {
		this.checkoutDate = checkoutDate;
	}

	public LocalDateTime getReturnDate() {
		return returnDate;
	}

	public void setReturnDate(LocalDateTime returnDate) {
		this.returnDate = returnDate;
	}

}