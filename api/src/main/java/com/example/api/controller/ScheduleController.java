package com.example.api.controller;

import com.example.api.entity.Schedule;
import com.example.api.entity.forType.ForScheduleAdd;
import com.example.api.service.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

    @GetMapping("page")
    public List<Schedule> page(@RequestParam String course, @RequestParam String term, @RequestParam String currentUserNumber) {
        return this.scheduleService.findAll(course, term, currentUserNumber);
    }
}
