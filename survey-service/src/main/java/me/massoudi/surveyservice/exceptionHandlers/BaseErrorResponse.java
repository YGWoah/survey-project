package me.massoudi.surveyservice.exceptionHandlers;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.Map;

@Data
public class BaseErrorResponse {
    private LocalDateTime timestamp;
    private String errorCode;
    private String message;
    private String path;
    private Map<String, Object> additionalData;

    public BaseErrorResponse(String errorCode, String message, String path) {
        this.timestamp = LocalDateTime.now();
        this.errorCode = errorCode;
        this.message = message;
        this.path = path;
    }

}
