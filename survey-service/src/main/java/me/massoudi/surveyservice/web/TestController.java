package me.massoudi.surveyservice.web;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.OAuth2AuthenticatedPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
@RequestMapping("/api/test")
public class TestController {

    @GetMapping("/token-info")
    public Map<String, Object> getTokenInfo(@AuthenticationPrincipal Jwt jwt, @AuthenticationPrincipal OAuth2AuthenticatedPrincipal principal) {
        return jwt.getClaims();
    }

    @GetMapping("/user-info")
    public Authentication getUserInfo(Authentication authentication) {
        System.out.println(authentication.getName());
        System.out.println(authentication.getAuthorities());
        return authentication;
    }

    @GetMapping("/user")
    public ResponseEntity<?> getUser(@AuthenticationPrincipal Jwt jwt) {
        String username = jwt.getClaimAsString("preferred_username");
        List<String> roles = jwt.getClaimAsStringList("roles");
        String email = jwt.getClaimAsString("email");

        Map<String, Object> userDetails = new HashMap<>();
        userDetails.put("username", username);
        userDetails.put("roles", roles);
        userDetails.put("email", email);

        return ResponseEntity.ok(userDetails);
    }
//    @GetMapping("/roles")
//    public Set<String> getRoles(Authentication authentication) {
//        authentication.getAuthorities();
//    }
}
