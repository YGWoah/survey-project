package me.massoudi.surveyservice.dto;

import lombok.Data;

import java.util.List;


@Data
public class ResponseDTO {
    private String username;
    private List<QuestionResponseDTO> responses;
}
