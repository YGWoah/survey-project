package me.massoudi.surveyservice.dto;

import lombok.Data;

@Data
public class ResponseDTO {
    private Long id;
    private String answer;
    private String username;
}
