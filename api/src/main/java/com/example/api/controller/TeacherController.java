package com.example.api.controller;

import com.example.api.entity.Teacher;
import com.example.api.entity.User;
import com.example.api.service.TeacherService;
import com.example.api.service.UserService;
import com.fasterxml.jackson.annotation.JsonView;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.SortDefault;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("teacher")
public class TeacherController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    private TeacherService teacherService;

    @Autowired
    public TeacherController(TeacherService teacherService) {
        this.teacherService = teacherService;
    }

    @PostMapping("add")
    @ResponseStatus(HttpStatus.CREATED)
    public Teacher save(@RequestBody User user) {
        return this.teacherService.save(user);
    }

    @GetMapping("page")
    @JsonView(PageJsonView.class)
    public Page page(@RequestParam(required = false) String name,
                     @RequestParam(required = false) String number,
                     @SortDefault.SortDefaults(@SortDefault(sort = "id", direction = Sort.Direction.DESC)) Pageable pageable) {
        return  this.teacherService.findAll(name, number, pageable);
    }

    @DeleteMapping("delete")
    public void deleteById() {
    }

    public class PageJsonView implements
            User.IdJsonView,
            User.NameJsonView,
            User.TeacherJsonView,
            User.NumberJsonView,
            User.SexJsonView,
            User.RoleJsonView,
            Teacher.IdJsonView {}
}
