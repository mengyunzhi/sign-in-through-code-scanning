package com.example.api.controller;

import com.example.api.entity.Clazz;

// index 页面需要各个班级的人数
public interface ClazzInPage {
    Clazz clazz = null;
    // 各个班级人数
    Long number_of_students = 0L;
}
