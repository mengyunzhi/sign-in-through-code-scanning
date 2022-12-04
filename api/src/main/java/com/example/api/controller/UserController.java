package com.example.api.controller;

import com.example.api.config.StaticVariable;
import com.example.api.entity.Student;
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
     * 密码是否正确
     * number: 手机号
     * password: 密码
     */
    @PostMapping("isPasswordRight")
    public Boolean isPasswordRight(@RequestBody User user) {
        return this.userService.isPasswordRight(user.getNumber(), user.getPassword());
    }

    /**
     * 用户手机号唯一验证
     */
    @GetMapping("numberUnique")
    public String numberUnique(@RequestParam Long id, @RequestParam String number) {
        return this.userService.numberUnique(id, number);
    }

    @GetMapping("getDefaultPassword")
    public String getDefaultPassword() {
        return StaticVariable.DEFAULT_PASSWORD;
    }

    @GetMapping("studentRegister")
    public Student studentRegister(@RequestParam String sno, @RequestParam String password, @RequestParam String number) {
        return this.userService.studentRegister(sno, password, number);
    }
}
