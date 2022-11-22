package com.example.api.entity.forType.forScheduleAdd;

import java.util.ArrayList;
import java.util.List;

public class CourseTime {
    private List<Long> weeks = new ArrayList<>();
    private List<Long> roomIds = new ArrayList<>();

    public List<Long> getWeeks() {
        return weeks;
    }

    public void setWeeks(List<Long> weeks) {
        this.weeks = weeks;
    }

    public List<Long> getRoomIds() {
        return roomIds;
    }

    public void setRoomIds(List<Long> roomIds) {
        this.roomIds = roomIds;
    }
}
