package com.example.api.controller;

import com.example.api.entity.Schedule;
import com.example.api.entity.forType.forScheduleAdd.ForScheduleAdd;
import com.example.api.entity.forType.forScheduleAdd.SaveForScheduleAdd;
import com.example.api.entity.forType.forTaskStudentAdd.ForTaskStudentAdd;
import com.example.api.repository.ScheduleRepository;
import com.example.api.service.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.SortDefault;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("schedule")
public class ScheduleController {

    ScheduleService scheduleService;

    @Autowired
    ScheduleController(ScheduleService scheduleService) {
        this.scheduleService = scheduleService;
    }

    @GetMapping("getDataForScheduleAdd")
    public ForScheduleAdd ScheduleController(@RequestParam String userNumber) {
        return this.scheduleService.getForScheduleAdd(userNumber);
    }

    @PostMapping("scheduleSave")
    public void scheduleSave(@RequestBody SaveForScheduleAdd data) {
        this.scheduleService.scheduleSave(data);
    }

    @GetMapping("page")
    public Page page(@RequestParam(required = false) String courseName,
                     @RequestParam(required = false) String termName,
                     @RequestParam String userNumber,
                     @SortDefault.SortDefaults(@SortDefault(sort = "id", direction = Sort.Direction.DESC)) Pageable pageable) {
        return  this.scheduleService.findAll(courseName, termName, userNumber, pageable);
    }

    /*
    * 教师端 =》 课程任务 =》 查看学生 =》 移除
    * */
    @GetMapping("deleteByStudentId")
    public Schedule deleteByStudentId(@RequestParam String studentId, @RequestParam String scheduleId) {
        return this.scheduleService.deleteByStudentId(studentId, scheduleId);
    }

    @GetMapping("getForAddByScheduleId/{scheduleId}")
    public ForTaskStudentAdd getForAddByScheduleId(@PathVariable Long scheduleId) {
        return this.scheduleService.getForAddByScheduleId(scheduleId);
    }

    @PostMapping("addStudentInCourse")
    public Schedule addStudentInCourse(@RequestParam Long studentId, @RequestParam Long scheduleId) {
        return this.scheduleService.addStudentInCourse(studentId, scheduleId);
    }

}
