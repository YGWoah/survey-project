package me.massoudi.surveyservice.mapper;


import me.massoudi.surveyservice.dto.SurveyDTO;
import me.massoudi.surveyservice.entity.Survey;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface SurveyMapper {
    SurveyMapper INSTANCE = Mappers.getMapper(SurveyMapper.class);


    @Mapping(source = "id", target = "id")
    @Mapping(source = "title", target = "title")
    @Mapping(source = "description", target = "description")
    @Mapping(source = "ownerUsername", target = "ownerUsername")
    SurveyDTO toDto(Survey survey);

    Survey toEntity(SurveyDTO surveyDTO);
}
