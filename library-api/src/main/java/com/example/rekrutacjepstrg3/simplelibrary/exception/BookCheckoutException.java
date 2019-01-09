package com.example.rekrutacjepstrg3.simplelibrary.exception;

public class BookCheckoutException extends RuntimeException {

	public BookCheckoutException() {
		super();
	}

	public BookCheckoutException(final String message, final Throwable cause) {
		super(message, cause);
	}

	public BookCheckoutException(final String message) {
		super(message);
	}

	public BookCheckoutException(final Throwable cause) {
		super(cause);
	}
}
