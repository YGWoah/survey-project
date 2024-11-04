package me.massoudi.surveyservice.dto;

import lombok.Data;

@Data
public class QuestionResponseDTO {
    private Long questionId;
    private String answer;
}
