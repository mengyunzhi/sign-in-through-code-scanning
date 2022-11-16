package com.example.api.service;

import com.example.api.entity.Student;
import com.example.api.entity.User;
import com.example.api.repository.StudentRepository;
import org.assertj.core.internal.bytebuddy.utility.RandomString;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Random;

import static org.junit.jupiter.api.Assertions.*;

class StudentServiceImplTest {

    private StudentService studentService;
    private UserService userService;
    private ClazzService clazzService;
    private StudentRepository studentRepository;

    StudentServiceImplTest() {
        this.userService = Mockito.mock(UserService.class);
        this.clazzService = Mockito.mock(ClazzService.class);
        this.studentRepository = Mockito.mock(StudentRepository.class);
        this.studentService = new StudentServiceImpl(studentRepository, userService, clazzService);
    }

    @Test
    void save() throws Exception {
        String name = RandomString.make(6);
        Short sex = (short) (new Random().nextLong() % 2);
        Long clazzId = new Random().nextLong();
        String sno = RandomString.make(6);

        this.studentService.save(name, sex, clazzId, sno);
        ArgumentCaptor<Student> studentArgumentCaptor = ArgumentCaptor.forClass(Student.class);
        Mockito.verify(this.studentRepository).save(studentArgumentCaptor.capture());
        Student student = studentArgumentCaptor.getValue();

        Assertions.assertEquals(name, student.getUser().getName());
        Assertions.assertEquals(sex, student.getUser().getSex());
        Assertions.assertEquals(sno, student.getUser().getNumber());
        Assertions.assertEquals(sno, student.getSno());
        Assertions.assertEquals(0L, student.getState());
        Assertions.assertEquals(clazzId, student.getClazz().getId());
    }
}