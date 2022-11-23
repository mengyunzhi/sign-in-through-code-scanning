package com.example.api.service;

import com.example.api.config.StaticVariable;
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

import javax.persistence.EntityNotFoundException;
import java.util.List;


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
        user.setRole(StaticVariable.ROLE_TEACHER);
        if (user.getPassword() == "" || user.getPassword() == "NoCache") {
            user.setPassword(StaticVariable.DEFAULT_PASSWORD);
        }
        User savedUser = this.userService.save(user);
        Teacher teacher = new Teacher();
        teacher.setUser(savedUser);
        return this.teacherRepository.save(teacher);
    }

    @Override
    public Page findAll(String name, String number, Pageable pageable) {
        Assert.notNull(pageable, "pageable不能为null");
        Page page = this.teacherRepository.findAll(name, number, pageable);
        return page;
    }

    @Override
    public void deleteByUserId(Long userId) {
        Assert.notNull(userId, "userId不能为null");
        this.teacherRepository.deleteByUserId(userId);
        this.userService.deleteById(userId);
    }

    @Override
    public Teacher getByUserId(Long userId) {
        Assert.notNull(userId, "userId不能为null");
        return this.teacherRepository.findByUserId(userId);
    }

    @Override
    public void updatePassword(Long userId, String password) {
        Assert.notNull(password, "password不能为null");
        Teacher teacher = this.getByUserId(userId);
        teacher.getUser().setPassword(password);
        this.teacherRepository.save(teacher);
    }

    @Override
    public Teacher update(Long userId, String name, Short sex, String number) {
        Assert.notNull(name, "name不能为null");
        Assert.notNull(sex, "sex不能为null");
        Assert.notNull(number, "number不能为null");
        Teacher teacher = this.getByUserId(userId);
        teacher.getUser().setName(name);
        teacher.getUser().setSex(sex);
        teacher.getUser().setNumber(number);
        return this.teacherRepository.save(teacher);
    }

    @Override
    public Teacher getTeacherByUserName(String userName) {
        Assert.notNull(userName, "userName不能为null");
        List<Teacher> teachers = (List<Teacher>) this.teacherRepository.findAll();
        Teacher teacher = this.teacherRepository.findTeacherByUserNumber(userName);
        return teacher;
    }

    @Override
    public Teacher getByTeacherId(Long teacherId) {
        return this.teacherRepository.findById(teacherId)
                .orElseThrow(() -> new EntityNotFoundException("未找到相关教师"));
    }
}
