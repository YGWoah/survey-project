package me.massoudi.surveyservice.feignServices;

import me.massoudi.surveyservice.model.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "USER-SERVICE")
public interface  UserServiceClient {
    @GetMapping("/users/{username}/")
    User getUserByUsername(@PathVariable("username") String username);
}
