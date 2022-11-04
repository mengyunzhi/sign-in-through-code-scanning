package com.example.api.repository;

import com.example.api.entity.Teacher;
import org.springframework.data.repository.CrudRepository;

public interface TeacherRepository extends CrudRepository<Teacher, Long> {
}
