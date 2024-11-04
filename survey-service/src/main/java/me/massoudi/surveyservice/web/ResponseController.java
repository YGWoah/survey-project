package me.massoudi.surveyservice.web;


import me.massoudi.surveyservice.dto.ResponseDTO;
import me.massoudi.surveyservice.entity.Response;
import org.springframework.web.bind.annotation.*;
import me.massoudi.surveyservice.service.ResponseService;

import java.util.List;

@RestController
@RequestMapping("/api/surveys/{surveyId}/responses")
public class ResponseController {

    private final ResponseService responseService;

    public ResponseController(ResponseService responseService) {
        this.responseService = responseService;
    }

    @PostMapping
    public ResponseDTO submitResponse(@PathVariable Long surveyId, @RequestBody ResponseDTO responseDTO) {
        return responseService.submitResponse(surveyId, responseDTO);
    }

    @GetMapping
    public List<Response> getResponses(@PathVariable Long surveyId) {
        return responseService.getResponses(surveyId);
    }

    @GetMapping("/{responseId}")
    public ResponseDTO getResponseById(@PathVariable Long surveyId, @PathVariable Long responseId) {
        return responseService.getResponseById(surveyId, responseId);
    }

    @DeleteMapping("/{responseId}")
    public void deleteResponse(@PathVariable Long surveyId, @PathVariable Long responseId) {
        responseService.deleteResponse(surveyId, responseId);
    }
}
