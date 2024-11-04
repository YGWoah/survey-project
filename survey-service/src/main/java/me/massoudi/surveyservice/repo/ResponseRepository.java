package me.massoudi.surveyservice.repo;

import me.massoudi.surveyservice.entity.Response;
import me.massoudi.surveyservice.entity.Survey;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ResponseRepository extends JpaRepository<Response, Long> {
    List<Response> findBySurveyId(Long surveyId);
    Response findResponseByIdAndSurvey(Long responseId, Survey surveyId);
}
