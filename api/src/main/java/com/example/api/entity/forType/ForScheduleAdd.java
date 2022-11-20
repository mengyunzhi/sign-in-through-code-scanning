package com.example.api.entity.forType;

import com.example.api.entity.*;

import java.util.ArrayList;
import java.util.List;

public class ForScheduleAdd {
    // 全部课程
    private List<Course> courses = new ArrayList<>();
    // 全部班级
    private List<Clazz> clazzes = new ArrayList<>();
    // 当前学期
    private Term term = null;
    // 当前登录教师
    private Teacher teacher = null;
    // 全部教室
    private List<Room> rooms = new ArrayList<>();

    private List<DispatchForSchedule> dispatches;


    public List<Course> getCourses() {
        return courses;
    }

    public void setCourses(List<Course> courses) {
        this.courses = courses;
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

    public List<DispatchForSchedule> getDispatches() {
        return dispatches;
    }

    public void setDispatches(List<DispatchForSchedule> dispatches) {
        this.dispatches = dispatches;
    }
}
