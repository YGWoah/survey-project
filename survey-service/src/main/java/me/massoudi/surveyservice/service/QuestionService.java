package me.massoudi.surveyservice.service;

import lombok.AllArgsConstructor;
import me.massoudi.surveyservice.dto.QuestionDTO;
import me.massoudi.surveyservice.dto.SurveyDTO;
import me.massoudi.surveyservice.entity.Question;
import me.massoudi.surveyservice.entity.Survey;
import me.massoudi.surveyservice.mapper.QuestionMapper;
import me.massoudi.surveyservice.mapper.SurveyMapper;
import me.massoudi.surveyservice.repo.QuestionRepository;
import me.massoudi.surveyservice.repo.SurveyRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class QuestionService {

    private final QuestionRepository questionRepository;
    private final QuestionMapper questionMapper;
    private final SurveyRepository surveyRepository;
    private final SurveyMapper surveyMapper;

    public SurveyDTO addQuestion(Long surveyId, QuestionDTO questionDTO) {
        Survey survey = surveyRepository.findById(surveyId).orElseThrow(() -> new RuntimeException("Survey not found"));
        Question question = questionMapper.toEntity(questionDTO);
        question.setSurvey(survey);
        questionRepository.save(question);
        return surveyMapper.toDto(survey);
    }


    public List<QuestionDTO> getQuestions(Long surveyId) {
        List<Question> questions = questionRepository.findBySurveyId(surveyId);
        return questions.stream().map(questionMapper::toDto).toList();
    }

    public Question updateQuestion(Long surveyId, Long questionId, QuestionDTO question) {
        Question existingQuestion = questionRepository.findById(questionId).orElseThrow(() -> new RuntimeException("Question not found"));
        existingQuestion.setText(question.getText());
        return questionRepository.save(existingQuestion);
    }

    public void deleteQuestion(Long surveyId, Long questionId) {
        questionRepository.deleteById(questionId);
    }
}
