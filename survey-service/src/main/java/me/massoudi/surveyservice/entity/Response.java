package me.massoudi.surveyservice.entity;


import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;


@Entity
@Data
@ToString(exclude = {"question"})
public class Response {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String answer;
    private String username;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "question_id")
    private Question question;
}

