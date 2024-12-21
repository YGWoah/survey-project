package me.massoudi.surveyservice.service;


import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import me.massoudi.surveyservice.dto.QuestionDTO;
import me.massoudi.surveyservice.dto.SurveyDTO;
import me.massoudi.surveyservice.entity.Question;
import me.massoudi.surveyservice.entity.Survey;
import me.massoudi.surveyservice.exceptions.ResourceNotFoundException;
import me.massoudi.surveyservice.mapper.QuestionMapper;
import me.massoudi.surveyservice.mapper.SurveyMapper;
import me.massoudi.surveyservice.repo.SurveyRepository;
import me.massoudi.surveyservice.utils.ValidationUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class SurveyService {

    private final SurveyRepository surveyRepository;
    private final SurveyMapper surveyMapper;
    private final QuestionMapper questionMapper;

    public SurveyDTO createSurvey(SurveyDTO surveyDTO, String ownerUsername) {

        Survey survey = surveyMapper.toEntity(surveyDTO);
        if (survey.getQuestions() == null || survey.getQuestions().isEmpty()) {
            throw new IllegalArgumentException("Survey must have at least one question");
        }
        survey.setOwnerUsername(ownerUsername);

        List<Question> questions = surveyDTO.getQuestions().stream()
                .map(questionMapper::toEntity).toList();

        questions = questions.stream().map(question -> {
            question.setSurvey(survey);
            return question;
        }).collect(Collectors.toList());

        survey.setQuestions(questions);
        Survey savedSurvey = surveyRepository.save(survey);
        return surveyMapper.toDto(savedSurvey);
    }

    public List<SurveyDTO> getAllSurveys() {
        List<Survey> surveys = surveyRepository.findAll();
        return surveys.stream().map(surveyMapper::toDto).toList();
    }

    public Survey getSurveyById(Long surveyId) {
        return surveyRepository.findById(surveyId).orElseThrow(() -> new ResourceNotFoundException("Survey"));
    }

    // I also should somehow pass the username and check if the user is the one who's updating it
    //
    public SurveyDTO updateSurvey(Long surveyId, SurveyDTO surveyDTO) {
        validateSurveyDTO(surveyId, surveyDTO);
        Survey existingSurvey = surveyRepository.findById(surveyId)
                .orElseThrow(() -> new ResourceNotFoundException("Survey not found"));

        updateSurveyBasicInfo(existingSurvey, surveyDTO);
        updateSurveyQuestions(existingSurvey, surveyDTO.getQuestions());

        try {
            Survey savedSurvey = surveyRepository.save(existingSurvey);
            return surveyMapper.toDto(savedSurvey);
        } catch (Exception e) {
            throw new RuntimeException("Failed to update survey", e);
        }
    }

    private void validateSurveyDTO(Long surveyId, SurveyDTO surveyDTO) {
        ValidationUtils.validateNotNull(surveyId, "Survey ID");
        ValidationUtils.validateNotNull(surveyDTO, "Survey DTO");
        ValidationUtils.validateNotBlank(surveyDTO.getTitle(), "Survey title");
        ValidationUtils.validateNotBlank(surveyDTO.getDescription(), "Survey description");
        ValidationUtils.validateNotNull(surveyDTO.getQuestions(), "Questions list");

        // Validate each question
        surveyDTO.getQuestions().forEach(questionDTO -> {
            ValidationUtils.validateNotNull(questionDTO, "Question");
            ValidationUtils.validateNotBlank(questionDTO.getText(), "Question text");
        });
    }

    private void updateSurveyBasicInfo(Survey survey, SurveyDTO surveyDTO) {
        survey.setTitle(surveyDTO.getTitle());
        survey.setDescription(surveyDTO.getDescription());
    }

    private void updateSurveyQuestions(Survey survey, List<QuestionDTO> questionDTOs) {
        List<Question> existingQuestions = survey.getQuestions();

        questionDTOs.forEach(questionDTO -> {
            existingQuestions.stream()
                    .filter(existingQuestion -> existingQuestion.getId().equals(questionDTO.getId()))
                    .findFirst()
                    .ifPresentOrElse(
                            existingQuestion -> existingQuestion.setText(questionDTO.getText()),
                            () -> addNewQuestion(survey, questionDTO, existingQuestions)
                    );
        });
    }

    private void addNewQuestion(Survey survey, QuestionDTO questionDTO, List<Question> existingQuestions) {
        Question newQuestion = questionMapper.toEntity(questionDTO);
        newQuestion.setSurvey(survey);
        existingQuestions.add(newQuestion);
    }

    public List<SurveyDTO> getSurveysByOwnerUsername(String ownerUsername) {
        List<Survey> surveys = surveyRepository.getSurveyByOwnerUsername(ownerUsername);
        return surveys.stream().map(surveyMapper::toDto).toList();
    }

    public void deleteSurvey(Long surveyId) {
        // TODO : DELETE ALL THE ASSOCIATED QUESTIONS AND ANSERWS
        surveyRepository.deleteById(surveyId);
    }
}
