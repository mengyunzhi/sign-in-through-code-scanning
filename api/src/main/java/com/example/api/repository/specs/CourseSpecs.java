package com.example.api.repository.specs;

import com.example.api.entity.Course;
import org.springframework.data.jpa.domain.Specification;

public class CourseSpecs {

    public static Specification<Course> containName(String name) {
        if (name != null) {
            return (Specification<Course>) (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.like(root.get("name").as(String.class), String.format("%%%s%%", name));
        } else {
            return Specification.where(null);
        }
    }

    public static Specification<Course> containLesson(String lesson) {
        if (lesson != null) {
            return (Specification<Course>) (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.like(root.get("lesson").as(String.class), String.format("%%%s%%", lesson));
        } else {
            return Specification.where(null);
        }
    }

}
