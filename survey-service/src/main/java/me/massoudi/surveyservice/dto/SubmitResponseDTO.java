package me.massoudi.surveyservice.dto;

import lombok.Data;

import java.util.List;


@Data
public class SubmitResponseDTO {
    private String username;
    private List<QuestionResponseDTO> responses;
}
