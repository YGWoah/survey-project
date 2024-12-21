package me.massoudi.serviceusers.feignInterfaces;

import feign.Headers;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

import java.util.Map;

@FeignClient(name = "keycloakUserClient", url = "${keycloak.auth-server-url}")
public interface KeycloakUserClient {

    @PostMapping("/admin/realms/{realm}/users")
    @Headers("Authorization: Bearer {token}")
    void createUser(
            @PathVariable("realm") String realm,
            @RequestBody Map<String, Object> user,
            @RequestHeader("Authorization") String token
    );
}
