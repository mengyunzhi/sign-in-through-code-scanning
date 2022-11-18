package com.example.api.service;

import com.example.api.config.StaticVariable;
import com.example.api.entity.Teacher;
import com.example.api.entity.User;
import com.example.api.repository.TeacherRepository;
import com.example.api.repository.UserRepository;
import org.assertj.core.internal.bytebuddy.utility.RandomString;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.Random;

import static org.junit.jupiter.api.Assertions.*;

class TeacherServiceImplTest {
    private TeacherService teacherService;
    private TeacherRepository teacherRepository;

    @Autowired
    TeacherServiceImplTest() {
        TeacherRepository teacherRepository = Mockito.mock(TeacherRepository.class);
        this.teacherRepository = teacherRepository;
        UserRepository userRepository = Mockito.mock(UserRepository.class);
        UserService userService = Mockito.mock(UserService.class);
        this.teacherService = new TeacherServiceImpl(teacherRepository, userRepository, userService);
    }


    @Test
    void save() {
        User user = new User();
        String name = RandomString.make(6); user.setName(name);
        Short sex = (short)(new Random().nextLong() % 2); user.setSex(sex);
        String number = RandomString.make(11); user.setNumber(number);

        Teacher returnTeacher = new Teacher();
        returnTeacher.setId(-100L);

        Mockito.doReturn(returnTeacher).when(this.teacherRepository).save(Mockito.any());
        Teacher resultTeacher = this.teacherService.save(user);

        Assertions.assertEquals(StaticVariable.DEFAULT_PASSWORD, user.getPassword());
        Assertions.assertEquals(StaticVariable.ROLE_TEACHER.toString(), user.getRole().toString());
        Assertions.assertEquals(resultTeacher.getId(), resultTeacher.getId());
    }

    @Test
    void findAll() {
        String name = RandomString.make(6);
        String number = RandomString.make(11);
        Pageable pageable = PageRequest.of(0, 2);

        this.teacherService.findAll(name, number, pageable);

        ArgumentCaptor<String> nameArgumentCaptor = ArgumentCaptor.forClass(String.class);
        ArgumentCaptor<String> numberArgumentCaptor = ArgumentCaptor.forClass(String.class);
        ArgumentCaptor<Pageable> pageableArgumentCaptor = ArgumentCaptor.forClass(Pageable.class);
        Mockito.verify(this.teacherRepository).findAll(
                nameArgumentCaptor.capture(),
                numberArgumentCaptor.capture(),
                pageableArgumentCaptor.capture()
        );
        Assertions.assertEquals(name, nameArgumentCaptor.getValue());
        Assertions.assertEquals(number, numberArgumentCaptor.getValue());
        Assertions.assertEquals(pageable, pageableArgumentCaptor.getValue());
    }

    @Test
    void getByUserId() {
        // 准备参数
        Long userId = new Random().nextLong();
        Teacher teacher = new Teacher();
        // 规定返回值
        Mockito.doReturn(teacher).when(this.teacherRepository).findByUserId(Mockito.any());
        // 调用
        Teacher returnTeacher = this.teacherService.getByUserId(userId);
        // 断言
        Assertions.assertEquals(teacher, returnTeacher);
        ArgumentCaptor<Long> longArgumentCaptor = ArgumentCaptor.forClass(Long.class);
        Mockito.verify(this.teacherRepository).findByUserId(longArgumentCaptor.capture());
        Assertions.assertEquals(userId, longArgumentCaptor.getValue());
    }

    @Test
    void updatePassword() {
        // 准备参数
        Long userId = new Random().nextLong();
        String password = RandomString.make(6);
        Teacher teacher = new Teacher();
        teacher.getUser().setId(userId);
        TeacherServiceImpl teacherServiceImpl = (TeacherServiceImpl) Mockito.spy(this.teacherService);
        Mockito.doReturn(teacher).when(teacherServiceImpl).getByUserId(Mockito.any());
        // 调用
        teacherServiceImpl.updatePassword(userId, password);
        // 断言
        ArgumentCaptor<Long> longArgumentCaptor = ArgumentCaptor.forClass(Long.TYPE);
        ArgumentCaptor<Teacher> teacherArgumentCaptor = ArgumentCaptor.forClass(Teacher.class);
        Mockito.verify(teacherServiceImpl).getByUserId(longArgumentCaptor.capture());
        Mockito.verify(this.teacherRepository).save(teacherArgumentCaptor.capture());
        Assertions.assertEquals(userId, longArgumentCaptor.getValue());
        Assertions.assertEquals(password, teacherArgumentCaptor.getValue().getUser().getPassword());
    }

    @Test
    void update() {
        // 准备参数
        Long userId = new Random().nextLong();
        String name = RandomString.make(6);
        Short sex = (short) (new Random().nextLong() % 2);
        String number = RandomString.make(6);
        Teacher teacher = new Teacher();
        teacher.getUser().setId(userId);
        // mock 方法
        TeacherServiceImpl teacherServiceImpl = (TeacherServiceImpl) Mockito.spy(this.teacherService);
        Mockito.doReturn(teacher).when(teacherServiceImpl).getByUserId(Mockito.any());
        // 请求
        teacherServiceImpl.update(userId, name, sex, number);
        // 断言
        ArgumentCaptor<Teacher> teacherArgumentCaptor = ArgumentCaptor.forClass(Teacher.class);
        Mockito.verify(this.teacherRepository).save(teacherArgumentCaptor.capture());
        Assertions.assertEquals(userId, teacherArgumentCaptor.getValue().getUser().getId());
        Assertions.assertEquals(name, teacherArgumentCaptor.getValue().getUser().getName());
        Assertions.assertEquals(sex, teacherArgumentCaptor.getValue().getUser().getSex());
        Assertions.assertEquals(number, teacherArgumentCaptor.getValue().getUser().getNumber());
    }
}