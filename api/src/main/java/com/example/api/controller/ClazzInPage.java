package com.example.api.controller;


import com.example.api.entity.Clazz;
import com.sun.istack.NotNull;
import org.springframework.util.Assert;

import javax.persistence.Column;

// index 页面需要各个班级的人数
public class ClazzInPage {
    private Long id;

    private String name;

    private Long entrance_date;

    private Short length;
    // 各个班级人数
    Long number_of_students = 0L;

    public ClazzInPage(@NotNull Clazz clazz, Long number_of_students) {
        Assert.notNull(clazz, "clazz不能为null");
        this.id = clazz.getId();
        this.name = clazz.getName();
        this.entrance_date = clazz.getEntrance_date();
        this.length = clazz.getLength();
        this.number_of_students = number_of_students;

    }
}
