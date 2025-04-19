package br.com.cargidoso.medmap.exception;

public class NotFoundEntityException extends RuntimeException {

	public NotFoundEntityException(String message) {
		super(message);
	}
}