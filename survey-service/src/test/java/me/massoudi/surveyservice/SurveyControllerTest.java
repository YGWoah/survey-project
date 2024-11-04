package me.massoudi.surveyservice;


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
    public void testCreateSurvey() throws Exception {
        String surveyJson = "{\"title\": \"New Survey\", \"description\": \"Survey Description\"}";

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
}
