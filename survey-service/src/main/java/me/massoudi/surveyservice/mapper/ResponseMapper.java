package me.massoudi.surveyservice.mapper;


import me.massoudi.surveyservice.dto.QuestionDTO;
import me.massoudi.surveyservice.dto.ResponseDTO;
import me.massoudi.surveyservice.entity.Question;
import me.massoudi.surveyservice.entity.Response;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface ResponseMapper {
    ResponseMapper INSTANCE = Mappers.getMapper(ResponseMapper.class);

    ResponseDTO toDto(Response response);

    Response toEntity(ResponseDTO ResponseDTO);
}
