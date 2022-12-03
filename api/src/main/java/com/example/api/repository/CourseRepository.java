package com.example.api.repository;

import com.example.api.entity.Course;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface CourseRepository extends PagingAndSortingRepository<Course, Long>, JpaSpecificationExecutor {

    Course findByName(String name);

}
