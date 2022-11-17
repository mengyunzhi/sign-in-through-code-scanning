package com.example.api.service;

import com.example.api.entity.User;
import com.example.api.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import javax.persistence.EntityNotFoundException;

@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;


    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User save(User user) {
        return this.userRepository.save(user);
    }

    @Override
    public User getById(Long id) {
        return this.userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("未找到相关用户"));
    }

    @Override
    public User login(String number, String password) {
        User user = this.userRepository.findByNumber(number).get();
        if (this.validatePassword(user, password)) {
            return user;
        } else {
            User errorUser = new User();
            errorUser.setName("error");
            return errorUser;
        }
    }

    @Override
    public boolean validatePassword(User user, String password) {
        if (user == null || user.getPassword() == null || password == null) {
            return false;
        }

        return user.getPassword().equals(password);
    }

    @Override
    public User getCurrentLoginUser(String userNumber) {
        return this.userRepository.findByNumber(userNumber).get();
    }

}
