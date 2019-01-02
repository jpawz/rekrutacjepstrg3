package com.example.rekrutacjepstrg3.simplelibrary.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;

@Entity
public class Book {

	public Book(String title, String author, String description) {
		this.title = title;
		this.author = author;
		this.description = description;
	}

	public Book() {
		this.title = null;
		this.author = null;
		this.description = null;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@NotBlank
	private String title;

	@NotBlank
	private String author;

	private String description;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getTitle() {
		return title;
	}

	public String getAuthor() {
		return author;
	}

	public String getDescription() {
		return description;
	}

}
