package com.example.api.controller;


import com.example.api.entity.Course;
import com.example.api.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.SortDefault;
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

    @GetMapping("page")
    public Page page(@RequestParam(required = false) String searchName,
                     @RequestParam(required = false) String searchLesson,
                     @SortDefault.SortDefaults(@SortDefault(sort = "id", direction = Sort.Direction.DESC)) Pageable pageable) {
        return  this.courseService.findAll(searchName, searchLesson, pageable);
    }

    @DeleteMapping("delete/{id}")
    public void delete(@PathVariable Long id) {
        this.courseService.deleteById(id);
    }

    @GetMapping("getById/{id}")
    public Course getById(@PathVariable Long id) {
        return this.courseService.getById(id);
    }

    @PostMapping("update/{id}")
    public Course update(@PathVariable Long id,
                       @RequestBody Course course) {
        return this.courseService.update(id, course);
    }

}
