package me.massoudi.serviceusers.web;

import lombok.AllArgsConstructor;
import me.massoudi.serviceusers.entity.User;
import me.massoudi.serviceusers.services.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@AllArgsConstructor
public class UserControllers {

    private UserService userService;

    @PostMapping("/save")
    public void saveUser(@RequestParam String username, @RequestParam String email, @RequestParam String password) {
        userService.saveUser(username, email, password);
    }

    @DeleteMapping("/delete/{username}")
    public void deleteUser(@PathVariable String username) {
        userService.deleteUser(username);
    }

    @PutMapping("/update")
    public void updateUser(@RequestParam String username, @RequestParam String email, @RequestParam String password) {
        userService.updateUser(username, email, password);
    }

    @GetMapping("/{username}")
    public User getUser(@PathVariable String username) {
        return userService.getUser(username);
    }

    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/exists/username/{username}")
    public boolean userExists(@PathVariable String username) {
        return userService.userExists(username);
    }

    @GetMapping("/exists/email/{email}")
    public boolean emailExists(@PathVariable String email) {
        return userService.emailExists(email);
    }
}
