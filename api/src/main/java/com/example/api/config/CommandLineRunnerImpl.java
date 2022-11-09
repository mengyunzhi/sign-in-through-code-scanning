package com.example.api.config;

import com.example.api.entity.*;
import com.example.api.repository.AdminRepository;
import com.example.api.repository.StudentRepository;
import com.example.api.repository.TeacherRepository;
import com.example.api.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class CommandLineRunnerImpl implements CommandLineRunner {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    private final UserRepository userRepository;
    private final AdminRepository adminRepository;
    private final TeacherRepository teacherRepository;
    private final StudentRepository studentRepository;
    @Autowired
    public CommandLineRunnerImpl(UserRepository userRepository,
                                 AdminRepository adminRepository,
                                 TeacherRepository teacherRepository,
                                 StudentRepository studentRepository) {
        this.userRepository = userRepository;
        this.adminRepository = adminRepository;
        this.teacherRepository = teacherRepository;
        this.studentRepository = studentRepository;
    }

    @Override
    public void run(String... args) {
        if(!userRepository.findByNumber("admin").isPresent()) {
            logger.info("进行初始化管理员");
            User user = this.getUser((short) 0, "admin", "yunzhi", "管理员");
            this.addAdmin(user);
        } else {
            logger.info("已添加初始化管理员");
        }

        if(!userRepository.findByNumber("teacher").isPresent()) {
            logger.info("进行初始化管教师");
            User user = this.getUser((short) 1, "teacher", "yunzhi", "教师");
            this.addTeacher(user);
        } else {
            logger.info("已添加初始化教师");
        }

        if(!userRepository.findByNumber("student").isPresent()) {
            logger.info("进行初始化学生");
            User user = this.getUser((short) 2, "student", "yunzhi", "学生");
            this.addStudent(user, null, "222222", 1L);
        } else {
            logger.info("已添加初始化学生");
        }
    }

    private void addAdmin(User user) {
        this.userRepository.save(user);
        Admin admin = new Admin();
        admin.setUser(user);
        this.adminRepository.save(admin);
    }

    private void addTeacher(User user) {
        this.userRepository.save(user);
        Teacher teacher = new Teacher();
        teacher.setUser(user);
        this.teacherRepository.save(teacher);
    }

    private void addStudent(User user, Klass klass, String sno, Long state) {
        this.userRepository.save(user);
        Student student = new Student();
        student.setUser(user);
        student.setSno(sno);
        student.setState(state);
        student.setKlass(klass);
        this.studentRepository.save(student);
    }

    private User getUser(Short role, String number, String password, String name) {
        User user = new User();
        user.setRole(role);
        user.setNumber(number);
        user.setPassword(password);
        user.setName(name);
        return user;
    }

}
