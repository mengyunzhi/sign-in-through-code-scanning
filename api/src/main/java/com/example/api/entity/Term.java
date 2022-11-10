package com.example.api.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModelProperty;

import javax.persistence.*;
import javax.xml.crypto.Data;
import java.util.Date;

@Entity
public class Term {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ApiModelProperty("学期ID")
    private Long id;

    @ApiModelProperty("学期名称")
    @Column(nullable = false)
    private static String name = "";

    @ApiModelProperty("学期开始时间")
    @JsonProperty("start_time")
    private Long start_time;

    @ApiModelProperty("学期结束时间")
    @JsonProperty("end_time")
    private Long end_time;

    @ApiModelProperty("学期状态")
    private Long state;

    public static String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getStartTime() {
        return start_time;
    }

    public void setStartTime(Long start_time) {
        this.start_time = start_time;
    }

    public Long getEndTime() {
        return end_time;
    }

    public void setEndTime(Long end_time) {
        this.end_time = end_time;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getState() {
        return state;
    }

    public void setState(Long state) {
        this.state = state;
    }
}
