package com.example.api.controller;


import com.example.api.entity.Student;
import com.example.api.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.SortDefault;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

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
    @ResponseStatus(HttpStatus.CREATED)
    public Student save(@RequestBody Student student) {
        return this.studentService.save(
            student.getUser().getName(),
            student.getUser().getSex(),
            student.getClazz().getId(),
            student.getSno()
        );
    }

    @GetMapping("page")
    public Page page(@RequestParam(required = false) String clazzName,
                     @RequestParam(required = false) String studentName,
                     @RequestParam(required = false) String sno,
                     @SortDefault.SortDefaults(@SortDefault(sort = "id", direction = Sort.Direction.DESC)) Pageable pageable) {
        return  this.studentService.findAll(clazzName, studentName, sno, pageable);
    }


    @DeleteMapping("delete/{userId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteByUserId(@PathVariable Long userId) {
        this.studentService.deleteByUserId(userId);
    }

    @PostMapping("updatePasswordByAdmin/{userId}")
    public void updatePasswordByAdmin(@PathVariable Long userId,
                                      @RequestBody String password) {
        this.studentService.updatePassword(userId, password);
    }

    @GetMapping("getById/{userId}")
    public Student getById(@PathVariable Long userId) {
        return this.studentService.getByUserId(userId);
    }

    /**
     * 接受的student中的属性
     * user.name, user.sex, clazz.id, sno
     */
    @PutMapping("update/{userId}")
    public Student update(@PathVariable Long userId,
                          @RequestBody Student student) {
        return this.studentService.updateByUserId(
                userId,
                student.getUser().getName(),
                student.getUser().getSex(),
                student.getClazz().getId(),
                student.getSno()
        );
    }
}
