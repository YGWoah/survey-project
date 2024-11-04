package me.massoudi.surveyservice.entity;


import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;


@Entity
@Data
public class Response {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String respondent;
    private String answer;
    private String username;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "survey_id")
    private Survey survey;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "question_id")
    private Question question;
}

