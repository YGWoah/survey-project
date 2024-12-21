package me.massoudi.surveyservice.web;


import me.massoudi.surveyservice.dto.SurveyDTO;
import me.massoudi.surveyservice.entity.Survey;
import org.springframework.boot.autoconfigure.security.oauth2.resource.OAuth2ResourceServerProperties;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.OAuth2AuthenticatedPrincipal;
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
    public SurveyDTO createSurvey(@RequestBody SurveyDTO survey, @AuthenticationPrincipal OAuth2AuthenticatedPrincipal jwt, Authentication authentication) {
        String username = authentication.getName();
        return surveyService.createSurvey(survey,username);
    }

    @GetMapping("/my-surveys")
    public List<SurveyDTO> getSurveysByUsername(Authentication authentication) {
        String username = authentication.getName();
        return surveyService.getSurveysByOwnerUsername(username);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public List<SurveyDTO> getAllSurveys() {
        return surveyService.getAllSurveys();
    }

    @GetMapping("/{surveyId}")
    public Survey getSurveyById(@PathVariable Long surveyId) {
        return surveyService.getSurveyById(surveyId);
    }

    @PutMapping("/{surveyId}")
    public SurveyDTO updateSurvey(@PathVariable Long surveyId, @RequestBody SurveyDTO surveyDTO) {
        System.out.println("surveyId = " + surveyId);
        return surveyService.updateSurvey(surveyId, surveyDTO);
    }

    @DeleteMapping("/{surveyId}")
    public void deleteSurvey(@PathVariable Long surveyId) {
        surveyService.deleteSurvey(surveyId);
    }
}
