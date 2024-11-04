package me.massoudi.serviceusers.helpers;

import lombok.Getter;
import me.massoudi.serviceusers.entity.User;
import me.massoudi.serviceusers.enums.Roles;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

@Getter
public class CustomUserDetails extends User {
    private Long id;


    public CustomUserDetails(Long id,String username, String password, Collection<? extends GrantedAuthority> authorities) {
        super(id, username, username + "@gmail.com", password, Roles.USER);
        this.id = id;

    }

}
