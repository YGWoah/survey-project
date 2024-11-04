package me.massoudi.serviceusers.web;


import lombok.AllArgsConstructor;
import me.massoudi.serviceusers.dto.AuthRequestDTO;
import me.massoudi.serviceusers.dto.JwtResponseDTO;
import me.massoudi.serviceusers.dto.RegisterDTO;
import me.massoudi.serviceusers.entity.User;
import me.massoudi.serviceusers.enums.Roles;
import me.massoudi.serviceusers.services.JwtService;
import me.massoudi.serviceusers.services.UserService;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;


//@RestController
//@RequestMapping("/auth")
//@AllArgsConstructor
public class AuthController {


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


}
