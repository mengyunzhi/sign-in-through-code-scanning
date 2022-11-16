package com.example.api.service;

import com.example.api.entity.Clazz;
import com.example.api.entity.Student;
import com.example.api.entity.User;
import com.example.api.repository.ClazzRepository;
import com.example.api.repository.StudentRepository;
import com.example.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudentServiceImpl implements StudentService {

    private StudentRepository studentRepository;
    private UserService userService;
    private ClazzService clazzService;

    @Autowired
    StudentServiceImpl(StudentRepository studentRepository,
                       UserService userService,
                       ClazzService clazzService) {
        this.studentRepository = studentRepository;
        this.userService = userService;
        this.clazzService = clazzService;
    }

    @Override
    public Student save(String name, Short sex, Long clazzId, String sno) {
        User user = new User();
        user.setNumber(sno);
        user.setRole((short)2);
        user.setName(name);
        user.setSex(sex);
        this.userService.save(user);

        Student student = new Student();
        student.setSno(sno);
        student.setState(0L);

        Clazz clazz = new Clazz();
        clazz.setId(clazzId);

        student.setUser(user);
        student.setClazz(clazz);
        return this.studentRepository.save(student);
    }
}
