package com.example.api.service;

import com.example.api.config.StaticVariable;
import com.example.api.entity.Clazz;
import com.example.api.entity.Student;
import com.example.api.entity.User;
import com.example.api.repository.ClazzRepository;
import com.example.api.repository.StudentRepository;
import com.example.api.repository.UserRepository;
import com.example.api.repository.specs.StudentSpecs;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.List;

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
        Assert.notNull(name, "name不能为null");
        Assert.notNull(sex, "sex不能为null");
        Assert.notNull(sno, "sno不能为null");
        User user = new User();
        user.setNumber(sno);
        user.setRole(StaticVariable.ROLE_STUDENT);
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

    @Override
    public Page findAll(String clazzName, String studentName, String sno, Pageable pageable) {
        Assert.notNull(pageable, "pageable不能为null");
        Specification<Student> specification = StudentSpecs.containSno(sno)
                .and(StudentSpecs.relateClazzByClazzName(clazzName))
                .and(StudentSpecs.relateUserByStudentName(studentName));
        return this.studentRepository.findAll(specification, pageable);
    }

    @Override
    public void deleteByUserId(Long userId) {
        Assert.notNull(userId, "userId不能为null");
        this.studentRepository.deleteByUserId(userId);
        this.userService.deleteById(userId);
    }

    @Override
    public void updatePassword(Long userId, String password) {
        Assert.notNull(userId, "userId不能为null");
        Assert.notNull(password, "password不能为null");
        this.userService.updatePassword(userId, password);
    }

    @Override
    public Student getByUserId(Long userId) {
        return this.studentRepository.findByUserId(userId);
    }

    @Override
    public Student updateByUserId(Long userId, String name, Short sex, Long clazzId, String sno) {
        Student student = this.getByUserId(userId);
        student.setSno(sno);
        User user = this.userService.getById(userId);
        user.setName(name);
        user.setSex(sex);
        Clazz clazz = new Clazz();
        clazz.setId(clazzId);

        student.setUser(user);
        student.setClazz(clazz);
        return this.studentRepository.save(student);
    }

    @Override
    public String snoUniqueByUserId(Long userId, String sno) {
        Assert.notNull(userId, "userId不能为null");
        Assert.notNull(sno, "sno不能为null");
        List<Student> students = this.studentRepository.findStudentsBySno(sno);
        for (Student student:
             students) {
            // 如果学号相等但是userId不等就返回错误信息
            if (student.getSno().equals(sno) && !student.getUser().getId().equals(userId)) {
                return "学号已存在";
            }
        }
        return null;
    }
}
