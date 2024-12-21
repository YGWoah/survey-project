package me.massoudi.surveyservice.servicesTest.SurveyService;

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
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UpdateSurvey_Test {

    @Mock
    private SurveyRepository surveyRepository;

    @Mock
    private QuestionMapper questionMapper;

    @Mock
    private SurveyMapper surveyMapper;

    @InjectMocks
    private SurveyService surveyService;

    private Survey existingSurvey;
    private SurveyDTO surveyDTO;
    private Question question1;
    private Question question2;
    private QuestionDTO questionDTO1;
    private QuestionDTO questionDTO2;
    private QuestionDTO newQuestion;

    @BeforeEach
    void setUp() {
        // Initialize existing survey
        existingSurvey = new Survey();
        existingSurvey.setId(1L);
        existingSurvey.setTitle("Original Title");
        existingSurvey.setDescription("Original Description");

        // Initialize existing questions
        question1 = new Question();
        question1.setId(1L);
        question1.setText("Original Question 1");
        question1.setSurvey(existingSurvey);

        question2 = new Question();
        question2.setId(2L);
        question2.setText("Original Question 2");
        question2.setSurvey(existingSurvey);

        existingSurvey.setQuestions(new ArrayList<>(Arrays.asList(question1, question2)));

        // Initialize DTOs
        surveyDTO = new SurveyDTO();
        surveyDTO.setId(1L);
        surveyDTO.setTitle("Updated Title");
        surveyDTO.setDescription("Updated Description");

        questionDTO1 = new QuestionDTO();
        questionDTO1.setId(1L);
        questionDTO1.setText("Updated Question 1");

        questionDTO2 = new QuestionDTO();
        questionDTO2.setId(2L);
        questionDTO2.setText("Updated Question 2");

        surveyDTO.setQuestions(Arrays.asList(questionDTO1, questionDTO2));

        // initialize the new question
        newQuestion = QuestionDTO.builder().text("new question").build();

    }

    @Test
    void updateSurvey_Success() {
        // Arrange
        when(surveyRepository.findById(1L)).thenReturn(Optional.of(existingSurvey));
        when(surveyRepository.save(any(Survey.class))).thenReturn(existingSurvey);
        when(surveyMapper.toDto(any(Survey.class))).thenReturn(surveyDTO);

        System.out.println("surveydto question size = " + surveyDTO.getQuestions().size());
        // Act
        SurveyDTO result = surveyService.updateSurvey(1L, surveyDTO);

        System.out.println("surveydto question size = " + surveyDTO.getQuestions().size());
        // Assert
        assertNotNull(result);
        assertEquals("Updated Title", existingSurvey.getTitle());
        assertEquals("Updated Description", existingSurvey.getDescription());
        verify(surveyRepository, times(1)).save(existingSurvey);
        verify(surveyMapper, times(1)).toDto(existingSurvey);
    }

    @Test
    void updateSurvey_WithNewQuestion() {
        // Arrange
        QuestionDTO newQuestionDTO = new QuestionDTO();
        newQuestionDTO.setId(3L);
        newQuestionDTO.setText("New Question");
        List<QuestionDTO> surveyQuestion = new ArrayList<>();
        surveyQuestion.add(newQuestionDTO);
        surveyDTO.setQuestions(surveyQuestion);

        Question newQuestion = new Question();
        newQuestion.setId(3L);
        newQuestion.setText("New Question");

        when(surveyRepository.findById(1L)).thenReturn(Optional.of(existingSurvey));
        when(questionMapper.toEntity(newQuestionDTO)).thenReturn(newQuestion);
        when(surveyRepository.save(any(Survey.class))).thenReturn(existingSurvey);
        when(surveyMapper.toDto(any(Survey.class))).thenReturn(surveyDTO);

        // Act
        SurveyDTO result = surveyService.updateSurvey(1L, surveyDTO);

        // Assert
        assertNotNull(result);
        assertEquals(3, existingSurvey.getQuestions().size());
        verify(questionMapper, times(1)).toEntity(newQuestionDTO);
        verify(surveyRepository).save(existingSurvey);
    }

    @Test
    void updateSurvey_SurveyNotFound() {
        // Arrange
        when(surveyRepository.findById(1L))
                .thenThrow(new ResourceNotFoundException("Survey not found"));

        // Act & Assert
        assertThrows(ResourceNotFoundException.class, () ->
                surveyService.updateSurvey(1L, surveyDTO)
        );
        verify(surveyRepository, never()).save(any());
    }

    @Test
    void updateSurvey_InvalidInput() {
        // Arrange
        surveyDTO.setTitle(null); // Invalid input
        when(surveyRepository.findById(1L)).thenReturn(Optional.of(existingSurvey));
        when(surveyRepository.save(any()))
                .thenThrow(new IllegalArgumentException("Title cannot be null"));

        // Act & Assert
        assertThrows(IllegalArgumentException.class, () ->
                surveyService.updateSurvey(1L, surveyDTO)
        );
    }
}
