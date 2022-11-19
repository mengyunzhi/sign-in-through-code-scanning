package com.example.api.service;

import com.example.api.entity.Course;
import com.example.api.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CourseServiceImpl implements CourseService {

    CourseRepository courseRepository;

    @Autowired
    CourseServiceImpl(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }


    @Override
    public Course save(Course course) {
        return this.courseRepository.save(course);
    }
}
