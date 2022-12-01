package com.example.api.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonView;
import io.swagger.annotations.ApiModelProperty;

import javax.persistence.*;

@Entity
public class Program {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ApiModelProperty("项目id")
    @JsonView(IdJsonView.class)
    private Long id;

    @ApiModelProperty("项目名称")
    @JsonView(NameJsonView.class)
    private String name = "";

    @ApiModelProperty("项目课时")
    @JsonView(LessonJsonView.class)
    private Long lesson;

    @ApiModelProperty("项目所属课程")
    @ManyToOne
    @JsonIgnoreProperties({"programs"})
    private Course course = new Course();

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

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }
    public interface IdJsonView {}
    public interface NameJsonView {}
    public interface LessonJsonView {}
}
