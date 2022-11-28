package com.example.api.entity.forType.forScheduleEdit;

import com.example.api.entity.*;

import java.util.ArrayList;
import java.util.List;

public class EditIndex {
    private Schedule schedule = new Schedule();
    private List<Clazz> clazzes = new ArrayList();
    private Teacher teacher = new Teacher();
    private User user = new User();
    private Course course = new Course();
    private List<Program> programs = new ArrayList<>();
    private List<Dispatch> dispatches = new ArrayList<>();
    private List<List<Room>> rooms = new ArrayList<>();

    public Schedule getSchedule() {
        return schedule;
    }

    public void setSchedule(Schedule schedule) {
        this.schedule = schedule;
    }

    public List<Clazz> getClazzes() {
        return clazzes;
    }

    public void setClazzes(List<Clazz> clazzes) {
        this.clazzes = clazzes;
    }

    public Teacher getTeacher() {
        return teacher;
    }

    public void setTeacher(Teacher teacher) {
        this.teacher = teacher;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public List<Program> getPrograms() {
        return programs;
    }

    public void setPrograms(List<Program> programs) {
        this.programs = programs;
    }

    public List<Dispatch> getDispatches() {
        return dispatches;
    }

    public void setDispatches(List<Dispatch> dispatches) {
        this.dispatches = dispatches;
    }

    public List<List<Room>> getRooms() {
        return rooms;
    }

    public void setRooms(List<List<Room>> rooms) {
        this.rooms = rooms;
    }
}
