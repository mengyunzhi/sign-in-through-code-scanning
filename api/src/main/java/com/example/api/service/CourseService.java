package com.example.api.service;

import com.example.api.entity.Course;
import com.sun.istack.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CourseService {

    Course save(Course course);

    Page findAll(String searchName, String searchLesson, Pageable pageable);

    void deleteById(@NotNull Long id);

    Course getById(@NotNull Long id);

    Course update(@NotNull Long id, @NotNull Course course);
}
