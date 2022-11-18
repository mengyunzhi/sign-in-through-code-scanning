package com.example.api.controller;

import com.example.api.entity.User;
import com.example.api.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("login")
    public User login(@RequestParam String number,
                      @RequestParam  String password) {
        return this.userService.login(number, password);
    }

    @GetMapping("getCurrentLoginUser")
    public User getCurrentLoginUser(@RequestParam String userNumber) {
        return this.userService.getCurrentLoginUser(userNumber);
    }

    @PostMapping("userUpdate")
    public User userUpdate(@RequestBody User user) {
        return this.userService.userUpdate(user);
    }

    /**
     * 用户手机号唯一验证
     */
    @GetMapping("numberUnique")
    public String numberUnique(@RequestParam Long id, @RequestParam String number) {
        return this.userService.numberUnique(id, number);
    }
}
