package me.massoudi.serviceusers.services;

import me.massoudi.serviceusers.entity.User;

import java.util.List;

public interface UserService {
    User saveUser(String username, String email, String password);
    void deleteUser(String username);
    void updateUser(String username, String email, String password);
    User getUser(String username);
    List<User> getAllUsers();
    boolean userExists(String username);
    boolean emailExists(String email);
}
