package com.example.api.controller;

import com.example.api.entity.User;
import com.example.api.repository.UserRepository;
import com.example.api.service.TermService;
import com.example.api.service.UserService;
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
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    static String ADMIN_PASSWORD = "admin";
    static String TEACHER_PASSWORD = "teacher";
    static String STUDENT_PASSWORD = "student";

    @CrossOrigin("*")
    @GetMapping("login")
    public User login(@RequestParam String number,
                      @RequestParam  String password) {
        return this.userService.login(number, password);
    }
}
