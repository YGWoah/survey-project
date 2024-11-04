package me.massoudi.surveyservice.dto;

import lombok.Data;

import java.util.List;

@Data
public class SurveyDTO {
    private Long id;
    private String title;
    private String description;
    private String ownerUsername;
    private List<QuestionDTO> questions;

}