package com.example.api.service;

import com.example.api.entity.Dispatch;
import com.example.api.entity.Schedule;
import com.example.api.entity.forType.forCourseScheduleGetData.ForCourseScheduleGetData;

import java.util.List;

public interface DispatchService {

    List<Dispatch> getAll();

    ForCourseScheduleGetData getData(String userNumber);
}
