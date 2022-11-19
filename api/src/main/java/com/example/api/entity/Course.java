package com.example.api.entity;

import io.swagger.annotations.ApiModelProperty;

import javax.persistence.*;

@Entity
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ApiModelProperty("课程ID")
    private Long id;

    @ApiModelProperty("课程名称")
    @Column(nullable = false)
    private String name = "";

    @ApiModelProperty("课时")
    @Column(nullable = false)
    private Long lesson = 0L;

}
