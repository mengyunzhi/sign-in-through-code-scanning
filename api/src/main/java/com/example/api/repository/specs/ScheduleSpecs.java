package com.example.api.repository.specs;

import com.example.api.entity.Schedule;
import org.springframework.data.jpa.domain.Specification;

public class ScheduleSpecs {
    public static Specification<Schedule> containName(String name) {
        if (name != null) {
            return (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.like(root.get("name").as(String.class), String.format("%%%s%%", name));
        } else {
            return Specification.where(null);
        }
    }
}
