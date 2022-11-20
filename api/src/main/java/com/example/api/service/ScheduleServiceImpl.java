package com.example.api.service;

import com.example.api.entity.*;
import com.example.api.entity.forType.DispatchForSchedule;
import com.example.api.entity.forType.ForScheduleAdd;
import com.example.api.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ScheduleServiceImpl implements ScheduleService {

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
                        DispatchRepository dispatchRepository) {
        this.scheduleRepository = scheduleRepository;
        this.courseRepository = courseRepository;
        this.clazzRepository = clazzRepository;
        this.termService = termService;
        this.teacherService = teacherService;
        this.roomRepository = roomRepository;
        this.dispatchRepository = dispatchRepository;
    }


    @Override
    public ForScheduleAdd getForScheduleAdd(String userName) {
        ForScheduleAdd forScheduleAdd = new ForScheduleAdd();
        forScheduleAdd.setCourses((List<Course>) this.courseRepository.findAll());
        forScheduleAdd.setClazzes((List<Clazz>) this.clazzRepository.findAll());
        forScheduleAdd.setTerm(this.termService.getCurrentTerm());
        forScheduleAdd.setTeacher(this.teacherService.getTeacherByUserName(userName));
        forScheduleAdd.setRooms((List<Room>) this.roomRepository.findAll());

        List<DispatchForSchedule> dispatches = this.getDispatchesForScheduleAdd(forScheduleAdd.getTerm());
        return forScheduleAdd;
    }

    private List<DispatchForSchedule> getDispatchesForScheduleAdd(Term term) {
        List<Schedule> schedules = this.scheduleRepository.findSchedulesByTerm_Id(term.getId());
        List<Dispatch> dispatches = new ArrayList<>();
        schedules.forEach(schedule -> {
             dispatches.add(this.dispatchRepository.findDispatchByScheduleId(schedule.getId()));
        });
        List<DispatchForSchedule> dispatchForSchedules = this.convertDispatchesToDispatchForScheduleAdd(dispatches);
        return null;
    }

    private List<DispatchForSchedule> convertDispatchesToDispatchForScheduleAdd(List<Dispatch> dispatches) {
        return  null;
    }
}
