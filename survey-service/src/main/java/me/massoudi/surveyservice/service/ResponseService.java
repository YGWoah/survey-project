package me.massoudi.surveyservice.service;

import lombok.AllArgsConstructor;
import me.massoudi.surveyservice.dto.QuestionResponseDTO;
import me.massoudi.surveyservice.dto.ResponseDTO;
import me.massoudi.surveyservice.entity.Question;
import me.massoudi.surveyservice.entity.Response;
import me.massoudi.surveyservice.entity.Survey;
import me.massoudi.surveyservice.mapper.ResponseMapper;
import me.massoudi.surveyservice.repo.ResponseRepository;
import me.massoudi.surveyservice.repo.SurveyRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ResponseService {

    private final ResponseRepository responseRepository;
    private final SurveyRepository surveyRepository;
    private final ResponseMapper responseMapper;


    public ResponseDTO submitResponse(Long surveyId, ResponseDTO responseDTO) {
        Survey survey = surveyRepository.getById(surveyId);
        List<Response> responses = responseDTO.getResponses().stream().map(questionResponseDTO -> {
            Response response = new Response();
            response.setAnswer(questionResponseDTO.getAnswer());
//            response.setUsername(responseDTO.getUsername());
            response.setSurvey(survey);
            Question question = new Question();
            question.setId(questionResponseDTO.getQuestionId());
            response.setQuestion(question);
            return response;
        }).collect(Collectors.toList());

        List<Response> savedResponses = responseRepository.saveAll(responses);
        ResponseDTO savedResponseDTO = new ResponseDTO();
        savedResponseDTO.setUsername(responseDTO.getUsername());
        savedResponseDTO.setResponses(savedResponses.stream().map(response -> {
            QuestionResponseDTO questionResponseDTO = new QuestionResponseDTO();
            questionResponseDTO.setQuestionId(response.getQuestion().getId());
            questionResponseDTO.setAnswer(response.getAnswer());
            return questionResponseDTO;
        }).collect(Collectors.toList()));

        return savedResponseDTO;
    }

    public List<Response> getResponses(Long surveyId) {
        return responseRepository.findBySurveyId(surveyId);
    }

    public ResponseDTO getResponseById(Long surveyId, Long responseId) {
        Survey survey = surveyRepository.getById(surveyId);
        Response response = responseRepository.findResponseByIdAndSurvey(responseId, survey);
        return responseMapper.toDto(response);
    }

    public void deleteResponse(Long surveyId, Long responseId) {
        responseRepository.deleteById(responseId);
    }
}
