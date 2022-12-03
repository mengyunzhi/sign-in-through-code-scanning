package com.example.api.service;

import com.example.api.entity.Course;
import com.example.api.entity.Schedule;
import com.example.api.repository.CourseRepository;
import com.example.api.repository.ScheduleRepository;
import com.example.api.repository.specs.CourseSpecs;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import javax.persistence.EntityNotFoundException;
import java.util.Objects;

@Service
public class CourseServiceImpl implements CourseService {

    CourseRepository courseRepository;
    ScheduleRepository scheduleRepository;

    @Autowired
    CourseServiceImpl(CourseRepository courseRepository,
                      ScheduleRepository scheduleRepository) {
        this.courseRepository = courseRepository;
        this.scheduleRepository = scheduleRepository;
    }


    @Override
    public Course save(Course course) {
        return this.courseRepository.save(course);
    }

    @Override
    public Page findAll(String searchName, String searchLesson, Pageable pageable) {
        Specification specification = CourseSpecs.containName(searchName)
                .and(CourseSpecs.containLesson(searchLesson));
        return this.courseRepository.findAll(specification, pageable);
    }

    @Override
    public void deleteById(Long id) {
        Assert.notNull(id, "id不能为null");
        this.courseRepository.deleteById(id);
    }

    @Override
    public Course getById(Long id) {
        return this.courseRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("未找到相关课程"));
    }

    @Override
    public Course update(Long id, Course course) {
        Assert.notNull(id, "id不能为null");
        Assert.notNull(course.getName(), "course.name不能为null");
        Assert.notNull(course.getLesson(), "course.lesson不能为null");
        Course oldCourse = this.getById(id);
        oldCourse.setName(course.getName());
        oldCourse.setLesson(course.getLesson());
        return this.courseRepository.save(oldCourse);
    }

    @Override
    public String courseNameUnique(Long courseId, String name) {
        Assert.notNull(name, "name不能为null");
        Course course = this.courseRepository.findByName(name);
        if (course != null && !Objects.equals(course.getId(), courseId)) {
            return "课程名已存在";
        }
        return null;
    }

    @Override
    public Course getByScheduleId(Long scheduleId) {
        Assert.notNull(scheduleId, "scheduleId不能为null");
        Schedule schedule = this.scheduleRepository.findById(scheduleId).get();
        return schedule.getCourse();
    }
}
