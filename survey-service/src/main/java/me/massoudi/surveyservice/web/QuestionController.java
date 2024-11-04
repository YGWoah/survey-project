package me.massoudi.surveyservice.web;


import me.massoudi.surveyservice.dto.QuestionDTO;
import me.massoudi.surveyservice.dto.SurveyDTO;
import me.massoudi.surveyservice.entity.Question;
import me.massoudi.surveyservice.service.QuestionService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/surveys/{surveyId}/questions")
public class QuestionController {

    private final QuestionService questionService;

    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @PostMapping
    public SurveyDTO addQuestion(@PathVariable Long surveyId, @RequestBody QuestionDTO questionDTO) {
        return questionService.addQuestion(surveyId, questionDTO);
    }

    @GetMapping
    public List<QuestionDTO> getQuestions(@PathVariable Long surveyId) {
        return questionService.getQuestions(surveyId);
    }

    @PutMapping("/{questionId}")
    public Question updateQuestion(@PathVariable Long surveyId, @PathVariable Long questionId, @RequestBody Question question) {
        return questionService.updateQuestion(surveyId, questionId, question);
    }

    @DeleteMapping("/{questionId}")
    public void deleteQuestion(@PathVariable Long surveyId, @PathVariable Long questionId) {
        questionService.deleteQuestion(surveyId, questionId);
    }
}
