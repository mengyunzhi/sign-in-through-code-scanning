package com.example.api.repository.specs;

import com.example.api.entity.Teacher;
import com.example.api.entity.User;
import org.springframework.data.jpa.domain.Specification;

public class TeacherSpecs {


    public static Specification<Teacher> relateUserByName(String name) {
        if (name == null) {
            return Specification.where(null);
        }
        return (root, criteriaQuery, criteriaBuilder)
                -> criteriaBuilder.like(root.join("user").get("name").as(String.class), String.format("%%%s%%", name));
    }

    public static Specification<Teacher> relateUserByNumber(String number) {
        if (number != null) {
            return (Specification<Teacher>) (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.like(root.join("user").get("number").as(String.class), String.format("%%%s%%", number));
        }
        return Specification.where(null);
    }
}
