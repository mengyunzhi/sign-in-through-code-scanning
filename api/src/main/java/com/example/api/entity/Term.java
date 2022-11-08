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
    private String name = "";

    @JsonFormat(pattern = "yyyy-MM-dd")
    @ApiModelProperty("学期开始时间")
    private Date start_time;

    @JsonFormat(pattern = "yyyy-MM-dd")
    @ApiModelProperty("学期结束时间")
    private Date end_time;

    @ApiModelProperty("学期状态")
    private Long state;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @JsonProperty("start_time")
    public Date getStartTime() {
        return start_time;
    }

    public void setStartTime(Date start_time) {
        this.start_time = start_time;
    }

    @JsonProperty("end_time")
    public Date getEndTime() {
        return end_time;
    }

    public void setEndTime(Date end_time) {
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
