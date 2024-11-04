package me.massoudi.serviceusers.services.implementation;

import lombok.AllArgsConstructor;
import me.massoudi.serviceusers.entity.User;
import me.massoudi.serviceusers.repo.UserRepository;
import me.massoudi.serviceusers.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;

    @Override
    public User saveUser(String username, String email, String password) {
        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        // Assuming you have a method to hash the password before saving
        user.setPassword(hashPassword(password));
     return  userRepository.save(user);
    }

    @Override
    public void deleteUser(String username) {
        User user = userRepository.findByUsername(username);
        if (user != null) {
            userRepository.delete(user);
        }
    }

    @Override
    public void updateUser(String username, String email, String password) {
        User user = userRepository.findByUsername(username);
        if (user != null) {
            user.setEmail(email);
            user.setPassword(hashPassword(password));
            userRepository.save(user);
        }
    }

    @Override
    public User getUser(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public boolean userExists(String username) {
        return userRepository.existsByUsername(username);
    }

    @Override
    public boolean emailExists(String email) {
        return userRepository.existsByEmail(email);
    }

    private String hashPassword(String password) {
        // Implement your password hashing logic here
        return password; // Placeholder
    }
}
