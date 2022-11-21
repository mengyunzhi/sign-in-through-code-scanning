package com.example.api.entity;

import io.swagger.annotations.ApiModelProperty;

import javax.persistence.*;
import java.util.List;

@Entity
public class Clazz {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ApiModelProperty("班级ID")
    private Long id;

    @ApiModelProperty("班级名称")
    @Column(nullable = false)
    private String name = "";

    @ApiModelProperty("入学日期")
    private Long entrance_date;

    @ApiModelProperty("学制")
    private Short length;

    @ManyToMany
    @ApiModelProperty("对应排课")
    private List<Schedule> schedules;


    // 班级人数，非数据库属性
    @Transient
    private Long number_of_students = 0L;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getEntrance_date() {
        return entrance_date;
    }

    public void setEntrance_date(Long entrance_date) {
        this.entrance_date = entrance_date;
    }

    public Short getLength() {
        return length;
    }

    public void setLength(Short length) {
        this.length = length;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getNumber_of_students() {
        return number_of_students;
    }

    public void setNumber_of_students(Long number_of_students) {
        this.number_of_students = number_of_students;
    }

    public List<Schedule> getSchedules() {
        return schedules;
    }

    public void setSchedules(List<Schedule> schedules) {
        this.schedules = schedules;
    }
}
