package me.massoudi.surveyservice.exceptionHandlers;

import me.massoudi.surveyservice.exceptions.BaseException;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.ServletWebRequest;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.List;
import java.util.stream.Collectors;

@ControllerAdvice
@Order(Ordered.HIGHEST_PRECEDENCE)
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(BaseException.class)
    public ResponseEntity<BaseErrorResponse> handleBaseException(
            BaseException exception,
            WebRequest request
    ) {
        BaseErrorResponse errorResponse = new BaseErrorResponse(
                exception.getErrorCode(),
                exception.getMessage(),
                ((ServletWebRequest) request).getRequest().getRequestURI());
        return new ResponseEntity<>(errorResponse, exception.getHttpStatus());
    }

//    @ExceptionHandler(MethodArgumentNotValidException.class)
//    public ResponseEntity<BaseErrorResponse> handleMethodArgumentNotValid(
//            MethodArgumentNotValidException ex,
//            WebRequest request
//    ) {
//        List<String> validationErrors = ex.getBindingResult()
//                .getFieldErrors()
//                .stream()
//                .map(error -> error.getField() + ": " + error.getDefaultMessage())
//                .collect(Collectors.toList());
//
//
//        BaseErrorResponse errorResponse = new BaseErrorResponse(
//                "VALIDATION_ERROR",
//                "Validation failed",
//                ((ServletWebRequest) request).getRequest().getRequestURI());
//        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
//    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<BaseErrorResponse> handleAllUncaughtException(
            Exception exception,
            WebRequest request
    ) {
        BaseErrorResponse errorResponse = new BaseErrorResponse(
                "INTERNAL_SERVER_ERROR",
                "An unexpected error occurred",
                ((ServletWebRequest) request).getRequest().getRequestURI());
        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
