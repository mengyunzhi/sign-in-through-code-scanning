package com.example.api.entity.forType.forScheduleEdit;

import com.example.api.entity.forType.forScheduleAdd.CourseTime;

import java.util.ArrayList;
import java.util.List;

public class ForScheduleUpdate {
    public Long scheduleId;
    public List<List<CourseTime>> courseTimes = new ArrayList<>();
}
