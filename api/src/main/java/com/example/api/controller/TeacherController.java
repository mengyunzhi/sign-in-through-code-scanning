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
    public Page page(@RequestParam(required = false) String name,
                     @RequestParam(required = false) String number,
                     @SortDefault.SortDefaults(@SortDefault(sort = "id", direction = Sort.Direction.DESC)) Pageable pageable) {
        return  this.teacherService.findAll(name, number, pageable);
    }

    @DeleteMapping("delete/{userId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteByUserId(@PathVariable Long userId) {
        this.teacherService.deleteByUserId(userId);
    }

    @GetMapping("getById/{userId}")
    public Teacher getByUserId(@PathVariable Long userId) {
        return this.teacherService.getByUserId(userId);
    }

    @PostMapping("updatePasswordByAdmin/{userId}")
    public void updatePasswordByAdmin(@PathVariable Long userId,
                                      @RequestBody String password) {
        this.teacherService.updatePassword(userId, password);
    }

    @PostMapping("update/{userId}")
    public Teacher update(@PathVariable Long userId,
                          @RequestBody updateBody data) {
        return this.teacherService.update(userId, data.name, data.sex, data.number);
    }

}

class updateBody {
    public String name = "";
    public Short sex = null;
    public String number = "";
}
