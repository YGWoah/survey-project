package me.massoudi.serviceusers.feignInterfaces;

import feign.Headers;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import java.util.Map;


@FeignClient(name = "keycloakAuthClient", url = "${keycloak.auth-server-url}")
public interface KeycloakAuthClient {

    @PostMapping("/realms/survey-realm/protocol/openid-connect/token")
    @Headers("Content-Type: application/x-www-form-urlencoded")
    Map<String, Object> getAdminToken(
            @PathVariable("realm") String realm,
            @RequestBody Map<String, ?> formParams
    );
}
