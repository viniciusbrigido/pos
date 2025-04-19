package br.com.cargidoso.medmap.handler;

import br.com.cargidoso.medmap.exception.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler({
            NotFoundEntityException.class,
            InvalidCpfException.class,
            BusinessException.class
    })
    public ResponseEntity<Object> handleNotFoundEntity(RuntimeException runtimeException) {
        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
        return new ResponseEntity<>(getErrorResponse(runtimeException.getMessage(), status), status);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationErrors(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error ->
                errors.put(error.getField(), error.getDefaultMessage())
        );
        return ResponseEntity.badRequest().body(errors);
    }

    private ErrorResponse getErrorResponse(String message, HttpStatus status) {
        String statusMessage = "%s - %s".formatted(status.value(), status.getReasonPhrase());
        return new ErrorResponse(statusMessage, message) {
        };
    }
}
