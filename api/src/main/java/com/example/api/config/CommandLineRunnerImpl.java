package com.example.api.config;

import com.example.api.entity.*;
import com.example.api.repository.*;
import com.example.api.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class CommandLineRunnerImpl implements CommandLineRunner {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    private final UserService userService;
    private final UserRepository userRepository;
    private final AdminRepository adminRepository;
    private final TeacherRepository teacherRepository;
    private final StudentRepository studentRepository;
    private final ClazzRepository clazzRepository;
    private final RoomRepository roomRepository;
    private final TermRepository termRepository;
    @Autowired
    public CommandLineRunnerImpl(UserRepository userRepository,
                                 UserService userService,
                                 AdminRepository adminRepository,
                                 TeacherRepository teacherRepository,
                                 StudentRepository studentRepository,
                                 ClazzRepository clazzRepository,
                                 RoomRepository roomRepository,
                                 TermRepository termRepository) {
        this.userService = userService;
        this.userRepository = userRepository;
        this.adminRepository = adminRepository;
        this.teacherRepository = teacherRepository;
        this.studentRepository = studentRepository;
        this.clazzRepository = clazzRepository;
        this.roomRepository = roomRepository;
        this.termRepository = termRepository;
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

        this.forTest();
    }

    private void forTest() {
        // 添加教师
        User user2 = this.getUser(StaticVariable.ROLE_TEACHER, "13100000000", "yunzhi", "教师");
        this.addTeacher(user2);
        // 添加班级
        Clazz clazz = this.addClazz();
        User user = this.getUser(StaticVariable.ROLE_STUDENT, "111111", "yunzhi", "学生");
        // 添加学生，该学生属于上面的班级
        this.addStudent(user, clazz, "111111", StaticVariable.STATE_TRUE);
        // 添加教室
        this.addRoom("testRoom", 40L);
        //添加学期
        this.addTerm("testTerm", 1661961600L, 1670601600L, StaticVariable.STATE_TRUE);
    }

    private void addTerm(String termName, Long startTime, Long endTime, Long state) {
        Term term = new Term();
        term.setName(termName);
        term.setStartTime(startTime);
        term.setEndTime(endTime);
        term.setState(state);
        this.termRepository.save(term);
    }

    private void addRoom(String roomName, Long capacity) {
        Room room = new Room();
        room.setName(roomName);
        room.setCapacity(capacity);
        this.roomRepository.save(room);
    }

    private void addAdmin(User user) {
        this.userService.save(user);
        Admin admin = new Admin();
        admin.setUser(user);
        this.adminRepository.save(admin);
    }

    private void addTeacher(User user) {
        this.userService.save(user);
        Teacher teacher = new Teacher();
        teacher.setUser(user);
        this.teacherRepository.save(teacher);
    }

    private void addStudent(User user, Clazz clazz, String sno, Long state) {
        this.userService.save(user);
        Student student = new Student();
        student.setUser(user);
        student.setSno(sno);
        student.setState(state);
        student.setClazz(clazz);
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

    private Clazz addClazz() {
        Clazz clazz = new Clazz();
        clazz.setName("testClazz");
        clazz.setLength((short)4);
        clazz.setEntrance_date(0L);
        logger.info("已添加初始化班级");
        return this.clazzRepository.save(clazz);
    }

}
