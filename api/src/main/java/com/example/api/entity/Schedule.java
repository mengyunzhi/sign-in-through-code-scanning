package com.example.api.entity;

import io.swagger.annotations.ApiModelProperty;

import javax.persistence.*;
import java.util.List;

@Entity
public class Schedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ApiModelProperty("排课Id")
    private Long id;

    @ManyToOne
    @ApiModelProperty("该排课对应教师")
    private Teacher teacher;

    @ManyToOne
    @ApiModelProperty("该排课对应学期")
    private Term term;

    @ManyToOne
    @ApiModelProperty("该排课对应课程")
    private Course course;

    @ManyToMany
    @ApiModelProperty("该排课对应班级")
    private List<Clazz> clazzes;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Teacher getTeacher() {
        return teacher;
    }

    public void setTeacher(Teacher teacher) {
        this.teacher = teacher;
    }

    public Term getTerm() {
        return term;
    }

    public void setTerm(Term term) {
        this.term = term;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public List<Clazz> getClazzes() {
        return clazzes;
    }

    public void setClazzes(List<Clazz> clazzes) {
        this.clazzes = clazzes;
    }
}
