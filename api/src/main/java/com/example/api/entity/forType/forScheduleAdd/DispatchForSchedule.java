package com.example.api.entity.forType.forScheduleAdd;

import com.example.api.entity.Clazz;
import com.example.api.entity.Dispatch;
import com.example.api.entity.Room;

import java.util.ArrayList;
import java.util.List;

public class DispatchForSchedule {

    public DispatchForSchedule(Dispatch dispatch) {
        this.setWeek(dispatch.getWeek());
        this.setDay(dispatch.getDay());
        this.setLesson(dispatch.getLesson());
        this.setTeacher_id(dispatch.getSchedule().getTeacher().getId());
        this.setSchedule_id(dispatch.getSchedule().getId());
        for (Clazz clazz:
                dispatch.getSchedule().getClazzes()) {
            this.getClazzIds().add(clazz.getId());
        }
        for (Room room:
                dispatch.getRooms()) {
            this.getRoomIds().add(room.getId());
        }
    }
    private Long week;
    private Long day;
    private Long lesson;
    private Long schedule_id;
    private Long teacher_id;
    private List<Long> roomIds = new ArrayList<>();
    private List<Long> clazzIds = new ArrayList<>();


    public Long getWeek() {
        return week;
    }

    public void setWeek(Long week) {
        this.week = week;
    }

    public Long getDay() {
        return day;
    }

    public void setDay(Long day) {
        this.day = day;
    }

    public Long getLesson() {
        return lesson;
    }

    public void setLesson(Long lesson) {
        this.lesson = lesson;
    }

    public Long getSchedule_id() {
        return schedule_id;
    }

    public void setSchedule_id(Long schedule_id) {
        this.schedule_id = schedule_id;
    }

    public Long getTeacher_id() {
        return teacher_id;
    }

    public void setTeacher_id(Long teacher_id) {
        this.teacher_id = teacher_id;
    }

    public List<Long> getRoomIds() {
        return roomIds;
    }

    public void setRoomIds(List<Long> roomIds) {
        this.roomIds = roomIds;
    }

    public List<Long> getClazzIds() {
        return clazzIds;
    }

    public void setClazzIds(List<Long> clazzIds) {
        this.clazzIds = clazzIds;
    }

}
