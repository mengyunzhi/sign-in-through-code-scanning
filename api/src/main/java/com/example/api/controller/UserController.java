package com.example.api.controller;

import com.example.api.entity.User;
import com.example.api.repository.UserRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;

/**
 * 用户控制器
 */
@RestController
@RequestMapping("user")
public class UserController {
    @Autowired
    UserRepository userRepository;

    static String ADMIN_PASSWORD = "admin";
    static String TEACHER_PASSWORD = "teacher";
    static String STUDENT_PASSWORD = "student";

    @CrossOrigin("*")
    @GetMapping("login")
    public User login(@RequestParam String number,
                      @RequestParam  String password) throws JsonProcessingException {
        User loginUser = this.userRepository.findByNumber(number)
                .orElseThrow(() ->
                        new EntityNotFoundException("未在数据库中找到用户，这可能是当前用户被删除导致的"));
        if (loginUser.getPassword().equals(password)) {
            return loginUser;
        } else {
            User errorUser = new User();
            errorUser.setName("error");
            return errorUser;
        }
    }
}
