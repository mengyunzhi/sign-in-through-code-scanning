package com.example.api.repository.specs;

import com.example.api.entity.Room;
import org.springframework.data.jpa.domain.Specification;

public class UserSpecs {
    public static Specification<Room> containName(String name) {
        if (name != null) {
            return (Specification<Room>) (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.like(root.get("name").as(String.class), String.format("%%%s%%", name));
        } else {
            return Specification.where(null);
        }
    }

    public static Specification<Room> containNumber(String number) {
        if (number != null) {
            return (Specification<Room>) (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.like(root.get("number").as(String.class), String.format("%%%s%%", number));
        } else {
            return Specification.where(null);
        }
    }
    public static Specification<Room> limitRole(Short role) {
        Short roleForQuery = role == null ? (short) -1 : role;
        return (Specification<Room>) (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.equal(root.get("role").as(String.class), roleForQuery.toString());
    }
}
