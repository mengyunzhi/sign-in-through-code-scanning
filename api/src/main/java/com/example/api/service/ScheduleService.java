package com.example.api.service;

import com.example.api.entity.Schedule;
import com.example.api.entity.forType.ForScheduleAdd;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ScheduleService {

    ForScheduleAdd getForScheduleAdd(String userName);

    List<Schedule> clazzesHaveSelectCourse(Long course_id);

    List<Schedule> findAll(String course, String term, String currentUserNumber);
}
