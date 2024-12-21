package me.massoudi.surveyservice.mapper;


import me.massoudi.surveyservice.dto.ResponseDTO;
import me.massoudi.surveyservice.dto.SubmitResponseDTO;
import me.massoudi.surveyservice.entity.Response;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ResponseMapper {
    ResponseMapper INSTANCE = Mappers.getMapper(ResponseMapper.class);

    ResponseDTO toDto(Response response);

    List<ResponseDTO> toDto(List<Response> response);

    Response toEntity(ResponseDTO ResponseDTO);
}
