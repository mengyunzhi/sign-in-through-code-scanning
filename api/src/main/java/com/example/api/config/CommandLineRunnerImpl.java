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
    private final ProgramRepository programRepository;

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
                                 DispatchRepository dispatchRepository,
                                 ProgramRepository programRepository) {
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
        this.programRepository = programRepository;
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
//        this.forHPTest();
        this.forCSHTest();
    }



    private void forHepanTest() {
        // 添加教师
        User uTeacher1 = this.getUser(StaticVariable.ROLE_TEACHER, "13100000000", "yunzhi", "教师1");
        Teacher teacher1 = this.addTeacher(uTeacher1);
        User uTeacher2 = this.getUser(StaticVariable.ROLE_TEACHER, "13100000001", "yunzhi", "教师2");
        Teacher teacher2 = this.addTeacher(uTeacher2);
        // 添加班级
        Clazz clazz1 = this.addClazz("testclazz1", (short) 2, 0L);
        Clazz clazz2 = this.addClazz("testclazz2", (short) 4, 1000000L);
        Clazz clazz3 = this.addClazz("testclazz3", (short) 8, 1000000000L);
        Clazz clazz4 = this.addClazz("testclazz4", (short) 8, 100000000000L);
        List<Clazz> clazzes = new ArrayList<>();
        clazzes.add(clazz1);
        clazzes.add(clazz2);
        // 添加学生，该学生属于上面的班级
        User uStudent1 = this.getUser(StaticVariable.ROLE_STUDENT, "111111", "yunzhi", "学生");
        Student student1 = this.addStudent(uStudent1, clazz1, "111111", StaticVariable.STATE_TRUE);

        User uStudent7 = this.getUser(StaticVariable.ROLE_STUDENT, "222222", "yunzhi", "222222");
        Student student7= this.addStudent(uStudent7, clazz2, "222222", StaticVariable.STATE_TRUE);

        User uStudent2 = this.getUser(StaticVariable.ROLE_STUDENT, "333333", "yunzhi", "333333");
        Student student2 = this.addStudent(uStudent2, clazz1, "333333", StaticVariable.STATE_TRUE);

        User uStudent3 = this.getUser(StaticVariable.ROLE_STUDENT, "444444", "yunzhi", "444444");
        Student student3= this.addStudent(uStudent3, clazz1, "444444", StaticVariable.STATE_TRUE);

        User uStudent4 = this.getUser(StaticVariable.ROLE_STUDENT, "555555", "yunzhi", "555555");
        Student student4 = this.addStudent(uStudent4, clazz2, "555555", StaticVariable.STATE_TRUE);

        User uStudent5 = this.getUser(StaticVariable.ROLE_STUDENT, "666666", "yunzhi", "666666");
        Student student5 = this.addStudent(uStudent5, clazz2, "666666", StaticVariable.STATE_TRUE);

        User uStudent6 = this.getUser(StaticVariable.ROLE_STUDENT, "777777", "yunzhi", "777777");
        Student student6= this.addStudent(uStudent6, clazz2, "777777", StaticVariable.STATE_TRUE);


        List<Student> students = new ArrayList<>();
        students.add(student1);
        students.add(student7);
        students.add(student2);
        students.add(student3);
        students.add(student4);
        students.add(student5);
        students.add(student6);

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
        Course course1 = this.addCourse("testCourse1", 40L);
        Course course2 = this.addCourse("testCourse2", 40L);
        Course course3 = this.addCourse("testCourse3", 40L);
        // 添加排课(schedule)
        Schedule schedule1 = this.addSchedule(teacher1, term1, course1, clazzes, students);
        Schedule schedule2 = this.addSchedule(teacher1, term1, course2, clazzes, students);
        Schedule schedule3 = this.addSchedule(teacher1, term1, course3, clazzes, students);
        Schedule schedule4 = this.addSchedule(teacher2, term1, course3, clazzes, students);
        // 添加调度(dispatch)
        Dispatch dispatch1 = this.addDispatch(schedule1, 0L, 0L, 0L, rooms);
        Dispatch dispatch2 = this.addDispatch(schedule2, 0L, 0L, 0L, rooms);
        Dispatch dispatch3 = this.addDispatch(schedule3, 0L, 0L, 0L, rooms);
    }

    private void forCSHTest() {
        // 添加教师
        User uTeacher1 = this.getUser(StaticVariable.ROLE_TEACHER, "13100000000", "yunzhi", "教师1");
        Teacher teacher1 = this.addTeacher(uTeacher1);
        User uTeacher2 = this.getUser(StaticVariable.ROLE_TEACHER, "13100000001", "yunzhi", "教师2");
        Teacher teacher2 = this.addTeacher(uTeacher2);
        // 添加班级
        Clazz clazz1 = this.addClazz("testclazz1", (short) 2, 0L);
        Clazz clazz2 = this.addClazz("testclazz2", (short) 4, 1000000L);
        Clazz clazz3 = this.addClazz("testclazz3", (short) 8, 1000000000L);
        Clazz clazz4 = this.addClazz("testclazz4", (short) 8, 100000000000L);
        List<Clazz> clazzes = new ArrayList<>();
        clazzes.add(clazz1);
        clazzes.add(clazz2);
        // 添加学生，该学生属于上面的班级
        User uStudent1 = this.getUser(StaticVariable.ROLE_STUDENT, "111111", "yunzhi", "学生1");
        Student student1 = this.addStudent(uStudent1, clazz1, "111111", StaticVariable.STATE_FALSE);

        User uStudent2 = this.getUser(StaticVariable.ROLE_STUDENT, "222222", "yunzhi", "学生2");
        Student student2= this.addStudent(uStudent2, clazz2, "222222", StaticVariable.STATE_FALSE);

        User uStudent3 = this.getUser(StaticVariable.ROLE_STUDENT, "13122333333", "yunzhi", "学生3");
        Student student3= this.addStudent(uStudent3, clazz3, "333333", StaticVariable.STATE_TRUE);

        User uStudent4 = this.getUser(StaticVariable.ROLE_STUDENT, "13122444444", "yunzhi", "学生4");
        Student student4= this.addStudent(uStudent4, clazz4, "444444", StaticVariable.STATE_TRUE);
        User uStudent5 = this.getUser(StaticVariable.ROLE_STUDENT, "13122555555", "yunzhi", "学生5");
        Student student5 = this.addStudent(uStudent5, clazz4, "555555", StaticVariable.STATE_TRUE);

        List<Student> students = new ArrayList<>();
        students.add(student1);
        students.add(student2);

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
        Course course1 = this.addCourse("testCourse1", 40L);
        Course course2 = this.addCourse("testCourse2", 40L);
        Course course3 = this.addCourse("testCourse3", 40L);
        // 添加课程项目
        Program program1 = this.addProgram("testProgram1", course1, 2L);
        Program program2 = this.addProgram("testProgram2", course2, 4L);
        Program program3 = this.addProgram("testProgram3", course3, 6L);
        // 添加排课(schedule)
        Schedule schedule1 = this.addSchedule(teacher1, term1, course1, clazzes, null);
        List<Clazz> clazzes2 = new ArrayList<>(); clazzes2.add(clazz3);
        Schedule schedule2 = this.addSchedule(teacher2, term1, course2, clazzes2, null);
        // 添加调度(dispatch)
        Dispatch dispatch1 = this.addDispatch(schedule1, 0L, 0L, 0L, rooms);rooms.remove(1);
        Dispatch dispatch2 = this.addDispatch(schedule1, 1L, 1L, 1L, rooms);
        Dispatch dispatch3 = this.addDispatch(schedule2, 1L, 2L, 1L, rooms);
    }

    private Program addProgram(String name, Course course, Long lesson) {
        Program program = new Program();
        program.setName(name);
        program.setCourse(course);
        program.setLesson(lesson);
        return this.programRepository.save(program);
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

    private Schedule addSchedule(Teacher teacher, Term term, Course course, List<Clazz> clazzes, List<Student> students) {
        Schedule schedule = new Schedule();
        schedule.setTeacher(teacher);
        schedule.setTerm(term);
        schedule.setCourse(course);
        schedule.setClazzes(clazzes);
        schedule.setStudents(students);
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
