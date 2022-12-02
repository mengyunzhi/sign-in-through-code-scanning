package com.example.api.entity.forType.forScheduleEdit;

import com.example.api.entity.*;
import com.example.api.entity.forType.forScheduleAdd.DispatchForSchedule;

import java.util.ArrayList;
import java.util.List;

public class ForScheduleEdit {
    public ForScheduleEdit(Schedule schedule, List<Dispatch> dispatches, List<Room> rooms) {
        this.term = schedule.getTerm();
        this.clazzes = schedule.getClazzes();
        this.rooms = rooms;
        this.course = schedule.getCourse();
        this.teacher = schedule.getTeacher();
        this.dispatchForSchedules = this.convertDispatchesToDispatchForSchedules(dispatches);
    }

    /** schedule所对应的course */
    private Course course = new Course();

    /** schedule所对应的clazzes */
    private List<Clazz> clazzes = new ArrayList<>();

    /** schedule对应学期 */
    private Term term = new Term();

    /** schedule所对应的teacher */
    private Teacher teacher = new Teacher();
    /** 所有的rooms */
    private List<Room> rooms = new ArrayList<>();
    /** 所有的dispatchForSchedules */
    private List<DispatchForSchedule> dispatchForSchedules = new ArrayList<>();

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public List<Clazz> getClazzes() {
        return clazzes;
    }

    public void setClazzes(List<Clazz> clazzes) {
        this.clazzes = clazzes;
    }

    public Term getTerm() {
        return term;
    }

    public void setTerm(Term term) {
        this.term = term;
    }

    public Teacher getTeacher() {
        return teacher;
    }

    public void setTeacher(Teacher teacher) {
        this.teacher = teacher;
    }

    public List<Room> getRooms() {
        return rooms;
    }

    public void setRooms(List<Room> rooms) {
        this.rooms = rooms;
    }

    public List<DispatchForSchedule> getDispatchForSchedules() {
        return dispatchForSchedules;
    }

    public void setDispatchForSchedules(List<DispatchForSchedule> dispatchForSchedules) {
        this.dispatchForSchedules = dispatchForSchedules;
    }

    private List<DispatchForSchedule> convertDispatchesToDispatchForSchedules(List<Dispatch> dispatches) {
        List<DispatchForSchedule> dispatchForSchedules = new ArrayList<>();
        dispatches.forEach(dispatch -> {
            // 对单项转换，转换完成后放到数组 dispatchForSchedules 中
            DispatchForSchedule dispatchForSchedule = new DispatchForSchedule(dispatch);
            dispatchForSchedules.add(dispatchForSchedule);
        });
        return dispatchForSchedules;
    }
}
