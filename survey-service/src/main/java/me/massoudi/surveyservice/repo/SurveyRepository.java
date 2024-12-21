package me.massoudi.surveyservice.repo;


import me.massoudi.surveyservice.entity.Survey;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SurveyRepository extends JpaRepository<Survey, Long> {
    public List<Survey> getSurveyByOwnerUsername(String ownerUsername);
}
