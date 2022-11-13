package com.example.api.repository;

import com.example.api.entity.Room;
import com.example.api.entity.Teacher;
import com.example.api.repository.specs.UserSpecs;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;

public interface TeacherRepository extends CrudRepository<Teacher, Long>, JpaSpecificationExecutor {

}
