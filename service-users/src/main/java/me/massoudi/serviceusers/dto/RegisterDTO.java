package me.massoudi.serviceusers.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RegisterDTO {

    @NotNull(message = "Name cannot be null")
    @Size(min = 5, max = 40, message = "Name should be between 5 and 40 characters")
    private String name;

    @Email(message = "Email should be valid")
    @NotNull(message = "Email cannot be null")
    private String mail;

    @NotNull(message = "Username cannot be null")
    @Size(min = 2, max = 30, message = "Username should be between 2 and 30 characters")
    private String username;

    @NotNull(message = "Password cannot be null")
    @Size(min = 8, message = "Password should be at least 8 characters long")
    private String password;
}
