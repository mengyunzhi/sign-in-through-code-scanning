package com.example.api.entity;

import io.swagger.annotations.ApiModelProperty;

import javax.persistence.*;

@Entity
public class Klass {
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
}
