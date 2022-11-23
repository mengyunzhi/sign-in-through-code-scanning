package com.example.api.repository.specs;

import com.example.api.entity.Schedule;
import com.example.api.entity.Teacher;
import com.example.api.entity.Term;
import org.springframework.data.jpa.domain.Specification;

public class ScheduleSpecs {
    public static Specification<Schedule> containTermName(String termName) {
        if (termName != null) {
            return (Specification<Schedule>) (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.like(root.join("term").get("name").as(String.class), String.format("%%%s%%", termName));
        } else {
            return Specification.where(null);
        }
    }

    public static Specification<Schedule> containCourseName(String courseName) {
        if (courseName != null) {
            return (Specification<Schedule>) (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.like(root.join("course").get("name").as(String.class), String.format("%%%s%%", courseName));
        } else {
            return Specification.where(null);
        }
    }
    public static Specification<Schedule> relateTeacher(Teacher teacher) {
        if (teacher != null) {
            return (Specification<Schedule>) (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.equal(root.join("teacher").get("id").as(String.class), teacher.getId().toString());
        } else {
            return Specification.where(null);
        }
    }

    public static Specification<Schedule> relateTerm(Term term) {
        if (term != null) {
            return (Specification<Schedule>) (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.equal(root.join("term").get("id").as(String.class), term.getId().toString());
        } else {
            return Specification.where(null);
        }
    }
}
