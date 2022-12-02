package com.example.api.service;

import com.example.api.entity.Dispatch;
import com.sun.istack.NotNull;
import com.example.api.entity.Schedule;
import com.example.api.entity.forType.forCourseScheduleGetData.ForCourseScheduleGetData;

import java.util.List;

public interface DispatchService {

    List<Dispatch> getAll();

    void deleteById(@NotNull Long id);

    List<Dispatch> getDispatchesInTerm(Long termId);
    ForCourseScheduleGetData getData(String userNumber);
}
