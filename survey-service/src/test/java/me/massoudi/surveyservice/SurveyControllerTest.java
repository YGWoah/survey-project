package me.massoudi.surveyservice;


import com.jayway.jsonpath.JsonPath;
import lombok.AllArgsConstructor;
import me.massoudi.surveyservice.entity.Survey;
import me.massoudi.surveyservice.repo.SurveyRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class SurveyControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private WebApplicationContext webApplicationContext;

    @Autowired
    private SurveyRepository surveyRepository;

    @BeforeEach
    public void setup() {
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
        surveyRepository.deleteAll();
    }

    @Test
    public void testCreateAndDeleteSurvey() throws Exception {
        String surveyJson = "{\"title\": \"New Survey\", \"description\": \"Survey Description\", \"questions\": [" +
                "{\"text\": \"Question 1\"}]}";

        String response = mockMvc.perform(post("/api/surveys")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(surveyJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").exists())
                .andReturn().getResponse().getContentAsString();

        System.out.println("this is the response Object ");
        System.out.println(response);
        Integer surveyId = JsonPath.read(response, "$.id");

        mockMvc.perform(delete("/api/surveys/" + surveyId))
                .andExpect(status().isOk());

        mockMvc.perform(get("/api/surveys/" + surveyId))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testCreateSurvey() throws Exception {
        String surveyJson = "{\"title\": \"New Survey\", \"description\": \"Survey Description\", \"questions\": [" +
                "{\"text\": \"Question 1\"}]}";

        mockMvc.perform(post("/api/surveys")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(surveyJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").exists());
    }

    @Test
    public void testGetAllSurveys() throws Exception {
        Survey survey = new Survey();
        survey.setTitle("Sample Survey");
        survey.setDescription("Sample Description");
        surveyRepository.save(survey);

        mockMvc.perform(get("/api/surveys"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray());
    }

    @Test
    public void testGetSurveyById() throws Exception {
        Survey survey = new Survey();
        survey.setTitle("Sample Survey");
        survey.setDescription("Sample Description");
        survey = surveyRepository.save(survey);

        mockMvc.perform(get("/api/surveys/" + survey.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(survey.getId()));
    }

    @Test
    public void testUpdateSurvey() throws Exception {
        Survey survey = new Survey();
        survey.setTitle("Sample Survey");
        survey.setDescription("Sample Description");
        survey = surveyRepository.save(survey);

        String updatedSurveyJson = "{\"title\": \"Updated Survey\", \"description\": \"Updated Description\"}";

        mockMvc.perform(put("/api/surveys/" + survey.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(updatedSurveyJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Updated Survey"));
    }

    @Test
    public void testDeleteSurvey() throws Exception {
        Survey survey = new Survey();
        survey.setTitle("Sample Survey");
        survey.setDescription("Sample Description");
        survey = surveyRepository.save(survey);

        mockMvc.perform(delete("/api/surveys/" + survey.getId()))
                .andExpect(status().isOk());
    }

    @Test
    public void testUpdateSurveyWithQuestions() throws Exception {
        String surveyJson = "{\"title\": \"Initial Survey\", \"description\": \"Initial Description\", \"questions\": [" +
                "{\"text\": \"Initial Question 1\"}, {\"text\": \"Initial Question 2\"}]}";

        String response = mockMvc.perform(post("/api/surveys")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(surveyJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").exists())
                .andReturn().getResponse().getContentAsString();

        Integer surveyId = JsonPath.read(response, "$.id");

        String updatedSurveyJson = "{\"title\": \"Updated Survey\", \"description\": \"Updated Description\", \"questions\": [" +
                "{\"id\": 1, \"text\": \"Updated Question 1\"}, {\"text\": \"New Question 2\"}]}";

        mockMvc.perform(put("/api/surveys/" + surveyId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(updatedSurveyJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Updated Survey"))
                .andExpect(jsonPath("$.description").value("Updated Description"))
                .andExpect(jsonPath("$.questions[0].text").value("Updated Question 1"))
                .andExpect(jsonPath("$.questions[1].text").value("New Question 2"));
    }
}
