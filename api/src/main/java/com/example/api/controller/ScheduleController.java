package com.example.api.controller;

import com.example.api.entity.forType.ForScheduleAdd;
import com.example.api.service.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
}
