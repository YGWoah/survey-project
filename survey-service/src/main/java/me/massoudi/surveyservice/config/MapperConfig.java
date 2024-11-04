package me.massoudi.surveyservice.config;


import me.massoudi.surveyservice.mapper.QuestionMapper;
import me.massoudi.surveyservice.mapper.ResponseMapper;
import me.massoudi.surveyservice.mapper.SurveyMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.mapstruct.factory.Mappers;

@Configuration
public class MapperConfig {

    @Bean
    public QuestionMapper questionMapper() {
        return Mappers.getMapper(QuestionMapper.class);
    }

    @Bean
    public ResponseMapper responseMapper() {
        return Mappers.getMapper(ResponseMapper.class);
    }

    @Bean
    public SurveyMapper surveyMapper() {
        return Mappers.getMapper(SurveyMapper.class);
    }
}
