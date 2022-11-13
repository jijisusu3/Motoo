package com.motoo.common.auth;


import com.motoo.api.service.UserService;
import com.motoo.db.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AppUserDetailsService implements UserDetailsService {
    @Autowired
    private UserService userService;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<User> userOptional = userService.getByUserEmail(email);

        if(userOptional.isPresent()) {
            AppUserDetails appUserDetails = new AppUserDetails(userOptional.get());
            appUserDetails.setRole(userOptional.get().getRole());
            appUserDetails.setRole(String.valueOf(new SimpleGrantedAuthority(userOptional.get().getRole())));

//            appUserDetails.setAuthorities(Arrays.asList(new SimpleGrantedAuthority(userOptional.get().getRole())));
            return appUserDetails;
        }
        return null;
    }
}
