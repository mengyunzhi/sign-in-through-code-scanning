package com.example.api.controller;


import com.example.api.entity.Student;
import com.example.api.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("student")
public class StudentController {

    private StudentService studentService;

    @Autowired
    StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    /*
    * 包含的数据：
    * name, sex, sno, klass_id
    * 刚添加的学生的number使用学号
    * */
    @PostMapping("add")
    public Student save(@RequestBody Student student) {
        return this.studentService.save(
            student.getUser().getName(),
            student.getUser().getSex(),
            student.getClazz().getId(),
            student.getSno()
        );
    }

}
