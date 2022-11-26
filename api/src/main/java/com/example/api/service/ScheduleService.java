package com.example.api.service;

import com.example.api.entity.Schedule;
import com.example.api.entity.forType.forScheduleAdd.ForScheduleAdd;
import com.example.api.entity.forType.forScheduleAdd.SaveForScheduleAdd;
import com.example.api.entity.forType.forTaskStudentAdd.ForTaskStudentAdd;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ScheduleService {

    ForScheduleAdd getForScheduleAdd(String userName);

    List<Schedule> clazzesHaveSelectCourse(Long course_id);

    void scheduleSave(SaveForScheduleAdd data);

    Page findAll(String courseName, String termName, String currentUserNumber, Pageable pageable);

    /*
     * 教师端 =》 课程任务 =》 查看学生 =》 移除
     * */
    Schedule deleteByStudentId(String studentId, String scheduleId);

    ForTaskStudentAdd getForAddByScheduleId(Long scheduleId);
}
