package com.example.api.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonView;
import io.swagger.annotations.ApiModelProperty;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Schedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ApiModelProperty("排课Id")
    @JsonView(IdJsonView.class)
    private Long id;

    @ManyToOne
    @ApiModelProperty("该排课对应教师")
    private Teacher teacher = new Teacher();

    @ManyToOne
    @ApiModelProperty("该排课对应学期")
    private Term term = new Term();

    @ManyToOne
    @ApiModelProperty("该排课对应课程")
    @JsonView(CourseJsonView.class)
    private Course course = new Course();

    @ManyToMany
    @ApiModelProperty("该排课对应班级")
    private List<Clazz> clazzes = new ArrayList<>();

    @ManyToMany
    @ApiModelProperty("该排课对应学生")
    private List<Student> students = new ArrayList<>();

    @OneToMany(mappedBy = "schedule")
    @ApiModelProperty("排课所含调度")
    private List<Dispatch> dispatches = new ArrayList<>();

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

    public List<Student> getStudents() {
        return students;
    }

    public void setStudents(List<Student> students) {
        this.students = students;
    }

    public List<Dispatch> getDispatches() {
        return dispatches;
    }

    public void setDispatches(List<Dispatch> dispatches) {
        this.dispatches = dispatches;
    }

    public interface IdJsonView {}
    public interface CourseJsonView {}
}
