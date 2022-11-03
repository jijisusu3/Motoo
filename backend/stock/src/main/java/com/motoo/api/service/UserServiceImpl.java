package com.motoo.api.service;

import com.motoo.api.request.UpdateUserPutReq;
import com.motoo.common.auth.AppUserDetails;
import com.motoo.db.entity.User;
import com.motoo.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    @Override
    public String getUserEmailByToken(Authentication authentication) {
        AppUserDetails userDetails=(AppUserDetails)authentication.getDetails();
        String email= userDetails.getUsername();
        return email;
    }

    @Override
    public Optional<User> getByUserId(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public Optional<User> getByUserEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public Long signupUser(String email, String nickname) {
        User newUser = new User();
        newUser.createUser(email, nickname);
        userRepository.save(newUser);
        return newUser.getUserId();
    }


    @Override
    public void deleteUser(String email) {
        userRepository.deleteByEmail(email);
    }


    @Override
    public Long updateNickname(String email, String nickname) {
        User user = getByUserEmail(email).orElseGet(() -> new User());
        user.updateNickname(nickname);
        userRepository.save(user);
        return user.getUserId();
    }

    @Override
    public int updateUser(User user, UpdateUserPutReq updateUserPutReq) {
        return 0;
    }

}
