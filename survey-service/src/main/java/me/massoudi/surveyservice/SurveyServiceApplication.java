package me.massoudi.surveyservice;

import me.massoudi.surveyservice.entity.Question;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import me.massoudi.surveyservice.entity.Survey;
import me.massoudi.surveyservice.repo.SurveyRepository;

import java.util.List;

@SpringBootApplication
@EnableFeignClients
public class SurveyServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(SurveyServiceApplication.class, args);
    }

    @Bean
    public CommandLineRunner commandLineRunner(SurveyRepository surveyRepository) {
        return args -> {
            Survey survey1 = new Survey();
            survey1.setId(1L);
            survey1.setTitle("Customer Satisfaction Survey");
            survey1.setDescription("Survey to measure customer satisfaction.");

            Question question1 = new Question();
            question1.setText("How satisfied are you with our service?");
            question1.setSurvey(survey1);

            Question question2 = new Question();
            question2.setText("Would you recommend our service to others?");
            question2.setSurvey(survey1);

            survey1.setQuestions(List.of(question1, question2));

            Survey survey2 = new Survey();
            survey2.setTitle("Employee Engagement Survey");
            survey2.setDescription("Survey to measure employee engagement.");

            Question question3 = new Question();
            question3.setText("How engaged do you feel at work?");
            question3.setSurvey(survey2);

            Question question4 = new Question();
            question4.setText("Do you feel valued by your employer?");
            question4.setSurvey(survey2);

            survey2.setQuestions(List.of(question3, question4));

            surveyRepository.save(survey1);
            surveyRepository.save(survey2);
        };
    }
}
