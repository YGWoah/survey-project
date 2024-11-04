package me.massoudi.surveyservice.repo;


import me.massoudi.surveyservice.entity.Survey;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SurveyRepository extends JpaRepository<Survey, Long> {
}
