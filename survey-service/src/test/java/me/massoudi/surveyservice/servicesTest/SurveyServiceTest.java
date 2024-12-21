package me.massoudi.surveyservice.servicesTest;

import me.massoudi.surveyservice.dto.QuestionDTO;
import me.massoudi.surveyservice.dto.SurveyDTO;
import me.massoudi.surveyservice.entity.Question;
import me.massoudi.surveyservice.entity.Survey;
import me.massoudi.surveyservice.exceptions.ResourceNotFoundException;
import me.massoudi.surveyservice.mapper.QuestionMapper;
import me.massoudi.surveyservice.mapper.SurveyMapper;
import me.massoudi.surveyservice.repo.SurveyRepository;
import me.massoudi.surveyservice.service.SurveyService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class SurveyServiceTest {

    @Mock
    private SurveyRepository surveyRepository;

    @Mock
    private SurveyMapper surveyMapper;

    @Mock
    private QuestionMapper questionMapper;

    @InjectMocks
    private SurveyService surveyService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testUpdateSurvey() {
        SurveyDTO surveyDTO = new SurveyDTO();
        surveyDTO.setTitle("Updated Survey");
        surveyDTO.setDescription("Updated Description");

        QuestionDTO questionDTO1 = new QuestionDTO();
        questionDTO1.setText("Updated Question 1");

        QuestionDTO questionDTO2 = new QuestionDTO();
        questionDTO2.setText("New Question 2");

        List<QuestionDTO> questionDTOList = new ArrayList<>();
        questionDTOList.add(questionDTO1);
        questionDTOList.add(questionDTO2);
        surveyDTO.setQuestions(questionDTOList);

        SurveyDTO savedSurvey = surveyService.createSurvey(surveyDTO, "testuser");


        SurveyDTO updatedSurveyDto = new SurveyDTO();
        updatedSurveyDto.setId(savedSurvey.getId());
        surveyDTO.setTitle("Updated Survey");
        surveyDTO.setDescription("Updated Description");

        QuestionDTO updatedQuestionDTO1 = new QuestionDTO();
        questionDTO1.setText("Updated Question 3");

        QuestionDTO updatedQuestionDTO2 = new QuestionDTO();
        questionDTO2.setText("New Question 4");

        List<QuestionDTO> updatedQuestionDTOList = new ArrayList<>();
        updatedQuestionDTOList.add(updatedQuestionDTO1);
        updatedQuestionDTOList.add(updatedQuestionDTO2);
        updatedSurveyDto.setQuestions(questionDTOList);


        SurveyDTO updatedSavedSurveyDto = surveyService.updateSurvey(savedSurvey.getId(), updatedSurveyDto);

        // verify that the survey in the id is updated


    }

    @Test
    public void testCreateSurvey() {
        SurveyDTO surveyDTO = new SurveyDTO();
        surveyDTO.setTitle("New Survey");
        surveyDTO.setDescription("Survey Description");

        QuestionDTO questionDTO1 = new QuestionDTO();
        questionDTO1.setText("Question 1");

        QuestionDTO questionDTO2 = new QuestionDTO();
        questionDTO2.setText("Question 2");

        List<QuestionDTO> questionDTOList = new ArrayList<>();
        questionDTOList.add(questionDTO1);
        questionDTOList.add(questionDTO2);
        surveyDTO.setQuestions(questionDTOList);

        // Prepare the Survey entity
        Survey survey = new Survey();
        survey.setTitle("New Survey");
        survey.setDescription("Survey Description");

        Question question1 = new Question();
        question1.setText("Question 1");
        question1.setSurvey(survey);

        Question question2 = new Question();
        question2.setText("Question 2");
        question2.setSurvey(survey);

        List<Question> questionList = new ArrayList<>();
        questionList.add(question1);
        questionList.add(question2);
        survey.setQuestions(questionList);

        // Mock the behavior of the repository and mappers
        when(surveyMapper.toEntity(any(SurveyDTO.class))).thenReturn(survey);
        when(questionMapper.toEntity(any(QuestionDTO.class))).thenReturn(question1, question2);
        when(surveyRepository.save(any(Survey.class))).thenReturn(survey);
        when(surveyMapper.toDto(any(Survey.class))).thenReturn(surveyDTO);

        // Call the createSurvey method
        SurveyDTO createdSurvey = surveyService.createSurvey(surveyDTO, "testuser");

        // Verify the results
        assertNotNull(createdSurvey);
        assertEquals("New Survey", createdSurvey.getTitle());
        assertEquals("Survey Description", createdSurvey.getDescription());
        assertEquals(2, createdSurvey.getQuestions().size());
        assertEquals("Question 1", createdSurvey.getQuestions().get(0).getText());
        assertEquals("Question 2", createdSurvey.getQuestions().get(1).getText());

        // Verify that the repository save method was called
        verify(surveyRepository, times(1)).save(any(Survey.class));
    }


    @Test
    public void testCreateSurvey_2() {
        SurveyDTO surveyDTO = new SurveyDTO();
        surveyDTO.setTitle("New Survey");
        surveyDTO.setDescription("Survey Description");

        QuestionDTO questionDTO1 = new QuestionDTO();
        questionDTO1.setText("Question 1");

        QuestionDTO questionDTO2 = new QuestionDTO();
        questionDTO2.setText("Question 2");

        List<QuestionDTO> questionDTOList = new ArrayList<>();
        questionDTOList.add(questionDTO1);
        questionDTOList.add(questionDTO2);
        surveyDTO.setQuestions(questionDTOList);

        // Prepare the Survey entity
        Survey survey = new Survey();
        survey.setTitle("New Survey");
        survey.setDescription("Survey Description");

        Question question1 = new Question();
        question1.setText("Question 1");
        question1.setSurvey(survey);

        Question question2 = new Question();
        question2.setText("Question 2");
        question2.setSurvey(survey);

        List<Question> questionList = new ArrayList<>();
        questionList.add(question1);
        questionList.add(question2);
        survey.setQuestions(questionList);

        // Mock the behavior of the repository and mappers
        when(surveyMapper.toEntity(any(SurveyDTO.class))).thenReturn(survey);
        when(questionMapper.toEntity(any(QuestionDTO.class))).thenReturn(question1, question2);
        when(surveyRepository.save(any(Survey.class))).thenReturn(survey);
        when(surveyMapper.toDto(any(Survey.class))).thenReturn(surveyDTO);

        // Call the createSurvey method
        SurveyDTO createdSurvey = surveyService.updateSurvey(surveyDTO.getId(), surveyDTO);

        // Verify the results
        assertNotNull(createdSurvey);
        assertEquals("New Survey", createdSurvey.getTitle());
        assertEquals("Survey Description", createdSurvey.getDescription());
        assertEquals(2, createdSurvey.getQuestions().size());
        assertEquals("Question 1", createdSurvey.getQuestions().get(0).getText());
        assertEquals("Question 2", createdSurvey.getQuestions().get(1).getText());

        // Verify that the repository save method was called
        verify(surveyRepository, times(1)).save(any(Survey.class));
    }
}
