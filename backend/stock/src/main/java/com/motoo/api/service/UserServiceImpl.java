package com.motoo.api.service;

import com.motoo.api.request.UpdateUserPutReq;
import com.motoo.db.entity.User;
import com.motoo.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    @Override
    public Optional<User> getByUserId(String id) {
        return Optional.empty();
    }

    @Override
    public Optional<User> getByUserEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public Optional<User> getByUserNameAndUserEmail(String username, String email) {
        return Optional.empty();
    }

    @Override
    public void deleteUser(String id) {

    }

    @Override
    public Optional<User> getByUserNameAndUserEmailAndId(String username, String email, String id) {
        return Optional.empty();
    }

    @Override
    public void updatePassword(User user, String pw) {

    }

    @Override
    public int updateUser(User user, UpdateUserPutReq updateUserPutReq) {
        return 0;
    }

}
