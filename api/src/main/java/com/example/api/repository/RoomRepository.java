package com.example.api.repository;

import com.example.api.entity.Room;
import com.example.api.repository.specs.RoomSpecs;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface RoomRepository extends PagingAndSortingRepository<Room, Long>, JpaSpecificationExecutor {

    default Page findAll(String searchName, String searchCapacity, Pageable pageable) {
        Specification<Room> specification = RoomSpecs.containName(searchName)
                .and(RoomSpecs.containCapacity(searchCapacity));
        return this.findAll(specification, pageable);
    };

    List<Room> findRoomsByName(String name);

}
