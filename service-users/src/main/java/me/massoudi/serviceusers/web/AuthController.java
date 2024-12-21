package me.massoudi.serviceusers.web;


import lombok.AllArgsConstructor;
import me.massoudi.serviceusers.dto.AuthRequestDTO;
import me.massoudi.serviceusers.dto.JwtResponseDTO;
import me.massoudi.serviceusers.dto.RegisterDTO;
import me.massoudi.serviceusers.entity.User;
import me.massoudi.serviceusers.enums.Roles;
import me.massoudi.serviceusers.feignInterfaces.KeycloakUserClient;
import me.massoudi.serviceusers.services.JwtService;
import me.massoudi.serviceusers.services.KeycloakAdminService;
import me.massoudi.serviceusers.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/auth")
@AllArgsConstructor
public class AuthController {
    private KeycloakUserClient keycloakUserClient;

    private KeycloakAdminService keycloakAdminService;

//    @Value("${keycloak.realm}")
//    private String realm;


//    @Autowired
//    private RestTemplate restTemplate;
//    private final UserService userService;
//    private AuthenticationManager authenticationManager;
//    private JwtService jwtService;
//
//    @PostMapping("/login")
//    public ResponseEntity<JwtResponseDTO> AuthenticateAndGetToken(@RequestBody AuthRequestDTO authRequestDTO) {
//        authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken(authRequestDTO.getUsername(), authRequestDTO.getPassword())
//        );
//        JwtResponseDTO jwtResponseDTO = JwtResponseDTO.builder()
//                .accessToken(jwtService.generateToken(authRequestDTO.getUsername())).build();
//
//        return ResponseEntity.ok(jwtResponseDTO);
//
//    }
//
//    @PostMapping("/register")
//    public JwtResponseDTO RegisterAndGetToken(@RequestBody RegisterDTO registerDTO) {
//        User newUser = userService.saveUser(registerDTO.getUsername(), registerDTO.getMail(), registerDTO.getPassword());
//        String token = jwtService.generateToken(newUser.getUsername());
//        return JwtResponseDTO.builder()
//                .accessToken(token)
//                .build();
//    }

    @PostMapping("/register")

        public void registerUser(@RequestBody RegisterDTO registerDto) {
            String keycloakUrl = "http://localhost:8080/auth/admin/realms/{realm}/users";
            String adminToken = getAdminToken(); // Method to obtain admin token


            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(adminToken);

            Map<String, Object> body = new HashMap<>();
            body.put("username", registerDto.getUsername());
            body.put("enabled", true);
            body.put("email", registerDto.getMail());
            body.put("credentials", Collections.singletonList(Map.of(
                    "type", "password",
                    "value", registerDto.getPassword(),
                    "temporary", false
            )));

            HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);
            restTemplate.postForEntity(keycloakUrl, request, Void.class);
        }

    }


}
