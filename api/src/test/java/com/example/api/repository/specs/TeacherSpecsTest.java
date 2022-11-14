package com.example.api.repository.specs;

import com.example.api.entity.Teacher;
import com.example.api.entity.User;
import com.example.api.repository.TeacherRepository;
import com.example.api.repository.UserRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

@SpringBootTest
@RunWith(SpringRunner.class)
class TeacherSpecsTest {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TeacherRepository teacherRepository;

    private int nameNumsize;
    private int numberNumsize;

    @BeforeEach
    public void setNumsize() {
        this.nameNumsize = this.teacherRepository.findAll(TeacherSpecs.relateUserByName("123456")).size();
        this.numberNumsize = this.teacherRepository.findAll(TeacherSpecs.relateUserByNumber("abcdef")).size();

        // 添加用户
        User user = new User();
        user.setNumber("abcdef");
        user.setName("123456");
        User user1 = this.userRepository.save(user);
        Teacher teacher = new Teacher();
        teacher.setUser(user1);
        this.teacherRepository.save(teacher);
    }

    @Test
    void relateUserByName() {
        List teachers = this.teacherRepository.findAll(TeacherSpecs.relateUserByName("23456"));
        Assertions.assertEquals(this.nameNumsize + 1, teachers.size());
        List teachers1 = this.teacherRepository.findAll(TeacherSpecs.relateUserByName("2345"));
        Assertions.assertEquals(this.nameNumsize + 1, teachers1.size());
        List teachers2 = this.teacherRepository.findAll(TeacherSpecs.relateUserByName("12345"));
        Assertions.assertEquals(this.nameNumsize + 1, teachers2.size());
        List teachers3 = this.teacherRepository.findAll(TeacherSpecs.relateUserByName("1234567"));
        Assertions.assertEquals(0, teachers3.size());
    }

    @Test
    void relateUserByNumber() {
        List teachers = this.teacherRepository.findAll(TeacherSpecs.relateUserByNumber("bcdef"));
        Assertions.assertEquals(this.numberNumsize + 1, teachers.size());
        List teachers1 = this.teacherRepository.findAll(TeacherSpecs.relateUserByNumber("bcde"));
        Assertions.assertEquals(this.numberNumsize + 1, teachers1.size());
        List teachers2 = this.teacherRepository.findAll(TeacherSpecs.relateUserByNumber("abcde"));
        Assertions.assertEquals(this.numberNumsize + 1, teachers2.size());
        List teachers3 = this.teacherRepository.findAll(TeacherSpecs.relateUserByNumber("abcdefg"));
        Assertions.assertEquals(0, teachers3.size());
    }
}