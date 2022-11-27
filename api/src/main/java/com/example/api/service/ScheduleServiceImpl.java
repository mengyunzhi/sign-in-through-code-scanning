package com.example.api.service;

import com.example.api.entity.*;
import com.example.api.entity.forType.forScheduleAdd.CourseTime;
import com.example.api.entity.forType.forScheduleAdd.DispatchForSchedule;
import com.example.api.entity.forType.forScheduleAdd.ForScheduleAdd;
import com.example.api.entity.forType.forScheduleAdd.SaveForScheduleAdd;
import com.example.api.entity.forType.forTaskStudentAdd.ForTaskStudentAdd;
import com.example.api.repository.*;
import com.example.api.repository.specs.ScheduleSpecs;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ScheduleServiceImpl implements ScheduleService {

    private StudentRepository studentRepository;
    private TeacherRepository teacherRepository;
    private UserRepository userRepository;
    private  TermRepository termRepository;
    private ScheduleRepository scheduleRepository;
    private CourseRepository courseRepository;
    private ClazzRepository clazzRepository;
    private TermService termService;
    private TeacherService teacherService;
    private RoomRepository roomRepository;
    private DispatchRepository dispatchRepository;

    @Autowired
    ScheduleServiceImpl(ScheduleRepository scheduleRepository,
                        CourseRepository courseRepository,
                        ClazzRepository clazzRepository,
                        TermService termService,
                        TeacherService teacherService,
                        RoomRepository roomRepository,
                        TermRepository termRepository,
                        UserRepository userRepository,
                        TeacherRepository teacherRepository,
                        StudentRepository studentRepository,
                        DispatchRepository dispatchRepository) {
        this.scheduleRepository = scheduleRepository;
        this.courseRepository = courseRepository;
        this.clazzRepository = clazzRepository;
        this.termService = termService;
        this.teacherService = teacherService;
        this.roomRepository = roomRepository;
        this.termRepository = termRepository;
        this.userRepository = userRepository;
        this.teacherRepository = teacherRepository;
        this.studentRepository = studentRepository;
        this.dispatchRepository = dispatchRepository;
    }


    /**
     *  ForScheduleAdd 包含所有课程，班级，当前学期，当前教师，所有教室，以及DispatchForSchedule[]
     *  DispatchForSchedule 包含上课的周/天/节，对应schedule_id，对应teacher_id,roomIds,clazzIds[]
     *  当前教师：通过前台传过来的userNumber获取
     *  已激活学期： 判断state 为 1L 获取
     */
    @Override
    public ForScheduleAdd getForScheduleAdd(String userName) {
        ForScheduleAdd forScheduleAdd = new ForScheduleAdd();
        forScheduleAdd.setCourses((List<Course>) this.courseRepository.findAll());
        forScheduleAdd.setClazzes((List<Clazz>) this.clazzRepository.findAll());
        forScheduleAdd.setTerm(this.termService.getCurrentTerm());
        forScheduleAdd.setTeacher(this.teacherService.getTeacherByUserName(userName));
        forScheduleAdd.setRooms((List<Room>) this.roomRepository.findAll());
        // 获取当前学期调度信息: DispatchForSchedule[]
        List<DispatchForSchedule> dispatches = this.getDispatchesForScheduleAdd(forScheduleAdd.getTerm());
        forScheduleAdd.setDispatches(dispatches);
        return forScheduleAdd;
    }

    @Override
    public List<Schedule> clazzesHaveSelectCourse(Long course_id) {
        Term term = this.termService.getCurrentTerm();
        return this.scheduleRepository.findSchedulesByCourse_IdAndTermId(course_id, term.getId());
    }

    /**
     * 设置schedule=> clazzes, teacher, course, term
     */
    @Override
    public void scheduleSave(SaveForScheduleAdd data) {
        Schedule schedule = new Schedule();
        data.getClazzIds().forEach(clazzId -> {
            schedule.getClazzes().add(this.clazzRepository.findById(clazzId).get());
            List<Student> students = this.studentRepository.findByClazzId(clazzId);
            students.forEach(student -> {
                schedule.getStudents().add(student);
            });
        });
        schedule.setTeacher(this.teacherService.getByTeacherId(data.getTeacherId()));
        schedule.setCourse(this.courseRepository.findById(data.getCourseId()).get());
        schedule.setTerm(this.termService.getCurrentTerm());
        this.scheduleRepository.save(schedule);
        this.saveDispatches(data.getCourseTimes(), schedule.getId());
    }

    @Override
    public Page findAll(String courseName, String termName, String currentUserNumber, Pageable pageable) {
        Term term = this.termService.getCurrentTerm();
        Teacher teacher = this.teacherService.getTeacherByUserName(currentUserNumber);
        Specification<Schedule> specification = ScheduleSpecs.containTermName(termName)
                .and(ScheduleSpecs.containCourseName(courseName))
                .and(ScheduleSpecs.relateTeacher(teacher))
                .and(ScheduleSpecs.relateTerm(term));
        Page<Schedule> page = this.scheduleRepository.findAll(specification, pageable);
        return page;
    }

    /*
     * 教师端 =》 课程任务 =》 查看学生 =》 移除
     * */
    @Override
    public Schedule deleteByStudentId(String studentId, String scheduleId) {
        Schedule schedule = this.scheduleRepository.findById(Long.valueOf(scheduleId)).get();
        schedule.getStudents().removeIf(student -> student.getId().equals(Long.valueOf(studentId)));
        return this.scheduleRepository.save(schedule);
    }

    /*
    * 教师端 =》 课程任务 =》 查看学生 =》 新增 =》初始化数据获取
    * */
    @Override
    public ForTaskStudentAdd getForAddByScheduleId(Long scheduleId) {
        // clazzes: all; students: all； studentIds: 本schedule已关联的学生ids
        ForTaskStudentAdd forTaskStudentAdd = new ForTaskStudentAdd();
        List<Student> students = this.scheduleRepository.findById(scheduleId).get().getStudents();
        for (Student student: students) {
            forTaskStudentAdd.getStudentIds().add(student.getId());
        }
        List<Student> allStudents = this.studentRepository.findAll();
        forTaskStudentAdd.setStudents(allStudents);

        List<Clazz> allClazzes = this.clazzRepository.findAll();
        forTaskStudentAdd.setClazzes(allClazzes);

        return forTaskStudentAdd;


    }

    @Override
    public Schedule addStudentInCourse(Long studentId, Long scheduleId) {
        Schedule schedule = this.scheduleRepository.findById(scheduleId).get();
        Student student = this.studentRepository.findByUserId(studentId);
        schedule.getStudents().add(student);
        return this.scheduleRepository.save(schedule);
    }

    private void saveDispatches(List<List<CourseTime>> courseTimes, Long scheduleId) {
        for (int day = 0; day < 7; day++) {
            for (int lesson = 0; lesson < 5; lesson++) {
                List<Long> weeks = courseTimes.get(day).get(lesson).getWeeks();
                List<Long> roomIds = courseTimes.get(day).get(lesson).getRoomIds();
                if (weeks.size() != 0) {
                    this.saveDispatch(scheduleId, weeks, (long) day, (long) lesson, roomIds);
                }
            }
        }
    }

    private void saveDispatch(Long scheduleId, List<Long> weeks, Long day, Long lesson, List<Long> roomIds) {
        for (Long week:
             weeks) {
            Dispatch dispatch = new Dispatch();
            dispatch.setWeek(week);
            dispatch.getSchedule().setId(scheduleId);
            dispatch.setDay(day);
            dispatch.setLesson(lesson);
            roomIds.forEach(roomId -> {
                dispatch.getRooms().add(this.roomRepository.findById(roomId).get());
            });
            this.dispatchRepository.save(dispatch);
        }
    }

    private List<DispatchForSchedule> getDispatchesForScheduleAdd(Term term) {
        List<Schedule> schedules = this.scheduleRepository.findSchedulesByTerm_Id(term.getId());
        List<Dispatch> dispatches = new ArrayList<>();
        schedules.forEach(schedule -> {
            List<Dispatch> tempDispatches = this.dispatchRepository.findDispatchesByScheduleId(schedule.getId());
            tempDispatches.forEach(dispatch -> {
                dispatches.add(dispatch);
            });
        });
        // 将获取到的 Dispatch类型 转换成 DispatchForSchedule类型
        List<DispatchForSchedule> dispatchForSchedules = this.convertDispatchesToDispatchForScheduleAdd(dispatches);
        return dispatchForSchedules;
    }

    private List<DispatchForSchedule> convertDispatchesToDispatchForScheduleAdd(List<Dispatch> dispatches) {
        List<DispatchForSchedule> dispatchForSchedules = new ArrayList<>();
        dispatches.forEach(dispatch -> {
            // 对单项转换，转换完成后放到数组 dispatchForSchedules 中
            DispatchForSchedule dispatchForSchedule = this.getDispatchesForScheduleByDispatch(dispatch);
            dispatchForSchedules.add(dispatchForSchedule);
        });
        return  dispatchForSchedules;
    }

    private DispatchForSchedule getDispatchesForScheduleByDispatch(Dispatch dispatch) {
        DispatchForSchedule dispatchForSchedule = new DispatchForSchedule();
        dispatchForSchedule.setWeek(dispatch.getWeek());
        dispatchForSchedule.setDay(dispatch.getDay());
        dispatchForSchedule.setLesson(dispatch.getLesson());
        dispatchForSchedule.setTeacher_id(dispatch.getSchedule().getTeacher().getId());
        dispatchForSchedule.setTeacher_id(dispatch.getSchedule().getId());
        for (Clazz clazz:
             dispatch.getSchedule().getClazzes()) {
            dispatchForSchedule.getClazzIds().add(clazz.getId());
        }
        for (Room room:
                dispatch.getRooms()) {
            dispatchForSchedule.getRoomIds().add(room.getId());
        }
        return dispatchForSchedule;
    }
}
