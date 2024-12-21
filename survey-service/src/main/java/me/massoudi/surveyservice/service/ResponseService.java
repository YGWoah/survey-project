package me.massoudi.surveyservice.service;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import me.massoudi.surveyservice.dto.QuestionResponseDTO;
import me.massoudi.surveyservice.dto.ResponseDTO;
import me.massoudi.surveyservice.dto.SubmitResponseDTO;
import me.massoudi.surveyservice.entity.Question;
import me.massoudi.surveyservice.entity.Response;
import me.massoudi.surveyservice.mapper.ResponseMapper;
import me.massoudi.surveyservice.repo.QuestionRepository;
import me.massoudi.surveyservice.repo.ResponseRepository;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ResponseService {

    private final ResponseRepository responseRepository;
    private final ResponseMapper responseMapper;
    private final QuestionRepository questionRepository;
    private final SurveyService surveyService;

    public List<ResponseDTO> submitResponse(SubmitResponseDTO responseDTO, String username) {
        if (responseDTO == null || responseDTO.getResponses() == null || responseDTO.getResponses().isEmpty()) {
            throw new IllegalArgumentException("No responses provided");
        }


        Set<Long> questionIds = responseDTO.getResponses().stream()
                .map(QuestionResponseDTO::getQuestionId)
//                .filter(Objects::nonNull)  // Filter out null IDs
                .collect(Collectors.toSet());
        System.out.println(questionIds);
        if (questionIds.isEmpty()) {
            throw new IllegalArgumentException("No valid question IDs provided");
        }

        Map<Long, Question> questionMap = questionRepository.findAllById(questionIds)
                .stream()
                .collect(Collectors.toMap(Question::getId, question -> question));

        if (questionMap.size() != questionIds.size()) {
            Set<Long> missingQuestionIds = new HashSet<>(questionIds);
            missingQuestionIds.removeAll(questionMap.keySet());
            throw new EntityNotFoundException("Questions not found for IDs: " + missingQuestionIds);
        }

        List<Response> responses = responseDTO.getResponses().stream()
                .map(questionResponse -> {
                    Response response = new Response();
                    response.setAnswer(questionResponse.getAnswer());
                    response.setQuestion(questionMap.get(questionResponse.getQuestionId()));
                    response.setUsername(username);
                    return response;
                })
                .collect(Collectors.toList());

        // Save all responses in one batch
        List<Response> savedResponses = responseRepository.saveAll(responses);

        System.out.println(savedResponses);
        System.out.println("it reachred here ");
        // Convert to DTOs and return
        return savedResponses.stream()
                .map(responseMapper::toDto)
                .collect(Collectors.toList());


    }


    public List<Map<String, List<ResponseDTO>>> getResponses(Long surveyId) {
        List<Question> questionsOfSurvey = questionRepository.findBySurveyId(surveyId);
        List<Map<String, List<ResponseDTO>>> test = questionsOfSurvey.stream().map((question -> {
            Map<String, List<ResponseDTO>> questionResponses = new HashMap<>();
            questionResponses.put(
                    question.getText(),
                    question.getResponses().stream().map(
                            response -> responseMapper.toDto(response)
                    ).collect(Collectors.toList())
            );
            return questionResponses;

        })).toList();
        return test;
    }

    public ResponseDTO getResponseById(Long responseId) {

        Optional<Response> response = responseRepository.findById(responseId);
        return response.map(responseMapper::toDto).orElse(null);
    }

    public void deleteResponse(Long surveyId, Long responseId) {
        responseRepository.deleteById(responseId);
    }
}
