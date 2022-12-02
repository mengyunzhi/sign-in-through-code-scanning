package com.example.api.service;

import com.example.api.entity.Dispatch;
import com.example.api.entity.Schedule;
import com.example.api.repository.DispatchRepository;
import com.example.api.entity.*;
import com.example.api.entity.forType.forCourseScheduleGetData.ForCourseScheduleGetData;
import com.example.api.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.ArrayList;
import java.util.List;

@Service
public class DispatchServiceImpl implements DispatchService {

    ScheduleService scheduleService;

    private DispatchRepository dispatchRepository;

    private UserRepository userRepository;

    private TeacherRepository teacherRepository;

    private  TermRepository termRepository;

    private ScheduleRepository scheduleRepository;



    @Autowired
    DispatchServiceImpl(DispatchRepository dispatchRepository,
                        UserRepository userRepository,
                        TeacherRepository teacherRepository,
                        TermRepository termRepository,
                        ScheduleRepository scheduleRepository,
                        @Lazy ScheduleService scheduleService) {
        this.dispatchRepository = dispatchRepository;
        this.userRepository = userRepository;
        this.teacherRepository = teacherRepository;
        this.termRepository = termRepository;
        this.scheduleRepository = scheduleRepository;
        this.scheduleService = scheduleService;
    }

    @Override
    public List<Dispatch> getAll() {
        return (List<Dispatch>) this.dispatchRepository.findAll();
    }

    @Override
    public void deleteById(Long id) {
        Assert.notNull(id, "id不能为null");
        this.dispatchRepository.deleteById(id);
    }

    @Override
    public List<Dispatch> getDispatchesInTerm(Long termId) {
        List<Schedule> schedules = this.scheduleService.getAllByTermId(termId);
        List<Dispatch> dispatches = new ArrayList<>();
        schedules.forEach(schedule -> {
            schedule.getDispatches().forEach(dispatch -> {
                dispatches.add(dispatch);
            });
        });
        return dispatches;
    }
    @Override
    public ForCourseScheduleGetData getData(String userNumber) {
        // ForCourseScheduleGetData
        // 获取当前登陆的用户
        User loginUser = this.userRepository.findByNumber(userNumber).get();
        // 获取当前登陆的老师
        Teacher currentTeacher = this.teacherRepository.findByUserId(loginUser.getId());
        // 获取当前激活的学期
        Term currentTerm = this.termRepository.findTermByState(1L);

        // 通过老师和学期获取对应的schedule
        List<Schedule> schedules = this.scheduleRepository.findSchedulesByTeacherIdAndTermId(currentTeacher.getId(), currentTerm.getId());

        List<Course> courses = new ArrayList<>();
        Clazz[][] clazzes = new Clazz[schedules.size()][];
        Dispatch[][] dispatches = new Dispatch[schedules.size()][];
        Room[][][] rooms = new Room[schedules.size()][][];

        for (int key = 0 ; key < schedules.size(); key++) {
            // 本次循环时的schedule
            Schedule schedule = schedules.get(key);

            // 获取courses
            courses.add(schedule.getCourse());

            // 获取班级
            List<Clazz> keyClazzes = schedule.getClazzes();
            clazzes[key] = new Clazz[keyClazzes.size()];
            for (int i = 0; i < keyClazzes.size(); i++) {
                clazzes[key][i] = keyClazzes.get(i);
            }

            // 获取dispatches
            List<Dispatch> keyDispatches = this.dispatchRepository.findDispatchesByScheduleId(schedule.getId());
            dispatches[key] = new Dispatch[keyDispatches.size()];
            for (int i = 0; i < keyDispatches.size(); i++) {
                dispatches[key][i] = keyDispatches.get(i);
            }

            // 获取教室
            rooms[key] = new Room[keyDispatches.size()][];
            for (int i = 0; i < keyDispatches.size(); i++) {
                List<Room> keyIrooms = keyDispatches.get(i).getRooms();
                rooms[key][i] = new Room[keyIrooms.size()];
                for (int j = 0; j < keyIrooms.size(); j++) {
                    if (keyIrooms.get(j) != null) {
                        rooms[key][i][j] = keyIrooms.get(j);
                    }
                }
            }

        }

        ForCourseScheduleGetData forCourseScheduleGetData = new ForCourseScheduleGetData();
        forCourseScheduleGetData.setCourses(courses);
        forCourseScheduleGetData.setClazzes(clazzes);
        forCourseScheduleGetData.setDispatches(dispatches);
        forCourseScheduleGetData.setRooms(rooms);

        return forCourseScheduleGetData;
    }
}
