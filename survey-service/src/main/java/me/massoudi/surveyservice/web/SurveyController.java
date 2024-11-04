package me.massoudi.surveyservice.web;


import me.massoudi.surveyservice.dto.SurveyDTO;
import me.massoudi.surveyservice.entity.Survey;
import org.springframework.web.bind.annotation.*;
import me.massoudi.surveyservice.service.SurveyService;

import java.util.List;

@RestController
@RequestMapping("/api/surveys")
public class SurveyController {

    private final SurveyService surveyService;

    public SurveyController(SurveyService surveyService) {
        this.surveyService = surveyService;
    }

    @PostMapping
    public SurveyDTO createSurvey(@RequestBody SurveyDTO survey) {
        return surveyService.createSurvey(survey);
    }

    @GetMapping
    public List<SurveyDTO> getAllSurveys() {
        return surveyService.getAllSurveys();
    }

    @GetMapping("/{surveyId}")
    public Survey getSurveyById(@PathVariable Long surveyId) {
        return surveyService.getSurveyById(surveyId);
    }

    @PutMapping("/{surveyId}")
    public Survey updateSurvey(@PathVariable Long surveyId, @RequestBody Survey survey) {
        return surveyService.updateSurvey(surveyId, survey);
    }

    @DeleteMapping("/{surveyId}")
    public void deleteSurvey(@PathVariable Long surveyId) {
        surveyService.deleteSurvey(surveyId);
    }
}
