package com.example.api.controller;


import com.example.api.entity.Dispatch;
import com.example.api.entity.Schedule;
import com.example.api.entity.forType.forCourseScheduleGetData.ForCourseScheduleGetData;
import com.example.api.service.DispatchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("dispatch")
public class DispatchController {
    DispatchService dispatchService;

    @Autowired
    public DispatchController(DispatchService dispatchService) {
        this.dispatchService = dispatchService;
    }

    @GetMapping("getAll")
    public List<Dispatch> getAll() {
        return this.dispatchService.getAll();
    }

    /*
    * 教师端 => 课程表 => 获取课程表所需数据
    * */
    @GetMapping("getData")
    public ForCourseScheduleGetData getData(@RequestParam String userNumber) {
        return this.dispatchService.getData(userNumber);
    }

}
