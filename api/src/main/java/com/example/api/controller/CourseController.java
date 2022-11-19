package com.example.api.controller;


import com.example.api.entity.Course;
import com.example.api.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("course")
public class CourseController {

    private CourseService courseService;

    @Autowired
    CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @PostMapping("add")
    @ResponseStatus(HttpStatus.CREATED)
    public Course save(@RequestBody Course course) {
        return this.courseService.save(course);
    }
}
