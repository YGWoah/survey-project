package me.massoudi.surveyservice;

import com.jayway.jsonpath.JsonPath;
import me.massoudi.surveyservice.entity.Question;
import me.massoudi.surveyservice.repo.QuestionRepository;
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
public class QuestionControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private WebApplicationContext webApplicationContext;

    @Autowired
    private QuestionRepository questionRepository;

    @BeforeEach
    public void setup() {
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
        questionRepository.deleteAll();
    }

    @Test
    public void testCreateQuestion() throws Exception {
        String questionJson = "{\"text\": \"Question 1\"}";

        mockMvc.perform(post("/api/questions")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(questionJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").exists());
    }

    @Test
    public void testGetAllQuestions() throws Exception {
        Question question = new Question();
        question.setText("Sample Question");
        questionRepository.save(question);

        mockMvc.perform(get("/api/questions"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray());
    }

    @Test
    public void testGetQuestionById() throws Exception {
        Question question = new Question();
        question.setText("Sample Question");
        question = questionRepository.save(question);

        mockMvc.perform(get("/api/questions/" + question.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(question.getId()));
    }

    @Test
    public void testUpdateQuestion() throws Exception {
        Question question = new Question();
        question.setText("Sample Question");
        question = questionRepository.save(question);

        String updatedQuestionJson = "{\"text\": \"Updated Question\"}";

        mockMvc.perform(put("/api/questions/" + question.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(updatedQuestionJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.text").value("Updated Question"));
    }

    @Test
    public void testDeleteQuestion() throws Exception {
        Question question = new Question();
        question.setText("Sample Question");
        question = questionRepository.save(question);

        mockMvc.perform(delete("/api/questions/" + question.getId()))
                .andExpect(status().isOk());
    }
}
