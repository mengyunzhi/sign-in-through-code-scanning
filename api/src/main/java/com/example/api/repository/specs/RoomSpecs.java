package com.example.api.repository.specs;

import com.example.api.entity.Room;
import org.springframework.data.jpa.domain.Specification;

public class RoomSpecs {
    public static Specification<Room> containName(String name) {
        if (name != null) {
            return (Specification<Room>) (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.like(root.get("name").as(String.class), String.format("%%%s%%", name));
        } else {
            return Specification.where(null);
        }
    }
    public static Specification<Room> containCapacity(String capacity) {
        if (capacity != null) {
            return (Specification<Room>) (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.like(root.get("capacity").as(String.class), String.format("%%%s%%", capacity));
        } else {
            return Specification.where(null);
        }
    }


}
