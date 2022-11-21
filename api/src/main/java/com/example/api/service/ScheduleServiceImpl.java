package com.example.api.service;

import com.example.api.entity.*;
import com.example.api.entity.forType.DispatchForSchedule;
import com.example.api.entity.forType.ForScheduleAdd;
import com.example.api.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ScheduleServiceImpl implements ScheduleService {

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

    @Override
    public List<Schedule> findAll(String searchCourseName, String termName, String currentUserNumber) {
        Term term = this.termRepository.findByName(termName);
        User user = this.userRepository.findByNumber(currentUserNumber).get();
        Teacher teacher = this.teacherRepository.findByUserId(user.getId());
        return this.scheduleRepository.findSchedulesByTeacherIdAndTermId(teacher.getId(), term.getId());
    }

    private List<DispatchForSchedule> getDispatchesForScheduleAdd(Term term) {
        List<Schedule> schedules = this.scheduleRepository.findSchedulesByTerm_Id(term.getId());
        List<Dispatch> dispatches = new ArrayList<>();
        schedules.forEach(schedule -> {
             dispatches.add(this.dispatchRepository.findDispatchByScheduleId(schedule.getId()));
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
