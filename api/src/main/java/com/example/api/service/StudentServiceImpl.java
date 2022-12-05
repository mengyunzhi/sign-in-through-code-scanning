package com.example.api.service;

import com.example.api.config.StaticVariable;
import com.example.api.entity.Clazz;
import com.example.api.entity.Schedule;
import com.example.api.entity.Student;
import com.example.api.entity.User;
import com.example.api.repository.ScheduleRepository;
import com.example.api.repository.StudentRepository;
import com.example.api.repository.specs.StudentSpecs;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class StudentServiceImpl implements StudentService {

    private StudentRepository studentRepository;
    private ScheduleRepository scheduleRepository;
    private UserService userService;
    private ClazzService clazzService;

    @Autowired
    StudentServiceImpl(StudentRepository studentRepository,
                       UserService userService,
                       ClazzService clazzService,
                       ScheduleRepository scheduleRepository) {
        this.studentRepository = studentRepository;
        this.userService = userService;
        this.clazzService = clazzService;
        this.scheduleRepository = scheduleRepository;
    }

    @Override
    public Student save(String name, Short sex, String password, Long clazzId, String sno) {
        Assert.notNull(name, "name不能为null");
        Assert.notNull(sex, "sex不能为null");
        Assert.notNull(sex, "password不能为null");
        Assert.notNull(sno, "sno不能为null");
        User user = new User();
        user.setNumber(sno);
        user.setRole(StaticVariable.ROLE_STUDENT);
        user.setName(name);
        user.setSex(sex);
        user.setPassword(password);
        this.userService.save(user);

        Student student = new Student();
        student.setSno(sno);
        student.setState(0L);

        Clazz currentClazz = this.clazzService.findById(clazzId);
        currentClazz.setNumber_of_students(currentClazz.getNumber_of_students() + 1);

        Clazz clazz = new Clazz();
        clazz.setId(clazzId);

        student.setUser(user);
        student.setClazz(clazz);

        Long clazzCorrespondScheduleId = null;
        List<Schedule> allSchedule = (List<Schedule>) this.scheduleRepository.findAll();
        for (Schedule schedule : allSchedule) {
            for (Clazz scheduleCorrespondClazz : schedule.getClazzes()) {
                if (Objects.equals(scheduleCorrespondClazz.getId(), clazzId)) {
                    clazzCorrespondScheduleId = schedule.getId();
                    break;
                }
            }
        }
        if (clazzCorrespondScheduleId != null) {
            Schedule clazzCorrespondSchedule = this.scheduleRepository.findById(clazzCorrespondScheduleId).get();
            clazzCorrespondSchedule.getStudents().add(student);
        }

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

        List<Schedule> allSchedule = (List<Schedule>) this.scheduleRepository.findAll();
        for (Schedule schedule: allSchedule) {
            schedule.getStudents().removeIf(student -> Objects.equals(student.getUser().getId(), userId));
        }

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

    @Override
    public Page findAllBelongToClazz(Long clazzId, String searchName, String searchSno, Pageable pageable) {
        Assert.notNull(clazzId, "clazzId不能为null");
        Assert.notNull(pageable, "pageable不能为null");
        Specification<Student> specification = StudentSpecs.belongToClazz(clazzId)
                .and(StudentSpecs.relateUserByStudentName(searchName))
                .and(StudentSpecs.containSno(searchSno));
        return this.studentRepository.findAll(specification, pageable);
    }

    @Override
    public List<Student> pageByScheduleId(String scheduleId, String searchName, String searchSno, String searchClazz, String page, String size) {
        ArrayList<Student> studentsBySearchName = new ArrayList<>();
        ArrayList<Student> studentsBySearchClazz = new ArrayList<>();
        ArrayList<Student> resultStudents = new ArrayList<>();
        Schedule schedule = this.scheduleRepository.findById(Long.valueOf(scheduleId)).get();

        ArrayList<Student> allStudents = new ArrayList<>(schedule.getStudents());

        if (searchClazz != null && !searchClazz.equals("")) {
            for (Student student : allStudents) {
                if (student.getClazz().getName().contains(searchClazz)) {
                    studentsBySearchClazz.add(student);
                }
            }
        } else {
            studentsBySearchClazz.addAll(allStudents);
        }

        if (searchName != null && !searchName.equals("")) {
            for (Student student : studentsBySearchClazz) {
                if (student.getUser().getName().contains(searchName)) {
                    studentsBySearchName.add(student);
                }
            }
        } else {
            studentsBySearchName.addAll(studentsBySearchClazz);
        }

        if (searchSno != null && !searchSno.equals("")) {
            for (Student student : studentsBySearchName) {
                if (student.getSno().contains(searchSno)) {
                    resultStudents.add(student);
                }
            }
        } else {
            resultStudents.addAll(studentsBySearchName);
        }

        return resultStudents;
    }

    @Override
    public List<Student> getAllStudentByClazzId(Long clazzId) {
        return this.studentRepository.findByClazzId(clazzId);
    }

    @Override
    public List<Student> getAll() {
        return (List<Student>) this.studentRepository.findAll();
    }

    @Override
    public Long snoExist(Long userId, String sno) {
        Student student = this.studentRepository.findBySno(sno);
        if (student == null) {
            return 0L;
        }
        return 1L;
    }

    @Override
    public Student getByStudentId(Long studentId) {
        return this.studentRepository.findById(studentId).get();
    }

}
