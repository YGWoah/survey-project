package me.massoudi.surveyservice.web;


import me.massoudi.surveyservice.dto.ResponseDTO;
import me.massoudi.surveyservice.dto.SubmitResponseDTO;
import me.massoudi.surveyservice.entity.Response;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import me.massoudi.surveyservice.service.ResponseService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/surveys/{surveyId}/responses")
public class ResponseController {

    private final ResponseService responseService;

    public ResponseController(ResponseService responseService) {
        this.responseService = responseService;
    }

    @PostMapping
    public List<ResponseDTO> submitResponse(@RequestBody SubmitResponseDTO responseDTO, Authentication authentication) {
        String username = authentication.getName();
        return responseService.submitResponse(responseDTO,username);
    }

    @GetMapping
    public List<Map<String,List<ResponseDTO>>> getResponses(@PathVariable Long surveyId) {
        return responseService.getResponses(surveyId);
    }

    @GetMapping("/{responseId}")
    public ResponseDTO getResponseById(@PathVariable Long surveyId, @PathVariable Long responseId) {
        return responseService.getResponseById( responseId);
    }

    @DeleteMapping("/{responseId}")
    public void deleteResponse(@PathVariable Long surveyId, @PathVariable Long responseId) {
        responseService.deleteResponse(surveyId, responseId);
    }
}
