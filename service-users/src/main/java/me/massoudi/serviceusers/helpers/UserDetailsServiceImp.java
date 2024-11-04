package me.massoudi.serviceusers.helpers;

import lombok.AllArgsConstructor;
import me.massoudi.serviceusers.entity.User;
import me.massoudi.serviceusers.repo.UserRepository;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

@AllArgsConstructor
@Component
public class UserDetailsServiceImp implements UserDetailsService {

//    private static final Logger logger = LoggerFactory.getLogger(UserDetailsServiceImpl.class);
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        logger.debug("Entering in loadUserByUsername Method...");
        User optionalUser = userRepository.findByUsername(username);

//        if (optionalUser.isEmpty()) {
////            logger.error("Username not found: " + username);
//            throw new UsernameNotFoundException("could not found user..!!");
//        }
        User user = optionalUser;
//        User user = optionalUser.get();
//        logger.info("User Authenticated Successfully..!!!");//TODO : this log shows even when the user has bad credentiels
        List<SimpleGrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority("USER"));

        return (UserDetails) new CustomUserDetails(user.getId(),user.getUsername(), user.getPassword(), authorities);
    }


}
