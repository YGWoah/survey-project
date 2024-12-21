package me.massoudi.surveyservice.exceptions;



import org.springframework.http.HttpStatus;

import java.util.Map;

public class ResourceNotFoundException extends BaseException {
    private static final String DEFAULT_ERROR_CODE = "RESOURCE_NOT_FOUND";

    public ResourceNotFoundException(String message) {
        super(message, DEFAULT_ERROR_CODE, HttpStatus.NOT_FOUND);
    }

}
