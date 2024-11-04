package me.massoudi.serviceusers;

import lombok.AllArgsConstructor;
import me.massoudi.serviceusers.entity.User;
import me.massoudi.serviceusers.enums.Roles;
import me.massoudi.serviceusers.repo.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@AllArgsConstructor
public class ServiceUsersApplication {

    private UserRepository userRepository;

    public static void main(String[] args) {
        SpringApplication.run(ServiceUsersApplication.class, args);
    }

    @Bean
    CommandLineRunner commandLineRunner() {
        return args -> {
            // create ten users
            for (Long i = 0L; i < 10; i++) {
                userRepository.save(new User(i, "user" + i, "user" + i + "@example.com", "password" + i, Roles.USER));
            }
        };
    }
}
