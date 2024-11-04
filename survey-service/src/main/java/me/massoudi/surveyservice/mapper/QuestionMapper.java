package me.massoudi.surveyservice.mapper;


import me.massoudi.surveyservice.dto.QuestionDTO;
import me.massoudi.surveyservice.dto.SurveyDTO;
import me.massoudi.surveyservice.entity.Question;
import me.massoudi.surveyservice.entity.Survey;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface QuestionMapper {
    QuestionMapper INSTANCE = Mappers.getMapper(QuestionMapper.class);

    QuestionDTO toDto(Question question);

    Question toEntity(QuestionDTO QuestionDTO);
}
