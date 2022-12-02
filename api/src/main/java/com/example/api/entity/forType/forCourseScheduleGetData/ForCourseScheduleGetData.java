package com.example.api.entity.forType.forCourseScheduleGetData;

import com.example.api.entity.*;

import java.util.ArrayList;
import java.util.List;

public class ForCourseScheduleGetData {
    private Clazz[][] clazzes;

    private List<Course> courses = new ArrayList<>();

    private Dispatch[][] dispatches;

    private Room[][][] rooms;

    public Clazz[][] getClazzes() {
        return clazzes;
    }

    public void setClazzes(Clazz[][] clazzes) {
        this.clazzes = clazzes;
    }

    public List<Course> getCourses() {
        return courses;
    }

    public void setCourses(List<Course> courses) {
        this.courses = courses;
    }

    public Dispatch[][] getDispatches() {
        return dispatches;
    }

    public void setDispatches(Dispatch[][] dispatches) {
        this.dispatches = dispatches;
    }

    public Room[][][] getRooms() {
        return rooms;
    }

    public void setRooms(Room[][][] rooms) {
        this.rooms = rooms;
    }
}
