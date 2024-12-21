package me.massoudi.serviceusers.services;

import lombok.AllArgsConstructor;
import me.massoudi.serviceusers.feignInterfaces.KeycloakAuthClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class KeycloakAdminService {

    private KeycloakAuthClient keycloakAuthClient;

    @Value("${keycloak.client-id}")
    private String clientId;

    @Value("${keycloak.client-secret}")
    private String clientSecret;

    @Value("${keycloak.admin-username}")
    private String adminUsername;

    @Value("${keycloak.admin-password}")
    private String adminPassword;

    @Value("${keycloak.realm}")
    private String realm;

    private String adminToken; // Store token in a field or cache

    private boolean isTokenExpired(String token) {
        // Implement a method to check expiration
        return false;
    }

    public String getAdminToken() {
        if (adminToken == null || isTokenExpired(adminToken)) { // Implement a method to check expiration
            Map<String, String> formParams = new HashMap<>();
            formParams.put("client_id", clientId);
            formParams.put("client_secret", clientSecret);
            formParams.put("username", adminUsername);
            formParams.put("password", adminPassword);
            formParams.put("grant_type", "password");

            Map<String, Object> response = keycloakAuthClient.getAdminToken(realm, formParams);
            adminToken = (String) response.get("access_token");
        }
        return adminToken;
    }
}
