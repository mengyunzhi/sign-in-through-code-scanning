package com.example.api.service;

import com.example.api.entity.Teacher;
import com.example.api.entity.User;
import com.example.api.repository.TeacherRepository;
import com.example.api.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;


@Service
public class TeacherServiceImpl implements TeacherService {
    private  final Logger logger = LoggerFactory.getLogger(this.getClass());
    private TeacherRepository teacherRepository;
    private UserRepository userRepository;
    private UserService userService;

    @Autowired
    public TeacherServiceImpl(TeacherRepository teacherRepository,
                              UserRepository userRepository,
                              UserService userService) {
        this.teacherRepository = teacherRepository;
        this.userRepository = userRepository;
        this.userService = userService;
    }

    @Override
    public Teacher save(User user) {
        Assert.notNull(user.getName(), "名称不能为空");
        Assert.notNull(user.getSex(), "性别不能为空");
        Assert.notNull(user.getNumber(), "手机号不能为空");
        // 设置角色  默认密码
        user.setRole((short) 1);
        if (user.getPassword() == "") {
            // todo: 修改为静态
            user.setPassword("teacher");
        }
        User savedUser = this.userService.save(user);
        Teacher teacher = new Teacher();
        teacher.setUser(savedUser);
        return this.teacherRepository.save(teacher);
    }

    @Override
    public Page findAll(String name, String number, Pageable pageable) {
        Assert.notNull(pageable, "pageable不能为null");
        Page page = this.userRepository.findAllTeacher(name, number, pageable);
        return page;
    }
}
