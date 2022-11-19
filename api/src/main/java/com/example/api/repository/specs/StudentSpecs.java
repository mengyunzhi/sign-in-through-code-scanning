package com.example.api.repository.specs;

import com.example.api.entity.Room;
import com.example.api.entity.Student;
import com.example.api.entity.Teacher;
import org.springframework.data.jpa.domain.Specification;

public class StudentSpecs {

    public static Specification<Student> relateUserByStudentName(String studentName) {
        if (studentName == null) {
            return Specification.where(null);
        }
        return (root, criteriaQuery, criteriaBuilder)
                -> criteriaBuilder.like(root.join("user").get("name").as(String.class), String.format("%%%s%%", studentName));
    }

    public static Specification<Student> relateClazzByClazzName(String clazzName) {
        if (clazzName == null) {
            return Specification.where(null);
        }
        return (root, criteriaQuery, criteriaBuilder)
                -> criteriaBuilder.like(root.join("clazz").get("name").as(String.class), String.format("%%%s%%", clazzName));
    }

    public static Specification<Student> containSno(String sno) {
        if (sno == null) {
            return Specification.where(null);
        }
        return (root, criteriaQuery, criteriaBuilder)
                -> criteriaBuilder.like(root.get("sno").as(String.class), String.format("%%%s%%", sno));
    }


    public static Specification<Student> belongToClazz(Long clazzId) {
        if (clazzId == null) {
            return Specification.where(null);
        }
        return (root, criteriaQuery, criteriaBuilder)
                -> criteriaBuilder.equal(root.join("clazz").get("id").as(Long.class), clazzId);
    }
}
