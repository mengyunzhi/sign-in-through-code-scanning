package com.example.api.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonView;
import io.swagger.annotations.ApiModelProperty;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ApiModelProperty("课程ID")
    @JsonView(IdJsonView.class)
    private Long id;
    @ApiModelProperty("课程名称")
    @Column(nullable = false)
    @JsonView(NameJsonView.class)
    private String name = "";

    @ApiModelProperty("课时")
    @Column(nullable = false)
    @JsonView(LessonJsonView.class)
    private Long lesson = 0L;

    @ApiModelProperty("课程所含项目")
    @OneToMany(mappedBy = "course")
    private List<Program> programs = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getLesson() {
        return lesson;
    }

    public void setLesson(Long lesson) {
        this.lesson = lesson;
    }

    public List<Program> getPrograms() {
        return programs;
    }

    public void setPrograms(List<Program> programs) {
        this.programs = programs;
    }
    public interface IdJsonView {}
    public interface NameJsonView {}
    public interface LessonJsonView {}

}
