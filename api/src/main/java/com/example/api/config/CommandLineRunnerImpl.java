package com.example.api.config;

import com.example.api.entity.*;
import com.example.api.repository.*;
import com.example.api.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

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
    private final CourseRepository courseRepository;
    private final ScheduleRepository scheduleRepository;
    private final DispatchRepository dispatchRepository;

    @Autowired
    public CommandLineRunnerImpl(UserRepository userRepository,
                                 UserService userService,
                                 AdminRepository adminRepository,
                                 TeacherRepository teacherRepository,
                                 StudentRepository studentRepository,
                                 ClazzRepository clazzRepository,
                                 RoomRepository roomRepository,
                                 TermRepository termRepository,
                                 CourseRepository courseRepository,
                                 ScheduleRepository scheduleRepository,
                                 DispatchRepository dispatchRepository) {
        this.userService = userService;
        this.userRepository = userRepository;
        this.adminRepository = adminRepository;
        this.teacherRepository = teacherRepository;
        this.studentRepository = studentRepository;
        this.clazzRepository = clazzRepository;
        this.roomRepository = roomRepository;
        this.termRepository = termRepository;
        this.courseRepository = courseRepository;
        this.scheduleRepository = scheduleRepository;
        this.dispatchRepository = dispatchRepository;
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
        User uTeacher1 = this.getUser(StaticVariable.ROLE_TEACHER, "13100000000", "yunzhi", "教师");
        Teacher teacher1 = this.addTeacher(uTeacher1);
        // 添加班级
        Clazz clazz1 = this.addClazz("testclazz1", (short) 2, 0L);
        Clazz clazz2 = this.addClazz("testclazz2", (short) 4, 1000000L);
        List<Clazz> clazzes = new ArrayList<>();
        clazzes.add(clazz1);
        clazzes.add(clazz2);
        // 添加学生，该学生属于上面的班级
        User uStudent1 = this.getUser(StaticVariable.ROLE_STUDENT, "111111", "yunzhi", "学生");
        Student student1 = this.addStudent(uStudent1, clazz1, "111111", StaticVariable.STATE_TRUE);
        // 添加教室
        Room room1 = this.addRoom("testRoom1", 40L);
        Room room2 = this.addRoom("testRoom2", 80L);
        List<Room> rooms = new ArrayList<>();
        rooms.add(room1);
        rooms.add(room2);
        // 添加学期
        Term term1 = this.addTerm("testTerm1" , 1L);
        Term term2 = this.addTerm("testTerm2", 0L);
        Term term3 = this.addTerm("testTerm3", 0L);
        // 添加课程
        Course course1 = this.addCourse("testCourse", 40L);
        // 添加排课(schedule)
        Schedule schedule1 = this.addSchedule(teacher1, term1, course1, clazzes);
        // 添加调度(dispatch)
        Dispatch dispatch = this.addDispatch(schedule1, 0L, 0L, 0L, rooms);
    }

    private Dispatch addDispatch(Schedule schedule, Long week, Long day, Long lesson, List<Room> rooms) {
        Dispatch dispatch = new Dispatch();
        dispatch.setSchedule(schedule);
        dispatch.setWeek(week);
        dispatch.setDay(day);
        dispatch.setLesson(lesson);
        dispatch.setRooms(rooms);
        return this.dispatchRepository.save(dispatch);
    }

    private Schedule addSchedule(Teacher teacher, Term term, Course course, List<Clazz> clazzes) {
        Schedule schedule = new Schedule();
        schedule.setTeacher(teacher);
        schedule.setTerm(term);
        schedule.setCourse(course);
        schedule.setClazzes(clazzes);
        return this.scheduleRepository.save(schedule);
    }

    private Course addCourse(String courseName, Long lesson) {
        Course course = new Course();
        course.setLesson(lesson);
        course.setName(courseName);
        return this.courseRepository.save(course);
    }

    private Term addTerm(String termName, Long state) {
        Term term = new Term();
        term.setName(termName);
        term.setStartTime(1667260800L);
        term.setEndTime(1669852800L);
        term.setState(state);
        return this.termRepository.save(term);
    }

    private Room addRoom(String roomName, Long capacity) {
        Room room = new Room();
        room.setName(roomName);
        room.setCapacity(capacity);
        return this.roomRepository.save(room);
    }

    private Admin addAdmin(User user) {
        this.userService.save(user);
        Admin admin = new Admin();
        admin.setUser(user);
        return this.adminRepository.save(admin);
    }

    private Teacher addTeacher(User user) {
        this.userService.save(user);
        Teacher teacher = new Teacher();
        teacher.setUser(user);
        return this.teacherRepository.save(teacher);
    }

    private Student addStudent(User user, Clazz clazz, String sno, Long state) {
        this.userService.save(user);
        Student student = new Student();
        student.setUser(user);
        student.setSno(sno);
        student.setState(state);
        student.setClazz(clazz);
        return this.studentRepository.save(student);
    }

    private User getUser(Short role, String number, String password, String name) {
        User user = new User();
        user.setRole(role);
        user.setNumber(number);
        user.setPassword(password);
        user.setName(name);
        return user;
    }

    private Clazz addClazz(String name, Short length, Long entranceDate) {
        Clazz clazz = new Clazz();
        clazz.setName(name);
        clazz.setLength(length);
        clazz.setEntrance_date(entranceDate);
        return this.clazzRepository.save(clazz);
    }

}
