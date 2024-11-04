package me.massoudi.surveyservice.service;


import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import me.massoudi.surveyservice.dto.SurveyDTO;
import me.massoudi.surveyservice.entity.Question;
import me.massoudi.surveyservice.entity.Survey;
import me.massoudi.surveyservice.mapper.QuestionMapper;
import me.massoudi.surveyservice.mapper.SurveyMapper;
import me.massoudi.surveyservice.repo.SurveyRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class SurveyService {

    private final SurveyRepository surveyRepository;
    private final SurveyMapper surveyMapper;
    private final QuestionMapper questionMapper;

    public SurveyDTO createSurvey(SurveyDTO surveyDTO) {

        Survey survey = surveyMapper.toEntity(surveyDTO);
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
//        System.out.println(surveys);
        List<SurveyDTO>  surveyDTOS = surveys.stream().map(surveyMapper::toDto).toList();
        System.out.println(surveyDTOS);

        return surveyDTOS;
    }

    public Survey getSurveyById(Long surveyId) {
        return surveyRepository.findById(surveyId).orElseThrow(() -> new RuntimeException("Survey not found"));
    }

    public Survey updateSurvey(Long surveyId, Survey survey) {
        Survey existingSurvey = getSurveyById(surveyId);
        existingSurvey.setTitle(survey.getTitle());
        existingSurvey.setDescription(survey.getDescription());
        return surveyRepository.save(existingSurvey);
    }

    public void deleteSurvey(Long surveyId) {
        surveyRepository.deleteById(surveyId);
    }
}
